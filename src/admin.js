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
  const blob = dataUrlToBlob(dataUrl);
  const path = `${dishId}-${Date.now()}.jpg`;

  const up = await fetch(`${SB.url}/storage/v1/object/atlas-photos/${path}`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': blob.type, 'x-upsert': 'true' },
    body: blob
  });
  if (!up.ok) throw new Error('Envoi de l’image refusé (' + up.status + ')');

  const prev = DB_PHOTO[dishId];
  const res = await fetch(`${SB.url}/rest/v1/atlas_dish_photos`, {
    method: 'POST',
    headers: { ...authHeaders(true), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ dish_id: dishId, path, credit: credit || null })
  });
  if (!res.ok) throw new Error('Enregistrement refusé (' + res.status + ')');

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
  const r = await fetch(`${SB.url}/rest/v1/atlas_dish_texts`, {
    method: 'POST',
    headers: { ...authHeaders(true), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      dish_id: dishId, lang,
      name: fields.name, place: fields.place,
      description: fields.description, steps: fields.steps
    })
  });
  if (!r.ok) throw new Error('Enregistrement refusé (' + r.status + ')');
  const d = DISHES.find(x => x.id === dishId);
  if (d) { d.n[lang] = fields.name; d.p[lang] = fields.place; d.d[lang] = fields.description; d.s[lang] = fields.steps; }
}

async function saveDishFacts(dishId, fields) {
  if (!IS_ADMIN) throw new Error('Connexion requise');
  const r = await fetch(`${SB.url}/rest/v1/atlas_dishes?id=eq.${encodeURIComponent(dishId)}`, {
    method: 'PATCH',
    headers: { ...authHeaders(true), Prefer: 'return=minimal' },
    body: JSON.stringify(fields)
  });
  if (!r.ok) throw new Error('Enregistrement refusé (' + r.status + ')');
  const d = DISHES.find(x => x.id === dishId);
  if (d) Object.assign(d, {
    lat: fields.lat ?? d.lat, lon: fields.lon ?? d.lon,
    base: fields.base ?? d.base, prep: fields.prep ?? d.prep,
    cook: fields.cook ?? d.cook, diff: fields.diff ?? d.diff,
    i: fields.ingredients ?? d.i
  });
}

restoreSession();
