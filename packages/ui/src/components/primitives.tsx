import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "../lib/cn";
import { controlFocusClass, controlMotionClass, siteLinkClass } from "../lib/control";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)]",
        className,
      )}
      {...props}
    />
  );
}

export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("section", className)} {...props} />;
}

export function Heading({
  as: Tag = "h2",
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" }) {
  const styles = {
    h1: "font-display text-h1 tracking-[-0.015em]",
    h2: "font-display text-h2 tracking-[-0.01em]",
    h3: "font-sans text-h3 font-semibold",
  } as const;
  return <Tag className={cn(styles[Tag], className)} {...props} />;
}

export function Text({
  className,
  muted,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { muted?: boolean }) {
  return (
    <p
      className={cn(
        "max-w-[68ch] text-body",
        muted && "text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs bg-muted px-2 py-1 text-caption font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-card p-6 text-card-foreground shadow-1",
        className,
      )}
      {...props}
    />
  );
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-muted", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 text-small text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <a
                className={cn(siteLinkClass, "underline-offset-4 hover:underline")}
                href={item.href}
              >
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-sm border border-border-strong bg-surface px-3 text-body text-foreground",
        controlMotionClass,
        controlFocusClass,
        "hover:border-primary",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-sm border border-border-strong bg-surface px-3 py-2 text-body",
        controlMotionClass,
        controlFocusClass,
        "hover:border-primary",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-small font-medium", className)} {...props} />;
}

export function AppLink({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        siteLinkClass,
        "text-primary underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function SkipLink() {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-500 focus:rounded-sm focus:bg-surface focus:px-4 focus:py-2"
    >
      Skip to content
    </a>
  );
}

export function DesignGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-8">{children}</div>;
}
