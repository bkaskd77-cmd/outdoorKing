import { Gutter } from "@payloadcms/ui";
import { redirect } from "next/navigation";
import type { AdminViewServerProps, CollectionSlug, Payload, Where } from "payload";

import { AiWriterPanel } from "@/components/admin/AiWriter";
import { QUOTES_ADMIN_PATH } from "@/components/desk/paths";
import { checkTrip, type SafetyDay, type SafetyTrip } from "@/payload/safety";

type Doc = Record<string, unknown> & { id: number | string };

type Recent = { href: string; title: string; kind: string; updatedAt: string };

const recentSources: { slug: CollectionSlug; kind: string; title: string }[] = [
  { slug: "trips", kind: "Trip", title: "title" },
  { slug: "pages", kind: "Page", title: "title" },
  { slug: "faqs", kind: "FAQ", title: "question" },
  { slug: "regions", kind: "Region", title: "name" },
  { slug: "activities", kind: "Activity", title: "title" },
  { slug: "posts", kind: "Blog post", title: "title" },
];

function text(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const en = record.en;
    if (typeof en === "string") return en;
  }
  return "";
}

function when(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Payload renders the dashboard inside its default template (with the staff nav). */
export async function DashboardView({ initPageResult }: AdminViewServerProps) {
  const { req } = initPageResult;
  if (!req.user) redirect("/admin/login");
  const payload = req.payload;
  const user = req.user;

  async function count(
    collection: CollectionSlug,
    where?: Where,
  ): Promise<number | null> {
    try {
      const result = await payload.count({
        collection,
        overrideAccess: false,
        user,
        where,
      });
      return result.totalDocs;
    } catch {
      return null;
    }
  }

  const draftsOnly: Where = { _status: { equals: "draft" } };
  const [trips, tripDrafts, pages, faqs, photos, reviews] = await Promise.all([
    count("trips"),
    count("trips", draftsOnly),
    count("pages"),
    count("faqs"),
    count("media"),
    count("reviews"),
  ]);
  const [attention, recent] = await Promise.all([
    tripsNeedingWork(payload, user),
    recentlyEdited(payload, user),
  ]);

  const stats = [
    { label: "Trips", value: trips, href: "/admin/collections/trips" },
    { label: "Pages", value: pages, href: "/admin/collections/pages" },
    { label: "FAQs", value: faqs, href: "/admin/collections/faqs" },
    { label: "Photos", value: photos, href: "/admin/collections/media" },
    { label: "Reviews", value: reviews, href: "/admin/collections/reviews" },
  ];

  return (
    <Gutter>
      <div className="ok-home">
        <header className="ok-desk-head">
          <p className="ok-desk-kicker">Overview</p>
          <h1>Content desk</h1>
          <p className="ok-desk-lead">
            Everything published here is live on the site within a minute.
          </p>
        </header>

        <nav className="ok-home-actions" aria-label="Quick actions">
          <a className="ok-staff-create" href="/admin/collections/trips/create">
            New trip
          </a>
          <a href="/admin/collections/pages/create">New page</a>
          <a href="/admin/collections/faqs/create">New FAQ</a>
          <a href="/admin/collections/media/create">Upload a photo</a>
          <a href={QUOTES_ADMIN_PATH}>Open quotes</a>
        </nav>

        <ul className="ok-home-stats">
          {stats.map((stat) => (
            <li key={stat.label}>
              <a href={stat.href}>
                <strong>{stat.value ?? "–"}</strong>
                <span>{stat.label}</span>
              </a>
            </li>
          ))}
        </ul>
        {tripDrafts ? (
          <p className="ok-home-note">
            {tripDrafts} {tripDrafts === 1 ? "trip is" : "trips are"} still drafts and not
            on the site.
          </p>
        ) : null}

        <div className="ok-home-columns">
          <section className="ok-home-panel">
            <h2>Trips that need work</h2>
            {attention === null ? (
              <p>The safety check could not run. Refresh to try again.</p>
            ) : attention.length === 0 ? (
              <p>Every trip passes the safety check.</p>
            ) : (
              <>
                <p>
                  {attention.length} published {attention.length === 1 ? "trip" : "trips"}{" "}
                  would be refused if published again, so edits to{" "}
                  {attention.length === 1 ? "it" : "them"} can only be saved as drafts.
                  Open one to see what to fix.
                </p>
                <ul className="ok-home-list">
                  {attention.map((trip) => (
                    <li key={String(trip.id)}>
                      <a href={`/admin/collections/trips/${String(trip.id)}`}>
                        <strong>{trip.title}</strong>
                        <span>{trip.first}</span>
                      </a>
                      <em>
                        {trip.count} {trip.count === 1 ? "issue" : "issues"}
                      </em>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="ok-home-panel">
            <h2>Recently edited</h2>
            {recent.length === 0 ? (
              <p>Nothing edited yet.</p>
            ) : (
              <ul className="ok-home-list">
                {recent.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>
                      <strong>{item.title}</strong>
                      <span>{item.kind}</span>
                    </a>
                    <em>{when(item.updatedAt)}</em>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <details className="ok-home-ai">
          <summary>AI writing tools</summary>
          <AiWriterPanel />
        </details>
      </div>
    </Gutter>
  );
}

async function tripsNeedingWork(
  payload: Payload,
  user: AdminViewServerProps["initPageResult"]["req"]["user"],
): Promise<{ id: Doc["id"]; title: string; count: number; first: string }[] | null> {
  try {
    const [trips, days] = await Promise.all([
      payload.find({
        collection: "trips",
        depth: 0,
        limit: 500,
        overrideAccess: false,
        pagination: false,
        select: { title: true, maxAltitudeM: true, usesLukla: true },
        sort: "title",
        user,
        where: { _status: { equals: "published" } },
      }),
      payload.find({
        collection: "itinerary-days",
        depth: 0,
        limit: 5000,
        overrideAccess: false,
        pagination: false,
        user,
      }),
    ]);
    const byTrip = new Map<string, SafetyDay[]>();
    for (const day of days.docs as unknown as (SafetyDay & { trip?: unknown })[]) {
      const key = String(
        day.trip && typeof day.trip === "object" ? (day.trip as Doc).id : day.trip,
      );
      byTrip.set(key, [...(byTrip.get(key) ?? []), day]);
    }
    return (trips.docs as unknown as (Doc & SafetyTrip)[]).flatMap((trip) => {
      const result = checkTrip(trip, byTrip.get(String(trip.id)) ?? []);
      if (result.problems.length === 0) return [];
      return [
        {
          id: trip.id,
          title: text(trip.title) || String(trip.id),
          count: result.problems.length,
          first: result.problems[0]?.message ?? "",
        },
      ];
    });
  } catch {
    return null;
  }
}

async function recentlyEdited(
  payload: Payload,
  user: AdminViewServerProps["initPageResult"]["req"]["user"],
): Promise<Recent[]> {
  const lists = await Promise.all(
    recentSources.map(async (source) => {
      try {
        const result = await payload.find({
          collection: source.slug,
          depth: 0,
          draft: true,
          limit: 6,
          overrideAccess: false,
          sort: "-updatedAt",
          user,
        });
        return (result.docs as unknown as Doc[]).map((doc) => ({
          href: `/admin/collections/${source.slug}/${String(doc.id)}`,
          title: text(doc[source.title]) || String(doc.id),
          kind: source.kind,
          updatedAt: text(doc.updatedAt),
        }));
      } catch {
        return [];
      }
    }),
  );
  return lists
    .flat()
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 8);
}
