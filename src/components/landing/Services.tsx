import { Globe, Zap, TrendingUp, Bot } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";

const serviceIcons = [Globe, Zap, TrendingUp, Bot] as const;

export function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((item, index) => {
            const Icon = serviceIcons[index];

            return (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  {item.badge && (
                    <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
