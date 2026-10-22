"use client";

import { useEffect, type ReactNode } from "react";

import { readMotionLevel } from "./prefers";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.lenis = "off";
    const level = readMotionLevel();
    if (level !== "full") {
      return;
    }

    let destroyed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (destroyed) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.dataset.lenis = "on";
      cleanup = () => {
        gsap.ticker.remove(onTick);
        lenis.destroy();
      };
    })();

    return () => {
      destroyed = true;
      document.documentElement.dataset.lenis = "off";
      cleanup?.();
    };
  }, []);

  return children;
}

export function isLenisEnabled(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.lenis === "on";
}
