import { jsonb, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { appSchema } from "./auth";

export const auditLog = appSchema.table("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  at: timestamp("at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  actorType: text("actor_type").notNull(),
  actorId: text("actor_id").notNull(),
  actorRole: text("actor_role"),
  action: text("action").notNull(),
  resourceType: text("resource_type"),
  resourceId: text("resource_id"),
  ipHash: text("ip_hash"),
  ua: text("ua"),
  requestId: text("request_id"),
  before: jsonb("before").$type<Record<string, unknown> | null>(),
  after: jsonb("after").$type<Record<string, unknown> | null>(),
  prevHash: text("prev_hash"),
  hash: text("hash").notNull(),
});
