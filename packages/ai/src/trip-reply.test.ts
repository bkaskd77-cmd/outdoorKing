import { describe, expect, it } from "vitest";

import { fixtureCatalog } from "./rag/fixture-catalog";
import { publicTripReply } from "./trip-reply";

describe("publicTripReply", () => {
  it("lists Annapurna treks in sentences and never Ama Dablam", () => {
    const reply = publicTripReply(fixtureCatalog, "Annapurna trek");
    expect(reply.text).toMatch(/Annapurna Circuit Trek/);
    expect(reply.text).toMatch(/Annapurna Base Camp Trek/);
    expect(reply.text).toMatch(/Poon Hill/);
    expect(reply.text).toMatch(/Mardi Himal Trek/);
    expect(reply.text).not.toMatch(/Ama Dablam/i);
    expect(reply.text).not.toMatch(/\[source:/);
    expect(reply.text).not.toMatch(/annapurna-circuit-trek/);
    expect(reply.citations.map((c) => c.title).join(" ")).not.toMatch(/Ama Dablam/i);
  });

  it("describes a named trek instead of dumping the family", () => {
    const reply = publicTripReply(
      fixtureCatalog,
      "Tell me about the Everest Base Camp trek",
    );
    expect(reply.text).toMatch(/Everest Base Camp Trek is a private trek/);
    expect(reply.text).not.toMatch(/Annapurna Circuit/);
    expect(reply.text).not.toMatch(/\[source:/);
  });
});
