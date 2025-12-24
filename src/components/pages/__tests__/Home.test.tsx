import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";

jest.mock("react-simple-typewriter", () => ({
  Typewriter: ({ words }: { words: string[] }) => <span>{words[0]}</span>,
}));

describe("Home page", () => {
  it("renders hero content, stats and actions", () => {
    render(
      <MemoryRouter>
        <Home url="/assets/" />
      </MemoryRouter>,
    );

    expect(screen.getByText(/results driven software developer/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /collaborate/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      expect.stringContaining("drive.google.com"),
    );
    expect(screen.getAllByText(/REST APIs shipped/i)).toHaveLength(1);
  });
});
