import { useEffect } from "react";

// Add skip-to-content link for accessibility
export const useSkipToContentLink = (contentId: string = "main-content") => {
  useEffect(() => {
    const skipLink = document.createElement("a");
    skipLink.href = `#${contentId}`;
    skipLink.className =
      "absolute top-0 left-0 px-4 py-2 bg-primary text-primary-foreground rounded-b-lg transform -translate-y-full focus:translate-y-0 transition-transform";
    skipLink.textContent = "Skip to main content";
    document.body.insertBefore(skipLink, document.body.firstChild);
  }, [contentId]);
};

// Enhanced accessibility attributes helper
export const a11y = {
  ariaLabel: (label: string) => ({ "aria-label": label }),
  ariaDescribedBy: (id: string) => ({ "aria-describedby": id }),
  ariaPressed: (pressed: boolean) => ({ "aria-pressed": pressed }),
  role: (role: string) => ({ role }),
  ariaLive: (polite: "polite" | "assertive" = "polite") => ({ "aria-live": polite }),
};

// Keyboard shortcut hook
export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  ctrlKey = false,
  shiftKey = false
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrlKey &&
        event.shiftKey === shiftKey
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [key, callback, ctrlKey, shiftKey]);
};
