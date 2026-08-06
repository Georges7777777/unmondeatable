# Un monde à table — unmondeatable.fr

Atlas interactif de 978 spécialités culinaires, en français et en anglais.
Site public, consultable sur ordinateur et smartphone, avec une
base de données et un espace d'administration réservé.

---

## Ce qu'il vous faut

Trois comptes gratuits, une quinzaine de minutes :

| Service | À quoi il sert | Coût |
|---|---|---|
| [GitHub](https://github.com) | héberger le code | gratuit |
| [Supabase](https://supabase.com) | base de données + photos | gratuit (500 Mo) |
| [Vercel](https://vercel.com) | mise en ligne du site | gratuit |

---

## Étape 1 — Créer la base de données

1. Sur [supabase.com](https://supabase.com), **New project**.
   - Nom : `unmondeatable`
   - Mot de passe : notez-le quelque part
   - **Region : une région européenne** (`Europe (Ireland)`, `Frankfurt`,
     `Paris`…) — les mentions légales du site annoncent un stockage dans
     l'Union européenne. Si vous changez de région, pensez à corriger le
     paragraphe « Hébergement » de `public/mentions-legales.html` et la note
     « Où sont vos données ? » de `public/confidentialite.html`.
2. Une fois le projet créé, ouvrez **SQL Editor** (menu de gauche) → **New query**.
3. Copiez tout le contenu de `supabase/schema.sql`, collez, cliquez **Run**.
   Vous devez lire *Success*. Cela crée les tables, les sécurités et le dossier
   de stockage des photos.

### Récupérer vos clés

**Project Settings → API**, notez :

- **Project URL** → `https://xxxx.supabase.co`
- **anon public** → clé publique, lecture seule. Elle sera visible dans le site,
  c'est normal et sans danger : les règles de sécurité (RLS) interdisent toute
  écriture avec cette clé.
- **service_role** → clé toute-puissante. **Ne la publiez jamais**, ne la mettez
  jamais dans Vercel. Elle ne sert qu'à l'import initial depuis votre ordinateur.

---

## Étape 2 — Créer votre compte administrateur

Dans Supabase : **Authentication → Users → Add user → Create new user**.

- E-mail : `contact@unmondeatable.fr`
- Mot de passe : choisissez-en un solide
- Cochez **Auto Confirm User**

C'est ce couple e-mail / mot de passe qui vous permettra de modifier les fiches
et les photos depuis le site.

---

## Étape 3 — Charger les fiches

L'éditeur SQL de Supabase refuse les requêtes de plus d'environ 1 Mo. Le contenu
est donc découpé en trois fichiers, dans `supabase/` :

| Fichier | Contenu | Taille |
|---|---|---|
| `seed-1-socle.sql` | 978 fiches + 954 ingrédients | 292 Ko |
| `seed-2-textes-fr.sql` | textes français | 318 Ko |
| `seed-3-textes-en.sql` | textes anglais | 269 Ko |

Pour chacun : ouvrez-le dans un éditeur de texte, ⌘A puis ⌘C, et collez dans
Supabase → **SQL Editor** → **New query** → **Run**. Respectez l'ordre.

> **Le socle suffit.** Les deux fichiers de textes sont facultatifs : le site
> affiche déjà tous les textes depuis les données livrées avec lui. Ils ne
> servent qu'à disposer de l'intégralité du contenu en base, comme sauvegarde.
> Vous pourrez les charger plus tard.

> **Vous passez d'une version à quatre langues ?** Exécutez ensuite
> `supabase/cleanup-langues.sql`, qui supprime les textes espagnols et
> portugais devenus inutiles. À faire **après** avoir redéployé le site.

## Étape 4 — Publier le site

1. Créez un dépôt sur GitHub et poussez-y le contenu du dossier `site/` :

```bash
git init
git add .
git commit -m "Un monde à table"
git branch -M main
git remote add origin https://github.com/VOTRE-COMPTE/unmondeatable.git
git push -u origin main
```

> `.gitignore` empêche déjà d'envoyer `.env` : votre clé secrète reste chez vous.

2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, choisissez le
   dépôt. Vercel détecte la configuration tout seul.

3. Avant de valider, ouvrez **Environment Variables** et ajoutez :

| Nom | Valeur |
|---|---|
| `SUPABASE_URL` | votre Project URL |
| `SUPABASE_ANON_KEY` | votre clé **anon public** |

   N'ajoutez **pas** la clé `service_role`.

4. **Deploy**. Au bout d'une minute, votre site est en ligne à une adresse du
   type `unmondeatable.vercel.app`.

---

## Étape 5 — Brancher unmondeatable.fr (IONOS)

Le domaine est chez IONOS, le site chez Vercel. Il faut donc dire à IONOS où
pointer.

### ⚠️ À lire avant de commencer

**Ne transférez pas les serveurs de noms (nameservers) vers Vercel.** IONOS
héberge aussi votre messagerie `contact@unmondeatable.fr`. Basculer les
nameservers effacerait les enregistrements MX et **votre e-mail cesserait de
fonctionner**.

La bonne méthode : garder le DNS chez IONOS et n'y ajouter que deux
enregistrements. Vos MX restent intacts.

### Dans Vercel

**Settings → Domains → Add** → saisissez `unmondeatable.fr`, puis
**Add** à nouveau pour `www.unmondeatable.fr`.

Vercel affiche alors une fiche avec les valeurs exactes à recopier. **Utilisez
les valeurs affichées sur cette fiche**, pas celles d'un tutoriel : l'adresse IP
dépend du projet (les anciens projets reçoivent `76.76.21.21`, les plus récents
une adresse du parc anycast comme `216.198.79.1`).

### Dans IONOS

**Domaines & SSL → unmondeatable.fr → DNS**, puis ajoutez :

| Type | Nom / Hôte | Valeur | TTL |
|---|---|---|---|
| `A` | `@` (ou vide) | l'IP affichée par Vercel | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

S'il existe déjà un enregistrement `A` sur `@` (page de parking IONOS),
**modifiez-le** au lieu d'en créer un second.

### Ensuite

La propagation prend de quelques minutes à deux heures. Dans Vercel, le domaine
passe de *Invalid Configuration* à **Valid Configuration**, et le certificat
HTTPS est émis automatiquement (Let's Encrypt, gratuit, renouvelé tout seul).

Vérifiez enfin que `https://unmondeatable.fr` et `https://www.unmondeatable.fr`
mènent bien au site — Vercel redirige `www` vers le domaine principal par défaut.

### Contrôle de la messagerie

Après la propagation, envoyez-vous un message à `contact@unmondeatable.fr` pour
confirmer que la boîte fonctionne toujours. Si ce n'est pas le cas, c'est que les
enregistrements MX ont été touchés : rétablissez-les depuis l'espace IONOS
(**E-mail → paramètres du domaine**).

---

## Modifier le contenu une fois en ligne

1. Ouvrez votre site en ajoutant `?admin` à l'adresse :
   `https://unmondeatable.fr/?admin`
2. Cliquez **Connexion**, entrez vos identifiants de l'étape 2.
3. Une barre verte apparaît en bas : vous êtes en mode administration.
   - **Changer une photo** : ouvrez une fiche, survolez l'image, cliquez
     *Ajouter une photo*. Elle est redimensionnée, envoyée en base, et devient
     immédiatement visible par tous les visiteurs.
   - **Modifier un texte** : bouton *Modifier cette fiche*. Chaque langue
     s'édite séparément (basculez avec FR/EN avant d'ouvrir le
     formulaire).

Les modifications sont visibles par tout le monde **sans redéploiement** : le
site charge son instantané puis demande à la base ce qui a changé depuis.

> Les visiteurs ne voient jamais ces boutons et ne peuvent rien modifier :
> l'écriture est bloquée côté base pour toute personne non connectée.

### Ce que devient votre travail au prochain déploiement

Les fiches livrées avec le site sont fabriquées à partir des fichiers sources
(`src/d*.js`). Vos modifications faites en administration, elles, ne vivent que
dans la base. Pour qu'un nouveau déploiement ne les efface pas de l'affichage,
la construction commence par **replier la base dans l'instantané**
(`scripts/merge-db.mjs`) : textes réécrits, fiches importées, photos publiées
et lexique sont récupérés puis figés dans les fichiers publiés.

Cela suppose que `SUPABASE_URL` et `SUPABASE_ANON_KEY` soient renseignées dans
Vercel — ce sont les mêmes variables que celles de l'étape 4. Si la base est
injoignable au moment de la construction, le déploiement se poursuit sans
échouer et le site va chercher les photos à l'ouverture.

---

## Ajouter vos propres recettes par un fichier Excel

La barre d'administration porte trois boutons à droite.

| Bouton | Ce qu'il fait |
|---|---|
| **Exporter** | télécharge les 400 fiches dans un classeur `.xlsx` |
| **Modèle** | le même classeur avec une seule recette d'exemple, prêt à remplir |
| **Importer** | relit un classeur et propose un aperçu avant d'écrire |

### Remplir le classeur

La feuille **Recettes** contient une ligne par spécialité. Pour en ajouter une,
écrivez à la suite et **laissez la colonne `identifiant` vide** : elle sera
créée à partir du nom français. Les deux langues sont obligatoires.

Les ingrédients s'écrivent en français, **un par ligne**, sous la forme
*quantité, unité, nom* :

```
1200 g poissons de roche
4 gousses ail
6 c. à soupe huile d'olive
3 pommes de terre
sel
```

Sans quantité, écrivez simplement le nom. Sans unité, la quantité compte des
pièces. Les noms sont rapprochés du lexique de la feuille **Ingrédients** —
un ingrédient inconnu y est ajouté, avec son nom français dans les quatre
langues en attendant que vous le traduisiez.

La feuille **Listes** donne les valeurs acceptées pour le continent, la
difficulté, les étiquettes et les unités.

### Importer

Le bouton *Importer* n'écrit rien tout de suite : il affiche d'abord un
récapitulatif — nouvelles fiches, fiches déjà existantes, lignes refusées et
motif du refus, ingrédients qui seront créés.

Une ligne dont l'identifiant existe déjà **remplace** la fiche : il n'y a
jamais de doublon. Les fiches existantes apparaissent avec une case à cocher,
décochez celles que vous ne voulez pas écraser. Une ligne incomplète est
signalée et ignorée, sans empêcher le reste de s'importer.

> L'export puis le réimport des 400 fiches est vérifié automatiquement
> (`node scripts/test-xlsx.mjs`) : rien ne se perd et rien ne se duplique.

---

## Travailler en local

```bash
npm run dev      # construit puis sert le site sur http://localhost:3000
npm run build    # reconstruit seulement
npm run data     # régénère les données depuis les fiches sources
```

Tester que tout fonctionne :

```bash
cd public && python3 -m http.server 8099 &
node scripts/test-site.mjs     # données, fiches, langues, pages légales, admin
node scripts/test-ux.mjs       # gestes du globe, panneau, liste d'un lieu
node scripts/test-xlsx.mjs     # aller-retour Excel sur les fiches
node scripts/check-dishes.mjs  # cohérence des fiches sources (ingrédients, unités, langues)
node scripts/test-wiki.mjs     # deux plats ne partagent jamais la même photo
node scripts/test-photos.mjs   # les photos publiées survivent aux déploiements
node scripts/test-merge.mjs    # l'étape de construction qui replie la base
node scripts/test-admin.mjs    # photo et texte s'enregistrent, même pour une fiche neuve
node scripts/test-filters.mjs  # sans viande, sans porc, bœuf ou volaille, difficulté, temps
node scripts/test-boot.mjs     # un moteur incomplet le dit au lieu de tourner sans fin
node scripts/make-foodgroups.mjs # reclasse les ingrédients par famille après un ajout
node scripts/make-template.mjs un-monde-a-table-modele.xlsx
```

Les tests utilisent `jsdom` (`npm i jsdom`), et `test-xlsx.mjs` relit le
classeur avec `openpyxl` s'il est installé — un contrôle indépendant, par un
autre logiciel que celui qui l'a écrit.

---

## Comment c'est fait

```
site/
├── public/              ← ce qui est publié
│   ├── index.html          page principale
│   ├── mentions-legales.html
│   ├── confidentialite.html
│   ├── assets/             carte, moteur, styles (générés)
│   └── data/               instantané des 400 fiches
│       ├── core.json         géométrie, tags, ingrédients (53 Ko)
│       └── lang/xx.json      textes d'une langue (~90 Ko)
├── src/
│   ├── engine/          ← moteur : globe, carte, traductions, illustrations
│   └── *.js             ← code propre à la version web
├── scripts/             ← construction, import, tests
└── supabase/schema.sql  ← à exécuter une fois
```

> **Où changer le nom du site ?** Dans `src/engine/i18n.js` (clés `title1`,
> `title2` et `tagline`, dans les deux langues) et dans les balises `<title>` des
> pages HTML. `src/engine/` est la référence : c'est de là que part le build.

**Pourquoi c'est rapide sur mobile.** Les données sont livrées avec le site et
découpées par langue : un visiteur francophone télécharge 146 Ko au lieu des
446 Ko de l'ensemble. L'affichage ne dépend donc pas de la base ; celle-ci
n'est interrogée qu'ensuite, pour récupérer vos éventuelles modifications. Si
Supabase est indisponible, le site continue de fonctionner normalement.

**Sécurité.** Le site public n'embarque que la clé `anon`, restreinte à la
lecture par les règles RLS définies dans `schema.sql`. Toute écriture exige une
session ouverte avec votre mot de passe.

---

## Coûts

L'offre gratuite couvre très largement ce site : 500 Mo de base, 1 Go
d'images et 100 Go de trafic par mois chez Vercel. Un projet Supabase gratuit
est mis en pause après une semaine sans aucune requête ; une simple visite le
réveille, et cela n'affecte pas l'affichage du site puisque les données sont
servies en statique.

---

© 2026 Georges Viana — Made in France.
Photographies : Wikimedia Commons, sous leurs licences respectives.
Fond de carte : Natural Earth (domaine public).
