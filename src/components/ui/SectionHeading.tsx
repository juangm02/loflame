import type { ReactNode } from "react";

/**
 * The site's one h2-level section title style — `font-display text-4xl
 * font-extrabold text-ink sm:text-5xl` — was hand-typed 15 separate times
 * across CaseStudy.tsx before this existed, each a slightly-trusted copy of
 * the last. Centralizing it means the next case-study section reuses this
 * instead of retyping (and risking drifting from) the same string again.
 *
 * `highlight` is the one real variant in the wild: processSections' bg-
 * surface-feature blocks need the title in on-accent white instead of ink.
 */
export default function SectionHeading({
  children,
  level = 2,
  center = false,
  highlight = false,
  className = "",
}: {
  children: ReactNode;
  level?: 2 | 3;
  center?: boolean;
  highlight?: boolean;
  className?: string;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  const size = level === 2 ? "text-4xl sm:text-5xl" : "text-2xl";
  const color = highlight ? "text-on-accent dark:text-ink" : "text-ink";
  return (
    <Tag className={`font-display font-extrabold ${size} ${color} ${center ? "text-center" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
