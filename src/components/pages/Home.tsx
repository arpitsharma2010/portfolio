import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { FiArrowRight, FiCloud, FiCpu, FiDownload, FiLayers, FiShield } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import ModuleCard from "../modules/ModuleCard.tsx";

const resume = "https://drive.google.com/file/d/1fJuLB-ssJNGaScMs10mAl4_FIe5Fx00K/view";

const stats = [
  { value: "3.5+", label: "Years building software", caption: "Backend engineering, cloud deployments, and full-stack delivery for regulated workloads." },
  { value: "30+", label: "REST APIs shipped", caption: "C# .NET Core services powering DNB’s savings and investment platforms." },
  { value: "10+", label: "CI/CD migrations", caption: "Jenkins to GitLab pipelines locked down with Terraform and AWS Secrets Manager." },
  { value: "85%+", label: "SonarQube coverage", caption: "Maintained via NUnit/Moq suites and code reviews across 10+ repos." },
];

const focusBadges = [
  ".NET Core + Entity Framework",
  "AWS Lambda · API Gateway · DynamoDB",
  "GitLab CI/CD + Terraform",
  "ReactJS & Spring Boot delivery",
  "ML + FPGA research projects",
];

const workModules = [
  {
    title: "Backend & API engineering",
    description: "Results-driven software developer shipping production-grade services for Norway’s largest bank.",
    highlights: [
      "Built and maintained 30+ C# .NET Core REST APIs with Entity Framework, integrating internal banking systems exactly as noted in my resume.",
      "Reverse-engineered SBanken modules during the DNB merger and documented every interface so developers and testers could onboard quickly.",
      "Authored Postman collections and Swagger/OpenAPI contracts to guarantee each API was discoverable and reproducible.",
    ],
    tags: ["C#", ".NET Core", "Entity Framework"],
    icon: <FiLayers />,
  },
  {
    title: "Cloud, DevOps & migrations",
    description: "Deployments stay formal thanks to GitLab CI/CD pipelines, Terraform, and AWS-native services.",
    highlights: [
      "Directed production releases with GitLab CI/CD and Terraform, orchestrating controlled rollouts and defined recovery workflows.",
      "Migrated 10+ repos from Jenkins to GitLab, codifying infrastructure dependencies with AWS Secrets Manager and Lambda-based batch jobs.",
      "Monitored 10,000+ CloudWatch log entries to resolve runtime issues before customers felt impact.",
    ],
    tags: ["AWS Lambda", "API Gateway", "CI/CD"],
    icon: <FiCloud />,
  },
  {
    title: "Quality, testing & documentation",
    description: "Every sprint couples code with traceable quality signals.",
    highlights: [
      "Maintained 85%+ SonarQube coverage and reliable NUnit/Moq regression suites for core savings and investment services.",
      "Performed code reviews across 10+ repositories each sprint to enforce modular design and security standards.",
      "Ran Agile ceremonies with Jira/Confluence, keeping QA, product, and operations aligned on release notes and test evidence.",
    ],
    tags: ["SonarQube", "NUnit", "Agile"],
    icon: <FiShield />,
  },
  {
    title: "Research & advanced coursework",
    description: "Graduate education at SUNY Buffalo keeps me hands-on with ML and hardware-software co-design.",
    highlights: [
      "Building the 16-bit single-cycle RISC processor and documenting each module for peers to reproduce.",
      "Delivering the crop-yield prediction workflow with Pandas, PySpark, Scikit-learn, and a Flask front-end for non-technical users.",
      "Maintaining a 3.71/4 GPA while balancing professional consulting work and research-heavy semesters.",
    ],
    tags: ["Verilog", "Flask", "Pandas"],
    icon: <FiCpu />,
  },
];

