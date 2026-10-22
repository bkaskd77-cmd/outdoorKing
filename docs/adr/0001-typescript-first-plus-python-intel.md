# ADR-0001: TypeScript-first core plus a Python intelligence service

- Status: Accepted · Date: 2026-10-20

## Context
Most of the product is UI, SEO, CMS, auth, quote workflow and LLM orchestration. AI coding agents are most productive in a single strictly-typed TypeScript codebase with shared types end to end. Later workloads need the Python ecosystem: pricing suggestions, recommendations, demand forecasting and analytics (pandas/polars, scikit-learn, statsmodels, LightGBM).

## Decision
- A TypeScript monorepo (Turborepo 2.11, pnpm 12, Node 24 LTS, `strict: true`, `noUncheckedIndexedAccess`) for everything user-facing, including LLM orchestration (`packages/ai`).
- A Python 3.14 + FastAPI 0.156 service, `apps/intel`, introduced in **Phase 3**. In Phase 0 it is only a placeholder README.
- The integration contract is `apps/intel/openapi.json`, committed to the repo. `packages/intel-client` is generated with `openapi-typescript` and `openapi-fetch`. CI fails if the contract drifts.
- Auth between services: an HMAC-SHA256 signed request (`X-OK-Signature`, `X-OK-Timestamp`, 5-minute skew window), plus network isolation (a private network when self-hosted). The service is never exposed publicly.
- The intel service has **read-only** DB access through a dedicated role on the `app` schema. It writes only to `intel.*` tables.

## Consequences
- \+ One language for 90% of the code. Shared Zod types; one CI pipeline for TS.
- \+ ML can grow without contaminating the web runtime.
- − Two toolchains (uv/ruff/mypy/pytest alongside pnpm). This is mitigated by deferring Python to Phase 3.
- − Cross-service latency. Intel calls are advisory and never on the critical path of a page render, and they time out at 3 s with a fallback.

## Alternatives rejected
- Python-first (Django/FastAPI + separate React SPA): weaker SEO/RSC story and two front-end stacks.
- An all-TS ML stack: the ecosystem is too immature for forecasting and recsys.
