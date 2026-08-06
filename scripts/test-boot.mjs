/* ============================================================
   test-boot.mjs — un moteur incomplet doit le dire, pas tourner
   indéfiniment.

   Le défaut d'origine : le moteur était reconstruit en ligne avec une
   liste de fichiers périmée. Il manquait filters.js, app.js appelait
   emptyFilters() au chargement, tout le fichier s'arrêtait là — et
   l'écran « Chargement de l'atlas… » tournait sans fin, sans un mot.

   Nécessite un serveur local sur public/ (port 8099).
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '../public/assets/engine.js');
const BASE = process.env.BASE || 'http://localhost:8099/';
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

/* ---------- 1. la construction refuse un moteur amputé ---------- */
const build = fs.readFileSync(path.resolve(HERE, 'build.mjs'), 'utf8');
check(/Moteur incomplet/.test(build) && /ATTENDUS/.test(build),
  'la construction contrôle le moteur assemblé');
check(/emptyFilters/.test(build) && /FOOD_GROUPS/.test(build),
  'et vérifie nommément les symboles que app.js exige au chargement');

/* ---------- 2. le site démarre normalement ---------- */
async function ouvrir(patch, attente) {
  const bon = fs.readFileSync(OUT, 'utf8');
  if (patch) fs.writeFileSync(OUT, patch(bon));
  const vus = [];
  try {
    const dom = await JSDOM.fromURL(BASE, {
      runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
      beforeParse(w) {
        w.fetch = (u, o) => fetch(new URL(String(u), BASE).href, o);
        let store = {};
        Object.defineProperty(w, 'localStorage', { value: {
          getItem: k => (k in store ? store[k] : null),
          setItem: (k, v) => { store[k] = String(v); },
          removeItem: k => { delete store[k]; }, clear: () => { store = {}; } } });
        w.matchMedia = q => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
        const stub = new Proxy({}, { get(_, k) {
          if (k === 'measureText') return () => ({ width: 40 });
          if (/Gradient$/.test(k)) return () => ({ addColorStop() {} });
          if (k === 'getImageData') return () => ({ data: [] });
          return () => {};
        }, set() { return true; } });
        w.HTMLCanvasElement.prototype.getContext = () => stub;
        w.Element.prototype.getBoundingClientRect = () =>
          ({ width: 900, height: 700, left: 0, top: 0, right: 900, bottom: 700, x: 0, y: 0 });
        w.ResizeObserver = class { observe() {} disconnect() {} };
        w.requestAnimationFrame = cb => setTimeout(cb, 16);
        w.addEventListener('error', e => vus.push(e.message || ''));
        // le filet attend quinze secondes : on ne va pas les attendre non plus
        const vraiSetTimeout = w.setTimeout;
        w.setTimeout = (fn, ms) => vraiSetTimeout(fn, ms >= 15000 ? 900 : ms);
      }
    });
    const w = dom.window;
    await new Promise(r => setTimeout(r, attente));
    const res = {
      booting: w.document.body.classList.contains('booting'),
      texte: (w.document.querySelector('#boot p') || {}).textContent || '',
      html: (w.document.querySelector('#boot p') || {}).innerHTML || '',
      erreurs: vus
    };
    dom.window.close();
    return res;
  } finally {
    if (patch) fs.writeFileSync(OUT, bon);
  }
}

const sain = await ouvrir(null, 6500);
check(!sain.booting, 'avec un moteur complet, l’écran d’attente disparaît');

/* ---------- 3. moteur amputé : le site l'annonce ---------- */
const casse = await ouvrir(
  s => s.replace(/\/\* ===== foodgroups\.js ===== \*\/[\s\S]*?(?=\/\* ===== admin\.js ===== \*\/)/, ''),
  3500);
check(casse.erreurs.some(m => /emptyFilters/.test(m)),
  'sans le module de filtres, le moteur échoue au chargement',
  casse.erreurs[0] || '');
check(/n’a pas pu démarrer/.test(casse.texte),
  'et l’écran d’attente le dit au lieu de tourner sans fin', casse.texte.slice(0, 70));
check(/emptyFilters/.test(casse.html),
  'la cause exacte est affichée, pas seulement un message vague');
check(/<button/.test(casse.html), 'un bouton Réessayer est proposé');

for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
process.exit(errors.length ? 1 : 0);
