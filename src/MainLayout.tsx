import React from "react";
import Header from "./components/header/Header.tsx";

interface LayoutProps {
  children: React.ReactNode;
  url: string;
  theme: string;
  onThemeToggle: () => void;
}

const MainLayout: React.FC<LayoutProps> = ({ children, url, theme, onThemeToggle }) => {

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-light-surface text-light-text dark:bg-dark-surface dark:text-dark-text lg:flex-row">
      {/* background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-40" aria-hidden />
      <div className="pointer-events-none absolute -top-32 -right-16 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl animate-blob" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -left-10 h-[28rem] w-[28rem] rounded-full bg-indigo-700/10 blur-[140px] animate-blob animation-delay-2000" aria-hidden />

      <Header url={url} theme={theme} onThemeToggle={onThemeToggle} />

      <div className="relative z-10 flex w-full flex-col flex-grow overflow-x-hidden lg:ml-[280px] transition-colors duration-300">
        <main className="w-full flex-grow px-4 pb-16 pt-24 sm:px-6 lg:px-10 lg:pt-12 lg:pb-20">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
