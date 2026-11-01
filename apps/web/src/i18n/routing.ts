import { defineRouting } from "next-intl/routing";

// French and Chinese are switched off until their translations exist; the CMS keeps
// those languages, and src/proxy.ts sends old /fr and /zh-Hans links to English.
export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
