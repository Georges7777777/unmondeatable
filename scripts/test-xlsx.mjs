/* ============================================================
   test-xlsx.mjs — vérifie l'aller-retour tableur.

     1. le classeur écrit est un vrai .xlsx (relu par openpyxl)
     2. les 400 fiches survivent à l'export puis au réimport,
        sans perte ni déformation
     3. réimporter le même fichier ne crée aucun doublon
     4. les lignes incomplètes sont refusées, pas avalées
     5. une recette écrite à la main s'importe correctement

   Nécessite un serveur local sur public/ (port 8099).
   ============================================================ */
import fs from 'node:fs';
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
    window.fetch = (u, o) => fetch(new URL(u, BASE).href, o);
    let store = {};
    Object.defineProperty(window, 'localStorage', { value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }, clear: () => { store = {}; }
    }});
    // jsdom n'implémente pas les flux de compression : on prête ceux de Node
    window.CompressionStream = CompressionStream;
    window.DecompressionStream = DecompressionStream;
    window.matchMedia = q => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {} });
    const stub = new Proxy({}, { get(_, k) {
      if (k === 'measureText') return () => ({ width: 40 });
      if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => ({ addColorStop() {} });
      return () => {};
    }});
    window.HTMLCanvasElement.prototype.getContext = () => stub;
    window.Element.prototype.getBoundingClientRect = function () {
      return this.id === 'globe'
        ? { width: 900, height: 700, left: 0, top: 0, right: 900, bottom: 700, x: 0, y: 0 }
        : { width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0 };
    };
    window.ResizeObserver = class { observe() {} disconnect() {} };
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r, { once: true }));
await new Promise(r => setTimeout(r, 2500));

// les outils tableur sont chargés à la demande : on les injecte comme le fait
// la barre d'administration
const tools = await (await fetch(new URL('assets/admin-tools.js', BASE))).text();
w.eval(tools);
check(typeof w.xlsxWrite === 'function' && typeof w.rxBuildWorkbook === 'function',
  'les outils tableur se chargent à la demande');

// `const` et `let` de haut niveau ne sont pas des propriétés de window :
// on passe par l'évaluation pour les atteindre
const G = n => w.eval(n);
const LANGS = G('LANGS');

// toutes les langues, comme le fait l'export
for (const l of LANGS) if (!G('LOADED')[l]) await w.loadLang(l);
const DISHES = G('DISHES'), ING = G('ING');
check(DISHES.length >= 400, 'les fiches sont chargées', DISHES.length + ' fiches');

/* ---------- 1. écriture d'un vrai classeur ---------- */
const sheets = w.rxBuildWorkbook(DISHES, ING);
const bytes = await w.xlsxWrite(sheets);
const file = '/tmp/atlas-test.xlsx';
fs.writeFileSync(file, Buffer.from(bytes));
check(bytes.length > 20000, 'le classeur est écrit', (bytes.length / 1024).toFixed(0) + ' Ko');

