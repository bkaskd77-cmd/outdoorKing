import type { Route } from "next";

export const QUOTES_ADMIN_PATH = "/admin/quotes";

const localePrefix = "(?:/(?:en|de|fr|zh-Hans))?";

export function quotesHref(path = ""): Route {
  const suffix = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return (suffix ? `${QUOTES_ADMIN_PATH}/${suffix}` : QUOTES_ADMIN_PATH) as Route;
}

/** Map a public /desk URL onto the quotes section inside the admin. */
export function deskToQuotes(pathname: string): string {
  const match = pathname.match(new RegExp(`^${localePrefix}/desk(?:/(.*))?/?$`));
  if (!match) return QUOTES_ADMIN_PATH;
  return quotesHref(match[1] ?? "");
}
