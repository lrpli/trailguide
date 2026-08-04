import fs from "fs";
import path from "path";
import matter from "gray-matter";

const STOPS_DIR = path.join(process.cwd(), "content", "stops");
const TOUR_CONFIG_PATH = path.join(process.cwd(), "content", "tour.json");

export type Stop = {
  slug: string;
  title: string;
  order: number;
  lat: number;
  lng: number;
  summary: string;
  image: string;
  audio: string;
  body: string;
};

export type TourConfig = {
  siteName: string;
  orgName: string;
  tagline: string;
  aboutUrl: string;
  siteUrl?: string;
  center: { lat: number; lng: number };
  zoom: number;
  note?: string;
};

export function getTourConfig(): TourConfig {
  const raw = fs.readFileSync(TOUR_CONFIG_PATH, "utf8");
  return JSON.parse(raw);
}

export function getAllStops(): Stop[] {
  const files = fs.readdirSync(STOPS_DIR).filter((f) => f.endsWith(".md"));

  const stops = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(STOPS_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      order: data.order ?? 0,
      lat: data.lat,
      lng: data.lng,
      summary: data.summary ?? "",
      image: data.image ?? "",
      audio: data.audio ?? "",
      body: content,
    };
  });

  return stops.sort((a, b) => a.order - b.order);
}

export function getStopBySlug(slug: string): Stop | undefined {
  return getAllStops().find((stop) => stop.slug === slug);
}
