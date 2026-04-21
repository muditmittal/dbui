import { NextRequest, NextResponse } from "next/server"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

const DBUI_ROOT = join(process.cwd(), "../../packages/dbui/src")

const COMPONENT_META: Record<string, { deps: string[]; desc: string; extraFiles?: string[] }> = {
  "accordion":      { deps: ["@base-ui/react"], desc: "Vertically stacked interactive headings that reveal content." },
  "alert":          { deps: ["class-variance-authority"], desc: "Callout for important messages — info, warning, success, danger." },
  "alert-dialog":   { deps: ["@base-ui/react"], desc: "Modal confirmation dialog with cancel/action buttons." },
  "aspect-ratio":   { deps: [], desc: "Maintains a consistent width-to-height ratio." },
  "avatar":         { deps: [], desc: "User or entity avatar with image fallback to initials." },
  "badge":          { deps: ["class-variance-authority"], desc: "Small status label — fill, outline, destructive, ghost." },
  "breadcrumb":     { deps: [], desc: "Navigation breadcrumb trail." },
  "button":         { deps: ["@base-ui/react", "class-variance-authority"], desc: "Primary action element — 7 variants, 2 sizes.", extraFiles: ["lib/button-variants.ts"] },
  "calendar":       { deps: ["react-day-picker"], desc: "Date picker calendar grid." },
  "card":           { deps: [], desc: "Container with header, content, footer — rounded-xl." },
  "checkbox":       { deps: ["@base-ui/react"], desc: "Toggle between checked, unchecked, indeterminate." },
  "collapsible":    { deps: ["@base-ui/react"], desc: "Expandable/collapsible content panel." },
  "combobox":       { deps: ["@base-ui/react"], desc: "Searchable dropdown with multi-select chips." },
  "command":        { deps: ["cmdk"], desc: "Command palette with search and keyboard navigation." },
  "context-menu":   { deps: ["@base-ui/react"], desc: "Right-click context menu." },
  "dialog":         { deps: ["@base-ui/react"], desc: "Modal dialog — normal, wide, extra-wide sizes." },
  "drawer":         { deps: ["vaul"], desc: "Slide-in panel from edge of screen." },
  "dropdown-menu":  { deps: ["@base-ui/react"], desc: "Popup menu triggered by button click." },
  "editor-tabs":    { deps: [], desc: "File editor tab bar with close and add buttons." },
  "empty":          { deps: [], desc: "Empty state placeholder with title and description." },
  "field":          { deps: [], desc: "Form field composition — label, input, hint, validation." },
  "hover-card":     { deps: ["@base-ui/react"], desc: "Card that appears on hover over a trigger." },
  "input":          { deps: ["@base-ui/react"], desc: "Text input — 2 sizes, validation states." },
  "input-group":    { deps: [], desc: "Input with prefix/suffix addons — browse, filter." },
  "input-otp":      { deps: ["input-otp"], desc: "One-time password input with copy-paste." },
  "kbd":            { deps: [], desc: "Keyboard shortcut indicator." },
  "key-value-pair": { deps: [], desc: "Key-value display — horizontal or vertical layout." },
  "label":          { deps: [], desc: "Form label — Bold style (13px/20px Semibold)." },
  "navbar":         { deps: [], desc: "Product left navigation — sections, items, new button." },
  "pagination":     { deps: [], desc: "Page navigation with prev/next and page numbers." },
  "popover":        { deps: ["@base-ui/react"], desc: "Floating content panel on click." },
  "progress":       { deps: [], desc: "Progress bar indicator." },
  "radio-group":    { deps: ["@base-ui/react"], desc: "Radio button group for single selection." },
  "radio-tile":     { deps: ["@base-ui/react"], desc: "Large card-style radio selection tiles." },
  "resizable":      { deps: ["react-resizable-panels"], desc: "Resizable panel layout with drag handles." },
  "scroll-area":    { deps: ["@base-ui/react"], desc: "Scrollable container with custom scrollbars." },
  "segment-control":{ deps: ["@base-ui/react", "class-variance-authority"], desc: "Segmented toggle — slider and outline variants." },
  "select":         { deps: ["@base-ui/react"], desc: "Dropdown select — default and ghost variants." },
  "separator":      { deps: [], desc: "Horizontal or vertical divider line." },
  "skeleton":       { deps: [], desc: "Loading placeholder animation." },
  "slider":         { deps: ["@base-ui/react"], desc: "Range slider with draggable thumb." },
  "sonner":         { deps: ["sonner", "next-themes"], desc: "Toast notifications — success, error, warning, info." },
  "spinner":        { deps: [], desc: "Loading spinner animation." },
  "split-button":   { deps: [], desc: "Button with attached dropdown trigger." },
  "status":         { deps: [], desc: "Icon-based status indicator — 12 statuses, 2 sizes." },
  "switch":         { deps: ["@base-ui/react"], desc: "Toggle switch — default and small sizes." },
  "table":          { deps: [], desc: "Data table with header, body, rows." },
  "tabs":           { deps: ["@base-ui/react", "class-variance-authority"], desc: "Tabbed content — lined variant." },
  "tag":            { deps: [], desc: "Tag label with optional value, icon, remove button." },
  "textarea":       { deps: [], desc: "Multi-line text input with validation states." },
  "toggle":         { deps: ["@base-ui/react", "class-variance-authority"], desc: "Toggle button — default, filter, pill, icon variants." },
  "tooltip":        { deps: ["@base-ui/react"], desc: "Small tooltip on hover — inverted colors." },
}

function readFile(relativePath: string): string | null {
  const fullPath = join(DBUI_ROOT, relativePath)
  if (!existsSync(fullPath)) return null
  return readFileSync(fullPath, "utf-8")
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params

  // Special case: tokens
  if (name === "dbui-tokens") {
    const content = readFile("tokens/globals.css")
    if (!content) return NextResponse.json({ error: "tokens not found" }, { status: 404 })
    return NextResponse.json({
      name: "dbui-tokens",
      type: "registry:theme",
      title: "DBUI Tokens",
      description: "Databricks DuBois design tokens.",
      dependencies: [],
      files: [{ path: "tokens/globals.css", content, type: "registry:theme", target: "app/globals.css" }],
    })
  }

  const meta = COMPONENT_META[name]
  if (!meta) return NextResponse.json({ error: `Component "${name}" not found` }, { status: 404 })

  const componentContent = readFile(`components/ui/${name}.tsx`)
  if (!componentContent) return NextResponse.json({ error: `File not found: components/ui/${name}.tsx` }, { status: 404 })

  const files: { path: string; content: string; type: string; target: string }[] = [
    { path: `components/ui/${name}.tsx`, content: componentContent, type: "registry:ui", target: `components/ui/${name}.tsx` },
  ]

  // Add extra files (e.g. button-variants.ts)
  for (const extra of meta.extraFiles ?? []) {
    const extraContent = readFile(extra)
    if (extraContent) {
      files.push({ path: extra, content: extraContent, type: "registry:lib", target: extra })
    }
  }

  // Add utils.ts if component uses cn()
  if (componentContent.includes("cn(")) {
    const utilsContent = readFile("lib/utils.ts")
    if (utilsContent) {
      files.push({ path: "lib/utils.ts", content: utilsContent, type: "registry:lib", target: "lib/utils.ts" })
    }
  }

  return NextResponse.json({
    name,
    type: "registry:ui",
    title: name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    description: meta.desc,
    dependencies: meta.deps,
    files,
  })
}
