import type { DayType } from "@ok/ai/rules";

import type { CatalogData } from "./catalog";
import { waypoints } from "./facts";
import type { PictureSrc } from "./media";
import type { CatalogDay, CatalogTrip, Source } from "./types";

type Id = number | string;
type Rel = Id | { id: Id } | null | undefined;
type Text = string | null | undefined;
type Num = number | null | undefined;
type TextRow = { text?: Text } | null;
type SourceRow = { url?: Text; title?: Text; accessedAt?: Text; note?: Text } | null;

type CmsMediaSize = { url?: Text; width?: Num; height?: Num } | null;
export type CmsMedia = {
  id: Id;
  alt?: Text;
  url?: Text;
  width?: Num;
  height?: Num;
  focalX?: Num;
  focalY?: Num;
  sizes?: Record<string, CmsMediaSize | undefined> | null;
  credit?: Text;
  license?: Text;
};
export type CmsActivity = {
  id: Id;
  heroMedia?: Rel;
  slug?: Text;
  title?: Text;
  summary?: Text;
  order?: Num;
};
export type CmsRegion = {
  id: Id;
  heroMedia?: Rel;
  slug?: Text;
  name?: Text;
  summary?: Text;
  access?: Text;
  altitudeRangeM?: { min?: Num; max?: Num } | null;
};
export type CmsSeason = {
  id: Id;
  slug?: Text;
  name?: Text;
  months?: (string | number)[] | null;
};
export type CmsPermit = {
  id: Id;
  slug?: Text;
  name?: Text;
  authority?: Text;
  lastVerifiedAt?: Text;
  requiresLicensedGuide?: boolean | null;
  processingNotes?: Text;
};
export type CmsPeak = {
  id: Id;
  slug?: Text;
  name?: Text;
  heightM?: Num;
  region?: Rel;
  classification?: Text;
};
export type CmsFaq = {
  id: Id;
  slug?: Text;
  question?: Text;
  answer?: Text;
  category?: Text;
  order?: Num;
};
export type CmsPage = { id: Id; slug?: Text; title?: Text; path?: Text; body?: Text };
export type CmsDay = {
  id: Id;
  trip?: Rel;
  dayNumber?: Num;
  dayLabel?: Text;
  title?: Text;
  description?: Text;
  fromPlace?: Text;
  toPlace?: Text;
  startAltitudeM?: Num;
  highPointM?: Num;
  sleepAltitudeM?: Num;
  walkingHours?: Text;
  dayType?: Text;
  accommodation?: Text;
};
export type CmsTrip = {
  id: Id;
  slug?: Text;
  title?: Text;
  subtitle?: Text;
  activity?: Rel;
  regions?: Rel[] | null;
  difficulty?: Text;
  technicalGrade?: Text;
  durationDays?: { min?: Num; typical?: Num; max?: Num } | null;
  maxAltitudeM?: Num;
  maxAltitudePoint?: Text;
  startPoint?: Text;
  endPoint?: Text;
  usesLukla?: boolean | null;
  groupType?: string[] | null;
  highlights?: TextRow[] | null;
  overview?: Text;
  inclusions?: TextRow[] | null;
  exclusions?: TextRow[] | null;
  contingency?: Text;
  acclimatizationNotes?: Text;
  peaks?: Rel[] | null;
  permits?: Rel[] | null;
  seasons?: Rel[] | null;
  faqs?: Rel[] | null;
  relatedTrips?: Rel[] | null;
  sources?: SourceRow[] | null;
  media?: Rel[] | null;
};

/** Published documents as returned by the Payload local API (depth 0). */
export type CmsCatalogDocs = {
  activities: CmsActivity[];
  regions: CmsRegion[];
  seasons: CmsSeason[];
  permits: CmsPermit[];
  peaks: CmsPeak[];
  faqs: CmsFaq[];
  pages: CmsPage[];
  trips: CmsTrip[];
  days: CmsDay[];
  /** The media library; trips, activities and regions point into it. */
  media?: CmsMedia[];
};

function idOf(rel: Rel): Id | undefined {
  if (rel == null) return undefined;
  return typeof rel === "object" ? rel.id : rel;
}

/**
 * A media library upload as a picture, or nothing when the file has no URL. The site
 * serves the processed sizes (upright, compressed, no EXIF); the untouched original
 * is used only for uploads made before sizes existed.
 */
