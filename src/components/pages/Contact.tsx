import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import PageSection from "../common/PageSection.tsx";
import SocialLinks from "../utils/SocialLinks.tsx";

const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

const Contact: React.FC = () => {
  return (
    <section className="flex flex-col gap-10 text-white">
      <PageSection
        eyebrow="Contact"
        title="Get in Touch"
        description="Jersey City, New Jersey · USA. Available across EST with flexible collaboration windows."
      >
        <div className="grid gap-6 text-center lg:grid-cols-3">
          <article className="flex flex-col items-center gap-2 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <FaMapMarkerAlt className="text-3xl text-ion" />
            <p className="font-semibold text-slate-100">Jersey City, New Jersey, USA</p>
          </article>
          <article className="flex flex-col items-center gap-2 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <FaEnvelope className="text-3xl text-ion" />
            <a href="mailto:arpitdil@buffalo.edu" className="text-slate-100 hover:text-ion text-sm">
              arpitdil@buffalo.edu
            </a>
            <a href="mailto:arpeet.sharma.1998@gmail.com" className="text-slate-100 hover:text-ion text-sm">
              arpeet.sharma.1998@gmail.com
            </a>
          </article>
          <article className="flex flex-col items-center gap-2 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <FaPhone className="text-3xl text-ion" />
            <p className="font-semibold text-slate-100">+1 (716) 750-7459</p>
          </article>
        </div>
        <div className="mt-8 flex flex-col items-center gap-6">
          <h3 className="text-2xl font-semibold text-aurora">Connect with Me</h3>
          <SocialLinks size="text-3xl" gap="gap-8" />
          <a
            href={resumePDF}
            download="Arpit_Sharma_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-plasma to-ion px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-glow"
          >
            View Resume
          </a>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Location"
        title="Google Maps"
        description="Happy to meet across New York City or collaborate remotely."
        variant="muted"
      >
        <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps?q=Jersey%20City%2C%20New%20Jersey&output=embed"
            width="100%"
            height="350"
            loading="lazy"
            className="h-full w-full"
          />
        </div>
      </PageSection>
    </section>
  );
};

export default Contact;
