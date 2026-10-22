import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Noto_Sans_Devanagari,
  Noto_Sans_SC,
} from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600"],
  variable: "--font-noto-devanagari",
  display: "swap",
  preload: false,
});

export const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-sans-sc",
  display: "swap",
  preload: false,
});
