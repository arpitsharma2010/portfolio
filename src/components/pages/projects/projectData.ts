import type { MinecraftIconName, MinecraftItem } from "../../minecraft/types";
import { ASSET_BASE } from "../../../utils/constants";

/**
 * Single source for the Projects section: selector, panel, tooltips and tests all read from here.
 * Every statement is taken from the project copy already on the site; nothing is added from older resumes.
 */
export type ProjectTheme = "cartographer" | "vault" | "workbench" | "circuit" | "farm" | "library";

export interface ProjectLink { label: string; url: string }

interface ArchitectureSeed {
  id: string;
  itemName: string;
  icon: MinecraftIconName;
  /** The architectural part this item stands for. */
  label: string;
  /** One-line tooltip lore. */
  tip: string;
  details: string;
  technologies: string[];
}

export interface ArchitectureItem extends MinecraftItem, ArchitectureSeed {}

interface ProjectSeed {
  id: string;
  title: string;
  summary: string;
  theme: ProjectTheme;
  /** Minecraft container name shown on the selector. */
  container: string;
  badge: MinecraftIconName;
  image?: string;
  problem: string;
  built: string;
  challenge?: string;
  outcome?: string;
  stack: string[];
  links: ProjectLink[];
  defaultItemId: string;
  items: ArchitectureSeed[];
}

export interface ProjectDefinition extends Omit<ProjectSeed, "items"> {
  items: ArchitectureItem[];
}

