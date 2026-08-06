/**
 * Reading values out of the generated CSS, and resolving what they render at.
 *
 * Shared because two surfaces need the same answer and a second implementation
 * would eventually give a different one: `export-token-spec.mjs` prints the px a
 * reviewer checks, and `generate-token-data.mjs` prints the px the Tokens page
 * shows. A token whose value is `calc(var(--db-spacing-unit) * 0.5 * ...)` is
 * correct architecture and unreadable documentation, so both have to resolve it.
 */

/**
 * Pull `--db-x: value;` pairs out of one block, keyed by the full custom
 * property name. Brace-counted rather than regex-matched to the closing brace,
 * because `@theme` blocks nest.
 */
export function declarations(source, selector) {
  const start = source.indexOf(selector)
  if (start === -1) return {}
  const open = source.indexOf("{", start)
  let depth = 0
  let end = open
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++
    else if (source[i] === "}" && --depth === 0) {
      end = i
      break
    }
  }
  const out = {}
  for (const m of source.slice(open, end).matchAll(/(--db-[a-z0-9-]+):\s*([^;]+);/g)) {
    out[m[1]] = m[2].trim()
  }
  return out
}

/**
 * What a value renders as, in px, at a 16px root with every scalar at the value
 * it ships at.
 *
 * Null when there is no single px answer, which is a property of the value
 * rather than a failure to parse: `em` is relative to its own element, a scalar
 * is a multiplier, and a shadow or a duration is not a length.
 */
export function resolvePx(value, vars) {
  if (!value) return null
  let v = value
  for (let i = 0; i < 6 && v.includes("var("); i++) {
    v = v.replace(/var\((--db-[a-z0-9-]+)\)/g, (_, name) => vars[name] ?? "1")
  }
  if (v.includes("var(")) return null

  const calc = v.match(/^calc\((.+)\)$/)
  const expr = (calc ? calc[1] : v).trim()

  // A unitless zero is zero px in CSS. `--db-space-0` ships as `0`, and leaving
  // it blank made the one step whose value everyone knows the one step the page
  // would not state.
  if (expr === "0") return 0

  const bare = expr.match(/^([\d.]+)(rem|px)$/)
  if (bare) return round(bare[2] === "rem" ? parseFloat(bare[1]) * 16 : parseFloat(bare[1]))

  if (!/^[\d.\srem px*+-]+$/i.test(expr) || !expr.includes("*")) return null
  let unit = ""
  let n = 1
  for (const part of expr.split("*")) {
    const m = part.trim().match(/^([\d.]+)(rem|px)?$/)
    if (!m) return null
    if (m[2]) unit = m[2]
    n *= parseFloat(m[1])
  }
  if (!unit) return null
  return round(unit === "rem" ? n * 16 : n)
}

const round = (n) => parseFloat(n.toFixed(4))

/** `16px`, or an empty string when there is no single px answer. */
export function asPx(value, vars) {
  const px = resolvePx(value, vars)
  return px === null ? "" : `${px}px`
}
