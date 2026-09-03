import React from "react";
import PageSection from "../common/PageSection.tsx";

const groups = [
  {
    title: "Languages",
    items: ["C#", "Python", "TypeScript", "JavaScript", "Java", "C++"],
  },
  {
    title: "Backend & Full Stack",
    items: [
      ".NET Core",
      "Entity Framework",
      "Flask",
      "Node.js",
      "Next.js",
      "React",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    title: "Data & AI",
    items: [
      "PostgreSQL",
      "DynamoDB",
      "Supabase",
      "pgvector",
      "Neo4j",
      "LangGraph",
      "RAG",
      "OpenAI APIs",
      "Embeddings",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "ECS",
      "S3",
      "Lambda",
      "SQS",
      "SNS",
      "CloudWatch",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitLab CI/CD",
    ],
  },
  {
    title: "Security & Engineering",
    items: [
      "OAuth 2.0",
      "PKCE",
      "JWT",
      "RBAC",
      "Rate Limiting",
      "Caching",
      "Contract Testing",
      "NUnit",
      "Pytest",
      "Git",
    ],
  },
  {
    title: "AI-Assisted Development",
    items: ["Claude Code", "Codex"],
  },
];

const Skills: React.FC = () => (
  <PageSection
    eyebrow="Capabilities"
    title="Technical capabilities"
    description="Grouped by what I use them for. The stack has changed with each role — C# and .NET at a bank, Python and Flask on a research platform, Node and TypeScript at a startup — because the fundamentals transfer."
  >
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.title}
          className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40"
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-sky-400">
            {group.title}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </PageSection>
);

export default Skills;
