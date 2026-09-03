import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowRight, FiExternalLink, FiMail } from "react-icons/fi";
import {
  ASSET_BASE,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  NAME,
  RESUME_URL,
} from "../../utils/constants";

const facts = [
  { label: "Location", value: `${LOCATION}`, detail: "Open to relocation across the US" },
  { label: "Experience", value: "4+ years", detail: "Banking, research and startup teams" },
  {
    label: "Focus",
    value: "Backend & cloud",
    detail: "Distributed systems, APIs, agentic AI",
  },
];

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800";
const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800";

const Home: React.FC = () => (
  <div className="flex flex-col gap-12">
    <div className="flex flex-col-reverse items-start gap-10 lg:flex-row lg:items-center lg:gap-14">
      <div className="flex w-full flex-col gap-6">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
          {NAME}
        </h1>
        <p className="text-base font-semibold text-blue-700 sm:text-lg dark:text-sky-400">
          Software Engineer <span className="text-slate-400 dark:text-slate-600">|</span> Full-Stack
          &amp; Cloud-Native Engineering{" "}
          <span className="text-slate-400 dark:text-slate-600">|</span> Distributed Systems{" "}
          <span className="text-slate-400 dark:text-slate-600">|</span> Agentic AI
        </p>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          I build and own production software end to end — backend services and REST APIs,
          cloud-native infrastructure on AWS, full-stack React front ends, and LLM/RAG systems that
          have to be correct, not just impressive. Four-plus years across a Norwegian bank&rsquo;s
          wealth-management platform, a research web platform at the University at Buffalo, and a
          founding-engineer seat at an AI startup.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={primaryButton}>
            Resume <FiExternalLink aria-hidden />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryButton}
          >
            <FaLinkedin aria-hidden /> LinkedIn
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryButton}
          >
            <FaGithub aria-hidden /> GitHub
          </a>
          <a href="#contact" className={secondaryButton}>
            <FiMail aria-hidden /> Contact <FiArrowRight aria-hidden />
          </a>
        </div>
      </div>

      <div className="w-40 shrink-0 sm:w-52 lg:w-64">
        <img
          src={`${ASSET_BASE}arpit-sharma.jpg`}
          alt={`Portrait of ${NAME}`}
          width={512}
          height={512}
          className="aspect-square w-full rounded-2xl border border-slate-200 object-cover dark:border-slate-800"
        />
      </div>
    </div>

    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40"
        >
          <dt className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
            {fact.label}
          </dt>
          <dd className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            {fact.value}
          </dd>
          <dd className="mt-1 text-sm text-slate-600 dark:text-slate-400">{fact.detail}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default Home;
