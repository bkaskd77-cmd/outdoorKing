"use client";

import dynamic from "next/dynamic";

import type { CatalogTrip } from "@/content/types";

const RouteMap3D = dynamic(
  () => import("@/components/map/RouteMap3D").then((mod) => mod.RouteMap3D),
  { ssr: false },
);

export function RouteMapSection({ trip }: { trip: CatalogTrip }) {
  return <RouteMap3D trip={trip} />;
}
