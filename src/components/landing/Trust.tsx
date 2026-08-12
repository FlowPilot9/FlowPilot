import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Handshake, Wallet, Zap, Layers } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";

const trustIcons = [Handshake, Wallet, Zap, Layers] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

// Per-card "system state" label — same order as trustIcons / t.trust.items.
// Reinforces the module read: each card is a live component of one system,
// not a static feature tile.
const cardStatus = ["CONNECTED", "VERIFIED", "OPTIMIZED", "SCALABLE"] as const;

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

// Two short overhead arcs, each lifting from an outer card up and over
// toward the middle, joining into the secondary rail's dip near the
// center cards — a true mirror pair (ARC_RIGHT's coordinates are exactly
// ARC_LEFT's reflected around the row's center, x -> 1200 - x), so the
// left and right halves of the composition carry the same amount of
// "activity" instead of one side reading busier than the other.
const ARC_LEFT =
  "M 150 40 L 150 16 Q 150 8 158 8 L 442 8 Q 450 8 450 16 L 450 96 Q 450 106 460 106";
const ARC_RIGHT =
  "M 1050 40 L 1050 16 Q 1050 8 1042 8 L 758 8 Q 750 8 750 16 L 750 96 Q 750 106 740 106";

// Short dead-end stubs off the spine that don't lead anywhere — the small
// unused test-points and via breakouts that make a real board read as
// dense/alive rather than a minimal diagram of exactly four connections.
const stubs = [
  { d: "M 340 60 L 340 38 L 366 38", node: { cx: 366, cy: 38 } },
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
  { cx: 158, cy: 8 },
  { cx: 1042, cy: 8 },
  { cx: 460, cy: 106 },
  { cx: 740, cy: 106 },
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
// are always visible at once rather than one lone dot looping. These only
// start once the connectors have finished revealing themselves (see
// `visible` below) — a moving dot on an invisible line would look broken.
const pulses = [
  { path: SPINE_PATH, delay: "0s", duration: "7s", r: 3 },
  { path: SPINE_PATH, delay: "2.3s", duration: "7s", r: 3 },
  { path: SPINE_PATH, delay: "4.6s", duration: "7s", r: 2.5 },
  { path: RAIL_PATH, delay: "1.2s", duration: "8.5s", r: 2.5 },
  { path: RAIL_PATH, delay: "5.4s", duration: "8.5s", r: 2 },
  { path: ARC_LEFT, delay: "0.5s", duration: "6s", r: 2.5 },
  { path: ARC_LEFT, delay: "3.8s", duration: "6s", r: 2 },
  { path: ARC_RIGHT, delay: "2.1s", duration: "6s", r: 2.5 },
  { path: ARC_RIGHT, delay: "5.3s", duration: "6s", r: 2 },
];

// Reveal pacing for the connectors: every path/node gets a delay based on
// how far its x-coordinate sits from the row's center (600) — 0 at the far
// edges, CONNECTORS_STAGGER at dead center — so the whole network reads as
// lighting up from the outer cards inward rather than popping in at once.
const CONNECTORS_STAGGER = 1.7; // seconds, edge -> center spread (2x slower to develop)
const CENTER_X = 600;

// SPINE_PATH and RAIL_PATH each render as a single element — not split
// into per-zone pieces — specifically so they can never show a seam. Two
// adjacent elements with different delays are, for the whole overlap of
// their transitions, at two different opacity values at any given
// instant; that reads as a visible step right at the join no matter how
// much their fade windows overlap. A single element has one opacity value
// for its entire length, so a "two-part" look is structurally impossible.
// They still get a modest, early, fixed delay each (not 0, and gently
// offset from each other) so they don't feel completely disconnected from
// the edge-to-center wave the surrounding dots/arcs/branches use.
const SPINE_DELAY_S = 0.1;
const RAIL_DELAY_S = 0.25;

function edgeToCenterDelay(x: number) {
  const distanceFromCenter = Math.min(Math.abs(x - CENTER_X), CENTER_X);
  return (1 - distanceFromCenter / CENTER_X) * CONNECTORS_STAGGER;
}

// BRIDGE_PATH is also a single element (never split), so its own fixed,
// overlap-safe delay is fine as-is — no seam risk there.
const CONNECTOR_CENTER_DELAY_S = 0.45;

// Shared fade-in used by every connector path/node — opacity and delay are
// passed per-element via `custom` since each one has its own target
// opacity and its own place in the edge-to-center sequence.
const traceVariants: Variants = {
  hidden: { opacity: 0 },
  visible: ({ opacity, delay, reduce }: { opacity: number; delay: number; reduce: boolean }) => ({
    opacity,
    transition: reduce ? { duration: 0.01 } : { duration: 1.1, delay, ease: EASE },
  }),
};

// Small technical status indicator shown next to each card's icon —
// a live "system state" read (colored dot + mono label), not a badge.
// Takes prefersReducedMotion as a prop (rather than calling the hook
// itself) so every card doesn't register its own matchMedia listener, and
// is memoized so it never re-renders unless its own props actually change
// — see the note above Trust's markCardComplete for why that matters.
const StatusIndicator = memo(function StatusIndicator({
  label,
  prefersReducedMotion,
}: {
  label: string;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {!prefersReducedMotion && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
      </span>
      {label}
    </div>
  );
});

// `visible` gates the whole reveal: false renders every trace at opacity 0
// (still laid out, just invisible) so nothing pops in until the caller
// flips it — which Trust does only once every card has fully finished its
// own boot-up sequence. Memoized: this renders ~40 SVG elements, and
// `visible`/`prefersReducedMotion` only ever change once or twice each —
// without memo, it would re-render (and rebuild all of them) on every
// unrelated state change in Trust while the cards are booting up.
const CircuitConnectors = memo(function CircuitConnectors({
  visible,
  prefersReducedMotion,
}: {
  visible: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const anim = visible ? "visible" : "hidden";

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
    >
      <motion.path
        d={RAIL_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        variants={traceVariants}
        initial="hidden"
        animate={anim}
        custom={{ opacity: 0.4, delay: RAIL_DELAY_S, reduce: prefersReducedMotion }}
      />
      <motion.path
        d={ARC_LEFT}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        variants={traceVariants}
        initial="hidden"
        animate={anim}
        custom={{ opacity: 0.45, delay: edgeToCenterDelay(150), reduce: prefersReducedMotion }}
      />
      <motion.path
        d={ARC_RIGHT}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        variants={traceVariants}
        initial="hidden"
        animate={anim}
        custom={{ opacity: 0.45, delay: edgeToCenterDelay(1050), reduce: prefersReducedMotion }}
      />
      <motion.path
        d={SPINE_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        variants={traceVariants}
        initial="hidden"
        animate={anim}
        custom={{ opacity: 0.6, delay: SPINE_DELAY_S, reduce: prefersReducedMotion }}
      />
      <motion.path
        d={BRIDGE_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        variants={traceVariants}
        initial="hidden"
        animate={anim}
        custom={{ opacity: 0.55, delay: CONNECTOR_CENTER_DELAY_S, reduce: prefersReducedMotion }}
      />
      {branches.map((b) => (
        <motion.path
          key={b.d}
          d={b.d}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          variants={traceVariants}
          initial="hidden"
          animate={anim}
          custom={{ opacity: 0.6, delay: edgeToCenterDelay(b.node.cx), reduce: prefersReducedMotion }}
        />
      ))}
      {sideLinks.map((s) => (
        <motion.path
          key={s.d}
          d={s.d}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          variants={traceVariants}
          initial="hidden"
          animate={anim}
          custom={{ opacity: 0.55, delay: edgeToCenterDelay(s.node.cx), reduce: prefersReducedMotion }}
        />
      ))}
      {stubs.map((s) => (
        <motion.path
          key={s.d}
          d={s.d}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          variants={traceVariants}
          initial="hidden"
          animate={anim}
          custom={{ opacity: 0.4, delay: edgeToCenterDelay(s.node.cx), reduce: prefersReducedMotion }}
        />
      ))}

      {junctions.map((j) => (
        <motion.circle
          key={`${j.cx}-${j.cy}`}
          cx={j.cx}
          cy={j.cy}
          r="3"
          fill="var(--primary)"
          variants={traceVariants}
          initial="hidden"
          animate={anim}
          custom={{ opacity: 0.7, delay: edgeToCenterDelay(j.cx), reduce: prefersReducedMotion }}
        />
      ))}
      {branches.map((b) => (
        <g key={`${b.node.cx}-${b.node.cy}`}>
          <motion.circle
            cx={b.node.cx}
            cy={b.node.cy}
            r="7"
            fill="none"
            stroke="var(--primary)"
            variants={traceVariants}
            initial="hidden"
            animate={anim}
            custom={{ opacity: 0.4, delay: edgeToCenterDelay(b.node.cx), reduce: prefersReducedMotion }}
          />
          <motion.circle
            cx={b.node.cx}
            cy={b.node.cy}
            r="3.5"
            fill="var(--primary)"
            variants={traceVariants}
            initial="hidden"
            animate={anim}
            custom={{ opacity: 0.8, delay: edgeToCenterDelay(b.node.cx), reduce: prefersReducedMotion }}
          />
        </g>
      ))}
      {sideLinks.map((s) => (
        <motion.circle
          key={`${s.node.cx}-${s.node.cy}`}
          cx={s.node.cx}
          cy={s.node.cy}
          r="3"
          fill="var(--primary)"
          variants={traceVariants}
          initial="hidden"
          animate={anim}
          custom={{ opacity: 0.7, delay: edgeToCenterDelay(s.node.cx), reduce: prefersReducedMotion }}
        />
      ))}
      {stubs.map((s) => (
        <motion.circle
          key={`${s.node.cx}-${s.node.cy}`}
          cx={s.node.cx}
          cy={s.node.cy}
          r="2.25"
          fill="var(--primary)"
          variants={traceVariants}
          initial="hidden"
          animate={anim}
          custom={{ opacity: 0.55, delay: edgeToCenterDelay(s.node.cx), reduce: prefersReducedMotion }}
        />
      ))}
      {flowMarkers.map((m) => (
        <motion.circle
          key={`${m.cx}-${m.cy}`}
          cx={m.cx}
          cy={m.cy}
          r="2"
          fill="var(--primary)"
          variants={traceVariants}
          initial="hidden"
          animate={anim}
          custom={{ opacity: 0.45, delay: edgeToCenterDelay(m.cx), reduce: prefersReducedMotion }}
        />
      ))}

      {visible &&
        !prefersReducedMotion &&
        pulses.map((p, i) => (
          <circle key={`${p.path}-${p.delay}-${i}`} r={p.r} fill="var(--primary)" opacity="0">
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
});

// Pacing for the whole "system booting up, module by module" sequence.
// Deliberately unhurried — this reads as a system reporting its own
// status, not a page trying to load quickly.
const ICON_FADE_MS = 150; // icon + status dot fade-in
const CARD_STAGGER_MS = 200; // fixed delay before each card starts — independent of how long the previous one takes to finish typing, so the row doesn't feel like it's waiting on itself
const TITLE_TO_CARDS_DELAY_MS = 100; // pause after the section title reveals before card 1 begins

// hidden -> visible fade/rise for the card shell itself. No per-index
// delay here anymore — pacing between cards is driven by the fixed
// CARD_STAGGER_MS timers in Trust below, not this variant. Linear easing
// on purpose: opacity and y move together at one constant speed, so the
// rise reads as a single continuous motion rather than a fast-then-slow
// ease that can look like it "settles" in two steps.
const CARD_ENTRANCE_DELAY_S = 0.1;
const CARD_ENTRANCE_DURATION_S = 0.9;
// Total time (ms) from shouldStart flipping true to the shell being fully
// visible — used below to time the icon/text reveal off a plain timer
// instead of Framer's onAnimationComplete, which proved unreliable here.
const CARD_ENTRANCE_MS = (CARD_ENTRANCE_DELAY_S + CARD_ENTRANCE_DURATION_S) * 1000;
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: ({ reduce }: { reduce: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: reduce ? { duration: 0.01 } : { duration: CARD_ENTRANCE_DURATION_S, delay: CARD_ENTRANCE_DELAY_S, ease: "linear" },
  }),
};

function TrustCard({
  index,
  title,
  description,
  detail,
  status,
  Icon,
  shouldStart,
  prefersReducedMotion,
  onCardComplete,
  offsetClass,
}: {
  index: number;
  title: string;
  description: string;
  detail: string;
  status: string;
  Icon: (typeof trustIcons)[number];
  shouldStart: boolean;
  prefersReducedMotion: boolean | null;
  onCardComplete: (index: number) => void;
  offsetClass: string;
}) {
  const [iconVisible, setIconVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const startedRef = useRef(false);

  // Timer-driven, not gesture/animation-completion-driven — see the note
  // on CARD_ENTRANCE_MS above for why onAnimationComplete isn't safe here.
  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;
    const entranceMs = prefersReducedMotion ? 0 : CARD_ENTRANCE_MS;
    const toIcon = entranceMs;
    const toText = toIcon + (prefersReducedMotion ? 0 : ICON_FADE_MS + 150);
    const toComplete = toText + (prefersReducedMotion ? 0 : 450);
    const t1 = setTimeout(() => setIconVisible(true), toIcon);
    const t2 = setTimeout(() => setTextVisible(true), toText);
    const t3 = setTimeout(() => onCardComplete(index), toComplete);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldStart, prefersReducedMotion]);

  return (
    <motion.div
      variants={cardVariants}
      custom={{ reduce: prefersReducedMotion }}
      initial="hidden"
      animate={shouldStart ? "visible" : "hidden"}
      className={`relative z-10 ${offsetClass}`}
    >
      {/* Hover lives on this inner, non-framer-controlled element. The
          outer motion.div above owns `transform` for the entrance
          animation (opacity/y via variants); if the hover translate lived
          on that same element, framer-motion's inline transform style
          would fight the CSS hover class for the same property and the
          movement would look janky/inconsistent. Keeping them on separate
          elements lets each animation system own its own `transform`. */}
      <div className="group rounded-2xl glass-panel p-6 transition-[border-color,box-shadow] duration-300 ease-out hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]">
        <div className="flex items-center gap-3">
          <div
            className={`transition-opacity duration-[450ms] ${iconVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <div className={`transition-opacity duration-[450ms] ${iconVisible ? "opacity-100" : "opacity-0"}`}>
            <StatusIndicator label={status} prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>
        <div className={`transition-opacity duration-[450ms] ${textVisible ? "opacity-100" : "opacity-0"}`}>
          <h3 className="mt-4 text-base font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <p className="mt-3 text-xs text-muted-foreground/70">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}
const MemoTrustCard = memo(TrustCard);

export function Trust() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Each card starts on its own fixed timer (CARD_STAGGER_MS apart) once
  // the row is ready — independent of how long the previous card's own
  // reveal (icon/status, then text) takes to finish.
  const [startedCards, setStartedCards] = useState<boolean[]>(() => trustIcons.map(() => false));
  // Separately, how many cards have fully finished their own sequence
  // (shell -> icon/status -> text faded in) — tracked only to know when
  // the connectors should light up, not to gate the next
  // card's start.
  const completedRef = useRef<Set<number>>(new Set());
  const [completedCount, setCompletedCount] = useState(0);
  // useCallback with a stable identity (no deps — uses a ref + functional
  // setState) so it can be passed to the memoized MemoTrustCard without
  // defeating the memo: a freshly-created arrow function every render
  // would make React treat the prop as "changed" every time regardless.
  const markCardComplete = useCallback((index: number) => {
    if (completedRef.current.has(index)) return;
    completedRef.current.add(index);
    setCompletedCount((c) => c + 1);
  }, []);

  // A short pause after the title finishes revealing before card 1 begins.
  const [cardsReady, setCardsReady] = useState(false);
  useEffect(() => {
    if (!sectionInView) return;
    const id = setTimeout(() => setCardsReady(true), prefersReducedMotion ? 0 : TITLE_TO_CARDS_DELAY_MS);
    return () => clearTimeout(id);
  }, [sectionInView, prefersReducedMotion]);

  useEffect(() => {
    if (!cardsReady) return;
    const timers = trustIcons.map((_, i) =>
      setTimeout(
        () =>
          setStartedCards((prev) => {
            if (prev[i]) return prev;
            const next = [...prev];
            next[i] = true;
            return next;
          }),
        prefersReducedMotion ? 0 : i * CARD_STAGGER_MS,
      ),
    );
    return () => timers.forEach(clearTimeout);
  }, [cardsReady, prefersReducedMotion]);

  // The connectors only start lighting up once every card has fully
  // finished its own boot-up sequence — a closing flourish once the whole
  // row is settled, rather than something racing the cards for attention.
  const connectionsVisible = completedCount >= trustIcons.length;

  return (
    <section className="border-y border-border/60 bg-surface">
      <div ref={sectionRef} className="mx-auto max-w-[1320px] px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl text-center text-2xl font-display font-semibold tracking-tight text-foreground md:text-3xl"
        >
          {t.trust.title}
        </motion.h2>

        {/* Mobile / tablet (< lg): unchanged plain grid. */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {t.trust.items.map((trustItem, index) => {
            const Icon = trustIcons[index];
            return (
              <div
                key={trustItem.title}
                className="group rounded-2xl border border-border bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <StatusIndicator label={cardStatus[index]} prefersReducedMotion={prefersReducedMotion} />
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
            in CircuitConnectors above. Title reveals first; then cards
            cascade in left to right on a fixed stagger (CARD_STAGGER_MS
            apart) — each card's shell fades in, then its icon/status, then
            its text block, all plain opacity fades, independent of the
            next card's own timer. Once every card has finished, the
            connectors fade in edge-to-center (see `edgeToCenterDelay`
            above) as a closing flourish. */}
        <div className="relative mt-16 hidden lg:grid lg:grid-cols-4 lg:items-start lg:gap-6 lg:pb-10">
          <CircuitConnectors visible={connectionsVisible} prefersReducedMotion={prefersReducedMotion} />
          {t.trust.items.map((trustItem, index) => (
            <MemoTrustCard
              key={trustItem.title}
              index={index}
              title={trustItem.title}
              description={trustItem.description}
              detail={trustItem.detail}
              status={cardStatus[index]}
              Icon={trustIcons[index]}
              shouldStart={startedCards[index]}
              prefersReducedMotion={prefersReducedMotion}
              onCardComplete={markCardComplete}
              offsetClass={cardOffset[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}