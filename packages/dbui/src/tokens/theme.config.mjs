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
    // Tuned against the surface each stop renders on, by moving L* only — chroma and hue
    // are the original values, so every contrast ratio is a function of the shift alone.
    // 050 and 100 sit on white, where a pale high-chroma tint reads as emitted light, so
    // they drop 1.5. 800 and 900 sit on the dark canvas, where the opposite is true, so
    // they lift 4. The middle interpolates between those two anchors rather than stepping,
    // which keeps the ramp free of a kink at the handover.
    //
    // Two stops sit on a threshold after the shift and should not be lifted further:
    // 500 is 3.03:1 on white (WCAG 1.4.11 wants 3:1) and 600 is 4.50:1, the floor for
    // white text on the fill.
    cyan: {
      "050": "#E5F4F9", 100: "#CEEDF8", 200: "#A3E3F7", 300: "#65D3F4", 400: "#28C1E7",
      500: "#21A1C2", 600: "#1D819B", 700: "#186376", 800: "#164A5A", 900: "#15353F",
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
  /* Brand — the accent a theme reaches for when its accent is the brand rather
   * than a status hue. One consumer today: the One theme's three `*-accent`
   * tokens. Core's accent is `status.blue`, which is why this family is not in
   * the base and is not a fifth status sentiment.
   *
   * `500` is #FF5F46, and it did not come from nowhere: it is already in the
   * system as `--ai-gradient-end` in `globals.css`, hard-coded three times over
   * with no token behind it. `notes/2026-08-11-multi-theme-architecture.md`
   * flags exactly that — "nine are the AI gradient, which is authored as three
   * hexes in globals.css and has no token behind it either" — so naming it here
   * closes a gap that predates theming rather than opening a new one. The
   * gradient's other two stops are already ramp steps: its start is
   * `status.blue.500` and `--icon-folder` is `status.blue.400`.
   *
   * The other nine steps are derived, not picked. #FF5F46 measures H8 S100 L64,
   * and the lightness profile follows `status.red` and `viz.orange` so the ramp
   * reads as their sibling. Every step One consumes was contrast-checked against
   * the surface it lands on: `700` on white is 8.00:1, `400` on warm.900 is
   * 8.04:1, and both borders clear 3:1.
   *
   * NOT in Figma yet. This is the one part of One that adds a name rather than a
   * value, so `verify-token-sync` will report ten primitives the Figma file does
   * not have until they are added there. That report is correct — do not silence
   * it. */
  brand: {
    orange: {
      "050": "#FFF7F5", 100: "#FFEFEB", 200: "#FFD5CC", 300: "#FFB7A8", 400: "#FF8E7A",
      500: "#FF5F46", 600: "#CC3119", 700: "#9C200D", 800: "#691407", 900: "#420D05",
    },
  },
  base: { white: "#FFFFFF", black: "#000000" },
}

/* ══════════════════════════════════════════════════════════════════════════
 * SEMANTICS — role-based tokens that ship. Flat map: <name> → { light, dark }.
 * Names are 1:1 with Figma "Color: Semantic" (slash→hyphen). Order here is the
 * order they emit in tokens.css.
 *
 * ── The four families ─────────────────────────────────────────────────────
 *
 * The sub-groups below are organized into four families. A family answers one
 * question — what does this color? — and each answer is something positive:
 *
 *   STRUCTURE     the substrate a screen is made of      surface- text- border- utility-
 *   INTERACTION   what you operate, and how it responds  action- input- focus- link-
 *   STATUS        feedback about what happened           status-
 *   VIZ           data encoded as color                 viz-
 *
 * A family is a SECTION, NOT A PREFIX. `surface-base` does not become
 * `structure-surface-base`, and nothing in this map is renamed to carry one.
 * The family lives in these headings, in `docs/token-rules.md` and on the
 * portal's Tokens page, and nowhere in a token name.
 *
 * ── How a family is named ─────────────────────────────────────────────────
 *
 * A family holding ONE prefix takes that prefix's name. A family holding
 * SEVERAL takes a superset name that is none of them.
 *
 * That rule is what rules out the two names this taxonomy nearly shipped with.
 * `action` would have named a four-prefix family after one of its four, so
 * `focus-ring`, `input-border-hover` and `link-base` would each read as filed
 * somewhere else. `base` would have named the structure family with a word
 * `-base` already spends as the resting-variant suffix in `surface-base` and
 * `action-primary-base`. Both are the same failure — one word carrying two
 * meanings at two levels of the same taxonomy — and it is the failure the
 * family layer exists to remove.
 *
 * `interaction` is also the more accurate word for what is in there. Most of
 * that family is STATES rather than actions: `action-default-hover`,
 * `action-selected-press`, `input-border-hover`, `focus-ring`. Focus is not an
 * action and neither is a text field.
 * ══════════════════════════════════════════════════════════════════════════ */
