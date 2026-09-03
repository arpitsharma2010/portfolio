import React from "react";
import PageSection from "../common/PageSection.tsx";

type Role = {
  company: string;
  position: string;
  duration: string;
  location?: string;
  website?: string;
  summary: string;
  points: string[];
  stack: string[];
};

const roles: Role[] = [
  {
    company: "Skopus AI",
    position: "Founding Engineer, Part-time",
    duration: "May 2026 – Present",
    location: "Remote",
    summary:
      "Founding engineer on an AI product with no existing backend. I own the service end to end — I authored roughly 99% of a 13K+ source-line codebase, and every architectural call in it is mine.",
    points: [
      "Built and own an 8-endpoint AI/RAG service: semantic retrieval over pgvector, grounded analysis so answers stay tied to source material, intent routing to pick the right pipeline per request, and caching plus fallback workflows so a slow or failing model call degrades instead of breaking the product.",
      "Enforce strict validation on every LLM response before it reaches a caller, which is what makes a probabilistic model safe to put behind a typed API contract.",
      "Implemented Google OAuth end to end — OAuth 2.0 with PKCE, token handling and session security — rather than delegating auth to a drop-in widget.",
      "Cover the API surface with contract testing so the Next.js/React front end and the service can move independently, and integrate the two myself across the full stack.",
    ],
    stack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Supabase",
      "AWS ECS",
      "OpenAI APIs",
      "Next.js",
      "React",
      "OAuth 2.0",
      "PKCE",
    ],
  },
  {
    company: "University at Buffalo — Tesserae",
    position: "Software Engineer, Part-time",
    duration: "Nov 2025 – Present",
    location: "Remote",
    website: "https://tesserae.caset.buffalo.edu/",
    summary:
      "Tesserae is a research platform for intertextual analysis of classical corpora, used by scholars and run in production. My work is API performance, access control and making an inherited codebase safe to change.",
    points: [
      "Cut a rare-word API response from roughly 50,000 records to 50 per request. The endpoint was returning an entire result set to a client that only ever rendered a page of it — the fix was moving selection into the query rather than the browser.",
      "Added role-based access control and rate limiting, securing 57+ admin endpoints that were previously reachable by any authenticated caller.",
      "Debugged and refactored existing Flask and React code, and backed the changes with automated tests so the research team can deploy without manual verification.",
      "Work AI-assisted with Claude Code and Codex for exploration and refactoring, with review and tests as the gate on anything that ships.",
    ],
    stack: ["Python", "Flask", "React", "PostgreSQL", "RBAC", "Rate Limiting", "Pytest"],
  },
  {
    company: "DNB",
    position: "Software Engineer II",
    duration: "Apr 2023 – Jul 2024",
    summary:
      "DNB's merger with Sbanken required integrating a savings and investment microservice that had no documentation and no original authors available. I was assigned to make it understandable, then to own its releases.",
    points: [
      "Reverse-engineered the undocumented Sbanken microservice: mapped 15+ endpoints, recovered their API contracts, traced every downstream dependency and produced the data-flow documentation the merger integration was planned against.",
      "Owned 20+ production releases across four environments — backend development, testing, AWS deployment and release validation — as the engineer accountable for each one reaching production intact.",
      "Built and maintained the delivery path with GitLab CI/CD and Terraform, using CloudWatch for observability.",
      "Diagnosed production 4xx/5xx failures across service boundaries, where the reported symptom and the actual fault were usually in different services.",
    ],
    stack: [
      "C#",
      ".NET Core",
      "AWS",
      "GitLab CI/CD",
      "Terraform",
      "CloudWatch",
      "REST APIs",
      "Microservices",
      "NUnit",
    ],
  },
  {
    company: "DNB",
    position: "Software Engineer I",
    duration: "Nov 2020 – Mar 2023",
    summary:
      "Backend and API engineering on a wealth-management platform, plus the full-stack work to put those APIs in front of customers.",
    points: [
      "Reduced API latency from roughly 800 ms to 500 ms by executing independent downstream calls concurrently instead of sequentially — the endpoint was waiting on calls that had no dependency on each other.",
      "Decomposed a 25+ endpoint service into two independently deployable microservices, so the two halves could ship on their own schedules and a fault in one stopped taking the other down with it.",
      "Automated investment-processing workflows and customer notifications on AWS S3 and ECS, replacing steps that had been run by hand.",
      "Built 25+ reusable React and TypeScript components across 10+ responsive screens, and integrated them against the APIs I had written on the backend.",
    ],
    stack: [
      "C#",
      ".NET Core",
      "DynamoDB",
      "PostgreSQL",
      "AWS S3",
      "AWS ECS",
      "React",
      "TypeScript",
      "REST APIs",
    ],
  },
];

const Experience: React.FC = () => (
  <PageSection
    eyebrow="Experience"
    title="Engineering experience"
    description="Four roles across a bank, a university research platform and an AI startup. In each one the work was owning a service — understanding it, changing it safely and being accountable for it in production."
  >
    <ol className="relative flex flex-col gap-10 border-l border-slate-200 pl-6 dark:border-slate-800 sm:pl-8">
      {roles.map((role) => (
        <li key={`${role.company}-${role.position}`} className="relative">
          <span
            className="absolute -left-[1.85rem] top-2 h-2.5 w-2.5 rounded-full bg-blue-700 ring-4 ring-slate-50 dark:bg-sky-400 dark:ring-[#0b1120] sm:-left-[2.35rem]"
            aria-hidden
          />
          <article className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40 sm:p-7">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {role.position}
                </h3>
                <p className="text-base font-medium text-slate-700 dark:text-slate-300">
                  {role.website ? (
                    <a
                      href={role.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 underline-offset-4 hover:text-blue-700 dark:decoration-slate-600 dark:hover:text-sky-400"
                    >
                      {role.company}
                    </a>
                  ) : (
                    role.company
                  )}
                </p>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="font-mono text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {role.duration}
                </p>
                {role.location && (
                  <p className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
                    {role.location}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {role.summary}
            </p>

            <ul className="mt-5 flex flex-col gap-3">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600"
                    aria-hidden
                  />
                  <span className="text-slate-700 dark:text-slate-300">{point}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-slate-800">
              {role.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-400"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  </PageSection>
);

export default Experience;
