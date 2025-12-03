import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header", () => {
  const renderHeader = () =>
    render(
      <MemoryRouter initialEntries={["/portfolio/"]}>
        <Header url="/" theme="light" onThemeToggle={jest.fn()} />
      </MemoryRouter>,
    );

  it("renders navigation links and avatar info", () => {
    renderHeader();

    expect(screen.getAllByText("Arpit Sharma").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /Projects/i })).toBeInTheDocument();
  });

  it("invokes theme toggle handler", () => {
    const onThemeToggle = jest.fn();
    render(
      <MemoryRouter>
        <Header url="/" theme="light" onThemeToggle={onThemeToggle} />
      </MemoryRouter>,
    );

    const themeButton = screen.getAllByRole("button", { name: /switch to dark mode/i })[0];
    fireEvent.click(themeButton);
    expect(onThemeToggle).toHaveBeenCalledTimes(1);
  });

  it("opens the mobile menu when toggle button is clicked", () => {
    renderHeader();

    const menuButton = screen.getByRole("button", { name: /open navigation menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByRole("button", { name: /close navigation menu/i })).toBeInTheDocument();
    expect(screen.getAllByText(/View Resume/i).length).toBeGreaterThan(0);
  });
});
