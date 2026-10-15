# GEO / AI Search Analysis — PickMyTrade

**Audit date:** 2026-08-06
**Target:** fresh production build (`npm run build`, `astro check && astro build`)
**Build result:** ✅ 1,056 pages, 0 errors, 6.64s
**Scope analyzed:** 212 English pages in `dist/` (locale copies de/es/fr/it are structurally identical and inherit every finding)
**Method:** static analysis of the built HTML — the exact bytes an AI crawler receives. No JS execution, matching how GPTBot / ClaudeBot / PerplexityBot fetch.

> Framing note: per Google's AI optimization guide, optimizing for generative AI search **is still SEO**. Everything below is SEO fundamentals applied to AI-search surfaces, not a separate discipline.

---

## 1. GEO Readiness Score: **67 / 100**

| # | Criterion | Weight | Score | Weighted |
|---|-----------|--------|-------|----------|
| 1 | Citability | 25% | 62 | 15.5 |
| 2 | Structural readability | 20% | 72 | 14.4 |
| 3 | Multi-modal content | 15% | 55 | 8.3 |
| 4 | Authority & brand signals | 20% | 58 | 11.6 |
| 5 | Technical accessibility | 20% | **86** | 17.2 |
| | **Total** | | | **67 / 100** |

**One-line read:** the technical floor is genuinely excellent — fully static HTML, every AI crawler explicitly allowed, clean canonical/hreflang/noindex hygiene. The ceiling is held down by *how the content is written*: paragraphs are too short to quote, almost nothing carries a date, and 1,200 real Q&A answers sit outside structured data.

---

## 2. Platform Breakdown

| Platform | Score | Why |
|----------|-------|-----|
| **Google AI Overviews** | 68 | Cites pages that already rank. Technical foundation is strong and passage structure is decent on `/broker/*`, but 59% of paragraphs are under 25 words — too short to lift as a standalone answer. |
| **Google AI Mode** (Gemini 2.5) | 58 | Weakly ranking-correlated; weights **freshness + entity authority**. Only 11/212 pages carry any date and the sitemap has zero `<lastmod>`. This is the weakest surface and the cheapest to fix. |
| **ChatGPT** | 60 | Draws 47.9% of citations from Wikipedia, 11.3% from Reddit. Crawler access is perfect (GPTBot, OAI-SearchBot, ChatGPT-User all allowed) but there is **no Wikipedia or Wikidata entity** in `sameAs`. |
| **Perplexity** | 57 | 46.7% of citations come from Reddit. PerplexityBot and Perplexity-User both allowed. No community-validation footprint to draw on. |
| **Bing Copilot** | 62 | Solid Bing-indexable static HTML, but **no IndexNow key file** in `dist/` — new/updated pages take the slow path into the Bing index. |

> AI Overviews and AI Mode reach the same conclusion ~86% of the time but cite the same URLs only 13.7% of the time. They are separate citation engines even though Google merged the UX at I/O 2026 — the AI Mode gap above is a real, separate loss.

---

## 3. AI Crawler Access Status — ✅ Excellent

`dist/robots.txt` explicitly allows **14 AI crawlers**. This is better than most sites audited.

| Crawler | Status |
|---------|--------|
| GPTBot, OAI-SearchBot, ChatGPT-User | ✅ Allow |
| ClaudeBot, Claude-Web, anthropic-ai | ✅ Allow |
| PerplexityBot, Perplexity-User | ✅ Allow |
| Google-Extended | ✅ Allow |
| Applebot-Extended | ✅ Allow |
| CCBot, Bytespider, Amazonbot, cohere-ai | ✅ Allow |
| `User-agent: *` | ✅ Allow, `Disallow: /cdn-cgi/` only |
| Sitemap declared | ✅ `https://pickmytrade.io/sitemap-index.xml` |

**Nothing to fix here.** Two optional additions for completeness: `Google-CloudVertexBot` and `meta-externalagent`. Note that `ChatGPT-User` and `Perplexity-User` are user-triggered fetchers that ignore robots.txt by design — the Allow lines are harmless but not what grants them access.

---

## 4. llms.txt Status — ✅ Present, one broken promise

