import React from "react";
import { FiExternalLink } from "react-icons/fi";

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

  const quickStats = [
    { label: "REST APIs delivered", value: "30+" },
    { label: "CI/CD migrations", value: "10+" },
    { label: "Cloud logs monitored", value: "10K+" },
    { label: "Unit tests authored", value: "25+" },
  ];

  const allExperience: Job[] = [
    {
      company: "Tata Consultancy Services (Client: DNB, Norway)",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Senior Software Developer",
      duration: "Sep 2023 – Jul 2024",
      location: "Pune, India",
      highlight: [
        "Mapped SBanken legacy modules for DNB merger",
        "Oversaw GitLab CI/CD + Terraform production releases",
      ],
      description: [
        "Led the functional analysis of SBanken’s savings and investment systems during its integration into DNB, reverse-engineering undocumented modules and preparing detailed onboarding documentation for developers and testers.",
        "Reviewed and merged pull requests across 10+ repositories each sprint, coaching peers on modular design and ensuring every service adhered to DNB’s secure coding guidelines.",
        "Directed production deployments via GitLab CI/CD and Terraform, sequencing controlled rollouts and documenting recovery paths to keep financial workloads compliant.",
      ],
      techStack: [
        "C#",
        ".NET Core",
        "GitLab CI/CD",
        "Terraform",
        "AWS",
        "Entity Framework",
        "Confluence",
        "Jira",
      ],
    },
    {
      company: "Tata Consultancy Services (Client: DNB, Norway)",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Software Developer",
      duration: "Apr 2021 – Aug 2023",
      location: "Pune, India",
      highlight: [
        "Built 30+ C# .NET Core REST APIs",
        "Migrated 10+ repos from Jenkins to GitLab",
        "Maintained 85%+ SonarQube coverage",
      ],
      description: [
        "Owned C# .NET Core and Entity Framework services powering DNB’s savings and investment platforms, integrating AWS DynamoDB, API Gateway, Lambda, and internal banking partners through well-documented REST APIs.",
        "Automated deploy pipelines by moving more than ten repositories from Jenkins to GitLab CI/CD, backing infrastructure with Terraform and AWS Secrets Manager.",
        "Monitored 10,000+ CloudWatch log events, triaged runtime issues with the on-call team, and enforced 85%+ SonarQube coverage with NUnit/Moq test suites.",
        "Drove Agile ceremonies with product, QA, and operations stakeholders using Jira, Bitbucket, and Swagger/OpenAPI templates to keep releases transparent.",
      ],
      techStack: [
        "C#",
        ".NET Core",
        "Entity Framework",
        "AWS Lambda",
        "API Gateway",
        "DynamoDB",
        "GitLab CI/CD",
        "Terraform",
        "Swagger/OpenAPI",
        "CloudWatch",
        "NUnit",
        "Moq",
      ],
    },
    {
      company: "Tata Consultancy Services",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Assistant Software Developer",
      duration: "Nov 2020 – Mar 2021",
      location: "Pune, India",
      highlight: "Built hospital management MVP with secure APIs",
      description: [
        "Designed and shipped a Hospital Management System with appointments, billing, and pharmacy modules using ReactJS and Spring Boot.",
        "Implemented 10+ REST APIs with input validation and OAuth2 authentication, connected to MySQL for persistence.",
        "Authored 25+ JUnit tests covering billing and inventory logic and practiced two-week Agile sprints with Git-based workflows.",
      ],
      techStack: ["ReactJS", "Spring Boot", "MySQL", "OAuth2", "JUnit", "Git"],
    },
    {
      company: "Obdurate Technology",
      logo: `${url}Experience/Obdurate.png`,
      website: "https://www.obdurate.in/",
      position: "Software Engineer Intern",
      duration: "Jun 2019 – Aug 2019",
      location: "Amravati, India",
      description: [
        "Developed Python scripts on Raspberry Pi for sensor interfacing, irrigation control, and environmental monitoring, improving automation throughput by roughly 15%.",
        "Refactored Python modules to cut latency by 20%, increasing stability of the farming IoT solution.",
        "Implemented GPIO-driven automation and gained hands-on practice connecting sensors, relays, and communication protocols in the field.",
      ],
      techStack: ["Python", "Raspberry Pi", "GPIO", "Sensors", "IoT"],
    },
  ];

  return (
    <section
      aria-labelledby="experience-heading"
      className="w-full px-4 py-16 sm:px-6 text-gray-900 dark:text-white min-h-screen transition-colors duration-300"
    >
      <h2
        id="experience-heading"
        className="text-4xl font-extrabold text-center mb-6 text-cyan-300"
      >
        Work Experience
      </h2>
      <p className="mx-auto max-w-3xl text-center text-sm text-slate-300">
        Building resilient, API-driven platforms across finance and health tech. I thrive at the
        intersection of architecture, DevOps, and human collaboration—leading delivery while keeping
        accessibility, observability, and documentation in the loop.
      </p>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 text-center text-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-sm font-semibold backdrop-blur"
          >
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-cyan-200">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
        {allExperience.map((job, index) => {
          const highlights = normalizeHighlights(job.highlight);
          return (
            <article
              key={index}
              className="relative flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-white/5 p-6 text-left shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/50 focus-within:border-cyan-400/70"
            >
              <div className="absolute -top-4 left-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg">
                {job.duration}
              </div>

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
                      className="mb-3 h-16 w-16 rounded-2xl border border-white/10 bg-white/10 object-contain shadow"
                      loading="lazy"
                    />
                  ) : (
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-cyan-600/20 text-xs text-cyan-100">
                      {job.company.split(" ")[0]}
                    </div>
                  )}
                </a>
                <h3 className="text-lg font-bold text-white">{job.position}</h3>
                <p className="text-sm text-slate-300">
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>

                {highlights.length > 0 && (
                  <ul className="mt-3 mb-2 flex flex-wrap gap-2 px-2">
                    {highlights.map((h, i) => (
                      <li
                        key={i}
                        className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-200"
                      >
                        🎖 <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ul className="mb-6 space-y-4 text-sm leading-relaxed text-slate-200 list-disc pl-5">
                {job.description.map((point, i) => (
                  <li key={i}>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-auto border-t border-white/10 pt-4">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-200 mb-2">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-cyan-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Impact-focused delivery</span>
                <a
                  href={job.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-cyan-200 transition hover:border-cyan-400/40"
                >
                  Visit <FiExternalLink />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
