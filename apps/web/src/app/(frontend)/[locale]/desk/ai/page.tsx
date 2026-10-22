import { Heading, Text } from "@ok/ui";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { loadStaffContext } from "@/app/(frontend)/actions/desk";
import { AiWriterForm } from "@/components/desk/AiWriterForm";

export const metadata: Metadata = {
  title: "AI writing tools",
  robots: { index: false, follow: false },
};

export default async function DeskAiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ctx = await loadStaffContext();
  if (!ctx.ok) return null;

  return (
    <>
      <Heading as="h1">AI writing tools</Heading>
      {!ctx.canWriteContent ? (
        <Text className="mt-4">This role cannot write content drafts.</Text>
      ) : (
        <>
          <Text className="mt-4">
            Drafts only, via the content-agent pipeline on the AI_MOCK path. The ai_agent
            principal cannot publish. Sales cannot publish company-facts.
          </Text>
          <div className="mt-8">
            <AiWriterForm />
          </div>
        </>
      )}
    </>
  );
}
