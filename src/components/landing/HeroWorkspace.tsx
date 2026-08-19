import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTranslation } from "@/i18n/I18nProvider";

// ---------------------------------------------------------------------------
// The Hero's signature moment: a live "digital workspace" that builds a
// website in front of the visitor rather than showing a static screenshot.
//
// Timeline (one 12s loop, driven entirely by CSS — see the scene-* keyframes
// in styles.css so every layer stays phase-locked with zero JS timers):
//   0.0s–0.7s   wireframe skeleton visible
//   0.7s–1.7s   crossfades into the finished, colored preview
//   1.7s–5.3s   finished preview holds (the "final website" beat)
//   5.3s–6.0s   the page scrolls down to reveal more content below the fold
//   6.0s–9.4s   scrolled state holds; four proof badges appear in sequence
//   9.4s–10.1s  scrolls back up to the top
//  10.1s–12.0s  a beat, then crossfades back to the wireframe — loop closes
//
// With prefers-reduced-motion, none of the above renders: a single static
// finished preview is shown instead, satisfying "show the final product
// state, remove loops" directly rather than relying on the loop landing
// there by chance.
// ---------------------------------------------------------------------------

const MAX_TILT_DEG = 3.5;

// The panel is authored at one fixed "design" size (matches the old
// max-w-[600px] frame + 48px header + 360px scene). At any container width
// we scale this whole rigid box down/up with a single CSS transform driven
// by container query units instead of letting it reflow — that's what keeps
// every padding/gap/font-size inside proportionally correct on a narrow tab
// or a phone, rather than the browser squashing/wrapping the content.
const WORKSPACE_DESIGN_WIDTH = 600;
const WORKSPACE_HEADER_HEIGHT = 48;
const WORKSPACE_SCENE_HEIGHT = 360;
const WORKSPACE_DESIGN_HEIGHT = WORKSPACE_HEADER_HEIGHT + WORKSPACE_SCENE_HEIGHT;

function useSubtleTilt(reduceMotion: boolean) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ticking = useRef(false);
  const latest = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion) return;
    const node = frameRef.current;
    if (!node) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      latest.current = { x: px, y: py };
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setTilt({ x: latest.current.x, y: latest.current.y });
          ticking.current = false;
        });
      }
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  return { frameRef, tilt };
}

