"use client";

import { cn } from "@ok/ui";
import { readMotionLevel } from "@ok/ui/motion";
import { useRef, type PointerEvent } from "react";

import { Picture } from "@/components/media/Picture";
import { cardPicture } from "@/content/media";

export function TripCard({
  href,
  title,
  summary,
  eyebrow,
  slug,
}: {
  href: string;
  title: string;
  summary: string;
  eyebrow?: string;
  slug: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const image = cardPicture(slug, title);

  function onMove(event: PointerEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node || readMotionLevel() !== "full" || event.pointerType !== "mouse") return;
    const box = node.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    node.style.setProperty("--mx", `${String(event.clientX - box.left)}px`);
    node.style.setProperty("--my", `${String(event.clientY - box.top)}px`);
    const rx = (0.5 - py) * 8;
    const ry = (px - 0.5) * 8;
    node.style.setProperty("--rx", `${String(Math.max(-6, Math.min(6, rx)))}deg`);
    node.style.setProperty("--ry", `${String(Math.max(-6, Math.min(6, ry)))}deg`);
  }

  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "group duration-slow relative block overflow-hidden rounded-xl bg-surface shadow-1 transition-[box-shadow,transform] ease-[var(--ease-out-soft)]",
        "hover:shadow-2 focus-visible:shadow-2",
        "[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
      )}
    >
      <span
        aria-hidden="true"
        className="duration-slow pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgb(240 138 93 / .18), transparent 40%)",
        }}
      />
      <div className="aspect-4/5 overflow-hidden">
        <Picture
          image={image}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-slow ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          sizes="(min-width: 64rem) 22rem, 100vw"
        />
      </div>
      <div className="relative z-20 p-6">
        {eyebrow ? <p className="eyebrow text-muted-foreground">{eyebrow}</p> : null}
        <h3 className="mt-2 font-sans text-h3 font-semibold">{title}</h3>
        <p className="mt-2 line-clamp-2 text-small text-muted-foreground">{summary}</p>
        <p className="mt-4 text-small font-semibold text-primary">
          Design this trip
          <span className="duration-fast inline-block transition-transform group-hover:translate-x-1">
            {" "}
            →
          </span>
        </p>
      </div>
    </a>
  );
}
