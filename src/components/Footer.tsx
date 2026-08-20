import { motion } from "framer-motion";
import { site } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import RevealOnScroll from "./RevealOnScroll";
import LogoMark from "./LogoMark";

export default function Footer() {
  const { lang, tr } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-surface-feature text-on-accent dark:border-t-[0.5px] dark:border-ghost dark:text-ink">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
        <RevealOnScroll>
          <p className="font-display text-lg italic text-on-accent/70 dark:text-ink-soft">
            {lang === "es" ? "Gracias por tu atención" : "Thanks for your attention"} 🙂👋
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <h2 className="mt-4 max-w-xl font-display text-5xl font-bold leading-[1.05] sm:text-6xl">
            {lang === "es" ? (
              <>
                ¿Interesad@ en
                <br />
                trabajar juntos?
              </>
            ) : (
              <>
                Interested in
                <br />
                working together?
              </>
            )}
          </h2>
        </RevealOnScroll>

        <div className="mt-20 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <RevealOnScroll delay={0.1}>
            <div>
              <p className="font-display text-2xl font-bold sm:text-3xl">
                {lang === "es" ? (
                  <>
                    Drop a
                    <br />
                    message!
                  </>
                ) : (
                  <>
                    Drop a
                    <br />
                    message!
                  </>
                )}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-on-accent/80 dark:text-ink-soft">
                <li>
                  <FooterLink href="#">Be&nbsp;&nbsp;{site.behance}</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">in&nbsp;&nbsp;{site.linkedin}</FooterLink>
                </li>
                <li>
                  <FooterLink href={`mailto:${site.email}`}>✉&nbsp;&nbsp;{site.email}</FooterLink>
                </li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15} className="text-right">
            <p className="text-xs uppercase tracking-wide text-on-accent/50 dark:text-ink-soft/80">
              {tr({ es: "Diseñado y creado por", en: "Designed & created by" })}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-2 inline-flex items-center gap-2 text-lg font-bold"
            >
              <LogoMark className="h-6 w-auto" />
              Lo<span className="italic text-on-accent/70 dark:text-ink-soft">flame</span>
            </motion.div>
            <p className="mt-3 text-xs text-on-accent/40 dark:text-ink-soft/60">
              {tr({ es: "Marca personal de", en: "Personal brand by" })} <br /> {site.name}
              <br />
              2025. {tr({ es: "Todos los derechos reservados", en: "All rights reserved" })}
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="underline-draw inline-block">
      {children}
    </a>
  );
}
