import type { CollectionSlug, Payload, PayloadRequest } from "payload";

export type TranslationSync = {
  slug: string;
  /** Translated values of localized fields. */
  data: Record<string, unknown>;
};

function empty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

/**
 * Seeds one language's text into documents found by slug. A field is written only
 * while it is still empty in that language, so translations an editor has already
 * made are left alone. English is never touched. Returns the slugs that were skipped.
 */
export async function syncTranslations(
  payload: Payload,
  req: PayloadRequest,
  collection: CollectionSlug,
  locale: "de" | "fr" | "zh-Hans",
  entries: TranslationSync[],
): Promise<string[]> {
  const skipped: string[] = [];
  const all = await payload.find({
    collection,
    depth: 0,
    draft: true,
    locale,
    // Read only what this language holds, so English fallbacks count as empty.
    fallbackLocale: false,
    overrideAccess: true,
    pagination: false,
    req,
  });
  const english = await payload.find({
    collection,
    depth: 0,
    draft: true,
    locale: "en",
    overrideAccess: true,
    pagination: false,
    req,
  });
  const idBySlug = new Map(
    (english.docs as unknown as { id: number | string; slug?: string }[]).map((doc) => [
      String(doc.slug ?? ""),
      doc.id,
    ]),
  );
  const docs = new Map(
    (all.docs as unknown as (Record<string, unknown> & { id: number | string })[]).map(
      (doc) => [String(doc.id), doc],
    ),
  );
  for (const entry of entries) {
    const id = idBySlug.get(entry.slug);
    const doc = id === undefined ? undefined : docs.get(String(id));
    if (id === undefined || !doc) continue;
    const data: Record<string, unknown> = Object.fromEntries(
      Object.entries(entry.data).filter(([field]) => empty(doc[field])),
    );
    if (Object.keys(data).length < Object.keys(entry.data).length) skipped.push(entry.slug);
    if (Object.keys(data).length === 0) continue;
    // Where the URL slug is translatable, keep the English one so addresses stay the same.
    if ("slug" in doc && empty(doc.slug)) data.slug = entry.slug;
    await payload.update({
      collection,
      context: { seedCatalog: true },
      data: { ...data, _status: "published" } as never,
      draft: false,
      id,
      locale,
      overrideAccess: true,
      req,
    });
  }
  return skipped;
}
