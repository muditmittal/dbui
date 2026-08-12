/**
 * An abstract mark per docs tile.
 *
 * Deliberately not the icon set. An icon is an affordance — it labels a control
 * and belongs to a semantic category, and `component-rules.md` treats crossing
 * those categories as an error. Nothing here labels anything. These are
 * illustrations, so borrowing `Database` for the tokens tile would be claiming
 * a meaning the icon does not have.
 *
 * The family is three rules, and every mark obeys all three:
 *
 * 1. **One 24-unit field.** Every mark is drawn in the same `0 0 24 24`
 *    coordinate space with geometry on its half-unit grid, which is the 4px
 *    grid the rest of the system is authored against, read as a ratio. A
 *    viewBox is a proportion rather than a measurement — the rendered size is
 *    set by the tile, in tokens, below.
 *
 * 2. **One line weight, everywhere.** `non-scaling-stroke` takes the stroke out
 *    of the coordinate space, so a mark sitting on its floor and the same mark
 *    filling a two-row cell draw the identical hairline. That is the reasoning
 *    already written on `--db-border-1`: a hairline is a rendering fact, not a
 *    proportion. It is also what lets a mark grow into the cell it is given
 *    without becoming a heavier drawing than its neighbors.
 *
 *    A solid does not get that for free — a fill scales with the geometry. It
 *    only matters where the figure stands alone against thin lines, so Voice is
 *    the one mark tuned for it; the Components figure is a part inside a frame
 *    and keeps its proportion whatever size the frame is drawn at.
 *
 * 3. **One figure.** Everything is `currentColor` — the tile sets it to
 *    `text-subtle` — except exactly one element per mark, in `text-strong`.
 *    That single accent is what the mark is about, and putting it in the same
 *    structural place across fourteen drawings is what makes them read as one
 *    system rather than fourteen illustrations.
 *
 * Color comes only from those two text semantics, so both modes are covered by
 * the tokens rather than by a second drawing.
 */

/**
 * The quiet half of every mark.
 *
 * `vectorEffect` is not an inherited property, so it cannot be set once on the
 * `<svg>` and left to reach the children — it is spread onto each stroked
 * element instead.
 */
const FIELD = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const

/** Solid geometry in the quiet color — a filled part of the field, not the figure. */
const FIELD_SOLID = { fill: "currentColor" } as const

/** The one element per mark that carries the idea. */
const FIGURE = "fill-text-strong"

/**
 * Keyed by route, so a mark and the page it stands for cannot drift apart. A
 * route with no entry renders an empty field and keeps its place in the grid —
 * the same way an unlisted page lands as a plain single cell rather than
 * disappearing.
 */
