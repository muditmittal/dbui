/**
 * dbui_check_composition
 *
 * Higher-level pattern detection. Where dbui_lint_react_snippet checks
 * INDIVIDUAL elements (raw <button>, arbitrary color, etc.), this tool
 * looks at how DBUI primitives are ARRANGED and flags compositions that
 * should be a higher-order component.
 *
 * Common pattern: agent generates a "card" by hand:
 *
 *   <div className="rounded-md border p-4">
 *     <div className="flex items-center gap-2">
 *       <Avatar />
 *       <div>
 *         <h3>Title</h3>
 *         <p>Subtitle</p>
 *       </div>
 *     </div>
 *     <p>Description</p>
 *     <div className="mt-4 flex gap-2">
 *       <Button>Open</Button>
 *       <Button variant="ghost">More</Button>
 *     </div>
 *   </div>
 *
 * Each PRIMITIVE is fine — Button is DBUI, no arbitrary values. But the
 * COMPOSITION should be a <Card> with <CardHeader>, <CardContent>,
 * <CardFooter>. This tool catches that.
 *
 * Patterns detected (high-confidence heuristics):
 *   1. likely-card     — div with avatar/icon + title + description (+ optional actions)
 *   2. likely-empty    — centered icon/illustration + heading + description + action
 *   3. likely-field    — label + input/textarea + optional helper/error
 *   4. likely-tag      — pill-shaped div with text + (optional close icon)
 *   5. likely-toolbar  — row of icon-buttons (3+ buttons in a flex row)
 *   6. likely-stat     — number + label arranged as a metric card
 *   7. likely-status   — colored dot/icon + label (use <Status>)
 *
 * Returns: { matches: [{ pattern, confidence, location, suggestion, replacement }] }
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { Project, SyntaxKind } from "ts-morph"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbui = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/dbui-components.json"), "utf-8"))
const icons = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/icons.json"), "utf-8"))
const DBUI_SET = new Set([...dbui.ui, ...dbui.shells, ...icons.map((i) => i.name)])

export const tool = {
  name: "dbui_check_composition",
  description:
    "Detect higher-order patterns in JSX that should be DBUI compositions (Card / Empty / Field / Tag / Toolbar / Status). Use AFTER dbui_lint_react_snippet — even if the lint is clean, the SHAPE of the markup may be a custom card that should be a real <Card>. Returns suggestions with example replacements.",
  inputSchema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description:
          "React/TSX source. Whole file or just the JSX subtree to analyze.",
      },
      filename: {
        type: "string",
        description: "Optional filename for context.",
        default: "<snippet>",
      },
    },
    required: ["code"],
  },
}

// ──────────────────────────────────────────────────────────────────────
// Helpers — turn an AST node into a structural fingerprint
// ──────────────────────────────────────────────────────────────────────

function getTagName(node) {
  if (node.getKind() === SyntaxKind.JsxElement) {
    return node.getOpeningElement().getTagNameNode().getText()
  }
  if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
    return node.getTagNameNode().getText()
  }
  return null
}

function getJsxChildren(node) {
  let children = []
  if (node.getKind() === SyntaxKind.JsxElement) {
    children = node.getJsxChildren()
  }
  return children.filter((c) => {
    const k = c.getKind()
    return k === SyntaxKind.JsxElement || k === SyntaxKind.JsxSelfClosingElement
  })
}

function isAvatarLike(tag) {
  if (!tag) return false
  return /^Avatar/i.test(tag) || /Image$/i.test(tag) || tag === "img"
}
function isHeadingLike(tag) {
  return tag && /^h[1-6]$/.test(tag)
}
function isTextLike(tag) {
  return tag && (/^(p|span|div)$/.test(tag) || /Title|Description|Label|Text/.test(tag))
}
function isButtonLike(tag) {
  return tag && (/^Button$/.test(tag) || /^IconButton$/.test(tag) || tag === "button" || tag === "a")
}
function isInputLike(tag) {
  return tag && /^(Input|Textarea|Select|Combobox|RadioGroup|Checkbox|Switch|Slider|input|textarea)$/.test(tag)
}
function isLabelLike(tag) {
  return tag && (/^(Label|FieldLabel|FieldTitle|label)$/.test(tag) || isHeadingLike(tag))
}
function isIconLike(tag) {
  return tag && (icons.some((i) => i.name === tag) || /Icon$/.test(tag))
}

function getClassName(node) {
  const opening = node.getKind() === SyntaxKind.JsxElement ? node.getOpeningElement() : node
  for (const attr of opening.getAttributes()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
    const ja = attr.asKind(SyntaxKind.JsxAttribute)
    if (ja.getNameNode().getText() !== "className") continue
    const init = ja.getInitializer()
    if (!init) return ""
    if (init.getKind() === SyntaxKind.StringLiteral)
      return init.getText().replace(/^['"]|['"]$/g, "")
    if (init.getKind() === SyntaxKind.JsxExpression) {
      const expr = init.asKind(SyntaxKind.JsxExpression).getExpression()
      return expr ? expr.getText() : ""
    }
  }
  return ""
}

function getLineColumn(node) {
  const sf = node.getSourceFile()
  return sf.getLineAndColumnAtPos(node.getStart())
}

// ──────────────────────────────────────────────────────────────────────
// Pattern detectors — each takes a JSX node, returns null or a match object
// ──────────────────────────────────────────────────────────────────────

function detectCardPattern(node) {
  const tag = getTagName(node)
  if (tag !== "div" && tag !== "section" && tag !== "article") return null
  const cls = getClassName(node)
  // Cards usually have a border or shadow + padding
  if (!/(border|shadow|rounded)/.test(cls)) return null

  const children = getJsxChildren(node)
  const flatTags = collectAllDescendantTags(node)

  const hasMedia = flatTags.some((t) => isAvatarLike(t) || isIconLike(t))
  const hasHeading = flatTags.some((t) => isHeadingLike(t) || /Title$/.test(t))
  const hasDescription = flatTags.filter((t) => isTextLike(t)).length >= 1
  const hasActions = flatTags.filter((t) => isButtonLike(t)).length >= 1

  let confidence = 0
  if (hasMedia) confidence += 25
  if (hasHeading) confidence += 25
  if (hasDescription) confidence += 20
  if (hasActions) confidence += 15
  if (children.length >= 2) confidence += 15

  if (confidence < 50) return null

  const { line, column } = getLineColumn(node)
  return {
    pattern: "likely-card",
    confidence,
    line,
    column,
    suggestion: `This composition (${[
      hasMedia && "media/avatar",
      hasHeading && "title",
      hasDescription && "description",
      hasActions && "actions",
    ]
      .filter(Boolean)
      .join(" + ")}) looks like a Card. Use <Card> with <CardHeader>, <CardContent>, <CardFooter>.`,
    replacement: `<Card>
  <CardHeader>
    <CardTitle>...</CardTitle>           {/* heading */}
    <CardDescription>...</CardDescription>
    <CardAction>...</CardAction>          {/* if actions */}
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>            {/* if footer actions */}
</Card>`,
    importHint: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@muditmittal/dbui/components/ui/card"`,
  }
}

