# Tokens

Values live in the source, not here. This file is the rules — the things you
cannot derive by reading `tokens.css`.

To see values: the portal's Tokens page renders every one from the shipped CSS,
and `dbui token [group]` prints them.

**Or read them on a canvas.** The Figma file's Tokens page carries six boards, in
one band, left to right:

| Board | Shows | Node |
|---|---|---|
| Type | The 14 ramp styles live, Desktop and Mobile side by side; then a Figtree specimen and a Commit Mono specimen with the features each was chosen for | `5113:4212` |
| Effects | An isometric elevation chain carrying the real shadows, easing curves, and an isometric layer stack | `5114:4212` |
| Dimensions | Space, size, radius and border to true measure, plus the density dial | `5116:4212` |
| Color primitives · Color semantics · UI Color Primitive | Every colour, both modes | pre-existing |

**Each easing token carries two visuals, and the second is the one that reads.** The plot
is the real cubic bezier — drawn as a bezier, not sampled — with its control handles and a
dashed constant-speed diagonal to deviate from. Beside it, a strip marks where the thing
actually *is* every 100ms across a 1000ms run, which is what makes the speed change
legible: `ease-standard` is 64% of the way there at 200ms, `ease-exit` only 22%. Those
figures are solved from the curve rather than estimated — finding progress at a given
*time* means solving `x(t)` by bisection first, because `t` is not time.

**The elevation diagram is stacked in composition order, not shadow order.** A modal is
the surface you work in, a card sits inside it, a control sits on the card, and a
popover opens above all of it — which is the order a reader meets them, and it agrees
with `layer-popover` 40 over `layer-modal` 30. It is deliberately *not* ordered by
shadow size: the modal carries the largest shadow of the four and still sits lowest.
The rows beneath the diagram list the specs in ascending shadow order, so both readings
are available. Each plane is drawn as the thing it names, in abstract bars rather than
text, because text inside an isometric transform is unreadable.

**Two numbers on the Type board were measured in the file, not looked up.** Figtree's
x-height is 71% of its cap height — the Gotham and Proxima Nova band, well clear of a
Futura-style geometric near 60% — which is what lets `type-label` hold at 13px. And
its digits run 6px for the `1` against 9px for the `0` at 13px, a 3px spread that puts
`1111` at 22px and `0000` at 34px. That is the whole argument for `TableCell numeric`,
and it is why the board states it rather than leaving it to `table.tsx`'s JSDoc.

### Re-verifying a colour board

Both colour boards had drifted, in different ways, and neither was catchable offline.
The rule that came out of it: **a board has two channels and only one can be bound.**

- The **swatch** binds to its variable. Bind it and it cannot drift.
- The **printed hex** is always a copy. It has to be *regenerated* from the variable,
  never typed — the semantic board printed pre-retune cyan next to correct chips, and
  printed 6% next to a chip that had moved to 8% the same evening.
- **Coverage is a third failure.** The semantic board was accurate about all 88 rows it
  had and silent about 19 tokens it did not.

To re-check either board with `use_figma`: walk its tiles, read each one's
`fills[0].boundVariables.color`, resolve that variable in the column's mode, and assert
the printed label equals it — then diff the set of bound variable names against the
`Colors` collection to catch tokens with no row. Node ids here are **not stable**: three
of the six boards have been recreated, so match on name.

⚠️ **Commit Mono is not installed in this Figma file.** The mono specimen is set in
JetBrains Mono, which Commit Mono cites as a reference, and the board says so on its
face. The same substitution affects the `Code Block` and `Terminal` components, which
are drawn in a stand-in rather than the face the token names. Installing Commit Mono
in the org is the fix; until then no mono surface in Figma is truthful.

The three new boards exist because the portal reads top to bottom and cannot be
zoomed — a canvas can hold the whole ramp at once and be compared across columns,
which is the thing a linear page cannot do.

Two properties worth preserving if you edit them. **Every fill is bound to a
variable**, so a token change moves the board rather than dating it. And the Type
board's two columns are one set of bindings with each panel pinned to a Typography
mode via `setExplicitVariableModeForCollection` — Desktop and Mobile are not drawn
twice, so they cannot drift from each other or from the file.

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

## Themes

Three today: **Core**, the system's own aesthetic; **DuBois**, the legacy product
one; and **One**, the warm-toned sibling. Core is in `:root`, so a consumer that
imports `tokens.css` and sets nothing gets a complete system and never has to
know the axis exists.

**A theme varies values. It never varies names.** This is the invariant the axis
rests on, and it is enforced rather than documented: `generate-tokens.mjs` throws
on a theme that declares a name the base lacks, and `verify-token-sync` fails
when two theme blocks do not declare the identical set. A theme carrying a token
another lacks would mean no component can render in both, which makes them two
systems sharing a word.

**A theme may override five things and nothing else:** its chrome `ramp`, any
`semantics` name, any `shape` role, the two `type.family` faces, and any
`elevation` stop. Space, density, motion, the type ramp steps, the icon set and
component structure are not themeable. Density earns the hardest no — if spacing
forked per theme, every layout, screenshot and spec would fork with it, and
nothing learned in one would transfer to another.

**`ramp` is the lever that makes a theme cheap.** Every semantic already names
the primitive ramp that drives it — `surface-base` is `interface.cool.900` in
dark — so a `ramp` entry rewrites one ramp to another everywhere it is
referenced, in plain refs and inside alpha refs alike. One re-skins every neutral
in the system with two lines. As value overrides it would have been forty, and
the answer to "what does this theme do?" would have been a diff rather than a
sentence.

