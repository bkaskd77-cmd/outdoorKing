import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Our type scale (globals.css --text-*). Without it tailwind-merge reads `text-h2` as a
 * colour, so `text-h2 text-snow-50` dropped the size and headings on dark sections
 * rendered at body size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-2xl",
        "display-xl",
        "display-lg",
        "h1",
        "h2",
        "h3",
        "lead",
        "body",
        "small",
        "caption",
        "eyebrow",
        "data",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
