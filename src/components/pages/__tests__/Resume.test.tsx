import { render, screen } from "@testing-library/react";
import Resume from "../Resume";

describe("Resume", () => {
  it("keeps the verified resume available from the enchanted book", () => {
    render(<Resume />);

    expect(screen.getByRole("heading", { name: /complete character sheet/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open resume/i })).toHaveAttribute(
      "href",
      expect.stringContaining("drive.google.com"),
    );
  });
});
