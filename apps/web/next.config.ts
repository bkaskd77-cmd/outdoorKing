import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { staticSecurityHeaders } from "@ok/security";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "media.outdoorking.com" }],
    dangerouslyAllowSVG: false,
    formats: ["image/avif", "image/webp"],
  },
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
  ],
  outputFileTracingRoot: path.join(dirname, "../.."),
  turbopack: {
    root: path.resolve(dirname, "../.."),
  },
};

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
