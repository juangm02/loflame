import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTAButton from "../components/CTAButton";
import RevealOnScroll from "../components/RevealOnScroll";
import ImagePlaceholder, { PlaceholderNumberBadge } from "../components/ImagePlaceholder";
import ArchitectureTree from "../components/ArchitectureTree";
import IdeaBoardMockup from "../components/IdeaBoardMockup";
import FigmaEmbed from "../components/FigmaEmbed";
import CaseStudyTabs from "../components/CaseStudyTabs";
import CaseStudyVideo from "../components/CaseStudyVideo";
import ImageCarousel from "../components/ImageCarousel";
import StepsChain from "../components/StepsChain";
import ObjectiveIcon from "../components/ObjectiveIcon";
import ObjectivesScrollShowcase from "../components/ObjectivesScrollShowcase";
import {
  caseStudies,
  caseStudyNav,
  projects,
  nav,
  cta,
  type Bilingual,
  type PlaceholderVideo,
  type PlaceholderImage,
  type CaseStudyContent,
} from "../data/content";
import { useLanguage } from "../context/LanguageContext";
import { resolveAccent, useIsDarkTheme } from "../lib/useIsDarkTheme";
import { caseStudyVideos, caseStudyComparativaImages, caseStudyImages } from "../lib/caseStudyMedia";

function isPlaceholderVideo(ph: Bilingual | PlaceholderVideo | PlaceholderImage): ph is PlaceholderVideo {
  return "videoKey" in ph;
}

function isPlaceholderImage(ph: Bilingual | PlaceholderVideo | PlaceholderImage): ph is PlaceholderImage {
  return "imageKey" in ph;
}

const NAV_SLUGS = ["datascope", "juicio", "corigin", "hospital-sjd", "arrelat"];

// Temporary: hide the "explore the rest of my process" closing CTA block on
// every case study. Flip back to true to restore it — this is the only
// line that needs to change.
const SHOW_EXPLORE_PROCESS = false;

