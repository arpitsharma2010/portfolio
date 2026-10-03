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
    lore: ["RAG over pgvector", "Intent routing and fallbacks", "Validated LLM output", "OpenAI APIs · LangGraph"],
    summary:
      "I build the boundary around the model, not just the call to it. At Skopus AI that is an 8-endpoint RAG service with semantic retrieval, grounded analysis, intent routing, caching and fallback workflows, and strict validation on every LLM response before it reaches a caller.",
  },
  {
    id: "backend",
    slot: "Chest",
    name: "Diamond Pickaxe",
    icon: "diamond-pickaxe",
    category: "Backend Engineering",
    rarity: "rare",
    lore: ["C# · .NET Core", "Python · Flask", "Node.js · TypeScript", "Java · Spring Boot", "REST APIs · Microservices"],
    summary:
      "Production APIs and services across enterprise banking, a university research platform and an AI startup: API design, service boundaries, concurrency and caching. That work cut a DNB endpoint from ~800 ms to 500 ms and a Tesserae response from ~50,000 records to 50.",
  },
  {
    id: "distributed",
    slot: "Legs",
    name: "Redstone Dust",
    icon: "redstone-dust",
    category: "Distributed & Event-Driven Systems",
    lore: ["Microservice decomposition", "AWS SQS · SNS at TCS (DNB)", "Concurrent downstream calls", "Cross-service debugging"],
    summary:
      "I split services along real boundaries and design for a downstream dependency that is slow instead of down. As Software Engineer I at Tata Consultancy Services (DNB) I decomposed a 25+ endpoint service into two independently deployable microservices and worked with AWS SQS and SNS; as Software Engineer II I diagnosed production 4xx/5xx failures across service boundaries.",
  },
  {
    id: "cloud",
    slot: "Feet",
    name: "Compass",
    icon: "compass",
    category: "Cloud, DevOps & Delivery",
    lore: ["AWS ECS · S3", "AWS Lambda at TCS (DNB)", "Terraform · GitLab CI/CD", "Docker · CloudWatch"],
    summary:
      "A service you cannot deploy is not finished. At Tata Consultancy Services (DNB) I used AWS Lambda with API Gateway, S3, SQS and SNS as Software Engineer I, then owned 20+ production releases across four environments with GitLab CI/CD, Terraform and CloudWatch as Software Engineer II. Current work runs on AWS ECS. AWS Certified Solutions Architect, Associate.",
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
    summary:
      "I build and own production software end to end: backend services and REST APIs, cloud-native infrastructure on AWS, React front ends, and LLM/RAG systems that have to be correct, not just impressive.",
  },
  {
    id: "career",
    name: "Map",
    icon: "map",
    category: "Career Journey",
    lore: ["Skopus AI · May 2026 – Present", "University at Buffalo (Tesserae) · Nov 2025 – Present", "Tata Consultancy Services · Nov 2020 – Jul 2024"],
    summary:
      "Founding Engineer at Skopus AI, Software Engineer on the Tesserae research platform at the University at Buffalo, and, at Tata Consultancy Services, ASE-Trainee followed by Software Engineer I and II on DNB's wealth-management platform.",
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
    lore: ["WanderGenie · multi-agent LLM", "Taco-DB · database engine in C++", "Pintos kernel · OS internals"],
    summary:
      "Personal and academic builds that keep the layer underneath the framework from becoming a black box, from a LangGraph travel assistant to a relational database engine written from scratch.",
  },
  {
    id: "fullstack",
    name: "Crafting Table",
    icon: "crafting-table",
    category: "Frontend & Full Stack",
    lore: ["React · TypeScript", "Next.js", "25+ reusable components"],
    summary:
      "I build the front end for the APIs I write when the work needs it: 25+ reusable React and TypeScript components across 10+ responsive screens at DNB, and the Next.js/React front end at Skopus AI.",
  },
  {
    id: "security",
    name: "Shield",
    icon: "shield",
    category: "Security & Access Control",
    lore: ["OAuth 2.0 with PKCE", "RBAC · Rate limiting", "57+ admin endpoints secured"],
    summary:
      "Implemented Google OAuth end to end with PKCE at Skopus AI, and added role-based access control and rate limiting to 57+ Tesserae admin endpoints that any authenticated caller could previously reach.",
  },
  {
    id: "inherited",
    name: "Anvil",
    icon: "anvil",
    category: "Inherited Codebases",
    lore: ["15+ undocumented endpoints mapped", "API contracts recovered", "Data-flow documentation"],
    summary:
      "I read systems before I change them. The Sbanken service had no documentation and no original authors, so I traced its endpoints and downstream calls until the data flow the DNB merger was planned against was written down.",
  },
  {
    id: "open",
    name: "Emerald",
    icon: "emerald",
    category: "Open to Roles",
    lore: ["Software Engineer", "Backend · Full-Stack", "Cloud · AI engineering", `${LOCATION} · open to relocation`],
    summary: "Open to Software Engineer, Backend, Full-Stack, Cloud and AI engineering roles. Email is the fastest way to reach me.",
  },
];

export const aboutItems: readonly AboutItem[] = [...equipmentItems, craftingResult, ...inventoryItems];

export const DEFAULT_ABOUT_ITEM_ID = "backend";

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
