import { getPayload, type CollectionSlug, type Payload } from "payload";

import config from "@payload-config";
import {
  activities,
  faqs,
  getTrips,
  pages,
  peaks,
  permits,
  regions,
  seasons,
} from "../src/content/catalog";
import type { CatalogTrip } from "../src/content/types";

const seedUser = {
  id: "catalog-seed",
  collection: "users",
  role: "super_admin",
} as never;

const context = { seedCatalog: true };
const stays = new Set(["teahouse", "lodge", "tent", "hotel"]);
const dayTypes = new Set([
  "trek",
  "rest-acclimatization",
  "summit",
  "travel",
  "flight",
  "contingency",
  "city",
]);

type Row = Record<string, unknown>;

async function existingId(
  payload: Payload,
  collection: CollectionSlug,
  slug: string,
): Promise<number | string | null> {
  const found = await payload.find({
    collection,
    depth: 0,
    draft: true,
    limit: 1,
    overrideAccess: true,
    where: { slug: { equals: slug } },
  });
  const id = found.docs[0]?.id;
  return id ?? null;
}

async function ensure(
  payload: Payload,
  collection: CollectionSlug,
  slug: string,
  data: Row,
): Promise<number | string | null> {
  const current = await existingId(payload, collection, slug);
  if (current != null) return current;
  try {
    const doc = await payload.create({
      collection,
      context,
      data: { ...data, _status: "published" } as never,
      draft: false,
      locale: "en",
      overrideAccess: true,
      user: seedUser,
    });
    return doc.id;
  } catch (error) {
    const message = error instanceof Error ? error.message : "create failed";
    console.log(JSON.stringify({ skipped: collection, slug, message }));
    return existingId(payload, collection, slug);
  }
}

function idsFor(
  slugs: string[],
  lookup: Map<string, number | string>,
): Array<number | string> {
  return slugs.flatMap((slug) => {
    const id = lookup.get(slug);
    return id == null ? [] : [id];
  });
}

function tripData(
  trip: CatalogTrip,
  lookup: {
    activities: Map<string, number | string>;
    faqs: Map<string, number | string>;
    peaks: Map<string, number | string>;
    permits: Map<string, number | string>;
    regions: Map<string, number | string>;
    seasons: Map<string, number | string>;
  },
): Row | null {
  const activity = lookup.activities.get(trip.activity);
  if (activity == null) return null;
  if (
    !Number.isFinite(trip.durationMin) ||
    !Number.isFinite(trip.durationTypical) ||
    !Number.isFinite(trip.durationMax) ||
    !Number.isFinite(trip.maxAltitudeM)
  ) {
    return null;
  }
  const sources = trip.sources
    .filter(
      (source: CatalogTrip["sources"][number]) =>
        source.url && (source.title || source.url),
    )
    .map((source: CatalogTrip["sources"][number]) => ({
      url: source.url,
      title: source.title || source.url,
      accessedAt: source.accessedAt,
    }));
  return {
    title: trip.title,
    slug: trip.slug,
    subtitle: trip.subtitle,
    activity,
    regions: idsFor(trip.regions, lookup.regions),
    difficulty: trip.difficulty,
    technicalGrade: trip.technicalGrade,
    durationDays: {
      min: trip.durationMin,
      typical: trip.durationTypical,
      max: trip.durationMax,
    },
    maxAltitudeM: trip.maxAltitudeM,
    maxAltitudePoint: trip.maxAltitudePoint,
    startPoint: trip.startPoint,
    endPoint: trip.endPoint,
    usesLukla: trip.usesLukla,
    groupType: ["private"],
    highlights: trip.highlights.filter(Boolean).map((text: string) => ({ text })),
    overview: trip.overview,
    peaks: idsFor(trip.peaks, lookup.peaks),
    permits: idsFor(trip.permits, lookup.permits),
    seasons: idsFor(trip.seasons, lookup.seasons),
    acclimatizationNotes: trip.acclimatizationNotes,
    inclusions: trip.inclusions.filter(Boolean).map((text: string) => ({ text })),
    exclusions: trip.exclusions.filter(Boolean).map((text: string) => ({ text })),
    contingency: trip.contingency,
    faqs: idsFor(trip.faqs, lookup.faqs),
    sources,
  };
}

async function seedDays(
  payload: Payload,
  trip: CatalogTrip,
  tripId: number | string,
): Promise<number> {
  let created = 0;
  for (const day of trip.days) {
    const found = await payload.find({
      collection: "itinerary-days",
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
      where: {
        and: [{ trip: { equals: tripId } }, { dayNumber: { equals: day.dayNumber } }],
      },
    });
    if (found.docs[0]) continue;
    const dayType = dayTypes.has(day.dayType) ? day.dayType : "trek";
    await payload.create({
      collection: "itinerary-days",
      context,
      data: {
        trip: Number(tripId),
        dayNumber: day.dayNumber,
        ...(day.dayLabel ? { dayLabel: day.dayLabel } : {}),
        title: day.title,
        description: day.description,
        fromPlace: day.fromPlace,
        toPlace: day.toPlace,
        startAltitudeM: day.startAltitudeM,
        highPointM: day.highPointM,
        sleepAltitudeM: day.sleepAltitudeM,
        walkingHours: day.walkingHours,
        dayType,
        ...(day.accommodation && stays.has(day.accommodation)
          ? { accommodation: day.accommodation }
          : {}),
        _status: "published",
      } as never,
      draft: false,
      locale: "en",
      overrideAccess: true,
      user: seedUser,
    });
    created += 1;
  }
  return created;
}

