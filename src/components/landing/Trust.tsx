import { Handshake, Wallet, Zap, Layers } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";

const trustIcons = [Handshake, Wallet, Zap, Layers] as const;

// Desktop-only (lg+) vertical offset per card — index 0 & 3 sit higher,
// index 1 & 2 sit lower, producing the asymmetric "M" composition. Below
// lg, cards fall back to the plain stacked/2-col grid untouched.
const cardOffset = ["lg:mt-0", "lg:mt-16", "lg:mt-16", "lg:mt-0"] as const;

// A single continuous "circuit trace" threading through all four card
// zones — enters off-canvas left at the upper level (card 1's zone), steps
// down through one rounded elbow, runs as one unbroken line under both
// center cards (card 2 + card 3's zone, reinforcing "same system"), steps
// back up through a second elbow, and exits off-canvas right through card
// 4's zone. Coordinates are authored against a fixed 1200x260 reference
// frame; the <svg> stretches to fill the actual (fluid-width) card row via
// preserveAspectRatio="none", so it scales with the container instead of
// needing to track real DOM positions.
const SPINE_PATH =
  "M -20 60 L 250 60 Q 272 60 272 82 L 272 178 Q 272 200 294 200 L 906 200 Q 928 200 928 178 L 928 82 Q 928 60 950 60 L 1220 60";

// A second, fainter rail running above the spine at a different level —
// same left-to-right, step-down/step-up shape, offset so it crosses in and
// out of the spine's territory rather than running parallel to it. Reads
// as a second bus on the same board rather than a duplicate of the first.
const RAIL_PATH =
  "M -20 25 L 370 25 Q 392 25 392 47 L 392 84 Q 392 106 414 106 L 786 106 Q 808 106 808 84 L 808 47 Q 808 25 830 25 L 1220 25";

// Short stubs connecting the spine into each card's near edge, plus the
// two elbow junctions — the "mici puncte/noduri unde se întâlnesc".
const branches = [
  { d: "M 150 60 L 150 40", node: { cx: 150, cy: 40 } }, // into card 1 (upper)
  { d: "M 450 200 L 450 220", node: { cx: 450, cy: 220 } }, // into card 2 (lower)
  { d: "M 750 200 L 750 220", node: { cx: 750, cy: 220 } }, // into card 3 (lower)
  { d: "M 1050 60 L 1050 40", node: { cx: 1050, cy: 40 } }, // into card 4 (upper)
];

// A direct link bridging card 2 and card 3 beneath both, on top of them
// already sharing the spine's lower segment — makes the "these two are
// paired" reading explicit rather than incidental.
const BRIDGE_PATH = "M 450 220 Q 450 240 470 240 L 730 240 Q 750 240 750 220";

// Short dead-end stubs off the spine that don't lead anywhere — the small
// unused test-points and via breakouts that make a real board read as
// dense/alive rather than a minimal diagram of exactly four connections.
const stubs = [
  { d: "M 340 60 L 340 38 L 366 38", node: { cx: 366, cy: 38 } },
  { d: "M 600 200 L 600 232 L 630 232", node: { cx: 630, cy: 232 } },
  { d: "M 860 60 L 860 38 L 834 38", node: { cx: 834, cy: 38 } },
];

// Horizontal links running through card body height, in the gap between
// two neighbouring columns — since the cards sit above these (z-10, opaque
// glass-panel), each one visually dives behind the card on its left,
// crosses the gap, and re-emerges from behind the card on its right,
// rather than only approaching from the top/bottom edge.
const sideLinks = [
  { d: "M 250 130 L 350 130", node: { cx: 300, cy: 130 } }, // behind card 1 / card 2
  { d: "M 550 210 L 650 210", node: { cx: 600, cy: 210 } }, // behind card 2 / card 3
  { d: "M 850 130 L 950 130", node: { cx: 900, cy: 130 } }, // behind card 3 / card 4
];

const junctions = [
  { cx: 272, cy: 140 },
  { cx: 928, cy: 140 },
  { cx: 392, cy: 65 },
  { cx: 808, cy: 65 },
];

// Small static flow markers along otherwise-straight runs of the spine —
// no motion, just enough visual texture that the line doesn't read as a
// single bare stroke.
const flowMarkers = [
  { cx: 100, cy: 60 },
  { cx: 500, cy: 200 },
  { cx: 700, cy: 200 },
  { cx: 1100, cy: 60 },
];

