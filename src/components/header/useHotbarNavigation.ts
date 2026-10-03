import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  getSectionFromHash,
  portfolioSectionIds,
  type HotbarEntry,
  type PortfolioSectionId,
} from "./hotbarItems";
import type { SelectedItemAnnouncement } from "./MinecraftSelectedItemLabel";
import { calculatePortfolioProgress } from "./usePortfolioExploration";

const isReducedMotion = () =>
  typeof window.matchMedia === "function"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return true;
  return target.isContentEditable || Boolean(target.closest("[contenteditable='true'], [contenteditable='']"));
};

interface UseHotbarNavigationOptions {
  entries: HotbarEntry[];
  onThemeToggle: (origin?: { x: number; y: number }) => void;
  navRef: RefObject<HTMLElement | null>;
}

const useHotbarNavigation = ({ entries, onThemeToggle, navRef }: UseHotbarNavigationOptions) => {
  const initialHashSection = getSectionFromHash(typeof window === "undefined" ? "" : window.location.hash);
  const initialSection = initialHashSection ?? "home";
  const initialIndex = portfolioSectionIds.indexOf(initialSection);
  const [activeSectionId, setActiveSectionId] = useState<PortfolioSectionId>(initialSection);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [announcement, setAnnouncement] = useState<SelectedItemAnnouncement | null>(null);
  const [sectionsVisited, setSectionsVisited] = useState<ReadonlySet<PortfolioSectionId>>(() => new Set([initialSection]));
  const announcementToken = useRef(0);
  const announcementTimer = useRef<number | null>(null);
  const selectedIndexRef = useRef(selectedIndex);
  const selectionLockUntil = useRef(0);
  const pendingObservedSection = useRef<PortfolioSectionId | null>(null);
  const observerReleaseTimer = useRef<number | null>(null);

  useEffect(() => { selectedIndexRef.current = selectedIndex; }, [selectedIndex]);
  useEffect(() => {
    if (initialHashSection) selectionLockUntil.current = Date.now() + 1200;
  }, [initialHashSection]);
  useEffect(() => () => {
    if (announcementTimer.current !== null) window.clearTimeout(announcementTimer.current);
  }, []);

  const applyActiveSection = useCallback((sectionId: PortfolioSectionId) => {
    setActiveSectionId(sectionId);
    setSectionsVisited((current) => current.has(sectionId) ? current : new Set([...current, sectionId]));
  }, []);

  const showSelectedLabel = useCallback((index: number) => {
    const entry = entries[index];
    if (!entry) return;
    announcementToken.current += 1;
    setAnnouncement({
      token: announcementToken.current,
      itemName: entry.item.name,
      displayLabel: entry.displayLabel,
    });
    if (announcementTimer.current !== null) window.clearTimeout(announcementTimer.current);
    announcementTimer.current = window.setTimeout(() => setAnnouncement(null), 2400);
  }, [entries]);

  const revealSlot = useCallback((index: number, moveFocus: boolean) => {
    const button = navRef.current?.querySelector<HTMLButtonElement>(`[data-hotbar-index="${index}"]`);
    if (moveFocus) button?.focus({ preventScroll: true });
    button?.scrollIntoView?.({ behavior: isReducedMotion() ? "auto" : "smooth", block: "nearest", inline: "nearest" });
  }, [navRef]);

  const previewIndex = useCallback((index: number, moveFocus = false) => {
    const normalized = (index + entries.length) % entries.length;
    selectionLockUntil.current = Date.now() + 900;
    setSelectedIndex(normalized);
    showSelectedLabel(normalized);
    revealSlot(normalized, moveFocus);
  }, [entries.length, revealSlot, showSelectedLabel]);

  const scrollToSection = useCallback((sectionId: PortfolioSectionId, behavior: ScrollBehavior) => {
    document.getElementById(sectionId)?.scrollIntoView?.({ behavior, block: "start" });
  }, []);

  const activateIndex = useCallback((index: number) => {
    const entry = entries[index];
    if (!entry) return;
    setSelectedIndex(index);
    showSelectedLabel(index);
    revealSlot(index, false);

    if (entry.kind === "theme") {
      const trigger = navRef.current?.querySelector<HTMLElement>(`[data-hotbar-index="${index}"]`);
      const rect = trigger?.getBoundingClientRect();
      onThemeToggle(rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined);
      return;
    }

    const sectionId = entry.sectionId;
    if (!sectionId) return;
    const behavior: ScrollBehavior = isReducedMotion() ? "auto" : "smooth";
    selectionLockUntil.current = Date.now() + (behavior === "smooth" ? 1100 : 200);
    applyActiveSection(sectionId);
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState({ portfolioSection: sectionId }, "", `#${sectionId}`);
    }
    scrollToSection(sectionId, behavior);
  }, [applyActiveSection, entries, navRef, onThemeToggle, revealSlot, scrollToSection, showSelectedLabel]);

  useEffect(() => {
    const sectionState = new Map<PortfolioSectionId, { intersecting: boolean; ratio: number; top: number }>();
    const applyObservedSection = (sectionId: PortfolioSectionId) => {
      applyActiveSection(sectionId);
      setSelectedIndex(portfolioSectionIds.indexOf(sectionId));
    };
    const observer = new IntersectionObserver((observedEntries) => {
      observedEntries.forEach((entry) => {
        const id = entry.target.id as PortfolioSectionId;
        if (!portfolioSectionIds.includes(id)) return;
        sectionState.set(id, {
          intersecting: entry.isIntersecting,
          ratio: entry.intersectionRatio,
          top: entry.boundingClientRect.top,
        });
      });
      const readingLine = window.innerHeight * .3;
      const candidates = portfolioSectionIds
        .map((id) => ({ id, state: sectionState.get(id) }))
        .filter((candidate): candidate is { id: PortfolioSectionId; state: { intersecting: boolean; ratio: number; top: number } } => Boolean(candidate.state?.intersecting))
        .sort((a, b) => {
          const distance = Math.abs(a.state.top - readingLine) - Math.abs(b.state.top - readingLine);
          return distance || b.state.ratio - a.state.ratio || portfolioSectionIds.indexOf(a.id) - portfolioSectionIds.indexOf(b.id);
        });
      const candidate = candidates[0]?.id;
      if (!candidate) return;
      if (Date.now() < selectionLockUntil.current) {
        pendingObservedSection.current = candidate;
        if (observerReleaseTimer.current !== null) window.clearTimeout(observerReleaseTimer.current);
        observerReleaseTimer.current = window.setTimeout(() => {
          const pending = pendingObservedSection.current;
          if (pending && Date.now() >= selectionLockUntil.current) applyObservedSection(pending);
          pendingObservedSection.current = null;
        }, Math.max(0, selectionLockUntil.current - Date.now()) + 20);
        return;
      }
      applyObservedSection(candidate);
    }, {
      rootMargin: "-18% 0px -62% 0px",
      threshold: [0, .1, .25, .5, .75],
    });

    portfolioSectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => {
      observer.disconnect();
      if (observerReleaseTimer.current !== null) window.clearTimeout(observerReleaseTimer.current);
    };
  }, [applyActiveSection]);

  useEffect(() => {
    const handleHistoryNavigation = () => {
      const sectionId = getSectionFromHash(window.location.hash);
      if (!sectionId) return;
      selectionLockUntil.current = Date.now() + 250;
      applyActiveSection(sectionId);
      setSelectedIndex(portfolioSectionIds.indexOf(sectionId));
      scrollToSection(sectionId, "auto");
    };
    window.addEventListener("popstate", handleHistoryNavigation);
    window.addEventListener("hashchange", handleHistoryNavigation);
    return () => {
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener("hashchange", handleHistoryNavigation);
    };
  }, [applyActiveSection, scrollToSection]);

  useEffect(() => {
    const sectionId = getSectionFromHash(window.location.hash);
    if (!sectionId) return;
    const settleHash = () => scrollToSection(sectionId, "auto");
    const frame = requestAnimationFrame(settleHash);
    window.addEventListener("load", settleHash);
    void document.fonts?.ready.then(settleHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", settleHash);
    };
  }, [scrollToSection]);

  useEffect(() => {
    const handleNumberShortcut = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || isTypingTarget(event.target)) return;
      if (!/^[1-9]$/.test(event.key)) return;
      event.preventDefault();
      activateIndex(Number(event.key) - 1);
    };
    document.addEventListener("keydown", handleNumberShortcut);
    return () => document.removeEventListener("keydown", handleNumberShortcut);
  }, [activateIndex]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const nav = navRef.current;
      if (!nav || event.deltaY === 0) return;
      const targetInside = event.target instanceof Node && nav.contains(event.target);
      const focusInside = document.activeElement instanceof Node && nav.contains(document.activeElement);
      if (!targetInside && !focusInside) return;
      event.preventDefault();
      previewIndex(selectedIndexRef.current + (event.deltaY > 0 ? 1 : -1));
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel);
  }, [navRef, previewIndex]);

  return {
    activeSectionId,
    selectedIndex,
    announcement,
    explorationProgress: calculatePortfolioProgress(sectionsVisited),
    sectionsVisited,
    activateIndex,
    previewIndex,
  } as const;
};

export default useHotbarNavigation;
