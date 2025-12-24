import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import SocialLinks from "../utils/SocialLinks.tsx";

interface HeaderProps {
  url: string;
  theme: string;
  onThemeToggle: () => void;
}

const navLinks = [
  { to: "/portfolio/", label: "Home" },
  { to: "/portfolio/skills/", label: "Skills" },
  { to: "/portfolio/projects/", label: "Projects" },
  { to: "/portfolio/education/", label: "Education" },
  { to: "/portfolio/experience/", label: "Experience" },
  { to: "/portfolio/certifications/", label: "Certifications" },
  { to: "/portfolio/contact/", label: "Contact" },
];

const Header: React.FC<HeaderProps> = ({ url, theme, onThemeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isDarkMode = theme === "dark";
  const resumePDF = "https://drive.google.com/file/d/1STvn96l2SdtA4TYAxSvIHf5QyJ6KwFzs/view";

  useEffect(() => {
    const calculateScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      if (totalHeight > 0) {
        setScrollProgress((scrolled / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", calculateScrollProgress);
    calculateScrollProgress();
    return () => window.removeEventListener("scroll", calculateScrollProgress);
  }, []);

  const ThemeButton = ({ className = "" }: { className?: string }) => (
    <button
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const origin = {
          x: rect.left + rect.width / 2 + window.scrollX,
          y: rect.top + rect.height / 2 + window.scrollY,
        };
        onThemeToggle(origin);
        setMenuOpen(false);
      }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-ion/50 hover:text-ion ${className}`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-r from-plasma/40 to-ion/40 transition-transform duration-300 ease-out group-hover:translate-y-0" />
      <span className="relative flex items-center gap-2">
        {isDarkMode ? <FaSun className="text-amber-300" /> : <FaMoon className="text-aurora" />}
        {isDarkMode ? "Light" : "Dark"}
      </span>
    </button>
  );

  const renderNavLink = (
    link: (typeof navLinks)[number],
    onClick?: () => void,
    variant: "sidebar" | "mobile" = "mobile"
  ) => {
    const isActive =
      location.pathname === link.to || (link.to !== "/portfolio/" && location.pathname.startsWith(link.to));

    const baseStyles =
      variant === "sidebar"
        ? "w-full rounded-2xl px-4 py-2 text-left text-xs font-semibold uppercase tracking-[0.35em]"
        : "group relative overflow-hidden rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em]";

    return (
      <Link
        key={link.to}
        to={link.to}
        onClick={onClick}
        className={`${baseStyles} transition ${
          variant === "sidebar"
            ? isActive
              ? "bg-white/10 text-ion"
              : "text-slate-300 hover:text-white"
            : isActive
            ? "text-ion"
            : "text-slate-300 hover:text-white"
        }`}
      >
        {variant === "mobile" && (
          <span
            className={`absolute inset-0 opacity-0 transition group-hover:opacity-100 ${
              isActive ? "opacity-100" : ""
            }`}
            style={{
              background:
                "linear-gradient(90deg, rgba(56,249,215,0.2), rgba(168,85,247,0.25))",
              boxShadow: "0 0 30px rgba(56,249,215,0.35)",
            }}
            aria-hidden
          />
        )}
        <span className="relative z-10">{link.label}</span>
      </Link>
    );
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-gradient-to-r from-plasma/60 via-ion/70 to-flare/70 lg:hidden"
        style={{ width: `${scrollProgress}%`, transition: "width 80ms ease-out" }}
        aria-hidden
      />

      {/* Desktop sidebar */}
      <aside className="fixed left-4 top-4 hidden h-[calc(100vh-2rem)] w-72 flex-col justify-between rounded-[2rem] border border-white/10 bg-panel-dark/80 p-6 text-white shadow-[0_20px_120px_rgba(0,0,0,0.65)] backdrop-blur-2xl lg:flex z-40 theme-aware-panel">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="relative">
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-plasma/50 to-ion/30 blur-xl" aria-hidden />
            <img
              src={`${url}arpit-sharma.jpg`}
              alt="Arpit Sharma"
              className="relative h-20 w-20 rounded-2xl border border-white/20 object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-slate-400">Arpit Sharma</p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-aurora">Software Engineer</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => renderNavLink(link, undefined, "sidebar"))}
        </nav>

        <div className="flex flex-col gap-3">
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ion/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ion shadow-glow transition hover:border-plasma/60 hover:text-white"
          >
            <FiDownload /> Resume
          </a>
          <ThemeButton className="w-full justify-center" />
          <SocialLinks />
        </div>
      </aside>

      {/* Mobile header */}
      <header className="fixed top-4 left-0 z-50 w-full px-3 sm:px-6 lg:hidden">
        <div className="mx-auto flex w-full max-w-[calc(100vw-1.5rem)] items-center gap-4 rounded-[1.7rem] border border-white/10 bg-panel-dark px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl theme-aware-panel">
          <Link to="/portfolio/" className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-plasma/50 to-ion/30 blur-lg" aria-hidden />
              <img
                src={`${url}arpit-sharma.jpg`}
                alt="Arpit Sharma"
                className="relative h-12 w-12 rounded-2xl border border-white/20 object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold uppercase tracking-[0.5em] text-slate-400">Arpit</span>
              <span className="text-lg font-bold text-white">Sharma</span>
              <span className="text-[11px] uppercase tracking-[0.35em] text-aurora">Software Developer</span>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-ion/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ion shadow-glow transition hover:border-plasma/60 hover:text-white sm:inline-flex"
            >
              <FiDownload /> Resume
            </a>
            <ThemeButton />
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-full border border-white/10 p-3 text-white transition hover:border-ion/50"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenuAlt3 className="text-2xl" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed top-24 left-0 z-40 w-full px-3 sm:px-6 lg:px-10">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 rounded-3xl border border-white/10 bg-panel-dark px-5 py-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl theme-aware-panel">
            <nav className="flex flex-wrap gap-2">
              {navLinks.map((link) => renderNavLink(link, () => setMenuOpen(false)))}
            </nav>
            <SocialLinks />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
