/**
 * Extractor: tokens
 *
 * Reads packages/dbui/src/tokens/globals.css and emits:
 *   - tokens.json       — copy of design-lint's structured token data
 *   - hex-tokens.json   — flat { light: { name: "#HEX" }, dark: { ... } }
 *
 * Sources (all of which trigger regen):
 *   - packages/dbui/src/tokens/globals.css     (canonical)
 *   - scripts/design-lint/tokens.json          (structured token data, hand-curated)
 */
import { readRepoFile, writeDataJson } from "./_base.js"

export const id = "tokens"
export const inputs = [
  { path: "packages/dbui/src/tokens/globals.css", kind: "file" },
  { path: "scripts/design-lint/tokens.json", kind: "file" },
]
export const outputs = ["tokens.json", "hex-tokens.json"]

export async function extract() {
  // Pass through the structured token catalog.
  const tokens = JSON.parse(readRepoFile("scripts/design-lint/tokens.json"))
  writeDataJson("tokens.json", tokens)

  // Build hex map by parsing globals.css.
  const css = readRepoFile("packages/dbui/src/tokens/globals.css")
  const map = { light: {}, dark: {} }
  const lightMatch = css.match(/:root\s*\{([\s\S]+?)^\}/m)
  const darkMatch = css.match(/\.dark\s*\{([\s\S]+?)^\}/m)
  for (const [mode, block] of [
    ["light", lightMatch?.[1] || ""],
    ["dark", darkMatch?.[1] || ""],
  ]) {
    for (const line of block.split("\n")) {
      const m = line.match(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{3,8})\s*;/)
      if (m) map[mode][m[1]] = m[2].toUpperCase()
    }
  }
  writeDataJson("hex-tokens.json", map)

  return {
    sectionsWritten: Object.keys(tokens).length,
    lightHex: Object.keys(map.light).length,
    darkHex: Object.keys(map.dark).length,
  }
}
