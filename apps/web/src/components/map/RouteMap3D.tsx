"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { Button } from "@ok/ui";
import { useEffect, useId, useRef, useState } from "react";

import type { CatalogTrip } from "@/content/types";

export function RouteMap3D({ trip }: { trip: CatalogTrip }) {
  const [clicked, setClicked] = useState(false);
  const active = clicked;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mapId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    let cancelled = false;
    let map: { remove: () => void } | undefined;

    void (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !containerRef.current) return;
      const key = process.env.NEXT_PUBLIC_MAPTILER_KEY;
      const style = key
        ? `https://api.maptiler.com/maps/outdoor-v2/style.json?key=${key}`
        : {
            version: 8 as const,
            sources: {},
            layers: [
              {
                id: "bg",
                type: "background" as const,
                paint: { "background-color": "#1b2420" },
              },
            ],
          };
      const start = trip.route[0];
      const instance = new maplibregl.Map({
        container: containerRef.current,
        style,
        center: [start?.lng ?? 86.7, start?.lat ?? 27.7],
        zoom: 8,
        pitch: reduced ? 0 : 55,
        interactive: true,
      });
      map = instance;
      instance.addControl(
        new maplibregl.NavigationControl({ visualizePitch: true }),
        "top-right",
      );
      instance.on("load", () => {
        const line = {
          type: "Feature" as const,
          geometry: {
            type: "LineString" as const,
            coordinates: trip.route.map((p) => [p.lng, p.lat]),
          },
          properties: {},
        };
        instance.addSource("route", { type: "geojson", data: line });
        instance.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: { "line-color": "#d6c4a8", "line-width": 3 },
        });
        if (key) {
          instance.addSource("terrain", {
            type: "raster-dem",
            url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=${key}`,
            tileSize: 256,
          });
          instance.setTerrain({ source: "terrain", exaggeration: 1.3 });
          instance.addLayer({
            id: "hillshade",
            type: "hillshade",
            source: "terrain",
          });
        }
        for (const point of trip.route) {
          new maplibregl.Marker({ color: "#8c2f39" })
            .setLngLat([point.lng, point.lat])
            .setPopup(
              new maplibregl.Popup().setText(
                `Day ${String(point.dayNumber)} · ${point.name} · ${String(point.altitudeM)} m`,
              ),
            )
            .addTo(instance);
        }
        const mid = trip.route[Math.floor(trip.route.length / 2)] ?? start;
        if (mid && !reduced) {
          instance.flyTo({
            center: [mid.lng, mid.lat],
            zoom: 9,
            pitch: 60,
            duration: 2500,
          });
        }
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [active, reduced, trip.route]);

  return (
    <section ref={wrapRef} aria-labelledby={mapId} className="grid gap-4">
      <h2 id={mapId} className="font-display text-h2">
        Route
      </h2>
      <p className="text-small text-muted-foreground">
        Text alternative: the day-by-day itinerary below lists every sleep and high point.
        The 3D map is optional and loads only after you click Explore in 3D.
      </p>
      {active ? (
        <div
          ref={containerRef}
          data-testid="route-map"
          className="h-[min(28rem,70vh)] overflow-hidden rounded-lg"
          tabIndex={0}
          aria-label={`${trip.title} route map`}
        />
      ) : (
        <div className="relative overflow-hidden rounded-lg bg-night-900 text-snow-50">
          <svg
            viewBox="0 0 800 320"
            className="h-[min(28rem,70vh)] w-full"
            aria-hidden="true"
          >
            <rect width="800" height="320" fill="#141c1a" />
            <polyline
              fill="none"
              stroke="#d6c4a8"
              strokeWidth="3"
              points={trip.route
                .map((p, i) => `${String(40 + i * 50)},${String(260 - p.altitudeM / 30)}`)
                .join(" ")}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button type="button" variant="magnetic" onClick={() => setClicked(true)}>
              Explore in 3D
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
