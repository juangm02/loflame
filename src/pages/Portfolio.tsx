import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTAButton from "../components/CTAButton";
import TiltImage from "../components/TiltImage";
import RevealOnScroll from "../components/RevealOnScroll";
import TagCloud from "../components/TagCloud";
import ToolIcon from "../components/ToolIcon";
import ProjectCard from "../components/ProjectCard";
import ProjectPinTabs from "../components/ProjectPinTabs";
import ClothBackground from "../components/ClothBackground";
import { Button } from "../components/ui/button";
import { portfolioPage, nav, site, projects } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import portraitSide from "../assets/img/portrait-side.jpg";

// Temporary: hide the hero portrait to preview a text-only hero. Flip back
// to true to restore it — this is the only line that needs to change.
const SHOW_HERO_IMAGE = false;

export default function Portfolio() {
  const { lang, tr } = useLanguage();
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<"about" | "projects">("about");

  useEffect(() => {
    const sections = [
      { id: "about" as const, el: aboutRef.current },
      { id: "projects" as const, el: projectsRef.current },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sections.find((s) => s.el === entry.target);
            if (match) setActive(match.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => s.el && observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <Header
        right={
          <>
            <Button
              variant="ghost"
              onClick={() => scrollTo(aboutRef)}
              className={`underline-draw hidden h-auto p-0 hover:bg-transparent sm:inline ${active === "about" ? "text-ink-action hover:text-ink-action" : "text-ink-action/45 hover:text-ink-action/45"}`}
            >
              {tr(nav.aboutMe)}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollTo(projectsRef)}
              className={`underline-draw hidden h-auto p-0 hover:bg-transparent sm:inline ${active === "projects" ? "text-ink-action hover:text-ink-action" : "text-ink-action/45 hover:text-ink-action/45"}`}
            >
              {tr(nav.myProjects)}
            </Button>
          </>
        }
      />

      <div className="relative pb-[100px]">
        <ClothBackground className="absolute inset-0" />

        <section
          className={`relative z-10 mx-auto max-w-6xl grid items-center gap-14 px-5 pt-10 sm:px-8 sm:pt-14 ${
            SHOW_HERO_IMAGE ? "lg:grid-cols-[1fr_1fr] lg:gap-16" : ""
          }`}
        >
          <RevealOnScroll className={SHOW_HERO_IMAGE ? undefined : "mx-auto max-w-2xl text-center"}>
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-ink/40">{site.name}</p>
            <h1 className="mt-4 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
              {tr(portfolioPage.title)
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </h1>
            <p className={`mt-6 max-w-md text-lg font-semibold text-ink-soft ${SHOW_HERO_IMAGE ? "" : "mx-auto"}`}>
              {tr(portfolioPage.subtitle)}
            </p>
            <p className={`mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft/90 ${SHOW_HERO_IMAGE ? "" : "mx-auto"}`}>
              {tr(portfolioPage.intro)}
            </p>
            <CTAButton className="mt-10">
              {lang === "es" ? "¿Algún proyecto en mente? ¡Hablemos!" : "Have a project in mind? Let's talk!"}
            </CTAButton>
          </RevealOnScroll>

          {SHOW_HERO_IMAGE && (
            <RevealOnScroll delay={0.1}>
              <TiltImage src={portraitSide} alt={site.name} className="aspect-[16/10] w-full shadow-2xl shadow-black/10" />
            </RevealOnScroll>
          )}
        </section>
      </div>

      <main className="mx-auto max-w-6xl px-5 pb-32 sm:px-8">
        <section ref={aboutRef} id="about" className="mt-44 scroll-mt-28 sm:mt-52">
          <RevealOnScroll>
            <h2 className="font-display text-5xl font-extrabold text-ink sm:text-6xl">{tr(portfolioPage.aboutTitle)}</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-ink-soft">{tr(portfolioPage.aboutBody)}</p>
          </RevealOnScroll>

          <div className="mt-14 rounded-3xl border border-ink/8 bg-card/50 p-8 sm:p-10">
            <TagCloud tags={portfolioPage.tags.map((tg) => (typeof tg === "string" ? tg : tr(tg)))} />
            <div className="mt-8 h-px w-full bg-ink/8" />
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-6">
              {portfolioPage.tools.map((tool) => (
                <ToolIcon key={tool.name} {...tool} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* "Mis proyectos" through the footer sits on its own slightly
          different background (paper-dim vs. the plain paper behind the
          hero/"Sobre mí") — a full-bleed frame, rounded at the top, so the
          whole stretch reads as one distinct block instead of continuing
          the page's base surface. */}
      <div className="rounded-t-[2.5rem] bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 pb-32 sm:px-8">
          <section ref={projectsRef} id="projects" className="pt-20 scroll-mt-28 sm:pt-24">
            {/* The title and ProjectPinTabs share this plain wrapper (instead
                of the title sitting in its own short RevealOnScroll box) so
                the title's sticky containing block is as tall as the whole
                pinned section below it — position: sticky only has room to
                stay pinned while scrolling for as long as its own parent box
                does, and a wrapper no taller than the title itself would give
                it nowhere to stick. */}
            <div className="relative">
              <RevealOnScroll
                // top-[96px]: the header's own real rendered height (see
                // Header.tsx — py-6/py-7 + its content), so the title sits
                // flush against it with 0px of gap once both are pinned.
                // py-4: 16px of padding inside this full-bleed-feeling
                // title band itself (above/below the text) — keep
                // ProjectPinTabs.tsx's PIN_TOP in sync if this changes,
                // it's sized to clear this block's real height.
                className="md:sticky md:top-[96px] md:z-10 md:bg-paper-dim md:py-4"
              >
                <h2 className="font-display text-5xl font-extrabold text-ink sm:text-6xl">
                  {tr(portfolioPage.projectsTitle)}
                </h2>
              </RevealOnScroll>
              {/* Desktop/tablet: scroll-pinned tabs (see ProjectPinTabs). Mobile
                  keeps the plain card list — the scroll-jacked sticky mechanic
                  is a poor fit for small viewports and mobile browser chrome. */}
              <ProjectPinTabs projects={projects.filter((project) => !project.hidden)} />
            </div>
            <div className="mt-14 flex flex-col gap-8 md:hidden">
              {projects
                .filter((project) => !project.hidden)
                .map((project, i) => (
                  <ProjectCard key={project.slug} project={project} index={i} />
                ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}
