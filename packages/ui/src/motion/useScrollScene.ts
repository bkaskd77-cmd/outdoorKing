"use client";

import { useEffect, useRef } from "react";

import { readMotionLevel } from "./prefers";

export function useScrollScene(
  setup: (
    gsap: { registerPlugin: (...args: unknown[]) => void },
    el: HTMLElement,
  ) => {
    kill: () => void;
  } | void,
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (readMotionLevel() !== "full") return;
    const el = ref.current;
    if (!el) return;
    let ctx: { kill: () => void } | undefined;
    void (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const result = setup(gsap as never, el);
      ctx = result ?? undefined;
    })();
    return () => ctx?.kill();
  }, [setup]);

  return ref;
}
