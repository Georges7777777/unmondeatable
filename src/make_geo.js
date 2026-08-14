/* ============================================================
   make_geo.js — génère geo.js depuis Natural Earth 50m (world-atlas)
   Usage : node make_geo.js /chemin/vers/countries-50m.json > geo.js

   Sortie : un objet GEO compact
     - arcs encodés en varint base64 (zigzag, 5 bits utiles + 1 bit de suite)
     - anneaux de côtes (fermés, remplis) et frontières internes (lignes)
   ============================================================ */
const fs = require('fs');

const SRC = process.argv[2];
const topo = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function encVarint(v, out) {
  let u = v < 0 ? (-v * 2 - 1) : v * 2;   // zigzag
  for (;;) {
    const chunk = u & 31;
    u = Math.floor(u / 32);
    out.push(CHARS[chunk | (u > 0 ? 32 : 0)]);
    if (u === 0) break;
  }
}

/* ---- 1. encoder tous les arcs ---- */
const parts = [];
for (const arc of topo.arcs) {
  encVarint(arc.length, parts);
  for (let i = 0; i < arc.length; i++) {
    encVarint(arc[i][0], parts);
    encVarint(arc[i][1], parts);
  }
}
const arcStr = parts.join('');

/* ---- 2. anneaux de côte depuis l'objet "land" ---- */
function collectRings(geom, into) {
  if (!geom) return;
  if (geom.type === 'GeometryCollection') { geom.geometries.forEach(g => collectRings(g, into)); return; }
  if (geom.type === 'Polygon') { geom.arcs.forEach(r => into.push(r)); return; }
  if (geom.type === 'MultiPolygon') { geom.arcs.forEach(p => p.forEach(r => into.push(r))); return; }
}
const coastRings = [];
collectRings(topo.objects.land, coastRings);

/* ---- 3. frontières internes : arcs partagés par >= 2 anneaux de pays ---- */
const countryRings = [];
collectRings(topo.objects.countries, countryRings);
const useCount = new Map();
for (const ring of countryRings) {
  for (const a of ring) {
    const idx = a < 0 ? ~a : a;
    useCount.set(idx, (useCount.get(idx) || 0) + 1);
  }
}
const borderArcs = [];
for (const [idx, n] of useCount) if (n >= 2) borderArcs.push(idx);
borderArcs.sort((a, b) => a - b);

/* ---- 4. sérialisation ---- */
// les anneaux sont des listes d'index d'arcs (négatif = arc inversé)
const ringStr = coastRings.map(r => r.join(',')).join(';');
// frontières : deltas pour compacité
let prev = 0;
const borderStr = borderArcs.map(i => { const d = i - prev; prev = i; return d; }).join(',');

const tr = topo.transform;
const out = `/* ============================================================
   Géographie — Natural Earth 50m (world-atlas, domaine public)
   Arcs encodés en varint base64 ; décodés au chargement.
   ${topo.arcs.length} arcs · ${topo.arcs.reduce((a, x) => a + x.length, 0)} points
   ============================================================ */
const GEO_Q = {
  sx: ${tr.scale[0]}, sy: ${tr.scale[1]},
  tx: ${tr.translate[0]}, ty: ${tr.translate[1]},
  n: ${topo.arcs.length},
  arcs: '${arcStr}',
  rings: '${ringStr}',
  borders: '${borderStr}'
};

/* ---- décodage ---- */
(function () {
  const C = {};
  const S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (let i = 0; i < 64; i++) C[S[i]] = i;
  const s = GEO_Q.arcs;
  let p = 0;
  function rd() {
    let u = 0, shift = 1, c;
    for (;;) {
      c = C[s[p++]];
      u += (c & 31) * shift;
      if (!(c & 32)) break;
      shift *= 32;
    }
    return (u & 1) ? -((u + 1) / 2) : u / 2;
  }
  // arcs absolus en degrés
  const ARCS = new Array(GEO_Q.n);
  for (let a = 0; a < GEO_Q.n; a++) {
    const len = rd();
    const pts = new Float64Array(len * 2);
    let x = 0, y = 0;
    for (let i = 0; i < len; i++) {
      x += rd(); y += rd();
      pts[i * 2] = x * GEO_Q.sx + GEO_Q.tx;
      pts[i * 2 + 1] = y * GEO_Q.sy + GEO_Q.ty;
    }
    ARCS[a] = pts;
  }
  // anneaux de côte -> tableaux plats [lon,lat,...]
  GEO_COAST = GEO_Q.rings.split(';').map(r => {
    const idx = r.split(',').map(Number);
    const acc = [];
    for (const a of idx) {
      const rev = a < 0, arc = ARCS[rev ? ~a : a];
      const n = arc.length / 2;
      if (rev) { for (let i = n - 1; i >= 0; i--) acc.push(arc[i * 2], arc[i * 2 + 1]); }
      else { for (let i = 0; i < n; i++) acc.push(arc[i * 2], arc[i * 2 + 1]); }
    }
    return acc;
  });
  // frontières internes -> polylignes
  let cur = 0;
  GEO_BORDERS = GEO_Q.borders.split(',').map(d => {
    cur += Number(d);
    const arc = ARCS[cur], n = arc.length / 2, acc = new Array(n * 2);
    for (let i = 0; i < n * 2; i++) acc[i] = arc[i];
    return acc;
  });
  GEO_Q.arcs = GEO_Q.rings = GEO_Q.borders = '';  // libère la mémoire
})();
`;

process.stdout.write('var GEO_COAST, GEO_BORDERS;\n' + out);
