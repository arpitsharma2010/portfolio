import React, { useEffect } from "react";
import MainLayout from "./MainLayout.tsx";
import Home from "./components/pages/Home.tsx";
import Experience from "./components/pages/Experience.tsx";
import Projects from "./components/pages/Projects.tsx";
import Skills from "./components/pages/Skills.tsx";
import About from "./components/pages/About.tsx";
import Education from "./components/pages/Education.tsx";
import Contact from "./components/pages/Contact.tsx";
import usePreferredTheme from "./hooks/usePreferredTheme.ts";
import { initAnalytics } from "./utils/analytics.ts";

/** Sticky header height plus the sections' scroll-margin. */
const HEADER_OFFSET = 72;

const App: React.FC = () => {
  const { theme, toggleTheme, transitionOrigin } = usePreferredTheme();

  useEffect(() => {
    initAnalytics();
  }, []);

  // A load-time #hash is resolved before React renders the sections, and the
  // global `scroll-behavior: smooth` turns the correction into an animation
  // that later layout shifts cancel. Jump explicitly with smooth scrolling
  // suspended, repeat once webfonts and images have settled the offsets, and
  // cover hash changes that do not remount the app (URL edits, back/forward).
  useEffect(() => {
    const jumpToHash = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (!target) return;
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET);
      root.style.scrollBehavior = previousBehavior;
    };

    const frame = requestAnimationFrame(jumpToHash);
    window.addEventListener("load", jumpToHash);
    window.addEventListener("hashchange", jumpToHash);
    void document.fonts?.ready.then(jumpToHash);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", jumpToHash);
      window.removeEventListener("hashchange", jumpToHash);
    };
  }, []);

  return (
    <MainLayout
      theme={theme}
      onThemeToggle={toggleTheme}
      transitionOrigin={transitionOrigin ?? undefined}
    >
      <div className="flex flex-col gap-20 sm:gap-28">
        <section id="home" className="scroll-mt-20">
          <Home />
        </section>
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
        <section id="about" className="scroll-mt-20">
          <About />
        </section>
        <section id="education" className="scroll-mt-20">
          <Education />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </div>
    </MainLayout>
  );
};

export default App;
