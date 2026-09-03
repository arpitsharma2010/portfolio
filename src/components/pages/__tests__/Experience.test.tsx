import { render, screen } from "@testing-library/react";
import Experience from "../Experience";

describe("Experience", () => {
  it("renders every role", () => {
    render(<Experience />);

    expect(screen.getByText("Skopus AI")).toBeInTheDocument();
    expect(screen.getByText(/University at Buffalo/)).toBeInTheDocument();
    expect(screen.getAllByText("DNB")).toHaveLength(2);
    expect(screen.getByText("Software Engineer II")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer I")).toBeInTheDocument();
  });

  // These are the only quantified claims backed by the source resume; if a copy
  // edit drops one, that is a regression rather than a wording change.
  it("keeps the verified metrics", () => {
    render(<Experience />);

    expect(screen.getByText(/800 ms to 500 ms/)).toBeInTheDocument();
    expect(screen.getByText(/50,000 records to 50/)).toBeInTheDocument();
    expect(screen.getByText(/57\+ admin endpoints/)).toBeInTheDocument();
    expect(screen.getByText(/15\+ endpoints/)).toBeInTheDocument();
    expect(screen.getByText(/20\+ production releases/)).toBeInTheDocument();
    expect(screen.getByText(/13K\+ source-line/)).toBeInTheDocument();
  });

  it("does not carry the unverifiable metrics the previous copy claimed", () => {
    render(<Experience />);

    expect(screen.queryByText(/500K\+/)).not.toBeInTheDocument();
    expect(screen.queryByText(/99\.8%/)).not.toBeInTheDocument();
  });
});
