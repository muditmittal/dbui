/**
 * Extractor: dbui-components-allowlist
 *
 * Pass-through copy of scripts/design-lint/dbui-components.json. This is the
 * allow-list of valid DBUI imports used by dbui_lint_react_snippet to detect
 * raw HTML or non-DBUI component usage.
 *
 * Future: derived from React source (every export from packages/dbui/src/components/**).
 * For now: hand-curated list at scripts/design-lint/dbui-components.json.
 */
import { readRepoFile, writeDataJson } from "./_base.js"

export const id = "dbui-components-allowlist"
export const inputs = [{ path: "scripts/design-lint/dbui-components.json", kind: "file" }]
export const outputs = ["dbui-components.json"]

export async function extract() {
  const data = JSON.parse(readRepoFile("scripts/design-lint/dbui-components.json"))
  writeDataJson("dbui-components.json", data)
  return {
    uiCount: (data.ui || []).length,
    shellsCount: (data.shells || []).length,
  }
}
