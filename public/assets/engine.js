/* ===== i18n.js ===== */
/* ============================================================
   i18n — interface, units, tags
   ============================================================ */
const LANGS = ['fr', 'en'];
const UI = {
  fr: {
    tagline: 'Le Goût du Monde', title1: 'Un monde à', title2: 'table',
    search: 'Chercher un plat, un pays…', noRes: 'Aucun résultat',
    emptyTitle: 'Faites tourner le globe',
    emptyText: 'Cliquez sur un point doré pour découvrir une spécialité locale, sa recette et ses ingrédients — ajustés au nombre de convives.',
    suggest: 'Ou laissez-vous tenter :',
    ingredients: 'Ingrédients', method: 'Préparation', servings: 'Pour combien de personnes ?',
    people: 'pers.', prep: 'Préparation', cook: 'Cuisson', diff: 'Difficulté',
    min: 'min', h: 'h', nearby: 'À découvrir dans la région', close: 'Fermer',
    toTaste: 'à volonté', hint: 'Glissez pour tourner le globe · molette pour zoomer · cliquez sur un point',
    all: 'Le monde entier', spec: 'spécialités', of: 'de',
    diffs: ['Facile', 'Moyen', 'Exigeant'],
    conts: { eu: 'Europe', as: 'Asie', af: 'Afrique', na: 'Amérique du Nord', sa: 'Amérique du Sud', oc: 'Océanie' },
    reset: 'Vue mondiale', photoBy: 'Photo :', photoOff: 'Photo indisponible — illustration',
    sameCity: 'Autres spécialités de la ville',
    photoAdd: 'Ajouter une photo', photoChange: 'Changer la photo',
    photoEditHelp: 'Importer votre propre photo pour ce plat',
    photoReset: 'Revenir à la photo d’origine', photoMine: 'Générée par IA',
    photoSaving: 'Enregistrement…', photoSaved: 'Photo enregistrée',
    photoRemoved: 'Photo personnelle retirée', photoError: 'Impossible d’enregistrer cette image',
    photoBadType: 'Veuillez choisir un fichier image',
    loadError: 'Chargement impossible, vérifiez votre connexion',
    filters: 'Filtres', filtersOn: 'filtre(s)', filtersClear: 'Tout effacer',
    fWithout: 'Sans', fGroups: 'Ingrédient principal', fDiff: 'Difficulté', fSpeed: 'Temps total', fTags: 'Occasion',
    fNone: 'Aucune fiche ne correspond à ces filtres',
    without: { meat: 'viande', fish: 'poisson', pork: 'porc', beef: 'bœuf', alcohol: 'alcool' },
    groups: { veg: 'Végétarien', pork: 'Porc', beef: 'Bœuf et veau', poultry: 'Volaille', lamb: 'Agneau et mouton',
              game: 'Gibier', rabbit: 'Lapin', fish: 'Poisson', seafood: 'Fruits de mer' },
    speeds: { fast: 'Moins de 45 min', medium: '45 min à 2 h', long: 'Plus de 2 h' },
  },
  en: {
    tagline: 'A Taste of the World', title1: 'A World at the', title2: 'Table',
    search: 'Search a dish, a country…', noRes: 'No result',
    emptyTitle: 'Spin the globe',
    emptyText: 'Click a golden dot to discover a local speciality, its recipe and its ingredients — scaled to the number of guests.',
    suggest: 'Or try one of these:',
    ingredients: 'Ingredients', method: 'Method', servings: 'How many people?',
    people: 'people', prep: 'Prep', cook: 'Cook', diff: 'Difficulty',
    min: 'min', h: 'h', nearby: 'More from this region', close: 'Close',
    toTaste: 'to taste', hint: 'Drag to spin · scroll to zoom · click a dot',
    all: 'Whole world', spec: 'specialities', of: 'of',
    diffs: ['Easy', 'Medium', 'Ambitious'],
    conts: { eu: 'Europe', as: 'Asia', af: 'Africa', na: 'North America', sa: 'South America', oc: 'Oceania' },
    reset: 'World view', photoBy: 'Photo:', photoOff: 'Photo unavailable — illustration',
    sameCity: 'Other specialities from this city',
    photoAdd: 'Add a photo', photoChange: 'Change photo',
    photoEditHelp: 'Upload your own photo for this dish',
    photoReset: 'Back to the original photo', photoMine: 'AI-generated',
    photoSaving: 'Saving…', photoSaved: 'Photo saved',
    photoRemoved: 'Personal photo removed', photoError: 'Could not save this image',
    photoBadType: 'Please choose an image file',
    loadError: 'Could not load, check your connection',
    filters: 'Filters', filtersOn: 'filter(s)', filtersClear: 'Clear all',
    fWithout: 'Without', fGroups: 'Main ingredient', fDiff: 'Difficulty', fSpeed: 'Total time', fTags: 'Occasion',
    fNone: 'No dish matches these filters',
    without: { meat: 'meat', fish: 'fish', pork: 'pork', beef: 'beef', alcohol: 'alcohol' },
    groups: { veg: 'Vegetarian', pork: 'Pork', beef: 'Beef and veal', poultry: 'Poultry', lamb: 'Lamb and mutton',
              game: 'Game', rabbit: 'Rabbit', fish: 'Fish', seafood: 'Seafood' },
    speeds: { fast: 'Under 45 min', medium: '45 min to 2 h', long: 'Over 2 h' },
  }
};

/* units: [fr, en] — singular form; g/ml/etc are invariable */
const UNITS = {
  g: ['g', 'g'],
  kg: ['kg', 'kg'],
  ml: ['ml', 'ml'],
  cl: ['cl', 'cl'],
  l: ['l', 'l'],
  pc: ['', ''],
  tbsp: ['c. à soupe', 'tbsp'],
  tsp: ['c. à café', 'tsp'],
  pinch: ['pincée', 'pinch'],
  clove: ['gousse', 'clove'],
  bunch: ['bouquet', 'bunch'],
  slice: ['tranche', 'slice'],
  sprig: ['brin', 'sprig'],
  cup: ['tasse', 'cup'],
  can: ['boîte', 'can'],
  sheet: ['feuille', 'sheet'],
  stick: ['bâton', 'stick'],
  drizzle: ['filet', 'drizzle'],
  stalk: ['branche', 'stalk'],
  drop: ['goutte', 'drop']
};
/* plural forms where needed (fr/en) */
const UNITS_PL = {
  tbsp: ['c. à soupe', 'tbsp'],
  tsp: ['c. à café', 'tsp'],
  pinch: ['pincées', 'pinches'],
  clove: ['gousses', 'cloves'],
  bunch: ['bouquets', 'bunches'],
  slice: ['tranches', 'slices'],
  sprig: ['brins', 'sprigs'],
  cup: ['tasses', 'cups'],
  can: ['boîtes', 'cans'],
  sheet: ['feuilles', 'sheets'],
  stick: ['bâtons', 'sticks'],
  drizzle: ['filets', 'drizzles'],
  stalk: ['branches', 'stalks'],
  drop: ['gouttes', 'drops']
};

const TAGS = {
  street: ['Street food', 'Street food'],
  sunday: ['Plat du dimanche', 'Sunday dish'],
  festive: ['Fête', 'Festive'],
  comfort: ['Réconfortant', 'Comfort food'],
  sea: ['Produits de la mer', 'Seafood'],
  veg: ['Végétarien', 'Vegetarian'],
  spicy: ['Épicé', 'Spicy'],
  slow: ['Mijoté', 'Slow-cooked'],
  grill: ['Grillé', 'Grilled'],
  sweet: ['Sucré', 'Sweet'],
  soup: ['Soupe', 'Soup'],
  breakfast: ['Petit-déjeuner', 'Breakfast'],
  bake: ['Au four', 'Baked'],
  fresh: ['Cru & frais', 'Raw & fresh'],
  rice: ['Riz', 'Rice'],
  noodles: ['Nouilles', 'Noodles'],
  bread: ['Pain & pâte', 'Bread & dough'],
  stew: ['Ragoût', 'Stew'],
  legume: ['Légumineuses', 'Pulses'],
  poultry: ['Volaille', 'Poultry'],
  beef: ['Bœuf', 'Beef'],
  lamb: ['Agneau', 'Lamb'],
  pork: ['Porc', 'Pork'],
  cheese: ['Fromage', 'Cheese'],
  fry: ['Frit', 'Fried'],
  drink: ['Boisson', 'Drink'],
  fast: ['Rapide', 'Quick'],
  fruit: ['Fruit', 'Fruit'],
  raw: ['Cru', 'Raw']
};

/* ===== data.js ===== */
/* ============================================================
   data.js — chargement des données et synchronisation.

   Stratégie : l'instantané statique s'affiche immédiatement
   (rapide, fonctionne hors ligne, servi par le CDN), puis on
   demande à la base uniquement ce qui a changé depuis. Les
   modifications faites dans l'administration apparaissent donc
   sans nouveau déploiement, sans ralentir le premier affichage.
   ============================================================ */
let DISHES = [];
let ING = {};
let WIKI = {};
const TEXTS = {};        // lang -> { id: {n,p,d,s} }
const LOADED = {};       // langues déjà téléchargées
let SNAPSHOT = null;
/* Vrai lorsque l'instantané a été construit avec la base sous la main :
   il contient alors déjà les photos publiées et les fiches modifiées
   depuis l'administration. Sinon, il faut aller les chercher. */
let PHOTOS_IN_SNAPSHOT = false;

const DATA_URL = 'data';

async function getJSON(url) {
  const r = await fetch(url, { cache: 'no-cache' });
  if (!r.ok) throw new Error(url + ' : ' + r.status);
  return r.json();
}

/* ---- socle + première langue ---- */
async function loadCore(lang) {
  const core = await getJSON(`${DATA_URL}/core.json`);
  SNAPSHOT = core.version;
  ING = core.ingredients;
  WIKI = {};
  // photos déjà connues au moment de la construction : affichées sans attendre
  if (core.photos) {
    PHOTOS_IN_SNAPSHOT = true;
    for (const id in core.photos) DB_PHOTO[id] = core.photos[id];
  }
  DISHES = core.dishes.map(d => {
    if (d.wiki) WIKI[d.id] = d.wiki;
    return { id: d.id, c: d.c, lat: d.lat, lon: d.lon, base: d.base, prep: d.prep,
             cook: d.cook, diff: d.diff, tags: d.tags, art: d.art, i: d.i, rank: d.rank,
             n: {}, p: {}, d: {}, s: {} };
  });
  await loadLang(lang);
}

/* ---- textes d'une langue (à la demande) ---- */
async function loadLang(lang) {
  if (LOADED[lang]) return;
  const pack = await getJSON(`${DATA_URL}/lang/${lang}.json`);
  TEXTS[lang] = pack.texts;
  applyLang(lang);
  LOADED[lang] = true;
}
function applyLang(lang) {
  const t = TEXTS[lang];
  if (!t) return;
  for (const d of DISHES) {
    const x = t[d.id];
    if (!x) continue;
    d.n[lang] = x.n; d.p[lang] = x.p; d.d[lang] = x.d; d.s[lang] = x.s;
  }
}

/* ============================================================
   Synchronisation avec la base : on ne récupère que les lignes
   modifiées après la date de l'instantané. En temps normal
   la réponse est vide et ne coûte quasiment rien.
   ============================================================ */
/* En-têtes de lecture anonyme.
   Supabase propose deux formats de clé publique :
     • « anon » historique  → un JWT (commence par eyJ), qui doit aussi
       être envoyé dans Authorization ;
     • « publishable » récent (sb_publishable_…) → pas un JWT ; l'envoyer
       en Bearer ferait échouer la requête.
   On s'adapte automatiquement au format fourni. */
function anonHeaders() {
  const h = { apikey: SUPA.anonKey };
  if (/^eyJ/.test(SUPA.anonKey)) h.Authorization = 'Bearer ' + SUPA.anonKey;
  return h;
}

async function syncFromDB(lang) {
  if (!window.SUPA || !SUPA.url || !SUPA.anonKey) return { changed: 0 };
  const h = anonHeaders();
  const since = encodeURIComponent(SNAPSHOT);
  let changed = 0;

  try {
    /* Les photos publiées depuis l'administration ne sont pas toujours
       présentes dans l'instantané : si la base n'était pas joignable au
       moment de la construction du site, elles n'y figurent pas. On les
       demande donc systématiquement, avant tout raccourci — c'est une
       requête légère, et une photo manquante se voit immédiatement. */
    if (!PHOTOS_IN_SNAPSHOT) {
      const ps = await fetch(
        `${SUPA.url}/rest/v1/atlas_dish_photos?select=dish_id,path,credit`, { headers: h }
      ).then(r => r.ok ? r.json() : []).catch(() => []);
      for (const row of ps) {
        DB_PHOTO[row.dish_id] = {
          url: `${SUPA.url}/storage/v1/object/public/atlas-photos/${row.path}`,
          credit: row.credit || ''
        };
      }
      if (ps.length) changed += ps.length;
    }

    // 1. rien d'autre n'a bougé ? on s'arrête là
    const v = await fetch(`${SUPA.url}/rest/v1/atlas_content_version?select=updated_at`, { headers: h })
      .then(r => r.ok ? r.json() : null).catch(() => null);
    if (v && v[0] && v[0].updated_at && new Date(v[0].updated_at) <= new Date(SNAPSHOT)) {
      return { changed };
    }

    const byId = Object.fromEntries(DISHES.map(d => [d.id, d]));

    // 2. fiches modifiées
    const ds = await fetch(
      `${SUPA.url}/rest/v1/atlas_dishes?select=*&updated_at=gt.${since}`, { headers: h }
    ).then(r => r.ok ? r.json() : []).catch(() => []);
    for (const row of ds) {
      let d = byId[row.id];
      if (!d) { d = { id: row.id, n: {}, p: {}, d: {}, s: {} }; DISHES.push(d); byId[row.id] = d; }
      d.c = row.continent; d.lat = row.lat; d.lon = row.lon;
      d.base = row.base; d.prep = row.prep; d.cook = row.cook; d.diff = row.diff;
      d.tags = row.tags || []; d.art = row.art || {}; d.i = row.ingredients || [];
      d.rank = row.rank; if (row.wiki) WIKI[row.id] = row.wiki;
      if (row.published === false) d._hidden = true; else delete d._hidden;
      changed++;
    }

    // 3. textes modifiés, dans la langue affichée uniquement
    const ts = await fetch(
      `${SUPA.url}/rest/v1/atlas_dish_texts?select=dish_id,name,place,description,steps&lang=eq.${lang}&updated_at=gt.${since}`,
      { headers: h }
    ).then(r => r.ok ? r.json() : []).catch(() => []);
    for (const row of ts) {
      const d = byId[row.dish_id];
      if (!d) continue;
      d.n[lang] = row.name; d.p[lang] = row.place;
      d.d[lang] = row.description; d.s[lang] = row.steps || [];
      changed++;
    }

  } catch (e) {
    // hors ligne ou base indisponible : le site continue avec l'instantané
    return { changed, offline: true };
  }
  DISHES = DISHES.filter(d => !d._hidden);
  return { changed };
}

/* photos venant de la base, partagées par tous les visiteurs */
const DB_PHOTO = {};

/* ===== foodgroups.js ===== */
/* ============================================================
   foodgroups.js — à quelle famille appartient chaque ingrédient.

   Sert aux filtres : « sans viande », « sans porc », « plats de
   gibier »… Les bouillons et sauces d'origine animale figurent à
   part : ils ne font pas d'un plat un plat de poisson, mais ils
   empêchent de le dire végétarien.

   Fichier engendré par scripts/make-foodgroups.mjs — ne pas
   modifier à la main : corrigez plutôt les listes du script.
   ============================================================ */
