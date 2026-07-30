import { Gauge, Sparkles, Smartphone, SearchCheck, BrainCircuit, Layers } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function Why() {
  const items = [
    { icon: Gauge, title: "Fast Delivery", desc: "Launch in weeks, not quarters." },
    { icon: Sparkles, title: "Premium Design", desc: "Refined, considered, on-brand." },
    { icon: Smartphone, title: "Mobile First", desc: "Beautiful on every device." },
    { icon: SearchCheck, title: "SEO Optimized", desc: "Built to be discovered." },
    { icon: BrainCircuit, title: "Future AI Ready", desc: "Architected for what's next." },
    { icon: Layers, title: "Scalable Solutions", desc: "Grow without a rebuild." },
  ];
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Why FlowPilot" title="A partner obsessed with the details." />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-foreground">{item.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
