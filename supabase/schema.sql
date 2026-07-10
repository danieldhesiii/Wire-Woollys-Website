-- Wire & Woolly — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) to enable
-- persistent reviews + bookings. Until these exist / env vars are set, the app
-- falls back to a local file store so the demo still works.

-- ---------- Reviews ----------
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  dog         text,
  rating      int  not null check (rating between 1 and 5),
  body        text not null,
  approved    boolean not null default false,  -- held for moderation
  source      text not null default 'web',
  created_at  timestamptz not null default now()
);

-- ---------- Bookings ----------
create table if not exists public.bookings (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text,
  phone       text not null,
  dog_name    text not null,
  breed       text,
  service     text not null,
  date        date not null,
  time        text not null,
  notes       text,
  created_at  timestamptz not null default now()
);

-- ---------- Security ----------
-- The app talks to Supabase with the SERVICE ROLE key from server-only API
-- routes, which bypasses RLS. We still enable RLS so nothing is readable with
-- the public anon key. No anon policies are added on purpose.
alter table public.reviews  enable row level security;
alter table public.bookings enable row level security;

-- To moderate a review, in the Supabase dashboard set `approved = true`.
-- Approved reviews then appear in the site's carousel automatically.
