import type { MinecraftIconName, MinecraftItem } from "../../minecraft/types";

/**
 * Skills follow the supplied technology umbrella; role and project evidence is separate from general toolkit skills.
 * Item metaphors are decoration: icon, item name and rarity never encode proficiency.
 */
export const SKILL_CATEGORIES = [
  { id: "languages", label: "Languages", icon: "diamond" },
  { id: "backend", label: "Backend", icon: "iron-pickaxe" },
  { id: "frontend", label: "Frontend", icon: "crafting-table" },
  { id: "cloud", label: "Cloud & DevOps", icon: "command-cube" },
  { id: "databases", label: "Databases", icon: "barrel" },
  { id: "distributed", label: "Distributed Systems", icon: "server-network" },
  { id: "ai", label: "AI / LLM", icon: "enchanted-book" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "testing", label: "Testing & Tools", icon: "book" },
] as const satisfies readonly { id: string; label: string; icon: MinecraftIconName }[];

export type SkillCategoryId = (typeof SKILL_CATEGORIES)[number]["id"];

export const ROLE_SOURCES = ["Skopus AI", "Tesserae", "TCS (DNB)"] as const;
export const PROJECT_SOURCES = [
  "WanderGenie",
  "Taco-DB",
  "Pintos Kernel",
  "Crop Yield Prediction",
  "Library Management System",
] as const;
export type SkillSource = (typeof ROLE_SOURCES)[number] | (typeof PROJECT_SOURCES)[number] | "Engineering toolkit";

interface SkillSeed {
  id: string;
  technology: string;
  itemName: string;
  icon: MinecraftIconName;
  categoryId: SkillCategoryId;
  summary: string;
  uses: string[];
  evidence: SkillSource[];
  enchanted?: boolean;
}

export interface SkillItem extends MinecraftItem, Omit<SkillSeed, "icon"> {
  categoryLabel: string;
}

