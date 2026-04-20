#!/usr/bin/env node
/**
 * generate-icons.mjs — Rebuild DBUI icon .tsx files from Universe SVG data
 *
 * Reads: /tmp/universe-icons-raw.txt (from sync-icons.sh)
 * Reads: packages/dbui/src/components/icons/classifications.ts
 * Reads: packages/dbui/src/components/icons/descriptions.ts
 * Writes: packages/dbui/src/components/icons/*.tsx
 *
 * Usage: node scripts/generate-icons.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync } from "fs"
import { join } from "path"

const DRY_RUN = process.argv.includes("--dry-run")
const ICONS_DIR = "packages/dbui/src/components/icons"
const RAW_FILE = "/tmp/universe-icons-raw.txt"

// ── Name mapping: Universe → DBUI ──
const UNIVERSE_TO_DBUI = {
  Dag: "DAG",
  DagHorizontal: "DAGHorizontal",
  DagVertical: "DAGVertical",
  Erd: "ERD",
  Mcp: "MCP",
  BlockQuote: "Blockquote",
  UserKey: "UserKey",
  DomainCirclesThree: "DomainCirclesThree",
  ZoomMarqueeSelection: "ZoomMarqueeSelection",
}

// DBUI-only icons — skip during sync
const DBUI_ONLY = new Set([
  "CircleSmall",
  "Databricks",
  "DotsCircleSmall",
  "RunningSmall",
  "Slash",
  "UserOutline",
])

// ── Parse metadata files ──
function parseDescriptions() {
  const src = readFileSync(join(ICONS_DIR, "descriptions.ts"), "utf8")
  const map = {}
  for (const match of src.matchAll(/"(\w+)":\s*"([^"]+)"/g)) {
    map[match[1]] = match[2]
  }
  return map
}

function parseClassifications() {
  const src = readFileSync(join(ICONS_DIR, "classifications.ts"), "utf8")
  const map = {}
  for (const match of src.matchAll(/"(\w+)":\s*"(\w+)"/g)) {
    map[match[1]] = match[2]
  }
  return map
}

// ── Parse Universe icon data ──
function parseUniverseIcons() {
  const raw = readFileSync(RAW_FILE, "utf8")
  const icons = []
  const blocks = raw.split("===ICON_START===").slice(1)

  for (const block of blocks) {
    const nameMatch = block.match(/NAME:(.+)/)
    const viewboxMatch = block.match(/VIEWBOX:(.+)/)
    const contentMatch = block.match(/CONTENT_START\n([\s\S]*?)\nCONTENT_END/)

    if (!nameMatch || !contentMatch) continue

    let name = nameMatch[1].trim()
    // Remove any stale .tsx suffix and extra Icon suffixes
    name = name.replace(/\.tsx$/, "")
    // Handle double-Icon suffix (e.g., UserKeyIconIcon → UserKeyIcon → UserKey)
    while (name.endsWith("Icon")) {
      name = name.slice(0, -4)
    }

    const viewBox = viewboxMatch ? viewboxMatch[1].trim() : "0 0 16 16"
    let content = contentMatch[1]

    // Apply name mapping
    const dbuiName = UNIVERSE_TO_DBUI[name] || name

    icons.push({ universeName: name, dbuiName, viewBox, content })
  }
  return icons
}

// ── Generate DBUI icon file ──
function generateIconFile(name, svgContent, viewBox, classification, description) {
  // Build JSDoc comment
  let jsdoc = ""
  if (classification && description) {
    jsdoc = `/** use:${classification} ${description} */\n`
  } else if (classification) {
    jsdoc = `/** use:${classification} ${name} */\n`
  }

  // Indent SVG content consistently (6 spaces for inside the svg tag)
  const lines = svgContent.split("\n")
  const trimmedContent = lines
    .map((l) => l.trimEnd())
    .filter((l) => l.length > 0)
    .map((l) => {
      // Normalize indentation to 6 spaces
      const stripped = l.replace(/^\s+/, "")
      return `      ${stripped}`
    })
    .join("\n")

  return `import { forwardRef } from "react"

${jsdoc}const ${name} = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">
${trimmedContent}
    </svg>
  )
)
${name}.displayName = "${name}"
export { ${name} }
`
}

// ── Main ──
function main() {
  console.log(DRY_RUN ? "=== DRY RUN ===" : "=== Generating DBUI icons ===")

  const descriptions = parseDescriptions()
  const classifications = parseClassifications()
  const universeIcons = parseUniverseIcons()

  console.log(`Loaded ${Object.keys(descriptions).length} descriptions`)
  console.log(`Loaded ${Object.keys(classifications).length} classifications`)
  console.log(`Parsed ${universeIcons.length} Universe icons`)

  let updated = 0
  let skipped = 0
  let newIcons = 0
  const missingMetadata = []

  for (const icon of universeIcons) {
    const { dbuiName, viewBox, content } = icon

    const classification = classifications[dbuiName]
    const description = descriptions[dbuiName]

    if (!classification || !description) {
      missingMetadata.push(dbuiName)
    }

    const fileContent = generateIconFile(
      dbuiName,
      content,
      viewBox,
      classification,
      description
    )

    const filePath = join(ICONS_DIR, `${dbuiName}.tsx`)

    if (DRY_RUN) {
      // Check if file exists
      try {
        readFileSync(filePath)
        updated++
      } catch {
        newIcons++
        console.log(`  NEW: ${dbuiName}`)
      }
    } else {
      try {
        readFileSync(filePath)
        updated++
      } catch {
        newIcons++
        console.log(`  NEW: ${dbuiName}`)
      }
      writeFileSync(filePath, fileContent)
    }
  }

  // Check for DBUI-only icons
  const existingFiles = readdirSync(ICONS_DIR)
    .filter((f) => f.endsWith(".tsx") && !f.includes("figma") && !f.includes("descriptions") && !f.includes("classifications") && !f.includes("entity-icons"))
    .map((f) => f.replace(".tsx", ""))

  const universeNames = new Set(universeIcons.map((i) => i.dbuiName))
  const dbuiOnly = existingFiles.filter((f) => !universeNames.has(f))

  console.log(`\n=== Summary ===`)
  console.log(`Updated: ${updated}`)
  console.log(`New icons: ${newIcons}`)
  console.log(`DBUI-only (untouched): ${dbuiOnly.length} — ${dbuiOnly.join(", ")}`)

  if (missingMetadata.length > 0) {
    console.log(`\n⚠️  Missing metadata (${missingMetadata.length}):`)
    for (const name of missingMetadata) {
      console.log(`  ${name} — add to classifications.ts and descriptions.ts`)
    }
  }

  if (!DRY_RUN) {
    console.log(`\nDone. Run 'npx tsc --noEmit' to verify.`)
  }
}

main()
