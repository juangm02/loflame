import Header from "../components/Header";
import Footer from "../components/Footer";
import CTAButton from "../components/CTAButton";
import TiltImage from "../components/TiltImage";
import RevealOnScroll from "../components/RevealOnScroll";
import { curriculumPage, site } from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import portraitSeated from "../assets/img/portrait-seated.jpg";

export default function Curriculum() {
  const { tr } = useLanguage();

  return (
    <div>
      <Header
        right={
          <>
            <a href="#" className="underline-draw hidden sm:inline">
              Behance
            </a>
            <a href="#" className="underline-draw hidden sm:inline">
              LinkedIn
            </a>
          </>
        }
      />

      <main className="mx-auto max-w-6xl px-5 pb-32 pt-10 sm:px-8 sm:pt-14">
        <section className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <RevealOnScroll>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/40">
              {tr(curriculumPage.kicker)}
            </p>
            <h1 className="mt-4 font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl">
              {site.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-md text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {tr(curriculumPage.headline)}
            </p>
            <p className="mt-3 max-w-md text-lg text-ink-soft">{tr(curriculumPage.subline)}</p>
            <CTAButton className="mt-10">{tr({ es: "¿Algún proyecto en mente? ¡Hablemos!", en: "Have a project in mind? Let's talk!" })}</CTAButton>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <TiltImage src={portraitSeated} alt={site.name} className="aspect-[4/3] w-full shadow-2xl shadow-black/10" />
          </RevealOnScroll>
        </section>

        <section className="mt-40 grid gap-10 sm:mt-48 lg:grid-cols-[1fr_1fr]">
          <RevealOnScroll>
            <h2 className="font-display text-7xl font-extrabold uppercase leading-[0.9] text-outline sm:text-8xl">
              {tr(curriculumPage.bigLabel)
                .split("\n")
                .map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="flex flex-col justify-center gap-1.5">
            <p className="font-display text-2xl italic font-semibold text-ink">{tr(site.location)}</p>
            <a href={`mailto:${site.email}`} className="underline-draw inline-block w-fit text-lg text-ink-soft">
              {site.email}
            </a>
            <a href="tel:+34610902771" className="underline-draw inline-block w-fit text-lg text-ink-soft">
              {site.phone}
            </a>
          </RevealOnScroll>
        </section>

        <section className="mt-40 grid gap-16 sm:mt-48 sm:grid-cols-2 lg:grid-cols-3">
          <RevealOnScroll>
            <h3 className="font-display text-4xl font-extrabold text-ink">{tr(curriculumPage.softSkillsTitle)}</h3>
            <ul className="mt-5 space-y-2.5">
              {curriculumPage.softSkills.map((skill, i) => (
                <li key={i} className="text-[15px] font-medium text-ink-soft">
                  {tr(skill)}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <h3 className="font-display text-4xl font-extrabold text-ink">{tr(curriculumPage.languagesTitle)}</h3>
            <ul className="mt-5 space-y-2.5">
              {curriculumPage.languages.map((l, i) => (
                <li key={i} className="text-[15px] font-medium text-ink-soft">
                  {tr(l)}
                </li>
              ))}
            </ul>

            <h3 className="mt-14 font-display text-4xl font-extrabold text-ink">{tr(curriculumPage.educationTitle)}</h3>
            <ul className="mt-5 space-y-6">
              {curriculumPage.education.map((edu, i) => (
                <li key={i}>
                  <p className="text-[15px] font-semibold text-ink">{tr(edu.title)}</p>
                  <p className="text-[15px] text-ink-soft">{tr(edu.place)}</p>
                  <p className="text-sm text-ink/40">{edu.date}</p>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={0.16}>
            <h3 className="font-display text-4xl font-extrabold text-ink">{tr(curriculumPage.experienceTitle)}</h3>
            <ul className="mt-5 space-y-5">
              {curriculumPage.experience.map((exp, i) => (
                <li key={i}>
                  <p className="text-[15px] font-semibold text-ink">{tr(exp.title)}</p>
                  <p className="text-sm text-ink/40">{exp.date}</p>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </section>
      </main>

      <Footer />
    </div>
  );
}
