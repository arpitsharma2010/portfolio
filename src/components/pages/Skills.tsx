import React from "react";
import TechnicalSkillCard from "../utils/TechnicalSkillCard.tsx";
import SoftSkillCard from "../utils/SoftSkillCard.tsx";

interface SkillsProps {
  url: string;
}

const Skills: React.FC<SkillsProps> = ({ url }) => {
  const technicalSkills = [
    { name: "Java", img: `${url}Skills/Java.png`, description: "A high-level, object-oriented programming language used for building platform-independent applications." },
    { name: "Python", img: `${url}Skills/Python.png`, description: "A versatile, high-level programming language known for its readability and wide range of applications in data science, web development, and automation." },
    { name: "C#", img: `${url}Skills/CSharp.png`, description: "A modern, object-oriented programming language developed by Microsoft for building a wide range of applications on the .NET platform." },
    { name: "SQL", img: `${url}Skills/SQL.png`, description: "A standard language used to manage and query relational databases." },
    { name: "NoSQL", img: `${url}Skills/NoSQL.png`, description: "A category of non-relational databases designed for scalable and flexible data storage, ideal for large-scale applications." },
    { name: "Javascript", img: `${url}Skills/Javascript.png`, description: "A dynamic programming language primarily used for creating interactive effects within web browsers." },
    { name: "Spring Boot", img: `${url}Skills/SpringBoot.png`, description: "A framework for building production-ready Java applications with minimal configuration." },
    { name: ".NET Core", img: `${url}Skills/DotnetCore.png`, description: "A cross-platform, open-source framework by Microsoft for building modern, cloud-based, and internet-connected applications." },
    { name: "ReactJS", img: `${url}Skills/ReactJS.png`, description: "A JavaScript library developed by Facebook for building fast and interactive user interfaces." },
    { name: "Git", img: `${url}Skills/Git.png`, description: "A distributed version control system used to track changes in source code during software development." },
    { name: "GitLab", img: `${url}Skills/GitLab.png`, description: "A web-based DevOps platform providing source code management (SCM), CI/CD, and more." },
    { name: "Bitbucket", img: `${url}Skills/Bitbucket.png`, description: "A Git-based source code repository hosting service, with built-in CI/CD and Jira integration." },
    { name: "Jenkins", img: `${url}Skills/Jenkins.png`, description: "An open-source automation server used to build, test, and deploy software through continuous integration and continuous delivery (CI/CD)." },
    { name: "JIRA", img: `${url}Skills/JIRA.png`, description: "A project management tool developed by Atlassian, widely used for bug tracking, issue tracking, and agile project management." },
    { name: "Confluence", img: `${url}Skills/Confluence.jpg`, description: "A collaboration wiki tool used to help teams collaborate and share knowledge efficiently." },
    { name: "AWS", img: `${url}Skills/AWS.png`, description: "Amazon Web Services is a comprehensive cloud computing platform offering computing power, storage, and other services." },
    { name: "Terraform", img: `${url}Skills/Terraform.png`, description: "An open-source infrastructure as code tool that enables you to provision and manage cloud infrastructure with configuration files." },
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