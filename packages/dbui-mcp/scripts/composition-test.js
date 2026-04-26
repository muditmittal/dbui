/**
 * Test the NEW capabilities added today:
 *  1. Extra lint rules: shadow, z-index, font-weight, font-family, opacity
 *  2. New tool: dbui_check_composition (custom card detection)
 */
import * as lintReactSnippet from "../src/tools/lint-react-snippet.js"
import * as checkComposition from "../src/tools/check-composition.js"

function header(label) {
  console.log(`\n${"═".repeat(72)}\n  ${label}\n${"═".repeat(72)}`)
}

// ── Test 1: extra lint rules ──
const messy = `import { Button } from "@muditmittal/dbui/components/ui/button"

export function Pricing() {
  return (
    <div className="z-[9999] shadow-[0_4px_8px_rgba(0,0,0,0.25)] opacity-[0.37]">
      <div className="font-medium text-sm font-['Comic Sans MS']">
        Best plan ever
      </div>
      <Button>Buy now</Button>
    </div>
  )
}`

header("Test 1: new lint rules — shadow, z-index, font-weight, font-family, opacity")
console.log("INPUT:")
console.log(messy)
console.log("\nLINT OUTPUT:")
const lintRes = lintReactSnippet.run({ code: messy, filename: "Pricing.tsx" })
console.log(`Errors: ${lintRes.summary.errors}, Warnings: ${lintRes.summary.warnings}, Info: ${lintRes.summary.info}\n`)
for (const v of lintRes.violations) {
  console.log(`  [${v.level}] ${v.rule}`)
  console.log(`    ${v.message}`)
  console.log(`    fix: ${v.fix.slice(0, 150)}`)
}

// ── Test 2: composition detection — custom card ──
const customCard = `import { Avatar, AvatarFallback } from "@muditmittal/dbui/components/ui/avatar"
import { Button } from "@muditmittal/dbui/components/ui/button"

export function UserCard() {
  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
        <div>
          <h3 className="font-semibold">Jane Doe</h3>
          <p className="text-muted-foreground">Data Engineer</p>
        </div>
      </div>
      <p className="mt-3">Recently active 3 days ago.</p>
      <div className="mt-4 flex gap-2">
        <Button variant="outline">Profile</Button>
        <Button variant="ghost">Message</Button>
      </div>
    </div>
  )
}`

header("Test 2: composition detector on a custom user card")
console.log("INPUT (every primitive is DBUI-correct, but the COMPOSITION isn't):")
console.log(customCard)
console.log("\nLINT (per-element):")
const cardLint = lintReactSnippet.run({ code: customCard, filename: "UserCard.tsx" })
console.log(`Errors: ${cardLint.summary.errors}, Warnings: ${cardLint.summary.warnings}, Info: ${cardLint.summary.info} — leaf-level lint passes ✓`)
console.log("\nCOMPOSITION CHECK (structural):")
const compRes = checkComposition.run({ code: customCard, filename: "UserCard.tsx" })
console.log(`Found ${compRes.matchCount} pattern${compRes.matchCount === 1 ? "" : "s"}:\n`)
for (const m of compRes.matches) {
  console.log(`  [pattern: ${m.pattern}] confidence=${m.confidence}, line ${m.line}`)
  console.log(`    ${m.suggestion}`)
  console.log(`    replacement:\n${m.replacement.split("\n").map((l) => "      " + l).join("\n")}`)
  console.log(`    import: ${m.importHint}`)
  console.log()
}

// ── Test 3: empty state pattern ──
const customEmpty = `export function EmptyInbox() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <Inbox className="size-12 text-muted-foreground" />
      <h2 className="mt-4 font-semibold">No messages</h2>
      <p className="text-muted-foreground">Your inbox is empty.</p>
      <Button className="mt-4">Compose</Button>
    </div>
  )
}`

header("Test 3: composition detector on a custom empty state")
console.log("INPUT:")
console.log(customEmpty)
console.log("\nCOMPOSITION CHECK:")
const emptyRes = checkComposition.run({ code: customEmpty, filename: "EmptyInbox.tsx" })
for (const m of emptyRes.matches) {
  console.log(`  [pattern: ${m.pattern}] confidence=${m.confidence}, line ${m.line}`)
  console.log(`    ${m.suggestion}`)
}

// ── Test 4: status pattern ──
const customStatus = `export function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="size-2 rounded-full bg-success" />
      <span>Healthy</span>
    </div>
  )
}`

header("Test 4: status indicator (dot + label)")
console.log("INPUT:")
console.log(customStatus)
console.log("\nCOMPOSITION CHECK:")
const statusRes = checkComposition.run({ code: customStatus, filename: "Status.tsx" })
for (const m of statusRes.matches) {
  console.log(`  [pattern: ${m.pattern}] confidence=${m.confidence}, line ${m.line}`)
  console.log(`    ${m.suggestion}`)
}

// ── Test 5: clean Card already (should NOT trigger card detector) ──
const properCard = `import { Card, CardHeader, CardTitle, CardContent } from "@muditmittal/dbui/components/ui/card"
import { Avatar, AvatarFallback } from "@muditmittal/dbui/components/ui/avatar"

export function GoodCard() {
  return (
    <Card>
      <CardHeader>
        <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
        <CardTitle>Jane Doe</CardTitle>
      </CardHeader>
      <CardContent>Engineer</CardContent>
    </Card>
  )
}`

header("Test 5: properly-composed Card (should NOT trigger any pattern)")
console.log("COMPOSITION CHECK:")
const goodRes = checkComposition.run({ code: properCard, filename: "GoodCard.tsx" })
console.log(goodRes.matchCount === 0 ? "✓ No false positives — the proper composition passed cleanly." : `⚠ False positive: ${goodRes.matchCount} match`)
