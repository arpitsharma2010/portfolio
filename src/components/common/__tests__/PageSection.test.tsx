import { render, screen } from "@testing-library/react";
import PageSection from "../PageSection";

describe("PageSection", () => {
  it("renders eyebrow, title, description and children", () => {
    render(
      <PageSection eyebrow="Intro" title="Section Title" description="Helpful details">
        <p>Child content</p>
      </PageSection>,
    );

    expect(screen.getByText("Intro")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Section Title" })).toBeInTheDocument();
    expect(screen.getByText("Helpful details")).toBeInTheDocument();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
