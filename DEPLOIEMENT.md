# Mise en ligne

Ce dossier **est** le dépôt à envoyer sur GitHub. Sa racine contient
`public/`, `scripts/`, `src/`, `package.json` et `vercel.json`.

## Ce qui a changé, et pourquoi c'est important

`vercel.json` demande à Vercel de **reconstruire le site à chaque
déploiement** (`buildCommand: node scripts/build.mjs`). La construction
assemble le moteur à partir de `src/` — et non à partir du `public/assets/engine.js`
déjà présent, qui est écrasé.

Les archives précédentes ne contenaient pas `src/engine/` ni les fichiers
`src/*.js` du moteur. Vercel reconstruisait donc à partir de sources restées
dans le dépôt depuis une version antérieure, dont un `app.js` qui appelait
encore la couche Atlas retirée depuis. D'où le `ReferenceError: ATLAS`.

`scripts/build.mjs` refuse désormais de construire si l'une de ces sources
manque, avec la liste des fichiers absents, plutôt que d'assembler un moteur
dépareillé.

## Variables d'environnement Vercel

Sans elles, le site fonctionne mais perd la base : ni photos partagées,
ni administration, ni synchronisation.

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

À définir dans Vercel → Settings → Environment Variables, puis redéployer.
Le journal de construction affiche `config.js base connectée` quand elles
sont bien lues, `sans base (mode hors ligne)` sinon.

## Vérifier avant d'envoyer

    node scripts/build.mjs
    npx serve public

Le journal doit se terminer par la liste des fichiers produits. Toute
source manquante interrompt la construction avec un message explicite.

## Les fiches

Les 1883 fiches sont figées dans `public/data/`. Leurs sources (`d1.js`…`d58.js`,
`lexicon.js`, `wiki.js`) ne sont pas nécessaires au déploiement et vivent
sur votre machine. Si vous les placez dans un dossier `src/` **au niveau
au-dessus** de ce dépôt, la construction les régénère automatiquement.
