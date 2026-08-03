/**
 * Extractor: rules
 *
 * Reads packages/dbui/src/rules/composition-rules.ts and emits
 * packages/dbui-mcp/src/data/rules.json.
 *
 * The .ts file is parsed with a simple regex (object-literal entries like
 * `{ id: "...", component: "...", rule: "...", rationale: "...", severity: "error|warning" }`).
 * No real TS parser needed — the file is hand-edited and follows a strict shape.
 */
import { readRepoFile, writeDataJson } from "./_base.js"

export const id = "rules"
export const inputs = [{ path: "packages/dbui/src/rules/composition-rules.ts", kind: "file" }]
export const outputs = ["rules.json"]

const RULE_RE =
  /\{\s*id:\s*"([^"]+)",\s*component:\s*"([^"]+)",\s*rule:\s*"([^"]+)",\s*rationale:\s*"([^"]+)",\s*severity:\s*"(error|warning)"/g

export async function extract() {
  const src = readRepoFile("packages/dbui/src/rules/composition-rules.ts")
  const rules = []
  let m
  while ((m = RULE_RE.exec(src))) {
    rules.push({
      id: m[1],
      component: m[2],
      rule: m[3],
      rationale: m[4],
      severity: m[5],
    })
  }
  writeDataJson("rules.json", rules)
  return { rulesWritten: rules.length }
}
