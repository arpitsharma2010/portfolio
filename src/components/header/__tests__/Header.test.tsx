import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import Header from "../Header";

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
});
