import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import SocialLinks from "../utils/SocialLinks.tsx";

interface HeaderProps {
  url: string;
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
}

const navLinks = [
  { to: "home", label: "Home" },
  { to: "skills", label: "Skills" },
  { to: "projects", label: "Projects" },
  { to: "education", label: "Education" },
  { to: "experience", label: "Experience" },
  { to: "certifications", label: "Certifications" },
  { to: "contact", label: "Contact" },
];

const Header: React.FC<HeaderProps> = ({ url, theme, onThemeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isDarkMode = theme === "dark";
  const resumePDF = "https://drive.google.com/file/d/1e_GcWvtUy6fHMgnmjvwzVIFNeFW0F457/view?usp=sharing";

  const [activeAttr, setActiveAttr] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate overall scroll progress for the top bar
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      if (totalHeight > 0) {
        setScrollProgress((scrolled / totalHeight) * 100);
      }

      // 2. Active nav link scroll spy
      // Triggers as soon as a section enters the bottom 30% of the viewport.
      const sections = document.querySelectorAll("section[id]");
      let currentActiveId = "home";
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (scrollY >= sectionTop - window.innerHeight * 0.7) {
          currentActiveId = section.id;
        }
      });
      
      setActiveAttr(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      className={`group flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white/[0.02] px-4 py-3 text-sm font-semibold tracking-wide text-slate-300 transition-all hover:bg-white/[0.05] hover:text-white ${className}`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {isDarkMode ? <FaSun className="text-amber-400 text-lg" /> : <FaMoon className="text-brand-sapphire text-lg" />}
      <span className="hidden lg:block">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );

  const renderNavLink = (
    link: (typeof navLinks)[number],
    onClick?: () => void,
  ) => {
    const isActive = activeAttr === link.to;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const target = document.getElementById(link.to);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 40,
          behavior: 'smooth'
        });
      }
      if (onClick) onClick();
      window.history.pushState(null, "", `#${link.to}`);
    };

    return (
      <a
        key={link.to}
        href={`#${link.to}`}
        onClick={handleClick}
        className={`flex items-center w-full rounded-xl px-4 py-3 text-sm font-bold tracking-wider transition-all border-l-4 ${
          isActive
            ? "border-brand-sapphire bg-brand-sapphire/10 text-brand-sapphire"
            : "border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 hover:border-slate-500"
        }`}
      >
        <span className="relative z-10">{link.label}</span>
      </a>
    );
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[60] h-1 bg-gradient-to-r from-brand-amber via-brand-emerald to-brand-sapphire lg:hidden"
        style={{ width: `${scrollProgress}%`, transition: "width 80ms ease-out" }}
        aria-hidden
      />

      {/* Desktop sidebar */}
      <aside className="fixed left-6 top-6 hidden h-[calc(100vh-3rem)] w-72 flex-col justify-between rounded-3xl border border-slate-800 bg-white/[0.02] p-8 text-slate-100 shadow-2xl backdrop-blur-3xl lg:flex z-40 theme-aware-panel">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-brand-amber to-brand-sapphire opacity-20 blur transition duration-500 group-hover:opacity-60" aria-hidden />
            <img
              src={`${url}arpit-sharma.jpg`}
              alt="Arpit Sharma"
              className="relative h-28 w-28 rounded-full border-2 border-slate-700 object-cover shadow-lg"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-100">Arpit Sharma</h2>
            <p className="mt-1.5 text-xs font-mono uppercase tracking-widest text-brand-sapphire font-semibold">Software Development Engineer</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 justify-center mt-6 mb-4">
          {navLinks.map((link) => renderNavLink(link))}
        </nav>

        <div className="flex flex-col gap-4">
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-brand-sapphire px-4 py-3.5 text-sm font-bold tracking-widest uppercase text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <FiDownload className="text-lg" /> Download Resume
          </a>
          <ThemeButton className="w-full" />
          <SocialLinks />
        </div>
      </aside>

      {/* Mobile header */}
      <header className="fixed top-0 left-0 z-50 w-full lg:hidden bg-slate-950/80 border-b border-slate-800/60 backdrop-blur-2xl theme-aware-panel shadow-sm">
        <div className="mx-auto flex w-full items-center justify-between px-5 py-3.5">
          <Link to="/portfolio/" className="flex items-center gap-3">
            <div className="relative">
              <img
                src={`${url}developer_image.jpg`}
                alt="Arpit Sharma"
                className="h-11 w-11 rounded-full border border-slate-700 object-cover shadow-sm"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-slate-100 uppercase tracking-wide">Arpit Sharma</span>
              <span className="text-[10px] font-mono tracking-widest text-brand-sapphire uppercase font-semibold mt-0.5">Software Development Engineer</span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-brand-sapphire px-4 py-2 text-xs font-bold tracking-widest uppercase text-white shadow-sm transition hover:bg-blue-700"
            >
              <FiDownload /> Resume
            </a>
            <ThemeButton className="!px-3 !py-2 !w-auto !border-transparent !bg-transparent hover:!bg-white/[0.05] !gap-0" />
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-xl border border-transparent p-2 text-slate-300 hover:bg-white/[0.1] hover:text-white transition-all active:scale-95"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenuAlt3 className="text-2xl" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="fixed top-[70px] left-0 z-40 w-full px-4 pb-6 lg:hidden">
          <div className="mx-auto flex w-full flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-8 shadow-2xl backdrop-blur-3xl theme-aware-panel animate-in slide-in-from-top-4 fade-in duration-200">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => renderNavLink(link, () => setMenuOpen(false)))}
            </nav>
            <div className="h-px w-full bg-slate-800" />
            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex sm:hidden w-full items-center justify-center gap-3 rounded-xl bg-brand-sapphire px-4 py-3.5 text-sm font-bold tracking-widest uppercase text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
            >
              <FiDownload className="text-lg" /> Download Resume
            </a>
            <SocialLinks />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
