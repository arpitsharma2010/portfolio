import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useExplorationReward, { recordCompletion, REWARD_XP } from "../useExplorationReward";
import MinecraftExplorationBar from "../MinecraftExplorationBar";
import type { PortfolioSectionId } from "../hotbarItems";
import { playRewardChime, unlockAudio } from "../../../utils/rewardSound";

vi.mock("../../../utils/rewardSound", () => ({ playRewardChime: vi.fn(), unlockAudio: vi.fn() }));

const sections: PortfolioSectionId[] = ["home", "about", "skills", "experience", "projects", "education", "resume", "contact"];

describe("recordCompletion", () => {
  it("counts each section once at 90% and rewards every fourth unique section", () => {
    const completed = new Set<PortfolioSectionId>();
    expect(recordCompletion(completed, "home", 89)).toBe(false);
    expect(completed.size).toBe(0);
    const rewards = [
      ...sections.slice(0, 4).map((id) => recordCompletion(completed, id, 90)),
      recordCompletion(completed, "home", 100),
      ...sections.slice(4).map((id) => recordCompletion(completed, id, 95)),
    ];
    expect(rewards).toEqual([false, false, false, true, false, false, false, false, true]);
    expect(rewards.filter(Boolean).length * REWARD_XP).toBe(10);
  });
});

describe("useExplorationReward", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(playRewardChime).mockReset();
    vi.mocked(unlockAudio).mockReset().mockResolvedValue(true);
  });
  afterEach(() => vi.useRealTimers());

  const setup = (soundEnabled = true) => renderHook(
    ({ id, progress, sound }) => useExplorationReward(id, progress, sound),
    { initialProps: { id: "home" as PortfolioSectionId, progress: 0, sound: soundEnabled } },
  );
  const complete = (hook: ReturnType<typeof setup>, ids: PortfolioSectionId[], sound = true) => {
    ids.forEach((id) => {
      hook.rerender({ id, progress: 10, sound });
      hook.rerender({ id, progress: 100, sound });
    });
  };

  it("does nothing for one section, even when it is completed repeatedly", () => {
    const hook = setup();
    complete(hook, ["home", "home", "home"]);
    expect(hook.result.current.reward).toBe(0);
    expect(playRewardChime).not.toHaveBeenCalled();
  });

  it("fires once at four sections, not on backtracking or sections five to seven, and again at eight", () => {
    const hook = setup();
    complete(hook, sections.slice(0, 4));
    expect(hook.result.current).toMatchObject({ reward: 1, visible: true, earnedXp: 5 });
    expect(playRewardChime).toHaveBeenCalledOnce();

    act(() => vi.advanceTimersByTime(2200));
    expect(hook.result.current.visible).toBe(false);
    complete(hook, ["experience", "skills", "about", "home", "projects", "education", "resume"]);
    expect(hook.result.current.reward).toBe(1);
    expect(playRewardChime).toHaveBeenCalledOnce();

    complete(hook, ["contact"]);
    expect(hook.result.current).toMatchObject({ reward: 2, visible: true, earnedXp: 10 });
    expect(playRewardChime).toHaveBeenCalledTimes(2);
  });

  it("stays silent when muted but still shows the reward", () => {
    const hook = setup(false);
    complete(hook, sections.slice(0, 4), false);
    expect(hook.result.current).toMatchObject({ reward: 1, visible: true });
    expect(playRewardChime).not.toHaveBeenCalled();
  });

  it("does not complete or chime merely because sound is enabled", () => {
    const hook = setup(false);
    complete(hook, sections.slice(0, 3), false);
    hook.rerender({ id: sections[3], progress: 89, sound: false });
    hook.rerender({ id: sections[3], progress: 89, sound: true });
    expect(hook.result.current.reward).toBe(0);
    expect(playRewardChime).not.toHaveBeenCalled();

    hook.rerender({ id: sections[3], progress: 90, sound: true });
    expect(hook.result.current.reward).toBe(1);
    expect(playRewardChime).toHaveBeenCalledOnce();
  });

  it("unlocks audio on the first successful gesture only while sound is enabled", async () => {
    const hook = setup(true);
    fireEvent.pointerDown(document.body);
    await act(async () => Promise.resolve());
    expect(unlockAudio).toHaveBeenCalledOnce();
    fireEvent.keyDown(document.body, { key: "a" });
    expect(unlockAudio).toHaveBeenCalledOnce();
    hook.rerender({ id: "home", progress: 0, sound: false });
    fireEvent.keyDown(document.body, { key: "a" });
    expect(unlockAudio).toHaveBeenCalledOnce();
  });
});

describe("reward visual", () => {
  it("shows +5 XP and politely announces only the milestone", () => {
    const { rerender } = render(<MinecraftExplorationBar sectionProgress={40} activeSectionId="about" reward={0} rewardVisible={false} />);
    const live = document.querySelector("[aria-live='polite']")!;
    expect(live).toBeEmptyDOMElement();
    rerender(<MinecraftExplorationBar sectionProgress={41} activeSectionId="about" reward={0} rewardVisible={false} />);
    expect(live).toBeEmptyDOMElement();
    rerender(<MinecraftExplorationBar sectionProgress={95} activeSectionId="about" reward={1} rewardVisible />);
    expect(live).toHaveTextContent("5 XP earned");
    expect(screen.getByText("+5 XP")).toHaveAttribute("aria-hidden", "true");
  });
});
