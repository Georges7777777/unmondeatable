-- ============================================================
--  Passage à deux langues — français et anglais
--
--  À exécuter une fois dans Supabase : SQL Editor → coller → Run.
--  À faire APRÈS avoir redéployé le site, jamais avant : tant que
--  l'ancienne version est en ligne, elle proposerait des langues
--  dont les textes auraient disparu.
--
--  L'opération est définitive. Si vous préférez garder une copie
--  des textes espagnols et portugais, exécutez d'abord la requête
--  de sauvegarde ci-dessous et téléchargez le résultat en CSV
--  (bouton « Download CSV » sous la table de résultats).
-- ============================================================

-- ---------- Sauvegarde facultative ----------
-- select * from public.atlas_dish_texts where lang in ('es','pt');
-- select id, es, pt from public.atlas_ingredients;

-- ---------- 1. Textes des fiches ----------
delete from public.atlas_dish_texts where lang in ('es', 'pt');

-- ---------- 2. Contrainte : seules deux langues sont désormais admises ----------
alter table public.atlas_dish_texts
  drop constraint if exists atlas_dish_texts_lang_check;
alter table public.atlas_dish_texts
  add constraint atlas_dish_texts_lang_check check (lang in ('fr', 'en'));

-- ---------- 3. Lexique des ingrédients ----------
alter table public.atlas_ingredients drop column if exists es;
alter table public.atlas_ingredients drop column if exists pt;

-- ---------- 4. Contrôle ----------
select lang, count(*) as fiches
from public.atlas_dish_texts
group by lang
order by lang;
-- Résultat attendu : deux lignes, « en » et « fr », au même nombre.
