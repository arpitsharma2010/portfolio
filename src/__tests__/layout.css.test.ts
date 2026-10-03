import { describe, expect, it } from "vitest";

// Raw glob rather than node:fs (no @types/node); comments stripped so prose can't trip the guards.
const sheets = import.meta.glob(["../index.css", "../components/header/minecraft-hud.css"], {
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
    expect(css("../components/header/minecraft-hud.css")).not.toMatch(/100vw/);
  });

  it("keeps keyboard-focused content clear of the fixed HUD", () => {
    expect(css("../index.css")).toMatch(/html \{[^}]*scroll-padding-bottom: var\(--hud-clearance\)/);
  });
});
