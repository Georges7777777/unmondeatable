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
