import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Mail, MessageCircle, Eye, Fingerprint } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createContactFormSchema, submitContactLead, type ContactFormValues } from "@/lib/leads";
import { useTranslation } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n";

// One icon per trust indicator, in the same order as t.contact.trustIndicators.
const trustIcons = [MessageCircle, Eye, Fingerprint] as const;

// Standard section reveal (design system §7.2 / §13): fade + translateY,
// nothing more. §13 is explicit that Contact is where the site "finally
// sits still" — no ambient loops here, just the same reveal every other
// section gets.
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Contact() {
  const { t, locale } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const contactFormSchema = useMemo(() => createContactFormSchema(t.forms.validation), [t]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    const { hpToken, consent, ...lead } = values;

    // Honeypot: un bot completează și câmpurile ascunse. Dacă are valoare,
    // pretindem succes și nu trimitem nimic către Supabase.
    if (hpToken) {
      toast.success(t.contact.toastSuccess);
      reset();
      return;
    }

    try {
      await submitContactLead(lead);
      toast.success(t.contact.toastSuccess);
      reset();
    } catch {
      toast.error(t.contact.toastError);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-all duration-200 hover:border-foreground/20 focus:border-primary focus:ring-4 focus:ring-primary/10";

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            initial={prefersReducedMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
          >
            <motion.span
              variants={item}
              className="block text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {t.contact.eyebrow}
            </motion.span>
            <motion.h2
              variants={item}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.1]"
            >
              {t.contact.title}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 max-w-md text-base text-muted-foreground md:text-lg"
            >
              {t.contact.description}
            </motion.p>

            <motion.a
              variants={item}
              href="mailto:tflowpilot@gmail.com"
              className="mt-7 inline-flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" /> tflowpilot@gmail.com
            </motion.a>

            <ul className="mt-7 space-y-4">
              {t.contact.trustIndicators.map((line, index) => {
                const Icon = trustIcons[index];
                return (
                  <motion.li
                    key={line}
                    variants={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {line}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Form panel — a static, theme-correct ambient glow behind it
              (gold in light, blue in dark, via --primary-glow, same token
              as the Labs section) gives it the "premium studio" atmosphere
              the brief asks for, without introducing a moving loop that §13
              rules out for this section. focus-within lets the whole panel
              — not just the active input — respond when someone starts
              typing. */}
          <div className="relative">
            <div className="workspace-glow absolute -inset-10 -z-10" />
            <motion.form
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-3xl border border-border bg-background p-6 shadow-soft transition-shadow duration-300 focus-within:border-primary/25 focus-within:shadow-[var(--shadow-elevated)] md:p-8"
            >
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-foreground">
                    {t.contact.name}
                  </span>
                  <input type="text" {...register("name")} className={inputClass} />
                  {errors.name && (
                    <span className="mt-1 block text-xs text-destructive">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium text-foreground">
                    {t.contact.company}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({t.contact.optional})
                    </span>
                  </span>
                  <input type="text" {...register("company")} className={inputClass} />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-medium text-foreground">
                  {t.contact.email}
                </span>
                <input type="email" {...register("email")} className={inputClass} />
                {errors.email && (
                  <span className="mt-1 block text-xs text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-medium text-foreground">
                  {t.contact.message}
                </span>
                <textarea
                  rows={5}
                  {...register("message")}
                  className={`resize-none ${inputClass}`}
                />
                {errors.message && (
                  <span className="mt-1 block text-xs text-destructive">
                    {errors.message.message}
                  </span>
                )}
              </label>

              <label className="mt-4 flex items-start gap-2.5">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium disabled:opacity-60"
              >
                {isSubmitting ? t.contact.submitting : t.contact.submit}{" "}
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
