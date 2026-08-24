import { useEffect, useRef } from "react";

/**
 * Plays a looping muted clip in place of an ImagePlaceholder, for the rare
 * processSection placeholder that has a real asset attached (see
 * lib/caseStudyMedia.ts). Pauses itself off-screen via IntersectionObserver,
 * and skips autoplay under prefers-reduced-motion (showing controls instead
 * so the visitor can still choose to watch it).
 */
export default function CaseStudyVideo({
  src,
  poster,
  alt,
  className = "",
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={alt}
      muted
      loop
      playsInline
      controls={reduceMotion}
      autoPlay={!reduceMotion}
      className={`w-full rounded-2xl border border-ink/10 bg-ink/[0.03] object-cover ${className}`}
    />
  );
}
