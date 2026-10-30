import type { Payload, PayloadRequest } from "payload";

type DayType =
  | "trek"
  | "rest-acclimatization"
  | "summit"
  | "travel"
  | "flight"
  | "contingency"
  | "city";

/** [dayNumber, dayLabel, title, sleepAltitudeM, highPointM, dayType] as seeded. */
export type DayKey = [number, string | null, string, number, number, string];

export type SyncDay = {
  dayNumber: number;
  dayLabel: string | null;
  title: string;
  description: string;
  fromPlace: string | null;
  toPlace: string | null;
  startAltitudeM: number;
  highPointM: number;
  sleepAltitudeM: number;
  walkingHours: string | null;
  dayType: string;
  accommodation: string | null;
};

export type TripSync = {
  slug: string;
  before: { fields: Record<string, unknown>; days?: DayKey[] };
  after: { fields: Record<string, unknown>; days?: SyncDay[] };
};

type Doc = Record<string, unknown> & { id: number | string };

function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

function keyOf(doc: Doc): DayKey {
  return [
    Number(doc.dayNumber),
    (doc.dayLabel as string | null | undefined) ?? null,
    String(doc.title ?? ""),
    Number(doc.sleepAltitudeM),
    Number(doc.highPointM),
    String(doc.dayType ?? ""),
  ];
}

function pick(doc: Doc, field: string): unknown {
  const value = doc[field];
  if (field === "durationDays" && value && typeof value === "object") {
    const { min, typical, max } = value as Record<string, unknown>;
    return { min, typical, max };
  }
  return value;
}

/**
 * Applies corrected catalog content to the CMS without overwriting editors' work: a
 * field changes only while it still holds the seeded value, and a trip's days are
 * replaced only while they are exactly as seeded. Returns the slugs left alone.
 */
export async function syncTrips(
  payload: Payload,
  req: PayloadRequest,
  entries: TripSync[],
): Promise<string[]> {
  const skipped: string[] = [];
  for (const entry of entries) {
    const found = await payload.find({
      collection: "trips",
      depth: 0,
      draft: true,
      limit: 1,
      locale: "en",
      overrideAccess: true,
      req,
      where: { slug: { equals: entry.slug } },
    });
    const trip = found.docs[0] as Doc | undefined;
    if (!trip) continue;

    let edited = false;
    if (entry.after.days && entry.before.days) {
      const current = await payload.find({
        collection: "itinerary-days",
        depth: 0,
        draft: true,
        locale: "en",
        overrideAccess: true,
        pagination: false,
        req,
        sort: "dayNumber",
        where: { trip: { equals: trip.id } },
      });
      const docs = current.docs as Doc[];
      if (same(docs.map(keyOf), entry.before.days)) {
        for (const doc of docs) {
          await payload.delete({
            collection: "itinerary-days",
            context: { seedCatalog: true },
            id: doc.id,
            overrideAccess: true,
            req,
          });
        }
        for (const day of entry.after.days) {
          await payload.create({
            collection: "itinerary-days",
            context: { seedCatalog: true },
            data: {
              ...day,
              dayLabel: day.dayLabel ?? undefined,
              fromPlace: day.fromPlace ?? undefined,
              toPlace: day.toPlace ?? undefined,
              walkingHours: day.walkingHours ?? undefined,
              accommodation: day.accommodation ?? undefined,
              dayType: day.dayType as DayType,
              trip: trip.id,
              _status: "published",
            } as never,
            draft: false,
            locale: "en",
            overrideAccess: true,
            req,
          });
        }
      } else {
        edited = true;
      }
    }

    const data = Object.fromEntries(
      Object.entries(entry.after.fields).filter(([field]) =>
        same(pick(trip, field), entry.before.fields[field]),
      ),
    );
    if (Object.keys(data).length < Object.keys(entry.after.fields).length) edited = true;
    if (Object.keys(data).length > 0) {
      await payload.update({
        collection: "trips",
        context: { seedCatalog: true },
        data: { ...data, _status: "published" } as never,
        draft: false,
        id: trip.id,
        locale: "en",
        overrideAccess: true,
        req,
      });
    }
    if (edited) skipped.push(entry.slug);
  }
  return skipped;
}
