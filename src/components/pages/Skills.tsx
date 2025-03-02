import React from "react";
import TechnicalSkillCard from "../utils/TechnicalSkillCard.tsx"; 
import SoftSkillCard from "../utils/SoftSkillCard.tsx"; 
import "./../../styles/Skills.css";

const Skills: React.FC = (props) => {
  const technicalSkills = [
    { name: "Java", img: `${props.url}Skills/Java.png`, description: "A versatile scripting language mainly for web development." },
    { name: "Python", img: `${props.url}Skills/Python.png`, description: "A strongly typed superset of JavaScript." },
    { name: "C#", img: `${props.url}Skills/CSharp.png`, description: "A JavaScript library for building user interfaces." },
    { name: "SQL", img: `${props.url}Skills/SQL.png`, description: "A JavaScript runtime built on Chrome's V8 engine." },
    { name: "NoSQL", img: `${props.url}Skills/NoSQL.png`, description: "A powerful and easy-to-learn programming language." },
    { name: "Javascript", img: `${props.url}Skills/Javascript.png`, description: "A NoSQL database for flexible and scalable data storage." },
    { name: "Spring Boot", img: `${props.url}Skills/SpringBoot.png`, description: "A language used to manage and query structured databases." },
    { name: ".NET Core", img: `${props.url}Skills/DotnetCore.png`, description: "A cloud computing platform offering various services." },
    { name: "ReactJS", img: `${props.url}Skills/ReactJS.png`, description: "A containerization platform for running applications in isolated environments." },
    { name: "Git", img: `${props.url}Skills/Git.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "GitLab", img: `${props.url}Skills/GitLab.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Bitbucket", img: `${props.url}Skills/Bitbucket.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Jenkins", img: `${props.url}Skills/Jenkins.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "JIRA", img: `${props.url}Skills/JIRA.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Confluence", img: `${props.url}Skills/Confluence.jpg`, description: "Tools and practices for efficient development and deployment." },
    { name: "AWS", img: `${props.url}Skills/AWS.png`, description: "Tools and practices for efficient development and deployment." },
    { name: "Terraform", img: `${props.url}Skills/Terraform.png`, description: "Tools and practices for efficient development and deployment." },
  ];

  const softSkills = [
    { name: "Effective Communication", icon: "🗣️" },
    { name: "Problem-Solving & Critical Thinking", icon: "🧩" },
    { name: "Leadership & Team Collaboration", icon: "👥" },
    { name: "Time Management & Adaptability", icon: "⌛" },
    { name: "Creative Thinking & Innovation", icon: "💡" },
  ];

  const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="page-content">
      <h2 className="text-4xl font-bold mb-6">My Skills</h2>

      {/* Technical Skills */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>

        {/* Skills Grid */}
        <div className="technical-skills-container">
          {technicalSkills.map((skill, index) => (
            <TechnicalSkillCard key={index} name={skill.name} img={skill.img} description={skill.description} />
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Soft Skills</h3>
        <div className="soft-skills-grid">
          {softSkills.map((skill, index) => (
            <SoftSkillCard key={index} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
      <div className="cta-buttons">
        <a href={resumePDF} className="resume-btn" target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      </div>
    </section>
  );
};

export default Skills;