import { sql } from "@payloadcms/db-postgres";
import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE SCHEMA IF NOT EXISTS "payload";
  CREATE TYPE "payload"."_locales" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_users_role" AS ENUM('content_editor', 'sales', 'ops', 'finance', 'admin', 'super_admin', 'ai_agent');
  CREATE TYPE "payload"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__pages_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_faqs_category" AS ENUM('permits', 'insurance', 'safety', 'altitude', 'payments', 'booking', 'packing');
  CREATE TYPE "payload"."enum_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__faqs_v_version_category" AS ENUM('permits', 'insurance', 'safety', 'altitude', 'payments', 'booking', 'packing');
  CREATE TYPE "payload"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__faqs_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_activities_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__activities_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__activities_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_regions_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__regions_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__regions_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_trips_group_type" AS ENUM('private', 'family', 'small-group-private');
  CREATE TYPE "payload"."enum_trips_difficulty" AS ENUM('easy', 'moderate', 'challenging', 'strenuous', 'technical');
  CREATE TYPE "payload"."enum_trips_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__trips_v_version_group_type" AS ENUM('private', 'family', 'small-group-private');
  CREATE TYPE "payload"."enum__trips_v_version_difficulty" AS ENUM('easy', 'moderate', 'challenging', 'strenuous', 'technical');
  CREATE TYPE "payload"."enum__trips_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__trips_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_itinerary_days_day_type" AS ENUM('trek', 'rest-acclimatization', 'summit', 'travel', 'flight', 'contingency', 'city');
  CREATE TYPE "payload"."enum_itinerary_days_accommodation" AS ENUM('teahouse', 'lodge', 'tent', 'hotel');
  CREATE TYPE "payload"."enum_itinerary_days_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__itinerary_days_v_version_day_type" AS ENUM('trek', 'rest-acclimatization', 'summit', 'travel', 'flight', 'contingency', 'city');
  CREATE TYPE "payload"."enum__itinerary_days_v_version_accommodation" AS ENUM('teahouse', 'lodge', 'tent', 'hotel');
  CREATE TYPE "payload"."enum__itinerary_days_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__itinerary_days_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_peaks_classification" AS ENUM('nma-trekking-peak-group-a', 'nma-trekking-peak-group-b', 'expedition-peak', 'none');
  CREATE TYPE "payload"."enum_peaks_permit_authority" AS ENUM('NMA', 'DoT (Department of Tourism)');
  CREATE TYPE "payload"."enum_peaks_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__peaks_v_version_classification" AS ENUM('nma-trekking-peak-group-a', 'nma-trekking-peak-group-b', 'expedition-peak', 'none');
  CREATE TYPE "payload"."enum__peaks_v_version_permit_authority" AS ENUM('NMA', 'DoT (Department of Tourism)');
  CREATE TYPE "payload"."enum__peaks_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__peaks_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_permits_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__permits_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__permits_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_seasons_months" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "payload"."enum_seasons_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__seasons_v_version_months" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
  CREATE TYPE "payload"."enum__seasons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__seasons_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__posts_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_team_members_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__team_members_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__team_members_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_guides_license_type" AS ENUM('trekking', 'mountaineering', 'IFMGA');
  CREATE TYPE "payload"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__guides_v_version_license_type" AS ENUM('trekking', 'mountaineering', 'IFMGA');
  CREATE TYPE "payload"."enum__guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__guides_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_reviews_source" AS ENUM('direct', 'tripadvisor', 'google', 'trustpilot');
  CREATE TYPE "payload"."enum_reviews_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__reviews_v_version_source" AS ENUM('direct', 'tripadvisor', 'google', 'trustpilot');
  CREATE TYPE "payload"."enum__reviews_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "payload"."enum__reviews_v_published_locale" AS ENUM('en', 'de', 'fr', 'zh-Hans');
  CREATE TYPE "payload"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TABLE "payload"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"name" varchar,
  	"role" "payload"."enum_users_role" DEFAULT 'content_editor',
  	"better_auth_user_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"license" varchar,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload"."pages_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"path" varchar,
  	"body" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"seo_og_image_id" integer,
  	"fact_check_checked_by_id" integer,
  	"fact_check_checked_at" timestamp(3) with time zone,
  	"fact_check_notes" varchar,
  	"created_by_id" integer,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."pages_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_pages_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_path" varchar,
  	"version_body" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"version_seo_og_image_id" integer,
  	"version_fact_check_checked_by_id" integer,
  	"version_fact_check_checked_at" timestamp(3) with time zone,
  	"version_fact_check_notes" varchar,
  	"version_created_by_id" integer,
  	"version_updated_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_pages_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."faqs_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"slug" varchar,
  	"answer" varchar,
  	"category" "payload"."enum_faqs_category",
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_faqs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."faqs_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_faqs_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_faqs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_question" varchar,
  	"version_slug" varchar,
  	"version_answer" varchar,
  	"version_category" "payload"."enum__faqs_v_version_category",
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__faqs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__faqs_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_faqs_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."activities_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."activities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_media_id" integer,
  	"icon" varchar,
  	"order" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"seo_og_image_id" integer,
  	"fact_check_checked_by_id" integer,
  	"fact_check_checked_at" timestamp(3) with time zone,
  	"fact_check_notes" varchar,
  	"created_by_id" integer,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_activities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."activities_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"body" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_activities_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_activities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_hero_media_id" integer,
  	"version_icon" varchar,
  	"version_order" numeric DEFAULT 0,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"version_seo_og_image_id" integer,
  	"version_fact_check_checked_by_id" integer,
  	"version_fact_check_checked_at" timestamp(3) with time zone,
  	"version_fact_check_notes" varchar,
  	"version_created_by_id" integer,
  	"version_updated_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__activities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__activities_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_activities_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_body" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."regions_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."regions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"summary" varchar,
  	"body" varchar,
  	"geo_lat" numeric,
  	"geo_lng" numeric,
  	"geo_geojson" jsonb,
  	"geo_dem_tile_set" varchar,
  	"altitude_range_m_min" numeric,
  	"altitude_range_m_max" numeric,
  	"access" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"seo_og_image_id" integer,
  	"fact_check_checked_by_id" integer,
  	"fact_check_checked_at" timestamp(3) with time zone,
  	"fact_check_notes" varchar,
  	"created_by_id" integer,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_regions_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."regions_locales" (
  	"name" varchar,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."regions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"permits_id" integer,
  	"seasons_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload"."_regions_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_regions_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_summary" varchar,
  	"version_body" varchar,
  	"version_geo_lat" numeric,
  	"version_geo_lng" numeric,
  	"version_geo_geojson" jsonb,
  	"version_geo_dem_tile_set" varchar,
  	"version_altitude_range_m_min" numeric,
  	"version_altitude_range_m_max" numeric,
  	"version_access" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"version_seo_og_image_id" integer,
  	"version_fact_check_checked_by_id" integer,
  	"version_fact_check_checked_at" timestamp(3) with time zone,
  	"version_fact_check_notes" varchar,
  	"version_created_by_id" integer,
  	"version_updated_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__regions_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__regions_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_regions_v_locales" (
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_regions_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"permits_id" integer,
  	"seasons_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload"."trips_group_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum_trips_group_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."trips_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."trips_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."trips_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload"."trips_route_geo_waypoints" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"altitude_m" numeric,
  	"day_number" numeric
  );
  
  CREATE TABLE "payload"."trips_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."trips" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"activity_id" integer,
  	"difficulty" "payload"."enum_trips_difficulty",
  	"technical_grade" varchar,
  	"duration_days_min" numeric,
  	"duration_days_typical" numeric,
  	"duration_days_max" numeric,
  	"max_altitude_m" numeric,
  	"max_altitude_point" varchar,
  	"start_point" varchar,
  	"end_point" varchar,
  	"acclimatization_notes" varchar,
  	"contingency" varchar,
  	"route_geo_geojson" jsonb,
  	"map_style" jsonb,
  	"designer_defaults" jsonb,
  	"deposit_policy_deposit_pct" numeric DEFAULT 30,
  	"deposit_policy_balance_due_days_before" numeric DEFAULT 45,
  	"rule_report" jsonb,
  	"internal_notes" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"seo_og_image_id" integer,
  	"fact_check_checked_by_id" integer,
  	"fact_check_checked_at" timestamp(3) with time zone,
  	"fact_check_notes" varchar,
  	"created_by_id" integer,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_trips_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."trips_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"subtitle" varchar,
  	"overview" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."trips_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"regions_id" integer,
  	"peaks_id" integer,
  	"permits_id" integer,
  	"seasons_id" integer,
  	"media_id" integer,
  	"faqs_id" integer,
  	"trips_id" integer
  );
  
  CREATE TABLE "payload"."_trips_v_version_group_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum__trips_v_version_group_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."_trips_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_trips_v_version_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_trips_v_version_exclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_trips_v_version_route_geo_waypoints" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"altitude_m" numeric,
  	"day_number" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_trips_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_trips_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_activity_id" integer,
  	"version_difficulty" "payload"."enum__trips_v_version_difficulty",
  	"version_technical_grade" varchar,
  	"version_duration_days_min" numeric,
  	"version_duration_days_typical" numeric,
  	"version_duration_days_max" numeric,
  	"version_max_altitude_m" numeric,
  	"version_max_altitude_point" varchar,
  	"version_start_point" varchar,
  	"version_end_point" varchar,
  	"version_acclimatization_notes" varchar,
  	"version_contingency" varchar,
  	"version_route_geo_geojson" jsonb,
  	"version_map_style" jsonb,
  	"version_designer_defaults" jsonb,
  	"version_deposit_policy_deposit_pct" numeric DEFAULT 30,
  	"version_deposit_policy_balance_due_days_before" numeric DEFAULT 45,
  	"version_rule_report" jsonb,
  	"version_internal_notes" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"version_seo_og_image_id" integer,
  	"version_fact_check_checked_by_id" integer,
  	"version_fact_check_checked_at" timestamp(3) with time zone,
  	"version_fact_check_notes" varchar,
  	"version_created_by_id" integer,
  	"version_updated_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__trips_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__trips_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_trips_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_subtitle" varchar,
  	"version_overview" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_trips_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"regions_id" integer,
  	"peaks_id" integer,
  	"permits_id" integer,
  	"seasons_id" integer,
  	"media_id" integer,
  	"faqs_id" integer,
  	"trips_id" integer
  );
  
  CREATE TABLE "payload"."itinerary_days_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."itinerary_days" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"trip_id" integer,
  	"day_number" numeric,
  	"from_place" varchar,
  	"to_place" varchar,
  	"start_altitude_m" numeric,
  	"high_point_m" numeric,
  	"sleep_altitude_m" numeric,
  	"distance_km" numeric,
  	"ascent_m" numeric,
  	"descent_m" numeric,
  	"walking_hours" varchar,
  	"day_type" "payload"."enum_itinerary_days_day_type" DEFAULT 'trek',
  	"accommodation" "payload"."enum_itinerary_days_accommodation",
  	"peak_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_itinerary_days_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."itinerary_days_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_itinerary_days_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_itinerary_days_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_trip_id" integer,
  	"version_day_number" numeric,
  	"version_from_place" varchar,
  	"version_to_place" varchar,
  	"version_start_altitude_m" numeric,
  	"version_high_point_m" numeric,
  	"version_sleep_altitude_m" numeric,
  	"version_distance_km" numeric,
  	"version_ascent_m" numeric,
  	"version_descent_m" numeric,
  	"version_walking_hours" varchar,
  	"version_day_type" "payload"."enum__itinerary_days_v_version_day_type" DEFAULT 'trek',
  	"version_accommodation" "payload"."enum__itinerary_days_v_version_accommodation",
  	"version_peak_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__itinerary_days_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__itinerary_days_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_itinerary_days_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."peaks_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."peaks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"height_m" numeric,
  	"region_id" integer,
  	"classification" "payload"."enum_peaks_classification",
  	"permit_authority" "payload"."enum_peaks_permit_authority",
  	"geo_lat" numeric,
  	"geo_lng" numeric,
  	"geo_geojson" jsonb,
  	"geo_dem_tile_set" varchar,
  	"fact_check_checked_by_id" integer,
  	"fact_check_checked_at" timestamp(3) with time zone,
  	"fact_check_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_peaks_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."peaks_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_peaks_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_peaks_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_height_m" numeric,
  	"version_region_id" integer,
  	"version_classification" "payload"."enum__peaks_v_version_classification",
  	"version_permit_authority" "payload"."enum__peaks_v_version_permit_authority",
  	"version_geo_lat" numeric,
  	"version_geo_lng" numeric,
  	"version_geo_geojson" jsonb,
  	"version_geo_dem_tile_set" varchar,
  	"version_fact_check_checked_by_id" integer,
  	"version_fact_check_checked_at" timestamp(3) with time zone,
  	"version_fact_check_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__peaks_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__peaks_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_peaks_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."permits_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."permits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"authority" varchar,
  	"last_verified_at" timestamp(3) with time zone,
  	"requires_licensed_guide" boolean,
  	"min_group_size" numeric,
  	"processing_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_permits_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_permits_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_permits_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_authority" varchar,
  	"version_last_verified_at" timestamp(3) with time zone,
  	"version_requires_licensed_guide" boolean,
  	"version_min_group_size" numeric,
  	"version_processing_notes" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__permits_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__permits_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."seasons_months" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum_seasons_months",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."seasons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"weather_summary" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_seasons_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_seasons_v_version_months" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload"."enum__seasons_v_version_months",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload"."_seasons_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_weather_summary" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__seasons_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__seasons_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."posts_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "payload"."posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"excerpt" varchar,
  	"author_id" integer,
  	"categories" varchar,
  	"published_at" timestamp(3) with time zone,
  	"hero_media_id" integer,
  	"ai_assisted" boolean,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_canonical" varchar,
  	"seo_og_image_id" integer,
  	"fact_check_checked_by_id" integer,
  	"fact_check_checked_at" timestamp(3) with time zone,
  	"fact_check_notes" varchar,
  	"created_by_id" integer,
  	"updated_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."posts_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"body" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"regions_id" integer,
  	"activities_id" integer
  );
  
  CREATE TABLE "payload"."_posts_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"accessed_at" varchar,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "payload"."_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_excerpt" varchar,
  	"version_author_id" integer,
  	"version_categories" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_hero_media_id" integer,
  	"version_ai_assisted" boolean,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_canonical" varchar,
  	"version_seo_og_image_id" integer,
  	"version_fact_check_checked_by_id" integer,
  	"version_fact_check_checked_at" timestamp(3) with time zone,
  	"version_fact_check_notes" varchar,
  	"version_created_by_id" integer,
  	"version_updated_by_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__posts_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_posts_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_body" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "payload"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload"."_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"regions_id" integer,
  	"activities_id" integer
  );
  
  CREATE TABLE "payload"."team_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"role_title" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"languages" varchar,
  	"years_experience" numeric,
  	"is_guide" boolean,
  	"public_profile" boolean,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_team_members_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_team_members_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_role_title" varchar,
  	"version_bio" varchar,
  	"version_photo_id" integer,
  	"version_languages" varchar,
  	"version_years_experience" numeric,
  	"version_is_guide" boolean,
  	"version_public_profile" boolean,
  	"version_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__team_members_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__team_members_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"team_member_id" integer,
  	"guide_license_number" varchar,
  	"license_type" "payload"."enum_guides_license_type",
  	"specialties" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_guides_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."guides_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"regions_id" integer
  );
  
  CREATE TABLE "payload"."_guides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_team_member_id" integer,
  	"version_guide_license_number" varchar,
  	"version_license_type" "payload"."enum__guides_v_version_license_type",
  	"version_specialties" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__guides_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__guides_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."_guides_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"regions_id" integer
  );
  
  CREATE TABLE "payload"."reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "payload"."enum_reviews_source",
  	"source_url" varchar,
  	"rating" numeric,
  	"title" varchar,
  	"body" varchar,
  	"author_display_name" varchar,
  	"country" varchar,
  	"trip_id" integer,
  	"verified" boolean,
  	"consent_to_publish" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "payload"."enum_reviews_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "payload"."_reviews_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_source" "payload"."enum__reviews_v_version_source",
  	"version_source_url" varchar,
  	"version_rating" numeric,
  	"version_title" varchar,
  	"version_body" varchar,
  	"version_author_display_name" varchar,
  	"version_country" varchar,
  	"version_trip_id" integer,
  	"version_verified" boolean,
  	"version_consent_to_publish" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "payload"."enum__reviews_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "payload"."enum__reviews_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload"."redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "payload"."enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"trips_id" integer
  );
  
  CREATE TABLE "payload"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"faqs_id" integer,
  	"activities_id" integer,
  	"regions_id" integer,
  	"trips_id" integer,
  	"itinerary_days_id" integer,
  	"peaks_id" integer,
  	"permits_id" integer,
  	"seasons_id" integer,
  	"posts_id" integer,
  	"team_members_id" integer,
  	"guides_id" integer,
  	"reviews_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload"."site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"default_seo_title" varchar,
  	"default_seo_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."company_facts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"licence_no" varchar,
  	"legal_entity" varchar,
  	"address" varchar,
  	"pan" varchar,
  	"founded_year" varchar,
  	"memberships" varchar,
  	"review_summary" varchar,
  	"proof_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload"."navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"legal_line" varchar,
  	"security_txt" varchar DEFAULT '/.well-known/security.txt',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."safety_rules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"max_sleep_gain_above3000_m" numeric DEFAULT 550,
  	"rest_every_days" numeric DEFAULT 4,
  	"lukla_contingency_required" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload"."payment_policy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"deposit_pct" numeric DEFAULT 30,
  	"balance_due_days_before" numeric DEFAULT 45,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload"."pages_sources" ADD CONSTRAINT "pages_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."pages" ADD CONSTRAINT "pages_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages" ADD CONSTRAINT "pages_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages" ADD CONSTRAINT "pages_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages" ADD CONSTRAINT "pages_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_version_sources" ADD CONSTRAINT "_pages_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_version_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("version_fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v" ADD CONSTRAINT "_pages_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."faqs_sources" ADD CONSTRAINT "faqs_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."faqs_locales" ADD CONSTRAINT "faqs_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_faqs_v_version_sources" ADD CONSTRAINT "_faqs_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."faqs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_faqs_v_locales" ADD CONSTRAINT "_faqs_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_faqs_v_locales" ADD CONSTRAINT "_faqs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_faqs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."activities_sources" ADD CONSTRAINT "activities_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."activities" ADD CONSTRAINT "activities_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."activities" ADD CONSTRAINT "activities_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."activities" ADD CONSTRAINT "activities_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."activities" ADD CONSTRAINT "activities_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."activities" ADD CONSTRAINT "activities_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."activities_locales" ADD CONSTRAINT "activities_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."activities_locales" ADD CONSTRAINT "activities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v_version_sources" ADD CONSTRAINT "_activities_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v" ADD CONSTRAINT "_activities_v_parent_id_activities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."activities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v" ADD CONSTRAINT "_activities_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v" ADD CONSTRAINT "_activities_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v" ADD CONSTRAINT "_activities_v_version_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("version_fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v" ADD CONSTRAINT "_activities_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v" ADD CONSTRAINT "_activities_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v_locales" ADD CONSTRAINT "_activities_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_activities_v_locales" ADD CONSTRAINT "_activities_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."regions_sources" ADD CONSTRAINT "regions_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."regions" ADD CONSTRAINT "regions_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."regions" ADD CONSTRAINT "regions_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."regions" ADD CONSTRAINT "regions_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."regions" ADD CONSTRAINT "regions_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."regions_locales" ADD CONSTRAINT "regions_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."regions_locales" ADD CONSTRAINT "regions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."regions_rels" ADD CONSTRAINT "regions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."regions_rels" ADD CONSTRAINT "regions_rels_permits_fk" FOREIGN KEY ("permits_id") REFERENCES "payload"."permits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."regions_rels" ADD CONSTRAINT "regions_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "payload"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."regions_rels" ADD CONSTRAINT "regions_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v_version_sources" ADD CONSTRAINT "_regions_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_regions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v" ADD CONSTRAINT "_regions_v_parent_id_regions_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v" ADD CONSTRAINT "_regions_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v" ADD CONSTRAINT "_regions_v_version_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("version_fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v" ADD CONSTRAINT "_regions_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v" ADD CONSTRAINT "_regions_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v_locales" ADD CONSTRAINT "_regions_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v_locales" ADD CONSTRAINT "_regions_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_regions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v_rels" ADD CONSTRAINT "_regions_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_regions_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v_rels" ADD CONSTRAINT "_regions_v_rels_permits_fk" FOREIGN KEY ("permits_id") REFERENCES "payload"."permits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v_rels" ADD CONSTRAINT "_regions_v_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "payload"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_regions_v_rels" ADD CONSTRAINT "_regions_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_group_type" ADD CONSTRAINT "trips_group_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_highlights" ADD CONSTRAINT "trips_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_inclusions" ADD CONSTRAINT "trips_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_exclusions" ADD CONSTRAINT "trips_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_route_geo_waypoints" ADD CONSTRAINT "trips_route_geo_waypoints_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_sources" ADD CONSTRAINT "trips_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips" ADD CONSTRAINT "trips_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "payload"."activities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."trips" ADD CONSTRAINT "trips_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."trips" ADD CONSTRAINT "trips_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."trips" ADD CONSTRAINT "trips_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."trips" ADD CONSTRAINT "trips_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."trips_locales" ADD CONSTRAINT "trips_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."trips_locales" ADD CONSTRAINT "trips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_peaks_fk" FOREIGN KEY ("peaks_id") REFERENCES "payload"."peaks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_permits_fk" FOREIGN KEY ("permits_id") REFERENCES "payload"."permits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "payload"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "payload"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."trips_rels" ADD CONSTRAINT "trips_rels_trips_fk" FOREIGN KEY ("trips_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_version_group_type" ADD CONSTRAINT "_trips_v_version_group_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_version_highlights" ADD CONSTRAINT "_trips_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_version_inclusions" ADD CONSTRAINT "_trips_v_version_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_version_exclusions" ADD CONSTRAINT "_trips_v_version_exclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_version_route_geo_waypoints" ADD CONSTRAINT "_trips_v_version_route_geo_waypoints_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_version_sources" ADD CONSTRAINT "_trips_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v" ADD CONSTRAINT "_trips_v_parent_id_trips_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."trips"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v" ADD CONSTRAINT "_trips_v_version_activity_id_activities_id_fk" FOREIGN KEY ("version_activity_id") REFERENCES "payload"."activities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v" ADD CONSTRAINT "_trips_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v" ADD CONSTRAINT "_trips_v_version_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("version_fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v" ADD CONSTRAINT "_trips_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v" ADD CONSTRAINT "_trips_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_locales" ADD CONSTRAINT "_trips_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_locales" ADD CONSTRAINT "_trips_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_trips_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_peaks_fk" FOREIGN KEY ("peaks_id") REFERENCES "payload"."peaks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_permits_fk" FOREIGN KEY ("permits_id") REFERENCES "payload"."permits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "payload"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "payload"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_trips_v_rels" ADD CONSTRAINT "_trips_v_rels_trips_fk" FOREIGN KEY ("trips_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."itinerary_days_sources" ADD CONSTRAINT "itinerary_days_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."itinerary_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."itinerary_days" ADD CONSTRAINT "itinerary_days_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "payload"."trips"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."itinerary_days" ADD CONSTRAINT "itinerary_days_peak_id_peaks_id_fk" FOREIGN KEY ("peak_id") REFERENCES "payload"."peaks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."itinerary_days_locales" ADD CONSTRAINT "itinerary_days_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."itinerary_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_itinerary_days_v_version_sources" ADD CONSTRAINT "_itinerary_days_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_itinerary_days_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_itinerary_days_v" ADD CONSTRAINT "_itinerary_days_v_parent_id_itinerary_days_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."itinerary_days"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_itinerary_days_v" ADD CONSTRAINT "_itinerary_days_v_version_trip_id_trips_id_fk" FOREIGN KEY ("version_trip_id") REFERENCES "payload"."trips"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_itinerary_days_v" ADD CONSTRAINT "_itinerary_days_v_version_peak_id_peaks_id_fk" FOREIGN KEY ("version_peak_id") REFERENCES "payload"."peaks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_itinerary_days_v_locales" ADD CONSTRAINT "_itinerary_days_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_itinerary_days_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."peaks_sources" ADD CONSTRAINT "peaks_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."peaks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."peaks" ADD CONSTRAINT "peaks_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "payload"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."peaks" ADD CONSTRAINT "peaks_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."peaks_locales" ADD CONSTRAINT "peaks_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."peaks_locales" ADD CONSTRAINT "peaks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."peaks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_peaks_v_version_sources" ADD CONSTRAINT "_peaks_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_peaks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_peaks_v" ADD CONSTRAINT "_peaks_v_parent_id_peaks_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."peaks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_peaks_v" ADD CONSTRAINT "_peaks_v_version_region_id_regions_id_fk" FOREIGN KEY ("version_region_id") REFERENCES "payload"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_peaks_v" ADD CONSTRAINT "_peaks_v_version_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("version_fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_peaks_v_locales" ADD CONSTRAINT "_peaks_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_peaks_v_locales" ADD CONSTRAINT "_peaks_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_peaks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."permits_sources" ADD CONSTRAINT "permits_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."permits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_permits_v_version_sources" ADD CONSTRAINT "_permits_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_permits_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_permits_v" ADD CONSTRAINT "_permits_v_parent_id_permits_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."permits"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."seasons_months" ADD CONSTRAINT "seasons_months_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_seasons_v_version_months" ADD CONSTRAINT "_seasons_v_version_months_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_seasons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_seasons_v" ADD CONSTRAINT "_seasons_v_parent_id_seasons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts_sources" ADD CONSTRAINT "posts_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_author_id_team_members_id_fk" FOREIGN KEY ("author_id") REFERENCES "payload"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts" ADD CONSTRAINT "posts_updated_by_id_users_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_rels" ADD CONSTRAINT "posts_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."posts_rels" ADD CONSTRAINT "posts_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "payload"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_version_sources" ADD CONSTRAINT "_posts_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_team_members_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "payload"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_fact_check_checked_by_id_users_id_fk" FOREIGN KEY ("version_fact_check_checked_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_created_by_id_users_id_fk" FOREIGN KEY ("version_created_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v" ADD CONSTRAINT "_posts_v_version_updated_by_id_users_id_fk" FOREIGN KEY ("version_updated_by_id") REFERENCES "payload"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "payload"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."team_members" ADD CONSTRAINT "team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_team_members_v" ADD CONSTRAINT "_team_members_v_parent_id_team_members_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_team_members_v" ADD CONSTRAINT "_team_members_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."guides" ADD CONSTRAINT "guides_team_member_id_team_members_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "payload"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."guides_rels" ADD CONSTRAINT "guides_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."guides_rels" ADD CONSTRAINT "guides_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_guides_v" ADD CONSTRAINT "_guides_v_parent_id_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_guides_v" ADD CONSTRAINT "_guides_v_version_team_member_id_team_members_id_fk" FOREIGN KEY ("version_team_member_id") REFERENCES "payload"."team_members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."_guides_v_rels" ADD CONSTRAINT "_guides_v_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."reviews" ADD CONSTRAINT "reviews_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "payload"."trips"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_reviews_v" ADD CONSTRAINT "_reviews_v_parent_id_reviews_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."reviews"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."_reviews_v" ADD CONSTRAINT "_reviews_v_version_trip_id_trips_id_fk" FOREIGN KEY ("version_trip_id") REFERENCES "payload"."trips"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."redirects_rels" ADD CONSTRAINT "redirects_rels_trips_fk" FOREIGN KEY ("trips_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "payload"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk" FOREIGN KEY ("activities_id") REFERENCES "payload"."activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "payload"."regions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trips_fk" FOREIGN KEY ("trips_id") REFERENCES "payload"."trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_itinerary_days_fk" FOREIGN KEY ("itinerary_days_id") REFERENCES "payload"."itinerary_days"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_peaks_fk" FOREIGN KEY ("peaks_id") REFERENCES "payload"."peaks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_permits_fk" FOREIGN KEY ("permits_id") REFERENCES "payload"."permits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "payload"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "payload"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_members_fk" FOREIGN KEY ("team_members_id") REFERENCES "payload"."team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "payload"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "payload"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "payload"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "payload"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload"."company_facts" ADD CONSTRAINT "company_facts_proof_id_media_id_fk" FOREIGN KEY ("proof_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload"."navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "users_email_idx" ON "payload"."users" USING btree ("email");
  CREATE UNIQUE INDEX "users_better_auth_user_id_idx" ON "payload"."users" USING btree ("better_auth_user_id");
  CREATE INDEX "users_updated_at_idx" ON "payload"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "payload"."users" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "payload"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "payload"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "payload"."media" USING btree ("filename");
  CREATE INDEX "pages_sources_order_idx" ON "payload"."pages_sources" USING btree ("_order");
  CREATE INDEX "pages_sources_parent_id_idx" ON "payload"."pages_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "payload"."pages" USING btree ("slug");
  CREATE INDEX "pages_seo_seo_og_image_idx" ON "payload"."pages" USING btree ("seo_og_image_id");
  CREATE INDEX "pages_fact_check_fact_check_checked_by_idx" ON "payload"."pages" USING btree ("fact_check_checked_by_id");
  CREATE INDEX "pages_created_by_idx" ON "payload"."pages" USING btree ("created_by_id");
  CREATE INDEX "pages_updated_by_idx" ON "payload"."pages" USING btree ("updated_by_id");
  CREATE INDEX "pages_updated_at_idx" ON "payload"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "payload"."pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "payload"."pages" USING btree ("_status");
  CREATE INDEX "pages_meta_meta_image_idx" ON "payload"."pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "payload"."pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "payload"."pages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_sources_order_idx" ON "payload"."_pages_v_version_sources" USING btree ("_order");
  CREATE INDEX "_pages_v_version_sources_parent_id_idx" ON "payload"."_pages_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "payload"."_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "payload"."_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_seo_version_seo_og_image_idx" ON "payload"."_pages_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_pages_v_version_fact_check_version_fact_check_checked_b_idx" ON "payload"."_pages_v" USING btree ("version_fact_check_checked_by_id");
  CREATE INDEX "_pages_v_version_version_created_by_idx" ON "payload"."_pages_v" USING btree ("version_created_by_id");
  CREATE INDEX "_pages_v_version_version_updated_by_idx" ON "payload"."_pages_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "payload"."_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "payload"."_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "payload"."_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "payload"."_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "payload"."_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "payload"."_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "payload"."_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "payload"."_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "payload"."_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "payload"."_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "payload"."_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_locales_parent_id_idx" ON "payload"."_pages_v_locales" USING btree ("_parent_id");
  CREATE INDEX "faqs_sources_order_idx" ON "payload"."faqs_sources" USING btree ("_order");
  CREATE INDEX "faqs_sources_parent_id_idx" ON "payload"."faqs_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_slug_idx" ON "payload"."faqs" USING btree ("slug");
  CREATE INDEX "faqs_updated_at_idx" ON "payload"."faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "payload"."faqs" USING btree ("created_at");
  CREATE INDEX "faqs__status_idx" ON "payload"."faqs" USING btree ("_status");
  CREATE INDEX "faqs_meta_meta_image_idx" ON "payload"."faqs_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "payload"."faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_locales_parent_id_idx" ON "payload"."faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "_faqs_v_version_sources_order_idx" ON "payload"."_faqs_v_version_sources" USING btree ("_order");
  CREATE INDEX "_faqs_v_version_sources_parent_id_idx" ON "payload"."_faqs_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_faqs_v_parent_idx" ON "payload"."_faqs_v" USING btree ("parent_id");
  CREATE INDEX "_faqs_v_version_version_slug_idx" ON "payload"."_faqs_v" USING btree ("version_slug");
  CREATE INDEX "_faqs_v_version_version_updated_at_idx" ON "payload"."_faqs_v" USING btree ("version_updated_at");
  CREATE INDEX "_faqs_v_version_version_created_at_idx" ON "payload"."_faqs_v" USING btree ("version_created_at");
  CREATE INDEX "_faqs_v_version_version__status_idx" ON "payload"."_faqs_v" USING btree ("version__status");
  CREATE INDEX "_faqs_v_created_at_idx" ON "payload"."_faqs_v" USING btree ("created_at");
  CREATE INDEX "_faqs_v_updated_at_idx" ON "payload"."_faqs_v" USING btree ("updated_at");
  CREATE INDEX "_faqs_v_snapshot_idx" ON "payload"."_faqs_v" USING btree ("snapshot");
  CREATE INDEX "_faqs_v_published_locale_idx" ON "payload"."_faqs_v" USING btree ("published_locale");
  CREATE INDEX "_faqs_v_latest_idx" ON "payload"."_faqs_v" USING btree ("latest");
  CREATE INDEX "_faqs_v_autosave_idx" ON "payload"."_faqs_v" USING btree ("autosave");
  CREATE INDEX "_faqs_v_version_meta_version_meta_image_idx" ON "payload"."_faqs_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_faqs_v_locales_locale_parent_id_unique" ON "payload"."_faqs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_faqs_v_locales_parent_id_idx" ON "payload"."_faqs_v_locales" USING btree ("_parent_id");
  CREATE INDEX "activities_sources_order_idx" ON "payload"."activities_sources" USING btree ("_order");
  CREATE INDEX "activities_sources_parent_id_idx" ON "payload"."activities_sources" USING btree ("_parent_id");
  CREATE INDEX "activities_hero_media_idx" ON "payload"."activities" USING btree ("hero_media_id");
  CREATE INDEX "activities_seo_seo_og_image_idx" ON "payload"."activities" USING btree ("seo_og_image_id");
  CREATE INDEX "activities_fact_check_fact_check_checked_by_idx" ON "payload"."activities" USING btree ("fact_check_checked_by_id");
  CREATE INDEX "activities_created_by_idx" ON "payload"."activities" USING btree ("created_by_id");
  CREATE INDEX "activities_updated_by_idx" ON "payload"."activities" USING btree ("updated_by_id");
  CREATE INDEX "activities_updated_at_idx" ON "payload"."activities" USING btree ("updated_at");
  CREATE INDEX "activities_created_at_idx" ON "payload"."activities" USING btree ("created_at");
  CREATE INDEX "activities__status_idx" ON "payload"."activities" USING btree ("_status");
  CREATE UNIQUE INDEX "activities_slug_idx" ON "payload"."activities_locales" USING btree ("slug","_locale");
  CREATE INDEX "activities_meta_meta_image_idx" ON "payload"."activities_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "activities_locales_locale_parent_id_unique" ON "payload"."activities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "activities_locales_parent_id_idx" ON "payload"."activities_locales" USING btree ("_parent_id");
  CREATE INDEX "_activities_v_version_sources_order_idx" ON "payload"."_activities_v_version_sources" USING btree ("_order");
  CREATE INDEX "_activities_v_version_sources_parent_id_idx" ON "payload"."_activities_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_activities_v_parent_idx" ON "payload"."_activities_v" USING btree ("parent_id");
  CREATE INDEX "_activities_v_version_version_hero_media_idx" ON "payload"."_activities_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_activities_v_version_seo_version_seo_og_image_idx" ON "payload"."_activities_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_activities_v_version_fact_check_version_fact_check_chec_idx" ON "payload"."_activities_v" USING btree ("version_fact_check_checked_by_id");
  CREATE INDEX "_activities_v_version_version_created_by_idx" ON "payload"."_activities_v" USING btree ("version_created_by_id");
  CREATE INDEX "_activities_v_version_version_updated_by_idx" ON "payload"."_activities_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_activities_v_version_version_updated_at_idx" ON "payload"."_activities_v" USING btree ("version_updated_at");
  CREATE INDEX "_activities_v_version_version_created_at_idx" ON "payload"."_activities_v" USING btree ("version_created_at");
  CREATE INDEX "_activities_v_version_version__status_idx" ON "payload"."_activities_v" USING btree ("version__status");
  CREATE INDEX "_activities_v_created_at_idx" ON "payload"."_activities_v" USING btree ("created_at");
  CREATE INDEX "_activities_v_updated_at_idx" ON "payload"."_activities_v" USING btree ("updated_at");
  CREATE INDEX "_activities_v_snapshot_idx" ON "payload"."_activities_v" USING btree ("snapshot");
  CREATE INDEX "_activities_v_published_locale_idx" ON "payload"."_activities_v" USING btree ("published_locale");
  CREATE INDEX "_activities_v_latest_idx" ON "payload"."_activities_v" USING btree ("latest");
  CREATE INDEX "_activities_v_autosave_idx" ON "payload"."_activities_v" USING btree ("autosave");
  CREATE INDEX "_activities_v_version_version_slug_idx" ON "payload"."_activities_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_activities_v_version_meta_version_meta_image_idx" ON "payload"."_activities_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_activities_v_locales_locale_parent_id_unique" ON "payload"."_activities_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_activities_v_locales_parent_id_idx" ON "payload"."_activities_v_locales" USING btree ("_parent_id");
  CREATE INDEX "regions_sources_order_idx" ON "payload"."regions_sources" USING btree ("_order");
  CREATE INDEX "regions_sources_parent_id_idx" ON "payload"."regions_sources" USING btree ("_parent_id");
  CREATE INDEX "regions_seo_seo_og_image_idx" ON "payload"."regions" USING btree ("seo_og_image_id");
  CREATE INDEX "regions_fact_check_fact_check_checked_by_idx" ON "payload"."regions" USING btree ("fact_check_checked_by_id");
  CREATE INDEX "regions_created_by_idx" ON "payload"."regions" USING btree ("created_by_id");
  CREATE INDEX "regions_updated_by_idx" ON "payload"."regions" USING btree ("updated_by_id");
  CREATE INDEX "regions_updated_at_idx" ON "payload"."regions" USING btree ("updated_at");
  CREATE INDEX "regions_created_at_idx" ON "payload"."regions" USING btree ("created_at");
  CREATE INDEX "regions__status_idx" ON "payload"."regions" USING btree ("_status");
  CREATE UNIQUE INDEX "regions_slug_idx" ON "payload"."regions_locales" USING btree ("slug","_locale");
  CREATE INDEX "regions_meta_meta_image_idx" ON "payload"."regions_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "regions_locales_locale_parent_id_unique" ON "payload"."regions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "regions_locales_parent_id_idx" ON "payload"."regions_locales" USING btree ("_parent_id");
  CREATE INDEX "regions_rels_order_idx" ON "payload"."regions_rels" USING btree ("order");
  CREATE INDEX "regions_rels_parent_idx" ON "payload"."regions_rels" USING btree ("parent_id");
  CREATE INDEX "regions_rels_path_idx" ON "payload"."regions_rels" USING btree ("path");
  CREATE INDEX "regions_rels_permits_id_idx" ON "payload"."regions_rels" USING btree ("permits_id");
  CREATE INDEX "regions_rels_seasons_id_idx" ON "payload"."regions_rels" USING btree ("seasons_id");
  CREATE INDEX "regions_rels_media_id_idx" ON "payload"."regions_rels" USING btree ("media_id");
  CREATE INDEX "_regions_v_version_sources_order_idx" ON "payload"."_regions_v_version_sources" USING btree ("_order");
  CREATE INDEX "_regions_v_version_sources_parent_id_idx" ON "payload"."_regions_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_regions_v_parent_idx" ON "payload"."_regions_v" USING btree ("parent_id");
  CREATE INDEX "_regions_v_version_seo_version_seo_og_image_idx" ON "payload"."_regions_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_regions_v_version_fact_check_version_fact_check_checked_idx" ON "payload"."_regions_v" USING btree ("version_fact_check_checked_by_id");
  CREATE INDEX "_regions_v_version_version_created_by_idx" ON "payload"."_regions_v" USING btree ("version_created_by_id");
  CREATE INDEX "_regions_v_version_version_updated_by_idx" ON "payload"."_regions_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_regions_v_version_version_updated_at_idx" ON "payload"."_regions_v" USING btree ("version_updated_at");
  CREATE INDEX "_regions_v_version_version_created_at_idx" ON "payload"."_regions_v" USING btree ("version_created_at");
  CREATE INDEX "_regions_v_version_version__status_idx" ON "payload"."_regions_v" USING btree ("version__status");
  CREATE INDEX "_regions_v_created_at_idx" ON "payload"."_regions_v" USING btree ("created_at");
  CREATE INDEX "_regions_v_updated_at_idx" ON "payload"."_regions_v" USING btree ("updated_at");
  CREATE INDEX "_regions_v_snapshot_idx" ON "payload"."_regions_v" USING btree ("snapshot");
  CREATE INDEX "_regions_v_published_locale_idx" ON "payload"."_regions_v" USING btree ("published_locale");
  CREATE INDEX "_regions_v_latest_idx" ON "payload"."_regions_v" USING btree ("latest");
  CREATE INDEX "_regions_v_autosave_idx" ON "payload"."_regions_v" USING btree ("autosave");
  CREATE INDEX "_regions_v_version_version_slug_idx" ON "payload"."_regions_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_regions_v_version_meta_version_meta_image_idx" ON "payload"."_regions_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_regions_v_locales_locale_parent_id_unique" ON "payload"."_regions_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_regions_v_locales_parent_id_idx" ON "payload"."_regions_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_regions_v_rels_order_idx" ON "payload"."_regions_v_rels" USING btree ("order");
  CREATE INDEX "_regions_v_rels_parent_idx" ON "payload"."_regions_v_rels" USING btree ("parent_id");
  CREATE INDEX "_regions_v_rels_path_idx" ON "payload"."_regions_v_rels" USING btree ("path");
  CREATE INDEX "_regions_v_rels_permits_id_idx" ON "payload"."_regions_v_rels" USING btree ("permits_id");
  CREATE INDEX "_regions_v_rels_seasons_id_idx" ON "payload"."_regions_v_rels" USING btree ("seasons_id");
  CREATE INDEX "_regions_v_rels_media_id_idx" ON "payload"."_regions_v_rels" USING btree ("media_id");
  CREATE INDEX "trips_group_type_order_idx" ON "payload"."trips_group_type" USING btree ("order");
  CREATE INDEX "trips_group_type_parent_idx" ON "payload"."trips_group_type" USING btree ("parent_id");
  CREATE INDEX "trips_highlights_order_idx" ON "payload"."trips_highlights" USING btree ("_order");
  CREATE INDEX "trips_highlights_parent_id_idx" ON "payload"."trips_highlights" USING btree ("_parent_id");
  CREATE INDEX "trips_inclusions_order_idx" ON "payload"."trips_inclusions" USING btree ("_order");
  CREATE INDEX "trips_inclusions_parent_id_idx" ON "payload"."trips_inclusions" USING btree ("_parent_id");
  CREATE INDEX "trips_exclusions_order_idx" ON "payload"."trips_exclusions" USING btree ("_order");
  CREATE INDEX "trips_exclusions_parent_id_idx" ON "payload"."trips_exclusions" USING btree ("_parent_id");
  CREATE INDEX "trips_route_geo_waypoints_order_idx" ON "payload"."trips_route_geo_waypoints" USING btree ("_order");
  CREATE INDEX "trips_route_geo_waypoints_parent_id_idx" ON "payload"."trips_route_geo_waypoints" USING btree ("_parent_id");
  CREATE INDEX "trips_sources_order_idx" ON "payload"."trips_sources" USING btree ("_order");
  CREATE INDEX "trips_sources_parent_id_idx" ON "payload"."trips_sources" USING btree ("_parent_id");
  CREATE INDEX "trips_activity_idx" ON "payload"."trips" USING btree ("activity_id");
  CREATE INDEX "trips_seo_seo_og_image_idx" ON "payload"."trips" USING btree ("seo_og_image_id");
  CREATE INDEX "trips_fact_check_fact_check_checked_by_idx" ON "payload"."trips" USING btree ("fact_check_checked_by_id");
  CREATE INDEX "trips_created_by_idx" ON "payload"."trips" USING btree ("created_by_id");
  CREATE INDEX "trips_updated_by_idx" ON "payload"."trips" USING btree ("updated_by_id");
  CREATE INDEX "trips_updated_at_idx" ON "payload"."trips" USING btree ("updated_at");
  CREATE INDEX "trips_created_at_idx" ON "payload"."trips" USING btree ("created_at");
  CREATE INDEX "trips__status_idx" ON "payload"."trips" USING btree ("_status");
  CREATE UNIQUE INDEX "trips_slug_idx" ON "payload"."trips_locales" USING btree ("slug","_locale");
  CREATE INDEX "trips_meta_meta_image_idx" ON "payload"."trips_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "trips_locales_locale_parent_id_unique" ON "payload"."trips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trips_locales_parent_id_idx" ON "payload"."trips_locales" USING btree ("_parent_id");
  CREATE INDEX "trips_rels_order_idx" ON "payload"."trips_rels" USING btree ("order");
  CREATE INDEX "trips_rels_parent_idx" ON "payload"."trips_rels" USING btree ("parent_id");
  CREATE INDEX "trips_rels_path_idx" ON "payload"."trips_rels" USING btree ("path");
  CREATE INDEX "trips_rels_regions_id_idx" ON "payload"."trips_rels" USING btree ("regions_id");
  CREATE INDEX "trips_rels_peaks_id_idx" ON "payload"."trips_rels" USING btree ("peaks_id");
  CREATE INDEX "trips_rels_permits_id_idx" ON "payload"."trips_rels" USING btree ("permits_id");
  CREATE INDEX "trips_rels_seasons_id_idx" ON "payload"."trips_rels" USING btree ("seasons_id");
  CREATE INDEX "trips_rels_media_id_idx" ON "payload"."trips_rels" USING btree ("media_id");
  CREATE INDEX "trips_rels_faqs_id_idx" ON "payload"."trips_rels" USING btree ("faqs_id");
  CREATE INDEX "trips_rels_trips_id_idx" ON "payload"."trips_rels" USING btree ("trips_id");
  CREATE INDEX "_trips_v_version_group_type_order_idx" ON "payload"."_trips_v_version_group_type" USING btree ("order");
  CREATE INDEX "_trips_v_version_group_type_parent_idx" ON "payload"."_trips_v_version_group_type" USING btree ("parent_id");
  CREATE INDEX "_trips_v_version_highlights_order_idx" ON "payload"."_trips_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_trips_v_version_highlights_parent_id_idx" ON "payload"."_trips_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_version_inclusions_order_idx" ON "payload"."_trips_v_version_inclusions" USING btree ("_order");
  CREATE INDEX "_trips_v_version_inclusions_parent_id_idx" ON "payload"."_trips_v_version_inclusions" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_version_exclusions_order_idx" ON "payload"."_trips_v_version_exclusions" USING btree ("_order");
  CREATE INDEX "_trips_v_version_exclusions_parent_id_idx" ON "payload"."_trips_v_version_exclusions" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_version_route_geo_waypoints_order_idx" ON "payload"."_trips_v_version_route_geo_waypoints" USING btree ("_order");
  CREATE INDEX "_trips_v_version_route_geo_waypoints_parent_id_idx" ON "payload"."_trips_v_version_route_geo_waypoints" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_version_sources_order_idx" ON "payload"."_trips_v_version_sources" USING btree ("_order");
  CREATE INDEX "_trips_v_version_sources_parent_id_idx" ON "payload"."_trips_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_parent_idx" ON "payload"."_trips_v" USING btree ("parent_id");
  CREATE INDEX "_trips_v_version_version_activity_idx" ON "payload"."_trips_v" USING btree ("version_activity_id");
  CREATE INDEX "_trips_v_version_seo_version_seo_og_image_idx" ON "payload"."_trips_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_trips_v_version_fact_check_version_fact_check_checked_b_idx" ON "payload"."_trips_v" USING btree ("version_fact_check_checked_by_id");
  CREATE INDEX "_trips_v_version_version_created_by_idx" ON "payload"."_trips_v" USING btree ("version_created_by_id");
  CREATE INDEX "_trips_v_version_version_updated_by_idx" ON "payload"."_trips_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_trips_v_version_version_updated_at_idx" ON "payload"."_trips_v" USING btree ("version_updated_at");
  CREATE INDEX "_trips_v_version_version_created_at_idx" ON "payload"."_trips_v" USING btree ("version_created_at");
  CREATE INDEX "_trips_v_version_version__status_idx" ON "payload"."_trips_v" USING btree ("version__status");
  CREATE INDEX "_trips_v_created_at_idx" ON "payload"."_trips_v" USING btree ("created_at");
  CREATE INDEX "_trips_v_updated_at_idx" ON "payload"."_trips_v" USING btree ("updated_at");
  CREATE INDEX "_trips_v_snapshot_idx" ON "payload"."_trips_v" USING btree ("snapshot");
  CREATE INDEX "_trips_v_published_locale_idx" ON "payload"."_trips_v" USING btree ("published_locale");
  CREATE INDEX "_trips_v_latest_idx" ON "payload"."_trips_v" USING btree ("latest");
  CREATE INDEX "_trips_v_autosave_idx" ON "payload"."_trips_v" USING btree ("autosave");
  CREATE INDEX "_trips_v_version_version_slug_idx" ON "payload"."_trips_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_trips_v_version_meta_version_meta_image_idx" ON "payload"."_trips_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_trips_v_locales_locale_parent_id_unique" ON "payload"."_trips_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_trips_v_locales_parent_id_idx" ON "payload"."_trips_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_trips_v_rels_order_idx" ON "payload"."_trips_v_rels" USING btree ("order");
  CREATE INDEX "_trips_v_rels_parent_idx" ON "payload"."_trips_v_rels" USING btree ("parent_id");
  CREATE INDEX "_trips_v_rels_path_idx" ON "payload"."_trips_v_rels" USING btree ("path");
  CREATE INDEX "_trips_v_rels_regions_id_idx" ON "payload"."_trips_v_rels" USING btree ("regions_id");
  CREATE INDEX "_trips_v_rels_peaks_id_idx" ON "payload"."_trips_v_rels" USING btree ("peaks_id");
  CREATE INDEX "_trips_v_rels_permits_id_idx" ON "payload"."_trips_v_rels" USING btree ("permits_id");
  CREATE INDEX "_trips_v_rels_seasons_id_idx" ON "payload"."_trips_v_rels" USING btree ("seasons_id");
  CREATE INDEX "_trips_v_rels_media_id_idx" ON "payload"."_trips_v_rels" USING btree ("media_id");
  CREATE INDEX "_trips_v_rels_faqs_id_idx" ON "payload"."_trips_v_rels" USING btree ("faqs_id");
  CREATE INDEX "_trips_v_rels_trips_id_idx" ON "payload"."_trips_v_rels" USING btree ("trips_id");
  CREATE INDEX "itinerary_days_sources_order_idx" ON "payload"."itinerary_days_sources" USING btree ("_order");
  CREATE INDEX "itinerary_days_sources_parent_id_idx" ON "payload"."itinerary_days_sources" USING btree ("_parent_id");
  CREATE INDEX "itinerary_days_trip_idx" ON "payload"."itinerary_days" USING btree ("trip_id");
  CREATE INDEX "itinerary_days_peak_idx" ON "payload"."itinerary_days" USING btree ("peak_id");
  CREATE INDEX "itinerary_days_updated_at_idx" ON "payload"."itinerary_days" USING btree ("updated_at");
  CREATE INDEX "itinerary_days_created_at_idx" ON "payload"."itinerary_days" USING btree ("created_at");
  CREATE INDEX "itinerary_days__status_idx" ON "payload"."itinerary_days" USING btree ("_status");
  CREATE UNIQUE INDEX "itinerary_days_locales_locale_parent_id_unique" ON "payload"."itinerary_days_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "itinerary_days_locales_parent_id_idx" ON "payload"."itinerary_days_locales" USING btree ("_parent_id");
  CREATE INDEX "_itinerary_days_v_version_sources_order_idx" ON "payload"."_itinerary_days_v_version_sources" USING btree ("_order");
  CREATE INDEX "_itinerary_days_v_version_sources_parent_id_idx" ON "payload"."_itinerary_days_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_itinerary_days_v_parent_idx" ON "payload"."_itinerary_days_v" USING btree ("parent_id");
  CREATE INDEX "_itinerary_days_v_version_version_trip_idx" ON "payload"."_itinerary_days_v" USING btree ("version_trip_id");
  CREATE INDEX "_itinerary_days_v_version_version_peak_idx" ON "payload"."_itinerary_days_v" USING btree ("version_peak_id");
  CREATE INDEX "_itinerary_days_v_version_version_updated_at_idx" ON "payload"."_itinerary_days_v" USING btree ("version_updated_at");
  CREATE INDEX "_itinerary_days_v_version_version_created_at_idx" ON "payload"."_itinerary_days_v" USING btree ("version_created_at");
  CREATE INDEX "_itinerary_days_v_version_version__status_idx" ON "payload"."_itinerary_days_v" USING btree ("version__status");
  CREATE INDEX "_itinerary_days_v_created_at_idx" ON "payload"."_itinerary_days_v" USING btree ("created_at");
  CREATE INDEX "_itinerary_days_v_updated_at_idx" ON "payload"."_itinerary_days_v" USING btree ("updated_at");
  CREATE INDEX "_itinerary_days_v_snapshot_idx" ON "payload"."_itinerary_days_v" USING btree ("snapshot");
  CREATE INDEX "_itinerary_days_v_published_locale_idx" ON "payload"."_itinerary_days_v" USING btree ("published_locale");
  CREATE INDEX "_itinerary_days_v_latest_idx" ON "payload"."_itinerary_days_v" USING btree ("latest");
  CREATE INDEX "_itinerary_days_v_autosave_idx" ON "payload"."_itinerary_days_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_itinerary_days_v_locales_locale_parent_id_unique" ON "payload"."_itinerary_days_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_itinerary_days_v_locales_parent_id_idx" ON "payload"."_itinerary_days_v_locales" USING btree ("_parent_id");
  CREATE INDEX "peaks_sources_order_idx" ON "payload"."peaks_sources" USING btree ("_order");
  CREATE INDEX "peaks_sources_parent_id_idx" ON "payload"."peaks_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "peaks_slug_idx" ON "payload"."peaks" USING btree ("slug");
  CREATE INDEX "peaks_region_idx" ON "payload"."peaks" USING btree ("region_id");
  CREATE INDEX "peaks_fact_check_fact_check_checked_by_idx" ON "payload"."peaks" USING btree ("fact_check_checked_by_id");
  CREATE INDEX "peaks_updated_at_idx" ON "payload"."peaks" USING btree ("updated_at");
  CREATE INDEX "peaks_created_at_idx" ON "payload"."peaks" USING btree ("created_at");
  CREATE INDEX "peaks__status_idx" ON "payload"."peaks" USING btree ("_status");
  CREATE INDEX "peaks_meta_meta_image_idx" ON "payload"."peaks_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "peaks_locales_locale_parent_id_unique" ON "payload"."peaks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "peaks_locales_parent_id_idx" ON "payload"."peaks_locales" USING btree ("_parent_id");
  CREATE INDEX "_peaks_v_version_sources_order_idx" ON "payload"."_peaks_v_version_sources" USING btree ("_order");
  CREATE INDEX "_peaks_v_version_sources_parent_id_idx" ON "payload"."_peaks_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_peaks_v_parent_idx" ON "payload"."_peaks_v" USING btree ("parent_id");
  CREATE INDEX "_peaks_v_version_version_slug_idx" ON "payload"."_peaks_v" USING btree ("version_slug");
  CREATE INDEX "_peaks_v_version_version_region_idx" ON "payload"."_peaks_v" USING btree ("version_region_id");
  CREATE INDEX "_peaks_v_version_fact_check_version_fact_check_checked_b_idx" ON "payload"."_peaks_v" USING btree ("version_fact_check_checked_by_id");
  CREATE INDEX "_peaks_v_version_version_updated_at_idx" ON "payload"."_peaks_v" USING btree ("version_updated_at");
  CREATE INDEX "_peaks_v_version_version_created_at_idx" ON "payload"."_peaks_v" USING btree ("version_created_at");
  CREATE INDEX "_peaks_v_version_version__status_idx" ON "payload"."_peaks_v" USING btree ("version__status");
  CREATE INDEX "_peaks_v_created_at_idx" ON "payload"."_peaks_v" USING btree ("created_at");
  CREATE INDEX "_peaks_v_updated_at_idx" ON "payload"."_peaks_v" USING btree ("updated_at");
  CREATE INDEX "_peaks_v_snapshot_idx" ON "payload"."_peaks_v" USING btree ("snapshot");
  CREATE INDEX "_peaks_v_published_locale_idx" ON "payload"."_peaks_v" USING btree ("published_locale");
  CREATE INDEX "_peaks_v_latest_idx" ON "payload"."_peaks_v" USING btree ("latest");
  CREATE INDEX "_peaks_v_autosave_idx" ON "payload"."_peaks_v" USING btree ("autosave");
  CREATE INDEX "_peaks_v_version_meta_version_meta_image_idx" ON "payload"."_peaks_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_peaks_v_locales_locale_parent_id_unique" ON "payload"."_peaks_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_peaks_v_locales_parent_id_idx" ON "payload"."_peaks_v_locales" USING btree ("_parent_id");
  CREATE INDEX "permits_sources_order_idx" ON "payload"."permits_sources" USING btree ("_order");
  CREATE INDEX "permits_sources_parent_id_idx" ON "payload"."permits_sources" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "permits_slug_idx" ON "payload"."permits" USING btree ("slug");
  CREATE INDEX "permits_updated_at_idx" ON "payload"."permits" USING btree ("updated_at");
  CREATE INDEX "permits_created_at_idx" ON "payload"."permits" USING btree ("created_at");
  CREATE INDEX "permits__status_idx" ON "payload"."permits" USING btree ("_status");
  CREATE INDEX "_permits_v_version_sources_order_idx" ON "payload"."_permits_v_version_sources" USING btree ("_order");
  CREATE INDEX "_permits_v_version_sources_parent_id_idx" ON "payload"."_permits_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_permits_v_parent_idx" ON "payload"."_permits_v" USING btree ("parent_id");
  CREATE INDEX "_permits_v_version_version_slug_idx" ON "payload"."_permits_v" USING btree ("version_slug");
  CREATE INDEX "_permits_v_version_version_updated_at_idx" ON "payload"."_permits_v" USING btree ("version_updated_at");
  CREATE INDEX "_permits_v_version_version_created_at_idx" ON "payload"."_permits_v" USING btree ("version_created_at");
  CREATE INDEX "_permits_v_version_version__status_idx" ON "payload"."_permits_v" USING btree ("version__status");
  CREATE INDEX "_permits_v_created_at_idx" ON "payload"."_permits_v" USING btree ("created_at");
  CREATE INDEX "_permits_v_updated_at_idx" ON "payload"."_permits_v" USING btree ("updated_at");
  CREATE INDEX "_permits_v_snapshot_idx" ON "payload"."_permits_v" USING btree ("snapshot");
  CREATE INDEX "_permits_v_published_locale_idx" ON "payload"."_permits_v" USING btree ("published_locale");
  CREATE INDEX "_permits_v_latest_idx" ON "payload"."_permits_v" USING btree ("latest");
  CREATE INDEX "_permits_v_autosave_idx" ON "payload"."_permits_v" USING btree ("autosave");
  CREATE INDEX "seasons_months_order_idx" ON "payload"."seasons_months" USING btree ("order");
  CREATE INDEX "seasons_months_parent_idx" ON "payload"."seasons_months" USING btree ("parent_id");
  CREATE UNIQUE INDEX "seasons_slug_idx" ON "payload"."seasons" USING btree ("slug");
  CREATE INDEX "seasons_updated_at_idx" ON "payload"."seasons" USING btree ("updated_at");
  CREATE INDEX "seasons_created_at_idx" ON "payload"."seasons" USING btree ("created_at");
  CREATE INDEX "seasons__status_idx" ON "payload"."seasons" USING btree ("_status");
  CREATE INDEX "_seasons_v_version_months_order_idx" ON "payload"."_seasons_v_version_months" USING btree ("order");
  CREATE INDEX "_seasons_v_version_months_parent_idx" ON "payload"."_seasons_v_version_months" USING btree ("parent_id");
  CREATE INDEX "_seasons_v_parent_idx" ON "payload"."_seasons_v" USING btree ("parent_id");
  CREATE INDEX "_seasons_v_version_version_slug_idx" ON "payload"."_seasons_v" USING btree ("version_slug");
  CREATE INDEX "_seasons_v_version_version_updated_at_idx" ON "payload"."_seasons_v" USING btree ("version_updated_at");
  CREATE INDEX "_seasons_v_version_version_created_at_idx" ON "payload"."_seasons_v" USING btree ("version_created_at");
  CREATE INDEX "_seasons_v_version_version__status_idx" ON "payload"."_seasons_v" USING btree ("version__status");
  CREATE INDEX "_seasons_v_created_at_idx" ON "payload"."_seasons_v" USING btree ("created_at");
  CREATE INDEX "_seasons_v_updated_at_idx" ON "payload"."_seasons_v" USING btree ("updated_at");
  CREATE INDEX "_seasons_v_snapshot_idx" ON "payload"."_seasons_v" USING btree ("snapshot");
  CREATE INDEX "_seasons_v_published_locale_idx" ON "payload"."_seasons_v" USING btree ("published_locale");
  CREATE INDEX "_seasons_v_latest_idx" ON "payload"."_seasons_v" USING btree ("latest");
  CREATE INDEX "_seasons_v_autosave_idx" ON "payload"."_seasons_v" USING btree ("autosave");
  CREATE INDEX "posts_sources_order_idx" ON "payload"."posts_sources" USING btree ("_order");
  CREATE INDEX "posts_sources_parent_id_idx" ON "payload"."posts_sources" USING btree ("_parent_id");
  CREATE INDEX "posts_author_idx" ON "payload"."posts" USING btree ("author_id");
  CREATE INDEX "posts_hero_media_idx" ON "payload"."posts" USING btree ("hero_media_id");
  CREATE INDEX "posts_seo_seo_og_image_idx" ON "payload"."posts" USING btree ("seo_og_image_id");
  CREATE INDEX "posts_fact_check_fact_check_checked_by_idx" ON "payload"."posts" USING btree ("fact_check_checked_by_id");
  CREATE INDEX "posts_created_by_idx" ON "payload"."posts" USING btree ("created_by_id");
  CREATE INDEX "posts_updated_by_idx" ON "payload"."posts" USING btree ("updated_by_id");
  CREATE INDEX "posts_updated_at_idx" ON "payload"."posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "payload"."posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "payload"."posts" USING btree ("_status");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "payload"."posts_locales" USING btree ("slug","_locale");
  CREATE INDEX "posts_meta_meta_image_idx" ON "payload"."posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "payload"."posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_locales_parent_id_idx" ON "payload"."posts_locales" USING btree ("_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "payload"."posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "payload"."posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "payload"."posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_regions_id_idx" ON "payload"."posts_rels" USING btree ("regions_id");
  CREATE INDEX "posts_rels_activities_id_idx" ON "payload"."posts_rels" USING btree ("activities_id");
  CREATE INDEX "_posts_v_version_sources_order_idx" ON "payload"."_posts_v_version_sources" USING btree ("_order");
  CREATE INDEX "_posts_v_version_sources_parent_id_idx" ON "payload"."_posts_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "payload"."_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "payload"."_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_hero_media_idx" ON "payload"."_posts_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_og_image_idx" ON "payload"."_posts_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_posts_v_version_fact_check_version_fact_check_checked_b_idx" ON "payload"."_posts_v" USING btree ("version_fact_check_checked_by_id");
  CREATE INDEX "_posts_v_version_version_created_by_idx" ON "payload"."_posts_v" USING btree ("version_created_by_id");
  CREATE INDEX "_posts_v_version_version_updated_by_idx" ON "payload"."_posts_v" USING btree ("version_updated_by_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "payload"."_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "payload"."_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "payload"."_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "payload"."_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "payload"."_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "payload"."_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "payload"."_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "payload"."_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "payload"."_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "payload"."_posts_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "payload"."_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "payload"."_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_locales_parent_id_idx" ON "payload"."_posts_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "payload"."_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "payload"."_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "payload"."_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_regions_id_idx" ON "payload"."_posts_v_rels" USING btree ("regions_id");
  CREATE INDEX "_posts_v_rels_activities_id_idx" ON "payload"."_posts_v_rels" USING btree ("activities_id");
  CREATE UNIQUE INDEX "team_members_slug_idx" ON "payload"."team_members" USING btree ("slug");
  CREATE INDEX "team_members_photo_idx" ON "payload"."team_members" USING btree ("photo_id");
  CREATE INDEX "team_members_updated_at_idx" ON "payload"."team_members" USING btree ("updated_at");
  CREATE INDEX "team_members_created_at_idx" ON "payload"."team_members" USING btree ("created_at");
  CREATE INDEX "team_members__status_idx" ON "payload"."team_members" USING btree ("_status");
  CREATE INDEX "_team_members_v_parent_idx" ON "payload"."_team_members_v" USING btree ("parent_id");
  CREATE INDEX "_team_members_v_version_version_slug_idx" ON "payload"."_team_members_v" USING btree ("version_slug");
  CREATE INDEX "_team_members_v_version_version_photo_idx" ON "payload"."_team_members_v" USING btree ("version_photo_id");
  CREATE INDEX "_team_members_v_version_version_updated_at_idx" ON "payload"."_team_members_v" USING btree ("version_updated_at");
  CREATE INDEX "_team_members_v_version_version_created_at_idx" ON "payload"."_team_members_v" USING btree ("version_created_at");
  CREATE INDEX "_team_members_v_version_version__status_idx" ON "payload"."_team_members_v" USING btree ("version__status");
  CREATE INDEX "_team_members_v_created_at_idx" ON "payload"."_team_members_v" USING btree ("created_at");
  CREATE INDEX "_team_members_v_updated_at_idx" ON "payload"."_team_members_v" USING btree ("updated_at");
  CREATE INDEX "_team_members_v_snapshot_idx" ON "payload"."_team_members_v" USING btree ("snapshot");
  CREATE INDEX "_team_members_v_published_locale_idx" ON "payload"."_team_members_v" USING btree ("published_locale");
  CREATE INDEX "_team_members_v_latest_idx" ON "payload"."_team_members_v" USING btree ("latest");
  CREATE INDEX "_team_members_v_autosave_idx" ON "payload"."_team_members_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "guides_team_member_idx" ON "payload"."guides" USING btree ("team_member_id");
  CREATE INDEX "guides_updated_at_idx" ON "payload"."guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "payload"."guides" USING btree ("created_at");
  CREATE INDEX "guides__status_idx" ON "payload"."guides" USING btree ("_status");
  CREATE INDEX "guides_rels_order_idx" ON "payload"."guides_rels" USING btree ("order");
  CREATE INDEX "guides_rels_parent_idx" ON "payload"."guides_rels" USING btree ("parent_id");
  CREATE INDEX "guides_rels_path_idx" ON "payload"."guides_rels" USING btree ("path");
  CREATE INDEX "guides_rels_regions_id_idx" ON "payload"."guides_rels" USING btree ("regions_id");
  CREATE INDEX "_guides_v_parent_idx" ON "payload"."_guides_v" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_version_team_member_idx" ON "payload"."_guides_v" USING btree ("version_team_member_id");
  CREATE INDEX "_guides_v_version_version_updated_at_idx" ON "payload"."_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_guides_v_version_version_created_at_idx" ON "payload"."_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_guides_v_version_version__status_idx" ON "payload"."_guides_v" USING btree ("version__status");
  CREATE INDEX "_guides_v_created_at_idx" ON "payload"."_guides_v" USING btree ("created_at");
  CREATE INDEX "_guides_v_updated_at_idx" ON "payload"."_guides_v" USING btree ("updated_at");
  CREATE INDEX "_guides_v_snapshot_idx" ON "payload"."_guides_v" USING btree ("snapshot");
  CREATE INDEX "_guides_v_published_locale_idx" ON "payload"."_guides_v" USING btree ("published_locale");
  CREATE INDEX "_guides_v_latest_idx" ON "payload"."_guides_v" USING btree ("latest");
  CREATE INDEX "_guides_v_autosave_idx" ON "payload"."_guides_v" USING btree ("autosave");
  CREATE INDEX "_guides_v_rels_order_idx" ON "payload"."_guides_v_rels" USING btree ("order");
  CREATE INDEX "_guides_v_rels_parent_idx" ON "payload"."_guides_v_rels" USING btree ("parent_id");
  CREATE INDEX "_guides_v_rels_path_idx" ON "payload"."_guides_v_rels" USING btree ("path");
  CREATE INDEX "_guides_v_rels_regions_id_idx" ON "payload"."_guides_v_rels" USING btree ("regions_id");
  CREATE INDEX "reviews_trip_idx" ON "payload"."reviews" USING btree ("trip_id");
  CREATE INDEX "reviews_updated_at_idx" ON "payload"."reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "payload"."reviews" USING btree ("created_at");
  CREATE INDEX "reviews__status_idx" ON "payload"."reviews" USING btree ("_status");
  CREATE INDEX "_reviews_v_parent_idx" ON "payload"."_reviews_v" USING btree ("parent_id");
  CREATE INDEX "_reviews_v_version_version_trip_idx" ON "payload"."_reviews_v" USING btree ("version_trip_id");
  CREATE INDEX "_reviews_v_version_version_updated_at_idx" ON "payload"."_reviews_v" USING btree ("version_updated_at");
  CREATE INDEX "_reviews_v_version_version_created_at_idx" ON "payload"."_reviews_v" USING btree ("version_created_at");
  CREATE INDEX "_reviews_v_version_version__status_idx" ON "payload"."_reviews_v" USING btree ("version__status");
  CREATE INDEX "_reviews_v_created_at_idx" ON "payload"."_reviews_v" USING btree ("created_at");
  CREATE INDEX "_reviews_v_updated_at_idx" ON "payload"."_reviews_v" USING btree ("updated_at");
  CREATE INDEX "_reviews_v_snapshot_idx" ON "payload"."_reviews_v" USING btree ("snapshot");
  CREATE INDEX "_reviews_v_published_locale_idx" ON "payload"."_reviews_v" USING btree ("published_locale");
  CREATE INDEX "_reviews_v_latest_idx" ON "payload"."_reviews_v" USING btree ("latest");
  CREATE INDEX "_reviews_v_autosave_idx" ON "payload"."_reviews_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "payload"."redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "payload"."redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "payload"."redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "payload"."redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "payload"."redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "payload"."redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "payload"."redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_trips_id_idx" ON "payload"."redirects_rels" USING btree ("trips_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_activities_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("activities_id");
  CREATE INDEX "payload_locked_documents_rels_regions_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("regions_id");
  CREATE INDEX "payload_locked_documents_rels_trips_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("trips_id");
  CREATE INDEX "payload_locked_documents_rels_itinerary_days_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("itinerary_days_id");
  CREATE INDEX "payload_locked_documents_rels_peaks_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("peaks_id");
  CREATE INDEX "payload_locked_documents_rels_permits_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("permits_id");
  CREATE INDEX "payload_locked_documents_rels_seasons_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("seasons_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_team_members_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("team_members_id");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("guides_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload"."payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "company_facts_proof_idx" ON "payload"."company_facts" USING btree ("proof_id");
  CREATE INDEX "navigation_items_order_idx" ON "payload"."navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "payload"."navigation_items" USING btree ("_parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "payload"."users" CASCADE;
  DROP TABLE "payload"."media" CASCADE;
  DROP TABLE "payload"."pages_sources" CASCADE;
  DROP TABLE "payload"."pages" CASCADE;
  DROP TABLE "payload"."pages_locales" CASCADE;
  DROP TABLE "payload"."_pages_v_version_sources" CASCADE;
  DROP TABLE "payload"."_pages_v" CASCADE;
  DROP TABLE "payload"."_pages_v_locales" CASCADE;
  DROP TABLE "payload"."faqs_sources" CASCADE;
  DROP TABLE "payload"."faqs" CASCADE;
  DROP TABLE "payload"."faqs_locales" CASCADE;
  DROP TABLE "payload"."_faqs_v_version_sources" CASCADE;
  DROP TABLE "payload"."_faqs_v" CASCADE;
  DROP TABLE "payload"."_faqs_v_locales" CASCADE;
  DROP TABLE "payload"."activities_sources" CASCADE;
  DROP TABLE "payload"."activities" CASCADE;
  DROP TABLE "payload"."activities_locales" CASCADE;
  DROP TABLE "payload"."_activities_v_version_sources" CASCADE;
  DROP TABLE "payload"."_activities_v" CASCADE;
  DROP TABLE "payload"."_activities_v_locales" CASCADE;
  DROP TABLE "payload"."regions_sources" CASCADE;
  DROP TABLE "payload"."regions" CASCADE;
  DROP TABLE "payload"."regions_locales" CASCADE;
  DROP TABLE "payload"."regions_rels" CASCADE;
  DROP TABLE "payload"."_regions_v_version_sources" CASCADE;
  DROP TABLE "payload"."_regions_v" CASCADE;
  DROP TABLE "payload"."_regions_v_locales" CASCADE;
  DROP TABLE "payload"."_regions_v_rels" CASCADE;
  DROP TABLE "payload"."trips_group_type" CASCADE;
  DROP TABLE "payload"."trips_highlights" CASCADE;
  DROP TABLE "payload"."trips_inclusions" CASCADE;
  DROP TABLE "payload"."trips_exclusions" CASCADE;
  DROP TABLE "payload"."trips_route_geo_waypoints" CASCADE;
  DROP TABLE "payload"."trips_sources" CASCADE;
  DROP TABLE "payload"."trips" CASCADE;
  DROP TABLE "payload"."trips_locales" CASCADE;
  DROP TABLE "payload"."trips_rels" CASCADE;
  DROP TABLE "payload"."_trips_v_version_group_type" CASCADE;
  DROP TABLE "payload"."_trips_v_version_highlights" CASCADE;
  DROP TABLE "payload"."_trips_v_version_inclusions" CASCADE;
  DROP TABLE "payload"."_trips_v_version_exclusions" CASCADE;
  DROP TABLE "payload"."_trips_v_version_route_geo_waypoints" CASCADE;
  DROP TABLE "payload"."_trips_v_version_sources" CASCADE;
  DROP TABLE "payload"."_trips_v" CASCADE;
  DROP TABLE "payload"."_trips_v_locales" CASCADE;
  DROP TABLE "payload"."_trips_v_rels" CASCADE;
  DROP TABLE "payload"."itinerary_days_sources" CASCADE;
  DROP TABLE "payload"."itinerary_days" CASCADE;
  DROP TABLE "payload"."itinerary_days_locales" CASCADE;
  DROP TABLE "payload"."_itinerary_days_v_version_sources" CASCADE;
  DROP TABLE "payload"."_itinerary_days_v" CASCADE;
  DROP TABLE "payload"."_itinerary_days_v_locales" CASCADE;
  DROP TABLE "payload"."peaks_sources" CASCADE;
  DROP TABLE "payload"."peaks" CASCADE;
  DROP TABLE "payload"."peaks_locales" CASCADE;
  DROP TABLE "payload"."_peaks_v_version_sources" CASCADE;
  DROP TABLE "payload"."_peaks_v" CASCADE;
  DROP TABLE "payload"."_peaks_v_locales" CASCADE;
  DROP TABLE "payload"."permits_sources" CASCADE;
  DROP TABLE "payload"."permits" CASCADE;
  DROP TABLE "payload"."_permits_v_version_sources" CASCADE;
  DROP TABLE "payload"."_permits_v" CASCADE;
  DROP TABLE "payload"."seasons_months" CASCADE;
  DROP TABLE "payload"."seasons" CASCADE;
  DROP TABLE "payload"."_seasons_v_version_months" CASCADE;
  DROP TABLE "payload"."_seasons_v" CASCADE;
  DROP TABLE "payload"."posts_sources" CASCADE;
  DROP TABLE "payload"."posts" CASCADE;
  DROP TABLE "payload"."posts_locales" CASCADE;
  DROP TABLE "payload"."posts_rels" CASCADE;
  DROP TABLE "payload"."_posts_v_version_sources" CASCADE;
  DROP TABLE "payload"."_posts_v" CASCADE;
  DROP TABLE "payload"."_posts_v_locales" CASCADE;
  DROP TABLE "payload"."_posts_v_rels" CASCADE;
  DROP TABLE "payload"."team_members" CASCADE;
  DROP TABLE "payload"."_team_members_v" CASCADE;
  DROP TABLE "payload"."guides" CASCADE;
  DROP TABLE "payload"."guides_rels" CASCADE;
  DROP TABLE "payload"."_guides_v" CASCADE;
  DROP TABLE "payload"."_guides_v_rels" CASCADE;
  DROP TABLE "payload"."reviews" CASCADE;
  DROP TABLE "payload"."_reviews_v" CASCADE;
  DROP TABLE "payload"."redirects" CASCADE;
  DROP TABLE "payload"."redirects_rels" CASCADE;
  DROP TABLE "payload"."payload_kv" CASCADE;
  DROP TABLE "payload"."payload_locked_documents" CASCADE;
  DROP TABLE "payload"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload"."payload_preferences" CASCADE;
  DROP TABLE "payload"."payload_preferences_rels" CASCADE;
  DROP TABLE "payload"."payload_migrations" CASCADE;
  DROP TABLE "payload"."site_settings" CASCADE;
  DROP TABLE "payload"."company_facts" CASCADE;
  DROP TABLE "payload"."navigation_items" CASCADE;
  DROP TABLE "payload"."navigation" CASCADE;
  DROP TABLE "payload"."footer" CASCADE;
  DROP TABLE "payload"."safety_rules" CASCADE;
  DROP TABLE "payload"."payment_policy" CASCADE;
  DROP TYPE "payload"."_locales";
  DROP TYPE "payload"."enum_users_role";
  DROP TYPE "payload"."enum_pages_status";
  DROP TYPE "payload"."enum__pages_v_version_status";
  DROP TYPE "payload"."enum__pages_v_published_locale";
  DROP TYPE "payload"."enum_faqs_category";
  DROP TYPE "payload"."enum_faqs_status";
  DROP TYPE "payload"."enum__faqs_v_version_category";
  DROP TYPE "payload"."enum__faqs_v_version_status";
  DROP TYPE "payload"."enum__faqs_v_published_locale";
  DROP TYPE "payload"."enum_activities_status";
  DROP TYPE "payload"."enum__activities_v_version_status";
  DROP TYPE "payload"."enum__activities_v_published_locale";
  DROP TYPE "payload"."enum_regions_status";
  DROP TYPE "payload"."enum__regions_v_version_status";
  DROP TYPE "payload"."enum__regions_v_published_locale";
  DROP TYPE "payload"."enum_trips_group_type";
  DROP TYPE "payload"."enum_trips_difficulty";
  DROP TYPE "payload"."enum_trips_status";
  DROP TYPE "payload"."enum__trips_v_version_group_type";
  DROP TYPE "payload"."enum__trips_v_version_difficulty";
  DROP TYPE "payload"."enum__trips_v_version_status";
  DROP TYPE "payload"."enum__trips_v_published_locale";
  DROP TYPE "payload"."enum_itinerary_days_day_type";
  DROP TYPE "payload"."enum_itinerary_days_accommodation";
  DROP TYPE "payload"."enum_itinerary_days_status";
  DROP TYPE "payload"."enum__itinerary_days_v_version_day_type";
  DROP TYPE "payload"."enum__itinerary_days_v_version_accommodation";
  DROP TYPE "payload"."enum__itinerary_days_v_version_status";
  DROP TYPE "payload"."enum__itinerary_days_v_published_locale";
  DROP TYPE "payload"."enum_peaks_classification";
  DROP TYPE "payload"."enum_peaks_permit_authority";
  DROP TYPE "payload"."enum_peaks_status";
  DROP TYPE "payload"."enum__peaks_v_version_classification";
  DROP TYPE "payload"."enum__peaks_v_version_permit_authority";
  DROP TYPE "payload"."enum__peaks_v_version_status";
  DROP TYPE "payload"."enum__peaks_v_published_locale";
  DROP TYPE "payload"."enum_permits_status";
  DROP TYPE "payload"."enum__permits_v_version_status";
  DROP TYPE "payload"."enum__permits_v_published_locale";
  DROP TYPE "payload"."enum_seasons_months";
  DROP TYPE "payload"."enum_seasons_status";
  DROP TYPE "payload"."enum__seasons_v_version_months";
  DROP TYPE "payload"."enum__seasons_v_version_status";
  DROP TYPE "payload"."enum__seasons_v_published_locale";
  DROP TYPE "payload"."enum_posts_status";
  DROP TYPE "payload"."enum__posts_v_version_status";
  DROP TYPE "payload"."enum__posts_v_published_locale";
  DROP TYPE "payload"."enum_team_members_status";
  DROP TYPE "payload"."enum__team_members_v_version_status";
  DROP TYPE "payload"."enum__team_members_v_published_locale";
  DROP TYPE "payload"."enum_guides_license_type";
  DROP TYPE "payload"."enum_guides_status";
  DROP TYPE "payload"."enum__guides_v_version_license_type";
  DROP TYPE "payload"."enum__guides_v_version_status";
  DROP TYPE "payload"."enum__guides_v_published_locale";
  DROP TYPE "payload"."enum_reviews_source";
  DROP TYPE "payload"."enum_reviews_status";
  DROP TYPE "payload"."enum__reviews_v_version_source";
  DROP TYPE "payload"."enum__reviews_v_version_status";
  DROP TYPE "payload"."enum__reviews_v_published_locale";
  DROP TYPE "payload"."enum_redirects_to_type";`);
}
