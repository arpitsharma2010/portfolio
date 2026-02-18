import React from "react";
import Header from "./components/header/Header.tsx";

interface LayoutProps {
  children: React.ReactNode;
  url: string;
  theme: string;
  onThemeToggle: (origin?: { x: number; y: number }) => void;
  transitionOrigin?: { x: number; y: number } | null;
}

const MainLayout: React.FC<LayoutProps> = ({ children, url, theme, onThemeToggle, transitionOrigin }) => {
  const isLight = theme === "light";
  const backdropStyle = {
    backgroundImage: isLight
      ? "radial-gradient(circle at 18% 20%, rgba(0,91,187,0.25), transparent 55%), radial-gradient(circle at 78% 0%, rgba(20,193,165,0.2), transparent 45%), radial-gradient(circle at 55% 90%, rgba(249,115,22,0.2), transparent 40%)"
      : "radial-gradient(circle at 15% 20%, rgba(0,91,187,0.22), transparent 50%), radial-gradient(circle at 80% 0%, rgba(20,193,165,0.22), transparent 40%), radial-gradient(circle at 45% 90%, rgba(249,115,22,0.15), transparent 40%)",
  };

  const glowTopStyle = {
    backgroundColor: isLight ? "rgba(79,147,255,0.25)" : "rgba(0,91,187,0.25)",
  };
  const glowLeftStyle = {
    backgroundColor: isLight ? "rgba(20,193,165,0.2)" : "rgba(20,193,165,0.2)",
  };
  const glowRightStyle = {
    backgroundColor: isLight ? "rgba(249,115,22,0.2)" : "rgba(249,115,22,0.15)",
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden antialiased ${
        isLight ? "bg-slate-50 text-slate-900 theme-light" : "bg-void text-slate-100 theme-dark"
      } theme-transition ${transitionOrigin ? "theme-transition-active" : ""}`}
      style={
        transitionOrigin
          ? ({
              "--transition-origin-x": `${transitionOrigin.x}px`,
              "--transition-origin-y": `${transitionOrigin.y}px`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* orbital backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={backdropStyle}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[200px]"
        style={glowTopStyle}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/3 left-10 h-72 w-72 rounded-full blur-[150px] animate-blob"
        style={glowLeftStyle}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full blur-[200px] animation-delay-2000 animate-blob"
        style={glowRightStyle}
        aria-hidden
      />
      <div className="scanline-overlay" aria-hidden />

      <Header url={url} theme={theme} onThemeToggle={onThemeToggle} />

      <div className="relative z-10 flex min-h-screen flex-col pt-[5.5rem] lg:pt-0 lg:pl-[19rem]">
        <main className="w-full flex-1 px-3 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
