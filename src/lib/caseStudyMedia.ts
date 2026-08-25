import hospitalKpiCards from "../assets/video/hospital-sjd-kpi-cards.mp4";
import hospitalKpiCardsPoster from "../assets/img/hospital-sjd-kpi-cards-poster.jpg";
import hospitalComparativa01 from "../assets/img/hospital-sjd-comparativa-01.webp";
import hospitalComparativa02 from "../assets/img/hospital-sjd-comparativa-02.webp";
import hospitalApproach from "../assets/img/hospital-sjd-approach.webp";

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
};
