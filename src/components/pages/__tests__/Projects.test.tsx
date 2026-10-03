import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Projects from "../Projects";
import MinecraftHUD from "../../header/MinecraftHUD";
import { DEFAULT_PROJECT_ID, projects } from "../projects/projectData";
import { PROJECT_SOURCES } from "../skills/skillItems";

const project = (id: string) => projects.find((entry) => entry.id === id)!;
const opener = (title: string) => screen.getByRole("button", { name: `Open ${title} chest` });
const panel = () => document.getElementById("project-chest-panel")!;
const panelHeading = () => within(panel()).getByRole("heading", { level: 3 });
const grid = () => within(panel()).getByRole("grid");
const detail = () => within(panel()).getByText("Selected item").closest("section")!;
const detailHeading = () => within(detail()).getByRole("heading", { level: 4 });
const slot = (label: string) => within(grid()).getByRole("button", { name: new RegExp(`^${label},`) });

describe("project data", () => {
  it("has unique ids, required copy, architecture items and valid links", () => {
    expect(new Set(projects.map((entry) => entry.id)).size).toBe(projects.length);
    expect(projects.map((entry) => entry.id)).toContain(DEFAULT_PROJECT_ID);
    for (const entry of projects) {
      expect(entry.title.trim()).not.toBe("");
      expect(entry.summary.trim()).not.toBe("");
      expect(entry.stack.length).toBeGreaterThan(0);
      expect(entry.items.length).toBeGreaterThan(0);
      expect(new Set(entry.items.map((item) => item.id)).size).toBe(entry.items.length);
      expect(entry.items.map((item) => item.id)).toContain(entry.defaultItemId);
      for (const link of entry.links) {
        expect(link.label.trim()).not.toBe("");
        expect(new URL(link.url).protocol).toBe("https:");
      }
    }
    // Defaults are per project, not one universal icon.
    const defaultIcons = projects.map((entry) => entry.items.find((item) => item.id === entry.defaultItemId)!.icon);
    expect(new Set(defaultIcons).size).toBe(projects.length);
  });

  it("covers every project that Skills cites as evidence", () => {
    const titles = projects.map((entry) => entry.title);
    PROJECT_SOURCES.forEach((source) => expect(titles).toContain(source));
  });
});

