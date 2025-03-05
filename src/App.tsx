import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header.tsx";
import Home from "./components/pages/Home.tsx";
import Skills from "./components/pages/Skills.tsx";
import Projects from "./components/pages/Projects.tsx";
import Education from "./components/pages/Education.tsx";
import Experience from "./components/pages/Experience.tsx";
import Certifications from "./components/pages/Certifications.tsx";
import Contact from "./components/pages/Contact.tsx";

const BASE_URL = "https://arpitsharma2010.github.io/portfolio/";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar - Fixed Header */}
        <Header url={BASE_URL}/>

        {/* Main Content Area */}
        <div className="content-container">
        <main className="page-content">
            <Routes>
              <Route path="/portfolio" element={<Home url={BASE_URL}/>} />
              <Route path="/skills" element={<Skills url={BASE_URL}/>} />
              <Route path="/projects" element={<Projects url={BASE_URL}/>} />
              <Route path="/education" element={<Education url={BASE_URL}/>} />
              <Route path="/experience" element={<Experience url={BASE_URL}/>} />
              <Route path="/certifications" element={<Certifications url={BASE_URL}/>} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
        </main>
        </div>
      </div>
    </Router>
  );
};

export default App;