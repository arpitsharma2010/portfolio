import React from "react";

interface ModuleCardProps {
  title: string;
  description: string;
  highlights: string[];
  tags?: string[];
  icon?: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, highlights, tags = [], icon }) => (
  <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-left shadow-lg shadow-slate-900/5 dark:border-white/5 dark:bg-slate-900/50">
    <div className="flex items-center gap-3">
      {icon && <div className="text-2xl text-cyan-600 dark:text-cyan-300">{icon}</div>}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>

    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
      {highlights.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </article>
);

export default ModuleCard;
