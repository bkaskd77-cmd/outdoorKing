import { describe, expect, it } from "vitest";

import { codeCatalogData } from "./catalog";

const trip = (slug: string) => {
  const found = codeCatalogData.trips.find((item) => item.slug === slug);
  if (!found) throw new Error(`Missing trip ${slug}`);
  return found;
};

describe("trip questions", () => {
  const faqSlugs = new Set(codeCatalogData.faqs.map((faq) => faq.slug));

  it("give every trip three to five questions that exist", () => {
    for (const item of codeCatalogData.trips) {
      expect([item.slug, item.faqs.every((slug) => faqSlugs.has(slug))]).toEqual([
        item.slug,
        true,
      ]);
      expect(item.faqs.length).toBeGreaterThanOrEqual(3);
      expect(item.faqs.length).toBeLessThanOrEqual(5);
    }
  });

  it("fit the kind of trip", () => {
    expect(trip("everest-base-camp-trek").faqs).toContain("lukla-flights");
    expect(trip("manaslu-circuit-trek").faqs).toContain("restricted-area-group");
    expect(trip("island-peak-climbing").faqs[0]).toBe("climbing-experience");
    expect(trip("everest-expedition-south-col").faqs[0]).toBe("expedition-permit");
    expect(trip("chitwan-national-park-safari").faqs[0]).toBe("wildlife-safety");
    expect(trip("chitwan-national-park-safari").faqs).not.toContain(
      "how-hard-is-altitude",
    );
    expect(trip("pokhara-paragliding").faqs[0]).toBe("adventure-limits");
    expect(trip("everest-helicopter-tour").faqs[0]).toBe("helicopter-acclimatisation");
  });

  it("are no longer the same everywhere", () => {
    const lists = new Set(codeCatalogData.trips.map((item) => item.faqs.join(",")));
    expect(lists.size).toBeGreaterThan(10);
  });
});
