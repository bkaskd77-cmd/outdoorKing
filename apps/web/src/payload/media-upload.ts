import { APIError, type CollectionBeforeChangeHook, type UploadConfig } from "payload";

/** Shortest side below which a photo looks soft even on a card. */
export const MIN_PHOTO_SIDE_PX = 800;

/** Recommended camera export, shown under the upload box. */
export const PHOTO_GUIDANCE =
  "Photo size: best is a wide (landscape) photo of at least 2400 × 1600 px, straight from your camera or phone. " +
  `Photos under ${String(MIN_PHOTO_SIDE_PX)} px on their shortest side are refused. ` +
  "No need to edit or shrink it first: the site makes compressed card, gallery and full-screen copies, " +
  "turned the right way up and without location data, and keeps your original untouched. " +
  "After saving, use Edit Image to put the focal point on the main subject, so cropped versions keep it in frame.";

const webp = (quality: number) => ({ format: "webp" as const, options: { quality } });

// Each size bounds the longest edge and keeps the photo's shape, so one srcset can
// serve them all; cards crop with CSS around the focal point instead of baking it in.
export const PHOTO_SIZES = [
  { name: "thumbnail", edge: 480 },
  { name: "small", edge: 960 },
  { name: "medium", edge: 1600 },
  { name: "large", edge: 2400 },
] as const;

// The upload itself is kept untouched as the master copy (large uploads go straight
// from the browser to storage, and Payload cannot replace that file). The site only
// serves these copies: turned upright from the EXIF orientation, stripped of EXIF and
// GPS data, and compressed as WebP.
export const mediaUpload: UploadConfig = {
  mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  imageSizes: PHOTO_SIZES.map(({ name, edge }) => ({
    name,
    width: edge,
    height: edge,
    fit: "inside" as const,
    withoutEnlargement: true,
    formatOptions: webp(80),
  })),
  adminThumbnail: "thumbnail",
  focalPoint: true,
  crop: true,
};

/** Refuses photos too small to look sharp anywhere on the site. */
export const requireUsablePhoto: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!req.file) return data;
  const width = Number(data.width);
  const height = Number(data.height);
  if (!width || !height) return data;
  const shortest = Math.min(width, height);
  if (shortest < MIN_PHOTO_SIDE_PX) {
    throw new APIError(
      `This photo is ${String(width)} × ${String(height)} px, too small to look sharp. ` +
        `Upload one at least ${String(MIN_PHOTO_SIDE_PX)} px on its shortest side (2400 × 1600 px or more is best).`,
      400,
      undefined,
      true,
    );
  }
  return data;
};
