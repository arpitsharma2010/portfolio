import React, { useState } from "react";
import { FiArrowUpRight, FiGithub, FiTarget, FiX } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import SEO from "../utils/SEO.tsx";

interface ProjectsProps {
  url: string;
}

const Projects: React.FC<ProjectsProps> = ({ url }) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "Tesserae V6: Intertextual Analysis Tool",
      image: `${url}developer_image.jpg`,
      description:
        "A web-based intertextual analysis platform for classical texts, where I contributed complex administrative, structural, and security features to the Flask/React stack.",
      timeline: "Feb 2026 - Present",
      details: [
        "Contributed to Tesserae V6, a web-based intertextual analysis platform that helps scholars identify textual parallels across classical literary works using 9 distinct search channels.",
        "Engineered the core backend security architecture by implementing rigorous rate limiting, temporary lockouts, and role-based access control (RBAC) for the admin dashboard.",
        "Refactored administrative workflows, integrating robust request status filtering and language code normalization to streamline text corpus management.",
        "Enhanced the full-stack user experience by preserving source/target search state dynamically and rigorously validating frontend form submissions.",
      ],
      techStack: ["React 18", "Flask", "PostgreSQL", "Tailwind CSS", "Python", "Git", "GitHub", "Code Review", "Pull Requests"],
      repos: [
        { label: "Web App", url: "https://tesserae.caset.buffalo.edu/" },
        { label: "GitHub", url: "https://github.com/tesserae/tesserae-v6" },
      ],
    },
    {
      title: "WanderGenie: AI-Powered Travel Assistant",
      image: `${url}Project/WanderGenie.jpeg`,
      description:
        "Multi-agent conversational system built at a 36-hour hackathon to resolve travel planning fatigue by generating bookable, adjustable 5-day itineraries in under 15 seconds.",
      timeline: "Nov 2025",
      details: [
        "Architected a multi-agent LangGraph workflow with Planner, Researcher, and Validator agents, implementing state-based control flow and fallback strategies to resolve infinite loops.",
        "Integrated dynamic knowledge acquisition via OpenTripMap API and a dual-database approach (Supabase VectorDB for RAG, Neo4j GraphDB for geographic clustering), reducing travel time by ~40%.",
        "Developed a Validator-Corrector pattern using Pydantic to enforce JSON schema validation, auto-correcting malformed LLM outputs and guaranteeing required coordinates and booking links.",
        "Built a FastAPI backend coupled with a React frontend utilizing streaming architecture for real-time AI status updates and Mapbox visualization.",
      ],
      techStack: [
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "LangGraph",
        "Neo4j",
        "Supabase",
        "Pydantic",
        "OpenTripMap API",
        "Mapbox",
      ],
      repos: [
        { label: "GitHub", url: "https://github.com/arpitsharma2010/WanderGenie-ai-travel-assistant" },
        { label: "DevPost", url: "https://devpost.com/software/wandergenie-ai-travel-assistant" },
      ],
    },
    {
      title: "Pintos Kernel OS Development",
      image: `${url}developer_image.jpg`,
      description:
        "Developed core kernel components for Pintos, an 80x86 instructional operating system. Built a stable, fair, and secure kernel handling multi-threaded synchronization and user program execution.",
      timeline: "Jan 2025 – May 2025",
      details: [
        "Engineered a priority-based scheduler with nested priority donation to prevent priority inversion, and a Multi-Level Feedback Queue (MLFQ) using 17.14 fixed-point arithmetic for CPU fairness.",
        "Built a robust system call interface bridging user and kernel space, including argument passing via the 80x86 stack and core calls like exec, wait, and exit.",
        "Implemented a secure memory validation layer for user pointers and process synchronization using semaphores to eliminate deadlocks and kernel crashes from malformed inputs.",
        "Achieved a 95%+ pass rate across 200+ regression tests using GDB and backtrace analysis to debug complex, non-deterministic race conditions.",
      ],
      techStack: ["C", "x86 Assembly", "GDB", "Operating Systems", "Makefile"],
    },
    {
      title: "TacoDB: Mini Relational Database Management System",
      image: `${url}developer_image.jpg`,
      description:
        "Functional mini-RDBMS built from scratch in C++, implementing the full stack from a POSIX-based disk I/O space manager to an iterator-based Volcano Model query execution engine.",
      timeline: "Aug 2025 – Nov 2025",
      details: [
        "Built a Buffer Pool Manager utilizing LRU/Clock algorithms and RAII patterns for safe page unpinning, effectively preventing memory leaks and deadlocks.",
        "Developed a Slotted-Page storage layer with in-page compaction to maximize space utilization by eliminating internal fragmentation for variable-length records.",
        "Engineered a B+ Tree index supporting efficient O(log N) lookups and range scans, utilizing custom visualization tools to debug complex node invariants during splits and merges.",
        "Designed an iterator-based Volcano Model execution engine with SeqScan, Filter, and Join operators, transitioning from O(N × M) Nested Loop to O(N + M) Hash Joins for a ~10x speedup.",
      ],
      techStack: ["C++", "RDBMS", "B+ Tree", "Volcano Model", "Buffer Pool", "POSIX I/O"],
    },
    {
      title: "16-Bit RISC-style CPU",
      image: `${url}Project/Microprocessor.png`,
      description:
        "Designed and implemented a custom 16-bit single-cycle RISC-style processor from scratch using Verilog, successfully validating a 10-instruction ISA on a Basys3 FPGA.",
      timeline: "Feb 2025 – Apr 2025",
      details: [
        "Architected a custom 16-bit ISA with R, I, and J-type instructions, building modular datapath components including an ALU, dual-read Register File, and separated Control Unit.",
        "Implemented a synchronized two-button execution mechanism to prevent mechanical bounce, allowing real-time debugging of registers and ALU states directly on the FPGA's 7-segment display.",
        "Engineered precise shift-left and sign-extension logic to accurately compute branch targets for memory and control flow operations (LW, SW, BEQ, BNE, JMP).",
        "Validated the hardware design via a comprehensive Vivado testbench simulating 40+ execution cycles before successfully flashing and testing on the Artix-7 FPGA.",
      ],
      techStack: ["Verilog", "Xilinx Vivado", "Basys3 FPGA", "Artix-7", "ISA Design", "Digital Logic"],
      repos: [{ label: "GitHub", url: "https://github.com/arpitsharma2010/micro16-fpga-core" }],
    },
    {
      title: "Crop Yield Prediction System",
      image: `${url}Project/CropYieldMainpage.jpeg`,
      description:
        "End-to-end machine learning system that transforms raw environmental agricultural data into actionable real-time crop yield predictions for non-technical users.",
      timeline: "Sep 2024 – Nov 2024",
      details: [
        "Analyzed environmental data (rainfall, temperature, etc.) using Matplotlib/Seaborn for EDA, and scaled the data pipeline to handle large datasets using PySpark and Spark SQL.",
        "Engineered robust features by applying One-Hot Encoding for categorical variables and Standard Scaling for numerical parameters, avoiding the memory limits of single machines.",
        "Evaluated multiple models using K-Fold Cross-Validation (R2, MSE, MAE) and serialized the most accurate Random Forest and XGBoost models using Joblib.",
        "Built and deployed a Flask API backed by HTML/CSS serving the PySpark pipeline, allowing seamless and real-time inference in a user-facing web application.",
      ],
      techStack: ["Python", "Flask", "PySpark", "Spark MLlib", "Pandas", "Scikit-learn", "Random Forest", "XGBoost"],
      repos: [{ label: "GitHub", url: "https://github.com/arpitsharma2010/Crop-Yield-Prediction" }],
    },
    {
      title: "Portfolio Website",
      image: `${url}Project/Portfolio.png`,
      description:
        "Personal portfolio built with React + TypeScript and Tailwind to showcase projects, experience and research updates in a modular, component-driven structure.",
      timeline: "Feb 2025 – Present",
      details: [
        "Defined reusable layout primitives (PageSection, ModuleCard) so sections such as Home, Skills and Projects can evolve without rewriting layout glue.",
        "Integrated GitHub Pages deployment for fast iteration and a custom theme hook that honors OS preference before storing manual overrides.",
        "Continuously extends sections experience timelines, resume-aligned stats, formal palettes based on recruiter and mentor feedback.",
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "GitHub Pages"],
      repos: [{ label: "Repository", url: "https://github.com/arpitsharma2010/Portfolio" }],
    },
    {
      title: "Library Management System",
      image: `${url}Project/LibraryMainPage.png`,
      description:
        "Full-stack system using React (TypeScript) and Spring Boot that offers secure authentication, admin workflows and real-time book tracking for faculty and students.",
      timeline: "Dec 2024 – Feb 2025",
      details: [
        "Implemented JWT + OAuth-backed authentication with role-based dashboards for admins and borrowers.",
        "Admins can add/update/remove inventory, respond to queries and monitor borrowing activity while users extend loans, rate books and request purchases.",
        "Optimized SQL schema and caching to keep catalog queries responsive even during exam-season spikes.",
      ],
      techStack: ["React", "Spring Boot", "Java", "SQL", "OAuth2", "JWT"],
      repos: [
        { label: "Web App", url: "https://github.com/arpitsharma2010/react-library-project" },
        { label: "API", url: "https://github.com/arpitsharma2010/spring-boot-library" },
      ],
    },
    {
      title: "Automated Timetable Generation",
      image: `${url}developer_image.jpg`,
      description:
        "Scheduling tool using PHP, MySQL and Bootstrap for universities to assign faculty, avoid clashes and let professors manage their availability digitally.",
      timeline: "Jan 2020 – Apr 2020",
      details: [
        "Designed professor availability forms and admin dashboards so stakeholders could update slots without spreadsheets.",
        "Built conflict-detection logic in PHP with MySQL transactions to ensure classrooms and faculty were not double booked.",
        "Exported finalized schedules to printable templates and email notifications, reducing manual effort for department coordinators.",
      ],
      techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    },
  ];

  const pageUrl = `${url}projects/`;
  const seoDescription =
    "Highlighted projects from Arpit Sharma covering AI travel planning, FPGA processors, machine learning pipelines, and this portfolio.";

  return (
    <>
      <SEO
        title="Projects | Arpit Sharma"
        description={seoDescription}
        keywords={[
          "Arpit Sharma projects",
          "AI travel assistant",
          "FPGA processor project",
          "Machine learning crop yield",
          "React portfolio project",
        ]}
        image={`${url}Project/Portfolio.png`}
        url={pageUrl}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Highlighted Projects - Arpit Sharma",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              url: pageUrl,
              image: project.image,
            },
          })),
        }}
      />
      <div className="flex flex-col gap-12 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageSection
          eyebrow="Case studies & builds"
          title="Projects"
          description="A curated selection of my work ranging from AI copilots to FPGA research. Different canvases, driven by the same engineering discipline."
          align="left"
        >
          <div className="grid gap-8 lg:grid-cols-2 mt-4 xl:gap-10">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-white/[0.015] shadow-sm transition-all hover:border-slate-600 hover:shadow-md h-full"
              >
                <div className="relative h-56 w-full overflow-hidden border-b border-slate-800 shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  <div className="absolute left-4 top-4 rounded-md border border-slate-600/50 bg-slate-900/60 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-slate-200 backdrop-blur-md shadow-sm">
                    {project.timeline}
                  </div>
                </div>
                
                <div className="relative flex flex-col flex-grow p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-slate-100 mb-3">{project.title}</h3>
                  <p className="text-[15px] leading-relaxed text-slate-400 mb-6 flex-grow">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 border border-slate-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded-md bg-slate-800/30 border border-slate-700 px-2.5 py-1 text-xs font-mono text-slate-400">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
                    <div className="flex flex-wrap gap-3">
                      {(project.repos ?? []).map((repo) => (
                        <a
                          key={repo.url}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-brand-sapphire transition-colors"
                        >
                          <FiGithub /> {repo.label}
                        </a>
                      ))}
                    </div>

                    <button
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-colors hover:bg-slate-700"
                      onClick={() => setExpandedProject(index)}
                    >
                      Details <FiArrowUpRight />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </PageSection>

        {expandedProject !== null && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm lg:pl-[22rem]"
            onClick={() => setExpandedProject(null)}
          >
            <div
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-8 text-slate-200 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                onClick={() => setExpandedProject(null)}
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>

              <div className="h-48 sm:h-64 mb-6 -mx-8 -mt-8 overflow-hidden rounded-t-2xl border-b border-slate-700 relative">
                <img
                  src={projects[expandedProject].image}
                  alt={projects[expandedProject].title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100 pr-10">{projects[expandedProject].title}</h3>
              <p className="mt-3 text-sm font-mono tracking-widest text-slate-400 uppercase">
                {projects[expandedProject].timeline}
              </p>
              
              <p className="mt-6 text-[15px] leading-relaxed text-slate-300 border-l-2 border-brand-sapphire pl-4">
                {projects[expandedProject].description}
              </p>

              <ul className="mt-8 space-y-4">
                {projects[expandedProject].details.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-4 text-[15px] text-slate-300 leading-relaxed"
                  >
                    <FiTarget className="mt-1 shrink-0 text-brand-sapphire" size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-slate-800">
                <p className="text-xs uppercase tracking-widest font-mono text-slate-500 mb-4">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {projects[expandedProject].techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 border border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {(projects[expandedProject].repos ?? []).map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-brand-sapphire px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
                  >
                    <FiGithub /> {repo.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
