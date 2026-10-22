import { assertPublishable, evaluateItinerary, type DayType } from "@ok/ai/rules";
import type { CollectionBeforeChangeHook } from "payload";

import { assertCanPublish } from "../access";

type DayDoc = {
  dayNumber?: number;
  title?: string;
  fromPlace?: string;
  toPlace?: string;
  startAltitudeM?: number;
  highPointM?: number;
  sleepAltitudeM?: number;
  dayType?: DayType;
};

export const blockUnsafePublish: CollectionBeforeChangeHook = async ({
  data,
  req,
  originalDoc,
}) => {
  if (data._status !== "published") return data;
  assertCanPublish(req.user);

  const payload = req.payload;
  const tripId = originalDoc?.id ?? data.id;
  let days: DayDoc[] = [];
  if (tripId && payload) {
    const result = await payload.find({
      collection: "itinerary-days",
      where: { trip: { equals: tripId } },
      limit: 100,
      depth: 0,
      overrideAccess: true,
    });
    days = result.docs as DayDoc[];
  }

  if (days.length > 0) {
    const highs = days.map((d) => Math.max(d.highPointM ?? 0, d.sleepAltitudeM ?? 0));
    const computedMax = Math.max(...highs);
    if (typeof data.maxAltitudeM === "number" && data.maxAltitudeM !== computedMax) {
      throw new Error(
        `maxAltitudeM ${String(data.maxAltitudeM)} must equal the itinerary max ${String(computedMax)}.`,
      );
    }
    const usesLukla = JSON.stringify(data).toLowerCase().includes("lukla");
    const report = evaluateItinerary(
      days.map((d) => ({
        dayNumber: d.dayNumber ?? 0,
        title: d.title ?? "",
        fromPlace: d.fromPlace,
        toPlace: d.toPlace,
        startAltitudeM: d.startAltitudeM ?? d.sleepAltitudeM ?? 0,
        highPointM: d.highPointM ?? d.sleepAltitudeM ?? 0,
        sleepAltitudeM: d.sleepAltitudeM ?? 0,
        dayType: d.dayType ?? "trek",
      })),
      { usesLukla },
    );
    assertPublishable(report);
    data.ruleReport = report;
  }

  return data;
};
