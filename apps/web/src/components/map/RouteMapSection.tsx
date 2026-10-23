"use client";

import type { CatalogTrip } from "@/content/types";

import { RouteMap3D } from "./RouteMap3D";

export function RouteMapSection({
  title,
  route,
}: {
  title: string;
  route: CatalogTrip["route"];
}) {
  return <RouteMap3D title={title} route={route} />;
}
