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
  /* Hover for large targets — cards, tiles, table rows, list items.
   *
   * Deliberately lighter than action-default-hover. That 6% wash is tuned for a
   * control the size of a button, where the eye reads it as a tint; across a
   * whole card it reads as a fill, and it drags the text contrast down with it.
   * Area changes how the same alpha is perceived, so a large surface needs its
   * own value rather than borrowing the control one. */
  "surface-hover": { light: { ref: "base.black", a: 0.03 }, dark: { ref: "base.white", a: 0.04 } },
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
  "spacing-unit": "4px", // the base grid step; every dimensional token is a multiple
  "density-scalar": 1, // master dial — tightens/loosens EVERYTHING at once
  "type-scalar": 1, // nudges the whole type ramp together (anchored)
}

/* ── The dimensional families ─────────────────────────────────────────────
 *
 * A stop is named after its MULTIPLE of `spacing-unit`, not its position in the
 * list. `--db-space-3` is 12px and the class is `p-3`, so the number is the same
 * in Figma, in the token and in the class. The previous `sm`/`md`/`lg` naming
 * needed a lookup table to go one way and a memory to go the other, and the two
 * disagreed the moment a step was inserted — `space-lg` was the sixth step and
 * `radius-lg` was the third.
 *
 * The name is spelled out rather than abbreviated. It is read far more often
 * than typed, because the thing an author types is the Tailwind class. `s-3`
 * would save three characters and leave space and size indistinguishable.
 */

/* Space — padding, margin, gap. Scales with density. */
export const space = { 0: 0, "0-5": 0.5, 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 8: 8, 10: 10, 12: 12 }

/* Radius — corners, on the same grid. `--db-radius-2` is 8px and the class is
 * `rounded-2`, which is what makes the corner scale readable next to the space
 * scale rather than as its own vocabulary. It used to be the clearest case of
 * the naming problem: `radius-lg` was 12px and `space-lg` was 24px, so `lg`
 * meant two different things one section apart in the same file.
 *
 * `full` is a pill sentinel rather than a measurement, so it does not scale. */
export const radius = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, full: "999px" }

/* ══════════════════════════════════════════════════════════════════════════
 * BRIDGE — which Tailwind theme namespaces resolve to which DBUI tokens.
 *
 * Authored here, emitted into the @theme block of tokens.css, so the mapping
 * lives beside the values it points at. A bridge written by hand in globals.css
 * is a second copy of the token, and the two copies drift: the portal's
 * globals.css referenced the radius tokens while the package's still restated
 * their px values, so anyone installing DBUI got frozen corners the portal did
 * not have.
 *
 * `scalars` lists the dials folded into a Tailwind key. Tailwind's `--spacing`
 * is one number that every dimensional utility multiplies — `p-4` and `gap-4`
 * both read it — so only a dial with that same "everything at once" shape can
 * ride it. `density-scalar` is that dial by definition.
 *
 * `steps` declares an explicit key per stop, which BEATS the multiplier for
 * that step — asserted as K1 in `scripts/verify-spacing-scale.mjs`, not assumed.
 *
 * The multiplier itself deliberately stays declared. Removing it (`--spacing:
 * initial`) is what makes the scale finite, and it refuses 106 call sites that
 * compile today, 45 of them at 6px. Those get snapped to the nearest legal step
 * as a separate decision. Until then a declared step resolves to our token and
 * an undeclared one still renders off the multiplier, so nothing breaks on the
 * day this lands.
 * ══════════════════════════════════════════════════════════════════════════ */
