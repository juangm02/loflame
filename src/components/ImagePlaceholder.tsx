export default function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-ink/[0.03] px-6 py-10 text-center ${className}`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink/30">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <p className="max-w-xs text-xs font-medium leading-relaxed text-ink/40">{label}</p>
    </div>
  );
}
