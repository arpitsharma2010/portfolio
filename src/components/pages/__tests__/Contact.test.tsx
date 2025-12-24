import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact page", () => {
  it("renders location, emails and phone", () => {
    render(<Contact />);

    expect(screen.getByText(/Jersey City, New Jersey, USA/i)).toBeInTheDocument();
    expect(screen.getByText("arpitdil@buffalo.edu")).toHaveAttribute(
      "href",
      "mailto:arpitdil@buffalo.edu",
    );
    expect(screen.getByText("arpeet.sharma.1998@gmail.com")).toHaveAttribute(
      "href",
      "mailto:arpeet.sharma.1998@gmail.com",
    );
    expect(screen.getByText(/\+1 \(716\) 750-7459/)).toBeInTheDocument();
  });
});
