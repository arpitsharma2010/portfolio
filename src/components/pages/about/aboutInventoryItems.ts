import type { MinecraftIconName, MinecraftItem } from "../../minecraft/types";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION, NAME, RESUME_URL } from "../../../utils/constants";

/** One factual source per item: the tooltip reads `lore`, the detail panel reads `summary` + `lore`. */
export interface AboutItem extends MinecraftItem {
  summary: string;
  /** Equipment slot name, for equipment items only. */
  slot?: string;
}

export const equipmentItems: AboutItem[] = [
  {
    id: "ai",
    slot: "Head",
    name: "Enchanted Book",
    icon: "enchanted-book",
    category: "AI / LLM Applications",
    rarity: "enchanted",
    lore: ["RAG · OpenAI APIs", "14 validation schemas", "21 fallback paths"],
    summary: "Backend and RAG services for resume ingestion, ATS analysis, and career Q&A at Skopus AI. Hardened 8 OpenAI operations with 14 validation schemas, evidence-backed parsing, and 21 fallback paths.",
  },
  {
    id: "backend",
    slot: "Chest",
    name: "Diamond Pickaxe",
    icon: "diamond-pickaxe",
    category: "Backend Engineering",
    rarity: "rare",
    lore: ["REST APIs · Microservices", "Concurrency · Caching", "SQL-backed pagination"],
    summary: "Backend engineering across banking, research, and applied AI: REST API contracts, query performance, service boundaries, concurrency, and caching. Improved API performance across 5+ DNB services and eliminated an N+1 query pattern in Tesserae.",
  },
  {
    id: "distributed",
    slot: "Legs",
    name: "Redstone Dust",
    icon: "redstone-dust",
    category: "Distributed & Event-Driven Systems",
    lore: ["Event-driven architecture", "AWS ECS · SNS · SQS", "Cross-process cancellation"],
    summary: "Designed event-driven pricing and investment processing with AWS ECS, SNS, and SQS at TCS (DNB). At Tesserae, implemented cancellation across 7 long-running search pipelines from React through Flask to cross-process workers.",
  },
  {
    id: "cloud",
    slot: "Feet",
    name: "Compass",
    icon: "compass",
    category: "Cloud, DevOps & Delivery",
    lore: ["AWS · Docker · Terraform", "GitLab CI/CD · GitHub Actions", "Health validation · Rollback"],
    summary: "Delivered 20+ releases through ST, SIT, UAT, and Production using GitLab CI/CD and Terraform at TCS (DNB). At Skopus AI, automated TEST and PROD ECS deployments with GitHub Actions, OIDC, health validation, and rollback controls.",
  },
];

export const craftingResult: AboutItem = {
  id: "result",
  name: "Software Engineer",
  icon: "netherite-pickaxe",
  category: "Crafted from all four",
  rarity: "epic",
  lore: ["Backend-heavy full stack", "Distributed systems", "Cloud-native delivery", "AI / LLM applications"],
  summary:
    "The four strengths combine into one profile: a backend-heavy full-stack engineer who owns services from API design to production, built across enterprise, academic and personal projects.",
};

