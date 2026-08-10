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

/**
 * `--json` returns an envelope — `{ surface, summary, violations, byObject }` —
 * because a consolidated report needs the grouping alongside the list. This
 * reads the `violations` array out of it, and still accepts the bare array the
 * linter used to print, so the check does not depend on which shape it gets.
 */
const run = (...files) => {
  const res = execFileSync(process.execPath, [LINTER, ...files, "--json"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
  const parsed = JSON.parse(res)
  return Array.isArray(parsed) ? parsed : parsed.violations
}

/*
 * Every rule the linter declares, taken from its source rather than from a list
 * kept here. A second list is a second thing to forget to update.
 *
 * Three sources, unioned, because a rule can reach the report three ways and
 * each was a blind spot at some point:
 *
 *   1. a literal `rule: "name"` at an emit site
 *   2. a value in OFF_SCALE_RULE, which routes two rules through one table
 *   3. a key in RULE_SCHEMA
 *
 * (3) is what catches a rule emitted through a helper — the a11y checks pass
 * their name as an argument, so no literal `rule:` string exists for them and
 * the first two patterns saw nothing. Five rules were live and unverified, and
 * this file reported PASS over them.
 *
 * Unioning also closes the loop in both directions: a rule that emits without a
 * schema entry fails the classification check, and a rule in the schema that
 * never fires fails the fixture check. Neither can hide behind the other.
 */
const source = fs.readFileSync(LINTER, "utf8")
const declared = [...new Set([...source.matchAll(/rule: "([a-z0-9-]+)"/g)].map((m) => m[1]))]
for (const name of Object.values(JSON.parse(
  source.match(/const OFF_SCALE_RULE = (\{[^}]+\})/)[1].replace(/(\w+):/g, '"$1":')
))) {
  if (!declared.includes(name)) declared.push(name)
}
for (const m of source.matchAll(/^\s*"([a-z0-9-]+)":\s*\{\s*family:/gm)) {
  if (!declared.includes(m[1])) declared.push(m[1])
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

/**
 * Every rule classifies into the schema the report groups on.
 *
 * Without this, a rule added tomorrow falls through `RULE_SCHEMA` to its
 * defaults — `property` becomes the rule's own name and `verdict` becomes
 * `off-set` — and nothing says so. It would group as its own property forever,
 * which is precisely the flat rule list the schema exists to replace, arriving
 * back one rule at a time.
 */
const schemaKeys = new Set(
  [...source.matchAll(/^\s*"([a-z0-9-]+)":\s*\{\s*family:/gm)].map((m) => m[1])
)
console.log("\nClassified into the finding schema")
for (const rule of declared) {
  if (schemaKeys.has(rule)) console.log(`  ok    ${rule}`)
  else fail(`${rule} — no RULE_SCHEMA entry, so it has no property or verdict`)
}

/** The verdicts a consolidated report knows how to read. */
const VERDICTS = new Set([
  "off-set", "unnamed", "unreachable", "stale", "conflict", "incomplete",
  "missing", "misordered",
])
const badVerdicts = [...new Set(
  [...source.matchAll(/verdict:\s*"([a-z-]+)"/g)].map((m) => m[1])
)].filter((v) => !VERDICTS.has(v))
if (badVerdicts.length) fail(`unknown verdict(s): ${badVerdicts.join(", ")}`)

console.log(`\n${failures === 0 ? "PASS" : `FAIL — ${failures} problem(s)`}`)
process.exit(failures === 0 ? 0 : 1)
