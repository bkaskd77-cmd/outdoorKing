// Draws the site icon and writes the favicon and app icons into public/.
// Run from apps/web: node scripts/build-icons.mjs
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const sky = "#c4e5cd"; // light green
const farRock = "#8d939c"; // grey rock of the peaks behind
const rockLit = "#626a77"; // sunlit face of the main peak
const rockShade = "#4a515d"; // shaded face of the main peak
const snow = "#ffffff";
const snowShade = "#c8d3df"; // shaded side of the snow cap

// Three snow-capped rock peaks on a 64-unit grid: two behind, the tallest in front.
const peaks = `
  <path fill="${farRock}" d="M5 50 18 29 31 50Z M33 50 46 29 59 50Z"/>
  <path fill="${snow}" d="M18 29 21.7 35 20 34 18.5 36.2 17 34.2 14.3 35Z M46 29 49.7 35 48 34 46.5 36.2 45 34.2 42.3 35Z"/>
  <path fill="${rockLit}" d="M32 12 50 50H14Z"/>
  <path fill="${rockShade}" d="M32 12 50 50H34.5Z"/>
  <path fill="${snow}" d="M32 12 38.6 26 35.6 24 33 27.6 30.4 24.4 28 27 25.4 26Z"/>
  <path fill="${snowShade}" d="M32 12 38.6 26 35.6 24 33 27.6Z"/>`;

/** The icon as SVG; `round` gives the favicon its rounded corners, `scale` shrinks the
 * peaks for maskable icons, whose edges a phone may crop. */
function icon({ round = false, scale = 1 } = {}) {
  const t = `translate(32 32) scale(${scale}) translate(-32 -32)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64"${round ? ' rx="14"' : ""} fill="${sky}"/>
  <g transform="${t}">${peaks}
  </g>
</svg>
`;
}

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: Math.ceil((72 * size) / 64) })
    .resize(size, size)
    .png()
    .toBuffer();

/** A .ico file holding PNG images, which every current browser reads. */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const favicon = icon({ round: true });
const full = icon();
const maskable = icon({ scale: 0.72 });

writeFileSync("public/icons/icon.svg", favicon);
writeFileSync("public/icons/icon-192.png", await png(full, 192));
writeFileSync("public/icons/icon-512.png", await png(full, 512));
writeFileSync("public/icons/icon-maskable-512.png", await png(maskable, 512));
writeFileSync("public/icons/apple-touch-icon.png", await png(full, 180));
const sizes = [16, 32, 48];
writeFileSync(
  "public/favicon.ico",
  ico(
    await Promise.all(
      sizes.map(async (size) => ({ size, data: await png(favicon, size) })),
    ),
  ),
);
console.log("icons written");
