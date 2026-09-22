import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ProjectMeta, Bilingual } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { cta } from "../data/content";
import { logos, covers } from "../lib/projectAssets";
import { resolveAccent, useIsDarkTheme } from "../lib/useIsDarkTheme";
import CTAButton from "./CTAButton";
import { Badge } from "./ui/badge";
import { Briefcase, Sparkles, Calendar, MapPin } from "lucide-react";

/**
 * Scroll-pinned project tabs — desktop/tablet only (see the `md:hidden`
 * plain <ProjectCard> list Portfolio.tsx renders alongside this for mobile).
 *
 * Ported from a Webflow example the user supplied (a tall section whose
 * `.tabs_sticky-wrapper` pins itself via `position: sticky` while a plain
 * scroll listener buckets scroll progress into one active index per
 * project, crossfading a left text panel against a right media panel).
 * The pin/sticky mechanic is kept as given; the indexing logic itself
 * isn't anymore — see the big comment above the wheel-handling effect
 * below for why (short version: deriving the active tab from raw scroll
 * *position* let a strong/fast scroll gesture blow straight through
 * several tabs in one go; stepping is now driven by intercepted `wheel`
 * events instead, capped to exactly one tab per gesture). What else
 * changed, necessarily:
 * - The example crossfades <video>; these cards only have a static cover
 *   image each (or, for Corigin, no cover at all — just its accent-color
 *   monogram), so the right panel pushes those instead, unchanged from
 *   what ProjectCard already shows for each project.
 * - The example's single shared "Order today" button became a per-project
 *   "Ver proyecto" link (or the existing "under construction" pill for a
 *   disabled project), since each tab has to go to a different case study.
 * - The crossfade itself became a "push" (each panel slides fully in/out
 *   vertically instead of fading) per feedback, driven by Framer Motion
 *   rather than Tailwind's transition-transform utilities — those utilities
 *   turned out to not reliably complete after a class change here (an
 *   element would sometimes freeze at its pre-update position instead of
 *   animating to the new one), which is exactly the kind of "leftover
 *   card" glitch Framer Motion's animate prop is built to avoid.
 */
