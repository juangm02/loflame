import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function FigmaEmbed({ url, title = "Prototipo interactivo" }: { url: string; title?: string }) {
  const { tr } = useLanguage();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const src = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;

  function goFullscreen() {
    iframeRef.current?.requestFullscreen?.();
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-card shadow-[0_1px_2px_var(--shadow-soft),0_24px_48px_-20px_var(--shadow-strong)]">
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9]">
        <iframe
          ref={iframeRef}
          title={title}
          src={src}
          className="h-full w-full"
          allow="fullscreen"
          loading="lazy"
        />
        {/* Figma's own embed footer (file name link + "last edited" date)
            still renders inside the iframe. We can't remove it from the
            outside since it's cross-origin content, so instead we cover it
            with a same-height bar carrying our own fullscreen CTA. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-14 items-center justify-end border-t border-ink/10 bg-card px-4">
          <button
            type="button"
            onClick={goFullscreen}
            className="pointer-events-auto inline-flex items-center gap-1.5 text-sm font-bold text-ink-action"
          >
            <span className="underline-draw">
              {tr({ es: "Pantalla completa", en: "Fullscreen" })}
            </span>
            <ExpandIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
    </svg>
  );
}
