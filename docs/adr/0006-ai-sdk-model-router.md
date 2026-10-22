# ADR-0006: Vercel AI SDK 7 with a provider-agnostic model router

- Status: Accepted · Date: 2026-10-20

## Context
The AI trip designer, concierge and content agents need structured outputs, tool calling, streaming, fallback across providers, cost control and observability. Providers change quickly, so we must not hard-code one.

## Decision
- **`ai@^7.0.146`** (AI SDK 7, released 2026-06-25; ESM only, Node 22+) with `@ai-sdk/gateway` as the default transport in Vercel environments, and direct `@ai-sdk/anthropic`, `@ai-sdk/openai` and `@ai-sdk/google` providers when self-hosted or when the gateway is degraded.
- `packages/ai/router.ts` exposes **task-based model aliases**, not model IDs: `designer.plan`, `designer.narrative`, `concierge.chat`, `concierge.classify`, `content.write`, `content.factcheck`, `embed`, `judge`.
  - Each alias maps to an ordered list of `{provider, model, maxOutputTokens, timeoutMs, costCeilingUsd}`, defined in `models.config.ts`. The config is reviewed in PRs, and the concrete model IDs are set at implementation time from the current provider catalogs.
  - Fallback triggers on timeout, 429, 5xx or a schema-validation failure after one repair attempt. It never triggers on safety refusals; those are surfaced instead.
  - The `AI_MOCK=1` env var swaps in recorded fixtures, so CI and tests are deterministic.
- Structured output uses `generateObject`/`streamObject` with Zod 4 schemas (Standard Schema). Every LLM result is Zod-parsed again server-side before use.
- Telemetry: `@ai-sdk/otel` spans go to Sentry/OTel, with prompt and response bodies **redacted** of PII by default and sampled at 10% in prod for evals.
- Guardrails, RAG, rule engine and evals are specified in [ai-architecture.md](../ai-architecture.md).

## Consequences
- \+ A model swap is a config change. Gateway budgets and failover come for free on Vercel.
- − The SDK moves fast (patch releases are near-daily). We pin with a caret within v7 and run the eval suite on upgrade PRs.

## Alternatives rejected
LangChain.js (heavier abstractions, churn), direct provider SDKs only (no unified streaming, tools or fallback), a Python-hosted LLM layer (splits the stack; see ADR-0001).
