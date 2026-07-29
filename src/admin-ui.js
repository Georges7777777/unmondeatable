/* ============================================================
   admin-ui.js — barre d'administration et formulaire d'édition.
   Rien de tout cela n'est visible ni accessible aux visiteurs.
   ============================================================ */

function adminBar() {
  let bar = document.querySelector('.adminbar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'adminbar';
    document.body.appendChild(bar);
  }
  bar.innerHTML = IS_ADMIN
    ? `<span class="dot"></span><b>Mode administration</b>
       <span class="hintx">Ouvrez une fiche pour la modifier</span>
       <button id="admOut">Se déconnecter</button>`
    : `<button id="admIn">Connexion</button>`;
  document.body.classList.toggle('is-admin', IS_ADMIN);
  const out = bar.querySelector('#admOut'), inb = bar.querySelector('#admIn');
  if (out) out.onclick = () => { adminLogout(); adminBar(); if (state.dish) renderDish(); flash('Déconnecté'); };
  if (inb) inb.onclick = openLogin;
}

function openLogin() {
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `<form class="box" autocomplete="on">
    <h3>Connexion</h3>
    <p class="sub">Réservé au propriétaire du site.</p>
    <label>E-mail<input type="email" name="email" required autocomplete="username"></label>
    <label>Mot de passe<input type="password" name="password" required autocomplete="current-password"></label>
    <p class="err" hidden></p>
    <div class="row">
      <button type="button" class="ghost" data-close>Annuler</button>
      <button type="submit">Se connecter</button>
    </div>
  </form>`;
  document.body.appendChild(wrap);
  const f = wrap.querySelector('form'), err = wrap.querySelector('.err');
  const close = () => wrap.remove();
  wrap.querySelector('[data-close]').onclick = close;
  wrap.onclick = e => { if (e.target === wrap) close(); };
  f.onsubmit = async e => {
    e.preventDefault();
    const btn = f.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Connexion…';
    try {
      await adminLogin(f.email.value.trim(), f.password.value);
      close(); adminBar();
      if (state.dish) renderDish();
      flash('Connecté — vous pouvez modifier les fiches');
    } catch (ex) {
      err.textContent = ex.message; err.hidden = false;
      btn.disabled = false; btn.textContent = 'Se connecter';
    }
  };
  setTimeout(() => f.email.focus(), 50);
}

/* ---------- formulaire d'édition d'une fiche ---------- */
function openEditor(d) {
  const lang = state.lang;
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `<form class="box wide">
    <h3>Modifier la fiche</h3>
    <p class="sub">Langue : <b>${lang.toUpperCase()}</b> — chaque langue se modifie séparément.</p>
    <label>Nom du plat<input name="name" value="${escAttr(d.n[lang] || '')}" required></label>
    <label>Lieu<input name="place" value="${escAttr(d.p[lang] || '')}" required></label>
    <label>Description<textarea name="description" rows="4" required>${esc(d.d[lang] || '')}</textarea></label>
    <label>Étapes (une par ligne)<textarea name="steps" rows="7" required>${esc((d.s[lang] || []).join('\n'))}</textarea></label>
    <div class="grid4">
      <label>Personnes<input name="base" type="number" min="1" max="50" value="${d.base}"></label>
      <label>Préparation (min)<input name="prep" type="number" min="0" value="${d.prep}"></label>
      <label>Cuisson (min)<input name="cook" type="number" min="0" value="${d.cook}"></label>
      <label>Difficulté<select name="diff">
        ${[1, 2, 3].map(n => `<option value="${n}"${d.diff === n ? ' selected' : ''}>${t('diffs')[n - 1]}</option>`).join('')}
      </select></label>
    </div>
    <p class="err" hidden></p>
    <div class="row">
      <button type="button" class="ghost" data-close>Annuler</button>
      <button type="submit">Enregistrer</button>
    </div>
  </form>`;
  document.body.appendChild(wrap);
  const f = wrap.querySelector('form'), err = wrap.querySelector('.err');
  const close = () => wrap.remove();
  wrap.querySelector('[data-close]').onclick = close;
  wrap.onclick = e => { if (e.target === wrap) close(); };
  f.onsubmit = async e => {
    e.preventDefault();
    const btn = f.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = 'Enregistrement…';
    // NB : on passe par f.elements — sur un formulaire, « f.name » renvoie
    // l'attribut name du formulaire lui-même, pas le champ qui porte ce nom.
    const el = f.elements;
    try {
      const steps = el.steps.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (steps.length < 1) throw new Error('Indiquez au moins une étape');
      await saveDishText(d.id, lang, {
        name: el.name.value.trim(), place: el.place.value.trim(),
        description: el.description.value.trim(), steps
      });
      await saveDishFacts(d.id, {
        base: +el.base.value, prep: +el.prep.value, cook: +el.cook.value, diff: +el.diff.value
      });
      close();
      state.servings = d.base;
      renderDish(); refreshMarkers();
      flash('Fiche enregistrée');
    } catch (ex) {
      err.textContent = ex.message; err.hidden = false;
      btn.disabled = false; btn.textContent = 'Enregistrer';
    }
  };
}

const escAttr = s => String(s).replace(/"/g, '&quot;').replace(/</g, '&lt;');