const FOOD_GROUPS = {
  pork: ['alheira_sausage', 'andouille', 'andouille_sausage', 'bacon', 'bayonne_ham', 'beef_trotters', 'chorizo', 'cooked_ham', 'farinheira', 'ground_pork', 'guanciale', 'ham', 'lard', 'marinated_pork', 'montbeliard_sausage', 'mortadella', 'nduja', 'pancetta', 'pinkel_sausage', 'pork_belly', 'pork_blood', 'pork_bones', 'pork_chops', 'pork_crackling', 'pork_cracklings', 'pork_ear', 'pork_fat', 'pork_kidney', 'pork_knuckle', 'pork_liver', 'pork_loin', 'pork_ribs', 'pork_rind', 'pork_sausage', 'pork_shank', 'pork_shoulder', 'pork_skin', 'pork_stomach', 'pork_trotters', 'prosciutto', 'salami', 'salt_pork', 'salted_pork', 'serrano_ham', 'smoked_bacon', 'smoked_ham', 'smoked_pork_collar', 'smoked_pork_loin', 'smoked_pork_ribs', 'strasbourg_sausage', 'toulouse_sausage'],
  beef: ['beef_bones', 'beef_brisket', 'beef_chuck', 'beef_heart', 'beef_marrow', 'beef_ribeye', 'beef_ribs', 'beef_round', 'beef_rump', 'beef_shank', 'beef_shin', 'beef_short_ribs', 'beef_shoulder', 'beef_sirloin', 'beef_skirt', 'beef_slices', 'beef_steak', 'beef_suet', 'beef_tallow', 'beef_tbone', 'beef_tendon', 'beef_tripe', 'bone_marrow', 'carne_seca', 'cecina', 'charque', 'corned_beef', 'dried_beef', 'ground_beef', 'ground_veal', 'marrow_bone', 'oxtail', 'salted_beef', 'tripe', 'veal', 'veal_escalope', 'veal_foot', 'veal_shank', 'veal_shoulder'],
  poultry: ['chicken', 'chicken_breast', 'chicken_gizzards', 'chicken_thighs', 'chicken_wings', 'duck', 'duck_confit', 'duck_fat', 'duck_legs', 'foie_gras', 'ground_chicken', 'hen', 'smoked_chicken', 'turkey', 'turkey_breast', 'whole_duck'],
  lamb: ['goat_meat', 'goat_pepper', 'goat_stomach', 'ground_lamb', 'kazy_sausage', 'lamb', 'lamb_bones', 'lamb_fat', 'lamb_kidney', 'lamb_leg', 'lamb_shoulder', 'mutton_shoulder', 'mutton_tallow', 'sheep_pluck', 'wind_dried_mutton'],
  game: ['horse_meat', 'partridge', 'reindeer', 'venison', 'whelks', 'wild_boar'],
  rabbit: ['rabbit'],
  fish: ['anchovy_fillets', 'bonito_flakes', 'canned_tuna', 'carp', 'catfish', 'cod', 'cod_fillet', 'dried_fish', 'eel', 'fish_cake', 'flying_fish', 'grouper', 'hilsa_fish', 'kingfish', 'lamprey', 'mackerel', 'monkfish', 'pickled_herring', 'pike', 'red_snapper', 'rockfish', 'salmon', 'salmon_roe', 'salt_cod', 'sardines', 'sea_bass', 'sea_bream', 'smoked_dried_tuna', 'smoked_fish', 'smoked_haddock', 'stockfish', 'tilapia', 'trout', 'tuna', 'white_fish', 'whitefish', 'whiting', 'whole_fish'],
  seafood: ['clams', 'cockles', 'coconut_crab', 'conch', 'crab', 'crab_meat', 'crayfish', 'crayfish_powder', 'cuttlefish', 'dried_shrimp', 'king_crab_legs', 'lobster', 'mussels', 'octopus', 'oysters', 'river_prawns', 'scallops', 'shrimp', 'smoked_shrimp', 'snails', 'spot_prawns', 'squid', 'squid_ink'],
  fish_trace: ['anchovy_broth', 'dashi_stock', 'fish_broth', 'fish_sauce', 'oyster_sauce', 'shrimp_paste', 'worcestershire'],
  meat_trace: ['beef_bones', 'beef_broth', 'beef_stock', 'chicken_broth', 'chicken_stock', 'gelatin', 'lamb_bones', 'lard', 'pork_bones'],
  alcohol: ['akvavit', 'armagnac', 'barolo_wine', 'beer', 'brandy', 'cachaca', 'calvados', 'dark_rum', 'dry_cider', 'dry_white_wine', 'kirsch', 'mirin', 'ouzo', 'port_wine', 'red_wine', 'rice_wine', 'rum', 'sherry', 'sparkling_wine', 'stout_beer', 'vodka', 'whisky', 'white_rum', 'white_wine']
};

/* ===== filters.js ===== */
/* ============================================================
   filters.js — trier les fiches autrement que par continent.

   Deux logiques distinctes, qui se combinent :
   — les exclusions (« sans porc », « sans alcool ») retirent des
     fiches, et s'appliquent toujours en dernier ;
   — les inclusions (« bœuf », « poisson ») n'en gardent que
     certaines, et se cumulent entre elles : cocher bœuf ET
     volaille montre les deux, pas leur intersection.

   Un plat cuit dans un fond de veau n'est pas un plat de veau,
   mais il n'est pas végétarien non plus : les bouillons et
   sauces d'origine animale comptent donc pour les exclusions,
   jamais pour les inclusions.
   ============================================================ */

/* famille → ingrédients, retourné à l'envers une fois pour toutes */
const GROUP_OF = (() => {
  const m = {};
  for (const [g, list] of Object.entries(FOOD_GROUPS))
    for (const id of list) (m[id] || (m[id] = [])).push(g);
  return m;
})();

const MEAT_GROUPS = ['pork', 'beef', 'poultry', 'lamb', 'game', 'rabbit'];
const SEA_GROUPS = ['fish', 'seafood'];

/* familles présentes dans une fiche, calculées une seule fois */
const GROUPS_CACHE = new Map();
function groupsOf(d) {
  let g = GROUPS_CACHE.get(d.id);
  if (g) return g;
  g = new Set();
  for (const [id] of d.i) for (const x of (GROUP_OF[id] || [])) g.add(x);
  GROUPS_CACHE.set(d.id, g);
  return g;
}
function forgetGroups(id) { if (id) GROUPS_CACHE.delete(id); else GROUPS_CACHE.clear(); }

const hasMeat = g => MEAT_GROUPS.some(x => g.has(x)) || g.has('meat_trace');
const hasSea = g => SEA_GROUPS.some(x => g.has(x)) || g.has('fish_trace');

/* temps total, en trois paliers */
function speedOf(d) {
  const total = (d.prep || 0) + (d.cook || 0);
  return total <= 45 ? 'fast' : total <= 120 ? 'medium' : 'long';
}

/* état vide : aucun filtre actif */
function emptyFilters() {
  return { without: new Set(), groups: new Set(), diff: new Set(), speed: new Set(), tags: new Set() };
}
const noFilters = f =>
  !f || (!f.without.size && !f.groups.size && !f.diff.size && !f.speed.size && !f.tags.size);

const WITHOUT_TEST = {
  meat: g => !hasMeat(g),
  fish: g => !hasSea(g),
  pork: g => !g.has('pork'),
  beef: g => !g.has('beef'),
  alcohol: g => !g.has('alcohol')
};

function matchFilters(d, f) {
  if (noFilters(f)) return true;
  const g = groupsOf(d);

  for (const w of f.without) { const test = WITHOUT_TEST[w]; if (test && !test(g)) return false; }

  if (f.groups.size) {
    let hit = false;
    for (const k of f.groups) {
      if (k === 'veg') { if (!hasMeat(g) && !hasSea(g)) { hit = true; break; } }
      else if (g.has(k)) { hit = true; break; }
    }
    if (!hit) return false;
  }

  if (f.diff.size && !f.diff.has(String(d.diff))) return false;
  if (f.speed.size && !f.speed.has(speedOf(d))) return false;
  if (f.tags.size && !(d.tags || []).some(x => f.tags.has(x))) return false;
  return true;
}

/* combien de fiches chaque case laisserait passer, les autres
   réglages restant en place : un compteur mort dit tout de suite
   qu'il est inutile de cocher */
function countFor(dishes, f, kind, key) {
  const probe = {
    without: new Set(f.without), groups: new Set(f.groups),
    diff: new Set(f.diff), speed: new Set(f.speed), tags: new Set(f.tags)
  };
  probe[kind].add(key);
  let n = 0;
  for (const d of dishes) if (matchFilters(d, probe)) n++;
  return n;
}

/* ===== admin.js ===== */
/* ============================================================
   admin.js — édition réservée au propriétaire du site.

   Le site public ne contient que la clé « anon », qui ne donne
   accès qu'à la lecture (règles RLS côté base). Toute écriture
   exige une session ouverte avec votre e-mail et mot de passe.
   ============================================================ */
let IS_ADMIN = false;
let SESSION = null;

const SB = {
  get url() { return window.SUPA && SUPA.url; },
  get key() { return window.SUPA && SUPA.anonKey; },
  get ready() { return !!(SB.url && SB.key); }
};

function authHeaders(json) {
  const h = { apikey: SB.key };
  // connecté : le jeton de session ; sinon la clé publique, mais uniquement
  // si c'est un JWT (les clés « publishable » récentes n'en sont pas)
  if (SESSION) h.Authorization = 'Bearer ' + SESSION.access_token;
  else if (/^eyJ/.test(SB.key || '')) h.Authorization = 'Bearer ' + SB.key;
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

/* ---------- session ---------- */
const SESSION_KEY = 'gdm-session';

function restoreSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s && s.expires_at && s.expires_at * 1000 > Date.now()) { SESSION = s; IS_ADMIN = true; }
    else localStorage.removeItem(SESSION_KEY);
  } catch (e) { }
}

