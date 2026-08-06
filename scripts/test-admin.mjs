/* ============================================================
   test-admin.mjs — écrire depuis l'administration ne doit jamais
   se heurter à un 409.

   Le défaut d'origine : les tables des textes et des photos
   référencent atlas_dishes(id). Une fiche présente dans
   l'instantané mais absente de la base — toutes celles ajoutées
   depuis le dernier import — faisait échouer l'écriture par
   violation de clé étrangère, que PostgREST renvoie en 409.

   On rejoue la scène contre une fausse base qui applique
   exactement les mêmes contraintes, sans réseau.
   Nécessite un serveur local sur public/ (port 8099).
   ============================================================ */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const BASE = process.env.BASE || 'http://localhost:8099/';
const SB = 'https://fausse-base';
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

/* ---------- la fausse base ---------- */
/* Elle ne connaît au départ qu'une seule fiche : celles ajoutées
   par les lots récents n'y sont pas, comme dans la vraie vie. */
const DB = {
  dishes: new Map([['bouillabaisse', { id: 'bouillabaisse', rank: 7 }]]),
  texts: new Map(),
  photos: new Map(),
  objects: new Set()
};
const journal = [];

function reply(status, body) {
  return Promise.resolve({
    ok: status < 400, status,
    json: () => Promise.resolve(body || {}),
    text: () => Promise.resolve(JSON.stringify(body || {}))
  });
}

/* PostgREST traduit une violation de clé étrangère (23503) comme une
   violation d'unicité (23505) par un 409 : on fait pareil. */
const conflit = msg => reply(409, { code: '23503', message: msg });

function fakeSupabase(url, opt = {}) {
  const u = new URL(url);
  const method = (opt.method || 'GET').toUpperCase();
  const body = opt.body && typeof opt.body === 'string' ? JSON.parse(opt.body) : null;
  const table = u.pathname.replace('/rest/v1/', '');
  journal.push(`${method} ${table || u.pathname}`);

  if (u.pathname.startsWith('/auth/v1/token'))
    return reply(200, { access_token: 'jeton', expires_at: Math.floor(Date.now() / 1e3) + 3600 });

  if (u.pathname.startsWith('/storage/v1/object/')) {
    const key = u.pathname.split('/atlas-photos/')[1];
    if (method === 'DELETE') { DB.objects.delete(key); return reply(200, {}); }
    // sans en-tête d'écrasement, le stockage refuse un chemin déjà pris
    if (DB.objects.has(key) && (opt.headers || {})['x-upsert'] !== 'true')
      return conflit('The resource already exists');
    DB.objects.add(key);
    return reply(200, { Key: key });
  }

  if (table === 'atlas_dishes') {
    if (method === 'GET') {
      const id = decodeURIComponent((u.search.match(/id=eq\.([^&]+)/) || [, ''])[1]);
      return reply(200, DB.dishes.has(id) ? [{ id }] : []);
    }
    if (method === 'POST') {
      for (const row of [].concat(body)) {
        const prev = DB.dishes.get(row.id) || {};
        DB.dishes.set(row.id, { ...prev, ...row });
      }
      return reply(201, {});
    }
    if (method === 'PATCH') {
      const id = decodeURIComponent((u.search.match(/id=eq\.([^&]+)/) || [, ''])[1]);
      if (!DB.dishes.has(id)) return reply(204, {});   // PATCH sur rien : silencieux
      DB.dishes.set(id, { ...DB.dishes.get(id), ...body });
      return reply(204, {});
    }
  }

  if (table === 'atlas_dish_texts' && method === 'POST') {
    if (!DB.dishes.has(body.dish_id))
      return conflit(`clé étrangère « atlas_dish_texts_dish_id_fkey » : ${body.dish_id} absent`);
    DB.texts.set(body.dish_id + ':' + body.lang, body);
    return reply(201, {});
  }

  if (table === 'atlas_dish_photos') {
    if (method === 'POST') {
      if (!DB.dishes.has(body.dish_id))
        return conflit(`clé étrangère « atlas_dish_photos_dish_id_fkey » : ${body.dish_id} absent`);
      DB.photos.set(body.dish_id, body);
      return reply(201, {});
    }
    if (method === 'DELETE') {
      const id = decodeURIComponent((u.search.match(/dish_id=eq\.([^&]+)/) || [, ''])[1]);
      DB.photos.delete(id);
      return reply(204, {});
    }
  }
  return reply(200, []);
}

