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

/* Palette de secours : une fiche arrivée de la base ou d'un import Excel
   peut n'avoir aucune illustration décrite. Sans ce repli, le dessin
   échouait sur une couleur manquante et, l'exception remontant jusqu'à
   l'affichage de la fiche, le panneau restait sur la fiche précédente. */
const FOOD_DEFAUT = ['#c98a4b', '#e8c46a', '#8f5a3a', '#f0e4c8'];
function dishSVG(d, size = 400) {
  const a = (d && d.art) || {}, rd = rng((d && d.id ? d.id : '?') + (a.style || ''));
  const S = size, c = S / 2, r = S * 0.33;
  const p = Array.isArray(a.food) && a.food.length ? a.food : FOOD_DEFAUT;
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
