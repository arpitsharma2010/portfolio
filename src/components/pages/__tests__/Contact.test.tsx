import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "../Contact";
import MinecraftHUD from "../../header/MinecraftHUD";
import { CHANNELS } from "./contactContent.fixture";

const channelLinks = () => within(document.querySelector<HTMLElement>(".contact-console ul")!).getAllByRole("link");

describe("Contact Nether portal", () => {
  it("shows every destination with its label, value and item icon without prior selection", () => {
    const { container } = render(<Contact />);
    const links = channelLinks();
    expect(links).toHaveLength(CHANNELS.length);
    links.forEach((link, index) => {
      expect(link).toHaveAccessibleName(`${CHANNELS[index].label} ${CHANNELS[index].value}`);
      expect(link.querySelector(".contact-console__slot .mc-item-icon")).toBeInTheDocument();
      expect(link).not.toHaveClass("is-aimed");
      expect(link.closest("[hidden]")).toBeNull();
    });
    expect(container.querySelector(".nportal")).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps the decorative portal, slots and particles out of the accessibility tree", () => {
    const { container } = render(<Contact />);
    container.querySelectorAll(".nportal, .contact-console__slot").forEach((node) =>
      expect(node).toHaveAttribute("aria-hidden", "true"));
    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });

  it("marks the focused or hovered destination and tints the portal", () => {
    const { container } = render(<Contact />);
    const [, linkedIn, github] = channelLinks();
    fireEvent.focus(linkedIn);
    expect(linkedIn).toHaveClass("is-aimed");
    expect((container.querySelector(".nportal") as HTMLElement).style.getPropertyValue("--nportal-tint")).toBe("-55deg");
    fireEvent.mouseEnter(github);
    expect(github).toHaveClass("is-aimed");
    expect(linkedIn).not.toHaveClass("is-aimed");
  });

  it("keeps the aim transient: leaving or blurring a destination leaves nothing selected", () => {
    const { container } = render(<Contact />);
    const [email, linkedIn] = channelLinks();
    fireEvent.mouseEnter(linkedIn);
    fireEvent.mouseLeave(linkedIn);
    fireEvent.focus(email);
    fireEvent.blur(email);
    expect(container.querySelector(".is-aimed")).toBeNull();
    expect((container.querySelector(".nportal") as HTMLElement).style.getPropertyValue("--nportal-tint")).toBe("0deg");
  });

  it("activates in one click without blocking navigation and plays a burst", () => {
    const { container } = render(<Contact />);
    const [email] = channelLinks();
    expect(container.querySelector(".nportal__burst")).toBeNull();
    // Record whether the component blocked the link, then stop jsdom attempting the real navigation.
    let blocked: boolean | null = null;
    const stopNavigation = (event: Event) => { blocked = event.defaultPrevented; event.preventDefault(); };
    window.addEventListener("click", stopNavigation);
    fireEvent.click(email);
    window.removeEventListener("click", stopNavigation);
    expect(blocked).toBe(false);
    expect(container.querySelector(".nportal__burst")).toBeInTheDocument();
  });

  it("moves focus between destinations with arrow keys and Home/End, without trapping Tab", () => {
    render(<Contact />);
    const links = channelLinks();
    links[0].focus();
    expect(fireEvent.keyDown(links[0], { key: "ArrowRight" })).toBe(false);
    expect(links[1]).toHaveFocus();
    fireEvent.keyDown(links[1], { key: "ArrowDown" });
    expect(links[2]).toHaveFocus();
    fireEvent.keyDown(links[2], { key: "End" });
    expect(links[3]).toHaveFocus();
    fireEvent.keyDown(links[3], { key: "ArrowRight" });
    expect(links[3]).toHaveFocus();
    fireEvent.keyDown(links[3], { key: "Home" });
    expect(links[0]).toHaveFocus();
    fireEvent.keyDown(links[0], { key: "ArrowUp" });
    expect(links[0]).toHaveFocus();
    expect(fireEvent.keyDown(links[0], { key: "Tab" })).toBe(true);
    expect(fireEvent.keyDown(links[0], { key: "Enter" })).toBe(true);
    expect(fireEvent.keyDown(links[0], { key: " " })).toBe(true);
    screen.getAllByRole("link").forEach((link) => expect(link).not.toHaveAttribute("tabindex"));
  });

  it("does not publish the phone number", () => {
    const { container } = render(<Contact />);
    expect(screen.queryByText(/716/)).not.toBeInTheDocument();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
  });
});

describe("Contact coexisting with the hotbar", () => {
  beforeEach(() => window.history.replaceState(null, "", window.location.pathname));
  afterEach(() => window.history.replaceState(null, "", window.location.pathname));

  const renderPage = () => render(
    <>
      <MinecraftHUD theme="light" onThemeToggle={vi.fn()} />
      <section id="resume">resume</section>
      <section id="contact"><Contact /></section>
    </>,
  );

  it("keeps destination arrow keys away from the hotbar", () => {
    renderPage();
    const [first] = channelLinks();
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(window.location.hash).toBe("");
  });

  it("keeps number shortcuts and slot 8 working", () => {
    renderPage();
    const [first] = channelLinks();
    first.focus();
    fireEvent.keyDown(first, { key: "7" });
    expect(window.location.hash).toBe("#resume");
    fireEvent.keyDown(document.body, { key: "8" });
    expect(window.location.hash).toBe("#contact");
  });
});
