import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."trips" ADD COLUMN "uses_lukla" boolean DEFAULT false;
  ALTER TABLE "payload"."_trips_v" ADD COLUMN "version_uses_lukla" boolean DEFAULT false;
  ALTER TABLE "payload"."itinerary_days" ADD COLUMN "day_label" varchar;
  ALTER TABLE "payload"."_itinerary_days_v" ADD COLUMN "version_day_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."trips" DROP COLUMN "uses_lukla";
  ALTER TABLE "payload"."_trips_v" DROP COLUMN "version_uses_lukla";
  ALTER TABLE "payload"."itinerary_days" DROP COLUMN "day_label";
  ALTER TABLE "payload"."_itinerary_days_v" DROP COLUMN "version_day_label";`)
}
