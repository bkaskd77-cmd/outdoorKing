import { Container, Heading, Text } from "@ok/ui";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { blocksOf } from "@/lib/page-blocks";
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
          <div className="grid max-w-[68ch] content-start gap-4">{children}</div>
          {aside ? <aside className="grid h-fit gap-4">{aside}</aside> : null}
        </Container>
      </section>
    </main>
  );
}

export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {blocksOf(text).map((block, index) => {
        const key = `${block.kind}-${String(index)}`;
        if (block.kind === "heading") {
          return (
            <Heading key={key} as="h2" className="mt-6 first:mt-0">
              {block.text}
            </Heading>
          );
        }
        if (block.kind === "list") {
          return (
            <ul key={key} className="grid gap-2 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.1em] text-primary">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <Text key={key}>{block.text}</Text>;
      })}
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
