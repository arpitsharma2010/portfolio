import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import MinecraftContainer from "../MinecraftContainer";

const ContainerHarness = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open inventory</button>
      <MinecraftContainer open={open} title="Engineering Inventory" onClose={() => setOpen(false)}>
        <button type="button">Inventory action</button>
      </MinecraftContainer>
    </>
  );
};

describe("MinecraftContainer", () => {
  it("opens, moves focus inside, and closes with its close button", async () => {
    render(<ContainerHarness />);
    const trigger = screen.getByRole("button", { name: "Open inventory" });
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog", { name: "Engineering Inventory" })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Close container" })).toHaveFocus());
    fireEvent.click(screen.getByRole("button", { name: "Close container" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape and restores focus to the trigger", () => {
    render(<ContainerHarness />);
    const trigger = screen.getByRole("button", { name: "Open inventory" });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
