"use client";

import { Container, Heading, Text } from "@ok/ui";
import { useMemo } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  const requestId = useMemo(() => crypto.randomUUID(), []);
  return (
    <main id="content" className="py-24">
      <Container>
        <Heading as="h1">Something went wrong</Heading>
        <Text className="mt-4">
          Please try again. If it persists, quote the request id.
        </Text>
        <p className="mt-6 text-caption text-muted-foreground">{`request_id ${requestId}`}</p>
        <p className="sr-only">{error.message}</p>
      </Container>
    </main>
  );
}
