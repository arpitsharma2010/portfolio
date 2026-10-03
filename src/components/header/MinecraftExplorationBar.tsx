import { portfolioSectionIds, type PortfolioSectionId } from "./hotbarItems";

interface MinecraftExplorationBarProps {
  explorationProgress: number;
  activeSectionId: PortfolioSectionId;
}

const MinecraftExplorationBar = ({
  explorationProgress,
  activeSectionId,
}: MinecraftExplorationBarProps) => {
  const level = portfolioSectionIds.indexOf(activeSectionId) + 1;
  const currentName = activeSectionId === "home"
    ? "Spawn"
    : `${activeSectionId.charAt(0).toUpperCase()}${activeSectionId.slice(1)}`;
  const valueText = `Portfolio exploration: ${explorationProgress}%`;

  return (
    <div className="minecraft-exploration">
      <span className="minecraft-exploration__level" aria-hidden>{level} {currentName}</span>
      <div
        className="minecraft-exploration__track"
        role="progressbar"
        aria-label="Portfolio exploration progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={explorationProgress}
        aria-valuetext={valueText}
      >
        <span style={{ width: `${explorationProgress}%` }} />
      </div>
    </div>
  );
};

export default MinecraftExplorationBar;
