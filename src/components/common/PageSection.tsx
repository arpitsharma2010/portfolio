import React from "react";

type Alignment = "left" | "center";
type Variant = "default" | "muted";

interface PageSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: Alignment;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const alignmentMap: Record<Alignment, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const variantMap: Record<Variant, string> = {
  default:
    "bg-white/90 dark:bg-slate-900/70 border-slate-200/70 dark:border-white/10 shadow-xl shadow-slate-900/5",
  muted:
    "bg-slate-50/80 dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5 shadow-lg shadow-slate-900/5",
};

const PageSection: React.FC<PageSectionProps> = ({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  variant = "default",
  className = "",
  children,
}) => {
  return (
    <section
      id={id}
      className={`relative isolate w-full overflow-hidden rounded-2xl border px-5 py-8 sm:rounded-3xl sm:px-8 sm:py-10 backdrop-blur ${variantMap[variant]} ${className}`}
    >
      <div className={`flex flex-col gap-3 ${alignmentMap[align]}`}>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-3xl">
            {title}
          </h2>
        )}
        {description && (
          <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">{description}</p>
        )}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
};

export default PageSection;
