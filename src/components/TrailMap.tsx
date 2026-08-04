"use client";

import Map, { Marker, Popup } from "react-map-gl/maplibre";
import { useState } from "react";
import Link from "next/link";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Stop } from "@/lib/content";

const OSM_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster" as const, source: "osm" }],
};

export function TrailMap({
  stops,
  center,
  zoom,
  userLocation,
}: {
  stops: Stop[];
  center: { lat: number; lng: number };
  zoom: number;
  userLocation?: { lat: number; lng: number } | null;
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = stops.find((s) => s.slug === activeSlug);

  return (
    <Map
      initialViewState={{ latitude: center.lat, longitude: center.lng, zoom }}
      mapStyle={OSM_STYLE}
      style={{ width: "100%", height: "100%" }}
    >
      {stops.map((stop) => (
        <Marker
          key={stop.slug}
          latitude={stop.lat}
          longitude={stop.lng}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setActiveSlug(stop.slug);
          }}
        >
          <div className="map-pin">{stop.order}</div>
        </Marker>
      ))}

      {userLocation && (
        <Marker latitude={userLocation.lat} longitude={userLocation.lng}>
          <div className="map-you-are-here" aria-label="Your location">
            <span className="pulse" />
          </div>
        </Marker>
      )}

      {active && (
        <Popup
          latitude={active.lat}
          longitude={active.lng}
          onClose={() => setActiveSlug(null)}
          closeOnClick={false}
          anchor="bottom"
        >
          <strong>{active.title}</strong>
          <br />
          <Link href={`/stop/${active.slug}`}>View stop &rarr;</Link>
        </Popup>
      )}
    </Map>
  );
}
