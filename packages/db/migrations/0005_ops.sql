CREATE TABLE IF NOT EXISTS "app"."guide_assignments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "booking_id" uuid NOT NULL,
  "guide_payload_id" text NOT NULL,
  "role" text NOT NULL DEFAULT 'lead',
  "from_date" date,
  "to_date" date,
  "notes" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "guide_assignments_booking"
  ON "app"."guide_assignments" ("booking_id");

CREATE TABLE IF NOT EXISTS "app"."departures" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "trip_slug" text NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date,
  "status" text NOT NULL DEFAULT 'planned',
  "capacity" text,
  "notes" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "departures_trip_slug"
  ON "app"."departures" ("trip_slug");

CREATE TABLE IF NOT EXISTS "app"."permit_applications" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "booking_id" uuid NOT NULL,
  "permit_payload_id" text NOT NULL,
  "status" text NOT NULL DEFAULT 'not_started',
  "reference_cipher" text,
  "submitted_at" timestamptz,
  "issued_at" timestamptz,
  "notes" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "permit_applications_booking"
  ON "app"."permit_applications" ("booking_id");
