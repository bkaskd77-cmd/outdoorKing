import type { Catalog } from "@/content/catalog";
import type {
  CatalogActivity,
  CatalogFaq,
  CatalogPermit,
  CatalogTrip,
} from "@/content/types";
import { withoutPlaceholders } from "@/lib/placeholders";

export type ActivityIntel = {
  activity: CatalogActivity;
  published: CatalogTrip[];
  drafts: CatalogTrip[];
  routeCount: number;
  minAltitudeM?: number;
  maxAltitudeM?: number;
  minDays?: number;
  maxDays?: number;
  seasons: string[];
  permits: CatalogPermit[];
  usesLukla: boolean;
  faqs: CatalogFaq[];
};

const FAQ_BY_ACTIVITY: Record<string, string[]> = {
  trekking: ["how-hard-is-altitude", "what-is-tims", "lukla-flights", "best-season"],
  "peak-climbing": [
    "how-hard-is-altitude",
    "guide-required",
    "do-i-need-insurance",
    "best-season",
  ],
  expeditions: ["how-hard-is-altitude", "do-i-need-insurance", "rescue", "best-season"],
  tours: ["are-there-public-prices", "best-season", "group-size"],
  "heli-treks": ["lukla-flights", "do-i-need-insurance", "are-there-public-prices"],
  cultural: ["are-there-public-prices", "group-size", "best-season"],
  wildlife: ["are-there-public-prices", "do-i-need-insurance", "group-size"],
  family: ["how-hard-is-altitude", "group-size", "best-season"],
  photography: ["best-season", "how-hard-is-altitude", "are-there-public-prices"],
  pilgrimage: ["best-season", "group-size", "are-there-public-prices"],
};

export function activityIntel(catalog: Catalog, slug: string): ActivityIntel | undefined {
  const { activities, faqs, getPermit, tripsByActivity } = catalog;
  const activity = activities.find((item) => item.slug === slug);
  if (!activity) return undefined;
  const trips = tripsByActivity(slug);
  const published = trips.filter((trip) => trip.status === "published");
  const drafts = trips.filter((trip) => trip.status === "draft");
  const pool = trips;
  const alts = pool.map((trip) => trip.maxAltitudeM).filter((value) => value > 0);
  const mins = pool.map((trip) => trip.durationMin);
  const maxs = pool.map((trip) => trip.durationMax);
  const permitDocs = [
    ...new Map(
      pool
        .flatMap((trip) => trip.permits)
        .map((permitSlug) => getPermit(permitSlug))
        .filter((permit): permit is CatalogPermit => Boolean(permit))
        .map((permit) => [permit.slug, permit]),
    ).values(),
  ];
  const faqSlugs = FAQ_BY_ACTIVITY[slug] ?? ["are-there-public-prices", "best-season"];
  return {
    activity,
    published,
    drafts,
    routeCount: pool.length,
    minAltitudeM: alts.length ? Math.min(...alts) : undefined,
    maxAltitudeM: alts.length ? Math.max(...alts) : undefined,
    minDays: mins.length ? Math.min(...mins) : undefined,
    maxDays: maxs.length ? Math.max(...maxs) : undefined,
    seasons: [...new Set(pool.flatMap((trip) => trip.seasons))],
    permits: permitDocs,
    usesLukla: pool.some((trip) => trip.usesLukla),
    faqs: faqSlugs
      .map((faqSlug) => faqs.find((faq) => faq.slug === faqSlug))
      .filter((faq): faq is CatalogFaq => Boolean(faq))
      .map((faq) => ({ ...faq, answer: withoutPlaceholders(faq.answer) })),
  };
}

/** Range chip only when the library actually spans altitudes — not 1400–1400. */
export function altitudeChip(min?: number, max?: number): string | null {
  if (min == null || max == null) return null;
  if (min === max) return null;
  return `${String(min)}–${String(max)} m`;
}

/** Range chip only when duration spans — not 1–1 days. */
export function durationChip(min?: number, max?: number): string | null {
  if (min == null || max == null) return null;
  if (min === max) return null;
  return `${String(min)}–${String(max)} days`;
}

export function daysLabel(n: number): string {
  return n === 1 ? "1 day" : `${String(n)} days`;
}

export function activityHeroCopy(slug: string): { eyebrow: string; title: string } {
  switch (slug) {
    case "trekking":
      return { eyebrow: "Trekking in Nepal", title: "Walk the Himalaya, privately." };
    case "peak-climbing":
      return {
        eyebrow: "Peak climbing in Nepal",
        title: "Trekking peaks, privately guided.",
      };
    case "expeditions":
      return {
        eyebrow: "Expeditions",
        title: "High Himalayan expeditions, designed around you.",
      };
    case "tours":
      return { eyebrow: "Tours in Nepal", title: "The country at your pace." };
    case "heli-treks":
      return { eyebrow: "Heli treks", title: "Fly the approach, walk the point." };
    case "cultural":
      return { eyebrow: "Cultural journeys", title: "Heritage at a guest's pace." };
    case "wildlife":
      return { eyebrow: "Wildlife", title: "Lowland parks, privately guided." };
    case "family":
      return { eyebrow: "Family journeys", title: "Shorter days, extra rest." };
    case "photography":
      return { eyebrow: "Photography", title: "Time at the light, not a rush." };
    case "pilgrimage":
      return { eyebrow: "Pilgrimage", title: "Walked as guests." };
    default:
      return { eyebrow: "Private journeys · Nepal", title: "Designed around you." };
  }
}
