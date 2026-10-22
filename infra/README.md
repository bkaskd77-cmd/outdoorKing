# OutdoorKing self-host cutover

Vercel stays the primary host until you choose otherwise. This tree is the portable path: the same `apps/web` image (`output: "standalone"`), the same job handlers in `@ok/jobs`, and Postgres / Redis / MinIO that already run from `infra/docker/compose.yml`.

The cutover is **DNS + environment variables**. No application rewrite.

## What stays the same

| On Vercel                         | On Coolify or Kubernetes                                                     |
| --------------------------------- | ---------------------------------------------------------------------------- |
| `apps/web` Next.js + Payload      | Same image, `output: "standalone"`                                           |
| Neon Postgres 17 + pgvector       | Any Postgres 17 + pgvector (`DATABASE_DRIVER=pg`)                            |
| Upstash Redis REST                | Redis 7 (`REDIS_URL`) plus the ioredis adapter in `@ok/security`             |
| QStash                            | BullMQ worker (`QUEUE_DRIVER=bullmq`) calling the same `processJob` handlers |
| Cloudflare R2                     | MinIO (S3 API) or keep R2                                                    |
| Resend                            | Resend, or Mailpit locally                                                   |
| Vercel Analytics / Speed Insights | Skipped automatically when `VERCEL` is unset                                 |

Health:

- `GET /api/health` — liveness
- `GET /api/health/ready` — Postgres + Redis (ioredis when `REDIS_URL` is set, otherwise Upstash REST)

## Rehearse locally

```bash
pnpm infra:up
cp .env.example .env.local
# set QUEUE_DRIVER=bullmq and REDIS_URL=redis://127.0.0.1:6379
pnpm db:migrate
pnpm --filter web payload migrate
pnpm --filter web build
pnpm --filter web start
pnpm --filter worker start
```

Coolify uses `infra/coolify/docker-compose.yml`. Helm uses `infra/k8s/helm/outdoorking`.

## Environment mapping (copy from Vercel, then change these)

Keep every secret you already set (`PAYLOAD_SECRET`, `BETTER_AUTH_SECRET`, `PII_*`, Resend, Turnstile, R2/MinIO, AI keys). Then:

| Variable                                 | Vercel                                        | Self-host                                |
| ---------------------------------------- | --------------------------------------------- | ---------------------------------------- |
| `QUEUE_DRIVER`                           | `qstash` (or omit for inline)                 | `bullmq`                                 |
| `REDIS_URL`                              | unset                                         | `redis://redis:6379`                     |
| `UPSTASH_REDIS_REST_*`                   | Upstash                                       | Optional; unused when `REDIS_URL` is set |
| `QSTASH_*`                               | Upstash QStash                                | Leave empty                              |
| `JOBS_CALLBACK_URL`                      | `https://www.outdoorking.com/api/jobs/qstash` | Unused on BullMQ                         |
| `DATABASE_URL` / `DATABASE_URL_UNPOOLED` | Neon                                          | Postgres 17 (or keep Neon)               |
| `DATABASE_DRIVER`                        | `neon`                                        | `pg` (or keep `neon`)                    |
| `BETTER_AUTH_URL`                        | `https://www.outdoorking.com`                 | Same public origin                       |
| `AUTH_RP_ID`                             | `outdoorking.com`                             | Same host used for passkeys              |
| `AUTH_TRUSTED_ORIGINS`                   | production origin                             | Same origin                              |
| `NEXT_PUBLIC_SITE_URL`                   | `https://www.outdoorking.com`                 | Same                                     |
| `R2_ENDPOINT`                            | Cloudflare R2                                 | MinIO `http://minio:9000` or keep R2     |

Do **not** change public routes, Payload collections, or quote behaviour as part of the move.

## DNS cutover (production)

1. Run the Coolify stack or Helm release in a staging hostname. Confirm `/api/health` and `/api/health/ready` return `ok`, magic-link login still works, and a Design-my-trip request still emails.
2. Point Cloudflare DNS:
   - `www` A/AAAA or CNAME to the Coolify/Kubernetes load balancer
   - apex redirect to `www` (already the production rule)
   - keep Cloudflare proxy/WAF in front
3. Leave Vercel Deployment Protection on the old project until the first quiet week is over. Do not delete the Vercel project on day one.
4. After DNS TTL expires, confirm:

```bash
curl -fsS https://www.outdoorking.com/api/health
curl -fsS https://www.outdoorking.com/api/health/ready
curl -fsS https://www.outdoorking.com/manifest.webmanifest
```

5. Only then pause the Vercel production deployment.

Rollback is the reverse DNS change. Environment files stay in Coolify/Kubernetes secrets.

## Images

CI already builds `apps/web/Dockerfile` on `main` and pushes to GHCR. Build the worker the same way:

```bash
docker build -f apps/web/Dockerfile -t ghcr.io/outdoorking/web:local .
docker build -f apps/worker/Dockerfile -t ghcr.io/outdoorking/worker:local .
```
