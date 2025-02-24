import React, { useState } from "react";
import "./../../styles/Projects.css";

const Projects: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Library Management System",
      image: "/projects/library.png",
      description: "A secure and scalable library management system with role-based authentication for book management and loan tracking.",
      details: [
        "Built with React (TypeScript) and Spring Boot for a modern, scalable, and efficient user experience.",
        "Implements JWT and OAuth to ensure secure authentication and role-based access control.",
        "Admins can add, remove, update books, and respond to user queries, while users can borrow and return books in real-time.",
        "Users can extend the borrowing period, rate books, ask questions to the admin, and request new books for the library.",
        "Optimized SQL database enables fast queries, efficient data storage, and reliable performance."
      ],
      techStack: ["React", "Spring Boot", "Java", "SQL", "OAuth", "JWT"],
      githubLink: "https://github.com/arpitsharma2010/react-library-project",
    },
    {
      title: "Crop Yield Prediction Using Machine Learning",
      image: "/projects/chatbot.png",
      description: "Developed a machine learning model for crop yield prediction using Random Forest, achieving 89% accuracy, and deployed it via a Flask web service for real-world applications.",
      details: [
        "Executed a machine learning model with 89% prediction accuracy for crop yield prediction in tons per hectare using Random Forest.",
        "Integrated the model with a Flask web service to provide real-time yield predictions.",
        "Utilized 9 different parameters, including soil conditions, weather data, and crop type, for accurate forecasting.",
        "Applications include enhancing food security, reducing agricultural waste, and optimizing market pricing.",
        "Designed to assist farmers and policymakers in making data-driven decisions for improved agricultural efficiency."
      ],
      techStack: ["Python", "Flask", "Machine Learning", "Numpy", "Pandas", "Random Forest"],
      githubLink: "https://github.com/arpitsharma2010/Crop-Yield-Prediction",
    },
    {
      title: "Automated System for Timetable Generation",
      image: "/projects/portfolio.png",
      description: "Developed an Automated Timetable Generation System using PHP, MySQL, and Bootstrap, allowing professors to manage availability and view their schedules while the admin efficiently generates optimized timetables.",
      details: [
        "Engineered a robust algorithm in PHP to automatically generate optimal timetables, reducing scheduling conflicts by 80%.",
        "Designed a user-friendly web application using Bootstrap, reducing timetable creation time by 50%.",
        "Implemented a secure login system where professors can set their availability and view their personalized timetables.",
        "Integrated an admin panel for managing professor availability, classroom allocations, and timetable generation.",
        "Optimized MySQL database to store faculty schedules, room availability, and course allocations efficiently."
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      githubLink: "https://github.com/arpitsharma2010/Automated-System-for-Timetable-Generation/tree/master",
    },
  ];

  return (
    <section className="page-content">
      <h2 className="text-4xl font-bold mb-6">🚀 My Projects</h2>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-links">
              {/* {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-btn">
                  Live Demo
                </a>
              )} */}
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-btn github-btn">
                GitHub
              </a>
            </div>
            <button className="details-btn" onClick={() => setExpandedProject(index)}>View Details</button>
          </div>
        ))}
      </div>

      {/* Overlay for Expanded Project */}
      {expandedProject !== null && (
        <div className="overlay" onClick={() => setExpandedProject(null)}>
          <div className="expanded-card">
            <img src={projects[expandedProject].image} alt={projects[expandedProject].title} className="expanded-image" />
            <div className="expanded-content">
              <h3 className="expanded-title">{projects[expandedProject].title}</h3>
              <p className="expanded-description">{projects[expandedProject].description}</p>
              <ul className="expanded-details">
                {projects[expandedProject].details.map((point, i) => (
                  <li key={i} className="detail-point">• {point}</li>
                ))}
              </ul>
              <p className="expanded-tech-stack">
                <strong>Tech Stack:</strong> {projects[expandedProject].techStack.join(", ")}
              </p>
              <div className="expanded-links">
                {/* {projects[expandedProject].demoLink && (
                  <a href={projects[expandedProject].demoLink} target="_blank" rel="noopener noreferrer" className="expanded-btn">
                    Live Demo
                  </a>
                )} */}
                <a href={projects[expandedProject].githubLink} target="_blank" rel="noopener noreferrer" className="expanded-btn github-btn">
                  GitHub
                </a>
              </div>
              <button className="close-btn" onClick={() => setExpandedProject(null)}>❌ Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;