import type { MetadataRoute } from "next";

import { env } from "@ok/env/server";

import { canonical } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/desk", "/account", "/quotes", "/pay"],
    },
    sitemap: canonical("/sitemap.xml"),
  };
}
