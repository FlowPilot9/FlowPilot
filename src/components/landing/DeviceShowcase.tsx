// ---------------------------------------------------------------------------
// DeviceShowcase — the Hero's product moment, restyled as a premium
// laptop + phone product shot (Apple/agency-style) instead of a single
// animated browser window.
//
// The physical device chassis (bezels, hinge, notch) is intentionally a
// fixed neutral dark tone in both themes — real laptops and phones don't
// change color with a website's theme, only the "screen content" does.
// The on-screen UI itself uses the site's semantic tokens (bg-card,
// text-foreground, --gradient-primary, ...) so it always mirrors whatever
// theme the rest of the page is currently in.
//
// Purely static composition (no loops, no fake data-entry animation) — the
// only motion applied to it lives in Hero.tsx's one-shot entrance.
// ---------------------------------------------------------------------------

function BrandMark() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-[2px]" style={{ background: "var(--gradient-primary)" }} />
      <span className="text-[9px] font-bold tracking-tight text-foreground">FlowPilot</span>
    </div>
  );
}

/** Shared "site preview" UI shown on both screens — abstracted into bars and
 *  cards (no lorem ipsum) so it reads as a real, finished design at any
 *  size, not a placeholder wireframe. `compact` trims it to a single column
 *  for the phone screen. */
function SitePreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Nav */}
      <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-3">
        <BrandMark />
        {!compact ? (
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-8 rounded-full bg-muted-foreground/25" />
            <span className="h-1.5 w-8 rounded-full bg-muted-foreground/25" />
            <span className="h-1.5 w-8 rounded-full bg-muted-foreground/25" />
            <span className="ml-1 h-4 w-14 rounded-md bg-primary" />
          </div>
        ) : (
          <div className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-3.5 rounded-full bg-muted-foreground/40" />
            <span className="h-[2px] w-3.5 rounded-full bg-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Hero block */}
      <div className={`flex flex-col gap-2 px-4 ${compact ? "pt-4" : "pt-6"}`}>
        <span
          className={`rounded-full bg-foreground/90 ${compact ? "h-[6px] w-2/3" : "h-2.5 w-3/5"}`}
        />
        <span
          className={`rounded-full bg-muted-foreground/30 ${compact ? "h-[4px] w-1/2" : "h-1.5 w-2/5"}`}
        />
        <span
          className={`mt-1 w-fit rounded-md ${compact ? "h-3.5 w-10" : "h-5 w-16"}`}
          style={{ background: "var(--gradient-primary)" }}
        />

        {/* Hero visual block */}
        <div
          className={`relative mt-3 overflow-hidden rounded-lg border border-border/50 ${
            compact ? "h-12" : "h-20"
          }`}
          style={{ background: "var(--gradient-primary)", opacity: 0.85 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10" />
        </div>
      </div>

      {/* Cards */}
      <div className={`grid gap-2 px-4 ${compact ? "mt-3 grid-cols-1" : "mt-5 grid-cols-3"}`}>
        {(compact ? [0] : [0, 1, 2]).map((i) => (
          <div
            key={i}
            className="rounded-md border border-border/60 bg-card px-2.5 py-2 shadow-sm"
          >
            <span className="mb-1.5 block h-2 w-2 rounded-[3px] bg-primary/80" />
            <span className="block h-[5px] w-4/5 rounded-full bg-foreground/70" />
            <span className="mt-1 block h-[4px] w-3/5 rounded-full bg-muted-foreground/25" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenGlass() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent"
    />
  );
}

function Laptop() {
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      {/* Lid + screen */}
      <div className="relative rounded-[14px] bg-zinc-800 p-[10px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.55)] ring-1 ring-black/10 dark:ring-white/10">
        <span className="absolute left-1/2 top-[3px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-zinc-600" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-background">
          <SitePreview />
          <ScreenGlass />
        </div>
      </div>
      {/* Base / keyboard deck */}
      <div className="relative mx-auto h-[14px] w-[104%] rounded-b-[10px] bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-[0_18px_30px_-15px_rgba(0,0,0,0.45)] dark:from-zinc-600 dark:to-zinc-700">
        <span className="absolute left-1/2 top-0 h-[4px] w-16 -translate-x-1/2 rounded-b-md bg-zinc-400/70 dark:bg-zinc-800/70" />
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="w-[124px] rotate-[6deg] sm:w-[142px] md:w-[158px]">
      <div className="relative rounded-[26px] bg-zinc-800 p-[6px] shadow-[0_25px_50px_-18px_rgba(0,0,0,0.55)] ring-1 ring-black/10 dark:ring-white/10">
        <span className="absolute left-1/2 top-[8px] z-10 h-[10px] w-[38px] -translate-x-1/2 rounded-full bg-zinc-900" />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[20px] bg-background">
          <SitePreview compact />
          <ScreenGlass />
        </div>
      </div>
    </div>
  );
}

export function DeviceShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      {/* Ambient lift off the background — same glow utility the old
          workspace panel used, so the composition still floats above the
          section in both themes. */}
      <div aria-hidden className="workspace-glow absolute -inset-16 -z-10" />

      <Laptop />

      {/* Phone sits tucked into the laptop's lower-right corner, slightly
          forward, the way product shots stagger a secondary device. */}
      <div className="absolute -bottom-8 -right-2 sm:-right-4 md:-right-6">
        <Phone />
      </div>

      {/* Soft contact shadow grounding the whole composition. */}
      <div
        aria-hidden
        className="absolute -bottom-6 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/20 blur-2xl dark:bg-black/40"
      />
    </div>
  );
}
