import { Handshake, Wallet, Zap, Layers } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

const trustIcons = [Handshake, Wallet, Zap, Layers] as const;

export function Trust() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border/60 bg-surface">
      <div className="mx-auto max-w-[1320px] px-4 py-20">
        <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t.trust.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.trust.items.map((trustItem, index) => {
            const Icon = trustIcons[index];

            return (
              <div
                key={trustItem.title}
                className="group rounded-2xl border border-border bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                  {trustItem.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {trustItem.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground/70">{trustItem.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
