import type { Payload, PayloadRequest } from "payload";

export type DayCopySync = {
  slug: string;
  /** Day label (such as "9-12") or number, with the seeded and the new description. */
  days: { day: string; before: string; after: string }[];
};

type DayDoc = {
  id: number | string;
  dayNumber?: number | null;
  dayLabel?: string | null;
  description?: string | null;
};

/**
 * Writes new day descriptions to the CMS. A day changes only while its description is
 * still the seeded text, so days an editor has rewritten keep their wording. Returns
 * "slug day" for each day left alone.
 */
export async function syncDayCopy(
  payload: Payload,
  req: PayloadRequest,
  entries: DayCopySync[],
): Promise<string[]> {
  const skipped: string[] = [];
  for (const entry of entries) {
    const found = await payload.find({
      collection: "trips",
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
      req,
      where: { slug: { equals: entry.slug } },
    });
    const trip = found.docs[0] as unknown as { id: number | string } | undefined;
    if (!trip) continue;
    const current = await payload.find({
      collection: "itinerary-days",
      depth: 0,
      draft: true,
      locale: "en",
      overrideAccess: true,
      pagination: false,
      req,
      where: { trip: { equals: trip.id } },
    });
    const byDay = new Map(
      (current.docs as unknown as DayDoc[]).map((doc) => [
        doc.dayLabel ?? String(doc.dayNumber),
        doc,
      ]),
    );
    for (const day of entry.days) {
      const doc = byDay.get(day.day);
      if (!doc) continue;
      if ((doc.description ?? "") !== day.before) {
        if ((doc.description ?? "") !== day.after) skipped.push(`${entry.slug} ${day.day}`);
        continue;
      }
      await payload.update({
        collection: "itinerary-days",
        context: { seedCatalog: true },
        data: { description: day.after, _status: "published" } as never,
        draft: false,
        id: doc.id,
        locale: "en",
        overrideAccess: true,
        req,
      });
    }
  }
  return skipped;
}
