import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTAButton from "../components/CTAButton";
import TiltImage from "../components/TiltImage";
import RevealOnScroll from "../components/RevealOnScroll";
import TagCloud from "../components/TagCloud";
import ToolIcon from "../components/ToolIcon";
import ProjectCard from "../components/ProjectCard";
import ClothBackground from "../components/ClothBackground";
import { portfolioPage, nav, site, projects } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import portraitSide from "../assets/img/portrait-side.jpg";

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
            <button
              onClick={() => scrollTo(aboutRef)}
              className={`underline-draw hidden transition-colors sm:inline ${active === "about" ? "text-ink" : "text-ink/45"}`}
            >
              {tr(nav.aboutMe)}
            </button>
            <button
              onClick={() => scrollTo(projectsRef)}
              className={`underline-draw hidden transition-colors sm:inline ${active === "projects" ? "text-ink" : "text-ink/45"}`}
            >
              {tr(nav.myProjects)}
            </button>
          </>
        }
      />

      <div className="relative">
        <ClothBackground className="absolute inset-0" />

        <section className="relative z-10 mx-auto max-w-6xl grid items-center gap-14 px-5 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <RevealOnScroll>
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
            <p className="mt-6 max-w-md text-lg font-semibold text-ink-soft">{tr(portfolioPage.subtitle)}</p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft/90">{tr(portfolioPage.intro)}</p>
            <CTAButton className="mt-10">
              {lang === "es" ? "¿Algún proyecto en mente? ¡Hablemos!" : "Have a project in mind? Let's talk!"}
            </CTAButton>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <TiltImage src={portraitSide} alt={site.name} className="aspect-[16/10] w-full shadow-2xl shadow-black/10" />
          </RevealOnScroll>
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

        <section ref={projectsRef} id="projects" className="mt-44 scroll-mt-28 sm:mt-52">
          <RevealOnScroll>
            <h2 className="font-display text-5xl font-extrabold text-ink sm:text-6xl">{tr(portfolioPage.projectsTitle)}</h2>
          </RevealOnScroll>
          <div className="mt-14 flex flex-col gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
