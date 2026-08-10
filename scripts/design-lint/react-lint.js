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

// Every package, and the icons. The icons were the omission that mattered:
// dbui-components.json held the string "$see icons.json" where the names should
// have been, so 803 DBUI icons came back as unknown components.
const DBUI_COMPONENT_SET = new Set([
  ...components.ui,
  ...components.shells,
  ...components.chat,
  ...components.viz,
  ...components.icons,
])

/**
 * The one directory where a raw control is the answer rather than the problem.
 *
 * `Button` is a `<button>`. So are the tree item, the editor tab, the navbar
 * item, the sort header, the tag remove and the alert close — every raw tag in
 * there carries a `data-slot`, and every one of them is DBUI defining what it
 * exports. Reporting them made 17 of the rule's 36 findings unactionable and
 * gave the whole rule an asterisk in the docs.
 *
 * Scoped to `ui/`, so the shells, chat, viz and the portal are all still
 * consumers and still judged.
 */
const isPrimitiveSource = (file) => file.startsWith("packages/dbui/src/components/ui/")

/* The Drawer family, which `no-as-child` does not apply to. See the rule for
 * why. Anchored, so a Base UI component that merely ends in the word — a
 * hypothetical `SideDrawerTrigger` wrapping Base UI — is still judged. */
const DRAWER_AS_CHILD = /^Drawer[A-Z]?/

/* Interactive HTML tags, and what to reach for instead.
 *
 * This lives with the rule rather than in dbui-components.json, which is now
 * generated end to end. A replacement suggestion is a judgement about the
 * system, not a fact about its exports, and a generated file is the wrong place
 * to keep a judgement — the next regeneration deletes it.
 */
const FORBIDDEN_HTML_TAGS = {
  button: "Use <Button>, <Toggle> or <SplitButton>.",
  input: "Use <Input>, <Textarea> or <InputGroupInput>.",
  select: "Use <Select> or <Combobox>.",
  textarea: "Use <Textarea>.",
}

const APPROVED_HEX = new Set([...tokens.colors.light, ...tokens.colors.dark])

/* Examples for the fix strings, read out of the shipped semantics.
 *
 * Three of them used to name text-foreground, bg-primary, bg-muted and
 * var(--primary), all deleted by the token migration, and one named
 * var(--surface-base) without the --db- prefix, which has never existed. An
 * agent following any of them writes a class that resolves to nothing, so the
 * element renders with no color at all — a worse failure than the hardcoded
 * hex the rule was objecting to, and harder to see.
 *
 * Derived, so the advice cannot outlive the token. */
const roleExample = (group) => {
  const list = tokens.colors.semanticTokens[group] ?? []
  return list.find((n) => n.endsWith("-base")) ?? list[0]
}
const EG_SURFACE = roleExample("surface")
const EG_TEXT = roleExample("text")
const EG_BORDER = roleExample("border")

/* ─── The dimensional families, as generated from theme.config.mjs ───
 *
 * `tokens.spacing.px` used to be the whole allowlist, and it was carried
 * forward untouched on every generator run, so it still approved 6, 10 and 14
 * after the scale dropped them. It is now derived, and split by family: space
 * and size are deliberately not the same nine stops, so a rule that judges
 * `h-5` against the padding scale is asking the wrong question.
 */
const DIM = tokens.dimensions
const APPROVED_SPACING_PX = new Set(DIM.space.px)
const APPROVED_RADIUS = new Set(DIM.radius.px)

// ─── Token-compliance (granular color system) ───
// Primitives (interface/*, status/*, viz/<hue>/*, base/*) are the raw palette and
// must NEVER be consumed directly in product code — only semantics may be.
// tokens.json carries the ramp names so we recognize a primitive var by shape.
const PRIMITIVE_RAMPS = new Set(Object.keys(tokens.colors.primitives || {}))
// Resolved hex → the primitive it is, so a palette value pasted into a class
// can be named rather than described as "a DBUI hex".
const PRIMITIVE_HEX = new Map()
for (const [ramp, steps] of Object.entries(tokens.colors.primitives || {})) {
  for (const [step, hex] of Object.entries(steps)) PRIMITIVE_HEX.set(hex.toUpperCase(), `${ramp}-${step}`)
}
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
        fix: `Consume a semantic instead — bg-${EG_SURFACE}, text-${EG_TEXT}, or var(--db-${EG_SURFACE}) if a class will not do.`,
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

/* ─── Family lookup ───
 *
 * Which family a prefix belongs to is generated, so the two answers the linter
 * gives — is this legal, and what should it be instead — come from the same
 * place the CSS does.
 */
const FAMILY_OF_PREFIX = new Map()
for (const [name, fam] of Object.entries(DIM)) {
  if (name.startsWith("$")) continue
  for (const prefix of fam.reaches) FAMILY_OF_PREFIX.set(prefix, { name, ...fam })
}

// Ties go up. 6px sits exactly between 4 and 8 and 10px between 8 and 12, which
// is most of the drift there is, and the snap pass resolved both upward — see
// the rules recorded in docs/token-simplification.md. Advice that disagrees
// with the decision already taken is advice nobody follows.
const nearestStop = (px, fam) =>
  fam.px.reduce((best, v) => (Math.abs(px - v) <= Math.abs(px - best) ? v : best), fam.px[0])
const stepAt = (px, fam) => fam.steps[fam.px.indexOf(px)]
const suggestClass = (prefix, px, fam) => `${prefix}-${stepAt(nearestStop(px, fam), fam)}`

// A family carries a stop when it has a use for it, so a value past either end
// is not a decision it refused — the multiplier is still declared and a page
// margin of 48px was never a padding step. Only what falls between the ends is
// a claim the family can be wrong about.
const inRange = (px, fam) => px >= fam.range[0] && px <= fam.range[1]

/* Every bare numeric utility on a family's namespace: `gap-1.5`, `-mt-3`,
 * `hover:size-3.5`, `group-data-[open]:py-2.5`.
 *
 * This is the half of the rule that was missing. `off-scale-spacing` only ever
 * read bracket values, so it saw `p-[6px]` and was blind to `p-1.5`, which is
 * the same six pixels written the way people actually write them — none of the
 * 64 six-pixel sites the snap pass fixed had a bracket. Longest prefix first,
 * so `space-y` wins over `space`. The trailing guard rejects `w-1/2` and
 * `basis-1.5xl`, and the leading one rejects the `h-1` inside `aspect-h-1`.
 */
const NUMERIC_PREFIXES = [...FAMILY_OF_PREFIX.keys()]
  .filter((p) => p !== "border" && !p.startsWith("rounded") && !p.startsWith("divide") && p !== "outline")
  .sort((a, b) => b.length - a.length)
const BARE_UTILITY_RE = new RegExp(
  String.raw`(?<![\w-])-?(${NUMERIC_PREFIXES.join("|")})-(\d+(?:\.\d+)?)(?![\w./-])`,
  "g"
)

// ─── Tailwind prefix → token category mapping ───
// Each prefix maps to the category we should validate against.
// `text` belongs here. It was missing, which is the sort of omission that makes
// a color rule quietly half a rule — text-foreground is the single most common
// legacy class there was.
const COLOR_PREFIXES = [
  "bg", "text", "border", "border-t", "border-r", "border-b", "border-l", "border-x", "border-y",
  "ring", "ring-offset", "fill", "stroke", "outline", "shadow", "decoration",
  "from", "to", "via", "placeholder", "divide", "accent", "caret",
]
const FONT_SIZE_PREFIXES = new Set(["text"]) // text-[13px] is a size; text-[#abc] is a color
const LEADING_PREFIXES = new Set(["leading"])
/* Advice, generated. Six of the fourteen ramp steps share a size and line with
 * another, so an undeduplicated list says 13/16 three times and reads as a
 * second bug. The radius list was prose with the stops typed into it, which
 * survived the family being renumbered. */
