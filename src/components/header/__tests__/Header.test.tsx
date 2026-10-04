import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import Header from "../Header";

afterEach(() => {
  vi.unstubAllGlobals();
  window.localStorage.clear();
  window.history.replaceState(null, "", window.location.pathname);
});

describe("Header", () => {
  it("keeps identity in the top header and primary navigation in the HUD", () => {
    render(<Header theme="light" onThemeToggle={vi.fn()} />);

    expect(screen.getByRole("link", { name: /arpit sharma software engineer/i })).toHaveAttribute("href", "#home");
    expect(screen.getByLabelText("Player status")).toHaveTextContent("Available for opportunities");
    expect(screen.getByRole("navigation", { name: "Portfolio hotbar navigation" })).toBeInTheDocument();
  });

  it("renders exactly nine hotbar controls", () => {
    render(<Header theme="light" onThemeToggle={vi.fn()} />);
    const hotbar = screen.getByRole("navigation", { name: "Portfolio hotbar navigation" });

    expect(within(hotbar).getAllByRole("button")).toHaveLength(9);
    expect(within(hotbar).getByRole("button", { name: "Compass — Home" })).toHaveAttribute("data-href", "#home");
    expect(within(hotbar).getByRole("button", { name: "Portal — Contact" })).toHaveAttribute("data-href", "#contact");
  });

  it("invokes theme switching from slot nine", () => {
    const onThemeToggle = vi.fn();
    render(<Header theme="light" onThemeToggle={onThemeToggle} />);

    fireEvent.click(screen.getByRole("button", { name: "Clock — Switch to night mode" }));
    expect(onThemeToggle).toHaveBeenCalledOnce();
  });

  it("toggles the reward sound with a real pressed-state button and remembers the choice", () => {
    const { unmount } = render(<Header theme="light" onThemeToggle={vi.fn()} />);
    const toggle = screen.getByRole("button", { name: "Sound On" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Sound Off" })).toHaveAttribute("aria-pressed", "false");
    expect(window.localStorage.getItem("rewardSound")).toBe("off");
    unmount();
    render(<Header theme="light" onThemeToggle={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Sound Off" })).toBeInTheDocument();
  });

  it("keeps navigating when the browser refuses audio", () => {
    vi.stubGlobal("AudioContext", class { constructor() { throw new Error("NotAllowedError"); } });
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    render(<><Header theme="light" onThemeToggle={vi.fn()} /><section id="skills">skills</section></>);
    const skills = screen.getByRole("button", { name: "Diamond Pickaxe — Skills" });
    fireEvent.pointerDown(skills);
    fireEvent.click(skills);
    fireEvent.keyDown(document, { key: "3" });
    expect(window.location.hash).toBe("#skills");
  });
});
