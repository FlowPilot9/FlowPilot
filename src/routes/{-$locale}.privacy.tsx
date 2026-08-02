import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { buildHrefLangLinks, getTranslation, localePath, resolveLocale } from "@/i18n";

export const Route = createFileRoute("/{-$locale}/privacy")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const t = getTranslation(locale);

    return {
      meta: [
        { title: t.privacy.metaTitle },
        { name: "description", content: t.privacy.metaDescription },
      ],
      links: buildHrefLangLinks("/privacy"),
    };
  },
  component: PrivacyPage,
});

function PrivacyPage() {
  const params = Route.useParams();
  const locale = resolveLocale(params.locale);
  const t = getTranslation(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="mx-auto max-w-3xl px-4 py-24 md:py-32">
        <a
          href={localePath(locale, "/")}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {t.privacy.backHome}
        </a>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t.privacy.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.privacy.lastUpdated}</p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{t.privacy.intro}</p>
        <div className="mt-10 space-y-8">
          {t.privacy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}