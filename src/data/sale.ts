// Single source of truth for the sale end date.
//
// Change this ONE value to start/end a sale. Everything that depends on the sale
// reads from here (or from the `window.SALE_END` global derived from it):
//   - the sale banner show/hide + countdown (BaseLayout.astro)
//   - the standalone banner visibility guard (SaleBanner.astro)
//   - dynamic pricing: the discounted price shows while the sale is live and
//     automatically reverts to the regular (originalPrice) once it ends
//     (the inline pricing renderer in src/pages/[locale]/index.astro)
//
// ISO 8601 with an explicit offset so the cutover happens at the same instant
// for every visitor regardless of their local timezone.
export const SALE_END = "2026-09-17T10:00:00+05:30";
