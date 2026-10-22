"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { duration, ease } from "./tokens";
import { readMotionLevel } from "./prefers";

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = readMotionLevel() !== "full";
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8%" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: 0.04 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = readMotionLevel() !== "full";
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: duration.moderate, ease: ease.reveal },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
