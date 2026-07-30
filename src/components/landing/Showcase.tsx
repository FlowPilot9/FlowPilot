import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import showcaseRestaurant from "@/assets/showcase-restaurant.jpg";
import showcaseDental from "@/assets/showcase-dental.jpg";
import showcaseConstruction from "@/assets/showcase-construction.jpg";
import showcaseLaw from "@/assets/showcase-law.jpg";
import showcaseFitness from "@/assets/showcase-fitness.jpg";

export function Showcase() {
  const items = [
    {
      title: "Restaurant Website",
      tag: "Hospitality",
      img: showcaseRestaurant,
      href: "#contact",
    },
    {
      title: "Dental Clinic",
      tag: "Healthcare",
      img: showcaseDental,
      href: "https://aurora-dental-rosy.vercel.app/",
    },
    {
      title: "Construction Company",
      tag: "Industrial",
      img: showcaseConstruction,
      href: "#contact",
    },
    {
      title: "Law Firm",
      tag: "Professional",
      img: showcaseLaw,
      href: "#contact",
    },
    {
      title: "Fitness Studio",
      tag: "Lifestyle",
      img: showcaseFitness,
      href: "#contact",
    },
  ];

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Showcase"
          title="Selected work, made to convert."
          description="A glimpse into the businesses we've partnered with across industries."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const isExternal = item.href.startsWith("http");

            return (
              <a
                key={item.title}
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] ${
                  i === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-surface-strong">
                  <img
                    src={item.img}
                    alt={`${item.title} project mockup`}
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
