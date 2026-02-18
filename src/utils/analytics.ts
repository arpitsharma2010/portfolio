const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isBrowser = typeof window !== "undefined";
let hasInitialized = false;

const ensureGtagStub = () => {
  if (!isBrowser) {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
};

export const initAnalytics = () => {
  if (!isBrowser || !GA_MEASUREMENT_ID || hasInitialized) {
    return;
  }

  if (!document.querySelector('script[data-ga-loader="true"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.setAttribute("data-ga-loader", "true");
    document.head.appendChild(script);
  }

  ensureGtagStub();

  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });

  hasInitialized = true;
};

export const trackPageView = (path: string) => {
  if (!isBrowser || !GA_MEASUREMENT_ID) {
    return;
  }

  ensureGtagStub();

  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
  });
};
