import { env } from "@ok/env/server";
import { buildCsp, limit, policies, shouldSkipRateLimit } from "@ok/security";
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { shouldRunIntl } from "./intl-gate";

const intl = createIntlMiddleware(routing);

function nonceFromUuid(uuid: string): string {
  return Buffer.from(uuid.replaceAll("-", ""), "hex").toString("base64url");
}

export async function proxy(request: NextRequest) {
  let { pathname } = request.nextUrl;
  if (pathname === "/_design" || pathname === "/en/_design") {
    const url = request.nextUrl.clone();
    url.pathname = "/design";
    request = new NextRequest(url, request);
    pathname = "/design";
  }
  const requestHeaders = new Headers(request.headers);
  const nonce = nonceFromUuid(crypto.randomUUID());
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-pathname", pathname);

  const isAdmin = pathname.startsWith("/admin");
  const csp = buildCsp(nonce, {
    admin: isAdmin,
    r2AccountId: env.R2_ACCOUNT_ID,
    reportUri: env.CSP_REPORT_URI || undefined,
    unsafeEval: isAdmin && env.NODE_ENV === "development",
    gatewayOrigins: env.PAYMENT_GATEWAY_ORIGINS_LIST,
  });
  const cspHeader =
    env.CSP_REPORT_ONLY && env.VERCEL_ENV !== "production"
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
    if (pathname === "/admin" || pathname === "/admin/") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/quotes";
      return NextResponse.redirect(url);
    }
  }

  const response = shouldRunIntl(pathname)
    ? intl(request)
    : NextResponse.next({ request: { headers: requestHeaders } });

  response.headers.set(cspHeader, csp);
  if (env.VERCEL_ENV !== "production") {
    response.headers.set("X-Robots-Tag", "noindex");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|mp4|webm)$).*)",
  ],
};
