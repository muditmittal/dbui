/**
 * Smoke test for the three new tools (check-copy, render-react-preview,
 * compose-figma-frame). Run after editing any of them.
 */
import * as checkCopy from "../src/tools/check-copy.js"
import * as renderPreview from "../src/tools/render-react-preview.js"
import * as composeFigma from "../src/tools/compose-figma-frame.js"

function header(label) {
  console.log(`\n${"═".repeat(72)}\n  ${label}\n${"═".repeat(72)}`)
}

// ── 1. check-copy ──
header("dbui_check_copy — bad button label")
console.log(JSON.stringify(checkCopy.run({ text: "OK", surface: "button" }), null, 2))

header("dbui_check_copy — error toast with marketing speak")
console.log(JSON.stringify(checkCopy.run({ text: "🎉 Successfully utilized our seamless solution!", surface: "toast" }), null, 2))

header("dbui_check_copy — empty state title (sentence case + length)")
console.log(JSON.stringify(checkCopy.run({ text: "You Don't Have Any Dashboards Yet!", surface: "empty-title" }), null, 2))

header("dbui_check_copy — clean button")
console.log(JSON.stringify(checkCopy.run({ text: "Delete", surface: "button" }), null, 2))

header("dbui_check_copy — confirmation rhetorical")
console.log(JSON.stringify(checkCopy.run({ text: "Are you sure you want to delete this?", surface: "confirm-title" }), null, 2))

header("dbui_check_copy — tooltip too long with period")
console.log(JSON.stringify(checkCopy.run({ text: "Click to open this in a brand new browser tab.", surface: "tooltip" }), null, 2))

// ── 2. render-react-preview ──
header("dbui_render_react_preview — write a story")
const writeRes = renderPreview.run({
  code: `<Button variant="default">Get started</Button>`,
  name: "ButtonHello",
  imports: [`import { Button } from "@muditmittal/dbui/components/ui/button"`],
})
console.log(JSON.stringify(writeRes, null, 2))

header("dbui_render_react_preview — cleanup")
const cleanupRes = renderPreview.run({ code: "", name: "ButtonHello", cleanup: true })
console.log(JSON.stringify(cleanupRes, null, 2))

// ── 3. compose-figma-frame ──
header("dbui_compose_figma_frame — simple user card")
const composed = composeFigma.run({
  spec: {
    name: "User Card",
    layout: "vertical",
    gap: 12,
    padding: 16,
    fill: "card",
    children: [
      {
        layout: "horizontal",
        gap: 8,
        children: [
          { component: "Avatar", props: { Type: "Initials" } },
          {
            layout: "vertical",
            gap: 0,
            children: [
              { component: "CardTitle" },
              { component: "CardDescription" },
            ],
          },
        ],
      },
      { component: "CardContent" },
      {
        layout: "horizontal",
        gap: 8,
        children: [
          { component: "Button", props: { Variant: "Outline" } },
          { component: "Button", props: { Variant: "Ghost" } },
        ],
      },
    ],
  },
})
console.log(JSON.stringify(
  { warnings: composed.warnings, keyMapStatus: composed.keyMapStatus, codePreview: composed.code.split("\n").slice(0, 30).join("\n") + "\n... (" + composed.code.split("\n").length + " lines total)" },
  null,
  2
))
