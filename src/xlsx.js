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
