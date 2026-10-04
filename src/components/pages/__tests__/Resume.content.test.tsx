import { render, screen } from "@testing-library/react";
import Resume from "../Resume";
import { RESUME_URL } from "../../../utils/constants";
import {
  ACTION_LABEL, KICKER, PAGE_COPY, PAGE_HEADING, RESUME_HREF, RESUME_REL, RESUME_TARGET, SECTION_DESCRIPTION, SECTION_TITLE,
} from "./resumeContent.fixture";

// Written against the pre-redesign component and kept passing through the redesign:
// every frozen string and the resume link must be in the DOM, whatever page is open.
describe("Resume content lock", () => {
  it("keeps the section heading and supporting copy", () => {
    render(<Resume />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(SECTION_TITLE);
    expect(screen.getByText(SECTION_DESCRIPTION)).toBeInTheDocument();
  });

  it("keeps the book copy verbatim", () => {
    const { container } = render(<Resume />);
    const text = container.textContent!.replace(/\s+/g, " ");
    [KICKER, PAGE_HEADING, PAGE_COPY].forEach((value) => expect(text).toContain(value));
  });

  it("keeps exactly two identical resume links: below the book and on the printable edition page", () => {
    const { container } = render(<Resume />);
    expect(RESUME_URL).toBe(RESUME_HREF);
    const links = [...container.querySelectorAll("a")].filter((a) => a.getAttribute("href") === RESUME_HREF);
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link).toHaveTextContent(ACTION_LABEL);
      expect(link).toHaveAttribute("target", RESUME_TARGET);
      expect(link).toHaveAttribute("rel", RESUME_REL);
      expect(link).toHaveClass("pixel-button", "pixel-button--primary");
    });
    expect(links[0].closest("section")).toHaveAttribute("aria-labelledby", "wbook-page-edition");
    expect(links[1].closest(".wbook__page")).toBeNull();
    // No other link anywhere in the book points off-site.
    expect([...container.querySelectorAll("a[href^='http']")]).toEqual(links);
  });
});