export const semantics = {
  /* ══ STRUCTURE — the substrate a screen is made of ══════════════════════════
   * surface-  text-  border-  utility-
   *
   * Surfaces, the text and rules drawn on them, and the layers that stand in
   * for them or cover them.
   *
   * `surface-hover` belongs here, and is why this family is not called
   * `static`. A substrate reacting to a pointer is still the substrate — the
   * family names what a token colors, not whether it holds still, and a family
   * named for a non-behavior was falsified by its own first member. */

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
  /* The neutral border above `strong`, and the only one meant to be reached
   * under a pointer rather than at rest. It exists because the weight ladder had
   * nothing usable between `strong` (neutral.300) and `inverse` (neutral.700):
   * `strong` measures ~7% against `base` and disappears when it is the peak of a
   * gradient rather than a flat edge, while `inverse` is the dark chrome value
   * and reads as a selection.
   *
   * It landed on 500 first and stepped down to 400 once `Card` paired the halo
   * with an elevation change. Two signals for one hover do not each need to be
   * legible alone — the shadow says "this lifts" and the border only has to say
   * "and the pointer is here". At 500 the pair read as two announcements.
   *
   * Shares its LIGHT value with `input-border-hover` and diverges in dark, where
   * that one takes a cool step and this one stays a white alpha like the rest of
   * the border family. A shared value across families is already the norm here —
   * `border-base` and `input-border-base` are both neutral.200. Still not named
   * `*-hover` — it is a weight, and a component chooses to reach it. See the
   * placement note in docs/token-rules.md. */
  "border-emphasis": { light: "interface.neutral.400", dark: { ref: "base.white", a: 0.3 } },
  "border-inverse": { light: "interface.neutral.700", dark: "interface.cool.300" },
  "border-disabled": { light: { ref: "base.black", a: 0.12 }, dark: { ref: "base.white", a: 0.12 } },
  "border-accent": { light: "status.blue.600", dark: "status.blue.500" },

  /* ══ INTERACTION — what you operate, and how it responds ════════════════════
   * action-  input-  focus-  link-
   *
   * Controls and their labels, the fields you type into, the ring that marks
   * where you are, and links. Four prefixes, so the family takes a superset
   * name rather than the name of any one of them — `action` would have made the
   * other three read as filed elsewhere.
   *
   * A sentiment word means different things in different families and the two
   * readings must not be collapsed: `action-positive-base` fills the button
   * that confirms, `status-text-positive` reports that something succeeded.
   * That distinction is the reason `status` is a family of its own rather than
   * a member of this one. */

  /* ── Action / Default (subtle secondary control) ──
   *
   * Untouched by the ladder fix below, on purpose. `default-hover` is the wash
   * almost every control in the system reads, so moving it to make room for the
   * selected family would have repainted the whole surface to fix one rung. The
   * selected family moved instead. */
  "action-default-base": { light: "interface.neutral.050", dark: "interface.cool.800" },
  "action-default-hover": { light: { ref: "base.black", a: 0.06 }, dark: { ref: "base.white", a: 0.08 } },
  "action-default-press": { light: { ref: "base.black", a: 0.1 }, dark: { ref: "base.white", a: 0.12 } },

  // ── Action / Primary (filled) ──
  "action-primary-base": { light: "interface.neutral.900", dark: "interface.cool.200" },
  "action-primary-hover": { light: { ref: "interface.neutral.900", a: 0.9 }, dark: { ref: "interface.cool.200", a: 0.9 } },
  "action-primary-press": { light: { ref: "interface.neutral.900", a: 0.8 }, dark: { ref: "interface.cool.200", a: 0.8 } },

  /* ── Action / Selected ──
   *
   * These are washes of the same ink as `action-default-*`, so the only thing
   * telling a selected control from a hovered one is where it sits on the alpha
   * ladder. Until now nothing did: `selected-base` and `default-hover` were the
   * same 0.06, and `selected-hover` and `default-press` the same 0.10. Two of
   * the three selected stops had no value of their own, so pointing at an
   * unselected control painted it the exact fill of a selected one — measured
   * identical, `#F0F0F0` light and `#242A2E` dark, 0.00 L* apart. That is B13 on
   * the nav rail and B15 on the pill tabs, and it is one defect.
   *
   * The ladder now reads, as composited lightness rather than authored alpha:
   *
   *   light   page 100.00  hover 94.69  SELECTED 92.91  press 91.12  sel-hover 89.32  sel-press 87.51
   *   dark    page   7.37  hover 16.50  SELECTED 18.69  press 20.84  sel-hover 22.96  sel-press 25.05
   *
   * The rung that had to move is `selected-base`, and it moved just past
   * `default-hover` — 1.78 L* in light, 2.19 in dark. Small, deliberately: the
   * fill is one of three cues on every control that spends it, alongside a
   * weight step and `text-strong`, so it needs to stop being identical rather
   * than start carrying the state alone.
   *
   * The two families interleave — `default-press` lands between the selected
   * rest and the selected hover — and that is fine rather than a second
   * collision. Press exists only while the pointer is held on that one element,
   * so the deeper of the two is always the one under the finger. There is no
   * moment where a reader has to tell those two apart.
   *
   * `selected-press` did not move, and the reason is a wart worth knowing: it is
   * the generic press wash for eight controls with no selected state at all —
   * `Checkbox`, `RadioGroup`, `Switch`, `ToggleGroup`, the tree chevrons,
   * `FacetedFilter`, `InputGroup`. Deepening it would repaint all of them for a
   * gap nobody reads. Logged rather than fixed. */
  "action-selected-base": { light: { ref: "base.black", a: 0.08 }, dark: { ref: "base.white", a: 0.1 } },
  "action-selected-hover": { light: { ref: "base.black", a: 0.12 }, dark: { ref: "base.white", a: 0.14 } },
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

  /* ── Input ──
   *
   * A border, and INTERACTION rather than STRUCTURE. The state ladder decides
   * it: no `border-*` token has a hover and both of these do. A decorative rule
   * is drawn once and never reacts; a field border is darker than a decorative
   * one and lightens under the pointer precisely so the field reads as
   * operable. Shape says border, behavior says interaction.
   *
   * Two states, not three. There was an `input-border-focus` here carrying the
   * same #171717 / #D1D9E1 pair as `focus-ring`, which made it a second name for
   * one decision and put the system in breach of two of its own rules at once:
   * R7 bars `focus` as a state suffix, and R9 says focus is a ring rather than a
   * border. Its eleven call sites were all `active:`, which is `press` in this
   * vocabulary — so the token was named for a state it never styled. They now
   * read `focus-ring` directly. */
  "input-border-base": { light: "interface.neutral.200", dark: { ref: "base.white", a: 0.15 } },
  "input-border-hover": { light: "interface.neutral.400", dark: "interface.cool.500" },

  /* ── Focus ──
   *
   * A ring is not an action, which is what made this sub-group awkward while
   * the family was called `action`. It is plainly an interaction state, so
   * under INTERACTION it needs no argument.
   *
   * One residue worth knowing: `focus-ring-offset` carries the same pair as
   * `surface-base` and reads like a structure value. It is not one. Its job is
   * the gap inside the treatment, and the two tokens are one treatment that
   * cannot be split across families.
   *
   * Two stops off the end of each ramp rather than at it. The ring used to sit on
   * `neutral.900` and `cool.200`, which are the exact values `action-primary-base`
   * carries in the same mode — so the most important control in the system had a
   * focus ring the same color as its own fill, and the treatment disappeared on
   * the one button most likely to be tabbed to. The 1px offset was the only thing
   * separating them, and an offset is a gap, not a ring.
   *
   * The ramps run opposite ways, so contrast means opposite directions: light
   * steps back from #171717 to #404040, dark steps forward from #D1D9E1 to
   * #F6F7F9. Both stay well clear of the fill and still read as a focus ring
   * against a page surface. */
  "focus-ring": { light: "interface.neutral.700", dark: "interface.cool.050" },
  "focus-ring-offset": { light: "base.white", dark: "interface.cool.900" },

  /* ── Link ──
   *
   * Text you click, and INTERACTION rather than STRUCTURE: what a token is made
   * of is not what it is for, and this one carries the full base/hover/press
   * ladder. `link-visited` is the only token here that records history rather
   * than describing a state — a property of navigation, not a second family. */
  "link-base": { light: "status.blue.600", dark: "status.blue.400" },
  "link-hover": { light: "status.blue.700", dark: "status.blue.300" },
  "link-press": { light: "status.blue.800", dark: "status.blue.200" },
  "link-visited": { light: "status.blue.800", dark: "status.blue.200" },

  /* ══ STATUS — feedback about what happened ══════════════════════════════════
   * status-
   *
   * A strict four-way sentiment vocabulary, each word carrying the
   * surface/border/text triplet. One prefix, so the family takes the prefix's
   * own name and nothing has to be invented.
   *
   * Promoted out of the old catch-all, which could only be named for what it
   * was not. `function` was the alternative and is worse than the problem: a
   * "functional color" conventionally means a status color, so the name would
   * have described one member of the group it was covering. */

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

  /* ══ STRUCTURE, continued ═══════════════════════════════════════════════════
   *
   * Utility is structure. A scrim is a layer laid over the substrate, and the
   * two skeletons are placeholders shaped like the surface and the line of text
   * they stand in for — each is named after the structure sub-group it covers
   * or replaces. Status is the tempting alternative reading, since a skeleton
   * does say "loading", but status is a closed four-way sentiment vocabulary
   * and loading is not one of the four.
   *
   * It emits here rather than beside Surface because key order in this object
   * is the emission order of tokens.css. Moving it would rewrite a generated
   * file to make a heading contiguous. */

  // ── Utility ──
  "utility-scrim": { light: { ref: "base.black", a: 0.72 }, dark: { ref: "base.black", a: 0.85 } },
  "utility-surface-skeleton": { light: { ref: "base.black", a: 0.12 }, dark: { ref: "base.white", a: 0.12 } },
  "utility-text-skeleton": { light: { ref: "base.black", a: 0.2 }, dark: { ref: "base.white", a: 0.2 } },

  /* ══ VIZ — data encoded as color ═══════════════════════════════════════════
   * viz-
   *
   * The one family where the color IS the value — a series index or a
   * magnitude — rather than a role something plays. Every other family names a
   * job and lets the value follow; here a reader decodes the swatch itself.
   * One prefix, so the family takes the prefix's own name. */

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

  /* ── Viz / Sequential (cyan ramp; reversed for dark) ──
   *
   * All ten stops are cyan. The pale extreme used to borrow `interface.cool` so a
   * warm-page theme could rewrite it via `ramp`, which is why `tokens.md` describes
   * the scale as reaching into chrome — that is no longer true, and the scale no
   * longer varies by theme. The cost of the change is the first step: grey-to-cyan
   * carried it on hue at ΔE 9.2, and cyan.050-to-cyan.100 carries it on 3.4 L* at
   * ΔE 5.3. Widen cyan.050 if the treemap's "other" tile stops separating. */
  "viz-sequential-1": { light: "viz.cyan.050", dark: "viz.cyan.900" },
  "viz-sequential-2": { light: "viz.cyan.100", dark: "viz.cyan.800" },
  "viz-sequential-3": { light: "viz.cyan.200", dark: "viz.cyan.700" },
  "viz-sequential-4": { light: "viz.cyan.300", dark: "viz.cyan.600" },
  "viz-sequential-5": { light: "viz.cyan.400", dark: "viz.cyan.500" },
  "viz-sequential-6": { light: "viz.cyan.500", dark: "viz.cyan.400" },
  "viz-sequential-7": { light: "viz.cyan.600", dark: "viz.cyan.300" },
  "viz-sequential-8": { light: "viz.cyan.700", dark: "viz.cyan.200" },
  "viz-sequential-9": { light: "viz.cyan.800", dark: "viz.cyan.100" },
  "viz-sequential-10": { light: "viz.cyan.900", dark: "viz.cyan.050" },

  /* ── Viz / Neutral ──
   *
   * Alpha rather than solid values, so a neutral inherits whatever surface it is
   * drawn on: the same token comes out cool on the dark canvas and picks up a warm
   * page under One, which no fixed hex can do. The source is the cyan ramp rather
   * than black, so the greys carry a slight cast of the brand hue instead of
   * reading as flat grey beside it — at 48% that is C*ab 6.1 at hue 226.
   *
   * They are three roles, not a scale:
   *   subtle  segmented-bar track, empty heatmap cell — chrome, no data beside it
   *   base    bottom-N bars, de-emphasised series. 8% lands within 2.4 L* of the
   *           labelled-bar fill, so it reads as the same weight with the colour
   *           taken out rather than as something heavier
   *   strong  previous-period series, where colour is the only channel separating
   *           two identical shapes. 15.7 dE from the current-period cyan, 12.0
   *           under protanopia
   *
   * `strong` resolves to 2.77:1 on white, under the 3:1 in WCAG 1.4.11. That is a
   * deliberate call — it is a de-emphasised reference series and being quiet is the
   * point — but it means it should not be the only thing carrying a value. 52%
   * would clear 3:1 if that changes.
   *
   * Because the source is cyan, retuning the cyan ramp moves these too. */
  "viz-neutral-subtle": { light: { ref: "viz.cyan.900", a: 0.04 }, dark: { ref: "viz.cyan.100", a: 0.04 } },
  "viz-neutral-base": { light: { ref: "viz.cyan.900", a: 0.08 }, dark: { ref: "viz.cyan.100", a: 0.08 } },
  "viz-neutral-strong": { light: { ref: "viz.cyan.900", a: 0.48 }, dark: { ref: "viz.cyan.100", a: 0.48 } },

  /* ── Viz / Level ──
   *
   * The third kind of viz scale. `categorical` says WHICH series, `sequential`
   * says HOW MUCH, and this one says WHAT LEVEL — the colour carries a judgement
   * about the datum rather than its identity or its magnitude. Five levels:
   * `pass` is clean, `high`/`medium`/`low` are degrees of concern, `info` is
   * noted and not a concern.
   *
   * It exists because a chart meaning healthy used to borrow `status-text-*`,
   * and those are tuned as TEXT — each one contrasts with the page and none of
   * them with its siblings, which is exactly backwards for a mark. The proof was
   * `status-text-positive` and `status-text-negative` landing 0.8 L* apart: on a
   * segmented bar, passed and high-risk were the same colour in greyscale, and
   * that is the one comparison a security page exists to make.
   *
   * Three roles, and only ONE of them is comparative:
   *   base    the mark. Sits beside its siblings, so mutual separation is the
   *           whole job. Held at min 4.8 ΔL* across all five, both modes
   *   subtle  a tint carrying content on top — a leaderboard bar under its label,
   *           a tinted row. Never comparative: one level per chart, so the five
   *           are free to sit at the same lightness
   *   strong  the level as text. Text contrasts with the page and never with
   *           another text colour, so collisions here are harmless too
   *
   * `base` varies by mode and the two directions are opposite, which is the part
   * to read before editing. In light the ramp runs worse-is-DARKER, because a
   * dark mark is the prominent one on a white page. In dark it runs worse-is-
   * LIGHTER for the same reason inverted, so `high` is a light pink there and a
   * deep red here. Both directions are checked: `high` > `medium` > `low` in
   * lightness under `.dark`, and the reverse in `:root`.
   *
   * Light `pass`, `low` and `info` sit at 1.61, 1.21 and 1.41 against white —
   * under the 3:1 in WCAG 1.4.11 — and that is the deliberate half of the trade.
   * No assignment of five hues clears 3:1, separates by 10 ΔL* AND keeps the hues
   * recognisable: with all three enforced the search is forced to `red.900` for
   * light `high` and `red.050` for dark, and neither reads as red. These are
   * large adjacent fills read against each other rather than against the page,
   * and every surface that uses them also states the value in text.
   *
   * Light separation is 3.4 ΔL* at its tightest (`high`/`medium`), which is the
   * cost of the softer pastel bases. Dark is 7.9 (`high`/`info`). Anything that
   * drops either number is a regression — the family exists because the borrowed
   * `status-text-*` pair sat 0.8 apart.
   *
   * `low` comes off `viz.gold` rather than `status.yellow` because that ramp is
   * really orange — its 500 is #DE7921. On the shared ramp, `low-strong` and
   * `medium-strong` both resolved to #BE501E: one value under two names. */

  /* ── base — the mark, and the only comparative role ──
   * Light runs worse-is-darker; dark runs worse-is-lighter. */
  "viz-level-pass-base": { light: "status.green.400", dark: "status.green.200" },
  "viz-level-high-base": { light: "status.red.500", dark: "status.red.400" },
  "viz-level-medium-base": { light: "status.yellow.500", dark: "status.yellow.500" },
  "viz-level-low-base": { light: "viz.gold.100", dark: "viz.gold.600" },
  "viz-level-info-base": { light: "viz.cyan.200", dark: "viz.cyan.300" },

  /* ── subtle — a tint that carries content on top ──
   * Every one clears 12:1 for `text-base` in light and 8:1 in dark. */
  "viz-level-pass-subtle": { light: "status.green.200", dark: "status.green.800" },
  "viz-level-high-subtle": { light: "status.red.100", dark: "status.red.800" },
  "viz-level-medium-subtle": { light: "status.yellow.100", dark: "status.yellow.800" },
  "viz-level-low-subtle": { light: "viz.gold.050", dark: "viz.gold.800" },
  "viz-level-info-subtle": { light: "viz.cyan.100", dark: "viz.cyan.800" },

  /* ── strong — the level as text ──
   * Floored at 4.5:1 against the canvas, which is what holds `low` and `info` at
   * the 600 step in light: 500 renders them at 2.55 and 3.03, unreadable. */
  "viz-level-pass-strong": { light: "status.green.600", dark: "status.green.400" },
  "viz-level-high-strong": { light: "status.red.700", dark: "status.red.300" },
  "viz-level-medium-strong": { light: "status.yellow.600", dark: "status.yellow.500" },
  "viz-level-low-strong": { light: "viz.gold.600", dark: "viz.gold.500" },
  "viz-level-info-strong": { light: "viz.cyan.600", dark: "viz.cyan.500" },
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

/* Space — padding, margin, gap. Nine stops.
 *
 * The scale is deliberately sparse. It doubles from 1 to 2 to 4, then steps by
 * two: 6, 8, 10. A scale that offers every integer offers no guidance, and the
 * gaps are what make a choice a decision rather than a slider.
 *
 * `0-5` (2px) earns its place as the only half step: it is the inset-track
 * pattern on 42 call sites — `p-0.5` on the toggle group, `py-0.5` on badges —
 * where a control sits inside a groove one hairline wider than itself. 8 (32px)
 * is here because the jump from 24 to 40 is too wide for section padding.
 *
 * 5, 7 and 12 were each considered and left out. Their call sites keep rendering
 * off Tailwind's multiplier at the same values until the snap pass, which is
 * sequenced separately — see the follow-up section in docs/token-simplification.md
 * for the agreed rules. All three are SIZE stops and only spacing drops them, so
 * `h-5` is 20px from `--db-size-5` while `p-5` is still the multiplier. */
export const space = {
  0: 0, "0-5": 0.5, 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 8: 8, 10: 10,
}

/* Radius — corners, on the same grid. `--db-radius-2` is 8px and the class is
 * `rounded-2`, which is what makes the corner scale readable next to the space
 * scale rather than as its own vocabulary. It used to be the clearest case of
 * the naming problem: `radius-lg` was 12px and `space-lg` was 24px, so `lg`
 * meant two different things one section apart in the same file.
 *
 * `full` is a pill sentinel rather than a measurement, so it does not scale.
 * 999px is a number Figma can hold, which is the whole reason it is not
 * infinity. Tailwind's own `rounded-full` is `calc(infinity * 1px)`, and no
 * design tool has a variable for that, so the two surfaces could describe the
 * same pill and never agree on paper. They clip identically in practice —
 * either value exceeds every corner in the system — so the sentinel costs
 * nothing at render and buys a value both tools can state. */
export const radius = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, full: "999px" }

