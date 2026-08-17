import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Logo from "./Logo";
import { nav } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function Header({ right }: { right?: ReactNode }) {
  const { pathname } = useLocation();
  const { lang, toggle, tr } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tabs = [
    { to: "/", label: tr(nav.portfolio), active: pathname === "/" },
    { to: "/curriculum", label: tr(nav.curriculum), active: pathname === "/curriculum" },
  ];
  const showTabs = pathname === "/" || pathname === "/curriculum";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/80 backdrop-blur-md shadow-[0_1px_0_0_var(--color-ghost)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8 sm:py-7">
        <div className="flex items-center gap-3">
          <Logo />
          <button
            onClick={toggle}
            className="flex items-center gap-1 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-ink/80 transition hover:border-ink/40 hover:text-ink cursor-pointer"
            aria-label="Toggle language"
          >
            <span className={lang === "es" ? "text-ink" : "text-ink/35"}>ES</span>
            <span className="text-ink/25">/</span>
            <span className={lang === "en" ? "text-ink" : "text-ink/35"}>EN</span>
          </button>
        </div>

        {showTabs && (
          <nav className="relative flex items-center gap-1 rounded-full bg-paper-dim/80 p-1 shadow-inner">
            {tabs.map((tabItem) => (
              <Link
                key={tabItem.to}
                to={tabItem.to}
                className="relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors"
              >
                {tabItem.active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-navy"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className={`relative z-10 ${tabItem.active ? "text-fixed-light" : "text-ink/70"}`}>
                  {tabItem.label}
                </span>
              </Link>
            ))}
          </nav>
        )}

        <div className="flex min-w-[90px] items-center justify-end gap-4 text-sm font-semibold sm:min-w-[180px]">
          {right}
        </div>
      </div>
    </header>
  );
}
