import { useCallback, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./ui/carousel";
import { Button } from "./ui/button";

/**
 * A small prev/next carousel for a processSection slot that's really
 * several frames of the same idea (e.g. Arrelat's forest-metaphor renders:
 * roots / thread-trees / seed) rather than three distinct images meant to
 * sit side by side. Letterboxed like the placeholder grid (object-contain
 * on a fixed-aspect box, never object-cover) so nothing is ever cropped.
 */
export default function ImageCarousel({ images }: { images: { src?: string; alt: string }[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    if (!api) return;
    setIndex(api.selectedScrollSnap());
    const onSelect = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const goTo = useCallback((i: number) => api?.scrollTo(i), [api]);

  if (!count) return null;

  return (
    <div className="relative">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {images.map((image, i) => (
            <CarouselItem key={i} className="pl-0">
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-paper-dim">
                <img src={image.src} alt={image.alt} className="max-h-full max-w-full object-contain" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {count > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollPrev()}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-card/90 text-ink shadow-md hover:bg-card hover:text-ink"
            >
              <ArrowIcon direction="left" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => api?.scrollNext()}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-card/90 text-ink shadow-md hover:bg-card hover:text-ink"
            >
              <ArrowIcon direction="right" />
            </Button>
          </>
        )}
      </Carousel>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <Button
              key={i}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Ir a la imagen ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full p-0 transition-all ${
                i === index ? "w-6 bg-ink-action hover:bg-ink-action" : "w-1.5 bg-ink/20 hover:bg-ink/20"
              }`}
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
