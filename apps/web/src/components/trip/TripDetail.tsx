import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Container,
  Heading,
  MagneticLabel,
  Section,
  Text,
} from "@ok/ui";
import { Reveal, Stagger, StaggerItem } from "@ok/ui/motion";

import { RouteMapSection } from "@/components/map/RouteMapSection";
import { TripCard } from "@/components/marketing/TripCard";
import { AmbientVideo } from "@/components/media/AmbientVideo";
import { CinematicHero } from "@/components/media/CinematicHero";
import { MediaGallery } from "@/components/media/MediaGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  activities,
  faqs as allFaqs,
  getPeak,
  getPermit,
  getTrip,
  tripView,
} from "@/content/catalog";
import { galleryForTrip, heroPicture } from "@/content/media";
import type { CatalogTrip } from "@/content/types";
import { publicLines, toPublicTrip, withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

import { AltitudeChart } from "./AltitudeChart";

function Prose({ text }: { text: string }) {
  const paras = withoutPlaceholders(text)
    .split("\n")
    .map((para) => para.trim())
    .filter(Boolean);
  return (
    <div className="grid gap-3">
      {paras.map((para) => (
        <Text key={para.slice(0, 24)}>{para}</Text>
      ))}
    </div>
  );
}

export async function TripDetail({ trip }: { trip: CatalogTrip }) {
  trip = toPublicTrip(trip);
  const view = tripView(trip);
  const related = trip.related
    .map((slug) => getTrip(slug))
    .filter((item): item is CatalogTrip => Boolean(item));
  const permitDocs = trip.permits.map((slug) => getPermit(slug)).filter(Boolean);
  const faqDocs = trip.faqs
    .map((slug) => allFaqs.find((f) => f.slug === slug))
    .filter(Boolean);
  const peakDocs = trip.peaks.map((slug) => getPeak(slug)).filter(Boolean);

  const gallery = galleryForTrip(trip.slug, trip.activity);
  const showVideo =
    trip.slug === "everest-base-camp-trek" || trip.activity === "peak-climbing";
  const activityTitle =
    activities.find((item) => item.slug === trip.activity)?.title ?? trip.activity;

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
        name: faq?.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq?.answer ? withoutPlaceholders(faq.answer) : faq?.answer,
        },
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
            image={heroPicture(trip.slug, trip.title)}
            eyebrow={activityTitle}
            title={trip.title}
            lead={trip.subtitle}
            primaryHref={`/design-my-trip?trip=${trip.slug}`}
            primaryLabel="Design my private version"
            secondaryHref="#route-gallery"
            secondaryLabel="View landscapes"
            kicker={
              <ul className="mt-8 flex flex-wrap gap-2">
                {[
                  `${String(trip.durationTypical)} days typical`,
                  `max ${String(trip.maxAltitudeM)} m · ${trip.maxAltitudePoint}`,
                  trip.seasons.join(" · "),
                  trip.usesLukla ? "Lukla buffer day" : null,
                ]
                  .filter((item): item is string => Boolean(item))
                  .map((item) => (
                    <li
                      key={item}
                      className="rounded-pill border border-snow-100/30 px-3 py-1 text-caption text-snow-50"
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            }
          />

          <Section>
            <Container className="flex flex-wrap gap-3">
              <Badge>{`${String(trip.durationTypical)} days typical (${String(trip.durationMin)}–${String(trip.durationMax)})`}</Badge>
              <Badge>{`max ${String(trip.maxAltitudeM)} m · ${trip.maxAltitudePoint}`}</Badge>
              <Badge>{trip.difficulty}</Badge>
              <Badge>{trip.seasons.join(", ")}</Badge>
              <Badge>{trip.groupType.join(", ")}</Badge>
              <Badge>{`${trip.startPoint} → ${trip.endPoint}`}</Badge>
              <a
                className="underline-offset-4 hover:underline"
                href={`/activities/${trip.activity}`}
              >
                {`All ${activityTitle.toLowerCase()}`}
              </a>
            </Container>
          </Section>

          <Section id="route-gallery">
            <Container>
              <Reveal>
                <Heading as="h2">Light along the route</Heading>
                <Text muted className="mt-3">
                  Licensed landscape stills in the register of this journey — not guest
                  photos, reviews, or our team.
                </Text>
              </Reveal>
              <div className="mt-8">
                <MediaGallery items={gallery} label={`${trip.title} landscapes`} />
              </div>
            </Container>
          </Section>

          {showVideo ? (
            <Section className="bg-night-950 text-night-50">
              <Container>
                <Reveal>
                  <Heading as="h2" className="text-snow-50">
                    Dawn over high country
                  </Heading>
                  <Text className="mt-3 text-snow-100">
                    A muted landscape clip — stock atmosphere, not a guest film. No sound.
                  </Text>
                </Reveal>
                <div className="mt-8">
                  <AmbientVideo />
                </div>
              </Container>
            </Section>
          ) : null}

          <Section>
            <Container>
              <Reveal>
                <Heading as="h2">Why this journey</Heading>
              </Reveal>
              <ul className="mt-6 grid gap-3">
                {trip.highlights.map((item) => (
                  <li key={item} className="text-body">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Prose text={trip.overview} />
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <RouteMapSection title={trip.title} route={trip.route} />
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Day by day</Heading>
              <Accordion type="single" collapsible className="mt-6">
                {trip.days.map((day) => (
                  <AccordionItem key={day.dayNumber} value={String(day.dayNumber)}>
                    <AccordionTrigger>
                      <span className="flex w-full items-center justify-between gap-4 pr-4">
                        <span>{`Day ${String(day.dayNumber)} · ${day.title}`}</span>
                        <Badge>{`${String(day.sleepAltitudeM)} m sleep`}</Badge>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>{day.description}</p>
                      <p className="mt-2 text-small text-muted-foreground">
                        {`${day.fromPlace} → ${day.toPlace}. High point ${String(day.highPointM)} m. ${day.walkingHours ? `${day.walkingHours} h walking.` : ""}`}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Altitude profile</Heading>
              <div className="mt-6">
                <AltitudeChart days={trip.days} />
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Our acclimatization logic</Heading>
              <Text muted className="mt-2">
                Planning guidance from rule set {view.ruleReport.version}. Not medical
                advice.
              </Text>
              <ul className="mt-6 grid gap-3">
                {view.ruleReport.explanations.map((item) => (
                  <li key={`${item.id}-${item.text}`}>
                    <Badge>{item.id}</Badge>
                    <Text className="mt-1">{item.text}</Text>
                  </li>
                ))}
              </ul>
              {view.ruleReport.explanations.length === 0 ? (
                <Text className="mt-4">{trip.acclimatizationNotes}</Text>
              ) : null}
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Permits</Heading>
              <ul className="mt-4 grid gap-2">
                {permitDocs.map((permit) =>
                  permit ? (
                    <li key={permit.slug}>
                      <a
                        className="underline-offset-4 hover:underline"
                        href={`/permits/${permit.slug}`}
                      >
                        {permit.name}
                      </a>
                      <span className="text-muted-foreground">{` · last verified ${permit.lastVerifiedAt}`}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </Container>
          </Section>

          <Section>
            <Container className="grid gap-8 md:grid-cols-2">
              <div>
                <Heading as="h2">Inclusions</Heading>
                <ul className="mt-4 grid gap-2">
                  {publicLines(trip.inclusions).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Heading as="h2">Exclusions</Heading>
                <ul className="mt-4 grid gap-2">
                  {publicLines(trip.exclusions).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Contingency and flight plan</Heading>
              <div className="mt-4">
                <Prose text={trip.contingency} />
              </div>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Safety and rescue</Heading>
              <Text className="mt-4">
                Helicopter rescue, turn-around and first-aid rules are published on the
                trust page. We do not invent rescue stories.
              </Text>
              <p className="mt-3">
                <a
                  className="underline-offset-4 hover:underline"
                  href="/trust/safety-and-rescue"
                >
                  Read the safety and rescue policy
                </a>
              </p>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Guides</Heading>
              <Text className="mt-4">
                Named guides will appear here when the owner supplies real profiles.
                Content agents cannot create team members.
              </Text>
              {peakDocs.map((peak) =>
                peak ? (
                  <p key={peak.slug} className="mt-2">
                    Summit objective:{" "}
                    <a
                      href={`/peaks/${peak.slug}`}
                    >{`${peak.name} (${String(peak.heightM)} m)`}</a>
                  </p>
                ) : null,
              )}
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Reviews</Heading>
              <Text className="mt-4">
                Verified first-party reviews only. None are published yet. We never write
                or edit reviews.
              </Text>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">FAQ</Heading>
              <dl className="mt-6 grid gap-6">
                {faqDocs.map((faq) =>
                  faq ? (
                    <div key={faq.slug}>
                      <dt className="font-semibold">{faq.question}</dt>
                      <dd className="mt-2 text-muted-foreground">
                        {withoutPlaceholders(faq.answer)}
                      </dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </Container>
          </Section>

          <Section>
            <Container>
              <Reveal>
                <Heading as="h2">Related journeys</Heading>
              </Reveal>
              {related.length > 0 ? (
                <Stagger className="mt-8 grid gap-6 md:grid-cols-2">
                  {related.map((item) => (
                    <StaggerItem key={item.slug}>
                      <TripCard
                        href={`/trips/${item.slug}`}
                        slug={item.slug}
                        title={item.title}
                        summary={item.subtitle}
                        eyebrow={
                          item.status === "draft"
                            ? "Draft"
                            : `${item.regions.join(" · ")} · ${String(item.durationTypical)} days`
                        }
                      />
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : null}
              <div className="mt-10">
                <Button variant="magnetic" size="lg" asChild>
                  <a href={`/design-my-trip?trip=${trip.slug}`}>
                    <MagneticLabel>Design my private version</MagneticLabel>
                  </a>
                </Button>
              </div>
            </Container>
          </Section>
        </main>
      </article>
    </>
  );
}
