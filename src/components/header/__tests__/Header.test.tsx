import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Header from "../Header";

describe("Header", () => {
  it("renders the section navigation", () => {
    render(<Header theme="light" onThemeToggle={vi.fn()} />);

    expect(screen.getAllByRole("link", { name: "Experience" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Projects" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "#resume");
  });

  it("invokes the theme toggle", () => {
    const onThemeToggle = vi.fn();
    render(<Header theme="light" onThemeToggle={onThemeToggle} />);

    fireEvent.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(onThemeToggle).toHaveBeenCalledTimes(1);
  });

  it("keeps every section available in the responsive hotbar", () => {
    render(<Header theme="dark" onThemeToggle={vi.fn()} />);

    expect(screen.getByRole("navigation", { name: /portfolio sections/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute("href", "#skills");
  });
});
