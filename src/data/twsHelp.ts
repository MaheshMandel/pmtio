import type { Locale } from "../i18n/config";
import raw from "./tws-help.json";

export interface TwsArticle {
  slug: string;
  title: string;
  description: string;
  group: string;
  readMin: number;
  modified: string;
  image: string | null;
  citation: string[];
  answer: string;
  steps: { id: string; html: string }[];
  example: string;
  screen: string;
  verify: string;
  avoid: string;
  faq: { q: string; a: string }[];
  sources: string[];
  sourcesNote: string;
  related: { slug: string; title: string }[];
  pending: string[];
  passed: boolean;
}

export const TWS_ARTICLES = raw.articles as TwsArticle[];

const translated = import.meta.glob("./tws-help.*.json", { eager: true, import: "default" }) as Record<
  string,
  { articles: TwsArticle[] }
>;

/** Articles for a locale; falls back to English until that locale's file exists. */
export function twsArticles(locale: Locale): TwsArticle[] {
  return translated[`./tws-help.${locale}.json`]?.articles ?? TWS_ARTICLES;
}

/** Prefix internal guide links in HTML bodies with the locale (assets stay put). */
export function localizeTwsHtml(html: string, locale: Locale): string {
  return locale === "en" ? html : html.replace(/href="\/help\/tws\/(?!assets\/)/g, `href="/${locale}/help/tws/`);
}
export const TWS_BASE = "/help/tws/";
export const TWS_SITE = "https://pickmytrade.io";

/**
 * The guides ship noindex until the held pages have their screenshots and UI
 * checks (see scripts/import-tws-help.py and the "pending" notes in
 * src/data/tws-help.json). Flip to true to make /help/tws/ indexable and list
 * it in the sitemap.
 */
export const TWS_INDEXABLE = true;

export const TWS_GROUPS = [...new Set(TWS_ARTICLES.map((a) => a.group))];

export const TWS_DISCLAIMER_URLS = [
  "https://www.interactivebrokers.com/en/general/homepage-disclosures.php",
  "https://www.interactivebrokers.com/campus/glossary-terms/paper-trading-account/",
  "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/investor-56",
];
