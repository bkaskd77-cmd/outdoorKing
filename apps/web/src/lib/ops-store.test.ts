import { describe, expect, it } from "vitest";

import {
  assignGuide,
  listDepartures,
  listGuideAssignments,
  listPermitApplications,
  scheduleDeparture,
  trackPermit,
  updatePermitStatus,
} from "./ops-store";

describe("ops store", () => {
  it("tracks guide assignments, departures and permit applications", () => {
    const assignment = assignGuide({
      bookingId: "00000000-0000-0000-0000-000000000001",
      guidePayloadId: "guide-namche",
      role: "lead",
      fromDate: "2026-10-01",
      toDate: "2026-10-16",
    });
    expect(assignment.role).toBe("lead");
    expect(listGuideAssignments().some((row) => row.id === assignment.id)).toBe(true);

    const departure = scheduleDeparture({
      tripSlug: "everest-base-camp-trek",
      startDate: "2026-10-12",
      status: "planned",
      capacity: "private",
    });
    expect(listDepartures().some((row) => row.id === departure.id)).toBe(true);

    const permit = trackPermit({
      bookingId: assignment.bookingId,
      permitPayloadId: "sagarmatha-national-park",
      status: "submitted",
    });
    const updated = updatePermitStatus(permit.id, "issued");
    expect(updated?.status).toBe("issued");
    expect(listPermitApplications().some((row) => row.id === permit.id)).toBe(true);
  });
});
