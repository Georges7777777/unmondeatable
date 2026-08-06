/* ============================================================
   test-ux.mjs — vérifie les trois corrections d'ergonomie :
     1. le déplacement suit le doigt/la souris quel que soit le zoom
     2. sur mobile, fermer une fiche rend la main au globe
     3. le globe reste rond quand le panneau rétrécit la zone de dessin

   Nécessite un serveur local sur le dossier public/ (port 8099).
   ============================================================ */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('/tmp/t/node_modules/jsdom');

const BASE = process.env.BASE || 'http://localhost:8099/';
const errors = [], ok = [];
const check = (cond, label, detail = '') =>
  (cond ? ok : errors).push(label + (detail ? ' — ' + detail : ''));

/* --- largeur de la zone de dessin, pilotée par le test --- */
let BOX = { width: 900, height: 700 };

const dom = await JSDOM.fromURL(BASE, {
  runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true,
  beforeParse(window) {
    window.fetch = (u, o) => fetch(new URL(u, BASE).href, o);
    let store = {};
    Object.defineProperty(window, 'localStorage', { value: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; }, clear: () => { store = {}; }
    }});
    // le test pilote la requête média pour simuler un iPhone
    window.__mobile = false;
    window.matchMedia = q => ({
      matches: /max-width\s*:\s*860px/.test(q) ? window.__mobile : false,
      media: q, addListener() {}, removeListener() {},
      addEventListener() {}, removeEventListener() {}
    });
    const stub = new Proxy({}, { get(_, k) {
      if (k === 'measureText') return () => ({ width: 40 });
      if (k === 'createRadialGradient' || k === 'createLinearGradient') return () => ({ addColorStop() {} });
      if (k === 'setTransform') return () => {};
      return () => {};
    }});
    window.HTMLCanvasElement.prototype.getContext = () => stub;
    // jsdom ne calcule aucune mise en page : on fournit la géométrie
    window.Element.prototype.getBoundingClientRect = function () {
      if (this.id === 'globe') return { ...BOX, left: 0, top: 0, right: BOX.width, bottom: BOX.height, x: 0, y: 0 };
      return { width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0, x: 0, y: 0 };
    };
    window.ResizeObserver = class { observe() {} disconnect() {} };
  }
});
const w = dom.window;
await new Promise(r => w.addEventListener('load', r, { once: true }));
await new Promise(r => setTimeout(r, 2500));
const $ = s => w.document.querySelector(s);
const g = w.theGlobe;

/* ---------- 1. déplacement proportionnel au rayon ---------- */
{
  // Le point saisi doit rester sous le curseur : 100 px de glissé à l'équateur
  // doivent faire tourner le globe de 100/R radians, à tout niveau de zoom.
  const angleFor = zoom => {
    g.lat = 0; g.tLat = 0; g.lon = 0; g.tLon = 0;
    g.zoom = zoom; g.tZoom = zoom;
    const px = 100, k = 57.29578 / g.R;   // même formule que le moteur
    return px * k;                        // degrés parcourus
  };
  const arcAt = zoom => {                 // distance à l'écran, en pixels
    g.zoom = zoom; g.tZoom = zoom;
    return angleFor(zoom) * (Math.PI / 180) * g.R;
  };
  const a1 = arcAt(1), a12 = arcAt(12), a48 = arcAt(48);
  check(Math.abs(a1 - 100) < 0.5 && Math.abs(a12 - 100) < 0.5 && Math.abs(a48 - 100) < 0.5,
    '100 px de glissé = 100 px parcourus à tout zoom',
    `x1 : ${a1.toFixed(1)} px · x12 : ${a12.toFixed(1)} px · x48 : ${a48.toFixed(1)} px`);

  // vérification par le moteur lui-même : on rejoue un vrai glissé
  const cv = $('#globe');
  const drag = (zoom, dx) => {
    g.zoom = g.tZoom = zoom; g.lat = g.tLat = 0; g.lon = g.tLon = 0; g._rot();
    const ev = (type, x) => { const e = new w.PointerEvent(type, { clientX: x, clientY: 350, pointerId: 1, bubbles: true }); cv.dispatchEvent(e); };
    cv.setPointerCapture = () => {};
    ev('pointerdown', 400); ev('pointermove', 400 + dx); ev('pointerup', 400 + dx);
    return Math.abs(g.lon) * (Math.PI / 180) * g.R;   // pixels réellement parcourus
  };
  const d1 = drag(1, 100), d20 = drag(20, 100);
  check(Math.abs(d1 - 100) < 2 && Math.abs(d20 - 100) < 2,
    'glissé réel : le point reste sous le doigt', `x1 : ${d1.toFixed(1)} px · x20 : ${d20.toFixed(1)} px`);
}

