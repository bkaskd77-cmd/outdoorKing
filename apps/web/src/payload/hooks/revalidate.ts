import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

import { CATALOG_TAG } from "../../content/cache-tags";

async function touch(tags: string[]): Promise<void> {
  try {
    const { revalidateTag } = await import("next/cache");
    for (const tag of tags) {
      revalidateTag(tag, "max");
    }
    // Editors expect their change on the next page load, not after one stale view.
    revalidateTag(CATALOG_TAG, { expire: 0 });
  } catch {
    // Payload CLI and tests have no Next.js cache.
  }
}

export function revalidateCollection(kind: string): CollectionAfterChangeHook {
  return async ({ doc, req }) => {
    if (req.context?.seedCatalog) return doc;
    const slug = typeof doc.slug === "string" ? doc.slug : "";
    await touch([`${kind}:${slug}`, "nav", "sitemap"]);
    return doc;
  };
}

export function revalidateDelete(kind: string): CollectionAfterDeleteHook {
  return async ({ doc, req }) => {
    if (req.context?.seedCatalog) return;
    const slug = typeof doc.slug === "string" ? doc.slug : "";
    await touch([`${kind}:${slug}`, "nav", "sitemap"]);
  };
}
