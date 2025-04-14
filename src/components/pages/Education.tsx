import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface EducationProps {
  url: string;
}

const Education: React.FC<EducationProps> = ({ url }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const educationData = [
    {
      institution: "University at Buffalo - SUNY",
      logo: `${url}Education/UB.jpg`,
      website: "https://engineering.buffalo.edu/computer-science-engineering.html",
      degree: "Master of Science in Computer Science and Engineering",
      year: "August 2024 - Present",
      description: [
        "Specialization in Hardware and Software Systems.",
        "Relevant Courses:",
        "• Algorithm Analysis and Design",
        "• Data Intensive Computing",
        "• Introduction to Machine Learning",
        "• Computer Security",
        "• Technological Entrepreneurship",
        "• Computer Architecture",
        "• Operating Systems",
        "• Modern Networking Concepts"
      ],
    },
    {
      institution: "Sant Gadge Baba Amravati University",
      logo: `${url}Education/SGBAU.jpg`,
      website: "https://sgbau.ac.in/departments/ComputerScience/Default.aspx",
      degree: "Bachelors of Engineering in Computer Science and Engineering",
      year: "August 2016 - June 2020",
      description: [
        "Gained foundational knowledge in Computer Science and Engineering.",
        "Participated in national-level coding competitions.",
        "Developed hands-on projects related to web development, databases, and algorithms."
      ],
    },
  ];

  return (
    <section className="w-full px-4 py-16 min-h-screen bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-600 dark:text-cyan-400">Education</h2>

      <div className="relative border-l-4 border-cyan-500/30 pl-6 space-y-10 max-w-4xl mx-auto">
        {educationData.map((edu, index) => {
          const isOpen = expanded === index;

          return (
            <div
              key={index}
              className="group transition-all duration-300 cursor-pointer rounded-xl border border-cyan-500/10 p-6 bg-gray-100 dark:bg-[#1e293b] hover:border-cyan-400/30 relative"
              onClick={() => setExpanded(isOpen ? null : index)}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-0.75rem] top-[2.25rem] w-5 h-5 rounded-full bg-cyan-500 border-4 border-white dark:border-[#0f172a] shadow-md animate-pulse" />

              {/* Row Layout */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Year */}
                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono min-w-[160px] text-center md:text-left">
                  {edu.year}
                </span>

                {/* Logo */}
                <a href={edu.website} target="_blank" rel="noopener noreferrer" className="shrink-0 mx-auto md:mx-0">
                  <img
                    src={edu.logo}
                    alt={edu.institution}
                    className="w-14 h-14 rounded-full object-cover border border-cyan-500 shadow-md"
                  />
                </a>

                {/* Institution Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">{edu.institution}</h3>
                  <p className="text-gray-600 dark:text-gray-400 italic text-sm">{edu.degree}</p>

                  {isOpen ? (
                    <ul className="mt-3 list-disc pl-5 text-gray-800 dark:text-gray-300 space-y-1 text-sm text-left">
                      {edu.description.map((point, i) => (
                        <li key={i} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">Click to view details</p>
                  )}
                </div>

                {/* Chevron Icon */}
                <div className="flex items-center">
                  <FaChevronDown
                    className={`text-cyan-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;