-- ============================================================
--  Correctif signalé par l'analyseur de sécurité Supabase :
--  « Security Definer View » sur public.atlas_content_version.
--
--  Par défaut, une vue PostgreSQL s'exécute avec les droits de
--  celui qui l'a créée. Elle lit alors les tables en contournant
--  les règles RLS, ce qui n'est pas ce que l'on veut.
--  security_invoker la fait s'exécuter avec les droits du
--  visiteur : le comportement du site ne change pas, mais la vue
--  cesse d'être un passe-droit.
--
--  À coller dans l'éditeur SQL de Supabase, puis Run.
-- ============================================================

create or replace view public.atlas_content_version
  with (security_invoker = true) as
  select greatest(
    coalesce((select max(updated_at) from public.atlas_dishes), 'epoch'::timestamptz),
    coalesce((select max(updated_at) from public.atlas_dish_texts), 'epoch'::timestamptz),
    coalesce((select max(updated_at) from public.atlas_dish_photos), 'epoch'::timestamptz)
  ) as updated_at;

grant select on public.atlas_content_version to anon, authenticated;

-- Vérification : doit renvoyer true
select c.relname, (c.reloptions @> array['security_invoker=true']) as corrige
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'atlas_content_version';
