import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { appSchema, user } from "./auth";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const customers = appSchema.table("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").unique(),
  emailHash: text("email_hash").notNull().unique(),
  emailCipher: text("email_cipher").notNull(),
  nameCipher: text("name_cipher").notNull(),
  phoneCipher: text("phone_cipher"),
  country: text("country").notNull(),
  preferredLocale: text("preferred_locale").notNull().default("en"),
  marketingConsent: jsonb("marketing_consent")
    .$type<{ email: boolean; at: string; source: string; policyVersion: string }>()
    .notNull(),
  source: text("source"),
  deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "date" }),
  ...timestamps,
});

export const tripRequests = appSchema.table("trip_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  tripSlug: text("trip_slug"),
  activitySlugs: text("activity_slugs").array(),
  regionSlugs: text("region_slugs").array(),
  status: text("status").notNull().default("new"),
  party: jsonb("party")
    .$type<{
      adults: number;
      children: number;
      ages: number[];
      groupType: string;
      fitness: string;
      experience: string;
      maxPriorAltitudeM?: number;
    }>()
    .notNull(),
  dates: jsonb("dates")
    .$type<{
      earliestStart: string;
      latestStart?: string;
      flexibleDays: number;
      durationDays: number;
      arrivalCity: string;
    }>()
    .notNull(),
  budgetBand: text("budget_band").notNull().default("undisclosed"),
  preferences: jsonb("preferences")
    .$type<{
      comfort: string;
      pace: string;
      mustHaves: string[];
      message?: string;
    }>()
    .notNull(),
  healthNotesCipher: text("health_notes_cipher"),
  messageCipher: text("message_cipher"),
  aiDraftId: uuid("ai_draft_id"),
  assignedTo: text("assigned_to").references(() => user.id),
  consent: jsonb("consent")
    .$type<{
      privacy: boolean;
      marketing: boolean;
      health: boolean;
      policyVersion: string;
      at: string;
    }>()
    .notNull(),
  turnstileOk: boolean("turnstile_ok").notNull().default(false),
  ipHash: text("ip_hash"),
  ua: text("ua"),
  utm: jsonb("utm").$type<Record<string, string>>(),
  ...timestamps,
});

export const aiItineraryDrafts = appSchema.table("ai_itinerary_drafts", {
  id: uuid("id").primaryKey().defaultRandom(),
  tripRequestId: uuid("trip_request_id").references(() => tripRequests.id),
  modelAlias: text("model_alias").notNull(),
  modelId: text("model_id").notNull(),
  promptVersion: text("prompt_version").notNull(),
  input: jsonb("input").$type<Record<string, unknown>>().notNull(),
  output: jsonb("output").$type<Record<string, unknown>>().notNull(),
  ruleReport: jsonb("rule_report").$type<Record<string, unknown>>().notNull(),
  status: text("status").notNull().default("needs_review"),
  costUsd: numeric("cost_usd"),
  latencyMs: integer("latency_ms"),
  createdBy: text("created_by").notNull().default("system"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const quotes = appSchema.table("quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  number: text("number").notNull().unique(),
  tripRequestId: uuid("trip_request_id")
    .notNull()
    .references(() => tripRequests.id),
  version: integer("version").notNull().default(1),
  status: text("status").notNull().default("draft"),
  currency: text("currency").notNull().default("USD"),
  fxRateLocked: numeric("fx_rate_locked"),
  subtotal: numeric("subtotal").notNull().default("0"),
  discount: numeric("discount").notNull().default("0"),
  tax: numeric("tax").notNull().default("0"),
  total: numeric("total").notNull().default("0"),
  depositPct: numeric("deposit_pct"),
  depositAmount: numeric("deposit_amount"),
  validUntil: date("valid_until"),
  itinerarySnapshot: jsonb("itinerary_snapshot")
    .$type<Record<string, unknown>>()
    .notNull(),
  termsVersion: text("terms_version").notNull().default("phase-2"),
  preparedBy: text("prepared_by"),
  approvedBy: text("approved_by"),
  sentAt: timestamp("sent_at", { withTimezone: true, mode: "date" }),
  viewedAt: timestamp("viewed_at", { withTimezone: true, mode: "date" }),
  acceptedAt: timestamp("accepted_at", { withTimezone: true, mode: "date" }),
  acceptance: jsonb("acceptance").$type<Record<string, unknown>>(),
  publicTokenHash: text("public_token_hash"),
  ...timestamps,
});

export const quoteLineItems = appSchema.table("quote_line_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  quoteId: uuid("quote_id")
    .notNull()
    .references(() => quotes.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  kind: text("kind").notNull(),
  description: text("description").notNull(),
  quantity: numeric("quantity").notNull().default("1"),
  unit: text("unit"),
  unitPrice: numeric("unit_price").notNull().default("0"),
  amount: numeric("amount").notNull().default("0"),
  currency: text("currency").notNull().default("USD"),
  permitId: text("permit_id"),
  costBasis: numeric("cost_basis"),
  taxable: boolean("taxable").notNull().default(false),
});

export const consents = appSchema.table("consents", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  purpose: text("purpose").notNull(),
  granted: boolean("granted").notNull(),
  policyVersion: text("policy_version").notNull(),
  at: timestamp("at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  source: text("source").notNull(),
});

export const travelers = appSchema.table("travelers", {
  id: uuid("id").primaryKey().defaultRandom(),
  tripRequestId: uuid("trip_request_id").references(() => tripRequests.id),
  bookingId: uuid("booking_id"),
  customerId: uuid("customer_id").references(() => customers.id),
  fullNameCipher: text("full_name_cipher").notNull(),
  dobCipher: text("dob_cipher"),
  nationality: text("nationality"),
  passportHash: text("passport_hash"),
  passportCipher: text("passport_cipher"),
  passportExpiryCipher: text("passport_expiry_cipher"),
  dietary: text("dietary"),
  medicalCipher: text("medical_cipher"),
  maxAltitudeExperienceM: integer("max_altitude_experience_m"),
  isLead: boolean("is_lead").notNull().default(false),
  ...timestamps,
});
