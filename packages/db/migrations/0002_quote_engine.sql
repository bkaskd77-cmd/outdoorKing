CREATE TABLE IF NOT EXISTS "app"."customers" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "user_id" text UNIQUE,
  "email_hash" text NOT NULL UNIQUE,
  "email_cipher" text NOT NULL,
  "name_cipher" text NOT NULL,
  "phone_cipher" text,
  "country" text NOT NULL,
  "preferred_locale" text NOT NULL DEFAULT 'en',
  "marketing_consent" jsonb NOT NULL,
  "source" text,
  "deleted_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."trip_requests" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "customer_id" uuid NOT NULL REFERENCES "app"."customers"("id"),
  "trip_slug" text,
  "activity_slugs" text[],
  "region_slugs" text[],
  "status" text NOT NULL DEFAULT 'new',
  "party" jsonb NOT NULL,
  "dates" jsonb NOT NULL,
  "budget_band" text NOT NULL DEFAULT 'undisclosed',
  "preferences" jsonb NOT NULL,
  "health_notes_cipher" text,
  "message_cipher" text,
  "ai_draft_id" uuid,
  "assigned_to" text REFERENCES "app"."user"("id"),
  "consent" jsonb NOT NULL,
  "turnstile_ok" boolean NOT NULL DEFAULT false,
  "ip_hash" text,
  "ua" text,
  "utm" jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."ai_itinerary_drafts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "trip_request_id" uuid REFERENCES "app"."trip_requests"("id"),
  "model_alias" text NOT NULL,
  "model_id" text NOT NULL,
  "prompt_version" text NOT NULL,
  "input" jsonb NOT NULL,
  "output" jsonb NOT NULL,
  "rule_report" jsonb NOT NULL,
  "status" text NOT NULL DEFAULT 'needs_review',
  "cost_usd" numeric,
  "latency_ms" integer,
  "created_by" text NOT NULL DEFAULT 'system',
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."quotes" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "number" text NOT NULL UNIQUE,
  "trip_request_id" uuid NOT NULL REFERENCES "app"."trip_requests"("id"),
  "version" integer NOT NULL DEFAULT 1,
  "status" text NOT NULL DEFAULT 'draft',
  "currency" text NOT NULL DEFAULT 'USD',
  "fx_rate_locked" numeric,
  "subtotal" numeric NOT NULL DEFAULT 0,
  "discount" numeric NOT NULL DEFAULT 0,
  "tax" numeric NOT NULL DEFAULT 0,
  "total" numeric NOT NULL DEFAULT 0,
  "deposit_pct" numeric,
  "deposit_amount" numeric,
  "valid_until" date,
  "itinerary_snapshot" jsonb NOT NULL,
  "terms_version" text NOT NULL DEFAULT 'phase-2',
  "prepared_by" text,
  "approved_by" text,
  "sent_at" timestamptz,
  "viewed_at" timestamptz,
  "accepted_at" timestamptz,
  "acceptance" jsonb,
  "public_token_hash" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."quote_line_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "quote_id" uuid NOT NULL REFERENCES "app"."quotes"("id") ON DELETE CASCADE,
  "position" integer NOT NULL,
  "kind" text NOT NULL,
  "description" text NOT NULL,
  "quantity" numeric NOT NULL DEFAULT 1,
  "unit" text,
  "unit_price" numeric NOT NULL DEFAULT 0,
  "amount" numeric NOT NULL DEFAULT 0,
  "currency" text NOT NULL DEFAULT 'USD',
  "permit_id" text,
  "cost_basis" numeric,
  "taxable" boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS "app"."consents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "customer_id" uuid NOT NULL REFERENCES "app"."customers"("id"),
  "purpose" text NOT NULL,
  "granted" boolean NOT NULL,
  "policy_version" text NOT NULL,
  "at" timestamptz NOT NULL DEFAULT now(),
  "source" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "app"."travelers" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "trip_request_id" uuid REFERENCES "app"."trip_requests"("id"),
  "booking_id" uuid,
  "customer_id" uuid REFERENCES "app"."customers"("id"),
  "full_name_cipher" text NOT NULL,
  "dob_cipher" text,
  "nationality" text,
  "passport_hash" text,
  "passport_cipher" text,
  "passport_expiry_cipher" text,
  "dietary" text,
  "medical_cipher" text,
  "max_altitude_experience_m" integer,
  "is_lead" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);
