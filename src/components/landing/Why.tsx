import { useEffect, useRef, type RefObject } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";

// ---------------------------------------------------------------------------
// "Why FlowPilot" — principle-driven editorial section.
//
// This replaces the previous 6-card feature grid. Design system §1.2 reserves
// one signature moment per section; this is Why's: instead of stating what we
// offer, each row proves a principle with a tiny, quiet interaction that
// demonstrates the claim rather than illustrating it decoratively (§1.1.5).
//
// Every micro-visual below is built from transform/opacity, plus the narrow
// small-SVG stroke exception in design system §7.1.3 (each SVG is well under
// the 150px threshold). Nothing loops — every proof plays once, the first
// time its row scrolls into view, then holds its resting state. This keeps
// the section calm rather than busy, and costs nothing off-screen.
// ---------------------------------------------------------------------------

type ProofProps = {
  active: boolean;
  reduceMotion: boolean;
  prompt?: string;
  growthLabel?: string;
};

function useCountUp(
  ref: RefObject<HTMLSpanElement | null>,
  active: boolean,
  reduceMotion: boolean,
  from: number,
  to: number,
  duration: number,
  format: (value: number) => string,
) {
  useEffect(() => {
    if (!active || !ref.current) return;
    if (reduceMotion) {
      ref.current.textContent = format(to);
      return;
    }
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (to - from) * eased);
      if (ref.current) ref.current.textContent = format(value);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduceMotion]);
}

function PerformanceProof({ active, reduceMotion }: ProofProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const circumference = 2 * Math.PI * 27;

  useCountUp(valueRef, active, reduceMotion, 72, 100, 900, (v) => String(v));

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 -rotate-90">
        <circle cx="32" cy="32" r="27" fill="none" strokeWidth="5" className="stroke-border" />
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-[900ms] ease-out motion-reduce:transition-none"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: active ? 0 : circumference * (1 - 0.72),
          }}
        />
      </svg>
      <div>
        <div className="flex items-baseline gap-0.5 font-mono text-2xl font-semibold text-foreground">
          <span ref={valueRef}>72</span>
          <span className="text-base text-muted-foreground/50">/100</span>
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">Lighthouse score</div>
      </div>
    </div>
  );
}