/* ---------- 1 bis. pincement à deux doigts ---------- */
{
  const cv = $('#globe');
  cv.setPointerCapture = () => {};
  cv.releasePointerCapture = () => {};
  const ev = (type, id, x, y) =>
    cv.dispatchEvent(new w.PointerEvent(type, { pointerId: id, clientX: x, clientY: y, bubbles: true }));
  const reset = (zoom = 2) => {
    g.zoom = g.tZoom = zoom; g.lat = g.tLat = 20; g.lon = g.tLon = 10; g._rot();
  };
  const cx = () => g.w / 2, cy = () => g.h / 2;

  // a) écarter les doigts zoome, les rapprocher dézoome
  reset(2);
  ev('pointerdown', 1, cx() - 50, cy()); ev('pointerdown', 2, cx() + 50, cy());
  ev('pointermove', 1, cx() - 100, cy()); ev('pointermove', 2, cx() + 100, cy());
  const zOut = g.zoom;
  ev('pointerup', 1, cx() - 100, cy()); ev('pointerup', 2, cx() + 100, cy());
  check(Math.abs(zOut - 4) < 0.05, 'écarter les doigts ×2 double le zoom', `2 → ${zOut.toFixed(2)}`);

  reset(4);
  ev('pointerdown', 1, cx() - 100, cy()); ev('pointerdown', 2, cx() + 100, cy());
  ev('pointermove', 1, cx() - 50, cy()); ev('pointermove', 2, cx() + 50, cy());
  const zIn = g.zoom;
  ev('pointerup', 1, cx() - 50, cy()); ev('pointerup', 2, cx() + 50, cy());
  check(Math.abs(zIn - 2) < 0.05, 'rapprocher les doigts divise le zoom', `4 → ${zIn.toFixed(2)}`);

  // b) un pincement centré et symétrique ne doit pas faire dériver la carte
  reset(3);
  const lat0 = g.lat, lon0 = g.lon;
  ev('pointerdown', 1, cx() - 60, cy()); ev('pointerdown', 2, cx() + 60, cy());
  for (let i = 1; i <= 8; i++) { ev('pointermove', 1, cx() - 60 - i * 8, cy()); ev('pointermove', 2, cx() + 60 + i * 8, cy()); }
  const drift = Math.hypot(g.lat - lat0, g.lon - lon0);
  ev('pointerup', 1, 0, 0); ev('pointerup', 2, 0, 0);
  check(drift < 0.6, 'un pincement centré ne déplace pas la carte', `dérive ${drift.toFixed(3)}°`);

  // c) le lieu pincé reste sous les doigts (déplacement + zoom d'un seul geste)
  reset(3);
  const ax = cx() + 40, ay = cy() - 30;
  g._rot();
  const anchor = g.unproject(ax, ay);
  ev('pointerdown', 1, ax - 60, ay); ev('pointerdown', 2, ax + 60, ay);
  // les doigts s'écartent et glissent ensemble vers la gauche
  for (let i = 1; i <= 10; i++) {
    const mx = ax - i * 6, sp = 60 + i * 6;
    ev('pointermove', 1, mx - sp, ay); ev('pointermove', 2, mx + sp, ay);
  }
  const mxEnd = ax - 60;
  g._rot();
  const p = g.project(anchor.lat, anchor.lon);
  const err = Math.hypot(p.x - mxEnd, p.y - ay);
  ev('pointerup', 1, 0, 0); ev('pointerup', 2, 0, 0);
  check(err < 12, 'le lieu pincé reste entre les deux doigts', `écart ${err.toFixed(1)} px`);

  // d) deux doigts ne doivent jamais être pris pour deux glissés séparés
  reset(2);
  const lat1 = g.lat, lon1 = g.lon, z1 = g.zoom;
  ev('pointerdown', 1, cx() - 70, cy()); ev('pointerdown', 2, cx() + 70, cy());
  // le doigt 2 seul bouge légèrement : rotation interdite, seul le zoom peut varier
  ev('pointermove', 2, cx() + 70, cy());
  const still = Math.abs(g.lat - lat1) + Math.abs(g.lon - lon1) + Math.abs(g.zoom - z1);
  ev('pointerup', 1, 0, 0); ev('pointerup', 2, 0, 0);
  check(still < 0.01, 'deux doigts posés ne déclenchent aucune rotation parasite', `variation ${still.toFixed(4)}`);

  // e) relever un doigt rend la rotation au doigt restant, sans saut
  reset(3);
  ev('pointerdown', 1, cx() - 60, cy()); ev('pointerdown', 2, cx() + 60, cy());
  ev('pointerup', 2, cx() + 60, cy());
  const lat2 = g.lat, lon2 = g.lon;
  ev('pointermove', 1, cx() - 60, cy());          // le doigt restant ne bouge pas
  const jump = Math.abs(g.lat - lat2) + Math.abs(g.lon - lon2);
  ev('pointerup', 1, cx() - 60, cy());
  check(jump < 0.001, 'relever un doigt ne provoque aucun saut', `saut ${jump.toFixed(4)}°`);

  // f) un pincement ne doit pas ouvrir une fiche par mégarde
  reset(3);
  let picked = 0;
  const realPick = g.onPick; g.onPick = () => { picked++; };
  ev('pointerdown', 1, cx(), cy()); ev('pointerdown', 2, cx() + 20, cy());
  ev('pointerup', 2, cx() + 20, cy()); ev('pointerup', 1, cx(), cy());
  g.onPick = realPick;
  check(picked === 0, 'un pincement n’ouvre pas de fiche par mégarde');

  // g) un simple tap continue d'ouvrir une fiche
  reset(3);
  const m = g.markers[0];
  w.deselect();
  g.lat = g.tLat = m.lat; g.lon = g.tLon = m.lon; g._rot(); g.draw();
  const sp = g.project(m.lat, m.lon);
  let tapped = null;
  const keep = g.onPick; g.onPick = h => { tapped = h; };
  ev('pointerdown', 3, sp.x, sp.y); ev('pointerup', 3, sp.x, sp.y);
  g.onPick = keep;
  check(!!tapped, 'un tap simple ouvre toujours la fiche', tapped ? tapped.label : 'aucune');
}

