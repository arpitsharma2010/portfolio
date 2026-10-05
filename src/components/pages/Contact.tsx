import React, { useState, type KeyboardEvent } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { MinecraftItemIcon } from "../minecraft";
import type { MinecraftIconName } from "../minecraft/types";
import { EMAIL, GITHUB_URL, LEETCODE_URL, LINKEDIN_URL, LOCATION_DETAIL, RESUME_URL } from "../../utils/constants";
import "./contact/nether-portal.css";

/** `item` and `tint` are presentation only: the slot icon and the portal's hue while that channel is aimed at. */
const channels: { label: string; value: string; href: string; Icon: React.ComponentType<{ "aria-hidden"?: boolean }>; item: MinecraftIconName; tint: string }[] = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, Icon: FiMail, item: "scroll", tint: "0deg" },
  { label: "LinkedIn", value: "in/arpitsharma2010", href: LINKEDIN_URL, Icon: FaLinkedin, item: "name-tag", tint: "-55deg" },
  { label: "GitHub", value: "arpitsharma2010", href: GITHUB_URL, Icon: FaGithub, item: "command-cube", tint: "25deg" },
  { label: "LeetCode", value: "arpitsharma2010", href: LEETCODE_URL, Icon: SiLeetcode, item: "experience-bottle", tint: "60deg" },
];

/** Arrow/Home/End move focus between channels only; Tab still visits every link and nothing is trapped. */
const handleChannelKeys = (event: KeyboardEvent<HTMLUListElement>) => {
  const links = [...event.currentTarget.querySelectorAll<HTMLAnchorElement>("a")];
  const index = links.indexOf(event.target as HTMLAnchorElement);
  if (index < 0) return;
  const targets: Record<string, number> = {
    ArrowRight: Math.min(index + 1, links.length - 1),
    ArrowDown: Math.min(index + 1, links.length - 1),
    ArrowLeft: Math.max(index - 1, 0),
    ArrowUp: Math.max(index - 1, 0),
    Home: 0,
    End: links.length - 1,
  };
  if (!(event.key in targets)) return;
  event.preventDefault();
  links[targets[event.key]].focus();
};

const Contact: React.FC = () => {
  const [aimed, setAimed] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);
  const tint = channels.find((channel) => channel.label === aimed)?.tint ?? "0deg";

  return (
    <PageSection
      eyebrow="Nether Portal"
      title="Open a connection"
      description="Open to Software Engineer, Backend Engineer, Full-Stack Engineer, and Platform Engineer opportunities anywhere in the United States. Email is the fastest way to reach me."
      variant="nether"
    >
      <div className="portal-room">
        {/* Decoration only: frame, field, particles and the click burst never reach assistive technology. */}
        <div className="nportal" aria-hidden style={{ "--nportal-tint": tint } as React.CSSProperties}>
          <div className="nportal__field">
            <i /><i /><i /><i /><i /><i />
            {pulse > 0 && <span key={pulse} className="nportal__burst" />}
          </div>
        </div>
        <div className="contact-console">
          <p className="contact-console__prompt">Choose a channel</p>
          <ul onKeyDown={handleChannelKeys}>
            {channels.map(({ label, value, href, Icon, item }) => {
              const isExternal = href.startsWith("http");
              return (
                <li key={label}>
                  {/* Plain anchor: one click/tap follows it; the burst runs alongside, never in front of, navigation. */}
                  <a
                    href={href}
                    className={aimed === label ? "is-aimed" : undefined}
                    onFocus={() => setAimed(label)}
                    onMouseEnter={() => setAimed(label)}
                    onBlur={() => setAimed(null)}
                    onMouseLeave={() => setAimed(null)}
                    onClick={() => setPulse((count) => count + 1)}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="contact-console__slot" aria-hidden><MinecraftItemIcon name={item} /></span>
                    <span><small><Icon aria-hidden />{label}</small>{value}</span>
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
          <p className="contact-console__location"><FiMapPin aria-hidden /> {LOCATION_DETAIL}</p>
        </div>
      </div>
    </PageSection>
  );
};

export default Contact;