function detectEmptyPattern(node) {
  const tag = getTagName(node)
  if (tag !== "div") return null
  const cls = getClassName(node)
  // Empty states are usually centered
  if (!/(items-center|justify-center|text-center|flex-col)/.test(cls)) return null

  const flatTags = collectAllDescendantTags(node)
  const hasIcon = flatTags.some((t) => isIconLike(t))
  const hasHeading = flatTags.some((t) => isHeadingLike(t) || /Title$/.test(t))
  const hasDescription = flatTags.filter((t) => isTextLike(t)).length >= 1
  const hasAction = flatTags.some((t) => isButtonLike(t))

  let confidence = 0
  if (hasIcon) confidence += 25
  if (hasHeading) confidence += 25
  if (hasDescription) confidence += 20
  if (hasAction) confidence += 25

  if (confidence < 70) return null

  const { line, column } = getLineColumn(node)
  return {
    pattern: "likely-empty",
    confidence,
    line,
    column,
    suggestion: `Centered icon + heading + description + action looks like an Empty state. Use <Empty>.`,
    replacement: `<Empty>
  <EmptyMedia>...</EmptyMedia>
  <EmptyHeader>
    <EmptyTitle>...</EmptyTitle>
    <EmptyDescription>...</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Primary action</Button>
  </EmptyContent>
</Empty>`,
    importHint: `import { Empty, EmptyMedia, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@muditmittal/dbui/components/ui/empty"`,
  }
}

