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
  /* Core intends `full` here — a 32px control is a pill and a 24px one is 4px.
   * Held at 1 so the components could be repointed onto the roles without moving
   * a single pixel, which is the only way a rebind of this size can be verified
   * as a no-op. Flipping it to "full" is then a one-line change with a visible
   * diff, made on purpose rather than smuggled in with the indirection. That is
   * the role layer earning its keep on the first day it exists. */
  "control-lg": 1,
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
   * The 12px band is deliberately absent. It is not a third tier — it is a card's
   * INNER corners, which are 12px because they nest inside a 16px one, plus the
   * grouped-control corners in button-group and split-button. Neither is a
   * container decision, so neither gets a container role. */
  container: 2,
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
  /* Elevation is the family that was authored, generated, documented and read by
   * nothing. Every `shadow-*` in the tree resolved to Tailwind's own scale, so
   * the tokens described one system and the screen rendered another — the whole
   * reason DBUI's overlays never matched DuBois. This line is what closes that:
   * the stop names are shared, so `shadow-lg` finally reads `--db-elevation-lg`.
   *
   * Nothing is closed. `2xs`, `2xl` and `inner` have no call sites, and leaving
   * them on Tailwind's values keeps this change to elevation rather than turning
   * it into a refusal of classes nobody writes. */
  shadow: { family: "elevation", steps: ["xs", "sm", "md", "lg", "xl"] },
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
  xs: {
    light: "0 1px 0 0 rgba(0, 0, 0, 0.05)",
    dark: "0 1px 0 0 rgba(0, 0, 0, 0.45)",
  },
  sm: {
    light: "0 2px 3px -1px rgba(0, 0, 0, 0.05), 0 1px 0 0 rgba(0, 0, 0, 0.02)",
    dark: "0 2px 3px -1px rgba(0, 0, 0, 0.45), 0 1px 0 0 rgba(0, 0, 0, 0.26)",
  },
  md: {
    light: "0 3px 6px 0 rgba(0, 0, 0, 0.05)",
    dark: "0 3px 6px 0 rgba(0, 0, 0, 0.45)",
  },
  lg: {
    light: "0 2px 16px 0 rgba(0, 0, 0, 0.08)",
    dark: "0 2px 16px 0 rgba(0, 0, 0, 0.61)",
  },
  xl: {
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
  },
  easing: { standard: "cubic-bezier(0.24, 1, 0.4, 1)" },
}

export default { meta, primitives, semantics, scalars, space, radius, shape, bridge, size, border, type, elevation, motion }
