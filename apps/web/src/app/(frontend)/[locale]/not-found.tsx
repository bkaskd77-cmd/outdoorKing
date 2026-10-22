import { randomUUID } from "node:crypto";

import { Container, Heading, Text } from "@ok/ui";

export default function NotFound() {
  const requestId = randomUUID();
  return (
    <main id="content" className="py-24">
      <Container>
        <Heading as="h1">Page not found</Heading>
        <Text className="mt-4">That trail is not on the map.</Text>
        <p className="mt-6 text-caption text-muted-foreground">{`request_id ${requestId}`}</p>
      </Container>
    </main>
  );
}
