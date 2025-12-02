import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export const useMetaTags = ({
  title,
  description,
  image = "https://via.placeholder.com/1200x630",
  url,
  type = "website",
}: MetaTagsProps) => {
  const location = useLocation ? (() => {
    try {
      return useLocation();
    } catch {
      return { pathname: "/" };
    }
  })() : { pathname: "/" };

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("og:title", title);
    updateMeta("og:description", description);
    updateMeta("og:image", image);
    updateMeta("og:url", url || window.location.href);
    updateMeta("og:type", type);
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);
  }, [title, description, image, url, type, location.pathname]);
};

// Structured data helper for schema.org
export const useStructuredData = (data: Record<string, any>) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      ...data,
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
};
