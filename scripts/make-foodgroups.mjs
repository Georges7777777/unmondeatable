/* ============================================================
   make-foodgroups.mjs — range chaque ingrédient du lexique dans
   une famille : porc, bœuf, volaille, agneau, gibier, lapin,
   poisson, fruits de mer, alcool.

   Le motif seul se trompe — « collard greens » n'est pas du porc,
   « mascarpone » n'est pas un poisson — d'où la liste de
   corrections explicites plus bas. Ce qui n'entre dans aucune
   famille n'en a pas : c'est le cas de la plupart des légumes.

   Usage : node scripts/make-foodgroups.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(HERE, '../../src');
const OUT = path.resolve(HERE, '../src/engine/foodgroups.js');

const { ING } = new Function(fs.readFileSync(path.join(SRC, 'lexicon.js'), 'utf8') + '\nreturn { ING };')();
const ids = Object.keys(ING);

const MOTIF = {
  pork: /pork|bacon|^lard$|^ham$|_ham|chorizo|sausage|salami|pancetta|guanciale|speck|prosciutto|mortadella|andouill|boudin|trotter|crackling|lardon|linguica|farinheira|alheira|morcilla|nduja|saucisson|cotechino|zampone|jambon/i,
  beef: /beef|veal|oxtail|tripe|brisket|charque|carne_seca|dried_beef|cecina|corned|marrow|suet|beef_tallow|biltong|pastrami|bresaola/i,
  poultry: /chicken|duck|goose|turkey|^hen$|quail(?!_egg)|poultry|foie_gras|gizzard|capon|guinea_fowl|squab/i,
  lamb: /lamb|mutton|goat_/i,
  game: /venison|boar|^hare|pheasant|partridge|grouse|reindeer|elk|kangaroo|horse_meat|game_/i,
  rabbit: /rabbit/i,
  fish: /fish|cod|salmon|tuna|anchov|sardine|herring|mackerel|trout|^eel|carp|bream|sea_bass|haddock|pike|sturgeon|tilapia|grouper|snapper|mahi|kingfish|lamprey|caviar|roe$|bonito|monkfish|pollock|halibut|turbot|sole|whiting|smelt|rockfish|hilsa|dashi|katsuobushi|surimi|garum/i,
  seafood: /shrimp|prawn|crab|lobster|mussel|clam|oyster|squid|octopus|scallop|snail|cuttlefish|conch|crayfish|cockle|winkle|langoust|shellfish|barnacle|urchin|abalone|escargot/i
};
const ALCOOL = /wine|beer|(^|_)rum($|_)|brandy|cognac|armagnac|whisk|vodka|sherry|port_|marsala|vermouth|cider|sake|mirin|ouzo|pastis|akvavit|calvados|kirsch|grappa|tequila|mezcal|madeira|aguardente|cachaca|pisco|liqueur|champagne|prosecco|stout/i;
const PAS_ALCOOL = /vinegar|portobello/i;

/* le motif attrape trop, ou pas assez */
const RETIRER = {
  pork: ['collard_greens', 'graham_crackers', 'beef_sausage', 'kazy_sausage', 'smen',
    'lamb_sausage',
    'sausage_casing', 'black_sausage', 'blood_sausage', 'white_sausage', 'fresh_sausage',
    'sausage', 'smoked_sausage'],
  beef: ['red_kidney_beans', 'beef_broth', 'beef_stock', 'lamb_kidney', 'ground_veal', 'mutton_tallow',
    'sheep_suet', 'sheep_blood', 'sheep_head', 'goat_tripe'],
  poultry: ['chicken_broth', 'chicken_stock', 'quail_egg', 'pigeon_peas'],
  fish: ['mascarpone', 'lemon_peel', 'fish_sauce', 'anchovy_broth', 'fish_broth',
    'crayfish', 'crayfish_powder', 'cuttlefish', 'dashi_stock'],
  seafood: ['oyster_crackers', 'oyster_sauce', 'shrimp_paste'],
  game: ['horseradish']
};
const AJOUTER = {
  beef: ['ground_veal', 'veal_foot', 'veal_shank', 'veal_shoulder', 'veal_escalope', 'jameed',
    'sirloin_steak', 'picanha', 'ox_blood_curd'],
  pork: ['pig_caul'],
  lamb: ['kazy_sausage', 'sheep_pluck', 'mutton_tallow', 'lamb_sausage',
    'sheep_suet', 'sheep_blood', 'sheep_head', 'ram_testicles', 'goat_tripe'],
  seafood: ['cuttlefish', 'crayfish', 'crayfish_powder', 'limpets', 'salted_shrimp'],
  fish: ['greenland_shark'],
  /* le cochon d'Inde est un mammifère d'élevage : ni gibier ni volaille */
  game: ['guinea_pig'],
  /* invisibles dans l'assiette, décisifs pour un végétarien */
  fish_trace: ['fish_sauce', 'anchovy_broth', 'fish_broth', 'dashi_stock', 'shrimp_paste',
    'oyster_sauce', 'worcestershire', 'nam_pla', 'bagoong', 'patis', 'salted_shrimp'],
  meat_trace: ['marshmallows', 'pig_caul',
    'beef_broth', 'beef_stock', 'chicken_broth', 'chicken_stock', 'lamb_bones',
    'pork_bones', 'beef_bones', 'veal_bones', 'gelatin', 'meat_stock', 'lard']
};

const VIANDES = ['pork', 'beef', 'poultry', 'lamb', 'game', 'rabbit'];
const ORDRE = [...VIANDES, 'fish', 'seafood', 'fish_trace', 'meat_trace', 'alcohol'];
const cat = Object.fromEntries(ORDRE.map(k => [k, new Set()]));

for (const id of ids) {
  for (const [k, re] of Object.entries(MOTIF)) if (re.test(id)) { cat[k].add(id); break; }
  if (ALCOOL.test(id) && !PAS_ALCOOL.test(id)) cat.alcohol.add(id);
}
for (const [k, list] of Object.entries(RETIRER)) for (const id of list) cat[k].delete(id);
for (const [k, list] of Object.entries(AJOUTER)) for (const id of list) if (id in ING) cat[k].add(id);
/* une viande et une seule par ingrédient */
for (const a of VIANDES) for (const b of VIANDES) if (a < b) for (const id of cat[a]) cat[b].delete(id);

const head = `/* ============================================================
   foodgroups.js — à quelle famille appartient chaque ingrédient.

   Sert aux filtres : « sans viande », « sans porc », « plats de
   gibier »… Les bouillons et sauces d'origine animale figurent à
   part : ils ne font pas d'un plat un plat de poisson, mais ils
   empêchent de le dire végétarien.

   Fichier engendré par scripts/make-foodgroups.mjs — ne pas
   modifier à la main : corrigez plutôt les listes du script.
   ============================================================ */
const FOOD_GROUPS = {
`;
const body = ORDRE.map(k => `  ${k}: [${[...cat[k]].sort().map(x => `'${x}'`).join(', ')}]`).join(',\n');
fs.writeFileSync(OUT, head + body + '\n};\n');

console.log(`${ids.length} ingrédients au lexique`);
for (const k of ORDRE) console.log(`  ${k.padEnd(11)} ${String(cat[k].size).padStart(3)}`);
