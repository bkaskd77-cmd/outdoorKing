import { APIError, type CollectionBeforeChangeHook } from "payload";

import { assertCanPublish } from "../access";
import { checkTrip, publishRefusal, type SafetyDay } from "../safety";

export const blockUnsafePublish: CollectionBeforeChangeHook = async ({
  data,
  req,
  originalDoc,
}) => {
  if (data._status !== "published") return data;
  assertCanPublish(req.user);

  const payload = req.payload;
  const tripId = originalDoc?.id ?? data.id;
  let days: SafetyDay[] = [];
  if (tripId && payload) {
    const result = await payload.find({
      collection: "itinerary-days",
      where: { trip: { equals: tripId } },
      limit: 200,
      depth: 0,
      overrideAccess: true,
    });
    days = result.docs as SafetyDay[];
  }

  if (days.length > 0) {
    const usesLukla =
      typeof data.usesLukla === "boolean"
        ? data.usesLukla
        : JSON.stringify(data).toLowerCase().includes("lukla");
    const result = checkTrip({ maxAltitudeM: data.maxAltitudeM, usesLukla }, days);
    if (result.problems.length > 0) {
      // 400 with a public message, so the editor sees what to fix instead of a generic error.
      throw new APIError(publishRefusal(result), 400, undefined, true);
    }
    data.ruleReport = result.report;
  }

  return data;
};