describe("Projects storage room", () => {
  it("renders the semantic heading and every project title and summary without interaction", () => {
    render(<Projects />);
    expect(screen.getByRole("heading", { level: 2, name: "Projects" })).toBeInTheDocument();
    expect(screen.getByText("Storage Room")).toBeInTheDocument();
    const selector = screen.getByRole("list", { name: "Project chests" });
    for (const entry of projects) {
      expect(within(selector).getByRole("heading", { level: 3, name: entry.title })).toBeInTheDocument();
      expect(within(selector).getByText(entry.summary)).toBeInTheDocument();
      expect(opener(entry.title)).toBeInTheDocument();
    }
  });

  it("opens WanderGenie by default with its summary, stack and links", () => {
    render(<Projects />);
    expect(opener("WanderGenie")).toHaveAttribute("aria-pressed", "true");
    expect(opener("Taco-DB")).toHaveAttribute("aria-pressed", "false");
    expect(panelHeading()).toHaveTextContent("WanderGenie");
    expect(screen.getByRole("region", { name: "WanderGenie" })).toBe(panel());
    const stack = within(panel()).getByRole("list", { name: "WanderGenie technologies" });
    for (const tech of project("wandergenie").stack) expect(within(stack).getByText(tech)).toBeInTheDocument();
    expect(within(panel()).getByRole("link", { name: /^GitHub for WanderGenie/ })).toHaveAttribute("href", "https://github.com/arpitsharma2010/WanderGenie-ai-travel-assistant");
    expect(within(panel()).getByRole("link", { name: /^DevPost for WanderGenie/ })).toHaveAttribute("href", "https://devpost.com/software/wandergenie-ai-travel-assistant");
    for (const link of within(panel()).getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("switches projects by click and shows the outcome metric", () => {
    render(<Projects />);
    fireEvent.click(opener("Taco-DB"));
    expect(opener("Taco-DB")).toHaveAttribute("aria-pressed", "true");
    expect(opener("WanderGenie")).toHaveAttribute("aria-pressed", "false");
    expect(panelHeading()).toHaveTextContent("Taco-DB");
    expect(within(panel()).getByRole("heading", { name: "Outcome" })).toBeInTheDocument();
    expect(within(panel()).getByText(/Up to a 10x query-processing improvement/)).toBeInTheDocument();
  });

  it("renders no link buttons for projects without links", () => {
    render(<Projects />);
    fireEvent.click(opener("Pintos Kernel"));
    expect(within(panel()).queryByRole("link")).not.toBeInTheDocument();
    expect(within(panel()).queryByRole("heading", { name: "Links" })).not.toBeInTheDocument();
    expect(within(panel()).queryByRole("heading", { name: "Outcome" })).not.toBeInTheDocument();

    fireEvent.click(opener("Library Management System"));
    expect(within(panel()).getByRole("link", { name: /^Frontend on GitHub/ })).toHaveAttribute("href", "https://github.com/arpitsharma2010/react-library-project");
    expect(within(panel()).getByRole("link", { name: /^API on GitHub/ })).toHaveAttribute("href", "https://github.com/arpitsharma2010/spring-boot-library");
  });

  it("switches projects with the keyboard", () => {
    render(<Projects />);
    const crop = opener("Crop Yield Prediction");
    crop.focus();
    fireEvent.keyDown(crop, { key: "Enter" });
    fireEvent.click(crop); // native buttons turn Enter/Space into click
    expect(panelHeading()).toHaveTextContent("Crop Yield Prediction");
    expect(crop).toHaveFocus();
  });

  it("selects each project's default architecture item and resets it on switch", () => {
    render(<Projects />);
    expect(slot("Trip Planner")).toHaveAttribute("aria-pressed", "true");
    expect(detailHeading()).toHaveTextContent("Trip Planner");
    expect(within(detail()).getByText("WanderGenie")).toBeInTheDocument();

    fireEvent.click(slot("Place Graph"));
    expect(detailHeading()).toHaveTextContent("Place Graph");
    expect(within(detail()).getByText("Neo4j")).toBeInTheDocument();

    for (const entry of projects) {
      fireEvent.click(opener(entry.title));
      const expected = entry.items.find((item) => item.id === entry.defaultItemId)!;
      expect(detailHeading()).toHaveTextContent(expected.label);
      expect(grid()).toHaveAccessibleName(`${entry.title} architecture`);
      expect(within(grid()).getAllByRole("button")).toHaveLength(entry.items.length);
    }

    fireEvent.click(opener("WanderGenie"));
    expect(detailHeading()).toHaveTextContent("Trip Planner");
  });

  it("changes the detail by keyboard and single touch tap", () => {
    render(<Projects />);
    fireEvent.click(opener("Taco-DB"));
    fireEvent.keyDown(slot("Buffer Pool"), { key: "Enter" });
    expect(detailHeading()).toHaveTextContent("Buffer Pool");
    fireEvent.keyDown(slot("B\\+ Tree Index"), { key: " " });
    expect(detailHeading()).toHaveTextContent("B+ Tree Index");

    const sort = slot("External Merge Sort");
    fireEvent.pointerDown(sort, { pointerType: "touch" });
    fireEvent.click(sort);
    expect(detailHeading()).toHaveTextContent("External Merge Sort");
    expect(sort).toHaveAttribute("aria-pressed", "true");
  });

  it("navigates architecture slots with arrows, Home and End, skipping decorative empties", () => {
    render(<Projects />);
    fireEvent.click(opener("Crop Yield Prediction"));
    const first = slot("Environmental Data");
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(slot("Scaled Pipeline")).toHaveFocus();
    fireEvent.keyDown(slot("Scaled Pipeline"), { key: "End" });
    expect(slot("Language")).toHaveFocus();
    fireEvent.keyDown(slot("Language"), { key: "Home" });
    expect(first).toHaveFocus();
    const empties = grid().querySelectorAll(".mc-slot.is-empty");
    expect(empties.length).toBe(9 - project("crop-yield").items.length);
    empties.forEach((empty) => {
      expect(empty).toBeDisabled();
      expect(empty).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("names architecture slots meaningfully and keeps tooltip lore concise", () => {
    render(<Projects />);
    fireEvent.click(opener("Taco-DB"));
    const hopper = slot("Buffer Pool");
    expect(hopper).toHaveAccessibleName("Buffer Pool, Hopper");
    expect(document.getElementById(hopper.getAttribute("aria-describedby")!)).toHaveTextContent("Hopper. Buffer Pool. Caches pages in memory. Taco-DB");
    expect(detail()).toHaveAttribute("aria-live", "polite");
  });

  it("hides decorative chest art from assistive technology", () => {
    render(<Projects />);
    document.querySelectorAll(".pc-art").forEach((art) => expect(art).toHaveAttribute("aria-hidden", "true"));
  });
});

describe("Projects coexisting with the hotbar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    });
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    window.history.replaceState(null, "", window.location.pathname);
  });
  afterEach(() => window.history.replaceState(null, "", window.location.pathname));

  const renderPage = () => render(
    <>
      <MinecraftHUD theme="light" onThemeToggle={vi.fn()} />
      <section id="projects"><Projects /></section>
      <section id="experience">experience</section>
    </>,
  );

  it("keeps architecture arrow keys inside the grid", () => {
    renderPage();
    const first = slot("Trip Planner");
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(slot("Agent Orchestration")).toHaveFocus();
    expect(window.location.hash).toBe("");
  });

  it("keeps number shortcuts working from the architecture grid", () => {
    renderPage();
    const item = slot("Hybrid RAG");
    item.focus();
    fireEvent.keyDown(item, { key: "4" });
    expect(window.location.hash).toBe("#experience");
    expect(detailHeading()).toHaveTextContent("Trip Planner");
  });
});
