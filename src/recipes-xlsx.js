/* ============================================================
   recipes-xlsx.js — passage des fiches au tableur et retour.

   Une ligne = une recette. Les quatre langues sont obligatoires.
   Les ingrédients, eux, sont un lexique partagé par toutes les
   fiches : ils vivent dans leur propre feuille, où ils ne sont
   traduits qu'une fois. La colonne « ingrédients » d'une recette
   ne contient donc que des quantités et des noms français.
   ============================================================ */

const RX_SHEET = 'Recettes';
const RX_ING_SHEET = 'Ingrédients';
const RX_LIST_SHEET = 'Listes';
const RX_HELP_SHEET = 'Notice';

/* clé interne → intitulé affiché dans le tableur */
const RX_COLS = [
  ['id', 'identifiant'],
  ['continent', 'continent'],
  ['lat', 'latitude'],
  ['lon', 'longitude'],
  ['base', 'personnes'],
  ['prep', 'préparation (min)'],
  ['cook', 'cuisson (min)'],
  ['diff', 'difficulté'],
  ['tags', 'étiquettes'],
  ['n_fr', 'nom FR'], ['n_en', 'nom EN'], ['n_es', 'nom ES'], ['n_pt', 'nom PT'],
  ['p_fr', 'lieu FR'], ['p_en', 'lieu EN'], ['p_es', 'lieu ES'], ['p_pt', 'lieu PT'],
  ['d_fr', 'description FR'], ['d_en', 'description EN'], ['d_es', 'description ES'], ['d_pt', 'description PT'],
  ['s_fr', 'étapes FR'], ['s_en', 'étapes EN'], ['s_es', 'étapes ES'], ['s_pt', 'étapes PT'],
  ['ing', 'ingrédients'],
  ['wiki_fr', 'Wikipédia FR'], ['wiki_en', 'Wikipédia EN'],
  ['published', 'publiée'],
  ['art', 'illustration']
];
const RX_WIDTHS = [22, 10, 10, 10, 10, 14, 12, 11, 24,
  26, 26, 26, 26, 24, 24, 24, 24, 46, 46, 46, 46, 52, 52, 52, 52, 40, 20, 20, 10, 34];

