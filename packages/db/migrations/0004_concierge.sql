CREATE TABLE IF NOT EXISTS "app"."concierge_conversations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "customer_id" uuid REFERENCES "app"."customers"("id"),
  "session_hash" text NOT NULL,
  "locale" text NOT NULL DEFAULT 'en',
  "handed_off_to" text,
  "flagged" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "concierge_conversations_session_hash"
  ON "app"."concierge_conversations" ("session_hash");

CREATE TABLE IF NOT EXISTS "app"."concierge_messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "conversation_id" uuid NOT NULL REFERENCES "app"."concierge_conversations"("id"),
  "role" text NOT NULL,
  "content" text,
  "content_cipher" text,
  "tool_calls" jsonb,
  "citations" jsonb,
  "intent" text,
  "model_id" text,
  "tokens_in" integer,
  "tokens_out" integer,
  "cost_usd" numeric,
  "flagged" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "concierge_messages_conversation"
  ON "app"."concierge_messages" ("conversation_id");

CREATE TABLE IF NOT EXISTS "app"."ai_usage_daily" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "day" date NOT NULL,
  "alias" text NOT NULL,
  "model" text NOT NULL,
  "tokens" integer NOT NULL DEFAULT 0,
  "cost_usd" numeric NOT NULL DEFAULT '0',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "ai_usage_daily_day_alias_model"
  ON "app"."ai_usage_daily" ("day", "alias", "model");
