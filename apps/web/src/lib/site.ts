import { brand } from "@ok/config";

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? brand.siteUrl;
}

export function canonical(path: string): string {
  const base = siteUrl().replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix === "/" ? "/" : suffix}`;
}
