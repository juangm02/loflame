export interface MockupCard {
  title: string;
  tags: string[];
  date: string;
}
export interface MockupNote {
  text: string;
  author: string;
  color: string;
}

export default function IdeaBoardMockup({
  appName,
  tabs,
  cards,
  detail,
  notes,
}: {
  appName: string;
  tabs: string[];
  cards: MockupCard[];
  detail: { title: string; body: string; avatarCount: number };
  notes: MockupNote[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-card shadow-[0_1px_2px_var(--shadow-soft),0_24px_48px_-20px_var(--shadow-strong)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/8 px-5 py-3.5">
        <span className="font-display text-lg font-extrabold text-indigo-600">{appName}</span>
        <div className="flex gap-1 rounded-full bg-paper-dim p-1">
          {tabs.map((tab, i) => (
            <span
              key={tab}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                i === 0 ? "bg-card text-ink shadow-sm" : "text-ink/45"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <span className="rounded-full bg-navy px-3 py-1.5 text-[11px] font-bold text-fixed-light">+ New idea</span>
      </div>

      <div className="grid sm:grid-cols-[200px_1fr]">
        <div className="border-b border-ink/8 p-3 sm:border-b-0 sm:border-r">
          <div className="rounded-full border border-ink/10 px-3 py-1.5 text-[10px] text-ink/40">🔍 Search by keywords</div>
          <div className="mt-3 space-y-2">
            {cards.map((c, i) => (
              <div key={i} className={`rounded-xl border p-2.5 ${i === 0 ? "border-navy/25 bg-navy/[0.03]" : "border-ink/8"}`}>
                <p className="line-clamp-1 text-[11px] font-bold text-ink">{c.title}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {c.tags.slice(0, 2).map((tag, j) => (
                    <span key={j} className="rounded-full bg-ink/5 px-1.5 py-0.5 text-[8px] font-semibold text-ink/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-[8px] text-ink/30">{c.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="p-6"
          style={{
            backgroundImage: "radial-gradient(var(--pattern-dot) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        >
          <div className="max-w-sm rounded-2xl border border-ink/8 bg-card p-4 shadow-lg">
            <p className="text-sm font-extrabold text-ink">{detail.title}</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">{detail.body}</p>
            <div className="mt-3 flex items-center">
              <div className="flex -space-x-1.5">
                {Array.from({ length: Math.min(detail.avatarCount, 4) }).map((_, i) => (
                  <span key={i} className="h-5 w-5 rounded-full border-2 border-card bg-ink/20" />
                ))}
              </div>
              {detail.avatarCount > 4 && (
                <span className="ml-2 text-[10px] font-semibold text-ink/40">+{detail.avatarCount - 4}</span>
              )}
            </div>
          </div>

          {notes.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {notes.map((n, i) => (
                <div
                  key={i}
                  className="w-36 rounded-lg p-2.5 text-[10px] font-semibold text-fixed-dark/85 shadow-md"
                  style={{ background: n.color, transform: `rotate(${i % 2 ? 2 : -2}deg)` }}
                >
                  {n.text}
                  <p className="mt-1 text-[9px] font-normal opacity-70">{n.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
