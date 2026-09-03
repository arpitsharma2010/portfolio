import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { RESUME_URL, SHORT_NAME } from "../../utils/constants";
import { trackPageView } from "../../utils/analytics.ts";

interface HeaderProps {
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
}

const navLinks = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

/** Marks the section currently closest to the top of the viewport. */
const useActiveSection = () => {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
};

const Header: React.FC<HeaderProps> = ({ theme, onThemeToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const isDark = theme === "dark";

  useEffect(() => {
    trackPageView(`/portfolio/#${active}`);
  }, [active]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setMenuOpen(false);
  };

  const navLinkClass = (id: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active === id
        ? "bg-blue-50 text-blue-700 dark:bg-sky-400/10 dark:text-sky-300"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
    }`;

  const themeButton = (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        onThemeToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setMenuOpen(false);
      }}
      className="rounded-md border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}
    </button>
  );

  const resumeButton = (className = "") => (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 ${className}`}
    >
      Resume <FiExternalLink aria-hidden />
    </a>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-[#0b1120]/90">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, "home")}
          className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          {SHORT_NAME}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => handleNavClick(event, link.id)}
              aria-current={active === link.id ? "true" : undefined}
              className={navLinkClass(link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {themeButton}
          <div className="hidden sm:block">{resumeButton()}</div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-md border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <HiOutlineX aria-hidden /> : <HiOutlineMenuAlt3 aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Sections"
          className="border-t border-slate-200 bg-slate-50 px-5 pb-4 dark:border-slate-800 dark:bg-[#0b1120] lg:hidden"
        >
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => handleNavClick(event, link.id)}
                  className={`block ${navLinkClass(link.id)}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {resumeButton("w-full sm:hidden")}
        </nav>
      )}
    </header>
  );
};

export default Header;
