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
  }).join('')
    + `<button type="button" id="fclear" class="fclear">${esc(t('filtersClear'))}</button>`;

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
  const fp = document.createElement('div');
  fp.id = 'filterPanel'; fp.className = 'filterpanel';
  cbox.insertAdjacentElement('afterend', fp);
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
  });
  $('#zin').onclick = () => globe.setZoom(globe.tZoom * 1.5);
  $('#zout').onclick = () => globe.setZoom(globe.tZoom / 1.5);
  $('#zhome').onclick = () => { state.cont = 'all'; setCont('all'); deselect(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && state.dish) deselect(); });
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
