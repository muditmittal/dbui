/**
 * Extractor: figma-mapping
 *
 * Cross-checks Figma layer + variant names against React component + prop
 * names. Output is figma-mapping.json — the canonical Figma ↔ React map
 * consumed by dbui_render_figma (variant property name translation) and
 * future drift-check (renames in either system fail the build).
 *
 * Status: STUB — requires Figma API access. The orchestrator skips this
 * extractor unless a FIGMA_FILE_KEY env variable is set, and writes an
 * empty mapping otherwise.
 *
 * When activated, reads the Figma file via the Plugin API metadata, walks
 * the Components page, and emits:
 *   {
 *     "Button": {
 *       "figmaName": "Button",
 *       "componentKey": "<sha>",
 *       "variantProps": { "variant": "Variant", "size": "Size" },
 *       "variantValues": { "variant": { "default": "Default", ... }, ... }
 *     }
 *   }
 */
import { writeDataJson } from "./_base.js"

export const id = "figma-mapping"
export const inputs = [
  // No L1 file inputs — input is the live Figma file. We hash an env var
  // instead so changes to the file key invalidate the cached mapping.
  { path: ".env-FIGMA_FILE_KEY", kind: "file" },
]
export const outputs = ["figma-mapping.json"]

export async function extract() {
  const fileKey = process.env.FIGMA_FILE_KEY
  if (!fileKey) {
    writeDataJson("figma-mapping.json", {
      generatedAt: new Date().toISOString(),
      fileKey: null,
      mapping: {},
      note: "Stub. Set FIGMA_FILE_KEY env var and wire actual Figma API extraction to populate.",
    })
    return { skipped: true, reason: "FIGMA_FILE_KEY not set" }
  }
  // Real implementation: fetch Figma file metadata, walk components, build mapping.
  // Deferred until we wire either:
  //   - direct Figma REST API + token, OR
  //   - use_figma round-trip via the MCP itself (preferred for consistency)
  writeDataJson("figma-mapping.json", {
    generatedAt: new Date().toISOString(),
    fileKey,
    mapping: {},
    note: "Stub. FIGMA_FILE_KEY is set, but extraction logic is not yet implemented.",
  })
  return { skipped: false, reason: "extraction logic not implemented" }
}
