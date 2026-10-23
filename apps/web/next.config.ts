import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { staticSecurityHeaders } from "@ok/security";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Docker/self-host needs standalone. Vercel’s builder needs the default
  // Next output — `output: "standalone"` strips serverless traces and 404s.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "media.outdoorking.com" }],
    dangerouslyAllowSVG: false,
    formats: ["image/avif", "image/webp"],
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  experimental: {/* cacheComponents: false — see ADR-0002 */},
  async headers() {
    return staticSecurityHeaders();
  },
  async rewrites() {
    return [{ source: "/_design", destination: "/design" }];
  },
  transpilePackages: [
    "@ok/ui",
    "@ok/security",
    "@ok/env",
    "@ok/db",
    "@ok/auth",
    "@ok/ai",
    "@ok/config",
    "@ok/payments",
    "@ok/intel-client",
    "@ok/content-agents",
    "@ok/jobs",
  ],
  outputFileTracingIncludes: {
    "*": ["./content/facts/**"],
  },
  outputFileTracingRoot: path.join(dirname, "../.."),
  turbopack: {
    root: path.resolve(dirname, "../.."),
  },
};

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
