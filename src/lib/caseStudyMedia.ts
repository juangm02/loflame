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
};
