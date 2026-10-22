import { customType, integer, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";

import { appSchema } from "./auth";

const tsvector = customType<{ data: string }>({
  dataType() {
    return "tsvector";
  },
});

export const contentChunks = appSchema.table("content_chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceType: text("source_type").notNull(),
  sourceId: text("source_id").notNull(),
  locale: text("locale").notNull().default("en"),
  chunkIndex: integer("chunk_index").notNull().default(0),
  content: text("content").notNull(),
  tsv: tsvector("tsv"),
  embedding: vector("embedding", { dimensions: 1536 }),
  embeddingModel: text("embedding_model"),
  contentHash: text("content_hash").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});
