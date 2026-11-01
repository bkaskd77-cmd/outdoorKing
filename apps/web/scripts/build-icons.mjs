// Draws the site icon and writes the favicon and app icons into public/.
// Run from apps/web: node scripts/build-icons.mjs
import { writeFileSync } from "node:fs";
import sharp from "sharp";

// A Himalayan peak in the style of a clear Khumbu morning: blue sky, a distant snowy
// range, a sharp main summit with snow down its gullies and brown-grey rock below,
// and dark hills in front. Drawn on a 64-unit grid.
const scene = `
  <rect width="64" height="64" fill="url(#sky)"/>
  <path fill="#e3ecf5" d="M0 38 6 33 10 35 15 30 19 33 24 29 30 36 40 34 45 29 49 32 54 28 59 32 64 30V48H0Z"/>
  <path fill="#c3d2e2" d="M15 30 17 34 14 37 19 36 19 33Z M54 28 55 33 52 36 58 34 59 32Z"/>
  <path fill="#7b6a5b" d="M33 9 29.5 16 26.5 19 23 26 17 35 8 52H58L49 35 45 27 41.5 21 37.5 17Z"/>
  <path fill="#55483e" d="M33 9 37.5 17 41.5 21 45 27 49 35 58 52H36.5L35 30Z"/>
  <path fill="#ffffff" d="M33 9 29.5 16 26.5 19 23 26 21.5 28.5 24 28 25.5 32 27.5 27.5 29.5 31 31 26.5 33 34 35 30 35.5 22Z"/>
  <path fill="#cad7e5" d="M33 9 37.5 17 41.5 21 45 27 46.5 29.5 44 29 42.5 33 40.5 28 38.5 31.5 36.5 27 35 30 35.5 22Z"/>
  <path fill="#4a3a30" d="M0 64V44C8 40 15 41 22 45 30 49 38 44 46 42 53 40 59 41 64 43V64Z"/>
  <path fill="#33281f" d="M0 64V52C10 48 20 50 30 54 40 57 52 51 64 53V64Z"/>`;

/** The icon as SVG. `round` gives the favicon its rounded corners; app icons stay
 * square because phones apply their own mask, and the summit sits inside the
 * maskable safe zone. */
function icon({ round = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a6cb6"/>
      <stop offset="1" stop-color="#a7d0ee"/>
    </linearGradient>${round ? '\n    <clipPath id="round"><rect width="64" height="64" rx="14"/></clipPath>' : ""}
  </defs>
  <g${round ? ' clip-path="url(#round)"' : ""}>${scene}
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

writeFileSync("public/icons/icon.svg", favicon);
writeFileSync("public/icons/icon-192.png", await png(full, 192));
writeFileSync("public/icons/icon-512.png", await png(full, 512));
writeFileSync("public/icons/icon-maskable-512.png", await png(full, 512));
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
