import React from "react";
import "./../../styles/Skills.css";

interface SoftSkillCardProps {
  name: string;
  icon: string;
}

const SoftSkillCard: React.FC<SoftSkillCardProps> = ({ name, icon }) => {
  return (
    <div className="soft-skill-card">
      <span className="soft-skill-icon">{icon}</span>
      <p className="soft-skill-name">{name}</p>
    </div>
  );
};

export default SoftSkillCard;