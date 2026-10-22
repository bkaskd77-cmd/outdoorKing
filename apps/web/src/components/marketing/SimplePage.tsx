import { Container, Heading, Section, Text } from "@ok/ui";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/JsonLd";
import { canonical } from "@/lib/site";

export async function SimplePage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
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
      <Section>
        <Container>
          <Heading as="h1">{title}</Heading>
          <div className="mt-6 grid gap-4">{children}</div>
        </Container>
      </Section>
    </main>
  );
}

export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((para) => (
        <Text key={para.slice(0, 32)}>{para}</Text>
      ))}
    </>
  );
}
