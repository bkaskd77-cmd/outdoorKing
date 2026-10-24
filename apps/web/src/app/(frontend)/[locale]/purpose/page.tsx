import { Button, Container, MagneticLabel } from "@ok/ui";
import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { MediaGallery } from "@/components/media/MediaGallery";
import { Picture } from "@/components/media/Picture";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
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
  const hero = {
    src: "/media/gallery/ebc-1",
    alt: "",
    width: 1400,
    height: 900,
  };
  const kathmandu = media.gallery.purpose.find((item) => item.src.endsWith("/trek-3"));

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
      <section className="relative isolate overflow-hidden bg-night-950 text-snow-50">
        <div aria-hidden="true" className="absolute inset-0">
          <Picture
            image={hero}
            priority
            className="block h-full w-full"
            imgClassName="h-full w-full object-cover object-[center_42%]"
            sizes="100vw"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night-950/90 via-night-950/62 to-night-950/25"
        />
        <Container className="relative z-10 grid min-h-[calc(100svh-var(--header-h))] items-center gap-10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
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
              {t("navPurpose")}
            </p>
            <h1 className="mt-5">
              <span
                aria-hidden="true"
                className="tabular block font-display text-display-xl leading-[0.85] text-alpenglow-300"
              >
                5%
              </span>
              <span className="sr-only">5% </span>
              <span className="mt-4 block max-w-xl font-display text-h1 text-snow-50">
                {t("purposePromise")}
              </span>
            </h1>
            <p className="mt-6 max-w-md font-display text-h2 text-snow-100">
              {t("purposeFields")}
            </p>
          </div>
          {kathmandu ? (
            <figure className="overflow-hidden rounded-xl border border-white/15 bg-night-950/40 shadow-4 lg:col-span-5">
              <Picture
                image={kathmandu}
                className="block aspect-[4/5] max-h-80 w-full lg:max-h-[32rem]"
                imgClassName="h-full w-full object-cover object-center"
                sizes="(min-width: 64rem) 32rem, 100vw"
              />
              <figcaption className="px-4 py-3 text-small text-snow-100">
                Kathmandu
              </figcaption>
            </figure>
          ) : null}
        </Container>
      </section>

      <section className="bg-surface-sunken py-16 md:py-24">
        <Container>
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-h1">{t("purposeGalleryTitle")}</h2>
            <p className="max-w-sm text-lead text-muted-foreground">
              {t("purposeGalleryLead")}
            </p>
          </div>
          <div id="purpose-gallery">
            <MediaGallery
              items={media.gallery.purpose}
              label={t("purposeGalleryLabel")}
            />
          </div>
        </Container>
      </section>

      <section className="bg-night-950 py-16 text-night-50 md:py-24">
        <Container>
          <h2 className="max-w-[14ch] font-display text-display-lg text-snow-50">
            {t("purposeCloseTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-lead text-snow-100">{t("purposeCloseLead")}</p>
          <div className="mt-8">
            <Button variant="magnetic" size="lg" asChild>
              <a href={designHref}>
                <MagneticLabel>{t("designCta")}</MagneticLabel>
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
