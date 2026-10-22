CREATE SCHEMA IF NOT EXISTS app;
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS "app"."user" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "email_verified" boolean NOT NULL DEFAULT false,
  "image" text,
  "role" text NOT NULL DEFAULT 'content_editor',
  "banned" boolean DEFAULT false,
  "ban_reason" text,
  "ban_expires" timestamptz,
  "two_factor_enabled" boolean DEFAULT false,
  "has_passkey" boolean NOT NULL DEFAULT false,
  "team_member_id" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."session" (
  "id" text PRIMARY KEY NOT NULL,
  "expires_at" timestamptz NOT NULL,
  "token" text NOT NULL UNIQUE,
  "ip_address" text,
  "user_agent" text,
  "user_id" text NOT NULL REFERENCES "app"."user"("id") ON DELETE CASCADE,
  "impersonated_by" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."account" (
  "id" text PRIMARY KEY NOT NULL,
  "account_id" text NOT NULL,
  "provider_id" text NOT NULL,
  "user_id" text NOT NULL REFERENCES "app"."user"("id") ON DELETE CASCADE,
  "access_token" text,
  "refresh_token" text,
  "id_token" text,
  "access_token_expires_at" timestamptz,
  "refresh_token_expires_at" timestamptz,
  "scope" text,
  "password" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."verification" (
  "id" text PRIMARY KEY NOT NULL,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."two_factor" (
  "id" text PRIMARY KEY NOT NULL,
  "secret" text NOT NULL,
  "backup_codes" text NOT NULL,
  "verified" boolean DEFAULT false,
  "failed_verification_count" integer DEFAULT 0,
  "locked_until" timestamptz,
  "user_id" text NOT NULL REFERENCES "app"."user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "app"."passkey" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text,
  "public_key" text NOT NULL,
  "user_id" text NOT NULL REFERENCES "app"."user"("id") ON DELETE CASCADE,
  "credential_id" text NOT NULL,
  "counter" integer NOT NULL,
  "device_type" text NOT NULL,
  "backed_up" boolean NOT NULL,
  "transports" text,
  "aaguid" text,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."invite" (
  "id" text PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "role" text NOT NULL,
  "token_hash" text NOT NULL,
  "invited_by" text,
  "accepted_at" timestamptz,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "app"."audit_log" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "at" timestamptz NOT NULL DEFAULT now(),
  "actor_type" text NOT NULL,
  "actor_id" text NOT NULL,
  "actor_role" text,
  "action" text NOT NULL,
  "resource_type" text,
  "resource_id" text,
  "ip_hash" text,
  "ua" text,
  "request_id" text,
  "before" jsonb,
  "after" jsonb,
  "prev_hash" text,
  "hash" text NOT NULL
);

REVOKE UPDATE, DELETE ON "app"."audit_log" FROM PUBLIC;

CREATE TABLE IF NOT EXISTS "app"."content_chunks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "source_type" text NOT NULL,
  "source_id" text NOT NULL,
  "locale" text NOT NULL DEFAULT 'en',
  "chunk_index" integer NOT NULL DEFAULT 0,
  "content" text NOT NULL,
  "tsv" tsvector,
  "embedding" vector(1536),
  "embedding_model" text,
  "content_hash" text NOT NULL,
  "published_at" timestamptz,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);
