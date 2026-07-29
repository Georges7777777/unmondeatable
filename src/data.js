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
    // 1. rien n'a bougé ? on s'arrête tout de suite
    const v = await fetch(`${SUPA.url}/rest/v1/atlas_content_version?select=updated_at`, { headers: h })
      .then(r => r.ok ? r.json() : null).catch(() => null);
    if (v && v[0] && v[0].updated_at && new Date(v[0].updated_at) <= new Date(SNAPSHOT)) {
      return { changed: 0 };
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

    // 4. photos publiées depuis l'administration
    const ps = await fetch(
      `${SUPA.url}/rest/v1/atlas_dish_photos?select=dish_id,path,credit`, { headers: h }
    ).then(r => r.ok ? r.json() : []).catch(() => []);
    for (const row of ps) {
      DB_PHOTO[row.dish_id] = {
        url: `${SUPA.url}/storage/v1/object/public/atlas-photos/${row.path}`,
        credit: row.credit || ''
      };
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
