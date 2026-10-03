import { fireEvent, render, screen } from "@testing-library/react";
import MinecraftInventoryGrid from "../MinecraftInventoryGrid";
import type { MinecraftItem } from "../types";

const items: MinecraftItem[] = [
  { id: "pickaxe", name: "Pickaxe", icon: "iron-pickaxe", category: "tool" },
  { id: "sword", name: "Sword", icon: "sword", category: "weapon" },
];

describe("MinecraftInventoryGrid", () => {
  it("renders the configured number of logically indexed slots", () => {
    render(<MinecraftInventoryGrid items={items} rows={2} />);

    const cells = screen.getAllByRole("gridcell");
    expect(cells).toHaveLength(18);
    expect(cells[0]).toHaveAttribute("aria-rowindex", "1");
    expect(cells[9]).toHaveAttribute("aria-rowindex", "2");
  });

  it("supports arrow-key navigation", () => {
    render(<MinecraftInventoryGrid items={items} rows={1} />);
    const pickaxe = screen.getByRole("button", { name: "Pickaxe" });
    const sword = screen.getByRole("button", { name: "Sword" });
    pickaxe.focus();

    fireEvent.keyDown(pickaxe, { key: "ArrowRight" });
    expect(sword).toHaveFocus();
    fireEvent.keyDown(sword, { key: "ArrowLeft" });
    expect(pickaxe).toHaveFocus();
  });

  it("keeps arrow navigation aligned with adaptive columns at target widths", () => {
    const widths = [320, 375, 430, 768, 1024, 1440, 1920];
    const fullGrid = Array.from({ length: 18 }, (_, index): MinecraftItem => ({
      id: `item-${index}`,
      name: `Item ${index}`,
      icon: "emerald",
      category: "material",
    }));
    const originalWidth = window.innerWidth;

    for (const width of widths) {
      Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
      const { unmount } = render(<MinecraftInventoryGrid items={fullGrid} rows={2} />);
      const first = screen.getByRole("button", { name: "Item 0" });
      first.focus();
      fireEvent.keyDown(first, { key: "ArrowDown" });
      const expectedIndex = width <= 520 ? 4 : width <= 768 ? 6 : 9;
      expect(screen.getByRole("button", { name: `Item ${expectedIndex}` })).toHaveFocus();
      unmount();
    }

    Object.defineProperty(window, "innerWidth", { configurable: true, value: originalWidth });
  });
});
