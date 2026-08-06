/* ============================================================
   drop-langs.mjs — retire des langues des fichiers sources.

   Les fiches sont du code JavaScript écrit à la main, avec ses
   guillemets, ses apostrophes et ses retours à la ligne : une
   expression régulière s'y casserait les dents. On parcourt donc
   le texte caractère par caractère en sachant à tout moment si
   l'on se trouve dans une chaîne, et l'on retire proprement les
   propriétés visées avec leur valeur.

   Usage : node scripts/drop-langs.mjs es pt
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(HERE, '../../src');
const DROP = new Set(process.argv.slice(2));
if (!DROP.size) { console.error('Indiquez les langues à retirer, par exemple : es pt'); process.exit(1); }

/* Retourne le texte privé des propriétés dont le nom est dans `drop`.
   `depthOnly` limite l'action aux objets imbriqués (on ne touche pas
   au premier niveau, qui porte id, lat, tags…). */
function stripProps(src, drop) {
  const out = [];
  let i = 0;
  const n = src.length;
  let expectKey = false;      // on vient de passer { ou , : le prochain mot est un nom de propriété

  const skipString = j => {   // renvoie l'index juste après la chaîne ouverte en j
    const q = src[j++];
    while (j < n) {
      if (src[j] === '\\') { j += 2; continue; }
      if (src[j] === q) return j + 1;
      j++;
    }
    return j;
  };
  // fin de la valeur qui commence en j : on s'arrête sur , ou } ou ] de même niveau
  const endOfValue = j => {
    let depth = 0;
    while (j < n) {
      const c = src[j];
      if (c === '"' || c === "'" || c === '`') { j = skipString(j); continue; }
      if (c === '{' || c === '[' || c === '(') { depth++; j++; continue; }
      if (c === '}' || c === ']' || c === ')') { if (depth === 0) return j; depth--; j++; continue; }
      if (c === ',' && depth === 0) return j;
      j++;
    }
    return j;
  };

  while (i < n) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') { const e = skipString(i); out.push(src.slice(i, e)); i = e; expectKey = false; continue; }
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i) + 2; out.push(src.slice(i, e)); i = e; continue; }
    if (c === '/' && src[i + 1] === '/') { const e = src.indexOf('\n', i) + 1 || n; out.push(src.slice(i, e)); i = e; continue; }
    if (c === '{' || c === ',') { out.push(c); i++; expectKey = true; continue; }
    if (/\s/.test(c)) { out.push(c); i++; continue; }

    if (expectKey) {
      const m = /^([A-Za-z_$][\w$]*)\s*:/.exec(src.slice(i, i + 40));
      if (m && drop.has(m[1])) {
        const valStart = i + m[0].length;
        let end = endOfValue(valStart);
        // on emporte la virgule qui suit, sinon on laisserait « ,, »
        let after = end;
        while (after < n && /\s/.test(src[after])) after++;
        if (src[after] === ',') end = after + 1;
        else {
          // dernière propriété : c'est la virgule précédente qu'il faut retirer
          let k = out.length - 1;
          while (k >= 0 && /^\s*$/.test(out[k])) k--;
          if (k >= 0 && out[k] === ',') out[k] = '';
        }
        i = end;
        // on vient d'avaler la virgule séparatrice : ce qui suit est
        // à nouveau un nom de propriété (cas de deux langues d'affilée)
        expectKey = true;
        continue;
      }
    }
    out.push(c); i++; expectKey = false;
  }
  return out.join('');
}

const files = ['lexicon.js'];
for (let i = 1; i <= 31; i++) files.push(`d${i}.js`);

/* état de départ, pour comparer ensuite */
const load = () => {
  let code = '';
  for (const f of ['lexicon.js', 'wiki.js', ...files.filter(f => f !== 'lexicon.js')])
    code += fs.readFileSync(path.join(SRC, f), 'utf8') + '\n';
  return new Function(code + '\n return { DISHES, ING, WIKI };')();
};
const before = load();

/* Le lexique est une liste de tableaux [fr, en, es, pt] : ce n'est pas
   un objet à propriétés nommées, on le traite à part. */
