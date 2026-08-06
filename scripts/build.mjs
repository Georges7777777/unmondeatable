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

/* ---- 1 bis. modifications faites depuis l'administration ----
   Textes réécrits, fiches importées, photos publiées : tout cela ne vit
   que dans la base. On le replie dans l'instantané, sans quoi chaque
   déploiement repartirait des seuls fichiers sources. */
execFileSync(process.execPath, [path.join(HERE, 'merge-db.mjs')], { stdio: 'inherit' });

/* ---- 2. fond de carte ---- */
fs.copyFileSync(path.join(ENGINE, 'geo.js'), path.join(OUT, 'geo.js'));

/* ---- 3. moteur ----
   L'ordre compte : chaque fichier s'appuie sur les précédents. */
const PARTS = [
  [ENGINE, 'i18n.js'],
  [LOCAL, 'data.js'],
  [ENGINE, 'foodgroups.js'],
  [ENGINE, 'filters.js'],
  [LOCAL, 'admin.js'],
  [ENGINE, 'illus.js'],
  [LOCAL, 'photos.js'],
  [ENGINE, 'globe.js'],
  [LOCAL, 'app.js'],
  [LOCAL, 'admin-ui.js']
];
/* Outils tableur : utiles au seul propriétaire du site. Les mettre dans le
   moteur alourdirait de 16 Ko chaque visite ; on en fait un second fichier,
   téléchargé au moment où la barre d'administration apparaît. */
const ADMIN_PARTS = [
  [LOCAL, 'xlsx.js'],          // lecture/écriture de classeurs, sans dépendance
  [LOCAL, 'recipes-xlsx.js'],  // correspondance fiches ↔ lignes du tableur
  [LOCAL, 'admin-xlsx.js']     // boutons export / modèle / import
];
const bundle = parts => {
  let out = '';
  for (const [dir, f] of parts) {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) { console.error('Fichier manquant :', p); process.exit(1); }
    out += `/* ===== ${f} ===== */\n` + fs.readFileSync(p, 'utf8') + '\n';
  }
  return out;
};
const engine = bundle(PARTS);

/* ---- contrôle du moteur assemblé ----
   Un fichier oublié dans la liste ci-dessus ne casse rien à la
   construction : il casse le site au premier chargement, sans un mot,
   et l'écran d'attente tourne indéfiniment. On vérifie donc que chaque
   symbole attendu par app.js est bien défini quelque part avant lui. */
const ATTENDUS = [
  ['emptyFilters', 'filters.js'], ['matchFilters', 'filters.js'],
  ['FOOD_GROUPS', 'foodgroups.js'], ['countFor', 'filters.js'],
  ['loadCore', 'data.js'], ['Globe', 'globe.js'], ['dishSVG', 'illus.js'],
  ['getPhoto', 'photos.js'], ['UI', 'i18n.js']
];
const absents = ATTENDUS.filter(([sym]) =>
  !new RegExp(`(function|const|let|class)\\s+${sym}\\b`).test(engine));
if (absents.length) {
  console.error('\nMoteur incomplet : ' + absents.map(([s, f]) => `${s} (${f})`).join(', '));
  console.error('Vérifiez la liste PARTS ci-dessus et le contenu de src/engine.');
  process.exit(1);
}

fs.writeFileSync(path.join(OUT, 'engine.js'), engine);
fs.writeFileSync(path.join(OUT, 'admin-tools.js'), bundle(ADMIN_PARTS));

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
for (const f of ['geo.js', 'engine.js', 'admin-tools.js', 'app.css', 'page.css']) console.log(`  ${f.padEnd(15)} ${size(f)}`);
console.log(`  config.js    ${process.env.SUPABASE_URL ? 'base connectée' : 'sans base (mode hors ligne)'}`);
