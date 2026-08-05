/**
 * Syntax highlighting for the docs code blocks.
 *
 * Server-only. Shiki runs during render on the server, so the browser receives
 * finished markup and none of the highlighter — no grammar, no theme, no
 * tokenizer ships to the client.
 *
 * ── Where the colors come from ────────────────────────────────────────────────
 * The palette is GitHub Light Default / GitHub Dark Default, restated in DBUI
 * primitives. For each of GitHub's syntax colors we found the nearest primitive
 * by CIEDE2000 in CIELAB — a perceptual distance, so a match is close to how the
 * eye reads it rather than to how the bytes sort — under three constraints:
 *
 *   1. One ramp per role, so a keyword does not change hue between light and
 *      dark. Only the step moves.
 *   2. Every step clears WCAG AA (4.5:1) against `surface-subtle`, the code
 *      block fill, in its own mode.
 *   3. No two roles land within CIEDE2000 10 of each other in either mode.
 *      Color that cannot be told apart is decoration, not information; 10 is
 *      above GitHub's own dark-mode floor of 7 for the same set of roles.
 *
 * Values are dotted primitive paths, never literals, so the palette is the only
 * place a color is written down. Re-run `node scripts/match-syntax-colors.mjs`
 * to reproduce the mapping or to re-solve it after a palette change.
 */
import cfg from "dbui/tokens/theme.config.mjs"
import { createHighlighterCore, type HighlighterCore } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import bash from "@shikijs/langs/bash"
import json from "@shikijs/langs/json"

const { primitives, semantics } = cfg as {
  primitives: Record<string, never>
  semantics: Record<string, { light: unknown; dark: unknown }>
}

/** "viz.purple.500" → its hex. Mirrors the generator's ref mini-language. */
function primitive(dotted: string): string {
  const hex = dotted.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], primitives)
  if (typeof hex !== "string") throw new Error(`syntax theme: unknown primitive "${dotted}"`)
  return hex
}

/**
 * The code block sits on `surface-subtle`, so the theme's own background is read
 * from that semantic rather than restated — if the token is ever repointed, the
 * contrast the mapping was solved against moves with it.
 */
function surfaceSubtle(mode: "light" | "dark"): string {
  const ref = semantics["surface-subtle"][mode]
  if (typeof ref !== "string") throw new Error("syntax theme: surface-subtle is not a solid primitive ref")
  return primitive(ref)
}

/** role → the primitive that carries it, per mode. */
const ROLE = {
  plain: { light: "interface.cool.800", dark: "interface.cool.100" },
  comment: { light: "interface.cool.600", dark: "interface.cool.500" },
  keyword: { light: "status.red.600", dark: "status.red.400" },
  string: { light: "status.blue.800", dark: "status.blue.400" },
  number: { light: "status.blue.700", dark: "status.blue.500" },
  property: { light: "status.green.700", dark: "status.green.400" },
  variable: { light: "status.yellow.700", dark: "status.yellow.400" },
  function: { light: "viz.purple.500", dark: "viz.purple.300" },
} as const

type Role = keyof typeof ROLE

/**
 * Scope lists follow GitHub's, narrowed to the scopes the json and bash grammars
 * actually emit for these docs.
 *
 * `string.unquoted` is the one deliberate departure. The shell grammar scopes
 * every bare argument as an unquoted string, so GitHub paints `dbui`, `search`
 * and `table` in `yarn dbui search table` the same color as a quoted literal —
 * which turns a page of commands into a page of blue. An unquoted argument is a
 * word, not a literal, so it stays on the plain foreground and color is left to
 * mean something.
 */
const SCOPES: Array<[Role, string[]]> = [
  ["comment", ["comment", "punctuation.definition.comment"]],
  ["keyword", ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator"]],
  ["string", ["string", "string.quoted"]],
  ["plain", ["string.unquoted", "punctuation.definition.logical-expression"]],
  ["number", ["constant", "constant.numeric", "constant.language", "constant.character.escape", "constant.other.option"]],
  // The quotes around a JSON key belong to the key, or the pair reads as two things.
  ["property", ["support.type.property-name", "punctuation.support.type.property-name"]],
  ["variable", ["variable", "variable.other.assignment", "entity.name"]],
  ["function", ["entity.name.function", "support.function.builtin"]],
]

const theme = (mode: "light" | "dark") => ({
  name: `dbui-${mode}`,
  type: mode,
  fg: primitive(ROLE.plain[mode]),
  bg: surfaceSubtle(mode),
  settings: SCOPES.map(([role, scope]) => ({
    scope,
    settings: { foreground: primitive(ROLE[role][mode]) },
  })),
})

export const LANGUAGES = ["json", "bash"] as const
export type Language = (typeof LANGUAGES)[number]

/**
 * One highlighter for the process. Building it parses two grammars, which is far
 * too slow to repeat per block, and Next renders many blocks per page.
 */
let highlighter: Promise<HighlighterCore> | undefined
function getHighlighter() {
  highlighter ??= createHighlighterCore({
    langs: [json, bash],
    themes: [theme("light"), theme("dark")],
    // The JavaScript engine keeps this to plain JS regex. The Oniguruma engine
    // would pull a WebAssembly binary in for no gain at this grammar count.
    engine: createJavaScriptRegexEngine(),
  })
  return highlighter
}

/**
 * Highlight `code`, returning HTML.
 *
 * Both themes are emitted at once as `--shiki-light` / `--shiki-dark` custom
 * properties and chosen in CSS (see `.shiki` in globals.css), so one payload
 * serves both modes and switching costs no JavaScript.
 */
export async function highlight(code: string, lang: Language, className: string): Promise<string> {
  const hl = await getHighlighter()
  return hl.codeToHtml(code, {
    lang,
    themes: { light: "dbui-light", dark: "dbui-dark" },
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          this.addClassToHast(node, className)
        },
      },
    ],
  })
}
