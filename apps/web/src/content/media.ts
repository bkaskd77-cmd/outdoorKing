export type PictureSrc = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const STOCK = "Stock landscape photography — not OutdoorKing staff, guests, or reviews.";

export const media = {
  hero: {
    sky: {
      src: "/media/hero/sky",
      alt: "",
      width: 1600,
      height: 900,
    },
    far: {
      src: "/media/hero/far-range",
      alt: "",
      width: 1600,
      height: 900,
    },
    mid: {
      src: "/media/hero/mid-ridge",
      alt: "",
      width: 1600,
      height: 900,
    },
    mist: { src: "/media/hero/mist", alt: "", width: 1800, height: 700 },
    foreground: {
      src: "/media/hero/foreground",
      alt: "",
      width: 1600,
      height: 900,
    },
    composite: {
      src: "/media/hero/composite",
      alt: `Dawn light on snow ridges. ${STOCK}`,
      width: 1600,
      height: 1000,
    },
  },
  video: {
    src: "/media/video/khumbu-dawn.mp4",
    poster: "/media/video/khumbu-dawn-poster",
    title: "Muted landscape clip of moving cloud over high peaks",
    caption: `Atmospheric mountain footage from a public stock library. ${STOCK}`,
  },
  gallery: {
    home: [
      {
        src: "/media/gallery/ebc-1",
        alt: `High Himalayan skyline at first light. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-2",
        alt: `Snow peaks under a clear sky. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/trek-1",
        alt: `Alpine ridge above a valley. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/trek-3",
        alt: `A high valley with snow on the skyline. ${STOCK}`,
        width: 1400,
        height: 900,
      },
    ],
    ebc: [
      {
        src: "/media/gallery/ebc-1",
        alt: `Snow range under a blue sky, the kind of light on the Khumbu approach. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-2",
        alt: `Close ridges in winter light. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-3",
        alt: `A trail on snow toward a high pass. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-4",
        alt: `A snow summit catching sun. ${STOCK}`,
        width: 1400,
        height: 900,
      },
    ],
    trekking: [
      {
        src: "/media/gallery/trek-1",
        alt: `A trekking ridge in snow. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/trek-2",
        alt: `Glacier light on a peak. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-3",
        alt: `Walkers’ path across snow. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/trek-3",
        alt: `A wide Himalayan valley. ${STOCK}`,
        width: 1400,
        height: 900,
      },
    ],
    wildlife: [
      {
        src: "/media/gallery/wildlife-1",
        alt: `Dugout canoe on a lowland river at dusk in Chitwan National Park. ${STOCK}`,
        width: 1400,
        height: 900,
      },
    ],
    peaks: [
      {
        src: "/media/gallery/peak-1",
        alt: `A Himalayan snow peak at dusk. ${STOCK} Not labelled as a named OutdoorKing summit.`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-4",
        alt: `High snow ridges above cloud. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-2",
        alt: `Close ridges in winter light. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-1",
        alt: `Snow range under a blue sky. ${STOCK}`,
        width: 1400,
        height: 900,
      },
    ],
    heli: [
      {
        src: "/media/gallery/heli-1",
        alt: `High ridges above a sea of cloud — a mountain approach. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-1",
        alt: `Snow range from the approach. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/ebc-4",
        alt: `High snow landscape. ${STOCK}`,
        width: 1400,
        height: 900,
      },
      {
        src: "/media/gallery/peak-1",
        alt: `A Himalayan snow peak at dusk. ${STOCK} Not labelled as a named OutdoorKing summit.`,
        width: 1400,
        height: 900,
      },
    ],
  },
} as const;

const CARD_SRC: Record<string, string> = {
  trekking: "/media/cards/trekking",
  tours: "/media/cards/tours",
  "peak-climbing": "/media/cards/peak-climbing",
  expeditions: "/media/cards/expeditions",
  "heli-treks": "/media/cards/expeditions",
  cultural: "/media/cards/tours",
  wildlife: "/media/cards/wildlife",
  family: "/media/cards/trekking",
  photography: "/media/cards/everest-base-camp-trek",
  pilgrimage: "/media/cards/tours",
  "everest-base-camp-trek": "/media/cards/everest-base-camp-trek",
  "annapurna-circuit-trek": "/media/cards/annapurna-circuit-trek",
  "island-peak-climbing": "/media/cards/island-peak-climbing",
};

export function cardPicture(slug: string, title: string): PictureSrc {
  return {
    src: CARD_SRC[slug] ?? "/media/gallery/trek-1",
    alt: `${title} — landscape atmosphere. ${STOCK}`,
    width: 900,
    height: 1125,
  };
}

const HERO_SRC: Record<string, string> = {
  trekking: "/media/gallery/trek-1",
  "peak-climbing": "/media/gallery/peak-1",
  expeditions: "/media/gallery/ebc-4",
  tours: "/media/gallery/trek-3",
  "heli-treks": "/media/gallery/heli-1",
  cultural: "/media/gallery/trek-3",
  wildlife: "/media/gallery/wildlife-1",
  family: "/media/gallery/trek-1",
  photography: "/media/gallery/ebc-2",
  pilgrimage: "/media/gallery/trek-3",
  "everest-base-camp-trek": "/media/gallery/ebc-1",
  "annapurna-circuit-trek": "/media/gallery/trek-3",
  "island-peak-climbing": "/media/gallery/ebc-4",
};

export function heroPicture(slug: string, title: string): PictureSrc {
  return {
    src: HERO_SRC[slug] ?? media.hero.composite.src,
    alt: `${title} — landscape atmosphere. ${STOCK}`,
    width: 1400,
    height: 900,
  };
}

export function galleryForActivity(slug: string): readonly PictureSrc[] {
  if (slug === "peak-climbing") return media.gallery.peaks;
  if (slug === "expeditions") return media.gallery.ebc;
  if (slug === "heli-treks") return media.gallery.heli;
  if (slug === "wildlife") return media.gallery.wildlife;
  if (slug === "trekking") return media.gallery.trekking;
  return media.gallery.home;
}

export function galleryForTrip(slug: string, activity: string): readonly PictureSrc[] {
  if (slug === "everest-base-camp-trek") return media.gallery.ebc;
  if (activity === "peak-climbing" || activity === "expeditions") {
    return media.gallery.ebc;
  }
  if (activity === "trekking" || activity === "heli-treks") {
    return media.gallery.trekking;
  }
  return media.gallery.home;
}
