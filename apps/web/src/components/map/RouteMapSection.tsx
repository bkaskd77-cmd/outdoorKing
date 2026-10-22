"use client";

import type { CatalogTrip } from "@/content/types";

import { RouteMap3D } from "./RouteMap3D";

export function RouteMapSection({ trip }: { trip: CatalogTrip }) {
  return <RouteMap3D trip={trip} />;
}
