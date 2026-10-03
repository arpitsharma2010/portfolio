import { portfolioSectionIds, type PortfolioSectionId } from "./hotbarItems";

export const clampPercentage = (value: number) => Math.min(100, Math.max(0, Math.round(value)));

export const calculatePortfolioProgress = (visited: ReadonlySet<PortfolioSectionId>) => {
  if (visited.has("contact")) return 100;
  return clampPercentage((visited.size / portfolioSectionIds.length) * 100);
};
