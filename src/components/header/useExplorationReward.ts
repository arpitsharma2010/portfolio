import { useEffect, useRef, useState } from "react";
import type { PortfolioSectionId } from "./hotbarItems";
import { playPortalCrystalTone, playRewardChime, unlockAudio } from "../../utils/rewardSound";

export const COMPLETION_THRESHOLD = 90;
export const SECTIONS_PER_REWARD = 4;
export const REWARD_XP = 5;
const REWARD_VISIBLE_MS = 2200;
export const PORTAL_CRYSTAL_TOTAL = 12;
export const portalCrystalAwards: Readonly<Record<PortfolioSectionId, number>> = {
  home: 1,
  about: 2,
  skills: 1,
  experience: 2,
  projects: 2,
  education: 1,
  resume: 1,
  contact: 2,
};

export interface ExplorationState {
  completedSections: PortfolioSectionId[];
  explorationXP: number;
  portalCrystalCount: number;
}

export const collectSection = (completed: Set<PortfolioSectionId>, sectionId: PortfolioSectionId, progress: number) => {
  if (progress < COMPLETION_THRESHOLD || completed.has(sectionId)) return 0;
  completed.add(sectionId);
  return portalCrystalAwards[sectionId];
};

/** Records a section as completed once; true when that completion lands on a reward milestone (4th, 8th). */
export const recordCompletion = (completed: Set<PortfolioSectionId>, sectionId: PortfolioSectionId, progress: number) => {
  if (!collectSection(completed, sectionId, progress)) return false;
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
  const [portalAward, setPortalAward] = useState(0);
  const [portalAwardVisible, setPortalAwardVisible] = useState(false);
  const [completionVersion, setCompletionVersion] = useState(0);
  const [exploration, setExploration] = useState<ExplorationState>({ completedSections: [], explorationXP: 0, portalCrystalCount: 0 });

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    const award = collectSection(completed.current, sectionId, sectionProgress);
    if (!award) return;
    setPortalAward(award);
    setPortalAwardVisible(true);
    setCompletionVersion((version) => version + 1);
    const completedSections = [...completed.current];
    setExploration({
      completedSections,
      explorationXP: Math.floor(completedSections.length / SECTIONS_PER_REWARD) * REWARD_XP,
      portalCrystalCount: completedSections.reduce((total, id) => total + portalCrystalAwards[id], 0),
    });
    const milestone = completed.current.size % SECTIONS_PER_REWARD === 0;
    if (milestone) {
      setReward((count) => count + 1);
      setVisible(true);
    }
    if (soundEnabledRef.current) {
      playPortalCrystalTone();
      if (milestone) playRewardChime();
    }
  }, [sectionId, sectionProgress]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setVisible(false), REWARD_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [reward, visible]);

  useEffect(() => {
    if (!portalAwardVisible) return;
    const timer = window.setTimeout(() => setPortalAwardVisible(false), REWARD_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [completionVersion, portalAwardVisible]);

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

  return {
    reward,
    visible,
    earnedXp: exploration.explorationXP,
    portalAward,
    portalAwardVisible,
    exploration,
  } as const;
};

export default useExplorationReward;
