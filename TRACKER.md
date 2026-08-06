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
5. **The named space steps, size and border width are read by nothing.** The grid unit
   and the density dial now stand behind `--spacing`, so density re-flows the whole
   system, but the eleven `--db-space-*` names remain unspent — each restates a
   numeric utility, so exposing them as Tailwind keys would put `p-md` beside a `p-4`
   that renders the same pixels. Decide whether the named scale is the intended
   contract, or whether the unit and the dials are the whole family.
   `spacing-scalar` and `sizing-scalar` cannot ride `--spacing`: Tailwind reads one
   key for padding and gap, and each of those dials owns half that axis.
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
