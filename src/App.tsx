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
        <section id="home" className="scroll-mt-20">
          <Home />
        </section>
        <section id="about" className="scroll-mt-20">
          <About />
        </section>
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        <section id="education" className="scroll-mt-20">
          <Education />
        </section>
        <section id="resume" className="scroll-mt-20">
          <Resume />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </div>
      </MainLayout>
    </>
  );
};

export default App;
