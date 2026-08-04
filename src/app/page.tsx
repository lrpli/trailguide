import Link from "next/link";
import { getAllStops, getTourConfig } from "@/lib/content";
import { TrailMap } from "@/components/TrailMap";

export default function HomePage() {
  const config = getTourConfig();
  const stops = getAllStops();

  return (
    <main className="page">
      <div className="header">
        <h1>{config.siteName}</h1>
        <p>{config.tagline}</p>
      </div>

      {config.note && <div className="notice">{config.note}</div>}

      <div className="map-wrap">
        <TrailMap stops={stops} center={config.center} zoom={config.zoom} />
      </div>

      <ul className="stop-list">
        {stops.map((stop) => (
          <li key={stop.slug}>
            <Link href={`/stop/${stop.slug}`} className="stop-card">
              <span className="badge">{stop.order}</span>
              <h2>{stop.title}</h2>
              <p>{stop.summary}</p>
            </Link>
          </li>
        ))}
      </ul>

      <footer>
        {config.orgName} &middot;{" "}
        <a href={config.aboutUrl} target="_blank" rel="noreferrer">
          {config.aboutUrl}
        </a>
        <br />
        Built with TrailGuide — an open-source self-guided trail app for
        small heritage sites.
      </footer>
    </main>
  );
}
