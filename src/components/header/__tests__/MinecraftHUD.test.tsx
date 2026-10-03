import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import MinecraftHUD from "../MinecraftHUD";
import usePreferredTheme from "../../../hooks/usePreferredTheme";
import { clampPercentage, calculatePortfolioProgress } from "../usePortfolioExploration";
import type { PortfolioSectionId } from "../hotbarItems";

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
    const theme = screen.getByRole("button", { name: "Clock — Switch to night mode" });
    home.focus();

    fireEvent.keyDown(home, { key: "ArrowRight" });
    expect(about).toHaveFocus();
    expect(about).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(about, { key: "End" });
    expect(theme).toHaveFocus();
    fireEvent.keyDown(theme, { key: "Home" });
    expect(home).toHaveFocus();
    skills.focus();
    fireEvent.keyDown(skills, { key: "Enter" });
    expect(window.location.hash).toBe("#skills");
    fireEvent.keyDown(about, { key: " " });
    expect(window.location.hash).toBe("#about");
  });

  it("limits wheel selection to the hotbar and never toggles a merely selected theme slot", () => {
    const onThemeToggle = vi.fn();
    render(<TestPage onThemeToggle={onThemeToggle} />);
    const hotbar = screen.getByRole("navigation", { name: "Portfolio hotbar navigation" });
    const about = screen.getByRole("button", { name: "Name Tag — About" });
    const theme = screen.getByRole("button", { name: "Clock — Switch to night mode" });

    fireEvent.wheel(hotbar, { deltaY: 100 });
    expect(about).toHaveAttribute("aria-pressed", "true");
    fireEvent.wheel(hotbar, { deltaY: -100 });
    fireEvent.wheel(hotbar, { deltaY: -100 });
    expect(theme).toHaveAttribute("aria-pressed", "true");
    expect(onThemeToggle).not.toHaveBeenCalled();
    (document.activeElement as HTMLElement | null)?.blur();
    const outsideWheel = new WheelEvent("wheel", { deltaY: 100, cancelable: true, bubbles: true });
    document.body.dispatchEvent(outsideWheel);
    expect(outsideWheel.defaultPrevented).toBe(false);
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

  it("tracks non-decreasing exploration and gives Contact 100 percent", () => {
    render(<TestPage />);
    const progress = screen.getByRole("progressbar", { name: "Portfolio exploration progress" });
    expect(progress).toHaveAttribute("aria-valuenow", "13");
    expect(progress).toHaveAttribute("aria-valuetext", "Portfolio exploration: 13%");
    emitSection("about");
    expect(progress).toHaveAttribute("aria-valuenow", "25");
    emitSection("home");
    expect(progress).toHaveAttribute("aria-valuenow", "25");
    emitSection("contact", window.innerHeight * .3);
    expect(progress).toHaveAttribute("aria-valuenow", "100");
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

  it("uses immediate section movement for reduced-motion visitors", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    render(<TestPage />);
    fireEvent.click(screen.getByRole("button", { name: "Portal — Contact" }));
    expect(document.getElementById("contact")!.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
  });
});

describe("portfolio progress helpers", () => {
  it("clamps percentages and calculates visited-section progress", () => {
    expect(clampPercentage(-5)).toBe(0);
    expect(clampPercentage(105)).toBe(100);
    expect(calculatePortfolioProgress(new Set(["home", "about"]))).toBe(25);
    expect(calculatePortfolioProgress(new Set(["contact"]))).toBe(100);
  });
});
