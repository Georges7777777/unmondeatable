/* ============================================================
   fichiers-donnees.mjs — la liste des fichiers de fiches.

   Elle était recopiée en dur dans trois scripts (« i <= 58 »).
   Ajouter un fichier obligeait donc à corriger les trois, et en
   oublier un revenait à publier un atlas amputé sans que rien ne
   le signale. On les découvre désormais, dans l'ordre numérique :
   c'est cet ordre qui décide quelle fiche l'emporte lorsque deux
   points se superposent sur la même ville.
   ============================================================ */
import fs from 'node:fs';

export function fichiersDonnees(dossier) {
  return fs.readdirSync(dossier)
    .filter(f => /^d\d+\.js$/.test(f))
    .sort((a, b) => parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10));
}
