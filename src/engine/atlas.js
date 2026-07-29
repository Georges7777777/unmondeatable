/* ============================================================
   Atlas — couche encyclopédique alimentée par Wikidata.
   Des centaines de plats supplémentaires (nom, pays, photo,
   résumé) sans recette, en complément des fiches rédigées.
   ============================================================ */
const ATLAS = { on: false, items: [], loading: false, failed: false, lang: null };
const WDQS = 'https://query.wikidata.org/sparql';

const SPARQL = lang => `SELECT ?d ?dLabel ?img ?c ?cLabel ?coord WHERE {
  ?d wdt:P31 wd:Q746549 ; wdt:P18 ?img ; wdt:P495 ?c .
  ?c wdt:P625 ?coord .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang},en". }
} LIMIT 2000`;

/* --- clés de comparaison pour ne pas doublonner les fiches rédigées --- */
function norm(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '');
}
let CURATED_KEYS = null;
function curatedKeys() {
  if (CURATED_KEYS) return CURATED_KEYS;
  CURATED_KEYS = new Set();
  for (const d of DISHES) {
    for (const l of LANGS) CURATED_KEYS.add(norm(d.n[l]));
    const w = WIKI[d.id] || [];
    w.forEach(x => x && CURATED_KEYS.add(norm(x)));
  }
  return CURATED_KEYS;
}
// « Francesinha do Porto » doit être reconnu comme doublon de « Francesinha »
function isCurated(name) {
  const k = norm(name);
  if (!k) return true;
  const keys = curatedKeys();
  if (keys.has(k)) return true;
  for (const c of keys) {
    if (c.length >= 7 && (k.includes(c) || c.includes(k))) return true;
  }
  return false;
}

/* --- dispersion déterministe autour du centre du pays --- */
function spread(qid, lat, lon) {
  let h = 2166136261;
  for (let i = 0; i < qid.length; i++) { h ^= qid.charCodeAt(i); h = Math.imul(h, 16777619); }
  const a = ((h >>> 0) % 3600) / 3600 * Math.PI * 2;
  const r = 0.45 + (((h >>> 9) % 1000) / 1000) * 1.5;
  const dLat = Math.sin(a) * r;
  const dLon = Math.cos(a) * r / Math.max(0.25, Math.cos(lat * Math.PI / 180));
  return [Math.max(-84, Math.min(84, lat + dLat)), wrapLon(lon + dLon)];
}

/* --- cache local (ignoré si le navigateur le refuse en file://) --- */
function cacheGet(k) {
  try {
    const raw = localStorage.getItem(k);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (!o || Date.now() - o.t > 30 * 864e5) return null;
    return o.v;
  } catch (e) { return null; }
}
function cacheSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify({ t: Date.now(), v })); } catch (e) { }
}

async function loadAtlas(lang) {
  const key = 'gdm-atlas-' + lang;
  const hit = cacheGet(key);
  if (hit) return hit;
  const url = WDQS + '?format=json&query=' + encodeURIComponent(SPARQL(lang));
  const r = await fetch(url, { headers: { Accept: 'application/sparql-results+json' } });
  if (!r.ok) throw new Error(r.status);
  const j = await r.json();
  const seen = new Set(), out = [];
  for (const b of (j.results && j.results.bindings) || []) {
    const qid = (b.d.value.split('/').pop() || '');
    if (seen.has(qid)) continue;
    const name = b.dLabel && b.dLabel.value;
    if (!name || /^Q\d+$/.test(name)) continue;      // sans libellé traduit
    if (isCurated(name)) continue;                   // déjà rédigé à la main
    const m = /Point\(([-\d.]+) ([-\d.]+)\)/.exec((b.coord && b.coord.value) || '');
    if (!m) continue;
    seen.add(qid);
    const [lat, lon] = spread(qid, parseFloat(m[2]), parseFloat(m[1]));
    out.push({
      q: qid, name, lat, lon,
      country: (b.cLabel && b.cLabel.value) || '',
      file: decodeURIComponent((b.img.value.split('FilePath/')[1] || '')).replace(/_/g, ' ')
    });
  }
  cacheSet(key, out);
  return out;
}

