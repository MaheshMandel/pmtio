/**
 * Astro integration: mirror every visible FAQ accordion into FAQPage JSON-LD.
 *
 * Why derive this from the built HTML instead of authoring it per page
 * ───────────────────────────────────────────────────────────────────
 * Several pages already hand-wrote a FAQPage block alongside a hand-written
 * <details> accordion, with a comment claiming the two matched "1:1". They had
 * silently drifted: /broker/tradingview-to-tradestation shipped 23 visible Q&A
 * pairs and 5 in schema, tradelocker 29 vs 13, projectx 15 vs 11. Nothing failed
 * — the pages just under-reported themselves to machine readers.
 *
 * Re-authoring those arrays by hand would only reset the clock on the same
 * drift, and the answers are assembled from as many as eleven separate i18n
 * fragment keys per block, so a frontmatter version would be fragile as well as
 * duplicative.
 *
 * Reading the rendered DOM makes the visible copy the single source of truth by
 * construction: the schema cannot disagree with the page because it is
 * extracted FROM the page, after localisation, for all five locales at once.
 *
 * Behaviour
 *   - Only ADDS questions. Anything already declared is left untouched, so
 *     hand-tuned entries and their wording survive.
 *   - Only accepts summaries that actually read as questions (see isQuestion),
 *     so a non-FAQ <details> used as a disclosure widget is not mislabelled.
 *   - Merges into the page's existing FAQPage node when there is one, otherwise
 *     emits a new one — a page never ends up with two competing FAQPage nodes.
 *
 * scripts/check-faq-schema.mjs asserts the result over dist/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MIN_ANSWER_CHARS = 25;

function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** Visible text of an HTML fragment, with icon-only elements dropped. */
function textOf(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<i\b[^>]*><\/i>/gi, ' ') // Font Awesome icon elements carry no text
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}

const normalise = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * A <details> summary counts as an FAQ question only if it reads like one.
 * Accordions are also used for plain disclosure ("Show supported symbols"), and
 * marking those up as Questions would be inaccurate structured data.
 */
function isQuestion(text) {
  if (text.endsWith('?')) return true;
  return /^(what|how|why|when|where|who|which|can|could|do|does|did|is|are|was|were|will|would|should|must|may|am)\b/i.test(
    text,
  );
}

/** Extract {question, answer} for every <details> block in the document. */
function extractPairs(html) {
  const pairs = [];
  // <details> blocks here never nest, so a non-greedy match is sufficient and
  // avoids pulling a real HTML parser into the build.
  for (const block of html.matchAll(/<details\b[\s\S]*?<\/details>/gi)) {
    const frag = block[0];
    const summary = frag.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!summary) continue;

    const question = textOf(summary[1]);
    if (!question || !isQuestion(question)) continue;

    const answer = textOf(frag.slice(frag.indexOf('</summary>') + '</summary>'.length));
    if (answer.length < MIN_ANSWER_CHARS) continue;

    pairs.push({ question, answer });
  }
  return pairs;
}

/** JSON that is safe to inline inside a <script> element. */
function inlineJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function processFile(file) {
  const html = fs.readFileSync(file, 'utf8');
  const pairs = extractPairs(html);
  if (!pairs.length) return false;

  // Locate an existing FAQPage node so we extend rather than compete with it.
  let target = null;
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch {
      continue;
    }
    const nodes = [].concat(parsed['@graph'] ?? parsed);
    const faq = nodes.find((n) => n && n['@type'] === 'FAQPage');
    if (faq) {
      target = { match: m, parsed, faq };
      break;
    }
  }

  const declared = new Set(
    (target?.faq.mainEntity ?? []).map((q) => normalise(String(q?.name ?? ''))),
  );

  const additions = [];
  const seen = new Set(declared);
  for (const { question, answer } of pairs) {
    const key = normalise(question);
    if (seen.has(key)) continue; // already declared, or a duplicate on the page
    seen.add(key);
    additions.push({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    });
  }
  if (!additions.length) return false;

  let out;
  if (target) {
    target.faq.mainEntity = [...(target.faq.mainEntity ?? []), ...additions];
    out =
      html.slice(0, target.match.index) +
      target.match[0].replace(target.match[1], inlineJson(target.parsed)) +
      html.slice(target.match.index + target.match[0].length);
  } else {
    const node = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: additions,
    };
    const tag = `<script type="application/ld+json">${inlineJson(node)}</script>`;
    if (!html.includes('</head>')) return false;
    out = html.replace('</head>', `${tag}</head>`);
  }

  fs.writeFileSync(file, out);
  return true;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_astro') walk(p, out);
    } else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

export default function faqSchema() {
  return {
    name: 'pickmytrade:faq-schema',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        // fileURLToPath, not dir.pathname — the project path contains a space,
        // which arrives percent-encoded in the URL and breaks fs on Windows.
        const root = fileURLToPath(dir);
        let updated = 0;
        for (const file of walk(root)) {
          if (processFile(file)) updated++;
        }
        logger.info(`mirrored visible FAQ accordions into JSON-LD on ${updated} page(s)`);
      },
    },
  };
}
