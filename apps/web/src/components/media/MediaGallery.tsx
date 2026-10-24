"use client";

import { Button, Dialog, DialogContent } from "@ok/ui";
import { useRef, useState } from "react";

import type { PictureSrc } from "@/content/media";

import { Picture } from "./Picture";

export function MediaGallery({
  items,
  label,
}: {
  items: readonly PictureSrc[];
  label: string;
}) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const current = active == null ? null : items[active];

  function scrollBy(offset: number) {
    scrollerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-small text-muted-foreground">
          Landscape photography from public stock libraries — not guest, staff, or review
          photos.
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            aria-label="Previous photographs"
            onClick={() => scrollBy(-320)}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="secondary"
            aria-label="Next photographs"
            onClick={() => scrollBy(320)}
          >
            Next
          </Button>
        </div>
      </div>
      <ul
        ref={scrollerRef}
        className="flex snap-x gap-4 overflow-x-auto pb-2"
        aria-label={label}
      >
        {items.map((item, index) => (
          <li
            key={`${item.src}-${String(index)}`}
            className="w-[min(80vw,28rem)] shrink-0 snap-start"
          >
            <button
              type="button"
              className="block w-full overflow-hidden rounded-xl transition-[box-shadow,transform,scale] duration-[var(--duration-fast)] ease-[var(--ease-out-soft)] hover:shadow-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.99]"
              onClick={() => setActive(index)}
            >
              <Picture
                image={item}
                className="aspect-4/5 md:aspect-video"
                imgClassName="h-full w-full object-cover"
                sizes="(min-width: 48rem) 28rem, 80vw"
              />
            </button>
          </li>
        ))}
      </ul>
      <Dialog
        open={current != null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        {current ? (
          <DialogContent
            title="Landscape photograph"
            className="w-[min(56rem,calc(100%-2rem))] max-w-none"
          >
            <Picture
              image={current}
              className="aspect-video overflow-hidden rounded-lg"
              imgClassName="h-full w-full object-cover"
              sizes="56rem"
            />
            <p className="mt-3 text-small text-muted-foreground">{current.alt}</p>
            <div className="mt-4 flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  setActive((i) =>
                    i == null ? 0 : (i - 1 + items.length) % items.length,
                  )
                }
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setActive((i) => (i == null ? 0 : (i + 1) % items.length))}
              >
                Next
              </Button>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
