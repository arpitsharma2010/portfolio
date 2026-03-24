import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import SEO from "../utils/SEO.tsx";

const resume = "https://drive.google.com/file/d/1e_GcWvtUy6fHMgnmjvwzVIFNeFW0F457/view?usp=sharing";

const Home: React.FC<{ url: string }> = ({ url }) => {
  const pageUrl = `${url}`;
  const seoDescription =
    "Versatile Software Development Engineer with nearly four years delivering enterprise-grade solutions across frontend, backend, cloud infrastructure, and DevOps.";
  const seoKeywords = [
    "Arpit Sharma",
    "Senior Software Developer",
    ".NET Core portfolio",
    "AWS engineer",
    "Full-stack engineer Buffalo",
  ];

  return (
    <>
      <SEO
        title="Arpit Sharma | Software Development Engineer"
        description={seoDescription}
        keywords={seoKeywords}
        image={`${url}arpit-sharma.jpg`}
        url={pageUrl}
        type="website"
      />
      <div className="flex flex-col gap-16 pb-12 w-full max-w-7xl mx-auto">
        {/* Split Hero Section */}
        <section className="relative w-full pt-16 pb-20 px-8 lg:px-14 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 bg-white/[0.01] border border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:border-slate-700 transition">
          {/* Left Text Content */}
          <div className="flex-1 space-y-8 z-10 w-full">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-sapphire mb-5">
                Software Development Engineer
              </p>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-100">
                Architecting high-performance{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                  engineering solutions.
                </span>
              </h1>
              <p className="mt-8 text-lg lg:text-xl text-slate-400 max-w-2xl leading-relaxed">
                Results-driven Full-Stack Engineer with nearly 4 years of experience designing scalable distributed systems, optimizing cloud infrastructure, and deploying enterprise-grade web applications.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-sapphire px-7 py-4 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-all active:scale-95"
                aria-label="Download Arpit's Resume"
              >
                <FiDownload /> Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-transparent px-7 py-4 text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.05] active:scale-95"
              >
                Let’s collaborate <FiArrowRight aria-hidden />
              </a>
            </div>
          </div>
          
          {/* Right Image/Visual Content */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
              <img
                src={`${url}arpit-sharma.jpg`}
                alt="Arpit Sharma"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80" />
            </div>
          </div>
        </section>

        {/* Info Highlights - Clean Sub-section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
          <div className="p-8 rounded-2xl bg-white/[0.015] border border-slate-800 hover:border-slate-600 transition shadow-sm">
            <h3 className="text-xs font-mono tracking-widest text-slate-500 mb-3 uppercase">Location</h3>
            <p className="text-xl font-semibold text-slate-200">Buffalo, NY</p>
            <p className="text-sm text-slate-400 mt-2">Open to relocation across USA</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/[0.015] border border-slate-800 hover:border-slate-600 transition shadow-sm">
            <h3 className="text-xs font-mono tracking-widest text-slate-500 mb-3 uppercase">Experience</h3>
            <p className="text-xl font-semibold text-slate-200">3.5+ Years</p>
            <p className="text-sm text-slate-400 mt-2">Full-Stack & Cloud Engineering</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/[0.015] border border-slate-800 hover:border-slate-600 transition shadow-sm">
            <h3 className="text-xs font-mono tracking-widest text-slate-500 mb-3 uppercase">Availability</h3>
            <p className="text-xl font-semibold text-slate-200">Immediate</p>
            <p className="text-sm text-slate-400 mt-2 truncate" title="arpeet.sharma.1998@gmail.com">arpeet.sharma.1998@gmail.com</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
