export function About() {
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
