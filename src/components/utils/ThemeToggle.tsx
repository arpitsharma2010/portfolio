import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme once on mount (safe for SSR/static pages)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialDark = storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
    document.documentElement.classList.toggle("light", !initialDark);
  }, []);

  // Sync theme change to document and localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(prev => !prev)}
      className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 p-2 px-4 rounded-full text-sm shadow hover:scale-105 transition"
    >
      {isDark ? (
        <>
          <FaSun className="text-yellow-400" />
          <span className="hidden sm:inline">Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon className="text-blue-600" />
          <span className="hidden sm:inline">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;