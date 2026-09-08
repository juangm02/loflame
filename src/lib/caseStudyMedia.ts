import hospitalKpiCards from "../assets/video/hospital-sjd-kpi-cards.mp4";
import hospitalKpiCardsPoster from "../assets/img/hospital-sjd-kpi-cards-poster.jpg";
import hospitalComparativa01 from "../assets/img/hospital-sjd-comparativa-01.webp";
import hospitalComparativa02 from "../assets/img/hospital-sjd-comparativa-02.webp";
import hospitalApproach from "../assets/img/hospital-sjd-approach.webp";
import hospitalHLiquid from "../assets/img/hospital-sjd-hliquid.webp";
import hospitalMatrizPriorizacion from "../assets/img/hospital-sjd-matriz-priorizacion.svg";
import hospitalLobby from "../assets/img/hospital-sjd-lobby.webp";
import hospitalDocumentation from "../assets/img/hospital-sjd-documentation.webp";
import datascopeApproach from "../assets/img/datascope-approach.webp";
import datascopeResearchSurvey from "../assets/img/datascope-research-survey.webp";
import datascopeResearchSurvey2 from "../assets/img/datascope-research-survey-2.webp";
import datascopeOnboarding from "../assets/img/datascope-onboarding.webp";
import datascopeTasksCarousel from "../assets/img/datascope-tasks-carousel.webp";
import datascopeTasksCalendar from "../assets/img/datascope-tasks-calendar.webp";
import coriginArchitecture from "../assets/img/corigin-architecture.webp";
import arrelatFoundation from "../assets/img/arrelat-foundation.webp";
import arrelatHeroTitle from "../assets/img/arrelat-hero-title.webp";
import arrelatHeroForest from "../assets/img/arrelat-hero-forest.webp";
import arrelatApproach from "../assets/img/arrelat-approach.webp";
import arrelatResearchDiagram from "../assets/img/arrelat-research-diagram.webp";
import arrelatNeedsMap from "../assets/img/arrelat-needs-map.webp";
import arrelatConceptQuote from "../assets/img/arrelat-concept-quote.webp";
import arrelatForestMetaphor1 from "../assets/img/arrelat-forest-metaphor-1.webp";
import arrelatForestMetaphor2 from "../assets/img/arrelat-forest-metaphor-2.webp";
import arrelatForestMetaphor3 from "../assets/img/arrelat-forest-metaphor-3.webp";
import arrelatInteractionArc from "../assets/img/arrelat-interaction-arc.webp";
import arrelatThreadColors from "../assets/img/arrelat-thread-colors.webp";
import arrelatApp1 from "../assets/img/arrelat-app-1.webp";
import arrelatApp2 from "../assets/img/arrelat-app-2.webp";
import arrelatApp3 from "../assets/img/arrelat-app-3.webp";
import arrelatRoleObserver from "../assets/img/arrelat-role-observer.webp";
import arrelatRoleNavigator from "../assets/img/arrelat-role-navigator.webp";
import arrelatRoleParticipant from "../assets/img/arrelat-role-participant.webp";
import arrelatPreservation from "../assets/img/arrelat-preservation.webp";
import arrelatFramingQuestion from "../assets/img/arrelat-framing-question.webp";

