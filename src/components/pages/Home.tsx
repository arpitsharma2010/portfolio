import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";

const resume = "https://drive.google.com/file/d/1fJuLB-ssJNGaScMs10mAl4_FIe5Fx00K/view";

const quickStats = [
  { label: "Years delivering", value: "3.5+", detail: "Banking healthcare and research workloads" },
  { label: "APIs shipped", value: "30+", detail: "C#/.NET Core services with contract-first docs" },
  { label: "CI/CD uplifts", value: "10 repos", detail: "Jenkins → GitLab pipelines scripted with Terraform" },
];

const Home: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="flex flex-col gap-10 text-white">
      <PageSection
        eyebrow="Arpit Dilip Sharma"
        title="Results driven software developer"
        description="3.5+ years of software engineering cloud deployments and microservices using .NET Core, AWS, React, NoSQL and SQL exactly as summarized on my resume."
      >
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.45)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-text-mute">Hello world</p>
              <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
                Backend + cloud engineer shaping reliable launches
              </h1>
              <p className="mt-4 text-base text-slate-300">
                <Typewriter
                  words={[
                    "Shipping .NET Core REST APIs for DNB",
                    "Automating GitLab + Terraform deployments",
                    "Applying ML + FPGA research to real projects",
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

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <p className="text-[11px] uppercase tracking-[0.4em] text-text-mute">Current</p>
                <p className="mt-1 font-semibold text-white">M.S. CS&E @ SUNY Buffalo</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <p className="text-[11px] uppercase tracking-[0.4em] text-text-mute">Previous</p>
                <p className="mt-1 font-semibold text-white">Senior Software Developer @ TCS</p>
              </div>
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
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.5em] text-text-mute">Availability</dt>
                  <dd className="text-base font-semibold text-white">Full-time Feb 2026</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.5em] text-text-mute">Email</dt>
                  <dd className="text-base font-semibold text-white">arpeet.sharma.1998@gmail.com</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.5em] text-text-mute">Phone</dt>
                  <dd className="text-base font-semibold text-white">+1 (716) 750-7459</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.5em] text-text-mute">Location</dt>
                  <dd className="text-base font-semibold text-white">Jersey City, New Jersey</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Snapshot"
        title="Impact in a glance"
        description="Instrumentation documentation and measurable releases keep stakeholders trusting the process."
        align="center"
        variant="muted"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-text-mute">{stat.label}</p>
              <p className="mt-3 text-xs text-slate-300">{stat.detail}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
};

export default Home;
