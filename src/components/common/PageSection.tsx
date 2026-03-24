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
  default: "border-slate-800 bg-white/[0.01] shadow-sm hover:border-slate-700 transition",
  muted: "border-transparent bg-transparent",
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
      className={`relative w-full rounded-2xl border px-6 py-8 sm:px-10 sm:py-12 ${variantMap[variant]} ${className}`}
    >
      <div className={`relative flex flex-col gap-3 ${alignmentMap[align]}`}>
        {eyebrow && (
          <p className="text-xs font-mono uppercase tracking-widest text-brand-sapphire">
            {eyebrow}
          </p>
        )}
        {title && <h2 className="text-3xl font-extrabold tracking-tight text-slate-100">{title}</h2>}
        {description && <p className="max-w-2xl text-base text-slate-400">{description}</p>}
      </div>
      <div className="relative mt-10">{children}</div>
    </section>
  );
};

export default PageSection;
