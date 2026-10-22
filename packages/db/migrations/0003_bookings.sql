CREATE TABLE IF NOT EXISTS "app"."bookings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "number" text NOT NULL UNIQUE,
  "quote_id" uuid NOT NULL UNIQUE REFERENCES "app"."quotes"("id"),
  "customer_id" uuid NOT NULL REFERENCES "app"."customers"("id"),
  "trip_slug" text,
  "status" text NOT NULL DEFAULT 'pending_deposit',
  "start_date" date,
  "end_date" date,
  "itinerary_snapshot" jsonb NOT NULL,
  "total" numeric NOT NULL,
  "currency" text NOT NULL DEFAULT 'USD',
  "balance_due_at" date,
  "deposit_pct" numeric,
  "insurance" jsonb,
  "permit_status" jsonb,
  "emergency_contact_cipher" text,
  "ops_notes" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."payments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "booking_id" uuid NOT NULL REFERENCES "app"."bookings"("id"),
  "kind" text NOT NULL,
  "provider" text NOT NULL,
  "provider_ref" text,
  "idempotency_key" text NOT NULL UNIQUE,
  "amount" numeric NOT NULL,
  "currency" text NOT NULL DEFAULT 'USD',
  "settlement_amount" numeric,
  "settlement_currency" text,
  "status" text NOT NULL DEFAULT 'pending',
  "failure_code" text,
  "wire_reference" text,
  "proof_document_id" uuid,
  "approved_by" text REFERENCES "app"."user"("id"),
  "captured_at" timestamptz,
  "refunded_amount" numeric,
  "due_at" date,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."payment_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "payment_id" uuid NOT NULL REFERENCES "app"."payments"("id"),
  "provider" text NOT NULL,
  "provider_event_id" text NOT NULL,
  "type" text NOT NULL,
  "payload" jsonb NOT NULL,
  "signature_valid" boolean NOT NULL DEFAULT true,
  "received_at" timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "payment_events_provider_event"
  ON "app"."payment_events" ("provider", "provider_event_id");

CREATE TABLE IF NOT EXISTS "app"."documents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "booking_id" uuid NOT NULL REFERENCES "app"."bookings"("id"),
  "traveler_id" uuid,
  "kind" text NOT NULL,
  "r2_key" text,
  "sha256" text,
  "mime" text,
  "size_bytes" integer,
  "status" text NOT NULL DEFAULT 'missing',
  "uploaded_by" text,
  "visible_to_customer" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);
