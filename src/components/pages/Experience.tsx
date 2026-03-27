import React from "react";
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
    "Software Engineer II TCS",
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
      company: "University at Buffalo (Tesserae Project)",
      logo: `${url}developer_image.jpg`,
      website: "https://tesserae.caset.buffalo.edu/",
      position: "Volunteer Software Engineer",
      duration: "Feb 2026 – Present",
      location: "Buffalo, NY, USA",
      highlight: [
        "Backend Security",
        "Data Pipelines",
        "Frontend UX"
      ],
      description: [
        "Architected and deployed highly secure backend features for Tesserae V6, an advanced intertextual analysis tool processing massive classical corpora.",
        "Engineered robust security infrastructure, implementing intelligent rate limiting, automated threat lockouts, and a scalable Role-Based Access Control (RBAC) system for the Flask backend.",
        "Optimized administrative data pipelines by developing dynamic language code normalizers and stateful request-status filters, significantly reducing corpus management overhead.",
        "Spearheaded full-stack UX enhancements, instituting complex state preservation for deeply nested search parameters to eliminate user friction during historical analysis."
      ],
      techStack: [
        "Python", "Flask", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "RBAC", "Git", "GitHub", "Code Review", "Pull Requests"
      ],
    },
    {
      company: "Tata Consultancy Services (DNB, Norway)",
      logo: `${url}Experience/TCS.png`,
      website: "https://www.tcs.com/",
      position: "Software Engineer II",
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
      position: "Software Engineer I",
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
      <div className="flex flex-col gap-16 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageSection
          eyebrow="Career"
          title="Work Experience"
          description="A proven track record of architecting resilient, high-performance systems across finance, health tech, and research. I thrive at the intersection of scalable backend engineering and optimized user experiences—leading delivery while maintaining strict observability and CI/CD organizational excellence."
          align="left"
        >
          <></>
        </PageSection>

        {/* Vertical Timeline Layout */}
        <section className="relative w-full max-w-5xl mx-auto mt-4 px-2">
          {/* Main vertical line */}
          <div className="absolute left-6 md:left-8 top-8 bottom-0 w-px bg-slate-800" aria-hidden="true" />
          
          <div className="space-y-16">
            {allExperience.map((job, index) => {
              const highlights = normalizeHighlights(job.highlight);
              return (
                <article
                  key={index}
                  className="relative pl-16 md:pl-24 group"
                >
                  {/* Timeline Dot */}
                  <span className="absolute left-[20px] md:left-[28px] top-8 h-3.5 w-3.5 rounded-full border border-slate-600 bg-slate-900 group-hover:bg-brand-sapphire group-hover:border-brand-sapphire group-hover:scale-125 transition-all duration-300 z-10" aria-hidden="true" />
                  
                  {/* Card Content */}
                  <div className="bg-white/[0.01] border border-slate-800/80 rounded-2xl p-6 sm:p-9 hover:border-slate-600 transition shadow-sm group-hover:shadow-md">
                    
                    { /* Header */ }
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 mb-8">
                      <div className="flex gap-5 items-start">
                        {showLogos && job.logo && (
                           <img
                             src={job.logo}
                             alt={`${job.company} logo`}
                             className="h-14 w-14 rounded-xl border border-slate-700 bg-white shadow-sm object-contain p-1 shrink-0 hidden sm:block"
                             loading="lazy"
                           />
                        )}
                        <div>
                          <h3 className="text-2xl font-bold text-slate-100 tracking-tight">{job.position}</h3>
                          <p className="text-lg text-slate-400 mt-1.5 font-medium">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex flex-row xl:flex-col items-center xl:items-end gap-3 xl:gap-2">
                        <span className="inline-flex items-center rounded-md bg-slate-800/80 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-300 border border-slate-700">
                          {job.duration}
                        </span>
                        {job.location && (
                          <span className="text-xs font-mono uppercase tracking-widest text-slate-500">{job.location}</span>
                        )}
                      </div>
                    </div>

                    { /* Highlights */ }
                    {highlights.length > 0 && (
                      <div className="mb-8 flex flex-wrap gap-2.5">
                        {highlights.map((h, i) => (
                          <span key={i} className="inline-flex items-center rounded-md bg-brand-sapphire/10 px-3 py-1.5 text-xs font-medium text-blue-300 border border-brand-sapphire/20">
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}

                    { /* Description */ }
                    <ul className="space-y-4 text-slate-300 text-[15px] leading-relaxed mb-8">
                      {job.description.map((point, i) => (
                        <li key={i} className="flex gap-3.5 items-start">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600 group-hover:bg-brand-sapphire transition-colors" aria-hidden />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    { /* Stack */ }
                    <div className="pt-6 border-t border-slate-800/60">
                      <p className="text-[11px] font-mono tracking-widest uppercase text-slate-500 mb-4">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {job.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 border border-slate-700/80 hover:bg-slate-800 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Experience;
