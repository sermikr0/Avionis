import type { ImageLoaderProps } from "next/image";

/**
 * Site photography (Unsplash License) and the hero clip (Pexels License),
 * both free for commercial use. To use the company's own media, drop files
 * into /public and point `src` at them; <Photo> switches to the built-in
 * optimizer automatically.
 */
export type SitePhoto = {
  src: string;
  alt: string;
  credit?: { name: string; url: string };
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const photos = {
  hero: {
    src: unsplash("photo-1560021009-5b351959146b"),
    alt: "Yellow conventional semi-truck parked at a freight yard in daylight",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/fENr719OgCU" },
  },
  highway: {
    src: unsplash("photo-1776521905669-97fa944bf30c"),
    alt: "White semi-truck travelling along an open highway",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/pJ7jtNiVc2E" },
  },
  dock: {
    src: unsplash("photo-1714577279569-2d5566efbd70"),
    alt: "Trailers lined up at a distribution dock, seen from above",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/0NQWg0N8oj8" },
  },
  gate: {
    src: unsplash("photo-1786412987351-d6bdcad225f2"),
    alt: "White semi-truck waiting beside an industrial gate",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/2oyEC9b657Y" },
  },
  road: {
    src: unsplash("photo-1783246184640-74a787cfc84c"),
    alt: "Semi-truck ahead on an interstate, seen from the following lane",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/WSknglfFYH0" },
  },
  horizon: {
    src: unsplash("photo-1774116196662-a9e1e4fa1612"),
    alt: "Truck on a highway with hills on the horizon",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/xJte6gX3mQE" },
  },
  night: {
    src: unsplash("photo-1769697756411-63c1bb2d7031"),
    alt: "Semi-truck on a highway at sunset",
    credit: { name: "Unsplash", url: "https://unsplash.com/photos/tv53M6u2bAQ" },
  },
} satisfies Record<string, SitePhoto>;

/** Homepage hero clip: aerial of a freeway, 8 s loop. Poster is its first frame. */
export const heroVideo = {
  src: "https://videos.pexels.com/video-files/12982379/12982379-hd_1920_1080_24fps.mp4",
  type: "video/mp4",
  poster: {
    src: "https://images.pexels.com/videos/12982379/4k-4k-resolution-4k-video-agriculture-12982379.jpeg",
    alt: "Aerial view of a semi-truck on a freeway between farm fields",
    credit: { name: "Pexels", url: "https://www.pexels.com/video/12982379/" },
  } satisfies SitePhoto,
};

export function isRemoteCdn(src: string) {
  return (
    src.startsWith("https://images.unsplash.com/") ||
    src.startsWith("https://images.pexels.com/")
  );
}

/** Lets the stock-photo CDN resize and encode instead of proxying through this server. */
export function cdnLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  if (url.hostname === "images.pexels.com") {
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    url.searchParams.set("w", String(width));
    return url.toString();
  }
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
}