const MOTIFS: Record<string, React.ReactNode> = {
  // Two candidates leave one decision; only one of them resolves. "When two
  // designs both look reasonable, these decide which one ships."
  "/docs/principles": (
    <>
      <path {...FIELD} d="M2 12H9" />
      <path {...FIELD} d="M9 12L13 7H17" />
      <path {...FIELD} d="M9 12L13 17H17" />
      <circle {...FIELD} cx="19.5" cy="17" r="2.5" />
      <circle className={FIGURE} cx="19.5" cy="7" r="2.5" />
    </>
  ),

  // One source, carrying to every distance. The arcs are the strings; the point
  // they all leave from is the voice.
  //
  // The source is drawn smaller than the figure on a single-cell mark. This
  // tile spans two rows and never renders small, and a solid grows with the
  // drawing where the stroke does not — so the radius that reads as punctuation
  // at 58px reads as a blot at 200.
  "/docs/voice": (
    <>
      <path {...FIELD} d="M9.24 7.76A6 6 0 019.24 16.24" />
      <path {...FIELD} d="M12.07 4.93A10 10 0 0112.07 19.07" />
      <path {...FIELD} d="M14.9 2.1A14 14 0 0114.9 21.9" />
      <circle className={FIGURE} cx="5" cy="12" r="1.6" />
    </>
  ),

  // Brackets that stop short of the edge, holding a form inside them. The
  // bound is the drawing; what it contains is only there to be bounded.
  "/docs/constraints": (
    <>
      <path {...FIELD} d="M3 10V3H10" />
      <path {...FIELD} d="M21 14V21H14" />
      <rect className={FIGURE} x="10" y="10" width="4" height="4" rx="1" />
    </>
  ),

  // A center that reaches outward — the focus ring and its offset, drawn as a
  // concept rather than as a state.
  "/docs/accessibility": (
    <>
      <circle {...FIELD} cx="12" cy="12" r="6.5" />
      <path {...FIELD} d="M4.93 19.07A10 10 0 014.93 4.93" />
      <path {...FIELD} d="M19.07 4.93A10 10 0 0119.07 19.07" />
      <circle className={FIGURE} cx="12" cy="12" r="2.5" />
    </>
  ),

  // A ruler. Every stop is a value the system can express, and the last one is
  // the end of the scale rather than an arbitrary stopping point.
  "/docs/tokens": (
    <>
      <path {...FIELD} d="M2 19H22" />
      <path {...FIELD} d="M5 19V16" />
      <path {...FIELD} d="M9 19V13.5" />
      <path {...FIELD} d="M13 19V11" />
      <path {...FIELD} d="M17 19V8.5" />
      <rect className={FIGURE} x="20.25" y="6" width="1.5" height="13" rx="0.75" />
    </>
  ),

  // A field of equals with one of them found. Tagging by concept is what turns
  // the grid into the ring.
  "/docs/icons": (
    <>
      <circle {...FIELD_SOLID} cx="6" cy="6" r="1.25" />
      <circle {...FIELD_SOLID} cx="12" cy="6" r="1.25" />
      <circle {...FIELD_SOLID} cx="6" cy="12" r="1.25" />
      <circle {...FIELD_SOLID} cx="12" cy="12" r="1.25" />
      <circle {...FIELD_SOLID} cx="18" cy="12" r="1.25" />
      <circle {...FIELD_SOLID} cx="6" cy="18" r="1.25" />
      <circle {...FIELD_SOLID} cx="12" cy="18" r="1.25" />
      <circle {...FIELD_SOLID} cx="18" cy="18" r="1.25" />
      <circle {...FIELD} cx="18" cy="6" r="4" />
      <circle className={FIGURE} cx="18" cy="6" r="1.75" />
    </>
  ),

  // A root and its named parts — the composition pattern the system is built
  // on, drawn as itself. The largest tile carries the most structure.
  //
  // The parts are sized off the frame rather than dropped inside it. This mark
  // measured the same 56% of its field as any other and still read as the empty
  // one, because a hairline box is mostly the hole in the middle: extent is not
  // ink. Both children now run to the frame's own inset, and the gap between
  // them is the one the header already sets, so the interior is divided rather
  // than sparsely occupied.
  "/components": (
    <>
      <rect {...FIELD} x="2" y="3" width="20" height="18" rx="2" />
      <rect {...FIELD_SOLID} x="5" y="6" width="14" height="2.5" rx="1" />
      <rect className={FIGURE} x="5" y="11" width="6" height="7" rx="1" />
      <rect {...FIELD} x="13" y="11" width="6" height="7" rx="1" />
    </>
  ),

  // Regions in proportion, with no frame around them — a page is divided before
  // it is filled. The header is solid because that is where the surface starts.
  "/docs/layout": (
    <>
      <rect {...FIELD} x="2" y="4" width="6" height="16" rx="1.5" />
      <rect {...FIELD} x="10" y="10.5" width="12" height="9.5" rx="1.5" />
      <rect className={FIGURE} x="10" y="4" width="12" height="4.5" rx="1.5" />
    </>
  ),

  // Equal steps in one direction. Recurrence is the repetition; order is the
  // fact that it only reads one way round.
  "/docs/patterns": (
    <>
      <path {...FIELD} d="M3 19H8V13H14V7H17" />
      <rect className={FIGURE} x="17" y="4.5" width="5" height="5" rx="1" />
    </>
  ),

  // A finite set of frames, picked from before anything goes in one. Portrait,
  // empty, and interchangeable — which is the whole argument for shells.
  "/docs/shells": (
    <>
      <rect {...FIELD} x="2" y="5" width="6" height="14" rx="1.5" />
      <rect {...FIELD} x="16" y="5" width="6" height="14" rx="1.5" />
      <rect className={FIGURE} x="9" y="5" width="6" height="14" rx="1.5" />
    </>
  ),

  // Three things with nothing in common but the line they ship on. The odd set
  // is the point: neither a component, an icon nor a token.
  "/docs/utilities": (
    <>
      <path {...FIELD} d="M2 20H22" />
      <rect {...FIELD} x="3" y="11.5" width="6" height="6" rx="1" />
      <path {...FIELD} d="M16 17.5L19 11.5L22 17.5Z" />
      <circle className={FIGURE} cx="12.5" cy="14.5" r="3" />
    </>
  ),

  // A prompt and a cursor. The angle and the block are the two marks a terminal
  // is recognized by with every other detail removed.
  "/docs/cli": (
    <>
      <path {...FIELD} d="M4 7.5L9 12L4 16.5" />
      <path {...FIELD} d="M17.5 12H21" />
      <rect className={FIGURE} x="12" y="9" width="3.5" height="6" rx="0.75" />
    </>
  ),

  // One center answering several callers. The agent is not drawn; the shape of
  // being asked is.
  "/docs/mcp": (
    <>
      <circle {...FIELD} cx="12" cy="4.5" r="2.25" />
      <circle {...FIELD} cx="5.5" cy="15.75" r="2.25" />
      <circle {...FIELD} cx="18.5" cy="15.75" r="2.25" />
      <path {...FIELD} d="M12 9.25V6.75" />
      <path {...FIELD} d="M9.62 13.38L7.45 14.63" />
      <path {...FIELD} d="M14.38 13.38L16.55 14.63" />
      <circle className={FIGURE} cx="12" cy="12" r="2.75" />
    </>
  ),

  // A gate. Two went through and one is being held, which is the honest shape
  // of a standard — it is defined by what it stops.
  "/docs/standards": (
    <>
      <path {...FIELD} d="M2 13H22" />
      <circle {...FIELD} cx="6.5" cy="18.5" r="2.5" />
      <circle {...FIELD} cx="17.5" cy="18.5" r="2.5" />
      <circle className={FIGURE} cx="12" cy="10" r="3" />
    </>
  ),
}