function detectFieldPattern(node) {
  const tag = getTagName(node)
  if (tag !== "div" && tag !== "fieldset") return null

  const flatTags = collectAllDescendantTags(node)
  const hasLabel = flatTags.some((t) => isLabelLike(t))
  const hasInput = flatTags.some((t) => isInputLike(t))
  if (!(hasLabel && hasInput)) return null

  const flatTextTags = flatTags.filter((t) => isTextLike(t))
  const hasHelper = flatTextTags.length >= 2 // a description below the input

  const { line, column } = getLineColumn(node)
  return {
    pattern: "likely-field",
    confidence: hasHelper ? 80 : 65,
    line,
    column,
    suggestion: `Label + input ${hasHelper ? "+ helper text " : ""}looks like a Field. Use <Field> for proper a11y wiring.`,
    replacement: `<Field>
  <FieldLabel>...</FieldLabel>
  <Input ... />
  <FieldDescription>...</FieldDescription>
  <FieldError>...</FieldError>
</Field>`,
    importHint: `import { Field, FieldLabel, FieldDescription, FieldError } from "@muditmittal/dbui/components/ui/field"`,
  }
}

function detectTagPattern(node) {
  const tag = getTagName(node)
  if (tag !== "div" && tag !== "span") return null
  const cls = getClassName(node)
  // Tags/pills are short, with rounded full + small text + bg
  if (!/rounded(-full|-sm|-md)/.test(cls)) return null
  if (!/(bg-|border)/.test(cls)) return null
  const text = node.getKind() === SyntaxKind.JsxElement ? node.getJsxChildren().map((c) => c.getText()).join("") : ""
  // Short text suggests a tag
  if (text.length > 40 || text.length === 0) return null

  const { line, column } = getLineColumn(node)
  return {
    pattern: "likely-tag",
    confidence: 65,
    line,
    column,
    suggestion: `Small pill with bg + rounded looks like a Tag or Badge.`,
    replacement: `<Tag><TagLabel>...</TagLabel></Tag>   // for filter chips, removable
<Badge>...</Badge>                       // for status / count`,
    importHint: `import { Tag, TagLabel } from "@muditmittal/dbui/components/ui/tag"
import { Badge } from "@muditmittal/dbui/components/ui/badge"`,
  }
}

function detectToolbarPattern(node) {
  const tag = getTagName(node)
  if (tag !== "div" && tag !== "nav") return null
  const cls = getClassName(node)
  if (!/(flex|inline-flex)/.test(cls)) return null

  const children = getJsxChildren(node)
  const buttonChildren = children.filter((c) => {
    const t = getTagName(c)
    return t === "Button" || t === "IconButton" || t === "button"
  })
  // Need 3+ buttons in a row to call it a toolbar
  if (buttonChildren.length < 3) return null

  const { line, column } = getLineColumn(node)
  return {
    pattern: "likely-toolbar",
    confidence: 70,
    line,
    column,
    suggestion: `Row of ${buttonChildren.length} buttons looks like a toolbar. Consider <ButtonGroup> for related actions, or <SegmentControl> for view switchers.`,
    replacement: `<ButtonGroup>
  <Button>...</Button>
  <Button>...</Button>
  <Button>...</Button>
</ButtonGroup>

OR for view switchers:
<SegmentControl>
  <SegmentControlItem value="a">A</SegmentControlItem>
  <SegmentControlItem value="b">B</SegmentControlItem>
</SegmentControl>`,
    importHint: `import { ButtonGroup } from "@muditmittal/dbui/components/ui/button-group"
import { SegmentControl, SegmentControlItem } from "@muditmittal/dbui/components/ui/segment-control"`,
  }
}

