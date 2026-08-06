/* ============================================================
   test-photos.mjs — les photos publiées survivent aux déploiements.

   Le piège corrigé : l'instantané statique porte la date de sa
   construction. Une photo publiée avant un redéploiement était donc
   « plus ancienne » que l'instantané, la synchronisation concluait
   que rien n'avait bougé, et la photo disparaissait de l'affichage.

   Nécessite un serveur local sur public/ (port 8099).
   ============================================================ */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const BASE = process.env.BASE || 'http://localhost:8099/';
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

/* Fausse base : le contenu date d'hier, l'instantané d'aujourd'hui.
   C'est exactement la situation d'un site fraîchement redéployé. */
const HIER = new Date(Date.now() - 86400e3).toISOString();
/* et une photo publiée après le déploiement, comme celles des Açores */
const DEMAIN = new Date(Date.now() + 3600e3).toISOString();
const PHOTOS_BASE = [
  { dish_id: 'bouillabaisse', path: 'bouillabaisse-1.jpg', credit: 'Georges', updated_at: HIER },
  { dish_id: 'cassoulet', path: 'cassoulet-1.jpg', credit: 'Georges', updated_at: DEMAIN }
];
let calls = [], VERSION = HIER;
function fakeSupabase(url) {
  calls.push(url);
  const json = v => Promise.resolve({ ok: true, json: () => Promise.resolve(v), text: () => Promise.resolve('') });
  if (url.includes('atlas_content_version')) return json([{ updated_at: VERSION }]);
  if (url.includes('atlas_dish_photos')) {
    // on respecte le filtre updated_at=gt.… comme le ferait PostgREST
    const m = decodeURIComponent(url).match(/updated_at=gt\.([^&]+)/);
    const rows = m ? PHOTOS_BASE.filter(p => new Date(p.updated_at) > new Date(m[1])) : PHOTOS_BASE;
    return json(rows);
  }
  if (url.includes('atlas_dishes')) return json([]);
  if (url.includes('atlas_dish_texts')) return json([]);
  return json([]);
}

async function boot(withSnapshotPhotos) {
  calls = [];
  const dom = await JSDOM.fromURL(BASE, {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
    beforeParse(window) {
      window.fetch = (u, o) => {
        const s = String(u);
        if (s.includes('//fausse-base')) return fakeSupabase(s);
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
  await new Promise(r => setTimeout(r, 2200));
  w.SUPA = { url: 'https://fausse-base', anonKey: 'eyJfaux' };
  if (withSnapshotPhotos) {
    // simule un instantané construit avec la base sous la main
    w.eval(`PHOTOS_IN_SNAPSHOT = true;
      DB_PHOTO['bouillabaisse'] = { url: 'https://fausse-base/instantane.jpg', credit: 'Georges' };`);
  }
  return w;
}

/* ---------- 1. instantané sans photos (base injoignable au build) ---------- */
{
  VERSION = HIER;               // rien n'a bougé depuis le déploiement
  const w = await boot(false);
  const snap = w.eval('SNAPSHOT');
  check(new Date(snap) > new Date(HIER),
    'cas reproduit : l’instantané est plus récent que la photo publiée',
    `instantané ${String(snap).slice(0, 10)} · photo ${HIER.slice(0, 10)}`);

  await w.syncFromDB('fr');
  const db = w.eval('DB_PHOTO');
  check(!!db['bouillabaisse'], 'la photo publiée est retrouvée malgré le raccourci de synchronisation');
  check(String(db['bouillabaisse'] && db['bouillabaisse'].url).includes('atlas-photos/bouillabaisse-1.jpg'),
    'son adresse publique est correcte', db['bouillabaisse'] ? db['bouillabaisse'].url : '');
  check(db['bouillabaisse'] && db['bouillabaisse'].credit === 'Georges', 'le crédit est conservé');

  // le raccourci fonctionne toujours pour le reste : on ne retélécharge pas les fiches
  check(!calls.some(u => u.includes('atlas_dishes')),
    'les fiches ne sont pas retéléchargées inutilement');
  check(calls.some(u => u.includes('atlas_dish_photos')), 'les photos, elles, sont demandées');
  w.close();
}

/* ---------- 2. photo publiée APRÈS le dernier déploiement ----------
   Le défaut : l'instantané contenait déjà des photos, la synchronisation
   en concluait qu'il n'y avait rien à demander, et toute photo ajoutée
   ensuite restait invisible jusqu'au déploiement suivant. */
{
  VERSION = DEMAIN;             // une photo vient d'être publiée
  const w = await boot(true);
  calls = [];
  await w.syncFromDB('fr');
  const db = w.eval('DB_PHOTO');
  check(!!db['cassoulet'],
    'une photo publiée après le déploiement s’affiche sans attendre le suivant');
  check(String(db['cassoulet'] && db['cassoulet'].url).includes('atlas-photos/cassoulet-1.jpg'),
    'son adresse publique est correcte', db['cassoulet'] ? db['cassoulet'].url : '');
  check(!!db['bouillabaisse'], 'les photos déjà dans l’instantané sont conservées');
  check(calls.some(u => /atlas_dish_photos.*updated_at=gt\./.test(u)),
    'et l’on ne redemande que les nouveautés, pas toute la liste');
  w.close();
}

/* ---------- 3. hors ligne : rien ne casse ---------- */
{
  VERSION = HIER;
  const w = await boot(false);
  w.SUPA = { url: '', anonKey: '' };
  const r = await w.syncFromDB('fr');
  check(r && r.changed === 0, 'sans base configurée, la synchronisation ne fait rien de mal');
  w.close();
}

for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
process.exit(errors.length ? 1 : 0);
