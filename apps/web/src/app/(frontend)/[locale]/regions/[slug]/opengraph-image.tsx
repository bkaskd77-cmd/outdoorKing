import { ImageResponse } from "next/og";

import { BrandOgFrame } from "@/components/seo/BrandOg";
import { getCatalog } from "@/content/store";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { regions } = await getCatalog();
  const region = regions.find((item) => item.slug === slug);
  return new ImageResponse(
    <BrandOgFrame
      eyebrow="Region"
      title={region?.name ?? "OutdoorKing"}
      subtitle={region?.summary}
    />,
    size,
  );
}
