import type { MetadataRoute } from "next";

import { activities, getTrips, pages, peaks, permits, regions } from "@/content/catalog";
import { canonical } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    "/faq",
    "/blog",
    "/trips",
    "/permits",
    "/design-my-trip",
    ...activities.map((item) => `/activities/${item.slug}`),
    ...regions.map((item) => `/regions/${item.slug}`),
    ...getTrips("published").map((item) => `/trips/${item.slug}`),
    ...peaks.map((item) => `/peaks/${item.slug}`),
    ...permits.map((item) => `/permits/${item.slug}`),
    ...pages.filter((item) => item.status === "published").map((item) => item.path),
  ];
  const unique = [...new Set(paths)];
  return unique.map((path) => ({
    url: canonical(path),
    lastModified: now,
  }));
}
