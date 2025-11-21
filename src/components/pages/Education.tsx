import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface EducationProps {
  url: string;
}

type EducationItem = {
  institution: string;
  logo: string;
  website: string;
  degree: string;
  year: string;
  summary: string;
  highlights: string[];
  courses?: string[];
};

const Education: React.FC<EducationProps> = ({ url }) => {
  const [expanded, setExpanded] = useState<number | null>(0);

  const educationData: EducationItem[] = [
    {
      institution: "University at Buffalo – SUNY",
      logo: `${url}Education/UB.jpg`,
      website: "https://engineering.buffalo.edu/computer-science-engineering.html",
      degree: "M.S. Computer Science & Engineering (GPA: 3.71 / 4)",
      year: "Aug 2024 – Dec 2025",
      summary:
        "Graduate study focused on computer science and engineering with hands-on work in machine learning pipelines, FPGA design, and production-grade software delivery—matching the research projects outlined in my resume.",
      highlights: [
        "Translating research into practice via the custom 16-bit single-cycle RISC processor built on Basys3 FPGA.",
        "Bringing industry experience into coursework by documenting ML experiments similar to crop-yield prediction efforts.",
      ],
      courses: [
        "Algorithm Analysis and Design",
        "Data Intensive Computing",
        "Introduction to Machine Learning",
        "Computer Security",
        "Technological Entrepreneurship",
        "Computer Architecture",
        "Operating Systems",
        "Modern Networking Concepts",
      ],
    },
    {
      institution: "Sant Gadge Baba Amravati University",
      logo: `${url}Education/SGBAU.jpg`,
      website: "https://sgbau.ac.in/departments/ComputerScience/Default.aspx",
      degree: "B.E. Computer Science & Engineering (GPA: 8.67 / 10)",
      year: "Jul 2016 – Oct 2020",
      summary:
        "Undergraduate engineering program that grounded me in algorithms, databases, and end-to-end project delivery—skills later applied to fintech, healthcare, and agri-tech initiatives.",
      highlights: [
        "Completed capstone and lab work that informed the hospital management system and IoT automation projects in my resume.",
        "Maintained an 8.67/10 GPA while contributing to team projects and coding assignments across the curriculum.",
      ],
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
      ],
    },
  ];

  return (
    <section className="w-full px-4 py-16 sm:px-6 text-gray-900 transition-colors duration-300 dark:text-white">
      <h2 className="mb-6 text-center text-4xl font-extrabold text-cyan-300">Education</h2>
      <p className="mx-auto max-w-3xl text-center text-sm text-slate-300">
        An academic journey shaped by curiosity and industry-ready rigor—pairing research-driven
        graduate work with foundational engineering practice.
      </p>

      <div className="relative mx-auto mt-12 max-w-5xl space-y-10">
        <div
          className="pointer-events-none absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/60 to-transparent md:block"
          aria-hidden
        />

        {educationData.map((edu, index) => {
          const isOpen = expanded === index;

          return (
            <article
              key={edu.institution}
              className="relative rounded-3xl border border-white/5 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-md transition hover:border-cyan-400/40"
            >
              <div
                className="absolute left-3 top-12 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-[#020817] bg-cyan-400 shadow-lg md:block"
                aria-hidden
              />

              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <a href={edu.website} target="_blank" rel="noopener noreferrer">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="h-20 w-20 rounded-2xl border border-white/10 object-cover shadow-lg"
                      loading="lazy"
                    />
                  </a>
                  <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cyan-200">{edu.year}</p>
                </div>

                <div className="flex-1 text-left">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                      <p className="text-sm text-slate-300">{edu.degree}</p>
                    </div>
                    <button
                      onClick={() => setExpanded(isOpen ? null : index)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200 transition hover:border-cyan-400/40"
                      aria-expanded={isOpen}
                    >
                      {isOpen ? "Hide details" : "Program insights"}
                      <FaChevronDown
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-slate-200">{edu.summary}</p>

                  <ul className="mt-4 grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                    {edu.highlights.map((point) => (
                      <li
                        key={point}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-4 grid transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {edu.courses && edu.courses.length > 0 && (
                        <>
                          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                            Core coursework
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {edu.courses.map((course) => (
                              <span
                                key={course}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-100"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Education;
