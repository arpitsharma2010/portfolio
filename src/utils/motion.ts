export const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * After an explicit pick, scroll a detail panel into view when it starts below `threshold`
 * of the viewport (or has scrolled off the top). Focus stays where it is.
 */
export const revealIfOffscreen = (element: HTMLElement | null, threshold: number, block: ScrollLogicalPosition = "start") => {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  if (rect.top > window.innerHeight * threshold || rect.bottom < 0) {
    element.scrollIntoView?.({ behavior: prefersReducedMotion() ? "auto" : "smooth", block });
  }
};
