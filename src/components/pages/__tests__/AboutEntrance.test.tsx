import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ComponentType } from "react";
import MinecraftHUD from "../../header/MinecraftHUD";

let About: ComponentType;
let callbacks: { callback: IntersectionObserverCallback; target?: Element }[];
let reduced = false;
let motionChange: (() => void) | undefined;
const enter = (visible: boolean) => act(() => {
  for (const { callback, target } of callbacks) {
    if (target?.classList.contains("about-entrance")) {
      callback([{ isIntersecting: visible, target } as IntersectionObserverEntry], {} as IntersectionObserver);
    }
  }
});
const phase = () => document.querySelector(".about-entrance")?.getAttribute("data-entrance");
const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

beforeEach(async () => {
  vi.useFakeTimers();
  vi.resetModules();
  callbacks = [];
  reduced = false;
  motionChange = undefined;
  vi.stubGlobal("IntersectionObserver", class {
    record: typeof callbacks[number];
    constructor(callback: IntersectionObserverCallback) {
      this.record = { callback };
      callbacks.push(this.record);
    }
    observe(target: Element) { this.record.target = target; }
    disconnect() {}
    unobserve() {}
  });
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return reduced; },
    addEventListener: (_type: string, listener: () => void) => { motionChange = listener; },
    removeEventListener: vi.fn(),
  })));
  About = (await import("../About")).default;
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", window.location.pathname);
});

const renderEntrance = () => render(<About />);

describe("About entrance", () => {
  it("starts on first viewport entry, retains content and reveals it at the burst", () => {
    renderEntrance();
    const inventory = screen.getByRole("grid", { name: "Profile inventory" });
    expect(phase()).toBe("idle");
    enter(true);
    expect(phase()).toBe("charge");
    expect(screen.getByRole("grid", { name: "Profile inventory" })).toBe(inventory);
    expect(document.querySelector(".about-entrance__effect")).toHaveAttribute("aria-hidden", "true");
    advance(949);
    expect(phase()).toBe("charge");
    advance(1);
    expect(phase()).toBe("burst");
    expect(document.querySelectorAll(".about-entrance__burst i")).toHaveLength(24);
    expect(screen.getByRole("grid", { name: "Profile inventory" })).toBe(inventory);
    advance(400);
    expect(phase()).toBe("idle");
    expect(document.querySelector(".about-entrance__effect")).toBeNull();
  });

  it("does not replay on a second entry or a React remount in the same page session", () => {
    const view = renderEntrance();
    enter(true);
    advance(1350);
    enter(false);
    enter(true);
    expect(phase()).toBe("idle");
    view.unmount();
    renderEntrance();
    enter(true);
    expect(phase()).toBe("idle");
  });

  it("skips reduced motion, including later entries after the preference changes", () => {
    reduced = true;
    const view = renderEntrance();
    enter(true);
    expect(phase()).toBe("idle");
    expect(screen.getByRole("grid", { name: "Profile inventory" })).toBeInTheDocument();
    view.unmount();
    reduced = false;
    renderEntrance();
    enter(true);
    expect(phase()).toBe("idle");
  });

  it.each([200, 1000])("finishes safely when scrolled past at %ims", (ms) => {
    renderEntrance();
    enter(true);
    advance(ms);
    enter(false);
    expect(phase()).toBe("idle");
    advance(2000);
    enter(true);
    expect(phase()).toBe("idle");
  });

  it("immediately reveals inventory when keyboard focus enters without moving focus", () => {
    renderEntrance();
    enter(true);
    const button = screen.getByRole("button", { name: "Book, Education" });
    act(() => button.focus());
    expect(phase()).toBe("idle");
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("skips if reduced motion is enabled during the effect", () => {
    renderEntrance();
    enter(true);
    reduced = true;
    act(() => motionChange?.());
    expect(phase()).toBe("idle");
    advance(2000);
    expect(phase()).toBe("idle");
  });

  it("clears pending callbacks on unmount", () => {
    const view = renderEntrance();
    enter(true);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("keeps hotbar navigation and inventory selection available during charge", () => {
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    render(<><MinecraftHUD theme="light" onThemeToggle={vi.fn()} /><section id="about"><About /></section><section id="skills">Skills</section></>);
    enter(true);
    expect(phase()).toBe("charge");
    fireEvent.click(screen.getByRole("button", { name: "Book, Education" }));
    expect(screen.getByRole("button", { name: "Book, Education" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.keyDown(screen.getByRole("button", { name: "Book, Education" }), { key: "3" });
    expect(window.location.hash).toBe("#skills");
    expect(document.querySelector('[data-hotbar-index="2"]')).toHaveAttribute("aria-pressed", "true");
  });
});
