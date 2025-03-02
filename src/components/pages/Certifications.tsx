import React, { useState } from "react";
import "./../../styles/Certifications.css";

const Certifications: React.FC = (props) => {
  const [expandedCert, setExpandedCert] = useState<number | null>(null);

  const certificationsData = [
    {
      name: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      logo: `${props.url}Certification/aws_cloud_practitioner.png`,
      year: "June 2022 - June 2025",
      description: "Verified understanding of cloud computing concepts and AWS.",
      certificateLink: "https://www.credly.com/badges/7b23b0c9-df00-4c90-9af9-f76705ef1085?source=linked_in_profile",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      organization: "Microsoft",
      logo: `${props.url}Certification/azure_fundamentals.png`,
      year: "March 2022",
      description: "Verified understanding of cloud computing concepts and Microsoft Azure services.",
      certificateLink: "https://www.credly.com/badges/9e81ba52-0c00-4297-a692-f1612c938499?source=linked_in_profile",
    }
  ];

  const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

  return (
    <section className="page-content">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center">Certifications & Achievements</h2>

      {/* Certifications List */}
      <div className="certifications-container">
        {certificationsData.map((cert, index) => (
          <div 
            key={index} 
            className={`cert-card ${expandedCert === index ? "expanded" : ""}`} 
            onClick={() => setExpandedCert(expandedCert === index ? null : index)}
          >
            <img src={cert.logo} alt={cert.organization} className="cert-logo" />

            <div className="cert-info">
              <h3 className="cert-title">{cert.name}</h3>
              <p className="cert-organization">{cert.organization}</p>
              <p className="cert-year">{cert.year}</p>
            </div>

            {/* Expanded Details */}
            {expandedCert === index && (
              <div className="cert-details">
                <p className="cert-description">{cert.description}</p>
                <a 
                  href={cert.certificateLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cert-button"
                >
                  🎓 View Certificate
                </a>
              </div>
            )}
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

export default Certifications;