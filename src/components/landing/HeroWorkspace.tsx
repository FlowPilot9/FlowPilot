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
            i === 0 ? "bg-primary/15 text-primary" : "text-white/45"
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
    <div className="scene-layer-wireframe absolute inset-0 flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-[3px] border border-dashed border-white/25" />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-4 w-10 rounded-md border border-dashed border-white/20" />
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 rounded-xl border border-dashed border-white/20 p-4">
        <span className="h-3 w-2/5 rounded border border-dashed border-white/25" />
        <span className="h-2 w-3/5 rounded border border-dashed border-white/15" />
        <span className="mt-2 h-6 w-20 rounded-md border border-dashed border-white/20" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <span className="h-14 rounded-lg border border-dashed border-white/15" />
        <span className="h-14 rounded-lg border border-dashed border-white/15" />
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
      {/* Pinned header — stays put while the content below scrolls, the
          way a real site's nav would. */}
      <div className="shrink-0 px-5 pb-3 pt-5">
        <NavPills items={navItems} />
      </div>

      <div className="relative flex-1 overflow-hidden px-5 pb-5">
        <div className={`flex flex-col gap-3 ${animated ? "scene-scroll" : ""}`}>
          <div className="flex flex-col justify-center gap-2 rounded-xl bg-primary/10 p-4">
            <span className="text-[13px] font-semibold leading-snug text-white">{heading}</span>
            <span className="h-1.5 w-3/5 rounded-full bg-white/20" />
            <span className="mt-1.5 inline-flex w-fit items-center rounded-md bg-primary px-2.5 py-1 text-[9px] font-medium text-primary-foreground">
              {cta}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                <span className="mb-2 block h-5 w-5 rounded bg-primary/25" />
                <span className="block h-1.5 w-3/5 rounded-full bg-white/20" />
                <span className="mt-1.5 block h-1.5 w-2/5 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
          {/* Below-the-fold content — only visible once the scene scrolls
              down, which is the whole point: it gives the scroll something
              real to reveal instead of just moving for its own sake. */}
          <div className="grid grid-cols-2 gap-3">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                <span className="mb-2 block h-5 w-5 rounded bg-primary/25" />
                <span className="block h-1.5 w-2/5 rounded-full bg-white/20" />
                <span className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-primary/10 p-3">
            <span className="h-1.5 w-2/5 rounded-full bg-white/25" />
            <span className="h-5 w-14 shrink-0 rounded-md bg-primary" />
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
    <div className="relative h-[300px]">
      <ColoredLayer navItems={navItems} heading={heading} cta={cta} animated={false} />
      <div className="absolute inset-x-0 bottom-3 flex flex-wrap justify-center gap-1.5 px-4">
        {badges.map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur"
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

  return (
    <div className="relative mx-auto w-full max-w-[540px] [perspective:1600px]">
      <div
        ref={frameRef}
        className="glass-panel-dark relative overflow-hidden rounded-2xl transition-transform duration-200 ease-out"
        style={
          prefersReducedMotion
            ? undefined
            : {
                transform: `rotateX(${(-tilt.y * MAX_TILT_DEG).toFixed(2)}deg) rotateY(${(
                  tilt.x * MAX_TILT_DEG
                ).toFixed(2)}deg)`,
              }
        }
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-white/15" />
          <span className="ml-2 truncate rounded-md bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/50">
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
          <div className="relative h-[300px] overflow-hidden bg-background">
            <WireframeLayer />
            <ColoredLayer navItems={ws.navItems} heading={ws.heroHeading} cta={ws.heroCta} />

            <div className="absolute inset-x-0 bottom-3 flex flex-wrap justify-center gap-1.5 px-4">
              {ws.badges.map((label, i) => (
                <span
                  key={label}
                  className={`${badgeAnimations[i]} rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-medium text-white/80 backdrop-blur`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