It is a rewrite rather than a filter, so it catches every reference to the ramp
wherever it appears, not only the tokens a theme was thinking about.

Until Aug 2026 that included the two `viz-sequential-*` stops, which borrowed the
chrome ramp for the pale end of their scale so a warm page got a warm lightest
cell. Those now resolve to `viz.cyan.050` in both directions, so **the sequential
scale is all cyan and no longer varies by theme**. If a warm page ever needs a
warm pale end again, that is a `semantics` override on `viz-sequential-1` and
`-10`, not something `ramp` will do for free.

**`semantics` applies after `ramp`**, so a theme can re-skin broadly and still
correct the few tokens that do not follow. Reversed, the rebinding would
overwrite the correction it was supposed to precede.

**Every theme emits the same keys**, including the default and including keys it
does not itself move, so a nested block can reset the one around it.
`[data-theme="core"]` inside a DuBois document has to put the pill back, and it
can only do that by declaring the role.

**A theme activates on `data-theme`, on any element.** The attribute is
unprefixed by `:root`, so setting it on a subtree themes that subtree — Core and
DuBois can render side by side in one page, which is what a migration surface
needs. Same mechanism as the type contexts.

**Mode composes with a theme rather than competing with it.** `.dark` and
`[data-theme]` are one class against one attribute — equal specificity — so a
theme's light block emitted after `.dark` would paint straight over dark mode.
Each theme's dark values therefore ship under three two-compound selectors:
`.dark [data-theme=x]`, `[data-theme=x].dark`, and `[data-theme=x] .dark`. The
result is that theme, mode and both dials are four independent axes, and setting
one cannot disturb the other three.

**What the two non-default themes actually change**, and the two halves are
deliberately complementary — DuBois moves the corner and keeps the neutral, One
moves the neutral and keeps the corner:

| | DuBois | One |
| --- | --- | --- |
| Chrome | neutral, unchanged | `interface.warm`, both modes |
| Primary | `status.blue`, explicit | `warm.900` — falls out of the ramp |
| Accent | unchanged (blue) | `brand.orange` on the three `*-accent` tokens |
| Shape | both control roles at 4px | Core's — pill at 32px, 4px at 24px |
| Face | San Francisco, not served | DM Sans / DM Mono, served |
| Declarations | 3 groups, 8 tokens | 3 groups, ~29 tokens |

DuBois has to restate its focus ring by hand, because it changes hue without
changing ramp and a ring the color of the fill it surrounds is invisible on the
one control most likely to be tabbed to — which Core learned the expensive way.
One does not: rebinding the ramp carries Core's "two stops off the end" reasoning
across intact. That difference is the argument for the ramp lever in one line.

Two things neither theme overrides. **Links stay blue in both** — `link-*` is its
own family with its own state ladder, and blue-for-navigable is a web-wide
affordance rather than a house style, so a theme is the wrong altitude to
overrule it. **Elevation is untouched** — Core's stops were read out of the
production DuBois library in the first place.

`brand.orange` is the one name the axis has added rather than revalued, and its
500 is `#FF5F46` — a hex that was already in `globals.css` three times over as
`--ai-gradient-end` with no token behind it. Naming it closed a gap that predates
theming. It is **not in Figma yet**, so `verify-token-sync` reports ten missing
primitives until it is.

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

It is also bridged, so the role name is the Tailwind class: `shadow-popover` reads
`--db-elevation-popover` rather than Tailwind's own scale. Before that bridge
existed the family was generated and read by nothing, and every shadow in the
system rendered Tailwind's values while the tokens described DuBois's.

The stops are roles rather than sizes, and the names came out of what they were
already used for: `control` for a control or a resting card, `raised` for something
picked up, `popover` for what floats over content, `modal` for what has taken the
page. They match the layer family deliberately — a menu is `layer-popover` and
`shadow-popover`. Tailwind's own `shadow-xs` through `shadow-xl` are closed, so a
size name emits nothing rather than a plausible wrong shadow.

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

Easing is the one bridged family with no unit under it. Its stops are named after
the job — `linear` for anything that loops, `standard` to arrive, `exit` to leave
— because a curve has no multiple to be the third of, and naming it by shape
would leave two people picking differently for the same transition. Tailwind's own
curves are closed here for the reason radius closes its named steps: left open they
keep compiling, and a transition eased on a curve nobody chose is indistinguishable
from one eased on ours until the two are put side by side.

Duration is the asymmetry, and it is Tailwind's rather than ours. `--duration-*` is
not a namespace, so a named duration cannot be minted as a class at all — the call
sites that want one read `var(--db-duration-*)` directly. A key added there would
declare a variable and mint nothing.

An explicit key beats Tailwind's multiplier for the same step, which is what makes
the bridge load-bearing rather than decorative. Tailwind's multiplier is still
declared, so a step DBUI has not defined keeps rendering off it. Removing the
multiplier is what makes the scale finite, and it is a separate change that has to
wait until the off-scale call sites are snapped to a legal step.

See `TRACKER.md` for status. Nothing in this file describes progress.

## Also

`token-rules.md` — the color contract and the machine-enforceable rules.
`scripts/design-lint/README.md` — the linters.
