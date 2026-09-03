import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact", () => {
  it("links email, linkedin, github and the resume", () => {
    render(<Contact />);

    expect(screen.getByText("arpeet.sharma.1998@gmail.com").closest("a")).toHaveAttribute(
      "href",
      "mailto:arpeet.sharma.1998@gmail.com",
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com"),
    );
    expect(screen.getByRole("link", { name: /^resume/i })).toHaveAttribute(
      "href",
      expect.stringContaining("drive.google.com"),
    );
  });

  it("does not publish the phone number", () => {
    const { container } = render(<Contact />);

    expect(screen.queryByText(/716/)).not.toBeInTheDocument();
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
  });
});