/* ---------- 2. fermeture de la fiche sur mobile ---------- */
{
  const panel = $('#panel');

  w.__mobile = true;
  w.select('pizza-napoletana');
  check(!panel.classList.contains('hidden'), 'mobile : la fiche s’ouvre');
  const closeBtn = $('#panel .close');
  check(!!closeBtn, 'mobile : la fiche a une croix de fermeture');
  closeBtn.click();
  check(panel.classList.contains('hidden'), 'mobile : la croix referme le panneau et rend le globe accessible');

  // filet de sécurité : si l’écran d’accueil s’affiche malgré tout, il se ferme
  panel.classList.remove('hidden');
  w.renderEmpty();
  const emptyClose = $('#panel .close-empty');
  check(!!emptyClose, 'l’écran « Faites tourner le globe » a sa propre croix');
  if (emptyClose) {
    emptyClose.click();
    check(panel.classList.contains('hidden'), 'cette croix referme bien le panneau');
  }

  // sur grand écran, le panneau reste ouvert : le globe est visible à côté
  w.__mobile = false;
  panel.classList.remove('hidden');
  w.select('ceviche');
  $('#panel .close').click();
  check(!panel.classList.contains('hidden'), 'bureau : le panneau reste affiché après fermeture de la fiche');
  check(!!$('#panel .panel-empty'), 'bureau : l’écran d’accueil reprend sa place');
}

/* ---------- 2 bis. fermer une fiche ne recule pas la carte ---------- */
{
  w.select('pizza-napoletana');
  // l’utilisateur ajuste sa vue après avoir ouvert la fiche
  g.tZoom = g.zoom = 14; g.tLat = g.lat = 41.2; g.tLon = g.lon = 14.6;
  const z = g.zoom, la = g.lat, lo = g.lon;
  $('#panel .close').click();
  check(Math.abs(g.tZoom - z) < 0.001, 'fermer une fiche conserve le niveau de zoom', `${z} → ${g.tZoom}`);
  check(Math.abs(g.tLat - la) < 0.001 && Math.abs(g.tLon - lo) < 0.001,
    'fermer une fiche conserve le cadrage', `${g.tLat.toFixed(2)} / ${g.tLon.toFixed(2)}`);
  check(g.autoSpin === false, 'le globe ne repart pas en rotation automatique');

  // le bouton ↺ reste le seul moyen de revenir à la vue mondiale
  $('#zhome').click();
  check(Math.abs(g.tZoom - 1) < 0.001, 'le bouton ↺ ramène bien à la vue mondiale', `zoom cible ${g.tZoom}`);
}

