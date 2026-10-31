import { describe, expect, it } from "vitest";

import { codeCatalogData } from "../catalog";
import { dayCopy } from "../day-copy";
import { blocksOf } from "../../lib/page-blocks";
import { translateCatalog, translations } from "./index";

const shape = (text: string) =>
  blocksOf(text).map((block) =>
    block.kind === "list" ? `list:${String(block.items.length)}` : block.kind,
  );

describe("German translations", () => {
  const de = translations.de;
  if (!de) throw new Error("German translations missing");

  it("only translate pages and FAQs that exist in English", () => {
    const pageSlugs = new Set(codeCatalogData.pages.map((page) => page.slug));
    const faqSlugs = new Set(codeCatalogData.faqs.map((faq) => faq.slug));
    expect(Object.keys(de.pages ?? {}).filter((slug) => !pageSlugs.has(slug))).toEqual(
      [],
    );
    expect(Object.keys(de.faqs ?? {}).filter((slug) => !faqSlugs.has(slug))).toEqual([]);
  });

  it("keep the headings and lists of the English text", () => {
    for (const page of codeCatalogData.pages) {
      const body = de.pages?.[page.slug]?.body;
      if (body) expect([page.slug, shape(body)]).toEqual([page.slug, shape(page.body)]);
    }
  });

  it("only translate catalog items that exist in English", () => {
    const missing = (
      english: { slug: string }[],
      german: Record<string, unknown> | undefined,
    ) => {
      const slugs = new Set(english.map((item) => item.slug));
      return Object.keys(german ?? {}).filter((slug) => !slugs.has(slug));
    };
    expect(missing(codeCatalogData.activities, de.activities)).toEqual([]);
    expect(missing(codeCatalogData.regions, de.regions)).toEqual([]);
    expect(missing(codeCatalogData.seasons, de.seasons)).toEqual([]);
    expect(missing(codeCatalogData.permits, de.permits)).toEqual([]);
    expect(missing(codeCatalogData.peaks, de.peaks)).toEqual([]);
  });

  it("keep the headings and lists of English place text", () => {
    const same = (
      slug: string,
      german: string | undefined,
      english: string | undefined,
    ) => {
      if (german && english)
        expect([slug, shape(german)]).toEqual([slug, shape(english)]);
    };
    for (const item of codeCatalogData.activities)
      same(item.slug, de.activities?.[item.slug]?.body, item.body);
    for (const item of codeCatalogData.regions)
      same(item.slug, de.regions?.[item.slug]?.body, item.body);
    for (const item of codeCatalogData.permits)
      same(item.slug, de.permits?.[item.slug]?.notes, item.notes);
    for (const item of codeCatalogData.peaks)
      same(item.slug, de.peaks?.[item.slug]?.description, item.description);
  });

  it("lay German over English and leave the rest in English", () => {
    const data = translateCatalog(codeCatalogData, de);
    const faq = data.faqs.find((item) => item.slug === "tipping");
    expect(faq?.question).toMatch(/Trinkgeld/);
    expect(data.trips.map((trip) => trip.days.length)).toEqual(
      codeCatalogData.trips.map((trip) => trip.days.length),
    );
    expect(
      codeCatalogData.faqs.find((item) => item.slug === "tipping")?.question,
    ).toMatch(/tip/);
  });

  it("translate every trip and keep its lists the same length", () => {
    const tripSlugs = codeCatalogData.trips.map((trip) => trip.slug);
    expect(Object.keys(de.trips ?? {}).sort()).toEqual([...tripSlugs].sort());
    const paragraphs = (text: string) => text.split("\n").filter(Boolean).length;
    for (const trip of codeCatalogData.trips) {
      const german = de.trips?.[trip.slug];
      expect([trip.slug, german?.highlights?.length]).toEqual([
        trip.slug,
        trip.highlights.length,
      ]);
      expect([trip.slug, paragraphs(german?.overview ?? "")]).toEqual([
        trip.slug,
        paragraphs(trip.overview),
      ]);
    }
  });

  it("have German for every shared trip line", () => {
    const phrases = de.tripPhrases ?? {};
    const lines = new Set(
      codeCatalogData.trips.flatMap((trip) => [...trip.inclusions, ...trip.exclusions]),
    );
    expect([...lines].filter((line) => !(line in phrases))).toEqual([]);
    const data = translateCatalog(codeCatalogData, de);
    const everest = data.trips.find((trip) => trip.slug === "everest-base-camp-trek");
    expect(everest?.inclusions).toContain("Träger für dein Hauptgepäck");
    expect(everest?.startPoint).toMatch(/Flug nach Lukla/);
  });

  it("translate every day of a trip once its days are translated", () => {
    for (const [slug, days] of Object.entries(de.dayCopy ?? {})) {
      expect([slug, Object.keys(days).sort()]).toEqual([
        slug,
        Object.keys(dayCopy[slug] ?? {}).sort(),
      ]);
    }
  });

  it("only translate day titles that exist in English", () => {
    const titles = new Set(
      codeCatalogData.trips.flatMap((trip) => trip.days.map((day) => day.title)),
    );
    expect(Object.keys(de.dayTitles ?? {}).filter((title) => !titles.has(title))).toEqual(
      [],
    );
    const data = translateCatalog(codeCatalogData, de);
    const ebc = data.trips.find((trip) => trip.slug === "everest-base-camp-trek");
    expect(ebc?.days[0]?.title).toBe("Ankunft in Kathmandu");
    expect(ebc?.days[2]?.description).toMatch(/Hängebrücken/);
  });
});
