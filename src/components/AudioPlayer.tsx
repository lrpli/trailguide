export function AudioPlayer({ src, title }: { src: string; title: string }) {
  if (!src) return null;

  return (
    <audio controls preload="none" aria-label={`Audio guide: ${title}`}>
      <source src={src} />
      Your browser does not support the audio element.
    </audio>
  );
}
