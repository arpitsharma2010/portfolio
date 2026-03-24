import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./MainLayout.tsx";
import Home from "./components/pages/Home.tsx";
import Skills from "./components/pages/Skills.tsx";
import Projects from "./components/pages/Projects.tsx";
import Education from "./components/pages/Education.tsx";
import Experience from "./components/pages/Experience.tsx";
import Certifications from "./components/pages/Certifications.tsx";
import Contact from "./components/pages/Contact.tsx";
import usePreferredTheme from "./hooks/usePreferredTheme.ts";
import { initAnalytics, trackPageView } from "./utils/analytics.ts";

const BASE_URL = "https://arpitsharma2010.github.io/portfolio/";

type AnalyticsTrackerProps = {
  children: React.ReactNode;
};

const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    initAnalytics();
    trackPageView(path || "/");
  }, [location.pathname, location.search, location.hash]);

  return <>{children}</>;
};

const Divider = () => (
  <div className="w-full flex justify-center py-16 lg:py-24 opacity-60">
    <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-brand-sapphire/40 to-transparent" />
  </div>
);

const PortfolioSPA = ({ url }: { url: string }) => {
  return (
    <div className="flex flex-col w-full scroll-smooth">
      <section id="home" className="scroll-mt-24 min-h-[90vh] flex flex-col justify-center">
        <Home url={url} />
      </section>
      <Divider />
      
      <section id="skills" className="scroll-mt-24 min-h-[80vh] flex flex-col justify-center">
        <Skills url={url} />
      </section>
      <Divider />
      
      <section id="projects" className="scroll-mt-24 min-h-[80vh]">
        <Projects url={url} />
      </section>
      <Divider />
      
      <section id="education" className="scroll-mt-24 min-h-[60vh] flex flex-col justify-center">
        <Education url={url} />
      </section>
      <Divider />
      
      <section id="experience" className="scroll-mt-24 min-h-[80vh]">
        <Experience url={url} />
      </section>
      <Divider />
      
      <section id="certifications" className="scroll-mt-24 min-h-[60vh] flex flex-col justify-center">
        <Certifications url={url} />
      </section>
      <Divider />
      
      <section id="contact" className="scroll-mt-24 min-h-[70vh] flex flex-col justify-center">
        <Contact url={url} />
      </section>
    </div>
  );
};

const App: React.FC = () => {
  const { theme, toggleTheme, transitionOrigin } = usePreferredTheme();

  return (
    <div className={theme}>
      <Router>
        <AnalyticsTracker>
          <MainLayout url={BASE_URL} theme={theme} onThemeToggle={toggleTheme} transitionOrigin={transitionOrigin ?? undefined}>
            <Routes>
              <Route path="*" element={<PortfolioSPA url={BASE_URL} />} />
            </Routes>
          </MainLayout>
        </AnalyticsTracker>
      </Router>
    </div>
  );
};

export default App;
