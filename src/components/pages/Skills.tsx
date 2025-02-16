import React from "react";
import SkillCard from "./../utils/SkillCard.tsx"; // Import SkillCard component

const Skills: React.FC = () => {
  const technicalSkills = [
    { name: "JavaScript", img: "./../../../developer_image.jpg" },
    { name: "TypeScript", img: "./../../../developer_image.jpg" },
    { name: "React", img: "./../../../developer_image.jpg" },
    { name: "Node.js", img: "./../../../developer_image.jpg" },
    { name: "Python", img: "./../../../developer_image.jpg" },
    { name: "MongoDB", img: "./../../../developer_image.jpg" },
    { name: "SQL", img: "./../../../developer_image.jpg" },
    { name: "AWS", img: "./../../../developer_image.jpg" },
    { name: "Docker", img: "./../../../developer_image.jpg" },
    { name: "Git & DevOps", img: "./../../../developer_image.jpg" },
  ];

  const softSkills = [
    "Effective Communication",
    "Problem-Solving & Critical Thinking",
    "Leadership & Team Collaboration",
    "Time Management & Adaptability",
    "Creative Thinking & Innovation",
  ];

  return (
    <section className="page-content">
      <h2 className="text-4xl font-bold mb-6">My Skills</h2>

      {/* Technical Skills */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">Technical Skills</h3>

        {/* Skills Grid */}
        <div className="skills-grid">
  {technicalSkills.map((skill, index) => {
    // Start a new row every 3 elements
    if (index % 3 === 0) {
      return (
        <div key={index} className="skill-row">
          {technicalSkills.slice(index, index + 3).map((s, i) => (
            <div key={i} className="skill-card">
              <img src={s.img} alt={s.name} className="skill-image" />
              <p className="skill-name">{s.name}</p>
            </div>
          ))}
        </div>
      );
    }
    return null; // Prevents rendering elements multiple times
  })}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">🧠 Soft Skills</h3>
        <ul className="soft-skills-list">
          {softSkills.map((skill, index) => (
            <li key={index} className="soft-skill">{skill}</li>
          ))}
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mt-8">
        <a href="/experience" className="btn btn-primary">
          📂 Explore My Work
        </a>
      </div>
    </section>
  );
};

export default Skills;