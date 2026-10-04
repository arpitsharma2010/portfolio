import { describe, expect, it } from "vitest";

// Raw glob rather than node:fs (no @types/node); comments stripped so prose can't trip the guards.
const sheets = import.meta.glob(["../index.css", "../components/header/minecraft-hud.css", "../components/end/end-encounter.css"], {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const css = (path: string) => sheets[path].replace(/\/\*[\s\S]*?\*\//g, "");

// jsdom has no layout engine, so these guard the specific sources of past horizontal overflow.
describe("responsive layout guards", () => {
  it("never forces the page wider than a 320px viewport with a classic scrollbar", () => {
    const body = css("../index.css").match(/\nbody \{[^}]*\}/)![0];
    expect(body).not.toMatch(/min-width/);
    expect(body).not.toMatch(/overflow-x/);
  });

  it("sizes the fixed HUD from the scrollbar-free viewport, not 100vw", () => {
    const hudCss = css("../components/header/minecraft-hud.css");
    expect(hudCss).not.toMatch(/100vw/);
    expect(hudCss).toMatch(/\.minecraft-hotbar \{[^}]*overflow-x: auto/);
    expect(hudCss).toMatch(/@media \(max-width: 768px\)[\s\S]*min-width: 52px/);
  });

  it("keeps keyboard-focused content clear of the fixed HUD", () => {
    expect(css("../index.css")).toMatch(/html \{[^}]*scroll-padding-bottom: var\(--hud-clearance\)/);
  });

  it("keeps the End arena contained and every mobile crystal target at least 44px", () => {
    const endCss = css("../components/end/end-encounter.css");
    expect(endCss).not.toMatch(/100vw/);
    expect(endCss).toMatch(/\.end-arena__scene \{[^}]*overflow: hidden/);
    expect(endCss).toMatch(/\.end-crystal \{[^}]*width: 54px;[^}]*height: 54px/);
    expect(endCss).not.toMatch(/\.end-pillar \{[^}]*scale\(/);
  });
});
