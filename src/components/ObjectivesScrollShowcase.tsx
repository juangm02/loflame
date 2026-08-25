import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import ObjectiveIcon from "./ObjectiveIcon";

const HEADER_HEIGHT = 90; // px — site header is itself sticky top-0, z-50; hold below it, not under it
const SETTLE_MS = 650; // roughly matches the CSS transition below; blocks input mid-transition
const CAPTURE_MARGIN = 700; // px of scroll distance, on either side of the lock point, where we take manual control
const MIN_STEP_DELTA = 35; // px — filters out jitter/small drags from counting as a step once engaged
const APPROACH_GAIN = 1.15; // how eagerly we walk toward lockY per unit of incoming delta while approaching
const MAX_PULL = 48; // px — how far the rubber-band preview can travel before a step commits
const PULL_RELEASE_MS = 180; // ms of no input before an uncommitted pull springs back to rest
const SETTLE_TRANSITION = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"; // committing a real step
const RELEASE_TRANSITION = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"; // springing back, slight overshoot

// Diminishing-return rubber band: approaches `max` but never reaches it, so
// the preview keeps responding (just less and less) however hard you push.
function rubberBand(distance: number, max: number) {
  return max * (1 - 1 / (distance / max + 1));
}

/**
 * Objectives section for Hospital SJD (the only case study with
 * `objectivesComparativa` set — see data/content.ts).
 *
 * `sectionRef` wraps the WHOLE thing — title, cards, and images together —
 * and the lock point (see below) is computed from *this* outer wrapper's
 * top, not the images sub-block. That's the whole trick: once locked, the
 * title sits at HEADER_HEIGHT with the cards and the current image laid
 * out normally beneath it, all visible together, because nothing is
 * scrolling — no `position: sticky` needed on the title at all. (An
 * earlier version locked against the images block specifically, which
 * pushed the title and cards off-screen above the fold, then tried to
 * patch that by making the title sticky — a workaround for locking on the
 * wrong element instead of fixing the lock target itself.)
 *
 * The before/after comparison images swap one full-width image at a time,
 * 32px below the cards, at their natural aspect ratio (no cropping).
 *
 * The swap does NOT rely on `position: sticky` catching an exact frame —
 * a fast/momentum scroll can jump straight past a single target pixel
 * between two wheel events. Instead:
 *   - We compute `lockY`, the scrollY where the section's top would land
 *     HEADER_HEIGHT below the viewport top.
 *   - Once scrollY is within CAPTURE_MARGIN of lockY *and moving toward
 *     it*, every wheel/touch event is intercepted: we manually step
 *     scrollY toward lockY ourselves (clamped so it can never overshoot),
 *     regardless of how large the incoming delta is. No native scroll
 *     physics run in this zone, so momentum can't skip past it.
 *   - Once scrollY == lockY exactly, we're "engaged": every gesture nudges
 *     the image with a rubber-band "pull" preview (diminishing-return
 *     resistance, capped at MAX_PULL) so scrolling always visibly does
 *     something instead of looking dead below MIN_STEP_DELTA. Once the
 *     accumulated pull crosses MIN_STEP_DELTA it commits — the preview
 *     hands off straight into the real step, same visual position, no
 *     jump. Stop scrolling before committing (or lift a touch) and the
 *     pull springs back to rest instead of hanging half-moved. At the
 *     first/last image in that direction we disengage immediately instead
 *     of pulling, letting native scroll continue from lockY.
 *
 * Falls back to a plain static layout (both images shown, no motion, no
 * scroll capture) under prefers-reduced-motion.
 */
