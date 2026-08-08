import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";
import { HeroWorkspace } from "@/components/landing/HeroWorkspace";
import { AtmosphereScene } from "@/components/landing/AtmosphereScene";
import { usePageReady } from "@/hooks/use-page-ready"; 

// ---------------------------------------------------------------------------
// Hero — night-ocean atmosphere in dark mode, a plain tinted surface + faint
// technical grid in light mode (AtmosphereScene.tsx + hero-grid). This is
// no longer a permanently-dark section (that was an earlier "hero-dark"
// scope, retired) — it reads whatever theme the whole site is currently
// in, same as every other section, via the semantic tokens.
//
// Entrance is a hand-timed sequence rather than a generic stagger, so it
// reads in a specific order: badge -> headline (line by line, masked) ->
// supporting text -> CTAs -> trust row -> the workspace scene powering on.
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const ready = usePageReady(); 

  const reveal = (delay: number, distance = 18) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0.01 } }
      : {
          initial: { opacity: 0, y: distance },
          animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  const maskLine = (delay: number) =>
    prefersReducedMotion
      ? { initial: { y: "0%" }, animate: { y: "0%" }, transition: { duration: 0.01 } }
      : {
          initial: { y: "115%" },
          animate: ready ? { y: "0%" } : { y: "115%" },
          transition: { duration: 0.85, ease: EASE, delay },
        };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-background pb-20 pt-28 transition-colors duration-500 md:flex md:min-h-[94vh] md:items-center md:pb-0 md:pt-0"
    >
      {/* Atmosphere: night ocean glow in dark mode only (see
          AtmosphereScene.tsx). A faint technical grid sits on top of it in
          both themes, and film grain on top of that for a constant
          photographic texture. */}
      <AtmosphereScene />
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 -z-10" />

      {/* Soft hand-off into the section below, whatever theme that section
          is currently in — var(--background), not a hardcoded light value,
          so this stays correct in both light and dark mode. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent to-[var(--background)] transition-colors duration-500 md:h-40"
      />

      <div className="relative z-0 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-16 px-4 md:grid-cols-2 md:gap-10">
        <div>
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {t.hero.badge}
          </motion.span>

          <h1 className="mt-6 text-5xl font-display font-bold leading-[1.18] tracking-tight text-foreground sm:text-6xl md:text-[3.75rem] md:leading-[1.18]">
            <span className="block overflow-hidden">
              <motion.span {...maskLine(0.32)} className="block">
                {t.hero.title}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span {...maskLine(0.44)} className="block font-semibold text-primary">
                {t.hero.titleHighlight}
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...reveal(0.6)}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t.hero.description}
          </motion.p>

          <motion.div {...reveal(0.72)} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#work"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="btn-ghost inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              {t.hero.ctaSecondary}
            </motion.a>
          </motion.div>

          <motion.div
            {...reveal(0.84)}
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"
          >
            <span>{t.hero.trustTimeline}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{t.hero.trustStack}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{t.hero.trustSupport}</span>
          </motion.div>
        </div>

        {/* The workspace "powers on": starts very slightly scaled down and
            softly blurred, then clears — a deliberate one-shot entrance
            (not a loop), timed to land just as the CTAs finish appearing. */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.97, filter: "blur(6px)" }
          }
          animate={
            prefersReducedMotion || ready
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.97, filter: "blur(6px)" }
          }
          transition={
            prefersReducedMotion ? { duration: 0.01 } : { duration: 0.9, ease: EASE, delay: 0.85 }
          }
        >
          <HeroWorkspace />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label={t.hero.scrollCue}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : ready
              ? { opacity: 1, y: [0, 6, 0] }
              : { opacity: 0 }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : {
                opacity: { duration: 0.6, delay: 1.4 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
              }
        }
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-muted-foreground md:block"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}