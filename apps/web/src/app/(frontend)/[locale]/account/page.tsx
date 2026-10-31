import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { loadInbox } from "@/app/(frontend)/actions/quote";
import { LoginForm } from "@/components/quote/LoginForm";
import { canonical } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("portal");
  return {
    title: t("inboxMeta"),
    robots: { index: false, follow: false },
    alternates: { canonical: canonical("/account") },
  };
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const inbox = await loadInbox();
  const t = await getTranslations("portal");

  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">{t("inboxTitle")}</Heading>
          <p className="mt-2 text-small">
            <a className="underline" href="/account/bookings">
              {t("bookingsLink")}
            </a>
          </p>
          {!inbox.ok ? (
            <>
              <Text className="mt-4">{t("signInLead")}</Text>
              <div className="mt-8">
                <LoginForm />
              </div>
            </>
          ) : inbox.quotes.length === 0 ? (
            <Text className="mt-4">{t("noQuotes")}</Text>
          ) : (
            <ul className="mt-8 grid gap-4">
              {inbox.quotes.map((quote) => (
                <li key={quote.id} className="rounded-md border border-border p-4">
                  <a
                    className="font-semibold underline"
                    href={`/quotes/${quote.token ?? ""}`}
                  >
                    {quote.number}
                  </a>
                  <p className="text-small text-muted-foreground">
                    {quote.status}
                    {quote.validUntil ? t("validUntil", { date: quote.validUntil }) : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </main>
  );
}
