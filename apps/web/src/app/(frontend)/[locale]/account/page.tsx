import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { loadInbox } from "@/app/(frontend)/actions/quote";
import { LoginForm } from "@/components/quote/LoginForm";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quote inbox",
  robots: { index: false, follow: false },
  alternates: { canonical: canonical("/account") },
};

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const inbox = await loadInbox();

  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">Your private quotes</Heading>
          {!inbox.ok ? (
            <>
              <Text className="mt-4">
                Sign in with a magic link to see quotes sent to your email. Trip pages
                never show prices.
              </Text>
              <div className="mt-8">
                <LoginForm />
              </div>
            </>
          ) : inbox.quotes.length === 0 ? (
            <Text className="mt-4">No quotes yet. Design a trip to get started.</Text>
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
                    {quote.validUntil ? ` · valid until ${quote.validUntil}` : ""}
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
