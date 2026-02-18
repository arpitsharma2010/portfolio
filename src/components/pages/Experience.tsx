import React from "react";
// icons removed
import PageSection from "../common/PageSection.tsx";
import SEO from "../utils/SEO.tsx";

interface ExperienceProps {
  url: string;
  showLogos?: boolean;
}

type Job = {
  company: string;
  logo: string;
  website: string;
  position: string;
  duration: string;
  location?: string;
  description: string[];
  techStack: string[];
  // can be single string or string[] from data; we'll normalize to string[]
  highlight?: string | string[];
};

const Experience: React.FC<ExperienceProps> = ({ url, showLogos = true }) => {
  const normalizeHighlights = (h?: string | string[]) =>
    !h ? [] : Array.isArray(h) ? h : [h];

  const pageUrl = `${url}experience/`;
  const seoImage = `${url}Experience/TCS.png`;
  const seoDescription =
    "Professional experience of Arpit Sharma covering senior software development at Tata Consultancy Services building cloud-native banking platforms, CI/CD automation and IoT solutions.";
  const seoKeywords = [
    "Arpit Sharma experience",
    "Senior Software Developer TCS",
    "GitLab CI pipelines",
    "Terraform infrastructure",
    "AWS Lambda developer",
    "DNB banking engineer",
  ];

  const quickStats = [
    { label: "Daily Transactions", value: "500K+" },
    { label: "Manual Ops Reduced", value: "90%" },
    { label: "Deployment Speed", value: "+60%" },
    { label: "User Base Scaled", value: "100K+" },
  ];

  const allExperience: Job[] = [
    {
      company: "Tata Consultancy Services (DNB, Norway)",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Senior Software Developer",
      duration: "Sep 2023 – Jul 2024",
      location: "Pune, India",
      highlight: [
        "Microservices Reverse-Engineering",
        "Infrastructure as Code Lead",
        "99.8% Uptime Architecture"
      ],
      description: [
        "Led the critical technical analysis and decomposition of SBanken’s legacy savings and investment services during its high-stakes merger with DNB Norway. This involved reverse-engineering 15+ backend microservices to produce high-fidelity API specifications and traceability matrices, ensuring zero data loss for platforms processing 500K+ daily transactions.",
        "Owned the end-to-end DevOps lifecycle across four distinct environments (Dev, QA, UAT, Prod). I architected automated CI/CD pipelines using GitLab CI, Terraform, and CloudFormation to provision scalable IaaS infrastructure. By implementing blue-green rollout strategies and automated validation gates, I successfully reduced deployment windows by 60% while maintaining a 99.8% uptime SLA.",
        "Acted as a technical lead for the C# .NET Core ecosystem, reviewing over 200 pull requests across 10+ repositories. I institutionalized Test-Driven Development (TDD) using NUnit and Moq, and mentored junior engineers on adopting SOLID principles and microservices design patterns, which resulted in a 25% measurable improvement in codebase maintainability and modularity."
      ],
      techStack: [
        "C#", ".NET Core", "GitLab CI/CD", "Terraform", "AWS", "CloudFormation", 
        "Microservices", "Blue-Green Deployments", "NUnit", "Moq", "RESTful APIs", "Jira", "Confluence"
      ],
    },
    {
      company: "Tata Consultancy Services (DNB, Norway)",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Software Developer",
      duration: "Apr 2021 – Aug 2023",
      location: "Pune, India",
      highlight: [
        "Event-Driven Systems",
        "90% Ops Automation",
        "High-Throughput API Design"
      ],
      description: [
        "Architected and optimized 30+ production-grade RESTful and WebSocket endpoints using a cloud-native stack consisting of AWS Lambda, API Gateway, and DynamoDB. By implementing asynchronous processing patterns and distributed caching, I increased request throughput by 50% and slashed API latency by 40% for banking platforms serving over 100K active customers.",
        "Engineered a robust, event-driven automation engine to handle complex pricing updates. This system utilized Kubernetes-orchestrated Docker jobs triggered by S3 events and SQS/SNS messaging. This transition from manual triggers to a fully automated, containerized workflow eliminated 90% of manual operations and ensured 99.5% system reliability during peak trading hours.",
        "Established comprehensive observability and security protocols, including OAuth2 token validation, RBAC, and data-at-rest encryption. I led on-call rotations and conducted Root Cause Analysis (RCA) using CloudWatch and structured logging, consistently achieving a sub-30-minute Mean Time to Recovery (MTTR) and reducing recurring production incidents by 35%.",
        "Drove delivery excellence in a fast-paced Agile environment, managing over 100 Jira tickets and maintaining a 95% sprint completion rate through close collaboration with cross-functional product, design, and QA teams."
      ],
      techStack: [
        "C#", ".NET Core", "AWS Lambda", "API Gateway", "DynamoDB", "MongoDB", "React", 
        "TypeScript", "Node.js", "Docker", "Kubernetes", "SQS/SNS", "CloudWatch", "OAuth2", "Redis"
      ],
    },
    {
      company: "Tata Consultancy Services",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Assistant Software Developer",
      duration: "Nov 2020 – Mar 2021",
      location: "Pune, India",
      highlight: "HealthTech Digital Transformation",
      description: [
        "Designed and developed a comprehensive Hospital Management System using a modern full-stack architecture (React, Spring Boot, and Java). I implemented critical modules for appointment scheduling, pharmacy inventory, and billing, managing a database of 5,000+ patient records and reducing patient processing time by 45%.",
        "Focused heavily on data persistence and performance, engineering optimized schemas for MySQL, PostgreSQL, and MS SQL. By refactoring legacy queries and implementing efficient indexing, I reduced data retrieval times by 30%, enabling the system to handle over 10K concurrent billing and inventory transactions with high integrity."
      ],
      techStack: [
        "Java", "Spring Boot", "ReactJS", "TypeScript", "MySQL", "PostgreSQL", 
        "MS SQL", "JUnit", "TDD", "REST API Design", "Git"
      ],
    },
    {
      company: "Obdurate Technology",
      logo: `${url}Experience/Obdurate.png`,
      website: "https://www.obdurate.in/",
      position: "Software Engineer Intern",
      duration: "Jun 2019 – Aug 2019",
      location: "Amravati, India",
      highlight: "IoT & Embedded Automation",
      description: [
        "Developed an automated environmental monitoring and irrigation control system using Python on Raspberry Pi (Linux). I focused on optimizing the interface between hardware sensors and software control modules, successfully refactoring the execution logic to reduce sensor-to-action latency by 20% and improving overall irrigation efficiency by 15%."
      ],
      techStack: ["Python", "Raspberry Pi", "Linux", "IoT", "Sensors", "Hardware Interfacing"],
    },
  ];

  return (
    <>
      <SEO
        title="Experience | Arpit Sharma"
        description={seoDescription}
        keywords={seoKeywords}
        image={seoImage}
        url={pageUrl}
        type="profile"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Professional Experience - Arpit Sharma",
          numberOfItems: allExperience.length,
          itemListElement: allExperience.map((job, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "Organization",
              name: job.company,
              url: job.website,
              description: job.description[0] ?? job.position,
            },
          })),
        }}
      />
      <section className="flex flex-col gap-10 text-white">
      <PageSection
        eyebrow="Career"
        title="Work Experience"
        description="Building resilient, API-driven platforms across finance and health tech. I thrive at the intersection of architecture, DevOps and collaboration leading delivery while keeping accessibility, observability and documentation in the loop."
        align="center"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-center shadow-[0_15px_40px_rgba(0,0,0,0.45)]"
            >
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-text-mute">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <div className="grid gap-8 md:grid-cols-2">
        {allExperience.map((job, index) => {
          const highlights = normalizeHighlights(job.highlight);
          return (
            <article
              key={index}
              className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-plasma/10 via-transparent to-ion/10 opacity-60" aria-hidden />
              <div className="relative flex flex-col items-center text-center">
                <div className="flex w-full items-center justify-between gap-3">
                  <div className="rounded-full border border-white/20 bg-gradient-to-r from-plasma/40 to-ion/40 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-glow">
                    {job.duration}
                  </div>
                  {job.location && (
                    <span className="text-[10px] uppercase tracking-[0.35em] text-text-mute">{job.location}</span>
                  )}
                </div>
                <div className="mt-4">
                  {showLogos ? (
                    <img
                      src={job.logo}
                      alt={`${job.company} logo`}
                      className="h-16 w-16 rounded-2xl border border-white/10 bg-white/10 object-contain shadow"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-ion/10 text-xs text-ion">
                      {job.company.split(" ")[0]}
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{job.position}</h3>
                <p className="text-sm text-slate-300">{job.company}</p>

                {highlights.length > 0 && (
                  <ul className="mt-3 flex flex-wrap justify-center gap-2">
                    {highlights.map((h, i) => (
                      <li
                        key={i}
                        className="achievement-pill inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-[11px] font-semibold"
                      >
                        🎖 <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <ul className="relative space-y-3 text-sm text-slate-200">
                {job.description.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-6 rounded-full bg-ion" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="relative border-t border-white/10 pt-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-text-mute mb-2">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {job.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-text-mute"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
    </>
  );
};

export default Experience;
