import type { MetadataRoute } from "next";

import { getCatalog } from "@/content/store";
import { routing } from "@/i18n/routing";
import { canonical, hreflangMap, localizedPath } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { activities, getTrips, pages, peaks, permits, regions } = await getCatalog();
  const now = new Date();
  const paths = [
    "/",
    "/faq",
    "/trips",
    "/activities",
    "/regions",
    "/permits",
    "/guides",
    "/design-my-trip",
    ...activities.map((item) => `/activities/${item.slug}`),
    ...regions.map((item) => `/regions/${item.slug}`),
    ...getTrips("published").map((item) => `/trips/${item.slug}`),
    ...peaks.map((item) => `/peaks/${item.slug}`),
    ...permits.map((item) => `/permits/${item.slug}`),
    ...pages.filter((item) => item.status === "published").map((item) => item.path),
  ];
  const unique = [...new Set(paths)];
  return unique.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: canonical(localizedPath(locale, path)),
      lastModified: now,
      alternates: { languages: hreflangMap(path) },
    })),
  );
}
