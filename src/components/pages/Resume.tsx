import React from "react";
import { FaBookOpen, FaDownload } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { RESUME_URL } from "../../utils/constants";

const Resume: React.FC = () => (
  <PageSection
    eyebrow="Enchanted Book"
    title="The complete character sheet"
    description="A concise record of my experience, education, projects and technical capabilities."
    variant="wood"
  >
    <div className="resume-book">
      <div className="resume-book__cover" aria-hidden>
        <div className="resume-book__gem">✦</div>
        <FaBookOpen />
        <span>Arpit Sharma</span>
        <small>Software Engineer</small>
      </div>
      <div className="resume-book__page">
        <p className="mc-kicker">Signed copy · Updated 2026</p>
        <h3>Want the printable edition?</h3>
        <p>
          Open the full resume in Google Drive. It includes the same verified work history and
          engineering background presented throughout this world.
        </p>
        <a className="pixel-button pixel-button--primary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          <FaDownload aria-hidden /> Open resume <FiExternalLink aria-hidden />
        </a>
      </div>
    </div>
  </PageSection>
);

export default Resume;
