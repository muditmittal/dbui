#!/usr/bin/env node
/**
 * react-design-lint — checks .ts and .tsx files for DBUI compliance.
 *
 * Lints two things:
 *   1. Component compliance — every JSX element is either:
 *        a. a DBUI export (in scripts/design-lint/dbui-components.json), OR
 *        b. a plain HTML tag listed as "always allowed", OR
 *        c. flagged with a recommended DBUI replacement.
 *   2. Token compliance — for every approved DBUI tag, check className for:
 *        a. arbitrary Tailwind values: bg-[#abc], gap-[7px], text-[14px]
 *        b. inline `style={{ ... }}` props with hardcoded color/spacing/font
 *
 * Output: a markdown report grouped by file → element → violations + fixes.
 *
 * Usage:
 *   yarn design:lint:react                                 # whole repo
 *   yarn design:lint:react apps/portal/src/stories/Card.stories.tsx
 *   yarn design:lint:react --json > report.json
 */
"use strict"
const fs = require("node:fs")
const path = require("node:path")
const { Project, SyntaxKind } = require("ts-morph")

const ROOT = path.resolve(__dirname, "../../")
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, "tokens.json"), "utf-8"))
const components = JSON.parse(fs.readFileSync(path.join(__dirname, "dbui-components.json"), "utf-8"))

const DBUI_COMPONENT_SET = new Set([...components.ui, ...components.shells])
const ALWAYS_ALLOWED_TAGS = new Set(components.tagsAlwaysAllowed.always)
const PREFER_WRAPPER_HINTS = components.tagsAlwaysAllowed["ok-but-prefer-wrapper"]

// Interactive HTML tags are never allowed in portal stories or dbui-shells.
// Use DBUI primitives instead (Button/Input/Select/Textarea/etc.).
const FORBIDDEN_HTML_TAGS = new Set(["button", "input", "select", "textarea"])

const APPROVED_HEX = new Set([...tokens.colors.light, ...tokens.colors.dark])
const APPROVED_SPACING_PX = new Set(tokens.spacing.px)

// ─── Token-compliance (granular color system) ───
// Primitives (interface/*, status/*, viz/<hue>/*, base/*) are the raw palette and
// must NEVER be consumed directly in product code — only semantics may be.
// tokens.json carries the ramp names so we recognize a primitive var by shape.
const PRIMITIVE_RAMPS = new Set(Object.keys(tokens.colors.primitives || {}))
function isPrimitiveVar(rawName) {
  const n = rawName.replace(/^--/, "")
  if (/^base-(white|black)$/.test(n)) return true
  const m = n.match(/^([a-z]+-[a-z]+)-\d{2,3}$/)
  return !!(m && PRIMITIVE_RAMPS.has(m[1]))
}
// Compliance stats: how many token var() references are semantic vs primitive.
const tokenStats = { varRefs: 0, primitiveRefs: 0 }

const VAR_REF_RE = /var\(\s*(--[a-z0-9-]+)\s*(?:,[^)]*)?\)/gi
function checkVarRefs(text, file, line, column, element, source) {
  VAR_REF_RE.lastIndex = 0
  let m
  while ((m = VAR_REF_RE.exec(text))) {
    const name = m[1]
    tokenStats.varRefs++
    if (isPrimitiveVar(name)) {
      tokenStats.primitiveRefs++
      violations.push({
        file, line, column, level: "error", rule: "no-primitive-token", element,
        message: `\`${name}\` is a raw primitive — product code must consume a semantic token, not the palette.`,
        fix: `Use a semantic token (var(--surface-base), var(--text-subtle), …) or its utility (bg-surface-base).`,
        source: source || text.slice(0, 80),
      })
    }
  }
}

const violations = []

function parseHex(value) {
  const m = value.match(/^#([0-9a-fA-F]{3,8})$/)
  if (!m) return null
  let hex = m[1].toUpperCase()
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("")
  return "#" + hex.slice(0, 6)
}

const ARBITRARY_VALUE_RE = /\b([a-z]+(?:-[a-z]+)*)-\[([^\]]+)\]/g

