import { enqueue } from "@ok/jobs";
import type { CollectionAfterChangeHook } from "payload";

const SKIP_INDEX = new Set(["reviews", "users", "media"]);

function publishedBody(doc: Record<string, unknown>): string {
  const pieces = [
    doc.title,
    doc.name,
    doc.question,
    doc.answer,
    doc.summary,
    doc.overview,
    doc.notes,
    doc.body,
    doc.slug,
    doc.path,
  ];
  return pieces
    .filter((value) => typeof value === "string" && value.length > 0)
    .join("\n")
    .slice(0, 8000);
}

/** Index published CMS docs only. No PII collections, quotes, bookings or reviews. */
export const enqueueEmbed: CollectionAfterChangeHook = async ({
  doc,
  collection,
  req,
}) => {
  if (req.context?.seedCatalog) return doc;
  if (SKIP_INDEX.has(collection.slug)) return doc;
  if (doc._status !== "published") return doc;
  try {
    const sourceId = String(doc.slug ?? doc.id);
    const locale = typeof doc.locale === "string" ? doc.locale : "en";
    const content = publishedBody(doc as Record<string, unknown>);
    await enqueue({
      name: "content.embed",
      payload: {
        sourceType: collection.slug,
        sourceId,
        locale,
        content,
      },
    });
  } catch {
    // Embed upsert is best-effort until Postgres is reachable.
  }
  return doc;
};
