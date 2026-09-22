import type { ReactNode } from "react";

/**
 * The site's card surface, in the three variants actually found in the
 * codebase (see the design-system audit). Before this existed, every card
 * hand-typed its own `rounded-2xl border border-ink/8 bg-card/50` (or a
 * near-identical string) — six times in CaseStudy.tsx alone, plus the exact
 * same `rounded-3xl border border-ink/10 bg-card shadow-[...]` wrapper
 * copy-pasted between FigmaEmbed.tsx and IdeaBoardMockup.tsx.
 *
 * Card owns the border/background/radius/shadow — not padding, which stays
 * on the caller via `className`, since it genuinely varies too much (p-5,
 * p-6, px-8 py-12 sm:px-16...) to force into one small enum without either
 * being too restrictive or reinventing every combination as a prop.
 *
 * Border defaults to ink/10, not ink/8 — the two were split almost evenly
 * across the codebase with no rule behind the difference (see the design
 * doc's "Inconsistencias"); /10 is the more visible of the two and is now
 * the one default going forward.
 */
export default function Card({
  children,
  surface = "translucent",
  radius = "2xl",
  shadow = false,
  fullHeight = false,
  className = "",
}: {
  children: ReactNode;
  /** translucent: bg-card/50, the default info-card fill (objectives, research categories, testimonials).
   *  solid: bg-card, fully opaque (FigmaEmbed, IdeaBoardMockup).
   *  feature: bg-surface-feature, no light-mode border, accent-rail border in dark mode (processSections highlight, problemStatement quote). */
  surface?: "translucent" | "solid" | "feature";
  radius?: "2xl" | "3xl";
  /** The soft/strong shadow pairing used on solid feature-level cards (FigmaEmbed, IdeaBoardMockup). Not used on translucent info-cards, which stay flat. */
  shadow?: boolean;
  fullHeight?: boolean;
  className?: string;
}) {
  const surfaceClass =
    surface === "feature"
      ? "bg-surface-feature dark:border-[0.5px] dark:border-ghost dark:border-l-[3px] dark:border-l-accent"
      : surface === "solid"
        ? "border border-ink/10 bg-card"
        : "border border-ink/10 bg-card/50";
  const radiusClass = radius === "3xl" ? "rounded-3xl" : "rounded-2xl";
  const shadowClass = shadow ? "shadow-[0_1px_2px_var(--shadow-soft),0_24px_48px_-20px_var(--shadow-strong)]" : "";
  // Only the solid surface has ever wrapped content (an iframe, a mockup
  // header) that needs clipping to the rounded corner — translucent info-
  // cards and feature blocks are plain text and never had this originally.
  const clipClass = surface === "solid" ? "overflow-hidden" : "";

  return (
    <div className={`${radiusClass} ${clipClass} ${surfaceClass} ${shadowClass} ${fullHeight ? "h-full" : ""} ${className}`}>
      {children}
    </div>
  );
}
