import { useEffect } from "react";

// Listens for clicks on elements with `data-scroll-top` and forces window scroll to top.
const ClickScrollToTop = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Walk up the DOM to find an element with the attribute
      let el: HTMLElement | null = target;
      while (el && el !== document.documentElement) {
        if (el.hasAttribute("data-scroll-top")) {
          // scroll instantly to top before navigation
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          return;
        }
        el = el.parentElement;
      }
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
};

export default ClickScrollToTop;
