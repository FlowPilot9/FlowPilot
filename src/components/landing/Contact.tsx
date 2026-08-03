import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Mail, Check } from "lucide-react";
import { createContactFormSchema, submitContactLead, type ContactFormValues } from "@/lib/leads";
import { useTranslation } from "@/i18n/I18nProvider";
import { localePath } from "@/i18n";

export function Contact() {
  const { t, locale } = useTranslation();
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

  return (
    <section id="contact" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t.contact.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.1]">
              {t.contact.title}
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              {t.contact.description}
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" /> hello@flowpilot.studio
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" /> {t.contact.fixedPrice}
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" /> {t.contact.delivery}
              </li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="glass-panel rounded-3xl p-6 md:p-8"
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
                <input
                  type="text"
                  {...register("name")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                {errors.name && (
                  <span className="mt-1 block text-xs text-destructive">{errors.name.message}</span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-foreground">
                  {t.contact.company}{" "}
                  <span className="font-normal text-muted-foreground">({t.contact.optional})</span>
                </span>
                <input
                  type="text"
                  {...register("company")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-foreground">
                {t.contact.email}
              </span>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-destructive">{errors.email.message}</span>
              )}
            </label>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-foreground">
                {t.contact.message}
              </span>
              <textarea
                rows={5}
                {...register("message")}
                className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
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
              <span className="mt-1 block text-xs text-destructive">{errors.consent.message}</span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium disabled:opacity-60"
            >
              {isSubmitting ? t.contact.submitting : t.contact.submit}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
