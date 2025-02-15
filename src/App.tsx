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

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar - Fixed Header */}
        <Header />

        {/* Main Content Area */}
        <div className="content-container">
        <main className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
        </main>
        </div>
      </div>
    </Router>
  );
};

export default App;