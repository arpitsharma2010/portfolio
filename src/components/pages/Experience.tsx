import React from "react";

const fullTimeExperience = [
  {
    company: "Google",
    logo: "/experience/google.png",
    position: "Software Engineer",
    duration: "2022 - Present",
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
];

const internshipExperience = [
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

const Experience: React.FC = () => {
  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold">💼 Work Experience</h2>

      {/* Full-Time Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {fullTimeExperience.map((job, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            {/* Company Logo */}
            <img src={job.logo} alt={job.company} className="w-20 h-20 mb-4 rounded-full shadow-lg" />

            {/* Company Name & Position */}
            <h3 className="text-2xl font-semibold">{job.company}</h3>
            <p className="text-lg font-medium text-gray-700">{job.position}</p>
            <p className="text-sm text-gray-500">{job.duration}</p>

            {/* Job Description */}
            <ul className="mt-4 text-gray-600 text-left list-disc list-inside">
              {job.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {/* Tech Stack */}
            <p className="text-sm text-gray-500 mt-4">Tech Stack: {job.techStack.join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Internship Section Title */}
      <h2 className="text-3xl font-bold mt-12">🎓 Internship Experience</h2>

      {/* Internship Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {internshipExperience.map((internship, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center">
            {/* Company Logo */}
            <img src={internship.logo} alt={internship.company} className="w-20 h-20 mb-4 rounded-full shadow-lg" />

            {/* Company Name & Position */}
            <h3 className="text-2xl font-semibold">{internship.company}</h3>
            <p className="text-lg font-medium text-gray-700">{internship.position}</p>
            <p className="text-sm text-gray-500">{internship.duration}</p>

            {/* Job Description */}
            <ul className="mt-4 text-gray-600 text-left list-disc list-inside">
              {internship.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {/* Tech Stack */}
            <p className="text-sm text-gray-500 mt-4">Tech Stack: {internship.techStack.join(", ")}</p>
          </div>
        ))}
      </div>

      {/* CTA Button for Projects */}
      <div className="mt-8">
        <a
          href="/projects"
          className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-600 transition"
        >
          📂 View My Projects
        </a>
      </div>

      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">More about my experience - line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default Experience;