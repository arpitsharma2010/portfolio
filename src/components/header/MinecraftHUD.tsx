import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { MinecraftSlot } from "../minecraft";
import { trackPageView } from "../../utils/analytics";
import MinecraftExplorationBar from "./MinecraftExplorationBar";
import MinecraftSelectedItemLabel from "./MinecraftSelectedItemLabel";
import { getHotbarEntries } from "./hotbarItems";
import useHotbarNavigation from "./useHotbarNavigation";
import useSectionProgress from "./useSectionProgress";
import useExplorationReward from "./useExplorationReward";
import type { ExplorationState } from "./useExplorationReward";
import type { PortalState } from "../end/portalProgress";
import "./minecraft-hud.css";

interface MinecraftHUDProps {
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }, animateSky?: boolean) => void;
  soundEnabled?: boolean;
  onExplorationChange?: (state: ExplorationState) => void;
  portalCrystalCount?: number;
  portalState?: PortalState;
  onPortalActivate?: () => void;
}

const MinecraftHUD = ({
  theme,
  onThemeToggle,
  soundEnabled = false,
  onExplorationChange,
  portalCrystalCount = 0,
  portalState = "locked",
  onPortalActivate,
}: MinecraftHUDProps) => {
  const isDark = theme === "dark";
  const entries = useMemo(() => getHotbarEntries(isDark, portalCrystalCount), [isDark, portalCrystalCount]);
  const navRef = useRef<HTMLElement>(null);
  const {
    activeSectionId,
    selectedIndex,
    announcement,
    activateIndex,
    previewIndex,
  } = useHotbarNavigation({ entries, onThemeToggle, onPortalActivate: portalState === "ready" ? onPortalActivate : undefined, navRef });
  const sectionProgress = useSectionProgress(activeSectionId);
  const { reward, visible: rewardVisible, portalAward, portalAwardVisible, exploration } = useExplorationReward(activeSectionId, sectionProgress, soundEnabled);

  useEffect(() => {
    onExplorationChange?.(exploration);
  }, [exploration, onExplorationChange]);

  useEffect(() => {
    trackPageView(`/portfolio/#${activeSectionId}`);
  }, [activeSectionId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.defaultPrevented) return;
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-hotbar-index]");
    if (!target) return;
    const currentIndex = Number(target.dataset.hotbarIndex);
    let nextIndex: number | null = null;
    if (event.key === "ArrowLeft") nextIndex = currentIndex - 1;
    if (event.key === "ArrowRight") nextIndex = currentIndex + 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = entries.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    previewIndex(nextIndex, true);
  };

  return (
    <div className="minecraft-hud" data-testid="minecraft-hud">
      <MinecraftSelectedItemLabel announcement={announcement} />
      <MinecraftExplorationBar
        sectionProgress={sectionProgress}
        activeSectionId={activeSectionId}
        reward={reward}
        rewardVisible={rewardVisible}
      />
      <nav
        ref={navRef}
        className="minecraft-hotbar"
        aria-label="Portfolio hotbar navigation"
        onKeyDown={handleKeyDown}
      >
        <ol>
          {entries.map((entry, index) => {
            const actionLabel = entry.kind === "theme"
              ? `Clock — ${entry.displayLabel}`
              : entry.kind === "portal-crystals"
                ? portalState === "filling"
                  ? "Filling End Portal"
                  : portalState === "active"
                    ? "End Portal active"
                    : `Portal Crystals — ${portalCrystalCount} of 12 collected${portalState === "ready" ? ". Activate End Portal" : ""}`
                : `${entry.item.name} — ${entry.item.category}`;
            const isCurrentSection = entry.sectionId === activeSectionId;
            const isPortalSlot = entry.kind === "portal-crystals";
            return (
              <li key={entry.item.id} className={isCurrentSection ? "is-current-section" : undefined}>
                <span className="minecraft-hotbar__key" aria-hidden>{entry.slot}</span>
                <MinecraftSlot
                  item={entry.item}
                  selected={selectedIndex === index}
                  activateOnClick
                  onActivate={() => activateIndex(index)}
                  slotLabel={actionLabel}
                  className="minecraft-hotbar__slot"
                  data-hotbar-index={index}
                  data-href={entry.sectionId ? `#${entry.sectionId}` : undefined}
                  aria-current={isCurrentSection ? "location" : undefined}
                  aria-keyshortcuts={String(entry.slot)}
                  aria-disabled={isPortalSlot && portalState === "locked" ? "true" : undefined}
                />
                {isPortalSlot && <span className="minecraft-hotbar__count" aria-hidden>{portalCrystalCount}</span>}
                {isPortalSlot && portalAwardVisible && (
                  <span className="minecraft-hotbar__portal-reward" aria-hidden>
                    <span className="portal-crystal-mini" />+{portalAward}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <p className="mc-visually-hidden" aria-live="polite" aria-atomic="true">
        {portalAwardVisible ? `${portalAward} Portal Crystal${portalAward === 1 ? "" : "s"} collected` : portalState === "active" ? "End Portal active" : ""}
      </p>
    </div>
  );
};

export default MinecraftHUD;
