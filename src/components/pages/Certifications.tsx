import React from "react";

const certificationsData = [
  {
    name: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    logo: "/certifications/aws.png",
    year: "2023",
    description: "Earned certification in cloud architecture, focusing on AWS services, security, and cost optimization.",
    certificateLink: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    name: "Google Associate Cloud Engineer",
    organization: "Google Cloud",
    logo: "/certifications/google.png",
    year: "2022",
    description: "Certified in deploying applications and monitoring cloud-based workloads on Google Cloud Platform.",
    certificateLink: "https://cloud.google.com/certification/cloud-engineer",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    logo: "/certifications/microsoft.png",
    year: "2021",
    description: "Verified understanding of cloud computing concepts and Microsoft Azure services.",
    certificateLink: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
  },
  {
    name: "Full-Stack Web Development",
    organization: "Coursera (Meta)",
    logo: "/certifications/meta.png",
    year: "2020",
    description: "Completed a full-stack web development course covering React, Node.js, Express, and MongoDB.",
    certificateLink: "https://www.coursera.org/meta-fullstack",
  },
];

const Certifications: React.FC = () => {
  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold">📜 Certifications & Achievements</h2>

      {/* Certifications List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {certificationsData.map((cert, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            {/* Certification Logo */}
            <img src={cert.logo} alt={cert.organization} className="w-20 h-20 mb-4 rounded-md shadow-lg" />

            {/* Certification Name & Organization */}
            <h3 className="text-2xl font-semibold">{cert.name}</h3>
            <p className="text-lg font-medium text-gray-700">{cert.organization}</p>
            <p className="text-sm text-gray-500">{cert.year}</p>

            {/* Description */}
            <p className="mt-4 text-gray-600">{cert.description}</p>

            {/* View Certificate Button */}
            <div className="mt-4">
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                🎓 View Certificate
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button for Contact */}
      <div className="mt-8">
        <a
          href="/contact"
          className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-green-600 transition"
        >
          📩 Get in Touch
        </a>
      </div>

      {/* Extra content for scrolling test */}
      <div className="mt-10">
        {[...Array(20)].map((_, index) => (
          <p key={index} className="text-gray-600 mt-2">More about my certifications - line {index + 1}</p>
        ))}
      </div>
    </section>
  );
};

export default Certifications;