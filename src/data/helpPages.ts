/**
 * The TWS help center is public and always built.
 *
 * The Rithmic help center is still private: it is only built when HELP_PAGES=1
 * (see `npm run build:help` / `npm run dev:help`); a normal build emits no
 * /help/rithmic/ pages, no screenshots, no sitemap entries and no footer link.
 */
export const HELP_PAGES_ENABLED = process.env.HELP_PAGES === "1";