/* ---------------- normalisation ---------------- */
const rxNorm = s => String(s == null ? '' : s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function rxSlug(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'fiche';
}
const rxNum = v => {
  if (typeof v === 'number') return v;
  const s = String(v == null ? '' : v).trim().replace(/\s/g, '').replace(',', '.');
  if (!s) return null;
  const n = Number(s);
  return isFinite(n) ? n : null;
};

/* ---------------- unités ---------------- */
/* libellés français reconnus à la lecture (singulier et pluriel) */
function rxUnitTable() {
  if (rxUnitTable._t) return rxUnitTable._t;
  const t = [];
  for (const u in UNITS) {
    const add = lab => { if (lab) t.push([rxNorm(lab), u]); };
    add(UNITS[u][0]);
    if (UNITS_PL[u]) add(UNITS_PL[u][0]);
    add(u);                       // le code lui-même reste accepté
  }
  t.sort((a, b) => b[0].length - a[0].length);   // « c a soupe » avant « c »
  return (rxUnitTable._t = t);
}

/* « 1200 g poisson de roche » → ['poisson de roche', 1200, 'g']

   Piège du français : beaucoup d'ingrédients commencent par un mot qui est
   aussi une unité — « feuilles de laurier », « filet de cabillaud »,
   « tranches de pain ». Deux garde-fous :
     • si le reste de la ligne est un ingrédient connu, on ne touche à rien ;
     • un mot suivi de « de / d' / du / des » appartient au nom, pas à l'unité.
   `isKnown` est facultatif : sans lexique, seule la seconde règle s'applique. */
function rxParseIngLine(line, isKnown) {
  let s = String(line).trim();
  if (!s) return null;
  // forme explicite « nom | quantité | unité », tolérée et sans ambiguïté
  if (s.includes('|')) {
    const [name, q, u] = s.split('|').map(x => x.trim());
    if (!name) return null;
    const unit = u ? (rxUnitTable().find(([lab]) => lab === rxNorm(u)) || [, u])[1] : '';
    return { name, qty: rxNum(q), unit: rxNum(q) == null ? '' : (unit || 'pc') };
  }
  const FRAC = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3 };
  const m = s.match(/^(\d+(?:[.,]\d+)?|[½¼¾⅓⅔])\s+([\s\S]*)$/);
  if (!m) return { name: s, qty: null, unit: '' };
  const qty = FRAC[m[1]] !== undefined ? FRAC[m[1]] : rxNum(m[1]);
  const rest = m[2].trim();
  if (isKnown && isKnown(rest)) return { name: rest, qty, unit: 'pc' };

  const nrest = ' ' + rxNorm(rest) + ' ';
  for (const [lab, code] of rxUnitTable()) {
    if (!nrest.startsWith(' ' + lab + ' ')) continue;
    const tail = rest.split(/\s+/).slice(lab.split(' ').length).join(' ').trim();
    if (!tail) break;                                  // « 2 tranches » seul : pas d'ingrédient
    if (/^(de|d’|d'|du|des|à|au|aux)\b/i.test(tail)) break;   // le mot fait partie du nom
    return { name: tail, qty, unit: code };
  }
  return { name: rest, qty, unit: 'pc' };
}

/* ['poisson de roche', 1200, 'g'] → « 1200 g poisson de roche » */
function rxFormatIng(triple, ingNames) {
  const [id, qty, unit] = triple;
  const name = (ingNames && ingNames[id]) || id;
  if (qty == null) return name;
  const nb = Math.round(qty * 100) / 100;
  if (!unit || unit === 'pc') return `${nb} ${name}`;
  const lab = (UNITS[unit] && UNITS[unit][0]) || unit;
  const pl = nb > 1.4 && UNITS_PL[unit] ? UNITS_PL[unit][0] : lab;
  return `${nb} ${pl} ${name}`.replace(/\s+/g, ' ');
}

/* ---------------- illustration ---------------- */
/* Une fiche importée n'a pas de dessin : on en compose un à partir de ses
   étiquettes. Déterministe, pour qu'un même plat garde toujours le sien. */
const RX_ART_BY_TAG = {
  soup: ['bowl', 'soup'], stew: ['pot', 'stew'], rice: ['bowl', 'rice'],
  noodles: ['bowl', 'noodle'], grill: ['board', 'grill'], sea: ['plate', 'fish'],
  sweet: ['plate', 'cake'], bread: ['board', 'flat'], drink: ['glass', 'drink'],
  fresh: ['bowl', 'salad'], raw: ['bowl', 'salad'], veg: ['bowl', 'salad'],
  bake: ['plate', 'pastry'], fry: ['plate', 'pastry'], legume: ['pot', 'stew'],
  fruit: ['bowl', 'salad'], cheese: ['board', 'flat'], street: ['board', 'roll']
};
const RX_PALETTES = [
  { bg: '#2a3550', food: ['#d97327', '#e8b04b', '#c9482c', '#efe0bb'], garnish: '#6fbf8f' },
  { bg: '#26485c', food: ['#c9482c', '#efc06a', '#8f3b2a', '#f2e6c8'], garnish: '#7fc79a' },
  { bg: '#3a2b3f', food: ['#b8552f', '#e0a83a', '#7a3326', '#f0e3c6'], garnish: '#8fc27a' },
  { bg: '#243b34', food: ['#e0913a', '#f2cd7c', '#a8532c', '#f6efdc'], garnish: '#5fb387' },
  { bg: '#2f2a45', food: ['#d9b13a', '#efd694', '#9c5a2c', '#f4ecd8'], garnish: '#6fbf8f' }
];
function rxAutoArt(id, tags) {
  let v = 'plate', style = 'other';
  for (const tg of tags || []) if (RX_ART_BY_TAG[tg]) { [v, style] = RX_ART_BY_TAG[tg]; break; }
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const p = RX_PALETTES[h % RX_PALETTES.length];
  return { v, style, bg: p.bg, plate: '#f4efe3', food: p.food.slice(), garnish: p.garnish };
}

/* ============================================================
   Export
   ============================================================ */
function rxDishRow(d, ingNames) {
  const steps = l => (d.s[l] || []).join('\n');
  return [
    d.id, d.c, d.lat, d.lon, d.base, d.prep, d.cook, d.diff,
    (d.tags || []).join(', '),
    d.n.fr || '', d.n.en || '', d.n.es || '', d.n.pt || '',
    d.p.fr || '', d.p.en || '', d.p.es || '', d.p.pt || '',
    d.d.fr || '', d.d.en || '', d.d.es || '', d.d.pt || '',
    steps('fr'), steps('en'), steps('es'), steps('pt'),
    (d.i || []).map(t => rxFormatIng(t, ingNames)).join('\n'),
    (WIKI[d.id] && WIKI[d.id][1]) || '', (WIKI[d.id] && WIKI[d.id][0]) || '',
    d._hidden ? 'non' : 'oui',
    JSON.stringify(d.art || {})
  ];
}

function rxBuildWorkbook(dishes, ing) {
  const ingNames = {};
  for (const id in ing) ingNames[id] = ing[id][0];

  const recettes = [RX_COLS.map(c => c[1]), ...dishes.map(d => rxDishRow(d, ingNames))];

  const ingRows = [['identifiant', 'français', 'anglais', 'espagnol', 'portugais'],
  ...Object.keys(ing).sort().map(id => [id, ing[id][0], ing[id][1], ing[id][2], ing[id][3]])];

  const conts = { eu: 'Europe', as: 'Asie', af: 'Afrique', na: 'Amérique du Nord', sa: 'Amérique du Sud', oc: 'Océanie' };
  const listes = [['continent', 'libellé', '', 'difficulté', 'libellé', '', 'étiquette', 'libellé', '', 'unité', 'libellé']];
  const tagIds = Object.keys(TAGS), unitIds = Object.keys(UNITS);
  const contIds = Object.keys(conts), diffs = ['1', '2', '3'], diffLab = ['Facile', 'Moyen', 'Difficile'];
  const n = Math.max(tagIds.length, unitIds.length, contIds.length, 3);
  for (let i = 0; i < n; i++) {
    listes.push([
      contIds[i] || '', contIds[i] ? conts[contIds[i]] : '', '',
      diffs[i] || '', diffLab[i] || '', '',
      tagIds[i] || '', tagIds[i] ? TAGS[tagIds[i]][0] : '', '',
      unitIds[i] || '', unitIds[i] ? (UNITS[unitIds[i]][0] || '(à l’unité)') : ''
    ]);
  }

  return [
    { name: RX_HELP_SHEET, rows: rxHelpRows(), widths: [104] },
    { name: RX_SHEET, rows: recettes, widths: RX_WIDTHS, freeze: true },
    { name: RX_ING_SHEET, rows: ingRows, widths: [26, 32, 32, 32, 32], freeze: true },
    { name: RX_LIST_SHEET, rows: listes, widths: [14, 20, 3, 12, 14, 3, 16, 22, 3, 12, 18], freeze: true }
  ];
}

function rxHelpRows() {
  return [
    ['Un monde à table — modèle d’import / export'],
    [''],
    ['Comment ça marche'],
    ['La feuille « Recettes » contient une ligne par spécialité. Vous pouvez modifier les lignes existantes'],
    ['ou en ajouter à la suite. Le fichier se réimporte depuis le site, en mode administration,'],
    ['par le bouton « Importer ». Un aperçu vous montre ce qui sera ajouté ou remplacé avant d’écrire quoi que ce soit.'],
    [''],
    ['Les colonnes'],
    ['identifiant — laissez vide pour une nouvelle recette : il sera créé à partir du nom français.'],
    ['                Ne le modifiez jamais sur une ligne existante, c’est lui qui identifie la fiche.'],
    ['continent — un code parmi eu, as, af, na, sa, oc (voir la feuille « Listes »).'],
    ['latitude / longitude — en degrés décimaux. Exemple pour Marseille : 43.296 et 5.37.'],
    ['personnes — nombre de convives pour lequel les quantités sont indiquées.'],
    ['difficulté — 1 facile, 2 moyen, 3 difficile.'],
    ['étiquettes — codes séparés par des virgules, par exemple : sea, sunday (voir « Listes »).'],
    ['nom / lieu / description / étapes — les quatre langues sont obligatoires (FR, EN, ES, PT).'],
    ['                Dans les étapes, une ligne par étape (Alt + Entrée dans Excel pour aller à la ligne).'],
    ['ingrédients — une ligne par ingrédient, sous la forme : quantité, unité, nom français.'],
    ['                Exemples :  1200 g poisson de roche   ·   4 gousses ail   ·   6 c. à soupe huile d’olive'],
    ['                Sans quantité, écrivez simplement le nom : sel'],
    ['                Un ingrédient inconnu du lexique sera créé ; complétez alors ses traductions'],
    ['                dans la feuille « Ingrédients ».'],
    ['Wikipédia FR / EN — titres exacts des articles, facultatifs (servent à retrouver une photo).'],
    ['publiée — oui ou non. « non » masque la fiche du site sans l’effacer.'],
    ['illustration — dessin de la fiche, généré automatiquement. Laissez tel quel.'],
    [''],
    ['Bon à savoir'],
    ['Une ligne dont l’identifiant existe déjà remplace la fiche : elle n’est jamais dupliquée.'],
    ['L’aperçu d’import vous laisse décocher, une par une, les fiches existantes que vous ne voulez pas écraser.'],
    ['Une ligne incomplète est signalée et ignorée : le reste du fichier s’importe quand même.']
  ];
}

/* ============================================================
   Import
   ============================================================ */
function rxHeaderMap(headerRow) {
  const map = {};
  (headerRow || []).forEach((h, i) => {
    const n = rxNorm(h);
    if (!n) return;
    for (const [key, label] of RX_COLS) if (rxNorm(label) === n || rxNorm(key) === n) map[key] = i;
  });
  return map;
}

/* lecture de la feuille des ingrédients : renvoie le lexique fourni par le fichier */
function rxReadIngSheet(rows) {
  const out = {};
  if (!rows || !rows.length) return out;
  const head = rows[0].map(rxNorm);
  const col = names => { for (const n of names) { const i = head.indexOf(n); if (i >= 0) return i; } return -1; };
  const ci = col(['identifiant', 'id']), cf = col(['francais', 'fr']), ce = col(['anglais', 'en']),
    cs = col(['espagnol', 'es']), cp = col(['portugais', 'pt']);
  if (cf < 0) return out;
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r] || [];
    const fr = String(row[cf] || '').trim();
    if (!fr) continue;
    const id = String((ci >= 0 && row[ci]) || '').trim() || rxSlug(fr).replace(/-/g, '_');
    out[id] = [fr,
      String((ce >= 0 && row[ce]) || '').trim() || fr,
      String((cs >= 0 && row[cs]) || '').trim() || fr,
      String((cp >= 0 && row[cp]) || '').trim() || fr];
  }
  return out;
}

