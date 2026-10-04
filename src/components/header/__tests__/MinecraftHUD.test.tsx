import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MinecraftHUD from "../MinecraftHUD";
import usePreferredTheme from "../../../hooks/usePreferredTheme";
import { calculateSectionProgress, clampPercentage } from "../useSectionProgress";
import { WHEEL_SETTLE_MS } from "../useHotbarNavigation";
import { getHotbarEntries, type PortfolioSectionId } from "../hotbarItems";

let observerCallback: IntersectionObserverCallback;
let observedSections: Element[];

class ControlledIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "-18% 0px -62% 0px";
  readonly thresholds = [0, .1, .25, .5, .75];
  constructor(callback: IntersectionObserverCallback) { observerCallback = callback; }
  observe = vi.fn((target: Element) => { observedSections.push(target); });
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

const sectionIds: PortfolioSectionId[] = [
  "home", "about", "skills", "experience", "projects", "education", "resume", "contact",
];

const TestPage = ({ theme = "light", onThemeToggle = vi.fn() }: { theme?: string; onThemeToggle?: () => void }) => (
  <>
    <MinecraftHUD theme={theme} onThemeToggle={onThemeToggle} />
    {sectionIds.map((id) => <section id={id} key={id}>{id}</section>)}
    <input aria-label="Test input" />
    <textarea aria-label="Test textarea" />
    <select aria-label="Test select"><option>Option</option></select>
    <div contentEditable aria-label="Test editor" />
  </>
);

const emitSection = (id: PortfolioSectionId, top = 200, ratio = .7) => {
  const target = document.getElementById(id)!;
  act(() => observerCallback([{
    target,
    isIntersecting: true,
    intersectionRatio: ratio,
    boundingClientRect: new DOMRect(0, top, 100, 100),
    intersectionRect: new DOMRect(0, top, 100, 70),
    rootBounds: null,
    time: 0,
  }], {} as IntersectionObserver));
};

beforeEach(() => {
  observedSections = [];
  globalThis.IntersectionObserver = ControlledIntersectionObserver;
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn(() => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  });
  window.history.replaceState(null, "", window.location.pathname);
  window.localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
  window.history.replaceState(null, "", window.location.pathname);
});