/* --- activation / désactivation --- */
async function toggleAtlas() {
  const btn = $('#atlas');
  if (ATLAS.on) {
    ATLAS.on = false; btn.classList.remove('on');
    refreshMarkers();
    return;
  }
  ATLAS.on = true; btn.classList.add('on');
  if (ATLAS.items.length && ATLAS.lang === state.lang) { refreshMarkers(); return; }
  ATLAS.loading = true; btn.classList.add('busy'); updateCount();
  try {
    ATLAS.items = await loadAtlas(state.lang);
    ATLAS.lang = state.lang; ATLAS.failed = false;
  } catch (e) {
    ATLAS.items = []; ATLAS.failed = true; ATLAS.on = false; btn.classList.remove('on');
  }
  ATLAS.loading = false; btn.classList.remove('busy');
  refreshMarkers();
}

/* --- fiche encyclopédique --- */
const ATLAS_INFO = {};
async function atlasDetails(q, lang) {
  const ck = q + ':' + lang;
  if (ATLAS_INFO[ck]) return ATLAS_INFO[ck];
  const out = { extract: '', url: '', title: '' };
  try {
    const sites = LANGS.map(l => l + 'wiki').join('|');
    const j = await apiGet(`https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*&ids=${q}&props=sitelinks|descriptions&languages=${LANGS.join('|')}&sitefilter=${sites}`);
    const ent = j.entities && j.entities[q];
    if (ent) {
      const order = [lang, 'en', 'fr', 'es', 'pt'];
      for (const l of order) {
        const sl = ent.sitelinks && ent.sitelinks[l + 'wiki'];
        if (sl) { out.title = sl.title; out.wikilang = l; break; }
      }
      const de = ent.descriptions && (ent.descriptions[lang] || ent.descriptions.en);
      if (de) out.extract = de.value;
    }
    if (out.title) {
      out.url = `https://${out.wikilang}.wikipedia.org/wiki/${encodeURIComponent(out.title.replace(/ /g, '_'))}`;
      const e = await apiGet(`https://${out.wikilang}.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=1&explaintext=1&exsentences=3&redirects=1&titles=${encodeURIComponent(out.title)}`);
      const pages = (e.query && e.query.pages) || {};
      for (const k in pages) if (pages[k].extract) out.extract = pages[k].extract;
    }
  } catch (err) { }
  ATLAS_INFO[ck] = out;
  return out;
}

function renderAtlasCard(m) {
  const it = ATLAS.items.find(x => x.q === m.id.slice(3));
  if (!it) return;
  const src = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(it.file)}?width=1000`;
  $('#panel').innerHTML = `
  <div class="hero fade">
    <div class="art" id="art"><img class="photo on" src="${src}" alt="${esc(it.name)}"></div>
    <div class="credit" id="credit"></div>
    <button class="close" title="${t('close')}">✕</button>
    <div class="cap">
      <h2>${esc(it.name)}</h2>
      <div class="loc"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>${esc(it.country)}</div>
    </div>
  </div>
  <div class="body">
    <div class="tags"><span>${t('encyclo')}</span></div>
    <p class="desc" id="ax">…</p>
    <p><a class="wlink" id="wl" href="#" target="_blank" rel="noopener" style="display:none">${t('readMore')} ↗</a></p>
    <p class="norecipe">${t('noRecipe')}</p>
  </div>`;
  $('#panel .close').onclick = deselect;
  $('#panel').scrollTop = 0;
  atlasDetails(it.q, state.lang).then(info => {
    const ax = $('#ax'); if (!ax) return;
    ax.textContent = info.extract || '';
    if (info.url) { const a = $('#wl'); a.href = info.url; a.style.display = 'inline'; }
  });
  fileInfo(it.file, 1000).then(p => {
    const c = $('#credit');
    if (!p || !c) return;
    const who = [p.author, p.license].filter(Boolean).join(' · ') || 'Wikimedia Commons';
    c.innerHTML = p.page ? `${t('photoBy')} <a href="${p.page}" target="_blank" rel="noopener">${esc(who)}</a>` : `${t('photoBy')} ${esc(who)}`;
    c.classList.add('on');
  }).catch(() => { });
}
