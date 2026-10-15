/**
 * Slugs that have a live /prop-firm-faq/<slug> page.
 *
 * The /automation/* and /copier/* templates link "view all FAQs" for their own
 * 27 prop firms (config/propfirms-full.json), but only a subset of those firms
 * has a prop-firm-faq page — and several use a different slug there
 * (e.g. "maven" vs "maven-trading", "fxify-futures" vs "fxify"). That mismatch
 * produced ~190 internal links to non-existent URLs, so both sides now check
 * against this one list.
 *
 * Kept in sync with the extended-firm list in
 * src/pages/[...locale]/prop-firm-faq/[slug].astro.
 */
export const PROP_FIRM_FAQ_EXTENDED_SLUGS = [
  'topstep',
  'fundednext',
  'myfundedfx',
  'ftmo',
  'fundingpips',
  'the5ers',
  'e8-markets',
  'alpha-capital-group',
  'aqua-funded',
  'audacity-capital',
  'blueguardian',
  'blufx',
  'brightfunded',
  'city-traders-imperium',
  'for-traders',
  'funded-trading-plus',
  'funder-pro',
  'fxify',
  'goat-funded-trader',
  'lark-funding',
  'lucid-trading',
  'rebelsfunding',
  'leeloo-trading',
  'lux-trading-firm',
  'maven-trading',
  'oneup-trader',
  'smart-prop-trader',
  'the-funded-trader',
  'the-trading-pit',
] as const;

/** True when /prop-firm-faq/<slug> is actually generated. */
export function hasPropFirmFaqPage(
  slug: string,
  jsonFirmSlugs: readonly string[],
): boolean {
  return (
    jsonFirmSlugs.includes(slug) ||
    (PROP_FIRM_FAQ_EXTENDED_SLUGS as readonly string[]).includes(slug)
  );
}
