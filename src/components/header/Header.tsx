import React from "react";
import { SHORT_NAME } from "../../utils/constants";
import MinecraftHUD from "./MinecraftHUD";

interface HeaderProps {
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  return (
    <>
      <header className="world-header">
        <a href="#home" className="world-brand">
          <span className="world-brand__cube" aria-hidden />
          <span>{SHORT_NAME}</span>
          <small>software engineer</small>
        </a>
        <div className="world-status" aria-label="Player status">
          <span className="world-status__online"><i aria-hidden /> Available for opportunities</span>
          <span className="world-status__coords" aria-hidden>XYZ · New York</span>
        </div>
      </header>
      <MinecraftHUD theme={theme} onThemeToggle={onThemeToggle} />
    </>
  );
};

export default Header;
