import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Education from "../Education";

describe("Education page", () => {
  it("renders institutions and toggles coursework visibility", () => {
    render(<Education url="/assets/" />);

    expect(screen.getByText(/University at Buffalo/i)).toBeInTheDocument();

    const toggleButtons = screen.getAllByRole("button", { name: /program insights|hide details/i });
    const secondToggle = toggleButtons[1];

    expect(secondToggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(secondToggle);
    expect(secondToggle).toHaveAttribute("aria-expanded", "true");
  });
});
