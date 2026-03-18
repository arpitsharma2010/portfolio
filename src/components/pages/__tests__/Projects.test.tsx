import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Projects from "../Projects";

describe("Projects page", () => {
  it("renders project cards and opens modal with build notes", () => {
    render(
      <MemoryRouter>
        <Projects url="/assets/" />
      </MemoryRouter>,
    );

    expect(screen.getByText(/WanderGenie/i)).toBeInTheDocument();

    const viewButtons = screen.getAllByRole("button", { name: /Build notes/i });
    fireEvent.click(viewButtons[0]);

    expect(screen.getByText(/Timeline:/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "✕" }));
    expect(screen.queryByText(/Timeline:/i)).not.toBeInTheDocument();
  });
});
