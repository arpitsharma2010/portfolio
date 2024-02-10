import React, { useState } from "react";
import "./App.css";
import Header from "./Component/Header/Header.jsx";
import Footer from "./Component/Footer/Footer.jsx";

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevState) => {
      return !prevState;
    });
    document.body.classList.toggle("dark-mode", isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;
