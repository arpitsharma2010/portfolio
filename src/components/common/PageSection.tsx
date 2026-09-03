import React from "react";

interface PageSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

/** Consistent section heading + body wrapper used by every page section. */
const PageSection: React.FC<PageSectionProps> = ({ eyebrow, title, description, children }) => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-3">
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-700 dark:text-sky-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
        {title}
      </h2>
      {description && (
        <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
    {children}
  </div>
);

export default PageSection;
