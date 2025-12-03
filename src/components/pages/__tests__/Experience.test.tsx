import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Experience from "../Experience";

describe("Experience page", () => {
  it("renders work experience cards and quick stats", () => {
    render(
      <MemoryRouter>
        <Experience url="/assets/" showLogos />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Senior Software Developer/)).toBeInTheDocument();
    expect(screen.getByText(/REST APIs delivered/i)).toBeInTheDocument();
  });
});
