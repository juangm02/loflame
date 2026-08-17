export interface ToolData {
  name: string;
  mono: string;
  color: string;
}

export default function ToolIcon({ name, mono, color }: ToolData) {
  return (
    <div className="group flex flex-col items-center gap-2.5">
      <div className="relative flex h-16 w-16 items-center justify-center transition-transform duration-200 ease-out will-change-transform group-hover:scale-[1.03]">
        <div
          className="absolute inset-0 rounded-full opacity-80"
          style={{ background: `conic-gradient(from -45deg, ${color}70, transparent 62%)` }}
        />
        <div className="absolute inset-[3px] rounded-full bg-paper" />
        <div
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-card text-[11px] font-extrabold tracking-tight shadow-[inset_0_1px_0_var(--shadow-hi),0_1px_2px_var(--shadow-soft),0_8px_14px_-10px_var(--shadow-strong)] transition-shadow duration-200 ease-out group-hover:shadow-[inset_0_1px_0_var(--shadow-hi),0_2px_6px_var(--shadow-soft),0_16px_24px_-10px_var(--shadow-strong)]"
          style={{ color }}
        >
          {mono}
        </div>
      </div>
      <span className="text-[11px] font-semibold text-ink/50">{name}</span>
    </div>
  );
}