export const inventoryItems: AboutItem[] = [
  {
    id: "overview",
    name: "Name Tag",
    icon: "name-tag",
    category: "Player Overview",
    lore: [NAME, "Software Engineer", "4+ years in production"],
    summary: "Software Engineer with 4+ years of experience building backend, full-stack, cloud-native, and distributed systems across financial services, research, and applied AI.",
  },
  {
    id: "career",
    name: "Map",
    icon: "map",
    category: "Career Journey",
    lore: ["Skopus AI · May 2026 – Present", "University at Buffalo (Tesserae) · Feb 2026 – Present", "Tata Consultancy Services · Nov 2020 – Jul 2024"],
    summary:
      "Founding Engineer at Skopus AI, Software Engineer on the Tesserae research platform at the University at Buffalo, and, at Tata Consultancy Services, Software Engineer I and II on DNB's wealth-management platform.",
  },
  {
    id: "education",
    name: "Book",
    icon: "book",
    category: "Education",
    lore: ["M.S. Computer Science & Engineering", "University at Buffalo, SUNY", "GPA 3.77 / 4", "Aug 2024 – Dec 2025"],
    summary:
      "Graduate coursework across operating systems, database management systems, data intensive computing, computer security and machine learning, on top of a B.E. in Computer Science & Engineering from Sant Gadge Baba Amravati University.",
  },
  {
    id: "certifications",
    name: "Gold Ingot",
    icon: "gold-ingot",
    category: "Certifications",
    quantity: 3,
    lore: ["AWS Solutions Architect, Associate", "AWS Cloud Practitioner", "Azure Fundamentals"],
    summary: "Three cloud certifications from Amazon Web Services and Microsoft, each verifiable on Credly from the Education section.",
  },
  {
    id: "projects",
    name: "Chest",
    icon: "chest",
    category: "Projects",
    lore: ["Skopus AI · AI career platform", "WanderGenie · multi-agent travel", "Taco-DB · C++ database", "Library system · Java/Spring Boot"],
    summary: "Applied AI and systems projects spanning Skopus AI, a LangGraph travel assistant, a C++ relational database, and a Java/Spring Boot library system.",
  },
  {
    id: "fullstack",
    name: "Crafting Table",
    icon: "crafting-table",
    category: "Frontend & Full Stack",
    lore: ["React · TypeScript", "Next.js", "25+ reusable components"],
    summary:
      "I build the front end for the APIs I write when the work needs it: 25+ reusable React and TypeScript components across 10+ responsive screens at TCS (DNB), and the Next.js/React front end at Skopus AI.",
  },
  {
    id: "security",
    name: "Shield",
    icon: "shield",
    category: "Security & Access Control",
    lore: ["JWT · OAuth 2.0 · PKCE", "HMAC-SHA256 · Session authentication", "Authorization across 57 of 60 admin routes"],
    summary: "Built secure backend-to-RAG communication with HMAC-SHA256, nonce replay protection, timestamps, and constant-time verification at Skopus AI. At Tesserae, introduced session authentication and database-backed roles, with an authorization model used across 57 of 60 admin routes.",
  },
  {
    id: "inherited",
    name: "Anvil",
    icon: "anvil",
    category: "Inherited Codebases",
    lore: ["15+ undocumented endpoints mapped", "API contracts recovered", "Data-flow documentation"],
    summary: "Reverse-engineered 15+ undocumented Sbanken REST endpoints during the DNB merger, documenting API contracts, JWT flows, dependencies, data flows, and business rules for developers and QA.",
  },
  {
    id: "open",
    name: "Emerald",
    icon: "emerald",
    category: "Open to Roles",
    lore: ["Software Engineer", "Backend · Full-Stack", "Platform · Cloud engineering", LOCATION],
    summary: "Open to Software Engineer, Backend Engineer, Full-Stack Engineer, Platform Engineer, and cloud-focused opportunities anywhere in the United States.",
  },
];

export const aboutItems: readonly AboutItem[] = [...equipmentItems, craftingResult, ...inventoryItems];

export interface ProfileAction {
  label: string;
  item: string;
  icon: MinecraftIconName;
  href: string;
  external: boolean;
}

export const profileActions: ProfileAction[] = [
  { label: "Resume", item: "Paper", icon: "scroll", href: RESUME_URL, external: true },
  { label: "GitHub", item: "Command Block", icon: "command-cube", href: GITHUB_URL, external: true },
  { label: "LinkedIn", item: "Lapis Gem", icon: "lapis-gem", href: LINKEDIN_URL, external: true },
  { label: "Email", item: "Portal", icon: "portal", href: `mailto:${EMAIL}`, external: false },
];
