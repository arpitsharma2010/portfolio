import type { PortfolioSectionId } from "./hotbarItems";

interface MinecraftExplorationBarProps {
  sectionProgress: number;
  activeSectionId: PortfolioSectionId;
}

const MinecraftExplorationBar = ({ sectionProgress, activeSectionId }: MinecraftExplorationBarProps) => {
  const sectionName = `${activeSectionId.charAt(0).toUpperCase()}${activeSectionId.slice(1)}`;
  const visibleName = activeSectionId === "home" ? "Spawn" : sectionName;

  return (
    <div className="minecraft-exploration">
      <span className="minecraft-exploration__level" aria-hidden>{visibleName}</span>
      <div
        className="minecraft-exploration__track"
        role="progressbar"
        aria-label={`${sectionName} section progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sectionProgress}
        aria-valuetext={`${sectionName} section progress: ${sectionProgress}%`}
      >
        {/* Keyed by section: a new section's fill starts at its own value instead of animating back from the last one. */}
        <span key={activeSectionId} style={{ width: `${sectionProgress}%` }} />
      </div>
    </div>
  );
};

export default MinecraftExplorationBar;
