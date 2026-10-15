import { localizedPath } from "../i18n/utils";
import type { Locale } from "../i18n/config";

// ─────────────────────────────────────────────────────────────────────────────
// FAQ hub-and-spoke content model.
//
// The 124 Q&As live as translated strings in src/i18n/locales/*.json under
// `general_faq.faq_q{N}` (question) and `general_faq.faq_a{N}` (answer, HTML via
// set:html). Answers interpolate `{link1..}` params — the ordered link targets
// for each answer are captured in FAQ_LINKS below (extracted from the original
// monolithic general-faq page, so no answer text changes).
//
// Each Q&A is rendered on exactly one page: a topical spoke (SPOKES) or a
// remaining general section on the hub (HUB_SECTIONS). No duplication.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ordered link path targets per answer id (only answers that use {link1..}).
 *
 * Paths are locale-relative; absolute URLs pass through as-is. Tradovate is
 * described throughout this site as a supported broker but has no
 * pickmytrade.io page, so /broker/tradingview-to-tradovate 404'd on every
 * locale. Until an .io page exists these point at the live sister-domain
 * page instead of a dead local URL.
 */
export const FAQ_LINKS: Record<number, string[]> = {
  1: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic"],
  2: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-tradestation"],
  9: ["supported-propfirms"],
  10: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic", "broker/tradingview-to-ib"],
  11: ["https://pickmytrade.trade/tradingview-to-tradovate/"],
  12: ["broker/tradingview-to-rithmic", "supported-propfirms"],
  13: ["broker/tradingview-to-ib", "broker-faq/ib-faq"],
  14: ["assets/futures"],
  // NOTE: ids 15/16/19/20 no longer use {linkN} in the current (en) answer text
  // (see UPDATE_automated-futures-trading.html), but de/es/fr/it are still on the
  // old answer copy that does reference these placeholders — kept here so those
  // locales don't render literal "{link1}" until they're retranslated.
  15: ["assets/futures"],
  16: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic", "broker/tradingview-to-ib"],
  19: ["supported-propfirms", "propfirms/apex-trader-funding"],
  20: ["https://pickmytrade.trade/tradingview-to-tradovate/"],
  24: ["supported-propfirms", "propfirms/apex-trader-funding", "propfirms/topstep", "propfirms/e8-markets"],
  25: ["supported-propfirms"],
  28: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic", "supported-propfirms"],
  32: ["broker/tradingview-to-ib", "https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic", "broker/tradingview-to-tradelocker"],
  34: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic"],
  35: ["broker/tradingview-to-tradelocker", "assets/futures"],
  37: ["supported-propfirms"],
  41: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic", "broker/tradingview-to-projectx"],
  42: ["#pricing"],
  43: ["assets/futures"],
  47: ["broker/tradingview-to-tradelocker"],
  48: ["broker/tradingview-to-tradelocker"],
  51: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-ib", "broker/tradingview-to-tradestation", "broker/tradingview-to-rithmic"],
  54: ["https://pickmytrade.trade/tradingview-to-tradovate/"],
  57: ["broker/tradingview-to-tradelocker"],
  58: ["trendspider"],
  60: ["propfirms/apex-trader-funding", "propfirms/topstep", "propfirms/e8-markets"],
  61: ["broker/tradingview-to-rithmic", "supported-propfirms", "broker/tradingview-to-tradelocker"],
  65: ["#pricing"],
  68: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic", "broker/tradingview-to-tradestation", "broker/tradingview-to-tradier", "broker/tradingview-to-tradelocker", "broker/tradingview-to-ib"],
  71: ["#pricing", "https://pickmytrade.trade/tradingview-to-tradovate/"],
  73: ["assets/futures", "#pricing"],
  74: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic"],
  90: ["https://pickmytrade.trade/tradingview-to-tradovate/", "broker/tradingview-to-rithmic", "broker/tradingview-to-ib"],
  105: ["broker/tradingview-to-rithmic", "broker/tradingview-to-ib"],
};

/** Build the `{link1, link2, …}` interpolation params for an answer. */
export function answerParams(locale: Locale, id: number): Record<string, string> {
  const params: Record<string, string> = {};
  (FAQ_LINKS[id] ?? []).forEach((path, i) => {
    // Absolute URLs pass through untouched — a few targets live on the sister
    // domain and have no pickmytrade.io equivalent, and running those through
    // localizedPath would turn them into broken local paths like /de/https:/…
    params[`link${i + 1}`] = /^https?:\/\//.test(path)
      ? path
      : localizedPath(locale, path);
  });
  return params;
}

/** Strip HTML tags for JSON-LD answer text (mirrors the hub's original plaintext schema). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export interface Spoke {
  slug: string;
  /** i18n namespace holding this spoke's chrome (meta/hero/card copy). */
  ns: string;
  /** Font Awesome icon class for hub cards + hero. */
  icon: string;
  /** Question ids rendered on this spoke, in display order. */
  ids: number[];
}

/** The 7 topical spoke pages under /faq/*. */
export const SPOKES: Spoke[] = [
  {
    slug: "tradingview-webhooks",
    ns: "faq_webhooks",
    icon: "fa-solid fa-bolt",
    ids: [
      133, 1, 6, 4, 134, 135, 136, 30, 32, 29, 2, 3, 5, 7, 9, 31, 33, 34, 10,
      35, 36, 8,
    ],
  },
  {
    slug: "broker-connections",
    ns: "faq_broker",
    icon: "fa-solid fa-plug",
    ids: [11, 12, 13, 14, 48],
  },
  {
    slug: "automated-futures-trading",
    ns: "faq_futures",
    icon: "fa-solid fa-chart-line",
    ids: [15, 16, 17, 18, 19, 20, 21, 22, 23, 125, 126, 127],
  },
  {
    slug: "prop-firm-automation",
    ns: "faq_propfirm",
    icon: "fa-solid fa-building-columns",
    ids: [24, 25, 26, 27, 28, 37, 38, 39, 40, 41],
  },
  {
    slug: "pricing-costs",
    ns: "faq_pricing",
    icon: "fa-solid fa-tag",
    ids: [71, 72, 73, 128, 129, 130, 131, 132],
  },
  {
    slug: "troubleshooting",
    ns: "faq_troubleshooting",
    icon: "fa-solid fa-wrench",
    ids: [
      49, 50, 68, 69, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
      91, 92, 93, 94, 95, 96, 97, 120, 121, 122, 123, 124,
    ],
  },
  {
    slug: "platform-comparisons",
    ns: "faq_comparisons",
    icon: "fa-solid fa-scale-balanced",
    ids: [55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
  },
];

export interface HubSection {
  /** Existing translation key for the section heading. */
  headingKey: string;
  ids: number[];
}

/** General / educational sections that stay on the hub (not a topical spoke). */
export const HUB_SECTIONS: HubSection[] = [
  { headingKey: "general_faq.cat9_heading", ids: [42, 43, 44, 45, 46, 47] },
  { headingKey: "general_faq.cat12_heading", ids: [51, 52, 53, 54] },
  { headingKey: "general_faq.cat15_heading", ids: [70] },
  { headingKey: "general_faq.cat17_heading", ids: [74, 75, 76] },
  { headingKey: "general_faq.cat20_heading", ids: [99, 100, 101, 102, 103, 104, 105, 106] },
  { headingKey: "general_faq.cat21_heading", ids: [107, 108, 109, 110, 111, 112] },
  { headingKey: "general_faq.cat22_heading", ids: [113, 114, 115, 116, 117, 118] },
  { headingKey: "general_faq.cat23_heading", ids: [119] },
];
