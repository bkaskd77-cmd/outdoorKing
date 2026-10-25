# OutdoorKing

Private Himalayan journeys. This repository is a Turborepo + pnpm monorepo. The public brand name lives in `packages/config/src/brand.ts` and can be changed in one place.

Phase 0 is foundations only: Next.js 16, Payload 3, Drizzle/Postgres, Better Auth staff login, security headers, Docker, CI, and a placeholder home page.

## Prerequisites

- Node.js 24.11+ (`nvm use`, see `.nvmrc`)
- pnpm 12.14.0 (`corepack enable`)
- Docker, for local Postgres / Redis / MinIO / Mailpit

## First run

```bash
pnpm i
cp .env.example .env.local
pnpm infra:up
pnpm db:migrate
pnpm --filter web payload migrate
pnpm dev
```

Then open:

- `http://localhost:3000` — placeholder home
- `http://localhost:3000/admin` — one staff login (invite + passkey). Content and quotes are sections inside this admin.
- `http://localhost:3000/desk` — redirects to the quotes section (`/admin/quotes`)
- `http://localhost:3000/_design` — design system (non-production)
- `http://localhost:3000/api/health` — liveness
- `http://localhost:3000/api/health/ready` — Postgres + Redis
- `http://localhost:3000/manifest.webmanifest` — PWA manifest
- `http://localhost:3000/partners/demo-partner-token` — partner portal lite

Invite a staff member:

```bash
pnpm --filter web invite you@outdoorking.com super_admin
```

Content-agent dry run (fixtures, drafts only):

```bash
AI_MOCK=1 pnpm agents run --type faq --slug what-is-tims --brief fixtures/tims.md
```

## Scripts

| Command                                      | What it does                                     |
| -------------------------------------------- | ------------------------------------------------ |
| `pnpm lint` / `typecheck` / `test` / `build` | Turbo across the workspace                       |
| `SKIP_ENV_VALIDATION=1 pnpm lint`            | Required when `.env.local` is missing            |
| `pnpm check:placeholders`                    | Fails **production** builds if `[[TBD]]` remains |
| `pnpm check:deps`                            | Layer rules (dependency-cruiser)                 |

## Self-hosting (Phase 6)

Vercel remains the default. Coolify and Helm files, the BullMQ worker, and the DNS+env cutover runbook live in [`infra/README.md`](infra/README.md). Set `QUEUE_DRIVER=bullmq` and `REDIS_URL` when you leave Vercel; job handlers stay in `@ok/jobs`.

The site is an installable PWA (`/manifest.webmanifest`) with an offline cache of published itineraries and static rescue contacts. Partner codes use `?ref=` and a lite portal at `/partners/<token>` — still no public prices.

## Vercel

The connected Vercel project (`outdoorking`, hostname `outdoorking-seven.vercel.app`) has **Root Directory unset** (repo root). `vercel.json` therefore declares a Vercel Service whose `root` is `apps/web`, with install from the workspace root.

- Node 24 (`.nvmrc` / `apps/web/.nvmrc`)
- Install from the **repository root**: `pnpm install --frozen-lockfile`
- Next app: `apps/web` (`payload generate:importmap && next build`)
- Output: Next.js default. `output: "standalone"` is Docker-only and is off when `VERCEL=1`
- `apps/web/vercel.json` covers a dashboard Root Directory of `apps/web`
- Production must track a branch that contains `apps/web` — empty `main` yields the platform `NOT_FOUND` 404
- Neon integration with preview branching
- Deployment Protection on Preview

## Architecture docs

Repo copies of ADRs live in `docs/adr`. The living spec is in the project Context store.
