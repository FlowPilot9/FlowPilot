import { useEffect, useState } from "react";
import {
  ArrowRight,
  Globe,
  Zap,
  TrendingUp,
  Bot,
  Search,
  ClipboardList,
  Palette,
  Code2,
  Rocket,
  LineChart,
  Gauge,
  Sparkles,
  Smartphone,
  SearchCheck,
  BrainCircuit,
  Layers,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Check,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";
import aiIllustration from "@/assets/ai-illustration.png";
import showcaseRestaurant from "@/assets/showcase-restaurant.jpg";
import showcaseDental from "@/assets/showcase-dental.jpg";
import showcaseConstruction from "@/assets/showcase-construction.jpg";
import showcaseLaw from "@/assets/showcase-law.jpg";
import showcaseFitness from "@/assets/showcase-fitness.jpg";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elevated)]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18 L12 6 L20 18" />
          <path d="M8 14 L16 14" />
        </svg>
      </span>
      <span className="text-[17px]">FlowPilot</span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#work", label: "Work" },
    { href: "#future", label: "Coming Soon" },
    { href: "#about", label: "About" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all ${
            scrolled
              ? "glass-panel border-transparent"
              : "border-transparent bg-transparent shadow-none"
          }`}
        >
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface-strong hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium"
            >
              Get in touch <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <button
            className="md:hidden rounded-lg border border-border p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {open && (
          <div className="glass-panel mt-2 rounded-2xl p-3 md:hidden animate-fade-up">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface-strong"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 block rounded-xl px-4 py-2 text-center text-sm font-medium"
            >
              Get in touch
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
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

function Trust() {
  const stats = [
    { value: "120+", label: "Projects Delivered" },
    { value: "60+", label: "Happy Clients" },
    { value: "98/100", label: "Performance Score" },
    { value: "< 2h", label: "Support Response" },
  ];
  return (
    <section className="border-y border-border/60 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
          We help businesses build their online presence with{" "}
          <span className="text-foreground">fast, modern and scalable</span> websites.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background px-6 py-8 text-center">
              <div className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  );
}

function Services() {
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

function Process() {
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

function Showcase() {
  const items = [
    { title: "Restaurant Website", tag: "Hospitality", img: showcaseRestaurant },
    { title: "Dental Clinic", tag: "Healthcare", img: showcaseDental },
    { title: "Construction Company", tag: "Industrial", img: showcaseConstruction },
    { title: "Law Firm", tag: "Professional", img: showcaseLaw },
    { title: "Fitness Studio", tag: "Lifestyle", img: showcaseFitness },
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
          {items.map((item, i) => (
            <a
              key={item.title}
              href="#contact"
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
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
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

function ComingSoon() {
  return (
    <section id="future" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.7_0.18_260/0.14),transparent)]" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 md:p-14">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                In Development
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.05]">
                The Future of <span className="text-gradient">FlowPilot.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We're building intelligent AI assistants designed to automate
                repetitive business tasks such as document processing, email
                management and workflow automation.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <button
                  type="submit"
                  className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
                >
                  Join the Waiting List <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <div className="mt-4 text-xs text-muted-foreground">
                Early access · No spam · Unsubscribe anytime
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,oklch(0.7_0.18_260/0.25),transparent)]" />
              <img
                src={aiIllustration}
                alt="Illustration of an AI assistant orchestrating business tasks"
                loading="lazy"
                width={1024}
                height={1024}
                className="mx-auto w-full max-w-[480px] animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          About
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.1]">
          One mission: help businesses save time through exceptional digital products.
        </h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            FlowPilot was created to bridge the gap between beautiful design and
            practical technology — websites that don't just look good, but move
            businesses forward.
          </p>
          <p>
            <span className="text-foreground">Today</span> we build premium websites.{" "}
            <span className="text-foreground">Tomorrow</span> we build intelligent
            business software.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Contact
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.1]">
              Let's build something great together.
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              Tell us about your project. We reply within 24 hours with a
              tailored proposal.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" /> hello@flowpilot.studio
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" /> Fixed-price engagements
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-4 w-4 text-primary" /> Delivery in 2–6 weeks
              </li>
            </ul>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="glass-panel rounded-3xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-foreground">Name</span>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-foreground">Company</span>
                <input
                  type="text"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-foreground">Email</span>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-foreground">Message</span>
              <textarea
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <button
              type="submit"
              className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium"
            >
              Send message <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
        <Logo />
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#process" className="hover:text-foreground">Process</a>
          <a href="#work" className="hover:text-foreground">Work</a>
          <a href="#future" className="hover:text-foreground">Coming Soon</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Github className="h-4 w-4" />
          </a>
          <a href="mailto:hello@flowpilot.studio" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} FlowPilot. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Trust />
      <Services />
      <Process />
      <Showcase />
      <Why />
      <ComingSoon />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}