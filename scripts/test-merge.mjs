/* ============================================================
   test-merge.mjs — l'étape de construction qui replie la base
   dans l'instantané.

   Elle s'exécute à chaque déploiement : si elle se trompe, ce sont
   vos modifications faites en administration qui disparaissent.
   On la fait tourner contre une fausse base, sur une copie des
   données — rien n'est touché dans public/.
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

/* La fausse base tourne dans ce processus : il faut lancer le script
   sans bloquer la boucle d'événements, sinon il attendrait une réponse
   que nous serions incapables de lui donner. */
const run = promisify(execFile);

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

const CONTENT_DATE = '2026-07-30T09:00:00.000Z';
const send = (res, v) => { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(v)); };
const server = http.createServer((req, res) => {
  const u = req.url, page2 = /offset=[1-9]/.test(u);
  if (u.includes('atlas_content_version')) return send(res, [{ updated_at: CONTENT_DATE }]);
  if (page2) return send(res, []);                       // pagination : deuxième page vide
  if (u.includes('atlas_dish_photos')) return send(res, [
    { dish_id: 'bouillabaisse', path: 'b-1.jpg', credit: 'Georges' },
    { dish_id: 'fiche-inexistante', path: 'x.jpg', credit: '' }   // doit être ignorée
  ]);
  if (u.includes('atlas_dish_texts')) return send(res, [{
    dish_id: 'bouillabaisse', lang: 'fr', name: 'Bouillabaisse revue',
    place: 'Marseille', description: 'Texte modifié en administration.', steps: ['Une étape.']
  }]);
  if (u.includes('atlas_ingredients')) return send(res, [
    { id: 'salt', fr: 'sel de mer', en: 'sea salt' }
  ]);
  if (u.includes('atlas_dishes')) return send(res, [
    { id: 'recette-excel', continent: 'eu', lat: 48.85, lon: 2.35, base: 4, prep: 20, cook: 35, diff: 2, tags: ['comfort'], art: { v: 'plate', style: 'other' }, ingredients: [['salt', null, '']], rank: 900, published: true },
    { id: 'pizza-napoletana', continent: 'eu', lat: 40.85, lon: 14.27, base: 4, prep: 30, cook: 5, diff: 2, tags: ['street'], art: {}, ingredients: [], rank: 1, published: false }
  ]);
  send(res, []);
});
await new Promise(r => server.listen(8123, r));

/* copie de travail : on ne veut pas abîmer les vraies données */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-merge-'));
fs.cpSync(path.join(ROOT, 'public/data'), path.join(tmp, 'public/data'), { recursive: true });
fs.mkdirSync(path.join(tmp, 'scripts'), { recursive: true });
fs.copyFileSync(path.join(HERE, 'merge-db.mjs'), path.join(tmp, 'scripts/merge-db.mjs'));

const before = JSON.parse(fs.readFileSync(path.join(tmp, 'public/data/core.json'), 'utf8'));

await run(process.execPath, [path.join(tmp, 'scripts/merge-db.mjs')], {
  env: { ...process.env, SUPABASE_URL: 'http://localhost:8123', SUPABASE_ANON_KEY: 'eyJfaux' }
});
server.close();

const core = JSON.parse(fs.readFileSync(path.join(tmp, 'public/data/core.json'), 'utf8'));
const fr = JSON.parse(fs.readFileSync(path.join(tmp, 'public/data/lang/fr.json'), 'utf8'));

check(core.version === CONTENT_DATE,
  'l’instantané porte la date du contenu, pas celle de la construction', core.version);
check(!!core.photos && !!core.photos['bouillabaisse'],
  'les photos publiées entrent dans l’instantané');
check(String((core.photos['bouillabaisse'] || {}).url).endsWith('/atlas-photos/b-1.jpg'),
  'avec leur adresse publique complète', (core.photos['bouillabaisse'] || {}).url);
check((core.photos['bouillabaisse'] || {}).credit === 'Georges', 'et leur crédit');
check(!core.photos['fiche-inexistante'], 'une photo orpheline est écartée');

check(!!core.dishes.find(d => d.id === 'recette-excel'),
  'une fiche créée en administration rejoint l’instantané');
check(!core.dishes.find(d => d.id === 'pizza-napoletana'),
  'une fiche dépubliée en est retirée');
check(core.count === core.dishes.length && core.count === before.count,
  'le compte reste juste', `${before.count} → ${core.count}`);

check(fr.texts['bouillabaisse'] && fr.texts['bouillabaisse'].n === 'Bouillabaisse revue',
  'un texte réécrit en administration remplace celui des sources',
  fr.texts['bouillabaisse'] && fr.texts['bouillabaisse'].n);
check(!fr.texts['pizza-napoletana'], 'les textes d’une fiche retirée sont purgés');
check(core.ingredients.salt && core.ingredients.salt[0] === 'sel de mer',
  'le lexique suit lui aussi', core.ingredients.salt && core.ingredients.salt[0]);

/* sans base : l'étape ne doit ni échouer ni modifier quoi que ce soit */
const untouched = fs.readFileSync(path.join(tmp, 'public/data/core.json'), 'utf8');
const { stdout: out2 } = await run(process.execPath, [path.join(tmp, 'scripts/merge-db.mjs')], {
  env: { ...process.env, SUPABASE_URL: '', SUPABASE_ANON_KEY: '' }
});
check(/non configurée/.test(out2) &&
  fs.readFileSync(path.join(tmp, 'public/data/core.json'), 'utf8') === untouched,
  'sans base, l’étape passe son tour sans rien abîmer');

/* base injoignable : le déploiement ne doit pas échouer */
const { stdout: out3 } = await run(process.execPath, [path.join(tmp, 'scripts/merge-db.mjs')], {
  env: { ...process.env, SUPABASE_URL: 'http://localhost:8124', SUPABASE_ANON_KEY: 'eyJfaux' }
});
check(/injoignable/.test(out3) &&
  fs.readFileSync(path.join(tmp, 'public/data/core.json'), 'utf8') === untouched,
  'base injoignable : le déploiement continue, l’instantané est préservé');

fs.rmSync(tmp, { recursive: true, force: true });
for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
process.exit(errors.length ? 1 : 0);
