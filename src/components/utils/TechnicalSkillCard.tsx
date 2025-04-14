import React, { useState } from "react";

interface SkillCardProps {
  name: string;
  img: string;
  description: string;
}

const TechnicalSkillCard: React.FC<SkillCardProps> = ({ name, img, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-48 perspective cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden bg-[#1e293b] border border-cyan-500/20 shadow-cyan-500/10 rounded-xl flex items-center justify-center p-4 hover:shadow-cyan-500/30 transition">
          <img
            src={img}
            alt={name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden bg-cyan-600 text-white rounded-xl px-4 py-3 rotate-y-180 flex flex-col justify-center items-center shadow-lg">
          <h3 className="text-lg font-bold mb-2">{name}</h3>
          <p className="text-sm text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkillCard;