/**
 * Extractor: component-schemas
 *
 * Walks packages/dbui/src/components/ui/*.tsx (and any sibling *-variants.ts files)
 * and emits per-component variant + prop + slot schemas. Used by
 * dbui_explain_component, dbui_render_figma (for variant property mapping),
 * and dbui_render_react (for prop type validation).
 *
 * Status: STUB — current `dbui_explain_component` does this lazily on each call.
 * This extractor pre-bakes the same data into component-schemas.json so
 * downstream tools don't need to re-parse on every call.
 *
 * To activate, copy the extraction logic from
 * packages/dbui-mcp/src/tools/explain-component.js (extractCvaVariants +
 * extractProps) and run it across every .tsx in components/ui.
 */
import path from "node:path"
import { REPO, writeDataJson, resolveInputs } from "./_base.js"

export const id = "component-schemas"
export const inputs = [
  { path: "packages/dbui/src/components/ui/*.tsx", kind: "glob" },
  { path: "packages/dbui/src/lib/*-variants.ts", kind: "glob" },
]
export const outputs = ["component-schemas.json"]

export async function extract() {
  const files = resolveInputs(inputs)
  // Stub: emit per-file placeholder. Real extraction reuses the logic in
  // explain-component.js and is wired in once compositions stabilize.
  const schemas = files
    .filter((f) => f.endsWith(".tsx"))
    .map((abs) => ({
      name: path.basename(abs, ".tsx"),
      sourceFile: path.relative(REPO, abs),
      schemaExtracted: false,
    }))
  writeDataJson("component-schemas.json", schemas)
  return {
    schemasWritten: schemas.length,
    note:
      "Stub. dbui_explain_component still extracts on-demand. Wire ts-morph extraction here when ready to pre-bake.",
  }
}
