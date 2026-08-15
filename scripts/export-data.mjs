/* ============================================================
   export-data.mjs — extrait les fiches des fichiers source
   (d1.js … d39.js) vers des instantanés JSON.

   Découpage volontaire :
     core.json    → géométrie, tags, ingrédients, illustration
     lang/xx.json → tous les textes d'une seule langue

   Un visiteur ne télécharge que le socle + sa langue (~130 Ko
   compressés au lieu de 446), ce qui change tout sur mobile.
   Les autres langues sont chargées à la demande.

   Usage : node scripts/export-data.mjs
   ============================================================ */
import { fichiersDonnees } from './fichiers-donnees.mjs';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(HERE, '../../src');  // fiches d'origine (hors paquet publié)
const OUT = path.resolve(HERE, '../public/data');
const LANGS = ['fr', 'en'];

if (!fs.existsSync(SRC)) {
  console.error('Sources introuvables :', SRC);
  process.exit(1);
}

const files = ['lexicon.js', 'wiki.js'];
/* Les fichiers de données sont découverts, non énumérés : ajouter un
   d59.js ne doit pas obliger à corriger trois scripts. L'ordre reste
   numérique — c'est lui qui décide quelle fiche l'emporte quand deux
   points se superposent. */
for (const f of fichiersDonnees(SRC)) files.push(f);
let code = '';
for (const f of files) code += fs.readFileSync(path.join(SRC, f), 'utf8') + '\n';
const { DISHES, ING, WIKI } = new Function(code + '\n return { DISHES, ING, WIKI };')();

fs.mkdirSync(path.join(OUT, 'lang'), { recursive: true });
const version = new Date().toISOString();

/* ---- socle : tout sauf les textes ---- */
const core = {
  version,
  count: DISHES.length,
  dishes: DISHES.map((d, i) => ({
    id: d.id, c: d.c, lat: d.lat, lon: d.lon,
    base: d.base, prep: d.prep, cook: d.cook, diff: d.diff,
    tags: d.tags, art: d.art, i: d.i, rank: i,
    wiki: WIKI[d.id] || null
  })),
  ingredients: ING
};
write('core.json', core);

/* ---- un fichier de textes par langue ---- */
for (const l of LANGS) {
  const pack = { version, lang: l, texts: {} };
  for (const d of DISHES) pack.texts[d.id] = { n: d.n[l], p: d.p[l], d: d.d[l], s: d.s[l] };
  write(`lang/${l}.json`, pack);
}

function write(rel, obj) {
  const file = path.join(OUT, rel);
  const json = JSON.stringify(obj);
  fs.writeFileSync(file, json);
  const raw = (Buffer.byteLength(json) / 1024).toFixed(0);
  const gz = (zlib.gzipSync(Buffer.from(json)).length / 1024).toFixed(0);
  console.log(`  ${rel.padEnd(16)} ${raw.padStart(5)} Ko   →  ${gz.padStart(4)} Ko compressés`);
}

console.log(`\n${DISHES.length} fiches · ${Object.keys(ING).length} ingrédients · version ${version}`);
const gzCore = zlib.gzipSync(fs.readFileSync(path.join(OUT, 'core.json'))).length;
const gzFr = zlib.gzipSync(fs.readFileSync(path.join(OUT, 'lang/fr.json'))).length;
console.log(`Premier chargement d'un visiteur francophone : ${((gzCore + gzFr) / 1024).toFixed(0)} Ko`);
