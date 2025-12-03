import React from "react";
import { render, screen } from "@testing-library/react";
import SocialLinks from "../SocialLinks";

describe("SocialLinks", () => {
  it("renders external links with accessible labels", () => {
    render(<SocialLinks />);

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    const githubLink = screen.getByRole("link", { name: /github/i });

    expect(linkedinLink).toHaveAttribute("href", expect.stringContaining("linkedin"));
    expect(githubLink).toHaveAttribute("href", expect.stringContaining("github"));
  });
});
