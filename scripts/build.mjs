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

/* ---- 0. les sources du moteur sont-elles là ? ----
   Le dépôt ne contient parfois que public/ et les données : c'est
   suffisant pour servir le site, mais pas pour le reconstruire. Sans ce
   contrôle, la construction échoue plus loin sur un fichier manquant, ou
   pire, assemble un moteur à partir de sources dépareillées — c'est ainsi
   qu'un « ReferenceError: ATLAS » a pu se produire en production, le
   moteur étant bâti sur un app.js antérieur au retrait de cette couche. */
const REQUIS = [
  [ENGINE, 'i18n.js'], [ENGINE, 'geo.js'], [ENGINE, 'foodgroups.js'],
  [ENGINE, 'filters.js'], [ENGINE, 'illus.js'], [ENGINE, 'globe.js'],
  [LOCAL, 'data.js'], [LOCAL, 'admin.js'], [LOCAL, 'photos.js'],
  [LOCAL, 'app.js'], [LOCAL, 'admin-ui.js']
];
const absents = REQUIS.filter(([d, f]) => !fs.existsSync(path.join(d, f)))
  .map(([d, f]) => path.relative(ROOT, path.join(d, f)));
if (absents.length) {
  console.error('Sources du moteur introuvables :\n  ' + absents.join('\n  '));
  console.error('\nLe dépôt est incomplet. Ces fichiers doivent accompagner public/ et scripts/.');
  process.exit(1);
}

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
    if (!fs.existsSync(p)) return { manquant: f };
    out += `/* ===== ${f} ===== */\n` + fs.readFileSync(p, 'utf8') + '\n';
  }
  return { code: out };
};

/* Symboles que app.js exige dès son chargement. S'il en manque un, le
   moteur s'arrête à la première ligne et le site ne démarre jamais —
   sans message. On préfère le savoir ici. */
const ATTENDUS = [
  ['emptyFilters', 'filters.js'], ['matchFilters', 'filters.js'],
  ['FOOD_GROUPS', 'foodgroups.js'], ['countFor', 'filters.js'],
  ['loadCore', 'data.js'], ['Globe', 'globe.js'], ['dishSVG', 'illus.js'],
  ['getPhoto', 'photos.js'], ['UI', 'i18n.js']
];
const symbolesAbsents = (code, attendus = ATTENDUS) => attendus.filter(([sym]) =>
  !new RegExp(`(function|const|let|class)\\s+${sym}\\b`).test(code));

/* Écrit un fichier assemblé — mais jamais un fichier cassé.
   Si les sources sont incomplètes ou périmées (dépôt partiellement mis à
   jour, ce qui arrive avec l'envoi par le site de GitHub), on garde la
   version déjà publiée plutôt que d'écraser un moteur qui fonctionne. */
function publier(nom, parts, attendus = []) {
  const cible = path.join(OUT, nom);
  const dejaLa = fs.existsSync(cible) ? fs.readFileSync(cible, 'utf8') : null;
  const r = bundle(parts);
  const refus = r.manquant
    ? `source absente : ${r.manquant}`
    : (symbolesAbsents(r.code, attendus).length
        ? 'moteur incomplet : ' + symbolesAbsents(r.code, attendus).map(([s, f]) => `${s} (${f})`).join(', ')
        : null);
  if (!refus) { fs.writeFileSync(cible, r.code); return; }
  if (dejaLa && !symbolesAbsents(dejaLa, attendus).length) {
    console.warn(`  ! ${nom} — ${refus}`);
    console.warn(`    On conserve la version déjà publiée, qui est complète.`);
    console.warn(`    Mettez à jour src/ dans le dépôt pour reprendre la main.`);
    return;
  }
  console.error(`\n${nom} : ${refus}`);
  console.error('Aucune version publiable disponible. Vérifiez le contenu de src/.');
  process.exit(1);
}
publier('engine.js', PARTS, ATTENDUS);
publier('admin-tools.js', ADMIN_PARTS);

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
