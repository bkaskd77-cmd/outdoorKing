import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

async function touch(tags: string[]): Promise<void> {
  try {
    const { revalidateTag } = await import("next/cache");
    for (const tag of tags) {
      revalidateTag(tag, "max");
    }
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
