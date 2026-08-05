-- ============================================================
-- Cyber Portfolio — Supabase migration
-- Run this in your Supabase project's SQL Editor:
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tables
-- ------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  overview text not null,
  photo text,
  cv_url text,
  github text,
  linkedin text,
  email text
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image text,
  github text,
  demo text,
  tech_stack text[] not null default '{}',
  featured boolean not null default false
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  position text not null,
  start_date date not null,
  end_date date,
  description text not null,
  logo text
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text not null
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.skills enable row level security;
alter table public.contacts enable row level security;

-- Public read access (portfolio content is meant to be public)
create policy "Public can read profiles"
  on public.profiles for select
  using (true);

create policy "Public can read projects"
  on public.projects for select
  using (true);

create policy "Public can read experiences"
  on public.experiences for select
  using (true);

create policy "Public can read skills"
  on public.skills for select
  using (true);

-- Contacts: public can INSERT (submit the form) but never read others' messages
create policy "Public can submit a contact message"
  on public.contacts for insert
  with check (true);

-- No select/update/delete policies are created for `contacts`, `profiles`,
-- `projects`, `experiences`, or `skills` for the anon role — by default,
-- with RLS enabled and no matching policy, those operations are denied.
-- Manage/edit content using the Supabase Table Editor (as the project owner)
-- or a future authenticated admin dashboard.

-- ------------------------------------------------------------
-- Storage bucket
-- ------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- Public read for anything in the portfolio bucket
create policy "Public can read portfolio bucket"
  on storage.objects for select
  using (bucket_id = 'portfolio');

-- NOTE: uploads (insert/update/delete on storage.objects) are intentionally
-- left without a public policy — only the service_role key (used from a
-- trusted server context, e.g. an admin dashboard you build later) or the
-- Supabase Dashboard's Storage UI can upload files for now.

-- ------------------------------------------------------------
-- Seed data (optional — replace with your own content)
-- ------------------------------------------------------------

-- insert into public.profiles (name, title, overview, github, linkedin, email)
-- values (
--   'Your Name',
--   'Full Stack Developer',
--   'I build fast, accessible, and secure web applications.',
--   'https://github.com/yourusername',
--   'https://linkedin.com/in/yourusername',
--   'you@example.com'
-- );
