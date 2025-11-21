import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import SocialLinks from "../utils/SocialLinks.tsx";

interface HeaderProps {
  url: string;
  theme: string;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ url, theme, onThemeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const resumePDF = "https://drive.google.com/file/d/1e_GcWvtUy6fHMgnmjvwzVIFNeFW0F457/view?usp=sharing";
  const location = useLocation();
  const isDarkMode = theme === "dark";

  const navLinks = [
    { to: "/portfolio/", label: "Home" },
    { to: "/portfolio/skills/", label: "Skills" },
    { to: "/portfolio/projects/", label: "Projects" },
    { to: "/portfolio/education/", label: "Education" },
    { to: "/portfolio/experience/", label: "Experience" },
    { to: "/portfolio/certifications/", label: "Certifications" },
    { to: "/portfolio/contact/", label: "Contact" },
  ];

  const calculateScrollProgress = () => {
    const totalHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.scrollY;
    if (totalHeight > 0) {
      setScrollProgress((scrolled / totalHeight) * 100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollProgress);
    calculateScrollProgress();

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  const renderNavLinks = (onClick?: () => void) => (
    <ul className="flex flex-col gap-2">
      {navLinks.map((link) => {
        const isActive =
          location.pathname === link.to ||
          (link.to !== "/portfolio/" && location.pathname.startsWith(link.to));

        return (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={onClick}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-semibold tracking-wide transition
                ${
                  isActive
                    ? "text-cyan-700 dark:text-cyan-300"
                    : "text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300"
                }`}
            >
              <span
                className={`absolute left-2 h-6 w-1 rounded-full bg-gradient-to-b from-cyan-600 to-blue-500 transition-all duration-300
                ${isActive ? "opacity-100 scale-y-125" : "opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100"}`}
                aria-hidden
              />
              <span>{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const ThemeButton = ({ className = "" }: { className?: string }) => (
    <button
      onClick={() => {
        onThemeToggle();
        setMenuOpen(false);
      }}
      className={`flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-white ${className}`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? (
        <>
          <FaSun className="text-amber-300" />
          <span>Light</span>
        </>
      ) : (
        <>
          <FaMoon className="text-cyan-300" />
          <span>Dark</span>
        </>
      )}
    </button>
  );

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[9999] h-1 w-full bg-gradient-to-r from-cyan-500/60 to-blue-500/60 transition-all duration-75 ease-out lg:hidden"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      {/* Desktop sidebar */}
      <aside className="fixed top-0 left-0 hidden h-screen w-72 flex-col justify-between border-r border-slate-200/60 bg-white/90 px-6 py-8 text-slate-900 shadow-2xl backdrop-blur-lg dark:border-white/5 dark:bg-slate-950/60 dark:text-white lg:flex z-40">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 opacity-70 blur-2xl" aria-hidden />
            <img
              src={`${url}profile.png`}
              alt="Arpit Sharma"
              className="relative h-28 w-28 rounded-2xl border border-white/10 object-cover shadow-2xl"
            />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Arpit Sharma</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Software Engineer · Full-Stack · Cloud & AI Enthusiast
          </p>
          <div className="mt-4 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:bg-white/10 dark:text-cyan-200">
            Available for Full time roles starting Feb 2026
          </div>
        </div>

        <nav className="w-full">{renderNavLinks()}</nav>

        <div className="flex flex-col items-center gap-4">
          <SocialLinks size="text-xl" gap="gap-4" />
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-blue-500 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-lg shadow-cyan-500/30 transition hover:brightness-110"
          >
            View Resume
          </a>
          <ThemeButton className="w-full" />
          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Arpit Sharma • Crafted with curiosity
          </p>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="fixed top-0 left-0 z-40 flex w-full items-center justify-between border-b border-slate-200/70 bg-white/90 px-4 py-3 text-slate-900 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-white lg:hidden">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">Portfolio</p>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Arpit Sharma</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeButton />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full border border-slate-300 p-2 text-2xl text-slate-700 transition hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:text-white"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed top-[70px] left-0 z-30 w-full space-y-5 rounded-b-3xl border border-slate-200/80 bg-white/95 px-6 py-6 text-slate-900 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-900/95 dark:text-white lg:hidden">
          <nav>{renderNavLinks(() => setMenuOpen(false))}</nav>
          <SocialLinks size="text-2xl" gap="gap-6" />
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-500 px-4 py-2 text-center text-sm font-semibold tracking-wide text-white"
          >
            View Resume
          </a>
          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Arpit Sharma
          </p>
        </div>
      )}
    </>
  );
};

export default Header;
