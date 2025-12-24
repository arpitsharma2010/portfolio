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
    "border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
  muted: "border-white/5 bg-white/[0.03]",
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
      className={`relative isolate w-full overflow-hidden rounded-[2.2rem] border px-6 py-8 sm:px-10 sm:py-11 backdrop-blur-xl ${variantMap[variant]} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen" aria-hidden>
        <div className="absolute -top-28 right-10 h-40 w-40 rounded-full bg-plasma/30 blur-3xl" />
        <div className="absolute -bottom-24 left-8 h-48 w-48 rounded-full bg-ion/25 blur-3xl" />
      </div>
      <div className={`relative flex flex-col gap-3 text-white ${alignmentMap[align]}`}>
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-text-mute">
            {eyebrow}
          </p>
        )}
        {title && <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>}
        {description && <p className="max-w-3xl text-sm text-slate-300">{description}</p>}
      </div>
      <div className="relative mt-8">{children}</div>
    </section>
  );
};

export default PageSection;
