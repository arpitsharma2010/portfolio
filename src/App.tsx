import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout.tsx";
import Home from "./components/pages/Home.tsx";
import Skills from "./components/pages/Skills.tsx";
import Projects from "./components/pages/Projects.tsx";
import Education from "./components/pages/Education.tsx";
import Experience from "./components/pages/Experience.tsx";
import Certifications from "./components/pages/Certifications.tsx";
import Contact from "./components/pages/Contact.tsx";

const BASE_URL = "https://arpitsharma2010.github.io/portfolio/";

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme}>
      <Router>
        <MainLayout url={BASE_URL} setTheme={setTheme}>
          <Routes>
            <Route path="/portfolio/" element={<Home url={BASE_URL} />} />
            <Route path="/portfolio/skills/" element={<Skills url={BASE_URL} />} />
            <Route path="/portfolio/projects/" element={<Projects url={BASE_URL} />} />
            <Route path="/portfolio/education/" element={<Education url={BASE_URL} />} />
            <Route path="/portfolio/experience/" element={<Experience url={BASE_URL} />} />
            <Route path="/portfolio/certifications/" element={<Certifications url={BASE_URL} />} />
            <Route path="/portfolio/contact/" element={<Contact />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
};

export default App;