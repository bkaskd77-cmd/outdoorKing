CREATE TABLE IF NOT EXISTS "app"."trip_requests_lite" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "email_hash" text NOT NULL,
  "email_cipher" text NOT NULL,
  "name_cipher" text NOT NULL,
  "trip_slug" text,
  "payload" jsonb NOT NULL,
  "consent" jsonb NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now()
);
