import { Heading, Text } from "@ok/ui";

import { loadStaffContext } from "@/app/(frontend)/actions/desk";

import { AiWriterForm } from "./AiWriterForm";

export async function AiScreen() {
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