export default function CaseStudy() {
  const { slug = "" } = useParams();
  const { tr } = useLanguage();
  const isDark = useIsDarkTheme();
  const study = caseStudies[slug];
  const meta = projects.find((p) => p.slug === slug);

  if (!study || !meta) return <Navigate to="/" replace />;

  const accent = resolveAccent(meta.accent, meta.accentDark, isDark);
  // Numbers every still-pending ImagePlaceholder in top-to-bottom render
  // order, restarting at 1 for each case study. Lets Juan drop numbered
  // asset folders per project and tell us "03 -> this file" instead of
  // describing which dashed box he means.
  let placeholderCount = 0;
  const nextPlaceholderNumber = () => ++placeholderCount;
  // Resolves a media slot to a real <img> when its imageKey is wired up in
  // caseStudyMedia.ts, falling back to the numbered dashed placeholder
  // otherwise. Shared by the research/onboarding/featureShowcase sections.
  //
  // `rowBox`, when given, letterboxes the resolved image instead of
  // rendering it at natural size: a fixed-aspect box (bg-paper-dim) with
  // the image inside sized via object-contain, so it's never cropped, and
  // every sibling in the same grid row still shares the same box height —
  // an image narrower/wider than the box's own aspect just gets a plain
  // background margin on the sides it doesn't fill, rather than losing any
  // of itself to a crop. (Object-cover + a shared aspect was tried first
  // per an earlier ask to keep rows visually aligned, but that meant
  // cropping almost every photo to fit — letterboxing is the version of
  // "aligned" that never cuts anything off.) Leave it unset for a lone
  // image with no row siblings, where natural aspect with no box is fine.
  function renderMediaSlot(ph: Bilingual | PlaceholderImage | undefined, placeholderClassName?: string, rowBox?: string) {
    if (!ph) return null;
    if (isPlaceholderImage(ph)) {
      const src = caseStudyImages[ph.imageKey];
      if (src) {
        const img = <img src={src} alt={tr(ph.alt)} className={rowBox ? "max-h-full max-w-full object-contain" : "w-full rounded-2xl border border-ink/10"} />;
        return rowBox ? (
          <div className={`flex items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-paper-dim ${rowBox}`}>
            {img}
          </div>
        ) : (
          img
        );
      }
      return <ImagePlaceholder label={tr(ph.alt)} number={nextPlaceholderNumber()} className={placeholderClassName ?? rowBox} />;
    }
    return <ImagePlaceholder label={tr(ph)} number={nextPlaceholderNumber()} className={placeholderClassName ?? rowBox} />;
  }
  // Datascope's research section interleaves a real image between its two
  // paragraphs instead of stacking them together — scoped to this one case
  // study since it's the only one with images wired up for that slot.
  const inlineResearchImage = slug === "datascope";
  // Renders a feature's title/subtitle/body/bullets/status — factored out
  // so Datascope's restructured featureShowcase (see below) can reuse it
  // outside the normal per-feature image+text pairing.
  type FeatureShowcaseItem = NonNullable<CaseStudyContent["featureShowcase"]>["features"][number];
  function renderFeatureText(f: FeatureShowcaseItem) {
    return (
      <>
        {f.status && (
          <span className="inline-block rounded-full bg-accent/5 px-3 py-1 text-xs font-semibold text-ink/50">
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
      </>
    );
  }
  // Datascope only: the first feature's image (Tareas Asignadas carousel)
  // runs full width instead of sharing a row with its own text, that text
  // drops down to share a row with the second feature's image (Cronograma
  // calendar) instead, and the second feature's own text then continues
  // below on its own, same as the untouched "aún no liberado" ones after it.
  const restructureFeatureShowcase = slug === "datascope";
  // Hospital SJD and Arrelat's body copy runs notably longer than the
  // other case studies — at full section width the lines get long enough
  // to feel dense, so their descriptive paragraphs flow into two columns
  // instead. Datascope, Corigin and Juicio don't use processSections and
  // stay untouched.
  const twoColumnBody = slug === "hospital-sjd" || slug === "arrelat";

  return (
    <div>
      <Header
        right={
          <Link to="/#projects" className="underline-draw inline-flex items-center gap-1.5 text-ink-action">
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

        <RevealOnScroll delay={0.05} className="mt-32">
          <CaseStudyTabs
            items={caseStudyNav
              .map((label, i) => {
                const targetSlug = NAV_SLUGS[i];
                const targetProject = projects.find((p) => p.slug === targetSlug);
                return {
                  key: targetSlug,
                  label: tr(label),
                  to: `/proyectos/${targetSlug}`,
                  active: targetSlug === slug,
                  disabled: !!targetProject?.disabled,
                  hidden: !!targetProject?.hidden,
                };
              })
              .filter((item) => !item.hidden)}
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
          {(() => {
            const briefPhoto = study.briefImage && caseStudyImages[study.briefImage.imageKey];
            return (
              <div
                className={`relative mt-14 flex h-64 items-end overflow-hidden rounded-3xl p-8 sm:h-80 ${briefPhoto ? "justify-end" : ""}`}
                style={briefPhoto ? undefined : { background: `linear-gradient(135deg, ${accent}, #0b0f22)` }}
              >
                {briefPhoto ? (
                  <>
                    {/* object-cover, filling the box edge to edge — the
                        source (see caseStudyMedia.ts) is pre-cropped to
                        this box's own aspect, so cover barely trims
                        anything beyond that. object-contain was tried
                        first but left ugly bars on the sides. */}
                    <img
                      src={briefPhoto}
                      alt={tr(study.briefImage!.alt)}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Vignette so the bottom edge (where the title sits)
                        fades in a bit more gently than a hard photo cutoff. */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  </>
                ) : (
                  <BrowserMock accent={accent} />
                )}
                {!briefPhoto && <PlaceholderNumberBadge number={nextPlaceholderNumber()} />}
                <span className="relative font-display text-3xl font-extrabold text-white sm:text-4xl">
                  {tr(study.briefTitle)}
                </span>
              </div>
            );
          })()}
        </RevealOnScroll>

        {study.heroImages && study.heroImages.length > 0 && (
          <RevealOnScroll delay={0.18} className={`mt-6 grid gap-5 ${study.heroImages.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {study.heroImages.map((img, i) => (
              <div key={i}>
                {renderMediaSlot(img, "aspect-[4/3]", study.heroImages!.length > 1 ? "aspect-video" : undefined)}
              </div>
            ))}
          </RevealOnScroll>
        )}

        <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_320px]">
          <RevealOnScroll className={`space-y-5 ${twoColumnBody ? "sm:columns-2 sm:gap-x-10 sm:space-y-0" : ""}`}>
            {study.briefParagraphs.map((p, i) => (
              <p key={i} className={`text-[15px] leading-relaxed text-ink-soft ${twoColumnBody ? "sm:mb-5" : ""}`}>
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
            {study.approachImage && caseStudyImages[study.approachImage.key] ? (
              <img
                src={caseStudyImages[study.approachImage.key]}
                alt={tr(study.approachImage.alt)}
                className="aspect-square w-full max-w-sm rounded-3xl object-cover"
              />
            ) : (
              <div
                className="relative aspect-square w-full max-w-sm rounded-3xl"
                style={{ background: `linear-gradient(160deg, ${accent}22, ${accent}55)` }}
              >
                <PlaceholderNumberBadge number={nextPlaceholderNumber()} />
              </div>
            )}
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.approachTitle)}</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(study.approach)}</p>
          </RevealOnScroll>
        </section>

        <section className="mt-32">
          {study.objectivesComparativa ? (
            <ObjectivesScrollShowcase
              title={tr(study.objectivesTitle)}
              objectives={study.objectives.map((obj) => tr(obj))}
              accent={accent}
              images={{
                before: caseStudyComparativaImages.before,
                beforeAlt: tr(study.objectivesComparativa.beforeAlt),
                after: caseStudyComparativaImages.after,
                afterAlt: tr(study.objectivesComparativa.afterAlt),
              }}
            />
          ) : (
            <>
              <RevealOnScroll>
                <h2 className="text-center font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.objectivesTitle)}</h2>
              </RevealOnScroll>
              <div className="mt-14 grid gap-5 sm:grid-cols-3">
                {study.objectives.map((obj, i) => (
                  <RevealOnScroll key={i} delay={i * 0.06}>
                    <div className="h-full rounded-2xl border border-ink/8 bg-card/50 p-6">
                      <ObjectiveIcon index={i} accent={accent} />
                      <p className="mt-4 text-sm leading-relaxed text-ink-soft">{tr(obj)}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
              {study.objectivesPlaceholder && (
                <RevealOnScroll delay={0.1} className="mt-8">
                  <ImagePlaceholder label={tr(study.objectivesPlaceholder)} number={nextPlaceholderNumber()} />
                </RevealOnScroll>
              )}
              {study.objectivesImages && study.objectivesImages.length > 0 && (
                <div className={`mt-8 grid gap-5 ${study.objectivesImages.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {study.objectivesImages.map((img, i) => (
                    <RevealOnScroll key={i} delay={0.06 + i * 0.05}>
                      {renderMediaSlot(img, undefined, "aspect-video")}
                    </RevealOnScroll>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {(() => {
          const blocks: { title: Bilingual; lead?: Bilingual; body?: Bilingual; list?: Bilingual[] }[] = [];
          if (study.solvingTitle && study.solving)
            blocks.push({ title: study.solvingTitle, lead: study.solvingLead, body: study.solving });
          if (study.scope) blocks.push({ title: study.scope.title, lead: study.scope.lead, body: study.scope.body });
          if (study.designChallenge)
            blocks.push({ title: study.designChallenge.title, lead: study.designChallenge.lead, body: study.designChallenge.body });
          if (study.whoTitle && study.who) blocks.push({ title: study.whoTitle, body: study.who });
          if (study.needsTitle && study.needs) blocks.push({ title: study.needsTitle, list: study.needs });
          if (blocks.length === 0) return null;
          return (
            <section className="mt-32 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {blocks.map((block, i) => (
                <RevealOnScroll key={i} delay={i * 0.06}>
                  <h3 className="font-display text-2xl font-extrabold text-ink">{tr(block.title)}</h3>
                  {block.lead && <p className="mt-3 text-sm font-bold leading-relaxed text-ink">{tr(block.lead)}</p>}
                  {block.body && (
                    <p className={`text-sm leading-relaxed text-ink-soft ${block.lead ? "mt-2" : "mt-3"}`}>{tr(block.body)}</p>
                  )}
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

        {study.processSections
          ?.filter((proc) => !proc.hidden)
          .map((proc, i) => (
          <section key={i} className="mt-32">
            <RevealOnScroll
              className={
                proc.highlight
                  ? "rounded-3xl bg-surface-feature px-6 py-10 dark:border-[0.5px] dark:border-ghost dark:border-l-[3px] dark:border-l-accent sm:px-12 sm:py-14"
                  : undefined
              }
            >
              <h2
                className={`font-display text-4xl font-extrabold sm:text-5xl ${
                  proc.highlight ? "text-on-accent dark:text-ink" : "text-ink"
                }`}
              >
                {tr(proc.title)}
              </h2>
              {proc.leadImage && <div className="mt-5">{renderMediaSlot(proc.leadImage)}</div>}
              <div className={twoColumnBody ? "mt-5 grid gap-10 sm:grid-cols-2 lg:grid-cols-3" : undefined}>
                <p
                  className={`text-[15px] leading-relaxed ${
                    twoColumnBody ? "sm:col-span-2 lg:columns-2 lg:gap-x-10" : "mt-5 max-w-2xl"
                  } ${proc.highlight ? "text-on-accent/70 dark:text-ink-soft" : "text-ink-soft"}`}
                >
                  {tr(proc.body)}
                </p>
              </div>
              {proc.bullets && (
                <ul className="mt-5 max-w-2xl space-y-2">
                  {proc.bullets.map((b, j) => (
                    <li
                      key={j}
                      className={`flex gap-2 text-sm leading-relaxed ${
                        proc.highlight ? "text-on-accent/80 dark:text-ink-soft" : "text-ink-soft"
                      }`}
                    >
                      <span
                        className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                          proc.highlight ? "bg-on-accent/50 dark:bg-ink/40" : "bg-ink/40"
                        }`}
                      />
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
                    {isPlaceholderVideo(ph) ? (
                      (() => {
                        const video = caseStudyVideos[ph.videoKey];
                        return video ? (
                          <CaseStudyVideo
                            src={video.src}
                            poster={video.poster}
                            alt={tr(ph.alt)}
                            className="aspect-[1000/242]"
                          />
                        ) : (
                          <ImagePlaceholder label={tr(ph.alt)} number={nextPlaceholderNumber()} className="aspect-[4/3]" />
                        );
                      })()
                    ) : (
                      // Same letterbox box for both branches (real image or
                      // still-dashed placeholder) — every slot in this
                      // section's grid shares one box height (aspect-video,
                      // close to most of these renders' own ~16:9 aspect)
                      // so a row of them lines up, without cropping any of
                      // them: object-contain inside, not object-cover.
                      renderMediaSlot(ph, "aspect-[4/3]", "aspect-video")
                    )}
                  </RevealOnScroll>
                ))}
              </div>
            )}
            {proc.carousel && proc.carousel.length > 0 && (
              <div className="mt-8">
                <ImageCarousel
                  images={proc.carousel.map((img) => ({
                    src: caseStudyImages[img.imageKey],
                    alt: tr(img.alt),
                  }))}
                />
              </div>
            )}
            {proc.stepsChain && proc.stepsChain.length > 0 && (
              <RevealOnScroll delay={0.1} className="mt-8">
                <StepsChain steps={proc.stepsChain.map((s) => tr(s))} />
              </RevealOnScroll>
            )}
          </section>
        ))}

        {study.research && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.research.title)}</h2>
              <p className="mt-2 text-lg font-semibold text-ink-soft">{tr(study.research.subtitle)}</p>
            </RevealOnScroll>
            {inlineResearchImage ? (
              <>
                <RevealOnScroll delay={0.06} className="mt-6 max-w-3xl">
                  <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.research.body)}</p>
                </RevealOnScroll>
                {study.research.placeholder && (
                  <RevealOnScroll delay={0.08} className="mt-8 max-w-3xl">
                    {renderMediaSlot(study.research.placeholder)}
                  </RevealOnScroll>
                )}
                {study.research.segmentationNote && (
                  <RevealOnScroll delay={0.1} className="mt-12 max-w-3xl">
                    <p className="text-lg font-semibold text-ink-soft">{tr(study.research.segmentationNote)}</p>
                  </RevealOnScroll>
                )}
                {study.research.extraImage && (
                  <RevealOnScroll delay={0.12} className="mt-8 max-w-3xl">
                    {renderMediaSlot(study.research.extraImage)}
                  </RevealOnScroll>
                )}
              </>
            ) : (
              <RevealOnScroll delay={0.06} className="mt-6 max-w-3xl space-y-4">
                <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.research.body)}</p>
                {study.research.segmentationNote && (
                  <p className="text-[15px] leading-relaxed text-ink-soft">{tr(study.research.segmentationNote)}</p>
                )}
              </RevealOnScroll>
            )}
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
            {!inlineResearchImage && study.research.placeholder && (
              <RevealOnScroll delay={0.1} className="mt-8">
                {renderMediaSlot(study.research.placeholder)}
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
            <RevealOnScroll
              delay={0.06}
              className="mt-8 rounded-3xl bg-surface-feature px-8 py-12 text-center dark:border-[0.5px] dark:border-ghost dark:border-l-[3px] dark:border-l-accent sm:px-16"
            >
              <p className="mx-auto max-w-2xl font-display text-xl font-bold leading-snug text-on-accent dark:text-ink sm:text-2xl">
                {tr(study.problemStatement.quote)}
              </p>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-on-accent/60 dark:text-ink-soft">
                {tr(study.problemStatement.detail)}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1} className="mt-6 flex flex-wrap justify-center gap-2">
              {study.problemStatement.tags.map((tag, i) => (
                <span key={i} className="rounded-full bg-accent/5 px-3.5 py-1 text-xs font-semibold text-ink/55">
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
                {study.architecture.image && <div className="mt-8">{renderMediaSlot(study.architecture.image)}</div>}
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
                  <ImagePlaceholder label={tr(study.architecture.placeholder)} number={nextPlaceholderNumber()} className="aspect-[4/3]" />
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
              // Full-bleed: the prototype benefits from as much width as
              // possible, so it breaks out of the max-w-6xl page column
              // and hugs the viewport edges with a flat 32px margin
              // instead of staying boxed to the article's reading width.
              // Aspect ratio itself is untouched (still set on FigmaEmbed).
              <RevealOnScroll delay={0.1} className="relative left-1/2 mt-12 w-screen -translate-x-1/2 px-20">
                <FigmaEmbed url={study.prototype.embedUrl} title={tr(study.prototype.title)} />
                <p className="mt-3 text-center text-xs text-ink/40">
                  {tr({
                    es: "Prototipo interactivo: hacé clic y navegá por las pantallas.",
                    en: "Interactive prototype: click through the screens.",
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
                  <ImagePlaceholder label={tr(study.prototype.placeholder)} number={nextPlaceholderNumber()} className="aspect-[4/3]" />
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

        {study.featureShowcase && (
          <section className="mt-32">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.featureShowcase.title)}</h2>
              <p className="mt-2 text-lg font-semibold text-ink-soft">{tr(study.featureShowcase.subtitle)}</p>
              {study.featureShowcase.body && (
                <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">{tr(study.featureShowcase.body)}</p>
              )}
              {restructureFeatureShowcase && study.featureShowcase.features.length >= 2 && (
                <div className="mt-8">{renderMediaSlot(study.featureShowcase.features[0].placeholder)}</div>
              )}
            </RevealOnScroll>
            <div className="mt-24 flex flex-col gap-32">
              {restructureFeatureShowcase && study.featureShowcase.features.length >= 2 ? (
                <>
                  {/* Guía de onboarding sits between the Diseño lo-fi header (title,
                      body and feature 0's image, all one block above) and Tareas
                      Asignadas — its standalone <section> below is skipped for
                      this case study since it renders here instead. */}
                  {study.onboarding && (
                    <RevealOnScroll className="grid items-center gap-10 lg:grid-cols-2">
                      <div>
                        <h3 className="font-display text-2xl font-extrabold text-ink">{tr(study.onboarding.title)}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{tr(study.onboarding.body)}</p>
                      </div>
                      {study.onboarding.placeholder && renderMediaSlot(study.onboarding.placeholder, "aspect-[4/3]")}
                    </RevealOnScroll>
                  )}

                  {/* Feature 0's text shares this row with feature 1's image instead. */}
                  <RevealOnScroll delay={0.05}>
                    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-14">
                      <div>{renderFeatureText(study.featureShowcase.features[0])}</div>
                      <div>{renderMediaSlot(study.featureShowcase.features[1].placeholder, "aspect-[4/3]")}</div>
                    </div>
                  </RevealOnScroll>

                  {/* Feature 1's own text continues below, image-less (its image moved up above). */}
                  <RevealOnScroll delay={0.1}>{renderFeatureText(study.featureShowcase.features[1])}</RevealOnScroll>

                  {/* The rest ("aún no liberado") render normally, unaffected. */}
                  {study.featureShowcase.features.slice(2).map((f, i) => {
                    const idx = i + 2;
                    return (
                      <RevealOnScroll key={idx} delay={idx * 0.05}>
                        <div className={f.hideMedia ? "" : "grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-14"}>
                          {!f.hideMedia && (
                            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>{renderMediaSlot(f.placeholder, "aspect-[4/3]")}</div>
                          )}
                          <div>{renderFeatureText(f)}</div>
                        </div>
                      </RevealOnScroll>
                    );
                  })}
                </>
              ) : (
                study.featureShowcase.features.map((f, i) => (
                  <RevealOnScroll key={i} delay={i * 0.05}>
                    <div className={f.hideMedia ? "" : "grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-14"}>
                      {!f.hideMedia && (
                        <div className={i % 2 === 1 ? "lg:order-2" : ""}>{renderMediaSlot(f.placeholder, "aspect-[4/3]")}</div>
                      )}
                      <div>{renderFeatureText(f)}</div>
                    </div>
                  </RevealOnScroll>
                ))
              )}
            </div>
          </section>
        )}

        {!restructureFeatureShowcase && study.onboarding && (
          <section className="mt-32 grid items-center gap-10 lg:grid-cols-2">
            <RevealOnScroll>
              <h2 className="font-display text-4xl font-extrabold text-ink sm:text-5xl">{tr(study.onboarding.title)}</h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{tr(study.onboarding.body)}</p>
            </RevealOnScroll>
            {study.onboarding.placeholder && (
              <RevealOnScroll delay={0.08}>{renderMediaSlot(study.onboarding.placeholder, "aspect-[4/3]")}</RevealOnScroll>
            )}
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
                <ImagePlaceholder label={tr(study.reflection.placeholder)} number={nextPlaceholderNumber()} className="aspect-[16/7]" />
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

        {SHOW_EXPLORE_PROCESS && (
          <RevealOnScroll className="mt-36 flex flex-col items-center gap-6 rounded-3xl border border-ink/8 bg-card/50 px-6 py-16 text-center">
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent"
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
              className="underline-draw mt-2 text-sm font-semibold text-ink-action/50"
            >
              {tr(nav.backToTop)}
            </a>
          </RevealOnScroll>
        )}

      </main>

      {/* Sits outside <main> so its bottom margin (not main's own pb-32)
          is what sets the gap to the footer — pins it to a flat 48px above
          the footer's top edge no matter how tall the page content is. */}
      <div className="mx-auto mb-12 flex max-w-6xl justify-end px-5 sm:px-8">
        <a
          href="#top"
          className="underline-draw inline-flex items-center gap-2 text-sm font-semibold text-ink-action/50 transition-colors hover:text-ink-action"
        >
          {tr(nav.backToTop)}
          <ArrowUpIcon />
        </a>
      </div>

      <Footer />
    </div>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
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

