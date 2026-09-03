import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home hero", () => {
  it("renders the name and positioning line", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Arpit Dilip Sharma");
    expect(screen.getByText(/Full-Stack/)).toBeInTheDocument();
    expect(screen.getByText(/Agentic AI/)).toBeInTheDocument();
  });

  it("exposes resume, linkedin, github and contact actions", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute(
      "href",
      expect.stringContaining("drive.google.com"),
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com"),
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      expect.stringContaining("github.com"),
    );
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "#contact");
  });
});
