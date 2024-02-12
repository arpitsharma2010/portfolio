import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header/Header.jsx";
import Footer from "./Component/Footer/Footer.jsx";
import Home from "./Component/Home/Home.jsx";
import Contact from "./Component/Contact/Contact.jsx";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => {
      return !prevState;
    });
    document.body.classList.toggle("dark-mode", isDarkMode);
  };

  return (
    <>
      <BrowserRouter>
        <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
          <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer isDarkMode={isDarkMode} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
