# Structure

What the system is made of, and which word to use for each part. Read this before
adding anything, and before arguing about where something belongs.

Counts here are from `yarn dbui doctor` and the Figma dump, verified 2026-08-17.

## The ladder

Five tiers. Each one is a different kind of thing, not a different size of the same
thing.

| Tier | What it is | Where it lives | How many |
|---|---|---|---|
| **Token** | A named value. The smallest decision the system makes | `theme.config.mjs` → `tokens.css` | 103 semantic colours, 181 `--db-*` properties |
| **Icon** | A single glyph, 16px, no state | `packages/dbui/src/components/icons/` | 450 |
| **Component** | A thing you reach for and place. See the test below | `packages/dbui*/src/components/` | 90 |
| **Composition** | Chrome that wraps other things — a page's furniture, not its content | `packages/dbui/src/components/ui/`, `dbui-shells/src/compositions/` | 5 |
| **Shell** | A whole page skeleton. Every screen starts from one | `packages/dbui-shells/src/shells/` | 6 |

Two things are deliberately **not** tiers, and both are explained below: a **Part**,
which sits under Component and is never reached for, and a **Recipe**, which is
documentation rather than code.

## A Component is a thing you can reach for

This is the definition. Not "irreducible", not "small", not "generic".

> **A Component is reachable: you can import it, place it, and pass it props.**

The consequence people trip on: **being an assembly of other components does not stop
something being a Component.** `Task` is built from `Disclosure` and `Status`.
`SchemaBrowser` is built on `DataTree`. `Confirmation` is an icon, some text and two
`Button`s. All three are Components, because all three are things you reach for.

And the reverse: `BarChart` is not an assembly of anything — it is a Vega spec and a
renderer, as irreducible as `Input`. It is a Component for the same reason `Input` is,
not a different one.

So the ladder is not a composition-depth ladder. Depth is an implementation detail.
Reachability is the line.

### The test

Ask: **can a builder import this and place it?**

- Yes → **Component.** File it under a category, give it a row in
  `component-index.md`, a story, and a gallery tile.
- No, it only ever appears inside another component → **Part.** Name it with a
  leading dot in Figma (`.TreeNode`, `.DialogHeader`) or under `Viz/Inner/`, and keep
  it out of the index, the gallery and Code Connect.

62 of the 160 Figma components are Parts. That is not a mess — it is the reason the
word Component still means something. A Part is drawn so a designer can see the
pieces; the audits skip them on purpose, and `.Inner *` sections are how they are kept
out of the way.

`Viz/Inner/Header`, `Viz/Inner/Metric`, `Viz/Inner/Axis Label` and `Viz/Inner/Legend`
are Parts under a different naming convention: `MetricCard` renders them *for* you from
its props, so there is nothing to reach for. Their variant axes are documented in
`docs/figma-mapping.md`, which is the right home for a part's rules.

## Composition vs Component

A Composition is reachable too, so the reachability test does not separate them. The
question that does:

> **Does it hold your content, or is it your content?**

`PageHeader`, `ControlsBar`, `PlatformHeader` are furniture — they wrap, position and
frame whatever you put in them, and every page has roughly the same one. `Table`,
`BarChart` and `Message` are the content itself.

If you are unsure, you can ship it as a Component. The cost of the wrong call here is
a row in the wrong section, which is cheap. The cost of calling a Part a Component is
a public API you have to keep.

## Recipe is not a tier

A **Recipe** is a documented arrangement you assemble yourself. There is no single
thing to import, which is exactly what makes it a Recipe rather than a Composition —
`Recipe/Page header with breadcrumb and tabs` is one Figma component that stands for a
pattern, not a component you place.

**Never create a package or an export called `recipes`.** The word already means
"not shipped, assemble it yourself" here, and a `dbui-recipes` package would make it
mean the opposite at the same time.

## Three axes, and they do not have to agree

The confusion that makes people want to repackage things comes from using one
hierarchy to answer three questions. They are independent, and they compose — the same
way theme, mode and the two dials do.

| Axis | Answers | Decided by |
|---|---|---|
| **Package** | What do I pay for? | Dependency weight |
| **Category** | Where do I look? | What the thing is for |
| **Tier** | May I reach for it? | The reachability test above |

**Package follows dependency weight, not kind.** `dbui-viz` is separate because Vega
is roughly 12 MB on disk, and a builder shipping a governance table must not pay for
it. `dbui-chat` carries `clsx` and `tailwind-merge` — nothing — so its separation buys
no weight; it is a maturity and ownership boundary instead, and that is a weaker
reason. Worth knowing before adding the next one: `dbui-editor` would earn a package
(Monaco), `dbui-dag` would earn one (a layout engine), and a package that carries
nothing heavy is a naming decision dressed as an architecture decision.

**Category is not the package.** `component-index.md` spans every package and files
things by what they are for — `action`, `controls`, `content`, `overlays`, `feedback`,
`compositions`, `viz`, `chat`. The gallery renders the same eight groups. `yarn dbui
search` searches across all of them. **A builder never sees the package boundary
except in the import line**, which is why adding a package does not hurt discovery and
why a domain does not need its own package to be discoverable.

## Adding something — where does it go?

1. **Is it a value?** → Token. `theme.config.mjs`, then `yarn design:tokens`. Ask
   first; the token layer is curated and a migration is finished.
2. **Is it a single glyph?** → Icon. Ask first; the set is curated.
3. **Can a builder import and place it?** No → **Part.** Dot-prefix it, keep it out of
   the index and the gallery, and document its rules on the component that renders it.
4. **Does it frame content rather than being content?** → **Composition.**
5. **Is it a whole page skeleton?** → **Shell.**
6. **Otherwise** → **Component.** Follow `CONTRIBUTING.md`; every step there is
   verified by an audit, including the portal.
7. **Is there nothing single to import?** → **Recipe.** Document the arrangement.
   Do not add an export.

Which *package* it lands in is a separate question from which *tier* it is, and the
answer is usually "the one whose dependencies it already needs".

## What checks what

| Command | Asks |
|---|---|
| `yarn design:audit-tokens` | Do Figma and React paint the same colour? Values |
| `yarn design:verify-sync` | Do token names agree across config, CSS and Figma? |
| `yarn design:audit-variants` | Do Figma's variants and React's props agree, per family? |
| `yarn design:audit-figma` | Does every Component exist on both sides and point at the other? |
| `yarn design:audit-portal` | Is every Component visible on `/components`? |
| `yarn dbui doctor` | Is the discovery layer intact? |

Parts are excluded from all of them, by the dot prefix and the `Viz/Inner/` prefix.
That exclusion is the ladder being enforced rather than merely described.
