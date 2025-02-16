import React from "react";
import "./../../styles/Skills.css";

interface SkillCardProps {
  name: string;
  img: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, img }) => {
  return (
    <div className="skill-card">
      <img src={img} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </div>
  );
};

export default SkillCard;