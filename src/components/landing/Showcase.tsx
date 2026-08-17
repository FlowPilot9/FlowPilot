import { ArrowRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";
import showcaseRestaurant from "@/assets/showcase-restaurant.webp";
import showcaseDental from "@/assets/showcase-dental.webp";
import showcaseConstruction from "@/assets/showcase-construction.webp";
import showcaseProduct from "@/assets/showcase-product.webp";
import showcaseCollection from "@/assets/showcase-collection.webp";

const showcaseImages = [
  showcaseRestaurant,
  showcaseDental,
  showcaseConstruction,
  showcaseProduct,
  showcaseCollection,
] as const;

// Only the Dental Clinic template is a real, live product today — everything
// else is presented honestly as "request this design" rather than a fake
// demo link. As more templates go live, just flip isLive + add a url here.
const showcaseUrls = [
  "https://conacul-digital-romania.vercel.app/",
  "https://aurora-dental-rosy.vercel.app/",
  "https://axion-build-blueprint.vercel.app/",
  "https://noir-atelier-showcase-umber.vercel.app/",
  "https://arq-aura-showcase.vercel.app/",
] as const;

// Bento arrangement: the Product Presentation template (index 3) is the
// featured, large tile; Dental (1) and the restaurant (0) stack beside it;
// Construction (2) and the sneaker showcase (4) share the bottom row.
// `span` places each tile on the lg:grid-cols-12 grid below. The featured
// tile uses row-span-2 to physically span the two stacked tiles' rows —
// its 600px height is what row1 (288px) + row2 (288px) + the 24px row gap
// between them add up to, so the right column stays flush against it. If
// the gap-6 (24px) below ever changes, keep these numbers in sync.
const layout = [
  {
    index: 3,
    span: "lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:col-start-1",
    featured: true,
    heightClass: "lg:h-[600px]",
  },
  {
    index: 1,
    span: "lg:col-span-5 lg:col-start-8 lg:row-start-1",
    featured: false,
    heightClass: "lg:h-[288px]",
  },
  {
    index: 0,
    span: "lg:col-span-5 lg:col-start-8 lg:row-start-2",
    featured: false,
    heightClass: "lg:h-[288px]",
  },
  {
    index: 2,
    span: "lg:col-span-6 lg:col-start-1 lg:row-start-3",
    featured: false,
    heightClass: "lg:h-[380px]",
  },
  {
    index: 4,
    span: "lg:col-span-6 lg:col-start-7 lg:row-start-3",
    featured: false,
    heightClass: "lg:h-[380px]",
  },
] as const;

export function Showcase() {
  const { t } = useTranslation();

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1680px] px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow={t.showcase.eyebrow}
          title={t.showcase.title}
          description={t.showcase.description}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {layout.map(({ index: i, span, featured, heightClass }) => {
            const product = t.showcase.items[i];
            const liveUrl = showcaseUrls[i];
            const ctaHref = product.isLive && liveUrl ? liveUrl : "#contact";
            const ctaLabel = product.isLive ? t.showcase.liveDemoLabel : t.showcase.requestLabel;

            return (
              <a
                key={product.title}
                href={ctaHref}
                target={product.isLive ? "_blank" : undefined}
                rel={product.isLive ? "noopener noreferrer" : undefined}
                aria-label={`${ctaLabel} — ${product.title}`}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] ${featured ? "aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto" : "aspect-[16/10] lg:aspect-auto"} ${span} ${heightClass}`}
              >
                <img
                  src={showcaseImages[i]}
                  alt={(t.showcase.previewAlt ?? "{title}").replace("{title}", product.title)}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                {/* Scrim: strong enough at the bottom to keep the overlaid
                    copy readable against any screenshot, light or dark. */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/0" />

                {featured && (
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-current" />
                    {t.showcase.featuredLabel}
                  </span>
                )}

                <div className="relative z-10 p-5 md:p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                      {product.tag}
                    </span>
                    {product.isLive && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {t.showcase.liveLabel}
                      </span>
                    )}
                  </div>

                  <h3
                    className={`mt-1.5 font-display font-semibold text-white ${featured ? "text-2xl md:text-[28px]" : "text-xl"}`}
                  >
                    {product.title}
                  </h3>

                  <span className="group/cta mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/20">
                    {ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
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
