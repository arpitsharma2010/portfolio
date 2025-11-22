import React, { useEffect } from "react";

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
    <section className="w-full px-4 py-16 min-h-screen bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-cyan-600 dark:text-cyan-400">
        Certifications & Achievements
      </h2>

      <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto sm:grid-cols-2">
        {certificationsData.map((cert) => (
          <article
            key={cert.name}
            className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-xl shadow-black/20 backdrop-blur-md"
          >
            <div className="flex justify-center">
              <div className="w-[180px] rounded-2xl border border-cyan-200/40 bg-white/90 p-3 shadow-inner dark:bg-[#0b152b]">
                <div
                  className="credly-badge"
                  data-iframe-width={cert.badge.width}
                  data-iframe-height={cert.badge.height}
                  data-share-badge-id={cert.badge.id}
                  data-share-badge-host="https://www.credly.com"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-300">{cert.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{cert.organization}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cert.year}</p>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-200">{cert.description}</p>

            <a
              href={cert.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-500/30 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-500/20"
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