function nearestSpacing(px) {
  let best = APPROVED_SPACING_PX.has(0) ? 0 : 4
  let bestDiff = Infinity
  for (const v of APPROVED_SPACING_PX) {
    const diff = Math.abs(px - v)
    if (diff < bestDiff) { bestDiff = diff; best = v }
  }
  return best
}

function suggestSpacingClass(prefix, px) {
  const t = px === 0 ? 0 : px === 2 ? 0.5 : px / 4
  return `${prefix}-${t}`
}

// ─── Tailwind prefix → token category mapping ───
// Each prefix maps to the category we should validate against.
const COLOR_PREFIXES = new Set([
  "bg", "border", "border-t", "border-r", "border-b", "border-l", "border-x", "border-y",
  "ring", "ring-offset", "fill", "stroke", "outline", "shadow", "decoration",
  "from", "to", "via", "placeholder", "divide", "accent", "caret",
])
const SPACING_PREFIXES = new Set([
  "p", "pt", "pr", "pb", "pl", "px", "py", "ps", "pe",
  "m", "mt", "mr", "mb", "ml", "mx", "my", "ms", "me",
  "gap", "gap-x", "gap-y", "space-x", "space-y",
  "top", "right", "bottom", "left", "inset", "inset-x", "inset-y",
  "w", "h", "min-w", "min-h", "max-w", "max-h", "size",
])
const FONT_SIZE_PREFIXES = new Set(["text"]) // text-[13px] is a size; text-[#abc] is a color
const LEADING_PREFIXES = new Set(["leading"])
const RADIUS_PREFIXES = new Set([
  "rounded", "rounded-t", "rounded-r", "rounded-b", "rounded-l",
  "rounded-tl", "rounded-tr", "rounded-bl", "rounded-br",
])
const APPROVED_RADIUS = new Set([0, 4, 8, 12, 16, 24, 999])

