import React from "react";
import PageSection from "../common/PageSection.tsx";
import SEO from "../utils/SEO.tsx";

const skillGroups = [
  {
    title: "Languages & Systems",
    description:
      "C#, Java, Python, JavaScript (ES6+), C, C++, SQL, PHP, HTML5/CSS3 and Verilog form the backbone of my .NET Core APIs, browser interfaces, data engineering utilities and FPGA designs.",
    tools: ["C#", "Java", "Python", "JavaScript (ES6+)", "C", "C++", "SQL", "PHP", "HTML5/CSS3", "Verilog"],
  },
  {
    title: "Frameworks & Libraries",
    description:
      ".NET Core with Entity Framework powers savings and investment services, while Spring Boot, ReactJS, Flask, FastAPI, PyTorch and Bootstrap help me deliver UI surfaces, ML prototypes and internal portals with consistent coding standards.",
    tools: [".NET Core", "Entity Framework", "Spring Boot", "ReactJS", "Flask", "FastAPI", "PyTorch", "Bootstrap"],
  },
  {
    title: "Cloud & DevOps",
    description:
      "AWS Lambda, API Gateway, DynamoDB, S3 and CloudWatch host production workloads; Terraform, Docker, Jenkins and GitLab CI/CD automate the path from pull request to deployment with controlled rollbacks and observability baked in.",
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
      "JUnit, NUnit and Moq keep business logic regression-free; Swagger/OpenAPI, OAuth2, Postman, SonarQube, MySQL, Pandas, PySpark and Scikit-learn ensure every API contract, data pipeline and ML model is traceable and validated.",
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
      "Git (distributed), Jira, Confluence, Agile/Scrum cadences and RESTful API design templates keep cross-functional teams aligned from planning through QA handoff.",
    tools: ["Git", "Jira", "Confluence", "Agile/Scrum", "RESTful API Design"],
  },
];

interface SkillsProps {
  url: string;
}

const Skills: React.FC<SkillsProps> = ({ url }) => {
  const pageUrl = `${url}skills/`;
  const description =
    "Technical skill matrix covering languages, frameworks, cloud platforms, and collaboration tooling Arpit Sharma uses to deliver banking and research software.";
  const keywords = [
    "Arpit Sharma skills",
    ".NET Core skills",
    "AWS expertise",
    "GitLab CI/CD skills",
    "Terraform automation skills",
    "Software engineer resume skills",
  ];

  return (
    <>
      <SEO
        title="Skills | Arpit Sharma"
        description={description}
        keywords={keywords}
        image={`${url}arpit-sharma.jpg`}
        url={pageUrl}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Skillset - Arpit Sharma",
          numberOfItems: skillGroups.length,
          itemListElement: skillGroups.map((group, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "DefinedTerm",
              name: group.title,
              description: group.description,
              alternateName: group.tools.join(", "),
            },
          })),
        }}
      />
      <section className="flex flex-col gap-10 text-white">
      <PageSection
        eyebrow="Capability stack"
        title="Skills from my resume"
        description="Everything here is in my resume, pairing years of regulated delivery with the research and prototypes I’m actively building."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-plasma/10 via-transparent to-ion/10 opacity-60" aria-hidden />
              <div className="relative">
                <h3 className="mt-2 text-2xl font-semibold text-white">{group.title}</h3>
                <p className="mt-2 text-sm text-slate-200">{group.description}</p>
              </div>
              <div className="relative flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-text-mute"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </PageSection>
    </section>
    </>
  );
};

export default Skills;
