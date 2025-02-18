import React, { useState } from "react";
import "./../../styles/Skills.css";

interface SkillCardProps {
  name: string;
  img: string;
  description: string;
}

const TechnicalSkillCard: React.FC<SkillCardProps> = ({ name, img, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`flip-card ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="flip-card-inner">
        {/* Front Side (Image) */}
        <div className="flip-card-front">
          <img src={img} alt={name} />
        </div>

        {/* Back Side (Skill Name & Description) */}
        <div className="flip-card-back">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkillCard;