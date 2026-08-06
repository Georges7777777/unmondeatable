/* ============================================================
   merge-db.mjs — replie la base dans l'instantané statique.

   Pourquoi : les fiches livrées avec le site sont fabriquées à
   partir des fichiers sources. Tout ce que vous modifiez ensuite
   depuis l'administration (textes, photos, imports Excel) ne vit
   que dans la base. Sans cette étape, chaque nouveau déploiement
   repartait des fichiers sources et vos modifications
   disparaissaient de l'affichage.

   L'instantané porte désormais la date réelle du contenu, et non
   celle de la construction : la synchronisation au démarrage sait
   alors ce qu'il lui reste à demander.

   Sans accès à la base, on ne fait rien : le site se contente de
   l'instantané et interroge la base à l'ouverture, comme avant.

   Usage : node scripts/merge-db.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(HERE, '../public/data');

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_ANON_KEY;
if (!URL_ || !KEY) {
  console.log('Base non configurée — instantané laissé tel quel.');
  process.exit(0);
}

const headers = { apikey: KEY };
if (/^eyJ/.test(KEY)) headers.Authorization = 'Bearer ' + KEY;

/* Supabase plafonne les réponses : on pagine. */
async function all(table, select) {
  const out = [];
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${URL_}/rest/v1/${table}?select=${select}&order=updated_at.asc&limit=1000&offset=${from}`, { headers });
    if (!r.ok) throw new Error(`${table} : ${r.status} ${(await r.text()).slice(0, 120)}`);
    const page = await r.json();
    out.push(...page);
    if (page.length < 1000) return out;
  }
}

let dishes, texts, photos, version;
try {
  const v = await fetch(`${URL_}/rest/v1/atlas_content_version?select=updated_at`, { headers });
  version = v.ok ? ((await v.json())[0] || {}).updated_at : null;
  [dishes, texts, photos] = await Promise.all([
    all('atlas_dishes', '*'),
    all('atlas_dish_texts', 'dish_id,lang,name,place,description,steps'),
    all('atlas_dish_photos', 'dish_id,path,credit')
  ]);
} catch (e) {
  // la base peut être injoignable pendant une construction : ce n'est pas
  // une raison pour faire échouer le déploiement
  console.log('Base injoignable (' + e.message + ') — instantané laissé tel quel.');
  process.exit(0);
}

/* ---- fiches ---- */
const core = JSON.parse(fs.readFileSync(path.join(DATA, 'core.json'), 'utf8'));
const byId = new Map(core.dishes.map(d => [d.id, d]));
let added = 0, updated = 0, hidden = 0;

for (const row of dishes) {
  if (row.published === false) {
    if (byId.delete(row.id)) hidden++;
    continue;
  }
  const d = {
    id: row.id, c: row.continent, lat: row.lat, lon: row.lon,
    base: row.base, prep: row.prep, cook: row.cook, diff: row.diff,
    tags: row.tags || [], art: row.art || {}, i: row.ingredients || [],
    rank: row.rank || 0
  };
  if (row.wiki) d.wiki = row.wiki;
  byId.has(row.id) ? updated++ : added++;
  byId.set(row.id, d);
}
core.dishes = [...byId.values()].sort((a, b) => (a.rank || 0) - (b.rank || 0));
core.count = core.dishes.length;

/* ---- photos : chemin public complet, prêt à afficher ---- */
core.photos = {};
for (const p of photos) {
  if (!byId.has(p.dish_id)) continue;
  core.photos[p.dish_id] = {
    url: `${URL_}/storage/v1/object/public/atlas-photos/${p.path}`,
    credit: p.credit || ''
  };
}

/* ---- lexique des ingrédients ---- */
try {
  const ing = await all('atlas_ingredients', '*');
  for (const row of ing) core.ingredients[row.id] = [row.fr, row.en];
} catch (e) { /* facultatif */ }

/* ---- textes, langue par langue ---- */
const known = new Set(core.dishes.map(d => d.id));
const perLang = {};
for (const t of texts) {
  if (!known.has(t.dish_id)) continue;
  (perLang[t.lang] = perLang[t.lang] || {})[t.dish_id] =
    { n: t.name, p: t.place, d: t.description, s: t.steps || [] };
}
let textCount = 0;
for (const lang of ['fr', 'en']) {
  const file = path.join(DATA, 'lang', `${lang}.json`);
  if (!fs.existsSync(file)) continue;
  const pack = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const id in (perLang[lang] || {})) { pack.texts[id] = perLang[lang][id]; textCount++; }
  // une fiche retirée de l'instantané n'a plus besoin de ses textes
  for (const id in pack.texts) if (!known.has(id)) delete pack.texts[id];
  pack.version = version || pack.version;
  fs.writeFileSync(file, JSON.stringify(pack));
}

/* La date de l'instantané devient celle du contenu : la synchronisation
   au démarrage ne redemandera que ce qui aura bougé après. */
if (version) core.version = version;
fs.writeFileSync(path.join(DATA, 'core.json'), JSON.stringify(core));

console.log(`Base repliée dans l'instantané : ${added} fiche(s) ajoutée(s), ${updated} mise(s) à jour, ` +
  `${hidden} masquée(s), ${Object.keys(core.photos).length} photo(s), ${textCount} texte(s).`);
console.log(`Date du contenu : ${core.version}`);
