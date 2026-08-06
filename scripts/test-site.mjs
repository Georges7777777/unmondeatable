/* ============================================================
   test-site.mjs — vérifie que le site publié fonctionne :
   chargement des données, rendu du globe, ouverture des fiches,
   changement de langue, pages légales, signature.

   Nécessite un serveur local sur le dossier public/.
   ============================================================ */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const BASE = process.env.BASE || 'http://localhost:8099/';
const errors = [];
const ok = [];

const dom = await JSDOM.fromURL(BASE, {
  runScripts: 'dangerously',
  resources: 'usable',
  pretendToBeVisual: true,
  beforeParse(window) {
    window.fetch = (u, o) => fetch(new URL(u, BASE).href, o);
    let store = {};
    Object.defineProperty(window, 'localStorage', { value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }, clear: () => { store = {}; }
    }});
    const stub = new Proxy({}, { get(_, k) {
      if (k === 'measureText') return () => ({ width: 40 });
      if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => ({ addColorStop() {} });
      if (k === 'getImageData') return () => ({ data: [] });
      if (k === 'canvas') return { width: 1200, height: 800 };
      return () => {};
    }, set() { return true; } });
    window.HTMLCanvasElement.prototype.getContext = () => stub;
    window.requestAnimationFrame = cb => setTimeout(cb, 16);
    window.cancelAnimationFrame = id => clearTimeout(id);
    window.addEventListener('error', e => errors.push((e.error && e.error.stack) || e.message));
    window.addEventListener('unhandledrejection', e => errors.push('promesse: ' + e.reason));
  }
});

const w = dom.window;
const wait = ms => new Promise(r => setTimeout(r, ms));
await wait(4000);

function check(label, cond, extra = '') {
  (cond ? ok : errors).push(`${cond ? '✓' : '✗'} ${label}${extra ? ' — ' + extra : ''}`);
}

// --- données ---
const attendu = JSON.parse(await (await fetch(new URL('data/core.json', BASE))).text()).count;
const n = w.eval('typeof DISHES !== "undefined" ? DISHES.length : 0');
// le nombre grandit à chaque lot : on vérifie qu'il correspond à l'instantané
check('toutes les fiches de l’instantané sont chargées', n === attendu, `${n} / ${attendu}`);
check('ingrédients chargés', w.eval('Object.keys(ING).length') > 600);
check('carte chargée', w.eval('typeof GEO_COAST !== "undefined" && GEO_COAST.length') > 1000);
check('écran de chargement retiré', !w.document.body.classList.contains('booting'));

// --- regroupement par ville ---
check('villes regroupées', w.eval('Object.keys(CITY).length') > 300);
check('aucune fiche perdue',
  w.eval('(()=>{const r=new Set(Object.keys(CITY));return DISHES.filter(d=>!r.has(d.id)).every(d=>siblingsOf(d).length>0)})()'));

// --- ouverture des fiches ---
let bad = 0;
for (const id of w.eval('DISHES.map(d=>d.id)')) {
  try { w.eval(`select(${JSON.stringify(id)})`); } catch (e) { bad++; }
}
check('toutes les fiches s’ouvrent', bad === 0, bad + ' échec(s)');
check('recette affichée', /(<li>)/.test(w.document.querySelector('#panel').innerHTML));

// --- recherche ---
w.eval('runSearch("pizza")');
check('recherche opérationnelle', w.document.querySelectorAll('#results button[data-go]').length > 0);

// --- changement de langue (téléchargement à la demande) ---
await w.eval('setLang("en")');
await wait(600);
check('bascule en anglais', w.eval('state.lang') === 'en' && w.eval('LOADED.en') === true);
check('textes anglais présents', /^[A-Za-z]/.test(w.eval('DISHES[0].n.en') || ''));
await w.eval('setLang("fr")');

// --- administration invisible pour le visiteur ---
w.eval("select('pizza-napoletana')");
check('bouton photo caché au public', !w.document.querySelector('#photoBtn'));
check('bouton édition caché au public', !w.document.querySelector('#editDish'));
check('mode admin désactivé par défaut', w.eval('IS_ADMIN') === false);

// --- nom et sous-titre ---
check('titre = Un monde à table',
  w.document.querySelector('#t1').textContent.trim() + ' ' + w.document.querySelector('#t2').textContent.trim() === 'Un monde à table',
  w.document.querySelector('#t1').textContent + ' ' + w.document.querySelector('#t2').textContent);
check('sous-titre = Le Goût du Monde', w.document.querySelector('#tag').textContent.trim() === 'Le Goût du Monde');
check('plus de « Atlas des saveurs »', !/Atlas des saveurs/.test(w.document.body.innerHTML));
check('le site ne propose que le français et l’anglais',
  w.eval('LANGS').join(',') === 'fr,en' && w.document.querySelectorAll('.langs button').length === 2,
  w.eval('LANGS').join(', '));
await w.eval('setLang("fr")'); await wait(200);

// --- signature et mentions ---
const sig = w.document.querySelector('.signature');
check('signature affichée', !!sig && /Made in France/.test(sig.textContent), sig ? sig.textContent.trim() : 'absente');
check('lien mentions légales', !!w.document.querySelector('a[href="mentions-legales.html"]'));
check('lien confidentialité', !!w.document.querySelector('a[href="confidentialite.html"]'));
check('copyright affiché', /©/.test(w.document.querySelector('footer.legal').textContent));

// --- pages légales ---
for (const page of ['mentions-legales.html', 'confidentialite.html']) {
  const r = await fetch(BASE + page);
  const html = await r.text();
  check(`page ${page}`, r.ok && html.includes('Georges Viana'));
}

// --- interface d'administration (forcée pour le test) ---
w.eval('IS_ADMIN = true; adminBar();');
w.eval("select('pizza-napoletana')");
check('barre admin affichée', !!w.document.querySelector('.adminbar'));
check('bouton photo visible en admin', !!w.document.querySelector('#photoBtn'));
check('bouton édition visible en admin', !!w.document.querySelector('#editDish'));
w.eval("openEditor(DISHES.find(d=>d.id==='pizza-napoletana'))");
const form = w.document.querySelector('.modal form');
check('formulaire d’édition s’ouvre', !!form);
check('champs pré-remplis', !!form && form.elements.name.value.length > 0 && form.elements.steps.value.split('\n').length === 5);
w.document.querySelector('.modal').remove();
w.eval('IS_ADMIN = false;');

console.log(ok.join('\n'));
if (errors.length) { console.log('\nPROBLÈMES :\n' + errors.join('\n')); process.exit(1); }
console.log('\nTout est vert.');
process.exit(0);
