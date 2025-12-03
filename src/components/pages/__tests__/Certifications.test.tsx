import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Certifications from "../Certifications";

describe("Certifications page", () => {
  it("renders badge cards and loads Credly script once", async () => {
    render(<Certifications url="/assets/" />);

    expect(screen.getByText(/AWS Cloud Practitioner/i)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /verify on credly/i }).length).toBe(2);

    await waitFor(() => {
      expect(document.getElementById("credly-embed-script")).toBeInTheDocument();
    });
  });
});
