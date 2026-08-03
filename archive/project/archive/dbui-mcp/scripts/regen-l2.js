#!/usr/bin/env node
/**
 * regen-l2 — modular L2 regenerator
 *
 * Runs only the extractors whose inputs changed since the last manifest entry.
 * Surgical: change one icon, only icons.json regenerates. Change a token,
 * only tokens.json + hex-tokens.json regenerate.
 *
 * Usage:
 *   node scripts/regen-l2.js                  # detect changes, run affected
 *   node scripts/regen-l2.js --all            # force full regen
 *   node scripts/regen-l2.js --extractor X    # run a single extractor by id
 *   node scripts/regen-l2.js --check          # dry-run: list what would regen
 *   node scripts/regen-l2.js --list           # list registered extractors
 *
 * Each extractor in scripts/extractors/ declares its `id`, `inputs`, `outputs`,
 * and an `extract()` function. The orchestrator hashes inputs, compares to
 * scripts/_manifest.json, runs only those whose inputs changed, then updates
 * the manifest with new input + output hashes.
 *
 * Renames (e.g. Button → PrimaryButton) are out of scope for surgical regen.
 * If you rename a component, run `regen-l2 --all` once to fully resync.
 */
import {
  readManifest,
  writeManifest,
  inputsChanged,
  updateManifestForExtractor,
  resolveInputs,
} from "./extractors/_base.js"

import * as tokens from "./extractors/tokens.js"
import * as icons from "./extractors/icons.js"
import * as components from "./extractors/components.js"
import * as rules from "./extractors/rules.js"
import * as dbuiComponentsAllowlist from "./extractors/dbui-components-allowlist.js"
import * as compositions from "./extractors/compositions.js"
import * as shells from "./extractors/shells.js"
import * as componentSchemas from "./extractors/component-schemas.js"
import * as brandvoiceRules from "./extractors/brandvoice-rules.js"
import * as figmaMapping from "./extractors/figma-mapping.js"

const REGISTRY = [
  tokens,
  icons,
  components,
  rules,
  dbuiComponentsAllowlist,
  compositions,
  shells,
  componentSchemas,
  brandvoiceRules,
  figmaMapping,
]

function parseArgs(argv) {
  const args = { all: false, check: false, list: false, extractor: null }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--all") args.all = true
    else if (a === "--check") args.check = true
    else if (a === "--list") args.list = true
    else if (a === "--extractor") args.extractor = argv[++i]
    else if (a === "--help" || a === "-h") args.help = true
  }
  return args
}

function help() {
  console.log(`regen-l2 — modular L2 regenerator

Usage:
  node scripts/regen-l2.js                  detect changes, run affected
  node scripts/regen-l2.js --all            force full regen
  node scripts/regen-l2.js --extractor <id> run a single extractor
  node scripts/regen-l2.js --check          dry-run: list what would regen
  node scripts/regen-l2.js --list           list registered extractors

Registered extractors:
${REGISTRY.map((e) => `  - ${e.id.padEnd(28)} ${e.outputs.join(", ")}`).join("\n")}
`)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    help()
    return
  }

  if (args.list) {
    console.log("Registered extractors:\n")
    for (const e of REGISTRY) {
      const inputCount = resolveInputs(e.inputs).length
      console.log(`  ${e.id}`)
      console.log(`    inputs:   ${inputCount} file(s) matching ${e.inputs.map((i) => i.path).join(", ")}`)
      console.log(`    outputs:  ${e.outputs.join(", ")}`)
    }
    return
  }

  const manifest = readManifest()
  const toRun = []
  const skipped = []

  // Decide which extractors to run.
  for (const extractor of REGISTRY) {
    if (args.extractor && extractor.id !== args.extractor) {
      continue
    }
    const changed = inputsChanged(extractor, manifest)
    if (args.all || args.extractor || changed) {
      toRun.push({ extractor, reason: args.all ? "--all" : args.extractor ? "--extractor" : "inputs changed" })
    } else {
      skipped.push(extractor.id)
    }
  }

  if (args.check) {
    console.log(`Would run ${toRun.length} extractor(s):`)
    for (const { extractor, reason } of toRun) {
      console.log(`  ✓ ${extractor.id.padEnd(28)} (${reason}) → ${extractor.outputs.join(", ")}`)
    }
    if (skipped.length > 0) {
      console.log(`\nWould skip ${skipped.length} extractor(s):`)
      for (const id of skipped) {
        console.log(`  - ${id} (no input changes)`)
      }
    }
    return
  }

  if (toRun.length === 0) {
    console.log("Everything up-to-date. No extractors needed to run.")
    return
  }

  // Run extractors.
  let failures = 0
  for (const { extractor, reason } of toRun) {
    process.stdout.write(`▸ ${extractor.id} (${reason}) ... `)
    try {
      const result = await extractor.extract()
      updateManifestForExtractor(manifest, extractor)
      const summary = Object.entries(result || {})
        .filter(([k]) => k !== "note")
        .map(([k, v]) => `${k}=${typeof v === "object" ? JSON.stringify(v) : v}`)
        .join(", ")
      console.log(`OK${summary ? "  [" + summary + "]" : ""}`)
      if (result?.note) console.log(`  note: ${result.note}`)
    } catch (e) {
      failures++
      console.log(`FAILED`)
      console.error(`  ${e.message}`)
      console.error(e.stack)
    }
  }

  writeManifest(manifest)

  console.log(
    `\nDone. ${toRun.length - failures} extractor(s) ran, ${failures} failed. Manifest updated at scripts/_manifest.json.`
  )
  if (skipped.length > 0) {
    console.log(`Skipped (no input changes): ${skipped.join(", ")}.`)
  }
  if (failures > 0) process.exit(1)
}

main().catch((e) => {
  console.error("Fatal:", e)
  process.exit(1)
})
