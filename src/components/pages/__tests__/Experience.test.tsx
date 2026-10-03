import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Experience from "../Experience";
import MinecraftHUD from "../../header/MinecraftHUD";
import { DEFAULT_EXPERIENCE_ID, employerName, experience, formatDates } from "../experience/experienceData";
import { ROLE_SOURCES, skillItems } from "../skills/skillItems";

const entry = (id: string) => experience.find((role) => role.id === id)!;
const path = () => screen.getByRole("list", { name: "Roles, oldest to newest" });
const node = (title: string) => within(path()).getByRole("button", { name: new RegExp(`^${title.replace(/[()]/g, "\\$&")},`) });
const detail = () => document.getElementById("experience-detail")!;
const detailHeading = () => within(detail()).getByRole("heading", { level: 3 });

beforeEach(() => {
  Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
});

describe("experience data", () => {
  it("has unique ids, summaries, bullets, technologies and 3–6 evidence items per role", () => {
    expect(new Set(experience.map((role) => role.id)).size).toBe(experience.length);
    for (const role of experience) {
      expect(role.title.trim()).not.toBe("");
      expect(role.summary.trim()).not.toBe("");
      expect(role.focus.trim()).not.toBe("");
      expect(role.bullets.length).toBeGreaterThan(0);
      expect(role.technologies.length).toBeGreaterThan(0);
      expect(role.evidenceItems.length).toBeGreaterThanOrEqual(3);
      expect(role.evidenceItems.length).toBeLessThanOrEqual(6);
      role.evidenceItems.forEach((item) => expect(role.bullets[item.supportingBulletIndex]).toBeDefined());
    }
  });

  it("is ordered oldest first with valid, non-inverted dates", () => {
    const month = /^\d{4}-(0[1-9]|1[0-2])$/;
    experience.forEach((role) => {
      expect(role.startDate).toMatch(month);
      if (role.endDate) {
        expect(role.endDate).toMatch(month);
        expect(role.endDate >= role.startDate).toBe(true);
      }
    });
    const starts = experience.map((role) => role.startDate);
    expect(starts).toEqual([...starts].sort());
  });

  it("defaults to the latest role and marks only ongoing roles as current", () => {
    expect(DEFAULT_EXPERIENCE_ID).toBe("skopus-ai");
    experience.forEach((role) => expect(role.advancementType === "current").toBe(role.endDate === null));
  });

  it("credits the DNB roles to Tata Consultancy Services with titles and dates preserved", () => {
    const se1 = entry("tcs-dnb-se1");
    const se2 = entry("tcs-dnb-se2");
    expect(employerName(se1)).toBe("Tata Consultancy Services (DNB)");
    expect(employerName(se2)).toBe("Tata Consultancy Services (DNB)");
    expect([se1.title, formatDates(se1)]).toEqual(["Software Engineer I", "Nov 2020 – Mar 2023"]);
    expect([se2.title, formatDates(se2)]).toEqual(["Software Engineer II", "Apr 2023 – Jul 2024"]);
    expect(se2.advancementType).toBe("milestone");
  });

  it("keeps Skopus AI and Tesserae as on the current site", () => {
    expect(employerName(entry("skopus-ai"))).toBe("Skopus AI");
    expect(formatDates(entry("skopus-ai"))).toBe("May 2026 – Present");
    expect(employerName(entry("ub-tesserae"))).toBe("University at Buffalo (Tesserae)");
    expect(formatDates(entry("ub-tesserae"))).toBe("Nov 2025 – Present");
  });

  it("supports every technology Skills attributes to a role", () => {
    const rolesFor: Record<string, string[]> = { "Skopus AI": ["skopus-ai"], Tesserae: ["ub-tesserae"], DNB: ["tcs-dnb-se1", "tcs-dnb-se2"] };
    const unsupported = skillItems.flatMap((skill) => skill.evidence
      .filter((source) => source in rolesFor)
      .filter((source) => {
        const text = rolesFor[source].map(entry).flatMap((role) => [...role.technologies, role.summary, ...role.bullets]).join(" ").toLowerCase();
        return !text.includes(skill.technology.split(" · ")[0].toLowerCase());
      })
      .map((source) => `${skill.technology} → ${source}`));
    expect(ROLE_SOURCES).toEqual(["Skopus AI", "Tesserae", "DNB"]);
    // Both roles describe API work but never name REST: a known, documented gap for the content-consistency pass; anything new here is a regression.
    expect(unsupported).toEqual(["REST APIs → Skopus AI", "REST APIs → Tesserae"]);
  });
});

