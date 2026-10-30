import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Container,
  Heading,
  Text,
} from "@ok/ui";
import type { ReactNode } from "react";

import { RouteMapSection } from "@/components/map/RouteMapSection";
import { DesignCta } from "@/components/marketing/DesignCta";
import { GuideCard } from "@/components/marketing/GuideCard";
import { TripCard } from "@/components/marketing/TripCard";
import { CinematicHero } from "@/components/media/CinematicHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { tripView } from "@/content/catalog";
import { guidesForTrip, guidesOf } from "@/content/guides";
import { galleryForTrip, heroPicture } from "@/content/media";
import { getCatalog } from "@/content/store";
import type { CatalogTrip } from "@/content/types";
import { publicLines, toPublicTrip, withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";
import { difficultyName, NOTABLE_ALTITUDE_M, tripFacts } from "@/lib/trip-facts";

import { AltitudeChart } from "./AltitudeChart";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "itinerary", label: "Itinerary" },
  { id: "altitude", label: "Altitude" },
  { id: "practical", label: "Permits & safety" },
  { id: "included", label: "What's included" },
] as const;

function Prose({ text }: { text: string }) {
  const paras = withoutPlaceholders(text)
    .split("\n")
    .map((para) => para.trim())
    .filter(Boolean);
  return (
    <div className="grid gap-4">
      {paras.map((para) => (
        <Text key={para.slice(0, 24)}>{para}</Text>
      ))}
    </div>
  );
}

