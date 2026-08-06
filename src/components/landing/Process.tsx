import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, ClipboardList, Palette, Code2, Rocket, Wrench } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";

const stepIcons = [Search, ClipboardList, Palette, Code2, Rocket, Wrench] as const;

// Process' signature moment (design system §1.2): "Transformation". The
// timeline is exploratory, not a carousel — nothing auto-advances, nothing
// reverts when you move the mouse away. Whatever step you land on (by hover,
// click, or keyboard focus) stays open until you choose another one.
export function Process() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const steps = t.process.steps;
  const progress = steps.length > 1 ? active / (steps.length - 1) : 0;
  const activeStep = steps[active];
  // Icons sit centered within equal grid columns, not flush against the row's
  // edges — the track has to start/end at the first/last icon's actual
  // center (half a column in from each side), not at 0%/100% of the row.
  const trackInset = `${100 / (steps.length * 2)}%`;

  return (
    <section id="process" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionHeader eyebrow={t.process.eyebrow} title={t.process.title} />

        {/* Timeline — the navigation element. Only the active step ever
            takes on the primary accent (design system §2.2); everything
            else stays neutral, regardless of position. */}
        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute top-6 hidden h-px overflow-hidden rounded-full bg-border md:block"
            style={{ left: trackInset, right: trackInset }}
          >
            <motion.div
              className="h-full origin-left bg-primary"
              initial={false}
              animate={{ scaleX: progress }}
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.5, ease: "easeOut" }
              }
              style={{ width: "100%" }}
            />
          </div>

          <ol className="relative z-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              const isActive = i === active;

              return (
                <li key={step.title}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="flex w-full flex-col items-center text-center focus-visible:outline-none"
                  >
                    <span
                      className={`relative grid h-12 w-12 place-items-center rounded-2xl border shadow-soft transition-all duration-300 ${
                        isActive
                          ? "scale-110 border-primary/50 bg-background text-primary shadow-[var(--shadow-elevated)] ring-2 ring-primary/15"
                          : "border-border bg-background text-muted-foreground hover:border-primary/25"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span
                        className={`absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold transition-colors duration-300 ${
                          isActive
                            ? "bg-[image:var(--gradient-primary)] text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                    </span>
                    <span
                      className={`mt-4 text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Content panel — updates on every activation. Crossfade, not a
            slide/carousel motion, per the brief. */}
        <div className="relative mt-10 min-h-[280px] sm:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: "easeOut" }}
              className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {t.process.eyebrow} · {String(active + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-2xl font-display font-bold tracking-tight text-foreground md:text-3xl">
                    {activeStep.title}
                  </h3>
                </div>
                {activeStep.duration && (
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    {t.process.labels.duration}: {activeStep.duration}
                  </span>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                    {t.process.labels.whatWeDo}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {activeStep.whatWeDo}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                    {t.process.labels.whatClientGets}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {activeStep.whatClientGets}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
                    {t.process.labels.whyItMatters}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {activeStep.whyItMatters}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
