ALTER TABLE "app"."trip_requests"
  ADD COLUMN IF NOT EXISTS "affiliate_code" text;

CREATE INDEX IF NOT EXISTS "trip_requests_affiliate_code"
  ON "app"."trip_requests" ("affiliate_code");

CREATE TABLE IF NOT EXISTS "app"."partners" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "code" text NOT NULL UNIQUE,
  "portal_token_hash" text NOT NULL UNIQUE,
  "status" text NOT NULL DEFAULT 'active',
  "notes" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "partners_code"
  ON "app"."partners" ("code");
