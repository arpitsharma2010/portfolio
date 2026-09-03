import React from "react";
import Header from "./components/header/Header.tsx";

interface LayoutProps {
  children: React.ReactNode;
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
  transitionOrigin?: { x: number; y: number } | null;
}

const MainLayout: React.FC<LayoutProps> = ({
  children,
  theme,
  onThemeToggle,
  transitionOrigin,
}) => (
  <div
    className={`relative min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-[#0b1120] dark:text-slate-100 theme-transition ${
      theme === "light" ? "theme-light" : "theme-dark"
    } ${transitionOrigin ? "theme-transition-active" : ""}`}
    style={
      transitionOrigin
        ? ({
            "--transition-origin-x": `${transitionOrigin.x}px`,
            "--transition-origin-y": `${transitionOrigin.y}px`,
          } as React.CSSProperties)
        : undefined
    }
  >
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>

    <Header theme={theme} onThemeToggle={onThemeToggle} />

    <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-24 pt-10 sm:px-8 lg:pt-16">
      {children}
    </main>
  </div>
);

export default MainLayout;