`dist/llms.txt` exists (9.1 KB) and is well-formed: title, blockquote summary, sectioned link lists with descriptions covering core pages, trade-copier pages, and FAQ hubs.

⚠️ **`_headers` declares cache + content-type rules for `/llms-full.txt`, which does not exist in the build.** Either generate it or drop the rule.

> Weighting caveat: Google states plainly that it **ignores `llms.txt`** for Search including AI features — it "won't harm (nor help)" rankings. Keep it for non-Google AI services; do not treat it as a Google lever. It is not costing you points here and it is not earning you any either.

---

## 5. Brand Mention Analysis

Brand mentions correlate ~3x more strongly with AI citations than backlinks (Ahrefs, 75k brands: YouTube ~0.737 vs Domain Rating ~0.266).

`Organization` schema on 35 pages carries a genuinely good `sameAs` block:

| Platform | In `sameAs` | Citation weight |
|----------|-------------|-----------------|
| YouTube (`@PickMyTrade`) | ✅ | **Strongest single signal (~0.737)** |
| LinkedIn | ✅ | Moderate |
| Twitter/X | ✅ | Low |
| Facebook | ✅ | Low |
| Discord | ✅ | Low |
| SourceForge | ✅ | Low |
| blog. / docs. subdomains | ✅ | Supporting |
| **Reddit** | ❌ **Missing** | **High — 46.7% of Perplexity citations, 11.3% of ChatGPT** |
| **Wikipedia** | ❌ **Missing** | **High — 47.9% of ChatGPT citations** |
| **Wikidata** | ❌ **Missing** | High — entity disambiguation |

The Organization node is otherwise complete: `legalName`, `foundingDate`, `founder`, `address`, `contactPoint`, `logo`, `description`. That is a well-built entity that AI systems currently cannot connect to the two sources they cite most.

---

## 6. Passage-Level Citability

Measured across 4,035 paragraphs in 212 EN pages. Optimal citation chunk is **134–167 words**; ~44% of AI citations come from the first 30% of a page.

| Metric | Value | Verdict |
|--------|-------|---------|
| Avg words/page | 1,836 | ✅ Substantial |
| Median words/page | 1,113 | ✅ No thin content (0 pages under 350w) |
| Avg headings/page | 27.6 | ✅ Well-segmented |
| **Median paragraph length** | **19 words** | ❌ Far below citable |
| Paragraphs under 25 words | **2,386 (59%)** | ❌ Too fragmentary to quote alone |
| Paragraphs in 100–170w band | **53 of 4,035 (1.3%)** | ❌ Almost no optimal chunks |
| Pages opening with a definition in first 60 words | **22 / 212 (10%)** | ❌ Biggest single citability gap |
| Pages with ≥2 specific stats in first 30% | 115 / 212 (54%) | ⚠️ Mixed |
| Question-based H2/H3 present | 194 / 212 (92%) | ✅ Strong |

### What good looks like here (already in your build)

`/broker/tradingview-to-rithmic/` is the model page — H1, then an immediate 63-word answer, then a question H2 answered with "Short answer: not on its own." followed by a 55-word self-contained explanation. That page will get cited.

`/` (home) is also strong: paragraph 2 is a 126-word self-contained definition — *"PickMyTrade is a cloud-based trading automation platform founded in 2023 and operated by PickMyTrade Pvt. Ltd. It connects TradingView alerts to live trading accounts in under 2 minutes…"* — right in the 100–170 band, front-loaded, with entity, date, and specifics. This is the template to replicate.

### Where it breaks

The **43-page `/automation/*` cluster** and the **28-page `/copier/*` cluster** open with 18-word marketing fragments:

> *"Automate your TradingView alerts to Apex Trader Funding in milliseconds. No coding required. Webhook execution. Advanced risk management."*

Nothing there is extractable as an answer to "how do I automate TradingView to Apex?" No entity definition, no numbers, no mechanism. 71 pages — a third of the site — start this way.

---

## 7. Server-Side Rendering Check — ✅ Excellent

**AI crawlers do not execute JavaScript.** This build is essentially immune to that problem.

