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
- `http://localhost:3000/admin` — staff login (invite + passkey; first-user signup is disabled)
- `http://localhost:3000/_design` — design system (non-production)
- `http://localhost:3000/api/health` — liveness
- `http://localhost:3000/api/health/ready` — Postgres + Redis

Invite a staff member:

```bash
pnpm --filter web invite you@outdoorking.com super_admin
```

Content-agent dry run (fixtures, drafts only):

```bash
AI_MOCK=1 pnpm agents run --type faq --slug what-is-tims --brief packages/content-agents/fixtures/tims.md
```

## Scripts

| Command                                      | What it does                                     |
| -------------------------------------------- | ------------------------------------------------ |
| `pnpm lint` / `typecheck` / `test` / `build` | Turbo across the workspace                       |
| `SKIP_ENV_VALIDATION=1 pnpm lint`            | Required when `.env.local` is missing            |
| `pnpm check:placeholders`                    | Fails **production** builds if `[[TBD]]` remains |
| `pnpm check:deps`                            | Layer rules (dependency-cruiser)                 |

## Vercel

- Root directory: `apps/web`
- Install: `pnpm install --frozen-lockfile`
- Build: `cd ../.. && pnpm turbo run build:ci --filter=web`
- Node 24, region `fra1`
- Ignored Build Step: `npx turbo-ignore web`
- Neon integration with preview branching
- Deployment Protection on Preview

## Architecture docs

Repo copies of ADRs live in `docs/adr`. The living spec is in the project Context store.
