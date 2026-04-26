/**
 * dbui_lint_react_snippet
 *
 * Lint a snippet of React JSX/TSX code for DBUI compliance.
 * Designed for AI agents to call DURING generation — small, scoped, fast feedback.
 *
 * Detects + suggests fixes for:
 *   - Non-DBUI components (info)
 *   - Plain HTML tags that should be DBUI wrappers (warning)
 *   - Arbitrary Tailwind values (errors / warnings)
 *   - Inline style with hardcoded colors / off-scale spacing
 *   - 6 DBUI-specific rules: no-raw-button, no-raw-input, icons-from-dbui,
 *     no-asChild, typography-13px, base-shell-required
 *
 * Each violation includes a concrete fix suggestion. For component or icon
 * violations, callers should chain into dbui_resolve_component / dbui_resolve_icon
 * to get the right replacement.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { Project, SyntaxKind } from "ts-morph"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/tokens.json"), "utf-8"))
const dbui = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/dbui-components.json"), "utf-8"))
const icons = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/icons.json"), "utf-8"))

const DBUI_SET = new Set([...dbui.ui, ...dbui.shells, ...icons.map((i) => i.name)])
const ALWAYS_ALLOWED = new Set(dbui.tagsAlwaysAllowed.always)
const PREFER_WRAPPER_HINTS = dbui.tagsAlwaysAllowed["ok-but-prefer-wrapper"]
const APPROVED_HEX = new Set([...tokens.colors.light, ...tokens.colors.dark])
const APPROVED_SPACING = new Set(tokens.spacing.px)
const TYPE_RAMP = tokens.type.ramp

const COLOR_PREFIXES = new Set(["bg", "border", "border-t", "border-r", "border-b", "border-l", "border-x", "border-y", "ring", "ring-offset", "fill", "stroke", "outline", "decoration", "from", "to", "via", "placeholder", "divide", "accent", "caret"])
// "shadow" is intentionally NOT in COLOR_PREFIXES — handled separately below
const SPACING_PREFIXES = new Set(["p", "pt", "pr", "pb", "pl", "px", "py", "ps", "pe", "m", "mt", "mr", "mb", "ml", "mx", "my", "ms", "me", "gap", "gap-x", "gap-y", "space-x", "space-y", "top", "right", "bottom", "left", "inset", "inset-x", "inset-y", "w", "h", "min-w", "min-h", "max-w", "max-h", "size"])
const FONT_SIZE_PREFIXES = new Set(["text"])
const LEADING_PREFIXES = new Set(["leading"])
const TRACKING_PREFIXES = new Set(["tracking"])
const RADIUS_PREFIXES = new Set(["rounded", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-tl", "rounded-tr", "rounded-bl", "rounded-br"])
const SHADOW_PREFIXES = new Set(["shadow"])
const Z_INDEX_PREFIXES = new Set(["z"])
const OPACITY_PREFIXES = new Set(["opacity"])
const FONT_FAMILY_PREFIXES = new Set(["font"]) // for font-[...] arbitrary; keyword variants handled separately
const APPROVED_RADIUS = new Set([0, 4, 8, 12, 16, 24, 999])
// DBUI standard shadow utilities. Anything else (raw box-shadow strings) is non-token.
const APPROVED_SHADOWS = new Set(["none", "xs", "sm", "md", "lg", "xl", "2xl", "inner", "focus"])
// DBUI z-layers. Loosely follows Tailwind defaults + Base UI primitives' z-50 for overlays.
const APPROVED_Z = new Set([0, 10, 20, 30, 40, 50])
// DBUI standard font-weights: 400 (normal) and 600 (semibold). Anything else flagged.
const APPROVED_FONT_WEIGHT_KEYWORDS = new Set(["normal", "semibold"])
const FONT_WEIGHT_KEYWORDS = new Set(["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"])
const APPROVED_FONT_FAMILY_KEYWORDS = new Set(["sans", "display", "mono"])
const ARBITRARY_VALUE_RE = /\b([a-z]+(?:-[a-z]+)*)-\[([^\]]+)\]/g

const NON_DBUI_ICON_LIBS = new Set([
  "lucide-react",
  "@heroicons/react",
  "@heroicons/react/24/outline",
  "@heroicons/react/24/solid",
  "@heroicons/react/20/solid",
  "react-icons",
  "@radix-ui/react-icons",
  "@phosphor-icons/react",
])

export const tool = {
  name: "dbui_lint_react_snippet",
  description:
    "Lint a React/TSX code snippet for DBUI compliance. Returns violations with concrete fixes. Call this after generating any UI code to catch arbitrary tokens, raw HTML, non-DBUI icons, asChild antipattern, and DBUI-specific rules. For each component or icon violation, chain into dbui_resolve_component / dbui_resolve_icon for the right replacement.",
  inputSchema: {
    type: "object",
    properties: {
      code: {
        type: "string",
        description: "The React/TSX source code to lint. Can be a partial snippet — the tool will tolerate incomplete/invalid syntax around the JSX it's checking.",
      },
      filename: {
        type: "string",
        description: "Optional filename for context (e.g. 'apps/portal/src/stories/Card.stories.tsx'). Defaults to '<snippet>'.",
        default: "<snippet>",
      },
    },
    required: ["code"],
  },
}

function parseHex(v) {
  const m = v.match(/^#([0-9a-fA-F]{3,8})$/)
  if (!m) return null
  let hex = m[1].toUpperCase()
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("")
  return "#" + hex.slice(0, 6)
}

function nearestSpacing(px) {
  let best = 0, bestDiff = Infinity
  for (const v of APPROVED_SPACING) {
    const d = Math.abs(px - v)
    if (d < bestDiff) { bestDiff = d; best = v }
  }
  return best
}

function suggestSpacingClass(prefix, px) {
  const t = px === 0 ? 0 : px === 2 ? 0.5 : px / 4
  return `${prefix}-${t}`
}

function checkClassName(cls, file, line, col, element, violations) {
  let m
  ARBITRARY_VALUE_RE.lastIndex = 0
  while ((m = ARBITRARY_VALUE_RE.exec(cls))) {
    const [whole, prefix, raw] = m
    const hex = parseHex(raw)
    if (hex) {
      if (!APPROVED_HEX.has(hex)) {
        violations.push({
          line, column: col, level: "error", rule: "no-arbitrary-color", element,
          message: `Hardcoded color \`${whole}\` (${hex}) is not a DBUI token.`,
          fix: `Call dbui_resolve_token({ value: "${hex}", type: "color" }) to get the right token, then use the suggested Tailwind class.`,
          source: cls,
        })
      } else {
        violations.push({
          line, column: col, level: "warning", rule: "prefer-token-class", element,
          message: `\`${whole}\` matches a DBUI hex but uses arbitrary syntax.`,
          fix: `Replace with the named class. Call dbui_resolve_token({ value: "${hex}", type: "color" }) for the token name.`,
          source: cls,
        })
      }
      continue
    }
    const pxM = raw.match(/^(\d+(?:\.\d+)?)px$/)
    if (pxM) {
      const px = parseFloat(pxM[1])
      if (FONT_SIZE_PREFIXES.has(prefix)) {
        const onRamp = TYPE_RAMP.some((r) => r.size === px)
        if (!onRamp) {
          violations.push({
            line, column: col, level: "error", rule: "off-ramp-type-size", element,
            message: `Font size \`${whole}\` (${px}px) is not on the DBUI type ramp.`,
            fix: `Use a ramp value: ${TYPE_RAMP.map((r) => `${r.size}px (${r.name})`).join(", ")}. DBUI base is 13px (paragraph), not 14px.`,
            source: cls,
          })
        }
        continue
      }
      if (LEADING_PREFIXES.has(prefix)) {
        const onRamp = TYPE_RAMP.some((r) => r.lineHeight === px)
        if (!onRamp) {
          violations.push({
            line, column: col, level: "warning", rule: "off-ramp-line-height", element,
            message: `Line-height \`${whole}\` (${px}px) is not on the DBUI type ramp.`,
            fix: `Match the ramp: ${TYPE_RAMP.map((r) => `${r.size}/${r.lineHeight}`).join(", ")}.`,
            source: cls,
          })
        }
        continue
      }
      if (RADIUS_PREFIXES.has(prefix)) {
        if (!APPROVED_RADIUS.has(px)) {
          violations.push({
            line, column: col, level: "warning", rule: "non-token-radius", element,
            message: `Border radius \`${whole}\` (${px}px) is not a DBUI token.`,
            fix: `Use rounded-sm (4), rounded-md (8), rounded-lg (12), rounded-xl (16), rounded-2xl (24), or rounded-full.`,
            source: cls,
          })
        }
        continue
      }
      if (SPACING_PREFIXES.has(prefix)) {
        if (!APPROVED_SPACING.has(px)) {
          violations.push({
            line, column: col, level: "error", rule: "off-scale-spacing", element,
            message: `Spacing \`${whole}\` (${px}px) is not on the 4px scale.`,
            fix: `Use ${nearestSpacing(px)}px → ${suggestSpacingClass(prefix, nearestSpacing(px))}. Call dbui_resolve_token({ value: "${px}px", type: "spacing" }) for details.`,
            source: cls,
          })
        } else {
          violations.push({
            line, column: col, level: "warning", rule: "prefer-token-class", element,
            message: `\`${whole}\` is on-scale but arbitrary — prefer the named utility.`,
            fix: `Replace with ${suggestSpacingClass(prefix, px)}.`,
            source: cls,
          })
        }
        continue
      }
    }

    // ── Shadow arbitrary values (shadow-[...] with raw box-shadow string) ──
    if (SHADOW_PREFIXES.has(prefix)) {
      violations.push({
        line, column: col, level: "error", rule: "no-arbitrary-shadow", element,
        message: `Custom shadow \`${whole}\` is non-tokenized.`,
        fix: `Use a DBUI shadow utility: shadow-xs, shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl, shadow-focus, shadow-inner, or shadow-none.`,
        source: cls,
      })
      continue
    }

    // ── Z-index arbitrary value ──
    if (Z_INDEX_PREFIXES.has(prefix)) {
      const z = parseInt(raw)
      if (!APPROVED_Z.has(z)) {
        violations.push({
          line, column: col, level: "warning", rule: "non-token-z-index", element,
          message: `\`${whole}\` (z-index ${z}) is not on the DBUI z-scale.`,
          fix: `Use one of: z-0 (base), z-10 (raised), z-20 (sticky), z-30 (banner), z-40 (drawer), z-50 (overlay/modal/dropdown). If you need a higher layer, add a token in globals.css first.`,
          source: cls,
        })
      }
      continue
    }

    // ── Opacity arbitrary value ──
    if (OPACITY_PREFIXES.has(prefix)) {
      const opacity = parseFloat(raw)
      // Tailwind opacity scale: 0, 5, 10, 15, 20, 25, ..., 95, 100
      const valid = !Number.isNaN(opacity) && opacity >= 0 && opacity <= 100 && opacity % 5 === 0
      if (!valid) {
        violations.push({
          line, column: col, level: "warning", rule: "non-token-opacity", element,
          message: `\`${whole}\` is an off-scale opacity.`,
          fix: `Use the Tailwind opacity scale (multiples of 5: opacity-0, opacity-5, ..., opacity-100).`,
          source: cls,
        })
      }
      continue
    }

    // ── Tracking (letter-spacing) arbitrary ──
    if (TRACKING_PREFIXES.has(prefix)) {
      violations.push({
        line, column: col, level: "info", rule: "non-token-tracking", element,
        message: `\`${whole}\` is custom letter-spacing. DBUI generally relies on the type ramp's defaults.`,
        fix: `Use tracking-tight, tracking-normal, tracking-wide. If you need a specific value, add a token first.`,
        source: cls,
      })
      continue
    }

    // ── Font family arbitrary (font-["Custom Font"]) ──
    if (FONT_FAMILY_PREFIXES.has(prefix) && !/^\d+$/.test(raw)) {
      violations.push({
        line, column: col, level: "error", rule: "non-token-font-family", element,
        message: `\`${whole}\` uses a non-DBUI font family.`,
        fix: `Use font-sans (SF Pro Text), font-display (SF Pro Display), or font-mono (SF Mono).`,
        source: cls,
      })
      continue
    }
  }

  // ── text-sm: DBUI base is 13px, not 14px ──
  if (/\btext-sm\b/.test(cls)) {
    violations.push({
      line, column: col, level: "warning", rule: "typography-13px", element,
      message: `\`text-sm\` is Tailwind's 14px size, but DBUI's base is 13px.`,
      fix: `Replace with \`text-[13px]\` (DBUI paragraph) or use the explicit \`text-base\` (16px) if a larger size is intended.`,
      source: cls,
    })
  }

  // ── Font weight keywords (font-medium, font-bold, etc. — DBUI only uses normal/semibold) ──
  for (const w of FONT_WEIGHT_KEYWORDS) {
    const re = new RegExp(`\\bfont-${w}\\b`)
    if (re.test(cls) && !APPROVED_FONT_WEIGHT_KEYWORDS.has(w)) {
      violations.push({
        line, column: col, level: "warning", rule: "non-token-font-weight", element,
        message: `\`font-${w}\` is not in the DBUI weight set.`,
        fix: `DBUI uses font-normal (400) for body text and font-semibold (600) for emphasis. If you need a different weight, add a token to globals.css.`,
        source: cls,
      })
      break // only flag once per className
    }
  }

  // ── Shadow keywords (shadow-md, shadow-2xl, etc. — verify against approved set) ──
  const shadowMatch = cls.match(/\bshadow-([a-z0-9]+)\b/)
  if (shadowMatch && !APPROVED_SHADOWS.has(shadowMatch[1])) {
    violations.push({
      line, column: col, level: "warning", rule: "non-token-shadow", element,
      message: `\`shadow-${shadowMatch[1]}\` is not a DBUI shadow.`,
      fix: `Use shadow-xs, shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl, shadow-focus, shadow-inner, or shadow-none.`,
      source: cls,
    })
  }
}

function checkInlineStyle(node, line, col, element, violations) {
  node.forEachDescendant((c) => {
    if (c.getKind() !== SyntaxKind.PropertyAssignment) return
    const pa = c.asKind(SyntaxKind.PropertyAssignment)
    const name = pa.getName()
    const init = pa.getInitializer()
    if (!init) return
    const text = init.getText().replace(/^['"`]|['"`]$/g, "")
    if (/^#[0-9a-fA-F]{3,8}$/.test(text)) {
      const hex = parseHex(text)
      if (hex && !APPROVED_HEX.has(hex)) {
        violations.push({
          line, column: col, level: "error", rule: "inline-hardcoded-color", element,
          message: `Inline style \`${name}: '${text}'\` uses a non-token color.`,
          fix: `Use Tailwind classes or var(--token). Call dbui_resolve_token({ value: "${hex}", type: "color" }).`,
          source: `${name}: ${text}`,
        })
      }
    }
  })
}

function checkImports(sourceFile, violations) {
  for (const imp of sourceFile.getImportDeclarations()) {
    const mod = imp.getModuleSpecifierValue()
    if (NON_DBUI_ICON_LIBS.has(mod) || NON_DBUI_ICON_LIBS.has(mod.split("/")[0]) || mod.startsWith("@heroicons/") || mod.startsWith("react-icons/")) {
      const { line, column } = sourceFile.getLineAndColumnAtPos(imp.getStart())
      const namedImports = imp.getNamedImports().map((n) => n.getName())
      violations.push({
        line, column, level: "error", rule: "icons-from-dbui", element: "<import>",
        message: `Icons imported from "${mod}" — use DBUI icons instead. Imported: ${namedImports.join(", ")}.`,
        fix: `For each icon, call dbui_resolve_icon({ query: "<icon name or concept>" }) to find the DBUI equivalent in @muditmittal/dbui/components/icons/.`,
        source: imp.getText(),
      })
    }
  }
}

function checkElement(opening, sourceFile, violations) {
  const tagName = opening.getTagNameNode().getText()
  const { line, column } = sourceFile.getLineAndColumnAtPos(opening.getStart())
  const isComponent = /^[A-Z]/.test(tagName)
  const isMember = tagName.includes(".")

  // ── Raw HTML rules ──
  if (!isComponent) {
    if (tagName === "button") {
      violations.push({
        line, column, level: "error", rule: "no-raw-button", element: tagName,
        message: `<button> should be replaced with DBUI <Button>.`,
        fix: `import { Button } from "@muditmittal/dbui/components/ui/button"; replace <button>...</button> with <Button>...</Button>. Use variant="ghost" for icon-only, "outline" for secondary actions.`,
        source: opening.getText().slice(0, 100),
      })
    } else if (tagName === "input") {
      violations.push({
        line, column, level: "error", rule: "no-raw-input", element: tagName,
        message: `<input> should be replaced with DBUI <Input>.`,
        fix: `import { Input } from "@muditmittal/dbui/components/ui/input"; for forms also wrap in <Field>/<FormInput>. <Textarea> for multiline.`,
        source: opening.getText().slice(0, 100),
      })
    } else if (!ALWAYS_ALLOWED.has(tagName) && PREFER_WRAPPER_HINTS[tagName]) {
      violations.push({
        line, column, level: "warning", rule: "prefer-dbui-wrapper", element: tagName,
        message: `<${tagName}> is allowed but a DBUI wrapper is usually preferred.`,
        fix: PREFER_WRAPPER_HINTS[tagName],
        source: opening.getText().slice(0, 100),
      })
    }
  } else if (isComponent && !isMember) {
    if (!DBUI_SET.has(tagName)) {
      violations.push({
        line, column, level: "info", rule: "non-dbui-component", element: tagName,
        message: `<${tagName}> is not a known DBUI component.`,
        fix: `Verify intentional. If a DBUI replacement exists, call dbui_resolve_component({ query: "<what this does>" }) to find it.`,
        source: opening.getText().slice(0, 100),
      })
    }
  }

  // ── asChild antipattern (Base UI prefers `render` prop) ──
  for (const attr of opening.getAttributes()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
    const ja = attr.asKind(SyntaxKind.JsxAttribute)
    const attrName = ja.getNameNode().getText()
    if (attrName === "asChild") {
      violations.push({
        line, column, level: "warning", rule: "no-asChild", element: tagName,
        message: `<${tagName} asChild> uses Radix-style asChild prop. DBUI uses Base UI's render prop instead.`,
        fix: `Replace asChild with render: <${tagName} render={<YourElement />}>. See packages/dbui/CLAUDE.md "render prop" section.`,
        source: opening.getText().slice(0, 100),
      })
    }
    const init = ja.getInitializer()
    if (!init) continue
    if (attrName === "className") {
      let value = ""
      if (init.getKind() === SyntaxKind.StringLiteral) value = init.getText().replace(/^['"]|['"]$/g, "")
      else if (init.getKind() === SyntaxKind.JsxExpression) {
        const expr = init.asKind(SyntaxKind.JsxExpression).getExpression()
        if (expr) value = expr.getText()
      }
      if (value) checkClassName(value, sourceFile.getFilePath(), line, column, tagName, violations)
    }
    if (attrName === "style") checkInlineStyle(ja, line, column, tagName, violations)
  }
}

export function run({ code, filename = "<snippet>" }) {
  const violations = []
  const project = new Project({ useInMemoryFileSystem: true, skipFileDependencyResolution: true })
  // Wrap in a synthetic component if needed so ts-morph can parse partial snippets
  const wrapped = code.includes("function ") || code.includes("=>") || code.includes("export ")
    ? code
    : `const __snippet__ = () => (\n${code}\n)`
  let sourceFile
  try {
    sourceFile = project.createSourceFile(filename.endsWith(".tsx") ? filename : filename + ".tsx", wrapped)
  } catch (e) {
    return { error: `Failed to parse: ${e.message}`, file: filename }
  }
  checkImports(sourceFile, violations)
  sourceFile.forEachDescendant((node) => {
    if (node.getKind() === SyntaxKind.JsxOpeningElement) {
      checkElement(node.asKind(SyntaxKind.JsxOpeningElement), sourceFile, violations)
    } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
      checkElement(node.asKind(SyntaxKind.JsxSelfClosingElement), sourceFile, violations)
    }
  })
  // base-shell-required: only warn if it's a top-level page
  if (/export\s+default\s+function\s+(?:Page|App|Layout)/.test(code)) {
    const hasBase = /<Base[\s>]/.test(code) || /<Shell[\s>]/.test(code) || /<PlatformHeader[\s>]/.test(code)
    if (!hasBase) {
      violations.push({
        line: 1, column: 1, level: "warning", rule: "base-shell-required", element: "<Page>",
        message: `Top-level page component does not use a DBUI shell.`,
        fix: `Wrap the page in <Base> (catalog explorer style), <Shell>, or compose <PlatformHeader> + <PlatformNav> + content.`,
        source: code.split("\n")[0],
      })
    }
  }

  const summary = {
    errors: violations.filter((v) => v.level === "error").length,
    warnings: violations.filter((v) => v.level === "warning").length,
    info: violations.filter((v) => v.level === "info").length,
  }
  return {
    file: filename,
    summary,
    violations,
    nextSteps: violations
      .filter((v) => v.fix.includes("dbui_resolve_"))
      .slice(0, 3)
      .map((v) => v.fix.match(/dbui_resolve_\w+/)?.[0])
      .filter(Boolean),
  }
}
