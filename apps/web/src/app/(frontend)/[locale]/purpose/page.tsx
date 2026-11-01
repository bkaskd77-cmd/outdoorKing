import { Button, Container, MagneticLabel } from "@ok/ui";
import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { Picture } from "@/components/media/Picture";
import { JsonLd } from "@/components/seo/JsonLd";
import type { PictureSrc } from "@/content/media";
import { getCatalog } from "@/content/store";
import { canonical, hreflangMap, localizedPath } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getTranslations("purposePage");
  return {
    title: p("metaTitle"),
    description: p("promise"),
    alternates: {
      canonical: canonical("/purpose"),
      languages: hreflangMap("/purpose"),
    },
  };
}

const defaultHero: PictureSrc = {
  src: "/media/gallery/ebc-1",
  alt: "",
  width: 1400,
  height: 900,
};

/** Shown until real photos are added to the page's gallery in the Admin. */
const illustrations = ["street-dog", "helping-hand", "care", "home"] as const;

const frameClasses = [
  "md:col-span-7 min-h-[20rem] lg:min-h-[32rem]",
  "md:col-span-5 min-h-[20rem] lg:min-h-[32rem]",
  "md:col-span-5 min-h-[20rem] lg:min-h-[32rem]",
  "md:col-span-7 min-h-[20rem] lg:min-h-[32rem]",
] as const;

type Frame = { image: PictureSrc; title: string; note?: string; illustration: boolean };

function StorySection({
  index,
  title,
  sub,
  children,
  tone = "canvas",
}: {
  index: string;
  title: string;
  sub: string;
  children: ReactNode;
  tone?: "canvas" | "sunken" | "night";
}) {
  const night = tone === "night";
  return (
    <section
      className={
        night
          ? "bg-night-950 text-snow-50"
          : tone === "sunken"
            ? "bg-surface-sunken text-foreground"
            : "bg-canvas text-foreground"
      }
    >
      <Container className="grid gap-8 py-20 md:grid-cols-12 md:gap-12 md:py-28">
        <div className="md:col-span-5">
          <p
            className={
              night
                ? "font-display text-h2 text-alpenglow-300"
                : "font-display text-h2 text-alpenglow-600"
            }
          >
            {index}
          </p>
          <h2 className="mt-3 max-w-[14ch] font-display text-display-lg leading-[1.02]">
            {title}
          </h2>
          <p
            className={
              night
                ? "mt-5 max-w-md font-display text-h3 text-snow-100"
                : "mt-5 max-w-md font-display text-h3 text-muted-foreground"
            }
          >
            {sub}
          </p>
        </div>
        <div
          className={
            night
              ? "grid content-start gap-5 text-lead text-snow-100 md:col-span-6 md:col-start-7"
              : "grid content-start gap-5 text-lead text-foreground md:col-span-6 md:col-start-7"
          }
        >
          {children}
        </div>
      </Container>
    </section>
  );
}

