import { brandName } from "@ok/config";
import { Button, Container, Heading, Section, Text } from "@ok/ui";
import { Parallax, Reveal, Stagger, StaggerItem } from "@ok/ui/motion";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <header className="sticky top-0 z-200 glass">
        <Container className="flex h-[var(--header-h)] items-center justify-between">
          <a className="font-display text-h3" href="/">
            {brandName}
          </a>
          <Button variant="magnetic">{t("designCta")}</Button>
        </Container>
      </header>
      <main id="content">
        <section className="relative flex min-h-[90svh] items-end overflow-hidden bg-night-950 text-night-50">
          <Parallax className="pointer-events-none absolute inset-0" offset={24}>
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-b from-glacier-800 via-night-900 to-night-950" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[var(--scrim)]" />
              <div className="absolute top-1/4 left-[-10%] h-64 w-[120%] animate-[mist_24s_linear_infinite] bg-white/5 blur-3xl" />
            </div>
          </Parallax>
          <Container className="relative z-10 pb-24">
            <Reveal>
              <p className="eyebrow text-alpenglow-300">{t("heroEyebrow")}</p>
              <h1 className="mt-4 max-w-[18ch] font-display text-display-xl text-snow-50">
                {t("heroTitle")}
              </h1>
              <Text className="mt-6 max-w-[40ch] text-lead text-snow-100">
                {t("heroLead")}
              </Text>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="magnetic" size="lg">
                  {t("designCta")}
                </Button>
                <Button variant="secondary" className="border-snow-100/40 text-snow-50">
                  {t("exploreCta")}
                </Button>
              </div>
            </Reveal>
            <button
              type="button"
              className="absolute right-6 bottom-6 min-h-11 rounded-pill border border-white/30 px-4 text-small"
              aria-label="Pause ambient motion"
            >
              Pause
            </button>
          </Container>
        </section>

        <Section aria-label="Trust">
          <Stagger className="grid gap-4 md:grid-cols-5">
            {[
              "Licensed by Nepal Tourism Board #[[TBD: licence no.]]",
              "[[TBD: years]] years on the trail",
              "[[TBD: review count]] verified reviews",
              "Published rescue policy",
              "24/7 on-trip support",
            ].map((item) => (
              <StaggerItem key={item}>
                <p className="text-small text-muted-foreground">{item}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section>
          <Heading as="h2">Choose your way in</Heading>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-2">
            {["Trekking", "Cultural tours", "Peak climbing", "Expeditions"].map(
              (label) => (
                <StaggerItem key={label}>
                  <article className="rounded-xl bg-surface p-8 shadow-1">
                    <Heading as="h3">{label}</Heading>
                    <Text muted className="mt-2">
                      Private itineraries only. Phase 1 will list journeys here.
                    </Text>
                  </article>
                </StaggerItem>
              ),
            )}
          </Stagger>
        </Section>

        <Section className="bg-surface-sunken">
          <Heading as="h2">Designed, then quoted</Heading>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            <li>
              <span className="eyebrow">01</span>
              <Heading as="h3">Tell us how you travel</Heading>
              <Text muted>Two minutes. Dates, pace, who you walk with.</Text>
            </li>
            <li>
              <span className="eyebrow">02</span>
              <Heading as="h3">AI drafts, a specialist refines</Heading>
              <Text muted>No public prices. Every itinerary is private.</Text>
            </li>
            <li>
              <span className="eyebrow">03</span>
              <Heading as="h3">Your quote, in about 24 h</Heading>
              <Text muted>[[TBD: quote SLA]] — confirmed before launch.</Text>
            </li>
          </ol>
        </Section>

        <Section>
          <Heading as="h2">Where would you like to wake up?</Heading>
          <Text className="mt-4">{t("comingSoon")}</Text>
          <div className="mt-8">
            <Button variant="magnetic" size="lg">
              {t("designCta")}
            </Button>
          </div>
        </Section>
      </main>
      <footer className="border-t border-border py-12">
        <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-small text-muted-foreground">
            {brandName} · [[TBD: legal entity name]] · [[TBD: registered address]]
          </p>
          <p className="text-small">
            Motion: Full (respects <code>prefers-reduced-motion</code>)
          </p>
        </Container>
      </footer>
    </>
  );
}
