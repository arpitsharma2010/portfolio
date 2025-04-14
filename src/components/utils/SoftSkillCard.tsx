import React from "react";

interface SoftSkillCardProps {
  name: string;
  icon: string;
}

const SoftSkillCard: React.FC<SoftSkillCardProps> = ({ name, icon }) => {
  return (
    <div className="bg-gray-100 dark:bg-[#1e293b] rounded-xl shadow-md hover:shadow-cyan-500/30 transition-all duration-300 p-6 flex flex-col items-center justify-center text-center border border-cyan-500/10 hover:border-cyan-400/30">
      <span className="text-4xl mb-3 animate-bounce">{icon}</span>
      <p className="text-sm font-medium text-gray-800 dark:text-cyan-100">{name}</p>
    </div>
  );
};

export default SoftSkillCard;