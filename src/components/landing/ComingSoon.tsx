import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { createWaitlistFormSchema, submitWaitlistLead, type WaitlistFormValues } from "@/lib/leads";
import { useTranslation } from "@/i18n/I18nProvider";
import aiIllustration from "@/assets/ai-illustration.png";
import { localePath } from "@/i18n";

export function ComingSoon() {
  const { t, locale } = useTranslation();
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
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.7_0.18_260/0.14),transparent)]" />
      </div>
      <div className="mx-auto max-w-[1500px] px-4">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-14">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {t.comingSoon.badge}
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.05]">
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
                    className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
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
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,oklch(0.7_0.18_260/0.25),transparent)]" />
              <img
                src={aiIllustration}
                alt={t.comingSoon.imageAlt}
                loading="lazy"
                width={1024}
                height={1024}
                className="mx-auto w-full max-w-[480px] animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
