import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";

interface ProjectsProps {
  url: string;
}

const Projects: React.FC<ProjectsProps> = ({ url }) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "16-bit Single-Cycle RISC Processor on FPGA",
      image: `${url}Project/Microprocessor.png`,
      description: "Designed and deployed a modular 16-bit single-cycle processor with 10 custom RISC-style instructions on Basys3 FPGA using Verilog.",
      timeline: "Feb 2025 – Apr 2025",
      details: [
        "Designed a single-cycle 16-bit processor supporting 10 custom RISC-style instructions: add, sub, sll, and, addi, lw, sw, beq, bne, and jmp.",
        "Built modular components: ALU, register file, control unit, data/instruction memory, and branching/jump logic.",
        "Implemented a two-button stepping system: first press shows rt/rd register value, second press executes instruction and updates LEDs.",
        "Tested with instructions like ADDI R1, R0, 5; ADD R1, R3, R0; SW R1, R0, 2; BEQ R9, R9, 1; and JMP -4 to validate arithmetic, memory, and control flow operations."
      ],
      techStack: ["Verilog", "Xilinx Vivado", "Basys3 FPGA", "Digital Logic Design"],
      repos: [
        { label: "GitHub", url: "https://github.com/arpitsharma2010/16bit-FPGA-Processor" }
      ]
    },
    {
      title: "Portfolio Website",
      image: `${url}Project/Portfolio.png`,
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
      repos: [
        { label: "Repository", url: "https://github.com/arpitsharma2010/Portfolio" }
      ]
    },
    {
      title: "Library Management System",
      image: `${url}Project/LibraryMainPage.png`,
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
      repos: [
        { label: "Web App", url: "https://github.com/arpitsharma2010/react-library-project" },
        { label: "API", url: "https://github.com/arpitsharma2010/spring-boot-library" }
      ]
    },
    {
      title: "Crop Yield Prediction Using Machine Learning",
      image: `${url}Project/CropYieldMainpage.jpeg`,
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
      repos: [
        { label: "GitHub", url: "https://github.com/arpitsharma2010/Crop-Yield-Prediction" }
      ]
    },
    {
      title: "Automated System for Timetable Generation",
      image: `${url}developer_image.jpg`,
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
      repos: [
        { label: "GitHub", url: "https://github.com/arpitsharma2010/Automated-System-for-Timetable-Generation/tree/master" }
      ]
    }
  ];

  const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="w-full px-4 py-16 min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-600 dark:text-cyan-400">Projects</h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-[#1e293b] border border-cyan-500/10 rounded-xl p-4 shadow-md hover:shadow-cyan-500/20 dark:shadow-none transition flex flex-col justify-between"
          >
            <div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">{project.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                <strong>Timeline:</strong> {project.timeline}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>
  
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                {project.repos?.map((repo, i) => (
                  <a
                    key={i}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white px-3 py-2 rounded text-sm hover:bg-gray-300 dark:hover:bg-[#475569] transition font-medium"
                  >
                    <FiGithub className="text-lg" /> {repo.label}
                  </a>
                ))}
              </div>
              <button
                className="mt-2 w-full px-4 py-2 bg-cyan-600 text-white text-sm rounded hover:bg-cyan-700 transition"
                onClick={() => setExpandedProject(index)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
  
      {/* Modal View */}
      {expandedProject !== null && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedProject(null)}
        >
          <div
            className="bg-white dark:bg-[#1e293b] text-gray-900 dark:text-white max-w-4xl w-full rounded-lg border border-cyan-500/10 shadow-lg overflow-y-auto max-h-[90vh] p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 text-xl"
              onClick={() => setExpandedProject(null)}
            >
              ✕
            </button>
  
            <img
              src={projects[expandedProject].image}
              alt={projects[expandedProject].title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">{projects[expandedProject].title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <strong>Timeline:</strong> {projects[expandedProject].timeline}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">{projects[expandedProject].description}</p>
  
            <ul className="list-disc list-inside mt-4 text-gray-700 dark:text-gray-300 space-y-1 text-sm">
              {projects[expandedProject].details.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
  
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <strong>Tech Stack:</strong> {projects[expandedProject].techStack.join(", ")}
            </p>
  
            <div className="flex flex-wrap gap-3 mt-4">
              {projects[expandedProject].repos?.map((repo, i) => (
                <a
                  key={i}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-[#334155] text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-[#475569] transition text-sm"
                >
                  <FiGithub /> {repo.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;