import { describe, expect, it } from "vitest";

import { codeCatalog, type CatalogData } from "./catalog";
import { mapCmsCatalog, type CmsCatalogDocs } from "./cms";
import type { CatalogTrip } from "./types";

/** Code catalog → published CMS documents, the way scripts/seed-catalog.ts stores them. */
function toCmsDocs(data: CatalogData): CmsCatalogDocs {
  const ids = (slugs: { slug: string }[]) =>
    new Map(slugs.map((x, i) => [x.slug, i + 1]));
  const activityIds = ids(data.activities);
  const regionIds = ids(data.regions);
  const seasonIds = ids(data.seasons);
  const permitIds = ids(data.permits);
  const peakIds = ids(data.peaks);
  const faqIds = ids(data.faqs);
  const tripIds = ids(data.trips);
  const rels = (slugs: string[], map: Map<string, number>) =>
    slugs.flatMap((slug) => (map.has(slug) ? [map.get(slug) as number] : []));

  return {
    activities: data.activities.map((a) => ({ id: activityIds.get(a.slug) ?? 0, ...a })),
    regions: data.regions.map((r) => ({
      id: regionIds.get(r.slug) ?? 0,
      slug: r.slug,
      name: r.name,
      summary: r.summary,
      access: r.access,
      altitudeRangeM: { min: r.altitudeMinM, max: r.altitudeMaxM },
    })),
    seasons: data.seasons.map((s) => ({
      id: seasonIds.get(s.slug) ?? 0,
      slug: s.slug,
      name: s.name,
      months: s.months.map(String),
    })),
    permits: data.permits.map((p) => ({
      id: permitIds.get(p.slug) ?? 0,
      slug: p.slug,
      name: p.name,
      authority: p.authority,
      lastVerifiedAt: `${p.lastVerifiedAt}T00:00:00.000Z`,
      requiresLicensedGuide: p.requiresLicensedGuide ?? false,
      processingNotes: p.notes,
    })),
    peaks: data.peaks.map((p) => ({
      id: peakIds.get(p.slug) ?? 0,
      slug: p.slug,
      name: p.name,
      heightM: p.heightM,
      region: regionIds.get(p.region) ?? null,
      classification: p.classification,
    })),
    faqs: data.faqs.map((f, index) => ({
      id: faqIds.get(f.slug) ?? 0,
      ...f,
      order: index + 1,
    })),
    pages: data.pages
      .filter((p) => p.status === "published")
      .map((p, index) => ({
        id: index + 1,
        slug: p.slug,
        title: p.title,
        path: p.path,
        body: p.body,
      })),
    trips: data.trips.map((t) => ({
      id: tripIds.get(t.slug) ?? 0,
      slug: t.slug,
      title: t.title,
      subtitle: t.subtitle,
      activity: activityIds.get(t.activity) ?? null,
      regions: rels(t.regions, regionIds),
      difficulty: t.difficulty,
      technicalGrade: t.technicalGrade ?? null,
      durationDays: {
        min: t.durationMin,
        typical: t.durationTypical,
        max: t.durationMax,
      },
      maxAltitudeM: t.maxAltitudeM,
      maxAltitudePoint: t.maxAltitudePoint,
      startPoint: t.startPoint,
      endPoint: t.endPoint,
      usesLukla: t.usesLukla,
      groupType: t.groupType,
      highlights: t.highlights.map((text) => ({ text })),
      overview: t.overview,
      inclusions: t.inclusions.map((text) => ({ text })),
      exclusions: t.exclusions.map((text) => ({ text })),
      contingency: t.contingency,
      acclimatizationNotes: t.acclimatizationNotes,
      peaks: rels(t.peaks, peakIds),
      permits: rels(t.permits, permitIds),
      seasons: rels(t.seasons, seasonIds),
      faqs: rels(t.faqs, faqIds),
      relatedTrips: rels(t.related, tripIds),
      sources: t.sources.filter((source) => Boolean(source.url)),
    })),
    days: data.trips.flatMap((t) =>
      t.days.map((d, index) => ({
        id: `${t.slug}-${String(index)}`,
        trip: tripIds.get(t.slug) ?? null,
        dayNumber: d.dayNumber,
        dayLabel: d.dayLabel ?? null,
        title: d.title,
        description: d.description,
        fromPlace: d.fromPlace,
        toPlace: d.toPlace,
        startAltitudeM: d.startAltitudeM,
        highPointM: d.highPointM,
        sleepAltitudeM: d.sleepAltitudeM,
        walkingHours: d.walkingHours ?? null,
        dayType: d.dayType,
        accommodation: d.accommodation ?? null,
      })),
    ),
  };
}