describe("Experience advancements", () => {
  it("uses a semantic Professional Experience heading with the Advancements label", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { level: 2, name: "Professional Experience" })).toBeInTheDocument();
    expect(screen.getByText("Advancements")).toBeInTheDocument();
  });

  it("renders every role's organization, title, dates and focus regardless of selection", () => {
    render(<Experience />);
    const items = within(path()).getAllByRole("listitem");
    expect(items).toHaveLength(experience.length);
    experience.forEach((role, index) => {
      const item = within(items[index]);
      expect(item.getByRole("heading", { level: 3, name: role.title })).toBeInTheDocument();
      expect(item.getByText(employerName(role))).toBeInTheDocument();
      expect(item.getByText(formatDates(role))).toBeInTheDocument();
      expect(item.getByText(role.focus)).toBeInTheDocument();
    });
    expect(within(path()).getAllByText("Tata Consultancy Services (DNB)")).toHaveLength(2);
  });

  it("selects the latest role by default and exposes the selected state", () => {
    render(<Experience />);
    expect(detailHeading()).toHaveTextContent("Founding Engineer, Part-time");
    expect(node("Founding Engineer, Part-time")).toHaveAttribute("aria-pressed", "true");
    expect(node("Software Engineer I")).toHaveAttribute("aria-pressed", "false");
  });

  it("gives nodes meaningful names, current state and a described focus line", () => {
    render(<Experience />);
    const button = node("Software Engineer II");
    expect(button).toHaveAccessibleName("Software Engineer II, Tata Consultancy Services (DNB), Apr 2023 – Jul 2024");
    expect(button).toHaveAccessibleDescription(entry("tcs-dnb-se2").focus);
    expect(node("Founding Engineer, Part-time")).toHaveAccessibleName(/current role$/);
    expect(within(path()).getAllByText("Current")).toHaveLength(2);
  });

  it("switches the detail panel on click and announces it politely", () => {
    render(<Experience />);
    fireEvent.click(node("Software Engineer II"));
    expect(detailHeading()).toHaveTextContent("Software Engineer II");
    expect(node("Software Engineer II")).toHaveAttribute("aria-pressed", "true");
    expect(node("Founding Engineer, Part-time")).toHaveAttribute("aria-pressed", "false");
    const status = document.querySelector("[aria-live='polite']")!;
    expect(status).toHaveTextContent("Showing Software Engineer II, Tata Consultancy Services (DNB), Apr 2023 – Jul 2024");
  });

  it("selects the focused role with Enter and Space", () => {
    render(<Experience />);
    // Native buttons turn Enter/Space into click; jsdom does not, so click is what gets dispatched.
    const button = node("Software Engineer I");
    button.focus();
    fireEvent.click(button);
    expect(detailHeading()).toHaveTextContent("Software Engineer I");
    expect(button.tagName).toBe("BUTTON");
  });

  it("moves focus chronologically with arrows and Home/End without selecting", () => {
    render(<Experience />);
    const first = node("Software Engineer I");
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(node("Software Engineer II")).toHaveFocus();
    fireEvent.keyDown(node("Software Engineer II"), { key: "ArrowDown" });
    expect(node("Software Engineer, Part-time")).toHaveFocus();
    fireEvent.keyDown(node("Software Engineer, Part-time"), { key: "ArrowUp" });
    expect(node("Software Engineer II")).toHaveFocus();
    fireEvent.keyDown(node("Software Engineer II"), { key: "End" });
    expect(node("Founding Engineer, Part-time")).toHaveFocus();
    fireEvent.keyDown(node("Founding Engineer, Part-time"), { key: "ArrowRight" });
    expect(node("Founding Engineer, Part-time")).toHaveFocus();
    fireEvent.keyDown(node("Founding Engineer, Part-time"), { key: "Home" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(first).toHaveFocus();
    expect(detailHeading()).toHaveTextContent("Founding Engineer, Part-time");
  });

  it("shows organization, role, dates, focus, impact, evidence and tools for the selected role", () => {
    render(<Experience />);
    for (const role of experience) {
      fireEvent.click(node(role.title));
      const panel = within(detail());
      expect(panel.getByText("Organization", { selector: "dt" }).nextElementSibling).toHaveTextContent(employerName(role));
      expect(panel.getByText("Role", { selector: "dt" }).nextElementSibling).toHaveTextContent(role.title);
      expect(panel.getByText("Dates", { selector: "dt" }).nextElementSibling).toHaveTextContent(formatDates(role));
      expect(panel.getByText(role.summary)).toBeInTheDocument();
      role.bullets.forEach((bullet) => expect(panel.getByText(bullet)).toBeInTheDocument());
      role.evidenceItems.forEach((item) => expect(panel.getByText(item.label)).toBeInTheDocument());
      const tools = panel.getByRole("list", { name: `${role.title} technologies` });
      expect(within(tools).getAllByRole("listitem").map((li) => li.textContent)).toEqual(role.technologies);
    }
  });

  // These are the only quantified claims backed by the source resume; if a copy
  // edit drops one, that is a regression rather than a wording change.
  it("keeps the verified metrics on their own roles", () => {
    render(<Experience />);
    const metricsFor = {
      "Software Engineer I": [/800 ms to 500 ms/, /25\+ endpoint service/, /25\+ reusable React/],
      "Software Engineer II": [/15\+ endpoints/, /20\+ production releases/],
      "Software Engineer, Part-time": [/50,000 records to 50/, /57\+ admin endpoints/],
      "Founding Engineer, Part-time": [/13K\+ source-line/, /8-endpoint/],
    };
    for (const [title, metrics] of Object.entries(metricsFor)) {
      fireEvent.click(node(title));
      metrics.forEach((metric) => expect(within(detail()).getAllByText(metric).length).toBeGreaterThan(0));
    }
  });

  it("does not carry the unverifiable metrics the previous copy claimed", () => {
    render(<Experience />);
    for (const role of experience) {
      fireEvent.click(node(role.title));
      expect(within(detail()).queryByText(/500K\+|99\.8%|95%\+|35% reduction/)).not.toBeInTheDocument();
    }
  });

  it("links Tesserae to its site in a new tab", () => {
    render(<Experience />);
    fireEvent.click(node("Software Engineer, Part-time"));
    const link = within(detail()).getByRole("link", { name: /University at Buffalo \(Tesserae\)/ });
    expect(link).toHaveAttribute("href", "https://tesserae.caset.buffalo.edu/");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides connectors and frames from assistive technology", () => {
    render(<Experience />);
    expect(document.querySelector(".xp-connectors")).toHaveAttribute("aria-hidden", "true");
    document.querySelectorAll(".xp-node__frame").forEach((frame) => expect(frame).toHaveAttribute("aria-hidden", "true"));
  });
});

describe("Experience coexisting with the hotbar", () => {
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
      <section id="experience"><Experience /></section>
      <section id="projects">projects</section>
    </>,
  );

  it("keeps tree arrow keys inside the tree", () => {
    renderPage();
    const hotbarSelected = () => document.querySelector("[data-hotbar-index][aria-pressed='true'], [data-hotbar-index].is-selected");
    const before = hotbarSelected();
    const first = node("Software Engineer I");
    first.focus();
    const event = fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(event).toBe(false);
    expect(node("Software Engineer II")).toHaveFocus();
    expect(hotbarSelected()).toBe(before);
    expect(window.location.hash).toBe("");
  });

  it("keeps number shortcuts working without changing the selected role", () => {
    renderPage();
    const button = node("Software Engineer II");
    fireEvent.click(button);
    button.focus();
    fireEvent.keyDown(button, { key: "5" });
    expect(window.location.hash).toBe("#projects");
    expect(detailHeading()).toHaveTextContent("Software Engineer II");
  });

  it("does not move the hotbar when a role is selected", () => {
    renderPage();
    fireEvent.click(node("Software Engineer I"));
    expect(window.location.hash).toBe("");
  });
});