function pictureOf(doc: CmsMedia): PictureSrc | undefined {
  const sizes = Object.values(doc.sizes ?? {})
    .flatMap((size) =>
      size?.url && size.width && size.height
        ? [{ url: size.url, width: size.width, height: size.height }]
        : [],
    )
    .sort((a, b) => a.width - b.width);
  const largest = sizes.at(-1);
  const main =
    largest ??
    (doc.url ? { url: doc.url, width: doc.width, height: doc.height } : undefined);
  if (!main) return undefined;
  const credit = [doc.credit, doc.license].filter(Boolean).join(", ");
  const focus =
    doc.focalX != null && doc.focalY != null
      ? `${String(doc.focalX)}% ${String(doc.focalY)}%`
      : undefined;
  return {
    src: main.url,
    url: main.url,
    alt: doc.alt ?? "",
    width: main.width ?? 1600,
    height: main.height ?? 1000,
    ...(sizes.length > 1
      ? { srcSet: sizes.map((size) => `${size.url} ${String(size.width)}w`).join(", ") }
      : {}),
    ...(focus ? { focus } : {}),
    ...(credit ? { credit } : {}),
  };
}

function withPhoto(photo: PictureSrc | undefined): { photo?: PictureSrc } {
  return photo ? { photo } : {};
}

function withPhotos(photos: PictureSrc[]): { photos?: PictureSrc[] } {
  return photos.length > 0 ? { photos } : {};
}

function key(id: Id | undefined): string {
  return id == null ? "" : String(id);
}

function slugsFor(rels: Rel[] | null | undefined, slugs: Map<string, string>): string[] {
  return (rels ?? []).flatMap((rel) => {
    const slug = slugs.get(key(idOf(rel)));
    return slug ? [slug] : [];
  });
}

function texts(rows: TextRow[] | null | undefined): string[] {
  return (rows ?? []).flatMap((row) => (row?.text ? [row.text] : []));
}

function optional(value: Text): string | undefined {
  return value ?? undefined;
}

function slugMap(docs: { id: Id; slug?: Text }[]): Map<string, string> {
  return new Map(
    docs.flatMap((doc) => (doc.slug ? [[key(doc.id), doc.slug] as const] : [])),
  );
}

function bySlug<T extends { slug?: Text }>(docs: T[]): (T & { slug: string })[] {
  return docs.filter((doc): doc is T & { slug: string } => Boolean(doc.slug));
}

function mapDay(day: CmsDay): CatalogDay {
  const mapped: CatalogDay = {
    dayNumber: day.dayNumber ?? 0,
    title: day.title ?? "",
    description: day.description ?? "",
    fromPlace: day.fromPlace ?? "",
    toPlace: day.toPlace ?? "",
    startAltitudeM: day.startAltitudeM ?? 0,
    highPointM: day.highPointM ?? 0,
    sleepAltitudeM: day.sleepAltitudeM ?? 0,
    dayType: (day.dayType ?? "trek") as DayType,
  };
  if (day.dayLabel) mapped.dayLabel = day.dayLabel;
  if (day.walkingHours) mapped.walkingHours = day.walkingHours;
  if (day.accommodation) mapped.accommodation = day.accommodation;
  return mapped;
}

/**
 * Maps published CMS documents to the catalog shape the site renders. Returns null
 * when the CMS holds no published trips, so callers fall back to the code catalog.
 */
