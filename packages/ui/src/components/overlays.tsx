"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Toaster as Sonner, toast } from "sonner";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "../lib/cn";

export function Accordion(
  props: ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
) {
  return <AccordionPrimitive.Root {...props} />;
}

export function AccordionItem(
  props: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
) {
  return <AccordionPrimitive.Item className="border-b border-border" {...props} />;
}

export function AccordionTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        className={cn(
          "flex min-h-11 w-full items-center justify-between py-3 text-left font-medium",
          className,
        )}
        {...props}
      />
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent(
  props: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
) {
  return <AccordionPrimitive.Content className="pb-4 text-muted-foreground" {...props} />;
}

export function Tabs(props: ComponentPropsWithoutRef<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root {...props} />;
}
export function TabsList({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("flex gap-2", className)} {...props} />;
}
export function TabsTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "min-h-11 rounded-sm px-4 data-[state=active]:bg-muted data-[state=active]:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
export function TabsContent(
  props: ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
) {
  return <TabsPrimitive.Content className="pt-4" {...props} />;
}

export function Dialog({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

export function DialogTrigger(
  props: ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>,
) {
  return <DialogPrimitive.Trigger {...props} />;
}

export function DialogContent({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-300 bg-night-950/50" />
      <DialogPrimitive.Content
        className={cn(
          "fixed top-1/2 left-1/2 z-400 w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface p-6 shadow-4",
          className,
        )}
      >
        <DialogPrimitive.Title className="font-display text-h3">
          {title}
        </DialogPrimitive.Title>
        <div className="mt-4">{children}</div>
        <DialogPrimitive.Close className="absolute top-4 right-4 min-h-11 min-w-11">
          Close
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function Sheet({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

export function SheetContent({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-300 bg-night-950/50" />
      <DialogPrimitive.Content className="fixed inset-y-0 right-0 z-400 w-[min(24rem,100%)] bg-surface p-6 shadow-4">
        <DialogPrimitive.Title className="font-display text-h3">
          {title}
        </DialogPrimitive.Title>
        <div className="mt-4">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function Checkbox({
  label,
  ...props
}: ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label: string }) {
  return (
    <label className="flex min-h-11 items-center gap-3">
      <CheckboxPrimitive.Root
        className="flex size-5 items-center justify-center rounded-xs border border-border-strong"
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <CheckIcon className="size-3.5" aria-hidden="true" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  );
}

export function Select({
  label,
  options,
  ...props
}: ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-2">
      <span className="text-small font-medium">{label}</span>
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          aria-label={label}
          className="flex h-11 w-full items-center justify-between rounded-sm border border-border-strong px-3"
        >
          <SelectPrimitive.Value placeholder={label} />
          <ChevronDownIcon className="size-4" aria-hidden="true" />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="z-400 rounded-md border border-border bg-surface p-1 shadow-3">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="flex min-h-11 items-center rounded-xs px-3 data-[highlighted]:bg-muted"
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}

export function Toaster() {
  return <Sonner />;
}

export { toast };
