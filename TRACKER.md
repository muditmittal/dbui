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
4. **A bold step at the hint size.** The ramp has no 12/16 at weight 600, so seven
   sites keep a px literal and stay frozen when the root font size moves: the count
   badge in `dropdown-menu`, `context-menu` and `menubar`, `Kbd`, the small
   `AvatarFallback`, and two spans in the shells' `PlatformHeader`. Adding a step
   needs a decision, not a patch — verify by loading any page at 1.4x and looking for
   text that did not grow. Everything else is on the ramp.
5. **Charts do not scale.** `dbui-viz` sets font size as a number inside the
   Vega-Lite spec, which no CSS class reaches, so chart text stays put while the
   page around it grows. The donut's center value is also a size the ramp does not
   carry. Fixing it means teaching `resolveVizTheme` to read the ramp vars and
   resolve rem to px.
6. **Genie prose sits on `body`, not `paragraph`.** `theme.config.mjs` names chat
   messages under `paragraph`; the components ship `body`. Reconciling moves the
   whole conversational surface up two points, so it is a design call rather than a
   migration.

## Small

- `Platform Header` has no `@guideline` — the only real one. `doctor` reports 14, but
  13 are marked excluded or internal, so the check should filter them.
- `Date Range`, `Aspect Ratio`, `Label` have no story.
- 9 components use raw `opacity-50` for disabled instead of the disabled tokens.
- `doctor` promises "exits non-zero on failure" and exits 0.
- Storybook 8.6 → 10.4. Two majors; v9 removed `addon-essentials` and moved
  `@storybook/blocks`. Own branch. Now unblocked.

## Not started

Asset detail templates · tree parity with the prototype · Lucide icon pack ·
a11y and i18n linters · breakpoint tokens
