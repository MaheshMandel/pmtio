/**
 * config/propfirms*.json lists a firm's `platforms` field for informational
 * display, but several firm-detail templates (automation/[slug], copier/[slug],
 * propfirms/[slug], prop-firm-faq/[slug]) also interpolate it straight into
 * "Automate TradingView alerts to {name} on {platforms}" copy and an
 * unconditional trial CTA — for firms whose platforms are MT4/MT5/DXTrade only
 * (e8-markets, fundednext, fundingpips, fxify-futures, holaprime), that's a
 * false claim: PickMyTrade doesn't connect to any of those. Gate the
 * automate/trial copy on whether the firm lists at least one broker PickMyTrade
 * actually supports.
 */
const SUPPORTED_PLATFORM_TOKENS = [
  'tradovate',
  'rithmic',
  'interactive brokers',
  'ibkr',
  'tradestation',
  'tradelocker',
  'projectx',
  'topstepx',
  'match-trader',
  'matchtrader',
  'tradier',
  'ctrader',
  'ironbeam',
];

export function firmHasSupportedPlatform(platforms: string): boolean {
  const lower = platforms.toLowerCase();
  return SUPPORTED_PLATFORM_TOKENS.some((token) => lower.includes(token));
}

const OR_WORD: Record<string, string> = {
  en: 'or',
  de: 'oder',
  es: 'o',
  fr: 'ou',
  it: 'o',
};

// "MT4, MT5, DXTrade" -> "MT4, MT5 or DXTrade" (localized conjunction)
export function toOrList(commaList: string, locale: string = 'en'): string {
  const parts = commaList.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length <= 1) return commaList;
  const or = OR_WORD[locale] ?? OR_WORD.en;
  return `${parts.slice(0, -1).join(', ')} ${or} ${parts[parts.length - 1]}`;
}

/**
 * Firms whose own agreement restricts bot/webhook-placed orders more than the
 * generic "confirm the firm's current rules" disclaimer covers — verified
 * against the firm's live, current agreement (not the prop-firm-automation
 * comparison table's "generally yes" shorthand). Apex Trader Funding's User
 * Agreement (read 2026-09-28) has a Manual Order Submission Requirement that
 * bans bot/script/webhook order placement outright, with narrow carve-outs
 * (alert-only tools, manually-configured SL/TP, and copy trading from a
 * manually-traded account) — see FE-06. Firm-detail templates show a rules
 * callout linking to /faq/prop-firm-automation/ for any slug listed here.
 */
export const AUTOMATION_CAVEAT_SLUGS = new Set(['apex-trader-funding']);

export function hasAutomationCaveat(slug: string): boolean {
  return AUTOMATION_CAVEAT_SLUGS.has(slug);
}
