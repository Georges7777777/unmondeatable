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
  // le classeur contient les quatre langues : il faut donc les avoir toutes
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
    ({ id, fr: v[0], en: v[1], es: v[2], pt: v[3] }));
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
      <p class="note">Ils prennent d’abord le nom français dans les quatre langues. Pour les traduire,
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
