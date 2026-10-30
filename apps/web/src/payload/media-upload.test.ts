import type { PayloadRequest } from "payload";
import { describe, expect, it } from "vitest";

import { mediaUpload, MIN_PHOTO_SIDE_PX, requireUsablePhoto } from "./media-upload";

function check(data: Record<string, unknown>, withFile = true) {
  const req = (withFile ? { file: { name: "photo.jpg" } } : {}) as PayloadRequest;
  return requireUsablePhoto({ data, req } as Parameters<typeof requireUsablePhoto>[0]);
}

describe("requireUsablePhoto", () => {
  it("accepts a photo at the minimum size", () => {
    const data = { width: 1200, height: MIN_PHOTO_SIDE_PX };
    expect(check(data)).toBe(data);
  });

  it("refuses a photo whose shortest side is too small, saying why", () => {
    expect(() => check({ width: 640, height: 480 })).toThrow(/640 × 480 px, too small/);
  });

  it("leaves edits without a new file alone", () => {
    const data = { width: 640, height: 480, alt: "Old upload" };
    expect(check(data, false)).toBe(data);
  });
});

describe("mediaUpload", () => {
  it("makes WebP sizes that never enlarge the photo", () => {
    const sizes = mediaUpload.imageSizes ?? [];
    expect(sizes.every((size) => size.formatOptions?.format === "webp")).toBe(true);
    expect(sizes.map((size) => size.name)).toEqual([
      "thumbnail",
      "small",
      "medium",
      "large",
    ]);
    expect(sizes.every((size) => size.withoutEnlargement && size.fit === "inside")).toBe(
      true,
    );
  });
});
