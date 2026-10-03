import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Skills from "../Skills";
import MinecraftHUD from "../../header/MinecraftHUD";
import { coreToolkitItems, PROJECT_SOURCES, ROLE_SOURCES, SKILL_CATEGORIES, skillItems } from "../skills/skillItems";

const chest = () => screen.getByRole("grid", { name: "Large Chest: technical skills" });
const chestItems = () => within(chest()).getAllByRole("button");
const detail = () => screen.getByText("Selected item").closest("section")!;
const detailHeading = () => within(detail()).getByRole("heading", { level: 3 });
const tab = (name: string) => within(screen.getByRole("group", { name: /category/ })).getByRole("button", { name });
const slot = (technology: string) => within(chest()).getByRole("button", { name: new RegExp(`^${technology.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")},`) });

describe("skills data", () => {
  it("gives every skill a unique id, valid category, technology and evidence", () => {
    const categoryIds = SKILL_CATEGORIES.map((category) => category.id) as string[];
    const sources = [...ROLE_SOURCES, ...PROJECT_SOURCES] as string[];
    expect(new Set(skillItems.map((item) => item.id)).size).toBe(skillItems.length);
    for (const item of skillItems) {
      expect(categoryIds).toContain(item.categoryId);
      expect(item.technology.trim()).not.toBe("");
      expect(item.summary.trim()).not.toBe("");
      expect(item.uses.length).toBeGreaterThan(0);
      expect(item.evidence.length).toBeGreaterThan(0);
      item.evidence.forEach((source) => expect(sources).toContain(source));
      expect(item.quantity).toBeUndefined();
    }
  });

  it("tags TCS evidence consistently and cites only TCS roles for REST APIs", () => {
    const sources = skillItems.flatMap((item) => item.evidence) as string[];
    expect(sources).not.toContain("DNB");
    const evidence = (id: string) => skillItems.find((item) => item.id === id)!.evidence;
    expect(evidence("rest-apis")).toEqual(["TCS (DNB)", "TCS (Trainee)"]);
    expect(evidence("java")).toEqual(["TCS (Trainee)", "Library Management System"]);
    expect(evidence("spring-boot")).toEqual(["TCS (Trainee)", "Library Management System"]);
  });

  it("never encodes proficiency in rarity and only adds technologies with site evidence", () => {
    expect(skillItems.every((item) => item.rarity === undefined || item.rarity === "enchanted")).toBe(true);
    const technologies = skillItems.map((item) => item.technology);
    for (const unsupported of ["gRPC", "Kubernetes", "JavaScript", "Entity Framework"]) {
      expect(technologies).not.toContain(unsupported);
    }
  });
});

