import { render, screen } from "@testing-library/react";
import About from "../About";

describe("About", () => {
  it("renders the section heading", () => {
    render(<About />);

    expect(screen.getByRole("heading", { name: /how i work/i })).toBeInTheDocument();
  });
});
