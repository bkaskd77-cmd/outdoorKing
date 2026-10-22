import { jsonb, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { appSchema } from "./auth";

export const tripRequestsLite = appSchema.table("trip_requests_lite", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailHash: text("email_hash").notNull(),
  emailCipher: text("email_cipher").notNull(),
  nameCipher: text("name_cipher").notNull(),
  tripSlug: text("trip_slug"),
  payload: jsonb("payload").$type<Record<string, unknown>>().notNull(),
  consent: jsonb("consent")
    .$type<{ privacy: boolean; marketing: boolean; policyVersion: string; at: string }>()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});
