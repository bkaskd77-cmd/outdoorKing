import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { appSchema, user } from "./auth";
import { customers, quotes } from "./quotes";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const bookings = appSchema.table("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  number: text("number").notNull().unique(),
  quoteId: uuid("quote_id")
    .notNull()
    .unique()
    .references(() => quotes.id),
  customerId: uuid("customer_id")
    .notNull()
    .references(() => customers.id),
  tripSlug: text("trip_slug"),
  status: text("status").notNull().default("pending_deposit"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  itinerarySnapshot: jsonb("itinerary_snapshot")
    .$type<Record<string, unknown>>()
    .notNull(),
  total: numeric("total").notNull(),
  currency: text("currency").notNull().default("USD"),
  balanceDueAt: date("balance_due_at"),
  depositPct: numeric("deposit_pct"),
  insurance: jsonb("insurance").$type<{
    provider?: string;
    verifiedAt?: string;
    coversHeliRescueToAltitudeM?: number;
  }>(),
  permitStatus:
    jsonb("permit_status").$type<{ slug: string; name: string; status: string }[]>(),
  emergencyContactCipher: text("emergency_contact_cipher"),
  opsNotes: text("ops_notes"),
  ...timestamps,
});

export const payments = appSchema.table("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id),
  kind: text("kind").notNull(),
  provider: text("provider").notNull(),
  providerRef: text("provider_ref"),
  idempotencyKey: text("idempotency_key").notNull().unique(),
  amount: numeric("amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  settlementAmount: numeric("settlement_amount"),
  settlementCurrency: text("settlement_currency"),
  status: text("status").notNull().default("pending"),
  failureCode: text("failure_code"),
  wireReference: text("wire_reference"),
  proofDocumentId: uuid("proof_document_id"),
  approvedBy: text("approved_by").references(() => user.id),
  capturedAt: timestamp("captured_at", { withTimezone: true, mode: "date" }),
  refundedAmount: numeric("refunded_amount"),
  dueAt: date("due_at"),
  ...timestamps,
});

export const paymentEvents = appSchema.table(
  "payment_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    paymentId: uuid("payment_id")
      .notNull()
      .references(() => payments.id),
    provider: text("provider").notNull(),
    providerEventId: text("provider_event_id").notNull(),
    type: text("type").notNull(),
    payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
    signatureValid: boolean("signature_valid").notNull().default(true),
    receivedAt: timestamp("received_at", { withTimezone: true, mode: "date" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    uniqueIndex("payment_events_provider_event").on(
      table.provider,
      table.providerEventId,
    ),
  ],
);

export const documents = appSchema.table("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id),
  travelerId: uuid("traveler_id"),
  kind: text("kind").notNull(),
  r2Key: text("r2_key"),
  sha256: text("sha256"),
  mime: text("mime"),
  sizeBytes: integer("size_bytes"),
  status: text("status").notNull().default("missing"),
  uploadedBy: text("uploaded_by"),
  visibleToCustomer: boolean("visible_to_customer").notNull().default(true),
  ...timestamps,
});
