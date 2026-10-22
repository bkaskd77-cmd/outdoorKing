const HIDDEN = new Set(["internalNotes", "designerDefaults", "depositPolicy"]);

export function publicTripFields<T extends Record<string, unknown>>(
  doc: T,
): Omit<T, "internalNotes"> {
  const copy = { ...doc };
  for (const key of HIDDEN) {
    delete copy[key];
  }
  return copy;
}
