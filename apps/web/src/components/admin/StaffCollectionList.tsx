import type { ListViewClientProps, Payload, Where } from "payload";

import { StaffCollectionSwitch } from "./StaffCollectionSwitch";

type Doc = Record<string, unknown>;

type ListArgs = {
  collectionConfig?: {
    admin?: { listSearchableFields?: string[]; useAsTitle?: string };
    defaultSort?: string | string[];
    labels?: { plural?: unknown; singular?: unknown };
    slug?: string;
  };
  collectionSlug?: string;
  hasCreatePermission?: boolean;
  i18n?: { language?: string };
  locale?: unknown;
  newDocumentURL?: string;
  params?: unknown;
  payload?: Payload;
  permissions?: unknown;
  searchParams?: Record<string, unknown> | Promise<Record<string, unknown>>;
  user?: unknown;
} & ListViewClientProps;

const contentSlugs = new Set(["trips", "regions", "pages"]);
const siteSlugs = new Set(["redirects", "users"]);

function plain(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const preferred = record.en ?? record["zh-Hans"] ?? record.de ?? record.fr;
    if (typeof preferred === "string" && preferred.trim()) return preferred.trim();
    for (const item of Object.values(record)) {
      if (typeof item === "string" && item.trim()) return item.trim();
    }
  }
  return "";
}

function labelText(value: unknown, language: string, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const localized = record[language] ?? record.en;
    if (typeof localized === "string" && localized.trim()) return localized;
    return plain(record.plural) || plain(record.singular) || fallback;
  }
  return fallback;
}

function one(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function groupFor(slug: string): string {
  if (contentSlugs.has(slug)) return "Content";
  if (siteSlugs.has(slug)) return "Site";
  return "Library";
}

function snippetOf(doc: Doc): string {
  return (
    plain(doc.summary) ||
    plain(doc.subtitle) ||
    plain(doc.overview) ||
    plain(doc.path) ||
    plain(doc.answer) ||
    plain(doc.question) ||
    plain(doc.slug) ||
    plain(doc.email)
  );
}

export async function StaffCollectionList(props: ListArgs) {
  const slug = props.collectionSlug || props.collectionConfig?.slug || "collection";
  const language = props.i18n?.language ?? "en";
  const plural = labelText(props.collectionConfig?.labels?.plural, language, slug);
  const singular = labelText(props.collectionConfig?.labels?.singular, language, plural);
  const useAsTitle = props.collectionConfig?.admin?.useAsTitle || "id";
  const searchFields = props.collectionConfig?.admin?.listSearchableFields?.length
    ? props.collectionConfig.admin.listSearchableFields
    : [useAsTitle];
  const params = await Promise.resolve(props.searchParams ?? {});
  const search = one(params.search).trim();
  const pageRaw = Number(one(params.page) || "1");
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const sort =
    typeof props.collectionConfig?.defaultSort === "string"
      ? props.collectionConfig.defaultSort
      : useAsTitle;

  let docs: Doc[] = [];
  let totalDocs = 0;
  let totalPages = 1;
  let failed = false;

  if (props.payload) {
    const where: Where | undefined = search
      ? {
          or: searchFields.map((field) => ({
            [field]: { like: search },
          })),
        }
      : undefined;
    try {
      const result = await props.payload.find({
        collection: slug as "activities",
        depth: 0,
        draft: true,
        limit: 60,
        overrideAccess: false,
        page,
        sort,
        user: props.user as never,
        where,
      });
      docs = result.docs as unknown as Doc[];
      totalDocs = result.totalDocs;
      totalPages = result.totalPages;
    } catch {
      failed = true;
    }
  }

  const leads: Record<string, string> = {
    activities: "The activities already published on the site.",
    pages: "The pages the public site is built from.",
    regions: "Nepal’s regions, as the site publishes them.",
    trips: "Private journeys from the catalog. Prices stay off the public pages.",
  };

  const view = (
    <section className="ok-staff-list">
      <header className="ok-desk-head">
        <p className="ok-desk-kicker">{groupFor(slug)}</p>
        <h1>{plural}</h1>
        <p className="ok-desk-lead">
          {leads[slug] ?? `${String(totalDocs)} on this desk.`}
        </p>
      </header>

      <form className="ok-staff-tools" action={`/admin/collections/${slug}`} method="get">
        <label>
          <span>Search</span>
          <input
            defaultValue={search}
            name="search"
            placeholder={`Search ${plural.toLowerCase()}`}
            type="search"
          />
        </label>
        {props.hasCreatePermission && props.newDocumentURL ? (
          <a className="ok-staff-create" href={props.newDocumentURL}>
            New {singular.toLowerCase()}
          </a>
        ) : null}
      </form>

      {failed ? (
        <article className="ok-desk-empty">
          <p className="ok-desk-empty-kicker">{plural}</p>
          <h2>This list did not load</h2>
          <p>Refresh the desk and try again.</p>
        </article>
      ) : docs.length === 0 ? (
        <article className="ok-desk-empty">
          <p className="ok-desk-empty-kicker">{search ? "Search" : groupFor(slug)}</p>
          <h2>{search ? "Nothing matches" : `No ${plural.toLowerCase()} yet`}</h2>
          <p>
            {search
              ? `No ${plural.toLowerCase()} include “${search}”.`
              : `When you add one, it shows up here.`}
          </p>
        </article>
      ) : (
        <>
          <p className="ok-staff-count">
            {search
              ? `${String(totalDocs)} matching “${search}”`
              : `${String(totalDocs)} ${plural.toLowerCase()}`}
          </p>
          <ul className="ok-desk-list">
            {docs.map((doc) => {
              const id = plain(doc.id);
              const title =
                plain(doc[useAsTitle]) || plain(doc.title) || plain(doc.name) || id;
              const detail = snippetOf(doc);
              const status = plain(doc._status);
              return (
                <li key={id}>
                  <a href={`/admin/collections/${slug}/${id}`}>
                    <strong>
                      {title}
                      {detail && detail !== title ? <span>{detail}</span> : null}
                    </strong>
                    <em>{status === "draft" ? "Draft" : plain(doc.slug) || singular}</em>
                  </a>
                </li>
              );
            })}
          </ul>
          {totalPages > 1 ? (
            <nav className="ok-staff-pages" aria-label={`${plural} pages`}>
              {page > 1 ? (
                <a href={pageHref(slug, search, page - 1)}>Previous</a>
              ) : (
                <span>Previous</span>
              )}
              <span>
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <a href={pageHref(slug, search, page + 1)}>Next</a>
              ) : (
                <span>Next</span>
              )}
            </nav>
          ) : null}
        </>
      )}
    </section>
  );

  const {
    collectionConfig: _collectionConfig,
    i18n: _i18n,
    locale: _locale,
    params: _params,
    payload: _payload,
    permissions: _permissions,
    renderedFilters: _renderedFilters,
    resolvedFilterOptions: _resolvedFilterOptions,
    searchParams: _searchParams,
    user: _user,
    ...listProps
  } = props;

  return <StaffCollectionSwitch listProps={listProps} view={view} />;
}

function pageHref(slug: string, search: string, page: number): string {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/admin/collections/${slug}${query ? `?${query}` : ""}`;
}
