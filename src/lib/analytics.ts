import { useEffect } from "react";

// Initialize Google Analytics
export const initGoogleAnalytics = (trackingId: string) => {
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${trackingId}');
  `;
  document.head.appendChild(script2);
};

// Track page views
export const usePageView = (pageName: string) => {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
      (window as any).gtag("pageview", {
        page_path: window.location.pathname,
        page_title: pageName,
      });
    }
  }, [pageName]);
};

// Track custom events
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && typeof (window as any).gtag !== "undefined") {
    (window as any).gtag("event", eventName, eventData);
  }
};

// Track form submissions
export const useTrackFormSubmission = (formName: string) => {
  return () => {
    trackEvent("form_submission", {
      form_name: formName,
      timestamp: new Date().toISOString(),
    });
  };
};

// Track button clicks
export const useTrackClick = (buttonName: string) => {
  return () => {
    trackEvent("button_click", {
      button_name: buttonName,
    });
  };
};
