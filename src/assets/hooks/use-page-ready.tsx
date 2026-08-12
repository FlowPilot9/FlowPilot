import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// usePageReady — a single source of truth for "is the page actually ready
// to be looked at", shared between the Preloader (which fades out) and the
// Hero (whose entrance animations should only start once everything is in
// place, instead of firing on mount while fonts/images are still loading).
//
// "Ready" = window has fully loaded (fonts, images, etc.) AND at least
// MIN_DISPLAY_MS has passed, so the loader never just flashes on a fast
// connection. A hard fallback timeout guarantees we never block the site
// indefinitely if some resource never fires a load event.
// ---------------------------------------------------------------------------

const MIN_DISPLAY_MS = 500;
const FALLBACK_MS = 1000;

const PageReadyContext = createContext(false);

export function PageReadyProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = Date.now();

    const markReady = () => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      window.setTimeout(
        () => {
          if (!cancelled) setReady(true);
        },
        Math.max(MIN_DISPLAY_MS - elapsed, 0),
      );
    };

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
    }

    const fallback = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, FALLBACK_MS);

    return () => {
      cancelled = true;
      window.removeEventListener("load", markReady);
      window.clearTimeout(fallback);
    };
  }, []);

  return <PageReadyContext.Provider value={ready}>{children}</PageReadyContext.Provider>;
}

export function usePageReady() {
  return useContext(PageReadyContext);
}