/**
 * Real media (video clips, images) referenced by key from content.ts,
 * resolved here the same way `lib/projectAssets.ts` resolves logos/covers
 * by string key — keeps content.ts asset-free.
 *
 * caseStudyVideos["hospital-kpi-cards"]: converted from a 15MB/551-frame
 * GIF export ("SANT JOAN DE DEU/Data Wall/Portfolio assets/CompF.gif") to
 * H.264 MP4 (crf 20, ~1.6MB) — same visual, ~9x lighter, plus a poster
 * frame so the <video> has something to paint before it starts playing.
 *
 * caseStudyComparativaImages: before/after screen comparison
 * ("SANT JOAN DE DEU/Data Wall/Portfolio assets/Comparats-0{1,2}.png"),
 * downsized to 1400px wide and converted PNG -> WebP (alpha preserved):
 * 1.1MB -> 124KB and 610KB -> 77KB.
 *
 * caseStudyImages["hospital-sjd-approach"]: CCC room photo
 * ("SANT JOAN DE DEU/Data Wall/Portfolio assets/Approach.jpg", 1280x1920),
 * bottom-aligned square crop (keeps the DataWall + desks, drops the plain
 * ceiling) resized to 900x900 and converted JPG -> WebP: 348KB -> 96KB.
 *
 * caseStudyImages["hospital-sjd-hliquid"]: Hospital Líquid's three-screen
 * DataWall panel ("SANT JOAN DE DEU/Data Wall/Portfolio assets/HLiquid.png",
 * 1672x941), shown at its natural aspect ratio (no crop), downsized to
 * 1400px wide and converted PNG -> WebP: 1.6MB -> 98KB.
 *
 * caseStudyImages["hospital-sjd-matriz-priorizacion"]: the workshop's
 * relevance/feasibility prioritization matrix, authored as an SVG already
 * using the site's dark tokens (#131316 paper, #1c1c22 card, #35353c
 * ghost, #f1f0ee ink), so it sits in the page rather than on it. 18KB.
 *
 * caseStudyImages["hospital-sjd-lobby"]: the hospital entrance display
 * ("SANT JOAN DE DEU/Data Wall/Portfolio assets/Intronics-Hospital-Sant-
 * Joan-de-Deu-x.jpg", 1024x576, left at native size — no detail to gain
 * from upscaling). Shadows were deep (median luma 76, 5th percentile 5)
 * against an unclipped screen, so a 0.78 gamma lift with a small contrast
 * bump opens the room without washing out the display. JPG -> WebP:
 * 259KB -> 62KB.
 *
 * caseStudyImages["hospital-sjd-documentation"]: excerpt of the DataWall
 * design-system documentation ("Desig-nare/Portfolio assets/Sant joan de
 * deu/Documentacion.png", 1020x1792 full page) — purely illustrative, not
 * meant to be legible, so instead of showing the whole tall export it's
 * cropped to the typography block + the top of the status-system block
 * (1020x362) and faded to the site's dark paper (#131316) at the top and
 * especially the bottom, so the cut into the second block reads as content
 * continuing off-frame rather than an abrupt slice. PNG -> WebP: 237KB
 * (full) -> 11KB (cropped + faded).
 *
 * Datascope images (source: "Desig-nare/Portfolio assets/Datascope/*.png",
 * UI screenshots/mockups — high highlight-clip% is just their white
 * backgrounds, not a real exposure problem, so no gamma correction was
 * applied to any of them):
 * - "datascope-approach" (02.png, 1526x968): Design approach square-crop
 *   slot, resized to 1200px wide (object-cover handles the square crop at
 *   render time). PNG -> WebP: 792KB -> 56KB.
 * - "datascope-research-survey" (03.png, 1078x606): survey template
 *   screenshot, resized to 1200px wide. PNG -> WebP: 133KB -> 48KB.
 * - "datascope-research-survey-2" (03_2.png, 2156x2398): second research
 *   image, resized to 1200px wide. PNG -> WebP: 566KB -> 89KB.
 * - "datascope-onboarding" (04.png, 582x666): left at native width (already
 *   below the 900px cap). PNG -> WebP: 192KB -> 25KB.
 * - "datascope-tasks-carousel" (05.png, 2784x822): Tareas Asignadas
 *   carousel, resized to 1800px wide. PNG -> WebP: 2.1MB -> 41KB.
 * - "datascope-tasks-calendar" (06.png, 1840x1368): Cronograma calendar
 *   mockup, resized to 1500px wide. PNG -> WebP: 680KB -> 40KB.
 *
 * caseStudyImages["corigin-architecture"]: architecture screenshot
 * ("Desig-nare/Portfolio assets/Corigin/06.png", 1208x406), left at native
 * width (already below the 1400px cap). PNG -> WebP: 108KB -> 22KB.
 *
 * Arrelat images (source: "Desig-nare/Portfolio assets/Arrelat/*", numbered
 * by the ImagePlaceholder badge each was matched to — dropped in per that
 * numbering, not necessarily by literal filename-vs-slot content match;
 * some are placeholder-badge matches Juan flagged for a later content
 * pass). Renders and video-style stills, all resized to 900-1400px wide
 * and PNG/JPEG -> WebP. Juan later renamed some source files to reassign
 * which photo goes in which numbered slot (01 <-> 03's old content, 04 <->
 * 01's old content — see the two entries below with a "renamed" note);
 * the imageKey names here didn't need to change, only what they're built
 * from:
 * - "arrelat-hero-title" (02.png): title frame — no longer rendered (see
 *   arrelat's heroImages in content.ts, that entry was dropped per Juan's
 *   ask), kept registered here in case it comes back. 1400px wide,
 *   137KB -> 25KB.
 * - "arrelat-hero-forest" (source was 03.png before Juan's rename moved its
 *   content to what's now 01.png — this key is untouched, still the full
 *   un-cropped forest render): no longer rendered either (the image that
 *   used to sit just below the hero card was removed once the card itself
 *   started showing the foundation photo), kept registered in case it
 *   comes back. 1400px wide, 2.7MB -> 48KB.
 * - "arrelat-approach" (currently 04.png, 1024x1536 portrait — the file
 *   that's now hvuj.png held the old glowing-node content that used to be
 *   here): visitors wearing VR headsets. Earlier passes pre-cropped this
 *   (first a tight 500x500 square, then a wider 620x380 letterbox source)
 *   — both dropped: the manual crop was both the wrong call for a "fill"
 *   treatment and, at only 620px wide, too low-res once scaled up to this
 *   slot's actual on-screen size, reading as soft/pixelated. Now just the
 *   full frame resized to 1200px wide (no crop, no upscaling — native
 *   width is 1024px so it's left as-is) and rendered with plain
 *   object-cover, letting the browser crop responsively at whatever size
 *   the square box actually renders at, at full source resolution.
 *   PNG -> WebP: ~1.9MB -> small.
 * - "arrelat-foundation" (NN.png): Fundación Foto Colectania intro —
 *   gallery interior + the foundation's own website, "Private non-profit",
 *   "Barcelona, est. 2002", "Preserving Spanish, Catalan & Portuguese
 *   photography". This is the brief card's h-64/sm:h-80 background — that
 *   box is short and wide (~3.4:1 at desktop). A pass with the FULL image
 *   via object-contain left ugly empty bars on the sides (source is
 *   ~2.68:1, narrower than the box), so it's back to object-cover, now
 *   with a dedicated crop matching the box's own aspect: NN.png's own top
 *   2410x709 (3.4:1), trimming only the bottom margin below the tags so
 *   the title and both tag rows stay fully intact — cover then barely
 *   trims anything further. PNG -> WebP: ~2MB -> small. (An earlier pass
 *   also showed this same image again as its own full-width banner
 *   further down the page; removed as redundant once the brief card
 *   itself carried it.)
 * - "arrelat-research-diagram" (05.png): Research/Define/Ideate/Prototype/
 *   Final docs process diagram, 1400px wide, 1.5MB -> 57KB.
 * - "arrelat-needs-map" (06.png): 6 pain points infographic, 1400px wide,
 *   2.2MB -> 37KB.
 * - "arrelat-concept-quote" (07.png): forest render w/ "if a tree falls…"
 *   quote overlay, 1400px wide, 2.5MB -> 53KB.
 * - "arrelat-forest-metaphor-1/2/3" (08_1/2/3.png): the 3-panel roots /
 *   thread-trees / seed composite, one image per panel, 900px wide each,
 *   ~2.8MB -> ~15KB each — shown as an ImageCarousel (see CaseStudy.tsx's
 *   processSections carousel field), not the placeholders grid.
 * - "arrelat-interaction-arc" (09.jpeg): 4-step node-interaction sequence
 *   (approach / proximity / metadata / participation), 1400px wide, 126KB
 *   -> 64KB.
 * - "arrelat-thread-colors" (10.png): gold/white/lavender thread system,
 *   1400px wide, 2.6MB -> 21KB.
 * - "arrelat-app-1/2/3" (13_1/2/3.png): companion app onboarding+screens,
 *   exhibition billboard mockup, Instagram profile mockup — 900px wide
 *   each, ~2.5-3.8MB -> ~26-35KB each.
 * - "arrelat-role-observer/navigator/participant" (17/18/19.png): the
 *   Observer/Navigator/Participant tabbed UI across the seven-stage arc
 *   (Awakening+Forest / Discovery+Connection / Seed+Breath&Exit), 1300px
 *   wide each, ~2.9-3.3MB -> ~20-38KB each.
 * - "arrelat-preservation" (N_1.png): archival prints being handled,
 *   "preserved to the point of invisibility", 1400px wide, 4.4MB -> 66KB.
 * - "arrelat-framing-question" (N_2.png): "is its heritage truly
 *   preserved?" quote over a photograph, 1400px wide, 2.8MB -> 37KB.
 */
