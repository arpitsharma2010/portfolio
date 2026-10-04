import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EndEncounter from "../EndEncounter";
import { playRewardChime } from "../../../utils/rewardSound";

vi.mock("../../../utils/rewardSound", () => ({ playRewardChime: vi.fn() }));

const enterEnd = () => fireEvent.click(screen.getByRole("button", { name: "Enter the End Portal" }));
const dragon = () => screen.getByRole("button", { name: /End Dragon, \d+ percent health/ });
const crystal = (number: number) => screen.getByRole("button", { name: new RegExp(`End Crystal ${number},`) });
const attack = (target: HTMLElement, times: number) => {
  for (let index = 0; index < times; index += 1) fireEvent.click(target);
};
const destroyAllCrystals = () => {
  for (let index = 1; index <= 5; index += 1) attack(crystal(index), 3);
};

describe("EndEncounter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(playRewardChime).mockReset();
  });
  afterEach(() => vi.useRealTimers());

  it("stays unavailable below 10 XP and becomes enterable at exactly 10 XP", () => {
    const { rerender } = render(<EndEncounter earnedXp={5} />);
    expect(screen.getByRole("button", { name: "End Portal locked, 5 of 10 exploration XP" })).toBeDisabled();
    expect(screen.queryByRole("progressbar", { name: "End Dragon health" })).not.toBeInTheDocument();

    rerender(<EndEncounter earnedXp={10} />);
    expect(screen.getByRole("button", { name: "Enter the End Portal" })).toBeEnabled();
    enterEnd();
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("Crystals: 5 / 5")).toBeInTheDocument();
  });

  it("uses five named button targets with three integrity states and important announcements", () => {
    render(<EndEncounter earnedXp={10} />);
    enterEnd();
    const targets = within(screen.getByLabelText("End Crystal targets")).getAllByRole("button");
    expect(targets).toHaveLength(5);
    expect(crystal(1)).toHaveAccessibleName("End Crystal 1, 3 of 3 integrity");
    fireEvent.keyDown(crystal(1), { key: "Enter" });
    expect(crystal(1)).toHaveAccessibleName("End Crystal 1, 2 of 3 integrity");
    fireEvent.keyDown(crystal(1), { key: " " });
    fireEvent.click(crystal(1));
    expect(crystal(1)).toBeDisabled();
    expect(screen.getByText("End Crystal 1 destroyed")).toBeInTheDocument();
    expect(screen.getByText("Crystals: 4 / 5")).toBeInTheDocument();
  });

  it("visibly regenerates during continuous attacks and stops after crystals are cleared", () => {
    render(<EndEncounter earnedXp={10} />);
    enterEnd();
    attack(dragon(), 8);
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByText("Regenerating")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(900));
    fireEvent.click(dragon());
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "55");
    act(() => vi.advanceTimersByTime(100));
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "60");
    attack(dragon(), 2);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "55");

    destroyAllCrystals();
    expect(screen.getByText("All End Crystals destroyed")).toBeInTheDocument();
    fireEvent.keyDown(dragon(), { key: "Enter" });
    const healthAfterAttack = screen.getByRole("progressbar", { name: "End Dragon health" }).getAttribute("aria-valuenow");
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", healthAfterAttack!);
    expect(screen.queryByText("Regenerating")).not.toBeInTheDocument();
  });

  it("defeats the vulnerable dragon, disables further interaction, and keeps XP unchanged", () => {
    render(<EndEncounter earnedXp={10} soundEnabled />);
    enterEnd();
    destroyAllCrystals();
    attack(dragon(), 20);

    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getAllByText("Dragon defeated").length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /End Dragon,/ })).not.toBeInTheDocument();
    expect(playRewardChime).toHaveBeenCalledOnce();
    expect(screen.getByText("Crystals: 0 / 5")).toBeInTheDocument();
  });

  it("preserves encounter progress across exit and re-entry without trapping focus", () => {
    render(<EndEncounter earnedXp={10} />);
    enterEnd();
    fireEvent.click(crystal(3));
    const returnPortal = screen.getByRole("button", { name: "Return through portal" });
    returnPortal.focus();
    fireEvent.keyDown(returnPortal, { key: "Tab" });
    expect(returnPortal).not.toHaveAttribute("aria-modal");
    fireEvent.click(returnPortal);
    enterEnd();
    expect(crystal(3)).toHaveAccessibleName("End Crystal 3, 2 of 3 integrity");
  });
});