/** What the CMS holds: sources without a URL and unknown regions (rara) were never seeded. */
function asStored(trip: CatalogTrip): CatalogTrip {
  return {
    ...trip,
    regions: trip.regions.filter((slug) =>
      codeCatalog.regions.some((r) => r.slug === slug),
    ),
    sources: trip.sources.filter((source) => Boolean(source.url)),
  };
}

describe("mapCmsCatalog", () => {
  const data: CatalogData = {
    activities: codeCatalog.activities,
    regions: codeCatalog.regions,
    seasons: codeCatalog.seasons,
    permits: codeCatalog.permits,
    peaks: codeCatalog.peaks,
    faqs: codeCatalog.faqs,
    pages: codeCatalog.pages,
    trips: codeCatalog.getTrips("published"),
  };

  it("returns null when the CMS has no published trips", () => {
    expect(mapCmsCatalog({ ...toCmsDocs(data), trips: [], days: [] })).toBeNull();
  });

  it("reproduces the seeded catalog exactly", () => {
    const mapped = mapCmsCatalog(toCmsDocs(data));
    expect(mapped).not.toBeNull();
    expect(mapped?.activities).toEqual(data.activities);
    expect(mapped?.regions).toEqual(data.regions);
    expect(mapped?.seasons).toEqual(data.seasons);
    expect(mapped?.permits).toEqual(data.permits);
    expect(mapped?.peaks).toEqual(data.peaks);
    expect(mapped?.faqs).toEqual(data.faqs);
    expect(mapped?.pages).toEqual(data.pages.filter((p) => p.status === "published"));
    const want = data.trips.map(asStored);
    expect(mapped?.trips).toEqual(want);
  });

  it("keeps day blocks such as 9-12 as their label", () => {
    const mapped = mapCmsCatalog(toCmsDocs(data));
    const ama = mapped?.trips.find((trip) => trip.slug === "ama-dablam-expedition");
    const block = ama?.days.find((day) => day.dayLabel === "9-12");
    expect(block?.dayNumber).toBe(9);
  });

  it("puts media library photos on trips, activities and regions", () => {
    const docs = toCmsDocs(data);
    const photo = {
      id: 7,
      alt: "Mera Peak from the Mera La",
      url: "https://blob.example/mera.jpg",
      width: 2000,
      height: 1333,
      credit: "A. Photographer",
      license: "CC BY-SA 4.0",
    };
    const [trip, ...trips] = docs.trips;
    const [activity, ...activities] = docs.activities;
    if (!trip || !activity) throw new Error("catalog is empty");
    const mapped = mapCmsCatalog({
      ...docs,
      media: [photo, { id: 8, alt: "Not uploaded yet" }],
      trips: [{ ...trip, media: [7, 8, 9] }, ...trips],
      activities: [{ ...activity, heroMedia: 7 }, ...activities],
    });
    const expected = {
      src: photo.url,
      url: photo.url,
      alt: photo.alt,
      width: 2000,
      height: 1333,
      credit: "A. Photographer, CC BY-SA 4.0",
    };
    expect(mapped?.trips.find((t) => t.slug === trip.slug)?.photos).toEqual([expected]);
    expect(mapped?.activities.find((a) => a.slug === activity.slug)?.photo).toEqual(
      expected,
    );
    expect(mapped?.regions.every((region) => region.photo === undefined)).toBe(true);
  });
});