export default function ProjectPinTabs({ projects }: { projects: ProjectMeta[] }) {
  const { tr } = useLanguage();
  const isDark = useIsDarkTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  // Signed "resistance" feedback, -1..1: sign is the pending step's
  // direction, magnitude how close a wheel tick nudged it. It's not a
  // continuous 0→1 scroll fraction anymore (see the wheel-driven rewrite
  // below) — it bumps toward ±1 on each accepted or absorbed wheel tick
  // and eases back to 0 on its own (CSS transition on the element itself,
  // see PULL_PX below), reading as a quick "yes, that registered" nudge
  // rather than a 1:1 drag.
  const [pull, setPull] = useState(0);

  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const count = projects.length;

  // The whole scroll-jacking mechanic, rewritten to guarantee "one scroll
  // gesture = at most one card, no matter how strong/long the momentum
  // is." The previous approach derived activeIndex fresh from absolute
  // scroll distance every tick — correct at rest, but a single fast fling
  // covers a large scroll distance in one continuous gesture (many rapid
  // `scroll` events before it settles), so it could jump straight past
  // several tabs. Position-derived indexing can't fix that on its own:
  // even rate-limiting how often the index is allowed to change doesn't
  // help if the underlying page position keeps moving freely underneath —
  // once the rate limit lifts, the position has already moved on and the
  // "catch-up" index change happens off-screen, after the pinned card has
  // already scrolled away.
  //
  // So instead: while this section is the one currently pinned (sticky
  // engaged — see isEngaged), wheel events are intercepted directly
  // (preventDefault), which freezes the page's actual scroll position for
  // the duration. Each wheel *gesture* then steps activeIndex by exactly
  // ±1. Only once activeIndex is already at the first/last tab and the
  // user keeps scrolling in that direction do we stop intercepting,
  // releasing the page to scroll normally past the section (into "Sobre
  // mí" above, or the footer below).
  //
  // The one hard part is deciding where one "gesture" ends and the next
  // begins. A fixed-duration lock after each step (tried first) is wrong:
  // trackpad/mouse momentum keeps firing wheel events — at a decaying but
  // still-brisk rate — for anywhere from several hundred ms to well over a
  // second after the user's fingers actually leave the trackpad. A fixed
  // lock shorter than that tail reopens *while the same physical flick is
  // still arriving*, so it takes another step, and another, once per lock
  // window, for as long as the momentum keeps feeding it — which is
  // exactly "a strong scroll jumps several cards," just spread over time
  // instead of instantly.
  //
  // The fix is to key off silence, not a timer: a gesture (including its
  // whole momentum tail) is one unbroken stream of wheel events with tiny
  // gaps between them (well under 50ms while it's still moving). Every
  // qualifying tick pushes a "go quiet" deadline further out; only once
  // that deadline is actually reached — meaning no wheel event arrived for
  // GESTURE_SILENCE_MS, i.e. the momentum has genuinely stopped — does the
  // next wheel event get to start a new gesture and take a new step. A
  // single very strong fling can keep the deadline pushed out for a long
  // time, but it still only ever earns the one step it took at the start.
  useEffect(() => {
    function updateHeight() {
      // The sticky card (top-[230px], height calc(100vh-270px), see the
      // render below) needs window.innerHeight - 40 px of room left in the
      // section for it to stay pinned — plus a full extra viewport of
      // slack so there's a long, comfortable hold before release instead
      // of releasing right at that boundary. Index stepping itself no
      // longer depends on this height at all (it's wheel-driven, not
      // position-driven); it only has to give position: sticky somewhere
      // to hold.
      setSectionHeight(window.innerHeight - 40 + window.innerHeight);
    }

    // Must match the sticky div's own top-[230px] below exactly. 230 =
    // header's real 96px height + the title band's own real height (92px
    // — 60px text + 16px padding top/bottom, see the md:py-4 in
    // Portfolio.tsx) + the same ~42px gap under the title band.
    const PIN_TOP = 230;
    function stickyBottom() {
      return PIN_TOP + (window.innerHeight - 270);
    }

    function isEngaged(rect: DOMRect) {
      return rect.top <= PIN_TOP && rect.bottom > stickyBottom();
    }

    // How much cumulative wheel distance has to build up in one direction
    // before it actually commits a step — the "hay que jalar más" knob.
    // One ordinary firm trackpad swipe's very first tick alone is often
    // 80-150; this being meaningfully higher than that means a light
    // touch does nothing and it takes sustained, deliberate pull to flip
    // a card, rather than any single qualifying tick doing it instantly.
    const PULL_THRESHOLD = 220;

    // Fixed cooldown after a step commits. Ticks arriving during it are
    // absorbed (preventDefault still fires) but NOT accumulated at all —
    // this is the key difference from the two earlier approaches (a fixed
    // lock alone, then silence-detection, then per-tick reacceleration
    // detection): by simply discarding input during the lock instead of
    // trying to classify it, a strong fling's leftover momentum tail can
    // never bank up past PULL_THRESHOLD the instant the lock clears and
    // cause a second step — whatever arrives after has to accumulate the
    // full threshold again from zero, and a decaying tail rarely still has
    // that much energy left by then. It also bounds how long a retry can
    // ever feel "stuck" to exactly LOCK_MS (matched to the push
    // animation's own 550ms, so a queued step never fires mid-flight),
    // instead of depending on the tail going fully silent first.
    const LOCK_MS = 600;

    let accumulated = 0;
    let direction: boolean | null = null; // true = down, false = up
    let locked = false;
    let lockTimer: ReturnType<typeof setTimeout> | undefined;

    function reset() {
      accumulated = 0;
      direction = null;
      setPull(0);
    }

    function onWheel(e: WheelEvent) {
      const el = sectionRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      if (!isEngaged(rect)) {
        reset(); // stale accumulation shouldn't carry into some later, unrelated re-engagement
        return; // not our concern — let native scroll happen
      }

      const goingDown = e.deltaY > 0;
      const current = activeIndexRef.current;
      const atEnd = goingDown && current >= count - 1;
      const atStart = !goingDown && current <= 0;
      if (atEnd || atStart) {
        reset();
        return; // release: let the user scroll past the section
      }

      // We own this gesture from here — never let it fall through to a
      // native scroll that could carry the page (and thus the pin) past
      // more than the one step we're about to take.
      e.preventDefault();
      if (Math.abs(e.deltaY) < 2) return; // ignore near-zero trackpad noise

      if (locked) return; // mid-cooldown: absorbed outright, doesn't accumulate — see LOCK_MS above

      // A reversal always starts fresh immediately, discarding whatever
      // had built up in the old direction — otherwise "scroll down a bit,
      // then scroll back up" would need to first cancel out that leftover
      // progress before the up direction could ever reach its own
      // threshold.
      if (direction !== null && direction !== goingDown) {
        accumulated = 0;
      }
      direction = goingDown;
      accumulated += e.deltaY;

      // Continuous feedback on how close the current pull is to actually
      // committing — not a fixed bump anymore, since there's now a real
      // "progress toward threshold" value to show.
      setPull(Math.max(-1, Math.min(1, accumulated / PULL_THRESHOLD)));

      if (Math.abs(accumulated) < PULL_THRESHOLD) return; // not enough pull yet

      setActiveIndex(current + (goingDown ? 1 : -1));
      accumulated = 0;
      direction = null;
      setPull(0);
      locked = true;
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => {
        locked = false;
      }, LOCK_MS);

      // Non-passive: has to be, so preventDefault above actually works.
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("wheel", onWheel);
      clearTimeout(lockTimer);
    };
  }, [count]);

  return (
    <div ref={sectionRef} style={{ height: sectionHeight || undefined }} className="mt-24 hidden md:block">
      {/* Stacked with the site header (sticky, 96px, flush with the title —
          see Portfolio.tsx) and the "Mis proyectos" title band (sticky
          right below it, 92px tall with its own 16px vertical padding) —
          this pins below both, top-[230px] leaving a ~42px gap under the
          title band, and its own height is capped to the remaining
          viewport instead of a naive 100vh/90vh, so none of the three ever
          overlap. Keep PIN_TOP above (230) and this top-[230px] in sync —
          they're the same offset, one in JS for the wheel handler's
          isEngaged check, one in the class for layout. */}
      <div className="sticky top-[230px] h-[calc(100vh-270px)]">
        {/* Left column fixed at 450px (description block), right column
            takes whatever's left — which also keeps the cover images from
            stretching so large they go pixelated. */}
        <div className="grid h-full grid-cols-[450px_minmax(120px,1fr)] gap-6">
          {/* Left: text panel, one project pushed in at a time */}
          <div className="relative overflow-hidden rounded-[10px] border border-ink/8 bg-card p-8">
            {projects.map((project, i) => (
              <ProjectTabPanel
                key={project.slug}
                project={project}
                offset={i - activeIndex}
                pull={pull}
                tr={tr}
              />
            ))}
          </div>

          {/* Right: media panel, same push */}
          <div className="relative overflow-hidden rounded-[10px]">
            {projects.map((project, i) => (
              <ProjectTabMedia
                key={project.slug}
                project={project}
                offset={i - activeIndex}
                pull={pull}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** 0 = active (in place); negative = already scrolled past, pushed up and
 * out; positive = still to come, waiting pushed down below the frame.
 *
 * A fixed pixel value instead of a "100%"/"-100%" string: Framer Motion
 * resolves percentage transforms against the element's own measured
 * layout size, and for an `absolute inset-8` panel (sized implicitly by
 * its positioned parent, not an explicit height) that measurement came
 * back stale — the animation target silently stuck at the PREVIOUS
 * offset's value instead of the new one every time it changed, which is
 * exactly the "leftover card" glitch. 2000px comfortably clears this
 * panel's real height (100vh - 270px, i.e. under 2000px up to a ~2270px
 * tall viewport) regardless of viewport size, without needing Framer
 * Motion to measure anything. */
function pushY(offset: number) {
  return offset === 0 ? 0 : offset < 0 ? -2000 : 2000;
}

/** Push transition timing, shared by both panels below and by the wheel
 * handler's step lock above (600ms there) — the lock has to outlast this
 * so a queued-up wheel tick never fires mid-flight. */
const PUSH_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const };

/** How far (in px) the active card visibly nudges toward its pending
 * direction on each wheel tick — a quick bump-and-release (CSS transition
 * on the element itself), not the old continuous 1:1 scroll-linked pull,
 * since stepping is no longer driven by absolute scroll position. */
const PULL_PX = 14;
const PULL_TRANSITION = "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)";

/** Metadata pill (tags/year/location) — accent-tinted chip, tokens shared
 * with the rest of the palette (bg-accent/10 + text-accent-text) instead of
 * a one-off hex pair, so it sits comfortably next to every other accent use
 * in both themes. Every pill across every project card draws its icon from
 * the same fixed set of 4 (see iconForTag/Calendar/MapPin below) — one icon
 * per category, never per literal tag text, so the set stays legible as a
 * system instead of a grab-bag. */
const pillClassName =
  "gap-1.5 rounded-full border-0 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent-text";

/** Tag pills read left-to-right as role/context first, then a distinguishing
 * detail — every project's `tags` array is exactly these two in that order
 * (verified across all 5 projects), so the icon is assigned by position,
 * never by sniffing the tag's text. */
const tagIcons = [Briefcase, Sparkles];

function ProjectTabPanel({
  project,
  offset,
  pull,
  tr,
}: {
  project: ProjectMeta;
  offset: number;
  pull: number;
  tr: (b: Bilingual) => string;
}) {
  const logo = logos[project.logo];
  const initial = project.name.trim().charAt(0).toUpperCase();
  const accent = resolveAccent(project.accent, project.accentDark, useIsDarkTheme());

  return (
    <motion.div
      animate={{ y: pushY(offset) }}
      transition={PUSH_TRANSITION}
      className={`absolute inset-8 flex flex-col justify-between ${offset !== 0 ? "pointer-events-none" : ""}`}
    >
      {/* Quick bump-and-release "pull" — separate element from the
          motion.div above so it composes with (rather than fights) the
          discrete push animation on it. Only the active card moves, and
          only up to PULL_PX, nudging toward the direction a wheel tick
          just registered in. */}
      <div
        className="flex h-full flex-col justify-between"
        style={
          offset === 0
            ? { transform: `translateY(${-pull * PULL_PX}px)`, transition: PULL_TRANSITION }
            : undefined
        }
      >
        <div>
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-ink/10" />
            ) : (
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold text-white ring-1 ring-ink/10"
                style={{ background: accent }}
              >
                {initial}
              </span>
            )}
            <h3 className="font-display text-xl font-bold leading-tight text-ink">{project.name}</h3>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {project.tags.map((tag, i) => {
              const TagIcon = tagIcons[i] ?? Sparkles;
              return (
                <Badge key={i} className={pillClassName}>
                  <TagIcon />
                  {tr(tag)}
                </Badge>
              );
            })}
            <Badge className={pillClassName}>
              <Calendar />
              {project.year}
            </Badge>
            <Badge className={pillClassName}>
              <MapPin />
              {tr(project.location)}
            </Badge>
          </div>

          <div className="mt-5 h-px w-full bg-ink/10" />

          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(project.description)}</p>
        </div>

        {project.disabled ? (
          <span className="mt-6 inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
            {tr(cta.underConstruction)}
          </span>
        ) : (
          <CTAButton to={`/proyectos/${project.slug}`} variant="light" className="mt-6 w-fit">
            {tr(cta.goToProject)}
          </CTAButton>
        )}
      </div>
    </motion.div>
  );
}

function ProjectTabMedia({
  project,
  offset,
  pull,
  isDark,
}: {
  project: ProjectMeta;
  offset: number;
  pull: number;
  isDark: boolean;
}) {
  const cover = covers[project.cover];
  const accent = resolveAccent(project.accent, project.accentDark, isDark);
  const initial = project.name.trim().charAt(0).toUpperCase();

  return (
    <motion.div animate={{ y: pushY(offset) }} transition={PUSH_TRANSITION} className="absolute inset-0">
      <div
        className="h-full w-full"
        style={
          offset === 0
            ? { transform: `translateY(${-pull * PULL_PX}px)`, transition: PULL_TRANSITION }
            : undefined
        }
      >
        {cover ? (
          <img src={cover} alt={project.name} className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(140deg, ${accent}, #10152a)` }}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute h-32 w-32 rotate-6 rounded-[10px] bg-white/10" />
              <div className="absolute h-32 w-32 -rotate-6 translate-x-8 translate-y-5 rounded-[10px] bg-white/10" />
              <span className="relative font-display text-6xl font-extrabold text-white">{initial}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
