# Status

Verify with `dbui doctor`, `verify-token-sync.mjs`, `generate-gallery.mjs`.
Anything those contradict is this file being wrong.

**2026-08-05**

## Layers

| Layer | State |
| --- | --- |
| Tokens | Done |
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
