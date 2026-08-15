/* ============================================================
   test-fiches.mjs — une fiche incomplète doit quand même s'ouvrir.

   Le symptôme constaté en production : on clique sur certains points
   et il ne se passe rien — la fiche précédente reste affichée. La
   cause n'était pas le clic mais le rendu : le panneau n'est réécrit
   qu'à la toute fin de renderDish, si bien qu'une exception en cours
   de route laissait l'ancien contenu en place, sans le moindre signe.

   Trois données peuvent manquer sur une fiche venue de la base ou
   d'un import Excel, et chacune faisait échouer le rendu :
     • aucun texte dans la langue affichée   → d.s[lang].map
     • aucune illustration décrite            → art.food[0]
     • un ingrédient absent du lexique        → ING[id][L()]

   Le test rejoue ces trois cas en abîmant les données à la volée,
   puis vérifie que la fiche demandée s'affiche bien.

   Nécessite un serveur local sur le dossier public/ (port 8099).
   ============================================================ */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const BASE = process.env.BASE || 'http://localhost:8099/';
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

/* les identifiants abîmés sont choisis après lecture des données */
let SANS_TEXTE = null, SANS_ART = null, INGREDIENT_INCONNU = null;

const dom = await JSDOM.fromURL(BASE, {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    /* On intercepte les données comme le ferait la base : quelques
       fiches arrivent amputées, exactement comme en production. */
    const reponse = obj => ({ ok: true, status: 200, json: async () => obj, text: async () => JSON.stringify(obj) });
    window.fetch = async (u, o) => {
      const url = new URL(u, BASE).href;
      const r = await fetch(url, o);
      if (/data\/core\.json$/.test(url)) {
        const core = await r.json();
        const d = core.dishes;
        SANS_TEXTE = d[10].id;
        SANS_ART = d[20].id;
        INGREDIENT_INCONNU = d[30].id;
        delete d[20].art;                                   // plus d'illustration
        d[30].i = [['ingredient_jamais_vu', 200, 'g']];     // hors lexique
        return reponse(core);
      }
      if (/data\/lang\/fr\.json$/.test(url)) {
        const pack = await r.json();
        delete pack.texts[SANS_TEXTE];                      // pas traduite
        return reponse(pack);
      }
      return r;
    };
    let store = {};
    Object.defineProperty(window, 'localStorage', { value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }, clear: () => { store = {}; }
    }});
    window.matchMedia = q => ({ matches: false, media: q, addListener() {}, removeListener() {},
      addEventListener() {}, removeEventListener() {} });
    const stub = new Proxy({}, { get(_, k) {
      if (k === 'measureText') return () => ({ width: 40 });
      if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => ({ addColorStop() {} });
      if (k === 'setTransform') return () => {};
      return () => {};
    }});
    window.HTMLCanvasElement.prototype.getContext = () => stub;
    window.Element.prototype.getBoundingClientRect = function () {
      if (this.id === 'globe') return { width: 900, height: 700, left: 0, top: 0, right: 900, bottom: 700, x: 0, y: 0 };
      return { width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0 };
    };
    window.ResizeObserver = class { observe() {} disconnect() {} };
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r, { once: true }));
await new Promise(r => setTimeout(r, 2500));
const $ = s => w.document.querySelector(s);

const titre = () => { const h = $('#panel h2'); return h ? h.textContent.trim() : ''; };

/* On ouvre d'abord une fiche saine : c'est elle qui resterait affichée
   si le rendu de la suivante échouait. */
const TEMOIN = 'bouillabaisse';
w.select(TEMOIN);
const titreTemoin = titre();
check(titreTemoin.length > 0, 'une fiche complète s’ouvre', titreTemoin);

for (const [id, cas] of [[SANS_TEXTE, 'sans texte dans la langue affichée'],
                         [SANS_ART, 'sans illustration décrite'],
                         [INGREDIENT_INCONNU, 'avec un ingrédient hors lexique']]) {
  w.select(TEMOIN);
  let boum = null;
  try { w.select(id); } catch (e) { boum = e; }
  const t = titre();
  check(!boum, `aucune exception — fiche ${cas}`, boum ? String(boum.message) : '');
  check(t !== titreTemoin && t.length > 0,
    `le panneau change bien de fiche — ${cas}`, `« ${t} »`);
}

/* le repli de langue montre l'anglais plutôt que rien */
w.select(SANS_TEXTE);
check(!/^\s*$/.test($('#panel .desc') ? $('#panel .desc').textContent : ''),
  'une fiche non traduite s’affiche dans l’autre langue');

/* l'ingrédient inconnu est nommé, pas escamoté */
w.select(INGREDIENT_INCONNU);
const ing = $('#ilist') ? $('#ilist').textContent : '';
check(/ingredient jamais vu/.test(ing),
  'un ingrédient hors lexique garde un libellé lisible', ing.trim().slice(0, 60));

ok.forEach(l => console.log('✓ ' + l));
errors.forEach(l => console.log('✗ ' + l));
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
dom.window.close();
process.exit(errors.length ? 1 : 0);
