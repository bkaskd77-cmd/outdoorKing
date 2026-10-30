import { unstable_cache } from "next/cache";
import type { CollectionSlug } from "payload";
import { cache } from "react";

import { CATALOG_TAG } from "./cache-tags";
import { codeCatalog, makeCatalog, type Catalog, type CatalogData } from "./catalog";
import { mapCmsCatalog, type CmsCatalogDocs, type CmsMedia } from "./cms";

async function published<T>(collection: CollectionSlug, sort: string): Promise<T[]> {
  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection,
    depth: 0,
    draft: false,
    locale: "en",
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

async function readCms(): Promise<CatalogData | null> {
  const [activities, regions, seasons, permits, peaks, faqs, pages, trips, days, media] =
    await Promise.all([
      published<CmsCatalogDocs["activities"][number]>("activities", "order"),
      published<CmsCatalogDocs["regions"][number]>("regions", "createdAt"),
      published<CmsCatalogDocs["seasons"][number]>("seasons", "createdAt"),
      published<CmsCatalogDocs["permits"][number]>("permits", "createdAt"),
      published<CmsCatalogDocs["peaks"][number]>("peaks", "createdAt"),
      published<CmsCatalogDocs["faqs"][number]>("faqs", "order"),
      published<CmsCatalogDocs["pages"][number]>("pages", "createdAt"),
      published<CmsCatalogDocs["trips"][number]>("trips", "slug"),
      published<CmsCatalogDocs["days"][number]>("itinerary-days", "dayNumber"),
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
const CATALOG_SHAPE = "3";
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
 * The published catalog for this request: the CMS when it is reachable and holds
 * published trips, otherwise the code catalog it was seeded from.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  if (Date.now() - cmsDownSince < RETRY_AFTER_MS) return codeCatalog;
  try {
    const data = await readCachedCms();
    if (data) return makeCatalog(data);
    console.warn(JSON.stringify({ event: "catalog_fallback", reason: "cms_empty" }));
  } catch (error) {
    cmsDownSince = Date.now();
    const reason = error instanceof Error ? error.message : "cms_unreachable";
    console.warn(JSON.stringify({ event: "catalog_fallback", reason }));
  }
  return codeCatalog;
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
