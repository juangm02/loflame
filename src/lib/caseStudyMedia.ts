import hospitalKpiCards from "../assets/video/hospital-sjd-kpi-cards.mp4";
import hospitalKpiCardsPoster from "../assets/img/hospital-sjd-kpi-cards-poster.jpg";
import hospitalComparativa01 from "../assets/img/hospital-sjd-comparativa-01.webp";
import hospitalComparativa02 from "../assets/img/hospital-sjd-comparativa-02.webp";
import hospitalApproach from "../assets/img/hospital-sjd-approach.webp";
import hospitalHLiquid from "../assets/img/hospital-sjd-hliquid.webp";
import hospitalMatrizPriorizacion from "../assets/img/hospital-sjd-matriz-priorizacion.svg";
import hospitalLobby from "../assets/img/hospital-sjd-lobby.webp";

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
};
