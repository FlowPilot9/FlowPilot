import { useEffect } from "react";
import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import { DEFAULT_LOCALE, getTranslation, isLocale, localePath, resolveLocale } from "@/i18n";
import { I18nProvider } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const raw = params.locale;
    // Romanian has no prefix (it lives at "/"). Allowing "/ro" too would give
    // search engines two URLs for the same content, so only "en" is valid here.
    if (raw !== undefined && (raw === DEFAULT_LOCALE || !isLocale(raw))) {
      throw notFound();
    }
  },
  component: LocaleLayout,
  notFoundComponent: LocaleNotFound,
  errorComponent: LocaleError,
});

function LocaleLayout() {
  const { locale } = Route.useParams({ select: (params) => ({ locale: resolveLocale(params.locale) }) });

  return (
    <I18nProvider locale={locale}>
      <Outlet />
    </I18nProvider>
  );
}

// These two render in place of LocaleLayout itself (before I18nProvider ever
// mounts), so they read the dictionary directly instead of via useTranslation().
function LocaleNotFound() {
  const params = Route.useParams();
  const locale = resolveLocale(params.locale);
  const t = getTranslation(locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t.errors.notFoundTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t.errors.notFoundDescription}</p>
        <div className="mt-6">
          <a
            href={localePath(locale, "/")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.errors.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}

function LocaleError({ error }: { error: Error }) {
  console.error(error);
  const params = Route.useParams();
  const locale = resolveLocale(params.locale);
  const t = getTranslation(locale);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_locale_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t.errors.pageErrorTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.errors.pageErrorDescription}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <a
            href="."
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.errors.tryAgain}
          </a>
          <a
            href={localePath(locale, "/")}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t.errors.goHome}
          </a>
        </div>
      </div>
    </div>
  );
}
