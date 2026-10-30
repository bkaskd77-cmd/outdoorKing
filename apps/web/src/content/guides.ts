import type { CatalogPage } from "./types";
import { type GuideGroup, guideGroupName, guides } from "./guide-copy";

export { guideGroupName };

export type GuideView = CatalogPage & {
  /** The last part of the web address, /guides/<urlSlug>. */
  urlSlug: string;
  group: GuideGroup;
  /** Related trip slugs. */
  trips: string[];
  /** First paragraph of the body, for cards and search results. */
  summary: string;
};

const PREFIX = "/guides/";

/** The guides among the site's pages, in reading order; text comes from the CMS. */
export function guidesOf(pages: CatalogPage[]): GuideView[] {
  const order = new Map(guides.map((guide, index) => [guide.slug, index]));
  return pages
    .filter((page) => page.path.startsWith(PREFIX) && page.path.length > PREFIX.length)
    .map((page) => {
      const meta = guides.find((guide) => guide.slug === page.slug);
      return {
        ...page,
        urlSlug: page.path.slice(PREFIX.length),
        group: meta?.group ?? "plan",
        trips: meta?.trips ?? [],
        summary:
          page.body
            .split("\n")
            .map((line) => line.trim())
            .find((line) => line && !line.startsWith("## ") && !line.startsWith("- ")) ??
          "",
      };
    })
    .sort((a, b) => (order.get(a.slug) ?? 99) - (order.get(b.slug) ?? 99));
}