const RAMP_PAIRS = [...new Set(tokens.type.ramp.map((r) => `${r.size}/${r.line}`))].join(", ")
// First wins, so 13px names type-label rather than type-code and 15px names
// type-paragraph rather than type-paragraph-bold. The config's order is the
// order of increasing specialness, so the first step at a size is the one an
// author most likely wants.
const RAMP_SIZES = (() => {
  const bySize = new Map()
  for (const r of tokens.type.ramp) if (!bySize.has(r.size)) bySize.set(r.size, `${r.size}px (type-${r.name})`)
  return [...bySize.values()].join(", ")
})()
// rounded-0 is deliberately not offered. The token exists, but Tailwind emits
// static utilities after functional ones, so rounded-none wins wherever both
// could apply and rounded-0 only works where nothing else sets a radius.
const RADIUS_STOPS = DIM.radius.steps
  .map((step, i) => (step === 0 ? "rounded-none (0px)" : `rounded-${step} (${DIM.radius.px[i]}px)`))
  .join(", ")
const RADIUS_PREFIXES = new Set(DIM.radius.reaches)
// One rule per family, so a report can be scoped to a padding pass or a control
// -height pass without reading every line of it.
const OFF_SCALE_RULE = { space: "off-scale-spacing", size: "off-scale-size" }

/**
 * The bare form of the same question the bracket scan asks.
 *
 * `p-1.5` and `p-[6px]` are one defect written two ways, and only one of them
 * was being read. The bare form is the common one — the whole 64-site six-pixel
 * drift was written as `gap-1.5` and `py-2.5`, and the linter reported clean
 * through all of it.
 *
 * Values outside the family's range are left alone. Tailwind's multiplier is
 * still declared on purpose, so `mt-12` compiles at 48px and is a page distance
 * rather than a space stop the family refused. Closing the scale is a separate
 * decision with its own call-site cost.
 */
function checkBareUtilities(className, file, line, column, element) {
  BARE_UTILITY_RE.lastIndex = 0
  let m
  while ((m = BARE_UTILITY_RE.exec(className))) {
    const [whole, prefix, rawStep] = m
    const fam = FAMILY_OF_PREFIX.get(prefix)
    if (!fam) continue
    const step = parseFloat(rawStep)
    if (fam.steps.includes(step)) continue
    const px = step * fam.unitPx
    if (!inRange(px, fam)) continue
    // min-w and max-w read Tailwind's spacing key rather than --width-*, which
    // is the one asymmetry in the bridge (F11). Worth saying at the call site,
    // because the author almost always meant the size family.
    const unbridged = prefix === "min-w" || prefix === "max-w"
    violations.push({
      file, line, column, level: "error", rule: OFF_SCALE_RULE[fam.name], element,
      message: `\`${whole.replace(/^-/, "")}\` is ${px}px, which the ${fam.name} family does not carry.`,
      fix:
        `Nearest stop is ${nearestStop(px, fam)}px — ${suggestClass(prefix, px, fam)}.` +
        (unbridged ? ` ${prefix}-* is not bridged, so it rides Tailwind's multiplier rather than a size stop.` : ""),
      source: className,
    })
  }
}

/**
 * A px type literal that happens to land on the ramp.
 *
 * The two off-ramp rules only ever objected to the value. The documented rule
 * bans the literal — "never reintroduce a text-[Npx] or leading-[Npx]" — because
 * a px size does not move when the root font size does, so the box grows around
 * a label that stays put. Being on the ramp today is not the property that
 * matters; being unable to follow it is.
 *
 * This is the whole gap. Every one of the seven sites the last ramp pass fixed
 * by hand was `text-[12px] leading-[16px]` or `text-[13px]` — on-ramp values,
 * invisible to both rules, and one of them is still live in Popover.stories.
 */
function pxTypeLiteral(whole, px, utility, className, file, line, column, element) {
  violations.push({
    file, line, column, level: "error", rule: "px-type-literal", element,
    message: `\`${whole}\` is ${px}px written as a literal. It is on the ramp, but it cannot follow it.`,
    fix: `Use ${utility}, which carries the size, line height, tracking, weight and family together.`,
    source: className,
  })
}

/**
 * A color literal anywhere in a module, not only inside a className.
 *
 * Every other rule enters through a JSX element, so a module with no JSX parses
 * and yields nothing. That is how dbui-viz carried its own palette: 63 hexes in
 * a plain .ts object, invisible to the linter written to police exactly that,
 * and the charts drew the same series colors in light and dark for as long as
 * it stood. A value spelled out in a module has no modes to switch between.
 *
 * Approved or not. This is the one color rule that does not consult the hex
 * allowlist, because every one of those 63 was on it — they were viz primitives,
 * which is worse rather than better: R2 says product code consumes semantics
 * and never the palette, and a primitive resolved at author time is a primitive
 * consumed directly.
 *
 * JSX attributes are skipped, since the className and inline-style rules cover
 * them with better advice.
 */
