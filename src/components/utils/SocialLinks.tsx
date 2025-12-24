// src/components/common/SocialLinks.tsx
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

interface SocialLinksProps {
  size?: string; // icon size e.g., "2xl", "3xl"
  gap?: string;  // tailwind gap e.g., "gap-5"
}

const links = [
  { href: "https://www.linkedin.com/in/arpitsharma2010/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://github.com/arpitsharma2010", label: "GitHub", Icon: FaGithub },
];

const SocialLinks: React.FC<SocialLinksProps> = ({ size = "text-2xl", gap = "gap-5" }) => (
  <div className={`flex items-center ${gap}`}>
    {links.map(({ href, label, Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-ion transition hover:border-ion/60 hover:text-white"
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-plasma/30 to-ion/30 opacity-0 blur-lg transition group-hover:opacity-100" />
        <Icon className={`${size} relative`} />
      </a>
    ))}
  </div>
);

export default SocialLinks;
