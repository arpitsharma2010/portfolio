import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../utils/motion";
import { PORTAL_CRYSTAL_TOTAL } from "../header/useExplorationReward";

export type PortalState = "locked" | "ready" | "filling" | "active";

export interface PortalProgress {
  portalState: PortalState;
  filledSockets: number;
  inventoryCount: number;
  entryRequest: number;
}

export const advancePortalFill = (progress: PortalProgress): PortalProgress => {
  if (progress.portalState !== "filling") return progress;
  const filledSockets = Math.min(PORTAL_CRYSTAL_TOTAL, progress.filledSockets + 1);
  return {
    ...progress,
    filledSockets,
    inventoryCount: Math.max(0, PORTAL_CRYSTAL_TOTAL - filledSockets),
    portalState: filledSockets === PORTAL_CRYSTAL_TOTAL ? "active" : "filling",
    entryRequest: filledSockets === PORTAL_CRYSTAL_TOTAL ? progress.entryRequest + 1 : progress.entryRequest,
  };
};

const portalIsVisible = (portal: HTMLElement) => {
  const rect = portal.getBoundingClientRect();
  return rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
};

export const usePortalProgress = (collectedCount: number) => {
  const [progress, setProgress] = useState<PortalProgress>({
    portalState: "locked",
    filledSockets: 0,
    inventoryCount: 0,
    entryRequest: 0,
  });
  const navigationTimer = useRef<number | null>(null);

  const currentProgress: PortalProgress = progress.portalState === "filling" || progress.portalState === "active"
    ? progress
    : {
        ...progress,
        portalState: collectedCount >= PORTAL_CRYSTAL_TOTAL ? "ready" : "locked",
        inventoryCount: collectedCount,
      };

  useEffect(() => {
    if (progress.portalState !== "filling") return;
    const timer = window.setInterval(() => setProgress(advancePortalFill), 75);
    return () => window.clearInterval(timer);
  }, [progress.portalState]);

  useEffect(() => () => {
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
  }, []);

  const startFilling = useCallback(() => {
    setProgress((current) => collectedCount >= PORTAL_CRYSTAL_TOTAL && current.portalState !== "filling" && current.portalState !== "active"
      ? { ...current, portalState: "filling", filledSockets: 0, inventoryCount: PORTAL_CRYSTAL_TOTAL }
      : current);
  }, [collectedCount]);

  const activatePortal = useCallback(() => {
    if (currentProgress.portalState !== "ready") return;
    const portal = document.getElementById("end-encounter");
    if (!portal) return;
    if (portalIsVisible(portal)) {
      startFilling();
      return;
    }
    portal.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
    if (navigationTimer.current !== null) window.clearTimeout(navigationTimer.current);
    navigationTimer.current = window.setTimeout(startFilling, prefersReducedMotion() ? 0 : 900);
  }, [currentProgress.portalState, startFilling]);

  return { ...currentProgress, activatePortal } as const;
};
