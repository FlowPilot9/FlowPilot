export function Trust() {
  const stats = [
    { value: "120+", label: "Projects Delivered" },
    { value: "60+", label: "Happy Clients" },
    { value: "98/100", label: "Performance Score" },
    { value: "< 2h", label: "Support Response" },
  ];
  return (
    <section className="border-y border-border/60 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
          We help businesses build their online presence with{" "}
          <span className="text-foreground">fast, modern and scalable</span> websites.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background px-6 py-8 text-center">
              <div className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
