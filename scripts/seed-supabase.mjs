/* ============================================================
   seed-supabase.mjs — remplit la base avec les 400 fiches.

   À lancer une seule fois, après avoir exécuté schema.sql.
   Relançable sans risque : les lignes existantes sont mises à jour.

   Variables d'environnement attendues (fichier .env) :
     SUPABASE_URL=https://xxxx.supabase.co
     SUPABASE_SERVICE_KEY=eyJ...        ← clé « service_role », JAMAIS publiée

   Usage : node scripts/seed-supabase.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(HERE, '../public/data');
const LANGS = ['fr', 'en'];

/* --- lecture du .env sans dépendance --- */
const envFile = path.resolve(HERE, '../.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!URL || !KEY) {
  console.error(`\nIl manque les identifiants Supabase.

Créez un fichier site/.env contenant :
  SUPABASE_URL=https://votre-projet.supabase.co
  SUPABASE_SERVICE_KEY=votre_cle_service_role

(Supabase → Project Settings → API. La clé « service_role » ne doit
jamais être publiée ni committée : elle contourne toutes les sécurités.)\n`);
  process.exit(1);
}

const db = createClient(URL, KEY, { auth: { persistSession: false } });

const core = JSON.parse(fs.readFileSync(path.join(DATA, 'core.json'), 'utf8'));
const texts = {};
for (const l of LANGS) texts[l] = JSON.parse(fs.readFileSync(path.join(DATA, `lang/${l}.json`), 'utf8')).texts;

/* --- envoi par paquets pour ne pas dépasser les limites --- */
async function upsert(table, rows, conflict, label) {
  const SIZE = 200;
  for (let i = 0; i < rows.length; i += SIZE) {
    const chunk = rows.slice(i, i + SIZE);
    const { error } = await db.from(table).upsert(chunk, { onConflict: conflict });
    if (error) { console.error(`\n${table} : ${error.message}`); process.exit(1); }
    process.stdout.write(`\r  ${label} ${Math.min(i + SIZE, rows.length)}/${rows.length}`);
  }
  process.stdout.write('\n');
}

console.log('Envoi vers', URL, '\n');

await upsert('atlas_ingredients',
  Object.entries(core.ingredients).map(([id, v]) => ({ id, fr: v[0], en: v[1] })),
  'id', 'ingrédients');

await upsert('atlas_dishes', core.dishes.map(d => ({
  id: d.id, continent: d.c, lat: d.lat, lon: d.lon,
  base: d.base, prep: d.prep, cook: d.cook, diff: d.diff,
  tags: d.tags, art: d.art, ingredients: d.i, wiki: d.wiki, rank: d.rank
})), 'id', 'fiches');

const rows = [];
for (const d of core.dishes) {
  for (const l of LANGS) {
    const t = texts[l][d.id];
    if (t) rows.push({ dish_id: d.id, lang: l, name: t.n, place: t.p, description: t.d, steps: t.s });
  }
}
await upsert('atlas_dish_texts', rows, 'dish_id,lang', 'textes');

const { count } = await db.from('atlas_dishes').select('*', { count: 'exact', head: true });
console.log(`\nTerminé : ${count} fiches en base, ${rows.length} traductions.`);