const initiatives = [
  {
    title: "DNB merger integration",
    context: "TCS · Pune, India",
    detail: "Analyzed SBanken codebases, authored onboarding guides, and led GitLab/Terraform releases during the DNB acquisition.",
    meta: "Senior Software Developer · Sep 2023 – Jul 2024",
    action: { label: "Read resume highlights", href: "https://www.linkedin.com/in/arpitsharma2010/" },
  },
  {
    title: "Cloud-native platform work",
    context: "TCS · Pune, India",
    detail: "Built 30+ REST APIs, migrated Jenkins pipelines, and enforced 85%+ SonarQube coverage while supporting Agile squads.",
    meta: "Software Developer · Apr 2021 – Aug 2023",
    action: { label: "Explore experience", to: "/portfolio/experience/" },
  },
  {
    title: "Graduate research",
    context: "University at Buffalo",
    detail: "Pursuing M.S. CSE (GPA 3.71/4) with hardware-software and ML focus; projects include the Basys3 RISC processor.",
    meta: "Aug 2024 – Dec 2025",
    action: { label: "View academics", to: "/portfolio/education/" },
  },
  {
    title: "Agri-tech ML delivery",
    context: "Project work",
    detail: "Built the crop-yield prediction pipeline using Pandas, PySpark, and Scikit-learn before deploying it with Flask.",
    meta: "Sep 2024 – Nov 2024",
    action: { label: "See project details", to: "/portfolio/projects/" },
  },
];

const Home: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 text-left text-slate-900 dark:text-white">
      <PageSection
        eyebrow="Arpit Dilip Sharma"
        title="Results-driven software developer"
        description="3.5+ years of backend engineering, cloud deployments, and full-stack delivery using .NET Core, AWS, React, and SQL—exactly as summarized on my resume."
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-300">
                Hello world, I’m Arpit
              </p>
              <h1 className="mt-2 text-4xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Building regulated platforms with precision
              </h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-200">
                <Typewriter
                  words={[
                    "Backend engineer shipping .NET Core REST APIs for DNB",
                    "Cloud & DevOps practitioner scaling GitLab CI/CD + Terraform",
                    "ML and FPGA builder applying research to real-world delivery",
                  ]}
                  loop
                  typeSpeed={80}
                  deleteSpeed={40}
                  delaySpeed={1600}
                  cursor
                  cursorStyle="▋"
                />
              </p>
            </div>

            <p className="text-base text-slate-600 dark:text-slate-300">
              I’ve led SBanken-to-DNB integrations, migrated 10+ repositories from Jenkins to GitLab CI/CD, and shipped
              30+ REST APIs that rely on AWS Lambda, API Gateway, and DynamoDB. The same discipline enables my crop-yield ML workflow
              and the Basys3-based RISC processor documented in the Projects section.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-700"
              >
                <FiDownload aria-hidden /> Download resume
              </a>
              <Link
                to="/portfolio/contact/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-white/20 dark:text-white dark:hover:border-cyan-400"
              >
                Let’s collaborate <FiArrowRight aria-hidden />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {focusBadges.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/40">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950/60">
              <img
                src={`${url}developer_image.jpg`}
                alt="Arpit Sharma"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <dl className="mt-6 grid gap-4 text-sm text-slate-600 dark:text-slate-200">
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Currently</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">M.S. CS&E candidate @ SUNY Buffalo</dd>
                <dd>Former Senior Software Developer at TCS delivering DNB’s banking integrations.</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Phone</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">+1 (716) 750-7459</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Email</dt>
                <dd className="font-semibold text-slate-900 dark:text-white">arpitdil@buffalo.edu</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Focus</dt>
                <dd>Backend engineering, AWS-native deployments, ML + FPGA research.</dd>
              </div>
            </dl>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Delivery metrics"
        title="Pragmatic engineering with measurable impact"
        description="I obsess over clarity: instrumentation is non-negotiable, playbooks are versioned, and every sprint links back to business outcomes."
        align="center"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-5 text-center shadow-lg shadow-slate-900/5 dark:border-white/5 dark:bg-slate-900/60"
            >
              <p className="text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-200">
                {item.label}
              </p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.caption}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <div className="grid gap-6 md:grid-cols-2">
        {workModules.map((module) => (
          <ModuleCard key={module.title} {...module} />
        ))}
      </div>

      <PageSection
        eyebrow="Current focus"
        title="Selected initiatives & learning tracks"
        description="Mixing industry-scale programs with research-heavy coursework keeps me grounded in both rigor and experimentation."
        variant="muted"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {initiatives.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-lg shadow-slate-900/5 dark:border-white/5 dark:bg-slate-900/40"
            >
              <header>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{item.context}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              </header>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                {item.meta}
              </p>
              {item.action?.href ? (
                <a
                  href={item.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-300"
                >
                  {item.action.label} <FiArrowRight aria-hidden />
                </a>
              ) : item.action?.to ? (
                <Link
                  to={item.action.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-300"
                >
                  {item.action.label} <FiArrowRight aria-hidden />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </PageSection>
    </div>
  );
};

export default Home;
