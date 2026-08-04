"use client";

import { useState } from "react";
import Link from "next/link";
import { TrailMap } from "@/components/TrailMap";
import { distanceKm, formatDistanceKm } from "@/lib/geo";
import type { Stop } from "@/lib/content";

type LocateStatus = "idle" | "locating" | "granted" | "denied" | "error";

export function TrailExplorer({
  stops,
  center,
  zoom,
}: {
  stops: Stop[];
  center: { lat: number; lng: number };
  zoom: number;
}) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [status, setStatus] = useState<LocateStatus>("idle");

  const handleLocate = () => {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStatus("granted");
      },
      (err) => {
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const nearestSlug = userLocation
    ? stops.reduce((closest, stop) => {
        const d = distanceKm(userLocation, stop);
        const closestD = closest
          ? distanceKm(userLocation, closest)
          : Infinity;
        return d < closestD ? stop : closest;
      }, null as Stop | null)?.slug
    : null;

  return (
    <>
      <div className="map-wrap">
        <TrailMap
          stops={stops}
          center={center}
          zoom={zoom}
          userLocation={userLocation}
        />
        <button
          type="button"
          className="locate-btn"
          onClick={handleLocate}
          disabled={status === "locating"}
        >
          {status === "locating" ? "Locating…" : "📍 Locate me"}
        </button>
      </div>

      {status === "denied" && (
        <p className="locate-message">
          Location access was denied — you can still browse stops manually
          below.
        </p>
      )}
      {status === "error" && (
        <p className="locate-message">
          Couldn&apos;t get your location on this device.
        </p>
      )}

      <ul className="stop-list">
        {stops.map((stop) => {
          const distance = userLocation ? distanceKm(userLocation, stop) : null;
          return (
            <li key={stop.slug}>
              <Link href={`/stop/${stop.slug}`} className="stop-card">
                <div className="stop-card-top">
                  <span className="badge">{stop.order}</span>
                  <h2>{stop.title}</h2>
                  {distance !== null && (
                    <span
                      className={
                        stop.slug === nearestSlug
                          ? "distance-chip distance-chip-nearest"
                          : "distance-chip"
                      }
                    >
                      {stop.slug === nearestSlug ? "Nearest · " : ""}
                      {formatDistanceKm(distance)}
                    </span>
                  )}
                </div>
                <p>{stop.summary}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
