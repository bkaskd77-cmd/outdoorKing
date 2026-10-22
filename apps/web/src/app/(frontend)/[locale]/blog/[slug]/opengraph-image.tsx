import { ImageResponse } from "next/og";

import { BrandOgFrame } from "@/components/seo/BrandOg";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return new ImageResponse(
    <BrandOgFrame eyebrow="Journal" title={slug.replaceAll("-", " ")} />,
    size,
  );
}
