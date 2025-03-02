import React, { useState } from "react";
import "./../../styles/Experience.css";

const Experience: React.FC = (props) => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const allExperience = [
    {
      company: "Tata Consultancy Services (TCS)",
      logo: `${props.url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Systems Engineer - Softwarre Developer",
      duration: "November 2020 - July 2024",
      description: [
        "Worked in the BFSI (Banking, Financial Services, and Insurance) team, collaborating with a Norwegian bank to enhance digital pension and investment service solutions, improving user engagement by 30% through feature upgrades.",
        "Developed and optimized microservices using .NET Core and Onion Architecture, achieving 80% error-free rate and seamless integration between AWS Lambda-based microservices.",
        "Implemented CI/CD pipelines by migrating Jenkins to GitLab and deploying infrastructure using Terraform, reducing deployment time.",
        "Worked in an Agile development environment, managing sprint workflows with JIRA & Confluence.",
        "Recognized as a 'Digital Cadre' within the first six months, ranking among the top 5% of new hires for exceptional technical proficiency in Java and innovative problem-solving."
      ],
      techStack: ["C#", ".NET Core", "AWS Lambda", "API Gateway", "Terraform", "GitLab CI/CD", "DynamoDB", "Microservices Architecture", "Agile", "JIRA", "Confluence", "Postman", "Unit Test"],
    },
    {
      company: "Obdurate Technology",
      logo: `${props.url}Experience/Obdurate.png`,
      website: "https://www.obdurate.in/",
      position: "Software Engineer Intern",
      duration: "June 2019 - August 2019",
      description: [
        "Developed and optimized Python scripts for sensor interfacing, data acquisition, and preprocessing, improving data throughput by 15%.",
        "Debugged and enhanced Python code performance, reducing CPU load by 20%, leading to increased system stability and responsiveness."
      ],
      techStack: ["Python", "RaspberryPI", "Sensor Interfacing"],
    },
  ];

  const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="page-content">
      <h2 className="text-4xl font-bold text-center">Work Experience</h2>

      <div className="experience-timeline">
        {allExperience.map((job, index) => (
          <div key={index} className="timeline-item">
            {/* Left - Company Info */}
            <div className="timeline-left">
              <a href={job.website} target="_blank" rel="noopener noreferrer">
                <img src={job.logo} alt={job.company} className="timeline-logo" />
              </a>
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
            <div
              className={`timeline-details ${expandedJob === index ? "expanded" : ""}`}
              onClick={() => setExpandedJob(expandedJob === index ? null : index)}
            >
              {expandedJob === index ? (
                <>
                  <ul className="timeline-description">
                    {job.description.map((point, i) => (
                      <li key={i} className="detail-point">{point}</li> // Ensure only one bullet per item
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
      <div className="cta-buttons">
        <a href={resumePDF} className="resume-btn" target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      </div>
    </section>
  );
};

export default Experience;