/* Shape — the corner ROLES, and the only dimensional layer a theme reassigns.
 *
 * `radius` above is a measurement: `radius-2` is 8px and says nothing about when
 * to reach for it. `shape` is a decision: `shape-container` is whatever this
 * theme makes a dialog's corner. Components bind the role and never the
 * measurement, which is the split color has made since the migration — a
 * component reads `surface-base`, not `grey-100`.
 *
 * Named `shape` rather than `round` because the set has a SQUARE stop in it and
 * `round-square` is an oxymoron. It also leaves room for a corner treatment that
 * is not a radius at all. The Tailwind class is unaffected either way: the bridge
 * keys off the role, so `shape-container` still mints `rounded-container`.
 *
 * That split is the whole reason shape can be themed. Omnigent wants pill
 * controls and DuBois wants 4px ones; with components bound to `radius-1` that
 * is an edit to every control in the library, and with them bound to
 * `round-control-*` it is two lines in a theme.
 *
 * Roles are named for the job and NOT for a stop size, for the reason written two
 * comments up: `radius-lg` was 12px while `space-lg` was 24px, so `lg` meant two
 * different things in one file. A `shape-sm/md/lg` set would bring that back and
 * add a second fault — the radius bridge deliberately CLOSES Tailwind's `sm`,
 * `md` and `lg` keys so a class the codemod missed renders square instead of
 * plausibly wrong, and those names would reopen every one of them. `-lg` appears
 * only as the second tier of a named family, where it modifies a job rather than
 * naming a measurement.
 *
 * `control` is split by control height because that is a real decision and not a
 * theme one: a 24px control and a 32px control can want different corners inside
 * the same theme. Core makes the tall one a pill and the short one 4px. A theme
 * that disagrees sets both and the components do not move. One role could not
 * express that at all, which is the whole requirement.
 *
 * `square` is a role and not a bare `radius-0` so the vocabulary is complete: a
 * designer picks from `shape/*` for every corner, and "never bind radius/* on a
 * component" becomes a rule that can be stated and linted. Naming it `none`
 * would have collided with Tailwind's own `rounded-none` key and made "no
 * rounding" themeable, which is nonsense.
 *
 * Values are radius STOPS rather than multiples, so a role resolves through the
 * scale. The density dial reaches it for free and a corner value is written down
 * in exactly one place.
 *
 * `control-md` and `pill` both land on `full` in Core. They are two decisions
 * that agree today, the way a text color and a grey stop agree, and DuBois is
 * the theme that pulls them apart. Collapsing them would lose that. */
