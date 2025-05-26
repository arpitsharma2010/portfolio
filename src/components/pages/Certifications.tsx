import React from "react";

interface CertificationsProps {
  url: string;
}

const Certifications: React.FC<CertificationsProps> = ({ url }) => {
  const certificationsData = [
    {
      name: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      logo: `${url}Certification/aws_cloud_practitioner.png`,
      year: "June 2022 - May 2028",
      description: "Verified understanding of cloud computing concepts and AWS.",
      certificateLink:
        "https://www.credly.com/badges/7b23b0c9-df00-4c90-9af9-f76705ef1085?source=linked_in_profile",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      organization: "Microsoft",
      logo: `${url}Certification/azure_fundamentals.png`,
      year: "March 2022",
      description:
        "Verified understanding of cloud computing concepts and Microsoft Azure services.",
      certificateLink:
        "https://www.credly.com/badges/9e81ba52-0c00-4297-a692-f1612c938499?source=linked_in_profile",
    },
  ];

  return (
    <section className="w-full px-4 py-16 min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-600 dark:text-cyan-400">
        Certifications & Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {certificationsData.map((cert, index) => (
          <div key={index} className="perspective">
            <div className="relative h-64 w-full transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
              {/* Front Side */}
              <div className="absolute inset-0 bg-gray-100 dark:bg-[#1e293b] border border-cyan-500/10 rounded-xl p-5 flex flex-col justify-center items-center backface-hidden shadow-md hover:shadow-cyan-500/20">
                <img
                  src={cert.logo}
                  alt={cert.organization}
                  className="w-16 h-16 object-contain rounded-full border border-cyan-400 mb-3"
                />
                <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-300 text-center">
                  {cert.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {cert.organization}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {cert.year}
                </p>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-cyan-700 text-white rounded-xl p-6 flex flex-col justify-center items-center rotate-y-180 backface-hidden">
                <p className="text-sm text-center mb-4">{cert.description}</p>
                <a
                  href={cert.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-cyan-700 font-semibold rounded hover:bg-gray-200 transition text-sm"
                >
                  🎓 View Certificate
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;