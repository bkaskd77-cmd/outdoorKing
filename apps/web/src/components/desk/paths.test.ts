import { describe, expect, it } from "vitest";

import { deskToQuotes, quotesHref } from "./paths";

describe("quotes paths", () => {
  it("keeps the quotes section under the admin", () => {
    expect(quotesHref()).toBe("/admin/quotes");
    expect(quotesHref("quotes")).toBe("/admin/quotes/quotes");
    expect(quotesHref("/bookings/")).toBe("/admin/quotes/bookings");
  });

  it("sends desk URLs to the quotes section", () => {
    expect(deskToQuotes("/desk")).toBe("/admin/quotes");
    expect(deskToQuotes("/desk/quotes")).toBe("/admin/quotes/quotes");
    expect(deskToQuotes("/desk/partners")).toBe("/admin/quotes/partners");
    expect(deskToQuotes("/de/desk/ai")).toBe("/admin/quotes/ai");
    expect(deskToQuotes("/zh-Hans/desk/req_1")).toBe("/admin/quotes/req_1");
  });
});
