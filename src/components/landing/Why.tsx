import { Gauge, Sparkles, Smartphone, SearchCheck, BrainCircuit, Layers } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";

const whyIcons = [Gauge, Sparkles, Smartphone, SearchCheck, BrainCircuit, Layers] as const;

export function Why() {
  const { t } = useTranslation();

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow={t.why.eyebrow} title={t.why.title} />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, index) => {
            const Icon = whyIcons[index];

            return (
              <div
                key={item.title}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground">{item.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
