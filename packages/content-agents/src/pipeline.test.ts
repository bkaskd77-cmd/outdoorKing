import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { runPipeline } from "./pipeline";

describe("content-agent pipeline", () => {
  it("creates a draft FAQ with sources and cannot publish as ai_agent", async () => {
    const runsDir = await mkdtemp(join(tmpdir(), "ok-agents-"));
    const result = await runPipeline({
      type: "faq",
      slug: "what-is-tims",
      runsDir,
    });
    expect(result.draft.status).toBe("draft");
    expect(result.draft.sources.length).toBeGreaterThan(0);
    expect(result.publishAllowed).toBe(false);
  });
});
