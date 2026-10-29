# OutdoorKing — project map and recovery guide

Snapshot taken 2026-10-26 from `main` at `0d698e4` (PR #38). The project was built in Cursor between 2026-10-20 and 2026-10-25 and is now continued in Claude Code.

## What it is

A website and staff desk for private Himalayan journeys (Nepal, plus Tibet/Bhutan add-ons). Travelers browse trips, design a trip, and get a quote from staff. **No public prices** — prices only appear in a private quote.

## Where it lives

| Thing        | Location                                                                  |
| ------------ | ------------------------------------------------------------------------- |
| Code         | `github.com/bkaskd77-cmd/outdoorKing`, branch `main` (Vercel deploys it)  |
| Live site    | `https://outdoorking-seven.vercel.app` (Vercel project `outdoorking`)     |
| Staff admin  | `/admin` (login `/admin/login`, invite + passkey/magic link)              |
| Domain       | `outdoorking.com` owned, not yet pointed at the app; Resend not verified  |
| Database     | Neon Postgres 17 + pgvector, created through the Vercel integration       |
| Local folder | `C:\Users\bkask\OutdoorKing` (empty — see "Keep a copy on your PC" below) |

## Stack

- Turborepo + pnpm 12.14 monorepo, Node 24.11+, TypeScript strict
- `apps/web` — Next.js 16 (App Router) + Payload CMS 3.91 + next-intl (en, de, fr, zh-Hans)
- Drizzle ORM on Postgres (`app` schema), Better Auth for staff
- Upstash Redis (rate limit) + QStash (jobs), or Redis + BullMQ when self-hosted
- Cloudflare R2 for media (MinIO locally), Resend for email, Turnstile for forms
- Vercel AI SDK (concierge chat, content agents, AI writer), mocked with `AI_MOCK=1`
- `apps/intel` — Python 3.14 FastAPI service, internal only, HMAC-signed calls
- `apps/worker` — BullMQ worker for self-hosting
- CI: GitHub Actions (`ci`, `preview-checks`, `security`: gitleaks, CodeQL, OSV)

## Repository layout

```
apps/web          Next.js site + Payload admin + API routes
  src/app/(frontend)/[locale]   public pages: trips, regions, activities, peaks, permits,
                                guides, blog, purpose, design-my-trip, quotes/[token], pay,
                                account, partners/[token], desk (staff), legal pages
  src/app/(payload)            Payload admin at /admin and its API
  src/app/api                  auth, health, jobs/qstash, payments/webhook, ai, offline
  src/payload                  collections (trips, regions, peaks, permits, posts, faqs, media…)
                               and globals (site settings, company facts, nav, footer, policies)
  content/facts/*.json         53 trip fact files (the catalog seed)
  public/media                 hero/card/gallery images and video (see CREDITS.md)
  messages/*.json              translations
apps/intel        Python pricing/itinerary hints (staff-only)
apps/worker       BullMQ worker
packages/
  ai              model router, prompts, RAG, evals
  auth            Better Auth setup (staff domain + allowlist)
  config          brand name (packages/config/src/brand.ts), lint/ts configs
  content-agents  CLI that drafts content (drafts only)
  db              Drizzle schema + migrations (users, quotes, bookings, payments, leads, ops…)
  env             validated env vars
  intel-client    typed client for apps/intel
  jobs            job handlers (shared by QStash and BullMQ)
  payments        payment provider abstraction (mock / Nepal hosted page / wire)
  security        headers, CSP, rate limiting, PII encryption
  ui              design system components
infra/            docker compose (local), Coolify, Helm — self-host path
docs/adr/         8 architecture decisions
```

## Build history (phases, all merged into `main`)

0. Foundations — monorepo, auth, security headers, Docker, CI
1. Marketing site — trips, regions, cinematic media
2. Quote engine — design-my-trip wizard, staff quote desk, quote links
3. Payments + intel — deposit policy, mock/hosted payments, Python intel
4. Concierge — AI specialist chat with WhatsApp handoff
5. Admin — staff desk inside Payload (`/admin`, quotes first)
6. Self-host + PWA — worker, Coolify/Helm, offline trip info

Then (Oct 24–25): regions showcase, Travel with Purpose (5% promise), trip chooser fixes, admin re-skin, sign-out fix, admin forced to stay in a browser tab.

Open state: only `cursor/admin-sign-out-4200` is unmerged, and it is an older duplicate of the sign-out fix already merged in PR #36 — safe to ignore. All other `cursor/*` branches are merged.

## Run it locally

```bash
corepack enable            # pnpm 12.14
pnpm i
cp .env.example .env.local
pnpm infra:up              # Docker: Postgres, Redis, MinIO, Mailpit
pnpm db:migrate
pnpm --filter web payload migrate
pnpm dev                   # http://localhost:3000
```

## What is NOT in git (back these up yourself)

If Vercel or GitHub disappeared, the code survives in any clone. These do not:

1. **Production environment variables** (Vercel → Project `outdoorking` → Settings → Environment Variables). The names are listed in `.env.example`. The irreplaceable ones are `PAYLOAD_SECRET`, `BETTER_AUTH_SECRET`, `PII_KEK_*` and `PII_HMAC_KEY` — losing the PII keys makes encrypted customer data unreadable. Export with `vercel env pull .env.production.local --environment=production` and store the file somewhere private (password manager), **never in git**.
2. **Database contents** (quotes, bookings, staff, CMS content). Dump with `pg_dump "$DATABASE_URL_UNPOOLED" -Fc -f outdoorking.dump`.
3. **Uploaded media** in the R2 bucket (`R2_BUCKET_MEDIA`, `R2_BUCKET_PRIVATE`), if any were uploaded through the admin.
4. **Account access**: Vercel, Neon, Upstash, Cloudflare (domain + R2), Resend, Turnstile, AI providers.

## Keep a copy on your PC

In PowerShell (needs Git for Windows):

```powershell
cd C:\Users\bkask
git clone https://github.com/bkaskd77-cmd/outdoorKing.git OutdoorKing
cd OutdoorKing
git fetch --all
```

To refresh later: `git pull` inside that folder. If the folder already has files, clone elsewhere and copy the contents in.

Offline alternative: a `git bundle` file is a single-file copy of the whole history and every branch. Restore with `git clone outdoorKing.bundle OutdoorKing`.
