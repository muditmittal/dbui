# Audit log

Dated results of the parity audits. A log that only records passes cannot tell you
*when* something broke, so failures are recorded too, with what actually differed.

Each entry names the command, so any line here can be re-run and checked rather
than trusted.

| Command | Asks |
|---|---|
| `yarn design:audit-tokens` | Does Figma paint the same colour React does? Values, not names |
| `yarn design:verify-sync` | Do token *names* agree across config, CSS and Figma? |
| `yarn design:audit-variants` | Do Figma's variant options and React's props still agree, per family? |
| `yarn design:audit-figma` | Does every component exist on both sides and point at the other? |
| `yarn design:audit-portal` | Is every component visible on `/components` — row, story link, live tile? |
| `yarn design:audit-viz` | Do the charts follow the contribution protocol and the palette rule? |
| `yarn dbui doctor` | Is the discovery layer intact — annotations, index coverage, counts? |

---

## 2026-08-17

### 1. Tokens — FAIL, then FIXED → PASS

`yarn design:audit-tokens` · 103 shared names, 206 values compared

**Found:** six values disagreed, Figma stale in all six.
**Fixed:** all six aligned to the config in Figma, re-read from the file, re-audited.
**Now:** every shared token paints the same colour in both modes.

Nothing here was ambiguous about which side was right: `tokens.css` is generated from
`theme.config.mjs`, and it matched the config exactly.

| Token | Mode | Figma | React (correct) |
|---|---|---|---|
| `action-selected-base` | light | 6% black | **8% black** |
| `action-selected-base` | dark | 7.8% white | **10% white** |
| `action-selected-hover` | light | 10% black | **12% black** |
| `action-selected-hover` | dark | 12.2% white | **14% white** |
| `viz-level-pass-base` | light | `#3BA65E` green.500 | **`#8DDDA8` green.400** |
| `viz-level-high-base` | light | `#C82D4C` red.600 | **`#E65B77` red.500** |

The two `action-selected` rows are the one change the config argues for at length:
`selected-base` and `default-hover` were both 6%, so **pointing at an unselected
control painted it the exact fill of a selected one**. The selected family moved to
fix it. Figma never received that move, so in Figma the bug is still there.

The two `viz-level` rows were each one rung too dark — the base stops were lightened
when the level ramp was contrast-checked, and again only the config side landed.

**How each was fixed matters.** The two `action-selected` rows are stored in Figma as
literal colours with alpha, so they were set directly. The two `viz-level` rows are
stored as **aliases** onto the primitive ramp, and only the light mode was wrong — so
the alias was repointed one rung lighter (`green/500`→`green/400`,
`red/600`→`red/500`) rather than replaced with a baked hex. A semantic that names a
primitive keeps tracking the scale; one holding a literal stops, and the next ramp
change would leave it behind again.

**Two name-level gaps remain open, in opposite directions.** Both are names one side
has and the other does not, which is `design:verify-sync`'s question rather than this
one — so `audit-tokens` prints them and does not fail on them. One gap should not fail
two gates, and a gate that fails every run stops being read.

- **10 primitives in React, not Figma** — the `brand.orange` scale. Known, documented
  in `theme.config.mjs`, and deliberately not silenced. One's accent needs it.
- **4 semantics in Figma, not React** — `brand-brand`, `brand-gradient-start`, `-mid`,
  `-end`. Figma models the AI gradient as variables; React hard-codes it as
  `--ai-gradient-*`, **duplicated across four blocks** in
  `packages/dbui/src/tokens/globals.css` and `apps/portal/src/app/globals.css`, with
  no `--db-*` token behind it. The config comment already flags this as a gap that
  predates theming. Left open by decision, not oversight.

Before this run, no check compared token *values* at all — `design:verify-sync` prints
"NOT COMPARED — dump carries names only". All six mismatches were invisible to every
gate in the repo.

### 2–6. Components, by family — PASS

`yarn design:audit-variants` · 2026-08-17 16:08 PDT

| # | Family | Components | Variant axes | Result |
|---|---|---|---|---|
| 2 | Actions | 5 | 13 | aligned |
| 3 | Controls | 19 | 24 | aligned |
| — | Content | 16 | 6 | aligned |
| 4 | Overlays | 6 | 3 | aligned |
| 4 | Feedback | 8 | 6 | aligned |
| 5 | Viz | 20 | 5 | aligned |
| 6 | Chat | 12 | 6 | aligned |
| — | Compositions | 10 | 0 | aligned |

Controls was the one to worry about — 19 components and 24 axes, the largest surface
in the system — and it is clean.

Alongside, all passing on the same run: `design:audit-figma` (no gaps),
`design:audit-portal` (79 rows, 78 with a live tile), `design:audit-viz` (0 gaps),
`dbui doctor` (8 passed, 0 warnings).

**Two real gaps were found and closed to get here:**

- **`Toast` had variants in Figma and no mapping entry at all** — a `Type` axis of
  four sentiments and a `Removable` boolean, describing nothing. Added, including the
  part that explains itself: `closeButton` is set on the `Toaster` mount rather than
  per toast, and there is no `Toast` element to render, which is why it is the one
  gallery row with no live tile.
