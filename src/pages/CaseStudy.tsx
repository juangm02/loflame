import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTAButton from "../components/CTAButton";
import RevealOnScroll from "../components/RevealOnScroll";
import ImagePlaceholder from "../components/ImagePlaceholder";
import ArchitectureTree from "../components/ArchitectureTree";
import IdeaBoardMockup from "../components/IdeaBoardMockup";
import FigmaEmbed from "../components/FigmaEmbed";
import CaseStudyTabs from "../components/CaseStudyTabs";
import { caseStudies, caseStudyNav, projects, nav, cta, type Bilingual } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

const NAV_SLUGS = ["datascope", "juicio", "corigin", "hospital-sjd", "arrelat"];

export default function CaseStudy() {
  const { slug = "" } = useParams();
  const { tr } = useLanguage();
  const study = caseStudies[slug];
  const meta = projects.find((p) => p.slug === slug);

  if (!study || !meta) return <Navigate to="/" replace />;

  return (
    <div>
      <Header
        right={
          <Link to="/#projects" className="underline-draw inline-flex items-center gap-1.5">
            <span className="transition-transform group-hover:-translate-x-1">←</span> {tr(nav.back)}
          </Link>
        }
      />

      <main className="mx-auto max-w-6xl px-5 pb-32 pt-8 sm:px-8 sm:pt-10">
        <RevealOnScroll>
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            {tr({ es: "Diseño de Producto (UX/UI)", en: "Product Design (UX/UI)" })}
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={0.05}>
          <CaseStudyTabs
            items={caseStudyNav.map((label, i) => {
              const targetSlug = NAV_SLUGS[i];
              return {
                key: targetSlug,
                label: tr(label),
                to: `/proyectos/${targetSlug}`,
                active: targetSlug === slug,
                disabled: !!projects.find((p) => p.slug === targetSlug)?.disabled,
              };
            })}
          />
        </RevealOnScroll>

        {study.tagline && (
          <RevealOnScroll delay={0.08} className="mt-10">
            <span className="italic font-display text-sm font-semibold uppercase tracking-[0.15em] text-ink/40">
              {study.tagline}
            </span>
          </RevealOnScroll>
        )}

        <RevealOnScroll delay={0.1}>
          <p className={`max-w-3xl font-display text-3xl font-bold leading-snug text-ink sm:text-4xl lg:text-5xl ${study.tagline ? "mt-3" : "mt-10"}`}>
            {tr(study.headline)}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div
            className="relative mt-14 flex h-64 items-end overflow-hidden rounded-3xl p-8 sm:h-80"
            style={{ background: `linear-gradient(135deg, ${meta.accent}, #0b0f22)` }}
          >
            <BrowserMock accent={meta.accent} />
            <span className="relative font-display text-3xl font-extrabold text-white sm:text-4xl">
              {tr(study.briefTitle)}
            </span>
          </div>
        </RevealOnScroll>

        {study.heroImages && study.heroImages.length > 0 && (
          <RevealOnScroll delay={0.18} className="mt-6 grid gap-5 sm:grid-cols-2">
            {study.heroImages.map((img, i) => (
              <ImagePlaceholder key={i} label={tr(img)} className="aspect-[4/3]" />
            ))}
          </RevealOnScroll>
        )}

        <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_320px]">
          <RevealOnScroll className="space-y-5">
            {study.briefParagraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-soft">
                {tr(p)}
              </p>
            ))}
          </RevealOnScroll>

          <RevealOnScroll delay={0.08} className="flex flex-col gap-5 rounded-2xl border border-ink/8 bg-card/50 p-6 text-sm">
            <MetaRow label={tr({ es: "Empresa", en: "Company" })} value={tr(study.meta.company)} />
            {study.meta.period && (
              <MetaRow label={tr({ es: "Periodo", en: "Period" })} value={tr(study.meta.period)} />
            )}
            <MetaRow label={tr({ es: "Rol", en: "Role" })} value={tr(study.meta.role)} sub={tr(study.meta.roleDetail)} />
            <MetaRow
              label={tr({ es: "Equipo (Product)", en: "Team (Product)" })}
              value={study.meta.team.map((m) => tr(m)).join(", ")}
            />
          </RevealOnScroll>
        </section>

        <section className="mt-32 grid items-center gap-10 lg:grid-cols-2">
          <RevealOnScroll>
            <div
              className="aspect-square w-full max-w-sm rounded-3xl"
              style={{ background: `linear-gradient(160deg, ${meta.accent}22, ${meta.accent}55)` }}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.approachTitle)}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(study.approach)}</p>
          </RevealOnScroll>
        </section>

        <section className="mt-32">
          <RevealOnScroll>
            <h2 className="text-center font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.objectivesTitle)}</h2>
          </RevealOnScroll>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {study.objectives.map((obj, i) => (
              <RevealOnScroll key={i} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-ink/8 bg-card/50 p-6">
                  <ObjectiveIcon index={i} accent={meta.accent} />
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{tr(obj)}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          {study.objectivesPlaceholder && (
            <RevealOnScroll delay={0.1} className="mt-8">
              <ImagePlaceholder label={tr(study.objectivesPlaceholder)} />
            </RevealOnScroll>
          )}
        </section>

        {(() => {
          const blocks: { title: Bilingual; body?: Bilingual; list?: Bilingual[] }[] = [];
          if (study.solvingTitle && study.solving) blocks.push({ title: study.solvingTitle, body: study.solving });
          if (study.scope) blocks.push({ title: study.scope.title, body: study.scope.body });
          if (study.designChallenge) blocks.push({ title: study.designChallenge.title, body: study.designChallenge.body });
          if (study.whoTitle && study.who) blocks.push({ title: study.whoTitle, body: study.who });
          if (study.needsTitle && study.needs) blocks.push({ title: study.needsTitle, list: study.needs });
          if (blocks.length === 0) return null;
          return (
            <section className="mt-32 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {blocks.map((block, i) => (
                <RevealOnScroll key={i} delay={i * 0.06}>
                  <h3 className="font-display text-2xl font-extrabold text-ink">{tr(block.title)}</h3>
                  {block.body && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{tr(block.body)}</p>}
                  {block.list && (
                    <ul className="mt-3 space-y-2">
                      {block.list.map((n, j) => (
                        <li key={j} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                          {tr(n)}
                        </li>
                      ))}
                    </ul>
                  )}
                </RevealOnScroll>
              ))}
            </section>
          );
        })()}

        {study.confidentiality && (
          <RevealOnScroll className="mt-24">
            <div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper-dim/60 p-5">
              <span className="mt-0.5 text-lg">🔒</span>
              <div>
                <p className="text-sm font-bold text-ink">
                  {tr({ es: "Nota sobre confidencialidad:", en: "Confidentiality note:" })}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{tr(study.confidentiality)}</p>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {study.designThinking && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">Design Thinking</h2>
            </RevealOnScroll>
            <div className="mt-14 grid gap-4 no-scrollbar sm:grid-cols-5">
              {study.designThinking.map((phase, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-ink/8 bg-card/50 p-5">
                    <p className="text-sm font-extrabold text-ink">{tr(phase.phase)}</p>
                    <ul className="mt-3 space-y-1.5">
                      {phase.items.map((item, j) => (
                        <li key={j} className="text-xs leading-relaxed text-ink-soft">
                          {tr(item)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}

        {study.processSections?.map((proc, i) => (
          <section key={i} className="mt-32">
            <RevealOnScroll
              className={proc.highlight ? "rounded-3xl bg-navy px-6 py-10 sm:px-12 sm:py-14" : undefined}
            >
              <h2
                className={`font-display text-4xl font-extrabold sm:text-5xl ${
                  proc.highlight ? "text-fixed-light" : "text-ink"
                }`}
              >
                {tr(proc.title)}
              </h2>
              <p
                className={`mt-5 max-w-2xl text-[15px] leading-relaxed ${
                  proc.highlight ? "text-fixed-light/70" : "text-ink-soft"
                }`}
              >
                {tr(proc.body)}
              </p>
              {proc.bullets && (
                <ul className="mt-5 max-w-2xl space-y-2">
                  {proc.bullets.map((b, j) => (
                    <li
                      key={j}
                      className={`flex gap-2 text-sm leading-relaxed ${
                        proc.highlight ? "text-fixed-light/80" : "text-ink-soft"
                      }`}
                    >
                      <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${proc.highlight ? "bg-paper/50" : "bg-ink/40"}`} />
                      {tr(b)}
                    </li>
                  ))}
                </ul>
              )}
            </RevealOnScroll>
            {proc.placeholders && proc.placeholders.length > 0 && (
              <div className={`grid gap-5 ${proc.placeholders.length > 1 ? "sm:grid-cols-2" : ""} mt-8`}>
                {proc.placeholders.map((ph, j) => (
                  <RevealOnScroll key={j} delay={0.06 + j * 0.05}>
                    <ImagePlaceholder label={tr(ph)} className="aspect-[4/3]" />
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </section>
        ))}

        {study.research && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.research.title)}</h2>
              <p className="mt-2 text-lg font-semibold text-ink-soft">{tr(study.research.subtitle)}</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.06} className="mt-6 max-w-3xl space-y-4">
              <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.research.body)}</p>
              {study.research.segmentationNote && (
                <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.research.segmentationNote)}</p>
              )}
            </RevealOnScroll>
            {study.research.categories && (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {study.research.categories.map((cat, i) => (
                  <RevealOnScroll key={i} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-ink/8 bg-card/50 p-5">
                      <p className="text-sm font-extrabold text-ink">{tr(cat.title)}</p>
                      <ol className="mt-3 space-y-2.5">
                        {cat.questions.map((q, j) => (
                          <li key={j} className="text-xs leading-relaxed text-ink-soft">
                            {tr(q)}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            )}
            {study.research.quotes && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {study.research.quotes.map((q, i) => (
                  <RevealOnScroll key={i} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-ink/8 bg-card/50 p-5">
                      <p className="font-display text-2xl leading-none text-ink/15">"</p>
                      <p className="mt-1 text-sm italic leading-relaxed text-ink-soft">{tr(q)}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            )}
            {study.research.placeholder && (
              <RevealOnScroll delay={0.1} className="mt-8">
                <ImagePlaceholder label={tr(study.research.placeholder)} />
              </RevealOnScroll>
            )}
          </section>
        )}

        {study.problemStatement && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="text-center font-display text-4xl font-extrabold text-ink sm:text-5xl">
                {tr(study.problemStatement.title)}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed text-ink-soft">
                {tr(study.problemStatement.intro)}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.06} className="mt-8 rounded-3xl bg-navy px-8 py-12 text-center sm:px-16">
              <p className="mx-auto max-w-2xl font-display text-xl font-bold leading-snug text-fixed-light sm:text-2xl">
                {tr(study.problemStatement.quote)}
              </p>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-fixed-light/60">
                {tr(study.problemStatement.detail)}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1} className="mt-6 flex flex-wrap justify-center gap-2">
              {study.problemStatement.tags.map((tag, i) => (
                <span key={i} className="rounded-full bg-navy/5 px-3.5 py-1 text-xs font-semibold text-ink/55">
                  {tr(tag)}
                </span>
              ))}
            </RevealOnScroll>
          </section>
        )}

        {study.architecture &&
          (study.architecture.tree ? (
            <section className="mt-32">
              <RevealOnScroll className="max-w-2xl">
                <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.architecture.title)}</h2>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(study.architecture.body)}</p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1} className="mt-12">
                <ArchitectureTree
                  root={tr(study.architecture.tree.root)}
                  branches={study.architecture.tree.branches.map((b) => ({
                    title: tr(b.title),
                    groups: b.groups.map((g) => ({ title: tr(g.title), items: g.items.map((it) => tr(it)) })),
                  }))}
                />
              </RevealOnScroll>
            </section>
          ) : (
            <section className="mt-32 grid items-center gap-10 lg:grid-cols-2">
              <RevealOnScroll>
                <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.architecture.title)}</h2>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(study.architecture.body)}</p>
              </RevealOnScroll>
              {study.architecture.placeholder && (
                <RevealOnScroll delay={0.08}>
                  <ImagePlaceholder label={tr(study.architecture.placeholder)} className="aspect-[4/3]" />
                </RevealOnScroll>
              )}
            </section>
          ))}

        {study.prototype && (
          <section className="mt-32">
            <RevealOnScroll className="max-w-2xl">
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.prototype.title)}</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(study.prototype.body)}</p>
            </RevealOnScroll>

            {study.prototype.embedUrl ? (
              <RevealOnScroll delay={0.1} className="mt-12">
                <FigmaEmbed url={study.prototype.embedUrl} title={tr(study.prototype.title)} />
                <p className="mt-3 text-center text-xs text-ink/40">
                  {tr({
                    es: "Prototipo interactivo — hacé clic y navegá por las pantallas.",
                    en: "Interactive prototype — click through the screens.",
                  })}
                </p>
              </RevealOnScroll>
            ) : study.prototype.mockup ? (
              <RevealOnScroll delay={0.1} className="mt-12">
                <IdeaBoardMockup
                  appName={study.prototype.mockup.appName}
                  tabs={study.prototype.mockup.tabs}
                  cards={study.prototype.mockup.cards.map((c) => ({ title: tr(c.title), tags: c.tags, date: c.date }))}
                  detail={{
                    title: tr(study.prototype.mockup.detail.title),
                    body: tr(study.prototype.mockup.detail.body),
                    avatarCount: study.prototype.mockup.detail.avatarCount,
                  }}
                  notes={study.prototype.mockup.notes.map((n) => ({ text: tr(n.text), author: n.author, color: n.color }))}
                />
              </RevealOnScroll>
            ) : (
              study.prototype.placeholder && (
                <RevealOnScroll delay={0.1} className="mt-12">
                  <ImagePlaceholder label={tr(study.prototype.placeholder)} className="aspect-[4/3]" />
                </RevealOnScroll>
              )
            )}
          </section>
        )}

        {study.opportunities && (
          <section className="mt-32 grid gap-10 lg:grid-cols-2">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.opportunities.title)}</h2>
              <p className="mt-2 text-lg font-semibold text-ink-soft">{tr(study.opportunities.subtitle)}</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.opportunities.body)}</p>
              {study.opportunities.findings && (
                <ul className="mt-4 space-y-2">
                  {study.opportunities.findings.map((f, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                      {tr(f)}
                    </li>
                  ))}
                </ul>
              )}
            </RevealOnScroll>
          </section>
        )}

        {study.reideate && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.reideate.title)}</h2>
              <p className="mt-2 text-lg font-semibold text-ink-soft">{tr(study.reideate.subtitle)}</p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.06} className="mt-6 max-w-3xl">
              <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.reideate.body)}</p>
            </RevealOnScroll>
          </section>
        )}

        {study.onboarding && (
          <section className="mt-32 grid items-center gap-10 lg:grid-cols-2">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.onboarding.title)}</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(study.onboarding.body)}</p>
            </RevealOnScroll>
            {study.onboarding.placeholder && (
              <RevealOnScroll delay={0.08}>
                <ImagePlaceholder label={tr(study.onboarding.placeholder)} className="aspect-[4/3]" />
              </RevealOnScroll>
            )}
          </section>
        )}

        {study.featureShowcase && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.featureShowcase.title)}</h2>
              <p className="mt-2 text-lg font-semibold text-ink-soft">{tr(study.featureShowcase.subtitle)}</p>
            </RevealOnScroll>
            <div className="mt-14 flex flex-col gap-24">
              {study.featureShowcase.features.map((f, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-14">
                    <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                      <ImagePlaceholder label={tr(f.placeholder)} className="aspect-[4/3]" />
                    </div>
                    <div>
                      {f.status && (
                        <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-ink/50">
                          {tr(f.status)}
                        </span>
                      )}
                      <h3 className="mt-3 font-display text-2xl font-extrabold text-ink">{tr(f.title)}</h3>
                      {f.subtitle && <p className="mt-1 text-sm font-semibold text-ink-soft">{tr(f.subtitle)}</p>}
                      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{tr(f.body)}</p>
                      {f.bullets && (
                        <ul className="mt-5 space-y-4">
                          {f.bullets.map((b, j) => (
                            <li key={j}>
                              <p className="text-sm font-bold text-ink">{tr(b.title)}</p>
                              <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{tr(b.body)}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}

        {study.testimonials && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="text-center font-display text-4xl font-extrabold text-ink sm:text-5xl">
                {tr(study.testimonials.title)}
              </h2>
              <p className="mt-2 text-center text-sm font-semibold uppercase tracking-wide text-ink/40">
                {tr(study.testimonials.subtitle)}
              </p>
            </RevealOnScroll>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {study.testimonials.quotes.map((q, i) => (
                <RevealOnScroll key={i} delay={i * 0.04}>
                  <div className="h-full rounded-2xl border border-ink/8 bg-card/50 p-6">
                    <p className="font-display text-3xl leading-none text-ink/15">"</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{tr(q)}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        )}

        {study.reflection && (
          <section className="mt-32">
            <RevealOnScroll className="max-w-3xl space-y-4">
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.reflection.title)}</h2>
              <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.reflection.body)}</p>
              {study.reflection.paragraphs?.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-ink-soft">
                  {tr(p)}
                </p>
              ))}
            </RevealOnScroll>
            {study.reflection.placeholder && (
              <RevealOnScroll delay={0.08} className="mt-8 max-w-3xl">
                <ImagePlaceholder label={tr(study.reflection.placeholder)} className="aspect-[16/7]" />
              </RevealOnScroll>
            )}
            {study.reflection.pullQuote && (
              <RevealOnScroll delay={0.1} className="mt-10 max-w-2xl">
                <p className="font-display text-2xl font-semibold italic leading-snug text-ink sm:text-3xl">
                  “{tr(study.reflection.pullQuote)}”
                </p>
              </RevealOnScroll>
            )}
          </section>
        )}

        <RevealOnScroll className="mt-36 flex flex-col items-center gap-6 rounded-3xl border border-ink/8 bg-card/50 px-6 py-16 text-center">
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-fixed-light"
          >
            ✦
          </motion.span>
          <h2 className="max-w-md font-display text-3xl font-extrabold text-ink">{tr(cta.exploreProcess)}</h2>
          <p className="max-w-sm text-sm text-ink-soft">{tr(cta.exploreProcessSub)}</p>
          <CTAButton href="#" variant="dark">
            {tr(cta.goToFigma)}
          </CTAButton>
          <a
            href="#top"
            className="underline-draw mt-2 text-sm font-semibold text-ink/50"
          >
            {tr(nav.backToTop)}
          </a>
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  );
}

function MetaRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-ink/40">{label}</p>
      <p className="mt-1 font-semibold text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-soft">{sub}</p>}
    </div>
  );
}

function BrowserMock({ accent }: { accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-6 top-6 hidden w-56 rounded-xl bg-card/95 p-3 shadow-2xl sm:block"
    >
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="h-2 w-3/4 rounded-full" style={{ background: accent, opacity: 0.7 }} />
        <div className="h-2 w-1/2 rounded-full bg-ink/10" />
        <div className="h-10 w-full rounded-lg" style={{ background: `${accent}30` }} />
      </div>
    </motion.div>
  );
}

function ObjectiveIcon({ index, accent }: { index: number; accent: string }) {
  const icons = [
    <path key="a" d="M4 12l5 5L20 6" />,
    <path key="b" d="M12 3v18M3 12h18" />,
    <path key="c" d="M4 20l6-6M14 4l6 6-8 8-6-6 8-8Z" />,
  ];
  return (
    <span
      className="flex h-10 w-10 items-center justify-center rounded-xl"
      style={{ background: `${accent}18`, color: accent }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icons[index % icons.length]}
      </svg>
    </span>
  );
}
