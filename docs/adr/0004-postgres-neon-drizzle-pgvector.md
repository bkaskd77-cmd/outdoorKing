# ADR-0004: Postgres on Neon, Drizzle ORM, pgvector

- Status: Accepted · Date: 2026-10-20

## Context
We need relational integrity for quotes, bookings and payments; vector search for RAG; per-PR databases for previews; and a no-rewrite path to self-hosted Postgres.

## Decision
- **Neon Postgres 17.** One project and region close to the customer markets and Vercel functions: `aws-eu-central-1` (Frankfurt), which also helps the GDPR posture. Branch per PR (`preview/pr-<n>`) with a 7-day expiry.
- **Two schemas, one database:**
  - `payload`, owned by Payload migrations (ADR-0003);
  - `app`, owned by **Drizzle ORM `0.45.4` + drizzle-kit** (stable). `drizzle.config.ts` uses `schemaFilter: ['app']`.
  - `intel` is added in Phase 3 and owned by Alembic in `apps/intel`.
- Drizzle 1.0 is still an RC (`1.0.0-rc.4`/rc.5 snapshots). We adopt it only after GA, through `drizzle-kit up`.
- Drivers:
  - `@neondatabase/serverless` (WebSocket `Pool`) for app code on Vercel;
  - `pg` for Payload, local and self-hosted.
  - `packages/db/client.ts` selects the driver by `DATABASE_DRIVER=neon|pg`.
- Use the pooled connection string for runtime and the direct (unpooled) string for migrations.
- **pgvector** (`CREATE EXTENSION IF NOT EXISTS vector` in the first migration):
  - table `app.content_chunks` with `embedding vector(1536)` (OpenAI `text-embedding-3-small`; the dimension is fixed per model version);
  - an HNSW index (`vector_cosine_ops`);
  - a `tsvector` column for hybrid BM25-style search.
- IDs: UUIDv7 (`uuid` column with app-side `uuidv7()`), so they are time-orderable and non-guessable. Money is `numeric(12,2)` plus an ISO-4217 `currency`; floats are never used. Timestamps are `timestamptz`.
- Roles: `ok_app` (runtime DML on `app`, `payload`), `ok_migrator` (DDL), `ok_intel_ro` (SELECT on whitelisted `app` views), `ok_readonly` (analytics). Row Level Security on PII tables is enabled as defense in depth (Phase 3).

## Consequences
- \+ One database to back up. Previews get realistic data through seed scripts (never production PII).
- \+ Portable: plain Postgres 17 + pgvector anywhere.
- − Two migration tools. CI runs both against a fresh DB and fails on drift (`drizzle-kit check`, `payload migrate:status`).

## Alternatives rejected
Supabase (overlaps with Payload and Better Auth), Prisma (heavier, weaker SQL control), a dedicated vector DB (unnecessary at our scale, which is under 1M chunks).
