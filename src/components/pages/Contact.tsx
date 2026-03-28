import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import PageSection from "../common/PageSection.tsx";
import SocialLinks from "../utils/SocialLinks.tsx";
import SEO from "../utils/SEO.tsx";
import { RESUME_URL } from "../../utils/constants";

const resumePDF = RESUME_URL;

interface ContactProps {
  url: string;
}

const Contact: React.FC<ContactProps> = ({ url }) => {
  const pageUrl = `${url}contact/`;
  const description =
    "Contact Arpit Sharma in Buffalo, New York for Senior Software Development Engineer opportunities, collaborations, or speaking engagements.";

  return (
    <>
      <SEO
        title="Contact | Arpit Sharma"
        description={description}
        keywords={[
          "Contact Arpit Sharma",
          "Buffalo software developer",
          "Arpit Sharma email",
          "Senior Software Development Engineer contact",
        ]}
        image={`${url}arpit-sharma.jpg`}
        url={pageUrl}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: pageUrl,
          mainEntity: {
            "@type": "Person",
            name: "Arpit Sharma",
            email: "arpeet.sharma.1998@gmail.com",
            telephone: "+1-716-750-7459",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Buffalo",
              addressRegion: "NY",
              addressCountry: "USA",
            },
          },
        }}
      />
      <div className="flex flex-col gap-12 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageSection
          eyebrow="Contact"
          title="Get in Touch"
          description="Available for select opportunities and collaborations across EST. Let's start a conversation."
          align="left"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-8">
            {/* Left Side: Intro and CTA */}
            <div className="flex-1 space-y-8">
              <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-100 leading-tight">
                Let's build something <span className="text-brand-sapphire">extraordinary.</span>
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                Whether you have a specific project in mind, are looking for a Senior Software Development Engineer to join your team, or just want to chat about cloud architecture, I'm always open to discussing new opportunities.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:arpeet.sharma.1998@gmail.com" 
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-brand-sapphire px-8 py-4 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
                >
                  <FaEnvelope /> Say Hello
                </a>
                <a 
                  href={resumePDF} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-600 bg-transparent px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:bg-white/[0.05]"
                >
                  View Résumé
                </a>
              </div>
            </div>

            {/* Right Side: Contact Details Card Layout */}
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex items-center gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.015] border border-slate-800 hover:border-slate-700 transition shadow-sm">
                <div className="p-4 rounded-xl bg-slate-800 text-brand-sapphire shrink-0 shadow-inner">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-1.5">Location</p>
                  <p className="text-lg font-semibold text-slate-200">Buffalo, NY (Open to Relocate)</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.015] border border-slate-800 hover:border-slate-700 transition shadow-sm">
                <div className="p-4 rounded-xl bg-slate-800 text-brand-sapphire shrink-0 shadow-inner">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-1.5">Email</p>
                  <a href="mailto:arpeet.sharma.1998@gmail.com" className="text-lg font-semibold text-slate-200 hover:text-brand-sapphire transition-colors break-all">
                    arpeet.sharma.1998@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 md:p-8 rounded-2xl bg-white/[0.015] border border-slate-800 hover:border-slate-700 transition shadow-sm">
                <div className="p-4 rounded-xl bg-slate-800 text-brand-sapphire shrink-0 shadow-inner">
                  <FaPhone size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-1.5">Phone</p>
                  <a href="tel:+17167507459" className="text-lg font-semibold text-slate-200 hover:text-brand-sapphire transition-colors">
                    +1 (716) 750-7459
                  </a>
                </div>
              </div>

              <div className="pt-6 px-2">
                <p className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-5">Connect on Socials</p>
                <div className="text-slate-300">
                  <SocialLinks size="text-2xl" gap="gap-6" />
                </div>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </>
  );
};

export default Contact;
