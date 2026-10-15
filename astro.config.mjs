// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { LOCALES, DEFAULT_LOCALE, LOCALE_BCP47, isLocale } from "./src/i18n/config";
import { isIndexable, routeFromPath } from "./src/i18n/coverage";
import { datesForPath } from "./src/data/contentDates";
import faqSchema from "./src/integrations/faq-schema.mjs";
import { TWS_INDEXABLE } from "./src/data/twsHelp";
import { RITHMIC_INDEXABLE } from "./src/data/rithmicHelp";
import { HELP_PAGES_ENABLED } from "./src/data/helpPages";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import upcomingBrokers from "./config/upcoming-brokers.json" with { type: "json" };

const SITE = "https://pickmytrade.io";

// The templated /upcoming/<broker> pages are served noindex until the
// integration actually ships (see src/pages/[...locale]/upcoming/[broker].astro).
// Listing a noindex URL in the sitemap is a contradictory signal, so they are
// filtered out here too. The /upcoming/brokers hub and the hand-written
// tastytrade page are NOT part of that family and stay listed. Ironbeam
// shipped and now lives under /broker/, so it is no longer in this family.
const UPCOMING_NOINDEX_SLUGS = new Set(
  upcomingBrokers.brokers.map((b) => b.slug),
);

/** @param {string} url */
function ensureTrailingSlash(url) {
  const u = new URL(url);
  if (!u.pathname.endsWith("/")) u.pathname += "/";
  return u.href;
}

/**
 * True when this URL is served noindex because its locale is not translated
 * enough (see src/i18n/coverage.ts). Submitting a noindex URL in the sitemap is
 * a contradictory signal, so those are filtered out here too.
 * @param {string} url
 */
function isBelowTranslationThreshold(url) {
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  const locale = segments.length && isLocale(segments[0]) ? segments[0] : DEFAULT_LOCALE;
  return !isIndexable(routeFromPath(new URL(url).pathname), locale);
}

/** @param {string} url */
function isNoindexUpcoming(url) {
  const segments = new URL(url).pathname.split("/").filter(Boolean);
  const i = segments.indexOf("upcoming");
  if (i === -1 || segments.length !== i + 2) return false;
  return UPCOMING_NOINDEX_SLUGS.has(segments[i + 1]);
}

export default defineConfig({
  site: SITE,

  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  // @astrojs/react was registered but never used: the site has no .tsx/.jsx
  // components and no client:* directive anywhere, so zero islands hydrate.
  // It still emitted a 194 KB React client runtime into dist/_astro/ that no
  // page referenced. Removed — the site is 100% static HTML, which is also
  // what makes it fully readable to AI crawlers (they do not execute JS).
  integrations: [
    // Mirrors every visible <details> FAQ accordion into FAQPage JSON-LD after
    // the build, so structured data cannot drift from the copy on the page.
    // See src/integrations/faq-schema.mjs.
    faqSchema(),
    // The Rithmic help center is private unless HELP_PAGES=1: no pages are generated, and the
    // screenshots that public/help/rithmic copies into the output are removed as well.
    {
      name: "strip-private-help-assets",
      hooks: {
        "astro:build:done": ({ dir }) => {
          if (HELP_PAGES_ENABLED) return;
          for (const prefix of ["", ...LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((l) => `${l}/`)]) {
            fs.rmSync(fileURLToPath(new URL(`${prefix}help/rithmic`, dir)), { recursive: true, force: true });
          }
        },
      },
    },
    sitemap({
      filter: (page) =>
        !isNoindexUpcoming(page) &&
        !isBelowTranslationThreshold(page) &&
        (HELP_PAGES_ENABLED || !/^\/(?:[a-z]{2}\/)?help\/rithmic\//.test(new URL(page).pathname)) &&
        (TWS_INDEXABLE || !/^\/(?:[a-z]{2}\/)?help\/tws\//.test(new URL(page).pathname)) &&
        (RITHMIC_INDEXABLE || !/^\/(?:[a-z]{2}\/)?help\/rithmic\//.test(new URL(page).pathname)),
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((l) => [l, LOCALE_BCP47[l]])),
      },
      serialize(item) {
        // Ticket #43: trailingSlash is "always" now. Normalise every <loc>
        // and hreflang alternate to carry the trailing slash so they
        // byte-match the canonical/hreflang tags BaseLayout renders (which
        // both go through localizedPath — see src/i18n/utils.ts).
        item.url = ensureTrailingSlash(item.url);

        // <lastmod> was absent from all 760 URLs, so crawlers had no recrawl
        // hint and AI surfaces that weight freshness had nothing to read. The
        // date comes from git history (src/data/contentDates.ts), not build
        // time — stamping "now" on every URL each deploy is the pattern search
        // engines learn to ignore.
        item.lastmod = datesForPath(new URL(item.url).pathname).modified;

        if (item.links?.length) {
          item.links = item.links.map((link) => ({
            ...link,
            url: ensureTrailingSlash(link.url),
          }));
          // Add the x-default fallback (absent from every URL before), pointing
          // at the default-locale version for searchers whose locale matches
          // none of the five explicit variants.
          const fallback = item.links.find(
            (l) => l.lang === LOCALE_BCP47[DEFAULT_LOCALE],
          );
          if (fallback && !item.links.some((l) => l.lang === "x-default")) {
            item.links.push({ lang: "x-default", url: fallback.url });
          }
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  output: "static",

  // Ticket #43: standardized on pickmytrade.trade's convention (trailing
  // slash canonical). "always" + directory format (Astro's default) makes
  // Cloudflare Pages auto-redirect the non-slash URL -> slash URL, the same
  // mechanism .trade already relies on with zero hand-written redirect rules.
  trailingSlash: "always",

  build: {
    inlineStylesheets: "auto",
  },
});
