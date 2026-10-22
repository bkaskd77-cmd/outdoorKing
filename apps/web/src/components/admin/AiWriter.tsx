"use client";

import { AiWriterForm } from "@/components/desk/AiWriterForm";

export function AiWriterPanel() {
  return (
    <section className="mb-8 rounded-md border border-border p-6">
      <h2 className="font-display text-h3">AI writing tools</h2>
      <p className="mt-2 max-w-[68ch] text-small text-muted-foreground">
        Researcher → writer → fact-checker → SEO → brand. Output is always a draft. The
        ai_agent principal cannot publish. Reviews, team, guides and company-facts stay
        human-only.
      </p>
      <div className="mt-4">
        <AiWriterForm />
      </div>
    </section>
  );
}
