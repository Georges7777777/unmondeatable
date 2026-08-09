/* ============================================================
   check-dishes.mjs — contrôle des fiches sources.

   Une faute de frappe dans un identifiant d'ingrédient ou une
   étiquette ne fait pas échouer la construction : elle produit
   simplement une ligne bizarre sur le site, des mois plus tard.
   Ce script les attrape tout de suite.

   Usage : node scripts/check-dishes.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(HERE, '../../src');
const NB_FILES = 58;

let code = fs.readFileSync(path.join(SRC, 'lexicon.js'), 'utf8') + '\n'
  + fs.readFileSync(path.join(SRC, 'wiki.js'), 'utf8') + '\n';
for (let i = 1; i <= NB_FILES; i++) code += fs.readFileSync(path.join(SRC, `d${i}.js`), 'utf8') + '\n';
const { DISHES, ING } = new Function(code + '\nreturn { DISHES, ING };')();

const i18n = fs.readFileSync(path.resolve(HERE, '../src/engine/i18n.js'), 'utf8');
const { LANGS, UNITS, TAGS } = new Function(i18n + '\nreturn { LANGS, UNITS, TAGS };')();

const VESSELS = ['bowl', 'board', 'plate', 'glass', 'leaf', 'pot'];
const STYLES = ['soup', 'stew', 'flat', 'rice', 'noodle', 'grill', 'roll', 'pastry',
  'fish', 'cake', 'salad', 'skewer', 'drink', 'other'];
const CONTS = ['eu', 'as', 'af', 'na', 'sa', 'oc'];

const errors = [], warnings = [];
const seen = new Map();
const usedIng = new Set();

for (const d of DISHES) {
  const at = m => `${d.id} : ${m}`;

  if (!/^[\p{L}\p{N}_-]+$/u.test(d.id)) errors.push(at('identifiant mal formé'));
  else if (!/^[a-z0-9-]+$/.test(d.id)) warnings.push(at('identifiant avec accent ou majuscule'));
  if (seen.has(d.id)) errors.push(at('identifiant en double')); else seen.set(d.id, d);

  if (!CONTS.includes(d.c)) errors.push(at(`continent inconnu « ${d.c} »`));
  if (!(d.lat >= -90 && d.lat <= 90)) errors.push(at('latitude hors bornes'));
  if (!(d.lon >= -180 && d.lon <= 180)) errors.push(at('longitude hors bornes'));
  if (!(d.base >= 1 && d.base <= 24)) errors.push(at('nombre de personnes invraisemblable'));
  if (!(d.prep >= 0 && d.prep <= 2880)) errors.push(at('temps de préparation invraisemblable'));
  if (!(d.cook >= 0 && d.cook <= 2880)) errors.push(at('temps de cuisson invraisemblable'));
  if (![1, 2, 3].includes(d.diff)) errors.push(at('difficulté hors 1–3'));

  if (!Array.isArray(d.tags) || !d.tags.length) errors.push(at('aucune étiquette'));
  for (const t of d.tags || []) if (!TAGS[t]) errors.push(at(`étiquette inconnue « ${t} »`));
  if ((d.tags || []).length > 4) warnings.push(at(`${d.tags.length} étiquettes (4 s'affichent bien)`));

  if (!d.art || !VESSELS.includes(d.art.v)) errors.push(at(`contenant inconnu « ${d.art && d.art.v} »`));
  if (!d.art || !STYLES.includes(d.art.style)) errors.push(at(`style d'illustration inconnu « ${d.art && d.art.style} »`));
  // les illustrations complètent d'elles-mêmes les teintes manquantes,
  // mais au-delà de quatre les dernières seraient ignorées sans prévenir
  if (d.art && (!Array.isArray(d.art.food) || d.art.food.length < 2 || d.art.food.length > 4))
    errors.push(at('la palette doit compter de 2 à 4 couleurs'));
  for (const c of [d.art && d.art.bg, d.art && d.art.plate, d.art && d.art.garnish, ...((d.art && d.art.food) || [])])
    if (c && !/^#[0-9a-f]{6}$/i.test(c)) errors.push(at(`couleur mal formée « ${c} »`));

  if (!Array.isArray(d.i) || !d.i.length) errors.push(at('aucun ingrédient'));
  else if (d.i.length < 3) warnings.push(at(`${d.i.length} ingrédient(s) seulement`));
  // un ingrédient cité deux fois s'afficherait en double sur la fiche
  const vus = new Set();
  for (const [id] of d.i || []) {
    if (vus.has(id)) errors.push(at(`ingrédient répété : « ${id} »`));
    vus.add(id);
  }
  for (const line of d.i || []) {
    if (!Array.isArray(line) || line.length !== 3) { errors.push(at('ingrédient mal formé')); continue; }
    const [id, qty, unit] = line;
    if (!ING[id]) errors.push(at(`ingrédient absent du lexique : « ${id} »`));
    else usedIng.add(id);
    if (qty !== null && !(typeof qty === 'number' && qty > 0)) errors.push(at(`quantité invalide pour « ${id} »`));
    if (qty === null && unit !== '') errors.push(at(`« ${id} » sans quantité doit avoir une unité vide`));
    if (qty !== null && !UNITS[unit]) errors.push(at(`unité inconnue « ${unit} » pour « ${id} »`));
  }

  for (const l of LANGS) {
    for (const [f, label] of [['n', 'nom'], ['p', 'lieu'], ['d', 'description']]) {
      const v = d[f] && d[f][l];
      if (typeof v !== 'string' || !v.trim()) errors.push(at(`${label} ${l.toUpperCase()} manquant`));
    }
    const st = d.s && d.s[l];
    if (!Array.isArray(st) || st.length < 3) errors.push(at(`moins de trois étapes en ${l.toUpperCase()}`));
    else for (const x of st) if (typeof x !== 'string' || !x.trim()) errors.push(at(`étape vide en ${l.toUpperCase()}`));
    const extra = Object.keys(d.n || {}).filter(k => !LANGS.includes(k));
    if (extra.length) errors.push(at(`langue résiduelle : ${extra.join(', ')}`));
  }
  // le nombre d'étapes doit concorder d'une langue à l'autre
  const counts = LANGS.map(l => (d.s && d.s[l] || []).length);
  if (new Set(counts).size > 1) errors.push(at(`étapes déséquilibrées entre langues (${counts.join(' / ')})`));

  if (d.d && d.d.fr && d.d.fr.length < 80) warnings.push(at('description française très courte'));
}

/* Plusieurs fiches peuvent partager une ville : le globe les regroupe et
   propose la liste. Ce n'est donc pas une anomalie, on ne la signale pas. */

