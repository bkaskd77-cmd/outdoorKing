import { firstWhatsAppNumber, publicWhatsAppHref } from "@ok/ai";
import { Button } from "@ok/ui";
import { env } from "@ok/env/server";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { companyFacts } from "@/content/catalog";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    alternates: { canonical: canonical("/contact") },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = (await getCatalog()).getPage("contact");
  const t = await getTranslations("contact");
  const whatsappHref = publicWhatsAppHref(
    firstWhatsAppNumber(companyFacts.whatsapp, env.WHATSAPP_NUMBER),
  );
  return (
    <SimplePage
      title={page?.title ?? t("title")}
      path="/contact"
      eyebrow={t("eyebrow")}
      lead={t("lead")}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard
          title={t("planTrip")}
          action={
            <Button asChild>
              <a href="/design-my-trip">{t("designMyTrip")}</a>
            </Button>
          }
        >
          <p>{t("planTripText")}</p>
        </InfoCard>
        {whatsappHref ? (
          <InfoCard
            title="WhatsApp"
            action={
              <Button variant="secondary" asChild>
                <a href={whatsappHref}>{t("messageUs")}</a>
              </Button>
            }
          >
            <p>{companyFacts.whatsapp}</p>
            <p>{t("whatsappText")}</p>
          </InfoCard>
        ) : null}
        <InfoCard
          title={t("booked")}
          action={
            <Button variant="secondary" asChild>
              <a href="/account">{t("bookedLink")}</a>
            </Button>
          }
        >
          <p>{t("bookedText")}</p>
        </InfoCard>
        <InfoCard
          title={t("questions")}
          action={
            <Button variant="secondary" asChild>
              <a href="/faq">{t("questionsLink")}</a>
            </Button>
          }
        >
          <p>{t("questionsText")}</p>
        </InfoCard>
      </div>
      <div className="mt-6 grid gap-4">
        <Paragraphs text={page?.body ?? ""} />
      </div>
    </SimplePage>
  );
}
