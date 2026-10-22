import { Container, Heading, Section, Text } from "@ok/ui";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { loadStaffContext } from "@/app/(frontend)/actions/desk";
import { DeskNav } from "@/components/desk/DeskNav";
import { LoginForm } from "@/components/quote/LoginForm";

export default async function DeskLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ctx = await loadStaffContext();

  return (
    <main id="content">
      <Section>
        <Container>
          {!ctx.ok ? (
            <>
              <Heading as="h1">Quote desk</Heading>
              <Text className="mt-4">
                Staff only. Sign in with an invited staff account, then review drafts and
                send private quotes.
              </Text>
              <div className="mt-8">
                <LoginForm callbackURL="/desk" />
              </div>
            </>
          ) : (
            <>
              <DeskNav ctx={ctx} />
              {children}
            </>
          )}
        </Container>
      </Section>
    </main>
  );
}
