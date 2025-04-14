import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Home: React.FC<{ url: string }> = ({ url }) => {
  const resume = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-light-surface text-light-text dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
      {/* Floating Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-700/10 to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="z-10 max-w-3xl text-left w-full">
        <p className="font-mono text-green-600 dark:text-green-400 text-lg mb-2">
          Hello world,
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-light-heading dark:text-white">
          I'm <span className="text-cyan-600 dark:text-cyan-400">Arpit Sharma</span>
        </h1>
        <h2 className="text-xl sm:text-2xl mt-2 text-gray-700 dark:text-gray-400">
          <Typewriter
            words={[
              "Full-Stack Engineer",
              "Cloud & DevOps Enthusiast",
              "AI & ML Explorer",
            ]}
            loop
            typeSpeed={80}
            deleteSpeed={40}
            delaySpeed={1200}
            cursor
            cursorStyle="|"
          />
        </h2>

        <div className="mt-6">
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition shadow-lg"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* Avatar */}
      <div className="mt-14 relative z-10">
        <div className="p-1 bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg rounded-full">
          <img
            src={`${url}/developer_image.jpg`}
            alt="Arpit"
            className="w-40 h-40 object-cover border-4 border-light-surface dark:border-[#0f172a] rounded-full"
          />
        </div>
      </div>

      {/* GitHub Contributions
      <div className="mt-20 w-full max-w-4xl z-10">
        <h3 className="text-2xl font-semibold text-center text-cyan-600 dark:text-cyan-400 mb-6">GitHub Contributions</h3>
        <div className="bg-white dark:bg-[#1e293b] rounded-lg shadow-lg p-4 overflow-x-auto">
          <img
            src={`https://ghchart.rshah.org/${"arpitsharma2010"}`}
            alt="Arpit Sharma's GitHub chart"
            className="w-full h-auto"
          />
        </div>
      </div> */}
    </section>
  );
};

export default Home;
