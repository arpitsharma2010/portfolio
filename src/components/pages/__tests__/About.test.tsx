import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import About from "../About";
import MinecraftHUD from "../../header/MinecraftHUD";
import { aboutItems } from "../about/aboutInventoryItems";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "../../../utils/constants";

const detail = () => screen.getByText("Selected item").closest("section")!;
const detailHeading = () => within(detail()).getByRole("heading", { level: 3 });

describe("About player inventory", () => {
  it("credits DNB work to Tata Consultancy Services, not DNB directly", () => {
    const { container } = render(<About />);
    const prose = [container.textContent!, ...aboutItems.flatMap((item) => [item.summary, ...(item.lore ?? [])])].join(" ");
    expect(prose).not.toMatch(/\bat DNB\b/);
    expect(prose).toMatch(/Tata\s+Consultancy Services supporting DNB/);
    expect(prose).toMatch(/at TCS \(DNB\)/);
  });


  it("renders the semantic About heading and inventory", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2, name: "About Arpit" })).toBeInTheDocument();
    expect(screen.getByText("Player Inventory")).toBeInTheDocument();
    expect(within(screen.getByRole("grid", { name: "Profile inventory" })).getAllByRole("button")).toHaveLength(9);
  });

  it("preselects Backend Engineering with a populated detail panel", () => {
    render(<About />);
    expect(screen.getByRole("button", { name: /^Chest slot: Diamond Pickaxe/ })).toHaveAttribute("aria-pressed", "true");
    expect(detailHeading()).toHaveTextContent("Backend Engineering");
    expect(within(detail()).getByText("C# · .NET Core")).toBeInTheDocument();
  });

  it("selects inventory items on click and updates the detail panel", () => {
    render(<About />);
    const book = screen.getByRole("button", { name: "Book, Education" });
    fireEvent.click(book);
    expect(book).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /^Chest slot/ })).toHaveAttribute("aria-pressed", "false");
    expect(detailHeading()).toHaveTextContent("Education");
    expect(within(detail()).getByText("GPA 3.77 / 4")).toBeInTheDocument();
  });

  it("selects on Enter and Space", () => {
    render(<About />);
    fireEvent.keyDown(screen.getByRole("button", { name: "Map, Career Journey" }), { key: "Enter" });
    expect(detailHeading()).toHaveTextContent("Career Journey");
    fireEvent.keyDown(screen.getByRole("button", { name: "Emerald, Open to Roles" }), { key: " " });
    expect(detailHeading()).toHaveTextContent("Open to Roles");
  });

  it("selects on a single touch tap without navigating", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<About />);
    const chest = screen.getByRole("button", { name: "Chest, Projects" });
    fireEvent.pointerDown(chest, { pointerType: "touch" });
    fireEvent.click(chest);
    expect(detailHeading()).toHaveTextContent("Projects");
    fireEvent.pointerDown(chest, { pointerType: "touch" });
    fireEvent.click(chest);
    expect(open).not.toHaveBeenCalled();
    open.mockRestore();
  });

  it("makes every equipment slot interactive", () => {
    render(<About />);
    const equipment = within(screen.getByRole("grid", { name: /Equipment/ })).getAllByRole("button");
    expect(equipment.map((slot) => slot.getAttribute("aria-label"))).toEqual([
      "Head slot: Enchanted Book, AI / LLM Applications",
      "Chest slot: Diamond Pickaxe, Backend Engineering",
      "Legs slot: Redstone Dust, Distributed & Event-Driven Systems",
      "Feet slot: Compass, Cloud, DevOps & Delivery",
    ]);
    fireEvent.click(equipment[3]);
    expect(detailHeading()).toHaveTextContent("Cloud, DevOps & Delivery");
    expect(within(detail()).getByText(/Compass · Feet slot/)).toBeInTheDocument();
  });

  it("renders a 2x2 crafting grid and a professional result", () => {
    render(<About />);
    expect(within(screen.getByRole("grid", { name: "Crafting ingredients" })).getAllByRole("button")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "Crafting result: Software Engineer" }));
    expect(detailHeading()).toHaveTextContent("Crafted from all four");
    expect(within(detail()).getByText(/backend-heavy full-stack engineer/i)).toBeInTheDocument();
  });

  it("links profile actions to the existing destinations", () => {
    render(<About />);
    const nav = screen.getByRole("navigation", { name: "Profile links" });
    const link = (name: RegExp) => within(nav).getByRole("link", { name });
    expect(link(/Resume/)).toHaveAttribute("href", RESUME_URL);
    expect(link(/GitHub/)).toHaveAttribute("href", GITHUB_URL);
    expect(link(/LinkedIn/)).toHaveAttribute("href", LINKEDIN_URL);
    expect(link(/Email/)).toHaveAttribute("href", `mailto:${EMAIL}`);
    expect(link(/Email/)).not.toHaveAttribute("target");
    for (const external of [/Resume/, /GitHub/, /LinkedIn/]) {
      expect(link(external)).toHaveAttribute("target", "_blank");
      expect(link(external)).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("describes slots through their lore and keeps facts outside tooltips", () => {
    render(<About />);
    const redstone = screen.getByRole("button", { name: /^Legs slot/ });
    const description = document.getElementById(redstone.getAttribute("aria-describedby")!);
    expect(description).toHaveTextContent("AWS SQS · SNS at TCS (DNB)");

    const identity = screen.getByText("Player profile").parentElement!;
    for (const fact of ["Arpit Dilip Sharma", "Software Engineer", "Backend · Distributed Systems · Cloud", "University at Buffalo (SUNY) · GPA 3.77 / 4", "AI / LLM Applications"]) {
      expect(within(identity).getByText(fact, { exact: false })).toBeInTheDocument();
    }
    expect(screen.getByText(/My centre of gravity is backend and distributed systems/)).toBeInTheDocument();
  });

  it("ties Lambda, SQS and SNS to the TCS (DNB) Software Engineer I role", () => {
    const item = (id: string) => aboutItems.find((entry) => entry.id === id)!;
    expect(item("cloud").lore).toContain("AWS Lambda at TCS (DNB)");
    expect(item("cloud").summary).toMatch(/Tata Consultancy Services \(DNB\) I used AWS Lambda with API Gateway, S3, SQS and SNS as Software Engineer I/);
    expect(item("distributed").summary).toMatch(/Software Engineer I at Tata Consultancy Services \(DNB\).*AWS SQS and SNS/);
    const mentions = aboutItems.filter((entry) => /Lambda|SQS|SNS/.test([...entry.lore!, entry.summary].join(" ")));
    mentions.forEach((entry) => expect(entry.summary).toContain("Tata Consultancy Services (DNB)"));
  });

  it("does not pin a tooltip open for the default selection", () => {
    render(<About />);
    expect(screen.queryByRole("tooltip", { hidden: true })).not.toBeInTheDocument();
  });
});

describe("About coexisting with the hotbar", () => {
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
      <section id="about"><About /></section>
      <section id="skills">skills</section>
    </>,
  );
  const hotbarSlot = (index: number) => document.querySelector<HTMLButtonElement>(`[data-hotbar-index="${index}"]`)!;

  it("keeps grid arrow keys inside the inventory", () => {
    renderPage();
    const before = document.querySelector(".is-selected[data-hotbar-index]")?.getAttribute("data-hotbar-index");
    const first = screen.getByRole("button", { name: "Name Tag, Player Overview" });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(screen.getByRole("button", { name: "Map, Career Journey" })).toHaveFocus();
    expect(document.querySelector(".is-selected[data-hotbar-index]")?.getAttribute("data-hotbar-index")).toBe(before);
    expect(window.location.hash).toBe("");
  });

  it("leaves number-key navigation working while an inventory slot has focus", () => {
    renderPage();
    const slot = screen.getByRole("button", { name: "Book, Education" });
    fireEvent.click(slot);
    slot.focus();
    fireEvent.keyDown(slot, { key: "3" });
    expect(window.location.hash).toBe("#skills");
    expect(hotbarSlot(2)).toHaveAttribute("aria-pressed", "true");
    expect(detailHeading()).toHaveTextContent("Education");
  });
});
