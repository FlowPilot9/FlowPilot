import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { useTranslation } from "@/i18n/I18nProvider";
import type { TranslationDictionary } from "@/i18n";

// ---------------------------------------------------------------------------
// "Why FlowPilot" — principle-driven editorial section.
//
// Design system §1.2 reserves one signature moment per section; this is
// Why's: instead of stating what we offer, each row proves a principle with
// a tiny, quiet interaction that demonstrates the claim rather than
// illustrating it decoratively (§1.1.5).
//
// All six illustrations share one visual language now instead of six
// unrelated ones: most are built on the same small-scale "Product Window"
// (§6.3) already used in Hero/Services/Showcase — WindowChrome below is
// that pattern, extracted as a real reusable piece for the first time.
// Every proof lives inside ProofCanvas, a fixed-size box, so no illustration
// carries more visual weight than another regardless of its content.
//
// Motion is transform/opacity only, plus the narrow small-SVG stroke
// exception in §7.1.3 (every SVG here is well under the 150px threshold).
// Nothing loops — every proof plays once, the first time its row scrolls
// into view, then holds its resting state.
// ---------------------------------------------------------------------------

type ProofData = TranslationDictionary["why"]["proof"];

type ProofProps = {
  active: boolean;
  reduceMotion: boolean;
  proof: ProofData;
};

// --- Shared primitives ------------------------------------------------------

function ProofCanvas({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[260px]">{children}</div>;
}

function WindowChrome({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-background shadow-soft">
      <div className="flex items-center gap-1.5 border-b border-border/70 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-destructive/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/25" />
        {label && (
          <span className="ml-1.5 truncate text-[10px] font-medium text-muted-foreground/70">
            {label}
          </span>
        )}
      </div>
      <div className="p-3.5">{children}</div>
    </div>
  );
}

function MetricBar({ label, active, delay }: { label: string; active: boolean; delay: number }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">{label}</span>
        <span className="text-[10px] font-medium text-foreground">100</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full origin-left rounded-full bg-primary transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transitionDelay: `${delay}ms`, transform: active ? "scaleX(1)" : "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

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

// --- 01 — Fast Delivery: a small performance dashboard ----------------------

function PerformanceProof({ active, reduceMotion, proof }: ProofProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const circumference = 2 * Math.PI * 18;

  useCountUp(valueRef, active, reduceMotion, 62, 100, 900, (v) => String(v));

  return (
    <ProofCanvas>
      <WindowChrome label={proof.scoreLabel}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">{proof.loadTimeLabel}</span>
          <span className="font-mono text-xs font-medium text-foreground">
            {proof.loadTimeValue}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <svg viewBox="0 0 44 44" className="h-11 w-11 shrink-0 -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              strokeWidth="4"
              className="stroke-secondary"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              className="stroke-primary transition-[stroke-dashoffset] duration-[900ms] ease-out motion-reduce:transition-none"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: active ? 0 : circumference * (1 - 0.62),
              }}
            />
          </svg>
          <div className="flex-1 space-y-2">
            <MetricBar label={proof.seoLabel} active={active} delay={250} />
            <MetricBar label={proof.accessibilityLabel} active={active} delay={400} />
          </div>
        </div>
      </WindowChrome>
    </ProofCanvas>
  );
}

// --- Shared: a tiny real webpage (nav + hero + cards), two tones -----------
// Reused by both 02 (style transformation) and 03 (responsive layout) — same
// "real site", shown two different ways, instead of two unrelated graphics.

function MiniSite({
  tone,
  columns,
  navCollapsed,
}: {
  tone: "wireframe" | "polished";
  columns: number;
  navCollapsed: boolean;
}) {
  const isWire = tone === "wireframe";

  return (
    <div className="flex h-full flex-col gap-1.5">
      {/* nav */}
      <div className="flex items-center justify-between">
        <span
          className={
            isWire
              ? "h-2 w-2 rounded-full border border-dashed border-muted-foreground/40"
              : "h-2 w-2 rounded-full bg-primary"
          }
        />
        {navCollapsed ? (
          <div className="flex flex-col gap-[2px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={
                  isWire
                    ? "h-[2px] w-3 rounded-full border-t border-dashed border-muted-foreground/40"
                    : "h-[2px] w-3 rounded-full bg-foreground/60"
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={
                  isWire
                    ? "h-1 w-3.5 rounded-full border border-dashed border-muted-foreground/35"
                    : "h-1 w-3.5 rounded-full bg-muted-foreground/30"
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* hero */}
      <div className={`flex gap-1.5 ${columns === 1 ? "flex-col" : "flex-row"}`}>
        <span
          className={
            isWire
              ? "h-6 flex-1 rounded border border-dashed border-muted-foreground/35"
              : "h-6 flex-1 rounded-sm bg-primary/20"
          }
        />
        <div className="flex flex-1 flex-col justify-center gap-1">
          <span
            className={
              isWire
                ? "block h-1 w-full rounded-full border-t border-dashed border-muted-foreground/35"
                : "block h-1 w-full rounded-full bg-foreground/70"
            }
          />
          <span
            className={
              isWire
                ? "block h-1 w-2/3 rounded-full border-t border-dashed border-muted-foreground/35"
                : "block h-1 w-2/3 rounded-full bg-muted-foreground/30"
            }
          />
          {!isWire && <span className="mt-0.5 h-1.5 w-6 rounded-sm bg-primary" />}
        </div>
      </div>

      {/* card grid */}
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: columns }).map((_, i) => (
          <span
            key={i}
            className={
              isWire
                ? "flex-1 rounded border border-dashed border-muted-foreground/30"
                : `flex-1 rounded-sm ${i === 0 ? "bg-primary/10" : "bg-secondary"}`
            }
          />
        ))}
      </div>
    </div>
  );
}

