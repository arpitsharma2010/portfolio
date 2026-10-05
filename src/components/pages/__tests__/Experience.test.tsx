import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Experience from "../Experience";
import MinecraftHUD from "../../header/MinecraftHUD";
import { employerName, experience, formatDates } from "../experience/experienceData";
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

  it("marks only ongoing roles as current", () => {
    experience.forEach((role) => expect(role.advancementType === "current").toBe(role.endDate === null));
  });

  it("follows the four roles in the current positioning", () => {
    expect(experience.map((role) => role.id)).toEqual(["tcs-dnb-se1", "tcs-dnb-se2", "ub-tesserae", "skopus-ai"]);
  });

  it("uses current endpoint claims without outdated metrics", () => {
    expect(entry("tcs-dnb-se2").bullets[0]).toMatch(/15\+ undocumented Sbanken REST endpoints/);
    expect(JSON.stringify(experience)).not.toMatch(/500K|99%|13K\+|99.8%/);
  });

  it("credits the DNB roles to Tata Consultancy Services with the authoritative resume dates", () => {
    const se1 = entry("tcs-dnb-se1");
    const se2 = entry("tcs-dnb-se2");
    expect(employerName(se1)).toBe("Tata Consultancy Services (DNB)");
    expect(employerName(se2)).toBe("Tata Consultancy Services (DNB)");
    expect([se1.title, formatDates(se1)]).toEqual(["Software Engineer I", "Nov 2020 – Mar 2023"]);
    expect([se2.title, formatDates(se2)]).toEqual(["Software Engineer II", "Apr 2023 – Jul 2024"]);
    expect(se2.advancementType).toBe("milestone");
  });

  it("chains the TCS roles without gaps or overlaps and keeps the newer roles overlapping honestly", () => {
    const [se1, se2, tesserae, skopus] = experience;
    const nextMonth = (value: string) => {
      const [year, month] = value.split("-").map(Number);
      return month === 12 ? `${year + 1}-01` : `${year}-${String(month + 1).padStart(2, "0")}`;
    };
    expect(se2.startDate).toBe(nextMonth(se1.endDate!));
    expect(tesserae.startDate > se2.endDate!).toBe(true);
    expect([tesserae.endDate, skopus.endDate]).toEqual([null, null]);
    expect(skopus.startDate > tesserae.startDate).toBe(true);
  });

  it("keeps Skopus AI and Tesserae as on the current site", () => {
    expect(employerName(entry("skopus-ai"))).toBe("Skopus AI");
    expect(formatDates(entry("skopus-ai"))).toBe("May 2026 – Present");
    expect(employerName(entry("ub-tesserae"))).toBe("University at Buffalo (Tesserae)");
    expect(formatDates(entry("ub-tesserae"))).toBe("Feb 2026 – Present");
  });

  it("preserves professional language attribution and project evidence", () => {
    expect(ROLE_SOURCES).toEqual(["Skopus AI", "Tesserae", "TCS (DNB)"]);
    for (const id of ["java", "spring-boot"]) {
      expect(skillItems.find((skill) => skill.id === id)!.evidence).toEqual(["Library Management System"]);
    }
    for (const id of ["csharp", "dotnet"]) {
      expect(skillItems.find((skill) => skill.id === id)!.evidence).toEqual(["TCS (DNB)"]);
    }
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

  it("starts with no role selected and the whole path visible, then exposes the selected state", () => {
    render(<Experience />);
    for (const role of experience) expect(node(role.title)).toHaveAttribute("aria-pressed", "false");
    expect(detail()).not.toBeVisible();
    expect(detail()).toBeEmptyDOMElement();
    expect(document.querySelector("[aria-live='polite']")).toBeEmptyDOMElement();

    fireEvent.click(node("Founding Engineer / AI Career Platform"));
    expect(detail()).toBeVisible();
    expect(detailHeading()).toHaveTextContent("Founding Engineer / AI Career Platform");
    expect(node("Founding Engineer / AI Career Platform")).toHaveAttribute("aria-pressed", "true");
    expect(node("Software Engineer I")).toHaveAttribute("aria-pressed", "false");
  });

  it("gives nodes meaningful names, current state and a described focus line", () => {
    render(<Experience />);
    const button = node("Software Engineer II");
    expect(button).toHaveAccessibleName("Software Engineer II, Tata Consultancy Services (DNB), Apr 2023 – Jul 2024");
    expect(button).toHaveAccessibleDescription(entry("tcs-dnb-se2").focus);
    expect(node("Founding Engineer / AI Career Platform")).toHaveAccessibleName(/current role$/);
    expect(within(path()).getAllByText("Current")).toHaveLength(2);
  });

  it("switches the detail panel on click and announces it politely", () => {
    render(<Experience />);
    fireEvent.click(node("Software Engineer II"));
    expect(detailHeading()).toHaveTextContent("Software Engineer II");
    expect(node("Software Engineer II")).toHaveAttribute("aria-pressed", "true");
    expect(node("Founding Engineer / AI Career Platform")).toHaveAttribute("aria-pressed", "false");
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
    expect(node("Software Engineer")).toHaveFocus();
    fireEvent.keyDown(node("Software Engineer"), { key: "ArrowUp" });
    expect(node("Software Engineer II")).toHaveFocus();
    fireEvent.keyDown(node("Software Engineer II"), { key: "End" });
    expect(node("Founding Engineer / AI Career Platform")).toHaveFocus();
    fireEvent.keyDown(node("Founding Engineer / AI Career Platform"), { key: "ArrowRight" });
    expect(node("Founding Engineer / AI Career Platform")).toHaveFocus();
    fireEvent.keyDown(node("Founding Engineer / AI Career Platform"), { key: "Home" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(first).toHaveFocus();
    expect(detail()).toBeEmptyDOMElement();
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

  it("keeps current quantified impact on the corresponding roles", () => {
    render(<Experience />);
    const metricsFor = {
      "Software Engineer I": [/5\+ services/, /25\+ React/],
      "Software Engineer II": [/15\+ undocumented/, /20\+ releases/],
      "Software Engineer": [/700 KB/, /7 long-running/, /57 of 60/],
      "Founding Engineer / AI Career Platform": [/50\+ REST API/, /14 validation schemas/, /21 fallback paths/],
    };
    for (const [title, metrics] of Object.entries(metricsFor)) {
      fireEvent.click(node(title));
      metrics.forEach((metric) => expect(within(detail()).getAllByText(metric).length).toBeGreaterThan(0));
    }
  });

  it("links Tesserae to its site in a new tab", () => {
    render(<Experience />);
    fireEvent.click(node("Software Engineer"));
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
