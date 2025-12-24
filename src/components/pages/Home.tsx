import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";

const resume = "https://drive.google.com/file/d/1fJuLB-ssJNGaScMs10mAl4_FIe5Fx00K/view";

const focusBadges = [
  ".NET Core + Entity Framework",
  "GitLab CI/CD + Terraform",
  "AWS Lambda + API Gateway",
  "FPGA + ML research",
];

const Home: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="flex flex-col gap-10 text-white">
      <PageSection
        eyebrow="Arpit Dilip Sharma"
        title="Results driven software developer"
        description="3.5+ years of backend engineering, cloud deployments, and full stack delivery using .NET Core, AWS, React, and SQL exactly as summarized on my resume."
      >
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.45)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-text-mute">Hello world</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Backend + cloud engineer for regulated teams
              </h1>
              <p className="mt-4 text-base text-slate-300">
                <Typewriter
                  words={[
                    "Shipping .NET Core REST APIs for DNB",
                    "Automating GitLab + Terraform deployments",
                    "Researching ML + FPGA builds at SUNY Buffalo",
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

            <div className="flex flex-wrap gap-3">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-plasma to-ion px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-glow transition hover:brightness-110"
              >
                <FiDownload /> Download resume
              </a>
              <Link
                to="/portfolio/contact/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-ion/60"
              >
                Let’s collaborate <FiArrowRight aria-hidden />
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {focusBadges.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-text-mute"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Current", value: "M.S. CS&E @ SUNY Buffalo" },
                { label: "Previous", value: "Senior Software Developer @ TCS" },
              ].map((card) => (
                <div key={card.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-text-mute">{card.label}</p>
                  <p className="mt-1 font-semibold text-white">{card.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
            <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-aurora/30 blur-3xl" aria-hidden />
            <div className="overflow-hidden rounded-[2rem] border border-white/10">
              <img
                src={`${url}arpit-sharma.jpg`}
                alt="Arpit Sharma"
                className="h-64 w-full object-cover"
                loading="lazy"
              />
            </div>
            <dl className="mt-6 grid gap-4 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-[11px] uppercase tracking-[0.5em] text-text-mute">Comms</dt>
                <dd className="text-base font-semibold text-white">arpitdil@buffalo.edu</dd>
                <dd className="text-xs text-slate-400">+1 (716) 750-7459</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <dt className="text-[11px] uppercase tracking-[0.5em] text-text-mute">Focus</dt>
                <dd className="text-base font-semibold text-white">Backend engineering · Cloud deployments · ML/FPGA research</dd>
              </div>
            </dl>
          </div>
        </div>
      </PageSection>

      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 text-center text-sm text-slate-200 shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-text-mute">Experience</p>
          <p className="mt-1 text-2xl font-semibold text-white">3.5+ years</p>
        </div>
        <span className="text-white/30 text-2xl">•</span>
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-text-mute">APIs shipped</p>
          <p className="mt-1 text-2xl font-semibold text-white">30+</p>
        </div>
        <span className="text-white/30 text-2xl">•</span>
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-text-mute">CI/CD migrations</p>
          <p className="mt-1 text-2xl font-semibold text-white">10+</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