const COLOR_LITERAL_RE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|color-mix)\(/g

function checkModuleColors(sourceFile, file) {
  for (const node of sourceFile.getDescendantsOfKind(SyntaxKind.StringLiteral).concat(
    sourceFile.getDescendantsOfKind(SyntaxKind.NoSubstitutionTemplateLiteral)
  )) {
    if (node.getFirstAncestorByKind(SyntaxKind.JsxAttribute)) continue
    const text = node.getLiteralText()
    COLOR_LITERAL_RE.lastIndex = 0
    const found = text.match(COLOR_LITERAL_RE)
    if (!found) continue
    const { line, column } = sourceFile.getLineAndColumnAtPos(node.getStart())
    violations.push({
      file, line, column, level: "error", rule: "no-module-color-literal",
      element: node.getParent()?.getKind() === SyntaxKind.PropertyAssignment
        ? node.getParent().asKind(SyntaxKind.PropertyAssignment).getName()
        : "module",
      message: `\`${found[0]}\` is a color written into a module, so it has one value in both modes.`,
      fix: `Resolve a semantic at runtime instead — read var(--db-<name>) off a probe element, as packages/dbui-viz/src/lib/theme.ts now does.`,
      source: text.slice(0, 120),
    })
  }
}

/* The shadcn-flat color layer the migration deleted.
 *
 * A class built from one of these compiles, resolves to nothing, and the
 * property drops. The element still renders, just without the color, which is
 * why 474 of them survived the first migration pass — the verifier shared a
 * list with the codemod and confidently reported zero. The names come from the
 * generator, filtered against what actually shipped, so nothing here can
 * accuse a token that came back.
 *
 * `border-border-base` must not match `border-border`, so the trailing guard
 * rejects a hyphen as well as a word character.
 */
// Longest alternative first in both lists, so ring-offset beats ring and
// sidebar-foreground beats sidebar.
const longestFirst = (a, b) => b.length - a.length
const LEGACY_NAMES = [...tokens.colors.deletedLegacy].sort(longestFirst).join("|")
const LEGACY_CLASS_RE = new RegExp(
  String.raw`(?<![\w-])(?:${[...COLOR_PREFIXES].sort(longestFirst).join("|")})-(${LEGACY_NAMES})(?![\w-])`,
  "g"
)
const LEGACY_VAR_RE = new RegExp(String.raw`var\(\s*--(${LEGACY_NAMES})\s*[,)]`, "g")

function checkLegacyTokens(text, file, line, column, element) {
  for (const re of [LEGACY_CLASS_RE, LEGACY_VAR_RE]) {
    re.lastIndex = 0
    let m
    while ((m = re.exec(text))) {
      // The var() pattern has to consume the closing delimiter to know the name
      // ended, so put it back rather than print `var(--primary`.
      const found = m[0].endsWith(",") || m[0].endsWith(")") ? `${m[0].slice(0, -1).trimEnd()})` : m[0]
      violations.push({
        file, line, column, level: "error", rule: "no-legacy-token", element,
        message: `\`${found}\` names \`${m[1]}\`, which the token migration deleted.`,
        fix: `Nothing declares it, so the property drops silently. Use a semantic — bg-${EG_SURFACE}, text-${EG_TEXT}, border-${EG_BORDER}.`,
        source: text.slice(0, 160),
      })
    }
  }
}

/* Each `type-*` utility is the whole style — family, size, line height,
 * tracking, weight and case. Pairing one with a utility that sets a component
 * of it is either redundant or a silent override, and which of the two depends
 * on source order in the compiled sheet rather than on the class list.
 *
 * The three overriding families are the three tokens.md names: leading, font
 * and the case utilities. Nothing wider, because tokens.md owns this rule and
 * a linter that enforces more than the doc says is a second, disagreeing copy
 * of it.
 *
 * `font-mono type-code-block` shipped and was removed by hand twice. The mono
 * family is already in the style, so the class did nothing until the day the
 * ramp changed which face `code-block` used, at which point it would have
 * pinned it.
 */
const TYPE_UTILITY_RE = new RegExp(
  String.raw`(?<![\w-])(type-(?:${tokens.type.ramp.map((r) => r.name).join("|")}))(?![\w-])`
)
const TYPE_OVERRIDE_RE =
  /(?<![\w-])(leading-[\w[.-]+|font-[a-z]+|uppercase|lowercase|capitalize|normal-case)(?![\w-])/

/**
 * Every class list the expression can actually produce.
 *
 * A pairing rule cannot read the flattened source text. `c.mono ? "font-mono
 * text-[13px]" : "type-paragraph"` has both halves in it and renders neither
 * together — the branches are exclusive, and reporting it teaches a reader to
 * ignore the rule. Walking the ternaries and the cn() arguments gives the sets
 * an element can really carry.
 *
 * Capped, because a component with a dozen conditional classes has thousands of
 * combinations. Past the cap the check is skipped rather than guessed at: a
 * missed conflict costs less than a wrong one.
 */
const CANDIDATE_CAP = 64
function classCandidates(node) {
  if (!node) return [""]
  const kind = node.getKind()
  if (kind === SyntaxKind.StringLiteral || kind === SyntaxKind.NoSubstitutionTemplateLiteral) {
    return [node.getLiteralText()]
  }
  if (kind === SyntaxKind.ConditionalExpression) {
    const c = node.asKind(SyntaxKind.ConditionalExpression)
    return [...classCandidates(c.getWhenTrue()), ...classCandidates(c.getWhenFalse())]
  }
  if (kind === SyntaxKind.BinaryExpression) {
    // `flag && "x"` contributes "x" or nothing.
    const b = node.asKind(SyntaxKind.BinaryExpression)
    return [...classCandidates(b.getRight()), ""]
  }
  if (kind === SyntaxKind.ParenthesizedExpression) {
    return classCandidates(node.asKind(SyntaxKind.ParenthesizedExpression).getExpression())
  }
  const parts =
    kind === SyntaxKind.TemplateExpression
      ? [
          [node.asKind(SyntaxKind.TemplateExpression).getHead().getLiteralText()],
          ...node
            .asKind(SyntaxKind.TemplateExpression)
            .getTemplateSpans()
            .flatMap((s) => [classCandidates(s.getExpression()), [s.getLiteral().getLiteralText()]]),
        ]
      : kind === SyntaxKind.CallExpression
        ? node.asKind(SyntaxKind.CallExpression).getArguments().map(classCandidates)
        : null
  if (!parts) return [""]
  let out = [""]
  for (const part of parts) {
    if (out.length * part.length > CANDIDATE_CAP) return null
    out = out.flatMap((a) => part.map((b) => `${a} ${b}`))
  }
  return out
}

function checkTypeClassConflict(node, file, line, column, element) {
  const candidates = classCandidates(node)
  if (!candidates) return
  const seen = new Set()
  for (const candidate of candidates) {
    const type = candidate.match(TYPE_UTILITY_RE)
    if (!type) continue
    const override = candidate.match(TYPE_OVERRIDE_RE)
    if (!override) continue
    const key = `${type[1]}|${override[1]}`
    if (seen.has(key)) continue
    seen.add(key)
    violations.push({
      file, line, column, level: "error", rule: "type-class-conflict", element,
      message: `\`${type[1]}\` is paired with \`${override[1]}\`, which sets part of the style the utility already owns.`,
      fix: `Drop \`${override[1]}\`. If ${type[1]} is the wrong style, pick the ramp step that is right rather than patching this one.`,
      source: candidate.trim().slice(0, 160),
    })
  }
}

/* ─── A scroll container with no gutter ───
 *
 * `overflow-y-auto` is not a vertical-only instruction. CSS will not let one
 * axis clip while the other stays visible, so declaring either axis promotes
 * the other from `visible` to `auto` and the element begins clipping on both.
 * A child as wide as that box then loses its focus ring, which browsers draw
 * outward from the border box: not trimmed, gone. The docs rail was a 200px
 * link in a 200px scrollport and none of the ring survived.
 *
 * Four separate defects in this repo have now had this shape, which is why it
 * is a rule and not a paragraph.
 *
 * All four edges, not two. This rule checked `px` only for its first day, on
 * the reasoning that a vertical list's rings are lost sideways — and the
 * message said "clips on both axes" while the code read one. `PlatformNav`
 * passed with `px-3` and was cutting exactly 3px off the bottom of every ring
 * Tab scrolled to. The premise above is the refutation: the forced axis is not
 * a weaker clip than the declared one, so scoping the check to the declared
 * axis would encode a distinction CSS does not make. It reports more, and the
 * extra reports are the ones nobody was going to find by looking, because the
 * vertical case only shows itself once the container actually overflows.
 *
 * `scroll-my-*` on the child is a complement, not an exit. It moves the items
 * the browser scrolls into view; the first and last have nowhere further to
 * scroll, so they still meet the clip. `PlatformNav` needed both. The rule
 * cannot see a child's classes anyway — often in another package — so it says
 * so in the fix rather than pretending to check.
 *
 * `auto` and `scroll` only, never `hidden`. A `hidden` container is usually
 * clipping deliberately: DocAccordion's `list` variant clips so its rounded
 * corners hold and its rows stay flush, so there is no gutter to add and the
 * remedy is an inset ring on the trigger; AccordionContent clips to animate its
 * height. Covering `hidden` would report both and point them at the wrong fix.
 *
 * The value is not judged. Any non-zero padding satisfies this — whether it is
 * on the scale is a question `off-scale-spacing` already owns, and a rule that
 * answered it twice would be a second, disagreeing copy.
 */
// The block axis has no logical pair in Tailwind — `ps`/`pe` are inline only.
const PAD_SIDES = [
  ["top", new Set(["p", "py", "pt"])],
  ["right", new Set(["p", "px", "pr", "pe"])],
  ["bottom", new Set(["p", "py", "pb"])],
  ["left", new Set(["p", "px", "pl", "ps"])],
]
const SCROLLS_RE = /^overflow-(?:x-|y-)?(?:auto|scroll)$/

/**
 * A Tailwind class split into its variant stack and the utility itself.
 *
 * The split is the last colon at bracket depth zero, not the first or a naive
 * `split(":")`, because a variant can carry both — `data-[side=bottom]:`,
 * `[&_a[href^='https:']]:` — and slicing on the wrong colon turns the utility
 * into a fragment that matches nothing.
 */
function splitVariant(token) {
  let depth = 0
  let cut = -1
  for (let i = 0; i < token.length; i++) {
    const c = token[i]
    if (c === "[" || c === "(") depth++
    else if (c === "]" || c === ")") depth--
    else if (c === ":" && depth === 0) cut = i
  }
  return { variant: cut === -1 ? "" : token.slice(0, cut), base: token.slice(cut + 1) }
}

function checkScrollGutter(className, file, line, column, element) {
  // The flattened expression text, not a class list: strip the quoting and
  // argument punctuation, but never parentheses or brackets, which carry
  // `px-(--gutter)` and `data-[open]:` respectively.
  //
  // Comments first. A `cn()` call can carry prose between its arguments, and
  // this rule is the one that matches on a word a maintainer has every reason
  // to write in it — NavbarItem explains why it carries `scroll-my-1` by
  // naming `overflow-y-auto`, and reading that as a declaration made the
  // component a scroll container that clips its own label.
  const tokens = className
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|[\s(,{[])\/\/[^\n]*/g, "$1 ")
    .split(/[\s"'`,]+/)
    .map((t) => t.replace(/^!+|!+$/g, ""))
    .filter(Boolean)

  const scrolls = []
  const padded = new Map(PAD_SIDES.map(([side]) => [side, new Set()]))
  for (const token of tokens) {
    const { variant, base } = splitVariant(token)
    if (SCROLLS_RE.test(base)) {
      scrolls.push({ variant, base, token })
      continue
    }
    const pad = base.match(/^(p|px|py|pl|pr|pt|pb|ps|pe)-(.+)$/)
    // `px-0` is the absence of a gutter spelled out, so it satisfies nothing.
    if (!pad || pad[2] === "0") continue
    for (const [side, keys] of PAD_SIDES) if (keys.has(pad[1])) padded.get(side).add(variant)
  }
  if (!scrolls.length) return

  /* An unconditional gutter covers a conditional scroll container, but not the
   * reverse. `md:overflow-y-auto` with a bare `px-1` is padded everywhere it
   * scrolls; a bare `overflow-y-auto` with `md:px-1` scrolls below md with no
   * gutter at all, so the bare form only accepts a bare gutter.
   *
   * Every edge is required, and for one reason: `pl-2` alone leaves the right
   * of the ring against the clip, and `px-2` alone leaves the top and bottom
   * against it. Half an indicator on either axis. */
  const covered = (set, variant) => set.has("") || set.has(variant)
  const missingFor = (variant) =>
    PAD_SIDES.filter(([side]) => !covered(padded.get(side), variant)).map(([side]) => side)

  // One finding per element. `overflow-x-auto overflow-y-scroll` is one
  // container and one edit.
  let unpadded
  for (const s of scrolls) {
    const missing = missingFor(s.variant)
    if (missing.length) { unpadded = { ...s, missing }; break }
  }
  if (!unpadded) return

  // Name the shortest utility that closes the gap, so the advice is the edit.
  const { missing } = unpadded
  const suggestion =
    missing.length === 4 ? "p-1"
      : missing.length === 2 && missing.includes("left") && missing.includes("right") ? "px-1"
        : missing.length === 2 && missing.includes("top") && missing.includes("bottom") ? "py-1"
          : missing.map((s) => `p${{ top: "t", right: "r", bottom: "b", left: "l" }[s]}-1`).join(" ")
  const sides =
    missing.length === 4 ? "any edge"
      : `the ${missing.slice(0, -1).join(", ")}${missing.length > 1 ? " and " : ""}${missing.at(-1)}`
  const scoped = unpadded.variant ? ` at \`${unpadded.variant}\`` : ""

  violations.push({
    file, line, column, level: "warning", rule: "scroll-container-gutter", element,
    message:
      `\`${unpadded.token}\` makes this a scroll container${scoped}, and a scroll container clips on ` +
      `all four edges — declaring one axis forces the other from \`visible\` to \`auto\`. There is no ` +
      `padding on ${sides}, so a child against ${missing.length === 4 ? "the clip" : missing.length > 1 ? "those edges" : "that edge"} loses its focus ring.`,
    fix:
      `Give the ring somewhere to draw — \`${suggestion}\` clears the 3px the system's ring reaches` +
      (unpadded.variant ? `, at the same variant (\`${unpadded.variant}:${suggestion}\`) or unconditionally` : "") +
      `. \`scroll-my-*\` on the child is not a substitute: it only repositions items the browser ` +
      `scrolls into view, and the first and last have nowhere further to scroll. Where the clip is ` +
      `deliberate and the rows must stay flush, put an inset ring on the focusable child instead.`,
    source: className.slice(0, 160),
  })
}

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
          fix: `Use a semantic utility — bg-${EG_SURFACE}, text-${EG_TEXT}, border-${EG_BORDER}. See packages/dbui/docs/token-rules.md for the role each group covers.`,
          source: className,
        })
      } else if (PRIMITIVE_HEX.has(hex)) {
        /* On the allowlist and still not consumable. The allowlist is the union
         * of primitives and resolved semantics, so a palette value passes the
         * hex check — and there is no named class behind it, because primitives
         * ship in no CSS at all (R2). Telling the author to "use the named
         * class" names something that cannot exist. */
        violations.push({
          file, line, column, level: "error", rule: "no-primitive-token", element,
          message: `\`${whole}\` is the resolved value of the primitive \`${PRIMITIVE_HEX.get(hex)}\`, which ships in no CSS.`,
          fix: `Pick the semantic for the role instead — bg-${EG_SURFACE}, text-${EG_TEXT}, border-${EG_BORDER}. A primitive has no utility by construction.`,
          source: className,
        })
      } else {
        violations.push({
          file, line, column, level: "warning", rule: "prefer-token-class", element,
          message: `\`${whole}\` is a shipped semantic value written as a hex.`,
          fix: `Name the token instead of the value — bg-${EG_SURFACE} rather than [${raw}]. \`dbui token color\` prints every one.`,
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
        const step = tokens.type.ramp.find((r) => r.size === px)
        if (!step) {
          violations.push({
            file, line, column, level: "error", rule: "off-ramp-type-size", element,
            message: `Font size \`${whole}\` (${px}px) is not on the DBUI type ramp.`,
            fix: `Use a ramp step: ${RAMP_SIZES}.`,
            source: className,
          })
        } else {
          pxTypeLiteral(whole, px, `type-${step.name}`, className, file, line, column, element)
        }
        continue
      }

      if (LEADING_PREFIXES.has(prefix)) {
        // The generator emits the field as `line`. This read `lineHeight`, so
        // the comparison was undefined === px on every step, the rule fired on
        // 100% of leading-[Npx] including the correct ones, and printed
        // `13/undefined` as its own advice.
        const step = tokens.type.ramp.find((r) => r.line === px)
        if (!step) {
          violations.push({
            file, line, column, level: "warning", rule: "off-ramp-line-height", element,
            message: `Line-height \`${whole}\` (${px}px) is not on the DBUI type ramp.`,
            fix: `Match the line-height to its ramp size: ${RAMP_PAIRS}.`,
            source: className,
          })
        } else {
          pxTypeLiteral(whole, px, `type-${step.name}`, className, file, line, column, element)
        }
        continue
      }

      if (RADIUS_PREFIXES.has(prefix)) {
        if (!APPROVED_RADIUS.has(px)) {
          violations.push({
            file, line, column, level: "warning", rule: "non-token-radius", element,
            message: `Border radius \`${whole}\` (${px}px) is not a DBUI token.`,
            // The step IS the multiple of the unit, so the px is derivable
            // rather than memorized: rounded-3 is three units, which is 12px.
            fix: `Use a radius stop — ${RADIUS_STOPS}.`,
            source: className,
          })
        }
        continue
      }

      const fam = FAMILY_OF_PREFIX.get(prefix)
      if (fam && (fam.name === "space" || fam.name === "size")) {
        // Same range guard as the bare form: a 400px panel is a layout
        // dimension, not a size stop the family declined to carry.
        if (!fam.px.includes(px) && !inRange(px, fam)) continue
        if (!fam.px.includes(px)) {
          violations.push({
            file, line, column, level: "error", rule: OFF_SCALE_RULE[fam.name], element,
            message: `\`${whole}\` is ${px}px, which the ${fam.name} family does not carry.`,
            fix: `Nearest stop is ${nearestStop(px, fam)}px — ${suggestClass(prefix, px, fam)}.`,
            source: className,
          })
        } else {
          violations.push({
            file, line, column, level: "warning", rule: "prefer-token-class", element,
            // Overrides RULE_SCHEMA, which defaults this rule to color. It is
            // the one rule that reports two properties, and the emit site is
            // the only place that knows which.
            property: fam.name === "space" ? "spacing" : "size",
            message: `\`${whole}\` is on the ${fam.name} family but written as an arbitrary value.`,
            fix: `Replace with ${suggestClass(prefix, px, fam)}.`,
            source: className,
          })
        }
        continue
      }

      // Unknown prefix with px value — don't flag (could be a custom utility)
      continue
    }
  }

  checkBareUtilities(className, file, line, column, element)
  checkLegacyTokens(className, file, line, column, element)
  checkScrollGutter(className, file, line, column, element)

  // Raw-primitive var() usage (e.g. bg-[var(--interface-neutral-600)])
  checkVarRefs(className, file, line, column, element)

  /* Hex anywhere else in the class value — inside a shadow, inside a cn() arm.
   *
   * Attribute-selector values are stripped first. A Tailwind arbitrary variant
   * like `[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border-base`
   * names the color Recharts already emits in order to override it, so the hex
   * is a match target rather than a value this code sets. There is nothing to
   * tokenise — the selector has to say what the third-party markup says. */
  const hexMatches = className.replace(/=\s*['"][^'"]*['"]/g, "").match(/#[0-9a-fA-F]{3,8}\b/g) || []
  for (const hexRaw of hexMatches) {
    const hex = parseHex(hexRaw)
    if (hex && !APPROVED_HEX.has(hex)) {
      violations.push({
        file, line, column, level: "error", rule: "no-hardcoded-hex", element,
        message: `Hardcoded color ${hex} found in className.`,
        fix: `Use a semantic utility — bg-${EG_SURFACE}, text-${EG_TEXT} — or var(--db-<name>) where a class cannot reach.`,
        source: className,
      })
    }
  }
}

/* Type set inline, in any of the six properties the ramp owns.
 *
 * A `type-*` utility is one class carrying all six together and reading the
 * scalars, so an inline fontSize is outside the ramp twice over: it cannot move
 * with --db-type-scalar, and it splits a decision the ramp makes as a whole.
 * The story headers are the shape of it — fontFamily naming SF Pro, which
 * Figtree replaced, at fontSize 22, which is not a step, with lineHeight and
 * fontWeight hand-set beside them.
 *
 * The value is not judged. There is no correct inline font size, so checking
 * the number against the ramp would only be a worse version of this rule.
 *
 * One finding per style object, not per property. Those four properties on one
 * header are one decision and one edit, and reporting them separately turns 100
 * sites into 276 lines of the same advice.
 */
const TYPE_PROPS = new Set([
  "fontSize", "lineHeight", "fontWeight", "fontFamily", "letterSpacing", "textTransform",
])

function checkInlineStyle(node, file, line, column, element) {
  const typeProps = []
  node.forEachDescendant((c) => {
    if (c.getKind() !== SyntaxKind.PropertyAssignment) return
    const name = c.asKind(SyntaxKind.PropertyAssignment).getName()
    if (TYPE_PROPS.has(name) && !typeProps.includes(name)) typeProps.push(name)
  })
  if (typeProps.length) {
    violations.push({
      file, line, column, level: "error", rule: "inline-type-literal", element,
      message: `Inline style sets ${typeProps.join(", ")} — type outside the ramp cannot follow --db-type-scalar.`,
      fix: `Use a type utility: type-label for single-line UI, type-body when it wraps, type-paragraph for prose, type-title-1 to -4 for headings.`,
      source: node.getText().replace(/\s+/g, " ").slice(0, 120),
    })
  }

  node.forEachDescendant((c) => {
    if (c.getKind() !== SyntaxKind.PropertyAssignment) return
    const pa = c.asKind(SyntaxKind.PropertyAssignment)
    const name = pa.getName()
    const init = pa.getInitializer()
    if (!init) return
    const text = init.getText().replace(/^['"`]|['"`]$/g, "")

    // Raw-primitive var() usage in inline style (e.g. color: 'var(--status-blue-600)')
    if (text.includes("var(--")) {
      checkVarRefs(text, file, line, column, element, `${name}: ${text}`)
      checkLegacyTokens(text, file, line, column, element)
    }

    // Color check
    if (/^#[0-9a-fA-F]{3,8}$/.test(text)) {
      const hex = parseHex(text)
      if (hex && !APPROVED_HEX.has(hex)) {
        violations.push({
          file, line, column, level: "error", rule: "inline-hardcoded-color", element,
          message: `Inline style \`${name}: '${text}'\` uses a non-token color.`,
          fix: `Use a utility (bg-${EG_SURFACE}, text-${EG_TEXT}) so the value flips with the mode, or var(--db-<name>) if the style has to stay inline.`,
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
      // `px?` is an optional x after a required p, so this matched "6px" and
      // "6p" and never the bare 6 that React inline styles are actually written
      // with. The rule has been half-blind since it was written.
      const pxM = text.match(/^(\d+(?:\.\d+)?)(?:px)?$/)
      if (pxM) {
        const px = parseFloat(pxM[1])
        if (!APPROVED_SPACING_PX.has(px)) {
          violations.push({
            file, line, column, level: "warning", rule: "inline-off-scale-spacing", element,
            message: `Inline style \`${name}: '${text}'\` is not a stop on the space family.`,
            fix: `Use ${nearestStop(px, DIM.space)}px, or better, a utility class so the density dial reaches it.`,
            source: `${name}: ${text}`,
          })
        }
      }
    }
  })
}

/* One edit apart, at five characters or more.
 *
 * Used only to phrase a "did you mean" once something is already known to be
 * wrong. It is deliberately not a rule of its own: run over every local
 * component it found one match on the whole tree, a docs helper called States
 * sitting a letter from Status, and coincidence at that rate is noise. Against
 * 844 export names almost any PascalCase word is two edits from something. */
function withinOneEdit(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue }
    if (++edits > 1) return false
    if (a.length > b.length) i++
    else if (b.length > a.length) j++
    else { i++; j++ }
  }
  return edits + (a.length - i) + (b.length - j) <= 1
}

const LOWER_TO_DBUI = new Map([...DBUI_COMPONENT_SET].map((n) => [n.toLowerCase(), n]))
function nearestDbuiName(tagName) {
  const exact = LOWER_TO_DBUI.get(tagName.toLowerCase())
  if (exact) return exact
  if (tagName.length < 5) return null
  for (const known of DBUI_COMPONENT_SET) if (withinOneEdit(tagName, known)) return known
  return null
}

/**
 * Local tag name → what the DBUI package was asked for, for every name the file
 * imports from one.
 *
 * The exported name and the local name come apart under an alias, and the
 * allowlist only knows the exported one. `import { Table as TableIcon }` is a
 * correct import of a real icon, so checking the tag name against the package
 * would report four working call sites as broken.
 */
function dbuiImportsOf(sourceFile) {
  const named = new Map()
  for (const imp of sourceFile.getImportDeclarations()) {
    const spec = imp.getModuleSpecifierValue()
    if (!/^dbui(-shells|-chat|-viz)?(\/|$)/.test(spec)) continue
    for (const ni of imp.getNamedImports()) {
      const exported = ni.getNameNode().getText()
      named.set((ni.getAliasNode() ?? ni.getNameNode()).getText(), { spec, exported })
    }
    const def = imp.getDefaultImport()
    if (def) named.set(def.getText(), { spec, exported: def.getText() })
  }
  return named
}

/* ── Accessibility ──────────────────────────────────────────────────────────
 *
 * `/docs/accessibility` states the gap this closes, in the row for this linter:
 * "No accessibility rule at all. A control with no label passes clean." That
 * was true, and it is the one row on that page describing a hole rather than a
 * boundary — the others say what a layer does not cover, this one said the
 * check does not exist.
 *
 * Only defects that are decidable from the source. An accessible name that is
 * present but useless ("click here", "icon") is a content judgement, and
 * `brandvoice.md` already owns stand-alone text; putting a taste call in here
 * would produce findings two reviewers argue about, which is the bar the
 * constraints page sets and this file should meet too.
 *
 * Deliberately NOT checked: color contrast, focus order, reading order,
 * landmark structure. None is knowable without rendering, and a rule that
 * guesses at them would report confidently and be wrong — worse than the
 * silence it replaces. The Accessibility page says those are done by a person.
 */

/** The attribute node by name, or undefined. Spread props are invisible here. */
function attrOf(opening, name) {
  for (const attr of opening.getAttributes()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
    const ja = attr.asKind(SyntaxKind.JsxAttribute)
    if (ja.getNameNode().getText() === name) return ja
  }
  return undefined
}

/** The literal text of an attribute, when it is a plain string. */
function attrText(ja) {
  if (!ja) return undefined
  const init = ja.getInitializer()
  if (!init) return "" // bare attribute: <img alt />
  const t = init.getText()
  const m = t.match(/^["'](.*)["']$/s) || t.match(/^\{\s*["'](.*)["']\s*\}$/s)
  return m ? m[1] : undefined
}

/**
 * A numeric attribute, in either spelling JSX allows: `tabIndex={0}` and
 * `tabIndex="0"`. Reading only the quoted form made `tabIndex={3}` invisible,
 * which is the form everyone actually writes.
 */
function attrNumber(ja) {
  if (!ja) return NaN
  const init = ja.getInitializer()
  if (!init) return NaN
  const t = init.getText().trim()
  const inner = t.startsWith("{") ? t.slice(1, -1).trim() : t.replace(/^["']|["']$/g, "")
  return Number(inner)
}

/** Any of the ways an element can carry an accessible name in this codebase. */
const NAME_ATTRS = ["aria-label", "aria-labelledby", "title", "alt"]
const hasAccessibleName = (opening) =>
  NAME_ATTRS.some((n) => {
    const v = attrText(attrOf(opening, n))
    return attrOf(opening, n) !== undefined && v !== ""
  })

/** Sizes that render a control with no visible text, per button-variants.ts. */
const ICON_ONLY_SIZES = new Set(["icon-sm", "icon-md"])

/** Hosts that carry no interactive semantics of their own. */
const NON_INTERACTIVE_HOSTS = new Set(["div", "span", "li", "td", "section", "article", "header", "footer"])

function checkA11y(opening, sourceFile, tagName, line, column) {
  // family/property/verdict come from RULE_SCHEMA like every other rule; the
  // emit site sets none of them, so there is one place they are declared.
  const push = (rule, level, message, fix) =>
    violations.push({
      file: sourceFile, line, column, level, rule, element: tagName,
      message, fix, source: opening.getText().slice(0, 80),
    })

  // 1. An icon-only control with nothing to announce.
  const size = attrText(attrOf(opening, "size"))
  if (size && ICON_ONLY_SIZES.has(size) && !hasAccessibleName(opening)) {
    push("a11y-icon-control-no-name", "error",
      `<${tagName} size="${size}"> renders no visible text and carries no accessible name.`,
      `Add aria-label naming the action, not the glyph — aria-label="Delete table", not "trash". Button's own @constraint states this and nothing enforced it.`)
  }

  // 2. An image with no alt attribute at all. `alt=""` is the correct, explicit
  //    way to say decorative, so it passes — absence is the defect, not emptiness.
  if (tagName === "img" && attrOf(opening, "alt") === undefined) {
    push("a11y-img-no-alt", "error",
      `<img> has no alt attribute, so a screen reader announces the file name.`,
      `Add alt describing what the image conveys, or alt="" if it is decorative. brandvoice.md sets the length band.`)
  }

  // 3. A positive tabIndex. It lifts one element out of document order and
  //    forces every other focusable thing on the page behind it.
  const tiNum = attrNumber(attrOf(opening, "tabIndex"))
  if (Number.isFinite(tiNum) && tiNum > 0) {
    push("a11y-positive-tabindex", "error",
      `tabIndex={${tiNum}} moves this element ahead of the document order for the whole page.`,
      `Use tabIndex={0} to make it focusable in place, or tabIndex={-1} for programmatic focus only.`)
  }

  // 4. Hidden from assistive tech and still reachable by Tab — the reader lands
  //    on something the screen reader refuses to describe.
  //
  //    `tabIndex={-1}` is the thing that makes aria-hidden correct rather than
  //    a trap, so it settles the question before the tag does: an <input
  //    aria-hidden tabIndex={-1}> is hidden AND out of the tab order, which is
  //    the pair a reviewer is looking for. Testing the tag first reported it as
  //    a defect and had no way to express the fix.
  const ariaHidden = attrText(attrOf(opening, "aria-hidden"))
  const isHidden = attrOf(opening, "aria-hidden") !== undefined && ariaHidden !== "false"
  const takenOutOfOrder = Number.isFinite(tiNum) && tiNum < 0
  const focusable = !takenOutOfOrder && (Boolean(FORBIDDEN_HTML_TAGS[tagName]) || (Number.isFinite(tiNum) && tiNum >= 0))
  if (isHidden && focusable) {
    push("a11y-aria-hidden-focusable", "error",
      `<${tagName}> is aria-hidden and still focusable, so Tab lands on something nothing announces.`,
      `Remove aria-hidden, or take the element out of the tab order with tabIndex={-1} as well.`)
  }

  // 5. A click handler on a host with no semantics — the hand-rolled button.
  //    Scoped to elements that declare neither a role nor a tab stop, because
  //    those two are how a deliberate custom control says it is one.
  if (
    NON_INTERACTIVE_HOSTS.has(tagName) &&
    attrOf(opening, "onClick") &&
    attrOf(opening, "role") === undefined &&
    attrOf(opening, "tabIndex") === undefined
  ) {
    push("a11y-click-no-semantics", "error",
      `<${tagName}> has onClick and is not focusable, so the action exists for a mouse and for nothing else.`,
      `Use <Button> — or, where a raw host is genuinely right, add role, tabIndex={0} and a key handler together.`)
  }
}

function checkElement(opening, sourceFile, dbuiImports) {
  const tagName = opening.getTagNameNode().getText()
  const { line, column } = opening.getSourceFile().getLineAndColumnAtPos(opening.getStart())

  checkA11y(opening, sourceFile, tagName, line, column)

  const isComponent = /^[A-Z]/.test(tagName)
  const isMember = tagName.includes(".")

  if (!isComponent && FORBIDDEN_HTML_TAGS[tagName] && !isPrimitiveSource(sourceFile)) {
    violations.push({
      file: sourceFile,
      line,
      column,
      level: "error",
      rule: "no-raw-interactive-html",
      element: tagName,
      message: `<${tagName}> is not allowed in DBUI-authored UI code.`,
      fix: FORBIDDEN_HTML_TAGS[tagName],
      source: opening.getText().slice(0, 80),
    })
    // Still continue to check className/style for additional token violations.
  }

  /* Only the shape that is actually a defect: a name taken from a DBUI package
   * that the package does not export.
   *
   * The rule used to fire on every PascalCase element outside the allowlist,
   * which in a repo that *is* the design system is most of them — 1010 findings
   * whose own fix text ended "if it's local product code, this is fine". Three
   * fifths were DBUI icons, because the icon names had never been loaded.
   *
   * Scoped to imports it means something a reader can act on, and it doubles as
   * the guard on the allowlist itself: when it fires, either the import is
   * broken or the generated list is behind, and both need fixing. It reports
   * nothing on a tree where both are true, which is what a guard looks like. */
  const imported = dbuiImports.get(tagName)
  const resolvedName = imported ? imported.exported : tagName
  if (isComponent && !isMember && imported && !DBUI_COMPONENT_SET.has(resolvedName)) {
    const near = nearestDbuiName(resolvedName)
    violations.push({
      file: sourceFile, line, column, level: "error", rule: "non-dbui-component", element: tagName,
      message: `\`${resolvedName}\` is imported from \`${imported.spec}\` but the package does not export it.`,
      fix: near
        ? `Did you mean ${near}? Otherwise re-run node scripts/design-lint/sync-components.mjs — the allowlist may be behind.`
        : `Re-run node scripts/design-lint/sync-components.mjs. If the name is still unknown, the import is broken.`,
      source: opening.getText().slice(0, 80),
    })
  }

  for (const attr of opening.getAttributes()) {
    if (attr.getKind() !== SyntaxKind.JsxAttribute) continue
    const ja = attr.asKind(SyntaxKind.JsxAttribute)
    const attrName = ja.getNameNode().getText()

    /* Non-negotiable 4. Base UI composes through `render`, and it does not
     * recognize `asChild` — it accepts the prop, drops it, and renders its own
     * element around the child. The markup compiles, TypeScript is satisfied,
     * and what ships is one interactive element nested inside another. There
     * is no runtime warning and nothing to see in a diff.
     *
     * Matched as a JSX attribute rather than as text, so the shim in
     * dropdown-menu that swallows the prop, and the code sample on the docs
     * page that shows the wrong form on purpose, both stay quiet.
     *
     * Drawer is exempt, because it is the one component in the set that is not
     * Base UI: it wraps vaul, whose trigger is a Radix one, so `asChild` is its
     * real API and `render` is a type error there. `figma/Drawer.figma.tsx` —
     * the system's own mapping for it — composes through `asChild` too. Scoped
     * to the name rather than the file so it holds wherever Drawer is used, and
     * narrow enough that it stops applying the day Drawer moves to Base UI. */
    if (attrName === "asChild" && !DRAWER_AS_CHILD.test(tagName)) {
      violations.push({
        file: sourceFile, line, column, level: "error", rule: "no-as-child", element: tagName,
        message: `<${tagName} asChild> — Base UI has no asChild, so the prop is dropped and the trigger wraps its child.`,
        fix: `Use render: <${tagName} render={<Button />}>. See non-negotiable 4 in AGENTS.md.`,
        source: opening.getText().slice(0, 80),
      })
    }

    const init = ja.getInitializer()
    if (!init) continue

    if (attrName === "className") {
      let value = ""
      let node = init
      if (init.getKind() === SyntaxKind.StringLiteral) {
        value = init.getText().replace(/^['"]|['"]$/g, "")
      } else if (init.getKind() === SyntaxKind.JsxExpression) {
        const expr = init.asKind(SyntaxKind.JsxExpression).getExpression()
        if (expr) { value = expr.getText(); node = expr }
      }
      if (value) {
        // Per-token rules read the flattened text, because a bad value is bad
        // in whichever branch it sits. The pairing rule reads the tree, because
        // two classes in exclusive branches never meet on an element.
        checkClassName(value, sourceFile, line, column, tagName)
        checkTypeClassConflict(node, sourceFile, line, column, tagName)
      }
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
  "packages/dbui-chat/src",
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

/**
 * A file nobody wrote cannot be a file anybody fixes.
 *
 * The portal's token, layout and icon data are emitted from source by scripts
 * the change protocol already requires. token-data.ts alone carries 130 hexes,
 * every one of them read out of tokens.css, so reporting it means reporting the
 * token system to itself. If a generated file is wrong the generator is wrong,
 * and that is a different file.
 *
 * Read from the head only, so a comment further down cannot excuse a file.
 */
const GENERATED_RE = /^(?:\s*(?:\/\/|\/\*|\*).*)?(?:GENERATED|Generated by|do not edit by hand|Auto-generated)/im
const isGenerated = (src) => GENERATED_RE.test(src.slice(0, 400))

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

/**
 * The shared finding schema, and why the rule name is not it.
 *
 * A rule name here answers "how was this written". `no-hardcoded-hex`,
 * `no-arbitrary-color`, `inline-hardcoded-color` and `no-module-color-literal`
 * are one question — is this color in the approved set — asked at four
 * syntaxes. The Figma linter asks the same question about the same set and
 * calls its answer `non-token-fill`. Four names on this side, a fifth on that
 * one, for a single defect.
 *
 * The schema separates the two axes the names were conflating:
 *
 *   property  what was set — color, spacing, radius, size, type
 *   verdict   what is wrong with the value:
 *               off-set      not in the approved set
 *               unnamed      in the set, written as a literal — right today,
 *                            and it will not move when the token moves
 *               unreachable  a primitive, which ships in no CSS
 *               stale        a name the system no longer publishes
 *   channel   how it reached the surface — the part that genuinely differs
 *             between a className and a Figma paint
 *
 * Derived here rather than at each emit site because the rules already encode
 * it: renaming twenty rules would rewrite `verify-rules` fixtures in the same
 * change, and a rename and a schema arriving together is a diff nobody can
 * review. The names stay, the schema rides alongside, and the rename becomes a
 * mechanical follow-up once something consumes the schema.
 *
 * A rule that can fire for two properties carries `property` at its emit site
 * instead, and that overrides this table — `prefer-token-class` is the only
 * one, since it reports both a color and a spacing value written long-hand.
 */
const VALUE = "value"
const STRUCTURE = "structure"
const RULE_SCHEMA = {
  "no-hardcoded-hex":         { family: VALUE, property: "color", verdict: "off-set", channel: "literal" },
  "no-arbitrary-color":       { family: VALUE, property: "color", verdict: "off-set", channel: "arbitrary" },
  "inline-hardcoded-color":   { family: VALUE, property: "color", verdict: "off-set", channel: "inline-style" },
  "no-module-color-literal":  { family: VALUE, property: "color", verdict: "off-set", channel: "module-literal" },
  "no-primitive-token":       { family: VALUE, property: "color", verdict: "unreachable", channel: "arbitrary" },
  "no-legacy-token":          { family: VALUE, property: "color", verdict: "stale", channel: "class" },
  "prefer-token-class":       { family: VALUE, property: "color", verdict: "unnamed", channel: "arbitrary" },

  "off-ramp-type-size":       { family: VALUE, property: "type-size", verdict: "off-set", channel: "arbitrary" },
  "inline-type-literal":      { family: VALUE, property: "type-size", verdict: "off-set", channel: "inline-style" },
  "px-type-literal":          { family: VALUE, property: "type-size", verdict: "unnamed", channel: "arbitrary" },
  "off-ramp-line-height":     { family: VALUE, property: "line-height", verdict: "off-set", channel: "arbitrary" },

  "off-scale-spacing":        { family: VALUE, property: "spacing", verdict: "off-set", channel: "class" },
  "inline-off-scale-spacing": { family: VALUE, property: "spacing", verdict: "off-set", channel: "inline-style" },
  "off-scale-size":           { family: VALUE, property: "size", verdict: "off-set", channel: "class" },
  "non-token-radius":         { family: VALUE, property: "radius", verdict: "off-set", channel: "arbitrary" },

  "a11y-icon-control-no-name":  { family: "a11y", property: "a11y-name", verdict: "missing", channel: "prop" },
  "a11y-img-no-alt":            { family: "a11y", property: "a11y-name", verdict: "missing", channel: "prop" },
  "a11y-positive-tabindex":     { family: "a11y", property: "a11y-focus", verdict: "misordered", channel: "prop" },
  "a11y-aria-hidden-focusable": { family: "a11y", property: "a11y-focus", verdict: "conflict", channel: "prop" },
  "a11y-click-no-semantics":    { family: "a11y", property: "a11y-role", verdict: "missing", channel: "prop" },

  "type-class-conflict":      { family: STRUCTURE, property: "type", verdict: "conflict", channel: "class" },
  "non-dbui-component":       { family: STRUCTURE, property: "component", verdict: "off-set", channel: "import" },
  "no-raw-interactive-html":  { family: STRUCTURE, property: "element", verdict: "off-set", channel: "element" },
  "no-as-child":              { family: STRUCTURE, property: "api", verdict: "off-set", channel: "prop" },
  "scroll-container-gutter":  { family: STRUCTURE, property: "structure", verdict: "incomplete", channel: "class" },
}

/**
 * `object` is the join key a consolidated report groups on, and the reason the
 * schema exists at all: three findings on one element are one diagnosis — a
 * control that was hand-built — and a report that lists them separately makes
 * the reader work that out.
 *
 * File, line and element rather than a synthesized id, because that is what
 * both a person and a patch can find again. An element whose attributes span
 * several lines reports the line the violating attribute sits on, so a very
 * long tag can split into two objects; that costs a grouping and never a
 * finding, which is the right way round.
 */
function enrichFindings() {
  for (const v of violations) {
    const s = RULE_SCHEMA[v.rule] || {}
    v.surface = "react"
    v.object = `${v.file}:${v.line}:${v.element}`
    v.family = v.family ?? s.family ?? STRUCTURE
    v.property = v.property ?? s.property ?? v.rule
    v.verdict = v.verdict ?? s.verdict ?? "off-set"
    v.channel = v.channel ?? s.channel ?? "class"
    /* The name a report groups and counts on. Derived rather than authored, so
     * it cannot disagree with the classification beside it, and so the Figma
     * side lands on the same string for the same defect: `color:off-set` is
     * what both a hex in a className and an unbound Figma paint resolve to.
     * `rule` is kept as the diagnostic detail — it says which of the four
     * syntaxes was used, which is what a fix has to know. */
    v.check = `${v.property}:${v.verdict}`
  }
}

/**
 * What several findings on one object mean together.
 *
 * The order matters: the first pattern that matches wins, so the most specific
 * diagnosis is written first. Each one names a cause rather than restating the
 * findings, because the findings are already printed and a reader who needed
 * them listed twice was not helped the first time.
 */
const DIAGNOSES = [
  {
    name: "Hand-built control",
    when: (checks, findings) =>
      findings.some((f) => f.rule === "no-raw-interactive-html" || f.rule === "a11y-click-no-semantics") &&
      checks.size > 1,
    say: "A raw element is standing in for a component, so it carries none of the keyboard, focus or token behavior the system would have given it.",
    fix: "Replace the element with the DBUI component for the job. Most of the other findings on this line go with it.",
  },
  {
    name: "Unreachable to assistive tech",
    when: (_checks, findings) => findings.filter((f) => f.family === "a11y").length >= 1 &&
      findings.some((f) => f.family !== "a11y"),
    say: "This object fails an accessibility check and a value check together, which usually means it was assembled by hand rather than composed.",
    fix: "Fix the accessibility finding first — it is the one a person cannot work around.",
  },
  {
    name: "Written outside the system",
    when: (checks) => [...checks].filter((c) => c.endsWith(":off-set")).length >= 2,
    say: "Two or more values on this object are outside their approved sets, so it was styled from taste rather than from tokens.",
    fix: "Take the values from the token families — `dbui token` prints each set — or use the component that already carries them.",
  },
  {
    name: "Right values, written long-hand",
    when: (checks) => [...checks].every((c) => c.endsWith(":unnamed")) && checks.size >= 2,
    say: "Every value here is approved and none is named, so it renders correctly today and will not follow the token when it moves.",
    fix: "Swap each literal for its token class. This is a safe, mechanical change — nothing rendered changes.",
  },
  {
    /* Several findings, one kind. Worth its own row rather than falling through
     * to Unclassified, because the count is the useful part: four off-scale
     * paddings on one element is one habit, not four decisions, and the reader
     * fixes it in one pass. */
    name: "One kind of mistake, repeated",
    when: (checks) => checks.size === 1,
    say: "Several values of the same property on this object are wrong in the same way, so one pattern covers all of them.",
    fix: "Fix the first, then apply the same substitution to the rest of the line — the remaining findings are the same edit.",
  },
]

/** The diagnosis for one object, or null when its findings have nothing in common. */
function diagnose(findings) {
  const checks = new Set(findings.map((f) => f.check))
  for (const d of DIAGNOSES) {
    if (d.when(checks, findings)) return { name: d.name, say: d.say, fix: d.fix }
  }
  return null
}

/** Findings keyed by the thing they are about, worst level first, each diagnosed. */
function groupByObject() {
  const RANK = { error: 0, warning: 1, info: 2 }
  const map = new Map()
  for (const v of violations) {
    const g = map.get(v.object) || { object: v.object, file: v.file, line: v.line, element: v.element, findings: [] }
    g.findings.push(v)
    map.set(v.object, g)
  }
  const groups = [...map.values()]
  for (const g of groups) {
    g.checks = [...new Set(g.findings.map((f) => f.check))]
    g.diagnosis = g.findings.length > 1 ? diagnose(g.findings) : null
  }
  return groups.sort(
    (a, b) =>
      b.findings.length - a.findings.length ||
      RANK[a.findings[0].level] - RANK[b.findings[0].level]
  )
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

  /* One element failing several checks is usually one cause, so it is printed
   * as one row with that cause named. This is the whole reason a finding
   * carries `object`: a hex, an off-scale padding and a raw <button> on the
   * same tag is not three problems to trace separately, it is a control
   * someone built by hand, and the fix for all three is the same sentence. */
  const groups = groupByObject()
  const multi = groups.filter((g) => g.findings.length > 1)
  if (multi.length) {
    console.log(`\n## Diagnosis\n`)
    console.log(`${multi.length} of ${groups.length} objects fail more than one check.\n`)

    const byDiagnosis = new Map()
    for (const g of multi) {
      const key = g.diagnosis ? g.diagnosis.name : "Unclassified"
      byDiagnosis.set(key, [...(byDiagnosis.get(key) || []), g])
    }
    for (const [name, list] of [...byDiagnosis].sort((a, b) => b[1].length - a[1].length)) {
      const d = list[0].diagnosis
      console.log(`### ${name} — ${list.length} object${list.length === 1 ? "" : "s"}\n`)
      if (d) {
        console.log(`${d.say}\n`)
        console.log(`**Fix:** ${d.fix}\n`)
      }
      console.log(`| Element | Where | Checks |`)
      console.log(`| --- | --- | --- |`)
      for (const g of list.slice(0, 10)) {
        console.log(`| \`<${g.element}>\` | ${g.file}:${g.line} | ${g.checks.map((c) => `\`${c}\``).join(" ")} |`)
      }
      if (list.length > 10) console.log(`\n…and ${list.length - 10} more.`)
      console.log()
    }
  }

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

  let skipped = 0
  for (const sourceFile of project.getSourceFiles()) {
    const filePath = path.relative(ROOT, sourceFile.getFilePath())
    if (isGenerated(sourceFile.getFullText())) { skipped++; continue }
    const dbuiImports = dbuiImportsOf(sourceFile)
    checkModuleColors(sourceFile, filePath)
    sourceFile.forEachDescendant((node) => {
      if (node.getKind() === SyntaxKind.JsxOpeningElement) {
        checkElement(node.asKind(SyntaxKind.JsxOpeningElement), filePath, dbuiImports)
      } else if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
        checkElement(node.asKind(SyntaxKind.JsxSelfClosingElement), filePath, dbuiImports)
      }
    })
  }

  enrichFindings()

  if (json) {
    /* An envelope rather than a bare array: the grouping is the half a
     * consolidated report needs, and a consumer that recomputed it from the
     * flat list would be reimplementing the join key's meaning. `violations`
     * keeps its name and shape so existing readers are unaffected. */
    console.log(
      JSON.stringify(
        {
          surface: "react",
          scanned: files.length,
          summary: {
            errors: violations.filter((v) => v.level === "error").length,
            warnings: violations.filter((v) => v.level === "warning").length,
            info: violations.filter((v) => v.level === "info").length,
            objects: groupByObject().length,
            multiFailObjects: groupByObject().filter((g) => g.findings.length > 1).length,
          },
          violations,
          byObject: groupByObject(),
        },
        null,
        2
      )
    )
    return
  }

  reportMarkdown(files.length)
  process.exit(violations.some((v) => v.level === "error") ? 1 : 0)
}

main()