/* ---------- 2. aller-retour complet ---------- */
const back = await w.xlsxRead(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
check(!!back['Recettes'] && back['Recettes'].length === DISHES.length + 1,
  'toutes les lignes sont relues', `${(back['Recettes'] || []).length - 1} / ${DISHES.length}`);
check(!!back['Ingrédients'] && back['Ingrédients'].length === Object.keys(ING).length + 1,
  'le lexique est relu', `${(back['Ingrédients'] || []).length - 1} / ${Object.keys(ING).length}`);

const existing = Object.fromEntries(DISHES.map(d => [d.id, d]));
const res = w.rxParseWorkbook(back, existing, ING);
check(!res.error, 'le classeur relu est accepté', res.error || '');
check(res.counts.rejetees === 0, 'aucune ligne refusée', `${res.counts.rejetees} refus`);
check(res.counts.nouvelles === 0 && res.counts.existantes === DISHES.length,
  'réimporter le même fichier ne crée aucun doublon',
  `${res.counts.nouvelles} nouvelle(s), ${res.counts.existantes} reconnue(s)`);
check(Object.keys(res.newIngredients).length === 0,
  'aucun ingrédient inventé au passage', Object.keys(res.newIngredients).slice(0, 5).join(', '));

/* fidélité champ par champ */
const byId = Object.fromEntries(res.records.map(r => [r.id, r]));
let bad = [], badIng = [], badSteps = [];
for (const d of DISHES) {
  const r = byId[d.id];
  if (!r) { bad.push(d.id + ' : absent'); continue; }
  if (r.continent !== d.c) bad.push(d.id + ' : continent');
  if (Math.abs(r.lat - d.lat) > 1e-6 || Math.abs(r.lon - d.lon) > 1e-6) bad.push(d.id + ' : position');
  if (r.base !== d.base || r.prep !== d.prep || r.cook !== d.cook || r.diff !== d.diff) bad.push(d.id + ' : durées');
  if (r.tags.join(',') !== (d.tags || []).join(',')) bad.push(d.id + ' : étiquettes');
  for (const l of LANGS) {
    if (r.texts[l].name !== d.n[l] || r.texts[l].place !== d.p[l] || r.texts[l].description !== d.d[l])
      bad.push(d.id + ' : texte ' + l);
    if (r.texts[l].steps.join('|') !== (d.s[l] || []).join('|')) badSteps.push(d.id + '/' + l);
  }
  const a = (d.i || []).map(t => t[0] + ':' + (t[1] == null ? '' : t[1]) + ':' + (t[1] == null ? '' : t[2])).join(' ');
  const b = r.ingredients.map(t => t[0] + ':' + (t[1] == null ? '' : t[1]) + ':' + (t[1] == null ? '' : t[2])).join(' ');
  if (a !== b) badIng.push(d.id);
}
check(bad.length === 0, 'toutes les données non textuelles sont fidèles', bad.slice(0, 4).join(' · '));
check(badSteps.length === 0, 'les étapes reviennent intactes dans les deux langues', badSteps.slice(0, 4).join(' · '));
check(badIng.length === 0, 'les ingrédients reviennent intacts (quantité, unité, identifiant)',
  badIng.length ? `${badIng.length} fiche(s) : ${badIng.slice(0, 4).join(', ')}` : '');

/* ---------- 3. lecture par un autre logiciel ---------- */
const { execFileSync } = await import('node:child_process');
let py = '';
try {
  py = execFileSync('python3', ['-c', `
import openpyxl, json
wb = openpyxl.load_workbook(${JSON.stringify(file)})
ws = wb["Recettes"]
print(json.dumps({
  "feuilles": wb.sheetnames,
  "lignes": ws.max_row,
  "colonnes": ws.max_column,
  "entete": [c.value for c in ws[1]][:3],
  "b2": ws.cell(row=2, column=10).value
}, ensure_ascii=False))`], { encoding: 'utf8' });
} catch (e) { py = ''; }
if (py) {
  const j = JSON.parse(py);
  check(j.feuilles.join(',') === 'Notice,Recettes,Ingrédients,Listes',
    'un autre tableur voit les 4 feuilles', j.feuilles.join(', '));
  check(j.lignes === DISHES.length + 1 && j.colonnes >= 21,
    'il voit toutes les lignes et colonnes', `${j.lignes} lignes × ${j.colonnes} colonnes`);
  check(typeof j.b2 === 'string' && j.b2.length > 0, 'les accents et le texte sont lisibles', String(j.b2));
} else {
  check(false, 'relecture par openpyxl (contrôle indépendant)', 'python3/openpyxl indisponible');
}

/* ---------- 4. lignes incomplètes et nouvelles recettes ---------- */
{
  const head = back['Recettes'][0];
  const col = label => head.findIndex(h => String(h).toLowerCase() === label.toLowerCase());
  const blank = () => new Array(head.length).fill('');

  // une recette écrite à la main, entièrement nouvelle
  const good = blank();
  good[col('identifiant')] = '';
  good[col('continent')] = 'Europe';
  good[col('latitude')] = '48,8566';        // virgule décimale, comme dans Excel FR
  good[col('longitude')] = '2.3522';
  good[col('personnes')] = '4';
  good[col('préparation (min)')] = '20';
  good[col('cuisson (min)')] = '35';
  good[col('difficulté')] = '2';
  good[col('étiquettes')] = 'comfort, sunday';
  for (const [l, v] of [['FR', 'Gratin de courge'], ['EN', 'Squash gratin']])
    good[col('nom ' + l)] = v;
  for (const l of ['FR', 'EN']) {
    good[col('lieu ' + l)] = 'Paris, France';
    good[col('description ' + l)] = 'Un gratin de saison, doux et doré.';
    good[col('étapes ' + l)] = 'Émincer la courge.\nCuire au four 35 minutes.';
  }
  good[col('ingrédients')] = '800 g courge\n2 gousses ail\n20 cl crème\n6 c. à soupe huile d’olive\nsel\n3 pommes de terre';

  // une ligne à laquelle il manque l'anglais
  const partial = good.slice();
  partial[col('nom EN')] = '';
  partial[col('nom FR')] = 'Tarte aux poires';

  const sheets2 = { Recettes: [head, good, partial], 'Ingrédients': back['Ingrédients'] };
  const r2 = w.rxParseWorkbook(sheets2, existing, ING);

  check(r2.counts.nouvelles === 1 && r2.counts.rejetees === 1,
    'une ligne incomplète est refusée, la bonne passe',
    `${r2.counts.nouvelles} acceptée(s), ${r2.counts.rejetees} refusée(s)`);
  const rec = r2.records[0];
  check(rec.id === 'gratin-de-courge', 'l’identifiant est déduit du nom français', rec.id);
  check(Math.abs(rec.lat - 48.8566) < 1e-9 && Math.abs(rec.lon - 2.3522) < 1e-9,
    'la virgule décimale d’Excel est comprise', `${rec.lat} / ${rec.lon}`);
  check(rec.continent === 'eu' && rec.tags.join(',') === 'comfort,sunday',
    'continent en toutes lettres et étiquettes reconnus', `${rec.continent} · ${rec.tags.join(', ')}`);

  const ing = Object.fromEntries(rec.ingredients.map(t => [t[0], t]));
  const g = rec.ingredients;
  check(g[0][1] === 800 && g[0][2] === 'g', 'quantité et unité simples', JSON.stringify(g[0]));
  check(g[1][2] === 'clove' && g[1][1] === 2, 'unité au pluriel reconnue (gousses)', JSON.stringify(g[1]));
  check(g[3][2] === 'tbsp', 'unité en plusieurs mots reconnue (c. à soupe)', JSON.stringify(g[3]));
  check(g[4][1] === null && g[4][2] === '', 'ingrédient sans quantité (sel)', JSON.stringify(g[4]));
  check(g[5][2] === 'pc' && g[5][1] === 3, 'quantité sans unité = à l’unité', JSON.stringify(g[5]));
  const known = g.filter(t => ING[t[0]]).length;
  check(known >= 4, 'les ingrédients connus sont rattachés au lexique, pas recréés',
    `${known} / ${g.length} reconnus`);
  check(rec.art && rec.art.style, 'une illustration est composée pour la nouvelle fiche',
    rec.art ? rec.art.v + '/' + rec.art.style : '');

  // le même fichier réimporté une seconde fois : la fiche est vue comme existante
  const existing2 = Object.assign({}, existing, { 'gratin-de-courge': { id: 'gratin-de-courge' } });
  const r3 = w.rxParseWorkbook(sheets2, existing2, ING);
  check(r3.counts.nouvelles === 0 && r3.counts.existantes === 1,
    'réimporter une recette déjà ajoutée la signale comme existante, sans doublon');
}

/* ---------- rapport ---------- */
for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
dom.window.close();
process.exit(errors.length ? 1 : 0);
