import { useCallback, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme";

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const usePreferredTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [transitionOrigin, setTransitionOrigin] = useState<{ x: number; y: number } | null>(null);
  const [isUserChoice, setIsUserChoice] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isUserChoice) {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [theme, isUserChoice]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      if (isUserChoice) return;
      setTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [isUserChoice]);

  const toggleTheme = useCallback((origin?: { x: number; y: number }) => {
    if (origin) {
      setTransitionOrigin(origin);
    }
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setIsUserChoice(true);

    if (origin) {
      setTimeout(() => setTransitionOrigin(null), 800);
    }
  }, []);

  const resetToSystem = useCallback(() => {
    if (typeof window === "undefined") return;
    setIsUserChoice(false);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  return { theme, setTheme, toggleTheme, resetToSystem, transitionOrigin };
};

export default usePreferredTheme;
