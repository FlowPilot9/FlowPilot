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
// reads in a specific order: headline (line by line, masked) -> subtitle ->
// CTAs -> the workspace scene powering on.
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
      className="relative isolate overflow-hidden bg-background pb-20 pt-28 transition-colors duration-500 lg:flex lg:min-h-screen lg:flex-col lg:pb-16 lg:pt-48"
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

      <div className="relative z-0 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-16 px-6 lg:flex-1 lg:grid-cols-[1fr_1.1fr] lg:gap-28 lg:px-10 xl:gap-44 xl:px-16">
        <div className="[container-type:inline-size] md:flex md:flex-col md:items-center">
          <h1 className="w-full text-center text-[clamp(1.75rem,1.14rem+3.58cqw,2.75rem)] font-display font-bold leading-[1.15] tracking-tight text-foreground md:w-fit md:min-w-0 md:max-w-full md:text-left md:text-[clamp(1.75rem,-0.3rem+11.73cqw,4.25rem)]">
            <span className="block overflow-hidden">
              <motion.span {...maskLine(0.32)} className="block text-[1.08em]">
                {t.hero.title}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3 text-center">
              <motion.span {...maskLine(0.4)} className="block text-[0.88em]">
                <span className="font-accent text-[1.2em] italic font-semibold text-primary">
                  {t.hero.titleLine2}
                </span>{" "}
                <span className="relative inline-block whitespace-nowrap">
                  {t.hero.titleUnderline}
                  <span className="pointer-events-none absolute -bottom-3 left-0 h-[4px] w-full origin-left -rotate-[4deg] rounded-full bg-primary" />
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1 pt-0">
              <motion.span {...maskLine(0.52)} className="block text-[0.92em]">
                {t.hero.subtitlePrefix}{" "}
                <span className="font-accent text-[1.15em] italic font-medium text-primary">
                  {t.hero.titleHighlight}
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...reveal(0.64)}
            className="mx-auto mt-6 w-fit whitespace-nowrap text-center text-[clamp(0.72rem,0.55rem+1cqw,1rem)] leading-relaxed text-muted-foreground md:text-left md:text-[clamp(0.78rem,0.5rem+1.5cqw,1.125rem)]"
          >
            {t.hero.description}
          </motion.p>

          <motion.div {...reveal(0.76)} className="mx-auto mt-10 grid w-fit grid-cols-2 gap-3">
            <motion.a
              href="#contact"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-[clamp(0.6rem,0.35rem+2.4cqw,1.75rem)] py-[clamp(0.6rem,0.3rem+1.8cqw,1rem)] text-[clamp(0.62rem,0.4rem+1.9cqw,1rem)] font-medium"
            >
              {t.hero.ctaPrimary}{" "}
              <ArrowRight className="h-[clamp(0.9rem,0.7rem+0.9cqw,1.25rem)] w-[clamp(0.9rem,0.7rem+0.9cqw,1.25rem)] shrink-0" />
            </motion.a>
            <motion.a
              href="#work"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="btn-ghost flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-[clamp(0.6rem,0.35rem+2.4cqw,1.75rem)] py-[clamp(0.6rem,0.3rem+1.8cqw,1rem)] text-[clamp(0.62rem,0.4rem+1.9cqw,1rem)] font-medium"
            >
              {t.hero.ctaSecondary}
            </motion.a>
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