async function adminLogin(email, password) {
  if (!SB.ready) throw new Error('Base non configurée');
  const r = await fetch(`${SB.url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: SB.key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error_description || j.msg || 'Identifiants refusés');
  SESSION = j; IS_ADMIN = true;
  localStorage.setItem(SESSION_KEY, JSON.stringify(j));
  return j;
}

function adminLogout() {
  SESSION = null; IS_ADMIN = false;
  localStorage.removeItem(SESSION_KEY);
}

/* ---------- la fiche existe-t-elle en base ? ----------
   Les tables des textes et des photos référencent atlas_dishes(dish_id).
   Une fiche présente dans l'instantané mais jamais importée dans la base
   n'y a pas de ligne : PostgreSQL refuse alors l'écriture, et PostgREST
   traduit ce refus par un 409. On sème donc la fiche à la volée, à partir
   des données locales, avant toute écriture qui en dépend. */
const DISH_ROW_OK = new Set();

function dishRowFrom(d) {
  const row = {
    id: d.id, continent: d.c, lat: d.lat, lon: d.lon,
    base: d.base, prep: d.prep, cook: d.cook, diff: d.diff,
    tags: d.tags || [], art: d.art || {}, ingredients: d.i || [],
    wiki: (typeof WIKI !== 'undefined' && WIKI[d.id]) || null,
    published: true
  };
  // le rang n'est renseigné que si on le connaît : l'omettre laisse
  // intacte la valeur déjà en base plutôt que de la remettre à zéro
  if (d.rank != null) row.rank = d.rank;
  return row;
}

async function ensureDishRow(dishId) {
  if (DISH_ROW_OK.has(dishId)) return;
  const d = DISHES.find(x => x.id === dishId);
  if (!d) throw new Error('Fiche introuvable : ' + dishId);

  // on regarde avant d'écrire : une fiche déjà en base ne doit rien
  // perdre de ce que l'administration y a mis (rang, retouches…)
  const look = await fetch(
    `${SB.url}/rest/v1/atlas_dishes?id=eq.${encodeURIComponent(dishId)}&select=id`,
    { headers: authHeaders() });
  if (look.ok && (await look.json()).length) { DISH_ROW_OK.add(dishId); return; }

  const r = await fetch(`${SB.url}/rest/v1/atlas_dishes?on_conflict=id`, {
    method: 'POST',
    headers: { ...authHeaders(true), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(dishRowFrom(d))
  });
  if (!r.ok) throw new Error(await explain(r, 'la fiche'));
  DISH_ROW_OK.add(dishId);
}

/* message d'erreur lisible plutôt qu'un simple numéro */
async function explain(res, quoi) {
  let detail = '';
  try { const j = await res.json(); detail = j.message || j.msg || j.error || ''; } catch (e) { }
  if (res.status === 401 || res.status === 403)
    return `Écriture refusée : reconnectez-vous (${res.status}).`;
  if (res.status === 409)
    return `Conflit en base sur ${quoi} (409) — ${detail || 'contrainte non satisfaite'}.`;
  return `Enregistrement de ${quoi} refusé (${res.status})${detail ? ' — ' + detail : ''}`;
}

/* ---------- photos ---------- */
function dataUrlToBlob(dataUrl) {
  const [head, b64] = dataUrl.split(',');
  const mime = (head.match(/:(.*?);/) || [, 'image/jpeg'])[1];
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return new Blob([buf], { type: mime });
}

/* envoie la photo dans le stockage et l'enregistre en base :
   elle devient aussitôt visible par tous les visiteurs */
async function publishPhoto(dishId, dataUrl, credit) {
  if (!IS_ADMIN) throw new Error('Connexion requise');
  await ensureDishRow(dishId);
  const blob = dataUrlToBlob(dataUrl);
  const path = `${dishId}-${Date.now()}.jpg`;

  const up = await fetch(`${SB.url}/storage/v1/object/atlas-photos/${path}`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': blob.type, 'x-upsert': 'true' },
    body: blob
  });
  if (!up.ok) throw new Error('Envoi de l’image refusé (' + up.status + ')');

  const prev = DB_PHOTO[dishId];
  const res = await fetch(`${SB.url}/rest/v1/atlas_dish_photos?on_conflict=dish_id`, {
    method: 'POST',
    headers: { ...authHeaders(true), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ dish_id: dishId, path, credit: credit || null })
  });
  if (!res.ok) throw new Error(await explain(res, 'la photo'));

  DB_PHOTO[dishId] = { url: `${SB.url}/storage/v1/object/public/atlas-photos/${path}`, credit: credit || '' };
  if (prev) removeStored(prev.url);   // ménage : on supprime l'ancienne
  return DB_PHOTO[dishId];
}

async function unpublishPhoto(dishId) {
  if (!IS_ADMIN) throw new Error('Connexion requise');
  const prev = DB_PHOTO[dishId];
  const r = await fetch(`${SB.url}/rest/v1/atlas_dish_photos?dish_id=eq.${encodeURIComponent(dishId)}`, {
    method: 'DELETE', headers: authHeaders()
  });
  if (!r.ok) throw new Error('Suppression refusée');
  delete DB_PHOTO[dishId];
  if (prev) removeStored(prev.url);
}

function removeStored(publicUrl) {
  const m = publicUrl && publicUrl.match(/atlas-photos\/(.+)$/);
  if (!m) return;
  fetch(`${SB.url}/storage/v1/object/atlas-photos/${m[1]}`, { method: 'DELETE', headers: authHeaders() })
    .catch(() => { });
}

/* ---------- textes des fiches ---------- */
async function saveDishText(dishId, lang, fields) {
  if (!IS_ADMIN) throw new Error('Connexion requise');
  await ensureDishRow(dishId);
  const r = await fetch(`${SB.url}/rest/v1/atlas_dish_texts?on_conflict=dish_id,lang`, {
    method: 'POST',
    headers: { ...authHeaders(true), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      dish_id: dishId, lang,
      name: fields.name, place: fields.place,
      description: fields.description, steps: fields.steps
    })
  });
  if (!r.ok) throw new Error(await explain(r, 'le texte'));
  const d = DISHES.find(x => x.id === dishId);
  if (d) { d.n[lang] = fields.name; d.p[lang] = fields.place; d.d[lang] = fields.description; d.s[lang] = fields.steps; }
}

async function saveDishFacts(dishId, fields) {
  if (!IS_ADMIN) throw new Error('Connexion requise');
  // upsert plutôt que PATCH : une fiche encore absente de la base serait
  // sinon « modifiée » sans qu'aucune ligne ne change, et sans rien dire.
  await ensureDishRow(dishId);
  // seules les colonnes retouchées sont envoyées : le reste garde sa valeur
  const r = await fetch(`${SB.url}/rest/v1/atlas_dishes?on_conflict=id`, {
    method: 'POST',
    headers: { ...authHeaders(true), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ id: dishId, ...fields })
  });
  if (!r.ok) throw new Error(await explain(r, 'la fiche'));
  const d = DISHES.find(x => x.id === dishId);
  if (d) Object.assign(d, {
    lat: fields.lat ?? d.lat, lon: fields.lon ?? d.lon,
    base: fields.base ?? d.base, prep: fields.prep ?? d.prep,
    cook: fields.cook ?? d.cook, diff: fields.diff ?? d.diff,
    i: fields.ingredients ?? d.i
  });
}

restoreSession();

/* ===== illus.js ===== */
/* ============================================================
   Illustrations — top-down flat-art SVG generated per dish
   ============================================================ */
function rng(seed) {
  let s = 0; for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.max(0, Math.min(255, Math.round(r + 255 * amt)));
  g = Math.max(0, Math.min(255, Math.round(g + 255 * amt)));
  b = Math.max(0, Math.min(255, Math.round(b + 255 * amt)));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const VESSELS = {
  plate: (c, r) => `<circle cx="${c}" cy="${c}" r="${r}" fill="url(#Gpl)"/><circle cx="${c}" cy="${c}" r="${r * .8}" fill="url(#Gpl2)"/>`,
  bowl: (c, r) => `<circle cx="${c}" cy="${c}" r="${r}" fill="url(#Gpl)"/><circle cx="${c}" cy="${c}" r="${r * .86}" fill="url(#Gpl2)"/><circle cx="${c}" cy="${c}" r="${r * .74}" fill="rgba(0,0,0,.10)"/>`,
  board: (c, r) => `<rect x="${c - r * 1.05}" y="${c - r * .92}" width="${r * 2.1}" height="${r * 1.84}" rx="${r * .16}" fill="url(#Gwd)"/>`,
  leaf: (c, r) => `<ellipse cx="${c}" cy="${c}" rx="${r * 1.08}" ry="${r * .95}" fill="#3f7a4a"/><ellipse cx="${c}" cy="${c}" rx="${r * 1.0}" ry="${r * .87}" fill="#4a8d55"/><path d="M${c - r} ${c} H${c + r}" stroke="#3a6f43" stroke-width="2"/>`,
  glass: (c, r) => {
    const w = r * 1.1, top = c - r * 1.15, bot = c + r * 1.15;
    return `<path d="M${c - w} ${top} L${c + w} ${top} L${c + w * .78} ${bot} Q${c} ${bot + r * .12} ${c - w * .78} ${bot} Z" fill="rgba(255,255,255,.10)" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
    <ellipse cx="${c}" cy="${top}" rx="${w}" ry="${w * .16}" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>`;
  },
  none: () => ''
};

/* ---- food styles (drawn inside radius r around centre c) ---- */
const STYLES = {
  stew(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .66}" fill="${p[0]}"/>`;
    s += `<circle cx="${c - r * .1}" cy="${c - r * .12}" r="${r * .46}" fill="${shade(p[0], .06)}" opacity=".8"/>`;
    for (let i = 0; i < 9; i++) {
      const a = rd() * 6.28, d = rd() * r * .5, rr = r * (.07 + rd() * .07);
      s += `<circle cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" r="${rr.toFixed(1)}" fill="${p[1 + (i % (p.length - 1))]}"/>`;
    }
    return s;
  },
  soup(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .72}" fill="${p[0]}"/><circle cx="${c}" cy="${c}" r="${r * .72}" fill="url(#Ggl)"/>`;
    for (let i = 0; i < 7; i++) {
      const a = rd() * 6.28, d = r * (.18 + rd() * .4);
      s += `<ellipse cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" rx="${(r * .13).toFixed(1)}" ry="${(r * .08).toFixed(1)}" transform="rotate(${(rd() * 360).toFixed(0)} ${(c + Math.cos(a) * d).toFixed(1)} ${(c + Math.sin(a) * d).toFixed(1)})" fill="${p[1 + (i % (p.length - 1))]}"/>`;
    }
    return s;
  },
  noodle(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .7}" fill="${p[0]}"/>`;
    for (let i = 0; i < 12; i++) {
      const y = c - r * .45 + i * (r * .9 / 11);
      const w = Math.sqrt(Math.max(0, (r * .62) ** 2 - (y - c) ** 2));
      s += `<path d="M${(c - w).toFixed(1)} ${y.toFixed(1)} q ${(w * .5).toFixed(1)} ${(rd() * 12 - 6).toFixed(1)} ${w.toFixed(1)} 0 q ${(w * .5).toFixed(1)} ${(rd() * 12 - 6).toFixed(1)} ${w.toFixed(1)} 0" fill="none" stroke="${p[1]}" stroke-width="${(r * .055).toFixed(1)}" stroke-linecap="round" opacity=".95"/>`;
    }
    for (let i = 0; i < 5; i++) {
      const a = rd() * 6.28, d = rd() * r * .42;
      s += `<circle cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" r="${(r * .1).toFixed(1)}" fill="${p[2 % p.length]}"/>`;
    }
    return s;
  },
  rice(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .62}" fill="${p[0]}"/><circle cx="${c - r * .08}" cy="${c - r * .08}" r="${r * .44}" fill="${shade(p[0], .07)}"/>`;
    for (let i = 0; i < 26; i++) {
      const a = rd() * 6.28, d = rd() * r * .58;
      s += `<ellipse cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" rx="${(r * .05).toFixed(1)}" ry="${(r * .028).toFixed(1)}" transform="rotate(${(rd() * 360).toFixed(0)} ${(c + Math.cos(a) * d).toFixed(1)} ${(c + Math.sin(a) * d).toFixed(1)})" fill="${i % 4 ? shade(p[0], .12) : p[1]}"/>`;
    }
    for (let i = 0; i < 6; i++) {
      const a = rd() * 6.28, d = r * (.15 + rd() * .35);
      s += `<circle cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" r="${(r * .09).toFixed(1)}" fill="${p[1 + (i % (p.length - 1))]}"/>`;
    }
    return s;
  },
  flat(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .78}" fill="${p[0]}"/><circle cx="${c}" cy="${c}" r="${r * .68}" fill="${p[1]}"/>`;
    for (let i = 0; i < 11; i++) {
      const a = rd() * 6.28, d = rd() * r * .58;
      s += `<circle cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" r="${(r * (.06 + rd() * .06)).toFixed(1)}" fill="${p[2 + (i % Math.max(1, p.length - 2))] || p[0]}"/>`;
    }
    for (let i = 0; i < 14; i++) {
      const a = rd() * 6.28, d = rd() * r * .6;
      s += `<circle cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" r="${(r * .022).toFixed(1)}" fill="rgba(255,255,255,.35)"/>`;
    }
    return s;
  },
  grill(c, r, p, rd) {
    let s = '';
    const n = 3, w = r * 1.16, h = r * .3;
    for (let i = 0; i < n; i++) {
      const y = c - r * .42 + i * (r * .42), x = c - w / 2 + (rd() * 10 - 5);
      s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(h * .35).toFixed(1)}" fill="${p[i % p.length]}"/>`;
      for (let k = 0; k < 3; k++) s += `<rect x="${(x + w * (.18 + k * .28)).toFixed(1)}" y="${y.toFixed(1)}" width="${(r * .05).toFixed(1)}" height="${h.toFixed(1)}" fill="rgba(60,25,10,.35)"/>`;
    }
    return s;
  },
  pastry(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .66}" fill="${p[0]}"/><circle cx="${c}" cy="${c}" r="${r * .66}" fill="url(#Ggl)"/>`;
    s += `<circle cx="${c}" cy="${c}" r="${r * .52}" fill="${shade(p[0], .05)}"/>`;
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * 6.28;
      s += `<path d="M${(c + Math.cos(a) * r * .66).toFixed(1)} ${(c + Math.sin(a) * r * .66).toFixed(1)} L${(c + Math.cos(a) * r * .2).toFixed(1)} ${(c + Math.sin(a) * r * .2).toFixed(1)}" stroke="${shade(p[0], -.12)}" stroke-width="${(r * .04).toFixed(1)}" stroke-linecap="round"/>`;
    }
    s += `<circle cx="${c}" cy="${c}" r="${r * .14}" fill="${p[1]}"/>`;
    return s;
  },
  roll(c, r, p, rd) {
    let s = '';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * 6.28 - 1.2, d = r * .38;
      const x = c + Math.cos(a) * d, y = c + Math.sin(a) * d;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * .24).toFixed(1)}" fill="${p[0]}"/>`;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * .18).toFixed(1)}" fill="${p[1]}"/>`;
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * .08).toFixed(1)}" fill="${p[2] || p[0]}"/>`;
    }
    return s;
  },
  skewer(c, r, p, rd) {
    let s = '';
    for (let i = 0; i < 3; i++) {
      const y = c - r * .38 + i * (r * .38);
      s += `<rect x="${(c - r * .82).toFixed(1)}" y="${(y - r * .02).toFixed(1)}" width="${(r * 1.64).toFixed(1)}" height="${(r * .05).toFixed(1)}" rx="2" fill="#b08a5c"/>`;
      for (let k = 0; k < 4; k++) {
        s += `<rect x="${(c - r * .62 + k * r * .33).toFixed(1)}" y="${(y - r * .13).toFixed(1)}" width="${(r * .26).toFixed(1)}" height="${(r * .26).toFixed(1)}" rx="${(r * .07).toFixed(1)}" fill="${p[(i + k) % p.length]}"/>`;
      }
    }
    return s;
  },
  salad(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .6}" fill="${shade(p[0], -.05)}" opacity=".35"/>`;
    for (let i = 0; i < 14; i++) {
      const a = rd() * 6.28, d = rd() * r * .5, x = c + Math.cos(a) * d, y = c + Math.sin(a) * d;
      s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r * .2).toFixed(1)}" ry="${(r * .11).toFixed(1)}" transform="rotate(${(rd() * 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${p[i % p.length]}" opacity=".95"/>`;
    }
    return s;
  },
  fish(c, r, p, rd) {
    const x = c, y = c;
    let s = `<path d="M${x - r * .72} ${y} q ${r * .5} ${-r * .42} ${r * 1.1} 0 q ${-r * .6} ${r * .42} ${-r * 1.1} 0z" fill="${p[0]}" stroke="${shade(p[0], -.14)}" stroke-width="${(r * .03).toFixed(1)}"/>`;
    s += `<path d="M${x + r * .38} ${y} l ${r * .3} ${-r * .22} l 0 ${r * .44} z" fill="${shade(p[0], -.08)}"/>`;
    s += `<circle cx="${(x - r * .42).toFixed(1)}" cy="${(y - r * .05).toFixed(1)}" r="${(r * .05).toFixed(1)}" fill="#2b2118"/>`;
    for (let i = 0; i < 6; i++) {
      const a = rd() * 6.28, d = r * (.4 + rd() * .25);
      s += `<ellipse cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" rx="${(r * .12).toFixed(1)}" ry="${(r * .06).toFixed(1)}" transform="rotate(${(rd() * 360).toFixed(0)} ${(c + Math.cos(a) * d).toFixed(1)} ${(c + Math.sin(a) * d).toFixed(1)})" fill="${p[1 + (i % (p.length - 1))]}"/>`;
    }
    return s;
  },
  drink(c, r, p, rd) {
    const w = r * 1.02, top = c - r * .78, bot = c + r * 1.05;
    let s = `<path d="M${c - w} ${top} L${c + w} ${top} L${c + w * .8} ${bot} Q${c} ${bot + r * .1} ${c - w * .8} ${bot} Z" fill="${p[0]}" opacity=".92"/>`;
    s += `<ellipse cx="${c}" cy="${top}" rx="${w}" ry="${w * .15}" fill="${shade(p[0], .12)}"/>`;
    for (let i = 0; i < 4; i++) {
      const a = rd() * 6.28, d = rd() * r * .5;
      const x = c + Math.cos(a) * d, y = top + r * .4 + Math.sin(a) * r * .4;
      s += `<rect x="${(x - r * .13).toFixed(1)}" y="${(y - r * .13).toFixed(1)}" width="${(r * .26).toFixed(1)}" height="${(r * .26).toFixed(1)}" rx="3" fill="rgba(255,255,255,.4)" transform="rotate(${(rd() * 40 - 20).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    // rondelle de fruit posée sur le bord
    const gx = c + w * .7, gy = top;
    s += `<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="${(r * .26).toFixed(1)}" fill="${p[1] || '#e0a83a'}"/>`;
    s += `<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="${(r * .15).toFixed(1)}" fill="${shade(p[1] || '#e0a83a', .18)}"/>`;
    for (let i = 0; i < 6; i++) { const a = (i / 6) * 6.28; s += `<line x1="${gx.toFixed(1)}" y1="${gy.toFixed(1)}" x2="${(gx + Math.cos(a) * r * .24).toFixed(1)}" y2="${(gy + Math.sin(a) * r * .24).toFixed(1)}" stroke="${shade(p[1] || '#e0a83a', -.2)}" stroke-width="1"/>`; }
    if (p[2]) s += `<path d="M${(c - r * .1).toFixed(1)} ${(top - r * .5).toFixed(1)} q ${(r * .18).toFixed(1)} ${(-r * .3).toFixed(1)} 0 ${(-r * .55).toFixed(1)}" stroke="${p[2]}" stroke-width="${(r * .07).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    return s;
  },
  cake(c, r, p, rd) {
    let s = `<circle cx="${c}" cy="${c}" r="${r * .6}" fill="${p[0]}"/>`;
    s += `<circle cx="${c}" cy="${c}" r="${r * .48}" fill="${p[1]}"/>`;
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * 6.28, d = r * .34;
      s += `<circle cx="${(c + Math.cos(a) * d).toFixed(1)}" cy="${(c + Math.sin(a) * d).toFixed(1)}" r="${(r * .075).toFixed(1)}" fill="${p[2] || '#c93b52'}"/>`;
    }
    s += `<circle cx="${c}" cy="${c}" r="${r * .1}" fill="${p[2] || '#c93b52'}"/>`;
    return s;
  }
};

