import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Certifications from "../Certifications";

describe("Certifications page", () => {
  it("renders badge cards and loads Credly script once", async () => {
    render(<Certifications url="/assets/" />);

    expect(screen.getByText(/AWS Certified Solutions Architect - Associate/i)).toBeInTheDocument();
    expect(screen.getByText(/AWS Cloud Practitioner/i)).toBeInTheDocument();
    const verifyLinks = screen.getAllByRole("link", { name: /verify on credly/i });

    expect(verifyLinks.length).toBe(3);
    expect(verifyLinks[1]).toHaveAttribute(
      "href",
      "https://www.credly.com/badges/ddcfbe0f-49df-413d-938f-3914713a590e",
    );

    await waitFor(() => {
      expect(document.getElementById("credly-embed-script")).toBeInTheDocument();
    });
  });
});