const ORDER = ['fr', 'en', 'es', 'pt'];
const keep = ORDER.map((l, i) => [l, i]).filter(([l]) => !DROP.has(l)).map(([, i]) => i);

let lex = fs.readFileSync(path.join(SRC, 'lexicon.js'), 'utf8');
let lexLines = 0;
lex = lex.split('\n').map(line => {
  const m = /^(\s*[\w$]+\s*:\s*)(\[.*\])(,?)\s*$/.exec(line);
  if (!m) return line;
  let arr;
  try { arr = JSON.parse(m[2]); } catch (e) { return line; }
  if (!Array.isArray(arr) || arr.length !== ORDER.length) return line;
  lexLines++;
  return m[1] + JSON.stringify(keep.map(i => arr[i])) + m[3];
}).join('\n');
lex = lex.replace('Lexique des ingrédients — [fr, en, es, pt]',
  `Lexique des ingrédients — [${ORDER.filter(l => !DROP.has(l)).join(', ')}]`);
fs.writeFileSync(path.join(SRC, 'lexicon.js'), lex);

let changed = 0;
for (const f of files) {
  if (f === 'lexicon.js') continue;
  const p = path.join(SRC, f);
  const src = fs.readFileSync(p, 'utf8');
  let out = stripProps(src, DROP);
  // le retrait laisse des lignes vides avant les accolades fermantes
  out = out.split('\n').filter((line, i, all) => {
    if (line.trim() !== '') return true;
    let j = i + 1;
    while (j < all.length && all[j].trim() === '') j++;
    return !(j < all.length && /^\s*[}\]]/.test(all[j]));
  }).join('\n').replace(/[ \t]+$/gm, '');
  if (out !== src) { fs.writeFileSync(p, out); changed++; }
}

/* ---- vérification : rien d'autre n'a bougé ---- */
const after = load();
const problems = [];
if (after.DISHES.length !== before.DISHES.length) problems.push('nombre de fiches modifié');
if (Object.keys(after.ING).length !== Object.keys(before.ING).length) problems.push('taille du lexique modifiée');
const KEEP = ORDER.filter(l => !DROP.has(l));
for (let i = 0; i < after.DISHES.length; i++) {
  const a = after.DISHES[i], b = before.DISHES[i];
  if (a.id !== b.id) { problems.push('ordre des fiches modifié : ' + b.id); break; }
  if (JSON.stringify(a.i) !== JSON.stringify(b.i)) problems.push(a.id + ' : ingrédients modifiés');
  if (JSON.stringify(a.tags) !== JSON.stringify(b.tags)) problems.push(a.id + ' : étiquettes modifiées');
  if (JSON.stringify(a.art) !== JSON.stringify(b.art)) problems.push(a.id + ' : illustration modifiée');
  if (a.lat !== b.lat || a.lon !== b.lon || a.base !== b.base || a.prep !== b.prep ||
    a.cook !== b.cook || a.diff !== b.diff || a.c !== b.c) problems.push(a.id + ' : données modifiées');
  for (const f of ['n', 'p', 'd', 's']) {
    const langs = Object.keys(a[f]).sort().join(',');
    if (langs !== KEEP.slice().sort().join(',')) { problems.push(a.id + ` : langues de « ${f} » = ${langs}`); break; }
    for (const l of KEEP) if (JSON.stringify(a[f][l]) !== JSON.stringify(b[f][l]))
      problems.push(a.id + ` : ${f}.${l} altéré`);
  }
  if (problems.length > 8) break;
}
for (const id in after.ING) {
  if (after.ING[id].length !== KEEP.length) { problems.push('lexique : ' + id + ' mal découpé'); break; }
  if (after.ING[id][0] !== before.ING[id][0] || after.ING[id][1] !== before.ING[id][1])
    { problems.push('lexique : ' + id + ' altéré'); break; }
}

console.log(`${changed} fichier(s) de fiches modifié(s) · ${lexLines} ingrédients recoupés`);
console.log(`${after.DISHES.length} fiches · langues conservées : ${KEEP.join(', ')}`);
if (problems.length) { console.error('\nProblèmes :\n  ' + problems.slice(0, 10).join('\n  ')); process.exit(1); }
console.log('Vérifié : identifiants, positions, ingrédients, étiquettes et textes conservés intacts.');
