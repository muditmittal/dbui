/**
 * theme.config.mjs — the ONE authored source of truth for DBUI design tokens.
 *
 * Everything downstream is generated from this file by
 * `scripts/design-lint/generate-tokens.mjs`:
 *   • packages/dbui/src/tokens/tokens.css   (shipped CSS: --db-* semantics + scale)
 *   • scripts/design-lint/tokens.json       (linter allowlist)
 * and validated against Figma by `scripts/design-lint/verify-token-sync.mjs`.
 *
 * ── Architecture (Jeremy's model) ─────────────────────────────────────────────
 *   PRIMITIVES are the raw palette. They are GENERATOR INPUT ONLY — they are
 *   resolved inline and do NOT ship as CSS variables. Product code never sees
 *   `--interface-neutral-600`; it sees the semantic that consumes it. Primitives
 *   live here (for the generator) and in Figma's "Color: Primitive" collection
 *   (for designers) — that's the whole story.
 *
 *   SEMANTICS are role-based tokens that DO ship, one CSS var per token, resolved
 *   to a final hex/rgba value. Light values land in :root, dark in .dark.
 *
 *   SCALARS + SCALE (space/radius/type/elevation) are the density/size/type
 *   system: a few base dials drive a full set of tokens via calc().
 *
 * ── Naming ────────────────────────────────────────────────────────────────────
 *   • CSS variables are prefixed `--db-` so consumers can tell a Databricks token
 *     from their own (`--db-surface-base`, `--db-space-md`).
 *   • Tailwind utilities stay clean and unprefixed (`bg-surface-base`,
 *     `text-text-subtle`) — the @theme layer maps --color-<name> → var(--db-<name>).
 *   • Figma slash `surface/base` ↔ code hyphen `surface-base` ↔ shipped
 *     `--db-surface-base`. Figma codeSyntax.WEB = `var(--db-<name>)`.
 *
 * Refs in `semantics` use a tiny mini-language resolved by the generator:
 *   "interface.neutral.600"        → that primitive's hex
 *   "base.white"                   → #FFFFFF
 *   { ref: "base.black", a: 0.08 } → rgba(0,0,0,0.08)
 */

export const meta = {
  prefix: "db",
  figmaFile: "OftbSQf85jOPln9RhSEhVv",
  collections: { primitive: "Color: Primitive", semantic: "Color: Semantic" },
}

/* ══════════════════════════════════════════════════════════════════════════
 * PRIMITIVES — raw palette. Generator input only; never shipped as CSS vars.
 * ══════════════════════════════════════════════════════════════════════════ */
