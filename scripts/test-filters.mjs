/* ============================================================
   test-filters.mjs — le panneau de filtres.

   Trois choses à ne pas se tromper :
   — les exclusions retirent, les inclusions cumulent (bœuf OU
     volaille, jamais bœuf ET volaille) ;
   — un bouillon de volaille ne fait pas d'un plat un plat de
     volaille, mais il l'empêche d'être « sans viande » ;
   — les compteurs annoncent ce que la case donnerait vraiment.

   Nécessite un serveur local sur public/ (port 8099).
   ============================================================ */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const BASE = process.env.BASE || 'http://localhost:8099/';
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

const dom = await JSDOM.fromURL(BASE, {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    window.fetch = (u, o) => {
      const s = String(u);
      if (/wikipedia\.org|wikimedia\.org/.test(s))
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ query: { pages: { '-1': { missing: '' } } } }) });
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
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r, { once: true }));
await new Promise(r => setTimeout(r, 2500));

const G = n => w.eval(n);
const total = G('DISHES.length');
const marks = () => G('globe.markers.length');
const set = js => { w.eval(`state.filters = emptyFilters(); ${js}; applyFilters();`); };

/* ---------- l'ancien Atlas a bien disparu ---------- */
check(!w.document.querySelector('#atlas'), 'le bouton Atlas mondial n’existe plus');
check(G('typeof ATLAS') === 'undefined', 'la couche Wikidata n’est plus chargée');
check(G('typeof loadAtlas') === 'undefined', 'ses fonctions ne sont plus embarquées');

/* ---------- le panneau ---------- */
check(!!w.document.querySelector('#filterBtn'), 'le bouton Filtres est présent');
check(!w.document.querySelector('#filterPanel').classList.contains('open'),
  'le panneau est replié au départ');
w.eval('toggleFilters(true)');
check(w.document.querySelector('#filterPanel').classList.contains('open'), 'il s’ouvre au clic');
check(w.document.querySelectorAll('.fchip').length >= 25,
  'toutes les cases sont dessinées', w.document.querySelectorAll('.fchip').length + ' cases');

/* ---------- on doit pouvoir refermer le panneau ----------
   Il flottait à une hauteur fixe et recouvrait son propre bouton dès
   que la barre des continents passait à deux lignes : ouvert, il ne se
   refermait plus. */
const panneau = w.document.querySelector('#filterPanel');
const bouton = w.document.querySelector('#filterBtn');
check(panneau.parentElement === bouton.closest('.mapctl'),
  'barre et panneau appartiennent au même bloc');
check(panneau.previousElementSibling === w.document.querySelector('.continents'),
  'le panneau suit les puces dans le flux, il ne flotte pas par-dessus');

w.eval('toggleFilters(true)');
bouton.click();
check(!w.eval('filtersOpen()'), 'un second clic sur Filtres referme le panneau');

w.eval('toggleFilters(true)');
w.document.querySelector('#fclose').click();
check(!w.eval('filtersOpen()'), 'la croix du panneau le referme');

w.eval('toggleFilters(true)');
w.document.querySelector('#globe').dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
check(!w.eval('filtersOpen()'), 'toucher le globe le referme');

w.eval('toggleFilters(true)');
w.document.querySelector('.fchip').dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
check(w.eval('filtersOpen()'), 'mais cliquer une case ne le referme pas');

w.eval('toggleFilters(true)');
w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
check(!w.eval('filtersOpen()'), 'la touche Échap le referme');

w.eval(`state.filters = emptyFilters(); applyFilters(); toggleFilters(false);`);

/* ---------- exclusions ---------- */
check(marks() === total, 'sans filtre, toutes les fiches restent', `${marks()} / ${total}`);

set(`state.filters.without.add('meat')`);
const sansViande = marks();
check(sansViande > 0 && sansViande < total, 'sans viande retire des fiches', sansViande + ' restantes');
check(G(`DISHES.filter(d => matchFilters(d, state.filters)).every(d => {
  const g = groupsOf(d);
  return !['pork','beef','poultry','lamb','game','rabbit','meat_trace'].some(x => g.has(x));
})`), 'et n’en laisse passer aucune qui contienne de la viande');

/* un bouillon de volaille est un piège : invisible, mais décisif */
check(G(`(() => {
  const d = DISHES.find(x => x.i.some(([i]) => i === 'chicken_stock' || i === 'chicken_broth')
    && !groupsOf(x).has('poultry'));
  if (!d) return true;
  const f = emptyFilters(); f.without.add('meat');
  return !matchFilters(d, f);
})()`), 'un plat au bouillon de volaille n’est pas « sans viande »');

