import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

// The columns and tables may already exist: 20261029_191570_prepare_photo_fields adds
// them early so that content migrations on an empty database can write trips and activities.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  ALTER TABLE "payload"."_trips_v" ADD COLUMN IF NOT EXISTS "version_hero_media_id" integer;
  DO $$ BEGIN ALTER TABLE "payload"."activities_rels" ADD CONSTRAINT "activities_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."activities"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN ALTER TABLE "payload"."activities_rels" ADD CONSTRAINT "activities_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN ALTER TABLE "payload"."_activities_v_rels" ADD CONSTRAINT "_activities_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload"."_activities_v"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN ALTER TABLE "payload"."_activities_v_rels" ADD CONSTRAINT "_activities_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "payload"."media"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "activities_rels_order_idx" ON "payload"."activities_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "activities_rels_parent_idx" ON "payload"."activities_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "activities_rels_path_idx" ON "payload"."activities_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "activities_rels_media_id_idx" ON "payload"."activities_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_activities_v_rels_order_idx" ON "payload"."_activities_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_activities_v_rels_parent_idx" ON "payload"."_activities_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_activities_v_rels_path_idx" ON "payload"."_activities_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_activities_v_rels_media_id_idx" ON "payload"."_activities_v_rels" USING btree ("media_id");
  DO $$ BEGIN ALTER TABLE "payload"."trips" ADD CONSTRAINT "trips_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN ALTER TABLE "payload"."_trips_v" ADD CONSTRAINT "_trips_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "payload"."media"("id") ON DELETE set null ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "trips_hero_media_idx" ON "payload"."trips" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "_trips_v_version_version_hero_media_idx" ON "payload"."_trips_v" USING btree ("version_hero_media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload"."activities_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload"."_activities_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload"."activities_rels" CASCADE;
  DROP TABLE "payload"."_activities_v_rels" CASCADE;
  ALTER TABLE "payload"."trips" DROP CONSTRAINT "trips_hero_media_id_media_id_fk";
  
  ALTER TABLE "payload"."_trips_v" DROP CONSTRAINT "_trips_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX "payload"."trips_hero_media_idx";
  DROP INDEX "payload"."_trips_v_version_version_hero_media_idx";
  ALTER TABLE "payload"."trips" DROP COLUMN "hero_media_id";
  ALTER TABLE "payload"."_trips_v" DROP COLUMN "version_hero_media_id";`)
}