/**
 * The mark scales with the tile rather than sitting at a fixed size, because a
 * bento whose cells differ in area and not in anything else is the monotony the
 * grid was supposed to break. `meet` keeps the field square at every aspect
 * ratio, so growth never stretches the geometry; rule 2 above is what stops it
 * thickening the line.
 *
 * One `preserveAspectRatio` covers both of the caller's layouts because each
 * leaves only one axis free. Paired, the box is already square at the floor
 * size and the mark fills it exactly, so neither half is live and the caller
 * places the whole box. Stacked, the box is the tile's full width by whatever
 * height is left under the title, and the mark is bound by that height — so `Y`
 * is inert and only `xMin` does anything, holding the mark flush left under the
 * title it belongs to.
 *
 * `opacity-20` on the whole mark, so it recedes to texture and the label is the
 * only thing on a tile asking to be read. It goes on the group rather than on
 * the colors because the accent has to fade with the field it sits in — drop
 * one and not the other and the figure stops being a figure.
 *
 * Decorative, and named by the tile's own label a few pixels away, so it is
 * hidden rather than described twice.
 */
export function TileMotif({ href, className }: { href: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
      className={`opacity-20 ${className ?? ""}`}
    >
      {MOTIFS[href] ?? null}
    </svg>
  )
}
