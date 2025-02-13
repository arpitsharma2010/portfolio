import React from "react";

const Skills: React.FC = () => {
  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold">🚀 My Skills</h2>

      {/* Technical Skills */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold mb-4">💻 Technical Skills</h3>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: "JavaScript", img: "/skills/javascript.png", level: "90%" },
            { name: "TypeScript", img: "/skills/typescript.png", level: "85%" },
            { name: "React", img: "/skills/react.png", level: "85%" },
            { name: "Node.js", img: "/skills/nodejs.png", level: "80%" },
            { name: "Python", img: "/skills/python.png", level: "75%" },
            { name: "MongoDB", img: "/skills/mongodb.png", level: "85%" },
            { name: "SQL", img: "/skills/sql.png", level: "80%" },
            { name: "AWS", img: "/skills/aws.png", level: "70%" },
            { name: "Docker", img: "/skills/docker.png", level: "75%" },
            { name: "Git & DevOps", img: "/skills/git.png", level: "85%" },
          ].map((skill, index) => (
            <div key={index} className="flex flex-col items-center bg-white p-4 shadow-md rounded-lg">
              <img src={skill.img} alt={skill.name} className="w-16 h-16 mb-2" />
              <p className="font-semibold">{skill.name}</p>
              {/* Progress Bar */}
              <div className="w-full bg-gray-300 h-3 rounded-full mt-2">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: skill.level }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">🧠 Soft Skills</h3>
        <ul className="list-disc pl-5 space-y-2 text-lg">
          <li>Effective Communication</li>
          <li>Problem-Solving & Critical Thinking</li>
          <li>Leadership & Team Collaboration</li>
          <li>Time Management & Adaptability</li>
          <li>Creative Thinking & Innovation</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mt-8">
        <a
          href="/experience"
          className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          📂 Explore My Work
        </a>
      </div>

      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">More about my skills - line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default Skills;