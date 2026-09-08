import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * A small prev/next carousel for a processSection slot that's really
 * several frames of the same idea (e.g. Arrelat's forest-metaphor renders:
 * roots / thread-trees / seed) rather than three distinct images meant to
 * sit side by side. Letterboxed like the placeholder grid (object-contain
 * on a fixed-aspect box, never object-cover) so nothing is ever cropped.
 */
export default function ImageCarousel({ images }: { images: { src?: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const count = images.length;

  function go(delta: number) {
    setDirection(delta);
    setIndex((prev) => (prev + delta + count) % count);
  }

  const current = images[index];
  if (!current) return null;

  return (
    <div className="relative">
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-paper-dim">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={current.src}
            alt={current.alt}
            custom={direction}
            initial={{ opacity: 0, x: 24 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 * direction }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-full max-w-full object-contain"
          />
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink shadow-md transition hover:bg-card"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-ink shadow-md transition hover:bg-card"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la imagen ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-ink-action" : "w-1.5 bg-ink/20"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
