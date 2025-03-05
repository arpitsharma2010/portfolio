import React, { useState } from "react";
import "./../../styles/Projects.css";

const Projects: React.FC = (props) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Portfolio Website",
      image: `${props.url}Project/Portfolio.png`,
      description: "Developed a personal portfolio website using React (TypeScript) to showcase projects, experience, and skills.",
      timeline: "Feb 2025 – Present",
      details: [
        "Built the website using React (TypeScript) for modular and maintainable code.",
        "Implemented project showcase, experience section, and a clean, responsive UI.",
        "Integrated GitHub Pages for seamless deployment and hosting.",
        "Optimized asset loading and structured the project with reusable components.",
        "Continuously improving and adding features based on feedback."
      ],
      techStack: ["React", "TypeScript", "CSS", "GitHub Pages"],
      githubFrontend: "https://github.com/arpitsharma2010/Portfolio",
      githubBackend: "",
    },
    {
      title: "Library Management System",
      image: `${props.url}Project/LibraryMainPage.png`,
      description: "Developed a full-stack Library Management System using React (TypeScript) and Spring Boot, implementing secure authentication, role-based access control, and real-time data handling.",
      timeline: "Dec 2024 – Feb 2025", 
      details: [
        "Built with React (TypeScript) and Spring Boot for a modern, scalable, and efficient user experience.",
        "Implemented JWT and OAuth for secure authentication with role-based access control (admin & users).",
        "Admins can add, remove, update books, and respond to user queries, while users can borrow and return books in real-time.",
        "Users can extend the borrowing period, rate books, ask questions to the admin, and request new books for the library.",
        "Optimized SQL database enables fast queries, efficient data storage, and reliable performance."
      ],
      techStack: ["React", "Spring Boot", "Java", "SQL", "OAuth", "JWT"],
      githubFrontend: "https://github.com/arpitsharma2010/react-library-project",
      githubBackend: "https://github.com/arpitsharma2010/spring-boot-library",
    },
    {
      title: "Crop Yield Prediction Using Machine Learning",
      image: `${props.url}Project/CropYieldMainpage.jpeg`,
      description: "Developed a machine learning model for crop yield prediction using Random Forest, achieving 89% accuracy, and deployed it via a Flask web service for real-world applications.",
      timeline: "Sep 2024 – Nov 2024", 
      details: [
        "Executed a machine learning model with 89% prediction accuracy for crop yield prediction in tons per hectare using Random Forest.",
        "Integrated the model with a Flask web service to provide real-time yield predictions.",
        "Utilized 9 different parameters, including soil conditions, weather data, and crop type, for accurate forecasting.",
        "Applications include enhancing food security, reducing agricultural waste, and optimizing market pricing.",
        "Designed to assist farmers and policymakers in making data-driven decisions for improved agricultural efficiency."
      ],
      techStack: ["Python", "Flask", "Machine Learning", "Numpy", "Pandas", "Random Forest"],
      githubFrontend: "", 
      githubBackend: "https://github.com/arpitsharma2010/Crop-Yield-Prediction",
    },
    {
      title: "Automated System for Timetable Generation",
      image: `${props.url}developer_image.jpg`,
      description: "Developed an Automated Timetable Generation System using PHP, MySQL, and Bootstrap, allowing professors to manage availability and view their schedules while the admin efficiently generates optimized timetables.",
      timeline: "Jan 2020 – Apr 2020", 
      details: [
        "Engineered a robust algorithm for automatically generating optimal timetables using PHP, accommodating complex constraints and reducing scheduling conflicts by 80%.",
        "Designed a user-friendly web application using Bootstrap, reducing timetable creation time by 50%.",
        "Implemented a secure login system where professors can set their availability and view their personalized timetables.",
        "Integrated an admin panel for managing professor availability, classroom allocations, and timetable generation.",
        "Optimized MySQL database to store faculty schedules, room availability, and course allocations efficiently."
      ],
      techStack: ["HTML", "Bootstrap", "PHP", "MySQL", "JavaScript"],
      githubFrontend: "",
      githubBackend: "https://github.com/arpitsharma2010/Automated-System-for-Timetable-Generation/tree/master",
    },
  ];

  const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="page-content">
      <h2 className="text-4xl font-bold mb-6">My Projects</h2>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image" 
            />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-timeline"><strong>Timeline:</strong> {project.timeline}</p>
            <p className="project-description">{project.description}</p>
            <div className="project-links">
              {project.githubFrontend && (
                <a href={project.githubFrontend} target="_blank" rel="noopener noreferrer" className="project-btn github-btn">
                  Frontend GitHub
                </a>
              )}
              {project.githubBackend && (
                <a href={project.githubBackend} target="_blank" rel="noopener noreferrer" className="project-btn github-btn">
                  GitHub
                </a>
              )}
            </div>
            <button className="details-btn" onClick={() => setExpandedProject(index)}>View Details</button>
          </div>
        ))}
      </div>

      {/* Overlay for Expanded Project */}
      {expandedProject !== null && (
        <div className="overlay" onClick={() => setExpandedProject(null)}>
          <div className="expanded-card">
            <img 
              src={projects[expandedProject].image} 
              alt={projects[expandedProject].title} 
              className="expanded-image" 
            />
            <div className="expanded-content">
              <h3 className="expanded-title">{projects[expandedProject].title}</h3>
              <p className="expanded-timeline"><strong>Timeline:</strong> {projects[expandedProject].timeline}</p>
              <p className="expanded-description">{projects[expandedProject].description}</p>
              <ul className="expanded-details">
                {projects[expandedProject].details.map((point, i) => (
                  <li key={i} className="detail-point">{point}</li>
                ))}
              </ul>
              <p className="expanded-tech-stack">
                <strong>Tech Stack:</strong> {projects[expandedProject].techStack.join(", ")}
              </p>
              <div className="expanded-links">
                {projects[expandedProject].githubFrontend && (
                  <a href={projects[expandedProject].githubFrontend} target="_blank" rel="noopener noreferrer" className="expanded-btn github-btn">
                    GitHub
                  </a>
                )}
                {projects[expandedProject].githubBackend && (
                  <a href={projects[expandedProject].githubBackend} target="_blank" rel="noopener noreferrer" className="expanded-btn github-btn">
                    GitHub Backend
                  </a>
                )}
              </div>
              <button className="close-btn" onClick={() => setExpandedProject(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="cta-buttons">
        <a href={resumePDF} className="resume-btn" target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      </div>
    </section>
  );
};

export default Projects;