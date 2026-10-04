import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { vi } from "vitest";
import MinecraftSlot from "../MinecraftSlot";
import type { MinecraftItem } from "../types";

const pickaxe: MinecraftItem = {
  id: "backend-pickaxe",
  name: "Diamond Pickaxe",
  icon: "diamond-pickaxe",
  category: "Backend Engineering",
  lore: ["C# and .NET Core", "REST APIs"],
  description: "Used across enterprise banking systems",
  rarity: "rare",
};

describe("MinecraftSlot", () => {
  it("renders an item stack and selected state", () => {
    render(<MinecraftSlot item={{ ...pickaxe, quantity: 12 }} selected />);

    const slot = screen.getByRole("button", { name: "Diamond Pickaxe" });
    expect(slot).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("Quantity 12")).toHaveTextContent("12");
    expect(slot.querySelector("svg")).toBeInTheDocument();
  });

  it("selects with a click and activates from the keyboard", () => {
    const onSelect = vi.fn();
    const onActivate = vi.fn();
    render(<MinecraftSlot item={pickaxe} onSelect={onSelect} onActivate={onActivate} />);
    const slot = screen.getByRole("button", { name: "Diamond Pickaxe" });

    fireEvent.click(slot);
    expect(onSelect).toHaveBeenCalledWith(pickaxe);
    expect(onActivate).not.toHaveBeenCalled();

    fireEvent.keyDown(slot, { key: "Enter" });
    fireEvent.keyDown(slot, { key: " " });
    expect(onActivate).toHaveBeenCalledTimes(2);
  });

  it("uses the first touch to select and reveal details", () => {
    const onSelect = vi.fn();
    const onActivate = vi.fn();
    render(<MinecraftSlot item={pickaxe} onSelect={onSelect} onActivate={onActivate} />);
    const slot = screen.getByRole("button", { name: "Diamond Pickaxe" });

    fireEvent.pointerDown(slot, { pointerType: "touch" });
    fireEvent.click(slot);
    expect(onSelect).toHaveBeenCalledOnce();
    expect(onActivate).not.toHaveBeenCalled();
  });

  it("exposes lore accessibly and shows the visual tooltip on hover", () => {
    render(<MinecraftSlot item={pickaxe} />);
    const slot = screen.getByRole("button", { name: "Diamond Pickaxe" });
    const descriptionId = slot.getAttribute("aria-describedby");

    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId!)).toHaveTextContent("C# and .NET Core");
    fireEvent.mouseEnter(slot);
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveTextContent("enterprise banking systems");
  });

  it("hides the tooltip when its focused slot scrolls out of view", () => {
    render(<MinecraftSlot item={pickaxe} />);
    const slot = screen.getByRole("button", { name: "Diamond Pickaxe" });
    fireEvent.focus(slot);
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle({ visibility: "visible" });

    vi.spyOn(slot, "getBoundingClientRect").mockReturnValue(new DOMRect(0, -500, 44, 44));
    fireEvent.scroll(window);
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveStyle({ visibility: "hidden" });
  });

  describe("tooltip visibility", () => {
    const tooltip = () => screen.queryByRole("tooltip", { hidden: true });
    const SelectableSlot = () => {
      const [selected, setSelected] = useState(false);
      return <MinecraftSlot item={pickaxe} selected={selected} onSelect={() => setSelected(true)} />;
    };
    const slot = () => screen.getByRole("button", { name: "Diamond Pickaxe" });

    it("opens on hover and closes on pointer leave", () => {
      render(<MinecraftSlot item={pickaxe} />);
      fireEvent.mouseEnter(slot());
      expect(tooltip()).toBeInTheDocument();
      fireEvent.mouseLeave(slot());
      expect(tooltip()).not.toBeInTheDocument();
    });

    it("closes after a click-select once the pointer leaves, keeping the selection", () => {
      render(<SelectableSlot />);
      fireEvent.mouseEnter(slot());
      fireEvent.pointerDown(slot(), { pointerType: "mouse" });
      // A real click focuses the button between pointerdown and click.
      act(() => slot().focus());
      fireEvent.click(slot());
      fireEvent.mouseLeave(slot());
      expect(slot()).toHaveAttribute("aria-pressed", "true");
      expect(slot()).toHaveFocus();
      expect(tooltip()).not.toBeInTheDocument();
    });

    it("never opens just because the item is selected", () => {
      render(<MinecraftSlot item={pickaxe} selected />);
      expect(tooltip()).not.toBeInTheDocument();
    });

    it("opens on keyboard focus and closes on blur", () => {
      render(<MinecraftSlot item={pickaxe} />);
      act(() => slot().focus());
      expect(tooltip()).toBeInTheDocument();
      act(() => slot().blur());
      expect(tooltip()).not.toBeInTheDocument();
    });

    it("closes on blur even when the item is selected", () => {
      render(<SelectableSlot />);
      act(() => slot().focus());
      fireEvent.keyDown(slot(), { key: "Enter" });
      expect(slot()).toHaveAttribute("aria-pressed", "true");
      expect(tooltip()).toBeInTheDocument();
      act(() => slot().blur());
      expect(tooltip()).not.toBeInTheDocument();
    });

    it("treats keyboard use after a click as keyboard focus", () => {
      render(<MinecraftSlot item={pickaxe} />);
      fireEvent.pointerDown(slot(), { pointerType: "mouse" });
      act(() => slot().focus());
      fireEvent.click(slot());
      expect(tooltip()).not.toBeInTheDocument();
      fireEvent.keyDown(slot(), { key: "ArrowRight" });
      expect(tooltip()).toBeInTheDocument();
    });

    it("hides a hovered tooltip whose trigger scrolls offscreen", () => {
      render(<MinecraftSlot item={pickaxe} />);
      fireEvent.mouseEnter(slot());
      expect(tooltip()).toHaveStyle({ visibility: "visible" });
      vi.spyOn(slot(), "getBoundingClientRect").mockReturnValue(new DOMRect(0, window.innerHeight + 200, 44, 44));
      fireEvent.scroll(window);
      expect(tooltip()).toHaveStyle({ visibility: "hidden" });
    });

    it("removes the tooltip when its trigger unmounts", () => {
      const { unmount } = render(<MinecraftSlot item={pickaxe} />);
      fireEvent.mouseEnter(slot());
      unmount();
      expect(tooltip()).not.toBeInTheDocument();
    });
  });
});
