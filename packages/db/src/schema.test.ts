import { describe, expect, it } from "vitest";

import {
  aiUsageDaily,
  auditLog,
  bookings,
  conciergeConversations,
  conciergeMessages,
  contentChunks,
  customers,
  departures,
  guideAssignments,
  invite,
  payments,
  permitApplications,
  quotes,
  travelers,
  tripRequests,
  tripRequestsLite,
  user,
} from "./schema/index";

describe("app schema", () => {
  it("exports Phase 0 tables", () => {
    expect(user).toBeTruthy();
    expect(invite).toBeTruthy();
    expect(auditLog).toBeTruthy();
    expect(contentChunks).toBeTruthy();
    expect(tripRequestsLite).toBeTruthy();
  });

  it("exports Phase 2 quote engine tables", () => {
    expect(customers).toBeTruthy();
    expect(tripRequests).toBeTruthy();
    expect(quotes).toBeTruthy();
    expect(travelers).toBeTruthy();
  });

  it("exports Phase 3 booking and payment tables", () => {
    expect(bookings).toBeTruthy();
    expect(payments).toBeTruthy();
  });

  it("exports Phase 4 concierge tables", () => {
    expect(conciergeConversations).toBeTruthy();
    expect(conciergeMessages).toBeTruthy();
    expect(aiUsageDaily).toBeTruthy();
  });

  it("exports Phase 5 ops tables", () => {
    expect(guideAssignments).toBeTruthy();
    expect(departures).toBeTruthy();
    expect(permitApplications).toBeTruthy();
  });
});
