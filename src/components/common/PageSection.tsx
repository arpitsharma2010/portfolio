import React from "react";

interface PageSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: "grass" | "stone" | "wood" | "deepslate" | "nether";
}

const PageSection: React.FC<PageSectionProps> = ({
  eyebrow,
  title,
  description,
  children,
  variant = "stone",
}) => (
  <div className={`mc-section mc-section--${variant}`}>
    <div className="mc-section__header">
      {eyebrow && <p className="mc-kicker">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="mc-section__description">{description}</p>}
    </div>
    {children}
  </div>
);

export default PageSection;
