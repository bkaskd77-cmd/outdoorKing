"use client";

import { controlFocusClass, controlMotionClass } from "@ok/ui";
import { readMotionLevel } from "@ok/ui/motion";
import { useEffect, useRef, useState } from "react";

import { media } from "@/content/media";

import { Picture } from "./Picture";

export function AmbientVideo({ caption = media.video.caption }: { caption?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [level, setLevel] = useState<"full" | "reduced" | "off">("full");

  useEffect(() => {
    setLevel(readMotionLevel());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || level !== "full") {
          video.pause();
          setPlaying(false);
          return;
        }
        void video.play().then(
          () => setPlaying(true),
          () => setPlaying(false),
        );
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    const onHide = () => {
      if (document.hidden) {
        video.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [level]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <figure className="relative overflow-hidden rounded-2xl bg-night-950">
      <Picture
        image={{
          src: media.video.poster,
          alt: media.video.title,
          width: 1280,
          height: 720,
        }}
        className="absolute inset-0"
        imgClassName="h-full w-full object-cover"
        sizes="(min-width: 80rem) 80rem, 100vw"
      />
      <video
        ref={videoRef}
        className="relative z-10 aspect-video h-auto w-full object-cover"
        poster={`${media.video.poster}.webp`}
        muted
        playsInline
        loop
        preload="metadata"
        controls={false}
        aria-label={media.video.title}
      >
        <source src={media.video.src} type="video/mp4" />
      </video>
      <button
        type="button"
        className={`${controlMotionClass} ${controlFocusClass} absolute bottom-4 left-4 z-20 min-h-11 rounded-pill bg-night-950/70 px-4 text-small font-semibold text-snow-50 hover:bg-night-950 hover:shadow-2 active:scale-[0.98]`}
        onClick={toggle}
        aria-pressed={playing}
      >
        {playing ? "Pause video" : "Play video"}
      </button>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
