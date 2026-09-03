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
  <PageSection eyebrow="Education" title="Education & certifications">
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {education.map((item) => (
          <article
            key={item.institution}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40"
          >
            <div className="flex items-start gap-4">
              <img
                src={item.logo}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                loading="lazy"
              />
              <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 underline-offset-4 hover:text-blue-700 dark:decoration-slate-600 dark:hover:text-sky-400"
                    >
                      {item.institution}
                    </a>
                  </p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    {item.period}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
                    {item.detail}
                  </p>
                </div>
              </div>
            </div>

            <details className="group mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
              <summary className="cursor-pointer text-sm font-semibold text-blue-700 marker:content-none dark:text-sky-400">
                Coursework
                <span className="ml-1 font-normal text-slate-500 group-open:hidden">
                  ({item.courses.length})
                </span>
              </summary>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.courses.map((course) => (
                  <li
                    key={course}
                    className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
          Certifications
        </h3>
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/40">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {cert.name}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue-700 underline-offset-4 hover:underline dark:text-sky-400"
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
