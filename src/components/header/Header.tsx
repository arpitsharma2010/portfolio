import React, { useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { SHORT_NAME } from "../../utils/constants";
import { readSoundPreference, unlockAudio, writeSoundPreference } from "../../utils/rewardSound";
import MinecraftHUD from "./MinecraftHUD";

interface HeaderProps {
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  const [soundEnabled, setSoundEnabled] = useState(readSoundPreference);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    writeSoundPreference(next);
    if (next) void unlockAudio();
  };

  return (
    <>
      <header className="world-header">
        <a href="#home" className="world-brand">
          <span className="world-brand__cube" aria-hidden />
          <span>{SHORT_NAME}</span>
          <small>software engineer</small>
        </a>
        <div className="world-status" role="group" aria-label="Player status">
          <span className="world-status__online"><i aria-hidden /> Available for opportunities</span>
          <span className="world-status__coords" aria-hidden>XYZ · New York</span>
          <button type="button" className="world-sound" aria-pressed={soundEnabled} onClick={toggleSound}>
            {soundEnabled ? <FiVolume2 aria-hidden /> : <FiVolumeX aria-hidden />}
            <span>{soundEnabled ? "Sound On" : "Sound Off"}</span>
          </button>
        </div>
      </header>
      <MinecraftHUD theme={theme} onThemeToggle={onThemeToggle} soundEnabled={soundEnabled} />
    </>
  );
};

export default Header;
