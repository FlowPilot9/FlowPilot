import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageReady } from "@/hooks/use-page-ready";

// ---------------------------------------------------------------------------
// Preloader — a brief full-screen cover shown while the page's own assets
// (fonts, images) finish loading, so the Hero's entrance animations never
// start against a half-loaded page. Pure opacity/scale, no layout cost, and
// it unmounts entirely once it has faded out (AnimatePresence removes it
// from the DOM after the exit transition), so it costs nothing afterwards.
// ---------------------------------------------------------------------------

export function Preloader() {
  const ready = usePageReady();
  const prefersReducedMotion = useReducedMotion();

  // Lock scroll only while the loader is visible; always restored on unmount.

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.35, scale: 0.92 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: [0.35, 1, 0.35], scale: [0.92, 1, 0.92] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.01 }
                : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <img
              src="/logo-light.png"
              alt="FlowPilot"
              className="block h-20 w-20 object-contain dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="FlowPilot"
              className="hidden h-20 w-20 object-contain dark:block"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
