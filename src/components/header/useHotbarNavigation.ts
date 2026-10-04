import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  getSectionFromHash,
  portfolioSectionIds,
  type HotbarEntry,
  type PortfolioSectionId,
} from "./hotbarItems";
import type { SelectedItemAnnouncement } from "./MinecraftSelectedItemLabel";
import { prefersReducedMotion } from "../../utils/motion";

export const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return true;
  return target.isContentEditable || Boolean(target.closest("[contenteditable='true'], [contenteditable='']"));
};

/** How long the wheel must rest over the hotbar before the previewed slot navigates. */
export const WHEEL_SETTLE_MS = 250;
/** Accumulated wheel delta per slot step, so a trackpad swipe doesn't race to the end. */
const WHEEL_STEP_DELTA = 40;
const LAST_NAVIGATION_INDEX = portfolioSectionIds.length - 1;

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
  const announcementToken = useRef(0);
  const announcementTimer = useRef<number | null>(null);
  const selectionLockUntil = useRef(0);
  const pendingObservedSection = useRef<PortfolioSectionId | null>(null);
  const observerReleaseTimer = useRef<number | null>(null);
  const activeSectionRef = useRef(activeSectionId);
  const wheelPreview = useRef<number | null>(null);
  const wheelTimer = useRef<number | null>(null);
  const wheelDelta = useRef(0);

  useEffect(() => { activeSectionRef.current = activeSectionId; }, [activeSectionId]);
  useEffect(() => {
    if (initialHashSection) selectionLockUntil.current = Date.now() + 1200;
  }, [initialHashSection]);
  useEffect(() => () => {
    if (announcementTimer.current !== null) window.clearTimeout(announcementTimer.current);
    if (wheelTimer.current !== null) window.clearTimeout(wheelTimer.current);
  }, []);


  /** Drops a pending wheel navigation, so it can never fire after another action. */
  const cancelWheel = useCallback(() => {
    if (wheelTimer.current !== null) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = null;
    wheelPreview.current = null;
    wheelDelta.current = 0;
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
    button?.scrollIntoView?.({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest", inline: "nearest" });
  }, [navRef]);

  const previewIndex = useCallback((index: number, moveFocus = false) => {
    cancelWheel();
    const normalized = (index + entries.length) % entries.length;
    selectionLockUntil.current = Date.now() + 900;
    setSelectedIndex(normalized);
    showSelectedLabel(normalized);
    revealSlot(normalized, moveFocus);
  }, [cancelWheel, entries.length, revealSlot, showSelectedLabel]);

  const scrollToSection = useCallback((sectionId: PortfolioSectionId, behavior: ScrollBehavior) => {
    document.getElementById(sectionId)?.scrollIntoView?.({ behavior, block: "start" });
  }, []);

  const activateIndex = useCallback((index: number) => {
    const entry = entries[index];
    if (!entry) return;
    cancelWheel();
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
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
    selectionLockUntil.current = Date.now() + (behavior === "smooth" ? 1100 : 200);
    setActiveSectionId(sectionId);
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState({ portfolioSection: sectionId }, "", `#${sectionId}`);
    }
    scrollToSection(sectionId, behavior);
  }, [cancelWheel, entries, navRef, onThemeToggle, revealSlot, scrollToSection, showSelectedLabel]);

  useEffect(() => {
    const sectionState = new Map<PortfolioSectionId, { intersecting: boolean; ratio: number; top: number }>();
    const applyObservedSection = (sectionId: PortfolioSectionId) => {
      setActiveSectionId(sectionId);
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
  }, []);

  useEffect(() => {
    const handleHistoryNavigation = () => {
      const sectionId = getSectionFromHash(window.location.hash);
      if (!sectionId) return;
      cancelWheel();
      selectionLockUntil.current = Date.now() + 250;
      setActiveSectionId(sectionId);
      setSelectedIndex(portfolioSectionIds.indexOf(sectionId));
      scrollToSection(sectionId, "auto");
    };
    window.addEventListener("popstate", handleHistoryNavigation);
    window.addEventListener("hashchange", handleHistoryNavigation);
    return () => {
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener("hashchange", handleHistoryNavigation);
    };
  }, [cancelWheel, scrollToSection]);

  useEffect(() => {
    const sectionId = getSectionFromHash(window.location.hash);
    if (!sectionId) return;
    // "instant", not "auto": auto inherits CSS smooth scrolling, which lags behind late layout shifts on load.
    const settleHash = () => scrollToSection(sectionId, "instant");
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

  /**
   * Wheel over the hotbar previews navigation slots 1-8 (clamped, never the theme clock) and keeps the page still;
   * once the wheel rests for WHEEL_SETTLE_MS the last previewed section is opened.
   */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      event.preventDefault();
      wheelDelta.current += event.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? event.deltaY : Math.sign(event.deltaY) * WHEEL_STEP_DELTA;
      if (Math.abs(wheelDelta.current) < WHEEL_STEP_DELTA) return;
      const activeIndex = portfolioSectionIds.indexOf(activeSectionRef.current);
      const next = Math.min(LAST_NAVIGATION_INDEX, Math.max(0, (wheelPreview.current ?? activeIndex) + Math.sign(wheelDelta.current)));
      wheelDelta.current = 0;
      if (wheelTimer.current !== null) window.clearTimeout(wheelTimer.current);
      wheelPreview.current = next;
      // Hold the observer off the highlight while previewing; navigation sets its own lock.
      selectionLockUntil.current = Date.now() + WHEEL_SETTLE_MS + 100;
      setSelectedIndex(next);
      showSelectedLabel(next);
      revealSlot(next, false);
      wheelTimer.current = window.setTimeout(() => {
        const target = wheelPreview.current;
        cancelWheel();
        if (target === null) return;
        // Wheeling back to the current section is a cancel, not a jump to its top.
        if (target === portfolioSectionIds.indexOf(activeSectionRef.current)) setSelectedIndex(target);
        else activateIndex(target);
      }, WHEEL_SETTLE_MS);
    };
    nav.addEventListener("wheel", handleWheel, { passive: false });
    return () => nav.removeEventListener("wheel", handleWheel);
  }, [activateIndex, cancelWheel, navRef, revealSlot, showSelectedLabel]);

  return {
    activeSectionId,
    selectedIndex,
    announcement,
    activateIndex,
    previewIndex,
  } as const;
};

export default useHotbarNavigation;
