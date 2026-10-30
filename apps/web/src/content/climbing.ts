/** Rule options for climbing trips: expeditions and peak climbs acclimatise by rotation. */
export function climbingOptions(activity: string | undefined): {
  expedition?: boolean;
  peakClimb?: boolean;
} {
  if (activity === "expeditions") return { expedition: true };
  if (activity === "peak-climbing") return { peakClimb: true };
  return {};
}
