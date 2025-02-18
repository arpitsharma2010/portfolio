import React from "react";
import TechnicalSkillCard from "../utils/TechnicalSkillCard.tsx"; 
import SoftSkillCard from "../utils/SoftSkillCard.tsx"; 
import "./../../styles/Skills.css";

const Skills: React.FC = () => {
  const technicalSkills = [
    { name: "JavaScript", img: "./../../../Javascript.png", description: "A versatile scripting language mainly for web development." },
    { name: "TypeScript", img: "./../../../developer_image.jpg", description: "A strongly typed superset of JavaScript." },
    { name: "React", img: "./../../../developer_image.jpg", description: "A JavaScript library for building user interfaces." },
    { name: "Node.js", img: "./../../../developer_image.jpg", description: "A JavaScript runtime built on Chrome's V8 engine." },
    { name: "Python", img: "./../../../developer_image.jpg", description: "A powerful and easy-to-learn programming language." },
    { name: "MongoDB", img: "./../../../developer_image.jpg", description: "A NoSQL database for flexible and scalable data storage." },
    { name: "SQL", img: "./../../../developer_image.jpg", description: "A language used to manage and query structured databases." },
    { name: "AWS", img: "./../../../developer_image.jpg", description: "A cloud computing platform offering various services." },
    { name: "Docker", img: "./../../../developer_image.jpg", description: "A containerization platform for running applications in isolated environments." },
    { name: "Git & DevOps", img: "./../../../developer_image.jpg", description: "Tools and practices for efficient development and deployment." }
  ];

  const softSkills = [
    { name: "Effective Communication", icon: "🗣️" },
    { name: "Problem-Solving & Critical Thinking", icon: "🧩" },
    { name: "Leadership & Team Collaboration", icon: "👥" },
    { name: "Time Management & Adaptability", icon: "⌛" },
    { name: "Creative Thinking & Innovation", icon: "💡" },
  ];

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
        <h3 className="text-2xl font-semibold mb-4">🧠 Soft Skills</h3>
        <div className="soft-skills-grid">
          {softSkills.map((skill, index) => (
            <SoftSkillCard key={index} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;