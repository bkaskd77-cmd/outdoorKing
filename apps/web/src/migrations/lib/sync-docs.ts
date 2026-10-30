import type { CollectionSlug, Payload, PayloadRequest } from "payload";

export type DocSync = {
  slug: string;
  before: Record<string, unknown>;
  after: Record<string, unknown>;
};

/**
 * Applies new seeded copy to documents found by slug. A field changes only while it
 * still holds the seeded text, so documents an editor has already rewritten are left
 * alone. Returns the slugs that were skipped.
 */
export async function syncDocs(
  payload: Payload,
  req: PayloadRequest,
  collection: CollectionSlug,
  entries: DocSync[],
): Promise<string[]> {
  const skipped: string[] = [];
  for (const entry of entries) {
    const found = await payload.find({
      collection,
      depth: 0,
      draft: true,
      limit: 1,
      overrideAccess: true,
      req,
      where: { slug: { equals: entry.slug } },
    });
    const doc = found.docs[0] as unknown as
      | (Record<string, unknown> & { id: number | string })
      | undefined;
    if (!doc) continue;
    const data = Object.fromEntries(
      Object.entries(entry.after).filter(
        ([field]) => (doc[field] ?? null) === (entry.before[field] ?? null),
      ),
    );
    if (Object.keys(data).length < Object.keys(entry.after).length) skipped.push(entry.slug);
    if (Object.keys(data).length === 0) continue;
    await payload.update({
      collection,
      context: { seedCatalog: true },
      data: { ...data, _status: "published" } as never,
      draft: false,
      id: doc.id,
      overrideAccess: true,
      req,
    });
  }
  return skipped;
}
