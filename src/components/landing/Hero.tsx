import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";
import { HeroWorkspace } from "@/components/landing/HeroWorkspace";

// ---------------------------------------------------------------------------
// Hero — the site's one deliberately dark, cinematic moment (design system
// §1.1 reserves this as the single expressive exception; every other
// section stays on the light, restrained grammar).
//
// Entrance is a hand-timed sequence rather than a generic stagger, so it
// reads in a specific order: badge -> headline (line by line, masked) ->
// supporting text -> CTAs -> trust row -> the workspace scene powering on.
// Each step is given an explicit delay below instead of relying on nested
// Framer variant propagation, which does not stagger elements that aren't
// direct siblings under the same orchestrator — with a two-line masked
// headline that nesting would otherwise be needed, explicit delays are
// simpler to read and impossible to get subtly wrong.
// ---------------------------------------------------------------------------

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const reveal = (delay: number, distance = 18) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0.01 } }
      : {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  const maskLine = (delay: number) =>
    prefersReducedMotion
      ? { initial: { y: "0%" }, animate: { y: "0%" }, transition: { duration: 0.01 } }
      : {
          initial: { y: "115%" },
          animate: { y: "0%" },
          transition: { duration: 0.85, ease: EASE, delay },
        };

  const glowLoop = prefersReducedMotion
    ? {}
    : {
        animate: { x: [0, 24, 0], y: [0, -16, 0] },
        transition: { duration: 16, repeat: Infinity, ease: "easeInOut" as const },
      };

  const glowLoopSlow = prefersReducedMotion
    ? {}
    : {
        animate: { x: [0, -18, 0], y: [0, 14, 0] },
        transition: { duration: 20, repeat: Infinity, ease: "easeInOut" as const, delay: 1 },
      };

  return (
    <section
      id="top"
      className="hero-dark relative isolate overflow-hidden bg-background pb-20 pt-28 md:flex md:min-h-[94vh] md:items-center md:pb-0 md:pt-0"
    >
      {/* Atmosphere: technical grid, film grain, two slow blue glows. Static
          or GPU-transform-only — none of this competes with the foreground
          content for attention. */}
      <div aria-hidden className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="hero-grain pointer-events-none absolute inset-0 -z-10" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-[-4%] -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,oklch(0.62_0.2_264/0.28),transparent)] blur-3xl"
        {...glowLoop}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,oklch(0.55_0.22_264/0.16),transparent)] blur-3xl"
        {...glowLoopSlow}
      />

      {/* Soft hand-off into the light section below — hardcoded to the
          light theme's surface color (not var(--background), which is
          shadowed to the dark value inside this hero-dark scope). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent to-[oklch(0.985_0.005_260)] md:h-40"
      />

      <div className="relative z-0 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-16 px-4 md:grid-cols-2 md:gap-10">
        <div>
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {t.hero.badge}
          </motion.span>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-[3.75rem] md:leading-[1.05]">
            <span className="block overflow-hidden">
              <motion.span {...maskLine(0.32)} className="block">
                {t.hero.title}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span {...maskLine(0.44)} className="text-gradient block">
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
              className="btn-ghost-dark inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              {t.hero.ctaSecondary}
            </motion.a>
          </motion.div>

          <motion.div
            {...reveal(0.84)}
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"
          >
            <span>{t.hero.trustTimeline}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{t.hero.trustStack}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{t.hero.trustSupport}</span>
          </motion.div>
        </div>

        {/* The workspace "powers on": starts very slightly scaled down and
            softly blurred, then clears — a deliberate one-shot entrance
            (not a loop), timed to land just as the CTAs finish appearing,
            per the requested choreography. */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.97, filter: "blur(6px)" }
          }
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
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
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, 6, 0] }}
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
