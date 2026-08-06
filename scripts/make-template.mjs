/* ============================================================
   make-template.mjs — produit le modèle Excel vierge.

   On fait tourner le code du site lui-même : le fichier livré est
   donc rigoureusement celui que produit le bouton « Modèle » de
   l'administration, sans risque de divergence.

   Usage : node scripts/make-template.mjs [chemin de sortie]
   Nécessite un serveur local sur public/ (port 8099).
   ============================================================ */
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const BASE = process.env.BASE || 'http://localhost:8099/';
const OUT = process.argv[2] || 'un-monde-a-table-modele.xlsx';

const dom = await JSDOM.fromURL(BASE, {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    window.fetch = (u, o) => fetch(new URL(u, BASE).href, o);
    let store = {};
    Object.defineProperty(window, 'localStorage', { value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }, clear: () => { store = {}; }
    }});
    window.CompressionStream = CompressionStream;
    window.DecompressionStream = DecompressionStream;
    window.matchMedia = q => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
    const stub = new Proxy({}, { get(_, k) {
      if (k === 'measureText') return () => ({ width: 40 });
      if (/Gradient$/.test(k)) return () => ({ addColorStop() { } });
      return () => { };
    } });
    window.HTMLCanvasElement.prototype.getContext = () => stub;
    window.Element.prototype.getBoundingClientRect = () =>
      ({ width: 900, height: 700, left: 0, top: 0, right: 900, bottom: 700, x: 0, y: 0 });
    window.ResizeObserver = class { observe() { } disconnect() { } };
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r, { once: true }));
await new Promise(r => setTimeout(r, 2500));
w.eval(await (await fetch(new URL('assets/admin-tools.js', BASE))).text());

const G = n => w.eval(n);
for (const l of G('LANGS')) if (!G('LOADED')[l]) await w.loadLang(l);
const DISHES = G('DISHES'), ING = G('ING');

// une seule recette d'exemple : le modèle doit rester léger et lisible
const model = DISHES.find(d => d.id === 'bouillabaisse') || DISHES[0];
const bytes = await w.xlsxWrite(w.rxBuildWorkbook([model], ING));
fs.writeFileSync(OUT, Buffer.from(bytes));
console.log(`${OUT} — ${(bytes.length / 1024).toFixed(0)} Ko · 1 recette d’exemple · ${Object.keys(ING).length} ingrédients au lexique`);
dom.window.close();
process.exit(0);
