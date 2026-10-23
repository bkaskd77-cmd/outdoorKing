import { text, timestamp, uuid } from "drizzle-orm/pg-core";

import { appSchema } from "./auth";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const partners = appSchema.table("partners", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  portalTokenHash: text("portal_token_hash").notNull().unique(),
  status: text("status").notNull().default("active"),
  notes: text("notes"),
  ...timestamps,
});