/* ---------- la page ---------- */
const dom = await JSDOM.fromURL(BASE, {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    window.fetch = (u, o) => {
      const s = String(u);
      if (s.startsWith(SB)) return fakeSupabase(s, o);
      if (/wikipedia\.org|wikimedia\.org/.test(s))
        return reply(200, { query: { pages: { '-1': { missing: '' } } } });
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
      if (k === 'getImageData') return () => ({ data: [] });
      return () => {};
    }, set() { return true; } });
    window.HTMLCanvasElement.prototype.getContext = () => stub;
    window.Element.prototype.getBoundingClientRect = () =>
      ({ width: 900, height: 700, left: 0, top: 0, right: 900, bottom: 700, x: 0, y: 0 });
    window.ResizeObserver = class { observe() {} disconnect() {} };
    window.requestAnimationFrame = cb => setTimeout(cb, 16);
    window.atob = s => Buffer.from(s, 'base64').toString('binary');
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r, { once: true }));
await new Promise(r => setTimeout(r, 2500));

/* on branche la fausse base et on ouvre une session */
w.eval(`window.SUPA = { url: ${JSON.stringify(SB)}, anonKey: 'eyJfaux' };`);
await w.adminLogin('contact@unmondeatable.fr', 'mot-de-passe');
check(w.eval('IS_ADMIN') === true, 'la session d’administration s’ouvre');

/* ---------- 1. une fiche récente, encore absente de la base ---------- */
const recente = w.eval('DISHES[DISHES.length - 1].id');
check(!DB.dishes.has(recente), 'la fiche choisie n’est effectivement pas en base', recente);

const PIXEL = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';

let erreurPhoto = null;
try { await w.publishPhoto(recente, PIXEL, 'Photo maison'); }
catch (e) { erreurPhoto = e.message; }
check(!erreurPhoto, 'changer la photo d’une fiche récente ne renvoie plus 409', erreurPhoto || '');
check(DB.photos.has(recente), 'la photo est bien enregistrée en base');
check(DB.dishes.has(recente), 'la fiche a été semée dans atlas_dishes au passage');

let erreurTexte = null;
try {
  await w.saveDishText(recente, 'fr', {
    name: 'Nom revu', place: 'Quelque part', description: 'Texte revu', steps: ['Une étape']
  });
} catch (e) { erreurTexte = e.message; }
check(!erreurTexte, 'modifier le texte d’une fiche récente ne renvoie plus 409', erreurTexte || '');
check((DB.texts.get(recente + ':fr') || {}).name === 'Nom revu', 'le texte est bien enregistré');

/* ---------- 2. les chiffres d'une fiche absente doivent être écrits ---------- */
const avant = journal.length;
await w.saveDishFacts(recente, { base: 8, prep: 25, cook: 55, diff: 3 });
check((DB.dishes.get(recente) || {}).base === 8,
  'modifier les chiffres d’une fiche récente est réellement enregistré',
  'base = ' + (DB.dishes.get(recente) || {}).base);
check(!journal.slice(avant).some(l => l.startsWith('PATCH')),
  'on n’envoie plus un PATCH qui ne toucherait aucune ligne');

/* ---------- 3. une fiche déjà en base garde son rang ---------- */
await w.saveDishFacts('bouillabaisse', { base: 6 });
check(DB.dishes.get('bouillabaisse').rank === 7,
  'le rang d’une fiche déjà en base n’est pas remis à zéro',
  'rang = ' + DB.dishes.get('bouillabaisse').rank);
check(DB.dishes.get('bouillabaisse').base === 6, 'et la modification est prise en compte');

/* ---------- 4. remplacer une photo existante ---------- */
let erreurRemplace = null;
try { await w.publishPhoto(recente, PIXEL, 'Deuxième photo'); }
catch (e) { erreurRemplace = e.message; }
check(!erreurRemplace, 'remplacer une photo déjà publiée fonctionne', erreurRemplace || '');
check((DB.photos.get(recente) || {}).credit === 'Deuxième photo', 'le crédit est mis à jour');

/* ---------- 5. un vrai conflit reste lisible ---------- */
const msg = await w.eval(`explain({ status: 409, json: () => Promise.resolve({ message: 'détail' }) }, 'la photo')`);
check(/409/.test(msg) && /détail/.test(msg),
  'un conflit résiduel est expliqué, pas réduit à un numéro', msg);
const refus = await w.eval(`explain({ status: 401, json: () => Promise.resolve({}) }, 'la fiche')`);
check(/reconnect/i.test(refus), 'une session expirée invite à se reconnecter', refus);

for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
dom.window.close();
process.exit(errors.length ? 1 : 0);
