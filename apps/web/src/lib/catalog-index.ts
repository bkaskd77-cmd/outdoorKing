import type { CatalogIndex } from "@ok/ai";

import type { Catalog } from "@/content/catalog";
import { withoutPlaceholders } from "@/lib/placeholders";

/** Published catalog only. Never include quotes, bookings, reviews or PII. */
export function publishedCatalogIndex(catalog: Catalog): CatalogIndex {
  const { faqs, getTrips, pages, peaks, permits, regions, seasons } = catalog;
  return {
    trips: getTrips("published").map((trip) => ({
      slug: trip.slug,
      title: trip.title,
      activity: trip.activity,
      regions: trip.regions,
      difficulty: trip.difficulty,
      durationTypical: trip.durationTypical,
      durationMin: trip.durationMin,
      durationMax: trip.durationMax,
      maxAltitudeM: trip.maxAltitudeM,
      overview: withoutPlaceholders(trip.overview),
      permits: trip.permits,
      seasons: trip.seasons,
      usesLukla: trip.usesLukla,
      days: trip.days.map((d) => ({
        dayNumber: d.dayNumber,
        title: d.title,
        fromPlace: d.fromPlace,
        toPlace: d.toPlace,
        sleepAltitudeM: d.sleepAltitudeM,
        highPointM: d.highPointM,
        dayType: d.dayType,
      })),
    })),
    permits: permits.map((p) => ({
      slug: p.slug,
      name: p.name,
      authority: p.authority,
      notes: withoutPlaceholders(p.notes),
      lastVerifiedAt: p.lastVerifiedAt,
      requiresLicensedGuide: p.requiresLicensedGuide,
    })),
    seasons: seasons.map((s) => ({ slug: s.slug, name: s.name, months: s.months })),
    regions: regions.map((r) => ({
      slug: r.slug,
      name: r.name,
      summary: r.summary,
      access: r.access,
    })),
    peaks: peaks.map((p) => ({
      slug: p.slug,
      name: p.name,
      heightM: p.heightM,
      region: p.region,
    })),
    faqs: faqs.map((f) => ({
      slug: f.slug,
      question: f.question,
      answer: withoutPlaceholders(f.answer),
      category: f.category,
    })),
    pages: pages
      .filter((p) => p.status === "published")
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        path: p.path,
        body: withoutPlaceholders(p.body),
        status: p.status,
      })),
  };
}
