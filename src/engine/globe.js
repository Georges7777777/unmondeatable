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
      if (d < bd) { bd = d; best = s.m; }
    }
    return best;
  }

  /* ---------- interaction ---------- */
  flyTo(lat, lon, zoom) {
    this.tLat = lat; this.tLon = lon;
    if (zoom) this.tZoom = zoom;
    this.autoSpin = false;
  }
  setZoom(z) { this.tZoom = Math.max(1, Math.min(ZMAX, z)); this.autoSpin = false; }

  _bindEvents() {
    const cv = this.cv;
    let dragging = false, lx = 0, ly = 0, moved = 0;
    const down = e => {
      dragging = true; moved = 0; cv.classList.add('drag');
      lx = e.clientX; ly = e.clientY; this.autoSpin = false;
      cv.setPointerCapture(e.pointerId);
    };
    const move = e => {
      const r = cv.getBoundingClientRect();
      const sx = e.clientX - r.left, sy = e.clientY - r.top;
      if (dragging) {
        const dx = e.clientX - lx, dy = e.clientY - ly;
        moved += Math.abs(dx) + Math.abs(dy);
        // Le point sous le doigt doit rester sous le doigt : un déplacement
        // de dx pixels correspond à un angle dx/R. L'ancienne formule en
        // 1/√zoom faisait s'emballer le déplacement dès qu'on zoomait.
        const k = 57.29578 / this.R;
        // les méridiens se resserrent vers les pôles : à latitude élevée,
        // un pixel horizontal représente davantage de longitude
        const cosLat = Math.max(0.15, Math.cos(this.lat * RAD));
        this.tLon = this.lon = wrapLon(this.lon - dx * k / cosLat);
        this.tLat = this.lat = Math.max(-89, Math.min(89, this.lat + dy * k));
        lx = e.clientX; ly = e.clientY;
        this._dirty = true;
      } else {
        const hit = this.pick(sx, sy);
        const id = hit ? hit.id : null;
        if (id !== this.hover) { this.hover = id; this._dirty = true; this.onHover(hit, e.clientX, e.clientY); }
        cv.style.cursor = hit ? 'pointer' : '';
      }
    };
    const up = e => {
      if (dragging && moved < 5) {
        const r = cv.getBoundingClientRect();
        const hit = this.pick(e.clientX - r.left, e.clientY - r.top);
        if (hit) this.onPick(hit);
      }
      dragging = false; cv.classList.remove('drag');
    };
    cv.addEventListener('pointerdown', down);
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up);
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
    // pinch
    let pd = 0;
    cv.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (pd) this.tZoom = Math.max(1, Math.min(ZMAX, this.tZoom * (d / pd)));
        pd = d; this.autoSpin = false; e.preventDefault();
      }
    }, { passive: false });
    cv.addEventListener('touchend', () => { pd = 0; });
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