| Check | Result |
|-------|--------|
| Rendering mode | ✅ Fully static (Astro SSG) — 1,056 prerendered `.html` files |
| Hydrated components (`astro-island`) | ✅ **0** — no client-side React anywhere |
| Content in raw HTML | ✅ 100% — all body copy, all FAQ answers, all tables present pre-JS |
| Total JS shipped per page | ✅ ~29 KB (two small Astro inline-script bundles + `utm.js`) |
| Avg HTML page weight | 90 KB |

⚠️ **`_astro/client.CpeL31wX.js` (194 KB React runtime) is built and deployed but referenced by 0 pages.** With zero islands, `@astrojs/react` is producing dead weight. Harmless to crawlers, pure deploy bloat.

⚠️ **AOS animations** (`data-aos` on 188 pages) rely on a render-blocking CDN stylesheet that sets `opacity: 0`. Text remains in the DOM, so raw-HTML extraction by ChatGPT/Claude/Perplexity is unaffected — but it makes the site dependent on `cdn.jsdelivr.net` availability for visible rendering. Low GEO risk, worth self-hosting.

---

## 8. Top 5 Highest-Impact Changes

### 1. Add `dateModified` sitewide + `<lastmod>` to the sitemap — **highest ROI, lowest effort**
Content under 3 months old is ~3x more likely to be cited; pages stale 6+ months lose citation eligibility entirely (SE Ranking, 1.3M citations).

- **201 of 212 EN pages have no `datePublished` or `dateModified` anywhere.**
- 20 pages typed `Article` / `TechArticle` carry no date at all — including all 9 `/broker/*` pages and all 5 `/assets/*` pages.
- `sitemap-0.xml` has **760 URLs and 0 `<lastmod>` entries.**

Right now, every AI Mode freshness heuristic has to guess. Add `dateModified` to the shared schema helper and enable `lastmod` in the `@astrojs/sitemap` config. This is a config-level change that lifts all 1,056 pages.

### 2. Front-load a 120–160 word definition paragraph on the 71 `/automation/*` + `/copier/*` pages
Only 10% of pages open with a definition-style sentence. Replicate the homepage pattern directly under the H1:

> *"TradingView to Apex Trader Funding automation is a webhook bridge that executes your TradingView alerts as live orders on an Apex funded account. PickMyTrade receives the alert, validates it against your risk rules, and routes the order to Apex through a direct API connection in under 200ms — no VPS, no desktop app, and no code. It supports [N] concurrent Apex accounts, honors Apex's trailing drawdown and consistency rules, and costs a flat $50/month with a 5-day free trial."*

That block is self-contained, entity-anchored, statistic-bearing, and sits in the first 30% of the page where ~44% of citations originate. Template it once, populate per firm.

### 3. Mark up the 1,200 orphaned Q&A pairs on `/prop-firm-faq/*`
30 pages each render **43 visible `<details>` Q&A blocks but declare only 3 in `FAQPage` schema** — 6.9% coverage on the site's deepest content.

| Section | Visible Q&A | In schema | Unmarked |
|---------|-------------|-----------|----------|
| `/prop-firm-faq/*` (31 pages) | 1,290 | 90 | **1,200** |
| `/broker/*` (10 pages) | 87 | 68 | 19 |
| `/broker-faq/*` (10 pages) | 496 | 496 | ✅ 0 |

`/broker-faq/*` already does this correctly — extend the same generator to `/prop-firm-faq/*`. (Note: FAQ *rich results* are restricted to gov/health sites since 2023, so the win here is machine-readable Q&A extraction for LLMs, not a SERP feature.)

### 4. Expand FAQ answers from 32 to ~140 words
Across 1,418 schema answers: median **32 words**, 81% under 50, and only **40 answers** land in the 134–167 optimal band. Current answers are correct but too thin to satisfy a query on their own:

> *"Apex Trader Funding is a proprietary trading firm that provides funded trading accounts to traders who pass an evaluation process. See the firm's official website for current rules, plans, and payout policies."* (32 words)

Deferring to "the firm's official website" hands the citation to the competitor. Replace with the actual account sizes, profit targets, drawdown type, payout cadence, and PickMyTrade automation specifics — the unique data only you have.

