import { afterEach, describe, expect, it, vi } from "vitest";
import { revealIfOffscreen } from "../motion";

const panelAt = (top: number, bottom: number) => {
  const element = document.createElement("section");
  element.getBoundingClientRect = () => ({ top, bottom } as DOMRect);
  element.scrollIntoView = vi.fn();
  return element;
};

const setReducedMotion = (matches: boolean) =>
  Object.defineProperty(window, "matchMedia", { configurable: true, value: vi.fn(() => ({ matches })) });

describe("revealIfOffscreen", () => {
  afterEach(() => setReducedMotion(false));

  it("leaves a panel that is already in view alone", () => {
    const panel = panelAt(100, 400);
    revealIfOffscreen(panel, .6);
    expect(panel.scrollIntoView).not.toHaveBeenCalled();
  });

  it("scrolls a panel below the threshold or above the viewport, smoothly by default", () => {
    setReducedMotion(false);
    const below = panelAt(window.innerHeight * .7, window.innerHeight * 2);
    revealIfOffscreen(below, .6, "nearest");
    expect(below.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "nearest" });

    const above = panelAt(-500, -10);
    revealIfOffscreen(above, .75);
    expect(above.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("jumps without animation for reduced-motion visitors and ignores a missing panel", () => {
    setReducedMotion(true);
    const panel = panelAt(window.innerHeight, window.innerHeight * 2);
    revealIfOffscreen(panel, .75);
    expect(panel.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
    expect(() => revealIfOffscreen(null, .75)).not.toThrow();
  });
});
