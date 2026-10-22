# ADR-0002: Next.js 16 App Router

- Status: Accepted · Date: 2026-10-20

## Context
A premium, SEO-critical marketing site (40+ trip pages, region guides, blog) needs excellent Core Web Vitals, streaming, i18n routing and rich motion and 3D. The same app hosts the trip designer, customer portal and Payload admin.

## Decision
- **Next.js `16.4.2`** (Active LTS) with App Router, React 19.3, Turbopack for dev and build, and TypeScript strict. **Minimum 16.4.1** because of the October 2026 critical advisories (RCE in `use cache` returning typed arrays; Image Optimizer SVG RCE through `sharp` < 0.35.5; Server Actions DoS).
- Rendering:
  - Public content pages are static/ISR with on-demand revalidation by tag from Payload `afterChange` hooks (`revalidateTag('trip:<slug>')`).
  - Personalised or authenticated surfaces are dynamic. **`cacheComponents` stays off** until Payload confirms full compatibility. Revisit it when moving to Payload v4.
- **Server Actions** for form mutations, always wrapped by `actionClient` in `packages/security`, which handles Zod parsing, auth, rate limiting, Turnstile and audit. **Route handlers** for webhooks, auth, AI streaming and jobs.
- `src/proxy.ts` (the Next 16 replacement for `middleware.ts`) handles locale negotiation (next-intl 4.14), the per-request CSP nonce, coarse IP rate limiting and the admin/portal auth gate (an optimistic cookie check only; real checks happen server-side).
- `output: 'standalone'` for Docker portability.
- Images: `next/image` with R2 as a remote pattern. SVG optimization is disabled (`dangerouslyAllowSVG: false`).

## Consequences
- \+ RSC keeps JS small. 3D (R3F) and MapLibre are client islands loaded with `next/dynamic` and `ssr:false`.
- \+ Native Vercel previews and ISR.
- − A fast release cadence. Renovate tracks the LTS line, and security patches are merged within 72 hours.
- − Caching semantics are subtle. Each route documents its strategy in a header comment.

## Alternatives rejected
Astro (weaker for the app parts), Remix/React Router 7 (no embedded Payload), Nuxt (non-React).
