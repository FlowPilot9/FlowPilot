import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";
import showcaseRestaurant from "@/assets/showcase-restaurant.jpg";
import showcaseDental from "@/assets/showcase-dental.jpg";
import showcaseConstruction from "@/assets/showcase-construction.jpg";
import showcaseLaw from "@/assets/showcase-law.jpg";
import showcaseFitness from "@/assets/showcase-fitness.jpg";

const showcaseImages = [
  showcaseRestaurant,
  showcaseDental,
  showcaseConstruction,
  showcaseLaw,
  showcaseFitness,
] as const;

const showcaseHrefs = [
  "#contact",
  "https://aurora-dental-rosy.vercel.app/",
  "#contact",
  "#contact",
  "#contact",
] as const;

export function Showcase() {
  const { t } = useTranslation();

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow={t.showcase.eyebrow}
          title={t.showcase.title}
          description={t.showcase.description}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.showcase.items.map((item, i) => {
            const href = showcaseHrefs[i];
            const isExternal = href.startsWith("http");

            return (
              <a
                key={item.title}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] ${
                  i === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-surface-strong">
                  <img
                    src={showcaseImages[i]}
                    alt={t.showcase.projectMockup.replace("{title}", item.title)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex items-center justify-between p-5">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.tag}
                    </div>

                    <div className="mt-1 text-base font-semibold text-foreground">
                      {item.title}
                    </div>
                  </div>

                  <span className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-primary/40 group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
