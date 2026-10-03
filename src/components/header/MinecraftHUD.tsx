import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { MinecraftSlot } from "../minecraft";
import { trackPageView } from "../../utils/analytics";
import MinecraftExplorationBar from "./MinecraftExplorationBar";
import MinecraftSelectedItemLabel from "./MinecraftSelectedItemLabel";
import { getHotbarEntries } from "./hotbarItems";
import useHotbarNavigation from "./useHotbarNavigation";
import "./minecraft-hud.css";

interface MinecraftHUDProps {
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
}

const MinecraftHUD = ({ theme, onThemeToggle }: MinecraftHUDProps) => {
  const isDark = theme === "dark";
  const entries = useMemo(() => getHotbarEntries(isDark), [isDark]);
  const navRef = useRef<HTMLElement>(null);
  const {
    activeSectionId,
    selectedIndex,
    announcement,
    explorationProgress,
    activateIndex,
    previewIndex,
  } = useHotbarNavigation({ entries, onThemeToggle, navRef });

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
        explorationProgress={explorationProgress}
        activeSectionId={activeSectionId}
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
              : `${entry.item.name} — ${entry.item.category}`;
            const isCurrentSection = entry.sectionId === activeSectionId;
            return (
              <li key={entry.item.id} className={isCurrentSection ? "is-current-section" : undefined}>
                <span className="minecraft-hotbar__key" aria-hidden>{entry.slot}</span>
                <MinecraftSlot
                  item={entry.item}
                  selected={selectedIndex === index}
                  showTooltipWhenSelected={false}
                  activateOnClick
                  onActivate={() => activateIndex(index)}
                  slotLabel={actionLabel}
                  className="minecraft-hotbar__slot"
                  data-hotbar-index={index}
                  data-href={entry.sectionId ? `#${entry.sectionId}` : undefined}
                  aria-current={isCurrentSection ? "location" : undefined}
                  aria-keyshortcuts={String(entry.slot)}
                />
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default MinecraftHUD;
