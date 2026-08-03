/**
 * Quick smoke tests for the MCP tools — runs each tool with a representative
 * input and prints the results. Not a real test suite — just enough to verify
 * the data + scoring is sensible before exposing via MCP.
 *
 * Run: node packages/dbui-mcp/scripts/smoke-test.js
 */
import * as lookupIcon from "../src/tools/lookup-icon.js"
import * as lookupComponent from "../src/tools/lookup-component.js"
import * as lookupToken from "../src/tools/lookup-token.js"
import * as lintReactSnippet from "../src/tools/lint-react-snippet.js"
import * as getRules from "../src/tools/get-rules.js"

function header(label) {
  console.log(`\n${"─".repeat(72)}\n${label}\n${"─".repeat(72)}`)
}

header("dbui_lookup_icon — query: 'database'")
console.log(JSON.stringify(lookupIcon.run({ query: "database", limit: 3 }), null, 2))

header("dbui_lookup_icon — query: 'down arrow'")
console.log(JSON.stringify(lookupIcon.run({ query: "down arrow", limit: 3 }), null, 2))

header("dbui_lookup_icon — query: 'success'")
console.log(JSON.stringify(lookupIcon.run({ query: "success", category: "indicator", limit: 3 }), null, 2))

header("dbui_lookup_component — query: 'click action'")
console.log(JSON.stringify(lookupComponent.run({ query: "click action", limit: 3 }), null, 2))

header("dbui_lookup_component — query: 'sortable table'")
console.log(JSON.stringify(lookupComponent.run({ query: "sortable table", limit: 3 }), null, 2))

header("dbui_lookup_token — color #16A34A")
console.log(JSON.stringify(lookupToken.run({ value: "#16A34A", type: "color" }), null, 2))

header("dbui_lookup_token — color #2272B4 (exact match)")
console.log(JSON.stringify(lookupToken.run({ value: "#2272B4", type: "color", mode: "light" }), null, 2))

header("dbui_lookup_token — spacing 7px")
console.log(JSON.stringify(lookupToken.run({ value: "7px", type: "spacing" }), null, 2))

header("dbui_lookup_token — type-size 14px (Tailwind default → DBUI 13px)")
console.log(JSON.stringify(lookupToken.run({ value: "14px", type: "type-size" }), null, 2))

header("dbui_get_rules — component: 'Button'")
console.log(JSON.stringify(getRules.run({ component: "Button" }), null, 2))

header("dbui_lint_react_snippet — bad sample with raw button + arbitrary color + lucide icon")
const bad = `import { Trash } from "lucide-react"

export function MyComponent() {
  return (
    <div className="bg-[#FF5733] p-[7px]">
      <button className="text-sm">Click me</button>
      <input type="text" placeholder="Email" />
      <Trash className="size-4" />
    </div>
  )
}`
console.log(JSON.stringify(lintReactSnippet.run({ code: bad, filename: "demo.tsx" }), null, 2))

header("dbui_lint_react_snippet — clean DBUI sample (should be quiet)")
const clean = `import { Button, Input } from "@muditmittal/dbui/components/ui"
import { Trash } from "@muditmittal/dbui/components/icons/Trash"

export function MyComponent() {
  return (
    <div className="bg-background p-2">
      <Button variant="destructive"><Trash />Delete</Button>
      <Input placeholder="Email" />
    </div>
  )
}`
console.log(JSON.stringify(lintReactSnippet.run({ code: clean, filename: "clean.tsx" }), null, 2))
