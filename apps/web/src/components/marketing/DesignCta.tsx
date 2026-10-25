"use client";

import { Button, MagneticLabel } from "@ok/ui";
import type { ReactNode } from "react";

/**
 * Header "Design my trip" control.
 * Trip pages reuse it for "Design this trip" so radius, padding, type,
 * color, and hover stay on one component.
 */
export const designCtaClassName =
  "shrink-0 px-2 text-[0.75rem] leading-[1.4] whitespace-nowrap text-primary-foreground min-[380px]:px-2.5 min-[380px]:text-[0.8125rem] sm:px-5 sm:text-small";

export function DesignCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button variant="magnetic" className={designCtaClassName} asChild>
      <a href={href}>
        <MagneticLabel>{children}</MagneticLabel>
      </a>
    </Button>
  );
}
