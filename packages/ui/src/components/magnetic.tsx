"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";

import { readMotionLevel } from "../motion/prefers";
import { spring } from "../motion/tokens";

/** Moves the label, not the focusable control. Desktop + full motion only. */
export function MagneticLabel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.magnetic);
  const sy = useSpring(y, spring.magnetic);

  function reset() {
    x.set(0);
    y.set(0);
  }

  function onMove(event: PointerEvent<HTMLSpanElement>) {
    if (readMotionLevel() !== "full" || event.pointerType !== "mouse") {
      reset();
      return;
    }
    const parent = ref.current?.closest("a,button");
    if (!parent) return;
    const box = parent.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    x.set(Math.max(-18, Math.min(18, dx * 0.35)));
    y.set(Math.max(-18, Math.min(18, dy * 0.35)));
  }

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerDown={reset}
    >
      {children}
    </motion.span>
  );
}
