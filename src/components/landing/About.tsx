import { useTranslation } from "@/i18n/I18nProvider";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {t.about.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[42px] md:leading-[1.1]">
          {t.about.title}
        </h2>
        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{t.about.paragraph1}</p>
          <p>
            <span className="text-foreground">{t.about.today}</span> {t.about.todayText}{" "}
            <span className="text-foreground">{t.about.tomorrow}</span> {t.about.tomorrowText}
          </p>
        </div>
      </div>
    </section>
  );
}
