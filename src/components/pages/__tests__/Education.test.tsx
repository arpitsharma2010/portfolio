import { render, screen } from "@testing-library/react";
import Education from "../Education";

describe("Education", () => {
  it("renders both degrees with the correct periods", () => {
    render(<Education />);

    expect(screen.getByText("M.S. Computer Science & Engineering")).toBeInTheDocument();
    expect(screen.getByText("B.E. Computer Science & Engineering")).toBeInTheDocument();
    expect(screen.getByText("Aug 2024 – Dec 2025")).toBeInTheDocument();
    expect(screen.getByText("GPA 3.77 / 4")).toBeInTheDocument();
  });

  it("collapses coursework behind a disclosure", () => {
    render(<Education />);

    const disclosures = screen.getAllByText("Coursework");
    expect(disclosures).toHaveLength(2);
    expect(disclosures[0].closest("details")).not.toHaveAttribute("open");
  });

  it("renders verifiable certifications", () => {
    render(<Education />);

    expect(screen.getByText(/AWS Certified Solutions Architect/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /verify/i })).toHaveLength(3);
  });
});
