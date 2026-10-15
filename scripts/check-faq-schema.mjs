#!/usr/bin/env node
/**
 * Post-build assertion: every visible FAQ question is also in the page's
 * FAQPage schema.
 *
 * The /prop-firm-faq/* pages render 43 <details> Q&A blocks but previously
 * declared only 3 of them in JSON-LD. That gap was invisible — nothing failed,
 * the page just under-reported itself to machine readers. The schema is now
 * generated from the same translation keys the accordion renders, and this
 * script is what keeps the two in step: add a <details> block without extending
 * FAQ_SECTIONS and the build fails here rather than silently regressing.
 *
 * Run against dist/ after `astro build`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_astro') walk(p, out);
    } else if (entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function schemaQuestionCount(html) {
  let count = 0;
  for (const m of html.matchAll(
    /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    let parsed;
    try {
      parsed = JSON.parse(m[1]);
    } catch {
      return { count, parseError: true };
    }
    for (const node of [].concat(parsed['@graph'] ?? parsed)) {
      if (node && node['@type'] === 'FAQPage') {
        count += (node.mainEntity ?? []).length;
      }
    }
  }
  return { count, parseError: false };
}

if (!fs.existsSync(DIST)) {
  console.error('[faq-schema] dist/ not found — run `astro build` first.');
  process.exit(1);
}

const failures = [];
let checked = 0;
let parseErrors = 0;

for (const file of walk(DIST)) {
  const html = fs.readFileSync(file, 'utf8');
  const visible = (html.match(/<summary[\s>]/gi) || []).length;
  if (visible === 0) continue;

  const { count, parseError } = schemaQuestionCount(html);
  if (parseError) {
    parseErrors++;
    failures.push(`${path.relative(DIST, file)}: invalid JSON-LD`);
    continue;
  }

  checked++;
  if (count < visible) {
    failures.push(
      `${path.relative(DIST, file)}: ${visible} visible Q&A, ${count} in FAQPage schema (${visible - count} unmarked)`,
    );
  }
}

if (failures.length) {
  console.error(`[faq-schema] ${failures.length} page(s) with unmarked FAQ content:`);
  for (const f of failures.slice(0, 20)) console.error(`  ${f}`);
  if (failures.length > 20) console.error(`  ...and ${failures.length - 20} more`);
  process.exit(1);
}

console.log(
  `[faq-schema] OK — ${checked} page(s) with visible FAQ accordions are fully marked up` +
    (parseErrors ? ` (${parseErrors} JSON-LD parse errors)` : ''),
);
