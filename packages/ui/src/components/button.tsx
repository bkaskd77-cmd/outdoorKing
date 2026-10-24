"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "../lib/cn";
import { controlFocusClass, controlMotionClass } from "../lib/control";

const buttonVariants = cva(
  cn(
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-5 text-small font-semibold",
    controlMotionClass,
    controlFocusClass,
    "disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:active:scale-100",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-1 hover:-translate-y-px hover:bg-primary-hover hover:shadow-2 active:translate-y-0 active:scale-[0.98] active:shadow-1",
        secondary:
          "border border-border-strong bg-transparent text-foreground hover:-translate-y-px hover:border-primary hover:bg-muted hover:shadow-1 active:translate-y-0 active:scale-[0.98]",
        ghost:
          "text-foreground hover:-translate-y-px hover:bg-muted hover:shadow-1 active:translate-y-0 active:scale-[0.98]",
        link: "min-h-0 min-w-0 px-0 text-primary underline-offset-4 hover:underline active:text-primary-hover",
        magnetic:
          "rounded-pill bg-primary text-primary-foreground shadow-glow hover:-translate-y-px hover:bg-primary-hover hover:shadow-2 active:translate-y-0 active:scale-[0.98]",
      },
      size: {
        md: "h-11",
        lg: "h-13 min-h-[52px] px-6 text-body",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
