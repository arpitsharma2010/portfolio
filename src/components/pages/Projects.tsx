import React, { useState } from "react";
import { FiArrowUpRight, FiGithub, FiTarget } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";

interface ProjectsProps {
  url: string;
}

const Projects: React.FC<ProjectsProps> = ({ url }) => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: "WanderGenie - AI Travel Planning Engine",
      image: `${url}Project/WanderGenie.jpeg`,
      description:
        "Full-stack AI travel assistant built at UBHacking 2025 that turns natural-language prompts into time-aware itineraries with maps, POIs and booking links.",
      timeline: "Nov 2025",
      details: [
        "Engineered a multi-agent LangGraph workflow (Planner → Researcher → Packager) so complex trips are decomposed into verifiable subtasks before packaging the final plan.",
        "Grounded itineraries using Neo4j for POI relationships plus Supabase pgvector for semantic retrieval, eliminating hallucinations and keeping recommendations geographically accurate.",
        "Built the React + TypeScript frontend with interactive maps and timeline cards sourced directly from dynamically assembled itinerary metadata.",
        "Implemented a FastAPI backend powered by AWS Nova Pro with GPT-4o-mini fallback to guarantee low-latency inference during hackathon load tests.",
        "Deployed via AWS Amplify (frontend), AWS EC2 + API Gateway (backend routing), integrating OpenTripMap data for rich points of interest.",
      ],
      techStack: [
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "LangGraph",
        "AWS Bedrock (Nova Pro)",
        "GPT-4o-mini",
        "Neo4j",
        "Supabase pgvector",
        "OpenTripMap API",
        "AWS Amplify",
        "AWS EC2",
        "AWS API Gateway",
      ],
      repos: [
        { label: "GitHub", url: "https://github.com/arpitsharma2010/WanderGenie-ai-travel-assistant" },
        { label: "DevPost", url: "https://devpost.com/software/wandergenie-ai-travel-assistant" },
      ],
    },
    {
      title: "Custom 16-bit Processor on FPGA",
      image: `${url}Project/Microprocessor.png`,
      description:
        "Graduate research project translating Verilog fundamentals into a working single-cycle RISC CPU with a 10-instruction ISA on a Basys3 FPGA exactly as described in my resume.",
      timeline: "Feb 2025 – Apr 2025",
      details: [
        "Architected modular datapath components (ALU, register file, control logic, instruction/data memory) so each block could be tested independently before integrating the processor.",
        "Implemented a two-button stepping mechanism first button exposes rt/rd register values on the 7-segment display, second executes the instruction allowing professors to follow state transitions in real time.",
        "Validated arithmetic, memory and control-flow instructions (ADDI, LW, SW, BEQ, BNE, JMP) via RTL simulation and Xilinx Vivado before flashing to hardware, mirroring the verification workflow called out on my resume.",
      ],
      techStack: ["Verilog", "Xilinx Vivado", "Basys3 FPGA", "Digital Logic Design"],
      repos: [{ label: "GitHub", url: "https://github.com/arpitsharma2010/micro16-fpga-core" }],
    },
    {
      title: "Crop Yield Prediction and Analysis",
      image: `${url}Project/CropYieldMainpage.jpeg`,
      description:
        "Machine learning pipeline that cleans agricultural datasets, compares models and deploys the best performer via a Flask web interface to provide real-time yield predictions for non-technical stakeholders.",
      timeline: "Sep 2024 – Nov 2024",
      details: [
        "Processed rainfall, soil and crop attributes using Pandas and PySpark; performed EDA with Seaborn/Matplotlib to expose trends and correlations highlighted in my resume.",
        "Trained Linear Regression, KNN, Random Forest and XGBoost models with Scikit-learn, ultimately selecting the Random Forest approach for its documented accuracy.",
        "Served predictions through a Flask app backed by HTML/CSS so growers and policymakers could submit field data and receive guidance instantly without touching notebooks.",
      ],
      techStack: ["Python", "Flask", "Pandas", "PySpark", "Scikit-learn", "Random Forest"],
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

  return (
    <section className="flex flex-col gap-10 text-white">
      <PageSection
        eyebrow="Case studies & builds"
        title="Projects"
        description="Hands-on work ranging from AI copilots to FPGA research. Same engineering discipline, just different canvases."
        align="center"
      >
        <></>
      </PageSection>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.05] shadow-[0_25px_80px_rgba(0,0,0,0.55)] transition hover:-translate-y-1"
          >
            <div className="absolute inset-x-6 top-6 h-32 rounded-[2rem] bg-gradient-to-r from-plasma/20 to-transparent blur-3xl opacity-0 transition group-hover:opacity-100" />
            <div className="relative h-60 overflow-hidden rounded-b-[2.5rem] rounded-t-[2.2rem]">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-white backdrop-blur">
                {project.timeline}
              </div>
            </div>
            <div className="relative z-10 flex flex-col gap-4 p-6">
              <div>
                <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
              </div>
              <p className="text-sm text-slate-200">{project.description}</p>

              <ul className="space-y-2 text-sm text-slate-200">
                {project.details.slice(0, 2).map((detail) => (
                  <li key={detail} className="flex items-start gap-2">
                    <FiTarget className="mt-1 shrink-0 text-ion" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 text-xs">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold uppercase tracking-[0.2em] text-text-mute"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="rounded-full border border-dashed border-ion/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-ion">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {(project.repos ?? []).map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:border-ion/60"
                  >
                    <FiGithub /> {repo.label}
                  </a>
                ))}
              </div>

              <button
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-plasma to-ion px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-glow-sm"
                onClick={() => setExpandedProject(index)}
              >
                Build notes <FiArrowUpRight />
              </button>
            </div>
          </article>
        ))}
      </div>

      {expandedProject !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-2xl lg:pl-[22rem]"
          onClick={() => setExpandedProject(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-y-auto rounded-[2rem] border border-white/10 bg-panel-dark p-8 text-white shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 rounded-full border border-white/10 p-2 text-xl text-white hover:border-flare/50 hover:text-flare"
              onClick={() => setExpandedProject(null)}
            >
              ✕
            </button>

            <img
              src={projects[expandedProject].image}
              alt={projects[expandedProject].title}
              className="mb-4 h-56 w-full rounded-[1.5rem] object-cover"
            />
            <h3 className="text-3xl font-bold text-ion">{projects[expandedProject].title}</h3>
            <p className="mt-1 text-sm text-text-mute">
              <strong>Timeline:</strong> {projects[expandedProject].timeline}
            </p>
            <p className="mt-3 text-sm text-slate-200">{projects[expandedProject].description}</p>

            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-100">
              {projects[expandedProject].details.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <FiTarget className="mt-0.5 shrink-0 text-ion" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.4em] text-text-mute">Tech stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {projects[expandedProject].techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-text-mute"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {(projects[expandedProject].repos ?? []).map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-ion/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ion"
                >
                  <FiGithub /> {repo.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
