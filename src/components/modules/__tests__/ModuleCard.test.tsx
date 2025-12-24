import React from "react";
import { render, screen } from "@testing-library/react";
import { FiLayers } from "react-icons/fi";
import ModuleCard from "../ModuleCard";

describe("ModuleCard", () => {
  it("renders title, description, highlights, tags and icon", () => {
    const highlights = ["First highlight", "Second highlight"];
    const tags = ["React", "TypeScript"];

    render(
      <ModuleCard
        title="Module Title"
        description="Short summary"
        highlights={highlights}
        tags={tags}
        icon={<FiLayers data-testid="icon" />}
      />,
    );

    expect(screen.getByText("Module Title")).toBeInTheDocument();
    expect(screen.getByText("Short summary")).toBeInTheDocument();
    highlights.forEach((text) => expect(screen.getByText(text)).toBeInTheDocument());
    tags.forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument());
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