const payload = await getPayload({ config });
const counts: Record<string, number> = {};

const activityIds = new Map<string, number | string>();
for (const activity of activities) {
  const id = await ensure(payload, "activities", activity.slug, {
    title: activity.title,
    slug: activity.slug,
    summary: activity.summary,
    order: activity.order,
  });
  if (id != null) activityIds.set(activity.slug, id);
}
counts.activities = activityIds.size;

const regionIds = new Map<string, number | string>();
for (const region of regions) {
  const id = await ensure(payload, "regions", region.slug, {
    name: region.name,
    slug: region.slug,
    summary: region.summary,
    access: region.access,
    altitudeRangeM: { min: region.altitudeMinM, max: region.altitudeMaxM },
  });
  if (id != null) regionIds.set(region.slug, id);
}
counts.regions = regionIds.size;

const seasonIds = new Map<string, number | string>();
for (const season of seasons) {
  const id = await ensure(payload, "seasons", season.slug, {
    name: season.name,
    slug: season.slug,
    months: season.months.map(String),
  });
  if (id != null) seasonIds.set(season.slug, id);
}
counts.seasons = seasonIds.size;

const permitIds = new Map<string, number | string>();
for (const permit of permits) {
  const id = await ensure(payload, "permits", permit.slug, {
    name: permit.name,
    slug: permit.slug,
    authority: permit.authority,
    lastVerifiedAt: permit.lastVerifiedAt,
    requiresLicensedGuide: permit.requiresLicensedGuide ?? false,
    processingNotes: permit.notes,
  });
  if (id != null) permitIds.set(permit.slug, id);
}
counts.permits = permitIds.size;

const peakIds = new Map<string, number | string>();
for (const peak of peaks) {
  const id = await ensure(payload, "peaks", peak.slug, {
    name: peak.name,
    slug: peak.slug,
    heightM: peak.heightM,
    region: regionIds.get(peak.region),
    classification: peak.classification,
  });
  if (id != null) peakIds.set(peak.slug, id);
}
counts.peaks = peakIds.size;

const faqIds = new Map<string, number | string>();
for (const [index, faq] of faqs.entries()) {
  const id = await ensure(payload, "faqs", faq.slug, {
    question: faq.question,
    slug: faq.slug,
    answer: faq.answer,
    category: faq.category,
    order: index + 1,
  });
  if (id != null) faqIds.set(faq.slug, id);
}
counts.faqs = faqIds.size;

let pageCount = 0;
for (const page of pages) {
  const id = await ensure(payload, "pages", page.slug, {
    title: page.title,
    slug: page.slug,
    path: page.path,
    body: page.body,
  });
  if (id != null) pageCount += 1;
}
counts.pages = pageCount;

const lookup = {
  activities: activityIds,
  faqs: faqIds,
  peaks: peakIds,
  permits: permitIds,
  regions: regionIds,
  seasons: seasonIds,
};
const tripIds = new Map<string, number | string>();
const trips = getTrips("published");
for (const trip of trips) {
  const data = tripData(trip, lookup);
  if (!data) {
    console.log(
      JSON.stringify({ skipped: "trips", slug: trip.slug, message: "missing activity" }),
    );
    continue;
  }
  const id = await ensure(payload, "trips", trip.slug, data);
  if (id != null) tripIds.set(trip.slug, id);
}
counts.trips = tripIds.size;

for (const trip of trips) {
  const id = tripIds.get(trip.slug);
  if (id == null || trip.related.length === 0) continue;
  const relatedTrips = idsFor(trip.related, tripIds);
  if (relatedTrips.length === 0) continue;
  try {
    await payload.update({
      id,
      collection: "trips",
      context,
      data: { relatedTrips: relatedTrips.map(Number) },
      draft: false,
      overrideAccess: true,
      user: seedUser,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "related failed";
    console.log(JSON.stringify({ skipped: "trips-related", slug: trip.slug, message }));
  }
}

let days = 0;
for (const trip of trips) {
  const id = tripIds.get(trip.slug);
  if (id == null) continue;
  try {
    days += await seedDays(payload, trip, id);
  } catch (error) {
    const message = error instanceof Error ? error.message : "days failed";
    console.log(JSON.stringify({ skipped: "itinerary-days", slug: trip.slug, message }));
  }
}
counts.itineraryDaysCreated = days;

console.log(JSON.stringify({ ok: true, counts }));
await payload.destroy();
// Open job and cache handles keep the event loop alive after destroy().
process.exit(0);