export const bridge = {
  spacing: {
    token: "spacing-unit",
    scalars: ["density-scalar"],
    family: "space",
    steps: [0, "0.5", 1, 2, 3, 4, 6, 8, 10, 12],
  },
  /* One family, three namespaces. Tailwind reads `size-*`, `h-*` and `w-*` from
   * separate keys, so the same stop has to be declared in each — but `--height-*`
   * also reaches `min-h-*` and `max-h-*`, which `--width-*` does not do for its
   * siblings (F7 and F11 in verify-spacing-scale). `min-w-*` and `max-w-*` are
   * left on the multiplier rather than given a fourth and fifth declaration. */
  size: { family: "size", steps: [2, 3, 4, 6, 7, 8, 10] },
  height: { family: "size", steps: [2, 3, 4, 6, 7, 8, 10] },
  width: { family: "size", steps: [2, 3, 4, 6, 7, 8, 10] },
  /* `close` writes `initial`, which removes the key and the class with it.
   *
   * Dropping these from the bridge instead would be the dangerous move: every
   * one of them would fall back to Tailwind's own value, and Tailwind disagrees
   * with us at every step — its `md` is 6px where ours was 8px. A call site the
   * codemod missed would then render a plausible wrong corner forever. Closed,
   * it renders no corner at all, which someone notices.
   *
   * `xs` and `4xl` stay open. They were never ours, nothing on this scale sits
   * at 2px or 32px, and they are the radius equivalent of `p-1.5` — off-scale
   * but still compiling, which is the same bargain spacing is making until the
   * scale is closed. */
  radius: {
    family: "radius",
    steps: [0, 1, 2, 3, 4, 6],
    close: ["sm", "md", "lg", "xl", "2xl", "3xl"],
  },
  /* Border is the family that most needed the numeric rename, because named
   * steps here collide with the colors. `--border-width-strong` mints
   * `border-strong`, a WIDTH, which would sit one letter away from
   * `border-border-strong`, a color, in the same class list (I2 in
   * verify-spacing-scale). `border-2` cannot be mistaken for a color.
   *
   * `defaults` is the second half. A bare `border` bakes Tailwind's own 1px into
   * the utility and never reads the namespace, and a bare `border` is how nearly
   * every hairline in the system is written — so without this line the family
   * would be fully named and still not own the value anyone renders. Same value,
   * 1px, now sourced from us.
   *
   * Nothing is closed. Tailwind mints `border-<n>` from the bare number for any
   * n, so `border-4` still compiles at 4px — the same bargain spacing makes for
   * `p-1.5`, and the multiplier stays on for both. */
  "border-width": {
    family: "border",
    steps: [0, 1, 2],
    defaults: { "default-border-width": 1 },
  },
}

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
    // 11px is the only sub-12 size in the ramp, and it is an optical correction
    // rather than a new step: capitals have no descenders and fill the whole
    // x-height band, so all-caps at 12px reads noticeably larger than 12px
    // sentence case sitting beside it.
    eyebrow: { size: 11, line: 16, tracking: 0.5, weight: 600, family: "text", transform: "uppercase" },

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
    // larger. No `-bold` — code emphasis is carried by color, never weight.
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

/* Size — width and height. Same grid, same naming, so `--db-size-8` is 32px and
 * the class is `h-8`, `w-8` or `size-8`.
 *
 * The stops are the control heights and icon boxes the components already use:
 * 8 is a table rule, 12 a switch thumb, 16 an icon, 24 and 32 the two control
 * heights, 28 a menu row, 40 a table header. 16 matters most — it matches the
 * `label` line box (13/16), so text and icon align in a row without adjustment.
 *
 * Element and icon used to be separate sub-families, which put two names on one
 * number: a 24px control was `element-sm` and a 24px icon was `icon-xl`. */
export const size = { 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 10: 10 }

/* Border width — the one numeric family whose number is NOT a multiple of the
 * 4px unit. `--db-border-1` is 1px, not 4px.
 *
 * That looks like an inconsistency and is worth stating plainly, because the
 * alternative is worse. The rule across these families is that the number is the
 * multiple of the family's own unit, and border's unit is 1px: a hairline is a
 * rendering fact rather than a proportion. At a 20px root a scaled 1px becomes
 * 1.25px and blurs across a subpixel boundary, so rules and dividers stay crisp
 * while everything around them grows. Nothing here is wrapped in the density
 * calc for the same reason.
 *
 * The number also matches what an author already types: `border-2` is 2px in
 * stock Tailwind, so reading it as 8px would break the one expectation every
 * Tailwind user arrives with.
 *
 * 2 is the focus treatment on non-filled controls. */
export const border = { 0: 0, 1: 1, 2: 2 }

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

export default { meta, primitives, semantics, scalars, space, radius, bridge, size, border, type, elevation, motion }
