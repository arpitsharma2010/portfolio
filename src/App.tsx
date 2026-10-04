import React, { useCallback, useEffect, useState } from "react";
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
import { readSoundPreference } from "./utils/rewardSound.ts";
import EndEncounter from "./components/end/EndEncounter.tsx";
import { usePortalProgress } from "./components/end/portalProgress.ts";
import type { ExplorationState } from "./components/header/useExplorationReward.ts";

const initialExploration: ExplorationState = {
  completedSections: [],
  explorationXP: 0,
  portalCrystalCount: 0,
};

const App: React.FC = () => {
  const { theme, toggleTheme, transitionOrigin, skyTransition } = usePreferredTheme();
  const [exploration, setExploration] = useState<ExplorationState>(initialExploration);
  const [soundEnabled, setSoundEnabled] = useState(readSoundPreference);
  const portal = usePortalProgress(exploration.portalCrystalCount);

  const handleExplorationChange = useCallback((next: ExplorationState) => {
    setExploration((current) => current.completedSections.length === next.completedSections.length ? current : next);
  }, []);

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
        soundEnabled={soundEnabled}
        onSoundEnabledChange={setSoundEnabled}
        onExplorationChange={handleExplorationChange}
        portalCrystalCount={portal.inventoryCount}
        portalState={portal.portalState}
        onPortalActivate={portal.activatePortal}
      >
      <div className="world-sections">
        <section id="home">
          <Home skyTransition={skyTransition} />
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
        <EndEncounter
          portalState={portal.portalState}
          filledSockets={portal.filledSockets}
          entryRequest={portal.entryRequest}
          soundEnabled={soundEnabled}
        />
      </div>
      </MainLayout>
    </>
  );
};

export default App;
