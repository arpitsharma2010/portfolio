import { render, screen, within } from "@testing-library/react";
import App from "../../../App";
import { portfolioSectionIds } from "../../header/hotbarItems";

const sheets = import.meta.glob("../biomes.css", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const css = sheets["../biomes.css"].replace(/\/\*[\s\S]*?\*\//g, "");

const expectedBiomes = {
  home: "plains",
  about: "forest",
  skills: "cave",
  experience: "mountains",
  projects: "badlands",
  education: "cherry",
  resume: "taiga",
  contact: "nether",
  "end-encounter": "end",
};

describe("biome environments", () => {
  beforeEach(() => {
    window.matchMedia ??= ((query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
  });

  it("keeps the section IDs and gives each section its biome, with decorative scenery hidden from AT", () => {
    const { container } = render(<App />);
    const sections = [...container.querySelectorAll(".world-sections > section")];
    expect(sections.map((section) => section.id)).toEqual([...portfolioSectionIds, "end-encounter"]);
    sections.forEach((section) => expect(section).toHaveAttribute("data-biome", expectedBiomes[section.id as keyof typeof expectedBiomes]));

    const scenery = [...container.querySelectorAll(".biome")];
    expect(scenery).toHaveLength(8);
    scenery.forEach((layer) => {
      expect(layer).toHaveAttribute("aria-hidden", "true");
      expect(within(layer as HTMLElement).queryAllByRole("button")).toHaveLength(0);
      expect(within(layer as HTMLElement).queryAllByRole("link")).toHaveLength(0);
    });
    expect(within(screen.getByRole("navigation", { name: "Portfolio hotbar navigation" })).getAllByRole("button")).toHaveLength(10);
  });

  it("renders the requested ambient effects", () => {
    const { container } = render(<App />);
    for (const [biome, particle] of [["forest", "leaf"], ["badlands", "sand"], ["nether", "pop"], ["nether", "ash"], ["cherry", "petal"]]) {
      expect(container.querySelector(`.biome--${biome} .biome__particles--${particle} i`)).not.toBeNull();
    }
  });

  it("keeps scenery non-interactive and freezes all biome motion for reduced-motion users", () => {
    expect(css).toMatch(/\.biome \{[^}]*pointer-events: none/);
    expect(css).toMatch(/\.biome \{[^}]*overflow: hidden/);
    expect(css).not.toMatch(/100vw/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\) \{\s*\.biome, \.biome \*, \.biome::before, \.biome \*::before \{ animation: none !important; \}/);
    expect(css).toMatch(/@media \(prefers-reduced-motion: no-preference\) \{\s*\.biome__far \{ animation: biome-parallax/);
  });
});
