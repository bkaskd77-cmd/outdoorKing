import { sql, type MigrateDownArgs, type MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Makes the remaining content fields translatable: pages, FAQs, regions, peaks, permits,
 * seasons, trip notes and lists, and itinerary place names. The per-language columns
 * are added by 20261029_191550_prepare_localized_content; this copies every existing
 * value into them as English (keeping any value already there) and then drops the old
 * single-language columns. Other languages start empty and fall back to English.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "payload"."pages_locales" ("_locale", "_parent_id", "title", "body") SELECT 'en', m."id", m."title", m."body" FROM "payload"."pages" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "title" = COALESCE("pages_locales"."title", EXCLUDED."title"), "body" = COALESCE("pages_locales"."body", EXCLUDED."body");
    INSERT INTO "payload"."_pages_v_locales" ("_locale", "_parent_id", "version_title", "version_body") SELECT 'en', m."id", m."version_title", m."version_body" FROM "payload"."_pages_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_title" = COALESCE("_pages_v_locales"."version_title", EXCLUDED."version_title"), "version_body" = COALESCE("_pages_v_locales"."version_body", EXCLUDED."version_body");
    INSERT INTO "payload"."faqs_locales" ("_locale", "_parent_id", "question", "answer") SELECT 'en', m."id", m."question", m."answer" FROM "payload"."faqs" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "question" = COALESCE("faqs_locales"."question", EXCLUDED."question"), "answer" = COALESCE("faqs_locales"."answer", EXCLUDED."answer");
    INSERT INTO "payload"."_faqs_v_locales" ("_locale", "_parent_id", "version_question", "version_answer") SELECT 'en', m."id", m."version_question", m."version_answer" FROM "payload"."_faqs_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_question" = COALESCE("_faqs_v_locales"."version_question", EXCLUDED."version_question"), "version_answer" = COALESCE("_faqs_v_locales"."version_answer", EXCLUDED."version_answer");
    INSERT INTO "payload"."regions_locales" ("_locale", "_parent_id", "summary", "body", "access") SELECT 'en', m."id", m."summary", m."body", m."access" FROM "payload"."regions" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "summary" = COALESCE("regions_locales"."summary", EXCLUDED."summary"), "body" = COALESCE("regions_locales"."body", EXCLUDED."body"), "access" = COALESCE("regions_locales"."access", EXCLUDED."access");
    INSERT INTO "payload"."_regions_v_locales" ("_locale", "_parent_id", "version_summary", "version_body", "version_access") SELECT 'en', m."id", m."version_summary", m."version_body", m."version_access" FROM "payload"."_regions_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_summary" = COALESCE("_regions_v_locales"."version_summary", EXCLUDED."version_summary"), "version_body" = COALESCE("_regions_v_locales"."version_body", EXCLUDED."version_body"), "version_access" = COALESCE("_regions_v_locales"."version_access", EXCLUDED."version_access");
    INSERT INTO "payload"."trips_locales" ("_locale", "_parent_id", "max_altitude_point", "start_point", "end_point", "acclimatization_notes", "contingency") SELECT 'en', m."id", m."max_altitude_point", m."start_point", m."end_point", m."acclimatization_notes", m."contingency" FROM "payload"."trips" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "max_altitude_point" = COALESCE("trips_locales"."max_altitude_point", EXCLUDED."max_altitude_point"), "start_point" = COALESCE("trips_locales"."start_point", EXCLUDED."start_point"), "end_point" = COALESCE("trips_locales"."end_point", EXCLUDED."end_point"), "acclimatization_notes" = COALESCE("trips_locales"."acclimatization_notes", EXCLUDED."acclimatization_notes"), "contingency" = COALESCE("trips_locales"."contingency", EXCLUDED."contingency");
    INSERT INTO "payload"."_trips_v_locales" ("_locale", "_parent_id", "version_max_altitude_point", "version_start_point", "version_end_point", "version_acclimatization_notes", "version_contingency") SELECT 'en', m."id", m."version_max_altitude_point", m."version_start_point", m."version_end_point", m."version_acclimatization_notes", m."version_contingency" FROM "payload"."_trips_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_max_altitude_point" = COALESCE("_trips_v_locales"."version_max_altitude_point", EXCLUDED."version_max_altitude_point"), "version_start_point" = COALESCE("_trips_v_locales"."version_start_point", EXCLUDED."version_start_point"), "version_end_point" = COALESCE("_trips_v_locales"."version_end_point", EXCLUDED."version_end_point"), "version_acclimatization_notes" = COALESCE("_trips_v_locales"."version_acclimatization_notes", EXCLUDED."version_acclimatization_notes"), "version_contingency" = COALESCE("_trips_v_locales"."version_contingency", EXCLUDED."version_contingency");
    INSERT INTO "payload"."itinerary_days_locales" ("_locale", "_parent_id", "from_place", "to_place") SELECT 'en', m."id", m."from_place", m."to_place" FROM "payload"."itinerary_days" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "from_place" = COALESCE("itinerary_days_locales"."from_place", EXCLUDED."from_place"), "to_place" = COALESCE("itinerary_days_locales"."to_place", EXCLUDED."to_place");
    INSERT INTO "payload"."_itinerary_days_v_locales" ("_locale", "_parent_id", "version_from_place", "version_to_place") SELECT 'en', m."id", m."version_from_place", m."version_to_place" FROM "payload"."_itinerary_days_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_from_place" = COALESCE("_itinerary_days_v_locales"."version_from_place", EXCLUDED."version_from_place"), "version_to_place" = COALESCE("_itinerary_days_v_locales"."version_to_place", EXCLUDED."version_to_place");
    INSERT INTO "payload"."peaks_locales" ("_locale", "_parent_id", "name", "description") SELECT 'en', m."id", m."name", m."description" FROM "payload"."peaks" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "name" = COALESCE("peaks_locales"."name", EXCLUDED."name"), "description" = COALESCE("peaks_locales"."description", EXCLUDED."description");
    INSERT INTO "payload"."_peaks_v_locales" ("_locale", "_parent_id", "version_name", "version_description") SELECT 'en', m."id", m."version_name", m."version_description" FROM "payload"."_peaks_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_name" = COALESCE("_peaks_v_locales"."version_name", EXCLUDED."version_name"), "version_description" = COALESCE("_peaks_v_locales"."version_description", EXCLUDED."version_description");
    INSERT INTO "payload"."permits_locales" ("_locale", "_parent_id", "name", "authority", "processing_notes") SELECT 'en', m."id", m."name", m."authority", m."processing_notes" FROM "payload"."permits" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "name" = COALESCE("permits_locales"."name", EXCLUDED."name"), "authority" = COALESCE("permits_locales"."authority", EXCLUDED."authority"), "processing_notes" = COALESCE("permits_locales"."processing_notes", EXCLUDED."processing_notes");
    INSERT INTO "payload"."_permits_v_locales" ("_locale", "_parent_id", "version_name", "version_authority", "version_processing_notes") SELECT 'en', m."id", m."version_name", m."version_authority", m."version_processing_notes" FROM "payload"."_permits_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_name" = COALESCE("_permits_v_locales"."version_name", EXCLUDED."version_name"), "version_authority" = COALESCE("_permits_v_locales"."version_authority", EXCLUDED."version_authority"), "version_processing_notes" = COALESCE("_permits_v_locales"."version_processing_notes", EXCLUDED."version_processing_notes");
    INSERT INTO "payload"."seasons_locales" ("_locale", "_parent_id", "name", "weather_summary") SELECT 'en', m."id", m."name", m."weather_summary" FROM "payload"."seasons" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "name" = COALESCE("seasons_locales"."name", EXCLUDED."name"), "weather_summary" = COALESCE("seasons_locales"."weather_summary", EXCLUDED."weather_summary");
    INSERT INTO "payload"."_seasons_v_locales" ("_locale", "_parent_id", "version_name", "version_weather_summary") SELECT 'en', m."id", m."version_name", m."version_weather_summary" FROM "payload"."_seasons_v" m ON CONFLICT ("_locale", "_parent_id") DO UPDATE SET "version_name" = COALESCE("_seasons_v_locales"."version_name", EXCLUDED."version_name"), "version_weather_summary" = COALESCE("_seasons_v_locales"."version_weather_summary", EXCLUDED."version_weather_summary");
    UPDATE "payload"."trips_highlights" SET "_locale" = 'en' WHERE "_locale" IS NULL;
    UPDATE "payload"."trips_inclusions" SET "_locale" = 'en' WHERE "_locale" IS NULL;
    UPDATE "payload"."trips_exclusions" SET "_locale" = 'en' WHERE "_locale" IS NULL;
    UPDATE "payload"."_trips_v_version_highlights" SET "_locale" = 'en' WHERE "_locale" IS NULL;
    UPDATE "payload"."_trips_v_version_inclusions" SET "_locale" = 'en' WHERE "_locale" IS NULL;
    UPDATE "payload"."_trips_v_version_exclusions" SET "_locale" = 'en' WHERE "_locale" IS NULL;
    ALTER TABLE "payload"."trips_highlights" ALTER COLUMN "_locale" SET NOT NULL;
    ALTER TABLE "payload"."trips_inclusions" ALTER COLUMN "_locale" SET NOT NULL;
    ALTER TABLE "payload"."trips_exclusions" ALTER COLUMN "_locale" SET NOT NULL;
    ALTER TABLE "payload"."_trips_v_version_highlights" ALTER COLUMN "_locale" SET NOT NULL;
    ALTER TABLE "payload"."_trips_v_version_inclusions" ALTER COLUMN "_locale" SET NOT NULL;
    ALTER TABLE "payload"."_trips_v_version_exclusions" ALTER COLUMN "_locale" SET NOT NULL;
    ALTER TABLE "payload"."pages" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "payload"."pages" DROP COLUMN IF EXISTS "body";
    ALTER TABLE "payload"."_pages_v" DROP COLUMN IF EXISTS "version_title";
    ALTER TABLE "payload"."_pages_v" DROP COLUMN IF EXISTS "version_body";
    ALTER TABLE "payload"."faqs" DROP COLUMN IF EXISTS "question";
    ALTER TABLE "payload"."faqs" DROP COLUMN IF EXISTS "answer";
    ALTER TABLE "payload"."_faqs_v" DROP COLUMN IF EXISTS "version_question";
    ALTER TABLE "payload"."_faqs_v" DROP COLUMN IF EXISTS "version_answer";
    ALTER TABLE "payload"."regions" DROP COLUMN IF EXISTS "summary";
    ALTER TABLE "payload"."regions" DROP COLUMN IF EXISTS "body";
    ALTER TABLE "payload"."regions" DROP COLUMN IF EXISTS "access";
    ALTER TABLE "payload"."_regions_v" DROP COLUMN IF EXISTS "version_summary";
    ALTER TABLE "payload"."_regions_v" DROP COLUMN IF EXISTS "version_body";
    ALTER TABLE "payload"."_regions_v" DROP COLUMN IF EXISTS "version_access";
    ALTER TABLE "payload"."trips" DROP COLUMN IF EXISTS "max_altitude_point";
    ALTER TABLE "payload"."trips" DROP COLUMN IF EXISTS "start_point";
    ALTER TABLE "payload"."trips" DROP COLUMN IF EXISTS "end_point";
    ALTER TABLE "payload"."trips" DROP COLUMN IF EXISTS "acclimatization_notes";
    ALTER TABLE "payload"."trips" DROP COLUMN IF EXISTS "contingency";
    ALTER TABLE "payload"."_trips_v" DROP COLUMN IF EXISTS "version_max_altitude_point";
    ALTER TABLE "payload"."_trips_v" DROP COLUMN IF EXISTS "version_start_point";
    ALTER TABLE "payload"."_trips_v" DROP COLUMN IF EXISTS "version_end_point";
    ALTER TABLE "payload"."_trips_v" DROP COLUMN IF EXISTS "version_acclimatization_notes";
    ALTER TABLE "payload"."_trips_v" DROP COLUMN IF EXISTS "version_contingency";
    ALTER TABLE "payload"."itinerary_days" DROP COLUMN IF EXISTS "from_place";
    ALTER TABLE "payload"."itinerary_days" DROP COLUMN IF EXISTS "to_place";
    ALTER TABLE "payload"."_itinerary_days_v" DROP COLUMN IF EXISTS "version_from_place";
    ALTER TABLE "payload"."_itinerary_days_v" DROP COLUMN IF EXISTS "version_to_place";
    ALTER TABLE "payload"."peaks" DROP COLUMN IF EXISTS "name";
    ALTER TABLE "payload"."peaks" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "payload"."_peaks_v" DROP COLUMN IF EXISTS "version_name";
    ALTER TABLE "payload"."_peaks_v" DROP COLUMN IF EXISTS "version_description";
    ALTER TABLE "payload"."permits" DROP COLUMN IF EXISTS "name";
    ALTER TABLE "payload"."permits" DROP COLUMN IF EXISTS "authority";
    ALTER TABLE "payload"."permits" DROP COLUMN IF EXISTS "processing_notes";
    ALTER TABLE "payload"."_permits_v" DROP COLUMN IF EXISTS "version_name";
    ALTER TABLE "payload"."_permits_v" DROP COLUMN IF EXISTS "version_authority";
    ALTER TABLE "payload"."_permits_v" DROP COLUMN IF EXISTS "version_processing_notes";
    ALTER TABLE "payload"."seasons" DROP COLUMN IF EXISTS "name";
    ALTER TABLE "payload"."seasons" DROP COLUMN IF EXISTS "weather_summary";
    ALTER TABLE "payload"."_seasons_v" DROP COLUMN IF EXISTS "version_name";
    ALTER TABLE "payload"."_seasons_v" DROP COLUMN IF EXISTS "version_weather_summary";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload"."pages" ADD COLUMN IF NOT EXISTS "title" varchar;
    ALTER TABLE "payload"."pages" ADD COLUMN IF NOT EXISTS "body" varchar;
    ALTER TABLE "payload"."_pages_v" ADD COLUMN IF NOT EXISTS "version_title" varchar;
    ALTER TABLE "payload"."_pages_v" ADD COLUMN IF NOT EXISTS "version_body" varchar;
    ALTER TABLE "payload"."faqs" ADD COLUMN IF NOT EXISTS "question" varchar;
    ALTER TABLE "payload"."faqs" ADD COLUMN IF NOT EXISTS "answer" varchar;
    ALTER TABLE "payload"."_faqs_v" ADD COLUMN IF NOT EXISTS "version_question" varchar;
    ALTER TABLE "payload"."_faqs_v" ADD COLUMN IF NOT EXISTS "version_answer" varchar;
    ALTER TABLE "payload"."regions" ADD COLUMN IF NOT EXISTS "summary" varchar;
    ALTER TABLE "payload"."regions" ADD COLUMN IF NOT EXISTS "body" varchar;
    ALTER TABLE "payload"."regions" ADD COLUMN IF NOT EXISTS "access" varchar;
    ALTER TABLE "payload"."_regions_v" ADD COLUMN IF NOT EXISTS "version_summary" varchar;
    ALTER TABLE "payload"."_regions_v" ADD COLUMN IF NOT EXISTS "version_body" varchar;
    ALTER TABLE "payload"."_regions_v" ADD COLUMN IF NOT EXISTS "version_access" varchar;
    ALTER TABLE "payload"."trips" ADD COLUMN IF NOT EXISTS "max_altitude_point" varchar;
    ALTER TABLE "payload"."trips" ADD COLUMN IF NOT EXISTS "start_point" varchar;
    ALTER TABLE "payload"."trips" ADD COLUMN IF NOT EXISTS "end_point" varchar;
    ALTER TABLE "payload"."trips" ADD COLUMN IF NOT EXISTS "acclimatization_notes" varchar;
    ALTER TABLE "payload"."trips" ADD COLUMN IF NOT EXISTS "contingency" varchar;
    ALTER TABLE "payload"."_trips_v" ADD COLUMN IF NOT EXISTS "version_max_altitude_point" varchar;
    ALTER TABLE "payload"."_trips_v" ADD COLUMN IF NOT EXISTS "version_start_point" varchar;
    ALTER TABLE "payload"."_trips_v" ADD COLUMN IF NOT EXISTS "version_end_point" varchar;
    ALTER TABLE "payload"."_trips_v" ADD COLUMN IF NOT EXISTS "version_acclimatization_notes" varchar;
    ALTER TABLE "payload"."_trips_v" ADD COLUMN IF NOT EXISTS "version_contingency" varchar;
    ALTER TABLE "payload"."itinerary_days" ADD COLUMN IF NOT EXISTS "from_place" varchar;
    ALTER TABLE "payload"."itinerary_days" ADD COLUMN IF NOT EXISTS "to_place" varchar;
    ALTER TABLE "payload"."_itinerary_days_v" ADD COLUMN IF NOT EXISTS "version_from_place" varchar;
    ALTER TABLE "payload"."_itinerary_days_v" ADD COLUMN IF NOT EXISTS "version_to_place" varchar;
    ALTER TABLE "payload"."peaks" ADD COLUMN IF NOT EXISTS "name" varchar;
    ALTER TABLE "payload"."peaks" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "payload"."_peaks_v" ADD COLUMN IF NOT EXISTS "version_name" varchar;
    ALTER TABLE "payload"."_peaks_v" ADD COLUMN IF NOT EXISTS "version_description" varchar;
    ALTER TABLE "payload"."permits" ADD COLUMN IF NOT EXISTS "name" varchar;
    ALTER TABLE "payload"."permits" ADD COLUMN IF NOT EXISTS "authority" varchar;
    ALTER TABLE "payload"."permits" ADD COLUMN IF NOT EXISTS "processing_notes" varchar;
    ALTER TABLE "payload"."_permits_v" ADD COLUMN IF NOT EXISTS "version_name" varchar;
    ALTER TABLE "payload"."_permits_v" ADD COLUMN IF NOT EXISTS "version_authority" varchar;
    ALTER TABLE "payload"."_permits_v" ADD COLUMN IF NOT EXISTS "version_processing_notes" varchar;
    ALTER TABLE "payload"."seasons" ADD COLUMN IF NOT EXISTS "name" varchar;
    ALTER TABLE "payload"."seasons" ADD COLUMN IF NOT EXISTS "weather_summary" varchar;
    ALTER TABLE "payload"."_seasons_v" ADD COLUMN IF NOT EXISTS "version_name" varchar;
    ALTER TABLE "payload"."_seasons_v" ADD COLUMN IF NOT EXISTS "version_weather_summary" varchar;
    UPDATE "payload"."pages" m SET "title" = l."title", "body" = l."body" FROM "payload"."pages_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_pages_v" m SET "version_title" = l."version_title", "version_body" = l."version_body" FROM "payload"."_pages_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."faqs" m SET "question" = l."question", "answer" = l."answer" FROM "payload"."faqs_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_faqs_v" m SET "version_question" = l."version_question", "version_answer" = l."version_answer" FROM "payload"."_faqs_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."regions" m SET "summary" = l."summary", "body" = l."body", "access" = l."access" FROM "payload"."regions_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_regions_v" m SET "version_summary" = l."version_summary", "version_body" = l."version_body", "version_access" = l."version_access" FROM "payload"."_regions_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."trips" m SET "max_altitude_point" = l."max_altitude_point", "start_point" = l."start_point", "end_point" = l."end_point", "acclimatization_notes" = l."acclimatization_notes", "contingency" = l."contingency" FROM "payload"."trips_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_trips_v" m SET "version_max_altitude_point" = l."version_max_altitude_point", "version_start_point" = l."version_start_point", "version_end_point" = l."version_end_point", "version_acclimatization_notes" = l."version_acclimatization_notes", "version_contingency" = l."version_contingency" FROM "payload"."_trips_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."itinerary_days" m SET "from_place" = l."from_place", "to_place" = l."to_place" FROM "payload"."itinerary_days_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_itinerary_days_v" m SET "version_from_place" = l."version_from_place", "version_to_place" = l."version_to_place" FROM "payload"."_itinerary_days_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."peaks" m SET "name" = l."name", "description" = l."description" FROM "payload"."peaks_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_peaks_v" m SET "version_name" = l."version_name", "version_description" = l."version_description" FROM "payload"."_peaks_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."permits" m SET "name" = l."name", "authority" = l."authority", "processing_notes" = l."processing_notes" FROM "payload"."permits_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_permits_v" m SET "version_name" = l."version_name", "version_authority" = l."version_authority", "version_processing_notes" = l."version_processing_notes" FROM "payload"."_permits_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."seasons" m SET "name" = l."name", "weather_summary" = l."weather_summary" FROM "payload"."seasons_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    UPDATE "payload"."_seasons_v" m SET "version_name" = l."version_name", "version_weather_summary" = l."version_weather_summary" FROM "payload"."_seasons_v_locales" l WHERE l."_parent_id" = m."id" AND l."_locale" = 'en';
    DELETE FROM "payload"."trips_highlights" WHERE "_locale" <> 'en';
    DELETE FROM "payload"."trips_inclusions" WHERE "_locale" <> 'en';
    DELETE FROM "payload"."trips_exclusions" WHERE "_locale" <> 'en';
    DELETE FROM "payload"."_trips_v_version_highlights" WHERE "_locale" <> 'en';
    DELETE FROM "payload"."_trips_v_version_inclusions" WHERE "_locale" <> 'en';
    DELETE FROM "payload"."_trips_v_version_exclusions" WHERE "_locale" <> 'en';
    ALTER TABLE "payload"."trips_highlights" ALTER COLUMN "_locale" DROP NOT NULL;
    ALTER TABLE "payload"."trips_inclusions" ALTER COLUMN "_locale" DROP NOT NULL;
    ALTER TABLE "payload"."trips_exclusions" ALTER COLUMN "_locale" DROP NOT NULL;
    ALTER TABLE "payload"."_trips_v_version_highlights" ALTER COLUMN "_locale" DROP NOT NULL;
    ALTER TABLE "payload"."_trips_v_version_inclusions" ALTER COLUMN "_locale" DROP NOT NULL;
    ALTER TABLE "payload"."_trips_v_version_exclusions" ALTER COLUMN "_locale" DROP NOT NULL;
  `)
}
