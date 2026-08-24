import hospitalKpiCards from "../assets/video/hospital-sjd-kpi-cards.mp4";
import hospitalKpiCardsPoster from "../assets/img/hospital-sjd-kpi-cards-poster.jpg";

/**
 * Real media (video clips, mostly) referenced by key from
 * content.ts's `processSections[].placeholders`, resolved here the same
 * way `lib/projectAssets.ts` resolves logos/covers by string key — keeps
 * content.ts asset-free.
 *
 * Source: converted from a 15MB/551-frame GIF export
 * ("SANT JOAN DE DEU/Data Wall/Portfolio assets/CompF.gif") to H.264 MP4
 * (crf 20, ~1.6MB) — same visual, ~9x lighter, plus a poster frame so the
 * <video> has something to paint before it starts playing.
 */
export const caseStudyVideos: Record<string, { src: string; poster: string }> = {
  "hospital-kpi-cards": { src: hospitalKpiCards, poster: hospitalKpiCardsPoster },
};
