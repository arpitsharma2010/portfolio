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

  it("stays unavailable until activated and becomes enterable only when active", () => {
    const { rerender } = render(<EndEncounter portalState="locked" filledSockets={0} />);
    expect(screen.getByRole("button", { name: "End Portal locked. Collect 12 Portal Crystals" })).toBeDisabled();
    expect(screen.queryByRole("progressbar", { name: "End Dragon health" })).not.toBeInTheDocument();

    rerender(<EndEncounter portalState="active" filledSockets={12} />);
    expect(screen.getByRole("button", { name: "Enter the End Portal" })).toBeEnabled();
    enterEnd();
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("Crystals: 5 / 5")).toBeInTheDocument();
  });

  it("enters immediately when a completed fill issues an entry request", () => {
    const { rerender } = render(<EndEncounter portalState="filling" filledSockets={11} entryRequest={0} />);
    expect(screen.queryByRole("progressbar", { name: "End Dragon health" })).not.toBeInTheDocument();
    rerender(<EndEncounter portalState="active" filledSockets={12} entryRequest={1} />);
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("Crystals: 5 / 5")).toBeInTheDocument();
  });

  it("uses five named button targets with three integrity states and important announcements", () => {
    render(<EndEncounter portalState="active" filledSockets={12} />);
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
    render(<EndEncounter portalState="active" filledSockets={12} />);
    enterEnd();
    attack(dragon(), 4);
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByText("Regenerating")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "65");
    act(() => vi.advanceTimersByTime(7));
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "100");

    destroyAllCrystals();
    expect(screen.getByText("All End Crystals destroyed")).toBeInTheDocument();
    fireEvent.keyDown(dragon(), { key: "Enter" });
    const healthAfterAttack = screen.getByRole("progressbar", { name: "End Dragon health" }).getAttribute("aria-valuenow");
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", healthAfterAttack!);
    expect(screen.queryByText("Regenerating")).not.toBeInTheDocument();
  });

  it("keeps exactly one healing interval and clears it on exit and unmount", () => {
    const setIntervalSpy = vi.spyOn(window, "setInterval");
    const clearIntervalSpy = vi.spyOn(window, "clearInterval");
    const { unmount } = render(<EndEncounter portalState="active" filledSockets={12} />);

    enterEnd();
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(expect.any(Function), 1);

    attack(crystal(1), 3);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole("button", { name: "Return through portal" }));
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2);

    enterEnd();
    expect(setIntervalSpy).toHaveBeenCalledTimes(3);
    unmount();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(3);

    setIntervalSpy.mockRestore();
    clearIntervalSpy.mockRestore();
  });

  it("defeats the vulnerable dragon, disables further interaction, and keeps XP unchanged", () => {
    render(<EndEncounter portalState="active" filledSockets={12} soundEnabled />);
    enterEnd();
    destroyAllCrystals();
    attack(dragon(), 10);

    expect(screen.getByRole("progressbar", { name: "End Dragon health" })).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getAllByText("Dragon defeated").length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /End Dragon,/ })).not.toBeInTheDocument();
    expect(playRewardChime).toHaveBeenCalledOnce();
    expect(screen.getByText("Crystals: 0 / 5")).toBeInTheDocument();
  });

  it("preserves encounter progress across exit and re-entry without trapping focus", () => {
    render(<EndEncounter portalState="active" filledSockets={12} />);
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
