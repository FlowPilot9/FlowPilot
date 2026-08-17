import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Globe, Zap, TrendingUp, Bot } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";

const serviceIcons = [Globe, Zap, TrendingUp, Bot] as const;

// Standard section reveal (design system §7.2): fade + translateY, staggered
// per card. This is the baseline motion every section gets — separate from
// the hover interaction below, which is Services' one signature moment.
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Each service gets a small "M-scale" product window (design system §6.3) —
// a miniature, capability-specific UI fragment that sits quiet in the card's
// resting state and "wakes up" with the primary accent on hover. This is
// Services' signature moment: the user touches the product, not just reads
// about it. Everything below is pure CSS (group-hover + transition), no JS
// loop, so it costs nothing until someone actually hovers.

function WebDevPreview() {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="h-1.5 w-1.5 rounded-full bg-border" />
        <span className="ml-1 h-1.5 w-14 rounded-full bg-border transition-colors duration-300 group-hover:bg-primary/40" />
      </div>
      <div className="space-y-1.5">
        <span className="block h-1.5 w-2/3 rounded-full bg-muted-foreground/20 transition-all duration-300 group-hover:w-full group-hover:bg-primary/30" />
        <span className="block h-1.5 w-1/2 rounded-full bg-muted-foreground/15 transition-all delay-75 duration-300 group-hover:w-4/5" />
      </div>
    </div>
  );
}

function AutomationPreview() {
  return (
    <svg viewBox="0 0 140 40" className="h-10 w-full" aria-hidden>
      <line
        x1="12"
        y1="20"
        x2="128"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        className="text-border [stroke-dasharray:116] [stroke-dashoffset:116] transition-all duration-700 ease-out group-hover:text-primary/50 group-hover:[stroke-dashoffset:0]"
      />
      <circle
        cx="12"
        cy="20"
        r="5"
        className="fill-muted-foreground/25 transition-colors duration-300 group-hover:fill-primary"
      />
      <circle
        cx="70"
        cy="20"
        r="5"
        className="fill-muted-foreground/25 transition-colors delay-150 duration-300 group-hover:fill-primary"
      />
      <circle
        cx="128"
        cy="20"
        r="5"
        className="fill-muted-foreground/25 transition-colors delay-300 duration-300 group-hover:fill-primary"
      />
    </svg>
  );
}

function GrowthPreview() {
  return (
    <svg viewBox="0 0 140 40" className="h-10 w-full" aria-hidden>
      <path
        d="M4 32 L28 26 L52 30 L76 16 L100 20 L136 6"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-muted-foreground/30 transition-colors duration-300 group-hover:stroke-primary"
      />
      <circle
        cx="136"
        cy="6"
        r="3"
        className="fill-muted-foreground/30 transition-colors duration-300 group-hover:fill-primary"
      />
    </svg>
  );
}

function AiPreview() {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-muted-foreground/10 transition-colors duration-300 group-hover:bg-primary/10">
        <Bot className="h-3 w-3 text-muted-foreground/60 transition-colors duration-300 group-hover:text-primary" />
      </span>
      <div className="flex-1 space-y-1.5 pt-1">
        <span className="block h-1.5 w-4/5 rounded-full bg-muted-foreground/15" />
        <span className="block h-1.5 w-1/2 rounded-full bg-muted-foreground/15" />
      </div>
    </div>
  );
}

const servicePreviews = [WebDevPreview, AutomationPreview, GrowthPreview, AiPreview] as const;

export function Services() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
        />

        <motion.div
          initial={prefersReducedMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            const Preview = servicePreviews[index];

            return (
              <motion.div
                key={service.title}
                variants={item}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-secondary text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                  {service.badge && (
                    <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>

                {/* M-scale product window — design system §6.3 */}
                <div className="mt-5 rounded-xl border border-border/70 bg-secondary/40 p-3">
                  <Preview />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
