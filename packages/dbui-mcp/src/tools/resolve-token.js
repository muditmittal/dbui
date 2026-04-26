/**
 * dbui_resolve_token
 *
 * Find the closest DBUI token for an arbitrary value:
 *   - color #16a34a → "success" token (closest hex match)
 *   - spacing 7px → 8px (named "sm", Tailwind class p-2)
 *   - radius 10px → 8 (rounded-md) or 12 (rounded-lg)
 *   - type 14px → 13px (paragraph)
 *
 * Use this whenever you've extracted a value from a design or external code
 * and need to know how to express it in DBUI.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const tokens = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/tokens.json"), "utf-8")
)
const hexMap = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data/hex-tokens.json"), "utf-8")
)

export const tool = {
  name: "dbui_resolve_token",
  description:
    "Find the closest DBUI design token for an arbitrary value (color, spacing, type-size, radius, line-height). Returns the named token, CSS variable, Tailwind utility class, and the distance from the input. Use BEFORE inserting any hardcoded value into Tailwind classes or inline styles.",
  inputSchema: {
    type: "object",
    properties: {
      value: {
        type: "string",
        description:
          "The arbitrary value. Examples: '#16a34a', '#FFFFFF', '7px', '14px', '10px', 'medium', 'sf pro display'.",
      },
      type: {
        type: "string",
        enum: ["color", "spacing", "radius", "type-size", "line-height", "font"],
        description:
          "What kind of token to look up. Choose 'color' for hex/rgb, 'spacing' for padding/margin/gap px, 'radius' for border-radius, 'type-size' for font sizes, 'line-height' for line height, 'font' for font family.",
      },
      mode: {
        type: "string",
        enum: ["light", "dark", "both"],
        description: "For colors only. Default 'both'.",
        default: "both",
      },
    },
    required: ["value", "type"],
  },
}

function rgbDistance(a, b) {
  const ar = parseInt(a.slice(1, 3), 16)
  const ag = parseInt(a.slice(3, 5), 16)
  const ab = parseInt(a.slice(5, 7), 16)
  const br = parseInt(b.slice(1, 3), 16)
  const bg = parseInt(b.slice(3, 5), 16)
  const bb = parseInt(b.slice(5, 7), 16)
  return Math.sqrt((ar - br) ** 2 + (ag - bg) ** 2 + (ab - bb) ** 2)
}

function normalizeHex(value) {
  let v = value.trim().toUpperCase()
  if (!v.startsWith("#")) v = "#" + v
  if (v.length === 4) v = "#" + v.slice(1).split("").map((c) => c + c).join("")
  if (v.length === 5 || v.length === 6) v = v.slice(0, 7)
  if (v.length > 7) v = v.slice(0, 7)
  return v
}

export function run({ value, type, mode = "both" }) {
  if (type === "color") {
    const hex = normalizeHex(value)
    const modes = mode === "both" ? ["light", "dark"] : [mode]
    const matches = []
    for (const m of modes) {
      for (const [token, tokenHex] of Object.entries(hexMap[m])) {
        const d = rgbDistance(hex, tokenHex)
        matches.push({
          token,
          mode: m,
          hex: tokenHex,
          cssVar: `var(--${token})`,
          tailwindClass: tailwindForColor(token),
          distance: Math.round(d),
        })
      }
    }
    matches.sort((a, b) => a.distance - b.distance)
    const top = matches.slice(0, 5)
    return {
      input: hex,
      type: "color",
      isExactMatch: top[0]?.distance === 0,
      matches: top,
      note:
        top[0]?.distance === 0
          ? `Exact match: bg-${top[0].token} or text-${top[0].token} (depends on context).`
          : `No exact match. Closest: ${top[0]?.token} (Δ=${top[0]?.distance}). If this is intentional, add a token to globals.css.`,
    }
  }

  if (type === "spacing") {
    const px = parseFloat(value.replace("px", ""))
    if (Number.isNaN(px)) return { error: `Could not parse '${value}' as a px value` }
    const scale = tokens.spacing.px
    let nearest = scale[0]
    let nearestDiff = Infinity
    for (const v of scale) {
      const d = Math.abs(px - v)
      if (d < nearestDiff) { nearestDiff = d; nearest = v }
    }
    const tw = tailwindForSpacing(nearest)
    return {
      input: `${px}px`,
      type: "spacing",
      isExactMatch: nearestDiff === 0,
      matches: [
        {
          px: nearest,
          tailwindClasses: tw,
          named: namedSpacing(nearest),
          distance: nearestDiff,
        },
      ],
      note:
        nearestDiff === 0
          ? `Exact match. Use ${tw[0]} for padding, ${tw[1]} for gap, etc.`
          : `Snap ${px}px → ${nearest}px. ${nearestDiff > 4 ? "If this matters, the design needs adjusting OR add a new token." : "Just round to scale."}`,
    }
  }

  if (type === "radius") {
    const px = parseFloat(value.replace("px", ""))
    const allowed = tokens.radius
    const matches = Object.entries(allowed)
      .filter(([k, _]) => k !== "$comment")
      .map(([k, v]) => ({ name: k, px: v, tailwindClass: `rounded-${k}`, distance: Math.abs(px - v) }))
    matches.sort((a, b) => a.distance - b.distance)
    return {
      input: `${px}px`,
      type: "radius",
      isExactMatch: matches[0].distance === 0,
      matches: matches.slice(0, 3),
      note: matches[0].distance === 0 ? `Exact: rounded-${matches[0].name}` : `Closest: rounded-${matches[0].name} (${matches[0].px}px).`,
    }
  }

  if (type === "type-size") {
    const px = parseFloat(value.replace("px", ""))
    const ramp = tokens.type.ramp
    const matches = ramp
      .map((r) => ({ ...r, distance: Math.abs(px - r.size), tailwindClass: tailwindForFontSize(r.size) }))
      .sort((a, b) => a.distance - b.distance)
    return {
      input: `${px}px`,
      type: "type-size",
      isExactMatch: matches[0].distance === 0,
      matches: matches.slice(0, 3),
      note: matches[0].distance === 0
        ? `Exact: ${matches[0].name} (${matches[0].size}px / ${matches[0].lineHeight}px line-height).`
        : `Closest: ${matches[0].name} (${matches[0].size}px). DBUI base is 13px (paragraph), not Tailwind's default 14px.`,
    }
  }

  if (type === "line-height") {
    const px = parseFloat(value.replace("px", ""))
    const ramp = tokens.type.ramp
    const matches = ramp
      .map((r) => ({ name: r.name, lineHeight: r.lineHeight, size: r.size, distance: Math.abs(px - r.lineHeight) }))
      .sort((a, b) => a.distance - b.distance)
    return {
      input: `${px}px`,
      type: "line-height",
      isExactMatch: matches[0].distance === 0,
      matches: matches.slice(0, 3),
    }
  }

  if (type === "font") {
    const lower = value.toLowerCase()
    if (lower.includes("display")) return { match: "display", family: tokens.fonts.display, tailwindClass: "font-display" }
    if (lower.includes("mono") || lower.includes("code")) return { match: "mono", family: tokens.fonts.mono, tailwindClass: "font-mono" }
    return { match: "sans", family: tokens.fonts.sans, tailwindClass: "font-sans (default)" }
  }

  return { error: `Unknown type '${type}'.` }
}

function tailwindForColor(token) {
  // Most tokens map to bg-{token} / text-{token} / border-{token}
  return {
    background: `bg-${token}`,
    text: `text-${token}`,
    border: `border-${token}`,
  }
}

function tailwindForSpacing(px) {
  if (px === 0) return ["p-0", "m-0", "gap-0"]
  if (px === 2) return ["p-0.5", "m-0.5", "gap-0.5"]
  const t = px / 4
  return [`p-${t}`, `m-${t}`, `gap-${t}`]
}

function namedSpacing(px) {
  const map = { 2: "xxs", 4: "xs", 8: "sm", 12: "md", 16: "lg", 24: "xl", 32: "2xl", 48: "3xl" }
  return map[px] || null
}

function tailwindForFontSize(px) {
  const map = { 12: "text-xs (12px)", 13: "text-[13px]", 16: "text-base (16px)", 22: "text-2xl (22px)", 32: "text-4xl (32px)" }
  return map[px] || `text-[${px}px]`
}
