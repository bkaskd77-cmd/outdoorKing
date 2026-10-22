import { Container, Heading, Section, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { loadDesk } from "@/app/(frontend)/actions/quote";
import { LoginForm } from "@/components/quote/LoginForm";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quote desk",
  robots: { index: false, follow: false },
  alternates: { canonical: canonical("/desk") },
};

export default async function DeskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const desk = await loadDesk();

  return (
    <main id="content">
      <Section>
        <Container>
          <Heading as="h1">Quote desk</Heading>
          {!desk.ok ? (
            <>
              <Text className="mt-4">
                Staff only. Sign in with an invited staff account, then review drafts and
                send private quotes.
              </Text>
              <div className="mt-8">
                <LoginForm callbackURL="/desk" />
              </div>
            </>
          ) : desk.rows.length === 0 ? (
            <Text className="mt-4">No trip requests yet.</Text>
          ) : (
            <ul className="mt-8 grid gap-3">
              {desk.rows.map((row) => (
                <li key={row.id} className="rounded-md border border-border p-4">
                  <a className="font-semibold underline" href={`/desk/${row.id}`}>
                    {row.name} · {row.tripSlug ?? "custom"}
                  </a>
                  <p className="text-small text-muted-foreground">
                    {row.status} · {row.email}
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
