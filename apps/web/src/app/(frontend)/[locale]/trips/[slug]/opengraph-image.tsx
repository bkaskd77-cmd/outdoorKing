import { ImageResponse } from "next/og";

import { BrandOgFrame } from "@/components/seo/BrandOg";
import { getCatalog } from "@/content/store";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = (await getCatalog()).getTrip(slug);
  return new ImageResponse(
    <BrandOgFrame
      title={trip?.title ?? "OutdoorKing"}
      subtitle={trip?.subtitle ?? "Private Himalayan journeys"}
    />,
    size,
  );
}
