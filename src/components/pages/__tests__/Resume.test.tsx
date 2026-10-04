import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Resume from "../Resume";
import MinecraftHUD from "../../header/MinecraftHUD";
import { ACTION_LABEL, PAGE_HEADING, RESUME_HREF } from "./resumeContent.fixture";

let spreadMatches = false;
let notifySpread: (() => void) | null = null;

beforeEach(() => {
  spreadMatches = false;
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn((query: string) => ({
      get matches() { return query.includes("min-width") ? spreadMatches : false; },
      addEventListener: vi.fn((_: string, listener: () => void) => { notifySpread = listener; }),
      removeEventListener: vi.fn(),
    })),
  });
});

const status = () => screen.getByText(/^Pages? \d/);
const prev = () => screen.getByRole("button", { name: "Previous page" });
const next = () => screen.getByRole("button", { name: "Next page" });
const visibleTitles = () =>
  screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);

describe("Resume written book (single page)", () => {
  it("opens on the cover without any interaction", () => {
    render(<Resume />);
    expect(status()).toHaveTextContent("Page 1 of 3");
    expect(visibleTitles()).toEqual(["Cover"]);
    expect(prev()).toHaveAttribute("aria-disabled", "true");
    expect(next()).toHaveAttribute("aria-disabled", "false");
  });

  it("turns forward and back and stays within bounds", () => {
    render(<Resume />);
    fireEvent.click(prev());
    expect(status()).toHaveTextContent("Page 1 of 3");
    fireEvent.click(next());
    expect(status()).toHaveTextContent("Page 2 of 3");
    expect(visibleTitles()).toEqual(["Contents"]);
    fireEvent.click(next());
    fireEvent.click(next());
    expect(status()).toHaveTextContent("Page 3 of 3");
    expect(visibleTitles()).toEqual([PAGE_HEADING]);
    expect(next()).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(prev());
    expect(status()).toHaveTextContent("Page 2 of 3");
  });

  it("supports Left/Right/Home/End on the book controls", () => {
    render(<Resume />);
    const button = next();
    button.focus();
    expect(fireEvent.keyDown(button, { key: "ArrowRight" })).toBe(false);
    expect(status()).toHaveTextContent("Page 2 of 3");
    fireEvent.keyDown(button, { key: "End" });
    expect(status()).toHaveTextContent("Page 3 of 3");
    fireEvent.keyDown(button, { key: "ArrowLeft" });
    expect(status()).toHaveTextContent("Page 2 of 3");
    fireEvent.keyDown(button, { key: "Home" });
    expect(status()).toHaveTextContent("Page 1 of 3");
    expect(button).toHaveFocus();
  });

  it("exposes the page state politely and hides decoration", () => {
    const { container } = render(<Resume />);
    expect(status()).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("navigation", { name: "Book pages" })).toBeInTheDocument();
    [".wbook-cover", ".wbook__spine", ".wbook__ribbon", ".wbook__folio"].forEach((selector) =>
      container.querySelectorAll(selector).forEach((node) => expect(node).toHaveAttribute("aria-hidden")));
  });

  it("links the contents page to the existing sections", () => {
    render(<Resume />);
    fireEvent.click(next());
    const contents = screen.getByRole("navigation", { name: "Resume contents" });
    expect(within(contents).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Experience", "#experience"],
      ["Skills", "#skills"],
      ["Projects", "#projects"],
      ["Education", "#education"],
    ]);
  });

  it("keeps the resume link visible on every page and adds one on the printable edition page", () => {
    render(<Resume />);
    for (let page = 0; page < 3; page += 1) {
      const links = screen.getAllByRole("link", { name: ACTION_LABEL });
      expect(links).toHaveLength(page === 2 ? 2 : 1);
      links.forEach((link) => expect(link).toHaveAttribute("href", RESUME_HREF));
      fireEvent.click(next());
    }
    const edition = screen.getByRole("region", { name: PAGE_HEADING });
    expect(within(edition).getByRole("link", { name: ACTION_LABEL })).toHaveAttribute("href", RESUME_HREF);
  });

  it("turns the page when the cover is clicked and never navigates away", () => {
    const { container } = render(<Resume />);
    const cover = container.querySelector(".wbook-cover")!;
    expect(cover.closest("a")).toBeNull();
    expect(fireEvent.click(cover)).toBe(true);
    expect(status()).toHaveTextContent("Page 2 of 3");
    expect(window.location.href).not.toContain("drive.google.com");
  });
});

describe("Resume written book (two-page spread)", () => {
  it("shows pages in pairs and turns a whole spread at a time", () => {
    spreadMatches = true;
    const { container } = render(<Resume />);
    expect(status()).toHaveTextContent("Pages 1–2 of 3");
    expect(visibleTitles()).toEqual(["Cover", "Contents"]);
    fireEvent.click(next());
    expect(status()).toHaveTextContent("Page 3 of 3");
    expect(visibleTitles()).toEqual([PAGE_HEADING]);
    expect(next()).toHaveAttribute("aria-disabled", "true");
    // The last page keeps the two-page layout, with a decorative endpaper opposite it.
    expect(container.querySelector(".wbook__spread")).toHaveClass("is-pair");
    expect(container.querySelector(".wbook__page--endpaper")).toHaveAttribute("aria-hidden");
  });

  it("snaps to the enclosing spread when the viewport widens", () => {
    render(<Resume />);
    fireEvent.click(next());
    expect(status()).toHaveTextContent("Page 2 of 3");
    spreadMatches = true;
    act(() => notifySpread?.());
    expect(status()).toHaveTextContent("Pages 1–2 of 3");
  });
});

describe("Resume coexisting with the hotbar", () => {
  beforeEach(() => window.history.replaceState(null, "", window.location.pathname));
  afterEach(() => window.history.replaceState(null, "", window.location.pathname));

  const renderPage = () => render(
    <>
      <MinecraftHUD theme="light" onThemeToggle={vi.fn()} />
      <section id="education">education</section>
      <section id="resume"><Resume /></section>
    </>,
  );
  const hotbarSelected = () => document.querySelector("[data-hotbar-index][aria-pressed='true'], [data-hotbar-index].is-selected");

  it("keeps book arrow keys inside the book", () => {
    renderPage();
    const before = hotbarSelected();
    const button = next();
    button.focus();
    fireEvent.keyDown(button, { key: "ArrowRight" });
    fireEvent.keyDown(button, { key: "ArrowLeft" });
    expect(hotbarSelected()).toBe(before);
    expect(window.location.hash).toBe("");
  });

  it("keeps number shortcuts working from inside the book", () => {
    renderPage();
    const button = next();
    fireEvent.click(button);
    button.focus();
    fireEvent.keyDown(button, { key: "6" });
    expect(window.location.hash).toBe("#education");
    expect(status()).toHaveTextContent("Page 2 of 3");
  });
});
