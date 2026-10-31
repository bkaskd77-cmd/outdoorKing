import type { CatalogData } from "../catalog";
import type { CatalogDay, CatalogTrip } from "../types";

export type DayTranslation = Partial<
  Pick<CatalogDay, "title" | "description" | "fromPlace" | "toPlace">
>;

export type TripTranslation = Partial<
  Pick<
    CatalogTrip,
    | "title"
    | "subtitle"
    | "overview"
    | "highlights"
    | "inclusions"
    | "exclusions"
    | "contingency"
    | "acclimatizationNotes"
    | "maxAltitudePoint"
    | "startPoint"
    | "endPoint"
  >
> & {
  /** Keyed by day number. */
  days?: Record<number, DayTranslation>;
};

/**
 * The text of one language, keyed by slug. Anything left out stays in English. The
 * same text is seeded into the CMS for that language, where editors change it.
 */
export type CatalogTranslation = {
  activities?: Record<string, { title?: string; summary?: string; body?: string }>;
  regions?: Record<
    string,
    { name?: string; summary?: string; access?: string; body?: string }
  >;
  seasons?: Record<string, { name?: string }>;
  permits?: Record<string, { name?: string; authority?: string; notes?: string }>;
  peaks?: Record<string, { name?: string; description?: string }>;
  faqs?: Record<string, { question?: string; answer?: string }>;
  pages?: Record<string, { title?: string; body?: string }>;
  trips?: Record<string, TripTranslation>;
  /**
   * Short trip lines repeated across many trips (inclusions, exclusions, start and end
   * points), keyed by the English line. Used wherever a trip has no text of its own.
   */
  tripPhrases?: Record<string, string>;
  /** Day descriptions by trip slug and then by day (its label, such as "9-12", or number). */
  dayCopy?: Record<string, Record<string, string>>;
  /** Day titles, keyed by the English title. */
  dayTitles?: Record<string, string>;
};

const LINE_FIELDS = [
  "maxAltitudePoint",
  "startPoint",
  "endPoint",
  "acclimatizationNotes",
  "contingency",
] as const;
const LIST_FIELDS = ["highlights", "inclusions", "exclusions"] as const;

function translateDay(day: CatalogDay, slug: string, t: CatalogTranslation): CatalogDay {
  const phrases = t.tripPhrases ?? {};
  const description = t.dayCopy?.[slug]?.[day.dayLabel ?? String(day.dayNumber)];
  return {
    ...day,
    title: t.dayTitles?.[day.title] ?? day.title,
    ...(description ? { description } : {}),
    fromPlace: phrases[day.fromPlace] ?? day.fromPlace,
    toPlace: phrases[day.toPlace] ?? day.toPlace,
  };
}

function translateTrip(
  trip: CatalogTrip,
  tt: TripTranslation | undefined,
  t: CatalogTranslation,
): CatalogTrip {
  const phrases = t.tripPhrases ?? {};
  const { days, ...fields } = tt ?? {};
  const phrased: Partial<CatalogTrip> = {};
  for (const field of LINE_FIELDS) {
    const german = phrases[trip[field]];
    if (german !== undefined) phrased[field] = german;
  }
  for (const field of LIST_FIELDS) {
    phrased[field] = trip[field].map((line) => phrases[line] ?? line);
  }
  return {
    ...trip,
    ...phrased,
    ...fields,
    days: trip.days.map((day) => {
      const translated = translateDay(day, trip.slug, t);
      const dt = days?.[day.dayNumber];
      return dt ? { ...translated, ...dt } : translated;
    }),
  };
}

function over<T extends { slug: string }, U extends object>(
  items: T[],
  text: Record<string, U> | undefined,
): T[] {
  if (!text) return items;
  return items.map((item) => {
    const t = text[item.slug];
    return t ? { ...item, ...t } : item;
  });
}

/** The catalog with one language's text laid over the English. */
export function translateCatalog(
  data: CatalogData,
  t: CatalogTranslation | undefined,
): CatalogData {
  if (!t) return data;
  return {
    activities: over(data.activities, t.activities),
    regions: over(data.regions, t.regions),
    seasons: over(data.seasons, t.seasons),
    permits: over(data.permits, t.permits),
    peaks: over(data.peaks, t.peaks),
    faqs: over(data.faqs, t.faqs),
    pages: over(data.pages, t.pages),
    trips: data.trips.map((trip) => {
      const tt = t.trips?.[trip.slug];
      if (!tt && !t.tripPhrases && !t.dayCopy && !t.dayTitles) return trip;
      return translateTrip(trip, tt, t);
    }),
  };
}
