/**
 * Extractor: shells
 *
 * Reads packages/dbui-shells/src/shells/*.tsx and emits shells.json.
 *
 * Currently: Base.tsx, CatalogExplorer.tsx. Will grow as the user adds
 * BrowserShell, HeroLanding, ListPage, GovHub, Discover, Workspace, etc.
 *
 * Output entries match the shape that build-structure / validate / spec.js
 * expect — `name` is the canonical type, `componentName` is the React export,
 * `importPath` is the consumer-facing import.
 */
import fs from "node:fs"
import path from "node:path"
import { REPO, writeDataJson, resolveInputs } from "./_base.js"

export const id = "shells"
export const inputs = [{ path: "packages/dbui-shells/src/shells/*.tsx", kind: "glob" }]
export const outputs = ["shells.json"]

// Map filename → canonical Spec.shell name. Add new shells here as they land.
const NAME_MAP = {
  Base: "BaseShell",
  CatalogExplorer: "CatalogLayout",
  // Future: BrowserShell, HeroLanding, ListPage, GovHub, Discover, Workspace, etc.
}

// Some shells export a different React name than their canonical Spec name
// (e.g. Base.tsx exports `Base`, but the Spec.shell value is "BaseShell").
const REACT_EXPORT_MAP = {
  Base: "Base",
  CatalogExplorer: "CatalogLayout",
}

export async function extract() {
  const files = resolveInputs(inputs)
  const shells = files.map((abs) => {
    const filename = path.basename(abs, ".tsx")
    const canonicalName = NAME_MAP[filename] || filename
    const reactExport = REACT_EXPORT_MAP[filename] || filename
    return {
      name: canonicalName,
      reactExport,
      sourceFile: path.relative(REPO, abs),
      importPath: "@muditmittal/dbui-shells",
      // Schema extraction lands later (variants/props/slots via ts-morph).
      schemaExtracted: false,
    }
  })
  writeDataJson("shells.json", shells)
  return {
    shellsWritten: shells.length,
    canonicalNames: shells.map((s) => s.name),
  }
}