function CraftProof({ active }: ProofProps) {
  return (
    <div className="relative h-14 w-full max-w-[220px]">
      <div
        className={`absolute inset-0 flex flex-col justify-center gap-2.5 transition-all duration-500 ease-out motion-reduce:transition-none ${
          active ? "-translate-y-1 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <span className="h-3 w-3/5 rounded border border-dashed border-muted-foreground/35" />
        <span className="h-2 w-full rounded border border-dashed border-muted-foreground/35" />
        <span className="h-2 w-2/5 rounded border border-dashed border-muted-foreground/35" />
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-center gap-2.5 transition-all delay-150 duration-500 ease-out motion-reduce:transition-none ${
          active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        <span className="h-3 w-3/5 rounded-full bg-primary/70" />
        <span className="h-2 w-full rounded-full bg-muted-foreground/25" />
        <span className="h-2 w-2/5 rounded-full bg-muted-foreground/15" />
      </div>
    </div>
  );
}

function ScreenProof({ active }: ProofProps) {
  return (
    <div className="relative mx-auto h-14 w-40 overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex h-full flex-col justify-center gap-1.5 px-4">
        <span className="h-1.5 w-full rounded-full bg-muted-foreground/20" />
        <span className="h-1.5 w-4/5 rounded-full bg-muted-foreground/15" />
        <span className="h-1.5 w-1/2 rounded-full bg-primary/40" />
      </div>
      <div
        className={`absolute inset-y-0 left-0 w-10 bg-secondary transition-transform duration-700 ease-out motion-reduce:transition-none ${
          active ? "translate-x-0" : "-translate-x-full"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-10 bg-secondary transition-transform duration-700 ease-out motion-reduce:transition-none ${
          active ? "translate-x-0" : "translate-x-full"
        }`}
      />
    </div>
  );
}

function SeoProof({ active }: ProofProps) {
  const rowHeight = 22;
  const domains = ["agency-x.com", "studio-b.com", "webco.com", "flowpilot.com"];

  return (
    <div className="relative h-24 w-full max-w-[220px]">
      {domains.map((_, rank) => (
        <span
          key={rank}
          className="absolute left-0 font-mono text-[10px] text-muted-foreground/40"
          style={{ top: rank * rowHeight + 3 }}
        >
          {rank + 1}
        </span>
      ))}
      <div className="absolute inset-0 left-6">
        {domains.map((domain, i) => {
          const isTarget = domain === "flowpilot.com";
          const activeSlot = isTarget ? 0 : i + 1;
          const slot = active ? activeSlot : i;

          return (
            <div
              key={domain}
              className={`absolute left-0 whitespace-nowrap text-xs font-medium transition-transform duration-700 ease-out motion-reduce:transition-none ${
                isTarget ? "text-primary" : "text-muted-foreground/50"
              }`}
              style={{
                transform: `translateY(${slot * rowHeight}px)`,
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {domain}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AiProof({ active, prompt }: ProofProps) {
  return (
    <div className="flex h-14 w-full max-w-[220px] flex-col justify-center gap-2.5">
      <div
        className={`ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-secondary px-3 py-1.5 text-[11px] text-muted-foreground transition-all duration-500 ease-out motion-reduce:transition-none ${
          active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {prompt}
      </div>
      <div className="flex items-center gap-1.5">
        <span
          className={`h-5 w-5 shrink-0 rounded-full bg-primary/10 transition-opacity delay-500 duration-400 motion-reduce:transition-none ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="h-2 w-28 overflow-hidden rounded-full bg-primary/10">
          <div
            className={`h-full origin-left rounded-full bg-primary/50 transition-transform delay-[700ms] duration-[600ms] ease-out motion-reduce:transition-none ${
              active ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

function GrowthProof({ active, reduceMotion, growthLabel }: ProofProps) {
  const dash = 190;
  const valueRef = useRef<HTMLSpanElement>(null);
  const points: Array<[number, number]> = [
    [4, 44],
    [32, 40],
    [60, 42],
    [88, 26],
    [116, 30],
    [156, 8],
  ];
  const linePath = `M${points.map(([x, y]) => `${x} ${y}`).join(" L")}`;
  const areaPath = `M4 50 L${points.map(([x, y]) => `${x} ${y}`).join(" L")} L156 50 Z`;

  useCountUp(valueRef, active, reduceMotion, 0, 128, 900, (v) => `+${v}%`);

  return (
    <div className="flex h-14 w-full max-w-[220px] flex-col justify-center gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/50">
          {growthLabel}
        </span>
        <span ref={valueRef} className="font-mono text-xs font-semibold text-primary">
          +0%
        </span>
      </div>
      <svg viewBox="0 0 160 56" className="h-11 w-full" aria-hidden>
        {[14, 28, 42].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="160"
            y2={y}
            strokeWidth="1"
            strokeDasharray="2 4"
            className="stroke-border"
          />
        ))}
        <path
          d={areaPath}
          className={`fill-primary/[0.07] transition-opacity delay-500 duration-500 ease-out motion-reduce:transition-none ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
        <path
          d={linePath}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary/70 transition-all duration-[900ms] ease-out motion-reduce:transition-none"
          style={{ strokeDasharray: dash, strokeDashoffset: active ? 0 : dash }}
        />
        {points.map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={i === points.length - 1 ? 3 : 2}
            className={`transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              i === points.length - 1 ? "fill-primary" : "fill-primary/50"
            } ${active ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${300 + i * 90}ms` }}
          />
        ))}
      </svg>
    </div>
  );
}

const principleProofs = [
  PerformanceProof,
  CraftProof,
  ScreenProof,
  SeoProof,
  AiProof,
  GrowthProof,
] as const;

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function PrincipleRow({
  index,
  label,
  title,
  desc,
  reduceMotion,
  aiPrompt,
  growthLabel,
}: {
  index: number;
  label: string;
  title: string;
  desc: string;
  reduceMotion: boolean;
  aiPrompt: string;
  growthLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const Proof = principleProofs[index];
  const reversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? "visible" : "hidden"}
      animate={inView ? "visible" : "hidden"}
      variants={rowVariants}
      className="grid grid-cols-1 items-center gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-16 lg:py-16"
    >
      <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-muted-foreground/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-[26px]">
          {title}
        </h3>
        <p className="mt-3 max-w-[38ch] text-base leading-[1.6] text-muted-foreground">{desc}</p>
      </div>
      <div className={`lg:col-span-6 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
        <div
          className={`flex min-h-[7.5rem] items-center rounded-2xl border border-border/70 bg-secondary/30 px-8 py-6 ${
            reversed ? "lg:justify-start" : "lg:justify-end"
          }`}
        >
          <Proof
            active={inView}
            reduceMotion={reduceMotion}
            prompt={aiPrompt}
            growthLabel={growthLabel}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Why() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionHeader eyebrow={t.why.eyebrow} title={t.why.title} description={t.why.intro} />

        <div className="mt-16 md:mt-20">
          {t.why.items.map((item, index) => (
            <PrincipleRow
              key={item.title}
              index={index}
              label={item.label}
              title={item.title}
              desc={item.desc}
              reduceMotion={!!prefersReducedMotion}
              aiPrompt={t.why.aiPrompt}
              growthLabel={t.why.growthLabel}
            />
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
