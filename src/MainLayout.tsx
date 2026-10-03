import React from "react";
import Header from "./components/header/Header.tsx";

interface LayoutProps {
  children: React.ReactNode;
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
  transitionOrigin?: { x: number; y: number } | null;
}

const MainLayout: React.FC<LayoutProps> = ({ children, theme, onThemeToggle, transitionOrigin }) => (
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
    <Header theme={theme} onThemeToggle={onThemeToggle} />
    <main id="main">{children}</main>
    <footer className="world-footer">
      <span aria-hidden>◆</span> Built block by block by Arpit Dilip Sharma
      <span className="world-footer__status">World saved · 2026</span>
    </footer>
  </div>
);

export default MainLayout;
