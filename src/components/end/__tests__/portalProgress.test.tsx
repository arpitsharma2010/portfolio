import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { advancePortalFill, usePortalProgress, type PortalProgress } from "../portalProgress";

describe("Portal Crystal filling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    Object.defineProperty(window, "matchMedia", { configurable: true, value: vi.fn(() => ({ matches: false })) });
  });
  afterEach(() => vi.useRealTimers());

  it("fills twelve sockets sequentially, consumes inventory, and cannot go negative or fill twice", () => {
    let state: PortalProgress = { portalState: "filling", filledSockets: 0, inventoryCount: 12, entryRequest: 0 };
    state = advancePortalFill(state);
    expect(state).toMatchObject({ portalState: "filling", filledSockets: 1, inventoryCount: 11 });
    for (let index = 1; index < 12; index += 1) state = advancePortalFill(state);
    expect(state).toEqual({ portalState: "active", filledSockets: 12, inventoryCount: 0, entryRequest: 1 });
    expect(advancePortalFill(state)).toBe(state);
  });

  it("does nothing without all crystals and completes a single activation", () => {
    const portal = document.createElement("section");
    portal.id = "end-encounter";
    document.body.append(portal);
    vi.spyOn(portal, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 100, 100, 100));
    const { result, rerender } = renderHook(({ count }) => usePortalProgress(count), { initialProps: { count: 11 } });
    act(() => result.current.activatePortal());
    expect(result.current.portalState).toBe("locked");
    rerender({ count: 12 });
    expect(result.current.portalState).toBe("ready");
    act(() => result.current.activatePortal());
    expect(result.current.portalState).toBe("filling");
    act(() => vi.advanceTimersByTime(900));
    expect(result.current).toMatchObject({ portalState: "active", filledSockets: 12, inventoryCount: 0, entryRequest: 1 });
    act(() => result.current.activatePortal());
    expect(result.current.entryRequest).toBe(1);
    portal.remove();
  });
});