export const shape = {
  square: 0,
  control: 1,
  /* A 32px control is a pill; the 24px one stays at 4px. This is the flip the
   * role layer was built to make: `control-lg` was held at `1` alongside
   * `control` so the components could be repointed onto roles without moving a
   * pixel, which is what let that rebind be verified as a no-op. With that done,
   * the aesthetic decision is this one line and its diff is visible on purpose.
   *
   * DuBois is the theme that puts them back together at 4px, which is the case
   * two roles exist to express and one could not. */
  "control-lg": "full",
  /* Two container roles, because the code already made the distinction and only
   * the aggregate hid it. `container` is what floats above the page — dialog,
   * popover, menu, select, combobox, hover card, the table wrapper. `container-lg`
   * is what IS the page: a card, a drawer, an empty state. 21 files sit at 8px and
   * 4 sit at 16px, and counting components made the first look like a majority the
   * second should join. They are different objects and a theme can reshape one
   * without the other.
   *
   * The real distinction is KIND rather than size — a dialog floats and a card
   * sits — so `-lg` undersells it. It still beats calling the second one
   * `surface`, which would put a shape role one word from `surface-base` and the
   * rest of the color family, the same collision this file already documents for
   * `border-2` against `border-strong`.
   *
   * Naming them apart is also what keeps this a no-op: every component keeps the
   * corner it has today, so there is nothing to review and nothing to regress.
   *
   * The 12px band was absent on the argument that it was a card's INNER corners
   * plus the grouped-control corners in button-group and split-button, and so was
   * derived rather than decided. Half of that is gone: button-group is retired and
   * split-button's text segment now takes `control-lg` to match the pill buttons
   * beside it. What is left is ten sites in nine components — a card's header,
   * footer and both image caps, an alert dialog's footer, Empty's icon, a field
   * label wrapping a field, an accordion trigger and an Item row — which is a band
   * being used, not a rounding error. Unnamed, every one of them had to write
   * `rounded-3` and reach past the role layer to do it.
   *
   * `-md` breaks this file's own rule that a role names a job and never a
   * measurement, and the rule is a good one: `radius-lg` meant 12px while
   * `space-lg` meant 24px, which is the collision the role layer exists to
   * prevent. It is taken here anyway, with eyes open, because the alternative
   * names were worse. `nested` and `inner` describe the seven concentric sites and
   * lie about the accordion trigger and the Item row, which nest inside nothing.
   * A role that has to be explained before it can be used correctly is not
   * clearer than one that is honest about being the middle container size.
   *
   * The exposure is narrower than the rule implies. `md` is a Tailwind radius key
   * the bridge closes, and it stays closed — this mints `shape-container-md`, not
   * `rounded-md`, so a missed class still renders square rather than plausibly
   * wrong. The name only collides in prose, where `container-md` sits between two
   * roles whose sizes are written down beside it. */
  container: 2,
  "container-md": 3,
  /* NOTE, and a naming question left open: `container-lg` is also the corner the
   * two GROWING controls take — Textarea and Combobox's chips input. They cannot
   * take `control-lg`, because a pill on a box that grows is a stadium, and 4px
   * beside pill siblings reads as unrounded rather than as deliberate contrast.
   * 16px is the value that looks intended at any height, and this is the only
   * role that carries it.
   *
   * So a theme that moves card and drawer corners moves those two controls with
   * them, which is the coupling roles exist to prevent. Two sites did not justify
   * an eighth token; if a theme ever needs them to diverge, that is the signal to
   * split this role and rename the halves. */
  "container-lg": 4,
  pill: "full",
}

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
    steps: [0, "0.5", 1, 2, 3, 4, 6, 8, 10],
  },
  /* One family, three namespaces. Tailwind reads `size-*`, `h-*` and `w-*` from
   * separate keys, so the same stop has to be declared in each — but `--height-*`
   * also reaches `min-h-*` and `max-h-*`, which `--width-*` does not do for its
   * siblings (F7 and F11 in verify-spacing-scale). `min-w-*` and `max-w-*` are
   * left on the multiplier rather than given a fourth and fifth declaration. */
  size: { family: "size", steps: [2, 3, 4, 5, 6, 7, 8, 10, 12] },
  height: { family: "size", steps: [2, 3, 4, 5, 6, 7, 8, 10, 12] },
  width: { family: "size", steps: [2, 3, 4, 5, 6, 7, 8, 10, 12] },
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
   * scale is closed.
   *
   * `full` is a step here rather than a keyword. It is the one stop whose token
   * existed and whose bridge did not, so every `rounded-full` in the tree read
   * Tailwind's infinity and `--db-radius-full` was defined and dead. Declared,
   * the pill is ours and Figma can hold the same number. */
  radius: {
    family: "radius",
    steps: [0, 1, 2, 3, 4, 6, "full"],
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
  /* Elevation was authored, generated, documented and read by nothing: every
   * `shadow-*` in the tree resolved to Tailwind's own scale, so the tokens described
   * one system while the screen rendered another. Bridging closed that. Renaming the
   * stops to roles is what stops the map from living in people's heads.
   *
  /* Closed, and this is the half that matters. The stops are role names now, so
   * every `shadow-xs` through `shadow-xl` would otherwise fall straight back to
   * Tailwind's own values — which disagree with these at every step, so a call site
   * the rename missed would render a plausible wrong shadow forever. Closed, it
   * renders none, which someone notices. Same bargain radius made.
   *
   * `2xs`, `2xl` and `inner` are closed too. They were never ours and nothing reads
   * them, and leaving them open would keep three sizes spellable in a family that no
   * longer has sizes. */
  shadow: {
    family: "elevation",
    steps: ["control", "raised", "popover", "modal"],
    close: ["xs", "sm", "md", "lg", "xl", "2xs", "2xl", "inner"],
  },
  /* Motion was the last family authored in code and unreachable from a class.
   * Every other namespace here already stands behind its tokens, so `shadow-lg`
   * read ours while `ease-standard` read nothing and the one call site that
   * wanted our curve had to write `var(--db-ease-standard)` by hand.
   *
   * Tailwind's three are closed for the reason radius closes its own: left open
   * they keep compiling, and a transition eased on a curve nobody chose is
   * indistinguishable from one eased on ours until someone puts them side by
   * side. Closed, it emits no timing function at all — the transition still
   * runs, on the browser default, and reads wrong enough to get noticed.
   *
   * `linear` is ours and stays. It is also a static utility in Tailwind at the
   * same value, so the declaration is belt-and-braces rather than a change.
   * `ease-initial` is static too and cannot be closed from here. */
  ease: {
    family: "ease",
    steps: ["linear", "standard", "exit"],
    close: ["in", "out", "in-out"],
  },
  /* Duration mints no class of its own — `--duration-*` is not a Tailwind
   * namespace, so a key there would declare a variable and generate nothing. This
   * entry exists for `defaults` alone.
   *
   * It is the line that gives the family a consumer. A bare `transition` bakes
   * Tailwind's own 150ms into the utility and never reads the namespace, and a
   * bare `transition` is how nearly every animated property in the system is
   * written — so the durations were authored, generated, documented and read by
   * one file. Same value, now sourced from us, and `--db-duration-fast` moving
   * moves all of them.
   *
   * A call site that wants `default` or `slow` still has to name it, and cannot
   * name it as a class: `duration-[var(--db-duration-slow)]` is the only spelling. */
  duration: {
    family: "duration",
    defaults: { "default-transition-duration": "fast" },
  },
  /* `--z-index-*` is a namespace, which was worth checking before writing any of
   * this — duration is not one, and a layer scale that could only be spelled
   * `z-[var(--db-layer-modal)]` would have been a different design.
   *
   * Nothing is closed. `z-0`, `z-10` and `z-50` still compile off the bare number,
   * because Tailwind mints those from the value rather than the namespace and there
   * is no key to set to `initial`. The role names are what components take. */
  "z-index": {
    family: "layer",
    steps: ["raised", "sticky", "overlay", "modal", "popover", "tooltip"],
  },
  /* Two weights, and three class names that reach them.
   *
   * The ramp carries 400 and 600 and calls the heavier one bold, because that is
   * what the styles are named — `type-label-bold`, not `type-label-semibold`.
   * Tailwind calls 600 semibold and reserves bold for 700, which this system does
   * not have. So `font-bold` and `font-semibold` both resolve to the one heavy
   * weight rather than one of them emitting nothing: a class that means "heavier"
   * should not depend on knowing whose vocabulary it is written in.
   *
   * The rest are closed. A weight the ramp does not carry now emits no declaration,
   * so `font-medium` renders at 400 and reads visibly unbolded rather than
   * arriving at a fifth weight the type ramp never agreed to. */
  "font-weight": {
    family: "font-weight",
    steps: ["normal", "bold"],
    defaults: { "font-weight-semibold": "bold" },
    close: ["thin", "extralight", "light", "medium", "extrabold", "black"],
  },
}

