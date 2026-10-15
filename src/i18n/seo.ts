import { DEFAULT_LOCALE, type Locale } from "./config";
import type { Translator, TranslationKey } from "./utils";

/**
 * Resolve a page's <title>/<description> for the config-driven page families
 * (assets, compare, propfirms, use-cases).
 *
 * Those templates rendered `X.seo.title` straight from config JSON, which is
 * English-only — so /de, /es, /fr and /it served translated body copy under
 * English metadata across 100 URLs. English still uses the bespoke per-page
 * config copy; other locales get a localized template with the entity name
 * interpolated, the same way translated body sentences already interpolate
 * English brand and persona names.
 */
export function localizedSeo(
  locale: Locale,
  t: Translator,
  family: "usecase" | "asset" | "compare" | "propfirm",
  name: string,
  fallback: { title: string; description: string },
  // "unsupported": firm.platforms are all brokers PickMyTrade doesn't connect
  // to (e.g. MT4/MT5/DXTrade-only prop firms) — the default propfirm_title/
  // description template claims "Connect {name} with PickMyTrade", which is
  // false for these, so non-English locales need a distinct honest template.
  variant: "default" | "unsupported" = "default",
  unsupportedParams?: { name: string; platforms: string },
): { title: string; description: string } {
  if (locale === DEFAULT_LOCALE) return fallback;
  if (variant === "unsupported") {
    return {
      title: t(`seo_i18n.${family}_title_unsupported` as TranslationKey, unsupportedParams as any),
      description: t(`seo_i18n.${family}_description_unsupported` as TranslationKey, unsupportedParams as any),
    };
  }
  return {
    title: t(`seo_i18n.${family}_title` as TranslationKey, { name }),
    description: t(`seo_i18n.${family}_description` as TranslationKey, { name }),
  };
}
