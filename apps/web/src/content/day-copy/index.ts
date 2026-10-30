import { annapurna } from "./annapurna";
import { east } from "./east";
import { everest } from "./everest";
import { expeditions } from "./expeditions";
import { langtang } from "./langtang";
import { manaslu } from "./manaslu";
import { tours } from "./tours";
import { west } from "./west";

/**
 * Day-by-day descriptions as seeded, by trip slug and then by day (its label, such as
 * "9-12", or its number). Editors change them in the admin.
 */
export const dayCopy: Record<string, Record<string, string>> = {
  ...annapurna,
  ...east,
  ...everest,
  ...expeditions,
  ...langtang,
  ...manaslu,
  ...tours,
  ...west,
};
