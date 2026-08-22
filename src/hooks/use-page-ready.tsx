import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// usePageReady — a single source of truth for "is the page actually ready
// to be looked at", shared between the Preloader (which fades out) and the
// Hero (whose entrance animations should only start once everything is in
// place, instead of firing on mount while fonts are still loading and text
// would flash in the wrong typeface).
//
// "Ready" used to mean window "load" — i.e. every image, script, and font on
// the page, including stuff far below the fold. That held the Hero (our LCP
// element) hidden until the *entire* page had finished loading, which is
// what was driving the ~4.8s LCP. The Hero only actually depends on fonts
// being in (so headline text doesn't reflow/FOUT while animating in), so
// that's the only thing we gate on now. Images and remaining JS keep loading
// in the background same as before, they just don't hold up the reveal.
//
// "Ready" = fonts loaded (or FONTS_TIMEOUT_MS elapsed, whichever first) AND
// at least MIN_DISPLAY_MS has passed, so the loader never just flashes on a
// fast connection. A hard fallback timeout guarantees we never block the
// site indefinitely if something goes wrong (e.g. document.fonts missing).
// ---------------------------------------------------------------------------

const MIN_DISPLAY_MS = 400;
const FONTS_TIMEOUT_MS = 600;
const FALLBACK_MS = 1200;

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
          if (cancelled) return;
          // Fonts are technically loaded at this point, but the browser may
          // not have *painted* with them yet — flipping `ready` a frame too
          // early lets the entrance animation start measured against
          // fallback-font metrics, then visibly snap once the real font
          // paints in (the "climbs, stutters, climbs again" glitch). Waiting
          // two animation frames here gives that swap a full paint cycle to
          // land before any animation reads layout.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!cancelled) setReady(true);
            });
          });
        },
        Math.max(MIN_DISPLAY_MS - elapsed, 0),
      );
    };

    // document.fonts is unavailable only in very old browsers; fall back to
    // the min-display timer alone in that case rather than waiting forever.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const fontsTimeout = new Promise<void>((resolve) => {
      window.setTimeout(resolve, FONTS_TIMEOUT_MS);
    });

    Promise.race([fontsReady, fontsTimeout]).then(markReady);

    const fallback = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, FALLBACK_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  return <PageReadyContext.Provider value={ready}>{children}</PageReadyContext.Provider>;
}

export function usePageReady() {
  return useContext(PageReadyContext);
}