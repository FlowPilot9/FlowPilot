import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Bot, Workflow, FileText, BarChart3 } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createWaitlistFormSchema, type WaitlistFormValues } from "@/lib/lead-schemas";
import { useTranslation } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n";

// One icon per experiment, in the same order as t.comingSoon.experiments.
const experimentIcons = [Bot, Workflow, FileText, BarChart3] as const;

// Standard section reveal (design system §7.2), same recipe as Services.
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function ComingSoon() {
  const { t, locale } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const waitlistFormSchema = useMemo(() => createWaitlistFormSchema(t.forms.validation), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
  });

  const onSubmit = async (values: WaitlistFormValues) => {
    if (values.hpToken) {
      toast.success(t.comingSoon.toastSuccess);
      reset();
      return;
    }

    try {
      const { submitWaitlistLead } = await import("@/lib/leads");
      await submitWaitlistLead({ email: values.email });
      toast.success(t.comingSoon.toastSuccess);
      reset();
    } catch {
      toast.error(t.comingSoon.toastError);
    }
  };

  return (
    <section id="future" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-primary-glow)_35%,transparent),transparent)]" />
      </div>
      <div className="mx-auto max-w-[1500px] px-4">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-14">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {t.comingSoon.badge}
              </span>
              <h2 className="mt-5 text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.15]">
                {t.comingSoon.title}{" "}
                <span className="text-gradient">{t.comingSoon.titleHighlight}</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t.comingSoon.description}
              </p>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <input
                  type="text"
                  {...register("hpToken")}
                  tabIndex={-1}
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder={t.comingSoon.emailPlaceholder}
                    {...register("email")}
                    className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium disabled:opacity-60"
                  >
                    {isSubmitting ? t.comingSoon.submitting : t.comingSoon.submit}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {errors.email && (
                  <span className="mt-2 block text-xs text-destructive">
                    {errors.email.message}
                  </span>
                )}
                <label className="mt-3 flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-2 focus:ring-primary/30"
                  />
                  <span className="text-xs text-muted-foreground">
                    {t.consent.prefix}{" "}
                    <a
                      href={localePath(locale, "/privacy")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      {t.consent.linkText}
                    </a>
                  </span>
                </label>
                {errors.consent && (
                  <span className="mt-1 block text-xs text-destructive">
                    {errors.consent.message}
                  </span>
                )}
              </form>
              <div className="mt-4 text-xs text-muted-foreground">{t.comingSoon.disclaimer}</div>
            </div>

            {/* Right column — the section's signature moment (design system §1.2):
                a small vertical roadmap of what FlowPilot Labs is exploring, not a
                product screenshot or an illustrated AI mascot. */}
            <div className="relative">
              <div className="workspace-glow absolute -inset-10 -z-10" />
              <motion.div
                initial={prefersReducedMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={container}
                className="relative rounded-[1.75rem] border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm md:p-8"
              >
                <ul className="relative space-y-2">
                  {t.comingSoon.experiments.map((exp, index) => {
                    const Icon = experimentIcons[index];
                    return (
                      <motion.li
                        key={exp.label}
                        variants={item}
                        className="group relative flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-colors duration-300 hover:border-primary/25 hover:bg-primary/[0.04]"
                      >
                        <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors duration-300 group-hover:border-primary/50 group-hover:text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                            <span className="text-sm font-semibold text-foreground">
                              {exp.label}
                            </span>
                            <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                              {exp.status}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {exp.description}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
