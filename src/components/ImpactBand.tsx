import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { CaseStudyContent, ImpactStat } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

type Range = [number, number];
type Impact = NonNullable<CaseStudyContent["impact"]>;

/**
 * Case-study impact band: scroll-scrubbed (not time-based) blur reveal on the
 * text and a count-up on the numbers — the same technique as the Bending
 * Spoons intro copy. Deliberately NOT pinned: the band scrolls normally, the
 * reveal just rides on its progress through the viewport, so nobody gets
 * held at the top of a case study they only want to skim.
 */
export default function ImpactBand({ impact }: { impact: Impact }) {
  const { tr } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.3"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const settled = useMotionValue(1);
  const progress = prefersReducedMotion ? settled : smooth;

  const { hero, context } = impact;
  // Every range below must end at or before 1, or that stat never finishes
  // (count stops short, label stays blurred) once scrolling is done.
  const step = 0.25 / Math.max(context.length, 1);

  return (
    <section ref={ref} className="mt-16 border-y border-ink/10 py-12 sm:py-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div>
          <ScrubNumber
            stat={hero}
            progress={progress}
            range={[0, 0.55]}
            className="block font-display text-7xl font-extrabold leading-none tracking-tight text-accent-text sm:text-8xl"
          />
          <p className="mt-4 font-display text-2xl font-bold text-ink">
            <ScrubText text={tr(hero.label)} progress={progress} range={[0.05, 0.5]} />
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
            <ScrubText text={tr(hero.note)} progress={progress} range={[0.2, 0.7]} by="word" />
          </p>
        </div>

        <div className="lg:border-l lg:border-ink/10 lg:pl-16">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-ink/40">
            <ScrubText text={tr(impact.contextLabel)} progress={progress} range={[0.3, 0.55]} />
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {context.map((stat, i) => {
              const start = 0.35 + i * step;
              return (
                <div key={i}>
                  <ScrubNumber
                    stat={stat}
                    progress={progress}
                    range={[start, start + 0.3]}
                    className="block font-display text-4xl font-extrabold leading-none text-ink sm:text-5xl"
                  />
                  <p className="mt-3 text-sm leading-snug text-ink-soft">
                    <ScrubText text={tr(stat.label)} progress={progress} range={[start + 0.05, start + 0.4]} />
                  </p>
                </div>
              );
            })}
          </div>
          {impact.sources && impact.sources.length > 0 && (
            <p className="mt-8 text-xs text-ink-soft/70">
              {tr({ es: "Fuente", en: "Source" })}:{" "}
              {impact.sources.map((source, i) => (
                <span key={source.url}>
                  {i > 0 && ", "}
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline-draw">
                    {tr(source.label)}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ScrubNumber({
  stat,
  progress,
  range,
  className,
}: {
  stat: ImpactStat;
  progress: MotionValue<number>;
  range: Range;
  className?: string;
}) {
  const count = useTransform(progress, range, [0, stat.value]);
  const rounded = useTransform(count, (v) => Math.round(v).toString());
  const opacity = useTransform(progress, [range[0], range[0] + (range[1] - range[0]) * 0.3], [0, 1]);
  const full = `${stat.prefix ?? ""}${stat.value}${stat.suffix ?? ""}`;

  return (
    <span className={`tabular-nums ${className ?? ""}`}>
      <span className="sr-only">{full}</span>
      <motion.span aria-hidden="true" style={{ opacity }}>
        {stat.prefix}
        <motion.span>{rounded}</motion.span>
        {stat.suffix}
      </motion.span>
    </span>
  );
}

/** Splits text into characters (grouped per word, so a line never breaks
 * mid-word) or whole words, each one unblurring on its own slice of the
 * range — staggered left to right. The real text stays in an sr-only copy;
 * the split pieces are aria-hidden. */
function ScrubText({
  text,
  progress,
  range,
  by = "char",
}: {
  text: string;
  progress: MotionValue<number>;
  range: Range;
  by?: "char" | "word";
}) {
  const words = text.split(" ");
  const total = by === "char" ? words.reduce((n, w) => n + w.length, 0) : words.length;
  const span = range[1] - range[0];
  const unitSpan = span * 0.35;
  const spread = span - unitSpan;
  let index = 0;

  const slice = () => {
    const start = range[0] + (total > 1 ? (index / (total - 1)) * spread : 0);
    index += 1;
    return [start, start + unitSpan] as Range;
  };

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            {w > 0 && " "}
            {by === "word" ? (
              <ScrubUnit progress={progress} range={slice()}>
                {word}
              </ScrubUnit>
            ) : (
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, c) => (
                  <ScrubUnit key={c} progress={progress} range={slice()}>
                    {char}
                  </ScrubUnit>
                ))}
              </span>
            )}
          </span>
        ))}
      </span>
    </>
  );
}

function ScrubUnit({ children, progress, range }: { children: string; progress: MotionValue<number>; range: Range }) {
  const opacity = useTransform(progress, range, [0, 1]);
  const filter = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  return (
    <motion.span className="inline-block" style={{ opacity, filter }}>
      {children}
    </motion.span>
  );
}
