import { headers } from "next/headers";

import { StaffSignOut } from "@/components/admin/StaffSignOut";
import { QUOTES_ADMIN_PATH } from "@/components/desk/paths";

type Labeled = {
  slug: string;
  label?: unknown;
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

type NavGroup = { title: string; collections: string[]; globals?: string[] };

/** The editor's map of the site. Itinerary days are edited inside their trip. */
const groups: NavGroup[] = [
  {
    title: "Trips",
    collections: ["trips", "activities", "regions", "peaks", "permits", "seasons"],
  },
  { title: "Pages & help", collections: ["pages", "faqs", "posts"] },
  { title: "People & reviews", collections: ["team-members", "guides", "reviews"] },
  { title: "Photos", collections: ["media"] },
];
const settings: NavGroup = {
  title: "Settings",
  collections: ["redirects", "users"],
  globals: [
    "site-settings",
    "company-facts",
    "navigation",
    "footer",
    "safety-rules",
    "payment-policy",
  ],
};
const unlisted = new Set(["itinerary-days"]);

function fallbackLabel(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function labelOf(entity: Labeled, language: string): string {
  const plural = entity.labels?.plural ?? entity.label;
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

  const listed = new Set([
    ...unlisted,
    ...groups.flatMap((group) => group.collections),
    ...settings.collections,
  ]);
  const extra = collections.filter(
    (item) => visibleCollections.has(item.slug) && !listed.has(item.slug),
  );
  const sections = groups
    .map((group) => ({
      title: group.title,
      items: pick(group.collections, collections, visibleCollections),
    }))
    .filter((section) => section.items.length > 0);
  if (extra.length > 0) sections.push({ title: "More", items: extra });
  const settingsItems = [
    ...pick(settings.collections, collections, visibleCollections),
    ...pick(settings.globals ?? [], globals, visibleGlobals),
  ];
  const settingsGlobals = new Set(settings.globals);
  const quotesActive =
    pathname === QUOTES_ADMIN_PATH || pathname.startsWith(`${QUOTES_ADMIN_PATH}/`);
  const homeActive = pathname === admin || pathname === `${admin}/`;

  function itemHref(kind: "collections" | "globals", slug: string): string {
    return `${admin}/${kind}/${slug}`;
  }

  function current(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function link(item: Labeled, kind: "collections" | "globals") {
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
  }

  return (
    <aside className="nav ok-staff-nav">
      <div className="ok-staff-nav-scroll">
        <p className="ok-staff-mark">OutdoorKing</p>
        <p className="ok-staff-role">Staff desk</p>

        <nav aria-label="Staff desk">
          <p className="ok-staff-group">Work</p>
          <a
            className="ok-staff-link"
            href={admin}
            aria-current={homeActive ? "page" : undefined}
          >
            Overview
          </a>
          <a
            className="ok-staff-link"
            href={QUOTES_ADMIN_PATH}
            aria-current={quotesActive ? "page" : undefined}
          >
            Quotes
          </a>

          {sections.map((section) => (
            <div key={section.title}>
              <p className="ok-staff-group">{section.title}</p>
              {section.items.map((item) => link(item, "collections"))}
            </div>
          ))}

          {settingsItems.length > 0 ? (
            <details
              className="ok-staff-more"
              open={settingsItems.some((item) =>
                current(
                  itemHref(
                    settingsGlobals.has(item.slug) ? "globals" : "collections",
                    item.slug,
                  ),
                ),
              )}
            >
              <summary>{settings.title}</summary>
              {settingsItems.map((item) =>
                link(item, settingsGlobals.has(item.slug) ? "globals" : "collections"),
              )}
            </details>
          ) : null}
        </nav>

        <StaffSignOut loginHref={`${admin}/login`} />
      </div>
    </aside>
  );
}
