import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Sparkles, TrendingUp } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

// Stagger container: children (eyebrow, headline, subtitle, buttons, trust
// row, mockup) each fade + move up slightly, one after another. This gives
// the eye a clear reading order instead of everything appearing at once.
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // With reduced motion, everything renders in its final state instantly —
  // no staggering, no loops — rather than just a faster version of the same.
  const motionProps = prefersReducedMotion
    ? { initial: "visible", animate: "visible" }
    : { initial: "hidden", animate: "visible" };

  const glowLoop = prefersReducedMotion
    ? {}
    : {
        animate: { x: [0, 24, 0], y: [0, -16, 0] },
        transition: { duration: 14, repeat: Infinity, ease: "easeInOut" as const },
      };

  const floatLoop = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, -8, 0] },
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      {/* A single, quiet glow — not a multi-color blob field. It drifts over
          14s, well below the speed the eye reads as "motion" rather than
          "ambient light", so it never competes with the foreground content. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-10 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,oklch(0.7_0.18_260/0.14),transparent)] blur-2xl"
        {...glowLoop}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[linear-gradient(180deg,oklch(0.98_0.01_260),transparent)]" />

      <motion.div
        variants={container}
        {...motionProps}
        className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-16 px-4 pb-24 md:grid-cols-2 md:gap-10 md:pb-32"
      >
        <div>
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {t.hero.badge}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-[3.75rem] md:leading-[1.05]"
          >
            {t.hero.title} <span className="text-gradient">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {t.hero.description}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
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
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"
          >
            <span>{t.hero.trustTimeline}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{t.hero.trustStack}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{t.hero.trustSupport}</span>
          </motion.div>
        </div>

        {/* Product mockup: a "browser window" card with a mini dashboard,
            plus two small overlapping cards (stat + AI message) — the
            layered-card composition you see on Linear/Vercel. Everything
            here is HTML/CSS/SVG; no chart library, no images. */}
        <motion.div variants={item} className="relative mx-auto w-full max-w-[520px]">
          <motion.div {...floatLoop} className="relative">
            <div className="glass-panel rounded-2xl border border-border/80 shadow-elevated">
              <div className="flex min-w-0 items-center gap-2 border-b border-border/70 px-4 py-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-destructive/50" />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary/40" />
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 truncate rounded-md bg-secondary px-2.5 py-0.5 text-[11px] text-muted-foreground">
                  {t.hero.mockup.browserLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[88px_1fr]">
                <div className="hidden flex-col gap-2 border-r border-border/70 p-3 sm:flex">
                  {t.hero.mockup.navItems.map((label, i) => (
                    <span
                      key={label}
                      className={`truncate rounded-md px-2 py-1.5 text-[11px] font-medium ${
                        i === 0
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {t.hero.mockup.chartLabel}
                    </span>
                    <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  </div>

                  <svg viewBox="0 0 220 64" className="w-full" aria-hidden>
                    <path
                      d="M0 48 L28 40 L56 44 L84 26 L112 32 L140 14 L168 20 L196 6 L220 12"
                      fill="none"
                      stroke="oklch(0.55 0.22 264)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0 48 L28 40 L56 44 L84 26 L112 32 L140 14 L168 20 L196 6 L220 12 L220 64 L0 64 Z"
                      fill="oklch(0.55 0.22 264 / 0.08)"
                      stroke="none"
                    />
                  </svg>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-secondary p-3">
                      <div className="h-1.5 w-10 rounded-full bg-muted-foreground/25" />
                      <div className="mt-2 h-1.5 w-16 rounded-full bg-muted-foreground/15" />
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <div className="h-1.5 w-8 rounded-full bg-muted-foreground/25" />
                      <div className="mt-2 h-1.5 w-14 rounded-full bg-muted-foreground/15" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlapping stat card */}
            <div className="glass-panel absolute -right-4 -top-5 hidden items-center gap-2 rounded-xl px-3.5 py-2.5 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10">
                <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-foreground">{t.hero.mockup.statValue}</div>
                <div className="text-[10px] text-muted-foreground">{t.hero.mockup.statLabel}</div>
              </div>
            </div>

            {/* Overlapping AI assistant card */}
            <div className="glass-panel absolute -bottom-6 -left-4 hidden max-w-[220px] items-start gap-2 rounded-xl px-3.5 py-3 sm:flex">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/10">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </span>
              <div className="leading-snug">
                <div className="text-[11px] font-semibold text-foreground">{t.hero.mockup.aiLabel}</div>
                <div className="text-[11px] text-muted-foreground">{t.hero.mockup.aiMessage}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Optional scroll indicator — a hint, not an instruction. */}
      <motion.a
        href="#about"
        aria-label={t.hero.scrollCue}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: 1, y: [0, 6, 0] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { opacity: { duration: 0.6, delay: 0.8 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 } }
        }
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground md:block"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