const seeds: ProjectSeed[] = [
  {
    id: "wandergenie",
    title: "WanderGenie",
    summary: "Multi-agent LLM travel assistant",
    theme: "cartographer",
    container: "Cartographer Chest",
    badge: "compass",
    image: `${ASSET_BASE}Project/WanderGenie.jpeg`,
    problem: "A travel assistant that plans a trip by reasoning over real data instead of improvising an answer from the model's weights alone.",
    built: "Three specialised agents coordinated with LangGraph, orchestrating four external tools and APIs across multi-step workflows. Retrieval is hybrid: pgvector for semantic similarity over embeddings, Neo4j for the relationships between places, combined with live external travel data before any recommendation is generated. Packaged with Docker and deployed on AWS.",
    challenge: "Multi-agent graphs fail by looping: one agent hands work to another and the pair never terminates. Constraining the graph so each step either makes progress or hands back a deterministic fallback was the real engineering problem, not the prompting.",
    stack: ["Python", "LangGraph", "OpenAI APIs", "pgvector", "Neo4j", "Embeddings", "Hybrid RAG", "Docker", "AWS"],
    links: [
      { label: "GitHub", url: "https://github.com/arpitsharma2010/WanderGenie-ai-travel-assistant" },
      { label: "DevPost", url: "https://devpost.com/software/wandergenie-ai-travel-assistant" },
    ],
    defaultItemId: "wg-planner",
    items: [
      { id: "wg-planner", itemName: "Compass", icon: "compass", label: "Trip Planner", tip: "Plans trips from real data", technologies: ["Python", "OpenAI APIs"],
        details: "Plans a trip by reasoning over real data instead of improvising an answer from the model's weights alone." },
      { id: "wg-agents", itemName: "Enchanted Book", icon: "enchanted-book", label: "Agent Orchestration", tip: "Three agents, one graph", technologies: ["LangGraph"],
        details: "Three specialised agents coordinated with LangGraph across multi-step workflows." },
      { id: "wg-tools", itemName: "Map", icon: "map", label: "Tools & Live Travel Data", tip: "Four external tools and APIs", technologies: ["LangGraph"],
        details: "The agents orchestrate four external tools and APIs, and live external travel data is combined with retrieval before any recommendation is generated." },
      { id: "wg-vector", itemName: "Ender Chest", icon: "ender-chest", label: "Semantic Retrieval", tip: "Similarity over embeddings", technologies: ["pgvector", "Embeddings"],
        details: "pgvector provides semantic similarity search over embeddings." },
      { id: "wg-graph", itemName: "Redstone Dust", icon: "redstone-dust", label: "Place Graph", tip: "Relationships between places", technologies: ["Neo4j"],
        details: "Neo4j holds the relationships between places." },
      { id: "wg-rag", itemName: "Potion", icon: "potion", label: "Hybrid RAG", tip: "Vector + graph + live data", technologies: ["Hybrid RAG"],
        details: "Retrieval is hybrid: pgvector similarity and Neo4j relationships are combined with live external travel data before any recommendation is generated." },
      { id: "wg-guard", itemName: "Shield", icon: "shield", label: "Loop Guard", tip: "Progress or a deterministic fallback", technologies: ["LangGraph"],
        details: "Multi-agent graphs fail by looping. The graph is constrained so each step either makes progress or hands back a deterministic fallback." },
      { id: "wg-docker", itemName: "Barrel", icon: "barrel", label: "Packaging", tip: "Containerised service", technologies: ["Docker"],
        details: "Packaged with Docker." },
      { id: "wg-aws", itemName: "Command Block", icon: "command-cube", label: "Deployment", tip: "Deployed on AWS", technologies: ["AWS"],
        details: "Deployed on AWS." },
    ],
  },
  {
    id: "taco-db",
    title: "Taco-DB",
    summary: "Relational database system in C++",
    theme: "vault",
    container: "Redstone Storage Vault",
    badge: "redstone-dust",
    problem: "A working relational database engine written from scratch in C++: storage, indexing and query execution, not a wrapper over an existing one.",
    built: "Disk-based storage with a buffer pool for caching pages in memory, a B+ Tree index for record retrieval and updates, and a Volcano-style iterator execution engine. Ordering and joins are handled by external merge sort and hash joins, so datasets larger than memory still process.",
    challenge: "The gain came from the algorithms and the I/O pattern, which is the whole argument for understanding the layer underneath the query.",
    outcome: "Up to a 10x query-processing improvement on large datasets, from replacing nested-loop joins with hash joins and sorting externally rather than in memory.",
    stack: ["C++", "B+ Tree", "Buffer Pool", "Volcano Model", "External Merge Sort", "Hash Joins", "POSIX I/O"],
    links: [],
    defaultItemId: "tdb-storage",
    items: [
      { id: "tdb-storage", itemName: "Chest", icon: "chest", label: "Disk Storage", tip: "Disk-based record storage", technologies: ["C++", "POSIX I/O"],
        details: "Disk-based storage written from scratch in C++, not a wrapper over an existing engine." },
      { id: "tdb-buffer", itemName: "Hopper", icon: "hopper", label: "Buffer Pool", tip: "Caches pages in memory", technologies: ["Buffer Pool"],
        details: "A buffer pool caches pages in memory." },
      { id: "tdb-index", itemName: "Map", icon: "map", label: "B+ Tree Index", tip: "Record retrieval and updates", technologies: ["B+ Tree"],
        details: "A B+ Tree index handles record retrieval and updates." },
      { id: "tdb-exec", itemName: "Repeater", icon: "repeater", label: "Execution Engine", tip: "Volcano-style iterators", technologies: ["Volcano Model"],
        details: "Queries run through a Volcano-style iterator execution engine." },
      { id: "tdb-sort", itemName: "Furnace", icon: "furnace", label: "External Merge Sort", tip: "Sorts larger-than-memory data", technologies: ["External Merge Sort"],
        details: "Ordering uses external merge sort, so datasets larger than memory still process." },
      { id: "tdb-join", itemName: "Anvil", icon: "anvil", label: "Hash Joins", tip: "Replaced nested-loop joins", technologies: ["Hash Joins"],
        details: "Hash joins replaced nested-loop joins." },
      { id: "tdb-perf", itemName: "Clock", icon: "clock", label: "Query Performance", tip: "Up to 10x faster", technologies: ["Hash Joins", "External Merge Sort"],
        details: "Hash joins and external sorting produced up to a 10x query-processing improvement on large datasets." },
    ],
  },
  {
    id: "pintos",
    title: "Pintos Kernel",
    summary: "Kernel components for an 80x86 instructional OS",
    theme: "workbench",
    container: "Engineering Anvil Chest",
    badge: "anvil",
    problem: "Kernel components for an 80x86 instructional operating system.",
    built: "A priority scheduler with donation, a system-call interface with user-memory validation, and semaphore-based process synchronisation.",
    stack: ["C", "x86 Assembly", "GDB"],
    links: [],
    defaultItemId: "pk-scheduler",
    items: [
      { id: "pk-scheduler", itemName: "Clock", icon: "clock", label: "Priority Scheduler", tip: "Decides which thread runs", technologies: ["C"],
        details: "A priority scheduler for the kernel's threads." },
      { id: "pk-donation", itemName: "Experience Bottle", icon: "experience-bottle", label: "Priority Donation", tip: "Priorities passed on", technologies: ["C"],
        details: "The priority scheduler supports donation." },
      { id: "pk-syscalls", itemName: "Command Block", icon: "command-cube", label: "System Calls", tip: "User-to-kernel interface", technologies: ["C", "x86 Assembly"],
        details: "A system-call interface between user programs and the kernel." },
      { id: "pk-memory", itemName: "Shield", icon: "shield", label: "User-Memory Validation", tip: "Checks user pointers", technologies: ["C"],
        details: "The system-call interface validates user memory." },
      { id: "pk-sync", itemName: "Redstone Dust", icon: "redstone-dust", label: "Synchronisation", tip: "Semaphore-based", technologies: ["C"],
        details: "Semaphore-based process synchronisation." },
      { id: "pk-tools", itemName: "Anvil", icon: "anvil", label: "Kernel Toolchain", tip: "C, x86 Assembly, GDB", technologies: ["C", "x86 Assembly", "GDB"],
        details: "Written in C and x86 Assembly, debugged with GDB." },
    ],
  },
  {
    id: "risc-cpu",
    title: "16-bit RISC-style CPU",
    summary: "Single-cycle processor in Verilog on an FPGA",
    theme: "circuit",
    container: "Redstone Computer",
    badge: "repeater",
    problem: "A single-cycle 16-bit processor with its own instruction set, built in hardware rather than software.",
    built: "A single-cycle 16-bit processor in Verilog with a custom ISA, ALU, register file and control unit.",
    outcome: "Validated in simulation and then flashed to a Basys3 FPGA.",
    stack: ["Verilog", "Vivado", "FPGA"],
    links: [{ label: "GitHub", url: "https://github.com/arpitsharma2010/micro16-fpga-core" }],
    defaultItemId: "cpu-core",
    items: [
      { id: "cpu-core", itemName: "Repeater", icon: "repeater", label: "Single-Cycle Core", tip: "16-bit, one cycle per instruction", technologies: ["Verilog"],
        details: "A single-cycle 16-bit processor written in Verilog." },
      { id: "cpu-isa", itemName: "Scroll", icon: "scroll", label: "Custom ISA", tip: "Its own instruction set", technologies: ["Verilog"],
        details: "The processor implements a custom instruction set architecture." },
      { id: "cpu-alu", itemName: "Redstone Dust", icon: "redstone-dust", label: "ALU", tip: "Arithmetic and logic", technologies: ["Verilog"],
        details: "An arithmetic logic unit built as part of the core." },
      { id: "cpu-regs", itemName: "Chest", icon: "chest", label: "Register File", tip: "On-chip registers", technologies: ["Verilog"],
        details: "A register file built as part of the core." },
      { id: "cpu-control", itemName: "Redstone Torch", icon: "redstone-torch", label: "Control Unit", tip: "Drives the datapath", technologies: ["Verilog"],
        details: "A control unit built as part of the core." },
      { id: "cpu-sim", itemName: "Book", icon: "book", label: "Simulation", tip: "Validated before hardware", technologies: ["Vivado"],
        details: "The design was validated in simulation before going to hardware." },
      { id: "cpu-fpga", itemName: "Command Block", icon: "command-cube", label: "FPGA Deployment", tip: "Flashed to a Basys3", technologies: ["FPGA"],
        details: "After simulation, the processor was flashed to a Basys3 FPGA." },
    ],
  },
  {
    id: "crop-yield",
    title: "Crop Yield Prediction",
    summary: "End-to-end ML pipeline over environmental data",
    theme: "farm",
    container: "Farming Barrel",
    badge: "hoe",
    problem: "Predicting crop yield from environmental data.",
    built: "An end-to-end ML pipeline over environmental data, scaled with PySpark and served for real-time inference behind a Flask API.",
    stack: ["Python", "PySpark", "Scikit-learn", "Flask"],
    links: [{ label: "GitHub", url: "https://github.com/arpitsharma2010/Crop-Yield-Prediction" }],
    defaultItemId: "cy-data",
    items: [
      { id: "cy-data", itemName: "Hoe", icon: "hoe", label: "Environmental Data", tip: "The pipeline's input", technologies: ["Python"],
        details: "The pipeline runs over environmental data." },
      { id: "cy-spark", itemName: "Furnace", icon: "furnace", label: "Scaled Pipeline", tip: "Scaled with PySpark", technologies: ["PySpark"],
        details: "The end-to-end pipeline is scaled with PySpark." },
      { id: "cy-model", itemName: "Potion", icon: "potion", label: "ML Model", tip: "Scikit-learn", technologies: ["Scikit-learn"],
        details: "The machine-learning model is built with Scikit-learn." },
      { id: "cy-api", itemName: "Axe", icon: "axe", label: "Inference API", tip: "Real-time predictions", technologies: ["Flask"],
        details: "Predictions are served for real-time inference behind a Flask API." },
      { id: "cy-python", itemName: "Emerald", icon: "emerald", label: "Language", tip: "Python end to end", technologies: ["Python"],
        details: "The pipeline is written in Python." },
    ],
  },
  {
    id: "library",
    title: "Library Management System",
    summary: "Full-stack system with role-based dashboards",
    theme: "library",
    container: "Library Bookshelf",
    badge: "enchanted-book",
    problem: "A library system that administrators and borrowers both sign into, each with their own view.",
    built: "A full-stack system with JWT/OAuth authentication and role-based dashboards for administrators and borrowers.",
    stack: ["Java", "Spring Boot", "React", "SQL"],
    links: [
      { label: "Frontend on GitHub", url: "https://github.com/arpitsharma2010/react-library-project" },
      { label: "API on GitHub", url: "https://github.com/arpitsharma2010/spring-boot-library" },
    ],
    defaultItemId: "lib-system",
    items: [
      { id: "lib-system", itemName: "Book", icon: "book", label: "Full-Stack System", tip: "Admins and borrowers", technologies: ["Java", "React"],
        details: "A full-stack library system used by administrators and borrowers." },
      { id: "lib-api", itemName: "Iron Pickaxe", icon: "iron-pickaxe", label: "Spring Boot API", tip: "Java backend", technologies: ["Java", "Spring Boot"],
        details: "The backend is a Spring Boot API written in Java." },
      { id: "lib-jwt", itemName: "Name Tag", icon: "name-tag", label: "JWT Authentication", tip: "Token-based auth", technologies: ["JWT"],
        details: "Authentication uses JWT." },
      { id: "lib-oauth", itemName: "Portal", icon: "portal", label: "OAuth Sign-in", tip: "OAuth authentication", technologies: ["OAuth"],
        details: "OAuth sign-in alongside JWT authentication." },
      { id: "lib-roles", itemName: "Shield", icon: "shield", label: "Role-Based Dashboards", tip: "Admin and borrower views", technologies: ["React"],
        details: "Role-based dashboards for administrators and borrowers." },
      { id: "lib-ui", itemName: "Crafting Table", icon: "crafting-table", label: "React Frontend", tip: "The dashboards' UI", technologies: ["React"],
        details: "The front end is built in React." },
      { id: "lib-db", itemName: "Barrel", icon: "barrel", label: "SQL Storage", tip: "Relational data", technologies: ["SQL"],
        details: "Data is stored in a SQL database." },
    ],
  },
];

export const projects: readonly ProjectDefinition[] = seeds.map((project) => ({
  ...project,
  items: project.items.map((item) => ({
    ...item,
    name: item.itemName,
    category: item.label,
    lore: [item.tip],
    description: project.title,
  })),
}));

export const DEFAULT_PROJECT_ID = "wandergenie";
