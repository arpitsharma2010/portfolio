import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import usePreferredTheme from "./usePreferredTheme";

describe("Spawn sky cycle", () => {
  let reduced = false;
  beforeEach(() => {
    vi.useFakeTimers();
    window.localStorage.clear();
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn((query: string) => ({ matches: query.includes("reduced-motion") ? reduced : false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    });
  });
  afterEach(() => { reduced = false; vi.useRealTimers(); });

  it("tracks explicit day-to-night and night-to-day directions and clears stale transitions", () => {
    const { result } = renderHook(() => usePreferredTheme());
    act(() => result.current.toggleTheme(undefined, true));
    expect(result.current.theme).toBe("dark");
    expect(result.current.skyTransition?.direction).toBe("dayToNight");
    act(() => result.current.toggleTheme(undefined, true));
    expect(result.current.theme).toBe("light");
    expect(result.current.skyTransition?.direction).toBe("nightToDay");
    act(() => vi.advanceTimersByTime(1300));
    expect(result.current.skyTransition).toBeNull();
  });

  it("changes theme without a sky transition away from Home or with reduced motion", () => {
    const { result } = renderHook(() => usePreferredTheme());
    act(() => result.current.toggleTheme(undefined, false));
    expect(result.current).toMatchObject({ theme: "dark", skyTransition: null });
    reduced = true;
    act(() => result.current.toggleTheme(undefined, true));
    expect(result.current).toMatchObject({ theme: "light", skyTransition: null });
  });
});
