import { describe, expect, it } from "vitest";

import { publicText } from "./public-text";

describe("publicText", () => {
  it("drops citation markers", () => {
    expect(publicText("Large Gurung village. [s4][s5]")).toBe("Large Gurung village.");
    expect(publicText("Ghopte. [s6, s7, s8]")).toBe("Ghopte.");
  });

  it("drops sentences about sources and operator figures", () => {
    expect(
      publicText(
        "Grassy meadow west of the ridge; operators also list 4,500-4,570 m. Puja.",
      ),
    ).toBe("Puja.");
    expect(publicText("Deurali listed 3,200-3,230 m. [s4]")).toBe("");
  });

  it("writes approximations out and drops references to other fact files", () => {
    expect(publicText("Bus approx. 8 h. See langtang-valley-trek for changes.")).toBe(
      "Bus about 8 h.",
    );
    expect(publicText("Descend ~1,800 m.")).toBe("Descend about 1,800 m.");
    expect(publicText("Add a second (e.g. Samdo).")).toBe(
      "Add a second (for example Samdo).",
    );
  });

  it("keeps hyphenated phrases that are not file names", () => {
    expect(publicText("A climb-high-sleep-low hike.")).toBe(
      "A climb-high-sleep-low hike.",
    );
  });

  it("keeps ordinary sentences", () => {
    expect(publicText("Views of Jannu. Longest day.")).toBe(
      "Views of Jannu. Longest day.",
    );
  });
});
