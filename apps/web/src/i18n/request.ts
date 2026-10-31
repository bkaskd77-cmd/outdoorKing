import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

type Messages = { [key: string]: string | Messages };

/** The locale's messages over the English ones, so anything not yet translated reads in English. */
function withEnglish(english: Messages, local: Messages): Messages {
  const merged: Messages = { ...english };
  for (const [key, value] of Object.entries(local)) {
    const base = merged[key];
    merged[key] =
      typeof value === "object" && typeof base === "object"
        ? withEnglish(base, value)
        : value;
  }
  return merged;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && routing.locales.includes(requested as (typeof routing.locales)[number])
      ? requested
      : routing.defaultLocale;
  const english = (await import("../../messages/en.json")).default as Messages;
  const local =
    locale === routing.defaultLocale
      ? english
      : ((await import(`../../messages/${locale}.json`)).default as Messages);

  return {
    locale,
    messages: locale === routing.defaultLocale ? english : withEnglish(english, local),
  };
});
