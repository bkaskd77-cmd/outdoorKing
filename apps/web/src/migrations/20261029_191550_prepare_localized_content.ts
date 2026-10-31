import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Adds the per-language columns and tables for the content fields made translatable in
 * October 2026, without removing anything. It runs before the first content migration
 * so that, on an empty database, every later migration finds the columns the current
 * CMS config writes to. 20261031_130000_localize_content moves existing text across
 * and drops the old columns.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload"."permits_locales" (
  	"name" varchar,
  	"authority" varchar,
  	"processing_notes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
    CREATE TABLE IF NOT EXISTS "payload"."_permits_v_locales" (
  	"version_name" varchar,
  	"version_authority" varchar,
  	"version_processing_notes" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
    CREATE TABLE IF NOT EXISTS "payload"."seasons_locales" (
  	"name" varchar,
  	"weather_summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
    CREATE TABLE IF NOT EXISTS "payload"."_seasons_v_locales" (
  	"version_name" varchar,
  	"version_weather_summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
    ALTER TABLE "payload"."pages_locales" ADD COLUMN IF NOT EXISTS "title" varchar;
    ALTER TABLE "payload"."pages_locales" ADD COLUMN IF NOT EXISTS "body" varchar;
    ALTER TABLE "payload"."_pages_v_locales" ADD COLUMN IF NOT EXISTS "version_title" varchar;
    ALTER TABLE "payload"."_pages_v_locales" ADD COLUMN IF NOT EXISTS "version_body" varchar;
    ALTER TABLE "payload"."faqs_locales" ADD COLUMN IF NOT EXISTS "question" varchar;
    ALTER TABLE "payload"."faqs_locales" ADD COLUMN IF NOT EXISTS "answer" varchar;
    ALTER TABLE "payload"."_faqs_v_locales" ADD COLUMN IF NOT EXISTS "version_question" varchar;
    ALTER TABLE "payload"."_faqs_v_locales" ADD COLUMN IF NOT EXISTS "version_answer" varchar;
    ALTER TABLE "payload"."regions_locales" ADD COLUMN IF NOT EXISTS "summary" varchar;
    ALTER TABLE "payload"."regions_locales" ADD COLUMN IF NOT EXISTS "body" varchar;
    ALTER TABLE "payload"."regions_locales" ADD COLUMN IF NOT EXISTS "access" varchar;
    ALTER TABLE "payload"."_regions_v_locales" ADD COLUMN IF NOT EXISTS "version_summary" varchar;
    ALTER TABLE "payload"."_regions_v_locales" ADD COLUMN IF NOT EXISTS "version_body" varchar;
    ALTER TABLE "payload"."_regions_v_locales" ADD COLUMN IF NOT EXISTS "version_access" varchar;
    ALTER TABLE "payload"."trips_highlights" ADD COLUMN IF NOT EXISTS "_locale" "payload"."_locales";
    ALTER TABLE "payload"."trips_inclusions" ADD COLUMN IF NOT EXISTS "_locale" "payload"."_locales";
    ALTER TABLE "payload"."trips_exclusions" ADD COLUMN IF NOT EXISTS "_locale" "payload"."_locales";
    ALTER TABLE "payload"."trips_locales" ADD COLUMN IF NOT EXISTS "max_altitude_point" varchar;
    ALTER TABLE "payload"."trips_locales" ADD COLUMN IF NOT EXISTS "start_point" varchar;
    ALTER TABLE "payload"."trips_locales" ADD COLUMN IF NOT EXISTS "end_point" varchar;
    ALTER TABLE "payload"."trips_locales" ADD COLUMN IF NOT EXISTS "acclimatization_notes" varchar;
    ALTER TABLE "payload"."trips_locales" ADD COLUMN IF NOT EXISTS "contingency" varchar;
    ALTER TABLE "payload"."_trips_v_version_highlights" ADD COLUMN IF NOT EXISTS "_locale" "payload"."_locales";
    ALTER TABLE "payload"."_trips_v_version_inclusions" ADD COLUMN IF NOT EXISTS "_locale" "payload"."_locales";
    ALTER TABLE "payload"."_trips_v_version_exclusions" ADD COLUMN IF NOT EXISTS "_locale" "payload"."_locales";
    ALTER TABLE "payload"."_trips_v_locales" ADD COLUMN IF NOT EXISTS "version_max_altitude_point" varchar;
    ALTER TABLE "payload"."_trips_v_locales" ADD COLUMN IF NOT EXISTS "version_start_point" varchar;
    ALTER TABLE "payload"."_trips_v_locales" ADD COLUMN IF NOT EXISTS "version_end_point" varchar;
    ALTER TABLE "payload"."_trips_v_locales" ADD COLUMN IF NOT EXISTS "version_acclimatization_notes" varchar;
    ALTER TABLE "payload"."_trips_v_locales" ADD COLUMN IF NOT EXISTS "version_contingency" varchar;
    ALTER TABLE "payload"."itinerary_days_locales" ADD COLUMN IF NOT EXISTS "from_place" varchar;
    ALTER TABLE "payload"."itinerary_days_locales" ADD COLUMN IF NOT EXISTS "to_place" varchar;
    ALTER TABLE "payload"."_itinerary_days_v_locales" ADD COLUMN IF NOT EXISTS "version_from_place" varchar;
    ALTER TABLE "payload"."_itinerary_days_v_locales" ADD COLUMN IF NOT EXISTS "version_to_place" varchar;
    ALTER TABLE "payload"."peaks_locales" ADD COLUMN IF NOT EXISTS "name" varchar;
    ALTER TABLE "payload"."peaks_locales" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "payload"."_peaks_v_locales" ADD COLUMN IF NOT EXISTS "version_name" varchar;
    ALTER TABLE "payload"."_peaks_v_locales" ADD COLUMN IF NOT EXISTS "version_description" varchar;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'permits_locales_parent_id_fk') THEN
        ALTER TABLE "payload"."permits_locales" ADD CONSTRAINT "permits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."permits"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_permits_v_locales_parent_id_fk') THEN
        ALTER TABLE "payload"."_permits_v_locales" ADD CONSTRAINT "_permits_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_permits_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'seasons_locales_parent_id_fk') THEN
        ALTER TABLE "payload"."seasons_locales" ADD CONSTRAINT "seasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."seasons"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = '_seasons_v_locales_parent_id_fk') THEN
        ALTER TABLE "payload"."_seasons_v_locales" ADD CONSTRAINT "_seasons_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_seasons_v"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;
    CREATE UNIQUE INDEX IF NOT EXISTS "permits_locales_locale_parent_id_unique" ON "payload"."permits_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "permits_locales_parent_id_idx" ON "payload"."permits_locales" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_permits_v_locales_locale_parent_id_unique" ON "payload"."_permits_v_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "_permits_v_locales_parent_id_idx" ON "payload"."_permits_v_locales" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "seasons_locales_locale_parent_id_unique" ON "payload"."seasons_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "seasons_locales_parent_id_idx" ON "payload"."seasons_locales" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_seasons_v_locales_locale_parent_id_unique" ON "payload"."_seasons_v_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "_seasons_v_locales_parent_id_idx" ON "payload"."_seasons_v_locales" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "trips_highlights_locale_idx" ON "payload"."trips_highlights" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "trips_inclusions_locale_idx" ON "payload"."trips_inclusions" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "trips_exclusions_locale_idx" ON "payload"."trips_exclusions" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "_trips_v_version_highlights_locale_idx" ON "payload"."_trips_v_version_highlights" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "_trips_v_version_inclusions_locale_idx" ON "payload"."_trips_v_version_inclusions" USING btree ("_locale");
    CREATE INDEX IF NOT EXISTS "_trips_v_version_exclusions_locale_idx" ON "payload"."_trips_v_version_exclusions" USING btree ("_locale");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "payload"."permits_locales" CASCADE;
    DROP TABLE IF EXISTS "payload"."_permits_v_locales" CASCADE;
    DROP TABLE IF EXISTS "payload"."seasons_locales" CASCADE;
    DROP TABLE IF EXISTS "payload"."_seasons_v_locales" CASCADE;
    DROP INDEX IF EXISTS "payload"."trips_highlights_locale_idx";
    DROP INDEX IF EXISTS "payload"."trips_inclusions_locale_idx";
    DROP INDEX IF EXISTS "payload"."trips_exclusions_locale_idx";
    DROP INDEX IF EXISTS "payload"."_trips_v_version_highlights_locale_idx";
    DROP INDEX IF EXISTS "payload"."_trips_v_version_inclusions_locale_idx";
    DROP INDEX IF EXISTS "payload"."_trips_v_version_exclusions_locale_idx";
    ALTER TABLE "payload"."pages_locales" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "payload"."pages_locales" DROP COLUMN IF EXISTS "body";
    ALTER TABLE "payload"."_pages_v_locales" DROP COLUMN IF EXISTS "version_title";
    ALTER TABLE "payload"."_pages_v_locales" DROP COLUMN IF EXISTS "version_body";
    ALTER TABLE "payload"."faqs_locales" DROP COLUMN IF EXISTS "question";
    ALTER TABLE "payload"."faqs_locales" DROP COLUMN IF EXISTS "answer";
    ALTER TABLE "payload"."_faqs_v_locales" DROP COLUMN IF EXISTS "version_question";
    ALTER TABLE "payload"."_faqs_v_locales" DROP COLUMN IF EXISTS "version_answer";
    ALTER TABLE "payload"."regions_locales" DROP COLUMN IF EXISTS "summary";
    ALTER TABLE "payload"."regions_locales" DROP COLUMN IF EXISTS "body";
    ALTER TABLE "payload"."regions_locales" DROP COLUMN IF EXISTS "access";
    ALTER TABLE "payload"."_regions_v_locales" DROP COLUMN IF EXISTS "version_summary";
    ALTER TABLE "payload"."_regions_v_locales" DROP COLUMN IF EXISTS "version_body";
    ALTER TABLE "payload"."_regions_v_locales" DROP COLUMN IF EXISTS "version_access";
    ALTER TABLE "payload"."trips_highlights" DROP COLUMN IF EXISTS "_locale";
    ALTER TABLE "payload"."trips_inclusions" DROP COLUMN IF EXISTS "_locale";
    ALTER TABLE "payload"."trips_exclusions" DROP COLUMN IF EXISTS "_locale";
    ALTER TABLE "payload"."trips_locales" DROP COLUMN IF EXISTS "max_altitude_point";
    ALTER TABLE "payload"."trips_locales" DROP COLUMN IF EXISTS "start_point";
    ALTER TABLE "payload"."trips_locales" DROP COLUMN IF EXISTS "end_point";
    ALTER TABLE "payload"."trips_locales" DROP COLUMN IF EXISTS "acclimatization_notes";
    ALTER TABLE "payload"."trips_locales" DROP COLUMN IF EXISTS "contingency";
    ALTER TABLE "payload"."_trips_v_version_highlights" DROP COLUMN IF EXISTS "_locale";
    ALTER TABLE "payload"."_trips_v_version_inclusions" DROP COLUMN IF EXISTS "_locale";
    ALTER TABLE "payload"."_trips_v_version_exclusions" DROP COLUMN IF EXISTS "_locale";
    ALTER TABLE "payload"."_trips_v_locales" DROP COLUMN IF EXISTS "version_max_altitude_point";
    ALTER TABLE "payload"."_trips_v_locales" DROP COLUMN IF EXISTS "version_start_point";
    ALTER TABLE "payload"."_trips_v_locales" DROP COLUMN IF EXISTS "version_end_point";
    ALTER TABLE "payload"."_trips_v_locales" DROP COLUMN IF EXISTS "version_acclimatization_notes";
    ALTER TABLE "payload"."_trips_v_locales" DROP COLUMN IF EXISTS "version_contingency";
    ALTER TABLE "payload"."itinerary_days_locales" DROP COLUMN IF EXISTS "from_place";
    ALTER TABLE "payload"."itinerary_days_locales" DROP COLUMN IF EXISTS "to_place";
    ALTER TABLE "payload"."_itinerary_days_v_locales" DROP COLUMN IF EXISTS "version_from_place";
    ALTER TABLE "payload"."_itinerary_days_v_locales" DROP COLUMN IF EXISTS "version_to_place";
    ALTER TABLE "payload"."peaks_locales" DROP COLUMN IF EXISTS "name";
    ALTER TABLE "payload"."peaks_locales" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "payload"."_peaks_v_locales" DROP COLUMN IF EXISTS "version_name";
    ALTER TABLE "payload"."_peaks_v_locales" DROP COLUMN IF EXISTS "version_description";
  `)
}
