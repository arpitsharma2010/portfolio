import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import {
  EMAIL,
  GITHUB_URL,
  LEETCODE_URL,
  LINKEDIN_URL,
  LOCATION,
  RESUME_URL,
} from "../../utils/constants";

const channels = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: FiMail },
  { label: "LinkedIn", value: "in/arpitsharma2010", href: LINKEDIN_URL, Icon: FaLinkedin },
  { label: "GitHub", value: "arpitsharma2010", href: GITHUB_URL, Icon: FaGithub },
  { label: "LeetCode", value: "arpitsharma2010", href: LEETCODE_URL, Icon: SiLeetcode },
];

const Contact: React.FC = () => (
  <PageSection
    eyebrow="Contact"
    title="Get in touch"
    description="Open to Software Engineer, Backend, Full-Stack, Cloud and AI engineering roles. Email is the fastest way to reach me and I reply to everything."
  >
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map(({ label, value, href, Icon }) => {
          const isExternal = href.startsWith("http");
          return (
            <li key={label}>
              <a
                href={href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-700 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-sky-400"
              >
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
                  <Icon aria-hidden /> {label}
                </span>
                <span className="break-words text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {value}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          <FiMail aria-hidden /> Email me
        </a>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
        >
          Resume <FiExternalLink aria-hidden />
        </a>
        <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <FiMapPin aria-hidden /> {LOCATION} · open to relocation
        </p>
      </div>
    </div>
  </PageSection>
);

export default Contact;
