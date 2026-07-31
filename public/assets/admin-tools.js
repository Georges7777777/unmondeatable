/* ===== xlsx.js ===== */
/* ============================================================
   xlsx.js — lecture et écriture de classeurs Excel, sans
   bibliothèque externe.

   Un fichier .xlsx est une archive ZIP contenant des fichiers
   XML. Le navigateur sait déjà tout faire :
     • CompressionStream / DecompressionStream pour le ZIP,
     • des expressions régulières suffisent pour ce XML très
       régulier (pas besoin d'un analyseur complet).

   On évite ainsi d'embarquer une dépendance de 900 Ko pour
   une fonction réservée à l'administration.
   ============================================================ */

/* ---------------- utilitaires binaires ---------------- */
const TE = new TextEncoder(), TD = new TextDecoder();

function crc32(buf) {
  let t = crc32.T;
  if (!t) {
    t = crc32.T = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ t[(c ^ buf[i]) & 0xFF];
  return (c ^ -1) >>> 0;
}

/* On passe les octets dans un flux de (dé)compression natif. On lit et on
   écrit en parallèle : attendre la fin de l'écriture avant de lire bloquerait
   dès que le tampon interne du flux est plein. */
async function pipeBytes(bytes, stream) {
  const reader = stream.readable.getReader();
  const chunks = [];
  let total = 0;
  const pull = (async () => {
    for (; ;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value); total += value.length;
    }
  })();
  const w = stream.writable.getWriter();
  await w.write(bytes);
  await w.close();
  await pull;
  const out = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) { out.set(c, o); o += c.length; }
  return out;
}
async function deflateRaw(bytes) {
  if (typeof CompressionStream === 'undefined') return null;
  return pipeBytes(bytes, new CompressionStream('deflate-raw'));
}
async function inflateRaw(bytes) {
  if (typeof DecompressionStream === 'undefined')
    throw new Error('Votre navigateur est trop ancien pour lire un fichier Excel compressé.');
  return pipeBytes(bytes, new DecompressionStream('deflate-raw'));
}

/* ---------------- ZIP ---------------- */
/* Écriture : en-tête local + répertoire central, format minimal
   mais strictement conforme — Excel, Numbers et LibreOffice le lisent. */
async function zipWrite(files) {
  const parts = [], dir = [];
  let offset = 0;
  for (const [name, content] of files) {
    const nameB = TE.encode(name);
    const raw = typeof content === 'string' ? TE.encode(content) : content;
    const crc = crc32(raw);
    let body = await deflateRaw(raw), method = 8;
    if (!body || body.length >= raw.length) { body = raw; method = 0; }  // compresser n'apporte rien

    const local = new Uint8Array(30 + nameB.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true); lv.setUint16(6, 0, true);
    lv.setUint16(8, method, true);
    lv.setUint16(10, 0, true); lv.setUint16(12, 0x2821, true);   // date fixe : archive reproductible
    lv.setUint32(14, crc, true);
    lv.setUint32(18, body.length, true); lv.setUint32(22, raw.length, true);
    lv.setUint16(26, nameB.length, true); lv.setUint16(28, 0, true);
    local.set(nameB, 30);
    parts.push(local, body);

    const cen = new Uint8Array(46 + nameB.length);
    const cv = new DataView(cen.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true); cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true); cv.setUint16(10, method, true);
    cv.setUint16(12, 0, true); cv.setUint16(14, 0x2821, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, body.length, true); cv.setUint32(24, raw.length, true);
    cv.setUint16(28, nameB.length, true);
    cv.setUint32(42, offset, true);
    cen.set(nameB, 46);
    dir.push(cen);

    offset += local.length + body.length;
  }
  const dirSize = dir.reduce((n, d) => n + d.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true); ev.setUint16(10, files.length, true);
  ev.setUint32(12, dirSize, true); ev.setUint32(16, offset, true);

  const total = [...parts, ...dir, end];
  const size = total.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(size);
  let o = 0;
  for (const p of total) { out.set(p, o); o += p.length; }
  return out;
}

/* Lecture : on parcourt le répertoire central, seul endroit fiable
   (les en-têtes locaux peuvent renvoyer à un descripteur différé). */
async function zipRead(buffer) {
  const b = new Uint8Array(buffer), v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  let end = -1;
  for (let i = b.length - 22; i >= 0 && i > b.length - 66000; i--) {
    if (v.getUint32(i, true) === 0x06054b50) { end = i; break; }
  }
  if (end < 0) throw new Error('Ce fichier n’est pas un classeur Excel (.xlsx).');
  const count = v.getUint16(end + 10, true);
  let p = v.getUint32(end + 16, true);
  const out = new Map();
  for (let i = 0; i < count; i++) {
    if (v.getUint32(p, true) !== 0x02014b50) break;
    const method = v.getUint16(p + 10, true);
    const csize = v.getUint32(p + 20, true);
    const nameLen = v.getUint16(p + 28, true);
    const extraLen = v.getUint16(p + 30, true);
    const commLen = v.getUint16(p + 32, true);
    const lho = v.getUint32(p + 42, true);
    const name = TD.decode(b.subarray(p + 46, p + 46 + nameLen));
    // position réelle des données : après l'en-tête local, dont les
    // longueurs de nom et d'extra peuvent différer de celles du répertoire
    const lNameLen = v.getUint16(lho + 26, true), lExtraLen = v.getUint16(lho + 28, true);
    const start = lho + 30 + lNameLen + lExtraLen;
    const raw = b.subarray(start, start + csize);
    out.set(name, method === 0 ? raw : await inflateRaw(raw));
    p += 46 + nameLen + extraLen + commLen;
  }
  return out;
}

