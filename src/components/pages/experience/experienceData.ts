import type { MinecraftIconName } from "../../minecraft";

/** Presentation only: a frame style, never a ranking of the work. */
export type AdvancementType = "standard" | "milestone" | "current";

export interface EvidenceItem {
  icon: MinecraftIconName;
  label: string;
  summary: string;
  /** Index into the role's bullets that this item is drawn from. */
  supportingBulletIndex: number;
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  clientOrContext?: string;
  title: string;
  /** YYYY-MM. */
  startDate: string;
  /** YYYY-MM, or null while the role is ongoing. */
  endDate: string | null;
  location?: string;
  website?: string;
  /** One line for the node tooltip and the crawlable node text. */
  focus: string;
  summary: string;
  bullets: string[];
  technologies: string[];
  advancementType: AdvancementType;
  icon: MinecraftIconName;
  evidenceItems: EvidenceItem[];
  /** Verified figures from the authoritative resume, kept on the role they belong to. */
  metrics?: string[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
};

export const formatDates = (entry: ExperienceEntry) =>
  `${formatMonth(entry.startDate)} – ${entry.endDate ? formatMonth(entry.endDate) : "Present"}`;

/** Employer first, client or project in parentheses: the DNB roles were TCS employment on the DNB account. */
export const employerName = (entry: ExperienceEntry) =>
  entry.clientOrContext ? `${entry.organization} (${entry.clientOrContext})` : entry.organization;

export const isCurrent = (entry: ExperienceEntry) => entry.endDate === null;

/** Oldest first; role dates and accomplishments follow the current positioning. */
export const experience: ExperienceEntry[] = [
  {
    id: "tcs-dnb-se1",
    organization: "Tata Consultancy Services",
    title: "Software Engineer I",
    startDate: "2020-11",
    endDate: "2023-03",
    focus: "Backend APIs, event-driven processing, and full-stack pension and investment workflows.",
    summary: "Built and maintained C#/.NET services and React/TypeScript interfaces for DNB pension and investment systems, with AWS infrastructure and production support.",
    bullets: ["Designed REST APIs for pension and investment workflows integrating 4+ internal and external systems, including DNB microservices, Tietoevry services, Morningstar APIs, and DynamoDB.", "Improved API performance across 5+ services by parallelizing 2–3 independent downstream calls and caching repeated lookups.", "Built 25+ React/TypeScript components across 10+ pension and investment screens for balances, allocation, portfolio distribution, and fund selection.", "Designed event-driven pricing and investment processing using AWS ECS, SNS, and SQS across multiple product/customer segments.", "Standardized DTO and model transformations across layered services, reducing repetitive mapping code and simplifying endpoint development.", "Migrated 5+ repositories from Bitbucket/Jenkins/CloudFormation to GitLab, GitLab CI/CD, and Terraform across 4 environments.", "Supported ST, SIT, UAT, and Production by troubleshooting API integrations, authentication, DynamoDB, external services, and deployments.", "Upgraded backend services and dependencies from unsupported versions while preserving build and deployment compatibility."],
    technologies: ["C#", ".NET", "React", "TypeScript", "DynamoDB", "REST APIs", "AWS ECS", "AWS SNS", "AWS SQS", "GitLab CI/CD", "Terraform"],
    advancementType: "standard",
    icon: "iron-pickaxe",
    evidenceItems: [
      {
        icon: "map",
        label: "API integration",
        summary: "4+ internal and external systems.",
        supportingBulletIndex: 0
      },
      {
        icon: "repeater",
        label: "API performance",
        summary: "Concurrent downstream calls and cached lookups across 5+ services.",
        supportingBulletIndex: 1
      },
      {
        icon: "crafting-table",
        label: "UI components",
        summary: "25+ components across 10+ screens.",
        supportingBulletIndex: 2
      },
      {
        icon: "server-network",
        label: "Event-driven processing",
        summary: "Pricing and investment processing with ECS, SNS, and SQS.",
        supportingBulletIndex: 3
      },
      {
        icon: "command-cube",
        label: "Infrastructure migration",
        summary: "5+ repositories migrated across 4 environments.",
        supportingBulletIndex: 5
      }
    ],
    clientOrContext: "DNB"
  },
  {
    id: "tcs-dnb-se2",
    organization: "Tata Consultancy Services",
    title: "Software Engineer II",
    startDate: "2023-04",
    endDate: "2024-07",
    focus: "Merger integration, transaction services, and production release ownership.",
    summary: "Recovered undocumented Sbanken API contracts during the DNB merger and maintained transaction services through testing, releases, and production troubleshooting.",
    bullets: ["Reverse-engineered 15+ undocumented Sbanken REST endpoints during the DNB-Sbanken merger, documenting API contracts, JWT authentication flows, downstream dependencies, data flows, and business rules for developers and QA.", "Developed and maintained transaction-related backend services, validating request/response contracts and edge cases with Postman and Swagger/OpenAPI.", "Owned selected microservices, delivering enhancements, resolving defects, and reviewing GitLab merge requests for code quality, test coverage, and maintainability.", "Delivered 20+ releases through ST, SIT, UAT, and Production using GitLab CI/CD and Terraform.", "Resolved production and pre-production issues across AWS-hosted services using CloudWatch logs, HTTP error analysis, authentication troubleshooting, and downstream dependency tracing."],
    technologies: ["C#", ".NET", "REST APIs", "Microservices", "JWT", "Postman", "Swagger/OpenAPI", "AWS", "CloudWatch", "GitLab CI/CD", "Terraform"],
    advancementType: "milestone",
    icon: "compass",
    evidenceItems: [
      {
        icon: "map",
        label: "API contracts",
        summary: "15+ undocumented REST endpoints mapped.",
        supportingBulletIndex: 0
      },
      {
        icon: "iron-pickaxe",
        label: "Transaction services",
        summary: "Request/response contracts and edge-case validation.",
        supportingBulletIndex: 1
      },
      {
        icon: "shield",
        label: "Service ownership",
        summary: "Enhancements, defect resolution, and merge-request review.",
        supportingBulletIndex: 2
      },
      {
        icon: "command-cube",
        label: "Release delivery",
        summary: "20+ releases across ST, SIT, UAT, and Production.",
        supportingBulletIndex: 3
      },
      {
        icon: "redstone-torch",
        label: "Production diagnosis",
        summary: "Logs, authentication, and downstream dependencies.",
        supportingBulletIndex: 4
      }
    ],
    clientOrContext: "DNB"
  },
  {
    id: "ub-tesserae",
    organization: "University at Buffalo",
    title: "Software Engineer",
    startDate: "2026-02",
    endDate: null,
    focus: "Python/Flask performance, search cancellation, and research-platform security.",
    summary: "Improved backend data paths and long-running search workflows on Tesserae, with session authentication, database-backed roles, and regression tests.",
    bullets: ["Optimized Python/Flask data paths by eliminating an N+1 query pattern, adding SQL-backed pagination and lazy detail loading, and caching a ~700 KB metadata file per worker.", "Implemented cancellation across 7 long-running search pipelines from the React UI through Flask to cross-process workers under Apache/mod_wsgi.", "Introduced session-based authentication and database-backed roles to replace shared-password admin access, establishing the authorization model now used across 57 of 60 administrative routes.", "Expanded backend and frontend regression coverage using pytest, Vitest, and React Testing Library."],
    technologies: ["Python", "Flask", "React", "PostgreSQL", "Session Authentication", "RBAC", "Apache/mod_wsgi", "pytest", "Vitest", "React Testing Library"],
    advancementType: "current",
    icon: "anvil",
    evidenceItems: [
      {
        icon: "hopper",
        label: "Data paths",
        summary: "SQL pagination, lazy loading, and per-worker metadata caching.",
        supportingBulletIndex: 0
      },
      {
        icon: "repeater",
        label: "Search cancellation",
        summary: "Cancellation across 7 cross-process pipelines.",
        supportingBulletIndex: 1
      },
      {
        icon: "shield",
        label: "Authentication & roles",
        summary: "Authorization model used across 57 of 60 admin routes.",
        supportingBulletIndex: 2
      },
      {
        icon: "book",
        label: "Regression coverage",
        summary: "pytest, Vitest, and React Testing Library.",
        supportingBulletIndex: 3
      }
    ],
    clientOrContext: "Tesserae",
    location: "Remote",
    website: "https://tesserae.caset.buffalo.edu/"
  },
  {
    id: "skopus-ai",
    organization: "Skopus AI",
    website: "https://skopusai.com",
    title: "Founding Engineer / AI Career Platform",
    startDate: "2026-05",
    endDate: null,
    focus: "Backend ownership, production RAG, secure services, and AWS delivery.",
    summary: "Built and own the backend and separate RAG service for an AI career platform spanning resume ingestion, ATS analysis, and career Q&A.",
    bullets: ["Built and owned a backend spanning 50+ REST API routes and a separate RAG service for resume ingestion, ATS analysis, and career Q&A.", "Hardened 8 OpenAI operations using 14 validation schemas, evidence-backed parsing, and 21 fallback paths.", "Automated TEST and PROD AWS ECS deployments with GitHub Actions, OIDC authentication, immutable image digests, health validation, and rollback controls.", "Secured backend-to-RAG traffic using HMAC-SHA256 signing, nonce replay protection, timestamps, and constant-time verification.", "Built concurrency-safe usage accounting across 5 AI features and 2 plan tiers using PostgreSQL advisory locks and reserve/commit/release workflows.", "Added observability around AI token usage, execution duration, success/failure, and request attribution."],
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "pgvector", "AWS ECS", "GitHub Actions", "Docker", "OpenAI APIs", "RAG", "Next.js", "React", "OAuth 2.0", "PKCE", "HMAC-SHA256"],
    advancementType: "current",
    icon: "enchanted-book",
    evidenceItems: [
      {
        icon: "enchanted-book",
        label: "Backend & RAG",
        summary: "50+ REST API routes and a separate RAG service.",
        supportingBulletIndex: 0
      },
      {
        icon: "name-tag",
        label: "Validated AI operations",
        summary: "8 operations, 14 validation schemas, and 21 fallback paths.",
        supportingBulletIndex: 1
      },
      {
        icon: "command-cube",
        label: "AWS deployments",
        summary: "OIDC, immutable digests, health validation, and rollback.",
        supportingBulletIndex: 2
      },
      {
        icon: "shield",
        label: "Service security",
        summary: "HMAC signing and nonce replay protection.",
        supportingBulletIndex: 3
      },
      {
        icon: "repeater",
        label: "Concurrency controls",
        summary: "Advisory locks and reserve/commit/release accounting.",
        supportingBulletIndex: 4
      },
      {
        icon: "clock",
        label: "AI observability",
        summary: "Token usage, duration, outcomes, and request attribution.",
        supportingBulletIndex: 5
      }
    ],
    location: "Remote"
  }
];
