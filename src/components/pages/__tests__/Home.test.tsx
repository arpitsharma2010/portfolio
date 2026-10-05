import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home hero", () => {
  it("renders the name and positioning line", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Arpit Dilip Sharma");
    expect(screen.getByText(/Backend & Full-Stack Engineering/)).toBeInTheDocument();
    expect(screen.getByText(/Applied AI/)).toBeInTheDocument();
  });

  it("does not present the whole TCS span as banking or the years as a game level", () => {
    const { container } = render(<Home />);
    const intro = container.querySelector(".hero__intro")!.textContent!;
    expect(intro).toMatch(/4\+ years of experience building backend, full-stack, cloud-native,\s+and distributed systems/);
    expect(intro).not.toMatch(/Norwegian bank|Four-plus/);
    expect(intro).toMatch(/financial services, research platforms, and applied AI/);
    expect(screen.queryByText(/LVL/)).toBeNull();
    expect(screen.getByLabelText("4+ years of professional experience")).toHaveTextContent("4+ YRS");
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
