import React from "react";
import { FiExternalLink } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { ASSET_BASE } from "../../utils/constants";

type Link = { label: string; url: string };

type Featured = {
  title: string;
  tagline: string;
  image?: string;
  built: string;
  architecture: string;
  challenge: string;
  stack: string[];
  links: Link[];
};

const featured: Featured[] = [
  {
    title: "WanderGenie",
    tagline: "Multi-agent LLM travel assistant",
    image: `${ASSET_BASE}Project/WanderGenie.jpeg`,
    built:
      "A travel assistant that plans a trip by reasoning over real data instead of improvising an answer from the model's weights alone.",
    architecture:
      "Three specialised agents coordinated with LangGraph, orchestrating four external tools and APIs across multi-step workflows. Retrieval is hybrid: pgvector for semantic similarity over embeddings, Neo4j for the relationships between places, combined with live external travel data before any recommendation is generated. Packaged with Docker and deployed on AWS.",
    challenge:
      "Multi-agent graphs fail by looping — one agent hands work to another and the pair never terminates. Constraining the graph so each step either makes progress or hands back a deterministic fallback was the real engineering problem, not the prompting.",
    stack: [
      "Python",
      "LangGraph",
      "OpenAI APIs",
      "pgvector",
      "Neo4j",
      "Embeddings",
      "Hybrid RAG",
      "Docker",
      "AWS",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/arpitsharma2010/WanderGenie-ai-travel-assistant" },
      { label: "DevPost", url: "https://devpost.com/software/wandergenie-ai-travel-assistant" },
    ],
  },
  {
    title: "Taco-DB",
    tagline: "Relational database system in C++",
    built:
      "A working relational database engine written from scratch in C++ — storage, indexing and query execution, not a wrapper over an existing one.",
    architecture:
      "Disk-based storage with a buffer pool for caching pages in memory, a B+ Tree index for record retrieval and updates, and a Volcano-style iterator execution engine. Ordering and joins are handled by external merge sort and hash joins, so datasets larger than memory still process.",
    challenge:
      "Replacing nested-loop joins with hash joins and sorting externally rather than in memory produced up to a 10x query-processing improvement on large datasets. The gain came from the algorithms and the I/O pattern, which is the whole argument for understanding the layer underneath the query.",
    stack: [
      "C++",
      "B+ Tree",
      "Buffer Pool",
      "Volcano Model",
      "External Merge Sort",
      "Hash Joins",
      "POSIX I/O",
    ],
    links: [],
  },
];

const alsoBuilt = [
  {
    title: "Pintos Kernel",
    description:
      "Kernel components for an 80x86 instructional OS: a priority scheduler with donation, a system-call interface with user-memory validation, and semaphore-based process synchronisation.",
    stack: ["C", "x86 Assembly", "GDB"],
    links: [] as Link[],
  },
  {
    title: "16-bit RISC-style CPU",
    description:
      "A single-cycle 16-bit processor in Verilog — custom ISA, ALU, register file and control unit — validated in simulation and then flashed to a Basys3 FPGA.",
    stack: ["Verilog", "Vivado", "FPGA"],
    links: [{ label: "GitHub", url: "https://github.com/arpitsharma2010/micro16-fpga-core" }],
  },
  {
    title: "Crop Yield Prediction",
    description:
      "End-to-end ML pipeline over environmental data, scaled with PySpark and served for real-time inference behind a Flask API.",
    stack: ["Python", "PySpark", "Scikit-learn", "Flask"],
    links: [{ label: "GitHub", url: "https://github.com/arpitsharma2010/Crop-Yield-Prediction" }],
  },
  {
    title: "Library Management System",
    description:
      "Full-stack system with JWT/OAuth authentication and role-based dashboards for administrators and borrowers.",
    stack: ["Java", "Spring Boot", "React", "SQL"],
    links: [
      { label: "Frontend", url: "https://github.com/arpitsharma2010/react-library-project" },
      { label: "API", url: "https://github.com/arpitsharma2010/spring-boot-library" },
    ],
  },
];

const linkClass =
  "inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 underline-offset-4 hover:underline dark:text-sky-400";

const stackList = (stack: string[]) => (
  <ul className="flex flex-wrap gap-2">
    {stack.map((tech) => (
      <li
        key={tech}
        className="rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
      >
        {tech}
      </li>
    ))}
  </ul>
);

const Detail: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
      {label}
    </p>
    <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{children}</p>
  </div>
);

const Projects: React.FC = () => (
  <PageSection
    eyebrow="Projects"
    title="Selected projects"
    description="Two builds that show how I approach architecture, plus the systems and ML work behind them."
  >
    <div className="flex flex-col gap-8">
      {featured.map((project) => (
        <article
          key={project.title}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40"
        >
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} interface`}
              className="h-44 w-full border-b border-slate-200 object-cover dark:border-slate-800 sm:h-56"
              loading="lazy"
            />
          )}
          <div className="flex flex-col gap-5 p-6 sm:p-7">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {project.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-blue-700 dark:text-sky-400">
                {project.tagline}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {project.built}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 dark:border-slate-800">
              <Detail label="Architecture">{project.architecture}</Detail>
              <Detail label="Engineering challenge">{project.challenge}</Detail>
            </div>

            {stackList(project.stack)}

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-5">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.label} <FiExternalLink aria-hidden />
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}

      <div className="flex flex-col gap-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
          Also built
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {alsoBuilt.map((project) => (
            <article
              key={project.title}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {project.title}
              </h4>
              <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
              {stackList(project.stack)}
              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label} <FiExternalLink aria-hidden />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  </PageSection>
);

export default Projects;
