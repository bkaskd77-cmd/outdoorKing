import { Button, Container, MagneticLabel } from "@ok/ui";
import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { Picture } from "@/components/media/Picture";
import { JsonLd } from "@/components/seo/JsonLd";
import { media, type PictureSrc } from "@/content/media";
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

const hero = {
  src: "/media/gallery/ebc-1",
  alt: "",
  width: 1400,
  height: 900,
};

type GalleryFrame = {
  src: string;
  className: string;
};

const galleryFrames: readonly GalleryFrame[] = [
  {
    src: "/media/gallery/ebc-2",
    className: "md:col-span-7 min-h-[22rem] lg:min-h-[36rem]",
  },
  {
    src: "/media/gallery/trek-3",
    className: "md:col-span-5 min-h-[22rem] lg:min-h-[36rem]",
  },
  {
    src: "/media/gallery/trek-1",
    className: "md:col-span-4 min-h-[18rem] lg:min-h-[26rem]",
  },
  {
    src: "/media/gallery/trek-2",
    className: "md:col-span-4 min-h-[18rem] lg:min-h-[26rem]",
  },
  {
    src: "/media/gallery/ebc-3",
    className: "md:col-span-4 min-h-[18rem] lg:min-h-[26rem]",
  },
  {
    src: "/media/gallery/wildlife-1",
    className: "md:col-span-8 min-h-[20rem] lg:min-h-[30rem]",
  },
  {
    src: "/media/gallery/peak-1",
    className: "md:col-span-4 min-h-[20rem] lg:min-h-[30rem]",
  },
  {
    src: "/media/gallery/ebc-4",
    className: "md:col-span-5 min-h-[20rem] lg:min-h-[28rem]",
  },
  {
    src: "/media/hero/sky",
    className: "md:col-span-7 min-h-[20rem] lg:min-h-[28rem]",
  },
];

function purposeFrame(src: string): PictureSrc {
  const image = media.gallery.purpose.find((item) => item.src === src);
  if (!image) {
    throw new Error(`Missing purpose photograph: ${src}`);
  }
  return image;
}

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

      <div id="purpose-opening">
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
          <p>{p("s2P3")}</p>
        </StorySection>
      </div>

      <section className="bg-night-950 text-snow-50">
        <Container className="py-16 md:py-24">
          <p className="max-w-[18ch] font-display text-display-lg text-snow-50 md:max-w-[22ch]">
            {promise}
          </p>
          <p className="mt-6 max-w-xl text-lead text-snow-100">{p("bandLead")}</p>
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
              <p className="font-display text-h2 text-alpenglow-600">03</p>
              <h2
                id="purpose-gallery-title"
                className="mt-3 max-w-[14ch] font-display text-display-lg leading-[1.02]"
              >
                {p("s3Title")}
              </h2>
              <p className="mt-5 max-w-md font-display text-h3 text-muted-foreground">
                {p("s3Sub")}
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lead">{p("s3P")}</p>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
            {galleryFrames.map((frame, index) => {
              const image = purposeFrame(frame.src);
              return (
                <li key={frame.src} className={frame.className}>
                  <figure className="group relative h-full min-h-[inherit] overflow-hidden rounded-xl bg-night-950 shadow-2">
                    <Picture
                      image={image}
                      priority={index < 2}
                      className="block h-full min-h-[inherit]"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 64rem) 60rem, 100vw"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/85 via-night-950/45 to-transparent px-5 pt-16 pb-5 text-snow-50">
                      <span className="block font-display text-h3">
                        {p(`frames.f${String(index + 1)}.place`)}
                      </span>
                      <span className="mt-1 block text-small text-snow-100">
                        {p(`frames.f${String(index + 1)}.note`)}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <StorySection index="04" title={p("s4Title")} sub={p("s4Sub")} tone="sunken">
        <p>{p("s4P1")}</p>
        <p>{p("s4P2")}</p>
        <p>{p("s4P3")}</p>
      </StorySection>

      <StorySection index="05" title={p("s5Title")} sub={p("s5Sub")}>
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
            <p className="mt-5 max-w-xl font-display text-h3 text-snow-100">
              {p("s6Sub")}
            </p>
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