function dishSVG(d, size = 400) {
  const a = d.art, rd = rng(d.id + (a.style || ''));
  const S = size, c = S / 2, r = S * 0.33;
  const p = a.food;
  const bg1 = a.bg || '#2a3550', bg2 = shade(a.bg || '#2a3550', -.10);
  const plate = a.plate || '#f6f1e7';
  let deco = '';
  for (let i = 0; i < 7; i++) {
    const x = rd() * S, y = rd() * S;
    deco += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(4 + rd() * 26).toFixed(0)}" fill="rgba(255,255,255,.035)"/>`;
  }
  let garn = '';
  for (let i = 0; i < 6; i++) {
    const ang = rd() * 6.28, dd = r * (1.05 + rd() * .55);
    const x = c + Math.cos(ang) * dd, y = c + Math.sin(ang) * dd * .82;
    garn += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(S * .028).toFixed(1)}" ry="${(S * .014).toFixed(1)}" transform="rotate(${(rd() * 360).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${a.garnish || '#6fbf8f'}" opacity=".8"/>`;
  }
  const vessel = (VESSELS[a.v] || VESSELS.plate)(c, r * 1.28);
  const food = (STYLES[a.style] || STYLES.stew)(c, r * 1.28, p, rd);
  const U = '_' + (dishSVG._n = (dishSVG._n || 0) + 1);
  const out = `<svg viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="Gbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient>
<radialGradient id="Gpl" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="${shade(plate, .06)}"/><stop offset="1" stop-color="${shade(plate, -.16)}"/></radialGradient>
<radialGradient id="Gpl2" cx=".4" cy=".34" r=".8"><stop offset="0" stop-color="${plate}"/><stop offset="1" stop-color="${shade(plate, -.07)}"/></radialGradient>
<linearGradient id="Gwd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b98a5a"/><stop offset="1" stop-color="#8d6440"/></linearGradient>
<radialGradient id="Ggl" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="rgba(255,255,255,.30)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient>
<radialGradient id="Gvig" cx=".5" cy=".5" r=".72"><stop offset=".55" stop-color="rgba(0,0,0,0)"/><stop offset="1" stop-color="rgba(0,0,0,.42)"/></radialGradient>
</defs>
<rect width="${S}" height="${S}" fill="url(#Gbg)"/>${deco}
<ellipse cx="${c}" cy="${c + r * .12}" rx="${r * 1.42}" ry="${r * 1.34}" fill="rgba(0,0,0,.28)"/>
${vessel}${food}${garn}
<rect width="${S}" height="${S}" fill="url(#Gvig)"/>
</svg>`;
  return out.replace(/G(bg|pl2|pl|wd|gl|vig)/g, (m) => m + U);
}

/* ===== photos.js ===== */
/* ============================================================
   Photos — vraies photographies des plats depuis Wikimedia
   Commons, via l'API publique de Wikipédia (CORS anonyme).
   Tout échec (hors ligne, article sans image…) laisse
   simplement l'illustration en place.
   ============================================================ */
const PHOTOS = {};      // id -> {url, page, author, license} | null
const PHOTO_JOBS = {};  // id -> Promise

const BAD_EXT = /\.(svg|ogg|ogv|webm|pdf|tif|tiff)$/i;

/* ============================================================
   Photos personnelles — stockées dans le navigateur (IndexedDB).
   Une photo importée prend le pas sur Wikimedia : on ne va plus
   chercher en ligne pour cette fiche.
   ============================================================ */
const MYPHOTO = {};     // id -> dataURL (cache mémoire)
const DB_NAME = 'gout-du-monde', DB_STORE = 'photos';
let _db = null;

function db() {
  if (_db) return _db;
  _db = new Promise((resolve, reject) => {
    if (!self.indexedDB) return reject(new Error('no indexeddb'));
    const rq = indexedDB.open(DB_NAME, 1);
    rq.onupgradeneeded = () => {
      if (!rq.result.objectStoreNames.contains(DB_STORE)) rq.result.createObjectStore(DB_STORE);
    };
    rq.onsuccess = () => resolve(rq.result);
    rq.onerror = () => reject(rq.error);
  });
  return _db;
}
function dbOp(mode, fn) {
  return db().then(d => new Promise((resolve, reject) => {
    const tx = d.transaction(DB_STORE, mode);
    const rq = fn(tx.objectStore(DB_STORE));
    tx.oncomplete = () => resolve(rq && rq.result);
    tx.onerror = () => reject(tx.error);
  }));
}
/* toutes les photos perso sont chargées d'un coup au démarrage */
function loadMyPhotos() {
  return dbOp('readonly', st => st.getAllKeys()).then(keys => {
    if (!keys || !keys.length) return;
    return dbOp('readonly', st => st.getAll()).then(vals => {
      keys.forEach((k, i) => { if (vals[i]) MYPHOTO[k] = vals[i]; });
    });
  }).catch(() => { });
}
function saveMyPhoto(id, dataUrl) {
  MYPHOTO[id] = dataUrl;
  return dbOp('readwrite', st => st.put(dataUrl, id)).catch(() => { });
}
function clearMyPhoto(id) {
  delete MYPHOTO[id];
  return dbOp('readwrite', st => st.delete(id)).catch(() => { });
}

/* redimensionne + recompresse avant stockage : on garde des fichiers légers */
function shrinkImage(file, max = 1400, quality = .82) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = () => reject(fr.error);
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('image illisible'));
      img.onload = () => {
        let { width: w, height: h } = img;
        const sc = Math.min(1, max / Math.max(w, h));
        w = Math.round(w * sc); h = Math.round(h * sc);
        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        const c = cv.getContext('2d');
        c.imageSmoothingQuality = 'high';
        c.drawImage(img, 0, 0, w, h);
        resolve(cv.toDataURL('image/jpeg', quality));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

function apiGet(url, ms = 9000) {
  return new Promise((resolve, reject) => {
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = setTimeout(() => { ctrl && ctrl.abort(); reject(new Error('timeout')); }, ms);
    fetch(url, ctrl ? { signal: ctrl.signal } : undefined)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(r.status)))
      .then(j => { clearTimeout(timer); resolve(j); })
      .catch(e => { clearTimeout(timer); reject(e); });
  });
}
const API_W = l => `https://${l}.wikipedia.org/w/api.php?action=query&format=json&origin=*`;
const API_C = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*';

/* Mots significatifs du nom d'un plat, sans les articles ni les liaisons.
   Sert à vérifier qu'une image trouvée parle bien du bon plat. */
const STOP = new Set(['de', 'da', 'do', 'di', 'du', 'des', 'la', 'le', 'les', 'el', 'al',
  'a', 'à', 'au', 'aux', 'and', 'the', 'of', 'with', 'in', 'and', 'et', 'e', 'y',
  'dish', 'food', 'style', 'sauce', 'soup', 'cake', 'pie', 'stew', 'bread', 'rice']);
const keyWords = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().split(/[^a-z0-9]+/)
  .filter(w => w.length > 3 && !STOP.has(w));

/* nom du fichier illustrant l'article du plat */
async function findFile(d) {
  const w = WIKI[d.id] || [];
  /* On interroge d'abord les Wikipédias où l'article a le plus de chances
     d'exister — y compris celle du pays du plat, car une spécialité
     régionale portugaise ou italienne n'a souvent d'article que chez elle. */
  const tries = [];
  // la Wikipédia du pays d'abord : elle seule a souvent un article sur une
  // spécialité régionale, et son illustration montre le plat, pas l'ingrédient
  if (w[2] && w[3]) tries.push([w[2], w[3]]);
  tries.push(['en', w[0]], ['fr', w[1]], ['en', d.n.en], ['fr', d.n.fr]);

  for (const [lang, title] of tries) {
    if (!title) continue;
    try {
      const j = await apiGet(`${API_W(lang)}&redirects=1&prop=pageimages&piprop=name&titles=${encodeURIComponent(title)}`);
      const pages = (j.query && j.query.pages) || {};
      for (const k in pages) {
        if (pages[k].missing !== undefined) continue;
        const n = pages[k].pageimage;
        if (n && !BAD_EXT.test(n)) return n;
      }
    } catch (e) { /* on tente la source suivante */ }
  }

  /* Dernier recours : recherche sur Commons. On n'accepte le résultat que si
     son nom de fichier reprend un mot du plat — sans cette vérification, une
     requête sans réponse pertinente renvoyait la première image venue, et
     plusieurs plats se retrouvaient illustrés par la même photo. */
  try {
    const want = new Set([...keyWords(w[0] || d.n.en), ...keyWords(d.n.fr)]);
    if (!want.size) return null;
    const q = encodeURIComponent((w[0] || d.n.en) + ' food');
    const j = await apiGet(`${API_C}&generator=search&gsrsearch=${q}&gsrnamespace=6&gsrlimit=8`);
    const pages = (j.query && j.query.pages) || {};
    for (const k in pages) {
      const n = String(pages[k].title || '').replace(/^File:/, '');
      if (!n || BAD_EXT.test(n)) continue;
      if (keyWords(n).some(word => want.has(word))) return n;
    }
  } catch (e) { }
  return null;
}

function plainText(html) {
  if (!html) return '';
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 70);
}

/* URL de la vignette + crédits */
async function fileInfo(name, width) {
  const j = await apiGet(`${API_C}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${width}&titles=${encodeURIComponent('File:' + name)}`);
  const pages = (j.query && j.query.pages) || {};
  for (const k in pages) {
    const ii = pages[k].imageinfo && pages[k].imageinfo[0];
    if (!ii) continue;
    const m = ii.extmetadata || {};
    return {
      url: ii.thumburl || ii.url,
      page: ii.descriptionurl,
      author: plainText(m.Artist && m.Artist.value),
      license: plainText(m.LicenseShortName && m.LicenseShortName.value)
    };
  }
  return null;
}

/* résultat mis en cache : une seule requête par plat et par session
   Ordre de priorité :
     1. photo publiée depuis l'administration (visible par tous)
     2. photo locale de ce navigateur (mode hors ligne / brouillon)
     3. Wikimedia Commons                                            */
/* Une même image ne doit jamais illustrer deux plats différents : ce serait
   pris pour une erreur, à juste titre. On retient donc quelle fiche a obtenu
   quelle photo, et l'on préfère l'illustration dessinée au doublon. */
const PHOTO_OWNER = {};   // nom de fichier Wikimedia -> id de la fiche

function getPhoto(d, width = 1000) {
  const pub = typeof DB_PHOTO !== 'undefined' && DB_PHOTO[d.id];
  if (pub) return Promise.resolve({ url: pub.url, mine: true, credit: pub.credit });
  if (MYPHOTO[d.id]) return Promise.resolve({ url: MYPHOTO[d.id], mine: true });
  if (d.id in PHOTOS) return Promise.resolve(PHOTOS[d.id]);
  if (PHOTO_JOBS[d.id]) return PHOTO_JOBS[d.id];
  PHOTO_JOBS[d.id] = (async () => {
    let res = null;
    try {
      const name = await findFile(d);
      if (name && (PHOTO_OWNER[name] || d.id) === d.id) {
        PHOTO_OWNER[name] = d.id;
        res = await fileInfo(name, width);
      }
    } catch (e) { res = null; }
    PHOTOS[d.id] = res;
    delete PHOTO_JOBS[d.id];
    return res;
  })();
  return PHOTO_JOBS[d.id];
}

/* remplit un conteneur .art : l'illustration reste en fond */
function fillPhoto(box, d, credit) {
  if (!box) return;
  // on retire une éventuelle photo précédente (changement d'image par l'utilisateur)
  box.querySelectorAll('img.photo').forEach(n => n.remove());
  if (credit) { credit.textContent = ''; credit.classList.remove('on'); }
  getPhoto(d).then(p => {
    if (!p || !p.url) {
      // hors ligne ou plat sans photo libre : l'illustration reste, on le dit discrètement
      if (credit && credit.isConnected) { credit.textContent = t('photoOff'); credit.classList.add('on'); }
      return;
    }
    if (!box.isConnected) return;
    const img = new Image();
    img.decoding = 'async';
    img.alt = d.n[state.lang];
    img.className = 'photo';
    img.onload = () => {
      if (!box.isConnected) return;
      box.appendChild(img);
      requestAnimationFrame(() => img.classList.add('on'));
      if (credit && credit.isConnected) {
        if (p.mine) {
          credit.textContent = p.credit || t('photoMine');
        } else {
          const who = [p.author, p.license].filter(Boolean).join(' · ') || 'Wikimedia Commons';
          credit.innerHTML = p.page
            ? `${t('photoBy')} <a href="${p.page}" target="_blank" rel="noopener">${esc(who)}</a>`
            : `${t('photoBy')} ${esc(who)}`;
        }
        credit.classList.add('on');
      }
    };
    img.src = p.url;
  }).catch(() => { });
}

/* ===== globe.js ===== */
/* ============================================================
   Globe — orthographic vector globe, pure canvas 2D, no deps
   ============================================================ */
const RAD = Math.PI / 180;
const ZMAX = 48;   // zoom maximal : permet de descendre à l'échelle d'une ville

function prep(segs) {
  // precompute a bounding cap (centre unit-vector + cos of angular radius)
  return segs.map(flat => {
    const n = flat.length / 2;
    let cx = 0, cy = 0, cz = 0;
    const pts = new Float64Array(n * 3);
    for (let i = 0; i < n; i++) {
      const lo = flat[i * 2] * RAD, la = flat[i * 2 + 1] * RAD;
      const cl = Math.cos(la);
      const x = cl * Math.sin(lo), y = Math.sin(la), z = cl * Math.cos(lo);
      pts[i * 3] = x; pts[i * 3 + 1] = y; pts[i * 3 + 2] = z;
      cx += x; cy += y; cz += z;
    }
    let m = Math.hypot(cx, cy, cz) || 1;
    cx /= m; cy /= m; cz /= m;
    let cosr = 1;
    for (let i = 0; i < n; i++) {
      const d = pts[i * 3] * cx + pts[i * 3 + 1] * cy + pts[i * 3 + 2] * cz;
      if (d < cosr) cosr = d;
    }
    cosr = Math.max(-1, cosr);
    // corde maximale du cap : borne sûre du rayon écran (la projection ne peut que raccourcir)
    const chord = Math.sqrt(Math.max(0, 2 - 2 * cosr));
    return { pts, n, cx, cy, cz, cosr, chord };
  });
}