describe("MinecraftHUD hotbar", () => {
  it("describes the Experience slot as advancements, not a quest log", () => {
    for (const isDark of [false, true]) {
      const experience = getHotbarEntries(isDark).find((slot) => slot.item.id === "hotbar-experience")!;
      expect(experience.item.lore).toEqual(["View career advancements"]);
    }
  });


  it("exposes the exact item and destination mapping", () => {
    render(<TestPage />);
    const hotbar = screen.getByRole("navigation", { name: "Portfolio hotbar navigation" });
    const names = within(hotbar).getAllByRole("button").map((button) => button.getAttribute("aria-label"));

    expect(names).toEqual([
      "Compass — Home",
      "Name Tag — About",
      "Diamond Pickaxe — Skills",
      "Map — Experience",
      "Chest — Projects",
      "Enchanted Book — Education",
      "Written Book — Resume",
      "Portal — Contact",
      "Clock — Switch to night mode",
      "Portal Crystals — 0 of 12 collected",
    ]);
  });

  it("activates navigation with one click and updates hash and selection", () => {
    render(<TestPage />);
    const skills = screen.getByRole("button", { name: "Diamond Pickaxe — Skills" });

    fireEvent.click(skills);
    expect(window.location.hash).toBe("#skills");
    expect(skills).toHaveAttribute("aria-pressed", "true");
    expect(document.getElementById("skills")!.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("supports numeric shortcuts 1 through 8 and slot 9 theme activation", () => {
    const onThemeToggle = vi.fn();
    render(<TestPage onThemeToggle={onThemeToggle} />);

    sectionIds.forEach((id, index) => {
      fireEvent.keyDown(document, { key: String(index + 1) });
      expect(window.location.hash).toBe(`#${id}`);
    });
    fireEvent.keyDown(document, { key: "9" });
    expect(onThemeToggle).toHaveBeenCalledOnce();
    expect(window.location.hash).toBe("#contact");
  });

  it("maps key 0 to explicit portal activation only when available", () => {
    const onPortalActivate = vi.fn();
    const { rerender } = render(<MinecraftHUD theme="light" onThemeToggle={vi.fn()} onPortalActivate={onPortalActivate} portalCrystalCount={0} portalState="locked" />);
    fireEvent.keyDown(document, { key: "0" });
    expect(onPortalActivate).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Portal Crystals — 0 of 12 collected" })).toHaveAttribute("aria-disabled", "true");
    rerender(<MinecraftHUD theme="light" onThemeToggle={vi.fn()} onPortalActivate={onPortalActivate} portalCrystalCount={12} portalState="ready" />);
    fireEvent.keyDown(document, { key: "0" });
    expect(onPortalActivate).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Portal Crystals — 12 of 12 collected. Activate End Portal" })).not.toHaveAttribute("aria-disabled");
  });

  it("requests the full sky cycle only while Home is active", () => {
    const onThemeToggle = vi.fn();
    render(<TestPage onThemeToggle={onThemeToggle} />);
    fireEvent.keyDown(document, { key: "9" });
    expect(onThemeToggle).toHaveBeenLastCalledWith(expect.any(Object), true);
    emitSection("about");
    fireEvent.keyDown(document, { key: "9" });
    expect(onThemeToggle).toHaveBeenLastCalledWith(expect.any(Object), false);
  });

  it("ignores modified and typing-context number shortcuts", () => {
    render(<TestPage />);
    fireEvent.keyDown(document, { key: "3", ctrlKey: true });
    fireEvent.keyDown(document, { key: "3", metaKey: true });
    fireEvent.keyDown(document, { key: "3", altKey: true });
    fireEvent.keyDown(screen.getByLabelText("Test input"), { key: "3" });
    fireEvent.keyDown(screen.getByLabelText("Test textarea"), { key: "3" });
    fireEvent.keyDown(screen.getByLabelText("Test select"), { key: "3" });
    fireEvent.keyDown(screen.getByLabelText("Test editor"), { key: "3" });

    expect(window.location.hash).toBe("");
  });

  it("moves selection and focus with arrows, Home, and End, then activates with Enter or Space", () => {
    render(<TestPage />);
    const home = screen.getByRole("button", { name: "Compass — Home" });
    const about = screen.getByRole("button", { name: "Name Tag — About" });
    const skills = screen.getByRole("button", { name: "Diamond Pickaxe — Skills" });
    const portalCrystals = screen.getByRole("button", { name: "Portal Crystals — 0 of 12 collected" });
    home.focus();

    fireEvent.keyDown(home, { key: "ArrowRight" });
    expect(about).toHaveFocus();
    expect(about).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(about, { key: "End" });
    expect(portalCrystals).toHaveFocus();
    fireEvent.keyDown(portalCrystals, { key: "Home" });
    expect(home).toHaveFocus();
    skills.focus();
    fireEvent.keyDown(skills, { key: "Enter" });
    expect(window.location.hash).toBe("#skills");
    fireEvent.keyDown(about, { key: " " });
    expect(window.location.hash).toBe("#about");
  });

  describe("wheel over the hotbar", () => {
    const hotbar = () => screen.getByRole("navigation", { name: "Portfolio hotbar navigation" });
    const slot = (name: string) => screen.getByRole("button", { name });
    const wheel = (deltaY: number, times = 1) => {
      let prevented = false;
      for (let i = 0; i < times; i += 1) prevented = !fireEvent.wheel(hotbar(), { deltaY });
      return prevented;
    };

    beforeEach(() => { vi.useFakeTimers(); });

    it("previews a slot immediately, keeps the page still, and navigates only after the wheel rests", () => {
      render(<TestPage />);
      expect(wheel(100)).toBe(true);
      expect(slot("Name Tag — About")).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByRole("status")).toHaveTextContent("Name Tag");
      expect(Element.prototype.scrollIntoView).not.toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS - 1));
      expect(window.location.hash).toBe("");
      act(() => vi.advanceTimersByTime(1));
      expect(window.location.hash).toBe("#about");
      expect(slot("Name Tag — About")).toHaveAttribute("aria-current", "location");
      expect(screen.getByRole("status")).toHaveTextContent("Name Tag");
    });

    it("navigates once, to the final slot, after several wheel steps", () => {
      const pushState = vi.spyOn(window.history, "pushState");
      render(<TestPage />);
      wheel(100, 4);
      expect(slot("Chest — Projects")).toHaveAttribute("aria-pressed", "true");
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS));
      expect(pushState).toHaveBeenCalledOnce();
      expect(window.location.hash).toBe("#projects");
      pushState.mockRestore();
    });

    it("restarts the settle timer on every wheel step", () => {
      render(<TestPage />);
      wheel(100);
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS - 50));
      wheel(100);
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS - 50));
      expect(window.location.hash).toBe("");
      act(() => vi.advanceTimersByTime(50));
      expect(window.location.hash).toBe("#skills");
    });

    it("cancels a pending wheel navigation on click, number key or arrow key", () => {
      render(<TestPage />);
      wheel(100, 2);
      fireEvent.click(slot("Map — Experience"));
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS * 2));
      expect(window.location.hash).toBe("#experience");

      wheel(100);
      fireEvent.keyDown(document, { key: "6" });
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS * 2));
      expect(window.location.hash).toBe("#education");

      wheel(-100);
      fireEvent.keyDown(slot("Enchanted Book — Education"), { key: "ArrowRight" });
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS * 2));
      expect(window.location.hash).toBe("#education");
    });

    it("clamps to slots 1-8 and never previews or toggles the theme clock", () => {
      const onThemeToggle = vi.fn();
      render(<TestPage onThemeToggle={onThemeToggle} />);
      wheel(-100, 3);
      expect(slot("Compass — Home")).toHaveAttribute("aria-pressed", "true");
      wheel(100, 20);
      expect(slot("Portal — Contact")).toHaveAttribute("aria-pressed", "true");
      expect(slot("Clock — Switch to night mode")).toHaveAttribute("aria-pressed", "false");
      expect(slot("Portal Crystals — 0 of 12 collected")).toHaveAttribute("aria-pressed", "false");
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS));
      expect(window.location.hash).toBe("#contact");
      wheel(100, 3);
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS));
      expect(onThemeToggle).not.toHaveBeenCalled();
      expect(slot("Clock — Switch to night mode")).toHaveAttribute("aria-pressed", "false");
    });

    it("treats wheeling back to the current section as a cancel", () => {
      const pushState = vi.spyOn(window.history, "pushState");
      render(<TestPage />);
      wheel(100);
      wheel(-100);
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS));
      expect(pushState).not.toHaveBeenCalled();
      expect(slot("Compass — Home")).toHaveAttribute("aria-pressed", "true");
      pushState.mockRestore();
    });

    it("leaves wheel scrolling outside the hotbar alone, even with a hotbar slot focused", () => {
      render(<TestPage />);
      slot("Name Tag — About").focus();
      const outsideWheel = new WheelEvent("wheel", { deltaY: 100, cancelable: true, bubbles: true });
      document.body.dispatchEvent(outsideWheel);
      expect(outsideWheel.defaultPrevented).toBe(false);
      act(() => vi.advanceTimersByTime(WHEEL_SETTLE_MS));
      expect(window.location.hash).toBe("");
    });
  });

  it("keeps active section separate from a focused slot", () => {
    render(<TestPage />);
    emitSection("projects");
    const projects = screen.getByRole("button", { name: "Chest — Projects" });
    const resume = screen.getByRole("button", { name: "Written Book — Resume" });
    resume.focus();

    expect(projects).toHaveAttribute("aria-current", "location");
    expect(projects).toHaveAttribute("aria-pressed", "true");
    expect(resume).toHaveFocus();
    expect(resume).toHaveAttribute("aria-pressed", "false");
  });

  it("observes only sections, follows reading position, and resists manual flicker", () => {
    render(<TestPage />);
    expect(observedSections.map((section) => section.id)).toEqual(sectionIds);
    emitSection("experience", 220, .8);
    expect(screen.getByRole("button", { name: "Map — Experience" })).toHaveAttribute("aria-current", "location");

    fireEvent.click(screen.getByRole("button", { name: "Chest — Projects" }));
    emitSection("home", 210, .9);
    expect(screen.getByRole("button", { name: "Chest — Projects" })).toHaveAttribute("aria-current", "location");
  });

  it("shows progress through the active section and resets when the section changes", async () => {
    const scrollTo = (y: number) => Object.defineProperty(window, "scrollY", { configurable: true, value: y });
    // Sections 1000px tall, stacked from 0; viewport is jsdom's 768px, so the reading line is at 230px.
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 8000 });
    const rect = vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
      const index = sectionIds.indexOf(this.id as PortfolioSectionId);
      return index < 0 ? new DOMRect() : new DOMRect(0, index * 1000 - window.scrollY, 100, 1000);
    });
    const nextFrame = () => act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    scrollTo(0);
    render(<TestPage />);
    const progress = () => screen.getByRole("progressbar");
    expect(progress()).toHaveAccessibleName("Home section progress");
    expect(progress()).toHaveAttribute("aria-valuenow", "0");

    scrollTo(385);
    fireEvent.scroll(window);
    await nextFrame();
    expect(progress()).toHaveAttribute("aria-valuenow", "50");

    scrollTo(770);
    emitSection("about");
    expect(progress()).toHaveAccessibleName("About section progress");
    expect(progress()).toHaveAttribute("aria-valuenow", "0");
    expect(progress()).toHaveAttribute("aria-valuetext", "About section progress: 0%");

    scrollTo(1770);
    fireEvent.scroll(window);
    await nextFrame();
    expect(progress()).toHaveAttribute("aria-valuenow", "100");
    rect.mockRestore();
    scrollTo(0);
  });

  it("names the progress bar after a section restored from the hash", () => {
    window.history.replaceState(null, "", "#projects");
    render(<TestPage />);
    expect(screen.getByRole("progressbar")).toHaveAccessibleName("Projects section progress");
  });

  it("announces and automatically clears the selected item label", () => {
    vi.useFakeTimers();
    render(<TestPage />);
    fireEvent.click(screen.getByRole("button", { name: "Map — Experience" }));
    const label = screen.getByRole("status");
    expect(label).toHaveTextContent("Map");
    expect(label).toHaveTextContent("Experience");
    act(() => vi.advanceTimersByTime(2400));
    expect(label).toBeEmptyDOMElement();
  });

  it("updates the theme action and icon without changing the active section", () => {
    const ThemeHarness = () => {
      const [theme, setTheme] = useState("light");
      return <TestPage theme={theme} onThemeToggle={() => setTheme((value) => value === "light" ? "dark" : "light")} />;
    };
    render(<ThemeHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Clock — Switch to night mode" }));

    expect(screen.getByRole("button", { name: "Clock — Switch to day mode" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Compass — Home" })).toHaveAttribute("aria-current", "location");
  });

  it("preserves the existing persisted theme behavior", () => {
    const PersistentThemeHarness = () => {
      const { theme, toggleTheme } = usePreferredTheme();
      return <MinecraftHUD theme={theme} onThemeToggle={toggleTheme} />;
    };
    render(<PersistentThemeHarness />);
    fireEvent.click(screen.getByRole("button", { name: "Clock — Switch to night mode" }));

    expect(window.localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Clock — Switch to day mode" })).toBeInTheDocument();
  });

  it("restores initial hashes and responds to browser history", () => {
    window.history.replaceState(null, "", "#skills");
    render(<TestPage />);
    expect(screen.getByRole("button", { name: "Diamond Pickaxe — Skills" })).toHaveAttribute("aria-current", "location");

    window.history.pushState(null, "", "#projects");
    fireEvent(window, new PopStateEvent("popstate"));
    expect(screen.getByRole("button", { name: "Chest — Projects" })).toHaveAttribute("aria-current", "location");
  });

  it("settles an initial hash instantly so CSS smooth scrolling can't lag behind late layout", () => {
    window.history.replaceState(null, "", "#education");
    render(<TestPage />);
    fireEvent(window, new Event("load"));
    expect(document.getElementById("education")!.scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  });

  it("uses immediate section movement for reduced-motion visitors", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    render(<TestPage />);
    fireEvent.click(screen.getByRole("button", { name: "Portal — Contact" }));
    expect(document.getElementById("contact")!.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });
});

describe("section progress helper", () => {
  // Reading line at 30% of an 800px viewport = 240px.
  const section = { top: 1000, height: 2000, viewportHeight: 800, maxScroll: 10000 };

  it("runs from the section top to its bottom crossing the reading line", () => {
    expect(calculateSectionProgress({ ...section, scrollY: 760 })).toBe(0);
    expect(calculateSectionProgress({ ...section, scrollY: 1760 })).toBe(50);
    expect(calculateSectionProgress({ ...section, scrollY: 2760 })).toBe(100);
  });

  it("clamps before and after the section", () => {
    expect(calculateSectionProgress({ ...section, scrollY: 0 })).toBe(0);
    expect(calculateSectionProgress({ ...section, scrollY: 9000 })).toBe(100);
    expect(clampPercentage(-5)).toBe(0);
    expect(clampPercentage(105)).toBe(100);
  });

  it("spreads a short section over its own height and never divides by zero", () => {
    const short = { ...section, height: 300 };
    expect(calculateSectionProgress({ ...short, scrollY: 760 + 150 })).toBe(50);
    expect(calculateSectionProgress({ ...short, height: 0, scrollY: 759 })).toBe(0);
    expect(calculateSectionProgress({ ...short, height: 0, scrollY: 760 })).toBe(100);
  });

  it("starts the first section at 0 and lets the last one reach 100 at the page bottom", () => {
    expect(calculateSectionProgress({ ...section, top: 60, scrollY: 0 })).toBe(0);
    const last = { top: 5000, height: 900, viewportHeight: 800, maxScroll: 5300 };
    expect(calculateSectionProgress({ ...last, scrollY: 4760 })).toBe(0);
    expect(calculateSectionProgress({ ...last, scrollY: 5030 })).toBe(50);
    expect(calculateSectionProgress({ ...last, scrollY: 5300 })).toBe(100);
  });
});
