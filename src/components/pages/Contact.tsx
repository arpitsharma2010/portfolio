import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { EMAIL, GITHUB_URL, LEETCODE_URL, LINKEDIN_URL, LOCATION, RESUME_URL } from "../../utils/constants";

const channels = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: FiMail },
  { label: "LinkedIn", value: "in/arpitsharma2010", href: LINKEDIN_URL, Icon: FaLinkedin },
  { label: "GitHub", value: "arpitsharma2010", href: GITHUB_URL, Icon: FaGithub },
  { label: "LeetCode", value: "arpitsharma2010", href: LEETCODE_URL, Icon: SiLeetcode },
];

const Contact: React.FC = () => (
  <PageSection
    eyebrow="Nether Portal"
    title="Open a connection"
    description="Open to Software Engineer, Backend, Full-Stack, Cloud and AI engineering roles. Email is the fastest way to reach me and I reply to everything."
    variant="nether"
  >
    <div className="portal-room">
      <div className="nether-portal" aria-hidden>
        <div className="nether-portal__inside"><i /><i /><i /><i /><i /></div>
      </div>
      <div className="contact-console">
        <p className="contact-console__prompt">Choose a channel</p>
        <ul>
          {channels.map(({ label, value, href, Icon }) => {
            const isExternal = href.startsWith("http");
            return (
              <li key={label}>
                <a href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <Icon aria-hidden />
                  <span><small>{label}</small>{value}</span>
                  {isExternal && <FiExternalLink aria-hidden />}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="contact-console__actions">
          <a href={`mailto:${EMAIL}`} className="pixel-button pixel-button--primary"><FiMail aria-hidden /> Send message</a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="pixel-button">Resume <FiExternalLink aria-hidden /></a>
        </div>
        <p className="contact-console__location"><FiMapPin aria-hidden /> {LOCATION} · open to relocation</p>
      </div>
    </div>
  </PageSection>
);

export default Contact;
