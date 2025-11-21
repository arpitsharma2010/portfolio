import React from "react";
import PageSection from "../common/PageSection.tsx";

interface SkillsProps {
  url: string;
}

const skillGroups = [
  {
    title: "Languages & Systems",
    description:
      "C#, Java, Python, JavaScript (ES6+), C, C++, SQL, PHP, HTML5/CSS3, and Verilog form the backbone of my .NET Core APIs, browser interfaces, data engineering utilities, and FPGA designs. Each production feature mixes at least two of these languages, so I keep reference implementations documented for quick onboarding.",
    tools: ["C#", "Java", "Python", "JavaScript (ES6+)", "C", "C++", "SQL", "PHP", "HTML5/CSS3", "Verilog"],
  },
  {
    title: "Frameworks & Libraries",
    description:
      ".NET Core with Entity Framework powers savings and investment services, while Spring Boot, ReactJS, Flask, FastAPI, PyTorch, and Bootstrap help me deliver UI surfaces, ML prototypes, and internal portals with consistent coding standards.",
    tools: [".NET Core", "Entity Framework", "Spring Boot", "ReactJS", "Flask", "FastAPI", "PyTorch", "Bootstrap"],
  },
  {
    title: "Cloud & DevOps",
    description:
      "AWS Lambda, API Gateway, DynamoDB, S3, and CloudWatch host production workloads; Terraform, Docker, Jenkins, and GitLab CI/CD automate the path from pull request to deployment with controlled rollbacks and observability baked in.",
    tools: [
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "S3",
      "CloudWatch",
      "Terraform",
      "Docker",
      "Jenkins",
      "GitLab CI/CD",
    ],
  },
  {
    title: "Testing, Security & Data",
    description:
      "JUnit, NUnit, and Moq keep business logic regression-free; Swagger/OpenAPI, OAuth2, Postman, SonarQube, MySQL, Pandas, PySpark, and Scikit-learn ensure every API contract, data pipeline, and ML model is traceable and validated.",
    tools: [
      "JUnit",
      "NUnit",
      "Moq",
      "Swagger/OpenAPI",
      "OAuth2",
      "Postman",
      "SonarQube",
      "MySQL",
      "Pandas",
      "PySpark",
      "Scikit-learn",
    ],
  },
  {
    title: "Workflow & Collaboration",
    description:
      "Git (distributed), Jira, Confluence, Agile/Scrum cadences, and RESTful API design templates keep cross-functional teams aligned from planning through QA handoff, mirroring the collaboration model outlined in my resume experience.",
    tools: ["Git", "Jira", "Confluence", "Agile/Scrum", "RESTful API Design"],
  },
];

const Skills: React.FC<SkillsProps> = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-6 min-h-screen transition-colors duration-300 bg-light-surface text-light-text dark:bg-[#0f172a] dark:text-white">
      <h2 className="text-4xl font-extrabold text-center mb-12 tracking-wide text-cyan-700 dark:text-cyan-400">
        Skills From My Resume
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 xl:grid-cols-2">
        {skillGroups.map((group) => (
          <PageSection
            key={group.title}
            eyebrow={group.title}
            title=""
            description={group.description}
            variant="muted"
            className="h-full"
          >
            <div className="flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-100"
                >
                  {tool}
                </span>
              ))}
            </div>
          </PageSection>
        ))}
      </div>
    </section>
  );
};

export default Skills;