export function mapCmsCatalog(docs: CmsCatalogDocs): CatalogData | null {
  const trips = bySlug(docs.trips);
  if (trips.length === 0) return null;

  const activitySlugs = slugMap(docs.activities);
  const regionSlugs = slugMap(docs.regions);
  const seasonSlugs = slugMap(docs.seasons);
  const permitSlugs = slugMap(docs.permits);
  const peakSlugs = slugMap(docs.peaks);
  const faqSlugs = slugMap(docs.faqs);
  const tripSlugs = slugMap(trips);
  const pictures = new Map(
    (docs.media ?? []).flatMap((doc) => {
      const picture = pictureOf(doc);
      return picture ? [[key(doc.id), picture] as const] : [];
    }),
  );
  const pictureFor = (rel: Rel) => pictures.get(key(idOf(rel)));

  const daysByTrip = new Map<string, CmsDay[]>();
  for (const day of docs.days) {
    const tripKey = key(idOf(day.trip));
    daysByTrip.set(tripKey, [...(daysByTrip.get(tripKey) ?? []), day]);
  }

  return {
    activities: bySlug(docs.activities)
      .map((doc) => ({
        slug: doc.slug,
        title: doc.title ?? doc.slug,
        summary: doc.summary ?? "",
        order: doc.order ?? 0,
        ...withPhoto(pictureFor(doc.heroMedia)),
      }))
      .sort((a, b) => a.order - b.order),
    regions: bySlug(docs.regions).map((doc) => ({
      slug: doc.slug,
      name: doc.name ?? doc.slug,
      summary: doc.summary ?? "",
      access: doc.access ?? "",
      altitudeMinM: doc.altitudeRangeM?.min ?? 0,
      altitudeMaxM: doc.altitudeRangeM?.max ?? 0,
      ...withPhoto(pictureFor(doc.heroMedia)),
    })),
    seasons: bySlug(docs.seasons).map((doc) => ({
      slug: doc.slug,
      name: doc.name ?? doc.slug,
      months: (doc.months ?? []).map(Number),
    })),
    permits: bySlug(docs.permits).map((doc) => {
      const permit = {
        slug: doc.slug,
        name: doc.name ?? doc.slug,
        authority: doc.authority ?? "",
        lastVerifiedAt: (doc.lastVerifiedAt ?? "").slice(0, 10),
        notes: doc.processingNotes ?? "",
      };
      return doc.requiresLicensedGuide
        ? { ...permit, requiresLicensedGuide: true }
        : permit;
    }),
    peaks: bySlug(docs.peaks).map((doc) => ({
      slug: doc.slug,
      name: doc.name ?? doc.slug,
      heightM: doc.heightM ?? 0,
      region: regionSlugs.get(key(idOf(doc.region))) ?? "",
      classification: doc.classification ?? "",
    })),
    faqs: bySlug(docs.faqs)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((doc) => ({
        slug: doc.slug,
        question: doc.question ?? "",
        answer: doc.answer ?? "",
        category: doc.category ?? "",
      })),
    pages: bySlug(docs.pages).map((doc) => ({
      slug: doc.slug,
      title: doc.title ?? doc.slug,
      path: doc.path ?? `/${doc.slug}`,
      body: doc.body ?? "",
      status: "published" as const,
    })),
    trips: trips.map((doc): CatalogTrip => {
      const regions = slugsFor(doc.regions, regionSlugs);
      const days = (daysByTrip.get(key(doc.id)) ?? [])
        .sort((a, b) => (a.dayNumber ?? 0) - (b.dayNumber ?? 0))
        .map(mapDay);
      const sources: Source[] = (doc.sources ?? []).flatMap((row) =>
        row?.url
          ? [
              {
                url: row.url,
                title: row.title ?? row.url,
                ...(row.accessedAt ? { accessedAt: row.accessedAt } : {}),
                ...(row.note ? { note: row.note } : {}),
              },
            ]
          : [],
      );
      return {
        slug: doc.slug,
        title: doc.title ?? doc.slug,
        subtitle: doc.subtitle ?? "",
        activity: activitySlugs.get(key(idOf(doc.activity))) ?? "",
        regions,
        difficulty: (doc.difficulty ?? "moderate") as CatalogTrip["difficulty"],
        technicalGrade: optional(doc.technicalGrade),
        durationMin: doc.durationDays?.min ?? 0,
        durationTypical: doc.durationDays?.typical ?? 0,
        durationMax: doc.durationDays?.max ?? 0,
        maxAltitudeM: doc.maxAltitudeM ?? 0,
        maxAltitudePoint: doc.maxAltitudePoint ?? "",
        startPoint: doc.startPoint ?? "",
        endPoint: doc.endPoint ?? "",
        groupType: doc.groupType ?? [],
        highlights: texts(doc.highlights),
        overview: doc.overview ?? "",
        inclusions: texts(doc.inclusions),
        exclusions: texts(doc.exclusions),
        contingency: doc.contingency ?? "",
        acclimatizationNotes: doc.acclimatizationNotes ?? "",
        days,
        permits: slugsFor(doc.permits, permitSlugs),
        seasons: slugsFor(doc.seasons, seasonSlugs),
        faqs: slugsFor(doc.faqs, faqSlugs),
        related: slugsFor(doc.relatedTrips, tripSlugs),
        peaks: slugsFor(doc.peaks, peakSlugs),
        usesLukla: doc.usesLukla ?? false,
        route: waypoints(days, regions[0] ?? ""),
        status: "published",
        sources,
        ...withPhotos(
          (doc.media ?? []).flatMap((rel) => {
            const picture = pictureFor(rel);
            return picture ? [picture] : [];
          }),
        ),
      };
    }),
  };
}