/* Analyse complète du classeur. N'écrit rien : produit de quoi
   afficher un aperçu honnête avant toute modification. */
function rxParseWorkbook(sheets, existing, lexicon) {
  const rows = sheets[RX_SHEET] || sheets[Object.keys(sheets).find(k => rxNorm(k) === rxNorm(RX_SHEET))] || null;
  if (!rows || rows.length < 2) {
    return { error: `Le classeur ne contient pas de feuille « ${RX_SHEET}` + ' » remplie.' };
  }
  const map = rxHeaderMap(rows[0]);
  const missing = ['continent', 'lat', 'lon', 'n_fr'].filter(k => map[k] === undefined);
  if (missing.length) return { error: 'Colonnes introuvables dans la feuille « Recettes ». Repartez du fichier exporté par le site.' };

  const fileIng = rxReadIngSheet(sheets[RX_ING_SHEET] ||
    sheets[Object.keys(sheets).find(k => rxNorm(k) === rxNorm(RX_ING_SHEET))]);

  // index des noms français connus → identifiant du lexique
  const byName = {};
  const allIng = Object.assign({}, lexicon, fileIng);
  for (const id in allIng) byName[rxNorm(allIng[id][0])] = id;

  const known = new Set(Object.keys(existing));
  const seen = new Set();
  const out = [], newIng = {};

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r] || [];
    const cell = k => (map[k] === undefined ? '' : String(row[map[k]] == null ? '' : row[map[k]]).trim());
    if (!RX_COLS.some(([k]) => cell(k))) continue;      // ligne vide

    const rec = { line: r + 1, errors: [], warnings: [] };
    const nameFr = cell('n_fr');
    if (!nameFr) { rec.errors.push('nom FR manquant'); }

    rec.id = cell('id') || rxSlug(nameFr);
    if (seen.has(rec.id)) rec.errors.push('identifiant en double dans le fichier');
    seen.add(rec.id);
    rec.exists = known.has(rec.id);

    const c = rxNorm(cell('continent'));
    const CONT = { eu: 'eu', as: 'as', af: 'af', na: 'na', sa: 'sa', oc: 'oc', europe: 'eu', asie: 'as', asia: 'as', afrique: 'af', africa: 'af', 'amerique du nord': 'na', 'amerique du sud': 'sa', oceanie: 'oc' };
    rec.continent = CONT[c];
    if (!rec.continent) rec.errors.push('continent invalide');

    rec.lat = rxNum(cell('lat')); rec.lon = rxNum(cell('lon'));
    if (rec.lat == null || rec.lat < -90 || rec.lat > 90) rec.errors.push('latitude invalide');
    if (rec.lon == null || rec.lon < -180 || rec.lon > 180) rec.errors.push('longitude invalide');

    rec.base = Math.max(1, Math.round(rxNum(cell('base')) || 4));
    rec.prep = Math.max(0, Math.round(rxNum(cell('prep')) || 0));
    rec.cook = Math.max(0, Math.round(rxNum(cell('cook')) || 0));
    const df = Math.round(rxNum(cell('diff')) || 1);
    rec.diff = df >= 1 && df <= 3 ? df : 1;

    rec.tags = cell('tags').split(/[,;]/).map(s => rxNorm(s).replace(/ /g, '')).filter(Boolean)
      .map(s => TAGS[s] ? s : (Object.keys(TAGS).find(k => rxNorm(TAGS[k][0]) === rxNorm(s)) || null))
      .filter(Boolean).slice(0, 4);

    rec.texts = {};
    for (const l of LANGS) {
      const name = cell('n_' + l), place = cell('p_' + l),
        desc = cell('d_' + l), steps = cell('s_' + l).split('\n').map(s => s.trim()).filter(Boolean);
      if (!name || !place || !desc || !steps.length) {
        rec.errors.push('texte ' + l.toUpperCase() + ' incomplet');
      }
      rec.texts[l] = { name, place, description: desc, steps };
    }

    /* Le lexique contient des synonymes : « lait entier » existe sous
       deux identifiants. Pour ne pas réécrire silencieusement les
       références d'une fiche à chaque réimport, on regarde d'abord les
       ingrédients que cette fiche utilise déjà. */
    const prev = {};
    const old = existing[rec.id];
    if (old && old.i) for (const [iid] of old.i) {
      const nm = allIng[iid] && allIng[iid][0];
      if (nm) prev[rxNorm(nm)] = iid;
    }

    rec.ingredients = [];
    const isKnown = name => {
      const k = rxNorm(name);
      return prev[k] !== undefined || byName[k] !== undefined;
    };
    for (const line of cell('ing').split('\n')) {
      const p = rxParseIngLine(line, isKnown);
      if (!p || !p.name) continue;
      let key = rxNorm(p.name);
      let id = prev[key] || byName[key];
      if (!id && key.endsWith('s')) id = prev[key.slice(0, -1)] || byName[key.slice(0, -1)];   // pluriel toléré
      if (!id) {
        id = rxSlug(p.name).replace(/-/g, '_');
        byName[key] = id;
        newIng[id] = [p.name, p.name, p.name, p.name];
        rec.warnings.push('nouvel ingrédient : ' + p.name);
      }
      rec.ingredients.push([id, p.qty, p.qty == null ? '' : p.unit]);
    }
    if (!rec.ingredients.length) rec.errors.push('aucun ingrédient');

    const wfr = cell('wiki_fr'), wen = cell('wiki_en');
    rec.wiki = (wfr || wen) ? [wen || wfr, wfr || wen] : null;
    rec.published = rxNorm(cell('published')) !== 'non';

    let art = null;
    try { art = cell('art') ? JSON.parse(cell('art')) : null; } catch (e) { art = null; }
    rec.art = (art && art.style) ? art : rxAutoArt(rec.id, rec.tags);

    rec.ok = rec.errors.length === 0;
    out.push(rec);
  }

  // ingrédients réellement nouveaux (absents du lexique du site)
  const created = {};
  for (const id in newIng) if (!lexicon[id]) created[id] = newIng[id];
  for (const id in fileIng) {
    const cur = lexicon[id];
    if (!cur || cur.join('|') !== fileIng[id].join('|')) created[id] = fileIng[id];
  }

  return {
    records: out,
    newIngredients: created,
    counts: {
      total: out.length,
      nouvelles: out.filter(r => r.ok && !r.exists).length,
      existantes: out.filter(r => r.ok && r.exists).length,
      rejetees: out.filter(r => !r.ok).length
    }
  };
}
