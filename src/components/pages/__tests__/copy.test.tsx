// A find-and-replace once stripped every em dash from the page copy without
// putting anything in its place, which shipped run-on sentences and doubled
// spaces. Fail here instead of on the live site.
//
// Sources are read through Vite's raw glob rather than node:fs so the test
// needs no @types/node.
const pageSources = import.meta.glob("../*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const offenders = (predicate: (line: string) => boolean): string[] =>
  Object.entries(pageSources).flatMap(([path, source]) =>
    source
      .split("\n")
      // JSX collapses a line's leading indentation, so only interior runs count.
      .map((line, index) => ({ at: `${path}:${index + 1}`, text: line.trim() }))
      .filter(({ text }) => predicate(text))
      .map(({ at, text }) => `${at}: ${text}`),
  );

describe("page copy", () => {
  it("checks every page component", () => {
    expect(Object.keys(pageSources).length).toBeGreaterThan(5);
  });

  it("uses no em dashes", () => {
    expect(offenders((line) => line.includes("—"))).toEqual([]);
  });

  it("has no doubled spaces", () => {
    expect(offenders((line) => line.includes("  "))).toEqual([]);
  });
});
