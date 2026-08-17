import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Bilingual, Lang } from "../data/content";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  setLang: (lang: Lang) => void;
  tr: (value: Bilingual) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((prev) => (prev === "es" ? "en" : "es")),
      tr: (value: Bilingual) => value[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