// Data packets traveling the two rails, staggered and varied so several
// are always visible at once rather than one lone dot looping.
const pulses = [
  { path: SPINE_PATH, delay: "0s", duration: "7s", r: 3 },
  { path: SPINE_PATH, delay: "2.3s", duration: "7s", r: 3 },
  { path: SPINE_PATH, delay: "4.6s", duration: "7s", r: 2.5 },
  { path: RAIL_PATH, delay: "1.2s", duration: "8.5s", r: 2.5 },
  { path: RAIL_PATH, delay: "5.4s", duration: "8.5s", r: 2 },
];

function CircuitConnectors() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
    >
      <path
        d={RAIL_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.4"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={SPINE_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={BRIDGE_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeOpacity="0.55"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
      {branches.map((b) => (
        <path
          key={b.d}
          d={b.d}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {sideLinks.map((s) => (
        <path
          key={s.d}
          d={s.d}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {stubs.map((s) => (
        <path
          key={s.d}
          d={s.d}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.4"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {junctions.map((j) => (
        <circle key={`${j.cx}-${j.cy}`} cx={j.cx} cy={j.cy} r="3" fill="var(--primary)" opacity="0.7" />
      ))}
      {branches.map((b) => (
        <g key={`${b.node.cx}-${b.node.cy}`}>
          <circle cx={b.node.cx} cy={b.node.cy} r="7" fill="none" stroke="var(--primary)" strokeOpacity="0.4" />
          <circle cx={b.node.cx} cy={b.node.cy} r="3.5" fill="var(--primary)" opacity="0.8" />
        </g>
      ))}
      {sideLinks.map((s) => (
        <circle
          key={`${s.node.cx}-${s.node.cy}`}
          cx={s.node.cx}
          cy={s.node.cy}
          r="3"
          fill="var(--primary)"
          opacity="0.7"
        />
      ))}
      {stubs.map((s) => (
        <circle
          key={`${s.node.cx}-${s.node.cy}`}
          cx={s.node.cx}
          cy={s.node.cy}
          r="2.25"
          fill="var(--primary)"
          opacity="0.55"
        />
      ))}
      {flowMarkers.map((m) => (
        <circle key={`${m.cx}-${m.cy}`} cx={m.cx} cy={m.cy} r="2" fill="var(--primary)" opacity="0.45" />
      ))}

      {!prefersReducedMotion &&
        pulses.map((p, i) => (
          <circle key={`${p.path}-${p.delay}-${i}`} r={p.r} fill="var(--primary)" opacity="0.95">
            <animateMotion
              dur={p.duration}
              begin={p.delay}
              repeatCount="indefinite"
              path={p.path}
              rotate="auto"
            />
            <animate
              attributeName="opacity"
              values="0;0.95;0.95;0"
              keyTimes="0;0.08;0.92;1"
              dur={p.duration}
              begin={p.delay}
              repeatCount="indefinite"
            />
          </circle>
        ))}
    </svg>
  );
}

export function Trust() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border/60 bg-surface">
      <div className="mx-auto max-w-[1320px] px-4 py-20">
        <h2 className="mx-auto max-w-2xl text-center text-2xl font-display font-semibold tracking-tight text-foreground md:text-3xl">
          {t.trust.title}
        </h2>

        {/* Mobile / tablet (< lg): unchanged plain grid. */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {t.trust.items.map((trustItem, index) => {
            const Icon = trustIcons[index];
            return (
              <div
                key={trustItem.title}
                className="group rounded-2xl border border-border bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                  {trustItem.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {trustItem.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground/70">{trustItem.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Desktop (lg+): asymmetric "system" composition — outer cards
            raised, center cards lowered, connected by the circuit traces
            in CircuitConnectors above. */}
        <div className="relative mt-16 hidden lg:grid lg:grid-cols-4 lg:items-start lg:gap-6 lg:pb-10">
          <CircuitConnectors />
          {t.trust.items.map((trustItem, index) => {
            const Icon = trustIcons[index];
            return (
              <div
                key={trustItem.title}
                className={`group relative z-10 rounded-2xl glass-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)] ${cardOffset[index]}`}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                  {trustItem.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {trustItem.description}
                </p>
                <p className="mt-3 text-xs text-muted-foreground/70">{trustItem.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
