# Theme override generalization — design note

**Status:** proposed, nothing built. Amends the **What does not vary** table and the
**Two audiences, two bindings** section in `2026-08-11-multi-theme-architecture.md`. Until accepted,
the sibling note is what ships.

**Rev 2.** The first draft kept one `tokens.css` carrying every theme scoped by `[data-theme]`, and
proposed guarding geometry overrides behind a declared `forks` list. Both were wrong, and for the
same reason: they assumed a system that renders many themes at once. A theme belongs to a product
team, a product renders one, and a team's choices outrank cross-theme consistency. Correcting that
assumption makes the design smaller rather than larger.

---

## Two problems

**The bug.** `/docs/tokens` documents Core's values under every theme. Switching to One repaints the
page, but the printed hex, the swatch and the contrast verdict stay on Core.

**The limit.** A theme can override five groups. Space, size, border width, the type ramp steps,
motion, layer and the scalars cannot be reached at all.

---

## What is already right, and should not be rebuilt

- **A theme is a sparse diff in one place.** `theme.config.mjs` holds it.
- **A theme varies values, never names.** `assertKnown` throws otherwise, and this becomes the
  load-bearing invariant under the design below.
- **The ramp lever works and carries reasoning, not just values.** Rebinding one prefix re-skins
  forty semantics, and One inherits Core's focus-ring-off-the-ramp-end property free.
- **The verifier re-implements resolution on purpose,** so two implementations disagreeing is the
  signal. That duplication stays.

The model is right. It has an allowlist bolted to the front:

```js
const overridesOf = (t) => ({
  ramp: t.ramp ?? {}, semantics: t.semantics ?? {}, shape: t.shape ?? {},
  family: t.type?.family ?? {}, elevation: t.elevation ?? {},
})
```

---

## The design

### 1 · In a product, one generated file is the styling source

Today one `tokens.css` carries every theme, scoped by `[data-theme]`, and each block must emit the
union of what *any* theme moves so a block can reset a sibling's override. That machinery exists to
let one document hold several themes at once — which is this docs site's problem, and nobody else's.

So the primary artifact is **one complete, self-contained file per theme**, and a product imports it
and nothing else:

```css
@import "tailwindcss";
@import "./dbui/src/tokens/globals-one.css";
```

Complete means complete: the Tailwind utility layer, the custom variants, the role utilities, and
that theme's values. Not a patch over a base. A product that imports it has the whole styling source
for its aesthetic in one generated file, and no bytes belonging to an aesthetic it will never render.

Four things fall out, and together they are most of the argument:

- **Union emission is deleted.** A standalone file declares every token, so there is nothing to reset.
- **Cascade and specificity stop being a concern.** No theme sits above another.
- **A product pays only for what it renders.**
- **Any token can differ, by construction.** There is no shared block for a value to be consistent
  with, so the capability arrives as a consequence rather than as a feature.

### 2 · This docs site is the exception, and gets its own artifact

Three complete files cannot be imported together — each declares `@theme`, so Tailwind would
generate every utility three times.

So the one surface that renders every theme gets a different shape: the utility layer once, plus all
theme values scoped by `[data-theme]`. Same resolution, different selector, one extra emit pass
rather than a second code path. The portal and Storybook import it; nothing else does.

That is the whole of the runtime-switching requirement, and it now lives in an artifact built for it
instead of dictating the shape of the one products use.

### 3 · Selection is the import line, because it has to be

Install is clone-and-copy, and updating re-runs `install.md`. A product **cannot** select its theme
by editing a vendored file — the next update overwrites it. Naming the theme in the import is the
only choice that survives an update, which is convenient rather than coincidental: it is also the
simplest thing to document.

### 4 · `globals.css` has to become generated first

This is the real work, and it is not in the token layer.

`globals.css` is what `install.md` tells products to import, and it is **hand-maintained**. Three
things in it block a generated file from being the styling source:

- **It holds untokenized values.** `--icon-folder: #8ACAFF` and three `--ai-gradient-*` hexes are
  literals declared outside the token system, duplicated across `:root` and `.dark`. A theme cannot
  reach them, and the folder accent and the AI gradient are exactly the kind of thing a product
  aesthetic would move.
- **It hardcodes base type.** `body { font-size: 13px; line-height: 20px }` sets the base register in
  px, outside the ramp, which is the literal the ramp exists to remove.
- **Its `:root` and `.dark` blocks are dead scaffolding.** Both are comment headers — Surface,
  Action, Border, Status — with nothing under them, left from the legacy layer that was pruned.

The rest of it is theme-independent and belongs in every theme file unchanged: the `@custom-variant`
declarations, `@utility no-scrollbar`, the accordion keyframes, and the `@theme inline` bridges for
`--shadow-focus` and the font families.

`type.css` and `effects.css` are already clean — 59 and 12 `var(--db-*)` references between them and
no values worth speaking of — so they inline into a theme file without changing meaning.

So the sequence is: tokenize the three literal sets, delete the dead blocks, move the base register
onto the ramp, then have the generator emit `globals-<theme>.css` from a template holding the rest.
Only then is the claim true that the generated file is the styling source.

### 4 · The override becomes a deep partial

Replace the five fixed keys with a deep merge of the theme's diff over the base, applied after ramp
rebinding, with `assertKnown` walking every leaf path.

```js
themes: {
  one: {
    label: "One",
    ramp: { "interface.neutral": "interface.warm" },
    overrides: {
      semantics: { "text-accent": { light: "brand.orange.700" } },
      type: { family: { text: "DM Sans" }, steps: { "body": { size: "0.9375rem" } } },
      space: { 4: "1.125rem" },
    },
  },
}
```

The property worth having is not that space becomes reachable. It is that **adding a new family to
the config makes it themeable with no generator change.** An allowlist goes stale; a walk does not.

