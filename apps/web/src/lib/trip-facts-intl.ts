import { getLocale, getTranslations } from "next-intl/server";

import type { FactLabels } from "./trip-facts";

/** Fact-line words and number format for the request's language. */
export async function getFactLabels(): Promise<FactLabels> {
  const t = await getTranslations("facts");
  const locale = await getLocale();
  const numbers = new Intl.NumberFormat(locale === "zh-Hans" ? "zh-CN" : locale);
  return {
    days: (count) => t("days", { count }),
    upTo: (height) => t("upTo", { height }),
    difficulty: {
      easy: t("easy"),
      moderate: t("moderate"),
      challenging: t("challenging"),
      strenuous: t("strenuous"),
      technical: t("technical"),
    },
    number: (value) => numbers.format(value),
  };
}