check(G(`(() => {
  const d = DISHES.find(x => x.i.some(([i]) => i === 'chicken_stock') && !groupsOf(x).has('poultry'));
  if (!d) return true;
  const f = emptyFilters(); f.groups.add('poultry');
  return !matchFilters(d, f);
})()`), 'mais il ne compte pas non plus comme plat de volaille');

set(`state.filters.without.add('pork')`);
check(G(`DISHES.filter(d => matchFilters(d, state.filters)).every(d => !groupsOf(d).has('pork'))`),
  'sans porc écarte bien la charcuterie', marks() + ' restantes');

/* ---------- inclusions : cumul, pas intersection ---------- */
set(`state.filters.groups.add('beef')`);
const nBoeuf = marks();
set(`state.filters.groups.add('poultry')`);
const nVolaille = marks();
set(`state.filters.groups.add('beef'); state.filters.groups.add('poultry')`);
const nDeux = marks();
check(nDeux > nBoeuf && nDeux > nVolaille && nDeux <= nBoeuf + nVolaille,
  'cocher bœuf et volaille montre les deux, pas leur intersection',
  `bœuf ${nBoeuf} · volaille ${nVolaille} · les deux ${nDeux}`);

set(`state.filters.groups.add('veg')`);
check(G(`DISHES.filter(d => matchFilters(d, state.filters)).every(d => {
  const g = groupsOf(d);
  return !['pork','beef','poultry','lamb','game','rabbit','meat_trace','fish','seafood','fish_trace'].some(x => g.has(x));
})`), 'la case Végétarien ne laisse ni viande, ni poisson, ni bouillon animal', marks() + ' fiches');

/* ---------- exclusions et inclusions se combinent ---------- */
set(`state.filters.groups.add('beef'); state.filters.groups.add('poultry'); state.filters.without.add('alcohol')`);
check(G(`DISHES.filter(d => matchFilters(d, state.filters)).every(d => {
  const g = groupsOf(d);
  return (g.has('beef') || g.has('poultry')) && !g.has('alcohol');
})`), 'une exclusion s’applique par-dessus les inclusions', marks() + ' fiches');

/* ---------- difficulté, temps, étiquettes ---------- */
set(`state.filters.diff.add('1')`);
check(G(`DISHES.filter(d => matchFilters(d, state.filters)).every(d => d.diff === 1)`),
  'le filtre de difficulté ne garde que le niveau coché', marks() + ' fiches faciles');

set(`state.filters.speed.add('fast')`);
check(G(`DISHES.filter(d => matchFilters(d, state.filters)).every(d => (d.prep + d.cook) <= 45)`),
  'moins de 45 minutes veut dire préparation plus cuisson', marks() + ' fiches');

set(`state.filters.tags.add('festive')`);
check(G(`DISHES.filter(d => matchFilters(d, state.filters)).every(d => d.tags.includes('festive'))`),
  'le filtre par étiquette fonctionne', marks() + ' fiches de fête');

/* ---------- accord avec le filtre par continent ---------- */
w.eval(`setCont('af'); state.filters = emptyFilters(); state.filters.groups.add('fish'); applyFilters();`);
check(G(`globe.markers.every(m => { const d = DISHES.find(x => x.id === m.id); return d.c === 'af' && groupsOf(d).has('fish'); })`),
  'continent et filtres se cumulent', marks() + ' poissons africains');
w.eval(`setCont('all')`);

/* ---------- compteurs ---------- */
set(`state.filters.without.add('meat')`);
const annonce = G(`countFor(DISHES, state.filters, 'groups', 'fish')`);
w.eval(`state.filters.groups.add('fish'); applyFilters();`);
check(annonce === marks(), 'le compteur d’une case annonce exactement ce qu’elle donne',
  `annoncé ${annonce} · obtenu ${marks()}`);

set(`state.filters.without.add('meat'); state.filters.groups.add('pork')`);
const cnt = w.document.querySelector('#count');
check(marks() === 0 && cnt.textContent === G(`t('fNone')`) && cnt.classList.contains('empty'),
  'une combinaison impossible le dit au lieu d’afficher zéro', cnt.textContent);

/* ---------- remise à zéro ---------- */
w.eval('toggleFilters(true)');
w.document.querySelector('#fclear').click();
check(marks() === total, 'le bouton Tout effacer rend toutes les fiches', `${marks()} / ${total}`);
check(G('activeFilterCount()') === 0, 'et remet le compteur du bouton à zéro');

/* ---------- le libellé de la photo ---------- */
check(G(`UI.fr.photoMine`) === 'Générée par IA', 'le crédit d’une photo ajoutée dit « Générée par IA »');
check(G(`UI.en.photoMine`) === 'AI-generated', 'et « AI-generated » en anglais');

for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
dom.window.close();
process.exit(errors.length ? 1 : 0);
