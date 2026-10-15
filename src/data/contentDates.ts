import contentDates from "./contentDates.json";
import { routeFromPath } from "../i18n/coverage";

/**
 * Per-route publication / modification dates, derived from git history by
 * scripts/generate-content-dates.mjs (run automatically by `npm run build`).
 *
 * These feed two freshness signals that the site previously did not emit at all:
 *   - `datePublished` / `dateModified` in each page's JSON-LD (see BaseLayout)
 *   - `<lastmod>` in the sitemap (see astro.config.mjs)
 *
 * Content under ~3 months old is materially more likely to be cited by AI search
 * surfaces, and Google AI Mode weights freshness far more heavily than classic
 * ranking does. Before this, 201 of 212 English pages carried no date anywhere
 * and all 760 sitemap URLs carried no <lastmod>, so every freshness heuristic
 * had to fall back to guessing.
 */

export interface ContentDates {
  published: string;
  modified: string;
}

const ROUTES: Record<string, ContentDates> = contentDates.routes;
const DEFAULT_MODIFIED: string = contentDates.default;

/**
 * Exact routes are matched first, then the longest matching `prefix/` key, so
 * `compare/best-trade-copier` beats the generic `compare/` family entry.
 */
const PREFIX_KEYS = Object.keys(ROUTES)
  .filter((k) => k.endsWith("/"))
  .sort((a, b) => b.length - a.length);

export function datesForRoute(route: string): ContentDates {
  const exact = ROUTES[route];
  if (exact) return exact;

  for (const key of PREFIX_KEYS) {
    if (route.startsWith(key)) return ROUTES[key];
  }

  // A page with no git history yet (new file in a dirty tree). Claiming a
  // publication date we cannot substantiate would be worse than reusing the
  // site-wide last-touched date, which is at least true of the deployed build.
  return { published: DEFAULT_MODIFIED, modified: DEFAULT_MODIFIED };
}

/** Same lookup, keyed by a URL pathname (locale prefix tolerated). */
export function datesForPath(pathname: string): ContentDates {
  return datesForRoute(routeFromPath(pathname));
}

/**
 * Schema.org types that legitimately carry datePublished/dateModified. Adding
 * dates to a node type that has no such property (Offer, BreadcrumbList,
 * SoftwareApplication…) would be invalid markup, so the injection in BaseLayout
 * is restricted to this set.
 */
const DATEABLE_TYPES = new Set([
  "Article",
  "TechArticle",
  "BlogPosting",
  "NewsArticle",
  "WebPage",
  "CollectionPage",
  "ContactPage",
  "AboutPage",
  "FAQPage",
  "QAPage",
  "ItemList",
]);

/**
 * Returns a copy of `data` with datePublished/dateModified filled in on every
 * dateable node that does not already declare them. Existing values always win —
 * a page that knows its own real dates keeps them.
 */
export function withContentDates<T>(data: T, dates: ContentDates): T {
  const seen = new WeakSet<object>();

  const visit = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(visit);
    if (!node || typeof node !== "object") return node;
    if (seen.has(node as object)) return node;
    seen.add(node as object);

    const source = node as Record<string, unknown>;
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(source)) {
      next[key] = visit(value);
    }

    const types = ([] as unknown[]).concat(source["@type"] ?? []);
    const dateable = types.some(
      (t) => typeof t === "string" && DATEABLE_TYPES.has(t),
    );
    if (dateable) {
      if (next.datePublished === undefined) next.datePublished = dates.published;
      if (next.dateModified === undefined) next.dateModified = dates.modified;
    }
    return next;
  };

  return visit(data) as T;
}
