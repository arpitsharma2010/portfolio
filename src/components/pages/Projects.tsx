import React from "react";

const Projects: React.FC = () => {
    const projects = [
        {
          title: "E-Commerce Website",
          image: "/projects/ecommerce.png",
          description: "A full-stack e-commerce website with product search, cart, and payment integration.",
          techStack: ["React", "Node.js", "MongoDB", "Stripe"],
          demoLink: "https://myecommerce.com",
          githubLink: "https://github.com/yourgithub/ecommerce-project",
        },
        {
          title: "AI Chatbot",
          image: "/projects/chatbot.png",
          description: "An AI-powered chatbot using NLP to assist users with automated responses.",
          techStack: ["Python", "TensorFlow", "Flask"],
          demoLink: "https://chatbotai.com",
          githubLink: "https://github.com/yourgithub/chatbot-project",
        },
        {
          title: "Portfolio Website",
          image: "/projects/portfolio.png",
          description: "A personal portfolio website to showcase my skills and projects.",
          techStack: ["React", "TypeScript", "Tailwind CSS"],
          demoLink: "https://myportfolio.com",
          githubLink: "https://github.com/yourgithub/portfolio-project",
        },
      ];
  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold">🚀 My Projects</h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
            {/* Project Image */}
            <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />

            {/* Project Title */}
            <h3 className="text-2xl font-semibold">{project.title}</h3>

            {/* Project Description */}
            <p className="text-gray-700 mt-2">{project.description}</p>

            {/* Tech Stack */}
            <p className="text-sm text-gray-500 mt-2">Tech Stack: {project.techStack.join(", ")}</p>

            {/* Links */}
            <div className="mt-4 flex justify-center gap-4">
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer"
                 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                🔗 Live Demo
              </a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                 className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
                💻 GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">More about my projects - line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default Projects;