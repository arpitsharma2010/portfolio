import React from "react";
import Header from "./components/header/Header.tsx";

const App: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar Header */}
      <Header />

      {/* Main Content */}
      <main className="ml-64 p-8 w-full">
        <section id="home" className="h-screen flex justify-center items-center bg-gray-200">
          <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        </section>

        <section id="about" className="h-screen flex justify-center items-center bg-white">
          <h2 className="text-3xl font-bold">About Me</h2>
        </section>

        <section id="skills" className="h-screen flex justify-center items-center bg-gray-100">
          <h2 className="text-3xl font-bold">Skills</h2>
        </section>

        <section id="education" className="h-screen flex justify-center items-center bg-white">
          <h2 className="text-3xl font-bold">Education</h2>
        </section>

        <section id="experience" className="h-screen flex justify-center items-center bg-gray-100">
          <h2 className="text-3xl font-bold">Experience</h2>
        </section>

        <section id="certifications" className="h-screen flex justify-center items-center bg-white">
          <h2 className="text-3xl font-bold">Certifications</h2>
        </section>

        <section id="contact" className="h-screen flex justify-center items-center bg-gray-200">
          <h2 className="text-3xl font-bold">Contact Me</h2>
        </section>
      </main>
    </div>
  );
};

export default App;