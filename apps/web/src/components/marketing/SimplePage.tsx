import { Container, Heading, Text } from "@ok/ui";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { withoutPlaceholders } from "@/lib/placeholders";
import { canonical } from "@/lib/site";

/** Text pages (About, Privacy, Terms…): a header band, a readable column and an optional aside. */
export async function SimplePage({
  title,
  path,
  eyebrow,
  lead,
  aside,
  children,
}: {
  title: string;
  path: string;
  eyebrow?: string;
  lead?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main id="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          url: canonical(path),
        }}
      />
      <header className="border-b border-border bg-surface-sunken py-[var(--space-section-sm)]">
        <Container>
          {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
          <Heading as="h1" className={eyebrow ? "mt-3" : undefined}>
            {title}
          </Heading>
          {lead ? (
            <Text className="mt-4 max-w-[60ch] text-lead text-muted-foreground">
              {lead}
            </Text>
          ) : null}
        </Container>
      </header>
      <section className="py-[var(--space-section-sm)]">
        <Container
          className={aside ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]" : undefined}
        >
          <div className="grid max-w-[68ch] gap-4">{children}</div>
          {aside ? <aside className="grid h-fit gap-4">{aside}</aside> : null}
        </Container>
      </section>
    </main>
  );
}

export function Paragraphs({ text }: { text: string }) {
  const paras = withoutPlaceholders(text)
    .split("\n")
    .map((para) => para.trim())
    .filter(Boolean);
  return (
    <>
      {paras.map((para) => (
        <Text key={para.slice(0, 32)}>{para}</Text>
      ))}
    </>
  );
}

/** A bordered card for page asides and contact options. */
export function InfoCard({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-1">
      <Heading as="h3">{title}</Heading>
      <div className="mt-2 grid gap-2 text-small text-muted-foreground">{children}</div>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
