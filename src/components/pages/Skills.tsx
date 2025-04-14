import React from "react";
import TechnicalSkillCard from "../utils/TechnicalSkillCard.tsx";
import SoftSkillCard from "../utils/SoftSkillCard.tsx";

interface SkillsProps {
  url: string;
}

const Skills: React.FC<SkillsProps> = ({ url }) => {
  const technicalSkills = [
    { name: "Java", img: `${url}Skills/Java.png`, description: "A versatile scripting language mainly for web development." },
    { name: "Python", img: `${url}Skills/Python.png`, description: "A strongly typed superset of JavaScript." },
    { name: "C#", img: `${url}Skills/CSharp.png`, description: "A JavaScript library for building user interfaces." },
    { name: "SQL", img: `${url}Skills/SQL.png`, description: "A JavaScript runtime built on Chrome's V8 engine." },
    { name: "NoSQL", img: `${url}Skills/NoSQL.png`, description: "A powerful and easy-to-learn programming language." },
    { name: "Javascript", img: `${url}Skills/Javascript.png`, description: "A NoSQL database for flexible and scalable data storage." },
    { name: "Spring Boot", img: `${url}Skills/SpringBoot.png`, description: "A language used to manage and query structured databases." },
    { name: ".NET Core", img: `${url}Skills/DotnetCore.png`, description: "A cloud computing platform offering various services." },
    { name: "ReactJS", img: `${url}Skills/ReactJS.png`, description: "A containerization platform for running applications in isolated environments." },
    { name: "Git", img: `${url}Skills/Git.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "GitLab", img: `${url}Skills/GitLab.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Bitbucket", img: `${url}Skills/Bitbucket.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Jenkins", img: `${url}Skills/Jenkins.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "JIRA", img: `${url}Skills/JIRA.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Confluence", img: `${url}Skills/Confluence.jpg`, description: "Tools and practices for efficient development and deployment." },
    { name: "AWS", img: `${url}Skills/AWS.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Terraform", img: `${url}Skills/Terraform.png`, description: "Tools and practices for efficient development and deployment." },
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