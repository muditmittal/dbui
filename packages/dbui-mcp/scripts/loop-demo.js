/**
 * End-to-end demo: simulate what an agent would do during code generation.
 *
 * 1. Agent generates a UI snippet (with mistakes)
 * 2. Lints with dbui_lint_react_snippet
 * 3. For each violation, calls the suggested resolver tool
 * 4. Builds the corrected snippet
 *
 * This script proves the self-correction loop works without an actual LLM —
 * just deterministic chaining.
 */
import * as resolveIcon from "../src/tools/resolve-icon.js"
import * as resolveComponent from "../src/tools/resolve-component.js"
import * as resolveToken from "../src/tools/resolve-token.js"
import * as lintReactSnippet from "../src/tools/lint-react-snippet.js"

const snippet = `import { Trash, ChevronDown } from "lucide-react"

export function DangerZone() {
  return (
    <div className="bg-[#16A34A] p-[7px] gap-[5px]" style={{ color: "#FF0000" }}>
      <button className="text-sm">Delete forever</button>
    </div>
  )
}`

console.log("═══════════════════════════════════════════════════════════════")
console.log("  STEP 1 — agent generated this snippet:")
console.log("═══════════════════════════════════════════════════════════════")
console.log(snippet)

console.log("\n═══════════════════════════════════════════════════════════════")
console.log("  STEP 2 — lint")
console.log("═══════════════════════════════════════════════════════════════")
const lintResult = lintReactSnippet.run({ code: snippet, filename: "DangerZone.tsx" })
console.log(`Found ${lintResult.summary.errors} errors, ${lintResult.summary.warnings} warnings, ${lintResult.summary.info} info.\n`)
for (const v of lintResult.violations) {
  console.log(`  [${v.level}] ${v.rule}: ${v.message}`)
}

console.log("\n═══════════════════════════════════════════════════════════════")
console.log("  STEP 3 — resolve each violation")
console.log("═══════════════════════════════════════════════════════════════")

console.log("\n→ rule: icons-from-dbui (Trash, ChevronDown imported from lucide)")
const trashRes = resolveIcon.run({ query: "trash", limit: 1 })
console.log(`  Trash → ${trashRes.matches[0].name} from ${trashRes.matches[0].importPath}`)
const chevronRes = resolveIcon.run({ query: "chevron down", limit: 1 })
console.log(`  ChevronDown → ${chevronRes.matches[0].name} from ${chevronRes.matches[0].importPath}`)

console.log("\n→ rule: no-arbitrary-color (#16A34A)")
const colorRes = resolveToken.run({ value: "#16A34A", type: "color", mode: "light" })
console.log(`  #16A34A → ${colorRes.matches[0].token} (Δ=${colorRes.matches[0].distance}); use bg-${colorRes.matches[0].token}`)

console.log("\n→ rule: inline-hardcoded-color (#FF0000)")
const redRes = resolveToken.run({ value: "#FF0000", type: "color", mode: "light" })
console.log(`  #FF0000 → ${redRes.matches[0].token} (Δ=${redRes.matches[0].distance}); use text-${redRes.matches[0].token}`)

console.log("\n→ rule: off-scale-spacing (7px, 5px)")
const sp7 = resolveToken.run({ value: "7px", type: "spacing" })
const sp5 = resolveToken.run({ value: "5px", type: "spacing" })
console.log(`  7px → ${sp7.matches[0].px}px (${sp7.matches[0].tailwindClasses[0]})`)
console.log(`  5px → ${sp5.matches[0].px}px (${sp5.matches[0].tailwindClasses[0]})`)

console.log("\n→ rule: no-raw-button (<button>)")
console.log(`  Replace with <Button> from @muditmittal/dbui/components/ui/button`)

console.log("\n→ rule: typography-13px (text-sm)")
console.log(`  Replace text-sm with text-[13px]`)

console.log("\n═══════════════════════════════════════════════════════════════")
console.log("  STEP 4 — corrected snippet (built from the resolutions above)")
console.log("═══════════════════════════════════════════════════════════════")

const corrected = `import { Button } from "@muditmittal/dbui/components/ui/button"
import { ${trashRes.matches[0].name} } from "${trashRes.matches[0].importPath}"

export function DangerZone() {
  return (
    <div className="bg-${colorRes.matches[0].token} p-${sp7.matches[0].px / 4} gap-${sp5.matches[0].px === 4 ? 1 : sp5.matches[0].px / 4} text-${redRes.matches[0].token}">
      <Button variant="destructive" className="text-[13px]">
        <${trashRes.matches[0].name} />
        Delete forever
      </Button>
    </div>
  )
}`
console.log(corrected)

console.log("\n═══════════════════════════════════════════════════════════════")
console.log("  STEP 5 — verify the corrected snippet is clean")
console.log("═══════════════════════════════════════════════════════════════")
const verify = lintReactSnippet.run({ code: corrected, filename: "DangerZone.tsx" })
console.log(`Errors: ${verify.summary.errors} · Warnings: ${verify.summary.warnings} · Info: ${verify.summary.info}`)
if (verify.violations.length === 0) {
  console.log("✓ Clean!")
} else {
  console.log("Remaining violations:")
  for (const v of verify.violations) console.log(`  [${v.level}] ${v.rule}: ${v.message}`)
}
