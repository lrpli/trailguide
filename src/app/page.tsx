import { getAllStops, getTourConfig } from "@/lib/content";
import { TrailExplorer } from "@/components/TrailExplorer";
import {
  trailLengthKm,
  estimateWalkMinutes,
  formatDistanceKm,
  formatMinutes,
} from "@/lib/geo";

export default function HomePage() {
  const config = getTourConfig();
  const stops = getAllStops();

  const lengthKm = trailLengthKm(stops);
  const walkMinutes = estimateWalkMinutes(lengthKm, stops.length);

  return (
    <main className="page">
      <div className="header">
        <div className="header-top">
          {config.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="site-logo" src={config.logo} alt="" />
          )}
          <div>
            <p className="kicker">Self-guided trail</p>
            <h1>{config.siteName}</h1>
          </div>
        </div>
        <p className="tagline">{config.tagline}</p>

        <div className="stats-row">
          <div className="stat">
            <strong>{stops.length}</strong>
            <span>stops</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>{formatDistanceKm(lengthKm)}</strong>
            <span>trail length</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>{formatMinutes(walkMinutes)}</strong>
            <span>on foot</span>
          </div>
        </div>
      </div>

      {config.note && <div className="notice">{config.note}</div>}

      <TrailExplorer stops={stops} center={config.center} zoom={config.zoom} />

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
