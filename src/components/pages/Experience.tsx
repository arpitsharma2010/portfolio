import React, { useState } from "react";
import "./../../styles/Experience.css";

const Experience: React.FC = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const allExperience = [
    {
      company: "Tata Consultancy Services(TCS)",
      logo: "./../../../Experience/TCS.png",
      position: "Systems Engineer - Software Developer",
      duration: "April 2021 - July 2024",
      description: [
        "Developed and optimized high-performance web applications using React and TypeScript.",
        "Implemented scalable APIs and microservices architecture in Node.js.",
        "Led a team of developers to improve UI/UX and performance of enterprise applications.",
      ],
      techStack: ["React", "Node.js", "TypeScript", "GraphQL", "Docker"],
    },
    {
      company: "Startup XYZ",
      logo: "/experience/startup.png",
      position: "Full-Stack Developer",
      duration: "2020 - 2021",
      description: [
        "Designed and developed a full-stack e-commerce platform.",
        "Implemented authentication, payment integration, and RESTful APIs.",
        "Deployed and maintained cloud infrastructure using AWS services.",
      ],
      techStack: ["React", "Node.js", "MongoDB", "AWS", "Stripe"],
    },
    {
      company: "Microsoft",
      logo: "/experience/microsoft.png",
      position: "Frontend Developer Intern",
      duration: "2021 - 2022",
      description: [
        "Built and enhanced UI components using React and Tailwind CSS.",
        "Optimized front-end performance and accessibility for enterprise applications.",
        "Collaborated with designers and backend engineers to create seamless user experiences.",
      ],
      techStack: ["React", "Redux", "JavaScript", "Tailwind CSS"],
    },
    {
      company: "ABC Tech",
      logo: "/experience/abctech.png",
      position: "Machine Learning Intern",
      duration: "2020",
      description: [
        "Developed a machine learning model to predict user behavior based on large datasets.",
        "Implemented NLP-based chatbot for customer support automation.",
        "Researched and optimized deep learning models for text classification.",
      ],
      techStack: ["Python", "TensorFlow", "Scikit-Learn", "Flask"],
    },
  ];

  return (
    <section className="page-content">
      <h2 className="text-4xl font-bold text-center">Work Experience</h2>

      <div className="experience-timeline">
        {allExperience.map((job, index) => (
          <div key={index} className="timeline-item">
            {/* Left - Company Info */}
            <div className="timeline-left">
              <img src={job.logo} alt={job.company} className="timeline-logo" />
              <div className="timeline-info">
                <h3 className="timeline-position">{job.position}</h3>
                <p className="timeline-company">{job.company}</p>
                <p className="timeline-duration">{job.duration}</p>
              </div>
            </div>

            {/* Middle - Timeline Line */}
            <div className="timeline-line">
              <span className="timeline-dot"></span>
            </div>

            {/* Right - Expandable Details */}
            <div className={`timeline-details ${expandedJob === index ? "expanded" : ""}`}
                 onClick={() => setExpandedJob(expandedJob === index ? null : index)}>
              {expandedJob === index ? (
                <>
                  <ul className="timeline-description">
                    {job.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  <p className="timeline-tech-stack">
                    <strong>Tech Stack:</strong> {job.techStack.join(", ")}
                  </p>
                </>
              ) : (
                <p className="click-to-expand">Click to see more...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;