import { randomUUID } from "node:crypto";

import { Container, Heading, Text } from "@ok/ui";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("ui");
  const requestId = randomUUID();
  return (
    <main id="content" className="py-24">
      <Container>
        <Heading as="h1">{t("notFound")}</Heading>
        <Text className="mt-4">{t("notFoundText")}</Text>
        <p className="mt-6 text-caption text-muted-foreground">{`request_id ${requestId}`}</p>
      </Container>
    </main>
  );
}
