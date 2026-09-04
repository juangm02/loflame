// Small numbered tag dropped onto anything still waiting for a real image
// (dashed placeholders here, but also bespoke blocks like the hero "Brief
// de diseño" card or the Design approach fallback in CaseStudy.tsx). Purely
// a temporary authoring aid — Juan matches these numbers to files in his own
// folders and tells us which is which; the numbers get removed once every
// slot has a real image.
export function PlaceholderNumberBadge({ number }: { number: number }) {
  return (
    <span className="absolute left-3 top-3 rounded-full border border-ink/15 bg-card px-2 py-0.5 font-display text-[11px] font-bold tabular-nums text-ink/50">
      {String(number).padStart(2, "0")}
    </span>
  );
}

export default function ImagePlaceholder({
  label,
  number,
  className = "",
}: {
  label: string;
  number?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-ink/[0.03] px-6 py-10 text-center ${className}`}
    >
      {number != null && <PlaceholderNumberBadge number={number} />}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink/30">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <p className="max-w-xs text-xs font-medium leading-relaxed text-ink/40">{label}</p>
    </div>
  );
}
