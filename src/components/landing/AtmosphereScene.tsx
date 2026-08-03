import type { CSSProperties } from "react";
// ---------------------------------------------------------------------------
// The Hero's atmosphere: a night-ocean glow, dark mode only. Light mode
// carries no color wash — depth there comes from the "Soft Tech Light"
// surface hierarchy (styles.css) and the technical grid (hero-grid), not
// from an illustrated scene. An earlier version mirrored this with a
// sunrise glow for light mode; it read as decorative rather than premium,
// so it's been removed rather than adjusted.
//
// The night layers cross-fade in purely with the Tailwind `dark:` variant +
// `transition-opacity` — animating between two raw oklch values on a single
// element isn't reliably smooth across browsers (custom properties don't
// interpolate without an explicit `@property` type registration), whereas
// opacity always is, and it's GPU-cheap (design system §7.1). No JS drives
// this at all — toggling the `dark` class on <html> is the entire mechanism.
//
// Nothing here is a literal illustration (no drawn moon disc) — every
// element is a soft gradient or a scattering of dots, per the brief's
// "abstract, premium, technology-focused" direction.
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

export function AtmosphereScene() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Night glow — cool, pale, higher in the frame (the moon). Dark mode only. */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-[1200ms] ease-in-out dark:opacity-100"
        style={{
          background:
            "radial-gradient(38% 32% at 72% 18%, oklch(0.6 0.05 260 / 0.35), transparent), radial-gradient(50% 40% at 30% 8%, oklch(0.4 0.12 264 / 0.3), transparent)",
        }}
      />
      {/* Horizon band — night: deep blue rising from the bottom edge. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 transition-opacity delay-100 duration-[1200ms] ease-in-out dark:opacity-100"
        style={{ background: "linear-gradient(180deg, transparent, oklch(0.28 0.07 264 / 0.35))" }}
      />

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
