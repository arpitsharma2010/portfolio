import { render, screen } from "@testing-library/react";
import Education from "../Education";
import { CERTIFICATIONS, CERTIFICATIONS_HEADING, DEGREES, SECTION_TITLE } from "./educationContent.fixture";

// Written against the pre-redesign component and kept passing through the redesign:
// every frozen string, link and logo must still be in the DOM, whatever is selected.
const unique = (values: (string | null)[]) => [...new Set(values)].sort();
const hrefs = (pattern: RegExp) =>
  unique([...document.querySelectorAll("a")].map((a) => a.getAttribute("href")).filter((href) => href && pattern.test(href)));

describe("Education content lock", () => {
  it("keeps the section and certification headings", () => {
    render(<Education />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(SECTION_TITLE);
    expect(screen.getByRole("heading", { level: 3, name: CERTIFICATIONS_HEADING })).toBeInTheDocument();
  });

  it("keeps exactly the two degrees with every field", () => {
    const { container } = render(<Education />);
    const text = container.textContent!;
    for (const degree of DEGREES) {
      expect(screen.getAllByRole("heading", { level: 3, name: degree.degree }).length).toBeGreaterThan(0);
      [degree.institution, degree.period, degree.detail, ...degree.courses].forEach((value) => expect(text).toContain(value));
      degree.courses.forEach((course) => expect(screen.getAllByText(course).length).toBeGreaterThan(0));
      const logo = screen.getByAltText(`${degree.institution} logo`);
      expect(logo.getAttribute("src")).toMatch(new RegExp(`${degree.logo.replace(".", "\\.")}$`));
    }
    expect(container.querySelectorAll("img[alt$=' logo']")).toHaveLength(DEGREES.length);
    expect(hrefs(/^https:\/\/(engineering\.buffalo|sgbau)/)).toEqual(unique(DEGREES.map((degree) => degree.website)));
  });

  it("keeps exactly the three certifications with issuer, date and verify link", () => {
    const { container } = render(<Education />);
    const text = container.textContent!;
    for (const cert of CERTIFICATIONS) {
      expect(text).toContain(cert.name);
      expect(text).toContain(`${cert.issuer} · ${cert.date}`);
    }
    expect(hrefs(/credly\.com/)).toEqual(unique(CERTIFICATIONS.map((cert) => cert.url)));
  });
});
