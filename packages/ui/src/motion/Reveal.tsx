"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { duration, ease } from "./tokens";
import { readMotionLevel } from "./prefers";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = readMotionLevel() !== "full";
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: duration.slow, ease: ease.reveal, delay }}
    >
      {children}
    </motion.div>
  );
}
