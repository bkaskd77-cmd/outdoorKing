import { getTranslations } from "next-intl/server";

import { getFactLabels } from "./trip-facts-intl";

const HERO_SLUGS = new Set([
  "trekking",
  "peak-climbing",
  "expeditions",
  "tours",
  "heli-treks",
  "cultural",
  "wildlife",
  "family",
  "photography",
  "pilgrimage",
]);

/** Activity chips and hero lines in the request's language. */
export async function getActivityLabels() {
  const t = await getTranslations("activity");
  const facts = await getFactLabels();
  return {
    facts,
    t,
    /** "1,400–6,165 m", only when the activity spans altitudes. */
    altitude: (min?: number, max?: number) =>
      min == null || max == null || min === max
        ? null
        : t("altitudeRange", { from: facts.number(min), to: facts.number(max) }),
    /** "5–21 days", only when lengths differ. */
    duration: (min?: number, max?: number) =>
      min == null || max == null || min === max
        ? null
        : t("durationRange", { from: min, to: max }),
    trips: (count: number) => t("tripCount", { count }),
    hero: (slug: string) => {
      const key = HERO_SLUGS.has(slug) ? slug : "default";
      return { eyebrow: t(`hero.${key}.eyebrow`), title: t(`hero.${key}.title`) };
    },
  };
}
