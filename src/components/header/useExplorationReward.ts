import { useEffect, useRef, useState } from "react";
import type { PortfolioSectionId } from "./hotbarItems";
import { playRewardChime, unlockAudio } from "../../utils/rewardSound";

export const COMPLETION_THRESHOLD = 90;
export const SECTIONS_PER_REWARD = 4;
export const REWARD_XP = 5;
const REWARD_VISIBLE_MS = 2200;

/** Records a section as completed once; true when that completion lands on a reward milestone (4th, 8th). */
export const recordCompletion = (completed: Set<PortfolioSectionId>, sectionId: PortfolioSectionId, progress: number) => {
  if (progress < COMPLETION_THRESHOLD || completed.has(sectionId)) return false;
  completed.add(sectionId);
  return completed.size % SECTIONS_PER_REWARD === 0;
};

/**
 * Playful exploration reward, separate from the section-progress bar: +5 XP for every four unique sections
 * completed in this page session (a reload starts a new session).
 */
const useExplorationReward = (sectionId: PortfolioSectionId, sectionProgress: number, soundEnabled: boolean) => {
  const completed = useRef(new Set<PortfolioSectionId>());
  const soundEnabledRef = useRef(soundEnabled);
  const [reward, setReward] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (!recordCompletion(completed.current, sectionId, sectionProgress)) return;
    setReward((count) => count + 1);
    setVisible(true);
    if (soundEnabledRef.current) playRewardChime();
  }, [sectionId, sectionProgress]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), REWARD_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [reward, visible]);

  // Browsers only let audio start from a user gesture, so unlock on the first one.
  useEffect(() => {
    if (!soundEnabled) return;
    const options = { capture: true, passive: true };
    let active = true;
    let unlocking = false;
    const removeListeners = () => {
      document.removeEventListener("pointerdown", unlock, options);
      document.removeEventListener("keydown", unlock, options);
    };
    const unlock = () => {
      if (unlocking) return;
      unlocking = true;
      void unlockAudio().then((unlocked) => {
        if (active && unlocked) removeListeners();
        unlocking = false;
      });
    };
    document.addEventListener("pointerdown", unlock, options);
    document.addEventListener("keydown", unlock, options);
    return () => {
      active = false;
      removeListeners();
    };
  }, [soundEnabled]);

  return { reward, visible, earnedXp: reward * REWARD_XP } as const;
};

export default useExplorationReward;
