import { describe, expect, it } from "vitest";

import {
  auditLog,
  bookings,
  contentChunks,
  customers,
  invite,
  payments,
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
});
