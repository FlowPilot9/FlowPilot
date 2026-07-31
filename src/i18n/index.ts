import { en } from "./en";
import { ro } from "./ro";
import type { Locale, TranslationDictionary } from "./types";

export const DEFAULT_LOCALE: Locale = "ro";

export const LOCALES: Locale[] = ["ro", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  ro: "RO",
  en: "EN",
};

// TODO: update if the production domain ends up being different.
export const SITE_URL = "https://flowpilot.studio";

export const translations: Record<Locale, TranslationDictionary> = {
  ro,
  en,
};

export function getTranslation(locale: Locale): TranslationDictionary {
  return translations[locale];
}

export function getMetaTags(locale: Locale = DEFAULT_LOCALE) {
  const { meta } = getTranslation(locale);
  return {
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
  };
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

/**
 * Resolves the `{-$locale}` route param into a concrete Locale. Romanian has
 * no URL prefix (it lives at "/"), so an undefined param means Romanian.
 */
export function resolveLocale(param: string | undefined): Locale {
  return param && isLocale(param) ? param : DEFAULT_LOCALE;
}

/**
 * Reads the locale straight from a pathname (used where we don't have route
 * params handy yet, e.g. the root HTML shell's `lang` attribute).
 */
export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : DEFAULT_LOCALE;
}

/**
 * Builds the URL path for `path` in the given locale. Romanian (the default)
 * never gets a prefix, so the same content isn't reachable at two URLs.
 */
export function localePath(locale: Locale, path: string = "/"): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const cleanPath = path === "/" ? "" : path;
  return `${prefix}${cleanPath}` || "/";
}

/**
 * Strips a known locale prefix off a pathname, returning the locale-neutral
 * remainder (e.g. "/en/contact" -> "/contact"). Used by the language switcher
 * to figure out the equivalent page in the other locale.
 */
export function stripLocalePrefix(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    const prefix = `/${locale}`;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length) || "/";
  }
  return pathname;
}

/**
 * hreflang alternate links for a given locale-neutral path, so search engines
 * know the ro/en pages are translations of each other rather than duplicates.
 */
export function buildHreflangLinks(path: string = "/") {
  return [
    ...LOCALES.map((locale) => ({
      rel: "alternate",
      hrefLang: locale,
      href: `${SITE_URL}${localePath(locale, path)}`,
    })),
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}` },
  ];
}

export type { Locale, TranslationDictionary, FormValidationMessages } from "./types";
