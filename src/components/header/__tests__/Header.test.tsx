import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Header from "../Header";

describe("Header", () => {
  it("renders the section navigation", () => {
    render(<Header theme="light" onThemeToggle={vi.fn()} />);

    expect(screen.getAllByRole("link", { name: "Experience" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Projects" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /resume/i })[0]).toHaveAttribute(
      "href",
      expect.stringContaining("drive.google.com"),
    );
  });

  it("invokes the theme toggle", () => {
    const onThemeToggle = vi.fn();
    render(<Header theme="light" onThemeToggle={onThemeToggle} />);

    fireEvent.click(screen.getByRole("button", { name: /switch to dark mode/i }));
    expect(onThemeToggle).toHaveBeenCalledTimes(1);
  });

  it("opens and closes the mobile menu", () => {
    render(<Header theme="dark" onThemeToggle={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));
    expect(screen.getByRole("button", { name: /close navigation menu/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(0);
  });
});
