import React from "react";

interface ExperienceProps {
  url: string;
}

const Experience: React.FC<ExperienceProps> = ({ url }) => {
  const allExperience = [
    {
      company: "Tata Consultancy Services (TCS)",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Systems Engineer - Software Developer",
      duration: "Nov 2020 – Jul 2024",
      description: [
        "Collaborated with a Norwegian bank to enhance pension services, increasing user engagement by 30%.",
        "Built and optimized .NET Core microservices with Onion Architecture and AWS Lambda.",
        "Migrated CI/CD pipelines from Jenkins to GitLab, deployed infra using Terraform.",
        "Worked in Agile; managed sprints with JIRA and Confluence.",
        "Awarded 'Digital Cadre' status (top 5% of new hires globally)."
      ],
      techStack: ["C#", ".NET Core", "AWS Lambda", "Terraform", "GitLab CI/CD"],
    },
    {
      company: "Obdurate Technology",
      logo: `${url}Experience/Obdurate.png`,
      website: "https://www.obdurate.in/",
      position: "Software Engineer Intern",
      duration: "Jun 2019 – Aug 2019",
      description: [
        "Developed Python scripts for sensor interfacing and data preprocessing.",
        "Reduced CPU load by 20%, improving system responsiveness.",
      ],
      techStack: ["Python", "Raspberry Pi", "Sensor Interfacing"],
    },
  ];

  return (
    <section className="w-full px-4 py-16 bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white min-h-screen transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-600 dark:text-cyan-400">Work Experience</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {allExperience.map((job, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-between h-full rounded-xl bg-gray-100 dark:bg-[#1e293b] border border-cyan-500/10 p-6 hover:border-cyan-400/30 transition-all shadow-md"
          >
            {/* Duration Ribbon */}
            <div className="absolute -top-4 left-4 bg-cyan-600 text-xs px-3 py-1 rounded-full shadow text-white">
              {job.duration}
            </div>

            {/* Company Info */}
            <div className="flex flex-col items-center text-center mb-4">
              <a href={job.website} target="_blank" rel="noopener noreferrer">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-14 h-14 rounded-full object-contain border border-cyan-500 shadow-sm mb-3"
                />
              </a>
              <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-300">{job.position}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
            </div>

            {/* Description */}
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-6 px-2">
              {job.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-cyan-500/20">
              {job.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="bg-cyan-700/20 text-cyan-700 dark:text-cyan-300 text-xs px-2 py-1 rounded-full font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;