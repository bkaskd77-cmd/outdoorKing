"use client";

import { Button, controlFocusClass, controlMotionClass, MagneticLabel } from "@ok/ui";
import {
  duration,
  ease,
  motion,
  readMotionLevel,
  spring,
  useMotionValue,
  useSpring,
  useTransform,
} from "@ok/ui/motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

import { media, type PictureSrc } from "@/content/media";

import { Picture } from "./Picture";

export function CinematicHero({
  eyebrow,
  title,
  lead,
  primaryHref,
  primaryLabel,
  primaryAction,
  secondaryHref,
  secondaryLabel,
  kicker,
  compact = false,
  image,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primaryHref: string;
  primaryLabel: string;
  /** Replaces the default large hero button. Trip pages pass the header CTA. */
  primaryAction?: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: string;
  kicker?: ReactNode;
  compact?: boolean;
  image?: PictureSrc;
}) {
  const ref = useRef<HTMLElement>(null);
  const [mistOn, setMistOn] = useState(true);
  const [level, setLevel] = useState<"full" | "reduced" | "off">("full");
  const progress = useMotionValue(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dx = useSpring(mx, spring.gentle);
  const dy = useSpring(my, spring.gentle);

  useEffect(() => {
    setLevel(readMotionLevel());
  }, []);

  useEffect(() => {
    if (level !== "full") return;
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const box = node.getBoundingClientRect();
      const total = box.height || 1;
      progress.set(Math.min(1, Math.max(0, -box.top / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [level, progress]);

  function onPointer(event: PointerEvent<HTMLElement>) {
    if (level !== "full" || event.pointerType !== "mouse") return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    mx.set((event.clientX - box.left) / box.width - 0.5);
    my.set((event.clientY - box.top) / box.height - 0.5);
  }

  const reduced = level !== "full";
  const heroImage = image ?? { ...media.hero.composite, alt: "" };
  const paused = reduced || !mistOn;
  const driftX = useTransform(dx, (value: number) => value * 16);
  const shiftY = useTransform([dy, progress], (values: number[]) => {
    const pointer = values[0] ?? 0;
    const amount = values[1] ?? 0;
    return pointer * 12 + amount * 48;
  });
  const zoom = useTransform(progress, (amount: number) => 1.08 + amount * 0.04);

  return (
    <section
      ref={ref}
      className={
        compact
          ? "relative isolate flex min-h-[70svh] items-end overflow-hidden bg-night-950 text-night-50"
          : "relative isolate flex min-h-[88svh] items-end overflow-hidden bg-night-950 text-night-50"
      }
      onPointerMove={onPointer}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute -inset-[12%]"
        style={paused ? undefined : { x: driftX, y: shiftY, scale: zoom }}
      >
        <Picture
          image={{ ...heroImage, alt: "" }}
          priority
          className="block h-full w-full"
          imgClassName="h-full w-full object-cover object-[center_58%]"
          sizes="100vw"
        />
      </motion.div>
      {paused ? null : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-20%] bottom-0 z-[1] h-[42%] overflow-hidden [mask-image:linear-gradient(to_top,black_35%,transparent)] opacity-60"
        >
          <div className="h-full w-[200%] animate-mist">
            <Picture
              image={{ ...media.hero.mist, alt: "" }}
              className="block h-full w-full"
              imgClassName="h-full w-full object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      )}
      {/* Darkens the lower left, where the text sits, so it reads on any photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[linear-gradient(to_top,rgb(10_15_26/0.88)_0%,rgb(10_15_26/0.5)_38%,transparent_70%),linear-gradient(to_right,rgb(10_15_26/0.55)_0%,transparent_65%)]"
      />

      <div className="relative z-20 mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] pb-24">
        <p className="eyebrow text-alpenglow-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-[18ch] font-display text-display-xl text-snow-50">
          {title}
        </h1>
        <motion.p
          className="mt-6 max-w-[40ch] text-lead text-snow-100"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? duration.fast : duration.slow,
            ease: ease.reveal,
            delay: reduced ? 0 : 0.35,
          }}
        >
          {lead}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.5, duration: duration.slow }}
        >
          {primaryAction ?? (
            <Button variant="magnetic" size="lg" asChild>
              <a href={primaryHref}>
                <MagneticLabel>{primaryLabel}</MagneticLabel>
              </a>
            </Button>
          )}
          {secondaryHref && secondaryLabel ? (
            <Button
              variant="secondary"
              className="border-snow-100/50 bg-night-950/40 text-snow-50 backdrop-blur-sm hover:bg-night-950/60"
              asChild
            >
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          ) : null}
        </motion.div>
        {kicker}
      </div>

      {reduced ? null : (
        <div className="absolute top-6 right-[var(--gutter)] z-20">
          <button
            type="button"
            className={`${controlMotionClass} ${controlFocusClass} min-h-11 rounded-pill border border-snow-100/30 bg-night-950/50 px-4 text-caption text-snow-50 backdrop-blur-sm hover:border-snow-50 hover:bg-night-950/70 active:scale-[0.98]`}
            onClick={() => setMistOn((on) => !on)}
            aria-pressed={mistOn}
          >
            {mistOn ? "Pause ambient motion" : "Play ambient motion"}
          </button>
        </div>
      )}
    </section>
  );
}
