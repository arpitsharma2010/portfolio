import React from "react";
import { FiExternalLink } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { ASSET_BASE } from "../../utils/constants";

const education = [
  {
    institution: "University at Buffalo, SUNY",
    logo: `${ASSET_BASE}Education/UB.jpg`,
    website: "https://engineering.buffalo.edu/computer-science-engineering.html",
    degree: "M.S. Computer Science & Engineering",
    detail: "GPA 3.77 / 4",
    period: "Aug 2024 – Dec 2025",
    courses: [
      "Algorithm Analysis and Design",
      "Operating Systems",
      "Database Management Systems",
      "Computer Architecture",
      "Computer Security",
      "Modern Networking Concepts",
      "Data Intensive Computing",
      "Introduction to Machine Learning",
      "Statistical Data Mining",
      "Technological Entrepreneurship",
    ],
  },
  {
    institution: "Sant Gadge Baba Amravati University",
    logo: `${ASSET_BASE}Education/SGBAU.jpg`,
    website: "https://sgbau.ac.in/departments/ComputerScience/Default.aspx",
    degree: "B.E. Computer Science & Engineering",
    detail: "GPA 8.67 / 10",
    period: "Jul 2016 – Oct 2020",
    courses: [
      "Data Structures",
      "Design and Analysis of Algorithms",
      "Operating Systems",
      "Database Systems",
      "Computer Networks",
      "Network Security",
      "Computer Architecture",
      "Microprocessor Systems",
      "Embedded Systems",
      "Object Oriented Programming",
      "Software Engineering",
      "Artificial Intelligence",
      "Digital Signal Processing",
      "Web Engineering",
    ],
  },
];

const certifications = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "May 2026",
    url: "https://www.credly.com/badges/495050db-4418-464b-8031-b1a06fae0012",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jun 2022 – May 2028",
    url: "https://www.credly.com/badges/ddcfbe0f-49df-413d-938f-3914713a590e",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    date: "Mar 2022",
    url: "https://www.credly.com/badges/9e81ba52-0c00-4297-a692-f1612c938499",
  },
];

const Education: React.FC = () => (
  <PageSection eyebrow="Advancements" title="Education & certifications" variant="stone">
    <div className="advancements">
      <div className="advancement-path">
        {education.map((item) => (
          <article
            key={item.institution}
            className="advancement advancement--degree"
          >
            <div className="advancement__main">
              <img
                src={item.logo}
                alt={`${item.institution} logo`}
                className="advancement__icon"
                loading="lazy"
              />
              <div className="advancement__content">
                <div>
                  <h3>
                    {item.degree}
                  </h3>
                  <p>
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {item.institution}
                    </a>
                  </p>
                </div>
                <div className="advancement__meta">
                  <p>
                    {item.period}
                  </p>
                  <p>
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>

            <details className="coursework">
              <summary>
                Coursework
                <span>
                  ({item.courses.length})
                </span>
              </summary>
              <ul className="loot-list">
                {item.courses.map((course) => (
                  <li
                    key={course}
                    className="loot-tag"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>

      <div className="certifications">
        <h3>
          Certifications
        </h3>
        <ul>
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="advancement advancement--cert"
            >
              <div>
                <p>
                  {cert.name}
                </p>
                <p>
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Verify <FiExternalLink aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </PageSection>
);

export default Education;
