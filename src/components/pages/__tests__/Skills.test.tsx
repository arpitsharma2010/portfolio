import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Skills from "../Skills";
import MinecraftHUD from "../../header/MinecraftHUD";
import { coreToolkitItems, PROJECT_SOURCES, ROLE_SOURCES, SKILL_CATEGORIES, skillItems } from "../skills/skillItems";

const chest = () => screen.getByRole("region", { name: "Skill shelves" });
const chestItems = () => within(chest()).getAllByRole("button");
const detail = () => screen.getByText("Selected item").closest("section")!;
const detailHeading = () => within(detail()).getByRole("heading", { level: 3 });
const tab = (name: string) => within(screen.getByRole("group", { name: /category/ })).getByRole("button", { name });
const slot = (technology: string) => within(chest()).getByRole("button", { name: new RegExp(`^${technology.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")},`) });

describe("skills data", () => {
  it("attributes DNB work to TCS in skill prose", () => {
    const prose = skillItems.flatMap((item) => [item.summary, ...item.uses]).join(" ");
    expect(prose).not.toMatch(/\b(at|my) DNB\b/);
    expect(prose).not.toMatch(/Sbanken (service|endpoints|microservice)\b/);
    expect(prose).toMatch(/at TCS \(DNB\)/);
  });


  it("gives every skill a unique id, valid category, technology and evidence", () => {
    const categoryIds = SKILL_CATEGORIES.map((category) => category.id) as string[];
    const sources = [...ROLE_SOURCES, ...PROJECT_SOURCES, "Engineering toolkit"] as string[];
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

  it("tags TCS evidence consistently and cites current role and project evidence", () => {
    const sources = skillItems.flatMap((item) => item.evidence) as string[];
    expect(sources).not.toContain("DNB");
    const evidence = (id: string) => skillItems.find((item) => item.id === id)!.evidence;
    expect(evidence("rest-apis")).toEqual(["TCS (DNB)", "Skopus AI"]);
    expect(evidence("java")).toEqual(["Library Management System"]);
    expect(evidence("spring-boot")).toEqual(["Library Management System"]);
  });

  it("includes every technology in the supplied resume without proficiency scores", () => {
    expect(skillItems.every((item) => item.rarity === undefined || item.rarity === "enchanted")).toBe(true);
    const labels = skillItems.map((item) => item.technology).join(" | ");
    for (const technology of [
      "C#", "Python", "TypeScript", "JavaScript", "Java", "C++", ".NET Core", "Entity Framework",
      "Flask", "Next.js", "React", "Node.js", "REST APIs", "Microservices", "PostgreSQL", "DynamoDB",
      "MySQL", "MongoDB", "pgvector", "Neo4j", "Supabase", "LangGraph", "Agentic AI", "RAG",
      "OpenAI APIs", "Embeddings", "Vector Search", "AWS", "AWS ECS", "AWS Lambda", "AWS S3",
      "AWS SQS", "AWS SNS", "CloudWatch", "Docker", "Kubernetes", "Terraform", "GitLab CI/CD",
      "GitHub Actions", "Jenkins", "Event-Driven Architecture", "API Integration", "Service Decomposition",
      "SSE", "WebSocket", "gRPC", "JWT", "OAuth 2.0", "PKCE", "RBAC", "Rate Limiting", "Session Management",
      "API Security", "HMAC-SHA256", "OIDC", "Claude Code", "Codex", "Copilot", "NUnit", "Moq",
      "Swagger/OpenAPI", "SonarQube", "Git version control", "GitLab", "Bitbucket", "AWS CloudFormation",
      "Onion Architecture", "ICacheable", "OpenTripMap",
    ]) expect(labels).toContain(technology);
    for (const id of ["entity-framework", "grpc", "sse", "websocket", "claude-code", "codex", "copilot"]) {
      expect(skillItems.find((item) => item.id === id)!.evidence).toEqual(["Engineering toolkit"]);
    }
  });

});

describe("Skills storage wall", () => {
  it("renders the semantic heading, chest presentation and every skill", () => {
    render(<Skills />);
    expect(screen.getByRole("heading", { level: 2, name: "Technical Skills" })).toBeInTheDocument();
    expect(screen.getByText("Minecraft Armory")).toBeInTheDocument();
    expect(chestItems()).toHaveLength(skillItems.length);
    expect(skillItems.length).toBeGreaterThan(42);
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${skillItems.length} of ${skillItems.length} items`);
  });

  it("starts with no skill selected, filters immediately and never auto-selects a search result", () => {
    const { container } = render(<Skills />);
    const pressedSlots = () => container.querySelectorAll(".sc-frame[aria-pressed='true']");
    expect(pressedSlots()).toHaveLength(0);
    expect(within(detail()).queryByRole("heading")).not.toBeInTheDocument();

    fireEvent.click(tab("Backend"));
    fireEvent.change(screen.getByRole("searchbox", { name: /Search skills/ }), { target: { value: "terraform" } });
    expect(pressedSlots()).toHaveLength(0);
    expect(within(detail()).queryByRole("heading")).not.toBeInTheDocument();
  });

  it("shows factual evidence for C# once it is selected", () => {
    render(<Skills />);
    fireEvent.click(slot("C#"));
    expect(slot("C#")).toHaveAttribute("aria-pressed", "true");
    expect(detailHeading()).toHaveTextContent("C#");
    expect(within(detail()).getByText("Diamond · Languages")).toBeInTheDocument();
    expect(within(detail()).getAllByText(/wealth-management platform/)[0]).toBeInTheDocument();
    expect(within(detail()).getByText("TCS (DNB)")).toBeInTheDocument();
    expect(detail()).toHaveAttribute("aria-live", "polite");
  });

  it("renders labeled frames without empty or disabled inventory slots", () => {
    render(<Skills />);
    expect(chestItems()).toHaveLength(skillItems.length);
    chestItems().forEach((button) => {
      expect(button).toBeEnabled();
      expect(button).not.toHaveAttribute("aria-hidden");
      expect(button).toHaveAttribute("aria-controls", "sc-skill-detail");
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
    expect(chestItems()).toHaveLength(backend.length);
    expect(screen.getByRole("status")).toHaveTextContent(`Showing ${backend.length} of ${skillItems.length} items in Backend`);
    fireEvent.click(tab("All"));
    expect(chestItems()).toHaveLength(skillItems.length);
  });

  it("keeps the selected detail when a filter hides the selected item", () => {
    render(<Skills />);
    fireEvent.click(slot("C#"));
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
    expect(chestItems().map((button) => button.getAttribute("aria-label"))).toEqual(["React, Frontend", "Next.js, Frontend", "TypeScript, Frontend", "Vitest, Testing & Tools"]);
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
    expect(within(detail()).getAllByText("Library Management System")[0]).toBeInTheDocument();
    expect(within(detail()).getByText("Projects")).toBeInTheDocument();
    expect(within(detail()).queryByText("Experience")).not.toBeInTheDocument();

    fireEvent.keyDown(slot("AWS"), { key: "Enter" });
    fireEvent.click(slot("AWS"));
    expect(detailHeading()).toHaveTextContent("AWS");
    fireEvent.keyDown(slot("Docker"), { key: " " });
    fireEvent.click(slot("Docker"));
    expect(detailHeading()).toHaveTextContent("Docker");

    const rbac = slot("RBAC");
    fireEvent.pointerDown(rbac, { pointerType: "touch" });
    fireEvent.click(rbac);
    expect(detailHeading()).toHaveTextContent("RBAC");
    expect(rbac).toHaveAttribute("aria-pressed", "true");
  });

  it("navigates with arrows and never lands on empty slots", () => {
    render(<Skills />);
    const first = slot("Java");
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(slot("Python")).toHaveFocus();

    fireEvent.click(tab("Frontend"));
    const react = slot("React");
    react.focus();
    fireEvent.keyDown(react, { key: "ArrowRight" });
    const next = slot("Next.js");
    const last = slot("TypeScript");
    expect(next).toHaveFocus();
    fireEvent.keyDown(next, { key: "ArrowRight" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "ArrowDown" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "End" });
    expect(last).toHaveFocus();
    fireEvent.keyDown(last, { key: "Home" });
    expect(react).toHaveFocus();
  });

  it("shows every technology name in a button before any interaction", () => {
    const { container } = render(<Skills />);
    const names = [...chest().querySelectorAll(".sc-frame__name")].map((node) => node.textContent);
    expect([...names].sort()).toEqual(skillItems.map((item) => item.technology).sort());
    for (const button of chestItems()) {
      const name = button.querySelector(".sc-frame__name")!;
      expect(name).toBeVisible();
      expect(button).toHaveAccessibleName(new RegExp(name.textContent!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
    expect(container.querySelector(".sc-detail")).not.toBeVisible();
    expect(screen.queryByRole("tooltip", { hidden: true })).not.toBeInTheDocument();
  });

  it("puts the labeled Core Stack before the searchable category shelves", () => {
    render(<Skills />);
    const toolkit = screen.getByRole("list", { name: "Core Toolkit" });
    expect([...toolkit.querySelectorAll(".sc-frame__name")].map((node) => node.textContent)).toEqual(coreToolkitItems.map((item) => item.technology));
    expect(toolkit.compareDocumentPosition(chest()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const heading of ["Programming", "Backend", "Frontend", "Cloud & DevOps", "Databases", "Distributed Systems", "AI / LLM", "Security", "Testing / Tools"]) {
      expect(within(chest()).getByRole("heading", { name: heading })).toBeVisible();
    }
  });

  it("shares selection between the Core Toolkit and the chest", () => {
    render(<Skills />);
    const toolkit = screen.getByRole("list", { name: "Core Toolkit" });
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
    expect(chest()).toContainElement(document.activeElement as HTMLElement);
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
    expect(within(detail()).queryByRole("heading")).not.toBeInTheDocument();
  });
});