// --- 02 — Premium Design: the same page, wireframe next to polished --------

function CraftProof({ active }: ProofProps) {
  return (
    <ProofCanvas>
      <WindowChrome>
        <div className="flex items-center gap-2">
          <div
            className={`h-16 flex-1 transition-all duration-500 ease-out motion-reduce:transition-none ${
              active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
            }`}
          >
            <MiniSite tone="wireframe" columns={2} navCollapsed={false} />
          </div>

          <ArrowRight
            className={`h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-opacity delay-300 duration-400 ease-out motion-reduce:transition-none ${
              active ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`h-16 flex-1 transition-all delay-500 duration-500 ease-out motion-reduce:transition-none ${
              active ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0"
            }`}
          >
            <MiniSite tone="polished" columns={2} navCollapsed={false} />
          </div>
        </div>
      </WindowChrome>
    </ProofCanvas>
  );
}

// --- 03 — Mobile First: the same page, desktop → tablet → mobile -----------
// The screen content is a simplified likeness of our own Hero (badge,
// two-tone headline, filled CTA) rather than a generic abstract page — the
// proof should read as "this is our site, at three sizes", not "a website".

function MiniHeroScreen({ compact }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 p-0.5">
      {!compact && (
        <div className="flex items-center justify-between">
          <span className="h-[3px] w-[3px] rounded-full bg-primary" />
          <div className="flex gap-1">
            <span className="h-[2px] w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-[2px] w-2 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      )}
      <span className="h-[3px] w-2/5 rounded-full bg-primary/20" />
      <span className="block h-[5px] w-full rounded-full bg-foreground/70" />
      {!compact && <span className="block h-[5px] w-4/5 rounded-full bg-foreground/70" />}
      <span className="block h-[5px] w-2/3 rounded-full bg-primary" />
      <span className="h-[7px] w-2/5 rounded-sm bg-primary" />
    </div>
  );
}

function DeviceFrame({
  kind,
  width,
  height,
  active,
  delay,
}: {
  kind: "monitor" | "tablet" | "phone";
  width: number;
  height: number;
  active: boolean;
  delay: number;
}) {
  const reveal = `transition-all duration-500 ease-out motion-reduce:transition-none ${
    active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
  }`;

  const screen = (
    <div className="flex-1 overflow-hidden p-1">
      <MiniHeroScreen compact={kind === "phone"} />
    </div>
  );

  if (kind === "monitor") {
    return (
      <div
        className={`flex flex-col items-center ${reveal}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <div
          className="flex flex-col rounded-md border-[3px] border-border bg-background shadow-soft transition-colors duration-300"
          style={{ width, height }}
        >
          {screen}
        </div>
        <span className="h-2 w-2 bg-border" />
        <span className="h-1 w-9 rounded-full bg-border" />
      </div>
    );
  }

  if (kind === "tablet") {
    return (
      <div
        className={`flex flex-col rounded-xl border-[3px] border-border bg-background shadow-soft ${reveal}`}
        style={{ width, height, transitionDelay: `${delay}ms` }}
      >
        <div className="flex justify-center pt-1">
          <span className="h-[3px] w-[3px] rounded-full bg-muted-foreground/40" />
        </div>
        {screen}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col rounded-[14px] border-[3px] border-border bg-background shadow-soft ${reveal}`}
      style={{ width, height, transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-center pt-1">
        <span className="h-[3px] w-3 rounded-full bg-muted-foreground/40" />
      </div>
      {screen}
      <div className="flex justify-center pb-1">
        <span className="h-2 w-2 rounded-full border-[1.5px] border-muted-foreground/40" />
      </div>
    </div>
  );
}

function ScreenProof({ active }: ProofProps) {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="flex h-[128px] items-end justify-center gap-5">
        <DeviceFrame kind="monitor" width={100} height={80} active={active} delay={0} />
        <DeviceFrame kind="tablet" width={72} height={104} active={active} delay={150} />
        <DeviceFrame kind="phone" width={44} height={78} active={active} delay={300} />
      </div>
    </div>
  );
}

// --- 04 — SEO Optimized: search bar + rising rank ----------------------------

function SeoProof({ active, proof }: ProofProps) {
  const rowHeight = 18;
  const domains = ["agency-x.com", "studio-b.com", "webco.com", "flowpilot.com"];

  return (
    <ProofCanvas>
      <WindowChrome>
        <div className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-2 py-1.5">
          <Search className="h-3 w-3 shrink-0 text-muted-foreground/60" />
          <span className="truncate text-[10px] text-muted-foreground">{proof.searchQuery}</span>
        </div>

        <div className="relative mt-2.5 h-[76px]">
          {domains.map((_, rank) => (
            <span
              key={rank}
              className="absolute left-0 font-mono text-[9px] text-muted-foreground/40"
              style={{ top: rank * rowHeight + 2 }}
            >
              {rank + 1}
            </span>
          ))}
          <div className="absolute inset-0 left-5">
            {domains.map((domain, i) => {
              const isTarget = domain === "flowpilot.com";
              const activeSlot = isTarget ? 0 : i + 1;
              const slot = active ? activeSlot : i;

              return (
                <div
                  key={domain}
                  className={`absolute left-0 whitespace-nowrap text-[11px] font-medium transition-transform duration-700 ease-out motion-reduce:transition-none ${
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
      </WindowChrome>
    </ProofCanvas>
  );
}

// --- 05 — AI Ready: prompt → generating → component appears -----------------

function AiProof({ active, reduceMotion, proof }: ProofProps) {
  return (
    <ProofCanvas>
      <WindowChrome>
        <div className="flex min-h-[76px] flex-col justify-center gap-2">
          <div
            className={`ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-secondary px-2.5 py-1.5 text-[10px] text-muted-foreground transition-all duration-500 ease-out motion-reduce:transition-none ${
              active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            {proof.aiPrompt}
          </div>

          <motion.span
            initial={false}
            animate={
              reduceMotion ? { opacity: 0 } : active ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }
            }
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { duration: 1.6, delay: 0.5, times: [0, 0.2, 0.65, 1], ease: "easeInOut" }
            }
            className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/70"
          >
            <Sparkles className="h-2.5 w-2.5 text-primary" />
            {proof.generatingLabel}
          </motion.span>

          <div
            className={`w-28 rounded-lg border border-primary/20 bg-primary/5 p-2 transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:delay-0 ${
              active ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
            style={{ transitionDelay: reduceMotion ? "0ms" : "1700ms" }}
          >
            <span className="block h-1.5 w-10 rounded-full bg-primary/50" />
            <span className="mt-1.5 block h-1.5 w-16 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </WindowChrome>
    </ProofCanvas>
  );
}

// --- 06 — Scalable Solutions: an architecture that grows in layers ----------

function GrowthProof({ active, proof }: ProofProps) {
  const layers = proof.architectureLayers;

  return (
    <ProofCanvas>
      <div className="flex flex-col items-center">
        {layers.map((layer, i) => {
          const isLast = i === layers.length - 1;

          return (
            <div key={layer} className="flex flex-col items-center">
              {i > 0 && (
                <span
                  className={`h-3 w-px bg-border transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                />
              )}
              <div
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-400 ease-out motion-reduce:transition-none ${
                  isLast
                    ? "border-primary/30 bg-primary/5 text-primary"
                    : "border-border bg-secondary/50 text-muted-foreground"
                } ${active ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {isLast && <Sparkles className="h-3 w-3" />}
                {layer}
              </div>
            </div>
          );
        })}
      </div>
    </ProofCanvas>
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
  proof,
}: {
  index: number;
  label: string;
  title: string;
  desc: string;
  reduceMotion: boolean;
  proof: ProofData;
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
          <span className="font-mono text-base text-muted-foreground/40">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-display font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-[42ch] text-base leading-[1.6] text-muted-foreground">
          {desc}
        </p>
      </div>
      <div className={`lg:col-span-6 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
        <div
          aria-hidden="true"
          className="flex min-h-[9rem] items-center justify-center rounded-2xl border border-border/70 bg-secondary/30 px-8 py-8 md:px-10"
        >
          <Proof active={inView} reduceMotion={reduceMotion} proof={proof} />
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
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-16">
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
              proof={t.why.proof}
            />
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}