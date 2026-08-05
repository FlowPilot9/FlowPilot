import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";
import showcaseRestaurant from "@/assets/showcase-restaurant.webp";
import showcaseDental from "@/assets/showcase-dental.webp";
import showcaseConstruction from "@/assets/showcase-construction.webp";
import showcaseLaw from "@/assets/showcase-law.webp";
import showcaseFitness from "@/assets/showcase-fitness.webp";

const showcaseImages = [
  showcaseRestaurant,
  showcaseDental,
  showcaseConstruction,
  showcaseLaw,
  showcaseFitness,
] as const;

// Only the Dental Clinic template is a real, live product today — everything
// else is presented honestly as "request this design" rather than a fake
// demo link. As more templates go live, just flip isLive + add a url here.
const showcaseUrls = [
  "https://conacul-digital-romania.vercel.app/",
  "https://aurora-dental-rosy.vercel.app/",
  undefined,
  undefined,
  undefined,
] as const;

export function Showcase() {
  const { t } = useTranslation();

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionHeader
          eyebrow={t.showcase.eyebrow}
          title={t.showcase.title}
          description={t.showcase.description}
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.showcase.items.map((product, i) => {
            const liveUrl = showcaseUrls[i];
            const ctaHref = product.isLive && liveUrl ? liveUrl : "#contact";
            const ctaLabel = product.isLive ? t.showcase.liveDemoLabel : t.showcase.requestLabel;

            return (
              <div key={product.title} className="group flex flex-col">
                {/* Product Window — XL+ scale (design system §6.3), the
                    same visual grammar as Hero/Services, pushed here into
                    its most immersive card-level presentation. */}
                <a
                  href={ctaHref}
                  target={product.isLive ? "_blank" : undefined}
                  rel={product.isLive ? "noopener noreferrer" : undefined}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex items-center gap-1.5 border-b border-border/70 px-3.5 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-destructive/40" />
                    <span className="h-2 w-2 rounded-full bg-primary/30" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
                  </div>
                  <div className="aspect-[16/10] overflow-hidden bg-surface-strong">
                    <img
                      src={showcaseImages[i]}
                      alt={(t.showcase.previewAlt ?? "{title}").replace("{title}", product.title)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </a>

                <div className="mt-5 flex flex-1 flex-col px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {product.tag}
                    </span>
                    {product.isLive && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {t.showcase.liveLabel}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1.5 text-base font-semibold text-foreground">
                    {product.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={ctaHref}
                    target={product.isLive ? "_blank" : undefined}
                    rel={product.isLive ? "noopener noreferrer" : undefined}
                    className="group/cta mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