/** A trip page section: tighter than the site-wide section rhythm, with an anchor. */
function Block({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[calc(var(--header-h)+4rem)] py-[var(--space-section-sm)] ${className ?? ""}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

function metres(value: number): string {
  return `${value.toLocaleString("en-US")} m`;
}

export async function TripDetail({ trip }: { trip: CatalogTrip }) {
  trip = toPublicTrip(trip);
  const {
    activities,
    regions,
    seasons,
    faqs: allFaqs,
    getPeak,
    getPermit,
    getTrip,
    pages,
  } = await getCatalog();
  const view = tripView(trip);
  const related = trip.related
    .map((slug) => getTrip(slug))
    .filter((item): item is CatalogTrip => Boolean(item) && item?.status === "published");
  const permitDocs = trip.permits
    .map((slug) => getPermit(slug))
    .filter((item) => item !== undefined);
  const faqDocs = trip.faqs
    .map((slug) => allFaqs.find((f) => f.slug === slug))
    .filter((item) => item !== undefined);
  const peakDocs = trip.peaks
    .map((slug) => getPeak(slug))
    .filter((item) => item !== undefined);

  const guideDocs = guidesForTrip(trip, guidesOf(pages));

  const gallery = trip.photos?.length
    ? trip.photos
    : galleryForTrip(trip.slug, trip.activity);
  const activityTitle =
    activities.find((item) => item.slug === trip.activity)?.title ?? trip.activity;
  const regionNames = trip.regions.map(
    (slug) => regions.find((region) => region.slug === slug)?.name ?? slug,
  );
  const seasonNames = trip.seasons.map(
    (slug) => seasons.find((season) => season.slug === slug)?.name ?? slug,
  );
  const designHref = `/design-my-trip?trip=${trip.slug}`;
  const highAltitude = trip.maxAltitudeM >= NOTABLE_ALTITUDE_M;
  const highestSleep = Math.max(0, ...trip.days.map((day) => day.sleepAltitudeM));
  const inclusions = publicLines(trip.inclusions);
  const exclusions = publicLines(trip.exclusions);

  const glance: { label: string; value: ReactNode }[] = [
    {
      label: "Length",
      value:
        trip.durationMin === trip.durationMax
          ? `${String(trip.durationTypical)} days`
          : `${String(trip.durationTypical)} days (${String(trip.durationMin)}–${String(trip.durationMax)})`,
    },
    ...(highAltitude
      ? [
          {
            label: "Highest point",
            value: trip.maxAltitudePoint
              ? `${metres(trip.maxAltitudeM)} · ${trip.maxAltitudePoint}`
              : metres(trip.maxAltitudeM),
          },
        ]
      : []),
    { label: "Difficulty", value: difficultyName(trip.difficulty) },
    ...(regionNames.length ? [{ label: "Region", value: regionNames.join(", ") }] : []),
    ...(seasonNames.length
      ? [{ label: "Best seasons", value: seasonNames.join(", ") }]
      : []),
    ...(trip.startPoint
      ? [
          {
            label: "Starts and ends",
            value:
              trip.startPoint === trip.endPoint || !trip.endPoint
                ? trip.startPoint
                : `${trip.startPoint} → ${trip.endPoint}`,
          },
        ]
      : []),
    ...peakDocs.map((peak) => ({
      label: "Summit",
      value: (
        <a className="underline-offset-4 hover:underline" href={`/peaks/${peak.slug}`}>
          {`${peak.name} (${metres(peak.heightM)})`}
        </a>
      ),
    })),
    {
      label: "Activity",
      value: (
        <a
          className="underline-offset-4 hover:underline"
          href={`/activities/${trip.activity}`}
        >
          {activityTitle}
        </a>
      ),
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: trip.title,
      description: withoutPlaceholders(trip.overview),
      touristType: "Private group",
      itinerary: {
        "@type": "ItemList",
        itemListElement: trip.days.map((day) => ({
          "@type": "ListItem",
          position: day.dayNumber,
          item: {
            "@type": "TouristAttraction",
            name: day.toPlace,
            description: `${day.title}. Sleep ${String(day.sleepAltitudeM)} m.`,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: canonical("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "Trips",
          item: canonical("/trips"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: trip.title,
          item: canonical(`/trips/${trip.slug}`),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqDocs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: withoutPlaceholders(faq.answer) },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <main id="content">
          <CinematicHero
            compact
            image={trip.photos?.[0] ?? heroPicture(trip.slug, trip.title)}
            eyebrow={[activityTitle, ...regionNames].join(" · ")}
            title={trip.title}
            lead={tripFacts(trip)}
            primaryHref={designHref}
            primaryLabel="Design this trip"
            primaryAction={<DesignCta href={designHref}>Design this trip</DesignCta>}
            secondaryHref="#itinerary"
            secondaryLabel="See the itinerary"
          />

          <nav
            aria-label="On this page"
            className="sticky top-[var(--header-h)] z-100 border-b border-border bg-background/95 backdrop-blur"
          >
            <Container className="flex gap-1 overflow-x-auto py-2 text-small whitespace-nowrap">
              {sections
                .filter((section) => highAltitude || section.id !== "altitude")
                .map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-pill px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {section.label}
                  </a>
                ))}
              {faqDocs.length > 0 ? (
                <a
                  href="#questions"
                  className="rounded-pill px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Questions
                </a>
              ) : null}
            </Container>
          </nav>

          <Block id="overview">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
              <div>
                <Heading as="h2">Why this journey</Heading>
                {trip.highlights.length > 0 ? (
                  <ul className="mt-6 grid gap-3">
                    {trip.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-body">
                        <span aria-hidden="true" className="mt-1 text-primary">
                          ✦
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-8 max-w-[68ch]">
                  <Prose text={trip.overview} />
                </div>
              </div>
              <aside
                aria-label="At a glance"
                className="h-fit rounded-xl border border-border bg-surface p-6 shadow-1 lg:sticky lg:top-[calc(var(--header-h)+5rem)]"
              >
                <p className="eyebrow text-muted-foreground">At a glance</p>
                <dl className="mt-4 grid gap-3 text-small">
                  {glance.map((item) => (
                    <div
                      key={`${item.label}-${String(item.value)}`}
                      className="grid grid-cols-[8rem_1fr] gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-muted-foreground">{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 grid gap-2">
                  <DesignCta href={designHref}>Design this trip</DesignCta>
                  <p className="text-caption text-muted-foreground">
                    Private trip, shaped around your dates and pace. No payment to ask.
                  </p>
                </div>
              </aside>
            </div>
          </Block>

          {gallery.length > 0 ? (
            <Block id="route-gallery" className="bg-surface-sunken">
              <Heading as="h2">Along the way</Heading>
              <div className="mt-6">
                <MediaGallery items={gallery} label={`${trip.title} landscapes`} />
              </div>
            </Block>
          ) : null}

          <Block id="itinerary">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Heading as="h2">Day by day</Heading>
                <Text muted className="mt-2">
                  {`${String(trip.days.length)} stages · highest night ${metres(highestSleep)}. Open a day for the details.`}
                </Text>
              </div>
            </div>
            <Accordion type="multiple" className="mt-6 border-t border-border">
              {trip.days.map((day) => (
                <AccordionItem key={day.dayNumber} value={String(day.dayNumber)}>
                  <AccordionTrigger className="py-4">
                    <span className="grid w-full grid-cols-[4rem_1fr] items-baseline gap-x-3 gap-y-1 pr-4 sm:grid-cols-[4.5rem_1fr_auto]">
                      <span className="text-small text-muted-foreground">
                        {`Day ${day.dayLabel ?? String(day.dayNumber)}`}
                      </span>
                      <span>{day.title}</span>
                      <span className="col-start-2 text-small whitespace-nowrap text-muted-foreground sm:col-start-auto">
                        {`Sleep ${metres(day.sleepAltitudeM)}`}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2 pb-2 pl-[4.75rem] sm:pl-[5.25rem]">
                      {day.description ? <p>{day.description}</p> : null}
                      <p className="text-small text-muted-foreground">
                        {[
                          day.fromPlace && day.toPlace
                            ? `${day.fromPlace} → ${day.toPlace}`
                            : "",
                          `High point ${metres(day.highPointM)}`,
                          day.walkingHours ? `${day.walkingHours} h walking` : "",
                          day.accommodation ? `Night in a ${day.accommodation}` : "",
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-12">
              <RouteMapSection title={trip.title} route={trip.route} />
            </div>
          </Block>

          {highAltitude ? (
            <Block id="altitude" className="bg-surface-sunken">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div>
                  <Heading as="h2">Altitude profile</Heading>
                  <div className="mt-6">
                    <AltitudeChart days={trip.days} />
                  </div>
                </div>
                <div>
                  <Heading as="h2">Our acclimatization logic</Heading>
                  {trip.acclimatizationNotes ? (
                    <Text className="mt-4">
                      {withoutPlaceholders(trip.acclimatizationNotes)}
                    </Text>
                  ) : null}
                  {view.ruleReport.explanations.length > 0 ? (
                    <ul className="mt-4 grid gap-3">
                      {view.ruleReport.explanations.map((item) => (
                        <li key={`${item.id}-${item.text}`} className="text-small">
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <Text muted className="mt-4 text-small">
                    Planning guidance, not medical advice. Your guide turns back whenever
                    someone shows signs of altitude sickness.
                  </Text>
                </div>
              </div>
            </Block>
          ) : null}

          <Block id="practical">
            <Heading as="h2">Permits, flights and safety</Heading>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface p-6">
                <Heading as="h3">Permits</Heading>
                {permitDocs.length > 0 ? (
                  <ul className="mt-3 grid gap-2 text-small">
                    {permitDocs.map((permit) => (
                      <li key={permit.slug}>
                        <a
                          className="underline-offset-4 hover:underline"
                          href={`/permits/${permit.slug}`}
                        >
                          {permit.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text className="mt-3 text-small">
                    We confirm the permits this route needs when we design it with you.
                  </Text>
                )}
                <p className="mt-3 text-caption text-muted-foreground">
                  We arrange every permit for you.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <Heading as="h3">Contingency and flight plan</Heading>
                <div className="mt-3 text-small">
                  {trip.contingency ? (
                    <Prose text={trip.contingency} />
                  ) : (
                    <Text className="text-small">
                      We build spare time into the plan for weather and flight delays.
                    </Text>
                  )}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-6">
                <Heading as="h3">Safety and rescue</Heading>
                <Text className="mt-3 text-small">
                  Helicopter rescue, turn-around rules and first aid are set out in our
                  safety policy.
                </Text>
                <p className="mt-3 text-small">
                  <a
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                    href="/trust/safety-and-rescue"
                  >
                    Read the safety and rescue policy
                  </a>
                </p>
              </div>
            </div>
          </Block>

          {inclusions.length > 0 || exclusions.length > 0 ? (
            <Block id="included" className="bg-surface-sunken">
              <Heading as="h2">What&apos;s included</Heading>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <Heading as="h3">Included</Heading>
                  <ul className="mt-4 grid gap-2">
                    {inclusions.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-moss-600">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Heading as="h3">Not included</Heading>
                  <ul className="mt-4 grid gap-2">
                    {exclusions.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="text-muted-foreground">
                          –
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Block>
          ) : null}

          {guideDocs.length > 0 ? (
            <Block id="before-you-go">
              <Heading as="h2">Before you go</Heading>
              <Text muted className="mt-3">
                Our travel guides for planning this trip.
              </Text>
              <ul className="mt-8 grid gap-6 md:grid-cols-3">
                {guideDocs.map((guide) => (
                  <li key={guide.slug}>
                    <GuideCard guide={guide} />
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-small">
                <a className="underline-offset-4 hover:underline" href="/guides">
                  All travel guides
                </a>
              </p>
            </Block>
          ) : null}

          {faqDocs.length > 0 ? (
            <Block id="questions">
              <Heading as="h2">Questions</Heading>
              <Accordion type="multiple" className="mt-6 border-t border-border">
                {faqDocs.map((faq) => (
                  <AccordionItem key={faq.slug} value={faq.slug}>
                    <AccordionTrigger className="py-4">{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p className="pb-2 text-muted-foreground">
                        {withoutPlaceholders(faq.answer)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Block>
          ) : null}

          {related.length > 0 ? (
            <Block className="bg-surface-sunken">
              <Heading as="h2">Similar journeys</Heading>
              <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.slice(0, 3).map((item) => (
                  <li key={item.slug}>
                    <TripCard
                      href={`/trips/${item.slug}`}
                      slug={item.slug}
                      photo={item.photos?.[0]}
                      title={item.title}
                      summary={tripFacts(item)}
                      eyebrow={item.regions
                        .map(
                          (slug) =>
                            regions.find((region) => region.slug === slug)?.name ?? slug,
                        )
                        .join(" · ")}
                    />
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          <section className="bg-night-950 py-[var(--space-section-sm)] text-snow-50">
            <Container className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <Heading as="h2" className="text-snow-50">
                  Make {trip.title} yours
                </Heading>
                <Text className="mt-2 text-snow-100">
                  Tell us your dates and pace. A specialist replies with a private plan.
                </Text>
              </div>
              <DesignCta href={designHref}>Design this trip</DesignCta>
            </Container>
          </section>
        </main>
      </article>
    </>
  );
}