function NavPills({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 shrink-0 rounded-[3px] bg-primary" />
      {items.map((label, i) => (
        <span
          key={label}
          className={`truncate rounded-md px-2 py-1 text-[9px] font-medium ${
            i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function WireframeLayer() {
  return (
    <div className="scene-layer-wireframe absolute inset-0 flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <span className="h-4 w-20 rounded border border-dashed border-foreground/20" />
        <div className="flex gap-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-3 w-12 rounded border border-dashed border-foreground/15" />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 rounded-xl border border-dashed border-foreground/15 p-6">
        <span className="h-4 w-1/2 rounded border border-dashed border-foreground/20" />
        <span className="h-3 w-3/4 rounded border border-dashed border-foreground/15" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-20 rounded-lg border border-dashed border-foreground/12" />
        ))}
      </div>
    </div>
  );
}

function ColoredLayer({
  navItems,
  heading,
  cta,
  animated = true,
}: {
  navItems: string[];
  heading: string;
  cta: string;
  animated?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col ${animated ? "scene-layer-colored" : "opacity-100"}`}
    >
      <div
        className={`flex shrink-0 justify-between items-center px-6 py-4 ${animated ? "scene-nav-reveal" : ""}`}
      >
        <span className="text-sm font-bold text-foreground">FlowPilot</span>
        <div className="flex gap-4">
          {navItems.map((item) => (
            <span key={item} className="text-[10px] font-medium text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden px-6 pb-6">
        <div className={`flex flex-col gap-6 ${animated ? "scene-scroll" : ""}`}>
          <div className={`${animated ? "scene-content-reveal" : ""}`}>
            <div className="flex flex-col justify-center gap-2 rounded-xl bg-secondary/50 p-6 border border-border/50">
              <span className="text-sm font-semibold leading-tight text-foreground">{heading}</span>
              <span className="text-[10px] text-muted-foreground leading-relaxed w-5/6">
                Modern digital infrastructure built for scale and performance.
              </span>
              <span className="mt-2 inline-flex w-fit items-center rounded-md bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground shadow-sm">
                {cta}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { title: "Responsive", desc: "Adaptive design" },
                { title: "SEO Ready", desc: "Optimized architecture" },
              ].map((feature, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                  <span className="mb-2 block text-xs font-semibold text-foreground">
                    {feature.title}
                  </span>
                  <span className="block text-[10px] text-muted-foreground">{feature.desc}</span>
                </div>
              ))}
            </div>

            {/* Below-the-fold content: Client Spotlight */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm mt-6">
              <span className="mb-4 block text-xs font-semibold text-foreground">
                Client Spotlight
              </span>
              <span className="text-[10px] text-muted-foreground leading-relaxed italic">
                "FlowPilot transformed our online presence into a high-converting asset."
              </span>
              <span className="mt-3 block text-[9px] font-bold text-foreground">
                — Business Lead
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticFinishedScene({
  navItems,
  heading,
  cta,
  badges,
}: {
  navItems: string[];
  heading: string;
  cta: string;
  badges: string[];
}) {
  return (
    <div className="relative h-[360px]">
      <ColoredLayer navItems={navItems} heading={heading} cta={cta} animated={false} />
      <div className="absolute inset-x-0 bottom-3 flex flex-wrap justify-center gap-1.5 px-4">
        {badges.map((label) => (
          <span
            key={label}
            className="rounded-full border border-border bg-foreground/[0.05] px-2.5 py-1 text-[10px] font-medium text-foreground/80 backdrop-blur"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroWorkspace() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const { frameRef, tilt } = useSubtleTilt(!!prefersReducedMotion);
  const ws = t.hero.workspace;
  const badgeAnimations = ["scene-badge-1", "scene-badge-2", "scene-badge-3", "scene-badge-4"];

  const tiltX = prefersReducedMotion ? 0 : -tilt.y * MAX_TILT_DEG;
  const tiltY = prefersReducedMotion ? 0 : tilt.x * MAX_TILT_DEG;

  return (
    <div className="relative ml-auto w-full max-w-[600px] [container-type:inline-size] [perspective:1600px]">
      {/* Ambient glow behind the product window — present in both themes,
          but doing more visible work in light mode, where there's no
          illustrated atmosphere of its own to lend the panel separation
          from the background the way the night-ocean glow does in dark. */}
      <div aria-hidden className="workspace-glow absolute -inset-12 -z-10" />

      {/* "Stage": reserves the correctly-scaled height in normal page flow.
          Its aspect-ratio mirrors the panel's true (unscaled) proportions,
          so as the stage's width tracks the container (100% — shrinking on
          a narrow tab or a phone), its height follows automatically in the
          same proportion, with zero JS/layout measurement needed. */}
      <div
        className="relative w-full"
        style={{ aspectRatio: `${WORKSPACE_DESIGN_WIDTH} / ${WORKSPACE_DESIGN_HEIGHT}` }}
      >
        <div
          ref={frameRef}
          className="glass-panel-elevated absolute left-0 top-0 origin-top-left overflow-hidden rounded-2xl transition-transform duration-200 ease-out"
          style={{
            width: WORKSPACE_DESIGN_WIDTH,
            height: WORKSPACE_DESIGN_HEIGHT,
            // Scaled as one rigid unit (never reflowed): 100cqw is the
            // stage's actual current width, so this ratio is exactly
            // "how much smaller than the 600px design the box currently
            // is" — every padding/gap/font-size inside stays in the same
            // proportion to each other at any size, phone included. The
            // mouse tilt rides along on the same transform.
            transform: `scale(calc(100cqw / ${WORKSPACE_DESIGN_WIDTH}px)) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`,
          }}
        >
          <div
            className="flex items-center gap-2 border-b border-border px-4"
            style={{ height: WORKSPACE_HEADER_HEIGHT }}
          >
            {/* Brand-styled browser dots — always visible: unlike the rest of
                the scene these never fade out at the end of the loop. Colors
                stay within the theme's own palette in each mode (gold/cream
                in light, blue in dark for the night-ocean feel) rather than a
                fixed blue that only worked in dark mode. */}
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" /> {/* Gold accent */}
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent dark:bg-blue-400" />{" "}
              {/* Cream-gold in light, blue in dark */}
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-muted-foreground/30" />{" "}
              {/* Neutral gray */}
            </div>
            <span className="ml-3 truncate rounded-md bg-foreground/[0.05] px-2.5 py-0.5 text-[11px] text-muted-foreground">
              {ws.browserLabel}
            </span>
          </div>

          {prefersReducedMotion ? (
            <StaticFinishedScene
              navItems={ws.navItems}
              heading={ws.heroHeading}
              cta={ws.heroCta}
              badges={ws.badges}
            />
          ) : (
            <div
              className="relative overflow-hidden bg-background"
              style={{ height: WORKSPACE_SCENE_HEIGHT }}
            >
              <WireframeLayer />
              <ColoredLayer navItems={ws.navItems} heading={ws.heroHeading} cta={ws.heroCta} />

              <div className="absolute inset-x-0 bottom-3 flex flex-wrap justify-center gap-1.5 px-4">
                {ws.badges.map((label, i) => (
                  <span
                    key={label}
                    className={`${badgeAnimations[i]} rounded-full border border-border bg-foreground/[0.05] px-2.5 py-1 text-[10px] font-medium text-foreground/80 backdrop-blur`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}