import { createHash } from "node:crypto";

import type { CollectionAfterChangeHook } from "payload";

export const enqueueEmbed: CollectionAfterChangeHook = async ({ doc, collection }) => {
  if (doc._status !== "published") return doc;
  try {
    const { db, contentChunks } = await import("@ok/db");
    const sourceId = String(doc.id);
    const content = JSON.stringify({
      title: doc.title ?? doc.name ?? doc.question,
      slug: doc.slug,
    });
    const contentHash = createHash("sha256").update(content).digest("hex");
    await db.insert(contentChunks).values({
      sourceType: collection.slug,
      sourceId,
      locale: "en",
      chunkIndex: 0,
      content,
      contentHash,
      publishedAt: new Date(),
    });
  } catch {
    // Embed upsert is a no-op until Phase 2; table write is best-effort.
  }
  return doc;
};
