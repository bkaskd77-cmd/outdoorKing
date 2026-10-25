import { headers } from "next/headers";

import { QUOTES_ADMIN_PATH } from "@/components/desk/paths";

type Labeled = {
  slug: string;
  labels?: { plural?: unknown };
};

type StaffNavProps = {
  i18n?: { language?: string };
  payload?: {
    config?: {
      routes?: { admin?: string };
      collections?: Labeled[];
      globals?: Labeled[];
    };
  };
  visibleEntities?: {
    collections?: string[];
    globals?: string[];
  };
};

const contentOrder = ["trips", "regions", "pages"];
const libraryOrder = [
  "activities",
  "faqs",
  "itinerary-days",
  "peaks",
  "permits",
  "seasons",
  "posts",
  "media",
  "guides",
  "reviews",
  "team-members",
];
const siteCollections = ["redirects", "users"];
const siteGlobals = [
  "site-settings",
  "company-facts",
  "navigation",
  "footer",
  "safety-rules",
  "payment-policy",
];

function fallbackLabel(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function labelOf(entity: Labeled, language: string): string {
  const plural = entity.labels?.plural;
  if (typeof plural === "string" && plural.trim()) return plural;
  if (plural && typeof plural === "object") {
    const record = plural as Record<string, string>;
    const translated = record[language] || record.en;
    if (translated) return translated;
  }
  return fallbackLabel(entity.slug);
}

function pick(order: string[], entities: Labeled[], visible: Set<string>): Labeled[] {
  const bySlug = new Map(
    entities
      .filter((entity) => visible.has(entity.slug))
      .map((entity) => [entity.slug, entity]),
  );
  return order.flatMap((slug) => {
    const entity = bySlug.get(slug);
    return entity ? [entity] : [];
  });
}

export async function StaffNav({ i18n, payload, visibleEntities }: StaffNavProps) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || headerList.get("next-url") || "";
  const language = i18n?.language ?? "en";
  const admin = payload?.config?.routes?.admin ?? "/admin";
  const collections = payload?.config?.collections ?? [];
  const globals = payload?.config?.globals ?? [];
  const visibleCollections = new Set(
    visibleEntities?.collections ?? collections.map((item) => item.slug),
  );
  const visibleGlobals = new Set(
    visibleEntities?.globals ?? globals.map((item) => item.slug),
  );

  const content = pick(contentOrder, collections, visibleCollections);
  const known = new Set([...contentOrder, ...libraryOrder, ...siteCollections]);
  const library = [
    ...pick(libraryOrder, collections, visibleCollections),
    ...collections.filter(
      (item) => visibleCollections.has(item.slug) && !known.has(item.slug),
    ),
  ];
  const site = [
    ...pick(siteCollections, collections, visibleCollections),
    ...pick(siteGlobals, globals, visibleGlobals),
  ];
  const quotesActive =
    pathname === QUOTES_ADMIN_PATH || pathname.startsWith(`${QUOTES_ADMIN_PATH}/`);

  function itemHref(kind: "collections" | "globals", slug: string): string {
    return `${admin}/${kind}/${slug}`;
  }

  function current(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="nav ok-staff-nav">
      <div className="ok-staff-nav-scroll">
        <p className="ok-staff-mark">OutdoorKing</p>
        <p className="ok-staff-role">Staff desk</p>

        <p className="ok-staff-group">Work</p>
        <a
          className="ok-staff-link ok-staff-link-work"
          href={QUOTES_ADMIN_PATH}
          aria-current={quotesActive ? "page" : undefined}
        >
          Quotes
        </a>

        {content.length > 0 ? (
          <>
            <p className="ok-staff-group">Content</p>
            {content.map((item) => {
              const href = itemHref("collections", item.slug);
              return (
                <a
                  key={item.slug}
                  className="ok-staff-link"
                  href={href}
                  aria-current={current(href) ? "page" : undefined}
                >
                  {labelOf(item, language)}
                </a>
              );
            })}
          </>
        ) : null}

        {library.length > 0 ? (
          <details className="ok-staff-more">
            <summary>Library</summary>
            {library.map((item) => {
              const href = itemHref("collections", item.slug);
              return (
                <a
                  key={item.slug}
                  className="ok-staff-link"
                  href={href}
                  aria-current={current(href) ? "page" : undefined}
                >
                  {labelOf(item, language)}
                </a>
              );
            })}
          </details>
        ) : null}

        {site.length > 0 ? (
          <details className="ok-staff-more">
            <summary>Site</summary>
            {site.map((item) => {
              const kind = siteGlobals.includes(item.slug) ? "globals" : "collections";
              const href = itemHref(kind, item.slug);
              return (
                <a
                  key={item.slug}
                  className="ok-staff-link"
                  href={href}
                  aria-current={current(href) ? "page" : undefined}
                >
                  {labelOf(item, language)}
                </a>
              );
            })}
          </details>
        ) : null}

        <a className="ok-staff-signout" href={`${admin}/logout`}>
          Sign out
        </a>
      </div>
    </aside>
  );
}
