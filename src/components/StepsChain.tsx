/**
 * A short interpretive progression (e.g. "I see photographs" -> "I am a
 * witness" -> "I construct meaning") shown as a single pill-shaped bar,
 * each step separated by a circled arrow — same layout pattern as a
 * "Benchmark -> How might we? -> User stories -> PRD" process strip, just
 * built with this site's own tokens (bg-card, ink borders) instead of
 * copying another design's colors.
 */
export default function StepsChain({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-full border border-ink/8 bg-card/50 px-6 py-5 sm:gap-x-5 sm:px-10 sm:py-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-x-4 sm:gap-x-5">
          <span className="font-display text-base font-bold text-ink sm:text-lg">{step}</span>
          {i < steps.length - 1 && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/45">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