### 5. Add comparison tables to the 181 pages that lack one
Content with multi-modal elements sees **156% higher selection rates**, and tables are the single most extractable format for AI answers.

- Tables present on only **31 of 212 pages (15%)**
- Video/iframe on only **5 of 212 (2%)** — despite an active YouTube channel already in `sameAs`
- Images: ✅ 212/212 pages, **100% with alt text** (zero violations — genuinely clean)

Every `/prop-firm-faq/*`, `/broker-faq/*`, and `/compare/*` page is inherently comparative and should carry a spec table (account sizes, drawdown type, profit split, payout cadence, platforms, PickMyTrade support status).

---

## 9. Schema Recommendations

**Current coverage is strong** — only 2 pages (`/404/`, `/pipe-help/`) have no structured data at all.

| Type | Pages |
|------|-------|
| BreadcrumbList | 201 |
| FAQPage | 191 |
| SoftwareApplication | 76 |
| WebPage | 65 |
| Organization | 35 |
| TechArticle | 19 |
| Article | 8 |
| ItemList | 7 |
| Service | 7 |
| CollectionPage | 4 |
| WebSite / VideoObject / ContactPage / Product | 1 each |

Zero JSON-LD parse errors across all 1,056 pages.

**Recommended additions:**

1. **`dateModified` on every `Article` / `TechArticle` / `WebPage` node** — see change #1. Currently missing on 201 pages.
2. **`author` beyond 26 pages** — only 12% of pages name an author. Add a `Person` node with `jobTitle`, `knowsAbout`, and `sameAs` → LinkedIn on all `/broker/*`, `/ai-ml/*`, and `/faq/*` content.
3. **Extend `sameAs`** with Reddit profile, Wikidata Q-ID, and (once notable) Wikipedia. These are the two highest-value missing entity links.
4. **`VideoObject`** on more than one page — you have a YouTube channel; embedding + marking up even 10 videos targets the 156% multi-modal lift.
5. **`HowTo`** on `/webhook-to-broker/` and the `/automation/*` setup sections — these are literally step-by-step procedures already using ordered `H3`s.
6. **`Product` + `Offer`** on `/pricing/` — currently one `Product` node sitewide; the flat $50/month plan should carry explicit `price`, `priceCurrency`, `priceValidUntil`.

---

## 10. Content Reformatting Suggestions

### Heading hierarchy: 66 pages skip H1 → H3
Consistent pattern across the `/automation/*` cluster — a "Quick Facts" card is marked `H3` and sits between the `H1` and the first `H2`:

```
H1: TradingView to Apex Trader Funding Automation
H3: Apex Trader Funding Quick Facts        ← skip
H2: How to Automate Trading on Apex Trader Funding
```

Promote it to `H2` (it is genuinely a top-level section, and "Quick Facts" is exactly the kind of block AI extracts). One template edit fixes all 66.

### Titles: 91 pages over 62 characters
Worst offenders truncate badly in SERPs and in AI-answer link labels:

| Page | Length |
|------|--------|
| `/ai-ml/advanced-guide/` | 90 |
| `/broker-faq/ib-faq/` | 83 |
| `/prop-firm-faq/apex-trader-funding/` | 79 |
| `/broker/tradingview-to-tradier/` | 79 |
| `/broker/tradingview-to-tradestation/` | 77 |

Also 4 pages under 30 chars (`/broker-faq/` at 24, `/prop-firm-faq/` at 27, `/legal/privacy/` at 28) — hub pages leaving keyword space unused.

### 18 pages have no question-based heading
Including `/pricing/`, `/broker/`, `/compare/`, `/copier/`, `/automation/`, and all 9 `/broker-faq/*` hub pages. Question headings match query patterns directly — `/pricing/` should carry "How much does PickMyTrade cost?" and "Is there a free trial?" as `H2`s.

### 5 pages under 800 words
`/pipe-help/` (586w), `/404/` (589w), `/broker/` (694w), `/page/contact/` (728w), `/pricing/` (779w). `/pricing/` is the commercially critical one — it is a high-intent AI query target ("how much is PickMyTrade") and currently has 779 words, no table, no question headings, and only 1 statistic in its first 30%.

---

## Build-Configuration Bugs Found