export default async function PurposePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const p = await getTranslations("purposePage");
  const promise = p("promise");
  const activeLocale = await getLocale();
  const designHref = localizedPath(activeLocale, "/design-my-trip");
  const page = (await getCatalog()).getPage("purpose");
  const hero = page?.photo ?? defaultHero;
  const photos = page?.photos ?? [];
  const frames: Frame[] =
    photos.length > 0
      ? photos.map((image) => ({
          image,
          title: image.alt,
          ...(image.credit ? { note: image.credit } : {}),
          illustration: false,
        }))
      : illustrations.map((name, index) => {
          const title = p(`frames.f${String(index + 1)}.title`);
          return {
            image: {
              src: `/media/purpose/${name}`,
              alt: `${p("illustration")}: ${title}`,
              width: 1600,
              height: 1200,
            },
            title,
            note: p(`frames.f${String(index + 1)}.note`),
            illustration: true,
          };
        });

  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: p("metaTitle"),
          description: promise,
          url: canonical("/purpose"),
        }}
      />

      <section className="relative isolate overflow-hidden bg-night-950 text-snow-50">
        <div aria-hidden="true" className="absolute inset-0">
          <Picture
            image={hero}
            priority
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover object-[center_40%]"
            sizes="100vw"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night-950/92 via-night-950/72 to-night-950/30"
        />
        <Container className="relative z-10 flex min-h-[38rem] flex-col justify-end py-16 md:min-h-[46rem] md:py-24">
          <p className="eyebrow text-alpenglow-300">
            <span
              lang="ne"
              className="devanagari font-normal tracking-normal normal-case"
            >
              नेपाल
            </span>
            <span className="mx-3 text-snow-300" aria-hidden="true">
              /
            </span>
            OutdoorKing
          </p>
          <h1 className="mt-5 max-w-[12ch] font-display text-display-xl text-snow-50">
            {p("heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl font-display text-h2 text-snow-50">{promise}</p>
          <p className="mt-5 max-w-xl text-lead text-snow-100">{p("heroLead")}</p>
        </Container>
      </section>

      <StorySection index="01" title={p("s1Title")} sub={p("s1Sub")}>
        <p>{p("s1P1")}</p>
        <p>{p("s1P2")}</p>
        <p>{p("s1P3")}</p>
      </StorySection>

      <StorySection index="02" title={p("s2Title")} sub={p("s2Sub")} tone="sunken">
        <p>{p("s2P1")}</p>
        <p>{p("s2P2")}</p>
      </StorySection>

      <StorySection index="03" title={p("s3Title")} sub={p("s3Sub")}>
        <p>{p("s3P1")}</p>
        <p>{p("s3P2")}</p>
      </StorySection>

      <section className="bg-night-950 text-snow-50">
        <Container className="py-16 md:py-24">
          <p className="max-w-[18ch] font-display text-display-lg text-snow-50">
            {p("bandQuote")}
          </p>
          <p className="mt-4 font-display text-h2 text-alpenglow-300">{p("bandLead")}</p>
        </Container>
      </section>

      <section
        id="purpose-gallery"
        className="bg-canvas py-20 md:py-28"
        aria-labelledby="purpose-gallery-title"
      >
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="font-display text-h2 text-alpenglow-600">04</p>
              <h2
                id="purpose-gallery-title"
                className="mt-3 max-w-[14ch] font-display text-display-lg leading-[1.02]"
              >
                {p("s4Title")}
              </h2>
              <p className="mt-5 max-w-md font-display text-h3 text-muted-foreground">
                {p("s4Sub")}
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lead">
                {photos.length > 0 ? p("s4PPhotos") : p("s4PIllustrated")}
              </p>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
            {frames.map((frame, index) => (
              <li
                key={frame.image.url ?? frame.image.src}
                className={frameClasses[index % frameClasses.length]}
              >
                <figure className="group relative h-full min-h-[inherit] overflow-hidden rounded-xl bg-night-950 shadow-2">
                  <Picture
                    image={frame.image}
                    priority={index < 2}
                    className="block h-full min-h-[inherit]"
                    imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(min-width: 64rem) 60rem, 100vw"
                  />
                  {frame.illustration ? (
                    <span className="absolute top-4 left-4 rounded-full bg-night-950/70 px-3 py-1 text-caption text-snow-50">
                      {p("illustration")}
                    </span>
                  ) : null}
                  {frame.title ? (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/85 via-night-950/45 to-transparent px-5 pt-16 pb-5 text-snow-50">
                      <span className="block font-display text-h3">{frame.title}</span>
                      {frame.note ? (
                        <span className="mt-1 block text-small text-snow-100">
                          {frame.note}
                        </span>
                      ) : null}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <StorySection index="05" title={p("s5Title")} sub={p("s5Sub")} tone="sunken">
        <p>{p("s5P1")}</p>
        <p>{p("s5P2")}</p>
        <p>{p("s5P3")}</p>
      </StorySection>

      <section className="bg-night-950 py-20 text-snow-50 md:py-28">
        <Container className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-display text-h2 text-alpenglow-300">06</p>
            <h2 className="mt-3 max-w-[16ch] font-display text-display-lg text-snow-50">
              {p("s6Title")}
            </h2>
            <p className="mt-5 max-w-xl font-display text-h3 text-snow-100">{promise}</p>
            <p className="mt-5 max-w-xl text-lead text-snow-100">{p("s6Lead")}</p>
            <div className="mt-10">
              <Button variant="magnetic" size="lg" asChild>
                <a href={designHref}>
                  <MagneticLabel>{t("designCta")}</MagneticLabel>
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
