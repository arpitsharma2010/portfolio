import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SocialLinks from "../utils/SocialLinks.tsx";

// import ThemeToggle from "../utils/ThemeToggle.tsx";

interface HeaderProps {
  url: string;
}

const Header: React.FC<HeaderProps> = ({ url }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const resumePDF = "https://drive.google.com/file/d/1IZQt6GwtnYbdodXTXPRmMJrX5xwnaeWo/view";

  const navLinks = [
    { to: "/portfolio/", label: "Home" },
    { to: "/portfolio/skills/", label: "Skills" },
    { to: "/portfolio/projects/", label: "Projects" },
    { to: "/portfolio/education/", label: "Education" },
    { to: "/portfolio/experience/", label: "Experience" },
    { to: "/portfolio/certifications/", label: "Certifications" },
    { to: "/portfolio/contact/", label: "Contact" },
  ];

  return (
    <>
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 bg-light-surface text-light-text dark:bg-dark-surface dark:text-dark-text flex-col justify-between shadow-lg z-50 border-r border-light-border dark:border-dark-border">
        {/* Profile Section */}
        <div className="flex flex-col items-center px-6 py-8">
          <img
            src={`${url}profile.png`}
            alt="Arpit Sharma"
            className="w-28 h-28 rounded-full object-cover border-4 border-light-primary dark:border-dark-primary shadow-md"
          />
          <h2 className="text-2xl font-semibold mt-4">Arpit Sharma</h2>
          <p className="text-sm text-light-textMuted dark:text-dark-textMuted text-center mt-2">
            Software Engineer<br />Full-Stack Dev<br />AI & Cloud Enthusiast
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center px-4">
          <ul className="space-y-4 text-lg w-full text-center">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-light-primary dark:hover:text-dark-primary transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks size="text-2xl" gap="gap-5" />

        {/* Footer */}
        <div className="flex flex-col items-center mb-6 space-y-4 px-4 w-full">
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-light-primary dark:bg-dark-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition w-full text-center"
          >
            View Resume
          </a>
          {/* <div className="w-full flex justify-center">
            <ThemeToggle />
          </div> */}
          <div className="text-center text-xs text-light-textMuted dark:text-dark-textMuted">
            © {new Date().getFullYear()} Arpit Sharma<br />All rights reserved.
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden w-full bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text p-4 flex justify-between items-center shadow-md z-50 fixed top-0">
        <h1 className="text-xl font-semibold">Arpit Sharma</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-inherit focus:outline-none text-2xl transition-all duration-300 ease-in-out"
          aria-label="Toggle menu"
        >
          <span className="transition-transform duration-300 ease-in-out transform">
            {menuOpen ? (
              <HiOutlineX className="text-3xl rotate-0 scale-100" />
            ) : (
              <HiOutlineMenu className="text-3xl rotate-0 scale-100" />
            )}
          </span>
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text z-40 shadow-md py-4 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-light-primary dark:hover:text-dark-primary"
            >
              {link.label}
            </Link>
          ))}

          <SocialLinks size="text-2xl" gap="gap-6" />

          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg text-center text-sm hover:brightness-110"
          >
            View Resume
          </a>

          {/* <div className="flex justify-end mt-4">
            <ThemeToggle />
          </div> */}
          <div className="text-center text-xs text-light-textMuted dark:text-dark-textMuted">
            © {new Date().getFullYear()} Arpit Sharma<br />All rights reserved.
          </div>
        </div>
      )}
    </>
  );
};

export default Header;