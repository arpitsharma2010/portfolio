import type { MinecraftIconName, MinecraftItem } from "../../minecraft/types";

/**
 * Every technology here is backed by a role or project shown elsewhere on the site.
 * Item metaphors are decoration: icon, item name and rarity never encode proficiency.
 */
export const SKILL_CATEGORIES = [
  { id: "languages", label: "Languages", icon: "diamond" },
  { id: "backend", label: "Backend", icon: "iron-pickaxe" },
  { id: "frontend", label: "Frontend", icon: "crafting-table" },
  { id: "cloud", label: "Cloud & DevOps", icon: "command-cube" },
  { id: "databases", label: "Databases", icon: "barrel" },
  { id: "ai", label: "AI / LLM", icon: "enchanted-book" },
  { id: "security", label: "Security", icon: "shield" },
  { id: "testing", label: "Testing & Tools", icon: "book" },
] as const satisfies readonly { id: string; label: string; icon: MinecraftIconName }[];

export type SkillCategoryId = (typeof SKILL_CATEGORIES)[number]["id"];

export const ROLE_SOURCES = ["Skopus AI", "Tesserae", "TCS (DNB)", "TCS (Trainee)"] as const;
export const PROJECT_SOURCES = [
  "WanderGenie",
  "Taco-DB",
  "Pintos Kernel",
  "Crop Yield Prediction",
  "Library Management System",
] as const;
export type SkillSource = (typeof ROLE_SOURCES)[number] | (typeof PROJECT_SOURCES)[number];

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
    id: "csharp", technology: "C#", itemName: "Diamond", icon: "diamond", categoryId: "languages",
    summary: "My main production language at DNB, where I wrote and owned .NET Core services on a wealth-management platform from Apr 2021 to Jul 2024.",
    uses: ["Backend services and REST APIs", "Microservice decomposition", "Unit tests with NUnit"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "python", technology: "Python", itemName: "Emerald", icon: "emerald", categoryId: "languages",
    summary: "Backend, AI and data work: Flask code on the Tesserae research platform, the LangGraph agents behind WanderGenie and a PySpark ML pipeline.",
    uses: ["Flask APIs on Tesserae", "Multi-agent LLM workflows", "ML pipeline served behind Flask"],
    evidence: ["Tesserae", "WanderGenie", "Crop Yield Prediction"],
  },
  {
    id: "typescript", technology: "TypeScript", itemName: "Lapis Gem", icon: "lapis-gem", categoryId: "languages",
    summary: "Typed code across the stack: the Node.js service and Next.js front end at Skopus AI, and 25+ reusable React components at DNB.",
    uses: ["Node.js AI/RAG service", "Next.js and React front end", "Reusable React components"],
    evidence: ["Skopus AI", "TCS (DNB)"],
  },
  {
    id: "java", technology: "Java", itemName: "Gold Ingot", icon: "gold-ingot", categoryId: "languages",
    summary: "The Java and Spring Boot backend of a Hospital Management System in the TCS ASE-Trainee program, and the Spring Boot API behind the Library Management System.",
    uses: ["Hospital Management System backend", "Spring Boot API", "JWT/OAuth authentication"],
    evidence: ["TCS (Trainee)", "Library Management System"],
  },
  {
    id: "c-cpp", technology: "C / C++", itemName: "Iron Ingot", icon: "iron-ingot", categoryId: "languages",
    summary: "Systems work below the framework: a relational database engine written from scratch in C++ and kernel components for the Pintos instructional OS in C.",
    uses: ["Buffer pool and B+ Tree index", "Hash joins and external merge sort", "Priority scheduler and system calls"],
    evidence: ["Taco-DB", "Pintos Kernel"],
  },
  {
    id: "dotnet", technology: ".NET Core", itemName: "Diamond Pickaxe", icon: "diamond-pickaxe", categoryId: "backend",
    summary: "The backend framework behind my DNB work: REST APIs and microservices on a wealth-management platform, including the undocumented Sbanken service I reverse-engineered and released.",
    uses: ["REST APIs and microservices", "Latency cut from ~800 ms to 500 ms", "20+ production releases"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "nodejs", technology: "Node.js", itemName: "Shovel", icon: "shovel", categoryId: "backend",
    summary: "Runtime for the 8-endpoint AI/RAG service I built and own at Skopus AI.",
    uses: ["8-endpoint AI/RAG service", "Validation on every LLM response", "Caching and fallback workflows"],
    evidence: ["Skopus AI"],
  },
  {
    id: "flask", technology: "Flask", itemName: "Axe", icon: "axe", categoryId: "backend",
    summary: "Debugging and refactoring Flask code on the Tesserae research platform, and the real-time inference API for the crop-yield ML pipeline.",
    uses: ["Refactoring an inherited codebase", "RBAC and rate limiting on admin endpoints", "Real-time ML inference API"],
    evidence: ["Tesserae", "Crop Yield Prediction"],
  },
  {
    id: "spring-boot", technology: "Spring Boot", itemName: "Iron Pickaxe", icon: "iron-pickaxe", categoryId: "backend",
    summary: "Backend for the Hospital Management System in the TCS ASE-Trainee program and for the Library Management System.",
    uses: ["Hospital Management System backend", "Library system API", "JWT/OAuth authentication"],
    evidence: ["TCS (Trainee)", "Library Management System"],
  },
  {
    id: "rest-apis", technology: "REST APIs", itemName: "Sword", icon: "sword", categoryId: "backend",
    summary: "REST API work at Tata Consultancy Services: 30+ RESTful APIs on the DNB account as Software Engineer I, the undocumented Sbanken endpoints I mapped as Software Engineer II, and 10+ REST APIs in the ASE-Trainee program.",
    uses: ["30+ RESTful APIs", "15+ undocumented endpoints mapped", "10+ REST APIs as ASE-Trainee"],
    evidence: ["TCS (DNB)", "TCS (Trainee)"],
  },
  {
    id: "microservices", technology: "Microservices", itemName: "Server Network", icon: "server-network", categoryId: "backend",
    summary: "Service boundaries at DNB: splitting a 25+ endpoint service into two independently deployable microservices and integrating the Sbanken microservice in the merger.",
    uses: ["25+ endpoint service split in two", "Sbanken service reverse-engineered", "Cross-service 4xx/5xx debugging"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "caching", technology: "Caching", itemName: "Repeater", icon: "repeater", categoryId: "backend",
    summary: "Caching plus fallback workflows at Skopus AI, so a slow or failing model call degrades instead of breaking the product, and a buffer pool for pages in Taco-DB.",
    uses: ["Caching and fallbacks around LLM calls", "Buffer pool page caching"],
    evidence: ["Skopus AI", "Taco-DB"],
  },
  {
    id: "react", technology: "React", itemName: "Crafting Table", icon: "crafting-table", categoryId: "frontend",
    summary: "The front end I build for my own APIs: 25+ reusable components at DNB, the Skopus AI front end, Tesserae fixes and the Library Management System dashboards.",
    uses: ["25+ components across 10+ responsive screens", "Refactoring Tesserae's React code", "Role-based dashboards"],
    evidence: ["TCS (DNB)", "Skopus AI", "Tesserae", "Library Management System"],
  },
  {
    id: "nextjs", technology: "Next.js", itemName: "Map", icon: "map", categoryId: "frontend",
    summary: "Front end of the Skopus AI product, integrated against the service I own and kept independent of it through contract testing.",
    uses: ["Product front end", "Contract-tested API integration"],
    evidence: ["Skopus AI"],
  },
  {
    id: "aws", technology: "AWS", itemName: "Command Block", icon: "command-cube", categoryId: "cloud",
    summary: "Where my services run: AWS deployment and release validation at DNB, the Skopus AI service on ECS and WanderGenie's deployment. AWS Certified Solutions Architect, Associate.",
    uses: ["Deployments across four environments", "ECS, S3 and CloudWatch", "Solutions Architect, Associate"],
    evidence: ["TCS (DNB)", "Skopus AI", "WanderGenie"],
  },
  {
    id: "ecs", technology: "AWS ECS", itemName: "Furnace", icon: "furnace", categoryId: "cloud",
    summary: "Runs the investment-processing automation I built at DNB and the current Skopus AI service.",
    uses: ["Automated investment processing", "AI service hosting"],
    evidence: ["TCS (DNB)", "Skopus AI"],
  },
  {
    id: "s3", technology: "AWS S3", itemName: "Chest", icon: "chest", categoryId: "cloud",
    summary: "Storage behind the investment-processing and customer-notification automation I built at DNB.",
    uses: ["Investment-processing workflows", "Customer notifications"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "cloudwatch", technology: "CloudWatch", itemName: "Clock", icon: "clock", categoryId: "cloud",
    summary: "Observability on the DNB delivery path I built with GitLab CI/CD and Terraform.",
    uses: ["Production observability"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "docker", technology: "Docker", itemName: "Barrel", icon: "barrel", categoryId: "cloud",
    summary: "Packages WanderGenie for deployment on AWS.",
    uses: ["Containerised multi-agent service"],
    evidence: ["WanderGenie"],
  },
  {
    id: "terraform", technology: "Terraform", itemName: "Anvil", icon: "anvil", categoryId: "cloud",
    summary: "Infrastructure as code for the DNB delivery path, alongside GitLab CI/CD.",
    uses: ["Delivery path for 20+ releases"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "gitlab-ci", technology: "GitLab CI/CD", itemName: "Redstone Torch", icon: "redstone-torch", categoryId: "cloud",
    summary: "The pipeline I built and maintained at DNB for 20+ production releases across four environments.",
    uses: ["20+ releases, four environments", "Testing and release validation"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "postgresql", technology: "PostgreSQL", itemName: "Lapis Ore", icon: "lapis-ore", categoryId: "databases",
    summary: "Relational storage at Skopus AI, on the Tesserae research platform and at DNB.",
    uses: ["Semantic retrieval with pgvector", "Selection moved into the query", "Wealth-management platform data"],
    evidence: ["Skopus AI", "Tesserae", "TCS (DNB)"],
  },
  {
    id: "dynamodb", technology: "DynamoDB", itemName: "Ender Chest", icon: "ender-chest", categoryId: "databases",
    summary: "NoSQL storage on the DNB wealth-management platform.",
    uses: ["Wealth-management platform data"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "supabase", technology: "Supabase", itemName: "Emerald Ore", icon: "emerald-ore", categoryId: "databases",
    summary: "Part of the Skopus AI service stack, alongside PostgreSQL and pgvector.",
    uses: ["AI/RAG service data"],
    evidence: ["Skopus AI"],
  },
  {
    id: "pgvector", technology: "pgvector", itemName: "Compass", icon: "compass", categoryId: "databases",
    summary: "Semantic retrieval for the Skopus AI RAG service and for WanderGenie's hybrid retrieval.",
    uses: ["Semantic retrieval over embeddings", "Hybrid RAG with Neo4j"],
    evidence: ["Skopus AI", "WanderGenie"],
  },
  {
    id: "neo4j", technology: "Neo4j", itemName: "Redstone Dust", icon: "redstone-dust", categoryId: "databases",
    summary: "Holds the relationships between places in WanderGenie's hybrid retrieval.",
    uses: ["Graph of places for hybrid RAG"],
    evidence: ["WanderGenie"],
  },
  {
    id: "openai", technology: "OpenAI APIs", itemName: "Enchanted Book", icon: "enchanted-book", categoryId: "ai", enchanted: true,
    summary: "Model calls behind the Skopus AI service and WanderGenie, wrapped in validation, intent routing and fallbacks.",
    uses: ["Validated responses behind a typed API", "Intent routing per request", "Multi-agent travel planning"],
    evidence: ["Skopus AI", "WanderGenie"],
  },
  {
    id: "langgraph", technology: "LangGraph", itemName: "Enchanting Table", icon: "enchanting-table", categoryId: "ai", enchanted: true,
    summary: "Coordinates WanderGenie's three specialised agents and four external tools, constrained so the graph cannot loop.",
    uses: ["Three agents, four tools", "Deterministic fallbacks to stop loops"],
    evidence: ["WanderGenie"],
  },
  {
    id: "rag", technology: "RAG", itemName: "Potion", icon: "potion", categoryId: "ai",
    summary: "Retrieval-augmented generation: grounded analysis at Skopus AI and hybrid pgvector plus Neo4j retrieval in WanderGenie.",
    uses: ["Answers tied to source material", "Hybrid retrieval"],
    evidence: ["Skopus AI", "WanderGenie"],
  },
  {
    id: "embeddings", technology: "Embeddings", itemName: "Experience Bottle", icon: "experience-bottle", categoryId: "ai",
    summary: "Vector representations behind WanderGenie's semantic similarity search over pgvector.",
    uses: ["Semantic similarity search"],
    evidence: ["WanderGenie"],
  },
  {
    id: "oauth", technology: "OAuth 2.0 · PKCE", itemName: "Portal", icon: "portal", categoryId: "security",
    summary: "Google OAuth implemented end to end at Skopus AI with PKCE, token handling and session security, plus OAuth sign-in for the Library Management System.",
    uses: ["Google OAuth with PKCE", "Token handling and session security"],
    evidence: ["Skopus AI", "Library Management System"],
  },
  {
    id: "jwt", technology: "JWT", itemName: "Name Tag", icon: "name-tag", categoryId: "security",
    summary: "Authentication for the Library Management System.",
    uses: ["Token-based authentication"],
    evidence: ["Library Management System"],
  },
  {
    id: "rbac", technology: "RBAC", itemName: "Shield", icon: "shield", categoryId: "security",
    summary: "Role-based access control on 57+ Tesserae admin endpoints that any authenticated caller could previously reach.",
    uses: ["57+ admin endpoints secured"],
    evidence: ["Tesserae"],
  },
  {
    id: "rate-limiting", technology: "Rate Limiting", itemName: "Hopper", icon: "hopper", categoryId: "security",
    summary: "Added alongside RBAC to secure the Tesserae admin endpoints.",
    uses: ["Admin endpoint protection"],
    evidence: ["Tesserae"],
  },
  {
    id: "nunit", technology: "NUnit", itemName: "Book", icon: "book", categoryId: "testing",
    summary: "Testing for the .NET Core services I released at DNB.",
    uses: ["Backend tests before release"],
    evidence: ["TCS (DNB)"],
  },
  {
    id: "pytest", technology: "Pytest", itemName: "Bow", icon: "bow", categoryId: "testing",
    summary: "Automated tests behind the Tesserae refactors, so the research team can deploy without manual verification.",
    uses: ["Tests as the deploy gate"],
    evidence: ["Tesserae"],
  },
  {
    id: "contract-testing", technology: "Contract Testing", itemName: "Scroll", icon: "scroll", categoryId: "testing",
    summary: "Covers the Skopus AI API surface so the Next.js/React front end and the service can move independently.",
    uses: ["Independent front end and service releases"],
    evidence: ["Skopus AI"],
  },
  {
    id: "ai-assisted", technology: "Claude Code · Codex", itemName: "Netherite Pickaxe", icon: "netherite-pickaxe", categoryId: "testing",
    summary: "AI-assisted exploration and refactoring on Tesserae, with review and tests as the gate on anything that ships.",
    uses: ["Codebase exploration", "Refactoring with review and tests"],
    evidence: ["Tesserae"],
  },
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

export const DEFAULT_SKILL_ID = "csharp";

/** Broadest evidence across the site, in no ranked order. */
export const CORE_TOOLKIT_IDS = ["csharp", "python", "typescript", "rest-apis", "microservices", "react", "aws", "postgresql", "rag"];

export const coreToolkitItems = CORE_TOOLKIT_IDS.map((id) => skillItems.find((item) => item.id === id)!);

export const isRoleSource = (source: SkillSource) => (ROLE_SOURCES as readonly string[]).includes(source);

export const matchesSearch = (item: SkillItem, query: string) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [item.technology, item.itemName, item.categoryLabel, ...item.uses, ...item.evidence]
    .some((text) => text.toLowerCase().includes(needle));
};