/* Deux identifiants ne peuvent pas porter le même libellé. L'export Excel
   n'écrit que le nom lisible : à la réimportation, un libellé partagé par
   deux ingrédients devient impossible à réattribuer, et la fiche revient
   avec le mauvais identifiant. Le défaut reste invisible tant qu'aucune
   recette n'emploie les deux membres d'une paire — d'où la vérification. */
for (const langue of [0, 1]) {
  const parNom = new Map();
  for (const [id, noms] of Object.entries(ING)) {
    const nom = noms[langue].toLowerCase().trim();
    (parNom.get(nom) || parNom.set(nom, []).get(nom)).push(id);
  }
  for (const [nom, ids] of parNom) {
    if (ids.length > 1) {
      errors.push(`lexique : « ${nom} » (${langue ? 'en' : 'fr'}) désigne `
        + `${ids.length} ingrédients — ${ids.join(', ')}`);
    }
  }
}

const unused = Object.keys(ING).filter(id => !usedIng.has(id));

console.log(`${DISHES.length} fiches · ${Object.keys(ING).length} ingrédients au lexique · ${usedIng.size} utilisés`);
if (unused.length) console.log(`${unused.length} ingrédient(s) jamais utilisé(s)${unused.length <= 12 ? ' : ' + unused.join(', ') : ''}`);
for (const w of warnings) console.log('  ~ ' + w);
if (errors.length) {
  console.error(`\n${errors.length} erreur(s) :`);
  for (const e of errors.slice(0, 40)) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log('\nToutes les fiches sont cohérentes.');
