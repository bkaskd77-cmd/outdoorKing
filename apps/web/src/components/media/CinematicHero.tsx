"use client";

import { Button, MagneticLabel } from "@ok/ui";
import {
  duration,
  ease,
  motion,
  readMotionLevel,
  spring,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "@ok/ui/motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

import { media } from "@/content/media";

import { Picture } from "./Picture";

type Layer = {
  image: (typeof media.hero)[keyof typeof media.hero];
  className: string;
  y: [number, number];
  scale?: [number, number];
  drift: number;
};

const layers: Layer[] = [
  {
    image: media.hero.sky,
    className: "inset-0",
    y: [0, 40],
    scale: [1, 1.05],
    drift: 6,
  },
  {
    image: media.hero.far,
    className: "inset-0",
    y: [0, 72],
    scale: [1, 1.08],
    drift: 10,
  },
  {
    image: media.hero.mid,
    className: "inset-x-0 bottom-[-8%] h-[78%]",
    y: [0, 120],
    scale: [1, 1.1],
    drift: 14,
  },
  {
    image: media.hero.mist,
    className: "inset-x-[-20%] bottom-0 h-[45%] opacity-70",
    y: [0, 160],
    drift: 20,
  },
  {
    image: media.hero.foreground,
    className:
      "inset-x-0 bottom-[-12%] h-[62%] [mask-image:linear-gradient(to_top,black_55%,transparent)]",
    y: [0, 200],
    scale: [1.05, 1],
    drift: 20,
  },
];

export function CinematicHero({
  eyebrow,
  title,
  lead,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  kicker,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  kicker?: ReactNode;
  compact?: boolean;
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

  const words = title.split(" ");
  const reduced = level !== "full";
  const paused = reduced || !mistOn;

  return (
    <section
      ref={ref}
      className={
        compact
          ? "relative isolate flex min-h-[70svh] items-end overflow-hidden bg-night-950 text-night-50"
          : "relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night-950 text-night-50 lg:min-h-[110svh]"
      }
      onPointerMove={onPointer}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <Picture
        image={{ ...media.hero.composite, alt: "" }}
        priority
        className="absolute inset-0"
        imgClassName="object-cover"
        sizes="100vw"
      />
      {layers.map((layer) => (
        <HeroLayer
          key={layer.image.src}
          layer={layer}
          progress={progress}
          dx={dx}
          dy={dy}
          mistOn={mistOn && !reduced}
          paused={paused}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-[var(--scrim)]" />

      <div className="relative z-20 mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)] pb-24">
        <p className="eyebrow text-alpenglow-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-[18ch] font-display text-display-xl text-snow-50">
          <span className="sr-only">{title}</span>
          <span aria-hidden="true" className="flex flex-wrap gap-x-[0.28em]">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${String(index)}`}
                className="overflow-hidden"
                initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0)" }}
                transition={{
                  duration: reduced ? duration.fast : duration.slower,
                  ease: ease.reveal,
                  delay: reduced ? 0 : Math.min(index * 0.06, 0.4),
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
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
          <Button variant="magnetic" size="lg" asChild>
            <a href={primaryHref}>
              <MagneticLabel>{primaryLabel}</MagneticLabel>
            </a>
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button
              variant="secondary"
              className="border-snow-100/40 text-snow-50"
              asChild
            >
              <a href={secondaryHref}>{secondaryLabel}</a>
            </Button>
          ) : null}
        </motion.div>
        {kicker}
      </div>

      {reduced ? null : (
        <div className="absolute right-[var(--gutter)] bottom-6 z-20">
          <button
            type="button"
            className="min-h-11 rounded-pill border border-snow-100/30 bg-night-950/50 px-4 text-caption text-snow-50 backdrop-blur-sm"
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

function HeroLayer({
  layer,
  progress,
  dx,
  dy,
  mistOn,
  paused,
}: {
  layer: Layer;
  progress: MotionValue<number>;
  dx: MotionValue<number>;
  dy: MotionValue<number>;
  mistOn: boolean;
  paused: boolean;
}) {
  const driftX = useTransform(dx, (value: number) => value * layer.drift);
  const driftY = useTransform([dy, progress], (values: number[]) => {
    const pointer = values[0] ?? 0;
    const amount = values[1] ?? 0;
    return pointer * layer.drift + layer.y[0] + (layer.y[1] - layer.y[0]) * amount;
  });
  const scale = useTransform(progress, (amount: number) =>
    layer.scale ? layer.scale[0] + (layer.scale[1] - layer.scale[0]) * amount : 1,
  );
  const isMist = layer.image.src.includes("mist");

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute z-[1] overflow-hidden ${layer.className}`}
      style={paused ? undefined : { x: driftX, y: driftY, scale }}
    >
      <div
        className={isMist && mistOn ? "h-full w-[200%] animate-mist" : "h-full w-full"}
      >
        <Picture
          image={{ ...layer.image, alt: "" }}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
          sizes="100vw"
        />
      </div>
    </motion.div>
  );
}
