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
      "Multi-agent graphs fail by looping: one agent hands work to another and the pair never terminates. Constraining the graph so each step either makes progress or hands back a deterministic fallback was the real engineering problem, not the prompting.",
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
      "A working relational database engine written from scratch in C++: storage, indexing and query execution, not a wrapper over an existing one.",
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
      "A single-cycle 16-bit processor in Verilog with a custom ISA, ALU, register file and control unit, validated in simulation and then flashed to a Basys3 FPGA.",
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
  "project-link";

const stackList = (stack: string[]) => (
  <ul className="loot-list">
    {stack.map((tech) => (
      <li
        key={tech}
        className="loot-tag"
      >
        {tech}
      </li>
    ))}
  </ul>
);

const Detail: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="build-detail">
    <p>{label}</p>
    <p>{children}</p>
  </div>
);

const Projects: React.FC = () => (
  <PageSection
    eyebrow="Build Showcase"
    title="Engineered worlds"
    description="Two builds that show how I approach architecture, plus the systems and ML work behind them."
    variant="grass"
  >
    <div className="build-showcase">
      {featured.map((project) => (
        <article
          key={project.title}
          className={`build-card build-card--${project.title === "WanderGenie" ? "cartographer" : "vault"}`}
        >
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} interface`}
              className="build-card__image"
              loading="lazy"
            />
          )}
          <div className="build-card__body">
            <div>
              <p className="build-card__biome">{project.title === "WanderGenie" ? "Cartographer's Room · Exploration Biome" : "Redstone Storage Vault"}</p>
              <h3>
                {project.title}
              </h3>
              <p className="build-card__tagline">
                {project.tagline}
              </p>
              <p className="build-card__intro">
                {project.built}
              </p>
            </div>

            <div className="build-card__details">
              <Detail label="Architecture">{project.architecture}</Detail>
              <Detail label="Engineering challenge">{project.challenge}</Detail>
            </div>

            {stackList(project.stack)}

            {project.links.length > 0 && (
              <div className="build-card__links">
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

      <div className="secondary-builds">
        <h3>
          Additional builds
        </h3>
        <div className="secondary-builds__grid">
          {alsoBuilt.map((project) => (
            <article
              key={project.title}
              className={`mini-build mini-build--${project.title === "Pintos Kernel" ? "redstone" : project.title === "Crop Yield Prediction" ? "farming" : "workshop"}`}
            >
              <p className="mini-build__type">{project.title === "Pintos Kernel" ? "Redstone Engineering Lab" : project.title === "Crop Yield Prediction" ? "Farming Biome" : "Workshop Build"}</p>
              <h4>
                {project.title}
              </h4>
              <p className="mini-build__description">
                {project.description}
              </p>
              {stackList(project.stack)}
              {project.links.length > 0 && (
                <div className="build-card__links">
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
