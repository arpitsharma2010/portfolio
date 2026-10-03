import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Education from "../Education";
import MinecraftHUD from "../../header/MinecraftHUD";
import { certifications, education } from "../education/educationData";
import { CERTIFICATIONS, DEGREES } from "./educationContent.fixture";

const degreeShelf = () => screen.getByRole("list", { name: "Degrees" });
const certShelf = () => screen.getByRole("list", { name: "Certifications" });
const book = (name: string) => screen.getByRole("button", { name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")},`) });
const detail = () => document.getElementById("education-detail")!;
const detailTitle = () => within(detail()).getByRole("heading", { level: 3 });

beforeEach(() => {
  Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
});

describe("Education data", () => {
  it("matches the frozen content exactly, in the original order", () => {
    const withoutId = <T extends { id: string }>(item: T) => Object.fromEntries(Object.entries(item).filter(([key]) => key !== "id"));
    expect(education.map((item) => ({ ...withoutId(item), logo: item.logo.replace(/^.*?(Education\/)/, "$1") }))).toEqual(DEGREES);
    expect(certifications.map(withoutId)).toEqual(CERTIFICATIONS);
  });
});

describe("Education enchanting room", () => {
  it("shows every degree and certification without any interaction", () => {
    render(<Education />);
    expect(within(degreeShelf()).getAllByRole("listitem").filter((li) => li.parentElement === degreeShelf())).toHaveLength(2);
    expect(within(certShelf()).getAllByRole("listitem")).toHaveLength(3);
    DEGREES.forEach((degree) => {
      const card = book(degree.degree).closest("li")!;
      [degree.degree, degree.institution, degree.period, degree.detail].forEach((value) => expect(card).toHaveTextContent(value));
    });
    CERTIFICATIONS.forEach((cert) => {
      const card = book(cert.name).closest("li")!;
      [cert.name, `${cert.issuer} · ${cert.date}`].forEach((value) => expect(card).toHaveTextContent(value));
    });
  });

  it("keeps each degree's coursework behind a closed disclosure on its book", () => {
    render(<Education />);
    const summaries = within(degreeShelf()).getAllByText("Coursework");
    expect(summaries).toHaveLength(2);
    summaries.forEach((summary) => expect(summary.closest("details")).not.toHaveAttribute("open"));
  });

  it("selects the first degree by default and fills the detail panel with its exact content", () => {
    render(<Education />);
    const [first] = DEGREES;
    expect(book(first.degree)).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
    expect(detailTitle()).toHaveTextContent(first.degree);
    expect(detail()).toHaveTextContent("Degree");
    [first.institution, first.period, first.detail].forEach((value) => expect(detail()).toHaveTextContent(value));
    expect(within(detail()).getAllByRole("listitem").map((li) => li.textContent)).toEqual(first.courses);
  });

  it("moves the selection to another degree on a single click or tap", () => {
    render(<Education />);
    const second = DEGREES[1];
    fireEvent.click(book(second.degree));
    expect(book(second.degree)).toHaveAttribute("aria-pressed", "true");
    expect(book(DEGREES[0].degree)).toHaveAttribute("aria-pressed", "false");
    expect(detailTitle()).toHaveTextContent(second.degree);
    expect(within(detail()).getByRole("link", { name: new RegExp(second.institution) })).toHaveAttribute("href", second.website);
  });

  it("shows only the existing certification fields when a certification is selected", () => {
    render(<Education />);
    for (const cert of CERTIFICATIONS) {
      fireEvent.click(book(cert.name));
      expect(book(cert.name)).toHaveAttribute("aria-pressed", "true");
      expect(detailTitle()).toHaveTextContent(cert.name);
      expect(detail()).toHaveTextContent("Certification");
      expect(detail()).toHaveTextContent(cert.issuer);
      expect(detail()).toHaveTextContent(cert.date);
      expect(within(detail()).getByRole("link", { name: /verify/i })).toHaveAttribute("href", cert.url);
      expect(within(detail()).queryByRole("list")).toBeNull();
    }
  });

  it("announces the selection politely", () => {
    render(<Education />);
    fireEvent.click(book(CERTIFICATIONS[2].name));
    expect(document.querySelector("[aria-live='polite']")).toHaveTextContent(`Showing certification: ${CERTIFICATIONS[2].name}`);
  });

  it("moves focus with arrow keys inside one shelf and selects with Enter/Space as a native button", () => {
    render(<Education />);
    const first = book(DEGREES[0].degree);
    first.focus();
    expect(fireEvent.keyDown(first, { key: "ArrowRight" })).toBe(false);
    expect(book(DEGREES[1].degree)).toHaveFocus();
    fireEvent.keyDown(book(DEGREES[1].degree), { key: "ArrowRight" });
    expect(book(DEGREES[1].degree)).toHaveFocus();

    const cert = book(CERTIFICATIONS[0].name);
    cert.focus();
    fireEvent.keyDown(cert, { key: "End" });
    expect(book(CERTIFICATIONS[2].name)).toHaveFocus();
    expect(book(CERTIFICATIONS[2].name).tagName).toBe("BUTTON");
  });

  it("gives every book a meaningful name and keeps links reachable above the hit area", () => {
    render(<Education />);
    DEGREES.forEach((degree) => expect(book(degree.degree)).toHaveAccessibleName(`${degree.degree}, ${degree.institution}, ${degree.period}`));
    CERTIFICATIONS.forEach((cert) => {
      expect(book(cert.name)).toHaveAccessibleName(`${cert.name}, ${cert.issuer}, ${cert.date}`);
      expect(within(certShelf()).getByRole("link", { name: new RegExp(`Verify ${cert.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`) })).toHaveAttribute("href", cert.url);
    });
  });

  it("hides the table, glyphs, orbs and decorative shelves from assistive technology", () => {
    const { container } = render(<Education />);
    expect(container.querySelector(".ench-table")).toHaveAttribute("aria-hidden", "true");
    const spines = container.querySelectorAll(".ench-spines");
    expect(spines.length).toBeGreaterThan(0);
    spines.forEach((shelf) => {
      expect(shelf).toHaveAttribute("aria-hidden", "true");
      expect(shelf.textContent).toBe("");
      expect(shelf.querySelector("button, a")).toBeNull();
    });
    container.querySelectorAll(".ench-book__cover").forEach((cover) => expect(cover).toHaveAttribute("aria-hidden", "true"));
  });

  it("keeps the semantic heading and a decorative room label", () => {
    render(<Education />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Education & certifications");
    expect(screen.getByText("Enchanting Room")).toBeInTheDocument();
  });
});

describe("Education coexisting with the hotbar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    });
    window.history.replaceState(null, "", window.location.pathname);
  });
  afterEach(() => window.history.replaceState(null, "", window.location.pathname));

  const renderPage = () => render(
    <>
      <MinecraftHUD theme="light" onThemeToggle={vi.fn()} />
      <section id="projects">projects</section>
      <section id="education"><Education /></section>
    </>,
  );

  it("keeps shelf arrow keys inside the shelf", () => {
    renderPage();
    const hotbarSelected = () => document.querySelector("[data-hotbar-index][aria-pressed='true'], [data-hotbar-index].is-selected");
    const before = hotbarSelected();
    const first = book(CERTIFICATIONS[0].name);
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(book(CERTIFICATIONS[1].name)).toHaveFocus();
    expect(hotbarSelected()).toBe(before);
    expect(window.location.hash).toBe("");
  });

  it("keeps number shortcuts working without changing the selected book", () => {
    renderPage();
    const cert = book(CERTIFICATIONS[1].name);
    fireEvent.click(cert);
    cert.focus();
    fireEvent.keyDown(cert, { key: "5" });
    expect(window.location.hash).toBe("#projects");
    expect(detailTitle()).toHaveTextContent(CERTIFICATIONS[1].name);
  });

  it("does not move the hotbar when a book is selected", () => {
    renderPage();
    fireEvent.click(book(DEGREES[1].degree));
    expect(window.location.hash).toBe("");
  });
});