export const primitives = {
  interface: {
    // Neutral — drives LIGHT-mode chrome (Tailwind neutral ramp)
    neutral: {
      "050": "#FAFAFA", 100: "#F5F5F5", 200: "#E5E5E5", 300: "#D4D4D4", 400: "#A3A3A3",
      500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717",
    },
    // Cool — drives DARK-mode chrome (subtle slate tint)
    cool: {
      "050": "#F6F7F9", 100: "#E8ECF0", 200: "#D1D9E1", 300: "#C0CDD8", 400: "#92A4B3",
      500: "#8396A5", 600: "#5F7281", 700: "#2B343D", 800: "#1F272D", 900: "#11171C",
    },
    // Warm — alternative neutral ramp (available, not yet consumed)
    warm: {
      "050": "#F9F7F4", 100: "#F1ECE6", 200: "#E2DAD0", 300: "#D1C6BA", 400: "#AFA193",
      500: "#9E8F80", 600: "#786A5C", 700: "#5A4D41", 800: "#2E2620", 900: "#1B1612",
    },
  },
  status: {
    red: {
      "050": "#FFFAFB", 100: "#FFF5F7", 200: "#FDE2E8", 300: "#FBD0D8", 400: "#F792A6",
      500: "#E65B77", 600: "#C82D4C", 700: "#9E102C", 800: "#630316", 900: "#3A010B",
    },
    yellow: {
      "050": "#FFFCF4", 100: "#FFF9EB", 200: "#FCEACA", 300: "#F8D4A5", 400: "#F2BE88",
      500: "#DE7921", 600: "#BE501E", 700: "#93320B", 800: "#5F1B02", 900: "#381001",
    },
    green: {
      "050": "#F8FEF9", 100: "#F3FCF6", 200: "#D4F7DF", 300: "#B1ECC5", 400: "#8DDDA8",
      500: "#3BA65E", 600: "#277C43", 700: "#115026", 800: "#093919", 900: "#04220E",
    },
    blue: {
      "050": "#F5FBFF", 100: "#F0F8FF", 200: "#D7EDFE", 300: "#BAE1FC", 400: "#8ACAFF",
      500: "#4299E0", 600: "#2272B4", 700: "#0E538B", 800: "#04355D", 900: "#021E38",
    },
  },
  viz: {
    pink: {
      "050": "#F7F3F4", 100: "#EDDEE3", 200: "#E6BCCA", 300: "#E68AA9", 400: "#F06292",
      500: "#D4005B", 600: "#A11E4E", 700: "#79173C", 800: "#5A102D", 900: "#3F0A21",
    },
    plum: {
      "050": "#F6F4F6", 100: "#E8E3E8", 200: "#D8CAD8", 300: "#C7A8C7", 400: "#AD6DAD",
      500: "#97409A", 600: "#882F80", 700: "#781B65", 800: "#57194A", 900: "#3B1634",
    },
    purple: {
      "050": "#F4F4F6", 100: "#E4E1EA", 200: "#CEC5DD", 300: "#B09ED2", 400: "#9575CD",
      500: "#8555C9", 600: "#6B3CAE", 700: "#563389", 800: "#422A64", 900: "#302245",
    },
    indigo: {
      "050": "#F3F4F7", 100: "#DFE1EC", 200: "#BFC6E3", 300: "#90A0E0", 400: "#6B7ED6",
      500: "#4E62BA", 600: "#435A98", 700: "#375276", 800: "#2D3E56", 900: "#232D3C",
    },
    cyan: {
      "050": "#E9F8FD", 100: "#D2F1FC", 200: "#A5E5F9", 300: "#65D3F4", 400: "#22BFE5",
      500: "#169DBD", 600: "#0F7B95", 700: "#085B6E", 800: "#084150", 900: "#0A2C36",
    },
    teal: {
      "050": "#EAFBFA", 100: "#C6F4F1", 200: "#9BE8E3", 300: "#6CD7D2", 400: "#3FC3BD",
      500: "#35A7A2", 600: "#2C8985", 700: "#226A67", 800: "#1A4E4C", 900: "#143735",
    },
    sage: {
      "050": "#F4F6F6", 100: "#E1EAE9", 200: "#C2D4CF", 300: "#96BEB5", 400: "#72B3A6",
      500: "#3D8F7E", 600: "#217766", 700: "#065F4D", 800: "#084438", 900: "#0A2D26",
    },
    lime: {
      "050": "#F6F9E3", 100: "#E6F283", 200: "#D4E157", 300: "#C1C94B", 400: "#ADB045",
      500: "#9E9D00", 600: "#807E39", 700: "#656330", 800: "#4A4824", 900: "#312F17",
    },
    gold: {
      "050": "#F9F7EF", 100: "#F9E9BA", 200: "#FFD54F", 300: "#FFA400", 400: "#DD9232",
      500: "#BD7C30", 600: "#9D662C", 700: "#7D5125", 800: "#5E3C1C", 900: "#3F2711",
    },
    orange: {
      "050": "#F7F3F2", 100: "#EFE0DC", 200: "#EAC4B8", 300: "#EF9B80", 400: "#FF8A65",
      500: "#E96030", 600: "#CC471F", 700: "#B12E0B", 800: "#7F2710", 900: "#552012",
    },
    brown: {
      "050": "#F5F5F4", 100: "#E7E5E4", 200: "#D5CFCD", 300: "#C0B4AF", 400: "#A1887F",
      500: "#A8796D", 600: "#8C6156", 700: "#6F4F46", 800: "#533D37", 900: "#3A2D2A",
    },
  },
  base: { white: "#FFFFFF", black: "#000000" },
}

