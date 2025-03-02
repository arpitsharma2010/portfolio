import React, { useState } from "react";
import "./../../styles/Education.css";

const Education: React.FC = (props) => {
    const [expanded, setExpanded] = useState<number | null>(null);

    const educationData = [
        {
            institution: "University at Buffalo - SUNY",
            logo: `${props.url}Education/UB.jpg`,
            website: "https://engineering.buffalo.edu/computer-science-engineering.html",
            degree: "Master of Science in Computer Science and Engineering",
            year: "August 2024 - Present",
            description: [
                "Specialization in Hardware and Software Systems.",
                "Relevant Courses:",
                "• Algorithm Analysis and Design",
                "• Data Intensive Computing",
                "• Introduction to Machine Learning",
                "• Computer Security",
                "• Technological Entrepreneurship",
                "• Computer Architecture",
                "• Operating Systems",
                "• Modern Networking Concepts"
            ],
        },
        {
            institution: "Sant Gadge Baba Amravati University",
            logo: `${props.url}Education/SGBAU.jpg`,
            website: "https://sgbau.ac.in/departments/ComputerScience/Default.aspx",
            degree: "Bachelors of Engineering in Computer Science and Engineering",
            year: "August 2016 - June 2020",
            description: [
                "Gained foundational knowledge in Computer Science and Engineering.",
                "Participated in national-level coding competitions.",
                "Developed hands-on projects related to web development, databases, and algorithms."
            ],
        },
    ];

    const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

    return (
        <section className="page-content">
            {/* Section Title */}
            <h2 className="text-4xl font-bold text-center">Education</h2>

            {/* Timeline Container */}
            <div className="education-timeline">
                {educationData.map((edu, index) => (
                    <div key={index} className="timeline-item">
                        {/* Left Side - Year & Institution Logo */}
                        <div className="timeline-left">
                            <span className="timeline-year">{edu.year}</span>
                            <a href={edu.website} target="_blank" rel="noopener noreferrer">
                                <img src={edu.logo} alt={edu.institution} className="timeline-logo" />
                            </a>
                        </div>

                        {/* Middle - Line */}
                        <div className="timeline-line">
                            <span className="timeline-dot"></span>
                        </div>

                        {/* Right Side - Degree & Description */}
                        <div className={`timeline-right ${expanded === index ? "expanded" : ""}`} onClick={() => setExpanded(expanded === index ? null : index)}>
                            <h3 className="timeline-title">{edu.institution}</h3>
                            <p className="timeline-degree">{edu.degree}</p>
                            {expanded === index && (
                                <ul className="timeline-description">
                                    {edu.description.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
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

export default Education;