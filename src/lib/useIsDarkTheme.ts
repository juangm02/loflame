import { useEffect, useState } from "react";

/**
 * Reads the site's data-theme="dark" attribute on <html>. Used only to pick
 * between a project's `accent` and `accentDark` colors where the light-mode
 * hex fails contrast against the dark-mode page background (see
 * ProjectMeta.accentDark in data/content.ts). Not a general theme toggle —
 * the site doesn't have a user-facing light/dark switch yet.
 */
export function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.dataset.theme === "dark");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/** Resolves a project's effective accent color for the current theme. */
export function resolveAccent(accent: string, accentDark: string | undefined, isDark: boolean) {
  return isDark && accentDark ? accentDark : accent;
}
