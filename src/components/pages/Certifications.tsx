import React, { useEffect } from "react";
import PageSection from "../common/PageSection.tsx";

interface CertificationsProps {
  url: string;
}

type CredlyBadge = {
  id: string;
  width: number;
  height: number;
};

type Certification = {
  name: string;
  organization: string;
  logo: string;
  year: string;
  description: string;
  certificateLink: string;
  badge: CredlyBadge;
};

const Certifications: React.FC<CertificationsProps> = ({ url }) => {
  const certificationsData: Certification[] = [
    {
      name: "AWS Cloud Practitioner",
      organization: "Amazon Web Services",
      logo: `${url}Certification/aws_cloud_practitioner.png`,
      year: "June 2022 - May 2028",
      description: "Verified understanding of cloud computing concepts and AWS.",
      certificateLink:
        "https://www.credly.com/badges/7b23b0c9-df00-4c90-9af9-f76705ef1085?source=linked_in_profile",
      badge: {
        id: "ab41a701-5d3f-45f6-9b02-53fe3a4a6e71",
        width: 150,
        height: 270,
      },
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      organization: "Microsoft",
      logo: `${url}Certification/azure_fundamentals.png`,
      year: "March 2022",
      description:
        "Verified understanding of cloud computing concepts and Microsoft Azure services.",
      certificateLink:
        "https://www.credly.com/badges/9e81ba52-0c00-4297-a692-f1612c938499?source=linked_in_profile",
      badge: {
        id: "9e81ba52-0c00-4297-a692-f1612c938499",
        width: 150,
        height: 270,
      },
    },
  ];

  useEffect(() => {
    const scriptId = "credly-embed-script";
    const credlyWindow = window as typeof window & {
      Credly?: { load?: () => void };
    };

    const loadCredlyBadges = () => {
      credlyWindow.Credly?.load?.();
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (existingScript) {
      loadCredlyBadges();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://cdn.credly.com/assets/utilities/embed.js";
    script.onload = loadCredlyBadges;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="flex flex-col gap-10 text-white">
      <PageSection
        eyebrow="Certifications & Achievements"
        title="Certifications & Achievements"
        description="Badges embedded from Credly so recruiters can verify authenticity instantly."
        align="center"
      >
        <></>
      </PageSection>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
        {certificationsData.map((cert) => (
          <article
            key={cert.name}
            className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 text-center shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-plasma/10 via-transparent to-ion/10 opacity-60" aria-hidden />
            <div className="relative flex justify-center">
              <div className="w-[180px] rounded-2xl border border-white/15 bg-white/90 p-3 shadow-inner dark:bg-[#050b1b]">
                <div
                  className="credly-badge"
                  data-iframe-width={cert.badge.width}
                  data-iframe-height={cert.badge.height}
                  data-share-badge-id={cert.badge.id}
                  data-share-badge-host="https://www.credly.com"
                />
              </div>
            </div>

            <div className="relative">
              <h3 className="text-xl font-bold text-white">{cert.name}</h3>
              <p className="text-sm text-slate-300">{cert.organization}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-text-mute">{cert.year}</p>
            </div>

            <p className="relative text-sm text-slate-200">{cert.description}</p>

            <a
              href={cert.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center gap-2 rounded-full border border-ion/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ion transition hover:border-flare/50 hover:text-white"
            >
              🔒 Verify on Credly
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
