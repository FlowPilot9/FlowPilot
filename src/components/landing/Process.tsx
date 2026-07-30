import { Search, ClipboardList, Palette, Code2, Rocket, LineChart } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function Process() {
  const steps = [
    { icon: Search, title: "Discover" },
    { icon: ClipboardList, title: "Plan" },
    { icon: Palette, title: "Design" },
    { icon: Code2, title: "Develop" },
    { icon: Rocket, title: "Launch" },
    { icon: LineChart, title: "Grow" },
  ];
  return (
    <section id="process" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Our Process"
          title="A calm, predictable path from idea to launch."
        />
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />
          <ol className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col items-center text-center">
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-border bg-background text-primary shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:border-primary/40">
                  <s.icon className="h-5 w-5" />
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-[10px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                </div>
                <div className="mt-4 text-sm font-medium text-foreground">{s.title}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
