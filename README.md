# Cyber Portfolio

Cyberpunk-themed developer portfolio. Next.js 15 (App Router) + TypeScript +
TailwindCSS + Framer Motion, backed by Supabase (Postgres + Storage + RLS).

## 1. Install dependencies

```bash
npm install
```

## 2. Environment variables

`.env.local` is already filled in with your project's URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=https://vmmorthjdohoawgzopew.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
These are safe to ship to the browser — the anon key only ever does what
Row Level Security allows.

⚠️ **You shared your `service_role` key in chat while building this.**
It is not used anywhere in this codebase, but because it was pasted into a
conversation, treat it as compromised: go to
**Supabase Dashboard → Settings → API → service_role → Reset** and generate
a new one before this project goes anywhere near production.

## 3. Set up the database

Open **Supabase Dashboard → SQL Editor → New query**, paste the contents of
[`supabase/migration.sql`](./supabase/migration.sql), and run it. This creates:

- `profiles`, `projects`, `experiences`, `skills`, `contacts` tables
- Row Level Security policies (public read on content tables, public insert
  on `contacts` only)
- The `portfolio` storage bucket, public-read

Then add your own row to `profiles` (there's a commented example insert
at the bottom of the migration file), plus whatever `projects`, `skills`,
and `experiences` you want to show — either via more SQL inserts or the
Table Editor UI.

## 4. Upload images

In **Storage → portfolio**, create folders `profile/`, `projects/`,
`logos/`, `resume/` and upload your photo, project thumbnails, company
logos, and CV. Copy each file's public URL into the matching column
(`photo`, `image`, `logo`, `cv_url`).

## 5. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 6. Deploy

Push to GitHub, then import the repo in Vercel. Add the same two
`NEXT_PUBLIC_SUPABASE_*` env vars in Vercel's project settings.

## Project structure

```
src/
  app/            # routes, layout, metadata (robots.ts, sitemap.ts)
  components/
    ui/           # Button, Card, SectionHeading — generic building blocks
    layout/       # Navbar, Footer
    animations/   # AnimatedBackground, ElectricLines, GlowParticles, MouseGlow, ScanLines
    sections/     # Hero, Overview, SkillGrid, ProjectGrid, ExperienceTimeline, ContactForm
  hooks/          # client-side hooks (useMousePosition)
  services/       # the ONLY layer that talks to Supabase
  lib/            # supabase client
  types/          # domain types + generated-style database types
  constants/      # site-wide constants (nav links, etc.)
  utils/          # cn() class merge helper
supabase/
  migration.sql   # run this in the Supabase SQL editor
```

Data flow: **UI → Sections → Services → Supabase → Postgres**. Components
never import `supabase` directly — they call a function from `services/`.
