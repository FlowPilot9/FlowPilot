import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getTranslation, type Locale, type TranslationDictionary } from "./index";

interface I18nContextValue {
  locale: Locale;
  t: TranslationDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Controlled by the current route (see routes/{-$locale}.tsx). The locale is
 * driven entirely by the URL now, so there's no internal state or
 * localStorage here — switching language means navigating to a different
 * URL, which naturally re-renders this provider with a new `locale` prop.
 */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nContextValue>(() => ({ locale, t: getTranslation(locale) }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
