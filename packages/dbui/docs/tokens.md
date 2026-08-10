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
5. **Everything dimensional is scalar-tied.** One dial re-flows the system. The
   exception is border, per rule 7.
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
8. **Dimensions is the collection** — space, size, radius, border. Each family
   computes its own stops; none reads another, and no family is obliged to carry
   a stop it has no use for. Space and size are both nine stops and deliberately
   not the same nine: 5, 7 and 12 are heights and never paddings, and the half
   step is a padding and never a height. A family carries a stop when it has a
   use for it, not because a sibling does. The ladder of
   multiples they are all authored against is an **authoring artifact**: a Figma
   collection and a list in `theme.config.mjs`, deliberately not a custom
   property. React ships semantics only, exactly as it does for color, where the
   palette resolves inline and only `--db-surface-base` reaches the browser.
   There is no `--db-scale-*`.
9. **"Scalar" means a multiplier and nothing else.** `--db-density-scalar` and
   `--db-type-scalar` are the only two. The group is Dimensions, not Scalars and
   not Numbers.
10. **Type is independent of the scale.** Font sizes and line heights are their
    own stops on `--db-type-scalar`, so text and layout move separately. Most
    line heights happen to land on multiples of 4; `read` does not. That is
    convergence, not a dependency, and the odd one is deliberate.
11. **Type stops ship as custom properties. Color primitives do not.** This is
    the one place the two layers disagree, and it is not an oversight. A type
    context has to change what a style measures *after* the class is already on
    the element, and a custom property is the only thing that can be swapped
    that late. A color primitive has nothing equivalent to swap, so it resolves
    inline and never reaches the browser.

## Type

Named by what the text *is*, not how big it is.

**A style names a stop, not a number.** The 14 style names are the API and never
move. What a style measures comes from three families of shared stops — sizes,
t-shirt named; line heights, role named; tracking, style named — and each stop
holds one value per **context**. `theme.config.mjs` holds the table; the portal's
Tokens page and `docs/token-spec.md` print it.

The three vocabularies are deliberately different. If sizes and line heights both
read `sm`/`md`/`lg`, a reader would infer that `line.md` belongs to `size.md`, and
they do not correspond.

**`label` vs `body` is the split that matters.** They share a size stop. A label
is single-line by definition, so it takes the `flush` line box — the one that
equals the icon box, which is what lets text and icon align in a row without
adjustment. Body wraps, so it takes `wrap`. Using `label` for text that wraps is
the most common mistake, and naming the stops is what makes the shared size
visible rather than a coincidence of two equal numbers.

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

## Type contexts

A context is a whole column of stop values. `desktop` is the default and lives in
`:root`, so a document that declares nothing has a whole ramp at every viewport.

Mobile is **not** desktop times a number. It grows interface and reading text and
*shrinks* the largest display step, because a display line that does not fit a
phone measure wraps to three lines and stops reading as a heading. That is why a
scalar could not have done this job.

**A context is opt-in, and only the app can declare one.** Set
`data-type-context="mobile"` on `<html>` and the whole document switches; set it
on a subtree and one context renders inside the other, which is how the Tokens
page shows both ramps on one desktop page. Setting it back to `"desktop"` inside
a `"mobile"` subtree works too — every context gets a block, including the
default. The blocks follow `:root` and win at equal specificity on source order.

**Nothing activates from viewport width, deliberately.** A media query inside an
iframe measures that iframe, and these components spend most of their life inside
one — a story canvas, the `/components` embed, a shell preview, a narrow panel. A
width trigger therefore gives the phone ramp to a component preview on a desktop
screen, which is a regression this system has already shipped once. The app knows
whether it is a phone; a box inside it does not.

**Contexts and the scalar are different mechanisms.** `--db-type-scalar` is one
multiplier a reader sets over whatever context is active — the answer to "roomier
everywhere". A context is the answer to "different here". A stop carries its plain
value and the utility applies the scalar, so the multiplication resolves on the
element and a subtree that sets the scalar actually moves. Do not confuse either
with `data-type-scale`, which is the portal's own root-font-size dial.

## Surface

Which step to reach for is `DESIGN.md`'s to say. One mechanical fact belongs
here, because it is the one that bites.

The ramp runs in **opposite luminance directions per mode**, and that is
correct. Relative luminance, light: `base` 1.00000, `subtle` 0.95597, `strong`
0.91310. Dark: `base` 0.00816, `subtle` 0.01932, `strong` 0.03306. Both are
monotonic, so the family is not defective and there is nothing to fix in
`theme.config.mjs`.

The consequence is that **`surface-base` means "the page", not "raised"**. On a
`surface-subtle` backdrop it sits above under light and below under dark, so an
element whose fill is the only thing lifting it inverts between modes — a card
in one and a well in the other. Give it a border or a ring, which most of the
system does, or step the fill with `dark:bg-surface-strong`.

A shadow will not cover the gap on its own. Elevation ships per mode and the
dark values are black at high opacity, so over a near-black backdrop a DBUI
shadow deepens the recess rather than lifting the element out of it.

## Elevation

What the steps mean and which way they run is `DESIGN.md`'s to say. Two
mechanical facts belong here instead.

Elevation is the only dimensional family that ships **per mode**. Every other
family resolves to one value; an elevation step resolves to one value in `:root`
and another under `.dark`, the same way a semantic color does. It is not a
color and cannot ride the semantics table, so the generator emits it into both
blocks itself.

It is also bridged, so the step name is the Tailwind class: `shadow-lg` reads
`--db-elevation-lg` rather than Tailwind's own scale. Before that bridge existed
the family was generated and read by nothing, and every shadow in the system
rendered Tailwind's values while the tokens described DuBois's.

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

Radius carries one stop that is not a multiple at all. `full` is a pill
sentinel, and it goes through the bridge like every numbered step, because a
stop the bridge skips is a token nothing can reach — that is what left every
`rounded-full` in the tree rendering Tailwind's own pill while the token sat
defined and unread. Ours is a finite number rather than an infinity for the
same reason the config is authored in px: it has to be a value Figma can hold.

An explicit key beats Tailwind's multiplier for the same step, which is what makes
the bridge load-bearing rather than decorative. Tailwind's multiplier is still
declared, so a step DBUI has not defined keeps rendering off it. Removing the
multiplier is what makes the scale finite, and it is a separate change that has to
wait until the off-scale call sites are snapped to a legal step.

See `TRACKER.md` for status. Nothing in this file describes progress.

## Also

`token-rules.md` — the color contract and the machine-enforceable rules.
`scripts/design-lint/README.md` — the linters.
