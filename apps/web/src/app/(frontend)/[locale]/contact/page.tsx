import { firstWhatsAppNumber, publicWhatsAppHref } from "@ok/ai";
import { Button } from "@ok/ui";
import { env } from "@ok/env/server";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { InfoCard, Paragraphs, SimplePage } from "@/components/marketing/SimplePage";
import { companyFacts } from "@/content/catalog";
import { getCatalog } from "@/content/store";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: canonical("/contact") },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = (await getCatalog()).getPage("contact");
  const whatsappHref = publicWhatsAppHref(
    firstWhatsAppNumber(companyFacts.whatsapp, env.WHATSAPP_NUMBER),
  );
  return (
    <SimplePage
      title={page?.title ?? "Contact"}
      path="/contact"
      eyebrow="Talk to a specialist"
      lead="Tell us where and when. A trip designer replies with a private plan, usually within a day."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard
          title="Plan a trip"
          action={
            <Button asChild>
              <a href="/design-my-trip">Design my trip</a>
            </Button>
          }
        >
          <p>Share your dates, pace and group. It takes about two minutes.</p>
        </InfoCard>
        {whatsappHref ? (
          <InfoCard
            title="WhatsApp"
            action={
              <Button variant="secondary" asChild>
                <a href={whatsappHref}>Message us</a>
              </Button>
            }
          >
            <p>{companyFacts.whatsapp}</p>
            <p>For quick questions before or during your trip.</p>
          </InfoCard>
        ) : null}
        <InfoCard
          title="Already booked?"
          action={
            <Button variant="secondary" asChild>
              <a href="/account">Your quotes and bookings</a>
            </Button>
          }
        >
          <p>See your quotes, bookings and payment status.</p>
        </InfoCard>
        <InfoCard
          title="Common questions"
          action={
            <Button variant="secondary" asChild>
              <a href="/faq">Read the FAQ</a>
            </Button>
          }
        >
          <p>Permits, insurance, altitude, payments and packing.</p>
        </InfoCard>
      </div>
      <div className="mt-6 grid gap-4">
        <Paragraphs text={page?.body ?? ""} />
      </div>
    </SimplePage>
  );
}
