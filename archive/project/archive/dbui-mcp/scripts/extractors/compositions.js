/**
 * Extractor: compositions
 *
 * Reads packages/dbui-shells/src/compositions/*.tsx and emits compositions.json.
 *
 * Status: STUB. Will activate once real composition .tsx files land
 * (PageHeader, ControlsBar, ListView, etc.). For each composition, extracts:
 *   - name (from filename / export)
 *   - JSDoc tags: @category, @useFor, @avoidFor, @synonyms, @figma,
 *                 @composition, @requiresShell
 *   - prop schema (variants, slots, props) via ts-morph (same approach as
 *                  dbui_explain_component)
 *
 * For now: writes an empty array to compositions.json so dependent tools
 * (build_structure, validate, render_*) can read the file without erroring.
 */
import fs from "node:fs"
import path from "node:path"
import { REPO, writeDataJson, resolveInputs } from "./_base.js"

export const id = "compositions"
export const inputs = [
  { path: "packages/dbui-shells/src/compositions/*.tsx", kind: "glob" },
]
export const outputs = ["compositions.json"]

export async function extract() {
  const files = resolveInputs(inputs)
  const compositions = files.map((abs) => {
    const name = path.basename(abs, ".tsx")
    return {
      name,
      sourceFile: path.relative(REPO, abs),
      // Stub: full schema extraction lands when first composition is shipped.
      category: null,
      useFor: null,
      avoidFor: null,
      synonyms: [],
      figma: null,
      requiresShell: null,
      schemaExtracted: false,
    }
  })
  writeDataJson("compositions.json", compositions)
  return {
    compositionsWritten: compositions.length,
    note:
      compositions.length === 0
        ? "No compositions yet. Drop .tsx files into packages/dbui-shells/src/compositions/ and re-run."
        : "Schema extraction (variants/slots/props) not yet wired — only names captured.",
  }
}
