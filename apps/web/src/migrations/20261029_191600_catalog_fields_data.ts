import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-postgres";

import { codeCatalog } from "../content/catalog";

type Id = number | string;

/**
 * Backfills the fields added in 20261029_191500_catalog_fields from the code catalog
 * the CMS was seeded from: Lukla flag on trips, and day labels for itinerary blocks
 * such as "9-12" that the numeric dayNumber could not hold. Written with SQL because
 * re-saving published trips would re-run publish rules the original seed skipped.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  const trips = await payload.find({
    collection: "trips",
    depth: 0,
    draft: true,
    locale: "en",
    overrideAccess: true,
    pagination: false,
    req,
    select: { slug: true },
  });
  if (trips.docs.length === 0) return;

  const tripIds = new Map<string, Id>(
    trips.docs.flatMap((doc) =>
      typeof doc.slug === "string" ? [[doc.slug, doc.id] as const] : [],
    ),
  );
  const codeTrips = codeCatalog.getTrips();

  const luklaIds = codeTrips.flatMap((trip) => {
    const id = trip.usesLukla ? tripIds.get(trip.slug) : undefined;
    return id == null ? [] : [Number(id)];
  });
  for (const id of luklaIds) {
    await db.execute(sql`UPDATE "payload"."trips" SET "uses_lukla" = true WHERE "id" = ${id}`);
    await db.execute(
      sql`UPDATE "payload"."_trips_v" SET "version_uses_lukla" = true WHERE "parent_id" = ${id}`,
    );
  }

  for (const trip of codeTrips) {
    const tripId = tripIds.get(trip.slug);
    if (tripId == null) continue;
    const blocks = trip.days.filter((day) => day.dayLabel);
    if (blocks.length === 0) continue;

    const existing = await payload.find({
      collection: "itinerary-days",
      depth: 0,
      draft: true,
      overrideAccess: true,
      pagination: false,
      req,
      where: { trip: { equals: tripId } },
    });

    for (const day of blocks) {
      if (existing.docs.some((doc) => doc.dayLabel === day.dayLabel)) continue;
      const match = existing.docs.find(
        (doc) => Number(doc.dayNumber) === day.dayNumber && !doc.dayLabel,
      );

      if (match) {
        const id = Number(match.id);
        await db.execute(
          sql`UPDATE "payload"."itinerary_days" SET "day_label" = ${day.dayLabel} WHERE "id" = ${id}`,
        );
        await db.execute(
          sql`UPDATE "payload"."_itinerary_days_v" SET "version_day_label" = ${day.dayLabel} WHERE "parent_id" = ${id}`,
        );
        continue;
      }

      // A block with no number at all (for example an alternative approach) was
      // dropped by the original seed; restore it after the last numbered day.
      await payload.create({
        collection: "itinerary-days",
        context: { seedCatalog: true },
        data: {
          trip: Number(tripId),
          dayNumber: day.dayNumber,
          dayLabel: day.dayLabel,
          title: day.title,
          description: day.description,
          fromPlace: day.fromPlace,
          toPlace: day.toPlace,
          startAltitudeM: day.startAltitudeM,
          highPointM: day.highPointM,
          sleepAltitudeM: day.sleepAltitudeM,
          walkingHours: day.walkingHours,
          dayType: day.dayType,
          _status: "published",
        } as never,
        draft: false,
        locale: "en",
        overrideAccess: true,
        req,
      });
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`UPDATE "payload"."trips" SET "uses_lukla" = false`);
  await db.execute(sql`UPDATE "payload"."_trips_v" SET "version_uses_lukla" = false`);
  await db.execute(sql`UPDATE "payload"."itinerary_days" SET "day_label" = NULL`);
  await db.execute(
    sql`UPDATE "payload"."_itinerary_days_v" SET "version_day_label" = NULL`,
  );
}
