import { env } from "@ok/env/server";
import { buildCsp, limit, policies, shouldSkipRateLimit } from "@ok/security";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const intl = createIntlMiddleware(routing);

function nonceFromUuid(uuid: string): string {
  return Buffer.from(uuid.replaceAll("-", ""), "hex").toString("base64url");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  const nonce = nonceFromUuid(crypto.randomUUID());
  requestHeaders.set("x-nonce", nonce);

  const isAdmin = pathname.startsWith("/admin");
  const csp = buildCsp(nonce, {
    admin: isAdmin,
    r2AccountId: env.R2_ACCOUNT_ID,
    reportUri: env.CSP_REPORT_URI || undefined,
    unsafeEval: isAdmin && env.NODE_ENV === "development",
  });
  const cspHeader = env.CSP_REPORT_ONLY
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";

  if (!shouldSkipRateLimit(pathname)) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    try {
      const result = await limit(ip, policies.global);
      if (!result.success) {
        return new NextResponse("Too Many Requests", {
          status: 429,
          headers: { "Retry-After": "60" },
        });
      }
    } catch {
      // Fail open when Redis is unavailable so health/CI still serve.
    }
  }

  if (isAdmin && !pathname.startsWith("/admin/login") && !pathname.startsWith("/api/")) {
    const session =
      request.cookies.get("ok.session_token") ??
      request.cookies.get("__Secure-ok.session_token");
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  const response = isAdmin
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : intl(request);

  response.headers.set(cspHeader, csp);
  if (env.VERCEL_ENV !== "production") {
    response.headers.set("X-Robots-Tag", "noindex");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
