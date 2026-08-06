# Status

Verify with `dbui doctor`, `verify-token-sync.mjs`, `generate-gallery.mjs`,
`generate-token-consumption.mjs`. Anything those contradict is this file being wrong.

**2026-08-06**

## Layers

| Layer | State |
| --- | --- |
| Tokens | Color, type, radius and the spacing grid live — size, elevation and motion unconsumed |
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
   16/24 and needs rebinding, and `surface-hover` is new since. `verify-token-sync`
   already reports the gap. Do Figma and Code Connect in one pass or they drift.
2. **Portal build.** The Next.js site (`/`, `/docs`) needs the remaining doc pages
   ported from the Storybook MDX. Storybook keeps `/components`.
3. **Generate the token docs.** Four drifts in one session. Generate the derivable
   blocks, check them in CI when CI exists.
4. **Genie prose sits on `body`, not `paragraph`.** `theme.config.mjs` names chat
   messages under `paragraph`; the components ship `body`. Reconciling moves the
   whole conversational surface up two points, so it is a design call rather than a
   migration.
5. **Border width is read by nothing.** Space, size and radius are done: their stops
   are named after their multiple of the grid unit and each one is bridged to a
   Tailwind key, so `--db-space-3` is what `p-3` resolves to, `--db-size-8` what
   `h-8`/`w-8`/`size-8` resolve to, and `--db-radius-2` what `rounded-2` resolves to.
   Border width still ships as named steps nothing reads.
   Tailwind's `--spacing` multiplier is still declared beside the explicit stops, on
   purpose: 106 call sites write a step the scale does not define, 45 of them at 6px
   in menus and pills. Snapping those to the nearest legal step is the open decision,
   and closing the scale with `--spacing: initial` cannot land before it. The
   consumption scan now measures the gap: 507 of the 818 dimensional utilities in the
   tree resolve to a space token, and the rest come off the multiplier.

8. **`cn()` is `clsx`, not `tailwind-merge`, so conflicting utilities both survive
   and stylesheet order picks the winner.** Found by the radius rename: the control
   inside an `InputGroup` carries the base `rounded-1` and the group's `rounded-none`,
   and renaming the scale flipped which one Tailwind emits last. The rendered
   difference was 1,061 of 3,360,000 pixels at 4x with a worst channel delta of 9/255,
   because the element is transparent and borderless — but nothing about that outcome
   was chosen. Any component composing a utility that its base also sets is resolved
   by emission order today. Reproduce with
   `node scripts/pixel-ab.mjs <url> <selector> <css>`.
6. **Elevation and motion cannot be bridged without changing how the product looks
   and feels.** Measured on one card, `shadow-lg` reaches below it and nowhere above;
   `elevation-1` blooms on all four sides because it carries no negative spread, and
   is roughly four times wider sideways. `elevation-3` peaks far darker than the
   `shadow-xs` currently on 30 controls. Both scales are pure black with no dark
   value, so neither draws anything against `surface-base` in dark — elevation is a
   single-mode token in a two-mode system, and that is the first thing to fix.
   Motion is mis-shaped rather than mis-valued: `duration-*` and `ease-*` do resolve
   from the theme, but the four `-min`/`-max` band members describe a permitted range,
   and no CSS property and no Tailwind namespace takes one. Nothing in the product
   renders a DBUI duration; every transition that ships takes Tailwind's default.
   Either retune both families so the bridge is a no-op the way spacing and radius
   were, or delete them and name Tailwind's scales as the system's.
7. **`--shadow-focus` is authored in `globals.css` rather than `theme.config.mjs`,**
   so its two widths are the only dimensional values outside the config. The radius
   and spacing bridges moved into the generator; this one did not.

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
