import { date, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { appSchema } from "./auth";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const guideAssignments = appSchema.table("guide_assignments", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  guidePayloadId: text("guide_payload_id").notNull(),
  role: text("role").notNull().default("lead"),
  fromDate: date("from_date"),
  toDate: date("to_date"),
  notes: text("notes"),
  ...timestamps,
});

export const departures = appSchema.table("departures", {
  id: uuid("id").primaryKey().defaultRandom(),
  tripSlug: text("trip_slug").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  status: text("status").notNull().default("planned"),
  capacity: text("capacity"),
  notes: text("notes"),
  ...timestamps,
});

export const permitApplications = appSchema.table("permit_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  permitPayloadId: text("permit_payload_id").notNull(),
  status: text("status").notNull().default("not_started"),
  referenceCipher: text("reference_cipher"),
  submittedAt: timestamp("submitted_at", { withTimezone: true, mode: "date" }),
  issuedAt: timestamp("issued_at", { withTimezone: true, mode: "date" }),
  notes: text("notes"),
  ...timestamps,
});
