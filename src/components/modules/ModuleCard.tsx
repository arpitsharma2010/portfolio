import React from "react";

interface ModuleCardProps {
  title: string;
  description: string;
  highlights: string[];
  tags?: string[];
  icon?: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, highlights, tags = [], icon }) => (
  <article className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 text-left shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" aria-hidden>
      <div className="absolute inset-px rounded-[1.6rem] border border-white/10" />
      <div className="absolute -top-16 left-10 h-32 w-32 rounded-full bg-plasma/30 blur-3xl" />
      <div className="absolute -bottom-10 right-6 h-40 w-40 rounded-full bg-ion/25 blur-3xl" />
    </div>
    <div className="relative flex items-center gap-4">
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-plasma/40 to-ion/30 text-2xl text-white shadow-glow-sm">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </div>

    <ul className="relative space-y-2 text-sm text-slate-200">
      {highlights.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ion" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>

    {tags.length > 0 && (
      <div className="relative flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>
    )}
  </article>
);

export default ModuleCard;