/* Type — 14 named styles over three families of shared stops.
 *
 * A style does not hold numbers. It names a size stop, a line stop and (for the
 * three that need one) a tracking stop, and each stop holds one value per
 * CONTEXT. That indirection is the whole point: the style names are the API and
 * must never move, while what `label` measures is allowed to differ between a
 * desktop workbench and a phone.
 *
 * The stops ship as custom properties, which is the opposite of the rule color
 * follows — there, primitives resolve inline and only semantics reach the
 * browser. Type cannot do that. A context override has to swap the value
 * underneath a style that is already applied, and the only thing that can be
 * swapped after the fact is a custom property. Resolving stops inline would
 * bake one context into the utility and make a second one impossible.
 *
 * `weight` and `family` stay literal on the style. Neither varies by context,
 * and neither is a measurement — weight is what a style *is*, not how big.
 * Anchors mirror the DuBois ramp; the larger display steps get a slightly
 * negative tracking for optical tightness. */
export const type = {
  family: {
    text: '"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Commit Mono", ui-monospace, SFMono-Regular, "Cascadia Code", "Fira Code", monospace',
  },

  /* ── Contexts ─────────────────────────────────────────────────────────────
   *
   * A context is a complete set of values for the three stop families below.
   * Adding one is adding a column, never a style.
   *
   * `defaultContext` names the one whose values land in `:root`, so a document
   * that declares nothing still has a whole ramp — at every viewport.
   *
   * A context activates ONE way: `[data-type-context="mobile"]` on the document
   * or on any subtree. It is opt-in, and there is deliberately nowhere here to
   * put a media query.
   *
   * A viewport query cannot be the trigger for a component library. A media
   * query inside an iframe measures THAT IFRAME, not the reader's screen, and
   * these components spend most of their life in one: a Storybook story canvas,
   * the `/components` embed, a shell preview, a split panel, a narrow container.
   * `mobile` did carry a width query for one day, and every one of those boxes
   * narrower than the threshold rendered the phone ramp while the reader sat at
   * a desktop — the story canvas being the one almost every component is looked
   * at through. The app knows whether it is a phone; a box inside it does not,
   * and cannot be given a way to guess.
   *
   * This is NOT `--db-type-scalar`, and the two compose rather than compete.
   * The scalar is one multiplier a reader sets over whatever context is active.
   * A context is a non-uniform value set — mobile grows interface and reading
   * text while SHRINKING display — and no single multiplier can express a
   * change that moves two groups in opposite directions.
   *
   * The attribute is deliberately not `data-type-scale`, which the portal
   * already uses for the root font size — a different dial with a different
   * job. It is unprefixed by `:root` when emitted, so it matches any element
   * and the stops inherit, which is what lets one context render inside the
   * other. */
  contextAttr: "data-type-context",
  defaultContext: "desktop",
  contexts: ["desktop", "mobile"],

  /* ── Stops ────────────────────────────────────────────────────────────────
   *
   * Three families, three vocabularies, on purpose.
   *
   * SIZE is t-shirt named, nine stops. The names carry no unit and no role, so
   * a size can be shared by styles that have nothing else in common — `sm` is
   * `label`, `body` and `code`.
   *
   * LINE is ROLE named, seven stops, and deliberately not a second t-shirt
   * scale. If both families read `sm`/`md`/`lg` a reader would infer that
   * `line.md` belongs to `size.md`, and they do not correspond: `sm` takes
   * `flush` in `label` and `wrap` in `body`. Different vocabularies make that
   * mismatch unreadable as a mistake.
   *
   * TRACKING is style named, three stops, because only three styles carry an
   * optical correction and a stop that serves exactly one style may as well say
   * which. The other eleven emit a literal zero — see the note in the generator
   * for why the declaration cannot simply be dropped.
   *
   * Every stop states both contexts on one line. The alternative — a whole
   * desktop block then a whole mobile block — puts a stop's two values screens
   * apart, and the thing most worth seeing here is exactly how they differ. */
  stops: {
    size: {
      "2xs": { desktop: 11, mobile: 12 },
      xs: { desktop: 12, mobile: 13 },
      sm: { desktop: 13, mobile: 15 },
      md: { desktop: 14, mobile: 16 },
      lg: { desktop: 15, mobile: 17 },
      xl: { desktop: 16, mobile: 18 },
      "2xl": { desktop: 20, mobile: 20 },
      "3xl": { desktop: 24, mobile: 24 },
      // The one size that gets SMALLER on mobile. A 32px display line does not
      // fit a phone measure, and a heading that wraps to three lines stops
      // reading as a heading.
      "4xl": { desktop: 32, mobile: 28 },
    },
    line: {
      // 16px equals the icon box, so single-line text and an icon align in a
      // row without adjustment. Mobile gives it 20px: touch rows are taller and
      // nothing is trying to sit flush with a 16px glyph at that width.
      flush: { desktop: 16, mobile: 20 },
      wrap: { desktop: 20, mobile: 22 },
      read: { desktop: 22, mobile: 24 },
      "title-4": { desktop: 24, mobile: 24 },
      "title-3": { desktop: 28, mobile: 28 },
      "title-2": { desktop: 32, mobile: 32 },
      "title-1": { desktop: 40, mobile: 36 },
    },
    tracking: {
      eyebrow: { desktop: 0.5, mobile: 0.5 },
      "title-2": { desktop: -0.2, mobile: -0.2 },
      "title-1": { desktop: -0.4, mobile: -0.4 },
    },
  },
  /* One ramp, named by what the text is, in three groups named for how the
   * reader takes it in. The split that matters most is label vs body: they share
   * a size stop, but a label is single-line by definition and body wraps, so
   * they take different leading. Naming the stops rather than the numbers is
   * what makes that sharing visible — `label` and `body` are both `sm`, and no
   * context can accidentally pull them apart.
   *
   * Interface — glanced at, a piece at a time
   *   eyebrow    — overlines; carries its own caps and tracking
   *   hint       — captions, helper text, timestamps
   *   label      — single-line UI: buttons, menu items, cells, form labels
   *   body       — the same size, set to wrap: descriptions, helper blocks
   *   code       — inline mono: identifiers, paths
   *
   * Reading — read straight through, line after line
   *   code-block — mono blocks
   *   paragraph  — read as language: chat messages, docs, empty states
   *
   * Display
   *   title      — headings, 4 → 1
   *
   * Inline `code` is an identifier inside a sentence, so it belongs to the
   * interface register; a fenced block is read, so `code-block` sits in Reading
   * beside `paragraph` rather than beside the style it shares a face with.
   *
   * There is deliberately no `data` style. Tabular figures are a correctness
   * property, not a look — a reader never sees "tabular", only misalignment
   * when it is missing — and a numeric cell also needs right alignment, which
   * no type style can express. It lives on `<TableCell numeric>` instead.
   *
   * Density is NOT expressed here either. `--db-type-scalar` scales whatever
   * context is active from one dial, which is the right mechanism for "roomier
   * everywhere"; a context is the mechanism for "different here". A third
   * parallel ramp would inflate controls along with prose.
   *
   * name → { size, line, tracking?, weight, family, transform? }. `size`, `line`
   * and `tracking` name a stop above; they are not numbers. A style with no
   * `tracking` key emits a literal zero rather than nothing. */
  scale: {
    // ── Interface ──
    // Caps and tracking live in the style so nobody re-types them per use.
    // `2xs` is the only sub-`xs` size in the ramp, and it is an optical
    // correction rather than a new step: capitals have no descenders and fill
    // the whole x-height band, so all-caps at `xs` reads noticeably larger than
    // `xs` sentence case sitting beside it.
    eyebrow: { size: "2xs", line: "flush", tracking: "eyebrow", weight: 600, family: "text", transform: "uppercase" },
    hint: { size: "xs", line: "flush", weight: 400, family: "text" },

    // `flush` is the line box that equals the 16px icon box, so text and icon
    // align in a row without adjustment, and a 24px control gets 4px of
    // breathing room instead of 2px. Single-line by definition; anything that
    // wraps uses `body`.
    label: { size: "sm", line: "flush", weight: 400, family: "text" },
    "label-bold": { size: "sm", line: "flush", weight: 600, family: "text" },

    // Same size, `wrap` leading — loose enough to run to a second line.
    // Descriptions inside Alert, Empty, RadioTile, Card, DropdownMenu and Item
    // all live here.
    body: { size: "sm", line: "wrap", weight: 400, family: "text" },
    "body-bold": { size: "sm", line: "wrap", weight: 600, family: "text" },

    // Mono steps down against the sans it sits beside: at equal size it reads
    // larger. No `-bold` — code emphasis is carried by color, never weight.
    code: { size: "sm", line: "wrap", weight: 400, family: "mono" },

    // ── Reading ──

    // Shares paragraph's line box one size stop smaller, so a fenced block keeps
    // the rhythm of the prose around it without mono's wider face outrunning it.
    "code-block": { size: "md", line: "read", weight: 400, family: "mono" },

    // Genie renders markdown, and `**bold**` inside a message lands on -bold.
    paragraph: { size: "lg", line: "read", weight: 400, family: "text" },
    "paragraph-bold": { size: "lg", line: "read", weight: 600, family: "text" },

    // ── Display ──
    // The four title line stops are style-named because a heading's leading is
    // not shared with anything else — no interface style wants 28px.
    "title-4": { size: "xl", line: "title-4", weight: 600, family: "text" },
    "title-3": { size: "2xl", line: "title-3", weight: 600, family: "text" },
    "title-2": { size: "3xl", line: "title-2", tracking: "title-2", weight: 600, family: "text" },
    "title-1": { size: "4xl", line: "title-1", tracking: "title-1", weight: 600, family: "text" },
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

/* Elevation — DuBois's five stops, ascending. `xs` is an edge, `xl` is a dialog.
 *
 * Read from the production DuBois library's `Elevation/Light/*` and
 * `Elevation/Dark/*` effect styles, which is the set Databricks ships today.
 *
 * The scale used to run the other way — four stops numbered 0–3 with 1 as the
 * HIGHEST — so a step-for-step rename onto t-shirt names inverts every shadow
 * in the system. The old 1, 2 and 3 are this table's `xl`, `lg` and `sm`. Keep
 * that direction in mind before touching a call site: a bigger name is now a
 * bigger lift. `0` is gone because `shadow-none` is a CSS keyword and never
 * needed a token behind it.
 *
 * Each stop carries both modes because these are opaque-black shadows against a
 * surface, not a themeable color. The light alphas are tuned for white and draw
 * essentially nothing on `surface-base` in dark, which is why DuBois authors a
 * second set rather than reusing one. Same geometry in both; only alpha moves.
 *
 * Multi-layer stops are written soft-layer-first, which is CSS paint order —
 * Figma lists effects back-to-front, so its panel shows them reversed. At these
 * alphas the two orders composite identically; the order is documented because
 * the next person reading the Figma panel will see them the other way round. */
export const elevation = {
  /**
   * Roles, not sizes, and named to match the layer family so the two read as one
   * vocabulary: a menu is `layer-popover` and `elevation-popover`, a dialog is
   * `layer-modal` and `elevation-modal`.
   *
   * The names came out of what the stops were already used for rather than being
   * imposed on them — 24 call sites on one stop for controls and resting cards,
   * nine on another for every popup, four on a third for dialog, drawer and alert.
   * The map existed; it just was not written down anywhere.
   *
   * `raised` shares its word with `layer-raised` and does not co-occur with it. A
   * card on hover takes this and no layer, a pinned table header takes that layer
   * and no shadow. The shared word means "above its context" in both, which is the
   * point, but it is not a pairing.
   *
   * The old `md` retired with the rename. It had exactly one consumer — the navbar's
   * New button, a control lifted off the rail — and at that weight the button
   * out-lifted a hovered card, which is hard to defend. It reads `raised` now, and a
   * stop with one user is usually the stop being wrong rather than the user being
   * special.
   *
   * Geometry is identical per mode and only the alpha moves. An opaque-black shadow
   * tuned for white draws nothing on a near-black surface.
   */
  control: {
    light: "0 1px 0 0 rgba(0, 0, 0, 0.05)",
    dark: "0 1px 0 0 rgba(0, 0, 0, 0.45)",
  },
  raised: {
    light: "0 2px 3px -1px rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.02)",
    dark: "0 2px 3px -1px rgba(0, 0, 0, 0.45), 0 1px 0 0 rgba(0, 0, 0, 0.26)",
  },
  popover: {
    light: "0 2px 16px 0 rgba(0, 0, 0, 0.08)",
    dark: "0 2px 16px 0 rgba(0, 0, 0, 0.61)",
  },
  modal: {
    light: "0 8px 40px 0 rgba(0, 0, 0, 0.13)",
    dark: "0 8px 40px 0 rgba(0, 0, 0, 0.87)",
  },
}

/* Size — width and height. Same grid, same naming, so `--db-size-8` is 32px and
 * the class is `h-8`, `w-8` or `size-8`.
 *
 * The stops are the control heights and icon boxes the components already use:
 * 8px is a table rule, 12px a switch thumb, 16px an icon, 20px the chip, 24px
 * and 32px the two control heights, 28px a menu row, 40px a table header and
 * 48px the platform header. 16px matters most — it matches the `label` line box
 * (13/16), so text and icon align in a row without adjustment.
 *
 * 5 (20px) is the chip height, declared by badge, tag, kbd, the shortcut slot
 * in all three menu families, the small segment control, the small switch track
 * and the avatar. A chip cannot take its height from its leading, because the
 * divider inside it is the full chip height and would overflow a box sized that
 * way — tag.tsx says so at the call site.
 *
 * 12 (48px) is the platform header. `src/rules/layout-rules.ts` already
 * codifies it as the shell's `headerHeight`, and a region height the layout
 * rules name is a size decision by definition.
 *
 * There is no 14 (56px). The single 56px in the tree was the textarea's
 * `min-h`, a floor that grows with its content rather than a height the system
 * sets, and it now rests on 12. A stop earns its place by being a height
 * something declares, not by being a number something once reached.
 *
 * 6 (24px) is not optional. It is the small control height — the `sm` button and
 * the `sm` input are both `h-6` — so a size scale without it would refuse the
 * system's own components. It is also the step most likely to look droppable
 * from a list of numbers, since space carries a 6 too and `h-6` keeps rendering
 * 24px either way (K12 in verify-spacing-scale explains why). Rendering the same
 * is not the test; the test is whether a size decision can be written as one.
 *
 * Element and icon used to be separate sub-families, which put two names on one
 * number: a 24px control was `element-sm` and a 24px icon was `icon-xl`. */
export const size = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 12: 12 }

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

/**
 * The stacking order, named by what a thing is rather than by how high it sits.
 *
 * This family exists because the system had no order at all. Tooltip, dialog,
 * drawer, popover, select, context menu, hover card, combobox and alert dialog
 * every one of them sat at `z-50`, so which covered which was decided by the DOM
 * order Base UI happened to portal them in. A select inside a dialog worked by
 * luck, and the luck was invisible either way — nothing renders wrong until two
 * of them are open at once.
 *
 * The order is the argument, and each step earns its place above the last:
 *
 * - `raised` lifts something above its own siblings — a pinned table header over
 *   the rows, the selected half of a split button. Inside one component, not over
 *   the page.
 * - `sticky` is page chrome that pins. It clears `raised` because a page header
 *   has to cover a table's own pinned header, not sit under it.
 * - `overlay` is a scrim. Above the whole page by definition.
 * - `modal` is what the scrim is for, so it clears the scrim.
 * - `popover` is above `modal`, which is the fix: a select opened inside a dialog
 *   has to render over the dialog that contains it.
 * - `tooltip` is last, because a tooltip can describe a control inside a popover
 *   and there is nothing a tooltip should ever sit under.
 *
 * Tens, so a step can be inserted without renumbering the ones above it. `tooltip`
 * keeps 50 deliberately — it is what every overlay renders at today, so nothing
 * that is currently on top moves down.
 */
export const layer = {
  raised: 1,
  sticky: 10,
  overlay: 20,
  modal: 30,
  popover: 40,
  tooltip: 50,
}

/* Motion — three durations, and exactly ONE easing curve for the whole system.
 * A single curve is a deliberate economy: systems that ship five easings mostly
 * ship five things nobody can choose between.
 *
 * This used to be two BANDS of three — `fast-min`, `fast`, `fast-max` and the
 * same for `medium`, derived as base × 0.75 and base ÷ 0.75. Six names for what
 * an author experiences as two choices, and the four band members had zero
 * consumers, because the question at a call site is "quick or considered", never
 * "the fast band, three quarters of the way down". A band describes a permitted
 * range, and no CSS property and no Tailwind namespace takes a range.
 *
 * 450 is a ceiling rather than a slow band in the usual sense. Astryx's runs
 * 730–1300ms, which is wrong for tooling that sits between someone and their
 * data — anything approaching a second reads as the product being slow, not as
 * polish. Reserve it for something entering across a long distance. */
export const motion = {
  duration: {
    fast: "150ms",
    default: "300ms",
    slow: "450ms",
    /**
     * A loop's period, which is a different quantity from the other three.
     *
     * They are transition lengths — how long a thing takes to arrive. This is how
     * long one revolution takes, and it repeats forever. 450ms would spin a
     * loader better than twice a second, which reads frantic rather than busy;
     * a second is what Tailwind's own spin has always been, and it is right.
     */
    loop: "1000ms",
  },
  /**
   * Three curves, one per job, ordered from no curve outward the way the other
   * scales start at their null stop.
   *
   * `linear` is not a placeholder. Anything that loops has no start or finish to
   * ease into, and a spinner on any other curve visibly stutters once per
   * revolution.
   *
   * `standard` decelerates: it is the curve for something arriving or settling,
   * and it is the default. `exit` accelerates, for something leaving — an element
   * on its way out should clear the frame rather than linger being admired.
   */
  easing: {
    linear: "linear",
    standard: "cubic-bezier(0.24, 1, 0.4, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
  /**
   * The role layer over the two above, and the reason it exists is that neither
   * duration nor easing can be applied on its own to a thing that is not there yet.
   * A transition interpolates between two states of a present element. An overlay
   * arriving has no previous state, so it needs keyframes — and keyframes plus a
   * duration plus a curve is what one of these names.
   *
   * `shape` is the same shape of idea: a role over `radius`, so a component asks
   * for the decision rather than the measurement.
   *
   * Five, not four, because a role that can only open is half a role. `expand` and
   * `collapse` are one behavior in two directions, as are `enter` and `exit`.
   *
   * Each names its stops rather than its values, so retuning motion is one edit to
   * the family above and not five here. `keyframes` is the one part that is not a
   * token: what actually moves is geometry rather than a value a theme swaps, and
   * the bodies live in the generator beside the CSS they become.
   */
  animation: {
    enter: { keyframes: "dbui-enter", duration: "fast", easing: "standard" },
    exit: { keyframes: "dbui-exit", duration: "fast", easing: "exit" },
    expand: { keyframes: "dbui-expand", duration: "default", easing: "standard" },
    collapse: { keyframes: "dbui-collapse", duration: "default", easing: "standard" },
    loop: { keyframes: "dbui-loop", duration: "loop", easing: "linear", repeat: "infinite" },
  },
}

/* ══════════════════════════════════════════════════════════════════════════
 * THEMES — the third axis, after mode and the density/type dials.
 *
 * ── The invariant ─────────────────────────────────────────────────────────
 *
 * A THEME VARIES VALUES. IT NEVER VARIES NAMES.
 *
 * If a theme carries a token another lacks, they are not themes — they are two
 * systems sharing a word, and no component can render in both. That rule is
 * what buys one component set, one Figma construction and one linter allowlist
 * across N aesthetics, and the generator throws rather than emitting a theme
 * that breaks it.
 *
 * ── What a theme is, structurally ─────────────────────────────────────────
 *
 * A DIFF against the default. Everything above this comment is the base; a
 * theme states only what it changes, so "what does this theme actually do?" is
 * answerable by reading the theme rather than by diffing 85 values. It may
 * override five things and nothing else:
 *
 *   ramp        which PRIMITIVE RAMP drives the chrome — see below
 *   semantics   any name already in `semantics`, either mode
 *   shape       any role already in `shape`
 *   type.family `text` and `mono` — the FACE, never the ramp steps
 *   elevation   any stop already in `elevation`, either mode
 *
 * ── `ramp` is the lever that makes a theme cheap ──────────────────────────
 *
 * Every semantic already names which primitive ramp drives it: `surface-base`
 * is `interface.cool.900` in dark, `text-subtle` is `interface.neutral.600` in
 * light. A `ramp` entry rewrites one ramp to another everywhere it is
 * referenced, in both plain refs and inside alpha refs, so re-skinning the
 * whole of chrome is one declaration instead of forty value overrides.
 *
 * It is a REWRITE and not a filter: it catches every reference to the ramp
 * wherever it appears, not only the tokens a theme had in mind.
 *
 * It used to catch the two `viz-sequential-*` stops as well, which borrowed the
 * chrome ramp for the pale end of their scale. Those are `viz.cyan.050` now, so
 * the sequential scale is all cyan and theme-invariant. A warm pale end would
 * have to be a `semantics` override on those two tokens.
 *
 * `semantics` is applied AFTER `ramp`, so a theme can rebind the ramp and still
 * correct the handful of tokens that do not follow from it. That ordering is
 * what lets One be four declarations rather than forty.
 *
 * Space, density, motion, the type ramp steps, the icon set and component
 * structure are deliberately NOT themeable. Density earns the hardest no: if
 * spacing forked per theme, every layout, screenshot and spec would fork with
 * it and nothing learned in one would transfer. Density stays what it is — an
 * orthogonal dial any theme can turn, not a property of a theme.
 *
 * ── How it ships ──────────────────────────────────────────────────────────
 *
 * Each theme emits scoped to `[data-theme="<name>"]`, and the default ALSO
 * lands in `:root` so a product that imports one file needs no attribute. The
 * portal loads every theme and sets the attribute; a product picks one at build
 * time and ignores it. Same authoring either way.
 *
 * The attribute is unprefixed by `:root` when emitted, exactly like the type
 * contexts, so Core and DuBois can sit side by side in one page scoped to
 * different subtrees — which is what a migration surface needs, and what makes
 * the switch provable rather than assertable.
 *
 * Mode and theme COMPOSE rather than compete. `.dark` and `[data-theme]` are
 * one class against one attribute — equal specificity — so a theme's dark block
 * has to out-specify its own light block to survive dark mode. The generator
 * pairs them (`.dark [data-theme=x]`, `[data-theme=x].dark`) for that reason.
 * ══════════════════════════════════════════════════════════════════════════ */

/** The attribute a theme activates on. Not `data-type-scale`, which is the
 * portal's root-font-size dial, and not the `dark` class, which is the mode. */
export const themeAttr = "data-theme"

/** The theme whose values land in `:root`. Everything above is authored as it. */
export const defaultTheme = "core"

export const themes = {
  /* Core is the base, so it declares no overrides — its values are the ones
   * this file states directly. The empty object is not a placeholder: it is
   * what "the default is the source, not a diff against something else" looks
   * like, and it keeps `:root` byte-identical to a single-theme emission. */
  core: {
    label: "Core",
    description: "The system's own aesthetic. Neutral chrome, Figtree, pill controls.",
  },

  /* DuBois — the legacy Databricks aesthetic, present so people can migrate off
   * it and so the theme axis has a stress test rather than a sibling.
   *
   * It is deliberately the FIRST theme after Core for that reason. Omni and One
   * are ramp swaps and would prove almost nothing; DuBois is the only theme that
   * can invalidate the model, because it differs in face and corner as well as
   * color. The question it had to answer was precise — can DuBois be expressed
   * without adding a token name Core lacks? It can, and the three groups below
   * are the whole answer.
   *
   * What it does NOT change is as much of the point. The chrome ramp stays
   * neutral/cool, because legacy DuBois was grey-chromed too. Elevation stays,
   * because Core's five stops were read out of the production DuBois library in
   * the first place and were never Core's own invention. Links stay, because
   * `link-base` is already `status.blue.600` — the exact legacy link color. A
   * theme that changed those would be changing them to look busy. */
  dubois: {
    label: "DuBois",
    description: "The legacy product aesthetic. Blue primary, SF Pro, 4px controls.",

    /* 1. PRIMARY IS BLUE.
     *
     * Core's primary is the near-black/near-white pair, which is the single
     * loudest thing about its aesthetic; legacy DuBois fills its primary button
     * with `status.blue.600` and that is the single loudest thing about that
     * one. Nothing else in the color system has to move for the switch to read.
     *
     * The state ladder follows `action-positive` and `action-negative` rather
     * than Core's own primary, which washes one ink with alpha. Those two are
     * already the pattern for a SATURATED fill: step down the ramp in light,
     * step UP in dark. Alpha-washing a blue over a white page lightens it toward
     * grey, which is exactly the read a blue primary is here to avoid.
     *
     * Dark inverts the same way Core's does — a light fill with dark type — so
     * `action-label-inverse-*` needs no override in either mode. White on
     * #2272B4 measures 5.08:1; #11171C on #8ACAFF measures 10.15:1. */
    semantics: {
      "action-primary-base": { light: "status.blue.600", dark: "status.blue.400" },
      "action-primary-hover": { light: "status.blue.700", dark: "status.blue.300" },
      "action-primary-press": { light: "status.blue.800", dark: "status.blue.200" },

      /* The ring is blue too, and is deliberately NOT the same blue as the fill.
       *
       * Core learned this the expensive way: the ring used to sit on the exact
       * values `action-primary-base` carried in the same mode, so the most
       * important control in the system had a focus ring the color of its own
       * fill and the treatment vanished on the one button most likely to be
       * tabbed to. Only a 1px offset separated them, and an offset is a gap
       * rather than a ring. Pointing DuBois's ring at `blue.600` would rebuild
       * that defect inside the theme that was supposed to prove the axis works.
       *
       * So the ring steps off the fill in both modes, in the direction that has
       * contrast: light goes DARKER (blue.700, 7.99:1 on white), dark goes
       * LIGHTER (blue.300). `focus-ring-offset` is the gap and stays the
       * surface color in both modes, so it needs no override. */
      "focus-ring": { light: "status.blue.700", dark: "status.blue.300" },
    },

    /* 2. THE FACE IS SF.
     *
     * The two stacks already existed in `type.legacy` below, where they were
     * kept alive purely so the linter would not fail components that had not
     * migrated off them yet. They are the same strings, now with a consumer.
     *
     * `-apple-system` carries this rather than the quoted family names. "SF Pro
     * Text" is not a name a browser can resolve to an installed face on most
     * machines, while `-apple-system` and `ui-monospace` are the sanctioned
     * hooks into San Francisco and SF Mono. The quoted names lead so a machine
     * that DOES have them licensed and installed uses them; the keywords behind
     * them are what actually fires on macOS. Off Apple hardware this degrades to
     * the platform UI face, which is the honest answer — SF is not ours to
     * serve, and a theme that shipped a webfont for it would be shipping a
     * licensing problem rather than an aesthetic.
     *
     * Only the FACE moves. The ramp steps do not, and that split is load
     * bearing: 13/16 stays 13/16 in DuBois, so every measurement, screenshot and
     * spec taken in Core still describes the theme beside it. A theme that
     * retuned the ramp would fork all of them. */
    type: {
      family: {
        text: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"SF Mono", SFMono-Regular, ui-monospace, "Cascadia Code", "Fira Code", monospace',
      },
    },

    /* 3. BOTH CONTROL HEIGHTS TAKE 4px.
     *
     * This is the case the role layer was built for, called by name in `shape`'s
     * own comment above: Core makes the 32px control a pill and holds the 24px
     * one at 4px, and DuBois puts them back together. Two roles could express
     * that and one could not — which is why `control` and `control-lg` are split
     * by control height rather than collapsed into a single `control`.
     *
     * It is also the cheapest possible proof that the role layer works. Every
     * button, input, select, toggle, combobox and split button in the library
     * changes corner, and not one component file is touched: they bind
     * `shape-control` / `shape-control-lg` and the theme reassigns what those
     * resolve to.
     *
     * `pill` is deliberately left alone, which is the other half of the same
     * proof. It sits on `full` in Core alongside `control-lg`, and the two look
     * like one decision until a theme pulls them apart — DuBois has 4px buttons
     * and round avatars. Collapsing them would have lost that.
     *
     * The container roles stay too. Legacy dialogs and cards were not square,
     * and changing them would be an aesthetic opinion this theme has no source
     * for. `square` cannot be reassigned at all — the generator throws — because
     * flush control groups depend on it being exactly zero. */
    shape: {
      control: 1,
      "control-lg": 1,
    },
  },

  /* One — the warm-toned sibling, and the theme that pays for the `ramp` lever.
   *
   * DuBois proved the axis could carry an aesthetic that differs in face and
   * corner. One proves the cheap path: it re-skins every neutral in the system
   * and does it in FOUR declarations, because the chrome was already named by
   * ramp rather than by value. Written as overrides it would have been forty,
   * and the answer to "what does this theme do?" would have been a diff.
   *
   * `interface.warm` has had all ten stops and no consumer since the palette was
   * written. It was One, waiting. */
  one: {
    label: "One",
    description: "Warm neutrals, DM Sans, brand orange accent. Core's shapes.",

    /* 1. THE CHROME GOES WARM.
     *
     * Both entries, because the two ramps are one decision seen from two modes:
     * `interface.neutral` drives light chrome and `interface.cool` drives dark,
     * and a warm theme that kept a cool dark mode would be warm only half the
     * time. The warm ramp runs the same direction as both — 050 near-white to
     * 900 near-black — so every semantic keeps the tonal relationship it was
     * tuned with and only the hue moves.
     *
     * Two consequences fall out of this rather than being declared, and both
     * are the ones asked for:
     *
     *   • PRIMARY STAYS BLACK-ISH. `action-primary-base` is the deepest chrome
     *     stop by construction, so it lands on `warm.900` (#1B1612) in light and
     *     `warm.200` in dark — the deepest tone of the warm palette, with the
     *     inversion Core already makes. No override.
     *   • THE FOCUS RING STAYS OFF THE FILL. Core's ring is two stops off the
     *     end of the ramp rather than at it, precisely so it never matches the
     *     primary fill. Rebinding the ramp carries that reasoning across intact:
     *     warm.700 ring against a warm.900 fill. DuBois had to restate this by
     *     hand because it changed hue without changing ramp; One does not.
     *
     * `surface-base` stays `base.white` in light, which is correct rather than
     * an oversight — white is not a neutral grey, and Core does the same. The
     * warmth arrives on `surface-subtle` and everything drawn on top. */
    ramp: {
      "interface.neutral": "interface.warm",
      "interface.cool": "interface.warm",
    },

    /* 2. THE ACCENT IS THE BRAND ORANGE.
     *
     * The three `*-accent` tokens and nothing else. They are the only place the
     * system says "this is the accent", which is what makes this three lines
     * instead of a hunt.
     *
     * Links deliberately stay blue. `link-*` is its own family carrying its own
     * state ladder, and blue-for-navigable is a web-wide affordance rather than
     * a house style — a theme is the wrong altitude to overrule it. The two are
     * meant to be separable, and One is the theme that separates them.
     *
     * Each stop matches the role Core's blue plays at the same name, so the
     * accent family keeps its internal shape: a pale tint for surface, the deep
     * end for text, the middle for a border. */
    semantics: {
      "surface-accent": { light: "brand.orange.200", dark: "brand.orange.900" },
      "text-accent": { light: "brand.orange.700", dark: "brand.orange.400" },
      "border-accent": { light: "brand.orange.600", dark: "brand.orange.500" },
    },

    /* 3. THE FACE IS DM.
     *
     * Both from Google Fonts, so unlike DuBois's San Francisco these have to be
     * served — the portal loads them beside Figtree. A theme's face is a token;
     * loading it is the consumer's job, and this is the theme that makes that
     * distinction cost something.
     *
     * DM Mono ships 300/400/500 only, with no 600. `code` and `code-block` are
     * the two styles that read it and both are weight 400, so nothing in the
     * ramp asks for a weight it does not have — code emphasis is carried by
     * color rather than weight, which is a rule that predates this theme. */
    type: {
      family: {
        text: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"DM Mono", ui-monospace, SFMono-Regular, "Cascadia Code", "Fira Code", monospace',
      },
    },

    /* 4. SHAPE IS CORE'S, so there is no fourth declaration.
     *
     * Stated here only because its absence is a decision: a 32px control is a
     * pill and a 24px one is 4px, exactly as in Core. One is a re-skin, not a
     * re-shape, and the two axes staying independent is the point — DuBois moves
     * the corner and keeps the neutral, One moves the neutral and keeps the
     * corner. Between them they cover both halves of the claim. */
  },
}

export default { meta, primitives, semantics, scalars, space, radius, shape, bridge, size, border, type, elevation, motion, layer, themes, themeAttr, defaultTheme }
