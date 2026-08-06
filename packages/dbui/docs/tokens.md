# Tokens

Values live in the source, not here. This file is the rules — the things you
cannot derive by reading `tokens.css`.

To see values: the portal's Tokens page renders every one from the shipped CSS,
and `dbui token [group]` prints them.

## Files

| File | Role |
| --- | --- |
| `src/tokens/theme.config.mjs` | **The only file you edit.** |
| `src/tokens/tokens.css` | Generated. The shipped `--db-*` vars + Tailwind `@theme`. |
| `src/tokens/type.css` | Generated. The `type-*` ramp as utilities. |
| `scripts/design-lint/generate-tokens.mjs` | config → `tokens.css`, `type.css`, `tokens.json` |
| `scripts/design-lint/verify-token-sync.mjs` | Proves config ↔ CSS ↔ Figma parity. |
| `scripts/design-lint/tokens.json` | Generated. The linter's allowlist. |

```bash
yarn design:tokens                       # regenerate
yarn design:verify-sync                  # prove parity
node scripts/generate-token-data.mjs     # refresh the portal's Tokens page
```

## Invariants

1. **Primitives never ship as CSS.** Generator input only, resolved inline into
   each semantic. `tokens.css` contains zero primitive vars, so product code
   cannot reference the palette by construction.
2. **`--db-` prefixes vars; Tailwind utilities stay unprefixed.**
   `--db-surface-base` is the var, `bg-surface-base` is the class.
3. **Generated files are never hand-edited** — `tokens.css`, `type.css`,
   `tokens.json`.
4. **Figma Code Connect:** semantics carry `codeSyntax.WEB = var(--db-<name>)`;
   primitives have it cleared, since they do not ship.
5. **Everything dimensional is scalar-tied.** One dial re-flows the system.
6. **Spatial values ship in rem, authored in px.** The config stays in px because
   that is how Figma and designers think; the generator converts once, against a
   16px root. Radius is included — an input that grows taller while its corner
   stays frozen changes shape, not just size.
7. **Border width stays in px, and is the one family whose number is px.**
   `--db-border-1` is 1px, not 4px. A hairline is a rendering fact, not a
   proportion: at a 20px root, 1px would become 1.25px and blur across a subpixel
   boundary. It is also the number an author already types — `border-2` is 2px in
   stock Tailwind — so reading it as 8px would break the one expectation every
   Tailwind user arrives with.

## Type

Named by what the text *is*, not how big it is.

**`label` vs `body` is the split that matters.** Both are 13px. A label is
single-line by definition, so its line box is 16px — equal to the icon box, which
is what lets text and icon align in a row without adjustment. Body wraps, so it
takes 20px. Using `label` for text that wraps is the most common mistake.

**Each class is the whole style** — family, size, line-height, tracking, weight
and case. Never pair one with `leading-`, `font-` or `uppercase`.

**`type-` not `text-`.** Tailwind's `text-` already means color. A size called
`text-text` beside a color called `text-text-subtle` would be ambiguous;
`class="type-paragraph text-text-subtle"` reads correctly.

**There is no `data` style.** Numbers in a table use `<TableCell numeric>`.
Tabular figures are a correctness property, not a look — a reader never sees
"tabular", only misalignment when it is missing, and Figtree's digits vary by
about 3px across 0–9. A numeric cell also needs right alignment, which no type
style can express. Outside a table, apply `tabular-nums` directly.

**`code` has no bold.** Code emphasis is carried by color, never weight.

**Density is not a second ramp.** `--db-type-scalar` scales the whole ramp from
one dial. A parallel "comfortable" ramp would inflate controls along with prose.

## Elevation

The scale counts **down**: `1` is the highest surface (dialogs), `3` the softest
(toasts), `0` flat. Read the number as "how far from the page". If two surfaces
overlap, the one on top takes the lower number.

## The Tailwind bridge

`theme.config.mjs` names which Tailwind namespaces resolve to DBUI tokens, and
the generator emits that map into `tokens.css`. Writing it by hand in
`globals.css` is what let the shipped copy freeze radius at px while the portal's
copy tracked the token.

Only a dial shaped like the namespace may be folded into it. Tailwind reads one
key for `p-4` and `gap-4`, so `--spacing` carries the grid unit and
`--db-density-scalar` — the dial that means everything at once — and not
`--db-spacing-scalar` or `--db-sizing-scalar`, each of which owns half that axis.

Every dimensional stop is named after its **multiple of the family's unit**, and
the bridge declares one Tailwind key per stop. That is what makes the number the
same in both tools: the token, the Tailwind class and the Figma variable all carry
the same digit, so nothing has to be looked up in either direction. A name like
`md` could not do that — it was the fourth space step and the second radius step,
and the two families disagreed about what `md` meant.

For space, size and radius the unit is the 4px grid step, so `space-3` is 12px.
For border the unit is 1px, per rule 7. That is the only place the two readings
diverge, and it is stated on the family rather than left for a reader to infer
from a value.

An explicit key beats Tailwind's multiplier for the same step, which is what makes
the bridge load-bearing rather than decorative. Tailwind's multiplier is still
declared, so a step DBUI has not defined keeps rendering off it. Removing the
multiplier is what makes the scale finite, and it is a separate change that has to
wait until the off-scale call sites are snapped to a legal step.

See `TRACKER.md` for status. Nothing in this file describes progress.

## Also

`token-rules.md` — the color contract and the machine-enforceable rules.
`scripts/design-lint/README.md` — the linters.
