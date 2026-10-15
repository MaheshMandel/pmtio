import en from "./locales/en.json";
import de from "./locales/de.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";

import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "./config";

const dictionaries = { en, de, es, fr, it } satisfies Record<Locale, unknown>;

type Dictionary = typeof en;

type DotPaths<T> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? `${K}.${DotPaths<T[K]>}`
    : K;
}[keyof T & string];

export type TranslationKey = DotPaths<Dictionary>;

function resolve(dict: unknown, key: string): string | undefined {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node && typeof node === "object" && part in node) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof node === "string" ? node : undefined;
}

type Params = Record<string, string | number>;

function interpolate(template: string, params?: Params): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale];
  return function t(key: TranslationKey, params?: Params): string {
    const value = resolve(dict, key);
    if (value !== undefined) return interpolate(value, params);

    const fallback = resolve(dictionaries[DEFAULT_LOCALE], key);
    if (import.meta.env.DEV && value === undefined) {
      console.warn(`[i18n] Missing key "${key}" for locale "${locale}".`);
    }
    return fallback !== undefined ? interpolate(fallback, params) : key;
  };
}

export type Translator = ReturnType<typeof useTranslations>;

export function getLocalePaths() {
  return LOCALES.map((locale) => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
    props: { locale },
  }));
}

export function toLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function localizedPath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  if (locale === DEFAULT_LOCALE) {
    return clean ? `/${clean}/` : `/`;
  }
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

export function absoluteLocalizedPath(locale: Locale, path = ""): string {
  return `https://pickmytrade.io${localizedPath(locale, path)}`;
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    segments.shift();
  }
  return localizedPath(target, segments.join("/"));
}
