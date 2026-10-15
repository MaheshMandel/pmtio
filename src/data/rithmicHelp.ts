import type { Locale } from "../i18n/config";
import raw from "./rithmic-help.json";
import { twsUi, type TwsUi } from "./twsHelpUi";
import enUi from "./rithmic-help-ui.en.json";

export interface RithmicArticle {
  slug: string;
  title: string;
  description: string;
  group: string;
  readMin: number;
  modified: string;
  answer: string;
  toc: { id: string; label: string }[];
  body: string;
  faq: { q: string; a: string }[];
  related: { slug: string; title: string }[];
}

export const RITHMIC_ARTICLES = raw.articles as RithmicArticle[];

const translated = import.meta.glob("./rithmic-help.*.json", { eager: true, import: "default" }) as Record<
  string,
  { articles: RithmicArticle[] }
>;

/** Locales that have a translated article file (English is always present). */
export const RITHMIC_LOCALES: Locale[] = [
  "en",
  ...(Object.keys(translated)
    .map((k) => k.match(/rithmic-help\.([a-z]{2})\.json$/)?.[1])
    .filter(Boolean) as Locale[]),
];

export function rithmicArticles(locale: Locale): RithmicArticle[] {
  return translated[`./rithmic-help.${locale}.json`]?.articles ?? RITHMIC_ARTICLES;
}

const uiFiles = import.meta.glob("./rithmic-help-ui.*.json", { eager: true, import: "default" }) as Record<
  string,
  Record<string, unknown>
>;

export type RithmicUi = TwsUi & { groups: Record<string, string> };

/** Shared chrome comes from the TWS help UI strings; Rithmic-specific keys override them. */
export function rithmicUi(locale: Locale): RithmicUi {
  const base = twsUi(locale);
  const own = (uiFiles[`./rithmic-help-ui.${locale}.json`] ?? enUi) as Partial<RithmicUi>;
  return { ...base, ...own, toc: base.toc, groups: { ...(own.groups ?? {}) } } as RithmicUi;
}

/** Prefix internal guide links in HTML bodies with the locale (assets stay put). */
export function localizeRithmicHtml(html: string, locale: Locale): string {
  return locale === "en" ? html : html.replace(/href="\/help\/rithmic\/(?!assets\/)/g, `href="/${locale}/help/rithmic/`);
}

export const RITHMIC_GROUPS = [...new Set(RITHMIC_ARTICLES.map((a) => a.group))];
export const RITHMIC_SITE = "https://pickmytrade.io";

/** Set to false to ship the guides noindex and keep them out of the sitemap. */
export const RITHMIC_INDEXABLE = true;
