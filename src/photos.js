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

/* nom du fichier illustrant l'article du plat */
async function findFile(d) {
  const w = WIKI[d.id] || [];
  for (const [lang, title] of [['en', w[0]], ['fr', w[1]], ['en', d.n.en], ['fr', d.n.fr]]) {
    if (!title) continue;
    try {
      const j = await apiGet(`${API_W(lang)}&redirects=1&prop=pageimages&piprop=name&titles=${encodeURIComponent(title)}`);
      const pages = (j.query && j.query.pages) || {};
      for (const k in pages) {
        const n = pages[k].pageimage;
        if (n && !BAD_EXT.test(n)) return n;
      }
    } catch (e) { /* on tente la source suivante */ }
  }
  // dernier recours : recherche d'image sur Commons
  try {
    const q = encodeURIComponent((w[0] || d.n.en) + ' dish food');
    const j = await apiGet(`${API_C}&generator=search&gsrsearch=${q}&gsrnamespace=6&gsrlimit=5`);
    const pages = (j.query && j.query.pages) || {};
    for (const k in pages) {
      const n = String(pages[k].title || '').replace(/^File:/, '');
      if (n && !BAD_EXT.test(n)) return n;
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

/* résultat mis en cache : une seule requête par plat et par session */
function getPhoto(d, width = 1000) {
  // une photo importée par l'utilisateur court-circuite Wikimedia
  if (MYPHOTO[d.id]) return Promise.resolve({ url: MYPHOTO[d.id], mine: true });
  if (d.id in PHOTOS) return Promise.resolve(PHOTOS[d.id]);
  if (PHOTO_JOBS[d.id]) return PHOTO_JOBS[d.id];
  PHOTO_JOBS[d.id] = (async () => {
    let res = null;
    try {
      const name = await findFile(d);
      if (name) res = await fileInfo(name, width);
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
          credit.textContent = t('photoMine');
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
