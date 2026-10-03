import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaGraduationCap,
  FaMoon,
  FaSun,
  FaUser,
} from "react-icons/fa";
import { GiChest, GiStoneBlock } from "react-icons/gi";
import { SHORT_NAME } from "../../utils/constants";
import { trackPageView } from "../../utils/analytics.ts";

interface HeaderProps {
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
}

const navLinks = [
  { id: "home", label: "Home", display: "Spawn", Icon: GiStoneBlock, key: "1" },
  { id: "about", label: "About", display: "Player", Icon: FaUser, key: "2" },
  { id: "skills", label: "Skills", display: "Inventory", Icon: GiChest, key: "3" },
  { id: "experience", label: "Experience", display: "Quests", Icon: FaBriefcase, key: "4" },
  { id: "projects", label: "Projects", display: "Builds", Icon: FaCode, key: "5" },
  { id: "education", label: "Education", display: "Progress", Icon: FaGraduationCap, key: "6" },
  { id: "resume", label: "Resume", Icon: FaBookOpen, key: "7" },
  { id: "contact", label: "Contact", display: "Portal", Icon: FaEnvelope, key: "8" },
];

const useActiveSection = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
};

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  const active = useActiveSection();
  const isDark = theme === "dark";

  useEffect(() => {
    trackPageView(`/portfolio/#${active}`);
  }, [active]);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <header className="world-header">
        <a href="#home" onClick={(event) => goTo(event, "home")} className="world-brand">
          <span className="world-brand__cube" aria-hidden />
          <span>{SHORT_NAME}</span>
          <small>software engineer</small>
        </a>
        <div className="world-status" aria-label="Player status">
          <span className="world-status__online"><i aria-hidden /> Available for opportunities</span>
          <span className="world-status__coords" aria-hidden>XYZ · New York</span>
          <button
            type="button"
            className="pixel-button pixel-button--icon"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              onThemeToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          >
            {isDark ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}
          </button>
        </div>
      </header>

      <nav className="hotbar" aria-label="Portfolio sections">
        <ol>
          {navLinks.map(({ id, label, display, Icon, key }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(event) => goTo(event, id)}
                className={active === id ? "is-active" : undefined}
                aria-current={active === id ? "location" : undefined}
                aria-label={label}
              >
                <span className="hotbar__key" aria-hidden>{key}</span>
                <Icon aria-hidden />
                <span className="hotbar__label">{display ?? label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Header;
