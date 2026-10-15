import en from "./locales/en.json";
import de from "./locales/de.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";

import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "./config";

/**
 * Translation-coverage gate.
 *
 * `useTranslations` (./utils.ts) silently falls back to English whenever a key is
 * missing from a locale dictionary. That is the right runtime behaviour — a page
 * should never render a raw key — but it means a locale page can be entirely
 * English while hreflang and the sitemap advertise it as a genuine translation.
 * Coverage across de/es/fr/it is currently ~75%, so this affects a real slice of
 * the site rather than a stray page.
 *
 * This module measures, at build time, how much of a route's copy actually exists
 * in a given locale. Below INDEX_THRESHOLD the page is served noindex, dropped
 * from the hreflang set, and excluded from the sitemap — it stays reachable, it
 * just stops claiming to be something it isn't.
 *
 * The gate is self-healing: coverage is derived from the locale JSON, so filling
 * in a namespace re-indexes its pages with no code change.
 */

/** Minimum share of a route's strings that must exist in a locale to index it. */
export const INDEX_THRESHOLD = 0.9;

const dictionaries: Record<Locale, unknown> = { en, de, es, fr, it };

/**
 * Route (locale prefix stripped, no leading slash) → the i18n namespaces it
 * renders. Exact routes are matched first, then the `prefix:` entries, which
 * cover the dynamic families.
 *
 * A route with no entry is treated as fully covered, so adding a page can never
 * silently de-list it. scripts/check-i18n-coverage.mjs fails if a page template
 * uses a namespace this map doesn't account for, which is what stops it drifting.
 */
const ROUTE_NAMESPACES: Array<{ match: string; prefix?: boolean; ns: string[] }> = [
  // ── Exact routes (checked before any prefix) ──────────────────────────────
  { match: "", ns: ["home"] },
  { match: "404", ns: ["not_found"] },
  { match: "about", ns: ["about"] },
  { match: "ai-ml/advanced-guide", ns: ["ai_ml_advanced_guide"] },
  { match: "ai-ml/trading-plan", ns: ["ai_ml_trading_plan"] },
  { match: "cloud-trade-copier", ns: ["cloud_trade_copier"] },
  { match: "futures-trade-copier", ns: ["futures_trade_copier"] },
  { match: "futures-trading-bot", ns: ["futures_trading_bot"] },
  { match: "no-code-trading-bot", ns: ["no_code_trading_bot"] },
  { match: "pipe-help", ns: ["pipe_help"] },
  { match: "pricing", ns: ["pricing"] },
  { match: "prop-firm-trade-copier", ns: ["prop_firm_trade_copier"] },
  { match: "quantvps", ns: ["quantvps"] },
  { match: "supported-propfirms", ns: ["supported_propfirms"] },
  { match: "trade-copier", ns: ["trade_copier"] },
  { match: "tradingview-automation", ns: ["tradingview_automation"] },
  { match: "tradoxvps", ns: ["tradoxvps"] },
  { match: "tools/tp-sl-probability-calculator", ns: ["tp_sl_calculator"] },
  { match: "trendspider", ns: ["trendspider"] },
  { match: "webhook-to-broker", ns: ["webhook_broker_pillar"] },
  { match: "general-faq", ns: ["faq_hub", "general_faq"] },

  // Index pages for the programmatic families.
  { match: "automation", ns: ["hub"] },
  { match: "copier", ns: ["hub"] },
  { match: "broker", ns: ["broker_faq_hub", "hub"] },
  { match: "broker-faq", ns: ["broker_faq_hub"] },
  { match: "compare", ns: ["compare_hub"] },
  { match: "prop-firm-faq", ns: ["propfirm_faq_hub"] },

  // Per-broker landing pages.
  { match: "broker/tradingview-to-ctrader", ns: ["broker_ctrader"] },
  { match: "broker/tradingview-to-ib", ns: ["broker_ib"] },
  { match: "broker/tradingview-to-ironbeam", ns: ["broker_ironbeam"] },
  { match: "broker/tradingview-to-matchtrader", ns: ["broker_matchtrader"] },
  { match: "broker/tradingview-to-projectx", ns: ["broker_projectx"] },
  { match: "broker/tradingview-to-rithmic", ns: ["broker_rithmic"] },
  { match: "broker/tradingview-to-topstepx", ns: ["broker_topstepx"] },
  { match: "broker/tradingview-to-tradelocker", ns: ["broker_tradelocker"] },
  { match: "broker/tradingview-to-tradestation", ns: ["broker_tradestation"] },
  { match: "broker/tradingview-to-tradier", ns: ["broker_tradier"] },

  // FAQ spokes render their own namespace, the hub chrome, and the shared
  // question bank (see SPOKES in src/data/faqItems.ts).
  { match: "faq/automated-futures-trading", ns: ["faq_futures", "faq_hub", "general_faq"] },
  { match: "faq/broker-connections", ns: ["faq_broker", "faq_hub", "general_faq"] },
  { match: "faq/platform-comparisons", ns: ["faq_comparisons", "faq_hub", "general_faq"] },
  { match: "faq/pricing-costs", ns: ["faq_hub", "faq_pricing", "general_faq"] },
  { match: "faq/prop-firm-automation", ns: ["faq_hub", "faq_propfirm", "general_faq"] },
  { match: "faq/tradingview-webhooks", ns: ["faq_hub", "faq_webhooks", "general_faq"] },
  { match: "faq/troubleshooting", ns: ["faq_hub", "faq_troubleshooting", "general_faq"] },

  // Hand-written pages that sit inside a prefixed family, so they must be
  // listed exactly to beat the prefix entries below.
  { match: "compare/best-trade-copier", ns: ["best_trade_copier"] },
  { match: "legal/disclaimer", ns: ["disclaimer"] },
  { match: "legal/privacy", ns: ["privacy"] },
  { match: "legal/terms", ns: ["terms"] },
  { match: "page/affiliate-program", ns: ["affiliate"] },
  { match: "page/contact", ns: ["contact"] },
  { match: "propfirms/boxcar-trading", ns: ["boxcar_trading"] },
  { match: "upcoming/brokers", ns: ["upcoming_brokers"] },
  { match: "upcoming/tradingview-to-tastytrade", ns: ["broker_tastytrade"] },

  // ── Prefixes for the programmatic families ────────────────────────────────
  { match: "assets/", prefix: true, ns: ["asset_detail"] },
  { match: "automation/", prefix: true, ns: ["automation_detail", "hub", "firm_unsupported", "firm_automation_rules_box"] },
  { match: "broker-faq/", prefix: true, ns: ["broker_faq_detail", "broker_faq_hub"] },
  { match: "compare/", prefix: true, ns: ["compare_detail"] },
  { match: "copier/", prefix: true, ns: ["copier_detail", "hub", "firm_unsupported", "firm_automation_rules_box"] },
  { match: "prop-firm-faq/", prefix: true, ns: ["propfirm_faq_detail", "firm_unsupported", "firm_automation_rules_box"] },
  { match: "propfirms/", prefix: true, ns: ["propfirm_guide", "firm_unsupported", "firm_automation_rules_box"] },
  { match: "upcoming/", prefix: true, ns: ["broker_upcoming"] },
  { match: "use-cases/", prefix: true, ns: ["use_case_detail"] },
];

