import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import PageSection from "../common/PageSection.tsx";
import SocialLinks from "../utils/SocialLinks.tsx";
import SEO from "../utils/SEO.tsx";

const resumePDF = "https://drive.google.com/file/d/1mcqK7Ru-knL_VgGzljd00gKsXkcPcKWW/view?usp=sharing";

interface ContactProps {
  url: string;
}

const Contact: React.FC<ContactProps> = ({ url }) => {
  const pageUrl = `${url}contact/`;
  const description =
    "Contact Arpit Sharma in Buffalo, New York for senior software engineering opportunities, collaborations, or speaking engagements.";

  return (
    <>
      <SEO
        title="Contact | Arpit Sharma"
        description={description}
        keywords={[
          "Contact Arpit Sharma",
          "Buffalo software developer",
          "Arpit Sharma email",
          "Senior software engineer contact",
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
      <section className="flex flex-col gap-10 text-white">
        <PageSection
          eyebrow="Contact"
          title="Get in Touch"
          description="Buffalo, New York · USA. Available across EST with flexible collaboration windows."
        >
          <div className="grid gap-6 text-center lg:grid-cols-3">
            <article className="flex flex-col items-center gap-2 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <FaMapMarkerAlt className="text-3xl text-ion" />
              <p className="font-semibold text-slate-100">Buffalo, New York, USA</p>
            </article>
            <article className="flex flex-col items-center gap-2 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <FaEnvelope className="text-3xl text-ion" />
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
      </section>
    </>
  );
};

export default Contact;
