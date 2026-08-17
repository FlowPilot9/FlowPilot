import { useRouterState } from "@tanstack/react-router";
import { LOCALE_LABELS, LOCALES, localePath, stripLocalePrefix, type Locale } from "@/i18n";
import { useTranslation } from "@/i18n/I18nProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale } = useTranslation();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const basePath = stripLocalePrefix(pathname);

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-border bg-background/80 p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((code) => {
        const active = locale === code;

        return (
          // Plain <a> on purpose: switching language is a real navigation to a
          // distinct, crawlable URL (/ or /en), not a client-side state flip —
          // that's what makes both language versions indexable by search engines.
          <a
            key={code}
            href={localePath(code as Locale, basePath)}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold tracking-wide transition-colors ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {LOCALE_LABELS[code]}
          </a>
        );
      })}
    </div>
  );
}
