import { describe, expect, it } from "vitest";

import { fixtureCatalog } from "./rag/fixture-catalog";
import { publicTripReply } from "./trip-reply";

describe("publicTripReply", () => {
  it("lists Annapurna treks and how they differ, never Ama Dablam", () => {
    const reply = publicTripReply(fixtureCatalog, "Annapurna trek");
    expect(reply.text).toMatch(/Annapurna Circuit Trek/);
    expect(reply.text).toMatch(/Annapurna Base Camp Trek/);
    expect(reply.text).toMatch(/Poon Hill/);
    expect(reply.text).toMatch(/Mardi Himal Trek/);
    expect(reply.text).toMatch(/differ in length and height/);
    expect(reply.text).toMatch(/typically 13 days, up to 5,416 m/);
    expect(reply.text).toMatch(/typically 10 days, up to 4,130 m/);
    expect(reply.text).not.toMatch(/Ama Dablam/i);
    expect(reply.text).not.toMatch(/\[source:/);
    expect(reply.text).not.toMatch(/annapurna-circuit-trek/);
    expect(reply.citations.map((c) => c.title).join(" ")).not.toMatch(/Ama Dablam/i);
  });

  it("describes a named trek with days, altitude and season", () => {
    const reply = publicTripReply(fixtureCatalog, "Annapurna Base camp trek");
    expect(reply.text).toMatch(/Annapurna Base Camp Trek is a private trek/);
    expect(reply.text).toMatch(/typically 10 days/);
    expect(reply.text).toMatch(/4,130 m/);
    expect(reply.text).toMatch(/spring and autumn/);
    expect(reply.text).toMatch(/designed around your dates/);
    expect(reply.text).not.toMatch(/Annapurna Circuit/);
    expect(reply.text).not.toMatch(/Ama Dablam/i);
    expect(reply.text).not.toMatch(/\[source:/);
  });
});
