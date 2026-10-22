export const ease = {
  settle: [0.22, 1, 0.36, 1],
  reveal: [0.16, 1, 0.3, 1],
  traverse: [0.65, 0, 0.35, 1],
  exit: [0.4, 0, 1, 1],
  lift: [0.34, 1.56, 0.64, 1],
} as const;

export const duration = {
  instant: 0.08,
  fast: 0.16,
  base: 0.24,
  moderate: 0.36,
  slow: 0.6,
  slower: 0.9,
  epic: 1.4,
} as const;

export const spring = {
  snappy: { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.6 },
  gentle: { type: "spring" as const, stiffness: 180, damping: 26, mass: 1 },
  magnetic: { type: "spring" as const, stiffness: 260, damping: 18, mass: 0.4 },
};

export const gsapEase = {
  settle: "power3.out",
  reveal: "expo.out",
  traverse: "power2.inOut",
  exit: "power2.in",
} as const;
