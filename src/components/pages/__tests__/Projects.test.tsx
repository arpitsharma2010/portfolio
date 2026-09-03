import { render, screen } from "@testing-library/react";
import Projects from "../Projects";

describe("Projects", () => {
  it("features WanderGenie and Taco-DB with their details inline", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "WanderGenie" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Taco-DB" })).toBeInTheDocument();
    expect(screen.getAllByText("Architecture")).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: /github/i })[0]).toHaveAttribute(
      "href",
      "https://github.com/arpitsharma2010/WanderGenie-ai-travel-assistant",
    );
  });

  it("lists the secondary projects", () => {
    render(<Projects />);

    expect(screen.getByText("Pintos Kernel")).toBeInTheDocument();
    expect(screen.getByText("16-bit RISC-style CPU")).toBeInTheDocument();
    expect(screen.getByText("Crop Yield Prediction")).toBeInTheDocument();
    expect(screen.getByText("Library Management System")).toBeInTheDocument();
  });
});
