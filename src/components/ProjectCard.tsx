import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { ProjectMeta } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { cta } from "../data/content";
import { logos, covers } from "../lib/projectAssets";
import { resolveAccent, useIsDarkTheme } from "../lib/useIsDarkTheme";
import RevealOnScroll from "./RevealOnScroll";

const MotionLink = motion.create(Link);

export default function ProjectCard({ project, index }: { project: ProjectMeta; index: number }) {
  const { tr } = useLanguage();
  const cover = covers[project.cover];
  const logo = logos[project.logo];
  const initial = project.name.trim().charAt(0).toUpperCase();
  const accent = resolveAccent(project.accent, project.accentDark, useIsDarkTheme());

  const Wrapper = project.disabled ? motion.div : MotionLink;
  const wrapperProps = project.disabled ? {} : { to: `/proyectos/${project.slug}` };

  return (
    <RevealOnScroll delay={index * 0.05}>
      <Wrapper
        {...wrapperProps}
        whileHover={project.disabled ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="group block overflow-hidden rounded-3xl border border-ink/8 bg-card/60 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-auto sm:w-64 sm:shrink-0">
            {cover ? (
              <img
                src={cover}
                alt={project.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  background: `linear-gradient(140deg, ${accent}, #10152a)`,
                }}
              >
                <MonogramMark letter={initial} />
              </div>
            )}
            {project.disabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">
                  {tr(cta.underConstruction)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3.5 p-7 sm:p-9">
            <div className="flex items-center gap-3">
              {logo ? (
                <img
                  src={logo}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-ink/10"
                />
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

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wide text-ink/45">
              {project.tags.map((tag, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-ink/20">·</span>}
                  {tr(tag)}
                </span>
              ))}
              <span className="text-ink/20">·</span>
              <span>{project.year}</span>
              <span className="text-ink/20">·</span>
              <span>{tr(project.location)}</span>
            </div>

            <p className="text-[15px] leading-relaxed text-ink-soft">{tr(project.description)}</p>

            {!project.disabled && (
              <span className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-bold text-ink-action">
                <span className="underline-draw">{tr(cta.goToProject)}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            )}
          </div>
        </div>
      </Wrapper>
    </RevealOnScroll>
  );
}

function MonogramMark({ letter }: { letter: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute h-24 w-24 rotate-6 rounded-2xl bg-white/10" />
      <div className="absolute h-24 w-24 -rotate-6 translate-x-6 translate-y-4 rounded-2xl bg-white/10" />
      <span className="relative font-display text-4xl font-extrabold text-white">{letter}</span>
    </div>
  );
}
