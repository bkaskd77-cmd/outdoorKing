import { describe, expect, it } from "vitest";

import { blocksOf } from "./page-blocks";

describe("blocksOf", () => {
  it("turns ## lines into headings and - lines into one list", () => {
    expect(blocksOf("Intro\n## Pack light\n- Boots\n- Down jacket\nAfter")).toEqual([
      { kind: "para", text: "Intro" },
      { kind: "heading", text: "Pack light" },
      { kind: "list", items: ["Boots", "Down jacket"] },
      { kind: "para", text: "After" },
    ]);
  });

  it("drops placeholders and blank lines", () => {
    expect(blocksOf("Hello [[TBD: x]]\n\n")).toEqual([{ kind: "para", text: "Hello" }]);
  });
});
