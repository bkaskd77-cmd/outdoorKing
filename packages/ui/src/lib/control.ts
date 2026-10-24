import { cn } from "./cn";

/** Short color/border/lift motion. No bounce. */
export const controlMotionClass =
  "transition-[color,background-color,border-color,box-shadow,translate,scale,transform] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]";

export const controlFocusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const controlPressClass = "active:translate-y-0 active:scale-[0.98]";

export const controlLiftClass = cn(
  "hover:-translate-y-px hover:shadow-1",
  controlPressClass,
);

export const siteLinkClass = cn(
  controlMotionClass,
  controlFocusClass,
  "hover:text-primary active:text-primary-hover",
);

export function chipClass(active: boolean): string {
  return cn(
    "min-h-11 rounded-md border px-4",
    controlMotionClass,
    controlFocusClass,
    controlPressClass,
    active
      ? "border-primary bg-primary text-primary-foreground shadow-1 hover:bg-primary-hover"
      : "border-border bg-background hover:-translate-y-px hover:border-primary hover:bg-muted hover:shadow-1",
  );
}

export function listControlClass(active: boolean): string {
  return cn(
    "flex min-h-11 w-full rounded-sm px-3 text-left text-small",
    controlMotionClass,
    controlFocusClass,
    "hover:bg-muted active:bg-accent",
    active ? "bg-muted font-semibold" : "text-foreground",
  );
}
