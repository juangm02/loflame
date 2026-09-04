import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface TabItem {
  key: string;
  label: string;
  to: string;
  active: boolean;
  disabled?: boolean;
}

export default function CaseStudyTabs({ items }: { items: TabItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  function scrollByAmount(delta: number) {
    trackRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <div className="relative border-b border-ink/10">
      {canLeft && (
        <button
          onClick={() => scrollByAmount(-180)}
          aria-label="Scroll left"
          className="absolute left-0 top-0 z-10 hidden h-full items-center bg-gradient-to-r from-paper via-paper/95 to-transparent py-1 pl-0.5 pr-6 sm:flex"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 bg-card/90 text-ink-action/60 shadow-sm transition-transform hover:scale-105">
            <ArrowIcon direction="left" />
          </span>
        </button>
      )}

      <div ref={trackRef} className="no-scrollbar flex gap-7 overflow-x-auto scroll-smooth">
        {items.map((item) => {
          const label = (
            <span
              className={`relative inline-block whitespace-nowrap pb-3 pt-1 text-sm transition-colors duration-200 ${
                item.active
                  ? "font-bold text-ink-action"
                  : item.disabled
                  ? "font-semibold text-ink-action/30"
                  : "font-semibold text-ink-action/55 hover:text-ink-action"
              }`}
            >
              {item.label}
              {item.active && (
                <motion.span
                  layoutId="case-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
            </span>
          );
          return item.disabled ? (
            <span key={item.key}>{label}</span>
          ) : (
            <Link key={item.key} to={item.to}>
              {label}
            </Link>
          );
        })}
      </div>

      {canRight && (
        <button
          onClick={() => scrollByAmount(180)}
          aria-label="Scroll right"
          className="absolute right-0 top-0 z-10 hidden h-full items-center bg-gradient-to-l from-paper via-paper/95 to-transparent py-1 pl-6 pr-0.5 sm:flex"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/10 bg-card/90 text-ink-action/60 shadow-sm transition-transform hover:scale-105">
            <ArrowIcon direction="right" />
          </span>
        </button>
      )}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}
