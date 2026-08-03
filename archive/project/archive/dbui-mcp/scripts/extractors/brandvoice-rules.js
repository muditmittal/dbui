/**
 * Extractor: brandvoice-rules
 *
 * Reads packages/dbui/docs/brandvoice.md and extracts structured rules
 * for dbui_check_copy. Currently the lint logic in check-copy.js has the
 * rules hardcoded. This extractor will let us move them to data so the
 * markdown stays the human-facing source of truth and the JSON is the
 * machine-facing extract.
 *
 * Status: STUB — emits a small marker file so consumers can detect that
 * the structured form exists.
 */
import { readRepoFile, writeDataJson } from "./_base.js"

export const id = "brandvoice-rules"
export const inputs = [{ path: "packages/dbui/docs/brandvoice.md", kind: "file" }]
export const outputs = ["brandvoice-rules.json"]

export async function extract() {
  const md = readRepoFile("packages/dbui/docs/brandvoice.md")
  // Stub: surface counts only. Real parser extracts banned words, surface-specific
  // rules (tooltip ≤ 8 words, button label = verb, etc.), and emits structured rules.
  const lineCount = md.split("\n").length
  writeDataJson("brandvoice-rules.json", {
    sourceLines: lineCount,
    extractedRules: [],
    note: "Stub. Active rules currently live inline in src/tools/check-copy.js.",
  })
  return {
    sourceLines: lineCount,
    note: "Stub — see source comment.",
  }
}
