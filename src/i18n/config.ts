export const LOCALES = ["en", "de", "es", "fr", "it"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
};

export const LOCALE_BCP47: Record<Locale, string> = {
  en: "en-US",
  de: "de-DE",
  es: "es-ES",
  fr: "fr-FR",
  it: "it-IT",
};

export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  de: "ltr",
  es: "ltr",
  fr: "ltr",
  it: "ltr",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}
