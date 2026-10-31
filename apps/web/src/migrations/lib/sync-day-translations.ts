import type { Payload, PayloadRequest } from "payload";

export type DayTranslationSync = {
  slug: string;
  /** Day label (such as "9-12") or number, with the translated day fields. */
  days: { day: string; data: Record<string, string> }[];
};

type DayDoc = Record<string, unknown> & {
  id: number | string;
  dayNumber?: number | null;
  dayLabel?: string | null;
};

const empty = (value: unknown) => value === undefined || value === null || value === "";

/**
 * Seeds one language's text into the itinerary days of trips found by slug. A field
 * is written only while it is still empty in that language, so translations an editor
 * has made are kept. English is never touched. Returns "slug day" for each day where
 * at least one field was left alone.
 */
export async function syncDayTranslations(
  payload: Payload,
  req: PayloadRequest,
  locale: "de" | "fr" | "zh-Hans",
  entries: DayTranslationSync[],
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
    const trip = found.docs[0] as unknown as { id: number | string } | undefined;
    if (!trip) continue;
    const current = await payload.find({
      collection: "itinerary-days",
      depth: 0,
      draft: true,
      locale,
      // Read only what this language holds, so English fallbacks count as empty.
      fallbackLocale: false,
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
      const data = Object.fromEntries(
        Object.entries(day.data).filter(([field]) => empty(doc[field])),
      );
      if (Object.keys(data).length < Object.keys(day.data).length) {
        skipped.push(`${entry.slug} ${day.day}`);
      }
      if (Object.keys(data).length === 0) continue;
      // The title is required in every language; keep the editor's one if it is set.
      if (empty(doc.title) && !data.title) continue;
      await payload.update({
        collection: "itinerary-days",
        context: { seedCatalog: true },
        data: { ...data, _status: "published" } as never,
        draft: false,
        id: doc.id,
        locale,
        overrideAccess: true,
        req,
      });
    }
  }
  return skipped;
}