- **`Checkbox` read as broken and was not.** The mapping listed `unchecked` /
  `checked` as if they were string values; they are boolean props rendered as
  `data-checked`. The matcher now recognises boolean prop declarations, `data-*`
  attributes and destructured props, so a boolean-state axis is verified rather than
  reported missing.

`Viz/Inner/*` is excluded, on the same grounds `audit-figma-parity` excludes it:
`Header`, `Metric` and `Axis Label` are rendered *for* you by `MetricCard`'s props,
so there is no component to reach for. Their axes are documented in
`docs/figma-mapping.md`, which is the right home for a part.

**What this does and does not prove.** It compares Figma's variant *options* against
the props React actually declares, in both directions — a renamed Figma variant and a
renamed React prop both fail it. It does not compare rendered appearance: whether
`Viz/Medium/Bar` and `BarChart` draw the same bars is still eyes-only. 89 mapping
cells are prose rather than prop names and are counted as unverifiable rather than
passed.

Both new audits were verified by injecting a fault and confirming they fail —
a Figma option renamed in the mapping, a mapping pointing at a dead prop, and a demo
tile keyed to nothing. An audit that has only ever passed has not been tested.

### 7. The primitive board was stale — FIXED

`yarn design:audit-tokens` (now covers primitives) · 2026-08-17 20:30 PDT

The `UI Color Primitive` board in Figma (node `4858:22847`) printed and painted **19 of
180 tiles wrong**, and no gate could see it because its tiles held **literal hexes**
rather than bindings — a snapshot of the ramp on the day someone pasted it.

| Ramp | Wrong | What happened |
|---|---|---|
| `interface/neutral` | 9 of 10 | An entirely different grey ramp. The config uses the Tailwind neutral scale; the board held a custom one. Only `800` matched, by coincidence |
| `viz/cyan` | 9 of 10 | The pre-retune cyan. Every step behind the contrast work |
| `interface/cool` | 1 (`700`) | `#445461` against the config's `#2B343D` |

Also fixed: **30 labels printed a hex with no `#`** (Sage, Lime, Gold), **234 text nodes
were bound into `Semantic (old)`** — `text/foreground` and `text/muted-foreground`, names
React pruned — and the two columns were named "Light mode" and "Dark mode" while their
headers read `050–400` and `500–900`. They are two halves of one ramp, and are now named
that.

**The fix that matters is that all 180 tiles are now bound to their `Primitives`
variables.** The values were never the root cause; the literals were. A board documenting
a ramp cannot hold its own copy of it.

The Figma *variables* were correct throughout — all 182 match the config. Only the board
had drifted, which is the tell that the binding was the bug.

**`design:audit-tokens` now compares 180 primitive ramp stops against
`theme.config.mjs`.** Previously it checked only the 103 semantics, and `verify-sync`
checks primitive *names* only — it says so: "NOT COMPARED — dump carries names only". So
a retuned ramp could drift with every gate green. Verified by re-injecting the three stale
values and confirming all three are reported.

### 8. The semantic board — FIXED

`Color semantics` (node `5143:42012`) · 2026-08-17 23:28 PDT

The board's own description claimed "the swatches and the labels are the live values
rather than a snapshot". Half true, and the half that was false is the half a reader
trusts.

**The chips were bound and correct. The printed labels were not.** 18 labels showed
values the chip beside them had already moved off:

- **9 light + 9 dark `viz/sequential` stops** printed the pre-retune cyan — `#22BFE5`
  where the chip resolved `#28C1E7`, `#0A2C36` where it resolved `#15353F`. The same
  drift as the primitive board, surviving in the text because only the fill was bound.
- **4 `action/selected` labels** still printed 6% and 10% — the values corrected in
  entry 1 *earlier the same evening*. Fixing a token updates every bound chip and no
  printed label anywhere.

**19 of 107 tokens had no row at all**, and they are exactly the recently added ones:
`border/emphasis`, all 15 `viz/level/*`, all 3 `viz/neutral/*`. A board can be accurate
about everything it shows and still be silent about a fifth of the system.

Fixed by adding the 19 rows in both columns — cloned from a sibling so the bound chip,
bound stroke and bound text fills came with them — and then **rewriting all 214 labels
from their bound variable** rather than correcting the 18 by hand. 60 labels changed.
Now 107 rows per column, every chip bound, zero label mismatches.

**The lesson across entries 7 and 8: binding the swatch is not enough.** A board has two
channels, the colour and the text, and only one of them can be bound. Any printed value
is a copy, so it has to be regenerated from the variable rather than typed — and any
board is one token away from being incomplete.

`Color primitives` (now `5143:40953`, a wrapper the file's owner added around the frame
fixed in entry 7) re-verified clean: 180 tiles, all bound, all labels matching.

**Node ids on this page are not stable.** Three of the six boards have been recreated
since they were first touched, so a lookup by id came back empty while the board was
plainly there. Match token boards by name.
