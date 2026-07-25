import { Globe, Zap, TrendingUp, Bot } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function Services() {
  const items = [
    {
      icon: Globe,
      title: "Website Development",
      desc: "Custom responsive websites built for speed, SEO and conversions.",
    },
    {
      icon: Zap,
      title: "Business Automation",
      desc: "Digital solutions that reduce repetitive work and improve efficiency.",
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      desc: "Modern digital experiences designed to help companies grow.",
    },
    {
      icon: Bot,
      title: "AI Solutions",
      desc: "We're developing intelligent business assistants that will automate repetitive workflows and help companies save time.",
      badge: "Coming Soon",
    },
  ];
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Services"
          title="Everything you need, crafted with care."
          description="From landing pages to full digital ecosystems, we ship polished products that feel effortless."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                {item.badge && (
                  <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