class Globe {
  constructor(canvas, opts = {}) {
    this.cv = canvas;
    this.ctx = canvas.getContext('2d');
    this.lat = 25; this.lon = 10; this.zoom = 1;
    this.tLat = 25; this.tLon = 10; this.tZoom = 1;
    this.autoSpin = true;
    this._markers = [];
    this._dirty = true;
    this.hover = null;
    this._active = null;
    this.onPick = opts.onPick || (() => { });
    this.onHover = opts.onHover || (() => { });
    this.coast = prep(GEO_COAST);
    this.borders = prep(GEO_BORDERS);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this._bindEvents();
    this.resize();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  // toute modification des marqueurs ou de la sélection déclenche un redessin
  set markers(v) { this._markers = v; this._dirty = true; }
  get markers() { return this._markers; }
  set active(v) { this._active = v; this._dirty = true; }
  get active() { return this._active; }
  invalidate() { this._dirty = true; }

  /* ---------- sizing ---------- */
  resize() {
    this._dirty = true;
    const r = this.cv.getBoundingClientRect();
    this.w = r.width; this.h = r.height;
    this.cv.width = Math.round(r.width * this.dpr);
    this.cv.height = Math.round(r.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.cx = this.w / 2; this.cy = this.h / 2;
    this.baseR = Math.min(this.w, this.h) * 0.44;
  }
  get R() { return this.baseR * this.zoom; }

  /* ---------- projection ---------- */
  _rot() {
    const p0 = this.lat * RAD, l0 = this.lon * RAD;
    this.sp = Math.sin(p0); this.cp = Math.cos(p0);
    this.sl = Math.sin(l0); this.cl = Math.cos(l0);
  }
  // unit sphere vector (x east, y up, z toward viewer at lon0/lat0=0)
  vec(lat, lon) {
    const la = lat * RAD, lo = lon * RAD, c = Math.cos(la);
    return [c * Math.sin(lo), Math.sin(la), c * Math.cos(lo)];
  }
  rotate(x, y, z) {
    // yaw by -lon then pitch by -lat
    const x1 = x * this.cl - z * this.sl;
    const z1 = x * this.sl + z * this.cl;
    const y2 = y * this.cp - z1 * this.sp;
    const z2 = y * this.sp + z1 * this.cp;
    return [x1, y2, z2];
  }
  project(lat, lon) {
    const v = this.vec(lat, lon), r = this.rotate(v[0], v[1], v[2]);
    return { x: this.cx + r[0] * this.R, y: this.cy - r[1] * this.R, z: r[2] };
  }
  // screen -> lat/lon (null if outside globe)
  unproject(sx, sy) {
    const x = (sx - this.cx) / this.R, y = (this.cy - sy) / this.R;
    const d2 = x * x + y * y;
    if (d2 > 1) return null;
    const z = Math.sqrt(1 - d2);
    // inverse pitch then yaw
    const y1 = y * this.cp + z * this.sp;
    const z1 = -y * this.sp + z * this.cp;
    const x2 = x * this.cl + z1 * this.sl;
    const z2 = -x * this.sl + z1 * this.cl;
    return { lat: Math.asin(Math.max(-1, Math.min(1, y1))) / RAD, lon: Math.atan2(x2, z2) / RAD };
  }

  /* ---------- clipping ---------- */
  // Le cap englobant du tracé croise-t-il l'écran ? (rejet immédiat des îles hors champ)
  _onScreen(seg) {
    const r = this.rotate(seg.cx, seg.cy, seg.cz), R = this.R;
    const rad = R * seg.chord + 6;
    const sx = this.cx + r[0] * R, sy = this.cy - r[1] * R;
    return !(sx + rad < 0 || sx - rad > this.w || sy + rad < 0 || sy - rad > this.h);
  }

  // st = pas de décimation (niveau de détail) : 1 = tous les points
  _clipPath(seg, close, st) {
    const { pts, n } = seg, ctx = this.ctx, R = this.R;
    const out = [];
    let px = 0, py = 0, pz = 0, first = true;
    const lim = close ? n : n - 1;
    // on ne décime que les tracés assez longs pour que ça ne se voie pas
    const step = (st > 1 && n > 16) ? st : 1;
    // Hors d'une large marge autour de l'écran, on ne conserve qu'un point sur K :
    // ces points ne servent qu'à refermer correctement le polygone. La marge est
    // bien plus grande que la distance couverte par K sommets, donc aucune corde
    // sautée ne peut traverser la zone visible.
    const mx = this.w * .75, my = this.h * .75;
    const bx0 = -mx, bx1 = this.w + mx, by0 = -my, by1 = this.h + my;
    const K = 24;
    let skipped = K;
    for (let i = 0; i <= lim; i = (i < lim && i + step > lim) ? lim : i + step) {
      const j = i % n;
      const r = this.rotate(pts[j * 3], pts[j * 3 + 1], pts[j * 3 + 2]);
      if (!first) {
        const inA = pz > 0, inB = r[2] > 0;
        if (inA !== inB) {
          const t = pz / (pz - r[2]);
          let ix = px + (r[0] - px) * t, iy = py + (r[1] - py) * t;
          const m = Math.hypot(ix, iy) || 1;
          out.push({ x: this.cx + (ix / m) * R, y: this.cy - (iy / m) * R, limb: 1 });
          skipped = K;
        }
        if (inB) {
          const sx = this.cx + r[0] * R, sy = this.cy - r[1] * R;
          if (sx < bx0 || sx > bx1 || sy < by0 || sy > by1) {
            if (++skipped < K) { px = r[0]; py = r[1]; pz = r[2]; continue; }
          }
          skipped = 0;
          out.push({ x: sx, y: sy, limb: 0 });
        }
      } else if (r[2] > 0) {
        out.push({ x: this.cx + r[0] * R, y: this.cy - r[1] * R, limb: 0 });
        skipped = 0;
      }
      px = r[0]; py = r[1]; pz = r[2]; first = false;
    }
    return out;
  }
  _trace(out, close) {
    const ctx = this.ctx, R = this.R;
    if (out.length < 2) return false;
    // Au-delà d'un certain zoom, les segments de la donnée source deviennent
    // visibles : on arrondit les angles en passant par les milieux de segments.
    // Purement graphique, aucun coût en données.
    const smooth = this._smooth;
    let started = false, lx = 0, ly = 0;
    const N = close ? out.length : out.length;
    for (let i = 0; i < N; i++) {
      const p = out[i];
      if (!started) { ctx.moveTo(p.x, p.y); started = true; lx = p.x; ly = p.y; continue; }
      const q = out[i - 1];
      if (close && p.limb && q.limb) {
        this._limbArc(q, p);
      } else {
        if (Math.abs(p.x - lx) + Math.abs(p.y - ly) < 0.7) continue;
        if (smooth && !p.limb && !q.limb && i < N - 1) {
          const nx = out[i + 1];
          if (nx && !nx.limb) { ctx.quadraticCurveTo(p.x, p.y, (p.x + nx.x) / 2, (p.y + nx.y) / 2); lx = p.x; ly = p.y; continue; }
        }
        ctx.lineTo(p.x, p.y);
      }
      lx = p.x; ly = p.y;
    }
    if (close) {
      const p = out[0], q = out[out.length - 1];
      if (p.limb && q.limb) this._limbArc(q, p);
      ctx.closePath();
    }
    return true;
  }
  // walk along the horizon between two clipped points, taking the short way round
  _limbArc(q, p) {
    const a0 = Math.atan2(-(q.y - this.cy), q.x - this.cx);
    const a1 = Math.atan2(-(p.y - this.cy), p.x - this.cx);
    let d = a1 - a0;
    while (d > Math.PI) d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    this.ctx.arc(this.cx, this.cy, this.R, -a0, -(a0 + d), d > 0);
  }
  _visible(seg) {
    // is any part of the cap on the near hemisphere?
    const d = seg.cx * this.fx + seg.cy * this.fy + seg.cz * this.fz; // cos(angle to view centre)
    const ang = Math.acos(Math.max(-1, Math.min(1, d)));
    const rad = Math.acos(seg.cosr);
    return ang - rad < Math.PI / 2;
  }

  /* ---------- drawing ---------- */
  draw() {
    const ctx = this.ctx, R = this.R, cx = this.cx, cy = this.cy;
    this._rot();
    // forward view vector in world space (inverse rotate of (0,0,1))
    this.fx = this.sl * this.cp; this.fy = this.sp; this.fz = this.cl * this.cp;
    ctx.clearRect(0, 0, this.w, this.h);

    // outer atmosphere
    const halo = ctx.createRadialGradient(cx, cy, R * 0.97, cx, cy, R * 1.22);
    halo.addColorStop(0, 'rgba(96,166,255,.30)');
    halo.addColorStop(.45, 'rgba(70,130,220,.10)');
    halo.addColorStop(1, 'rgba(70,130,220,0)');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, 7); ctx.fill();

    // océan — dégradé profond, plus lumineux près du soleil
    const oc = ctx.createRadialGradient(cx - R * .32, cy - R * .38, R * .06, cx, cy, R * 1.02);
    oc.addColorStop(0, '#2a6f9e'); oc.addColorStop(.35, '#175787');
    oc.addColorStop(.7, '#0d3a63'); oc.addColorStop(.85, '#092742');
    oc.addColorStop(1, '#05101f');
    ctx.fillStyle = oc;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();

    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();

    this._graticule();

    // niveau de détail : on décime les tracés quand le globe est petit à l'écran
    const st = this.zoom < 1.4 ? 3 : this.zoom < 2.6 ? 2 : 1;
    // lissage des côtes au zoom fort (les segments source deviendraient visibles)
    this._smooth = this.zoom > 7;

    // le tracé des terres sert plusieurs fois (plateau continental, remplissage, contour)
    ctx.beginPath();
    for (const s of this.coast) {
      if (!this._visible(s) || !this._onScreen(s)) continue;
      this._trace(this._clipPath(s, true, st), true);
    }

    // plateau continental : halo clair juste au large, donne du relief à la carte.
    // Largeur bornée, sinon elle envahirait l'océan au zoom fort.
    ctx.save();
    ctx.lineWidth = Math.min(26, Math.max(2.5, R * .012));
    ctx.strokeStyle = 'rgba(126,196,232,.30)';
    ctx.stroke();
    ctx.lineWidth = Math.min(11, Math.max(1.2, R * .005));
    ctx.strokeStyle = 'rgba(168,222,246,.35)';
    ctx.stroke();
    ctx.restore();

    // terres
    const lg = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
    lg.addColorStop(0, '#f6ecd6'); lg.addColorStop(.45, '#e8d9ba');
    lg.addColorStop(.78, '#d6c298'); lg.addColorStop(1, '#bda87e');
    ctx.fillStyle = lg;
    // l'ombre portée coûte très cher (tampon hors écran + flou) : elle n'a de sens
    // que sur la vue d'ensemble, où l'on perçoit le relief du globe
    if (this.zoom < 6) {
      ctx.shadowColor = 'rgba(0,0,0,.40)';
      ctx.shadowBlur = 12 * Math.min(this.zoom, 2);
      ctx.shadowOffsetY = 2;
    }
    ctx.fill('evenodd');
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.lineWidth = Math.min(1.3, .7 + this.zoom * .05);
    ctx.strokeStyle = 'rgba(96,74,42,.55)'; ctx.stroke();

    // frontières internes — apparaissent progressivement au zoom
    if (this.zoom > 1.15) {
      ctx.beginPath();
      for (const s of this.borders) {
        if (!this._visible(s) || !this._onScreen(s)) continue;
        this._trace(this._clipPath(s, false, st), false);
      }
      const a = Math.min(.5, (this.zoom - 1.15) * .55);
      ctx.lineWidth = Math.min(1.1, .7 + this.zoom * .03);
      ctx.setLineDash([Math.min(9, Math.max(3, R * .012)), Math.min(7, Math.max(2.5, R * .009))]);
      ctx.strokeStyle = `rgba(122,96,58,${a})`;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // shading (sphere volume)
    const sh = ctx.createRadialGradient(cx - R * .35, cy - R * .4, R * .05, cx, cy, R * 1.02);
    sh.addColorStop(0, 'rgba(255,244,214,.16)');
    sh.addColorStop(.4, 'rgba(255,255,255,0)');
    sh.addColorStop(.82, 'rgba(2,8,20,.20)');
    sh.addColorStop(1, 'rgba(2,6,16,.62)');
    ctx.fillStyle = sh;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
    ctx.restore();

    // rim
    ctx.lineWidth = 1.1; ctx.strokeStyle = 'rgba(150,205,255,.35)';
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();

    this._drawMarkers();
  }

  // demi-angle (en degrés) réellement visible à l'écran — sert à borner les boucles
  _visibleSpan() {
    const ratio = (Math.max(this.w, this.h) * .62) / this.R;
    if (ratio >= 1) return 90;
    return Math.asin(ratio) / RAD;
  }

  _graticule() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(255,255,255,.055)'; ctx.lineWidth = .7;
    const z = this.zoom;
    const step = z > 24 ? 1 : z > 12 ? 2 : z > 6 ? 5 : z > 3 ? 10 : z > 1.6 ? 15 : 30;
    const fine = Math.max(.4, Math.min(3, step / 4));
    // on ne parcourt que la fenêtre visible : indispensable pour rester fluide au zoom fort
    const span = this._visibleSpan() * 1.15;
    const lat0 = Math.max(-90, this.lat - span), lat1 = Math.min(90, this.lat + span);
    const cosl = Math.max(.08, Math.cos(this.lat * RAD));
    const lonSpan = Math.min(180, span / cosl);
    const lon0 = this.lon - lonSpan, lon1 = this.lon + lonSpan;
    const snap = (v, s) => Math.floor(v / s) * s;

    ctx.beginPath();
    for (let lon = snap(lon0, step); lon <= lon1 + step; lon += step) {
      let started = false;
      for (let lat = snap(lat0, fine); lat <= lat1 + fine; lat += fine) {
        if (lat < -90 || lat > 90) continue;
        const p = this.project(lat, lon);
        if (p.z <= 0) { started = false; continue; }
        started ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), started = true);
      }
    }
    for (let lat = snap(lat0, step); lat <= lat1 + step; lat += step) {
      if (lat < -85 || lat > 85) continue;
      let started = false;
      for (let lon = snap(lon0, fine); lon <= lon1 + fine; lon += fine) {
        const p = this.project(lat, lon);
        if (p.z <= 0) { started = false; continue; }
        started ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), started = true);
      }
    }
    ctx.stroke();
  }

  _drawMarkers() {
    const ctx = this.ctx;
    const showLabel = this.zoom > 2.2;
    // 1. projection + culling
    const vis = [];
    for (const m of this.markers) {
      const p = this.project(m.lat, m.lon);
      if (p.z <= 0.02) continue;
      if (p.x < -60 || p.x > this.w + 60 || p.y < -60 || p.y > this.h + 60) continue;
      vis.push({ m, x: p.x, y: p.y, z: p.z, n: 1, group: null });
    }
    // 2. regroupement en espace écran : une seule pastille quand ça se superpose.
    //    Les fiches priment sur l'atlas, puis on garde la plus représentative
    //    (rang = ordre d'ajout, les plats emblématiques d'abord).
    vis.sort((a, b) => {
      const aa = a.m.kind === 'atlas' ? 1 : 0, bb = b.m.kind === 'atlas' ? 1 : 0;
      if (aa !== bb) return aa - bb;
      if (a.m.id === this.active) return -1;
      if (b.m.id === this.active) return 1;
      return (a.m.rank || 0) - (b.m.rank || 0);
    });
    const RCL = 21, RCL2 = RCL * RCL;
    const kept = [];
    for (const s of vis) {
      let host = null;
      for (const k of kept) {
        if (k.m.kind !== s.m.kind) continue;
        const dx = k.x - s.x, dy = k.y - s.y;
        if (dx * dx + dy * dy < RCL2) { host = k; break; }
      }
      if (host) {
        host.n++;
        (host.group = host.group || []).push(s.m.id);
      } else kept.push(s);
    }
    this._screen = kept;
    // le plus proche du centre est dessiné en dernier ; les étiquettes sont
    // attribuées en priorité aux fiches les mieux classées
    this._screen.sort((a, b) => a.z - b.z);
    const lab = [];   // rectangles des étiquettes déjà posées
    const t = performance.now() / 1000;
    for (const s of this._screen) {
      const isA = this.active === s.m.id, isH = this.hover === s.m.id;
      const atlas = s.m.kind === 'atlas';
      const fade = Math.min(1, Math.max(.35, s.z * 2.2)) * (atlas && !isA && !isH ? .72 : 1);
      const r = (isA ? 7.5 : isH ? 6.5 : atlas ? 3.1 : 5) * (0.75 + 0.25 * Math.min(this.zoom, 2));
      ctx.globalAlpha = fade;
      if (isA) {
        const pulse = (t % 1.6) / 1.6;
        ctx.beginPath(); ctx.arc(s.x, s.y, r + pulse * 22, 0, 7);
        ctx.strokeStyle = `rgba(232,176,75,${(1 - pulse) * .7})`; ctx.lineWidth = 2; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(s.x, s.y, r + (atlas ? 2 : 3.5), 0, 7);
      ctx.fillStyle = 'rgba(10,16,28,.65)'; ctx.fill();
      ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, 7);
      ctx.fillStyle = isA ? '#e8b04b' : (isH ? '#f6d38b' : (atlas ? '#9fd0ef' : s.m.color || '#e4633a'));
      ctx.fill();
      ctx.lineWidth = atlas ? 1 : 1.6;
      ctx.strokeStyle = atlas ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.85)';
      ctx.stroke();
      // pastille de regroupement : « ce point cache N autres spécialités »
      if (s.n > 1 && !atlas) {
        const br = r * .72, bxx = s.x + r * .82, byy = s.y - r * .82;
        ctx.beginPath(); ctx.arc(bxx, byy, br + 1.4, 0, 7);
        ctx.fillStyle = 'rgba(9,15,26,.85)'; ctx.fill();
        ctx.beginPath(); ctx.arc(bxx, byy, br, 0, 7);
        ctx.fillStyle = '#f4efe6'; ctx.fill();
        ctx.fillStyle = '#1b2536';
        ctx.font = `700 ${Math.max(7.5, br * 1.25).toFixed(1)}px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(s.n), bxx, byy + .5);
        ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
      }
      if (((showLabel && !atlas) || isH || isA) && s.z > .25) {
        ctx.font = '600 11.5px Inter, system-ui, sans-serif';
        const label = s.m.label;
        const wdt = ctx.measureText(label).width;
        const bx = s.x + r + 7, by = s.y - 9, bw = wdt + 14, bh = 19;
        // on n'affiche l'étiquette que si elle ne recouvre pas une étiquette déjà posée
        let free = true;
        if (!isA && !isH) {
          for (const L of lab) {
            if (bx < L.x + L.w + 3 && bx + bw + 3 > L.x && by < L.y + L.h + 2 && by + bh + 2 > L.y) { free = false; break; }
          }
        }
        if (free) {
          lab.push({ x: bx, y: by, w: bw, h: bh });
          ctx.globalAlpha = fade * (isH || isA ? 1 : .92);
          ctx.fillStyle = 'rgba(9,15,26,.82)';
          rrect(ctx, bx, by, bw, bh, 6); ctx.fill();
          ctx.fillStyle = isA ? '#f6d38b' : '#f4efe6';
          ctx.fillText(label, bx + 7, by + 13.5);
        }
      }
      ctx.globalAlpha = 1;
    }
  }

  pick(sx, sy) {
    let best = null, bd = 22 * 22;
    for (let i = this._screen ? this._screen.length - 1 : -1; i >= 0; i--) {
      const s = this._screen[i];
      const d = (s.x - sx) ** 2 + (s.y - sy) ** 2;
      if (d < bd) { bd = d; best = s; }
    }
    if (!best) return null;
    // Le point retenu peut en masquer d'autres (même ville) : on transmet la
    // liste pour que l'interface propose de choisir, plutôt que de trancher.
    best.m.groupIds = best.group || null;
    best.m.groupN = best.n;
    best.m.sx = best.x; best.m.sy = best.y;
    return best.m;
  }

  /* ---------- interaction ---------- */
  flyTo(lat, lon, zoom) {
    this.tLat = lat; this.tLon = lon;
    if (zoom) this.tZoom = zoom;
    this.autoSpin = false;
  }
  setZoom(z) { this.tZoom = Math.max(1, Math.min(ZMAX, z)); this.autoSpin = false; }

  /* Rotation d'un déplacement à l'écran : le point saisi doit rester sous le
     doigt. Un déplacement de dx pixels correspond à un angle dx/R ; les
     méridiens se resserrant vers les pôles, un pixel horizontal représente
     d'autant plus de longitude que la latitude est élevée. */
  _panBy(dx, dy) {
    const k = 57.29578 / this.R;
    const cosLat = Math.max(0.15, Math.cos(this.lat * RAD));
    this.tLon = this.lon = wrapLon(this.lon - dx * k / cosLat);
    this.tLat = this.lat = Math.max(-89, Math.min(89, this.lat + dy * k));
    this._dirty = true;
  }

  _bindEvents() {
    const cv = this.cv;
    /* Un seul doigt fait tourner le globe, deux doigts le zooment et le
       déplacent. Sans ce suivi, chaque doigt était traité comme un glissé
       indépendant : les deux séries d'événements s'annulaient et se
       contredisaient, d'où l'impression que la carte partait dans tous les sens. */
    const pts = new Map();          // pointeurs actuellement posés
    let mode = 0;                   // 0 : repos · 1 : rotation · 2 : pincement
    let lx = 0, ly = 0, moved = 0;  // dernier point du doigt qui fait tourner
    let pinchD = 0, pinchX = 0, pinchY = 0;   // écartement et milieu des deux doigts
    const two = () => { const [a, b] = [...pts.values()]; return [a, b]; };

    const down = e => {
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { cv.setPointerCapture(e.pointerId); } catch (_) { }
      this.autoSpin = false;
      if (pts.size === 1) {
        mode = 1; moved = 0; lx = e.clientX; ly = e.clientY; cv.classList.add('drag');
      } else if (pts.size === 2) {
        mode = 2; cv.classList.remove('drag');
        moved = 999;               // un pincement n'est jamais un clic
        const [a, b] = two();
        pinchD = Math.hypot(a.x - b.x, a.y - b.y);
        pinchX = (a.x + b.x) / 2; pinchY = (a.y + b.y) / 2;
      } else mode = 0;             // trois doigts ou plus : on ne fait rien
    };

    const move = e => {
      if (pts.has(e.pointerId)) pts.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (mode === 2 && pts.size === 2) {
        const [a, b] = two();
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const r = cv.getBoundingClientRect();
        // Principe : le lieu pincé reste entre les deux doigts. On note quel
        // point du globe se trouvait sous l'ancien milieu, on applique le
        // nouvel écartement, puis on ramène ce point sous le nouveau milieu.
        // Le déplacement et le zoom sont ainsi traités d'un seul geste.
        this._rot();
        const anchor = this.unproject(pinchX - r.left, pinchY - r.top);
        // le zoom suit l'écartement sans amortissement : pendant un geste
        // tactile, l'image doit coller aux doigts
        if (pinchD > 8 && d > 8) {
          const z = Math.max(1, Math.min(ZMAX, this.zoom * (d / pinchD)));
          this.zoom = this.tZoom = z;
        }
        let done = false;
        if (anchor) {
          this._rot();
          const p = this.project(anchor.lat, anchor.lon);
          const ex = mx - r.left - p.x, ey = my - r.top - p.y;
          // près du bord du globe la projection s'écrase : une correction
          // démesurée signifierait que le repère n'est plus fiable
          if (p.z > 0.15 && Math.hypot(ex, ey) < this.R * 0.5) { this._panBy(ex, ey); done = true; }
        }
        if (!done) this._panBy(mx - pinchX, my - pinchY);   // repli : on suit le milieu
        pinchD = d; pinchX = mx; pinchY = my;
        this._dirty = true;
        return;
      }

      if (mode === 1) {
        const dx = e.clientX - lx, dy = e.clientY - ly;
        moved += Math.abs(dx) + Math.abs(dy);
        this._panBy(dx, dy);
        lx = e.clientX; ly = e.clientY;
        return;
      }

      if (!pts.size) {   // survol à la souris uniquement
        const r = cv.getBoundingClientRect();
        const hit = this.pick(e.clientX - r.left, e.clientY - r.top);
        const id = hit ? hit.id : null;
        if (id !== this.hover) { this.hover = id; this._dirty = true; this.onHover(hit, e.clientX, e.clientY); }
        cv.style.cursor = hit ? 'pointer' : '';
      }
    };

    const up = e => {
      const wasRotating = mode === 1;
      pts.delete(e.pointerId);
      if (wasRotating && !pts.size && moved < 5) {
        const r = cv.getBoundingClientRect();
        const hit = this.pick(e.clientX - r.left, e.clientY - r.top);
        if (hit) this.onPick(hit);
      }
      if (pts.size === 1) {
        // on relâche un doigt du pincement : le doigt restant reprend la rotation
        const p = [...pts.values()][0];
        mode = 1; moved = 999; lx = p.x; ly = p.y; cv.classList.add('drag');
      } else if (!pts.size) {
        mode = 0; pinchD = 0; cv.classList.remove('drag');
      }
    };

    cv.addEventListener('pointerdown', down);
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointerleave', () => { if (this.hover) { this.hover = null; this.onHover(null); } });
    cv.addEventListener('wheel', e => {
      e.preventDefault();
      const r = cv.getBoundingClientRect();
      const g = this.unproject(e.clientX - r.left, e.clientY - r.top);
      const f = Math.exp(-e.deltaY * 0.0016);
      const nz = Math.max(1, Math.min(ZMAX, this.tZoom * f));
      if (g && nz > this.tZoom) { // zoom toward cursor
        const t = 0.35;
        this.tLat = this.lat + (g.lat - this.lat) * t;
        this.tLon = this.lon + shortLon(g.lon - this.lon) * t;
      }
      this.tZoom = nz; this.autoSpin = false;
    }, { passive: false });
    // Safari iOS déclenche encore son propre zoom de page sur un pincement :
    // on l'en empêche, le geste appartient au globe.
    cv.addEventListener('touchmove', e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
    for (const ev of ['gesturestart', 'gesturechange', 'gestureend'])
      cv.addEventListener(ev, e => e.preventDefault());
    window.addEventListener('resize', () => this.resize());
    // L'ouverture du panneau rétrécit le canvas sans redimensionner la
    // fenêtre : sans cette observation, la zone de dessin garderait ses
    // anciennes proportions et le globe apparaîtrait ovale.
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => this.resize());
      this._ro.observe(cv);
    }
  }

  _loop(t) {
    const e = 0.11;
    let moving = false;
    if (this.autoSpin) {
      this.tLon = wrapLon(this.tLon + 0.045); this.lon = wrapLon(this.lon + 0.045);
      moving = true;
    } else {
      const dl = shortLon(this.tLon - this.lon);
      if (Math.abs(dl) > 0.006) { this.lon = wrapLon(this.lon + dl * e); moving = true; }
      else this.lon = this.tLon;
      if (Math.abs(this.tLat - this.lat) > 0.006) { this.lat += (this.tLat - this.lat) * e; moving = true; }
      else this.lat = this.tLat;
    }
    if (Math.abs(this.tZoom - this.zoom) > 0.0004) { this.zoom += (this.tZoom - this.zoom) * e; moving = true; }
    else this.zoom = this.tZoom;
    // au repos on ne redessine pas : le fil principal reste libre pour les clics.
    // (le marqueur actif pulse, il faut donc continuer à animer dans ce cas)
    if (moving || this._dirty || this.active) { this.draw(); this._dirty = false; }
    requestAnimationFrame(this._loop);
  }
}

function wrapLon(l) { while (l > 180) l -= 360; while (l < -180) l += 360; return l; }
function shortLon(d) { while (d > 180) d -= 360; while (d < -180) d += 360; return d; }
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

/* ===== app.js ===== */
/* ============================================================
   App — state, i18n rendering, recipe scaling
   ============================================================ */
const CONT_VIEW = {
  all: { lat: 20, lon: 10, z: 1 },
  eu: { lat: 48, lon: 10, z: 3.4 },
  as: { lat: 28, lon: 100, z: 2.4 },
  af: { lat: 6, lon: 20, z: 2.6 },
  na: { lat: 25, lon: -95, z: 2.6 },
  sa: { lat: -18, lon: -60, z: 2.8 },
  oc: { lat: -22, lon: 170, z: 2.4 }
};
const CONT_COLOR = { eu: '#e4633a', as: '#e0913a', af: '#d9b13a', na: '#c96f9a', sa: '#6fbf8f', oc: '#5aa8d9' };

const state = { lang: 'fr', dish: null, servings: 4, cont: 'all', filters: emptyFilters() };
let globe;

/* ---------- villes ----------
   Plusieurs spécialités partagent souvent la même ville (Naples, Lisbonne,
   La Nouvelle-Orléans…). On les regroupe : le globe n'affiche qu'un point
   par ville et la fiche renvoie vers ses voisines.
   Recalculé après chaque synchronisation avec la base.  */
const RANK = {};
const CITY_OF = {};   // id du plat -> id du groupe
const CITY = {};      // id du groupe -> [plats, le plus représentatif en tête]

function buildCities() {
  for (const k in RANK) delete RANK[k];
  for (const k in CITY_OF) delete CITY_OF[k];
  for (const k in CITY) delete CITY[k];
  DISHES.sort((a, b) => (a.rank || 0) - (b.rank || 0));
  DISHES.forEach((d, i) => { RANK[d.id] = i; });
  const R = Math.PI / 180, LIM = 18; // km : même agglomération
  for (const d of DISHES) {
    if (CITY_OF[d.id]) continue;
    const grp = [d];
    CITY_OF[d.id] = d.id;
    for (const o of DISHES) {
      if (CITY_OF[o.id]) continue;
      const dy = (o.lat - d.lat) * 111;
      const dx = (o.lon - d.lon) * 111 * Math.cos(d.lat * R);
      if (Math.hypot(dx, dy) <= LIM) { grp.push(o); CITY_OF[o.id] = d.id; }
    }
    CITY[d.id] = grp;   // d est déjà le mieux classé : il vient en premier
  }
}
// les autres spécialités de la même ville que d
const siblingsOf = d => (CITY[CITY_OF[d.id]] || []).filter(x => x.id !== d.id);

/* ---------- helpers ---------- */
const L = () => LANGS.indexOf(state.lang);
const t = k => UI[state.lang][k];
const $ = s => document.querySelector(s);

const FRAC = { 0.25: '¼', 0.5: '½', 0.75: '¾', 0.33: '⅓', 0.67: '⅔' };
function fmtNum(v) {
  if (v >= 10) return String(Math.round(v));
  const whole = Math.floor(v), rest = v - whole;
  let best = null, bd = 0.09;
  for (const f of [0.25, 0.33, 0.5, 0.67, 0.75]) { const d = Math.abs(rest - f); if (d < bd) { bd = d; best = f; } }
  if (best !== null) return (whole ? whole : '') + FRAC[best];
  if (rest < 0.09) return String(whole || (v > 0 ? +v.toFixed(2) : 0));
  return String(+v.toFixed(v < 1 ? 2 : 1));
}
function niceRound(q) {
  if (q < 10) return Math.round(q * 10) / 10;
  if (q < 50) return Math.round(q);
  if (q < 200) return Math.round(q / 5) * 5;
  if (q < 1000) return Math.round(q / 10) * 10;
  return Math.round(q / 50) * 50;
}
function unitLabel(u, n) {
  const i = L();
  if (!u) return '';
  const pl = n > 1.4 && UNITS_PL[u] ? UNITS_PL[u][i] : (UNITS[u] ? UNITS[u][i] : u);
  return pl;
}
function scaleQty(qty, unit, factor) {
  if (qty == null) return { n: '', u: t('toTaste') };
  let q = qty * factor, u = unit;
  if (u === 'g' && q >= 1000) { q = q / 1000; u = 'kg'; }
  else if (u === 'kg' && q < 1) { q = q * 1000; u = 'g'; }
  else if (u === 'ml' && q >= 1000) { q = q / 1000; u = 'l'; }
  else if (u === 'l' && q < 1) { q = q * 1000; u = 'ml'; }
  else if (u === 'cl' && q >= 100) { q = q / 100; u = 'l'; }
  if (u === 'g' || u === 'ml' || u === 'cl') q = niceRound(q);
  else if (u === 'kg' || u === 'l') q = Math.round(q * 100) / 100;
  else q = Math.max(u === 'pc' ? 1 : 0.25, Math.round(q * 4) / 4);
  const lab = unitLabel(u, q);
  return { n: fmtNum(q), u: lab };
}
function dist(a, b) {
  const r = Math.PI / 180;
  return Math.acos(Math.min(1, Math.sin(a.lat * r) * Math.sin(b.lat * r) +
    Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.cos((a.lon - b.lon) * r)));
}
function fmtTime(m) {
  if (m === 0) return '—';
  if (m < 60) return m + ' ' + t('min');
  const h = Math.floor(m / 60), r = m % 60;
  return h + ' ' + t('h') + (r ? ' ' + r : '');
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- panel ---------- */
// Sur petit écran le panneau n'est pas une colonne à côté du globe mais une
// feuille qui le recouvre : il doit pouvoir se refermer entièrement.
const isSheet = () => window.matchMedia('(max-width:860px)').matches;
function closePanel() { $('#panel').classList.add('hidden'); }

function renderEmpty() {
  const picks = ['pizza-napoletana', 'ceviche', 'ramen-tonkotsu', 'tagine-agneau', 'feijoada', 'pad-thai'];
  $('#panel').innerHTML = `<div class="panel-empty fade">
    <button class="close close-empty" title="${t('close')}">✕</button>
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.4">
      <circle cx="50" cy="50" r="34"/><ellipse cx="50" cy="50" rx="14" ry="34"/>
      <path d="M18 38h64M18 62h64"/><circle cx="50" cy="50" r="34"/>
    </svg>
    <h2>${t('emptyTitle')}</h2><p>${t('emptyText')}</p>
    <p style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;opacity:.7;margin-bottom:12px">${t('suggest')}</p>
    <div class="chips">${picks.map(id => {
      const d = DISHES.find(x => x.id === id);
      return `<button data-go="${id}">${esc(d.n[state.lang])}</button>`;
    }).join('')}</div></div>`;
  $('#panel').querySelectorAll('[data-go]').forEach(b => b.onclick = () => select(b.dataset.go));
  const c = $('#panel .close-empty'); if (c) c.onclick = closePanel;
}

function renderDish() {
  const d = state.dish, f = state.servings / d.base;
  const sibs = siblingsOf(d);
  const sibIds = new Set(sibs.map(x => x.id));
  const near = DISHES.filter(x => x.id !== d.id && !sibIds.has(x.id))
    .sort((a, b) => dist(d, a) - dist(d, b)).slice(0, 3);
  $('#panel').innerHTML = `
  <div class="hero fade">
    <div class="art" id="art">${dishSVG(d, 480)}</div>
    <div class="credit" id="credit"></div>
    <button class="close" title="${t('close')}">✕</button>
    ${IS_ADMIN ? `<div class="photo-edit">
      <button id="photoBtn" title="${t('photoEditHelp')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h3l2-2h8l2 2h3v13H3z"/><circle cx="12" cy="13" r="3.6"/></svg>
        <span>${hasOwnPhoto(d) ? t('photoChange') : t('photoAdd')}</span>
      </button>
      ${hasOwnPhoto(d) ? `<button id="photoDel" class="del" title="${t('photoReset')}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"/></svg>
      </button>` : ''}
      <input type="file" id="photoFile" accept="image/*" hidden>
    </div>` : ''}
    <div class="cap">
      <h2>${esc(d.n[state.lang])}</h2>
      <div class="loc"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>${esc(d.p[state.lang])}</div>
    </div>
  </div>
  <div class="body">
    ${IS_ADMIN ? `<button class="editbtn" id="editDish">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
      Modifier cette fiche
    </button>` : ''}
    <div class="tags">${d.tags.map(x => TAGS[x] ? `<span>${TAGS[x][L()]}</span>` : '').join('')}</div>
    <p class="desc">${esc(d.d[state.lang])}</p>
    <div class="meta">
      <div><b>${fmtTime(d.prep)}</b><small>${t('prep')}</small></div>
      <div><b>${fmtTime(d.cook)}</b><small>${t('cook')}</small></div>
      <div><b>${t('diffs')[d.diff - 1]}</b><small>${t('diff')}</small></div>
    </div>
    <h3 class="sec">${t('ingredients')}</h3>
    <div class="servings">
      <span class="lbl">${t('servings')}</span>
      <div class="ctl">
        <button id="minus">−</button><b id="nb">${state.servings}</b><button id="plus">+</button>
      </div>
    </div>
    <ul class="ing" id="ilist">${ingRows(d, f)}</ul>
    <h3 class="sec">${t('method')}</h3>
    <ol class="steps">${d.s[state.lang].map(x => `<li>${esc(x)}</li>`).join('')}</ol>
    ${sibs.length ? `<div class="nearby samecity">
      <h3 class="sec">${t('sameCity')}</h3>
      ${sibs.map(x => `<button data-go="${x.id}">
        <span class="th" data-th="${x.id}">${dishSVG(x, 90)}</span>
        <span class="tx"><b>${esc(x.n[state.lang])}</b><small>${esc(x.p[state.lang])}</small></span>
      </button>`).join('')}
    </div>` : ''}
    <div class="nearby">
      <h3 class="sec">${t('nearby')}</h3>
      ${near.map(x => `<button data-go="${x.id}">
        <span class="th" data-th="${x.id}">${dishSVG(x, 90)}</span>
        <span class="tx"><b>${esc(x.n[state.lang])}</b><small>${esc(x.p[state.lang])}</small></span>
      </button>`).join('')}
    </div>
  </div>`;
  $('#panel .close').onclick = deselect;
  bindPhotoEdit(d);
  const ed = $('#editDish'); if (ed) ed.onclick = () => openEditor(d);
  $('#minus').onclick = () => setServings(state.servings - (state.servings > 12 ? 2 : 1));
  $('#plus').onclick = () => setServings(state.servings + (state.servings >= 12 ? 2 : 1));
  $('#panel').querySelectorAll('[data-go]').forEach(b => b.onclick = () => select(b.dataset.go));
  updateBtns();
  $('#panel').scrollTop = 0;
  // vraies photos (Wikimedia) chargées par-dessus l'illustration
  fillPhoto($('#art'), d, $('#credit'));
  [...sibs, ...near].forEach(x => fillPhoto($(`[data-th="${x.id}"]`), x, null));
}
/* ---------- photo (réservé à l'administration) ---------- */
const hasOwnPhoto = d => !!(DB_PHOTO[d.id] || MYPHOTO[d.id]);

function bindPhotoEdit(d) {
  const btn = $('#photoBtn'), file = $('#photoFile'), del = $('#photoDel');
  if (!btn || !file) return;
  btn.onclick = () => file.click();
  file.onchange = async () => {
    const f = file.files && file.files[0];
    file.value = '';
    if (!f) return;
    if (!/^image\//.test(f.type)) { flash(t('photoBadType')); return; }
    const lbl = btn.querySelector('span'), was = lbl.textContent;
    lbl.textContent = t('photoSaving'); btn.disabled = true;
    try {
      const dataUrl = await shrinkImage(f);
      // connecté : la photo part en base et devient visible par tous
      if (typeof publishPhoto === 'function' && IS_ADMIN) await publishPhoto(d.id, dataUrl);
      else await saveMyPhoto(d.id, dataUrl);
      delete PHOTOS[d.id];
      if (state.dish && state.dish.id === d.id) renderDish();
      flash(t('photoSaved'));
    } catch (e) {
      lbl.textContent = was; btn.disabled = false;
      flash(e && e.message ? e.message : t('photoError'));
    }
  };
  if (del) del.onclick = async () => {
    try {
      if (typeof unpublishPhoto === 'function' && IS_ADMIN && DB_PHOTO[d.id]) await unpublishPhoto(d.id);
      await clearMyPhoto(d.id);
      delete PHOTOS[d.id];            // on ré-interrogera Wikimedia
      if (state.dish && state.dish.id === d.id) renderDish();
      flash(t('photoRemoved'));
    } catch (e) { flash(t('photoError')); }
  };
}
/* petit message éphémère en bas d'écran */
let flashEl, flashTimer;
function flash(msg) {
  if (!flashEl) { flashEl = document.createElement('div'); flashEl.className = 'flash'; document.body.appendChild(flashEl); }
  flashEl.textContent = msg;
  flashEl.classList.add('on');
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => flashEl.classList.remove('on'), 2600);
}

function ingRows(d, f) {
  return d.i.map(([id, q, u]) => {
    const s = scaleQty(q, u, f);
    return `<li><span class="q">${s.n}${s.n && s.u ? ' ' : ''}${s.u}</span><span>${ING[id][L()]}</span></li>`;
  }).join('');
}
function updateBtns() {
  const m = $('#minus'), p = $('#plus');
  if (m) m.disabled = state.servings <= 1;
  if (p) p.disabled = state.servings >= 24;
}
function setServings(n) {
  state.servings = Math.max(1, Math.min(24, n));
  $('#nb').textContent = state.servings;
  $('#ilist').innerHTML = ingRows(state.dish, state.servings / state.dish.base);
  updateBtns();
}

/* ---------- selection ---------- */
function pickMarker(m, keepZoom) {
  // au doigt il n'y a pas de survol : le clic ouvre lui aussi la liste
  if (groupable(m)) {
    const r = $('#globe').getBoundingClientRect();
    showPlaceMenu(m, r.left + m.sx, r.top + m.sy);
    return;
  }
  select(m.id, keepZoom);
}
function select(id, keepZoom) {
  const d = DISHES.find(x => x.id === id);
  if (!d) return;
  hidePlaceMenu();
  state.dish = d; state.servings = d.base;
  globe.active = id;
  globe.flyTo(d.lat, d.lon, keepZoom ? Math.max(globe.tZoom, 3.2) : 4.2);
  $('#panel').classList.remove('hidden');
  renderDish();
  hideHint();
}
function deselect() {
  state.dish = null; globe.active = null;
  renderEmpty();
  // sur mobile, laisser l'écran d'accueil ouvert masquerait le globe sans
  // qu'on puisse le refermer : on rend la main à la carte.
  if (isSheet()) closePanel();
  // On ne touche ni au cadrage ni au zoom : fermer une fiche, c'est reprendre
  // l'exploration là où on l'avait laissée. Le bouton ↺ sert à revenir au monde.
  globe.autoSpin = false;
}

/* ---------- markers / filter ---------- */
function refreshMarkers() {
  const keep = state.cont === 'all';
  // rank = ordre d'ajout : les plats les plus emblématiques ont été écrits en premier,
  // ils l'emportent donc quand plusieurs fiches se superposent sur une même ville.
  const list = DISHES.filter(d => (keep || d.c === state.cont) && matchFilters(d, state.filters))
    .map(d => ({
      id: d.id, lat: d.lat, lon: d.lon, label: d.n[state.lang],
      color: CONT_COLOR[d.c], rank: RANK[d.id]
    }));
  globe.markers = list;
  updateCount();
}
function updateCount() {
  const el = $('#count'); if (!el) return;
  const n = globe.markers.length;
  el.textContent = n ? n + ' ' + t('spec') : t('fNone');
  el.classList.toggle('empty', n === 0);
}
function setCont(c) {
  state.cont = c;
  document.querySelectorAll('.continents button[data-c]').forEach(b => b.classList.toggle('on', b.dataset.c === c));
  refreshMarkers();
  if ($('#filterPanel') && $('#filterPanel').classList.contains('open')) renderFilters();
  const v = CONT_VIEW[c];
  globe.flyTo(v.lat, v.lon, v.z);
}

/* ---------- filtres ----------
   Les continents disent où ; les filtres disent quoi. On les
   garde repliés : ouverts en permanence ils mangeraient le globe
   sur un téléphone, et la plupart des visites n'en ont pas besoin. */
const FILTER_SECTIONS = [
  { kind: 'without', label: 'fWithout', keys: ['meat', 'fish', 'pork', 'beef', 'alcohol'], dict: 'without' },
  { kind: 'groups', label: 'fGroups', keys: ['veg', 'pork', 'beef', 'poultry', 'lamb', 'game', 'rabbit', 'fish', 'seafood'], dict: 'groups' },
  { kind: 'diff', label: 'fDiff', keys: ['1', '2', '3'] },
  { kind: 'speed', label: 'fSpeed', keys: ['fast', 'medium', 'long'], dict: 'speeds' },
  { kind: 'tags', label: 'fTags', keys: ['veg', 'sea', 'festive', 'sunday', 'comfort', 'street', 'sweet', 'fast', 'slow'] }
];

function filterLabel(sec, key) {
  if (sec.kind === 'diff') return t('diffs')[+key - 1];
  if (sec.kind === 'tags') return (TAGS[key] || [])[L()] || key;
  return (t(sec.dict) || {})[key] || key;
}

function activeFilterCount() {
  const f = state.filters;
  return f.without.size + f.groups.size + f.diff.size + f.speed.size + f.tags.size;
}

function renderFilters() {
  const box = $('#filterPanel'); if (!box) return;
  // le décompte se fait sur le continent choisi : afficher « 0 » pour une
  // case utile ailleurs dans le monde serait trompeur
  const pool = DISHES.filter(d => state.cont === 'all' || d.c === state.cont);
  box.innerHTML = FILTER_SECTIONS.map(sec => {
    const rows = sec.keys.map(k => {
      const on = state.filters[sec.kind].has(k);
      const n = on ? null : countFor(pool, state.filters, sec.kind, k);
      const dead = n === 0 ? ' dead' : '';
      return `<label class="fchip${on ? ' on' : ''}${dead}">`
        + `<input type="checkbox" data-kind="${sec.kind}" data-key="${esc(k)}"${on ? ' checked' : ''}>`
        + `<span>${esc(filterLabel(sec, k))}</span>`
        + (n === null ? '' : `<b>${n}</b>`) + `</label>`;
    }).join('');
    return `<div class="fsec"><h4>${esc(t(sec.label))}</h4><div class="fchips">${rows}</div></div>`;
  }).join('');
  box.innerHTML = `<div class="fhead"><span>${esc(t('filters'))}</span>`
    + `<button type="button" id="fclose" class="fclose" aria-label="${esc(t('close'))}">&times;</button></div>`
    + box.innerHTML
    + `<button type="button" id="fclear" class="fclear">${esc(t('filtersClear'))}</button>`;
  $('#fclose').onclick = () => toggleFilters(false);

  box.querySelectorAll('input[type=checkbox]').forEach(cb => cb.onchange = () => {
    const set = state.filters[cb.dataset.kind];
    cb.checked ? set.add(cb.dataset.key) : set.delete(cb.dataset.key);
    applyFilters();
  });
  $('#fclear').onclick = () => { state.filters = emptyFilters(); applyFilters(); };
}

function applyFilters() {
  refreshMarkers();
  renderFilters();
  const btn = $('#filterBtn'); if (!btn) return;
  const n = activeFilterCount();
  btn.textContent = n ? `${t('filters')} · ${n}` : t('filters');
  btn.classList.toggle('on', n > 0);
}

function filtersOpen() {
  const box = $('#filterPanel');
  return !!(box && box.classList.contains('open'));
}
function toggleFilters(force) {
  const box = $('#filterPanel'); if (!box) return;
  const open = force != null ? force : !box.classList.contains('open');
  box.classList.toggle('open', open);
  $('#filterBtn').setAttribute('aria-expanded', String(open));
  if (open) renderFilters();
}

/* ---------- search ---------- */
function runSearch(q) {
  const box = $('#results');
  q = q.trim().toLowerCase();
  if (q.length < 2) { box.classList.remove('on'); return; }
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const nq = norm(q);
  // on cherche dans les langues effectivement téléchargées (au moins l'affichée)
  const hits = DISHES.filter(d =>
    LANGS.some(l => (d.n[l] && norm(d.n[l]).includes(nq)) || (d.p[l] && norm(d.p[l]).includes(nq)))
    || d.i.some(([id]) => ING[id] && norm(ING[id][L()]).includes(nq))).slice(0, 8);
  box.innerHTML = hits.length
    ? hits.map(d => `<button data-go="${d.id}"><span>${esc(d.n[state.lang])}</span><small>${esc(d.p[state.lang])}</small></button>`).join('')
    : `<button disabled style="opacity:.6">${t('noRes')}</button>`;
  box.classList.add('on');
  box.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
    box.classList.remove('on'); $('#q').value = ''; select(b.dataset.go);
  });
}

/* ---------- language ---------- */
async function setLang(l) {
  // les textes d'une langue ne sont téléchargés qu'au moment où on en a besoin
  if (!LOADED[l]) {
    document.body.classList.add('loading-lang');
    try { await loadLang(l); }
    catch (e) { document.body.classList.remove('loading-lang'); flash(t('loadError')); return; }
    document.body.classList.remove('loading-lang');
  }
  state.lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('.langs button').forEach(b => b.classList.toggle('on', b.dataset.l === l));
  $('#t1').textContent = t('title1'); $('#t2').textContent = t('title2');
  $('#tag').textContent = t('tagline');
  $('#q').placeholder = t('search');
  $('#hint').textContent = t('hint');
  document.querySelectorAll('.continents button[data-c]').forEach(b => {
    b.textContent = b.dataset.c === 'all' ? t('all') : t('conts')[b.dataset.c];
  });
  if ($('#filterBtn')) applyFilters();
  refreshMarkers();
  state.dish ? renderDish() : renderEmpty();
}

/* ---------- tooltip ---------- */
let tipEl;
function showTip(m, x, y) {
  // plusieurs spécialités sous le même point, et l'on est assez près du sol
  // pour que ce soit vraiment le même lieu : on propose de choisir
  if (m && groupable(m)) { hideTip(); showPlaceMenu(m, x, y); return; }
  // fermeture différée : on doit pouvoir sortir du globe pour aller cliquer
  // dans la liste sans qu'elle se dérobe
  scheduleHideMenu();
  if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'tip'; document.body.appendChild(tipEl); }
  if (!m) { tipEl.classList.remove('on'); return; }
  const d = DISHES.find(z => z.id === m.id);
  if (!d) { tipEl.classList.remove('on'); return; }
  tipEl.innerHTML = `${esc(d.n[state.lang])}<small>${esc(d.p[state.lang])}</small>`;
  tipEl.style.left = (x + 16) + 'px'; tipEl.style.top = (y - 10) + 'px';
  tipEl.classList.add('on');
}
function hideTip() { if (tipEl) tipEl.classList.remove('on'); }

/* ---------- liste des recettes d'un même lieu ----------
   En vue rapprochée, un point qui en cache d'autres cesse d'être un
   raccourci vers la fiche la mieux classée : il ouvre la liste complète
   des spécialités de l'endroit, et c'est vous qui choisissez. */
const PLACE_MENU_ZOOM = 5;   // en deçà, les points groupés couvrent une région entière
const groupable = m =>
  !!(m && m.groupIds && m.groupIds.length && globe && globe.zoom >= PLACE_MENU_ZOOM);

let menuEl, menuTimer, menuFor = null;
function ensureMenu() {
  if (menuEl) return menuEl;
  menuEl = document.createElement('div');
  menuEl.className = 'placemenu';
  // la souris doit pouvoir quitter le globe pour venir cliquer dans la liste
  menuEl.addEventListener('pointerenter', () => clearTimeout(menuTimer));
  menuEl.addEventListener('pointerleave', () => scheduleHideMenu());
  document.body.appendChild(menuEl);
  return menuEl;
}
function scheduleHideMenu() {
  clearTimeout(menuTimer);
  menuTimer = setTimeout(hidePlaceMenu, 260);
}
function hidePlaceMenu() {
  clearTimeout(menuTimer);
  if (menuEl) menuEl.classList.remove('on');
  menuFor = null;
}
function showPlaceMenu(m, x, y) {
  clearTimeout(menuTimer);
  const ids = [m.id, ...m.groupIds];
  const list = ids.map(id => DISHES.find(d => d.id === id)).filter(Boolean);
  if (list.length < 2) { hidePlaceMenu(); return; }
  const el = ensureMenu();
  if (menuFor !== m.id) {
    el.innerHTML = `<div class="ttl">${esc(list[0].p[state.lang])}
        <small>${list.length} ${t('spec')}</small></div>
      <div class="rows">${list.map(d => `<button data-go="${d.id}">
        <span class="th" data-th="${d.id}">${dishSVG(d, 72)}</span>
        <span class="tx"><b>${esc(d.n[state.lang])}</b><small>${esc(TAGS[d.tags[0]] ? TAGS[d.tags[0]][L()] : '')}</small></span>
      </button>`).join('')}</div>`;
    el.querySelectorAll('[data-go]').forEach(b => b.onclick = () => {
      hidePlaceMenu(); select(b.dataset.go, true);
    });
    list.forEach(d => fillPhoto(el.querySelector(`[data-th="${d.id}"]`), d, null));
    menuFor = m.id;
  }
  el.classList.add('on');
  // on garde la liste dans l'écran
  const r = el.getBoundingClientRect();
  const left = Math.min(Math.max(8, x + 18), window.innerWidth - r.width - 8);
  const top = Math.min(Math.max(8, y - 24), window.innerHeight - r.height - 8);
  el.style.left = left + 'px'; el.style.top = top + 'px';
}
let hintTimer;
function hideHint() { const h = $('#hint'); if (h) h.style.opacity = 0; }

/* ---------- boot ---------- */
window.addEventListener('DOMContentLoaded', async () => {
  const nav = (navigator.language || 'fr').slice(0, 2);
  const lang = LANGS.includes(nav) ? nav : 'fr';

  // 1. données livrées avec le site : affichage immédiat, même hors ligne
  try {
    await loadCore(lang);
  } catch (e) {
    $('#boot').innerHTML = `<p>Impossible de charger les données.<br>
      <button onclick="location.reload()">Réessayer</button></p>`;
    return;
  }
  buildCities();
  document.body.classList.remove('booting');

  globe = new Globe($('#globe'), {
    onPick: m => pickMarker(m, true),
    onHover: (m, x, y) => showTip(m, x, y)
  });
  // rendu accessible pour les tests automatisés et le diagnostic en console
  window.theGlobe = globe;
  refreshMarkers();
  // continent chips
  const cbox = $('.continents');
  ['all', 'eu', 'as', 'af', 'na', 'sa', 'oc'].forEach(c => {
    const b = document.createElement('button');
    b.dataset.c = c; if (c === 'all') b.classList.add('on');
    b.onclick = () => setCont(c);
    cbox.appendChild(b);
  });
  const fb = document.createElement('button');
  fb.id = 'filterBtn'; fb.className = 'filter-toggle';
  fb.setAttribute('aria-expanded', 'false'); fb.setAttribute('aria-controls', 'filterPanel');
  fb.onclick = () => toggleFilters();
  cbox.appendChild(fb);
  // barre et panneau dans un même bloc : le panneau se place sous les
  // puces au lieu de flotter à une hauteur fixe qui finissait par
  // recouvrir le bouton dès que la barre passait à deux lignes
  const wrap = document.createElement('div');
  wrap.className = 'mapctl';
  cbox.insertAdjacentElement('beforebegin', wrap);
  wrap.appendChild(cbox);
  const fp = document.createElement('div');
  fp.id = 'filterPanel'; fp.className = 'filterpanel';
  wrap.appendChild(fp);
  applyFilters();
  document.querySelectorAll('.langs button').forEach(b => b.onclick = () => setLang(b.dataset.l));
  $('#q').addEventListener('input', e => runSearch(e.target.value));
  $('#q').addEventListener('keydown', e => {
    if (e.key === 'Enter') { const f = $('#results button[data-go]'); if (f) f.click(); }
    if (e.key === 'Escape') { $('#results').classList.remove('on'); e.target.blur(); }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.search')) $('#results').classList.remove('on');
    // au doigt, toucher ailleurs referme la liste d'un lieu
    if (!e.target.closest('.placemenu') && e.target.id !== 'globe') hidePlaceMenu();
    // ... et le panneau de filtres, sauf si l'on vient de cliquer dedans
    // ou sur le bouton qui l'ouvre
    if (filtersOpen() && !e.target.closest('#filterPanel') && !e.target.closest('#filterBtn'))
      toggleFilters(false);
  });
  $('#zin').onclick = () => globe.setZoom(globe.tZoom * 1.5);
  $('#zout').onclick = () => globe.setZoom(globe.tZoom / 1.5);
  $('#zhome').onclick = () => { state.cont = 'all'; setCont('all'); deselect(); };
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (filtersOpen()) { toggleFilters(false); return; }
    if (state.dish) deselect();
  });
  await setLang(lang);
  renderEmpty();
  hintTimer = setTimeout(hideHint, 9000);
  // barre d'administration : visible seulement via /?admin ou une session ouverte
  if (IS_ADMIN || /[?&]admin\b/.test(location.search)) adminBar();
  loadMyPhotos().catch(() => { });

  // 2. une fois l'écran utilisable, on demande à la base ce qui a changé
  //    depuis la publication du site (le plus souvent : rien).
  syncFromDB(lang).then(res => {
    if (res && res.changed) {
      buildCities();
      refreshMarkers();
      state.dish ? renderDish() : renderEmpty();
    }
  }).catch(() => { });
});

/* ===== admin-ui.js ===== */
/* ============================================================
   admin-ui.js — barre d'administration et formulaire d'édition.
   Rien de tout cela n'est visible ni accessible aux visiteurs.
   ============================================================ */

function adminBar() {
  let bar = document.querySelector('.adminbar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'adminbar';
    document.body.appendChild(bar);
  }
  bar.innerHTML = IS_ADMIN
    ? `<span class="dot"></span><b>Mode administration</b>
       <span class="hintx">Ouvrez une fiche pour la modifier</span>
       <button id="admOut">Se déconnecter</button>`
    : `<button id="admIn">Connexion</button>`;
  document.body.classList.toggle('is-admin', IS_ADMIN);
  const out = bar.querySelector('#admOut'), inb = bar.querySelector('#admIn');
  if (out) out.onclick = () => { adminLogout(); adminBar(); if (state.dish) renderDish(); flash('Déconnecté'); };
  if (inb) inb.onclick = openLogin;
  // export / modèle / import du classeur Excel
  if (IS_ADMIN) loadAdminTools().then(() => xlsxBar(bar)).catch(() => { });
}

/* Les outils tableur pèsent 16 Ko compressés, inutiles aux visiteurs :
   on ne les télécharge qu'à l'ouverture de la barre d'administration. */
let adminToolsP;
function loadAdminTools() {
  if (typeof xlsxBar === 'function') return Promise.resolve();
  if (adminToolsP) return adminToolsP;
  adminToolsP = new Promise((ok, ko) => {
    const s = document.createElement('script');
    s.src = 'assets/admin-tools.js';
    s.onload = ok;
    s.onerror = () => { adminToolsP = null; ko(new Error('Outils tableur indisponibles')); };
    document.head.appendChild(s);
  });
  return adminToolsP;
}

function openLogin() {
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `<form class="box" autocomplete="on">
    <h3>Connexion</h3>
    <p class="sub">Réservé au propriétaire du site.</p>
    <label>E-mail<input type="email" name="email" required autocomplete="username"></label>
    <label>Mot de passe<input type="password" name="password" required autocomplete="current-password"></label>
    <p class="err" hidden></p>
    <div class="row">
      <button type="button" class="ghost" data-close>Annuler</button>
      <button type="submit">Se connecter</button>
    </div>
  </form>`;
  document.body.appendChild(wrap);
  const f = wrap.querySelector('form'), err = wrap.querySelector('.err');
  const close = () => wrap.remove();
  wrap.querySelector('[data-close]').onclick = close;
  wrap.onclick = e => { if (e.target === wrap) close(); };
  f.onsubmit = async e => {
    e.preventDefault();
    const btn = f.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Connexion…';
    try {
      await adminLogin(f.email.value.trim(), f.password.value);
      close(); adminBar();
      if (state.dish) renderDish();
      flash('Connecté — vous pouvez modifier les fiches');
    } catch (ex) {
      err.textContent = ex.message; err.hidden = false;
      btn.disabled = false; btn.textContent = 'Se connecter';
    }
  };
  setTimeout(() => f.email.focus(), 50);
}

/* ---------- formulaire d'édition d'une fiche ---------- */
function openEditor(d) {
  const lang = state.lang;
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `<form class="box wide">
    <h3>Modifier la fiche</h3>
    <p class="sub">Langue : <b>${lang.toUpperCase()}</b> — chaque langue se modifie séparément.</p>
    <label>Nom du plat<input name="name" value="${escAttr(d.n[lang] || '')}" required></label>
    <label>Lieu<input name="place" value="${escAttr(d.p[lang] || '')}" required></label>
    <label>Description<textarea name="description" rows="4" required>${esc(d.d[lang] || '')}</textarea></label>
    <label>Étapes (une par ligne)<textarea name="steps" rows="7" required>${esc((d.s[lang] || []).join('\n'))}</textarea></label>
    <div class="grid4">
      <label>Personnes<input name="base" type="number" min="1" max="50" value="${d.base}"></label>
      <label>Préparation (min)<input name="prep" type="number" min="0" value="${d.prep}"></label>
      <label>Cuisson (min)<input name="cook" type="number" min="0" value="${d.cook}"></label>
      <label>Difficulté<select name="diff">
        ${[1, 2, 3].map(n => `<option value="${n}"${d.diff === n ? ' selected' : ''}>${t('diffs')[n - 1]}</option>`).join('')}
      </select></label>
    </div>
    <p class="err" hidden></p>
    <div class="row">
      <button type="button" class="ghost" data-close>Annuler</button>
      <button type="submit">Enregistrer</button>
    </div>
  </form>`;
  document.body.appendChild(wrap);
  const f = wrap.querySelector('form'), err = wrap.querySelector('.err');
  const close = () => wrap.remove();
  wrap.querySelector('[data-close]').onclick = close;
  wrap.onclick = e => { if (e.target === wrap) close(); };
  f.onsubmit = async e => {
    e.preventDefault();
    const btn = f.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Enregistrement…';
    // NB : on passe par f.elements — sur un formulaire, « f.name » renvoie
    // l'attribut name du formulaire lui-même, pas le champ qui porte ce nom.
    const el = f.elements;
    try {
      const steps = el.steps.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (steps.length < 1) throw new Error('Indiquez au moins une étape');
      await saveDishText(d.id, lang, {
        name: el.name.value.trim(), place: el.place.value.trim(),
        description: el.description.value.trim(), steps
      });
      await saveDishFacts(d.id, {
        base: +el.base.value, prep: +el.prep.value, cook: +el.cook.value, diff: +el.diff.value
      });
      close();
      state.servings = d.base;
      renderDish(); refreshMarkers();
      flash('Fiche enregistrée');
    } catch (ex) {
      err.textContent = ex.message; err.hidden = false;
      btn.disabled = false; btn.textContent = 'Enregistrer';
    }
  };
}

const escAttr = s => String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;');

