import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllStops, getStopBySlug } from "@/lib/content";
import { AudioPlayer } from "@/components/AudioPlayer";
import { directionsUrl } from "@/lib/geo";

export function generateStaticParams() {
  return getAllStops().map((stop) => ({ slug: stop.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const stop = getStopBySlug(params.slug);
  return { title: stop ? stop.title : "Stop not found" };
}

export default function StopPage({ params }: { params: { slug: string } }) {
  const stops = getAllStops();
  const index = stops.findIndex((s) => s.slug === params.slug);
  if (index === -1) notFound();

  const stop = stops[index];
  const prev = index > 0 ? stops[index - 1] : null;
  const next = index < stops.length - 1 ? stops[index + 1] : null;

  return (
    <main className="page">
      <Link href="/" className="back-link">
        &larr; Back to trail
      </Link>

      <div className="progress-track" aria-hidden="true">
        {stops.map((s, i) => (
          <span
            key={s.slug}
            className={i <= index ? "progress-seg filled" : "progress-seg"}
          />
        ))}
      </div>
      <p className="progress-label">
        Stop {index + 1} of {stops.length}
      </p>

      <div className="header">
        <h1>
          <span className="badge">{stop.order}</span> {stop.title}
        </h1>
      </div>

      {stop.image && (
        <figure className="stop-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={stop.image} alt={stop.title} />
          {stop.imageCredit && (
            <figcaption>{stop.imageCredit}</figcaption>
          )}
        </figure>
      )}

      <AudioPlayer src={stop.audio} title={stop.title} />

      <a
        className="btn btn-secondary directions-link"
        href={directionsUrl({ lat: stop.lat, lng: stop.lng })}
        target="_blank"
        rel="noreferrer"
      >
        🧭 Get directions to this stop
      </a>

      <div className="stop-body">
        <ReactMarkdown>{stop.body}</ReactMarkdown>
      </div>

      <nav className="stop-nav">
        {prev ? (
          <Link href={`/stop/${prev.slug}`} className="stop-nav-link prev">
            <span className="stop-nav-label">&larr; Previous</span>
            <span className="stop-nav-title">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/stop/${next.slug}`} className="stop-nav-link next">
            <span className="stop-nav-label">Next &rarr;</span>
            <span className="stop-nav-title">{next.title}</span>
          </Link>
        ) : (
          <Link href="/" className="stop-nav-link next">
            <span className="stop-nav-label">Finish &rarr;</span>
            <span className="stop-nav-title">Back to trail overview</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
