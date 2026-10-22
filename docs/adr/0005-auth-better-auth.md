# ADR-0005: Authentication and authorization with Better Auth

- Status: Accepted · Date: 2026-10-20

## Context
Two populations: customers (low friction, from Phase 2) and staff (high privilege, from Phase 1 for the CMS). ASVS L2 requires MFA for privileged users, secure session management and rate-limited authentication. We want auth self-hosted in our own Postgres, with no per-MAU vendor.

## Decision
- **Better Auth `1.7.12`** with the Drizzle adapter (tables in the `app` schema: `user`, `session`, `account`, `verification`, `passkey`, `two_factor`), mounted at `/api/auth/[...all]`.
- Plugins:
  - `@better-auth/passkey` (WebAuthn, `rpID` = apex domain);
  - `twoFactor` (TOTP + backup codes);
  - `magicLink` (customers);
  - `admin` (ban, impersonate with audit);
  - `organization` is not used;
  - `haveIBeenPwned` password check.
- **Customers** (Phase 2): email magic link or passkey, with Google OAuth optional. Passwords are allowed but discouraged.
- **Staff:**
  - Passkey required, with TOTP as a recovery fallback.
  - Email domain allowlist (`@outdoorking.com`); no self sign-up, invite only.
  - Session max age is 12 h, with a 30-minute idle timeout for the `admin` role.
  - Fresh-session re-auth (< 10 minutes) for sensitive actions: refunds, PII export, role changes.
- **RBAC** in `packages/auth/rbac.ts`. Roles are `customer`, `content_editor`, `sales`, `ops`, `finance`, `admin`, `super_admin`, and the system principals `ai_agent` and `intel_service`. Permissions use `resource:action` strings (for example `quote:send` and `booking:refund`).
  - The single `can(user, permission, resource?)` function is used by Server Actions, route handlers and Payload `access` functions.
  - Resource ownership checks (customers see only their own records) live in the same function.
- Cookies: `__Host-` prefix, `Secure`, `HttpOnly`, `SameSite=Lax`. Better Auth's built-in CSRF origin check is enabled with `trustedOrigins` pinned per environment.
- Auth endpoint rate limits use Upstash (overriding Better Auth's in-memory store): 5 per minute per IP+identifier for sign-in, and 3 per hour for magic-link sends.

## Consequences
- \+ One identity across Payload admin, quote desk and portal. Data stays in our DB.
- − We own upgrades and security patches. Better Auth ships often, so Renovate is set to auto-PR and a human merges.
- − The Payload custom strategy is our code. It is covered by integration tests (role mapping, denied paths).

## Alternatives rejected
Clerk/Auth0 (PII leaves our boundary, per-MAU cost, harder self-hosting), Payload auth only (no passkeys or MFA without custom work; customers would be mixed with CMS users), Auth.js (weaker MFA/passkey story).
