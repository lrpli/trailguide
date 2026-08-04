import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllStops, getStopBySlug } from "@/lib/content";
import { AudioPlayer } from "@/components/AudioPlayer";

export function generateStaticParams() {
  return getAllStops().map((stop) => ({ slug: stop.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const stop = getStopBySlug(params.slug);
  return { title: stop ? stop.title : "Stop not found" };
}

export default function StopPage({ params }: { params: { slug: string } }) {
  const stop = getStopBySlug(params.slug);
  if (!stop) notFound();

  return (
    <main className="page">
      <Link href="/" className="back-link">
        &larr; Back to trail
      </Link>

      <div className="header">
        <h1>
          <span className="badge">{stop.order}</span> {stop.title}
        </h1>
      </div>

      {stop.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stop.image}
          alt={stop.title}
          style={{ width: "100%", borderRadius: 12, margin: "1rem 0" }}
        />
      )}

      <AudioPlayer src={stop.audio} title={stop.title} />

      <div className="stop-body">
        <ReactMarkdown>{stop.body}</ReactMarkdown>
      </div>
    </main>
  );
}
