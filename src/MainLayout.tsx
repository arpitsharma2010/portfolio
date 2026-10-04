import React from "react";
import Header from "./components/header/Header.tsx";
import type { ExplorationState } from "./components/header/useExplorationReward.ts";
import type { PortalState } from "./components/end/portalProgress.ts";

interface LayoutProps {
  children: React.ReactNode;
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }, animateSky?: boolean) => void;
  transitionOrigin?: { x: number; y: number } | null;
  soundEnabled?: boolean;
  onSoundEnabledChange?: (enabled: boolean) => void;
  onExplorationChange?: (state: ExplorationState) => void;
  portalCrystalCount?: number;
  portalState?: PortalState;
  onPortalActivate?: () => void;
}

const MainLayout: React.FC<LayoutProps> = ({
  children,
  theme,
  onThemeToggle,
  transitionOrigin,
  soundEnabled,
  onSoundEnabledChange,
  onExplorationChange,
  portalCrystalCount,
  portalState,
  onPortalActivate,
}) => (
  <div
    className={`world theme-transition ${theme === "light" ? "theme-light" : "theme-dark"} ${
      transitionOrigin ? "theme-transition-active" : ""
    }`}
    style={
      transitionOrigin
        ? ({
            "--transition-origin-x": `${transitionOrigin.x}px`,
            "--transition-origin-y": `${transitionOrigin.y}px`,
          } as React.CSSProperties)
        : undefined
    }
  >
    <a href="#main" className="skip-link">Skip to content</a>
    <Header
      theme={theme}
      onThemeToggle={onThemeToggle}
      soundEnabled={soundEnabled}
      onSoundEnabledChange={onSoundEnabledChange}
      onExplorationChange={onExplorationChange}
      portalCrystalCount={portalCrystalCount}
      portalState={portalState}
      onPortalActivate={onPortalActivate}
    />
    <main id="main">{children}</main>
    <footer className="world-footer">
      <span aria-hidden>◆</span> Built block by block by Arpit Dilip Sharma
      <span className="world-footer__status">World saved · 2026</span>
    </footer>
  </div>
);

export default MainLayout;