/* ---------------- XML ---------------- */
const X_ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
function xesc(s) {
  // on retire les caractères de contrôle interdits en XML 1.0 (sauf \t \n \r)
  return String(s).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .replace(/[&<>"']/g, c => X_ESC[c]);
}
function xunesc(s) {
  return String(s)
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/_x000D_/g, '');           // retour chariot encodé par Excel
}

/* ---------------- feuilles ---------------- */
const A1 = n => {           // 0 → A, 25 → Z, 26 → AA
  let s = '';
  n = n + 1;
  while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = (n - r - 1) / 26; }
  return s;
};
const colOf = ref => {      // "BC12" → 54
  let n = 0;
  for (const ch of ref) {
    const c = ch.charCodeAt(0);
    if (c < 65 || c > 90) break;
    n = n * 26 + (c - 64);
  }
  return n - 1;
};

/* Chaque cellule est écrite en chaîne littérale (inlineStr) ou en nombre.
   On évite la table de chaînes partagées : plus simple, et le gain de
   taille serait marginal pour quelques centaines de lignes. */
function sheetXml(rows, opt = {}) {
  const widths = opt.widths || [];
  const cols = widths.length
    ? `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join('')}</cols>`
    : '';
  const freeze = opt.freeze
    ? `<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>`
    : '';
  let body = '';
  rows.forEach((row, r) => {
    let cells = '';
    row.forEach((val, c) => {
      if (val === null || val === undefined || val === '') return;
      const ref = A1(c) + (r + 1);
      const style = r === 0 ? ' s="1"' : ' s="2"';
      if (typeof val === 'number' && isFinite(val)) cells += `<c r="${ref}"${style}><v>${val}</v></c>`;
      else cells += `<c r="${ref}"${style} t="inlineStr"><is><t xml:space="preserve">${xesc(val)}</t></is></c>`;
    });
    body += `<row r="${r + 1}">${cells}</row>`;
  });
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${freeze}${cols}<sheetData>${body}</sheetData></worksheet>`;
}

function parseSheet(xml, shared) {
  const rows = [];
  const rowRe = /<row[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>|<row[^>]*\/>/g;
  const cellRe = /<c\s([^>]*?)\/>|<c\s([^>]*?)>([\s\S]*?)<\/c>/g;
  let rm;
  while ((rm = rowRe.exec(xml))) {
    if (rm[1] === undefined) continue;
    const r = +rm[1] - 1, inner = rm[2] || '';
    const row = [];
    let cm;
    cellRe.lastIndex = 0;
    while ((cm = cellRe.exec(inner))) {
      const attrs = cm[1] || cm[2] || '', content = cm[3] || '';
      const ref = (attrs.match(/r="([A-Z]+\d+)"/) || [, 'A1'])[1];
      const type = (attrs.match(/t="([^"]+)"/) || [, 'n'])[1];
      const c = colOf(ref);
      let val = '';
      if (type === 's') {
        const i = +(content.match(/<v>([\s\S]*?)<\/v>/) || [, '-1'])[1];
        val = shared[i] !== undefined ? shared[i] : '';
      } else if (type === 'inlineStr') {
        val = [...content.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(m => xunesc(m[1])).join('');
      } else if (type === 'str' || type === 'e') {
        val = xunesc((content.match(/<t>([\s\S]*?)<\/t>|<v>([\s\S]*?)<\/v>/) || [, '', ''])[1] || '');
      } else {
        const v = (content.match(/<v>([\s\S]*?)<\/v>/) || [, ''])[1];
        val = v === '' ? '' : (type === 'b' ? (v === '1' ? 'VRAI' : 'FAUX') : xunesc(v));
      }
      row[c] = typeof val === 'string' ? val.replace(/\r\n/g, '\n') : val;
    }
    for (let i = 0; i < row.length; i++) if (row[i] === undefined) row[i] = '';
    rows[r] = row;
  }
  for (let i = 0; i < rows.length; i++) if (!rows[i]) rows[i] = [];
  return rows;
}

function parseShared(xml) {
  if (!xml) return [];
  return [...xml.matchAll(/<si>([\s\S]*?)<\/si>/g)].map(m =>
    [...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map(t => xunesc(t[1])).join('')
  );
}

/* ---------------- classeur ---------------- */
const STYLES_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FF1B2536"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE8B04B"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="3">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;

/* sheets : [{ name, rows, widths?, freeze? }, …] */
async function xlsxWrite(sheets) {
  const files = [];
  files.push(['[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}
</Types>`]);
  files.push(['_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`]);
  files.push(['xl/workbook.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>${sheets.map((s, i) => `<sheet name="${xesc(s.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets>
</workbook>`]);
  files.push(['xl/_rels/workbook.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}
<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`]);
  files.push(['xl/styles.xml', STYLES_XML]);
  sheets.forEach((s, i) => files.push([`xl/worksheets/sheet${i + 1}.xml`, sheetXml(s.rows, s)]));
  return zipWrite(files);
}

/* renvoie { "Nom de feuille": [[cellule, …], …] } */
async function xlsxRead(buffer) {
  const zip = await zipRead(buffer);
  const dec = n => { const b = zip.get(n); return b ? TD.decode(b) : null; };
  const wb = dec('xl/workbook.xml');
  if (!wb) throw new Error('Classeur illisible : xl/workbook.xml manquant.');
  const rels = dec('xl/_rels/workbook.xml.rels') || '';
  const relMap = {};
  for (const m of rels.matchAll(/<Relationship([^>]*)\/>/g)) {
    const id = (m[1].match(/Id="([^"]+)"/) || [])[1];
    let tgt = (m[1].match(/Target="([^"]+)"/) || [])[1];
    if (!id || !tgt) continue;
    tgt = tgt.replace(/^\/?xl\//, '').replace(/^\.\//, '');
    relMap[id] = 'xl/' + tgt;
  }
  const shared = parseShared(dec('xl/sharedStrings.xml'));
  const out = {};
  const list = [...wb.matchAll(/<sheet\b([^>]*)\/>|<sheet\b([^>]*)>/g)];
  let n = 0;
  for (const m of list) {
    const a = m[1] || m[2] || '';
    const name = xunesc((a.match(/name="([^"]*)"/) || [, ''])[1]);
    const rid = (a.match(/r:id="([^"]+)"/) || [])[1];
    n++;
    const path = (rid && relMap[rid]) || `xl/worksheets/sheet${n}.xml`;
    const xml = dec(path);
    out[name] = xml ? parseSheet(xml, shared) : [];
  }
  return out;
}

/* ===== recipes-xlsx.js ===== */
/* ============================================================
   recipes-xlsx.js — passage des fiches au tableur et retour.

   Une ligne = une recette. Les deux langues sont obligatoires.
   Les ingrédients, eux, sont un lexique partagé par toutes les
   fiches : ils vivent dans leur propre feuille, où ils ne sont
   traduits qu'une fois. La colonne « ingrédients » d'une recette
   ne contient donc que des quantités et des noms français.
   ============================================================ */

const RX_SHEET = 'Recettes';
const RX_ING_SHEET = 'Ingrédients';
const RX_LIST_SHEET = 'Listes';
const RX_HELP_SHEET = 'Notice';

/* clé interne → intitulé affiché dans le tableur */
const RX_COLS = [
  ['id', 'identifiant'],
  ['continent', 'continent'],
  ['lat', 'latitude'],
  ['lon', 'longitude'],
  ['base', 'personnes'],
  ['prep', 'préparation (min)'],
  ['cook', 'cuisson (min)'],
  ['diff', 'difficulté'],
  ['tags', 'étiquettes'],
  ['n_fr', 'nom FR'], ['n_en', 'nom EN'],
  ['p_fr', 'lieu FR'], ['p_en', 'lieu EN'],
  ['d_fr', 'description FR'], ['d_en', 'description EN'],
  ['s_fr', 'étapes FR'], ['s_en', 'étapes EN'],
  ['ing', 'ingrédients'],
  ['wiki_fr', 'Wikipédia FR'], ['wiki_en', 'Wikipédia EN'],
  ['published', 'publiée'],
  ['art', 'illustration']
];
const RX_WIDTHS = [22, 10, 10, 10, 10, 14, 12, 11, 24,
  26, 26, 24, 24, 46, 46, 52, 52, 40, 20, 20, 10, 34];

/* ---------------- normalisation ---------------- */
const rxNorm = s => String(s == null ? '' : s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function rxSlug(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'fiche';
}
const rxNum = v => {
  if (typeof v === 'number') return v;
  const s = String(v == null ? '' : v).trim().replace(/\s/g, '').replace(',', '.');
  if (!s) return null;
  const n = Number(s);
  return isFinite(n) ? n : null;
};

/* ---------------- unités ---------------- */
/* libellés français reconnus à la lecture (singulier et pluriel) */
function rxUnitTable() {
  if (rxUnitTable._t) return rxUnitTable._t;
  const t = [];
  for (const u in UNITS) {
    const add = lab => { if (lab) t.push([rxNorm(lab), u]); };
    add(UNITS[u][0]);
    if (UNITS_PL[u]) add(UNITS_PL[u][0]);
    add(u);                       // le code lui-même reste accepté
  }
  t.sort((a, b) => b[0].length - a[0].length);   // « c a soupe » avant « c »
  return (rxUnitTable._t = t);
}

/* « 1200 g poisson de roche » → ['poisson de roche', 1200, 'g']

   Piège du français : beaucoup d'ingrédients commencent par un mot qui est
   aussi une unité — « feuilles de laurier », « filet de cabillaud »,
   « tranches de pain ». Deux garde-fous :
     • si le reste de la ligne est un ingrédient connu, on ne touche à rien ;
     • un mot suivi de « de / d' / du / des » appartient au nom, pas à l'unité.
   `isKnown` est facultatif : sans lexique, seule la seconde règle s'applique. */
function rxParseIngLine(line, isKnown) {
  let s = String(line).trim();
  if (!s) return null;
  // forme explicite « nom | quantité | unité », tolérée et sans ambiguïté
  if (s.includes('|')) {
    const [name, q, u] = s.split('|').map(x => x.trim());
    if (!name) return null;
    const unit = u ? (rxUnitTable().find(([lab]) => lab === rxNorm(u)) || [, u])[1] : '';
    return { name, qty: rxNum(q), unit: rxNum(q) == null ? '' : (unit || 'pc') };
  }
  const FRAC = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3 };
  const m = s.match(/^(\d+(?:[.,]\d+)?|[½¼¾⅓⅔])\s+([\s\S]*)$/);
  if (!m) return { name: s, qty: null, unit: '' };
  const qty = FRAC[m[1]] !== undefined ? FRAC[m[1]] : rxNum(m[1]);
  const rest = m[2].trim();
  if (isKnown && isKnown(rest)) return { name: rest, qty, unit: 'pc' };

  const nrest = ' ' + rxNorm(rest) + ' ';
  for (const [lab, code] of rxUnitTable()) {
    if (!nrest.startsWith(' ' + lab + ' ')) continue;
    const tail = rest.split(/\s+/).slice(lab.split(' ').length).join(' ').trim();
    if (!tail) break;                                  // « 2 tranches » seul : pas d'ingrédient
    if (/^(de|d’|d'|du|des|à|au|aux)\b/i.test(tail)) break;   // le mot fait partie du nom
    return { name: tail, qty, unit: code };
  }
  return { name: rest, qty, unit: 'pc' };
}

/* ['poisson de roche', 1200, 'g'] → « 1200 g poisson de roche » */
function rxFormatIng(triple, ingNames) {
  const [id, qty, unit] = triple;
  const name = (ingNames && ingNames[id]) || id;
  if (qty == null) return name;
  const nb = Math.round(qty * 100) / 100;
  if (!unit || unit === 'pc') return `${nb} ${name}`;
  const lab = (UNITS[unit] && UNITS[unit][0]) || unit;
  const pl = nb > 1.4 && UNITS_PL[unit] ? UNITS_PL[unit][0] : lab;
  return `${nb} ${pl} ${name}`.replace(/\s+/g, ' ');
}

/* ---------------- illustration ---------------- */
/* Une fiche importée n'a pas de dessin : on en compose un à partir de ses
   étiquettes. Déterministe, pour qu'un même plat garde toujours le sien. */
const RX_ART_BY_TAG = {
  soup: ['bowl', 'soup'], stew: ['pot', 'stew'], rice: ['bowl', 'rice'],
  noodles: ['bowl', 'noodle'], grill: ['board', 'grill'], sea: ['plate', 'fish'],
  sweet: ['plate', 'cake'], bread: ['board', 'flat'], drink: ['glass', 'drink'],
  fresh: ['bowl', 'salad'], raw: ['bowl', 'salad'], veg: ['bowl', 'salad'],
  bake: ['plate', 'pastry'], fry: ['plate', 'pastry'], legume: ['pot', 'stew'],
  fruit: ['bowl', 'salad'], cheese: ['board', 'flat'], street: ['board', 'roll']
};
const RX_PALETTES = [
  { bg: '#2a3550', food: ['#d97327', '#e8b04b', '#c9482c', '#efe0bb'], garnish: '#6fbf8f' },
  { bg: '#26485c', food: ['#c9482c', '#efc06a', '#8f3b2a', '#f2e6c8'], garnish: '#7fc79a' },
  { bg: '#3a2b3f', food: ['#b8552f', '#e0a83a', '#7a3326', '#f0e3c6'], garnish: '#8fc27a' },
  { bg: '#243b34', food: ['#e0913a', '#f2cd7c', '#a8532c', '#f6efdc'], garnish: '#5fb387' },
  { bg: '#2f2a45', food: ['#d9b13a', '#efd694', '#9c5a2c', '#f4ecd8'], garnish: '#6fbf8f' }
];
function rxAutoArt(id, tags) {
  let v = 'plate', style = 'other';
  for (const tg of tags || []) if (RX_ART_BY_TAG[tg]) { [v, style] = RX_ART_BY_TAG[tg]; break; }
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const p = RX_PALETTES[h % RX_PALETTES.length];
  return { v, style, bg: p.bg, plate: '#f4efe3', food: p.food.slice(), garnish: p.garnish };
}

/* ============================================================
   Export
   ============================================================ */
function rxDishRow(d, ingNames) {
  const steps = l => (d.s[l] || []).join('\n');
  return [
    d.id, d.c, d.lat, d.lon, d.base, d.prep, d.cook, d.diff,
    (d.tags || []).join(', '),
    d.n.fr || '', d.n.en || '',
    d.p.fr || '', d.p.en || '',
    d.d.fr || '', d.d.en || '',
    steps('fr'), steps('en'),
    (d.i || []).map(t => rxFormatIng(t, ingNames)).join('\n'),
    (WIKI[d.id] && WIKI[d.id][1]) || '', (WIKI[d.id] && WIKI[d.id][0]) || '',
    d._hidden ? 'non' : 'oui',
    JSON.stringify(d.art || {})
  ];
}

function rxBuildWorkbook(dishes, ing) {
  const ingNames = {};
  for (const id in ing) ingNames[id] = ing[id][0];

  const recettes = [RX_COLS.map(c => c[1]), ...dishes.map(d => rxDishRow(d, ingNames))];

  const ingRows = [['identifiant', 'français', 'anglais'],
  ...Object.keys(ing).sort().map(id => [id, ing[id][0], ing[id][1]])];

  const conts = { eu: 'Europe', as: 'Asie', af: 'Afrique', na: 'Amérique du Nord', sa: 'Amérique du Sud', oc: 'Océanie' };
  const listes = [['continent', 'libellé', '', 'difficulté', 'libellé', '', 'étiquette', 'libellé', '', 'unité', 'libellé']];
  const tagIds = Object.keys(TAGS), unitIds = Object.keys(UNITS);
  const contIds = Object.keys(conts), diffs = ['1', '2', '3'], diffLab = ['Facile', 'Moyen', 'Difficile'];
  const n = Math.max(tagIds.length, unitIds.length, contIds.length, 3);
  for (let i = 0; i < n; i++) {
    listes.push([
      contIds[i] || '', contIds[i] ? conts[contIds[i]] : '', '',
      diffs[i] || '', diffLab[i] || '', '',
      tagIds[i] || '', tagIds[i] ? TAGS[tagIds[i]][0] : '', '',
      unitIds[i] || '', unitIds[i] ? (UNITS[unitIds[i]][0] || '(à l’unité)') : ''
    ]);
  }

  return [
    { name: RX_HELP_SHEET, rows: rxHelpRows(), widths: [104] },
    { name: RX_SHEET, rows: recettes, widths: RX_WIDTHS, freeze: true },
    { name: RX_ING_SHEET, rows: ingRows, widths: [26, 34, 34], freeze: true },
    { name: RX_LIST_SHEET, rows: listes, widths: [14, 20, 3, 12, 14, 3, 16, 22, 3, 12, 18], freeze: true }
  ];
}

function rxHelpRows() {
  return [
    ['Un monde à table — modèle d’import / export'],
    [''],
    ['Comment ça marche'],
    ['La feuille « Recettes » contient une ligne par spécialité. Vous pouvez modifier les lignes existantes'],
    ['ou en ajouter à la suite. Le fichier se réimporte depuis le site, en mode administration,'],
    ['par le bouton « Importer ». Un aperçu vous montre ce qui sera ajouté ou remplacé avant d’écrire quoi que ce soit.'],
    [''],
    ['Les colonnes'],
    ['identifiant — laissez vide pour une nouvelle recette : il sera créé à partir du nom français.'],
    ['                Ne le modifiez jamais sur une ligne existante, c’est lui qui identifie la fiche.'],
    ['continent — un code parmi eu, as, af, na, sa, oc (voir la feuille « Listes »).'],
    ['latitude / longitude — en degrés décimaux. Exemple pour Marseille : 43.296 et 5.37.'],
    ['personnes — nombre de convives pour lequel les quantités sont indiquées.'],
    ['difficulté — 1 facile, 2 moyen, 3 difficile.'],
    ['étiquettes — codes séparés par des virgules, par exemple : sea, sunday (voir « Listes »).'],
    ['nom / lieu / description / étapes — les deux langues sont obligatoires (FR et EN).'],
    ['                Dans les étapes, une ligne par étape (Alt + Entrée dans Excel pour aller à la ligne).'],
    ['ingrédients — une ligne par ingrédient, sous la forme : quantité, unité, nom français.'],
    ['                Exemples :  1200 g poisson de roche   ·   4 gousses ail   ·   6 c. à soupe huile d’olive'],
    ['                Sans quantité, écrivez simplement le nom : sel'],
    ['                Un ingrédient inconnu du lexique sera créé ; complétez alors ses traductions'],
    ['                dans la feuille « Ingrédients ».'],
    ['Wikipédia FR / EN — titres exacts des articles, facultatifs (servent à retrouver une photo).'],
    ['publiée — oui ou non. « non » masque la fiche du site sans l’effacer.'],
    ['illustration — dessin de la fiche, généré automatiquement. Laissez tel quel.'],
    [''],
    ['Bon à savoir'],
    ['Une ligne dont l’identifiant existe déjà remplace la fiche : elle n’est jamais dupliquée.'],
    ['L’aperçu d’import vous laisse décocher, une par une, les fiches existantes que vous ne voulez pas écraser.'],
    ['Une ligne incomplète est signalée et ignorée : le reste du fichier s’importe quand même.']
  ];
}

/* ============================================================
   Import
   ============================================================ */
function rxHeaderMap(headerRow) {
  const map = {};
  (headerRow || []).forEach((h, i) => {
    const n = rxNorm(h);
    if (!n) return;
    for (const [key, label] of RX_COLS) if (rxNorm(label) === n || rxNorm(key) === n) map[key] = i;
  });
  return map;
}

/* lecture de la feuille des ingrédients : renvoie le lexique fourni par le fichier */
function rxReadIngSheet(rows) {
  const out = {};
  if (!rows || !rows.length) return out;
  const head = rows[0].map(rxNorm);
  const col = names => { for (const n of names) { const i = head.indexOf(n); if (i >= 0) return i; } return -1; };
  const ci = col(['identifiant', 'id']), cf = col(['francais', 'fr']), ce = col(['anglais', 'en']);
  if (cf < 0) return out;
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r] || [];
    const fr = String(row[cf] || '').trim();
    if (!fr) continue;
    const id = String((ci >= 0 && row[ci]) || '').trim() || rxSlug(fr).replace(/-/g, '_');
    out[id] = [fr, String((ce >= 0 && row[ce]) || '').trim() || fr];
  }
  return out;
}

/* Analyse complète du classeur. N'écrit rien : produit de quoi
   afficher un aperçu honnête avant toute modification. */
function rxParseWorkbook(sheets, existing, lexicon) {
  const rows = sheets[RX_SHEET] || sheets[Object.keys(sheets).find(k => rxNorm(k) === rxNorm(RX_SHEET))] || null;
  if (!rows || rows.length < 2) {
    return { error: `Le classeur ne contient pas de feuille « ${RX_SHEET}` + ' » remplie.' };
  }
  const map = rxHeaderMap(rows[0]);
  const missing = ['continent', 'lat', 'lon', 'n_fr'].filter(k => map[k] === undefined);
  if (missing.length) return { error: 'Colonnes introuvables dans la feuille « Recettes ». Repartez du fichier exporté par le site.' };

  const fileIng = rxReadIngSheet(sheets[RX_ING_SHEET] ||
    sheets[Object.keys(sheets).find(k => rxNorm(k) === rxNorm(RX_ING_SHEET))]);

  // index des noms français connus → identifiant du lexique
  const byName = {};
  const allIng = Object.assign({}, lexicon, fileIng);
  for (const id in allIng) byName[rxNorm(allIng[id][0])] = id;

  const known = new Set(Object.keys(existing));
  const seen = new Set();
  const out = [], newIng = {};

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r] || [];
    const cell = k => (map[k] === undefined ? '' : String(row[map[k]] == null ? '' : row[map[k]]).trim());
    if (!RX_COLS.some(([k]) => cell(k))) continue;      // ligne vide

    const rec = { line: r + 1, errors: [], warnings: [] };
    const nameFr = cell('n_fr');
    if (!nameFr) { rec.errors.push('nom FR manquant'); }

    rec.id = cell('id') || rxSlug(nameFr);
    if (seen.has(rec.id)) rec.errors.push('identifiant en double dans le fichier');
    seen.add(rec.id);
    rec.exists = known.has(rec.id);

    const c = rxNorm(cell('continent'));
    const CONT = { eu: 'eu', as: 'as', af: 'af', na: 'na', sa: 'sa', oc: 'oc', europe: 'eu', asie: 'as', asia: 'as', afrique: 'af', africa: 'af', 'amerique du nord': 'na', 'amerique du sud': 'sa', oceanie: 'oc' };
    rec.continent = CONT[c];
    if (!rec.continent) rec.errors.push('continent invalide');

    rec.lat = rxNum(cell('lat')); rec.lon = rxNum(cell('lon'));
    if (rec.lat == null || rec.lat < -90 || rec.lat > 90) rec.errors.push('latitude invalide');
    if (rec.lon == null || rec.lon < -180 || rec.lon > 180) rec.errors.push('longitude invalide');

    rec.base = Math.max(1, Math.round(rxNum(cell('base')) || 4));
    rec.prep = Math.max(0, Math.round(rxNum(cell('prep')) || 0));
    rec.cook = Math.max(0, Math.round(rxNum(cell('cook')) || 0));
    const df = Math.round(rxNum(cell('diff')) || 1);
    rec.diff = df >= 1 && df <= 3 ? df : 1;

    rec.tags = cell('tags').split(/[,;]/).map(s => rxNorm(s).replace(/ /g, '')).filter(Boolean)
      .map(s => TAGS[s] ? s : (Object.keys(TAGS).find(k => rxNorm(TAGS[k][0]) === rxNorm(s)) || null))
      .filter(Boolean).slice(0, 4);

    rec.texts = {};
    for (const l of LANGS) {
      const name = cell('n_' + l), place = cell('p_' + l),
        desc = cell('d_' + l), steps = cell('s_' + l).split('\n').map(s => s.trim()).filter(Boolean);
      if (!name || !place || !desc || !steps.length) {
        rec.errors.push('texte ' + l.toUpperCase() + ' incomplet');
      }
      rec.texts[l] = { name, place, description: desc, steps };
    }

    /* Le lexique contient des synonymes : « lait entier » existe sous
       deux identifiants. Pour ne pas réécrire silencieusement les
       références d'une fiche à chaque réimport, on regarde d'abord les
       ingrédients que cette fiche utilise déjà. */
    const prev = {};
    const old = existing[rec.id];
    if (old && old.i) for (const [iid] of old.i) {
      const nm = allIng[iid] && allIng[iid][0];
      if (nm) prev[rxNorm(nm)] = iid;
    }

    rec.ingredients = [];
    const isKnown = name => {
      const k = rxNorm(name);
      return prev[k] !== undefined || byName[k] !== undefined;
    };
    for (const line of cell('ing').split('\n')) {
      const p = rxParseIngLine(line, isKnown);
      if (!p || !p.name) continue;
      let key = rxNorm(p.name);
      let id = prev[key] || byName[key];
      if (!id && key.endsWith('s')) id = prev[key.slice(0, -1)] || byName[key.slice(0, -1)];   // pluriel toléré
      if (!id) {
        id = rxSlug(p.name).replace(/-/g, '_');
        byName[key] = id;
        newIng[id] = [p.name, p.name];
        rec.warnings.push('nouvel ingrédient : ' + p.name);
      }
      rec.ingredients.push([id, p.qty, p.qty == null ? '' : p.unit]);
    }
    if (!rec.ingredients.length) rec.errors.push('aucun ingrédient');

    const wfr = cell('wiki_fr'), wen = cell('wiki_en');
    rec.wiki = (wfr || wen) ? [wen || wfr, wfr || wen] : null;
    rec.published = rxNorm(cell('published')) !== 'non';

    let art = null;
    try { art = cell('art') ? JSON.parse(cell('art')) : null; } catch (e) { art = null; }
    rec.art = (art && art.style) ? art : rxAutoArt(rec.id, rec.tags);

    rec.ok = rec.errors.length === 0;
    out.push(rec);
  }

  // ingrédients réellement nouveaux (absents du lexique du site)
  const created = {};
  for (const id in newIng) if (!lexicon[id]) created[id] = newIng[id];
  for (const id in fileIng) {
    const cur = lexicon[id];
    if (!cur || cur.join('|') !== fileIng[id].join('|')) created[id] = fileIng[id];
  }

  return {
    records: out,
    newIngredients: created,
    counts: {
      total: out.length,
      nouvelles: out.filter(r => r.ok && !r.exists).length,
      existantes: out.filter(r => r.ok && r.exists).length,
      rejetees: out.filter(r => !r.ok).length
    }
  };
}

/* ===== admin-xlsx.js ===== */
/* ============================================================
   admin-xlsx.js — export et import du classeur, en mode
   administration uniquement.

   L'import ne modifie jamais la base sans un aperçu accepté :
   on montre d'abord ce qui sera ajouté, ce qui sera remplacé
   et ce qui est refusé, puis on écrit.
   ============================================================ */

function xlName(prefix) {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return `${prefix}-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}.xlsx`;
}

function downloadBytes(bytes, filename) {
  const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ---------------- export ---------------- */
async function exportXlsx() {
  // le classeur contient les deux langues : il faut donc les avoir toutes
  for (const l of LANGS) if (!LOADED[l]) await loadLang(l);
  const sheets = rxBuildWorkbook(DISHES, ING);
  const bytes = await xlsxWrite(sheets);
  downloadBytes(bytes, xlName('un-monde-a-table'));
  return { dishes: DISHES.length, ingredients: Object.keys(ING).length };
}

/* modèle vierge : mêmes colonnes, une seule ligne d'exemple */
async function exportTemplateXlsx() {
  for (const l of LANGS) if (!LOADED[l]) await loadLang(l);
  const model = DISHES.find(d => d.id === 'bouillabaisse') || DISHES[0];
  const sheets = rxBuildWorkbook(model ? [model] : [], ING);
  const bytes = await xlsxWrite(sheets);
  downloadBytes(bytes, xlName('un-monde-a-table-modele'));
}

/* ---------------- écriture en base ---------------- */
async function sbUpsert(table, rows, onConflict) {
  if (!rows.length) return;
  for (let i = 0; i < rows.length; i += 100) {
    const chunk = rows.slice(i, i + 100);
    const q = onConflict ? `?on_conflict=${onConflict}` : '';
    const r = await fetch(`${SB.url}/rest/v1/${table}${q}`, {
      method: 'POST',
      headers: { ...authHeaders(true), Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(chunk)
    });
    if (!r.ok) throw new Error(`${table} : écriture refusée (${r.status}) — ${(await r.text()).slice(0, 160)}`);
  }
}

async function applyImport(records, newIngredients, onProgress) {
  if (!IS_ADMIN) throw new Error('Connexion requise');
  if (!SB.ready) throw new Error('Base non configurée : l’import a besoin de Supabase.');
  const say = m => { if (onProgress) onProgress(m); };

  const ingRows = Object.entries(newIngredients).map(([id, v]) =>
    ({ id, fr: v[0], en: v[1] }));
  if (ingRows.length) { say(`Lexique : ${ingRows.length} ingrédient(s)…`); await sbUpsert('atlas_ingredients', ingRows, 'id'); }

  let rank = DISHES.reduce((m, d) => Math.max(m, d.rank || 0), 0);
  const dishRows = records.map(r => ({
    id: r.id, continent: r.continent, lat: r.lat, lon: r.lon,
    base: r.base, prep: r.prep, cook: r.cook, diff: r.diff,
    tags: r.tags, art: r.art, ingredients: r.ingredients,
    wiki: r.wiki, published: r.published,
    rank: r.exists ? (RANK[r.id] != null ? RANK[r.id] : ++rank) : ++rank
  }));
  say(`Fiches : ${dishRows.length}…`);
  await sbUpsert('atlas_dishes', dishRows, 'id');

  const textRows = [];
  for (const r of records) for (const l of LANGS) {
    const t = r.texts[l];
    textRows.push({ dish_id: r.id, lang: l, name: t.name, place: t.place, description: t.description, steps: t.steps });
  }
  say(`Textes : ${textRows.length} lignes…`);
  await sbUpsert('atlas_dish_texts', textRows, 'dish_id,lang');

  // mise à jour immédiate de l'affichage, sans attendre un rechargement
  for (const id in newIngredients) ING[id] = newIngredients[id];
  for (const r of records) {
    let d = DISHES.find(x => x.id === r.id);
    if (!d) { d = { id: r.id, n: {}, p: {}, d: {}, s: {} }; DISHES.push(d); }
    d.c = r.continent; d.lat = r.lat; d.lon = r.lon; d.base = r.base;
    d.prep = r.prep; d.cook = r.cook; d.diff = r.diff; d.tags = r.tags;
    d.art = r.art; d.i = r.ingredients;
    if (r.wiki) WIKI[r.id] = r.wiki;
    for (const l of LANGS) {
      d.n[l] = r.texts[l].name; d.p[l] = r.texts[l].place;
      d.d[l] = r.texts[l].description; d.s[l] = r.texts[l].steps;
    }
  }
  buildCities();
  refreshMarkers();
  return { fiches: records.length, ingredients: ingRows.length };
}

/* ---------------- aperçu ---------------- */
function openImportPreview(res) {
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  const rejets = res.records.filter(r => !r.ok);
  const conflits = res.records.filter(r => r.ok && r.exists);
  const nouvelles = res.records.filter(r => r.ok && !r.exists);
  const nbIng = Object.keys(res.newIngredients).length;

  wrap.innerHTML = `<div class="box wide impbox">
    <h3>Aperçu de l’import</h3>
    <p class="sub">Rien n’est encore enregistré. Vérifiez, puis validez.</p>
    <div class="impsum">
      <div><b>${nouvelles.length}</b><small>nouvelle(s)</small></div>
      <div><b>${conflits.length}</b><small>déjà existante(s)</small></div>
      <div><b>${rejets.length}</b><small>refusée(s)</small></div>
      <div><b>${nbIng}</b><small>ingrédient(s) créé(s)</small></div>
    </div>
    ${conflits.length ? `<h4>Fiches existantes — décochez celles à ne pas remplacer</h4>
      <div class="improw"><button type="button" class="ghost mini" id="impAll">Tout cocher</button>
        <button type="button" class="ghost mini" id="impNone">Tout décocher</button></div>
      <div class="implist">${conflits.map(r => `<label><input type="checkbox" checked data-id="${escAttr(r.id)}">
        <span><b>${esc(r.texts.fr.name || r.id)}</b><small>${escAttr(r.id)} · ligne ${r.line}</small></span></label>`).join('')}</div>` : ''}
    ${nouvelles.length ? `<h4>Nouvelles fiches</h4>
      <div class="implist plain">${nouvelles.map(r => `<div><b>${esc(r.texts.fr.name)}</b>
        <small>${esc(r.texts.fr.place)} · ligne ${r.line}</small></div>`).join('')}</div>` : ''}
    ${rejets.length ? `<h4>Lignes refusées</h4>
      <div class="implist plain bad">${rejets.map(r => `<div><b>ligne ${r.line}</b>
        <small>${esc(r.errors.join(' · '))}</small></div>`).join('')}</div>` : ''}
    ${nbIng ? `<h4>Ingrédients créés</h4>
      <p class="note">Ils prennent d’abord le nom français comme traduction anglaise. Pour les corriger,
      exportez le classeur et complétez la feuille « Ingrédients ».<br>
      ${Object.values(res.newIngredients).map(v => esc(v[0])).slice(0, 24).join(' · ')}${nbIng > 24 ? ' …' : ''}</p>` : ''}
    <p class="err" hidden></p>
    <div class="row">
      <button type="button" class="ghost" data-close>Annuler</button>
      <button type="button" id="impGo">Importer</button>
    </div>
  </div>`;
  document.body.appendChild(wrap);

  const close = () => wrap.remove();
  const err = wrap.querySelector('.err');
  wrap.querySelector('[data-close]').onclick = close;
  wrap.onclick = e => { if (e.target === wrap) close(); };
  const boxes = () => [...wrap.querySelectorAll('.implist input[type=checkbox]')];
  const all = wrap.querySelector('#impAll'), none = wrap.querySelector('#impNone');
  if (all) all.onclick = () => boxes().forEach(b => b.checked = true);
  if (none) none.onclick = () => boxes().forEach(b => b.checked = false);

  const go = wrap.querySelector('#impGo');
  go.onclick = async () => {
    const refused = new Set(boxes().filter(b => !b.checked).map(b => b.dataset.id));
    const keep = res.records.filter(r => r.ok && !refused.has(r.id));
    if (!keep.length) { err.textContent = 'Rien à importer : tout est décoché.'; err.hidden = false; return; }
    go.disabled = true;
    try {
      const done = await applyImport(keep, res.newIngredients, m => { go.textContent = m; });
      close();
      if (state.dish) renderDish(); else renderEmpty();
      flash(`${done.fiches} fiche(s) importée(s)`);
    } catch (ex) {
      err.textContent = ex.message; err.hidden = false;
      go.disabled = false; go.textContent = 'Importer';
    }
  };
}

async function chooseAndPreview(file) {
  const buf = await file.arrayBuffer();
  const sheets = await xlsxRead(buf);
  const existing = Object.fromEntries(DISHES.map(d => [d.id, d]));
  const res = rxParseWorkbook(sheets, existing, ING);
  if (res.error) { flash(res.error); return; }
  if (!res.records.length) { flash('Aucune recette trouvée dans ce fichier.'); return; }
  openImportPreview(res);
}

/* ---------------- boutons dans la barre d'administration ---------------- */
function xlsxBar(bar) {
  const box = document.createElement('span');
  box.className = 'xlsxtools';
  box.innerHTML = `<button id="xlOut" title="Télécharger toutes les fiches au format Excel">Exporter</button>
    <button id="xlTpl" title="Télécharger un modèle vierge avec une recette d’exemple">Modèle</button>
    <button id="xlIn" title="Importer un classeur Excel">Importer</button>
    <input type="file" id="xlFile" accept=".xlsx" hidden>`;
  bar.appendChild(box);

  const file = box.querySelector('#xlFile');
  const out = box.querySelector('#xlOut'), tpl = box.querySelector('#xlTpl');
  const run = async (btn, label, fn) => {
    const was = btn.textContent;
    btn.disabled = true; btn.textContent = label;
    try { await fn(); } catch (e) { flash(e.message || 'Échec'); }
    btn.disabled = false; btn.textContent = was;
  };
  out.onclick = () => run(out, 'Export…', async () => {
    const r = await exportXlsx();
    flash(`${r.dishes} fiches exportées`);
  });
  tpl.onclick = () => run(tpl, 'Modèle…', exportTemplateXlsx);
  box.querySelector('#xlIn').onclick = () => file.click();
  file.onchange = async () => {
    const f = file.files && file.files[0];
    file.value = '';
    if (!f) return;
    try { await chooseAndPreview(f); }
    catch (e) { flash(e.message || 'Fichier illisible'); }
  };
}

