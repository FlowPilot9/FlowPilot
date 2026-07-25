import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowRight, Mail, Check } from "lucide-react";
import {
  contactFormSchema,
  submitLead,
  type ContactFormValues,
} from "@/lib/leads";

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await submitLead({ type: "contact", ...values });
      toast.success("Message sent — we'll reply within 24 hours.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Contact
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.1]">
              Let's build something great together.
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              Tell us about your project. We reply within 24 hours with a
              tailored proposal.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" /> hello@flowpilot.studio
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" /> Fixed-price engagements
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" /> Delivery in 2–6 weeks
              </li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="glass-panel rounded-3xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-foreground">Name</span>
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
                <span className="mb-1.5 block text-xs font-medium text-foreground">Company</span>
                <input
                  type="text"
                  {...register("company")}
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-foreground">Email</span>
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
              <span className="mb-1.5 block text-xs font-medium text-foreground">Message</span>
              <textarea
                rows={5}
                {...register("message")}
                className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
              {errors.message && (
                <span className="mt-1 block text-xs text-destructive">{errors.message.message}</span>
              )}
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send message"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
