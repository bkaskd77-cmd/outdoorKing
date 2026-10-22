import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { runPipeline } from "@ok/content-agents";
import { can } from "@ok/auth/rbac";
import { describe, expect, it } from "vitest";

describe("AI writer", () => {
  it("creates drafts only and never grants ai_agent publish", async () => {
    const runsDir = await mkdtemp(join(tmpdir(), "ok-writer-"));
    const created: { status: string }[] = [];
    const result = await runPipeline({
      type: "faq",
      slug: "what-is-tims",
      runsDir,
      writer: {
        async createDraft(draft) {
          expect(draft.status).toBe("draft");
          created.push({ status: draft.status });
          return { id: "draft-1" };
        },
      },
    });
    expect(result.draft.status).toBe("draft");
    expect(result.publishAllowed).toBe(false);
    expect(can({ role: "ai_agent" }, "content:publish")).toBe(false);
    expect(created).toEqual([{ status: "draft" }]);
  });
});
