/* ============================================================
   test-wiki.mjs — la recherche de photo ne doit jamais illustrer
   deux plats différents avec la même image.

   Le défaut d'origine : une fiche sans titre d'article Wikipédia
   retombait sur une recherche Commons générique, qui renvoyait la
   première image venue. Plusieurs plats portugais se retrouvaient
   ainsi avec la même photo.

   On rejoue le scénario contre une fausse Wikipédia, sans réseau.
   Nécessite un serveur local sur public/ (port 8099).
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(HERE, '../../src');
const BASE = process.env.BASE || 'http://localhost:8099/';
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

/* ---------- 1. chaque fiche a un titre d'article exploitable ---------- */
let code = fs.readFileSync(path.join(SRC, 'lexicon.js'), 'utf8') + '\n'
  + fs.readFileSync(path.join(SRC, 'wiki.js'), 'utf8') + '\n';
for (let i = 1; i <= 58; i++) code += fs.readFileSync(path.join(SRC, `d${i}.js`), 'utf8') + '\n';
const { DISHES, WIKI } = new Function(code + '\nreturn { DISHES, WIKI };')();

const sans = DISHES.filter(d => {
  const w = WIKI[d.id];
  return !w || !w.some(Boolean);
});
check(sans.length === 0, 'chaque fiche indique au moins un article Wikipédia',
  sans.slice(0, 5).map(d => d.id).join(', '));

/* deux fiches ne doivent pas pointer vers le même article : elles
   récupéreraient forcément la même photo */
const parArticle = new Map();
for (const d of DISHES) {
  const w = WIKI[d.id] || [];
  // une même fiche peut citer le même titre en anglais et dans sa langue :
  // ce n'est pas un conflit, on ne la compte qu'une fois par article
  const siens = new Set();
  for (const [lang, t] of [['en', w[0]], ['fr', w[1]], [w[2], w[3]]]) {
    if (!t || !lang) continue;
    siens.add(lang + ':' + t.toLowerCase());
  }
  for (const k of siens) (parArticle.get(k) || parArticle.set(k, []).get(k)).push(d.id);
}
const partages = [...parArticle].filter(([, ids]) => ids.length > 1);
check(partages.length === 0, 'aucun article Wikipédia partagé par deux fiches',
  partages.slice(0, 4).map(([k, ids]) => `${k} → ${ids.join(', ')}`).join(' · '));

/* ---------- 2. comportement face à une Wikipédia qui ne connaît rien ---------- */
/* Fausse API : aucun article n'existe, et Commons renvoie toujours la même
   image générique. C'est exactement la situation qui produisait le défaut. */
const IMAGE_GENERIQUE = 'Portuguese cuisine assortment.jpg';
function fakeApi(url) {
  const json = v => Promise.resolve({ ok: true, json: () => Promise.resolve(v) });
  if (url.includes('wikipedia.org')) return json({ query: { pages: { '-1': { missing: '' } } } });
  if (url.includes('generator=search')) {
    return json({ query: { pages: { 1: { title: 'File:' + IMAGE_GENERIQUE } } } });
  }
  if (url.includes('prop=imageinfo')) {
    const m = decodeURIComponent(url).match(/File:([^&]+)/);
    return json({ query: { pages: { 1: { imageinfo: [{ url: 'https://x/' + (m ? m[1] : '?') }] } } } });
  }
  return json({});
}

const dom = await JSDOM.fromURL(BASE, {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    window.fetch = (u, o) => {
      const s = String(u);
      if (/wikipedia\.org|wikimedia\.org/.test(s)) return fakeApi(s);
      return fetch(new URL(s, BASE).href, o);
    };
    let store = {};
    Object.defineProperty(window, 'localStorage', { value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }, clear: () => { store = {}; }
    }});
    window.matchMedia = q => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
    const stub = new Proxy({}, { get(_, k) {
      if (k === 'measureText') return () => ({ width: 40 });
      if (/Gradient$/.test(k)) return () => ({ addColorStop() {} });
      return () => {};
    } });
    window.HTMLCanvasElement.prototype.getContext = () => stub;
    window.Element.prototype.getBoundingClientRect = () =>
      ({ width: 900, height: 700, left: 0, top: 0, right: 900, bottom: 700, x: 0, y: 0 });
    window.ResizeObserver = class { observe() {} disconnect() {} };
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r, { once: true }));
await new Promise(r => setTimeout(r, 2500));

const G = n => w.eval(n);
const d = id => G('DISHES').find(x => x.id === id);

const cibles = ['arroz-de-lampreia', 'arroz-de-cabidela', 'maranhos', 'sarrabulho', 'bolo-levedo'];
const urls = [];
for (const id of cibles) {
  const p = await w.getPhoto(d(id));
  urls.push(p && p.url ? p.url : null);
}
const distinctes = new Set(urls.filter(Boolean));
check(distinctes.size === urls.filter(Boolean).length,
  'aucune photo n’est attribuée à deux plats différents',
  cibles.map((id, i) => `${id}: ${urls[i] ? urls[i].split('/').pop() : 'illustration'}`).join(' · '));

check(urls.filter(Boolean).length <= 1,
  'sans article correspondant, on garde l’illustration plutôt qu’une image générique',
  `${urls.filter(Boolean).length} photo(s) acceptée(s) sur ${cibles.length}`);

/* ---------- 3. une image dont le nom parle du plat reste acceptée ---------- */
{
  const nom = 'Bacalhau a Bras closeup.jpg';
  const mots = w.eval(`keyWords(${JSON.stringify(nom)})`);
  const veut = w.eval(`keyWords("Bacalhau à Brás")`);
  check(mots.some(x => veut.includes(x)),
    'une image nommée d’après le plat est bien reconnue', mots.join(', '));
  const hors = w.eval(`keyWords("Portuguese cuisine assortment.jpg")`);
  check(!hors.some(x => veut.includes(x)),
    'une image générique ne passe pas le filtre', hors.join(', '));
}

for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
dom.window.close();
process.exit(errors.length ? 1 : 0);
