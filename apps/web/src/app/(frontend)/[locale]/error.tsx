"use client";

import { Container, Heading, Text } from "@ok/ui";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  const t = useTranslations("ui");
  const requestId = useMemo(() => crypto.randomUUID(), []);
  return (
    <main id="content" className="py-24">
      <Container>
        <Heading as="h1">{t("error")}</Heading>
        <Text className="mt-4">{t("errorText")}</Text>
        <p className="mt-6 text-caption text-muted-foreground">{`request_id ${requestId}`}</p>
        <p className="sr-only">{error.message}</p>
      </Container>
    </main>
  );
}