describe("Skills chest", () => {
  it("renders the semantic heading, chest presentation and every skill", () => {
    render(<Skills />);
    expect(screen.getByRole("heading", { level: 2, name: "Technical Skills" })).toBeInTheDocument();
    expect(screen.getByText("Large Chest")).toBeInTheDocument();
    expect(chestItems()).toHaveLength(skillItems.length);
    // The tablet layout hides chest slots 43-45 (see skills-chest.css); they must stay empty.
    expect(skillItems.length).toBeLessThanOrEqual(42);
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${skillItems.length} of ${skillItems.length} items`);
  });

  it("preselects C# with factual evidence in the detail panel", () => {
    render(<Skills />);
    expect(slot("C#")).toHaveAttribute("aria-pressed", "true");
    expect(detailHeading()).toHaveTextContent("C#");
    expect(within(detail()).getByText("Diamond · Languages")).toBeInTheDocument();
    expect(within(detail()).getByText(/wealth-management platform/)).toBeInTheDocument();
    expect(within(detail()).getByText("TCS (DNB)")).toBeInTheDocument();
    expect(detail()).toHaveAttribute("aria-live", "polite");
  });

  it("keeps empty chest slots out of the accessibility tree and focus order", () => {
    render(<Skills />);
    const empties = chest().querySelectorAll(".mc-slot.is-empty");
    expect(empties.length).toBeGreaterThan(0);
    empties.forEach((empty) => {
      expect(empty).toBeDisabled();
      expect(empty).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("filters by category, reflowing matches and announcing the change", () => {
    render(<Skills />);
    expect(tab("All")).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(tab("Backend"));
    expect(tab("Backend")).toHaveAttribute("aria-pressed", "true");
    expect(tab("All")).toHaveAttribute("aria-pressed", "false");
    const backend = skillItems.filter((item) => item.categoryId === "backend");
    expect(chestItems().map((button) => button.getAttribute("aria-label"))).toEqual(backend.map((item) => `${item.technology}, Backend`));
    expect(within(chest()).queryByRole("button", { name: /^Python,/ })).not.toBeInTheDocument();
    expect(chest().querySelectorAll(".mc-slot")).toHaveLength(45);
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${backend.length} of ${skillItems.length} items in Backend`);
    fireEvent.click(tab("All"));
    expect(chestItems()).toHaveLength(skillItems.length);
  });

  it("keeps the selected detail when a filter hides the selected item", () => {
    render(<Skills />);
    fireEvent.click(tab("Databases"));
    expect(detailHeading()).toHaveTextContent("C#");
  });

  it("filters by keyboard-activated category buttons", () => {
    render(<Skills />);
    const security = tab("Security");
    security.focus();
    fireEvent.keyDown(security, { key: "Enter" });
    fireEvent.click(security);
    expect(security).toHaveAttribute("aria-pressed", "true");
    expect(chestItems()).toHaveLength(skillItems.filter((item) => item.categoryId === "security").length);
  });

  it("searches by technology, category and evidence", () => {
    render(<Skills />);
    const search = screen.getByRole("searchbox", { name: /Search skills/ });
    fireEvent.change(search, { target: { value: "terraform" } });
    expect(chestItems().map((button) => button.getAttribute("aria-label"))).toEqual(["Terraform, Cloud & DevOps"]);
    fireEvent.change(search, { target: { value: "frontend" } });
    expect(chestItems()).toHaveLength(2);
    fireEvent.change(search, { target: { value: "Library Management" } });
    expect(chestItems().map((button) => button.getAttribute("aria-label"))).toEqual(expect.arrayContaining(["Java, Languages", "Spring Boot, Backend"]));
    fireEvent.change(search, { target: { value: "zzz" } });
    expect(within(chest()).queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByText(/No items match/)).toBeInTheDocument();
  });

  it("updates the detail on click, keyboard and a single touch tap", () => {
    render(<Skills />);
    fireEvent.click(slot("Java"));
    expect(detailHeading()).toHaveTextContent("Java");
    expect(within(detail()).getByText("Library Management System")).toBeInTheDocument();
    expect(within(detail()).getByText("Projects")).toBeInTheDocument();
    expect(within(detail()).getByText("Experience")).toBeInTheDocument();
    expect(within(detail()).getByText("TCS (Trainee)")).toBeInTheDocument();

    fireEvent.keyDown(slot("AWS"), { key: "Enter" });
    expect(detailHeading()).toHaveTextContent("AWS");
    fireEvent.keyDown(slot("Docker"), { key: " " });
    expect(detailHeading()).toHaveTextContent("Docker");

    const rbac = slot("RBAC");
    fireEvent.pointerDown(rbac, { pointerType: "touch" });
    fireEvent.click(rbac);
    expect(detailHeading()).toHaveTextContent("RBAC");
    expect(rbac).toHaveAttribute("aria-pressed", "true");
  });

  it("navigates with arrows and never lands on empty slots", () => {
    render(<Skills />);
    const first = slot("C#");
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(slot("Python")).toHaveFocus();

    fireEvent.click(tab("Frontend"));
    const react = slot("React");
    react.focus();
    fireEvent.keyDown(react, { key: "ArrowRight" });
    const next = slot("Next.js");
    expect(next).toHaveFocus();
    fireEvent.keyDown(next, { key: "ArrowRight" });
    expect(next).toHaveFocus();
    fireEvent.keyDown(next, { key: "ArrowDown" });
    expect(next).toHaveFocus();
    fireEvent.keyDown(next, { key: "End" });
    expect(next).toHaveFocus();
    fireEvent.keyDown(next, { key: "Home" });
    expect(react).toHaveFocus();
  });

  it("exposes technology names and lore without interaction", () => {
    render(<Skills />);
    const python = slot("Python");
    expect(document.getElementById(python.getAttribute("aria-describedby")!)).toHaveTextContent("Used in: Tesserae, WanderGenie, Crop Yield Prediction");
    const contents = screen.getByRole("heading", { name: "Chest contents" }).closest("section")!;
    for (const item of skillItems) expect(contents).toHaveTextContent(item.technology);
    expect(screen.queryByRole("tooltip", { hidden: true })).not.toBeInTheDocument();
  });

  it("shares selection between the Core Toolkit and the chest", () => {
    render(<Skills />);
    const toolkit = screen.getByRole("grid", { name: "Core Toolkit" });
    const buttons = within(toolkit).getAllByRole("button");
    expect(buttons).toHaveLength(coreToolkitItems.length);
    fireEvent.click(within(toolkit).getByRole("button", { name: /^React,/ }));
    expect(detailHeading()).toHaveTextContent("React");
    expect(slot("React")).toHaveAttribute("aria-pressed", "true");
  });
});

describe("Skills coexisting with the hotbar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
    });
    Object.defineProperty(Element.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
    window.history.replaceState(null, "", window.location.pathname);
  });
  afterEach(() => window.history.replaceState(null, "", window.location.pathname));

  const renderPage = () => render(
    <>
      <MinecraftHUD theme="light" onThemeToggle={vi.fn()} />
      <section id="skills"><Skills /></section>
      <section id="experience">experience</section>
    </>,
  );

  it("keeps grid arrow keys inside the chest", () => {
    renderPage();
    const first = slot("C#");
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowDown" });
    expect(document.activeElement?.closest("[role='grid']")).toBe(chest());
    expect(window.location.hash).toBe("");
  });

  it("does not trigger number shortcuts while typing in search", () => {
    renderPage();
    const search = screen.getByRole("searchbox", { name: /Search skills/ });
    search.focus();
    fireEvent.keyDown(search, { key: "4" });
    expect(window.location.hash).toBe("");
  });

  it("keeps number shortcuts working from the chest", () => {
    renderPage();
    const java = slot("Java");
    java.focus();
    fireEvent.keyDown(java, { key: "4" });
    expect(window.location.hash).toBe("#experience");
    expect(detailHeading()).toHaveTextContent("C#");
  });
});