export const caseStudyVideos: Record<string, { src: string; poster: string }> = {
  "hospital-kpi-cards": { src: hospitalKpiCards, poster: hospitalKpiCardsPoster },
};

export const caseStudyComparativaImages = {
  before: hospitalComparativa01,
  after: hospitalComparativa02,
};

export const caseStudyImages: Record<string, string> = {
  "hospital-sjd-approach": hospitalApproach,
  "hospital-sjd-hliquid": hospitalHLiquid,
  "hospital-sjd-matriz-priorizacion": hospitalMatrizPriorizacion,
  "hospital-sjd-lobby": hospitalLobby,
  "hospital-sjd-documentation": hospitalDocumentation,
  "datascope-approach": datascopeApproach,
  "datascope-research-survey": datascopeResearchSurvey,
  "datascope-research-survey-2": datascopeResearchSurvey2,
  "datascope-onboarding": datascopeOnboarding,
  "datascope-tasks-carousel": datascopeTasksCarousel,
  "datascope-tasks-calendar": datascopeTasksCalendar,
  "corigin-architecture": coriginArchitecture,
  "arrelat-foundation": arrelatFoundation,
  "arrelat-hero-title": arrelatHeroTitle,
  "arrelat-hero-forest": arrelatHeroForest,
  "arrelat-approach": arrelatApproach,
  "arrelat-research-diagram": arrelatResearchDiagram,
  "arrelat-needs-map": arrelatNeedsMap,
  "arrelat-concept-quote": arrelatConceptQuote,
  "arrelat-forest-metaphor-1": arrelatForestMetaphor1,
  "arrelat-forest-metaphor-2": arrelatForestMetaphor2,
  "arrelat-forest-metaphor-3": arrelatForestMetaphor3,
  "arrelat-interaction-arc": arrelatInteractionArc,
  "arrelat-thread-colors": arrelatThreadColors,
  "arrelat-app-1": arrelatApp1,
  "arrelat-app-2": arrelatApp2,
  "arrelat-app-3": arrelatApp3,
  "arrelat-role-observer": arrelatRoleObserver,
  "arrelat-role-navigator": arrelatRoleNavigator,
  "arrelat-role-participant": arrelatRoleParticipant,
  "arrelat-preservation": arrelatPreservation,
  "arrelat-framing-question": arrelatFramingQuestion,
};