const seeds: SkillSeed[] = [
  {
    id: "java",
    technology: "Java",
    itemName: "Gold Ingot",
    icon: "gold-ingot",
    categoryId: "languages",
    summary: "Java and Spring Boot APIs in the Library Management System.",
    uses: ["Library REST API"],
    evidence: ["Library Management System"]
  },
  {
    id: "python",
    technology: "Python",
    itemName: "Emerald",
    icon: "emerald",
    categoryId: "languages",
    summary: "Python/Flask research systems and LangGraph travel workflows.",
    uses: ["Research backend", "Travel agents"],
    evidence: ["Tesserae", "WanderGenie"]
  },
  {
    id: "csharp",
    technology: "C#",
    itemName: "Diamond",
    icon: "diamond",
    categoryId: "languages",
    summary: "Production backend services on the wealth-management platform at TCS (DNB).",
    uses: ["Banking backend services"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "typescript",
    technology: "TypeScript",
    itemName: "Lapis Gem",
    icon: "lapis-gem",
    categoryId: "languages",
    summary: "Typed backend and frontend development across Skopus AI, DNB, and library projects.",
    uses: ["Typed API development", "React components"],
    evidence: ["Skopus AI", "TCS (DNB)", "Library Management System"]
  },
  {
    id: "javascript",
    technology: "JavaScript",
    itemName: "Diamond",
    icon: "diamond",
    categoryId: "languages",
    summary: "JavaScript across backend and frontend development.",
    uses: ["Web development"],
    evidence: ["Engineering toolkit"]
  },
  {
    id: "c-cpp",
    technology: "C++",
    itemName: "Iron Ingot",
    icon: "iron-ingot",
    categoryId: "languages",
    summary: "Disk storage, indexing, and query execution in a relational database engine.",
    uses: ["Storage engine", "Query execution"],
    evidence: ["Taco-DB"]
  },
  {
    id: "sql",
    technology: "SQL",
    itemName: "Diamond",
    icon: "diamond",
    categoryId: "languages",
    summary: "SQL-backed pagination, relational data access, and usage accounting.",
    uses: ["Pagination", "Relational queries"],
    evidence: ["Tesserae", "Skopus AI", "Library Management System"]
  },
  {
    id: "spring-boot",
    technology: "Spring Boot",
    itemName: "Iron Pickaxe",
    icon: "iron-pickaxe",
    categoryId: "backend",
    summary: "Spring Boot 3, MVC, Security, and JPA/Hibernate in the library REST API.",
    uses: ["Transactional checkout / return / renewal", "Resource-server security"],
    evidence: ["Library Management System"]
  },
  {
    id: "flask",
    technology: "Flask",
    itemName: "Axe",
    icon: "axe",
    categoryId: "backend",
    summary: "Research APIs, SQL pagination, cancellation, and session authentication.",
    uses: ["Search cancellation", "Session authentication"],
    evidence: ["Tesserae"]
  },
  {
    id: "nodejs",
    technology: "Node.js",
    itemName: "Shovel",
    icon: "shovel",
    categoryId: "backend",
    summary: "Backend and separate RAG service for resume ingestion, ATS analysis, and career Q&A.",
    uses: ["Career platform backend", "RAG service"],
    evidence: ["Skopus AI"]
  },
  {
    id: "dotnet",
    technology: ".NET",
    itemName: "Diamond Pickaxe",
    icon: "diamond-pickaxe",
    categoryId: "backend",
    summary: "C#/.NET REST APIs and microservices on the wealth-management platform at TCS (DNB).",
    uses: ["REST API development", "Microservice maintenance"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "rest-apis",
    technology: "REST APIs",
    itemName: "Sword",
    icon: "sword",
    categoryId: "backend",
    summary: "API contracts, integration, and transaction services; 50+ backend routes at Skopus AI.",
    uses: ["API contracts", "Request/response validation"],
    evidence: ["TCS (DNB)", "Skopus AI"]
  },
  {
    id: "microservices",
    technology: "Microservices",
    itemName: "Server Network",
    icon: "server-network",
    categoryId: "backend",
    summary: "Service ownership, enhancements, defect resolution, and cross-service troubleshooting at TCS (DNB).",
    uses: ["Service boundaries", "Production troubleshooting"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "react",
    technology: "React",
    itemName: "Crafting Table",
    icon: "crafting-table",
    categoryId: "frontend",
    summary: "25+ components across 10+ DNB screens, plus AI and research interfaces.",
    uses: ["Pension and investment workflows", "Research UI"],
    evidence: ["TCS (DNB)", "Skopus AI", "Tesserae", "Library Management System"]
  },
  {
    id: "nextjs",
    technology: "Next.js",
    itemName: "Map",
    icon: "map",
    categoryId: "frontend",
    summary: "Frontend development for the Skopus AI career platform.",
    uses: ["AI product frontend"],
    evidence: ["Skopus AI"]
  },
  {
    id: "frontend-typescript",
    technology: "TypeScript",
    itemName: "Crafting Table",
    icon: "crafting-table",
    categoryId: "frontend",
    summary: "Typed React components and customer-facing workflows.",
    uses: ["Typed UI components"],
    evidence: ["TCS (DNB)", "Library Management System"]
  },
  {
    id: "aws",
    technology: "AWS",
    itemName: "Command Block",
    icon: "command-cube",
    categoryId: "cloud",
    summary: "Cloud deployment, production troubleshooting, and event-driven processing.",
    uses: ["Service deployment", "Cloud observability"],
    evidence: ["TCS (DNB)", "Skopus AI", "WanderGenie"]
  },
  {
    id: "docker",
    technology: "Docker",
    itemName: "Barrel",
    icon: "barrel",
    categoryId: "cloud",
    summary: "Container packaging for AWS deployments.",
    uses: ["Container images"],
    evidence: ["Skopus AI", "WanderGenie"]
  },
  {
    id: "kubernetes",
    technology: "Kubernetes",
    itemName: "Command Block",
    icon: "command-cube",
    categoryId: "cloud",
    summary: "Container orchestration in my cloud engineering toolkit.",
    uses: ["Container orchestration"],
    evidence: ["Engineering toolkit"]
  },
  {
    id: "terraform",
    technology: "Terraform",
    itemName: "Anvil",
    icon: "anvil",
    categoryId: "cloud",
    summary: "Infrastructure automation and repository migration across 4 environments at TCS (DNB).",
    uses: ["Infrastructure as Code", "Environment migration"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "gitlab-ci",
    technology: "GitLab CI/CD",
    itemName: "Redstone Torch",
    icon: "redstone-torch",
    categoryId: "cloud",
    summary: "Delivery of 20+ releases through ST, SIT, UAT, and Production at TCS (DNB).",
    uses: ["Release pipelines"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "github-actions",
    technology: "GitHub Actions",
    itemName: "Command Block",
    icon: "command-cube",
    categoryId: "cloud",
    summary: "TEST/PROD ECS delivery with OIDC, immutable image digests, health validation, and rollback.",
    uses: ["OIDC deployments", "Health checks and rollback"],
    evidence: ["Skopus AI"]
  },
  {
    id: "jenkins",
    technology: "Jenkins",
    itemName: "Command Block",
    icon: "command-cube",
    categoryId: "cloud",
    summary: "Migrated repositories from Bitbucket/Jenkins/CloudFormation to GitLab CI/CD and Terraform.",
    uses: ["CI/CD migration"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "ecs",
    technology: "AWS ECS",
    itemName: "Furnace",
    icon: "furnace",
    categoryId: "cloud",
    summary: "Event-driven investment processing and AI service deployment.",
    uses: ["Container hosting", "Investment processing"],
    evidence: ["TCS (DNB)", "Skopus AI"]
  },
  {
    id: "sqs",
    technology: "AWS SQS",
    itemName: "Command Block",
    icon: "command-cube",
    categoryId: "cloud",
    summary: "Queue-based pricing and investment processing.",
    uses: ["Queue-based processing"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "sns",
    technology: "AWS SNS",
    itemName: "Command Block",
    icon: "command-cube",
    categoryId: "cloud",
    summary: "Event-driven pricing and investment workflows.",
    uses: ["Event distribution"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "s3",
    technology: "AWS S3",
    itemName: "Chest",
    icon: "chest",
    categoryId: "cloud",
    summary: "Object storage in my AWS engineering toolkit.",
    uses: ["Object storage"],
    evidence: ["Engineering toolkit"]
  },
  {
    id: "cloudwatch",
    technology: "CloudWatch",
    itemName: "Clock",
    icon: "clock",
    categoryId: "cloud",
    summary: "Logs and downstream dependency tracing for AWS-hosted services.",
    uses: ["Log analysis", "Dependency tracing"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "postgresql",
    technology: "PostgreSQL",
    itemName: "Lapis Ore",
    icon: "lapis-ore",
    categoryId: "databases",
    summary: "Relational data paths and concurrency-safe accounting with advisory locks.",
    uses: ["Advisory locks", "Usage accounting"],
    evidence: ["Skopus AI", "Tesserae"]
  },
  {
    id: "dynamodb",
    technology: "DynamoDB",
    itemName: "Ender Chest",
    icon: "ender-chest",
    categoryId: "databases",
    summary: "Data access and integrations for pension and investment workflows.",
    uses: ["Workflow data", "API integration"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "mysql",
    technology: "MySQL",
    itemName: "Barrel",
    icon: "barrel",
    categoryId: "databases",
    summary: "Relational library storage with Spring Data JPA/Hibernate.",
    uses: ["Library persistence"],
    evidence: ["Library Management System"]
  },
  {
    id: "mongodb",
    technology: "MongoDB",
    itemName: "Barrel",
    icon: "barrel",
    categoryId: "databases",
    summary: "Document databases in my database engineering toolkit.",
    uses: ["Document storage"],
    evidence: ["Engineering toolkit"]
  },
  {
    id: "pgvector",
    technology: "pgvector",
    itemName: "Compass",
    icon: "compass",
    categoryId: "databases",
    summary: "Semantic retrieval for RAG applications.",
    uses: ["Semantic retrieval"],
    evidence: ["Skopus AI", "WanderGenie"]
  },
  {
    id: "neo4j",
    technology: "Neo4j",
    itemName: "Redstone Dust",
    icon: "redstone-dust",
    categoryId: "databases",
    summary: "Graph relationships between places for hybrid travel retrieval.",
    uses: ["Place relationships"],
    evidence: ["WanderGenie"]
  },
  {
    id: "events",
    technology: "Event-Driven Architecture",
    itemName: "Server Network",
    icon: "server-network",
    categoryId: "distributed",
    summary: "Pricing and investment processing using ECS, SNS, and SQS.",
    uses: ["Pricing events", "Investment processing"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "async",
    technology: "Asynchronous Processing",
    itemName: "Server Network",
    icon: "server-network",
    categoryId: "distributed",
    summary: "Long-running searches and cross-process cancellation.",
    uses: ["Worker cancellation"],
    evidence: ["Tesserae"]
  },
  {
    id: "concurrency",
    technology: "Concurrency",
    itemName: "Server Network",
    icon: "server-network",
    categoryId: "distributed",
    summary: "Parallel downstream calls and advisory-lock usage accounting.",
    uses: ["Parallel downstream calls", "Usage reservation"],
    evidence: ["TCS (DNB)", "Skopus AI"]
  },
  {
    id: "caching",
    technology: "Caching",
    itemName: "Repeater",
    icon: "repeater",
    categoryId: "distributed",
    summary: "Repeated API lookups, per-worker metadata caching, and an LRU buffer pool.",
    uses: ["API lookups", "Metadata and disk-page caching"],
    evidence: ["TCS (DNB)", "Tesserae", "Taco-DB"]
  },
  {
    id: "integration",
    technology: "API Integration",
    itemName: "Server Network",
    icon: "server-network",
    categoryId: "distributed",
    summary: "Pension and investment workflows integrating 4+ internal and external systems.",
    uses: ["Internal and external services"],
    evidence: ["TCS (DNB)"]
  },
  {
    id: "langgraph",
    technology: "LangGraph",
    itemName: "Enchanting Table",
    icon: "enchanting-table",
    categoryId: "ai",
    summary: "Three travel agents orchestrating four external APIs/tools.",
    uses: ["Agent orchestration", "External tools"],
    evidence: ["WanderGenie"]
  },
  {
    id: "rag",
    technology: "RAG",
    itemName: "Potion",
    icon: "potion",
    categoryId: "ai",
    summary: "Grounded resume and career analysis and hybrid travel retrieval.",
    uses: ["Resume and career Q&A", "Grounded travel planning"],
    evidence: ["Skopus AI", "WanderGenie"]
  },
  {
    id: "openai",
    technology: "OpenAI APIs",
    itemName: "Enchanted Book",
    icon: "enchanted-book",
    categoryId: "ai",
    summary: "8 operations hardened with 14 validation schemas and 21 fallback paths.",
    uses: ["Validated model responses", "Fallback workflows"],
    evidence: ["Skopus AI", "WanderGenie"]
  },
  {
    id: "agentic",
    technology: "Agentic AI",
    itemName: "Enchanted Book",
    icon: "enchanted-book",
    categoryId: "ai",
    summary: "Multi-agent travel planning with LangGraph and OpenAI.",
    uses: ["Travel planning agents"],
    evidence: ["WanderGenie"]
  },
  {
    id: "embeddings",
    technology: "Embeddings",
    itemName: "Experience Bottle",
    icon: "experience-bottle",
    categoryId: "ai",
    summary: "Vector representations for semantic retrieval.",
    uses: ["Semantic representations"],
    evidence: ["WanderGenie"]
  },
  {
    id: "vector-search",
    technology: "Vector Search",
    itemName: "Enchanted Book",
    icon: "enchanted-book",
    categoryId: "ai",
    summary: "pgvector similarity search combined with graph relationships.",
    uses: ["Similarity search"],
    evidence: ["WanderGenie"]
  },
  {
    id: "jwt",
    technology: "JWT",
    itemName: "Name Tag",
    icon: "name-tag",
    categoryId: "security",
    summary: "Documented Sbanken authentication flows and library resource-server security.",
    uses: ["Token authentication"],
    evidence: ["TCS (DNB)", "Library Management System"]
  },
  {
    id: "oauth",
    technology: "OAuth 2.0",
    itemName: "Portal",
    icon: "portal",
    categoryId: "security",
    summary: "OAuth authentication in the AI career platform and library system.",
    uses: ["OAuth authentication"],
    evidence: ["Skopus AI", "Library Management System"]
  },
  {
    id: "pkce",
    technology: "PKCE",
    itemName: "Shield",
    icon: "shield",
    categoryId: "security",
    summary: "Proof Key for Code Exchange in Skopus AI authentication.",
    uses: ["Authorization-code protection"],
    evidence: ["Skopus AI"]
  },
  {
    id: "rbac",
    technology: "RBAC",
    itemName: "Shield",
    icon: "shield",
    categoryId: "security",
    summary: "Database-backed roles with an authorization model used across 57 of 60 admin routes.",
    uses: ["Database-backed roles"],
    evidence: ["Tesserae"]
  },
  {
    id: "hmac",
    technology: "HMAC-SHA256",
    itemName: "Shield",
    icon: "shield",
    categoryId: "security",
    summary: "Signed backend-to-RAG requests with nonce replay protection and constant-time verification.",
    uses: ["Request signing", "Replay protection"],
    evidence: ["Skopus AI"]
  },
  {
    id: "api-security",
    technology: "API Security",
    itemName: "Shield",
    icon: "shield",
    categoryId: "security",
    summary: "Authentication flows, authorization, and secure service communication.",
    uses: ["Authentication", "Authorization"],
    evidence: ["TCS (DNB)", "Skopus AI", "Tesserae"]
  },
  {
    id: "session",
    technology: "Session Authentication",
    itemName: "Shield",
    icon: "shield",
    categoryId: "security",
    summary: "Replaced shared-password admin access with session-based authentication.",
    uses: ["Admin sign-in"],
    evidence: ["Tesserae"]
  },
  {
    id: "pytest",
    technology: "pytest",
    itemName: "Bow",
    icon: "bow",
    categoryId: "testing",
    summary: "Backend regression coverage for Flask research systems.",
    uses: ["Backend regression tests"],
    evidence: ["Tesserae"]
  },
  {
    id: "vitest",
    technology: "Vitest",
    itemName: "Book",
    icon: "book",
    categoryId: "testing",
    summary: "Frontend regression coverage alongside React Testing Library.",
    uses: ["Frontend regression tests"],
    evidence: ["Tesserae"]
  },
  {
    id: "postman",
    technology: "Postman / Swagger",
    itemName: "Book",
    icon: "book",
    categoryId: "testing",
    summary: "Validated transaction API request/response contracts and edge cases.",
    uses: ["Contract validation", "Edge-case checks"],
    evidence: ["TCS (DNB)"]
  }
];

const categoryLabel = (id: SkillCategoryId) => SKILL_CATEGORIES.find((category) => category.id === id)!.label;

export const skillItems: readonly SkillItem[] = seeds.map((seed) => ({
  ...seed,
  name: seed.itemName,
  category: categoryLabel(seed.categoryId),
  categoryLabel: categoryLabel(seed.categoryId),
  lore: [seed.technology, ...seed.uses.slice(0, 2)],
  description: `Used in: ${seed.evidence.join(", ")}`,
  rarity: seed.enchanted ? "enchanted" : undefined,
}));

/** Broadest evidence across the site, in no ranked order. */
export const CORE_TOOLKIT_IDS = ["java", "python", "typescript", "rest-apis", "microservices", "react", "aws", "postgresql", "rag"];

export const coreToolkitItems = CORE_TOOLKIT_IDS.map((id) => skillItems.find((item) => item.id === id)!);

export const isRoleSource = (source: SkillSource) => (ROLE_SOURCES as readonly string[]).includes(source);

export const matchesSearch = (item: SkillItem, query: string) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [item.technology, item.itemName, item.categoryLabel, ...item.uses, ...item.evidence]
    .some((text) => text.toLowerCase().includes(needle));
};
