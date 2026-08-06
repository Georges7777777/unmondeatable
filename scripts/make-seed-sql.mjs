/* ============================================================
   make-seed-sql.mjs — produit les fichiers SQL à coller dans
   l'éditeur SQL de Supabase.

   L'éditeur refuse les requêtes de plus d'environ 1 Mo : on
   découpe donc en plusieurs fichiers, chacun bien en dessous.

     seed-1-socle.sql   ingrédients + les 400 fiches   (obligatoire)
     seed-2-textes-fr.sql … seed-5-textes-pt.sql       (facultatif)

   Le socle suffit à faire fonctionner l'administration. Les
   fichiers de textes ne servent qu'à avoir l'intégralité du
   contenu en base (sauvegarde, édition hors instantané).

   Usage : node scripts/make-seed-sql.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(HERE, '../public/data');
const OUT = path.resolve(HERE, '../supabase');
const LANGS = ['fr', 'en'];
const LABEL = { fr: 'français', en: 'anglais' };

const core = JSON.parse(fs.readFileSync(path.join(DATA, 'core.json'), 'utf8'));
const texts = {};
for (const l of LANGS) texts[l] = JSON.parse(fs.readFileSync(path.join(DATA, `lang/${l}.json`), 'utf8')).texts;

const q = v => v === null || v === undefined ? 'null' : `'${String(v).replace(/'/g, "''")}'`;
const jsonb = v => `${q(JSON.stringify(v))}::jsonb`;
const arr = a => `ARRAY[${a.map(q).join(',')}]::text[]`;

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (/^seed.*\.sql$/.test(f)) fs.unlinkSync(path.join(OUT, f));

function write(name, header, body) {
  const file = path.join(OUT, name);
  fs.writeFileSync(file, header + '\n' + body.join('\n') + '\n');
  const kb = fs.statSync(file).size / 1024;
  console.log(`  ${name.padEnd(22)} ${kb.toFixed(0).padStart(5)} Ko  ${kb > 900 ? '⚠️ trop gros' : '✓'}`);
}

/* ---------- 1. socle : ingrédients + fiches ---------- */
const socle = [];
const ing = Object.entries(core.ingredients);
for (let i = 0; i < ing.length; i += 150) {
  const chunk = ing.slice(i, i + 150).map(([id, v]) => `(${q(id)},${q(v[0])},${q(v[1])})`);
  socle.push(`insert into public.atlas_ingredients (id,fr,en) values\n${chunk.join(',\n')}\non conflict (id) do update set fr=excluded.fr,en=excluded.en;\n`);
}
for (let i = 0; i < core.dishes.length; i += 80) {
  const chunk = core.dishes.slice(i, i + 80).map(d =>
    `(${q(d.id)},${q(d.c)},${d.lat},${d.lon},${d.base},${d.prep},${d.cook},${d.diff},` +
    `${arr(d.tags)},${jsonb(d.art)},${jsonb(d.i)},${d.wiki ? jsonb(d.wiki) : 'null'},${d.rank})`);
  socle.push(`insert into public.atlas_dishes (id,continent,lat,lon,base,prep,cook,diff,tags,art,ingredients,wiki,rank) values\n${chunk.join(',\n')}\non conflict (id) do update set continent=excluded.continent,lat=excluded.lat,lon=excluded.lon,base=excluded.base,prep=excluded.prep,cook=excluded.cook,diff=excluded.diff,tags=excluded.tags,art=excluded.art,ingredients=excluded.ingredients,wiki=excluded.wiki,rank=excluded.rank;\n`);
}
socle.push(`select
  (select count(*) from public.atlas_dishes)      as fiches,
  (select count(*) from public.atlas_ingredients) as ingredients;`);

write('seed-1-socle.sql',
`-- ============================================================
--  Un monde à table — 1/5 : socle (OBLIGATOIRE)
--  ${core.dishes.length} fiches et ${ing.length} ingrédients.
--  À coller dans Supabase (SQL Editor) après le schéma.
--  Résultat attendu : ${core.dishes.length} fiches · ${ing.length} ingrédients
-- ============================================================
`, socle);

/* ---------- 2 à 5 : les textes, un fichier par langue ---------- */
LANGS.forEach((l, idx) => {
  const rows = core.dishes.map(d => {
    const t = texts[l][d.id];
    return t ? `(${q(d.id)},${q(l)},${q(t.n)},${q(t.p)},${q(t.d)},${arr(t.s)})` : null;
  }).filter(Boolean);
  const body = [];
  for (let i = 0; i < rows.length; i += 40) {
    body.push(`insert into public.atlas_dish_texts (dish_id,lang,name,place,description,steps) values\n${rows.slice(i, i + 40).join(',\n')}\non conflict (dish_id,lang) do update set name=excluded.name,place=excluded.place,description=excluded.description,steps=excluded.steps;\n`);
  }
  body.push(`select count(*) as traductions_${l} from public.atlas_dish_texts where lang='${l}';`);
  write(`seed-${idx + 2}-textes-${l}.sql`,
`-- ============================================================
--  Un monde à table — ${idx + 2}/5 : textes en ${LABEL[l]} (facultatif)
--  ${rows.length} traductions. À coller après le socle.
-- ============================================================
`, body);
});

console.log(`\n${core.dishes.length} fiches · ${core.dishes.length * LANGS.length} traductions · ${ing.length} ingrédients`);
