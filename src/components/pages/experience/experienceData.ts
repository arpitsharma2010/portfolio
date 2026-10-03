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

/** Oldest first. Dates are the site's existing dates; see the reconciliation notes in the commit. */
export const experience: ExperienceEntry[] = [
  {
    id: "tcs-dnb-se1",
    organization: "Tata Consultancy Services",
    clientOrContext: "DNB",
    title: "Software Engineer I",
    startDate: "2020-11",
    endDate: "2023-03",
    focus: "Backend APIs and full-stack work on a wealth-management platform.",
    summary:
      "Backend and API engineering on a wealth-management platform, plus the full-stack work to put those APIs in front of customers.",
    bullets: [
      "Reduced API latency from roughly 800 ms to 500 ms by executing independent downstream calls concurrently instead of sequentially; the endpoint was waiting on calls that had no dependency on each other.",
      "Decomposed a 25+ endpoint service into two independently deployable microservices, so the two halves could ship on their own schedules and a fault in one stopped taking the other down with it.",
      "Automated investment-processing workflows and customer notifications on AWS S3 and ECS, replacing steps that had been run by hand.",
      "Built 25+ reusable React and TypeScript components across 10+ responsive screens, and integrated them against the APIs I had written on the backend.",
    ],
    technologies: ["C#", ".NET Core", "DynamoDB", "PostgreSQL", "AWS S3", "AWS ECS", "React", "TypeScript", "REST APIs"],
    advancementType: "standard",
    icon: "iron-pickaxe",
    evidenceItems: [
      { icon: "repeater", label: "Concurrent calls", summary: "API latency from roughly 800 ms to 500 ms.", supportingBulletIndex: 0 },
      { icon: "server-network", label: "Service split", summary: "A 25+ endpoint service into two deployable microservices.", supportingBulletIndex: 1 },
      { icon: "hopper", label: "Workflow automation", summary: "Investment processing and notifications on AWS S3 and ECS.", supportingBulletIndex: 2 },
      { icon: "crafting-table", label: "UI components", summary: "25+ reusable React components across 10+ screens.", supportingBulletIndex: 3 },
    ],
  },
  {
    id: "tcs-dnb-se2",
    organization: "Tata Consultancy Services",
    clientOrContext: "DNB",
    title: "Software Engineer II",
    startDate: "2023-04",
    endDate: "2024-07",
    focus: "Merger integration and release ownership for an inherited banking service.",
    summary:
      "DNB's merger with Sbanken required integrating a savings and investment microservice that had no documentation and no original authors available. I was assigned to make it understandable, then to own its releases.",
    bullets: [
      "Reverse-engineered the undocumented Sbanken microservice: mapped 15+ endpoints, recovered their API contracts, traced every downstream dependency and produced the data-flow documentation the merger integration was planned against.",
      "Owned 20+ production releases across four environments, covering backend development, testing, AWS deployment and release validation, as the engineer accountable for each one reaching production intact.",
      "Built and maintained the delivery path with GitLab CI/CD and Terraform, using CloudWatch for observability.",
      "Diagnosed production 4xx/5xx failures across service boundaries, where the reported symptom and the actual fault were usually in different services.",
    ],
    technologies: ["C#", ".NET Core", "AWS", "GitLab CI/CD", "Terraform", "CloudWatch", "REST APIs", "Microservices", "NUnit"],
    advancementType: "milestone",
    icon: "compass",
    evidenceItems: [
      { icon: "map", label: "Service mapping", summary: "15+ undocumented endpoints and their contracts recovered.", supportingBulletIndex: 0 },
      { icon: "shield", label: "Release ownership", summary: "20+ production releases across four environments.", supportingBulletIndex: 1 },
      { icon: "command-cube", label: "Delivery pipeline", summary: "GitLab CI/CD and Terraform, observed with CloudWatch.", supportingBulletIndex: 2 },
      { icon: "redstone-torch", label: "Production diagnosis", summary: "4xx/5xx failures traced across service boundaries.", supportingBulletIndex: 3 },
    ],
  },
  {
    id: "ub-tesserae",
    organization: "University at Buffalo",
    clientOrContext: "Tesserae",
    title: "Software Engineer, Part-time",
    startDate: "2025-11",
    endDate: null,
    location: "Remote",
    website: "https://tesserae.caset.buffalo.edu/",
    focus: "API performance and access control on a production research platform.",
    summary:
      "Tesserae is a research platform for intertextual analysis of classical corpora, used by scholars and run in production. My work is API performance, access control and making an inherited codebase safe to change.",
    bullets: [
      "Cut a rare-word API response from roughly 50,000 records to 50 per request. The endpoint was returning an entire result set to a client that only ever rendered a page of it; the fix was moving selection into the query rather than the browser.",
      "Added role-based access control and rate limiting, securing 57+ admin endpoints that were previously reachable by any authenticated caller.",
      "Debugged and refactored existing Flask and React code, and backed the changes with automated tests so the research team can deploy without manual verification.",
      "Work AI-assisted with Claude Code and Codex for exploration and refactoring, with review and tests as the gate on anything that ships.",
    ],
    technologies: ["Python", "Flask", "React", "PostgreSQL", "RBAC", "Rate Limiting", "Pytest"],
    advancementType: "current",
    icon: "anvil",
    evidenceItems: [
      { icon: "hopper", label: "Query-side paging", summary: "A response from roughly 50,000 records to 50.", supportingBulletIndex: 0 },
      { icon: "shield", label: "Access control", summary: "RBAC and rate limiting on 57+ admin endpoints.", supportingBulletIndex: 1 },
      { icon: "anvil", label: "Tested refactors", summary: "Flask and React changes backed by automated tests.", supportingBulletIndex: 2 },
      { icon: "scroll", label: "Reviewed AI assist", summary: "Claude Code and Codex, gated by review and tests.", supportingBulletIndex: 3 },
    ],
  },
  {
    id: "skopus-ai",
    organization: "Skopus AI",
    title: "Founding Engineer, Part-time",
    startDate: "2026-05",
    endDate: null,
    location: "Remote",
    focus: "Founding engineer owning an AI/RAG service end-to-end.",
    summary:
      "Founding engineer on an AI product with no existing backend. I own the service end-to-end. I authored roughly 99% of a 13K+ source-line codebase, and every architectural call in it is mine.",
    bullets: [
      "Built and own an 8-endpoint AI/RAG service: semantic retrieval over pgvector, grounded analysis so answers stay tied to source material, intent routing to pick the right pipeline per request, and caching plus fallback workflows so a slow or failing model call degrades instead of breaking the product.",
      "Enforce strict validation on every LLM response before it reaches a caller, which is what makes a probabilistic model safe to put behind a typed API contract.",
      "Implemented Google OAuth end-to-end (OAuth 2.0 with PKCE, token handling and session security) rather than delegating auth to a drop-in widget.",
      "Cover the API surface with contract testing so the Next.js/React front end and the service can move independently and integrate the two myself across the full stack.",
    ],
    technologies: ["Node.js", "TypeScript", "PostgreSQL", "pgvector", "Supabase", "AWS ECS", "OpenAI APIs", "Next.js", "React", "OAuth 2.0", "PKCE"],
    advancementType: "current",
    icon: "enchanted-book",
    evidenceItems: [
      { icon: "enchanted-book", label: "RAG service", summary: "8 endpoints: pgvector retrieval, routing, caching and fallback.", supportingBulletIndex: 0 },
      { icon: "name-tag", label: "Validated output", summary: "Every LLM response checked against a typed API contract.", supportingBulletIndex: 1 },
      { icon: "ender-chest", label: "OAuth with PKCE", summary: "Google OAuth, token handling and session security.", supportingBulletIndex: 2 },
      { icon: "crafting-table", label: "Contract tests", summary: "Front end and service move independently.", supportingBulletIndex: 3 },
    ],
  },
];

/** Recruiters land on the most recent work: the role with the latest start date. */
export const DEFAULT_EXPERIENCE_ID = experience[experience.length - 1].id;
