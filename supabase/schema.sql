-- ============================================================
--  Un monde à table — schéma de base
--  À exécuter une fois dans Supabase : SQL Editor → coller → Run
--
--  Conçu pour cohabiter sans risque avec une autre application
--  dans le même projet Supabase :
--
--   • toutes les tables sont préfixées « atlas_ » : aucun conflit
--     possible avec des tables existantes (dishes, ingredients…) ;
--   • l'écriture est réservée à UNE adresse e-mail précise, et non
--     à « tout compte connecté » : les comptes de l'autre
--     application ne peuvent donc rien modifier ici.
--
--  ⚠️ Remplacez l'adresse ci-dessous si vous utilisez un autre
--     e-mail que contact@unmondeatable.fr (2 endroits à changer :
--     la fonction est_proprietaire, rien d'autre).
-- ============================================================

-- ---------- 0. Qui a le droit d'écrire ? ----------
create or replace function public.atlas_est_proprietaire()
returns boolean language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'contact@unmondeatable.fr'
$$;

-- ---------- 1. Ingrédients (lexique multilingue) ----------
create table if not exists public.atlas_ingredients (
  id   text primary key,
  fr   text not null,
  en   text not null
);

-- ---------- 2. Fiches : partie non textuelle ----------
create table if not exists public.atlas_dishes (
  id          text primary key,
  continent   text not null check (continent in ('eu','as','af','na','sa','oc')),
  lat         double precision not null check (lat between -90 and 90),
  lon         double precision not null check (lon between -180 and 180),
  base        integer not null default 4 check (base > 0),
  prep        integer not null default 0 check (prep >= 0),
  cook        integer not null default 0 check (cook >= 0),
  diff        integer not null default 1 check (diff between 1 and 3),
  tags        text[]  not null default '{}',
  art         jsonb   not null default '{}'::jsonb,
  ingredients jsonb   not null default '[]'::jsonb,  -- [[id, qty, unité], …]
  wiki        jsonb,                                  -- [titre EN, titre FR]
  rank        integer not null default 0,             -- ordre de représentativité
  published   boolean not null default true,
  updated_at  timestamptz not null default now()
);
create index if not exists atlas_dishes_updated_idx on public.atlas_dishes (updated_at);

-- ---------- 3. Textes, une ligne par fiche et par langue ----------
create table if not exists public.atlas_dish_texts (
  dish_id     text not null references public.atlas_dishes(id) on delete cascade,
  lang        text not null check (lang in ('fr','en')),
  name        text not null,
  place       text not null,
  description text not null,
  steps       text[] not null default '{}',
  updated_at  timestamptz not null default now(),
  primary key (dish_id, lang)
);
create index if not exists atlas_dish_texts_updated_idx on public.atlas_dish_texts (updated_at);

-- ---------- 4. Photos (une par fiche, servie à tous les visiteurs) ----------
create table if not exists public.atlas_dish_photos (
  dish_id    text primary key references public.atlas_dishes(id) on delete cascade,
  path       text not null,          -- chemin dans le bucket « atlas-photos »
  credit     text,                   -- auteur / mention à afficher
  updated_at timestamptz not null default now()
);
create index if not exists atlas_dish_photos_updated_idx on public.atlas_dish_photos (updated_at);

-- ---------- 5. Horodatage automatique ----------
create or replace function public.atlas_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists atlas_dishes_touch on public.atlas_dishes;
create trigger atlas_dishes_touch before update on public.atlas_dishes
  for each row execute function public.atlas_touch_updated_at();

drop trigger if exists atlas_dish_texts_touch on public.atlas_dish_texts;
create trigger atlas_dish_texts_touch before update on public.atlas_dish_texts
  for each row execute function public.atlas_touch_updated_at();

drop trigger if exists atlas_dish_photos_touch on public.atlas_dish_photos;
create trigger atlas_dish_photos_touch before update on public.atlas_dish_photos
  for each row execute function public.atlas_touch_updated_at();

-- ============================================================
--  Sécurité (Row Level Security)
--  Lecture : tout le monde. Écriture : vous seul.
-- ============================================================
alter table public.atlas_ingredients  enable row level security;
alter table public.atlas_dishes       enable row level security;
alter table public.atlas_dish_texts   enable row level security;
alter table public.atlas_dish_photos  enable row level security;

drop policy if exists "atlas lecture publique" on public.atlas_ingredients;
create policy "atlas lecture publique" on public.atlas_ingredients for select using (true);
drop policy if exists "atlas lecture publique" on public.atlas_dishes;
create policy "atlas lecture publique" on public.atlas_dishes for select using (true);
drop policy if exists "atlas lecture publique" on public.atlas_dish_texts;
create policy "atlas lecture publique" on public.atlas_dish_texts for select using (true);
drop policy if exists "atlas lecture publique" on public.atlas_dish_photos;
create policy "atlas lecture publique" on public.atlas_dish_photos for select using (true);

drop policy if exists "atlas ecriture proprietaire" on public.atlas_ingredients;
create policy "atlas ecriture proprietaire" on public.atlas_ingredients for all
  to authenticated using (public.atlas_est_proprietaire()) with check (public.atlas_est_proprietaire());
drop policy if exists "atlas ecriture proprietaire" on public.atlas_dishes;
create policy "atlas ecriture proprietaire" on public.atlas_dishes for all
  to authenticated using (public.atlas_est_proprietaire()) with check (public.atlas_est_proprietaire());
drop policy if exists "atlas ecriture proprietaire" on public.atlas_dish_texts;
create policy "atlas ecriture proprietaire" on public.atlas_dish_texts for all
  to authenticated using (public.atlas_est_proprietaire()) with check (public.atlas_est_proprietaire());
drop policy if exists "atlas ecriture proprietaire" on public.atlas_dish_photos;
create policy "atlas ecriture proprietaire" on public.atlas_dish_photos for all
  to authenticated using (public.atlas_est_proprietaire()) with check (public.atlas_est_proprietaire());

-- ============================================================
--  Stockage des photos — bucket dédié « atlas-photos »
-- ============================================================
insert into storage.buckets (id, name, public)
values ('atlas-photos', 'atlas-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "atlas photos lecture" on storage.objects;
create policy "atlas photos lecture" on storage.objects for select
  using (bucket_id = 'atlas-photos');

drop policy if exists "atlas photos ecriture" on storage.objects;
create policy "atlas photos ecriture" on storage.objects for all
  to authenticated
  using (bucket_id = 'atlas-photos' and public.atlas_est_proprietaire())
  with check (bucket_id = 'atlas-photos' and public.atlas_est_proprietaire());

-- ============================================================
--  Vue : dernière modification, tous contenus confondus.
--  Le site l'interroge pour savoir s'il doit se rafraîchir.
-- ============================================================
-- security_invoker : la vue s'exécute avec les droits de celui qui
-- l'interroge, pas ceux de son créateur. Sans cela PostgreSQL lui donne
-- les privilèges du propriétaire et contourne les règles RLS des tables
-- qu'elle lit — ce que l'analyseur de Supabase signale à juste titre.
create or replace view public.atlas_content_version
  with (security_invoker = true) as
  select greatest(
    coalesce((select max(updated_at) from public.atlas_dishes), 'epoch'::timestamptz),
    coalesce((select max(updated_at) from public.atlas_dish_texts), 'epoch'::timestamptz),
    coalesce((select max(updated_at) from public.atlas_dish_photos), 'epoch'::timestamptz)
  ) as updated_at;

grant select on public.atlas_content_version to anon, authenticated;
