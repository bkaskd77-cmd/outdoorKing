import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Container,
  Heading,
  Section,
  Text,
} from "@ok/ui";

import { RouteMapSection } from "@/components/map/RouteMapSection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  faqs as allFaqs,
  getPeak,
  getPermit,
  getTrip,
  tripView,
} from "@/content/catalog";
import type { CatalogTrip } from "@/content/types";
import { canonical } from "@/lib/site";

import { AltitudeChart } from "./AltitudeChart";

function Prose({ text }: { text: string }) {
  return (
    <div className="grid gap-3">
      {text.split("\n").map((para) => (
        <Text key={para.slice(0, 24)}>{para}</Text>
      ))}
    </div>
  );
}

export async function TripDetail({ trip }: { trip: CatalogTrip }) {
  const view = tripView(trip);
  const related = trip.related
    .map((slug) => getTrip(slug))
    .filter((item): item is CatalogTrip => Boolean(item));
  const permitDocs = trip.permits.map((slug) => getPermit(slug)).filter(Boolean);
  const faqDocs = trip.faqs
    .map((slug) => allFaqs.find((f) => f.slug === slug))
    .filter(Boolean);
  const peakDocs = trip.peaks.map((slug) => getPeak(slug)).filter(Boolean);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: trip.title,
      description: trip.overview,
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
        acceptedAnswer: { "@type": "Answer", text: faq?.answer },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <main id="content">
          <section className="relative min-h-[70svh] bg-night-950 text-night-50">
            <Container className="flex min-h-[70svh] flex-col justify-end pb-16">
              <p className="eyebrow text-alpenglow-300">
                {trip.activity.replace("-", " ")}
              </p>
              <h1 className="mt-4 max-w-[18ch] font-display text-display-lg">
                {trip.title}
              </h1>
              <Text className="mt-4 max-w-[50ch] text-lead text-snow-100">
                {trip.subtitle}
              </Text>
              <div className="mt-8">
                <Button variant="magnetic" size="lg" asChild>
                  <a href={`/design-my-trip?trip=${trip.slug}`}>
                    Design my private version
                  </a>
                </Button>
              </div>
            </Container>
          </section>

          <Section>
            <Container className="flex flex-wrap gap-3">
              <Badge>{`${String(trip.durationTypical)} days typical (${String(trip.durationMin)}–${String(trip.durationMax)})`}</Badge>
              <Badge>{`max ${String(trip.maxAltitudeM)} m · ${trip.maxAltitudePoint}`}</Badge>
              <Badge>{trip.difficulty}</Badge>
              <Badge>{trip.seasons.join(", ")}</Badge>
              <Badge>{trip.groupType.join(", ")}</Badge>
              <Badge>{`${trip.startPoint} → ${trip.endPoint}`}</Badge>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Why this journey</Heading>
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
              <RouteMapSection trip={trip} />
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
                  {trip.inclusions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <Heading as="h2">Exclusions</Heading>
                <ul className="mt-4 grid gap-2">
                  {trip.exclusions.map((item) => (
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
                Verified first-party reviews only. None are published yet — [[TBD: review
                count and source]]. We never write or edit reviews.
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
                      <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
                    </div>
                  ) : null,
                )}
              </dl>
            </Container>
          </Section>

          <Section>
            <Container>
              <Heading as="h2">Related journeys</Heading>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`/trips/${item.slug}`}
                    >
                      {item.title}
                    </a>
                    {item.status === "draft" ? (
                      <span className="ml-2 text-caption text-muted-foreground">
                        Draft
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="magnetic" size="lg" asChild>
                  <a href={`/design-my-trip?trip=${trip.slug}`}>
                    Design my private version
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