/* ══════════════════════════════════════════════════════════════════════════
 * SEMANTICS — role-based tokens that ship. Flat map: <name> → { light, dark }.
 * Names are 1:1 with Figma "Color: Semantic" (slash→hyphen). Order here is the
 * order they emit in tokens.css.
 * ══════════════════════════════════════════════════════════════════════════ */
export const semantics = {
  // ── Surface ──
  "surface-base": { light: "base.white", dark: "interface.cool.900" },
  "surface-subtle": { light: "interface.neutral.050", dark: "interface.cool.800" },
  "surface-strong": { light: "interface.neutral.100", dark: "interface.cool.700" },
  "surface-inverse": { light: "interface.neutral.900", dark: "interface.cool.050" },
  "surface-accent": { light: "status.blue.200", dark: "status.blue.900" },
  "surface-inset": { light: { ref: "base.black", a: 0.08 }, dark: { ref: "base.white", a: 0.08 } },
  "surface-disabled": { light: { ref: "base.black", a: 0.12 }, dark: { ref: "base.white", a: 0.12 } },

  // ── Text ──
  "text-base": { light: "interface.neutral.800", dark: "interface.cool.100" },
  "text-strong": { light: "interface.neutral.900", dark: "base.white" },
  "text-subtle": { light: "interface.neutral.600", dark: "interface.cool.400" },
  "text-inverse": { light: "base.white", dark: "interface.cool.900" },
  "text-disabled": { light: { ref: "base.black", a: 0.38 }, dark: { ref: "base.white", a: 0.38 } },
  "text-accent": { light: "status.blue.700", dark: "status.blue.400" },

  // ── Border ──
  "border-base": { light: "interface.neutral.200", dark: { ref: "base.white", a: 0.1 } },
  "border-strong": { light: "interface.neutral.300", dark: { ref: "base.white", a: 0.15 } },
  "border-subtle": { light: "interface.neutral.100", dark: { ref: "base.white", a: 0.06 } },
  "border-inverse": { light: "interface.neutral.700", dark: "interface.cool.300" },
  "border-disabled": { light: { ref: "base.black", a: 0.12 }, dark: { ref: "base.white", a: 0.12 } },
  "border-accent": { light: "status.blue.600", dark: "status.blue.500" },

  // ── Action / Default (subtle secondary control) ──
  "action-default-base": { light: "interface.neutral.050", dark: "interface.cool.800" },
  "action-default-hover": { light: { ref: "base.black", a: 0.06 }, dark: { ref: "base.white", a: 0.08 } },
  "action-default-press": { light: { ref: "base.black", a: 0.1 }, dark: { ref: "base.white", a: 0.12 } },

  // ── Action / Primary (filled) ──
  "action-primary-base": { light: "interface.neutral.900", dark: "interface.cool.200" },
  "action-primary-hover": { light: { ref: "interface.neutral.900", a: 0.9 }, dark: { ref: "interface.cool.200", a: 0.9 } },
  "action-primary-press": { light: { ref: "interface.neutral.900", a: 0.8 }, dark: { ref: "interface.cool.200", a: 0.8 } },

  // ── Action / Selected ──
  "action-selected-base": { light: { ref: "base.black", a: 0.06 }, dark: { ref: "base.white", a: 0.08 } },
  "action-selected-hover": { light: { ref: "base.black", a: 0.1 }, dark: { ref: "base.white", a: 0.12 } },
  "action-selected-press": { light: { ref: "base.black", a: 0.14 }, dark: { ref: "base.white", a: 0.16 } },

  // ── Action / Positive (filled) ──
  "action-positive-base": { light: "status.green.600", dark: "status.green.500" },
  "action-positive-hover": { light: "status.green.700", dark: "status.green.400" },
  "action-positive-press": { light: "status.green.800", dark: "status.green.300" },

  // ── Action / Negative (filled) ──
  "action-negative-base": { light: "status.red.600", dark: "status.red.500" },
  "action-negative-hover": { light: "status.red.700", dark: "status.red.400" },
  "action-negative-press": { light: "status.red.800", dark: "status.red.300" },

  // ── Action / Label (on subtle controls) ──
  "action-label-base": { light: "interface.neutral.800", dark: "interface.cool.050" },
  "action-label-hover": { light: "interface.neutral.900", dark: "base.white" },
  "action-label-press": { light: "base.black", dark: "base.white" },

  // ── Action / Label-inverse (on filled controls) ──
  "action-label-inverse-base": { light: "base.white", dark: "interface.cool.900" },
  "action-label-inverse-hover": { light: { ref: "base.white", a: 0.8 }, dark: { ref: "base.black", a: 0.8 } },
  "action-label-inverse-press": { light: { ref: "base.white", a: 0.7 }, dark: { ref: "base.black", a: 0.7 } },

  // ── Input ──
  "input-border-base": { light: "interface.neutral.200", dark: { ref: "base.white", a: 0.15 } },
  "input-border-hover": { light: "interface.neutral.400", dark: "interface.cool.500" },
  "input-border-focus": { light: "interface.neutral.900", dark: "interface.cool.200" },

  // ── Focus ──
  "focus-ring": { light: "interface.neutral.900", dark: "interface.cool.200" },
  "focus-ring-offset": { light: "base.white", dark: "interface.cool.900" },

  // ── Link ──
  "link-base": { light: "status.blue.600", dark: "status.blue.400" },
  "link-hover": { light: "status.blue.700", dark: "status.blue.300" },
  "link-press": { light: "status.blue.800", dark: "status.blue.200" },
  "link-visited": { light: "status.blue.800", dark: "status.blue.200" },

  // ── Status / Surface ──
  "status-surface-info": { light: "status.blue.100", dark: "status.blue.900" },
  "status-surface-negative": { light: "status.red.100", dark: "status.red.900" },
  "status-surface-positive": { light: "status.green.100", dark: "status.green.900" },
  "status-surface-warning": { light: "status.yellow.100", dark: "status.yellow.900" },

  // ── Status / Border ──
  "status-border-info": { light: "status.blue.700", dark: "status.blue.500" },
  "status-border-negative": { light: "status.red.700", dark: "status.red.500" },
  "status-border-positive": { light: "status.green.500", dark: "status.green.500" },
  "status-border-warning": { light: "status.yellow.500", dark: "status.yellow.500" },

  // ── Status / Text ──
  "status-text-info": { light: "status.blue.600", dark: "status.blue.400" },
  "status-text-negative": { light: "status.red.600", dark: "status.red.400" },
  "status-text-positive": { light: "status.green.600", dark: "status.green.400" },
  "status-text-warning": { light: "status.yellow.600", dark: "status.yellow.400" },

  // ── Utility ──
  "utility-scrim": { light: { ref: "base.black", a: 0.72 }, dark: { ref: "base.black", a: 0.85 } },
  "utility-surface-skeleton": { light: { ref: "base.black", a: 0.12 }, dark: { ref: "base.white", a: 0.12 } },
  "utility-text-skeleton": { light: { ref: "base.black", a: 0.2 }, dark: { ref: "base.white", a: 0.2 } },

  // ── Viz / Categorical (distinct hues) ──
  "viz-categorical-1": { light: "viz.purple.400", dark: "viz.purple.500" },
  "viz-categorical-2": { light: "viz.gold.200", dark: "viz.gold.500" },
  "viz-categorical-3": { light: "viz.teal.300", dark: "viz.teal.600" },
  "viz-categorical-4": { light: "viz.pink.400", dark: "viz.pink.600" },
  "viz-categorical-5": { light: "viz.lime.200", dark: "viz.lime.500" },
  "viz-categorical-6": { light: "viz.brown.400", dark: "viz.brown.500" },
  "viz-categorical-7": { light: "viz.indigo.300", dark: "viz.indigo.500" },
  "viz-categorical-8": { light: "viz.orange.300", dark: "viz.orange.600" },
  "viz-categorical-9": { light: "viz.sage.300", dark: "viz.sage.600" },
  "viz-categorical-10": { light: "viz.plum.400", dark: "viz.plum.500" },

  // ── Viz / Sequential (cyan ramp; reversed for dark) ──
  "viz-sequential-1": { light: "interface.cool.100", dark: "viz.cyan.900" },
  "viz-sequential-2": { light: "viz.cyan.100", dark: "viz.cyan.800" },
  "viz-sequential-3": { light: "viz.cyan.200", dark: "viz.cyan.700" },
  "viz-sequential-4": { light: "viz.cyan.300", dark: "viz.cyan.600" },
  "viz-sequential-5": { light: "viz.cyan.400", dark: "viz.cyan.500" },
  "viz-sequential-6": { light: "viz.cyan.500", dark: "viz.cyan.400" },
  "viz-sequential-7": { light: "viz.cyan.600", dark: "viz.cyan.300" },
  "viz-sequential-8": { light: "viz.cyan.700", dark: "viz.cyan.200" },
  "viz-sequential-9": { light: "viz.cyan.800", dark: "viz.cyan.100" },
  "viz-sequential-10": { light: "viz.cyan.900", dark: "interface.cool.050" },
}

