import React, { useState } from "react";
import "./../../styles/Education.css";

const Education: React.FC = () => {
    const [expanded, setExpanded] = useState<number | null>(null);

    const educationData = [
        {
          institution: "University at Buffalo - SUNY",
          logo: "./../../../Education/UB.jpg",
          degree: "Master of Science in Computer Science and Engineering",
          year: "August 2024 - Present",
          description: "Specialization in Hardware and Software Systems.",
        },
        {
          institution: "Sant Gadge Baba Amravati University",
          logo: "./../../../Education/SGBAU.jpg",
          degree: "Bachelors of Engineering in Computer Science and Engineering",
          year: "August 2016 - June 2020",
          description: "Studied Courses like , participated in national-level coding competitions.",
        },
    ];

    return (
        <section className="page-content">
            {/* Section Title */}
            <h2 className="text-4xl font-bold text-center">Education</h2>

            {/* Timeline Container */}
            <div className="education-timeline">
                {educationData.map((edu, index) => (
                    <div key={index} className="timeline-item">
                        {/* Left Side - Year & Institution */}
                        <div className="timeline-left">
                            <span className="timeline-year">{edu.year}</span>
                            <img src={edu.logo} alt={edu.institution} className="timeline-logo" />
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
                                <p className="timeline-description">{edu.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;