export default function ObjectivesScrollShowcase({
  title,
  objectives,
  accent,
  images,
}: {
  title: string;
  objectives: string[];
  accent: string;
  images: { before: string; beforeAlt: string; after: string; afterAlt: string };
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const imageCount = 2;

  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = (width: number) => setContainerWidth(width);
    update(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((entries) => update(entries[0].contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;
  const animatingRef = useRef(false);
  const engagedRef = useRef(false);
  const lockYRef = useRef<number | null>(null);

  // Rubber-band preview while engaged but under MIN_STEP_DELTA — see the
  // docstring above. `pull` is an extra px offset added on top of the
  // committed index's position; `transition` swaps between "none" (live
  // tracking, no lag), the settle curve (committing a step), and the
  // release curve (springing back to rest).
  const [pull, setPull] = useState(0);
  const [transition, setTransition] = useState(SETTLE_TRANSITION);
  const pullAccumRef = useRef(0);
  const pullDirectionRef = useRef<1 | -1 | 0>(0);
  const pullReleaseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    function refreshLockY() {
      if (engagedRef.current) return; // don't recompute while we're actively holding a position
      const rect = section!.getBoundingClientRect();
      lockYRef.current = rect.top + window.scrollY - HEADER_HEIGHT;
    }
    refreshLockY();
    // Layout above this section can shift (images loading, fonts settling) — keep lockY current.
    window.addEventListener("resize", refreshLockY);
    const ro = new ResizeObserver(refreshLockY);
    ro.observe(document.body);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(refreshLockY);
    }

    function handleIntent(deltaY: number, preventDefault: () => void) {
      if (deltaY === 0) return;
      const direction = deltaY > 0 ? 1 : -1;
      const lockY = lockYRef.current;
      if (lockY === null) return;

      if (!engagedRef.current) {
        const currentY = window.scrollY;
        const distance = lockY - currentY; // positive: lock point is below us
        // Widen the zone for an unusually large single delta, so one huge
        // jump (fast Page Down, an aggressive trackpad fling) can't clear
        // the whole margin in one native scroll before we ever see it.
        const zoneMargin = Math.max(CAPTURE_MARGIN, Math.abs(deltaY) * 3);
        const withinZone = Math.abs(distance) <= zoneMargin;
        const approaching = direction > 0 ? distance > 0 : distance < 0;
        if (!withinZone || !approaching) return; // far away, or moving away — let native scroll run

        preventDefault();
        if (Math.abs(distance) < 1) {
          engagedRef.current = true;
          return;
        }
        // Walk toward lockY ourselves; never overshoot no matter how big deltaY is.
        const move = Math.sign(distance) * Math.min(Math.abs(distance), Math.abs(deltaY) * APPROACH_GAIN);
        const newY = currentY + move;
        window.scrollTo({ top: newY, behavior: "instant" });
        if (Math.abs(lockY - newY) < 1) engagedRef.current = true;
        return;
      }

      // Engaged: gestures step the image index instead of moving scroll.
      if (animatingRef.current) {
        preventDefault();
        return;
      }

      const atBoundary = direction > 0 ? indexRef.current >= imageCount - 1 : indexRef.current <= 0;
      if (atBoundary) {
        engagedRef.current = false; // release — native scroll continues from here
        return;
      }

      preventDefault();
      clearPullReleaseTimeout();

      if (pullDirectionRef.current !== 0 && pullDirectionRef.current !== direction) {
        pullAccumRef.current = 0; // changed their mind mid-gesture — restart the pull fresh
      }
      pullDirectionRef.current = direction;
      pullAccumRef.current += Math.abs(deltaY);

      if (pullAccumRef.current < MIN_STEP_DELTA) {
        setTransition("none"); // live tracking — no lag chasing the finger/wheel
        setPull(rubberBand(pullAccumRef.current, MAX_PULL) * -direction);
        pullReleaseTimeoutRef.current = window.setTimeout(releasePull, PULL_RELEASE_MS);
        return;
      }

      // Committed — hand off from the pull preview straight into the real step.
      pullAccumRef.current = 0;
      pullDirectionRef.current = 0;
      setTransition(SETTLE_TRANSITION);
      setPull(0);
      if (window.scrollY !== lockY) window.scrollTo({ top: lockY, behavior: "instant" }); // defensive re-clamp
      animatingRef.current = true;
      setIndex((i) => i + direction);
      window.setTimeout(() => {
        animatingRef.current = false;
      }, SETTLE_MS);
    }

    function clearPullReleaseTimeout() {
      if (pullReleaseTimeoutRef.current !== null) {
        window.clearTimeout(pullReleaseTimeoutRef.current);
        pullReleaseTimeoutRef.current = null;
      }
    }

    function releasePull() {
      pullAccumRef.current = 0;
      pullDirectionRef.current = 0;
      pullReleaseTimeoutRef.current = null;
      setTransition(RELEASE_TRANSITION);
      setPull(0);
    }

    function onWheel(e: WheelEvent) {
      handleIntent(e.deltaY, () => e.preventDefault());
    }

    let lastTouchY: number | null = null;
    function onTouchStart(e: TouchEvent) {
      lastTouchY = e.touches[0]?.clientY ?? null;
    }
    function onTouchMove(e: TouchEvent) {
      if (lastTouchY === null) return;
      const currentY = e.touches[0]?.clientY;
      if (currentY === undefined) return;
      const delta = lastTouchY - currentY; // positive = finger moved up = scroll-down intent
      lastTouchY = currentY;
      handleIntent(delta, () => e.preventDefault());
    }
    function onTouchEnd() {
      lastTouchY = null;
      // A lifted finger is a clear release signal — don't wait for the timeout.
      if (pullAccumRef.current > 0 && pullAccumRef.current < MIN_STEP_DELTA) {
        clearPullReleaseTimeout();
        releasePull();
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", refreshLockY);
      ro.disconnect();
      clearPullReleaseTimeout();
    };
  }, [prefersReducedMotion, imageCount]);

  // Hug height, not stretched/centered: each card is exactly as tall as its
  // own content needs, and the icon sits at a fixed top offset in every
  // card, so icons line up across cards regardless of how much text
  // follows — no shared max-height measurement needed.
  const cardsGrid = (
    <div className="mt-8 grid items-start gap-5 sm:mt-10 sm:grid-cols-3">
      {objectives.map((obj, i) => (
        <div key={i} className="flex flex-col rounded-2xl border border-ink/8 bg-card/50 p-6">
          <ObjectiveIcon index={i} accent={accent} />
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{obj}</p>
        </div>
      ))}
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div>
        <h2 className="text-center font-display text-4xl font-extrabold text-ink sm:text-5xl">{title}</h2>
        {cardsGrid}
        <div className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
          <img src={images.before} alt={images.beforeAlt} className="h-auto w-full rounded-2xl border border-ink/10" />
          <img src={images.after} alt={images.afterAlt} className="h-auto w-full rounded-2xl border border-ink/10" />
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <h2 className="text-center font-display text-4xl font-extrabold text-ink sm:text-5xl">{title}</h2>

      {cardsGrid}

      <div className="mx-auto mt-8 w-full max-w-3xl">
        <div ref={viewportRef} className="mx-auto w-full overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(${-(index * containerWidth) + pull}px)`,
              transition,
            }}
          >
            <ComparisonImage src={images.before} alt={images.beforeAlt} />
            <ComparisonImage src={images.after} alt={images.afterAlt} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-auto w-full shrink-0 rounded-2xl border border-ink/10 shadow-xl shadow-black/10" />;
}
