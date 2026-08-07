#!/usr/bin/env node
/**
 * verify-rules — proves every react-lint rule still fires, and still does not.
 *
 * Two assertions per rule, against the fixture pair in __fixtures__:
 *
 *   1. it reports at least once on violations.tsx / violations.ts
 *   2. it reports nothing on clean.tsx
 *
 * Both halves matter and both have failed in this repo without anyone noticing.
 * off-scale-spacing read only bracket values, so it watched 64 six-pixel sites
 * land and said nothing. off-ramp-line-height compared against a field name the
 * generator does not emit, so it fired on all 27 correct line heights and
 * printed `13/undefined` as its advice. A linter that never fires and a linter
 * that always fires look the same from the outside — like a clean report and a
 * long one — which is why neither was caught by reading the output.
 *
 * The rule list is not written down here. It is read out of the linter's own
 * source, so adding a rule without a fixture fails this check rather than
 * quietly shipping untested.
 *
 * Usage:  node scripts/design-lint/verify-rules.mjs
 */
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LINTER = path.join(__dirname, "react-lint.js")
const FIXTURES = path.join(__dirname, "__fixtures__")

const run = (...files) => {
  const res = execFileSync(process.execPath, [LINTER, ...files, "--json"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  return JSON.parse(res)
}

// Every rule the linter declares, taken from its source rather than from a list
// kept here. A second list is a second thing to forget to update.
const source = fs.readFileSync(LINTER, "utf8")
const declared = [...new Set([...source.matchAll(/rule: "([a-z-]+)"/g)].map((m) => m[1]))]
// off-scale-spacing and off-scale-size are emitted through one table, so they
// carry no literal `rule:` string.
for (const name of Object.values(JSON.parse(
  source.match(/const OFF_SCALE_RULE = (\{[^}]+\})/)[1].replace(/(\w+):/g, '"$1":')
))) {
  if (!declared.includes(name)) declared.push(name)
}
declared.sort()

const fired = new Set(
  run(path.join(FIXTURES, "violations.tsx"), path.join(FIXTURES, "violations.ts")).map((v) => v.rule)
)
const onClean = run(path.join(FIXTURES, "clean.tsx"))

let failures = 0
const fail = (msg) => { failures++; console.log(`  FAIL  ${msg}`) }

console.log(`${declared.length} rules declared.\n`)
console.log("Fires on a planted violation")
for (const rule of declared) {
  if (fired.has(rule)) console.log(`  ok    ${rule}`)
  else fail(`${rule} — nothing in __fixtures__/violations.* triggers it`)
}

console.log("\nSilent on the correct form")
if (onClean.length === 0) console.log("  ok    clean.tsx reports nothing")
else for (const v of onClean) fail(`${v.rule} fired on clean.tsx:${v.line} — ${v.message}`)

console.log(`\n${failures === 0 ? "PASS" : `FAIL — ${failures} problem(s)`}`)
process.exit(failures === 0 ? 0 : 1)
