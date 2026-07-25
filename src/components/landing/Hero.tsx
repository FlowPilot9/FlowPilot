import { ArrowRight, Check } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.7_0.18_260/0.18),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(180deg,oklch(0.98_0.01_260),transparent)]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-24 md:grid-cols-2 md:gap-8 md:pb-32">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Now accepting new projects · Q4 2026
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.05]">
            Building modern digital experiences for{" "}
            <span className="text-gradient">growing businesses.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We design premium websites today while building the intelligent
            business tools of tomorrow.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#work"
              className="btn-ghost inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              View Our Work
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Fixed timelines</div>
            <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Modern stack</div>
            <div className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-primary" /> Ongoing support</div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,oklch(0.7_0.18_260/0.2),transparent)]" />
          <img
            src={heroIllustration}
            alt="Illustration of digital workflows and business automation"
            width={1024}
            height={1024}
            className="mx-auto w-full max-w-[560px] animate-float drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
