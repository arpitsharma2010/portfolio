import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiAward, FiBookOpen } from "react-icons/fi";

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
      <h2 className="text-center text-4xl font-black text-cyan-300">Education</h2>

      <div className="relative mx-auto mt-12 max-w-5xl space-y-8">
        {educationData.map((edu, index) => {
          const isOpen = expanded === index;

          return (
            <article
              key={edu.institution}
              className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur"
            >
              <div className="grid gap-6 md:grid-cols-[180px,1fr] md:items-center">
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <a
                    href={edu.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 shadow-inner"
                  >
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
                      loading="lazy"
                    />
                  </a>
                  <p className="mt-4 text-xs uppercase tracking-[0.4em] text-cyan-200">{edu.year}</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200">
                        <FiAward aria-hidden /> Program
                      </span>
                      <h3 className="mt-3 text-2xl font-bold text-white">{edu.institution}</h3>
                      <p className="text-sm text-slate-300">{edu.degree}</p>
                    </div>
                    <button
                      onClick={() => setExpanded(isOpen ? null : index)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:border-cyan-300"
                      aria-expanded={isOpen}
                    >
                      {isOpen ? "Hide details" : "Program insights"}
                      <FaChevronDown
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  </div>

                  <p className="text-sm text-slate-200">{edu.summary}</p>

                  <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-2">
                    {edu.highlights.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                      >
                        <FiBookOpen className="mt-1 shrink-0 text-cyan-300" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {edu.courses && edu.courses.length > 0 && (
                        <>
                          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">
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
