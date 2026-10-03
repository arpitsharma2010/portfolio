import React, { useEffect } from "react";
import MainLayout from "./MainLayout.tsx";
import Home from "./components/pages/Home.tsx";
import Experience from "./components/pages/Experience.tsx";
import Projects from "./components/pages/Projects.tsx";
import Skills from "./components/pages/Skills.tsx";
import About from "./components/pages/About.tsx";
import Education from "./components/pages/Education.tsx";
import Contact from "./components/pages/Contact.tsx";
import Resume from "./components/pages/Resume.tsx";
import WorldLoader from "./components/common/WorldLoader.tsx";
import usePreferredTheme from "./hooks/usePreferredTheme.ts";
import { initAnalytics } from "./utils/analytics.ts";

const App: React.FC = () => {
  const { theme, toggleTheme, transitionOrigin } = usePreferredTheme();

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <>
      <WorldLoader />
      <MainLayout
        theme={theme}
        onThemeToggle={toggleTheme}
        transitionOrigin={transitionOrigin ?? undefined}
      >
      <div className="world-sections">
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="resume">
          <Resume />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
      </MainLayout>
    </>
  );
};

export default App;
