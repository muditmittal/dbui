# Status

Verify with `dbui doctor`, `verify-token-sync.mjs`, `generate-gallery.mjs`,
`generate-token-consumption.mjs`. Anything those contradict is this file being wrong.

**2026-08-06**

## Layers

| Layer | State |
| --- | --- |
| Tokens | Color, type and all four Dimensions families live and bridged — elevation and motion unconsumed |
| Icons | Done |
| Components | Done — 3 have no story, 1 has no `@guideline` |
| Compositions | Partial — exist, not documented |
| Shells | Partial — 5 defined, asset detail templates not built |
| Portal | Done |
| CLI + MCP | Done |
| Figma | Stale — pre-migration token names |
| Install | Works — registry points at the Databricks npm proxy |

## Open

1. **Figma token migration.** Variables carry pre-migration names; Title 4 is now
   16/24 and needs rebinding, `surface-hover` is new since, and `input-border-focus`
   has been deleted from the config and still exists in Figma. `verify-token-sync`
   already reports all of it — it names two semantics today, one missing each way.
   The dump is left honest rather than hand-edited to match, because it is a
   snapshot of Figma and not a second copy of the config. Do Figma and Code Connect
   in one pass or they drift.
2. **Portal build.** The Next.js site (`/`, `/docs`) needs the remaining doc pages
   ported from the Storybook MDX. Storybook keeps `/components`.
3. **Generate the token docs.** Four drifts in one session. Generate the derivable
   blocks, check them in CI when CI exists.
4. **Genie prose sits on `body`, not `paragraph`.** `theme.config.mjs` names chat
   messages under `paragraph`; the components ship `body`. Reconciling moves the
   whole conversational surface up two points, so it is a design call rather than a
   migration.
5. **The scale is closed only by convention, because Tailwind's multiplier is still
   on.** All four Dimensions families are done: every stop is named after its
   multiple of the grid unit and bridged to a Tailwind key, so `--db-space-3` is what
   `p-3` resolves to, `--db-size-8` what `h-8`/`w-8`/`size-8` resolve to,
   `--db-radius-2` what `rounded-2` resolves to, and `--db-border-1` what a bare
   `border` resolves to.
   The multiplier is still declared beside the explicit stops, on purpose: call sites
   write steps the scale does not define — `p-1.5`, `p-9`, and now also `p-5`, `p-7`
   and `p-12` — and those still compile at the same values. Snapping them to the
   nearest legal step is a sequenced follow-up, and closing the scale with
   `--spacing: initial` cannot land before it. The rules for that pass are agreed and
   written down in `packages/dbui/docs/token-simplification.md`; nothing is done. The
   consumption scan measures the gap: 507 of the 818 dimensional utilities in the tree
   resolve to a space token, and the rest come off the multiplier.

   Space and size are nine stops each and deliberately not the same nine. 5, 7 and 12
   are size stops and not space stops, so `h-5` is `--db-size-5` while `p-5` is the
   multiplier — a family carries a stop when it has a use for it, not because a
   sibling does. K5b and K13b pin that split. The snap pass therefore touches
   `p-5` and `p-12` and must leave `h-5` and `h-12` alone.

   One hazard this leaves behind. A missing stop in `size` does not fail — a height
   utility reads `--height-*` first and `--spacing-*` second, so `h-6` renders 24px
   from `--db-space-6` whether or not size owns a 6. `size-6` was briefly dropped and
   nothing moved; it was restored because it is the small control height, not because
   a test caught it. K12 in `verify-spacing-scale.mjs` pins the precedence.

8. **`cn()` is `clsx`, not `tailwind-merge`, so conflicting utilities both survive
   and stylesheet order picks the winner.** Found by the radius rename: the control
   inside an `InputGroup` carries the base `rounded-1` and the group's `rounded-none`,
   and renaming the scale flipped which one Tailwind emits last. The rendered
   difference was 1,061 of 3,360,000 pixels at 4x with a worst channel delta of 9/255,
   because the element is transparent and borderless — but nothing about that outcome
   was chosen. Any component composing a utility that its base also sets is resolved
   by emission order today. Reproduce with
   `node scripts/pixel-ab.mjs <url> <selector> <css>`.
6. **Elevation and motion are still unconsumed, for different reasons.** Elevation
   cannot be bridged without changing how the product looks: measured on one card,
   `shadow-lg` reaches below it and nowhere above; `elevation-1` blooms on all four
   sides because it carries no negative spread, and is roughly four times wider
   sideways. `elevation-3` peaks far darker than the `shadow-xs` currently on 30
   controls. Both scales are pure black with no dark value, so neither draws anything
   against `surface-base` in dark — elevation is a single-mode token in a two-mode
   system. Deliberately untouched for now; the measurement stands, the change does
   not.
   Motion is now the right shape and still unread. The four `-min`/`-max` band
   members are gone and the three that remain are `fast 150`, `default 300`,
   `slow 450`. Bridging them is one line — `--default-transition-duration:
   var(--db-duration-fast)` — and it was deliberately NOT taken here: 29 call sites
   write a bare `transition-*` at Tailwind's 150ms, so pointing the default at
   anything but 150 changes how the product feels, which is outside a rename.
   Pointing it at `fast` is now a true no-op and is the obvious next step.
7. **`--shadow-focus` is authored in `globals.css` rather than `theme.config.mjs`,**
   so its two widths are the only dimensional values outside the config. The radius
   and spacing bridges moved into the generator; this one did not.
9. **Five action semantics are correct and unread, and the components are what is
   wrong.** `action-default-base`, `action-default-press` and the whole
   `action-label-*` triplet have no consumer outside the Tokens page. They were
   kept at their current values on purpose — the fix is to rewire the controls onto
   them, not to delete them. Nothing of that is done. Note the neighbours that are
   live and must not be swept up: `action-default-hover` has consumers, and so does
   the separate `action-label-inverse-*` family.
10. **The React linter now reads every source tree, and its rules do not.** The
   default scan covers the portal, the shells, the components, Genie and viz, and
   `.ts` as well as `.tsx` — 679 files against 114, and 2,518 findings against
   2,179. Every one of the 339 new findings is pre-existing and none was fixed.
   The `.ts` half reports nothing at all, because every rule enters through a JSX
   element: `packages/dbui-viz/src/lib/theme.ts` holds 63 literal hexes and comes
   back clean. Teaching the color rules to read an object literal is the next step
   and is a change to rule logic.

## Small

- `Platform Header` has no `@guideline` — the only real one. `doctor` reports 14, but
  13 are marked excluded or internal, so the check should filter them.
- `Date Range`, `Aspect Ratio`, `Label` have no story.
- `LineSeries` draws no axis labels even with `showAxis` on. The end-dot layer
  carries `axis: null` and Vega-Lite resolves axes across layers, so it strips the
  axis from the whole view. Visible in the Charts story.
- `DonutChart` clamps the Vega view width to its `size` prop, so a right-oriented
  legend gets no room of its own and draws over the ring.
- 9 components use raw `opacity-50` for disabled instead of the disabled tokens.
- `doctor` promises "exits non-zero on failure" and exits 0.
- Storybook 8.6 → 10.4. Two majors; v9 removed `addon-essentials` and moved
  `@storybook/blocks`. Own branch. Now unblocked.

## Not started

Asset detail templates · tree parity with the prototype · Lucide icon pack ·
a11y and i18n linters · breakpoint tokens
