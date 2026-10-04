import { useEffect, useState } from "react";
import type { PortfolioSectionId } from "./hotbarItems";

export const clampPercentage = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

/** The active-section observer's reading line, as a fraction of the viewport height. */
const READING_LINE = .3;

interface SectionGeometry {
  scrollY: number;
  /** Section top and height, relative to the document. */
  top: number;
  height: number;
  viewportHeight: number;
  maxScroll: number;
}

/**
 * 0 when the section's top reaches the reading line (where it becomes the active section), 100 when its
 * bottom does (where the next one takes over). Measuring against the reading line rather than the header and
 * viewport bottom keeps the fill spread over the whole time a section is active, whatever its height. The range is
 * capped at the page's maximum scroll so the first section starts at 0 and the last one can still reach 100.
 */
export const calculateSectionProgress = ({ scrollY, top, height, viewportHeight, maxScroll }: SectionGeometry) => {
  const line = viewportHeight * READING_LINE;
  const start = Math.min(Math.max(0, top - line), maxScroll);
  const end = Math.min(top + height - line, maxScroll);
  if (end <= start) return scrollY >= start ? 100 : 0;
  return clampPercentage(((scrollY - start) / (end - start)) * 100);
};

export const measureSectionProgress = (sectionId: PortfolioSectionId) => {
  const section = typeof document === "undefined" ? null : document.getElementById(sectionId);
  if (!section) return 0;
  const rect = section.getBoundingClientRect();
  return calculateSectionProgress({
    scrollY: window.scrollY,
    top: rect.top + window.scrollY,
    height: rect.height,
    viewportHeight: window.innerHeight,
    maxScroll: Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
  });
};

/** Scroll progress through the active section, measured once per frame and stored only when the whole percent changes. */
const useSectionProgress = (sectionId: PortfolioSectionId) => {
  const [progress, setProgress] = useState(() => ({ sectionId, value: measureSectionProgress(sectionId) }));

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const value = measureSectionProgress(sectionId);
      setProgress((current) => current.sectionId === sectionId && current.value === value ? current : { sectionId, value });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionId]);

  // On a section change, measure the new section in this render so the bar never shows the old section's value.
  return progress.sectionId === sectionId ? progress.value : measureSectionProgress(sectionId);
};

export default useSectionProgress;
