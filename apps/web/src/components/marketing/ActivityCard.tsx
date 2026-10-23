"use client";

import { cn } from "@ok/ui";
import { readMotionLevel } from "@ok/ui/motion";
import { useRef, type PointerEvent } from "react";

import { Picture } from "@/components/media/Picture";
import { cardPicture } from "@/content/media";

export function ActivityCard({
  href,
  title,
  summary,
  slug,
  facts,
}: {
  href: string;
  title: string;
  summary: string;
  slug: string;
  facts?: string[];
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
    node.style.setProperty(
      "--rx",
      `${String(Math.max(-6, Math.min(6, (0.5 - py) * 8)))}deg`,
    );
    node.style.setProperty(
      "--ry",
      `${String(Math.max(-6, Math.min(6, (px - 0.5) * 8)))}deg`,
    );
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
        "group duration-slow relative block overflow-hidden rounded-xl bg-surface shadow-1 transition-[box-shadow] ease-[var(--ease-out-soft)] hover:shadow-2",
        "[transform:perspective(1000px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
      )}
    >
      <div className="aspect-[5/3] overflow-hidden">
        <Picture
          image={image}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover transition-transform duration-slow ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
          sizes="(min-width: 48rem) 50vw, 100vw"
        />
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-sans text-h3 font-semibold">{title}</h3>
        <p className="mt-2 text-small text-muted-foreground">{summary}</p>
        {facts && facts.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {facts.map((item) => (
              <li
                key={item}
                className="rounded-pill border border-border px-2.5 py-1 text-caption text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </a>
  );
}
