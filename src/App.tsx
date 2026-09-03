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

const App: React.FC = () => {
  const { theme, toggleTheme, transitionOrigin } = usePreferredTheme();

  useEffect(() => {
    initAnalytics();
  }, []);

  // The browser resolves a load-time #hash before React renders the sections,
  // so a shared deep link lands at the wrong offset. Re-apply it after render,
  // and again on load because webfonts and images shift the offsets.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const scrollToTarget = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });

    scrollToTarget();
    if (document.readyState === "complete") return;

    window.addEventListener("load", scrollToTarget, { once: true });
    return () => window.removeEventListener("load", scrollToTarget);
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
