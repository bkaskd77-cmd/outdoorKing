# ADR-0003: Payload CMS 3, embedded in the Next.js app

- Status: Accepted · Date: 2026-10-20

## Context
We need a CMS for trips, regions, peaks, blog and FAQs that is TypeScript, self-hostable and free of lock-in. It should support drafts, versions, localization and live preview, and it should later become the full admin and CRM shell (Phase 5). AI content agents need a programmatic write API.

## Decision
- **Payload `3.91.0`** installed into `apps/web` (`@payloadcms/next`), using:
  - `@payloadcms/db-postgres` (node-postgres pool to Neon) with `schemaName: 'payload'`;
  - `@payloadcms/richtext-lexical`;
  - `@payloadcms/storage-s3` pointed at R2;
  - `@payloadcms/email-resend`, `@payloadcms/plugin-seo` and `@payloadcms/plugin-redirects`.
- Do **not** use `@payloadcms/db-vercel-postgres`. The `@vercel/postgres` driver is deprecated.
- All `@payloadcms/*` packages are pinned to the identical exact version.
- Collections have `versions: { drafts: { autosave: true } }`, `localization` (en default; de, fr, zh-Hans added in Phase 4) and field-level `access`.
- **Admin auth:** Payload's local strategy is disabled (`disableLocalStrategy: true`). A custom auth strategy reads the Better Auth session and maps roles (ADR-0005), so there is one identity system and staff need passkeys plus MFA.
- Content agents write through the **Local API** with an `aiAgent` service user that may only create and update `_status: 'draft'`. Publishing requires the `content_editor` role or higher.
- Migrations: `payload migrate:create` in PRs, and `payload migrate` in CI and release. `push` is local only.
- Payload v4 (beta as of 2026-10-19; requires Next 16.4) will be evaluated after it reaches GA, with codemods.

## Consequences
- \+ One deploy, typed Local API calls from RSC (no HTTP hop), and an admin UI we can extend with custom views (quote desk).
- − Payload's internal Drizzle version is separate from our app's `drizzle-orm`. We keep the schemas separate and never import Payload's Drizzle instance.
- − Admin bundles are large. They are served only under `/admin`, behind the auth gate.

## Alternatives rejected
Sanity/Contentful (SaaS lock-in, PII off-platform), Strapi (separate process, weaker TS), a custom admin (too slow to build).
