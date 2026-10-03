import React from "react";
import { FaBrain, FaCloud, FaCode, FaDatabase, FaLock, FaToolbox } from "react-icons/fa";
import PageSection from "../common/PageSection.tsx";

const groups = [
  { title: "Languages", icon: FaCode, items: ["C#", "Python", "TypeScript", "JavaScript", "Java", "C++"] },
  {
    title: "Backend & Full Stack",
    icon: FaToolbox,
    items: [".NET Core", "Entity Framework", "Flask", "Node.js", "Next.js", "React", "REST APIs", "Microservices"],
  },
  {
    title: "Data & AI",
    icon: FaDatabase,
    items: ["PostgreSQL", "DynamoDB", "Supabase", "pgvector", "Neo4j", "LangGraph", "RAG", "OpenAI APIs", "Embeddings"],
  },
  {
    title: "Cloud & DevOps",
    icon: FaCloud,
    items: ["AWS", "ECS", "S3", "Lambda", "SQS", "SNS", "CloudWatch", "Docker", "Kubernetes", "Terraform", "GitLab CI/CD"],
  },
  {
    title: "Security & Engineering",
    icon: FaLock,
    items: ["OAuth 2.0", "PKCE", "JWT", "RBAC", "Rate Limiting", "Caching", "Contract Testing", "NUnit", "Pytest", "Git"],
  },
  { title: "AI-Assisted Development", icon: FaBrain, items: ["Claude Code", "Codex"] },
];

const Skills: React.FC = () => (
  <PageSection
    eyebrow="Inventory"
    title="Technical capabilities"
    description="Grouped by what I use them for. Focus a slot to inspect it; every item here is grounded in my work or projects."
    variant="wood"
  >
    <div className="inventory" aria-label="Technical skills inventory">
      <div className="inventory__top"><span>Crafting inventory</span><span>{groups.reduce((total, group) => total + group.items.length, 0)} items</span></div>
      <div className="inventory__groups">
        {groups.map(({ title, icon: Icon, items }) => (
          <section className="inventory-group" key={title} aria-labelledby={`skill-${title.replace(/ /g, "-")}`}>
            <h3 id={`skill-${title.replace(/ /g, "-")}`}><Icon aria-hidden /> {title}</h3>
            <ul>
              {items.map((item, index) => (
                <li key={item} title={`${item} · ${title}`}>
                  <span className={`skill-gem skill-gem--${index % 5}`} aria-hidden>{item.slice(0, 2)}</span>
                  <span className="skill-name">{item}</span>
                  <span className="skill-tooltip" aria-hidden>{item}<small>{title}</small></span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  </PageSection>
);

export default Skills;