function checkClassName(className, file, line, column, element) {
  let m
  ARBITRARY_VALUE_RE.lastIndex = 0
  while ((m = ARBITRARY_VALUE_RE.exec(className))) {
    const [whole, prefix, raw] = m

    // 1. Color (any prefix that takes a hex)
    const hex = parseHex(raw)
    if (hex) {
      if (!APPROVED_HEX.has(hex)) {
        violations.push({
          file, line, column, level: "error", rule: "no-arbitrary-color", element,
          message: `Hardcoded color \`${whole}\` (${hex}) is not a DBUI token.`,
          fix: `Use a token-bound class (text-foreground, bg-primary, border-border) or var(--token).`,
          source: className,
        })
      } else {
        violations.push({
          file, line, column, level: "warning", rule: "prefer-token-class", element,
          message: `\`${whole}\` matches a DBUI hex but uses arbitrary syntax.`,
          fix: `Replace with the named class (e.g. text-primary, bg-muted) instead of [${raw}].`,
          source: className,
        })
      }
      continue
    }

    // 2. Pixel value — route by prefix to the correct rule
    const pxM = raw.match(/^(\d+(?:\.\d+)?)px$/)
    if (pxM) {
      const px = parseFloat(pxM[1])

      if (FONT_SIZE_PREFIXES.has(prefix)) {
        const onRamp = tokens.type.ramp.some((r) => r.size === px)
        if (!onRamp) {
          violations.push({
            file, line, column, level: "error", rule: "off-ramp-type-size", element,
            message: `Font size \`${whole}\` (${px}px) is not on the DBUI type ramp.`,
            fix: `Use a ramp value: ${tokens.type.ramp.map((r) => `${r.size}px (${r.name})`).join(", ")}.`,
            source: className,
          })
        }
        continue
      }

      if (LEADING_PREFIXES.has(prefix)) {
        // line-height — match to ramp.lineHeight values
        const onRamp = tokens.type.ramp.some((r) => r.lineHeight === px)
        if (!onRamp) {
          violations.push({
            file, line, column, level: "warning", rule: "off-ramp-line-height", element,
            message: `Line-height \`${whole}\` (${px}px) is not on the DBUI type ramp.`,
            fix: `Match the line-height to its ramp size: ${tokens.type.ramp.map((r) => `${r.size}/${r.lineHeight}`).join(", ")}.`,
            source: className,
          })
        }
        continue
      }

      if (RADIUS_PREFIXES.has(prefix)) {
        if (!APPROVED_RADIUS.has(px)) {
          violations.push({
            file, line, column, level: "warning", rule: "non-token-radius", element,
            message: `Border radius \`${whole}\` (${px}px) is not a DBUI token.`,
            // The step IS the multiple of the 4px unit, so the px is derivable
            // rather than memorized: rounded-3 is three units, which is 12px.
            fix: `Use rounded-N, where N is the multiple of the 4px unit — rounded-1 (4px), rounded-2 (8px), rounded-3 (12px), rounded-4 (16px), rounded-6 (24px) — or rounded-full.`,
            source: className,
          })
        }
        continue
      }

      if (SPACING_PREFIXES.has(prefix)) {
        if (!APPROVED_SPACING_PX.has(px)) {
          violations.push({
            file, line, column, level: "error", rule: "off-scale-spacing", element,
            message: `Spacing \`${whole}\` (${px}px) is not on the 4px scale.`,
            fix: `Use the nearest scale value: ${nearestSpacing(px)}px → ${suggestSpacingClass(prefix, nearestSpacing(px))}.`,
            source: className,
          })
        } else {
          violations.push({
            file, line, column, level: "warning", rule: "prefer-token-class", element,
            message: `\`${whole}\` is on-scale but arbitrary — prefer the named utility.`,
            fix: `Replace with ${suggestSpacingClass(prefix, px)}.`,
            source: className,
          })
        }
        continue
      }

      // Unknown prefix with px value — don't flag (could be a custom utility)
      continue
    }
  }

  // Raw-primitive var() usage (e.g. bg-[var(--interface-neutral-600)])
  checkVarRefs(className, file, line, column, element)

  // Hex-in-string check (rare but possible in cn() calls)
  const hexMatches = className.match(/#[0-9a-fA-F]{3,8}\b/g) || []
  for (const hexRaw of hexMatches) {
    const hex = parseHex(hexRaw)
    if (hex && !APPROVED_HEX.has(hex)) {
      violations.push({
        file, line, column, level: "error", rule: "no-hardcoded-hex", element,
        message: `Hardcoded color ${hex} found in className.`,
        fix: `Use a CSS token (var(--foreground), var(--primary), etc.) or a named utility.`,
        source: className,
      })
    }
  }
}

function checkInlineStyle(node, file, line, column, element) {
  node.forEachDescendant((c) => {
    if (c.getKind() !== SyntaxKind.PropertyAssignment) return
    const pa = c.asKind(SyntaxKind.PropertyAssignment)
    const name = pa.getName()
    const init = pa.getInitializer()
    if (!init) return
    const text = init.getText().replace(/^['"`]|['"`]$/g, "")

    // Raw-primitive var() usage in inline style (e.g. color: 'var(--status-blue-600)')
    if (text.includes("var(--")) checkVarRefs(text, file, line, column, element, `${name}: ${text}`)

    // Color check
    if (/^#[0-9a-fA-F]{3,8}$/.test(text)) {
      const hex = parseHex(text)
      if (hex && !APPROVED_HEX.has(hex)) {
        violations.push({
          file, line, column, level: "error", rule: "inline-hardcoded-color", element,
          message: `Inline style \`${name}: '${text}'\` uses a non-token color.`,
          fix: `Use Tailwind utility classes or a CSS variable.`,
          source: `${name}: ${text}`,
        })
      }
    }

    // Spacing check
    const SPACING_PROPS = new Set([
      "padding", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom",
      "margin", "marginLeft", "marginRight", "marginTop", "marginBottom",
      "gap", "rowGap", "columnGap", "top", "right", "bottom", "left",
    ])
    if (SPACING_PROPS.has(name)) {
      const pxM = text.match(/^(\d+(?:\.\d+)?)px?$/)
      if (pxM) {
        const px = parseFloat(pxM[1])
        if (!APPROVED_SPACING_PX.has(px)) {
          violations.push({
            file, line, column, level: "warning", rule: "inline-off-scale-spacing", element,
            message: `Inline style \`${name}: '${text}'\` is not on the 4px scale.`,
            fix: `Use ${nearestSpacing(px)}px or replace with a Tailwind utility class.`,
            source: `${name}: ${text}`,
          })
        }
      }
    }
  })
}

function checkElement(opening, sourceFile) {
  const tagName = opening.getTagNameNode().getText()
  const { line, column } = opening.getSourceFile().getLineAndColumnAtPos(opening.getStart())

  const isComponent = /^[A-Z]/.test(tagName)
  const isMember = tagName.includes(".")

  if (!isComponent && FORBIDDEN_HTML_TAGS.has(tagName)) {
    violations.push({
      file: sourceFile,
      line,
      column,
      level: "error",
      rule: "no-raw-interactive-html",
      element: tagName,
      message: `<${tagName}> is not allowed in DBUI-authored UI code.`,
      fix: PREFER_WRAPPER_HINTS[tagName] || `Replace <${tagName}> with the DBUI equivalent.`,
      source: opening.getText().slice(0, 80),
    })
    // Still continue to check className/style for additional token violations.
  }

  if (!isComponent && !ALWAYS_ALLOWED_TAGS.has(tagName)) {
    const hint = PREFER_WRAPPER_HINTS[tagName]
    if (hint) {
      violations.push({
        file: sourceFile, line, column, level: "warning", rule: "prefer-dbui-wrapper", element: tagName,
        message: `<${tagName}> is allowed but a DBUI wrapper is usually preferred.`,
        fix: hint,
        source: opening.getText().slice(0, 80),
      })
    }
  } else if (isComponent && !isMember) {
    if (!DBUI_COMPONENT_SET.has(tagName)) {
      violations.push({
        file: sourceFile, line, column, level: "info", rule: "non-dbui-component", element: tagName,
        message: `<${tagName}> is not a known DBUI component.`,
        fix: `Verify this is intentional. If it should be DBUI, replace with a DBUI export. If it's local product code, this is fine.`,
        source: opening.getText().slice(0, 80),
      })
    }
  }

  for (const attr of opening.getAttributes()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
    const ja = attr.asKind(SyntaxKind.JsxAttribute)
    const attrName = ja.getNameNode().getText()
    const init = ja.getInitializer()
    if (!init) continue

    if (attrName === "className") {
      let value = ""
      if (init.getKind() === SyntaxKind.StringLiteral) {
        value = init.getText().replace(/^['"]|['"]$/g, "")
      } else if (init.getKind() === SyntaxKind.JsxExpression) {
        const expr = init.asKind(SyntaxKind.JsxExpression).getExpression()
        if (expr) value = expr.getText()
      }
      if (value) checkClassName(value, sourceFile, line, column, tagName)
    }
    if (attrName === "style") {
      checkInlineStyle(ja, sourceFile, line, column, tagName)
    }
  }
}

/**
 * Every source tree that ships UI, not just the two that consume it.
 *
 * The default scan used to be the portal and the shells — the surfaces that
 * compose DBUI — which left the components, the charts and the Genie primitives
 * unread by the check written to police them. A rule that never runs on the
 * library it describes only ever measures its callers.
 */
const SCAN_ROOTS = [
  "apps/portal/src",
  "packages/dbui-shells/src",
  "packages/dbui/src",
  "packages/dbui-genie/src",
  "packages/dbui-viz/src",
]

/**
 * `.ts` as well as `.tsx`. A CVA variant table and a chart palette are both
 * plain modules, so an extension filter that stops at `.tsx` cannot see them.
 * `.d.ts` stays out: it declares types and styles nothing.
 *
 * Reading them is only half of it, and the half that is done. Every rule below
 * enters through a JsxOpeningElement, so a module with no JSX is parsed and
 * yields nothing — `packages/dbui-viz/src/lib/theme.ts` holds 63 literal hexes
 * and still reports clean. Teaching the color rules to read an object literal
 * is a change to rule logic and is deliberately not made here.
 */
const isLintable = (f) => (f.endsWith(".ts") || f.endsWith(".tsx")) && !f.endsWith(".d.ts")

function gatherFiles(args) {
  if (args.length > 0 && !args[0].startsWith("--")) {
    const out = []
    for (const a of args) {
      const p = path.resolve(a)
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
        walk(p, (f) => {
          if (isLintable(f)) out.push(f)
        })
      } else {
        out.push(p)
      }
    }
    return out
  }
  const candidates = []
  for (const dir of SCAN_ROOTS.map((d) => path.join(ROOT, d))) {
    if (fs.existsSync(dir)) walk(dir, (f) => {
      if (isLintable(f)) candidates.push(f)
    })
  }
  return candidates
}

function walk(dir, fn) {
  for (const entry of fs.readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue
    const p = path.join(dir, entry)
    const s = fs.statSync(p)
    if (s.isDirectory()) walk(p, fn)
    else fn(p)
  }
}

function escapeMd(s) {
  return s.replace(/\|/g, "\\|").replace(/\n/g, " ").slice(0, 200)
}

function reportMarkdown(fileCount) {
  const errors = violations.filter((v) => v.level === "error")
  const warnings = violations.filter((v) => v.level === "warning")
  const info = violations.filter((v) => v.level === "info")

  console.log(`# DBUI React Design Lint Report\n`)
  console.log(`Scanned **${fileCount} file${fileCount === 1 ? "" : "s"}**.`)
  console.log(`- ${errors.length} error${errors.length === 1 ? "" : "s"}`)
  console.log(`- ${warnings.length} warning${warnings.length === 1 ? "" : "s"}`)
  console.log(`- ${info.length} info\n`)

  if (violations.length === 0) {
    console.log(`✅ No violations found. Everything is on-spec.`)
    return
  }

  const byFile = new Map()
  for (const v of violations) {
    const list = byFile.get(v.file) || []
    list.push(v)
    byFile.set(v.file, list)
  }

  for (const [file, list] of byFile) {
    console.log(`## ${file}\n`)
    console.log(`| Line | Level | Rule | Element | Message | Fix |`)
    console.log(`| --- | --- | --- | --- | --- | --- |`)
    for (const v of list) {
      console.log(
        `| ${v.line} | ${v.level} | \`${v.rule}\` | \`<${v.element}>\` | ${escapeMd(v.message)} | ${escapeMd(v.fix)} |`
      )
    }
    console.log()
  }

  console.log(`---\n`)
  console.log(`**Top rules triggered:**`)
  const ruleCounts = new Map()
  for (const v of violations) ruleCounts.set(v.rule, (ruleCounts.get(v.rule) || 0) + 1)
  const sorted = [...ruleCounts.entries()].sort((a, b) => b[1] - a[1])
  for (const [rule, count] of sorted) console.log(`- \`${rule}\` × ${count}`)

  console.log(`\n**Token compliance:** ${tokenComplianceLine()}`)
}

// A single-line compliance readout for var() usage: how many color references
// point at semantic tokens (good) vs raw primitives (R2 violation).
function tokenComplianceLine() {
  const { varRefs, primitiveRefs } = tokenStats
  if (varRefs === 0) return "no var() color references found."
  const good = varRefs - primitiveRefs
  const pct = Math.round((good / varRefs) * 100)
  return `${pct}% (${good}/${varRefs} var() references use a semantic token; ${primitiveRefs} use a raw primitive).`
}

function main() {
  const args = process.argv.slice(2)
  const json = args.includes("--json")
  const files = gatherFiles(args.filter((a) => !a.startsWith("--")))
  if (files.length === 0) {
    console.error("No .ts or .tsx files found.")
    process.exit(1)
  }

  const project = new Project({ skipFileDependencyResolution: true, useInMemoryFileSystem: false })
  for (const f of files) project.addSourceFileAtPath(f)

  for (const sourceFile of project.getSourceFiles()) {
    const filePath = path.relative(ROOT, sourceFile.getFilePath())
    sourceFile.forEachDescendant((node) => {
      if (node.getKind() === SyntaxKind.JsxOpeningElement) {
        checkElement(node.asKind(SyntaxKind.JsxOpeningElement), filePath)
      } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
        checkElement(node.asKind(SyntaxKind.JsxSelfClosingElement), filePath)
      }
    })
  }

  if (json) {
    console.log(JSON.stringify(violations, null, 2))
    return
  }

  reportMarkdown(files.length)
  process.exit(violations.some((v) => v.level === "error") ? 1 : 0)
}

main()
