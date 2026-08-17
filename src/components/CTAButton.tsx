import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

export default function CTAButton({
  children,
  href = "mailto:juangarmarquez@gmail.com",
  variant = "dark",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "dark" | "light";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.setProperty("--mx", `${x * 0.25}px`);
    el.style.setProperty("--my", `${y * 0.6}px`);
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }

  const styles =
    variant === "dark"
      ? "bg-navy text-fixed-light hover:bg-navy-soft"
      : "bg-paper text-ink hover:bg-card";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      style={{ translate: "var(--mx, 0px) var(--my, 0px)" }}
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg shadow-black/5 transition-colors duration-200 ${styles} ${className}`}
    >
      {children}
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-fixed-light/15 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-45">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </motion.a>
  );
}
