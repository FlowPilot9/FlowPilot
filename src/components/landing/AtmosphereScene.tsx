import type { CSSProperties } from "react";
// ---------------------------------------------------------------------------
// The Hero's atmosphere: one abstract scene, two moments of the same day.
//
// Every layer below exists twice — a light/sunrise version and a dark/night
// version — stacked on top of each other and cross-faded purely with the
// Tailwind `dark:` variant + `transition-opacity`. This is deliberate:
// animating between two raw oklch values on a single element isn't reliably
// smooth across browsers (custom properties don't interpolate without an
// explicit `@property` type registration), whereas opacity always is, and
// it's GPU-cheap (design system §7.1). No JS drives this cross-fade at
// all — toggling the `dark` class on <html> is the entire mechanism.
//
// Nothing here is a literal illustration (no drawn sun/moon disc, no wave
// shapes) — every element is a soft gradient or a scattering of dots, per
// the brief's "abstract, premium, technology-focused" direction.
// ---------------------------------------------------------------------------

const STAR_POSITIONS = [
  { top: "12%", left: "18%", size: 2, delay: 0 },
  { top: "22%", left: "62%", size: 1.5, delay: 0.6 },
  { top: "8%", left: "46%", size: 1.5, delay: 1.4 },
  { top: "30%", left: "84%", size: 2, delay: 2.1 },
  { top: "18%", left: "8%", size: 1.5, delay: 0.9 },
  { top: "5%", left: "72%", size: 1.5, delay: 1.8 },
  { top: "34%", left: "30%", size: 1.5, delay: 2.6 },
  { top: "25%", left: "94%", size: 1.5, delay: 0.3 },
  { top: "14%", left: "38%", size: 1, delay: 1.1 },
  { top: "28%", left: "52%", size: 1, delay: 1.9 },
] as const;

const REFLECTION_LINES = [
  { bottom: "18%", width: "38%", left: "12%", delay: 0 },
  { bottom: "12%", width: "26%", left: "40%", delay: 0.8 },
  { bottom: "24%", width: "20%", left: "58%", delay: 1.5 },
] as const;

export function AtmosphereScene() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Sunrise glow — warm, low, near the horizon. Fades out in dark mode. */}
      <div
        className="absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out dark:opacity-0"
        style={{
          background:
            "radial-gradient(55% 40% at 50% 105%, oklch(0.82 0.13 55 / 0.4), transparent), radial-gradient(35% 30% at 68% 90%, oklch(0.86 0.1 30 / 0.25), transparent)",
        }}
      />
      {/* Night glow — cool, pale, higher in the frame (the moon). Fades in. */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity delay-100 duration-[1200ms] ease-in-out dark:opacity-100"
        style={{
          background:
            "radial-gradient(38% 32% at 72% 18%, oklch(0.6 0.05 260 / 0.35), transparent), radial-gradient(50% 40% at 30% 8%, oklch(0.4 0.12 264 / 0.3), transparent)",
        }}
      />

      {/* Horizon band — sunrise: warm gradient rising from the bottom edge. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-100 transition-opacity duration-[1200ms] ease-in-out dark:opacity-0"
        style={{ background: "linear-gradient(180deg, transparent, oklch(0.88 0.08 60 / 0.22))" }}
      />
      {/* Horizon band — night: deep blue rising from the bottom edge. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity delay-100 duration-[1200ms] ease-in-out dark:opacity-100"
        style={{ background: "linear-gradient(180deg, transparent, oklch(0.28 0.07 264 / 0.35))" }}
      />

      {/* Water reflection shimmer — sunrise only. Three soft horizontal
          bands with a slow, staggered opacity drift ("light on water"). */}
      <div className="absolute inset-0 opacity-100 transition-opacity duration-[1200ms] ease-in-out dark:opacity-0">
        {REFLECTION_LINES.map((line, i) => (
          <span
            key={i}
            className="animate-twinkle absolute h-px rounded-full"
            style={
              {
                bottom: line.bottom,
                left: line.left,
                width: line.width,
                background: "linear-gradient(90deg, transparent, oklch(0.9 0.08 55 / 0.5), transparent)",
                animationDelay: `${line.delay}s`,
                "--twinkle-min": 0.15,
                "--twinkle-max": 0.55,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Stars — night only. Static positions, gentle staggered twinkle. */}
      <div className="absolute inset-0 opacity-0 transition-opacity delay-150 duration-[1200ms] ease-in-out dark:opacity-100">
        {STAR_POSITIONS.map((star, i) => (
          <span
            key={i}
            className="animate-twinkle absolute rounded-full bg-white"
            style={
              {
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                "--twinkle-min": 0.2,
                "--twinkle-max": 0.85,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