/* ══════════════════════════════════════════════════════════════════════════
 * SCALARS — the density/size/type dials. Change one number, the whole system
 * re-flows via calc(). Defaults = 1 (no change from the hand-tuned anchors).
 * ══════════════════════════════════════════════════════════════════════════ */
export const scalars = {
  "spacing-unit": "4px", // the base grid step; every space token is a multiple
  "density-scalar": 1, // master dial — tightens/loosens EVERYTHING at once
  "spacing-scalar": 1, // gaps *between* elements (margins, gaps)
  "sizing-scalar": 1, // space *inside* elements (padding, control heights)
  "type-scalar": 1, // nudges the whole type ramp together (anchored)
}

/* Space tokens — multiples of `spacing-unit`, scaled by spacing × density.
 * `inline-*` gaps are em-relative so they track the text size they sit beside. */
export const space = {
  // Half-step at the bottom only, for tight insets and icon nudges. The scale
  // stays coarse above 8px on purpose: fewer steps is what makes it consistent.
  units: { "0": 0, "3xs": 0.5, "2xs": 1, xs: 2, sm: 3, md: 4, lg: 6, xl: 8, "2xl": 12 },
  inline: { xs: "0.25em", sm: "0.5em" },
}

/* Radius — fixed anchors (radius doesn't scale with density). */
export const radius = { sm: "4px", md: "8px", lg: "12px", xl: "16px", "2xl": "24px", full: "999px" }

