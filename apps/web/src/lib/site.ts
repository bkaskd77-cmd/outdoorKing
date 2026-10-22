import { brand } from "@ok/config";

import { routing } from "@/i18n/routing";

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? brand.siteUrl;
}

export function canonical(path: string): string {
  const base = siteUrl().replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix === "/" ? "/" : suffix}`;
}

export function localizedPath(locale: string, path: string): string {
  const suffix = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return suffix || "/";
  return `/${locale}${suffix}`;
}

export function hreflangMap(path: string): Record<string, string> {
  const languages: Record<string, string> = { "x-default": canonical(path) };
  for (const locale of routing.locales) {
    languages[locale] = canonical(localizedPath(locale, path));
  }
  return languages;
}
