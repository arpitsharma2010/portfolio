import React from "react";
import TechnicalSkillCard from "../utils/TechnicalSkillCard.tsx";
import SoftSkillCard from "../utils/SoftSkillCard.tsx";

interface SkillsProps {
  url: string;
}

const Skills: React.FC<SkillsProps> = ({ url }) => {
  const technicalSkills = [
  // --- Languages ---
  { name: "Java",       img: `${url}/Skills/Java.png`,                 description: "Java SE/EE" },
  { name: "Python",     img: "https://www.python.org/static/community_logos/python-logo-generic.svg", description: "General-purpose, data, automation" },
  { name: "C#",         img: `${url}/Skills/CSharp.png`,               description: ".NET development" },
  { name: "JavaScript", img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", description: "Web & Node.js" },

  // --- Data/DB (generic concepts = CDN icons) ---
  { name: "SQL",        img: "https://cdn.simpleicons.org/postgresql",           description: "Relational DB querying" },
  { name: "NoSQL",      img: "https://cdn.simpleicons.org/mongodb",              description: "Document/Key-Value stores" },

  // --- Frameworks ---
  { name: "Spring Boot", img: "https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg", description: "Java microservices" },
  { name: ".NET Core",   img: "https://raw.githubusercontent.com/dotnet/brand/main/logo/dotnet-logo.svg", description: "Cross‑platform .NET runtime" },
  { name: "ReactJS",     img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", description: "UI library" },

  // --- VCS / DevOps ---
  { name: "Git",        img: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.svg", description: "Version control" },
  { name: "GitLab",     img: "https://res.cloudinary.com/about-gitlab-com/image/upload/v1752630620/gd54rr1tngju5ftli1dx.svg", description: "SCM + CI/CD" },
  { name: "Bitbucket",  img: `${url}/Skills/Bitbucket.png`, description: "SCM" },
  { name: "Jenkins",    img: "https://get.jenkins.io/art/jenkins-logo/logo.svg", description: "CI server" },

  // --- Work mgmt (Atlassian) ---
  { name: "Jira",        img: "https://cdn.simpleicons.org/jira",                 description: "Agile project tracking" },
  { name: "Confluence",  img: "https://cdn.simpleicons.org/confluence",           description: "Team wiki/docs" },

  // --- Cloud / IaC ---
  { name: "AWS",        img: `${url}/Skills/AWS.png`,            description: "Cloud services" },
  { name: "Terraform",  img: "https://cdn.simpleicons.org/terraform",            description: "Infrastructure as Code" },
];

  const softSkills = [
    { name: "Effective Communication", icon: "🗣️" },
    { name: "Problem-Solving & Critical Thinking", icon: "🧩" },
    { name: "Leadership & Team Collaboration", icon: "👥" },
    { name: "Time Management & Adaptability", icon: "⌛" },
    { name: "Creative Thinking & Innovation", icon: "💡" },
  ];

  return (
    <section className="w-full px-6 py-16 min-h-screen transition-colors duration-300 bg-light-surface text-light-text dark:bg-[#0f172a] dark:text-white">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide text-cyan-700 dark:text-cyan-400">
        Tech Stack
      </h2>

      {/* Technical Skills */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-cyan-600 dark:text-cyan-300">
          Technical Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {technicalSkills.map((skill, index) => (
            <TechnicalSkillCard
              key={index}
              name={skill.name}
              img={skill.img}
              description={skill.description}
            />
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="max-w-5xl mx-auto mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-cyan-600 dark:text-cyan-300">
          Soft Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {softSkills.map((skill, index) => (
            <SoftSkillCard key={index} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;