Three real issues in `public/_headers` that affect content freshness — worth fixing regardless of GEO:

1. **`/assets/*` applies `max-age=31536000, immutable` to real content pages.**
   `dist/assets/` mixes static images *and* HTML pages: `crypto.html`, `forex.html`, `futures.html`, `options.html`, `stocks.html`. Those 5 pages (×5 locales = **25 pages**) get a 1-year immutable cache. Content updates would be invisible to browsers and CDN edges for a year — a direct freshness penalty on exactly the axis AI Mode weights. Scope the rule to image extensions or move the asset-class pages out of `/assets/`.

2. **`/public/*` rule matches nothing.** Astro copies `public/` contents to the dist root; no `/public/` path exists in the build. Dead rule.

3. **`/*.html` short-cache rule matches almost nothing.** Pages are served at extensionless URLs (`/pricing`, not `/pricing.html`), so the intended 5-minute HTML cache never applies. Combined with #1, HTML caching is effectively unconfigured except where it is actively wrong.

Plus: `/llms-full.txt` headers point at a file that isn't generated, and `_astro/client.CpeL31wX.js` (194 KB) ships unreferenced.

---

## What's Already Right

Worth stating plainly, because it is a strong foundation and none of it needs touching:

- ✅ **1,056 pages built, 0 errors** with `astro check` type validation passing
- ✅ **100% static rendering, 0 hydrated islands** — perfect AI-crawler accessibility
- ✅ **14 AI crawlers explicitly allowed** in robots.txt
- ✅ **100% H1 coverage, exactly one H1 per page** — 0 violations across 212 pages
- ✅ **100% meta description coverage** — 0 missing
- ✅ **100% canonical coverage** — 0 missing
- ✅ **100% og:title coverage** — 0 missing
- ✅ **100% alt-text coverage** — 0 images without alt across the entire build
- ✅ **0 thin pages** — no page under 350 words
- ✅ **noindex/sitemap hygiene is exactly right** — 44 EN `/upcoming/*` + 404 pages are `noindex, follow` and correctly excluded from the sitemap; 19 untranslated locale pages are `noindex` and correctly have their hreflang alternates dropped rather than pointing crawlers at excluded URLs. Zero conflicts found.
- ✅ **hreflang on 100% of pages**, with `xhtml:link` alternates in the sitemap
- ✅ **Security headers** — HSTS with preload, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- ✅ **Zero JSON-LD parse errors** across 1,056 pages

---

## Priority Roadmap

| Effort | Action | Pages affected | Surface |
|--------|--------|----------------|---------|
| **S** | Enable `lastmod` in `@astrojs/sitemap` config | 760 URLs | AI Mode, AIO |
| **S** | Add `dateModified` to shared schema helper | 1,056 | AI Mode |
| **S** | Promote "Quick Facts" H3 → H2 in automation template | 66 | AIO |
| **S** | Trim 91 over-length titles to ≤60 chars | 91 | All |
| **S** | Fix `/assets/*` cache rule in `_headers` | 25 | AI Mode |
| **S** | Drop unreferenced React bundle + dead `_headers` rules | build | — |
| **M** | Front-load 120–160w definition on automation/copier templates | 71 | AIO, ChatGPT |
| **M** | Extend FAQPage generator to `/prop-firm-faq/*` | 30 (1,200 Q&As) | All |
| **M** | Expand FAQ answers 32w → ~140w | 1,418 answers | AIO, Perplexity |
| **M** | Add spec tables to prop-firm / broker / compare pages | ~50 | AIO |
| **M** | Add `Person` author schema + bios | ~180 | ChatGPT, AI Mode |
| **M** | Publish IndexNow key + ping on deploy | build | Bing Copilot |
| **L** | Create Wikidata entity; pursue Wikipedia notability | entity | ChatGPT |
| **L** | Build Reddit presence (r/FuturesTrading, r/Daytrading, r/propfirms) | entity | Perplexity, ChatGPT |
| **L** | Embed + mark up YouTube videos across key pages | ~30 | All |

**Projected score after the S+M tier: ~82/100.** The Wikipedia/Reddit entity work is what moves ChatGPT and Perplexity past 75, and it is the only part that cannot be shipped from this repo.
