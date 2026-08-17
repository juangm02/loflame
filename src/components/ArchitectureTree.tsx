export interface TreeGroup {
  title: string;
  items: string[];
}
export interface TreeBranch {
  title: string;
  groups: TreeGroup[];
}

export default function ArchitectureTree({ root, branches }: { root: string; branches: TreeBranch[] }) {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <span className="rounded-full bg-navy px-5 py-2 text-sm font-bold text-paper">{root}</span>
      </div>
      <div className="mx-auto h-8 w-px bg-ink/15" />

      <div className="grid gap-6 sm:grid-cols-3">
        {branches.map((branch, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-ink/8 bg-white/70 shadow-[0_1px_2px_rgba(20,22,31,0.05),0_10px_20px_-14px_rgba(20,22,31,0.25)]">
            <div className="bg-navy px-4 py-2.5 text-center text-sm font-extrabold text-paper">{branch.title}</div>
            <div className="divide-y divide-ink/8">
              {branch.groups.map((g, j) => (
                <div key={j} className="px-4 py-3">
                  <p className="text-xs font-extrabold text-ink">{g.title}</p>
                  {g.items.length > 0 && (
                    <ul className="mt-1.5 space-y-1">
                      {g.items.map((it, k) => (
                        <li key={k} className="text-[11px] leading-relaxed text-ink-soft">
                          · {it}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
