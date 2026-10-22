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

import { appSchema } from "./auth";
import { customers } from "./quotes";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const conciergeConversations = appSchema.table("concierge_conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id").references(() => customers.id),
  sessionHash: text("session_hash").notNull(),
  locale: text("locale").notNull().default("en"),
  handedOffTo: text("handed_off_to"),
  flagged: boolean("flagged").notNull().default(false),
  ...timestamps,
});

export const conciergeMessages = appSchema.table("concierge_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conciergeConversations.id),
  role: text("role").notNull(),
  content: text("content"),
  contentCipher: text("content_cipher"),
  toolCalls: jsonb("tool_calls").$type<string[]>(),
  citations:
    jsonb("citations").$type<{ chunkId: string; title: string; url: string }[]>(),
  intent: text("intent"),
  modelId: text("model_id"),
  tokensIn: integer("tokens_in"),
  tokensOut: integer("tokens_out"),
  costUsd: numeric("cost_usd"),
  flagged: boolean("flagged").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const aiUsageDaily = appSchema.table(
  "ai_usage_daily",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    day: date("day").notNull(),
    alias: text("alias").notNull(),
    model: text("model").notNull(),
    tokens: integer("tokens").notNull().default(0),
    costUsd: numeric("cost_usd").notNull().default("0"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("ai_usage_daily_day_alias_model").on(table.day, table.alias, table.model),
  ],
);
