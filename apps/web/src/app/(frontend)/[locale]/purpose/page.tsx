import { Button, Container, MagneticLabel } from "@ok/ui";
import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { Picture } from "@/components/media/Picture";
import { JsonLd } from "@/components/seo/JsonLd";
import { media, type PictureSrc } from "@/content/media";
import { canonical, hreflangMap, localizedPath } from "@/lib/site";

const promise =
  "5% of each traveler's booking supports social work in Nepal, across more than one field.";

export const metadata: Metadata = {
  title: "Travel with Purpose",
  description: promise,
  alternates: {
    canonical: canonical("/purpose"),
    languages: hreflangMap("/purpose"),
  },
};

const hero = {
  src: "/media/gallery/ebc-1",
  alt: "",
  width: 1400,
  height: 900,
};

type GalleryFrame = {
  src: string;
  place: string;
  note: string;
  className: string;
};

const galleryFrames: readonly GalleryFrame[] = [
  {
    src: "/media/gallery/ebc-2",
    place: "Snow peaks",
    note: "A stupa and prayer flags on the trail below them.",
    className: "md:col-span-7 min-h-[22rem] lg:min-h-[36rem]",
  },
  {
    src: "/media/gallery/trek-3",
    place: "Kathmandu",
    note: "Boudhanath, in the city the journeys pass through.",
    className: "md:col-span-5 min-h-[22rem] lg:min-h-[36rem]",
  },
  {
    src: "/media/gallery/trek-1",
    place: "A wide valley",
    note: "Forest in front, snow on the far ridges.",
    className: "md:col-span-4 min-h-[18rem] lg:min-h-[26rem]",
  },
  {
    src: "/media/gallery/trek-2",
    place: "Above the cloud",
    note: "A high rock, mist in the valley below.",
    className: "md:col-span-4 min-h-[18rem] lg:min-h-[26rem]",
  },
  {
    src: "/media/gallery/ebc-3",
    place: "Dry grass, snow above",
    note: "A sharp peak over an open slope.",
    className: "md:col-span-4 min-h-[18rem] lg:min-h-[26rem]",
  },
  {
    src: "/media/gallery/wildlife-1",
    place: "A lowland river",
    note: "A boat at dusk — the plains, not the high ridges.",
    className: "md:col-span-8 min-h-[20rem] lg:min-h-[30rem]",
  },
  {
    src: "/media/gallery/peak-1",
    place: "Low light",
    note: "A snow peak as the sky cools.",
    className: "md:col-span-4 min-h-[20rem] lg:min-h-[30rem]",
  },
  {
    src: "/media/gallery/ebc-4",
    place: "Above the clouds",
    note: "Ridges catching the first warm light.",
    className: "md:col-span-5 min-h-[20rem] lg:min-h-[28rem]",
  },
  {
    src: "/media/hero/sky",
    place: "Open sky",
    note: "A high snow peak under a clear sky.",
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
  const activeLocale = await getLocale();
  const designHref = localizedPath(activeLocale, "/design-my-trip");

  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Travel with Purpose",
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
              Travel with purpose.
            </h1>
            <p className="mt-6 max-w-2xl font-display text-h2 text-snow-50">{promise}</p>
            <p className="mt-5 max-w-xl text-lead text-snow-100">
              The operator’s promise, said in public. Five percent of each traveler’s
              booking supports social work in Nepal. The work is not one field. It is more
              than one. The share leaves with the booking.
            </p>
          </Container>
        </section>

        <StorySection
          index="01"
          title="Carried in the booking"
          sub="Five percent leaves with the traveler. It is not a second ask."
        >
          <p>
            When you book with OutdoorKing, five percent of that booking is set aside for
            social work in Nepal. The share belongs to the booking itself. It is not a box
            to tick once the journey is designed, and it is not a separate appeal after
            the days are drawn.
          </p>
          <p>
            We say this as the operator of the journey. The percentage is how the booking
            is made, for each traveler, before anyone walks a trail. The journey can be
            short or long. It can be a city, a river, or a high route. The rule does not
            change with the shape of the days: five percent of each traveler’s booking
            supports social work in Nepal.
          </p>
          <p>
            You do not add it at the end. You do not choose a campaign on this page. The
            commitment is already in the booking you make with us.
          </p>
        </StorySection>

        <StorySection
          index="02"
          title="The work stays in Nepal"
          sub="The country you travel is the country the share is for."
          tone="sunken"
        >
          <p>
            The promise names one country. Five percent of each traveler’s booking
            supports social work in Nepal. It is not described here as support that might
            land somewhere else, and it is not a fund with a rotating list of places.
          </p>
          <p>
            That matters because the booking and the work name the same country. You come
            for the high valleys, for Kathmandu, for the rivers at the edge of the plains.
            The share stays with social work there.
          </p>
          <p>
            This page keeps the promise at that scale, and only that scale: the
            percentage, the traveler’s booking, and Nepal.
          </p>
        </StorySection>
      </div>

      <section className="bg-night-950 text-snow-50">
        <Container className="py-16 md:py-24">
          <p className="max-w-[18ch] font-display text-display-lg text-snow-50 md:max-w-[22ch]">
            {promise}
          </p>
          <p className="mt-6 max-w-xl text-lead text-snow-100">
            Every booking we take carries that share. It is not a line we add when a
            journey is famous, and it is not a line we drop when the route is quiet.
          </p>
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
                The country this promise is spoken into
              </h2>
              <p className="mt-5 max-w-md font-display text-h3 text-muted-foreground">
                Ridges, a city, a lowland river. The ground the journeys cross.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lead">
                These photographs are Nepal as the routes move through it. They are not
                pictures of the social work, and they are not a record of what the five
                percent has done. They are here so the promise has a place you can stand
                in — more than one kind of country, inside the one country the booking
                names.
              </p>
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
                      <span className="block font-display text-h3">{frame.place}</span>
                      <span className="mt-1 block text-small text-snow-100">
                        {frame.note}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <StorySection
        index="04"
        title="More than one field"
        sub="The share is not collapsed into a single cause."
        tone="sunken"
      >
        <p>
          Social work in Nepal is wider than one kind of help. “Across more than one
          field” is part of the promise, not a softer way of saying one project. The five
          percent is not assigned, on this page, to a single heading.
        </p>
        <p>
          We keep it at that width on purpose. Each traveler’s booking supports social
          work in Nepal across more than one field, so the commitment is not narrowed to
          make the sentence easier. The fields are more than one. The country is Nepal.
          The share is five percent of the booking.
        </p>
        <p>
          That is as specific as this promise gets, and it is specific on purpose: a
          percentage, a traveler’s booking, a country, and work that is not confined to
          one field.
        </p>
      </StorySection>

      <StorySection
        index="05"
        title="The same share, every traveler"
        sub="It does not switch on for one departure and off for another."
      >
        <p>
          The promise follows each traveler’s booking. A solo guest, a couple, a family:
          the share is five percent of that booking. It is not a flat gift attached to one
          famous route, and it is not reserved for a single season.
        </p>
        <p>
          It is also the same promise from one journey to the next. Wherever in Nepal the
          days are drawn — a short walk near the city, a river at the edge of the plains,
          a high route — the booking still supports social work in Nepal, across more than
          one field.
        </p>
        <p>
          We do not publish a trip price on this page. The figure that belongs here is the
          share.
        </p>
      </StorySection>

      <section className="bg-night-950 py-20 text-snow-50 md:py-28">
        <Container className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="font-display text-h2 text-alpenglow-300">06</p>
            <h2 className="mt-3 max-w-[16ch] font-display text-display-lg text-snow-50">
              Design the journey. The share comes with it.
            </h2>
            <p className="mt-5 max-w-xl font-display text-h3 text-snow-100">
              Five percent of each traveler’s booking supports social work in Nepal,
              across more than one field.
            </p>
            <p className="mt-5 max-w-xl text-lead text-snow-100">
              If you design a trip with OutdoorKing, read this page as part of how the
              journey is booked. The share is already in it.
            </p>
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
