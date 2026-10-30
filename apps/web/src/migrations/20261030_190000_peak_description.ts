import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."peaks" ADD COLUMN "description" varchar;
  ALTER TABLE "payload"."_peaks_v" ADD COLUMN "version_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."peaks" DROP COLUMN "description";
  ALTER TABLE "payload"."_peaks_v" DROP COLUMN "version_description";`)
}