function detectStatPattern(node) {
  const tag = getTagName(node)
  if (tag !== "div") return null
  const cls = getClassName(node)
  if (!/(flex|grid)/.test(cls)) return null

  const children = getJsxChildren(node)
  if (children.length < 2 || children.length > 4) return null

  // Big number + small label — look for text-2xl / text-3xl / text-4xl on one child
  const textSubtree = node.getText()
  const hasBigText = /text-(2xl|3xl|4xl|5xl|\[\d{2,3}px\])/.test(textSubtree)
  const hasSmallText = /text-(xs|sm|\[12px\]|\[13px\])/.test(textSubtree)
  if (!hasBigText || !hasSmallText) return null

  const { line, column } = getLineColumn(node)
  return {
    pattern: "likely-stat",
    confidence: 60,
    line,
    column,
    suggestion: `Big number + small label looks like a metric/stat card. DBUI doesn't have a dedicated <Stat> component yet — wrap in <Card> with explicit semantics.`,
    replacement: `<Card>
  <CardHeader>
    <CardDescription>Label</CardDescription>     {/* small label */}
    <CardTitle className="text-2xl">42</CardTitle>  {/* big number */}
  </CardHeader>
</Card>`,
    importHint: `import { Card, CardHeader, CardTitle, CardDescription } from "@muditmittal/dbui/components/ui/card"`,
  }
}

function detectStatusPattern(node) {
  const tag = getTagName(node)
  if (tag !== "div" && tag !== "span") return null
  const cls = getClassName(node)
  if (!/(flex|inline-flex)/.test(cls)) return null

  const children = getJsxChildren(node)
  if (children.length < 2) return null

  // First child should be circle-shaped (rounded-full) with bg color
  const firstChild = children[0]
  const firstChildCls = getClassName(firstChild)
  const looksLikeDot = /rounded-full/.test(firstChildCls) && /bg-/.test(firstChildCls)
  if (!looksLikeDot) return null

  const { line, column } = getLineColumn(node)
  return {
    pattern: "likely-status",
    confidence: 75,
    line,
    column,
    suggestion: `Colored dot + label looks like a Status indicator. Use <Status>.`,
    replacement: `<Status status="success">Healthy</Status>
<Status status="warning">Degraded</Status>
<Status status="error">Down</Status>`,
    importHint: `import { Status } from "@muditmittal/dbui/components/ui/status"`,
  }
}

function collectAllDescendantTags(node) {
  const out = []
  if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
    out.push(node.getTagNameNode().getText())
    return out
  }
  if (node.getKind() === SyntaxKind.JsxElement) {
    out.push(node.getOpeningElement().getTagNameNode().getText())
    for (const child of node.getJsxChildren()) {
      const k = child.getKind()
      if (k === SyntaxKind.JsxElement || k === SyntaxKind.JsxSelfClosingElement) {
        out.push(...collectAllDescendantTags(child))
      }
    }
  }
  return out
}

const detectors = [
  detectCardPattern,
  detectEmptyPattern,
  detectFieldPattern,
  detectTagPattern,
  detectToolbarPattern,
  detectStatPattern,
  detectStatusPattern,
]

export function run({ code, filename = "<snippet>" }) {
  const project = new Project({ useInMemoryFileSystem: true, skipFileDependencyResolution: true })
  const wrapped = code.includes("function ") || code.includes("=>") || code.includes("export ")
    ? code
    : `const __snippet__ = () => (\n${code}\n)`
  let sourceFile
  try {
    sourceFile = project.createSourceFile(filename.endsWith(".tsx") ? filename : filename + ".tsx", wrapped)
  } catch (e) {
    return { error: `Failed to parse: ${e.message}`, file: filename }
  }

  const matches = []
  // Track which lines we've already matched so we don't double-report
  const seenAtLine = new Set()

  sourceFile.forEachDescendant((node) => {
    const k = node.getKind()
    if (k !== SyntaxKind.JsxElement) return
    const tag = getTagName(node)
    // Skip nodes that already use a DBUI composition wrapper
    if (DBUI_SET.has(tag)) return
    for (const detector of detectors) {
      const m = detector(node)
      if (m) {
        const key = `${m.line}:${m.pattern}`
        if (seenAtLine.has(key)) continue
        seenAtLine.add(key)
        matches.push(m)
      }
    }
  })

  return {
    file: filename,
    matchCount: matches.length,
    matches,
    note:
      matches.length === 0
        ? "No higher-order composition patterns detected. Per-element compliance is checked by dbui_lint_react_snippet."
        : `Found ${matches.length} pattern${matches.length === 1 ? "" : "s"}. Each suggests a DBUI composition. After rewriting, re-run dbui_lint_react_snippet to verify the inner code is also clean.`,
  }
}
