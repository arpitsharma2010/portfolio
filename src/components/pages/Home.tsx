import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowDown, FiExternalLink, FiMail } from "react-icons/fi";
import {
  ASSET_BASE,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  NAME,
  RESUME_URL,
} from "../../utils/constants";

const facts = [
  { label: "Spawn point", value: LOCATION, detail: "Open to relocation across the US" },
  { label: "Experience", value: "4+ years", detail: "Banking, research and startup teams" },
  { label: "Primary class", value: "Backend & cloud", detail: "Distributed systems, APIs, agentic AI" },
];

const Home: React.FC = () => (
  <div className="hero">
    <div className="hero__sky" aria-hidden>
      <span className="cloud cloud--one" />
      <span className="cloud cloud--two" />
      <span className="sun-moon" />
      <div className="voxel-hills"><i /><i /><i /><i /><i /></div>
      <div className="voxel-ground" />
    </div>

    <div className="hero__content">
      <p className="mc-kicker"><span className="status-dot" aria-hidden /> Player one has joined</p>
      <h1>{NAME}</h1>
      <p className="hero__role">Software Engineer</p>
      <p className="hero__specialties">
        Full-Stack &amp; Cloud-Native Engineering <span>◆</span> Distributed Systems <span>◆</span> Agentic AI
      </p>
      <p className="hero__intro">
        I build and own production software end-to-end: backend services and REST APIs,
        cloud-native infrastructure on AWS, full-stack React front ends, and LLM/RAG systems that
        have to be correct, not just impressive. 4+ years building production software across
        enterprise banking, backend platforms, cloud systems and full-stack applications, from Tata
        Consultancy Services supporting DNB to a research web platform at the University at Buffalo
        and a founding-engineer seat at an AI startup.
      </p>
      <div className="hero__actions">
        <a href="#experience" className="pixel-button pixel-button--primary">
          Explore my work <FiArrowDown aria-hidden />
        </a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="pixel-button">
          Resume <FiExternalLink aria-hidden />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="pixel-button pixel-button--icon" aria-label="LinkedIn">
          <FaLinkedin aria-hidden />
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="pixel-button pixel-button--icon" aria-label="GitHub">
          <FaGithub aria-hidden />
        </a>
        <a href="#contact" className="pixel-button pixel-button--icon" aria-label="Contact">
          <FiMail aria-hidden />
        </a>
      </div>
    </div>

    <div className="hero__player-card">
      <div className="player-frame">
        <span className="player-frame__level" aria-label="4+ years of professional experience">4+ YRS</span>
        <img src={`${ASSET_BASE}arpit-sharma.jpg`} alt={`Portrait of ${NAME}`} width="512" height="512" />
        <span className="player-frame__name">Arpit</span>
      </div>
      <div className="health-bar" aria-label="Availability: full">
        <span>♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥</span>
        <small>READY TO BUILD</small>
      </div>
    </div>

    <dl className="hero__facts">
      {facts.map((fact) => (
        <div key={fact.label} className="fact-block">
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
          <dd>{fact.detail}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default Home;
