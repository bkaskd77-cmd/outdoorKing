import { unstable_cache } from "next/cache";
import { getLocale } from "next-intl/server";
import type { CollectionSlug } from "payload";
import { cache } from "react";

import { CATALOG_TAG } from "./cache-tags";
import {
  codeCatalog,
  codeCatalogData,
  makeCatalog,
  type Catalog,
  type CatalogData,
} from "./catalog";
import { mapCmsCatalog, type CmsCatalogDocs, type CmsMedia } from "./cms";
import { translateCatalog, translations } from "./translations";

type Locale = "en" | "de" | "fr" | "zh-Hans";
const LOCALES: readonly Locale[] = ["en", "de", "fr", "zh-Hans"];

/** The request's language; English outside a request (builds, static params, jobs). */
async function requestLocale(): Promise<Locale> {
  try {
    const locale = await getLocale();
    return LOCALES.find((item) => item === locale) ?? "en";
  } catch {
    return "en";
  }
}

const codeCatalogs = new Map<Locale, Catalog>([["en", codeCatalog]]);

/** The code catalog in one language: English with that language's text laid over it. */
function codeCatalogFor(locale: Locale): Catalog {
  let catalog = codeCatalogs.get(locale);
  if (!catalog) {
    catalog = makeCatalog(translateCatalog(codeCatalogData, translations[locale]));
    codeCatalogs.set(locale, catalog);
  }
  return catalog;
}

async function published<T>(
  collection: CollectionSlug,
  sort: string,
  locale: Locale,
): Promise<T[]> {
  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection,
    depth: 0,
    draft: false,
    // Fields not yet translated fall back to English (the CMS default locale).
    locale,
    overrideAccess: false,
    pagination: false,
    sort,
    where: { _status: { equals: "published" } },
  });
  return result.docs as T[];
}

async function mediaLibrary(): Promise<CmsMedia[]> {
  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "media",
    depth: 0,
    overrideAccess: false,
    pagination: false,
  });
  return result.docs as CmsMedia[];
}

async function readCms(locale: Locale): Promise<CatalogData | null> {
  const [activities, regions, seasons, permits, peaks, faqs, pages, trips, days, media] =
    await Promise.all([
      published<CmsCatalogDocs["activities"][number]>("activities", "order", locale),
      published<CmsCatalogDocs["regions"][number]>("regions", "createdAt", locale),
      published<CmsCatalogDocs["seasons"][number]>("seasons", "createdAt", locale),
      published<CmsCatalogDocs["permits"][number]>("permits", "createdAt", locale),
      published<CmsCatalogDocs["peaks"][number]>("peaks", "createdAt", locale),
      published<CmsCatalogDocs["faqs"][number]>("faqs", "order", locale),
      published<CmsCatalogDocs["pages"][number]>("pages", "createdAt", locale),
      published<CmsCatalogDocs["trips"][number]>("trips", "slug", locale),
      published<CmsCatalogDocs["days"][number]>("itinerary-days", "dayNumber", locale),
      mediaLibrary(),
    ]);
  return mapCmsCatalog({
    activities,
    regions,
    seasons,
    permits,
    peaks,
    faqs,
    pages,
    trips,
    days,
    media,
  });
}

// The data cache outlives deployments; key it by deployment and mapping version so
// a new build never serves a catalog shaped by older code.
const CATALOG_SHAPE = "4";
const readCachedCms = unstable_cache(
  readCms,
  ["catalog", CATALOG_SHAPE, process.env.VERCEL_DEPLOYMENT_ID ?? "local"],
  {
    tags: [CATALOG_TAG],
    // Edits revalidate the tag at once; this only bounds staleness if a hook is missed.
    revalidate: 3600,
  },
);

// After a failed read, serve the code catalog for a minute instead of retrying the
// CMS on every render (a build without a database renders hundreds of pages).
const RETRY_AFTER_MS = 60_000;
let cmsDownSince = 0;

/**
 * The published catalog for this request, in the request's language: the CMS when it
 * is reachable and holds published trips, otherwise the code catalog it was seeded
 * from. Text not yet translated is shown in English.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  const locale = await requestLocale();
  if (Date.now() - cmsDownSince < RETRY_AFTER_MS) return codeCatalogFor(locale);
  try {
    const data = await readCachedCms(locale);
    if (data) return makeCatalog(data);
    console.warn(JSON.stringify({ event: "catalog_fallback", reason: "cms_empty" }));
  } catch (error) {
    cmsDownSince = Date.now();
    const reason = error instanceof Error ? error.message : "cms_unreachable";
    console.warn(JSON.stringify({ event: "catalog_fallback", reason }));
  }
  return codeCatalogFor(locale);
});

export type TeamProfile = {
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
  photoAlt?: string;
  languages?: string;
  yearsExperience?: number;
  isGuide: boolean;
};

type TeamDoc = {
  name?: string | null;
  roleTitle?: string | null;
  bio?: string | null;
  photo?: { url?: string | null; alt?: string | null } | number | null;
  languages?: string | null;
  yearsExperience?: number | null;
  isGuide?: boolean | null;
};

async function readTeam(): Promise<TeamProfile[]> {
  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "team-members",
    depth: 1,
    draft: false,
    overrideAccess: false,
    pagination: false,
    sort: "order",
    where: {
      and: [{ _status: { equals: "published" } }, { publicProfile: { equals: true } }],
    },
  });
  return (result.docs as TeamDoc[]).flatMap((doc) => {
    if (!doc.name) return [];
    const photo = doc.photo && typeof doc.photo === "object" ? doc.photo : null;
    return [
      {
        name: doc.name,
        role: doc.roleTitle ?? "",
        bio: doc.bio ?? "",
        ...(photo?.url ? { photoUrl: photo.url, photoAlt: photo.alt ?? doc.name } : {}),
        ...(doc.languages ? { languages: doc.languages } : {}),
        ...(doc.yearsExperience ? { yearsExperience: doc.yearsExperience } : {}),
        isGuide: Boolean(doc.isGuide),
      },
    ];
  });
}

const readCachedTeam = unstable_cache(
  readTeam,
  ["team", process.env.VERCEL_DEPLOYMENT_ID ?? "local"],
  { tags: [CATALOG_TAG], revalidate: 3600 },
);

/** Published team members who agreed to a public profile. Empty when the CMS is down. */
export const getTeam = cache(async (): Promise<TeamProfile[]> => {
  try {
    return await readCachedTeam();
  } catch {
    return [];
  }
});
