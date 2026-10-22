export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type MotionLevel = "full" | "reduced" | "off";

export function readMotionLevel(): MotionLevel {
  if (typeof window === "undefined") return "full";
  const stored = window.localStorage.getItem("ok-motion");
  if (stored === "reduced" || stored === "off" || stored === "full") return stored;
  return prefersReducedMotion() ? "reduced" : "full";
}
