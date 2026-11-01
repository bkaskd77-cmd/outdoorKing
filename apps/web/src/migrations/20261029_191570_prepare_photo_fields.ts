import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Adds the trip main photo column and the activity gallery table (November 2026). It
 * runs before the first content migration so that, on an empty database, every later
 * migration finds the columns the current CMS config writes to.
 * 20261101_153307_photo_fields adds the foreign keys and indexes.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload"."activities_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
    CREATE TABLE IF NOT EXISTS "payload"."_activities_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
    ALTER TABLE "payload"."trips" ADD COLUMN IF NOT EXISTS "hero_media_id" integer;
    ALTER TABLE "payload"."_trips_v" ADD COLUMN IF NOT EXISTS "version_hero_media_id" integer;`)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // 20261101_153307_photo_fields removes these columns and tables.
}
