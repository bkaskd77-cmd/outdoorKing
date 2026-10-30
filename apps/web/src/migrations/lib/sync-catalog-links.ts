import type { CollectionSlug, Payload, PayloadRequest } from "payload";

type Doc = Record<string, unknown> & { id: number | string };

export type CatalogDocSync = {
  slug: string;
  /** Seeded values of the fields to update; omitted for documents that are new. */
  before?: Record<string, unknown>;
  after: Record<string, unknown>;
};

export type TripLinkSync = {
  slug: string;
  field: "permits" | "peaks";
  before: string[];
  after: string[];
};

async function bySlug(
  payload: Payload,
  req: PayloadRequest,
  collection: CollectionSlug,
): Promise<Map<string, Doc>> {
  const found = await payload.find({
    collection,
    depth: 0,
    draft: true,
    overrideAccess: true,
    pagination: false,
    req,
  });
  return new Map(
    (found.docs as unknown as Doc[]).map((doc) => [String(doc.slug ?? ""), doc]),
  );
}

function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

/**
 * Creates catalog documents that do not exist yet and updates seeded ones. A field of an
 * existing document changes only while it still holds its seeded value. Values named
 * `region` are region slugs, resolved to ids. Returns the slugs left (partly) alone.
 */
export async function upsertCatalogDocs(
  payload: Payload,
  req: PayloadRequest,
  collection: CollectionSlug,
  entries: CatalogDocSync[],
): Promise<string[]> {
  const skipped: string[] = [];
  const existing = await bySlug(payload, req, collection);
  const regions = await bySlug(payload, req, "regions");
  const resolve = (data: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(data).map(([field, value]) =>
        field === "region" && typeof value === "string"
          ? [field, regions.get(value)?.id ?? null]
          : [field, value],
      ),
    );
  for (const entry of entries) {
    const doc = existing.get(entry.slug);
    if (!doc) {
      await payload.create({
        collection,
        context: { seedCatalog: true },
        data: { ...resolve(entry.after), slug: entry.slug, _status: "published" } as never,
        draft: false,
        overrideAccess: true,
        req,
      });
      continue;
    }
    const before = entry.before ?? {};
    const data = Object.fromEntries(
      Object.entries(entry.after).filter(([field]) => same(doc[field], before[field])),
    );
    if (Object.keys(data).length < Object.keys(entry.after).length) skipped.push(entry.slug);
    if (Object.keys(data).length === 0) continue;
    await payload.update({
      collection,
      context: { seedCatalog: true },
      data: { ...resolve(data), _status: "published" } as never,
      draft: false,
      id: doc.id,
      overrideAccess: true,
      req,
    });
  }
  return skipped;
}

/**
 * Points trips at the permits and peaks they need. A trip's list changes only while it
 * still links exactly the seeded set. Returns "slug field" for each trip left alone.
 */
export async function syncTripLinks(
  payload: Payload,
  req: PayloadRequest,
  entries: TripLinkSync[],
): Promise<string[]> {
  const skipped: string[] = [];
  const trips = await bySlug(payload, req, "trips");
  const targets = {
    permits: await bySlug(payload, req, "permits"),
    peaks: await bySlug(payload, req, "peaks"),
  };
  for (const entry of entries) {
    const trip = trips.get(entry.slug);
    if (!trip) continue;
    const docs = targets[entry.field];
    const slugOf = new Map([...docs.values()].map((doc) => [String(doc.id), String(doc.slug)]));
    const current = ((trip[entry.field] as unknown[] | null | undefined) ?? [])
      .map((rel) => slugOf.get(String(typeof rel === "object" && rel ? (rel as Doc).id : rel)))
      .filter((slug): slug is string => Boolean(slug));
    if (!same([...current].sort(), [...entry.before].sort())) {
      skipped.push(`${entry.slug} ${entry.field}`);
      continue;
    }
    const ids = entry.after.flatMap((slug) => {
      const doc = docs.get(slug);
      return doc ? [doc.id] : [];
    });
    await payload.update({
      collection: "trips",
      context: { seedCatalog: true },
      data: { [entry.field]: ids, _status: "published" } as never,
      draft: false,
      id: trip.id,
      locale: "en",
      overrideAccess: true,
      req,
    });
  }
  return skipped;
}
