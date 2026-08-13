import { useTranslation } from "@/i18n/I18nProvider";

// Deliberately left-aligned and split into two columns, unlike every other
// section (SectionHeader centers everything into a narrow single column).
// This section is a personal statement from the team, not a
// marketing headline — a cramped, centered block read as corporate; a wide
// editorial split (headline + team on the left, story on the right)
// uses the page's actual width and reads more like a studio's "about" page.
export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {t.about.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.15]">
              {t.about.title}
            </h2>

            {/* Team lives under the headline, not aligned into the same
                grid as the story column — a single vertical column with
                identical, evenly-spaced treatment for every member so no
                one reads as more prominent than the others. */}
            <div className="mt-12">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.about.foundersLabel}
              </span>
              <div className="mt-5 space-y-5">
                {t.about.founders.map((founder) => (
                  <div key={founder.name} className="group flex items-start gap-4">
                    <span
                      aria-hidden
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-sm font-semibold text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-105"
                    >
                      {founder.initials}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="font-semibold text-foreground">{founder.name}</div>
                      <div className="text-sm text-muted-foreground">{founder.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
            </div>

            {/* Differentiators as plain statements, not icon cards — a
                repeated card grid here would reintroduce the generic-agency
                feeling the brief asks to avoid. */}
            <ul className="mt-8 space-y-2.5">
              {t.about.differentiators.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm text-foreground/90 md:text-base"
                >
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-border pt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              <span className="font-semibold text-foreground">{t.about.today}</span>{" "}
              {t.about.todayText}{" "}
              <span className="font-semibold text-foreground">{t.about.tomorrow}</span>{" "}
              {t.about.tomorrowText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
