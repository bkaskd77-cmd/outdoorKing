import { headers } from "next/headers";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export async function JsonLd({ data }: JsonLdProps) {
  const headerStore = await headers();
  const nonce = headerStore.get("x-nonce") ?? undefined;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      // JSON-LD cannot be passed as children in React without this.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
