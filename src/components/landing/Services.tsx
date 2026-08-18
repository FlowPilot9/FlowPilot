import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, Wrench, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";

// ---------------------------------------------------------------------------
// Services / Pricing.
//
// Signature moment (design system §1.2) for this section: pricing cards that
// "wake up" on hover — border shifts to --primary, the card lifts, and a
// soft ambient glow (reusing --primary-glow, the same token as the Hero
// workspace glow, §6.1/§9) blooms behind it. The featured plan (Starter)
// carries that same glow permanently at rest, so the eye lands there first;
// the other two earn it back on hover, same recipe, same duration, so the
// whole row reads as one consistent interaction rather than a special case.
// ---------------------------------------------------------------------------

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Services() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const { maintenance } = t.services;

  return (
    <section id="pricing" className="relative isolate overflow-hidden bg-surface py-24 md:py-32">
      {/* Faint technical grid, concentrated top-center and fading out —
          same family as the Hero background. A small ambient glow sits
          above/behind it, like a soft light source the grid catches. */}
      <div aria-hidden className="pricing-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[720px] w-full max-w-5xl"
        style={{
          background:
            "radial-gradient(75% 75% at 50% 0%, color-mix(in oklab, var(--primary-glow) 22%, transparent), color-mix(in oklab, var(--primary-glow) 8%, transparent) 38%, transparent 72%)",
          filter: "blur(42px)",
          opacity: 0.9,
        }}
      />

      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <div className="pricing-header-glow">
          <SectionHeader
            eyebrow={t.services.eyebrow}
            title={t.services.title}
            description={t.services.description}
          />
        </div>

        <motion.div
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="mt-16 grid grid-cols-1 gap-7 lg:grid-cols-3 lg:items-start"
        >
          {t.services.plans.map((plan, index) => (
            <motion.div key={plan.name} variants={item} className="group relative h-full">
              {/* Large ambient glow concentrated below the card, matching the
                  reference treatment. Featured plan stays lit; the other cards
                  reveal the same glow on hover. */}

              <div
                aria-hidden
                className={`pricing-card-glow pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] blur-3xl transition-opacity duration-500 ease-out ${
                  plan.featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:p-8 ${
                  plan.featured
                    ? "border-primary/30 bg-card shadow-[var(--shadow-glow)] lg:-translate-y-3"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {/* Large inner wash rises from the bottom of the card, so the
                    featured plan feels illuminated from within rather than
                    simply outlined. */}

                <div
                  aria-hidden
                  className={`pricing-card-inner-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[72%] transition-opacity duration-500 ${
                    plan.featured ? "opacity-100" : "opacity-0 group-hover:opacity-80"
                  }`}
                />

                {/* Top hairline — brightens on hover (always on for the
                    featured card), same treatment as elsewhere on the site. */}
                <div
                  className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity duration-300 ${
                    plan.featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {plan.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-soft">
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-sm text-muted-foreground/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                </div>
                <p className="mt-1.5 text-sm font-medium text-foreground/80">{plan.tagline}</p>

                <div className="mt-6 border-t border-border/70 pt-6">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {t.services.priceFromLabel}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-display font-bold tracking-tight text-foreground sm:text-[52px]">
                      {plan.price}
                    </span>
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {plan.currency}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                    plan.featured ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Maintenance — a calmer, secondary block below the pricing grid
            (§2.2: not a fourth card competing for the same attention, a
            distinct ongoing-support offer with its own quiet framing). */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Wrench className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold uppercase tracking-wide text-foreground sm:text-lg">
                  {maintenance.title}
                </h3>
                <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {maintenance.description}
                </p>
              </div>
            </div>

            <div className="shrink-0 sm:text-right">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {maintenance.priceFromLabel}
              </span>
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="text-3xl font-display font-bold tracking-tight text-foreground">
                  {maintenance.priceValue}
                </span>
                <span className="text-base font-semibold text-muted-foreground">
                  {maintenance.priceSuffix}
                </span>
              </div>
            </div>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border/70 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {maintenance.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-muted-foreground">{maintenance.note}</p>

          <a
            href="#contact"
            className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-semibold sm:w-auto"
          >
            {maintenance.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          {t.services.disclaimer}
        </p>
      </div>
    </section>
  );
}