### 5 · The invariant does more work now, not less

When every theme lived in one file, a missing token fell back to the block above it. In separate
files there is nothing to fall back to — a name a theme forgets is a property that resolves to
nothing at a call site.

So `assertKnown` stops being a tidiness check and becomes the only thing making the files
interchangeable. Walking leaf paths makes it stricter, which is the right direction: a typo three
levels deep throws where today it is silently ignored.

---

## Geometry

The sibling note gives space and density the hardest no, on the grounds that varying them forks
every layout, screenshot, spec and measurement.

**That concern was downstream of the runtime-switching assumption.** It is a real cost only where one
system renders several themes and results are compared across them. A product team renders one
theme; screenshots taken in it are the only ones that describe their product, and there is no second
theme for them to transfer to. Nothing forks.

Where the cost survives is DBUI's own surfaces — the portal gallery, Storybook, the Figma library,
and any spec written once and meant to hold everywhere. That is the design system team's bill, and it
is the right party to pay it, because it is the only party that renders every theme.

So no guard, no `forks` list, no acknowledgement ceremony. The first draft proposed one and it was
solving a problem the file split removes. What stays is reporting rather than gating:
`design:verify-sync` already prints the themed-token count, and it should print it **per family**, so
a theme moving space is visible in the audit without being blocked by it.

The evidence that this line was always a judgment rather than a law: `shape` is geometry and was
always allowed, correctly, since a 4px and a pill button occupy the same box. `type.family` forks
layout and was always allowed, because DuBois needed it. One family had already crossed.

---

## What changes

In order. The first three are prerequisites and none of them is in the token layer.

| File | Change |
|---|---|
| `globals.css` | Tokenize `--icon-folder` and the three `--ai-gradient-*` literals; delete the dead `:root` and `.dark` scaffolding; move `body`'s 13px/20px onto the ramp |
| `theme.config.mjs` | Absorb those values as tokens. Themes gain `overrides`, a deep partial; the five existing keys migrate in one pass |
| `generate-tokens.mjs` | `overridesOf` becomes a deep walk; `assertKnown` walks leaf paths. Emit a complete `globals-<theme>.css` per theme from a template, plus the scoped docs-site artifact. **Union emission is deleted** |
| `verify-token-sync.mjs` | Same generalization, independently implemented. Assert every theme file declares the identical name set — the new load-bearing check |
| `generate-token-data.mjs` | Emit per-theme values, not just the roster. This is what fixes the documentation bug |
| `TokenKit.tsx` | `Swatch` takes `var(--db-<name>)`. Value text and contrast verdict read the active theme |
| `install.md` | The import line names a theme. One step gains a choice |
| `shot.mjs` | Theme axis for the portal's own gallery, now the only surface rendering all of them |

The documentation bug is a consequence rather than separate work: once resolution is general, the
data file gets a theme axis and the page has something correct to read.

---

## What it costs

**Scalars need a defined precedence.** Density and type-scale dials are inline styles on a subtree.
A theme overriding a scalar has to lose to a dial set below it, or the dial stops working inside
that theme. Untested today because no theme can reach a scalar.

**Two implementations to generalize.** The verifier duplicates resolution deliberately. Sharing the
code would delete the check, so both get the walk, written separately.

**`token-data.ts` grows.** Sparse overrides keep it small now; a theme that moves space would add a
map per family. Worth watching rather than pre-solving.

**`globals.css` stops being hand-editable.** It is hand-maintained today and carries real content —
the custom variants, the utility, the keyframes. Those move into a generator template, so the next
person who wants a new `@custom-variant` edits the template rather than the CSS.
`CONTRIBUTING.md`'s "never edit a generated file" list grows to include it, and that is a change in
where a common edit happens rather than a change in how often it happens.

**One file per theme, each carrying the full utility layer.** A product downloads one and pays
nothing for the rest, so the duplication costs repo bytes rather than shipped bytes. Worth stating
because it will look wasteful in a directory listing.

---

## Verification

- A fixture theme overriding one token in every family, asserting each reaches its file
- **Name parity across every emitted theme file** — the invariant, and the one that replaces the
  cascade as the safety net
- **Every theme file is importable alone**, asserted by building each one against a bare Tailwind
  entry. A file that only works when a sibling is also imported is not a styling source
- `design:verify-sync` reports themed tokens per family, not just a total
- A Core-only pass emits a `globals-core.css` that renders byte-identical to today's `globals.css`
  output, which is the sibling note's own proof that the axis is purely additive — and the check
  that the `globals.css` cleanup changed nothing on the way through

---

## What this amends

**What does not vary.** Type ramp steps, space and density, motion, size and border width move from
a structural no to a yes. Three rows do not change and should not: **token names** stay the
invariant, **component structure** stays shared, and **icons** stay out — a different icon set is a
different system rather than a different aesthetic.

**Two audiences, two bindings.** The note already had the distinction right and the implementation
optimized for the wrong half. Runtime switching is the portal's requirement, not a product's, and it
should be served by an extra artifact rather than by the shape of the primary one.

---

## Open questions

- **Do primitives become overridable?** Rebinding a ramp is the cheap path and covers most cases.
  Letting a theme redefine `interface.warm.500` itself would let two themes disagree about what a
  primitive means — likely the wrong capability, but per-theme files make it harmless in a way it
  was not before.
- **Does a theme get to add a token nobody else has?** The answer today is no, and under separate
  files the question gets sharper: a product-owned theme wanting one product-only token is a
  reasonable ask, and granting it ends the interchangeability the invariant buys.
- **Does Figma follow?** Figma variables have modes and theme is a natural mode axis, but the dump
  carries names only. Out of scope, should not be forgotten.
