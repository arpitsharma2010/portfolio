import React, { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url, type = "article", structuredData }) => {
  const keywordsValue = keywords?.length ? keywords.join(", ") : null;
  const ldJson = structuredData ? JSON.stringify(structuredData) : null;

  useEffect(() => {
    if (!title && !description) {
      return;
    }

    const cleanups: Array<() => void> = [];
    const previousTitle = document.title;
    document.title = title;
    cleanups.push(() => {
      document.title = previousTitle;
    });

    const upsertMeta = (attribute: "name" | "property", key: string, value?: string) => {
      if (!value) {
        return;
      }
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      const created = !tag;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      const previousContent = created ? null : tag.getAttribute("content");
      tag.setAttribute("content", value);
      cleanups.push(() => {
        if (created) {
          tag?.remove();
        } else if (tag) {
          if (previousContent !== null) {
            tag.setAttribute("content", previousContent);
          } else {
            tag.removeAttribute("content");
          }
        }
      });
    };

    const upsertCanonical = (href?: string) => {
      if (!href) {
        return;
      }
      const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        return;
      }
      const previousHref = canonical.getAttribute("href");
      canonical.setAttribute("href", href);
      cleanups.push(() => {
        if (previousHref) {
          canonical.setAttribute("href", previousHref);
        } else {
          canonical.removeAttribute("href");
        }
      });
    };

    upsertMeta("name", "description", description);
    if (keywordsValue) {
      upsertMeta("name", "keywords", keywordsValue);
    }
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }
    if (url) {
      upsertMeta("property", "og:url", url);
      upsertCanonical(url);
    }

    if (ldJson) {
      let script = document.getElementById("dynamic-route-jsonld") as HTMLScriptElement | null;
      const created = !script;
      if (!script) {
        script = document.createElement("script");
        script.id = "dynamic-route-jsonld";
        script.type = "application/ld+json";
      }
      const previousContent = created ? null : script.textContent;
      script.textContent = ldJson;
      if (created) {
        document.head.appendChild(script);
      }
      cleanups.push(() => {
        if (created) {
          script?.remove();
        } else if (script) {
          script.textContent = previousContent;
        }
      });
    } else {
      const existing = document.getElementById("dynamic-route-jsonld");
      existing?.remove();
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [title, description, keywordsValue, image, url, type, ldJson]);

  return null;
};

export default SEO;
