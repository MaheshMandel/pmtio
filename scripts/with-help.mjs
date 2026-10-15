#!/usr/bin/env node
// Cross-platform wrapper: run an npm script with the private help pages enabled.
//   node scripts/with-help.mjs build   ->  HELP_PAGES=1 npm run build
import { spawnSync } from "node:child_process";

const script = process.argv[2];
if (!script) {
  console.error("usage: node scripts/with-help.mjs <npm-script>");
  process.exit(1);
}
const r = spawnSync("npm", ["run", script], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, HELP_PAGES: "1" },
});
process.exit(r.status ?? 1);
