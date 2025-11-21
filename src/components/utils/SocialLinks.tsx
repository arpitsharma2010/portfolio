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

const SocialLinks: React.FC<SocialLinksProps> = ({ size = "text-2xl", gap = "gap-5" }) => {
  return (
    <div className={`flex justify-center ${gap}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-inherit hover:text-light-primary dark:hover:text-dark-primary transition transform hover:scale-110"
          title={label}
        >
          <Icon className={size} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
