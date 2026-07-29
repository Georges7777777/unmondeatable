/* ============================================================
   build.mjs — assemble le site statique à publier.

     • copie le fond de carte (geo.js)
     • concatène le moteur en un seul fichier (engine.js)
     • régénère les données depuis les sources
     • injecte la configuration Supabase depuis les variables
       d'environnement de Vercel

   Usage : node scripts/build.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const ENGINE = path.join(ROOT, 'src/engine');  // moteur : globe, carte, i18n, illustrations
const LOCAL = path.join(ROOT, 'src');          // fichiers propres à la version web
const DISHSRC = path.resolve(ROOT, '../src');  // fiches d'origine (facultatif)
const OUT = path.join(ROOT, 'public/assets');

fs.mkdirSync(OUT, { recursive: true });

/* ---- 1. données ----
   Les JSON sont livrés avec le projet. On ne les régénère que si les
   fichiers de fiches d'origine sont présents (poste de l'auteur). */
if (fs.existsSync(path.join(DISHSRC, 'd1.js'))) {
  execFileSync(process.execPath, [path.join(HERE, 'export-data.mjs')], { stdio: 'inherit' });
} else if (fs.existsSync(path.join(ROOT, 'public/data/core.json'))) {
  console.log('Données déjà présentes — régénération inutile.');
} else {
  console.error('Aucune donnée trouvée (public/data/core.json manquant).');
  process.exit(1);
}

/* ---- 2. fond de carte ---- */
fs.copyFileSync(path.join(ENGINE, 'geo.js'), path.join(OUT, 'geo.js'));

/* ---- 3. moteur ----
   L'ordre compte : chaque fichier s'appuie sur les précédents. */
const PARTS = [
  [ENGINE, 'i18n.js'],
  [LOCAL, 'data.js'],
  [LOCAL, 'admin.js'],
  [ENGINE, 'illus.js'],
  [LOCAL, 'photos.js'],
  [ENGINE, 'atlas.js'],
  [ENGINE, 'globe.js'],
  [LOCAL, 'app.js'],
  [LOCAL, 'admin-ui.js']
];
let engine = '';
for (const [dir, f] of PARTS) {
  const p = path.join(dir, f);
  if (!fs.existsSync(p)) { console.error('Fichier manquant :', p); process.exit(1); }
  engine += `/* ===== ${f} ===== */\n` + fs.readFileSync(p, 'utf8') + '\n';
}
fs.writeFileSync(path.join(OUT, 'engine.js'), engine);

/* ---- 4. configuration publique ----
   Seule la clé « anon » est exposée : elle ne permet que la lecture,
   les écritures étant bloquées par les règles RLS de la base. */
const cfg = `/* généré au build — ne pas modifier à la main */
window.SUPA = {
  url: ${JSON.stringify(process.env.SUPABASE_URL || '')},
  anonKey: ${JSON.stringify(process.env.SUPABASE_ANON_KEY || '')}
};
`;
fs.writeFileSync(path.join(OUT, 'config.js'), cfg);

/* ---- 5. récapitulatif ---- */
const size = f => {
  const p = path.join(OUT, f);
  if (!fs.existsSync(p)) return '—';
  const b = fs.readFileSync(p);
  return `${(b.length / 1024).toFixed(0)} Ko (${(zlib.gzipSync(b).length / 1024).toFixed(0)} Ko compressés)`;
};
console.log('\nFichiers publiés :');
for (const f of ['geo.js', 'engine.js', 'app.css', 'page.css']) console.log(`  ${f.padEnd(12)} ${size(f)}`);
console.log(`  config.js    ${process.env.SUPABASE_URL ? 'base connectée' : 'sans base (mode hors ligne)'}`);
