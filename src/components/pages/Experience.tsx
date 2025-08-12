import React from "react";

interface ExperienceProps {
  url: string;
  showLogos?: boolean;
}

type Job = {
  company: string;
  logo: string;
  website: string;
  position: string;
  duration: string;
  location?: string;
  description: string[];
  techStack: string[];
  // can be single string or string[] from data; we'll normalize to string[]
  highlight?: string | string[];
};

const Experience: React.FC<ExperienceProps> = ({ url, showLogos = true }) => {
  const normalizeHighlights = (h?: string | string[]) =>
    !h ? [] : Array.isArray(h) ? h : [h];

    const allExperience = [
    {
      company: "Tata Consultancy Services (TCS)",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Systems Engineer - Software Developer",
      duration: "Nov 2020 – Jul 2024",
      highlight: [
        "🏅 Digital Cadre (Top 5% of new hires)",
        "🏆 Client appreciation: delivered a new Pricing System ahead of schedule",
        "🏆 Client appreciation: led code merge from other banks into DNB's ecosystem"
      ],
      description: [
        "Enhanced digital pension & investment platforms for Norway’s largest bank (DNB), driving +30% user engagement through targeted feature rollouts.",
        "Built & maintained REST APIs in .NET Core/Entity Framework with Onion Architecture; integrated AWS Lambda microservices, achieving ~80% error-free deployments.",
        "Migrated Bitbucket → GitLab repos & Jenkins → GitLab CI/CD pipelines; automated infrastructure with Terraform, reducing release time by ~20%.",
        "Improved API handoffs using Swagger & Postman, cutting tester–developer turnaround times; contributed in Agile/Scrum (bi-weekly sprints) and occasionally served as Scrum Master.",
        "Jan–Jul 2024: Led integration of new bank’s code & functionality into the DNB ecosystem, ensuring security, performance, and compliance."
      ],
      techStack: ["C#", ".NET Core", "Entity Framework", "AWS Lambda", "Terraform", "GitLab CI/CD", "Swagger", "Postman"]
    },
    {
      company: "Obdurate Technology",
      logo: `${url}Experience/Obdurate.png`,
      website: "https://www.obdurate.in/",
      position: "Software Engineer Intern",
      duration: "Jun 2019 – Aug 2019",
      description: [
        "Developed 8+ Python scripts for sensor interfacing, data acquisition, and preprocessing on Raspberry Pi, improving data throughput by ~15%.",
        "Optimized Python code to reduce CPU load by ~20%, improving system stability and response times.",
        "Implemented GPIO-based automation for farming-related IoT devices, enabling real-time environmental monitoring and control.",
        "Gained hands-on experience in hardware–software integration, working directly with sensors, relays, and communication protocols."
      ],
      techStack: ["Python", "Raspberry Pi", "Sensor Interfacing", "GPIO", "IoT"]
    }
  ];

  return (
    <section
      aria-labelledby="experience-heading"
      className="w-full px-4 py-16 bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white min-h-screen transition-colors duration-300"
    >
      <h2
        id="experience-heading"
        className="text-4xl font-extrabold text-center mb-12 text-cyan-600 dark:text-cyan-400"
      >
        Work Experience
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {allExperience.map((job, index) => {
          const highlights = normalizeHighlights(job.highlight);
          return (
            <article
              key={index}
              className="relative flex h-full flex-col justify-between rounded-xl bg-gray-100 dark:bg-[#1e293b] border border-cyan-500/10 p-6 shadow-md transition-all hover:border-cyan-400/30 focus-within:border-cyan-400/40"
            >
              {/* Duration Ribbon */}
              <div className="absolute -top-4 left-4 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white shadow">
                {job.duration}
              </div>

              {/* Company / Role */}
              <div className="mb-4 flex flex-col items-center text-center">
                <a
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full"
                  aria-label={`Open ${job.company} website`}
                >
                  {showLogos ? (
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="mb-3 h-14 w-14 rounded-full border border-cyan-500 object-contain shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="mb-3 h-14 w-14 rounded-full border border-cyan-500/30 bg-cyan-600/10 flex items-center justify-center text-xs text-cyan-700 dark:text-cyan-300">
                      {job.company.split(" ")[0]}
                    </div>
                  )}
                </a>
                <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-300">{job.position}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>

                {/* Highlights (badges list) */}
                {highlights.length > 0 && (
                  <ul className="mt-3 mb-2 flex flex-wrap gap-2 pl-5">
                    {highlights.map((h, i) => (
                      <li
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300"
                      >
                        🎖 <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Description */}
              <ul className="mb-6 space-y-4 pl-5 text-sm text-gray-700 dark:text-gray-300 list-disc leading-relaxed">
                {job.description.map((point, i) => (
                  <li key={i}>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="mt-auto border-t border-cyan-500/20 pt-4">
                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-cyan-700/15 px-2 py-1 font-mono text-[11px] text-cyan-800 dark:text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={job.website}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
              >
                Visit {job.company}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;