/**
 * Routes with no `t()` calls at all — their markup is hardcoded English, so they
 * render identically on every locale. There is no namespace to measure, so they
 * are pinned to zero rather than scoring a meaningless 0/0.
 */
const HARDCODED_ENGLISH = new Set<string>([
]);

/** Flatten a nested dictionary to dotted keys. */
function flatten(node: unknown, prefix = "", out = new Set<string>()): Set<string> {
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      flatten(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else if (typeof node === "string") {
    out.add(prefix);
  }
  return out;
}

const flatCache = new Map<Locale, Set<string>>();
function flatKeys(locale: Locale): Set<string> {
  let cached = flatCache.get(locale);
  if (!cached) {
    cached = flatten(dictionaries[locale]);
    flatCache.set(locale, cached);
  }
  return cached;
}

/** Strip a leading locale segment and surrounding slashes from a pathname. */
export function routeFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) segments.shift();
  return segments.join("/");
}

function namespacesFor(route: string): string[] | null {
  for (const entry of ROUTE_NAMESPACES) {
    if (!entry.prefix && entry.match === route) return entry.ns;
  }
  for (const entry of ROUTE_NAMESPACES) {
    if (entry.prefix && route.startsWith(entry.match)) return entry.ns;
  }
  return null;
}

/**
 * broker-faq/<slug> pages all share one `broker_faq_detail` namespace, which
 * nests each broker's own meta/hero/FAQ copy under
 * `broker_faq_detail.brokers.<slug>.*` alongside the generic, shared keys
 * (breadcrumbs, section titles, the templated question bank). Scoring the
 * whole namespace per page means one broker's `brokers.<slug>` block can be
 * 100% missing while the other ~9 translated siblings keep the aggregate
 * score above INDEX_THRESHOLD — the page then gets indexed and advertised
 * via hreflang while its actual content silently renders in English
 * (confirmed live: broker-faq/ironbeam-faq is fully untranslated in
 * de/es/fr/it but was scoring ~94% covered). Scope sibling brokers' nested
 * keys out of the count so each slug's score reflects only its own content.
 */
function brokerFaqSlug(route: string): string | undefined {
  return route.match(/^broker-faq\/([^/]+)$/)?.[1];
}

/**
 * Share of this route's English strings that exist in `locale` (0–1).
 * Unmapped routes return 1 so they stay indexable by default.
 */
export function localeCoverage(route: string, locale: Locale): number {
  if (locale === DEFAULT_LOCALE) return 1;
  if (HARDCODED_ENGLISH.has(route)) return 0;

  const ns = namespacesFor(route);
  if (!ns) return 1;

  const enKeys = flatKeys(DEFAULT_LOCALE);
  const localeKeys = flatKeys(locale);
  const thisSlug = brokerFaqSlug(route);

  let total = 0;
  let present = 0;
  for (const key of enKeys) {
    if (!ns.includes(key.slice(0, key.indexOf(".")))) continue;
    if (thisSlug) {
      const sibling = key.match(/^broker_faq_detail\.brokers\.([^.]+)\./);
      if (sibling && sibling[1] !== thisSlug) continue;
    }
    total++;
    if (localeKeys.has(key)) present++;
  }
  return total === 0 ? 1 : present / total;
}

/** Should this route be offered to search engines in this locale? */
export function isIndexable(route: string, locale: Locale): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  return localeCoverage(route, locale) >= INDEX_THRESHOLD;
}

/** Locales whose version of `route` is translated enough to advertise. */
export function indexableLocales(route: string): Locale[] {
  return LOCALES.filter((l) => isIndexable(route, l));
}