/* Type — anchored ramp. Each step is a hand-tuned PIXEL anchor for size,
 * line-height, and tracking (letter-spacing). All three are emitted as
 * `calc(<px> * var(--db-type-scalar))` so the entire ramp scales together from
 * one dial — text stays proportional when the page is zoomed or scaled.
 * `weight` and `family` don't scale, so they're fixed. Anchors mirror the
 * DuBois ramp (hint 12/16, body 13/20, section 16/22, heading 22/28, display
 * 32/40); larger steps get slightly negative tracking for optical tightness. */
export const type = {
  family: {
    text: '"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Commit Mono", ui-monospace, SFMono-Regular, "Cascadia Code", "Fira Code", monospace',
  },
  /* One ramp, named by what the text is. The split that matters most is
   * label vs body: both are 13px, but a label is single-line by definition and
   * body wraps, so they take different leading.
   *
   *   hint      — captions, helper text, timestamps
   *   eyebrow   — overlines; carries its own caps and tracking
   *   label     — single-line UI: buttons, menu items, cells, form labels
   *   body      — wrapping 13px: descriptions, helper blocks
   *   code      — inline mono: identifiers, paths
   *   block     — mono blocks
   *   paragraph — read as language: chat messages, docs, empty states
   *   title     — headings, 4 → 1
   *
   * There is deliberately no `data` style. Tabular figures are a correctness
   * property, not a look — a reader never sees "tabular", only misalignment
   * when it is missing — and a numeric cell also needs right alignment, which
   * no type style can express. It lives on `<TableCell numeric>` instead.
   *
   * Density is NOT expressed here. `--db-type-scalar` scales the whole ramp from
   * one dial, which is the right mechanism for "roomier everywhere" — a second
   * parallel ramp would inflate controls along with prose.
   *
   * name → { size, line, tracking, weight, family, transform }; px values scale. */
  scale: {
    hint: { size: 12, line: 16, tracking: 0, weight: 400, family: "text" },
    // Caps and tracking live in the style so nobody re-types them per use.
    eyebrow: { size: 12, line: 16, tracking: 0.5, weight: 600, family: "text", transform: "uppercase" },

    // 13/16 — the line box equals the 16px icon box, so text and icon align in a
    // row without adjustment, and a 24px control gets 4px of breathing room
    // instead of 2px. Single-line by definition; anything that wraps uses `body`.
    label: { size: 13, line: 16, tracking: 0, weight: 400, family: "text" },
    "label-bold": { size: 13, line: 16, tracking: 0, weight: 600, family: "text" },

    // 13/20 — same size, loose enough to wrap. Descriptions inside Alert, Empty,
    // RadioTile, Card, DropdownMenu and Item all live here.
    body: { size: 13, line: 20, tracking: 0, weight: 400, family: "text" },
    "body-bold": { size: 13, line: 20, tracking: 0, weight: 600, family: "text" },

    // Mono steps down against the sans it sits beside: at equal size it reads
    // larger. No `-bold` — code emphasis is carried by colour, never weight.
    code: { size: 13, line: 20, tracking: 0, weight: 400, family: "mono" },
    block: { size: 14, line: 22, tracking: 0, weight: 400, family: "mono" },

    // Genie renders markdown, and `**bold**` inside a message lands on -bold.
    paragraph: { size: 15, line: 22, tracking: 0, weight: 400, family: "text" },
    "paragraph-bold": { size: 15, line: 22, tracking: 0, weight: 600, family: "text" },

    "title-4": { size: 16, line: 24, tracking: 0, weight: 600, family: "text" },
    "title-3": { size: 20, line: 28, tracking: 0, weight: 600, family: "text" },
    "title-2": { size: 24, line: 32, tracking: -0.2, weight: 600, family: "text" },
    "title-1": { size: 32, line: 40, tracking: -0.4, weight: 600, family: "text" },
  },
  weight: { normal: 400, bold: 600 },
  // Legacy families kept in the linter allowlist during migration (components
  // still declare SF Pro until they're migrated to DM Sans). Not shipped.
  legacy: {
    sans: ["SF Pro Text", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
    display: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
    mono: ["SF Mono", "SFMono-Regular", "ui-monospace", "Cascadia Code", "Fira Code", "monospace"],
  },
}

/* Elevation — 0 (flat) → 3 (soft). Follows Jeremy's coarse scale:
 * 1 = highest (dialogs), 2 = medium (menus/dropdowns), 3 = soft (toasts). */
export const elevation = {
  0: "none",
  1: "0 8px 40px rgba(0, 0, 0, 0.13)",
  2: "0 2px 16px rgba(0, 0, 0, 0.08)",
  3: "0 2px 3px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(0, 0, 0, 0.05)",
}

/* Size — control heights and icon sizes, scaled by `sizing-scalar`.
 * Control heights are the 24/32px the components already use; naming them means
 * the sizing dial finally drives something instead of shipping as a dead knob.
 * Icon `md` is 16px on purpose: it matches the `label` line box (13/16), so text
 * and icon align in a row without adjustment. */
export const size = {
  element: { sm: 24, md: 32 },
  icon: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 },
}

/* Border width. `thick` is the focus treatment on non-filled controls. */
export const border = { width: { none: 0, thin: 1, thick: 2 } }

/* Motion — two bands, and exactly ONE easing curve for the whole system.
 * A single curve is a deliberate economy: systems that ship five easings mostly
 * ship five things nobody can choose between. Durations follow
 * min = base × 0.75, max = base ÷ 0.75, rounded to 5ms.
 *
 * There is deliberately no `slow` band. Astryx's runs 730–1300ms, which is wrong
 * for tooling that sits between someone and their data — anything approaching a
 * second reads as the product being slow, not as polish. */
export const motion = {
  duration: {
    "fast-min": "130ms",
    fast: "175ms",
    "fast-max": "230ms",
    "medium-min": "310ms",
    medium: "410ms",
    "medium-max": "550ms",
  },
  easing: { standard: "cubic-bezier(0.24, 1, 0.4, 1)" },
}

export default { meta, primitives, semantics, scalars, space, radius, size, border, type, elevation, motion }