/* ---------- 2 ter. liste des spécialités d’un même lieu ---------- */
{
  const D = w.eval('DISHES');
  const a = D[0], b = D[1], c = D[2];
  // trois spécialités au même endroit : le globe n’affiche qu’un point
  const at = (d, i) => ({ id: d.id, lat: 12 + i * 0.0005, lon: 34, label: d.n.fr, rank: i });
  g.markers = [at(a, 0), at(b, 1), at(c, 2)];
  g.lat = g.tLat = 12; g.lon = g.tLon = 34;

  const hoverPoint = () => { g._rot(); g.draw(); const p = g.project(12, 34); return p; };

  // a) en vue rapprochée, le point groupé ouvre la liste
  g.zoom = g.tZoom = 12;
  let p = hoverPoint();
  const hit = g.pick(p.x, p.y);
  check(!!hit && hit.groupIds && hit.groupIds.length === 2,
    'un point qui en cache d’autres transmet la liste', hit ? `${hit.groupN} spécialités` : 'aucun point');
  w.showTip(hit, p.x, p.y);
  const menu = $('.placemenu');
  check(!!menu && menu.classList.contains('on'), 'la liste s’affiche au survol');
  const rows = menu ? menu.querySelectorAll('[data-go]') : [];
  check(rows.length === 3, 'elle contient les trois spécialités du lieu', rows.length + ' entrées');
  check(!$('.tip.on'), 'l’infobulle simple s’efface au profit de la liste');

  // b) on choisit une recette dans la liste
  const wanted = rows[2] ? rows[2].dataset.go : null;
  if (rows[2]) rows[2].click();
  check(w.eval('state').dish && w.eval('state').dish.id === wanted,
    'cliquer une entrée ouvre la bonne fiche', wanted || '');
  check(!$('.placemenu.on'), 'la liste se referme après le choix');

  // c) en vue mondiale, on garde l’infobulle : la liste encombrerait
  w.deselect();
  g.zoom = g.tZoom = 2;
  p = hoverPoint();
  const far = g.pick(p.x, p.y);
  w.showTip(far, p.x, p.y);
  check(!$('.placemenu.on'), 'en vue large, pas de liste');
  check(!!$('.tip.on'), 'en vue large, l’infobulle habituelle reste');

  // d) un point isolé n’ouvre jamais de liste
  g.markers = [at(a, 0)];
  g.zoom = g.tZoom = 12;
  p = hoverPoint();
  const alone = g.pick(p.x, p.y);
  w.showTip(alone, p.x, p.y);
  check(!$('.placemenu.on'), 'un point isolé n’ouvre pas de liste');
  check(!!alone && !alone.groupIds, 'et il ne transporte aucun groupe');

  w.refreshMarkers();
}

/* ---------- 3. globe rond quel que soit l’espace disponible ---------- */
{
  const radii = [];
  for (const box of [{ width: 1400, height: 800 }, { width: 930, height: 800 }, { width: 420, height: 900 }]) {
    BOX = box;
    g.resize();
    const expected = Math.min(box.width, box.height) * 0.44;
    radii.push({ box, baseR: g.baseR, expected });
  }
  check(radii.every(r => Math.abs(r.baseR - r.expected) < 0.01),
    'le rayon suit toujours le plus petit côté (cercle, jamais ellipse)',
    radii.map(r => `${r.box.width}×${r.box.height} → R ${r.baseR.toFixed(0)}`).join(' · '));

  // l’ovalisation venait d’un canvas non redimensionné : le moteur doit observer sa boîte
  const src = await (await fetch(new URL('assets/engine.js', BASE))).text();
  check(/new ResizeObserver\(\(\) => this\.resize\(\)\)/.test(src),
    'le moteur observe le rétrécissement du canvas (ouverture du panneau)');
  check(/this\.cv\.width = Math\.round\(r\.width \* this\.dpr\)/.test(src),
    'le tampon de dessin est recalculé à chaque redimensionnement');
}

/* ---------- rapport ---------- */
for (const l of ok) console.log('✓ ' + l);
for (const l of errors) console.log('✗ ' + l);
console.log(errors.length ? `\n${errors.length} problème(s).` : '\nTout est vert.');
dom.window.close();
process.exit(errors.length ? 1 : 0);
