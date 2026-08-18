# Multi-theme architecture

Four themes: **Core** (what we are building), **Omni** (Omniagent), **One** (warm tone), and
**DuBois** (the legacy product aesthetic, present only so people can migrate off it).

> **Status, August 2026.** Steps 1 and 3 are built and shipped together, out of the order below.
> The axis exists, Core and DuBois are both emitted, and the portal footer switches between them.
> Step 1's success criterion held exactly as written: `:root`, `.dark` and the type-context blocks
> came out byte-identical, and the theme section is purely appended.
>
> The open question that mattered — *does DuBois need names Core lacks?* — **is answered: no.**
> It is 8 tokens, all of them names Core already declares: `action-primary-{base,hover,press}`,
> `focus-ring`, the `control` and `control-lg` shape roles, and the two type faces. So the model
> holds, DuBois is a theme rather than a compatibility layer, and Omni should be routine.
>
> Two answers fell out of building it. **The `data-type-scale` collision was a non-issue** —
> different attributes, and they compose. What did collide was the portal's `?theme=` query
> param, which already meant the color mode and is load-bearing in `scripts/shot.mjs`; it is now
> read as the theme when the value is a theme and as the mode when it is `light` or `dark`, with
> `?mode=` as the unambiguous spelling going forward. **The font payload question answered itself
> for this theme**: DuBois's faces are San Francisco, reached through `-apple-system` and
> `ui-monospace` rather than served, so it costs zero bytes. A theme wanting a face we would have
> to host still has that question open.
>
> Steps 0, 4 and 6 are untouched.
>
> **Step 2 (One) followed, and it paid for the ramp lever.** Ramp binding was deliberately not
> built for DuBois — a value-override diff was enough, and building the cheaper lever before a
> theme needed it would have been speculative. One needed it: rebinding `interface.neutral` and
> `interface.cool` onto `interface.warm` re-skins about forty semantics from two lines, and the
> same written as overrides would have been forty values and unreadable as an intent. The
> prediction in "What a theme is" held exactly — One is one ramp binding plus three accent
> corrections plus a face.
>
> Two things the lever turned out to buy that were not predicted. It **carries reasoning across,
> not just values**: Core's focus ring is two stops off the end of the ramp specifically so it can
> never match the primary fill, and One inherits that property for free where DuBois had to
> restate it by hand. And it **reaches tokens outside the family you were thinking about** —
> `viz-sequential-1` and `-10` borrowed the chrome ramp for the pale end of their scale, so they
> followed the rebinding.
>
> _Superseded Aug 15 2026._ Those two stops now resolve to `viz.cyan.050`, so the sequential scale
> is all cyan and no longer varies by theme. The `ramp` mechanism is unchanged; it simply has two
> fewer references to catch.
>
> One also forced the first **new primitive family**: `brand.orange`, for the accent. Its 500 is
> `#FF5F46`, which is the hex this note already flagged as living in `globals.css` with no token
> behind it — so the theme closed that gap rather than opening one. It is not in Figma, and
> `verify-token-sync` correctly reports ten primitives missing until it is. Note this is a name
> added to the PALETTE, not to the semantic layer: the invariant is intact, since primitives are
> generator input and every theme still declares the identical set of semantic names.
>
> One correction to the model as written. "A theme states only what it changes" is true of the
> AUTHORING and false of the EMISSION: every theme emits the union of what any theme moves, so a
> nested block can reset the one around it. The generator computes that union from a difference in
> resolved value rather than from declared keys, which the ramp lever makes essential — One
> declares three semantics and moves twenty-nine.

## The invariant

**A theme varies values. It never varies names.**

If Omni carries a token Core does not, they are not themes — they are two systems sharing a word,
and no component can render in both. This is the rule that makes everything else possible: one
component set, one Figma construction, one linter allowlist, N aesthetics.

`verify-token-sync` already asserts name parity across `theme.config.mjs`, `tokens.css` and Figma.
Theming extends the same assertion sideways: every theme declares the identical set of semantic
names, in both modes.

## What a theme is

A diff against Core, in three parts, most themes needing only the first:

1. **Ramp bindings.** Each mode already names which primitive ramp drives chrome — `surface-base`
   is `interface.neutral.050` in light and `interface.cool.900` in dark. Parameterise that and a
   theme re-skins its chrome in one declaration.
2. **Value overrides.** The handful of semantics that do not follow from the ramp.
3. **Non-colour overrides.** Type face, shape roles, elevation. Rare, and DuBois is why they exist.

Core is the base. The other three are expressed as what they change, so "what does this theme
actually do?" is answerable by reading the theme, not by diffing 85 values.

`interface.warm` already exists in `theme.config.mjs` with all ten stops and no consumer. That is
One, waiting.

## What does not vary

| Layer | Varies | Why |
|---|---|---|
| Colour semantics | Yes | The main axis, already modal |
| Chrome ramp | Yes | The lever that makes a theme cheap |
| Type face | Yes | DuBois is SF Pro, Core is Figtree |
| Type ramp steps | No | Vary the face, keep the scale |
| Shape roles | Yes | `shape` was built for this — see its comment about DuBois |
| Elevation | Yes | Legacy shadows differ materially |
| Space and density | **No** | See below |
| Motion | No | One curve is a deliberate economy |
| Icons | No | A different icon set is a different system |
| Token names | **No** | The invariant |
| Component structure | **No** | The core construction is shared |

Density earns the hardest no. If spacing varies per theme, every layout, screenshot, spec and
measurement forks four ways and nothing learned in one transfers to another. Density stays what it
is today: an orthogonal dial any theme can turn, not a property of a theme.

> **This table has a proposed amendment**, and so does **Two audiences, two bindings** below.
> `2026-08-11-theme-override-generalization.md` argues that the forking cost this row protects
> against is downstream of assuming one system renders several themes. A theme belongs to a product
> team and a product renders one, so it proposes a file per theme and no restriction on what a theme
> may move. Nothing is built; these sections are what ships until that is accepted or rejected.

## Two audiences, two bindings

The build-time/runtime question has different answers depending on who is asking, and trying to
pick one answer for both is what makes these systems complicated.

- **The portal and Storybook need to switch at runtime.** That is the theme manager: view any
  component in any theme without a rebuild. It loads every theme.
- **A product picks one at build time.** Omniagent ships Omni. It should not pay for three
  aesthetics it will never render.

One generator serves both. Each theme is emitted scoped to `[data-theme="<name>"]`, with the
default theme additionally on `:root` so a product that imports one file needs no attribute. The
portal imports all four and sets the attribute; a product imports one and ignores it. Nothing about
the authoring changes between the two.

This also means Core and DuBois can sit side by side in one page, scoped to different subtrees,
which a migration surface will want.

## Figma

**`dbui` stays the hand-maintained master and is the Core theme. A themed file is a copy of it
with the token values changed — not a file built from scratch.**

Nothing about how the library is authored changes. Core is drawn by hand, as now. When a designer
needs One or Omni, they duplicate Core and an LLM rewrites the variable values in the copy. The
components, their structure, their variants and their Code Connect all come along unchanged,
because they were never the thing that varied.

This works precisely to the degree that the Core file is **bound to local variables**. A paint that
resolves to a variable re-themes for free when the copy's values change. A paint that holds a raw
colour, or resolves to a variable in a *different* library, does not — and it fails silently, with
the derived theme quietly showing Core's colour or a legacy one.

### What that means today, measured

Across 727 components on the Components page, 5,896 nodes, 3,516 visible solid fills and strokes:

| | Paints | Re-themes on copy? |
|---|---|---|
| Bound to the local `Colors` collection | 2,951 | Yes |
| Bound to a **remote** library's variables | 472 | **No** |
| Raw colour, no variable | 93 | **No** |

So about **84% of the file would re-theme on a copy today, and 16% would not.**

The 472 are the interesting number. They resolve to 32 distinct variables in libraries this file
subscribes to rather than owns — `Text/textSecondary`, `Text/textPrimary`,
`Background/backgroundPrimary`, `Action/Default/Border/actionDefaultBorderDefault`,
`Brand Palette/Orange`, `Primitives/Blue`. That naming is the legacy DuBois library. This is I1
stated as a count instead of a worry, and it reaches shipped chat components: the user turn's own
body text in `Message` is one of them.

Changing the copy's `Colors` values cannot touch those, because they do not resolve against
`Colors`. They would keep rendering DuBois inside One.

The 93 raw paints are smaller and mostly benign — 66 are `#000000` on text nodes that are recoloured
elsewhere — but nine are the AI gradient, which is authored as three hexes in `globals.css` and has
no token behind it either. That is the same gap on both surfaces.

### The prerequisite

**Rebinding those 565 paints onto the local `Colors` collection is not part of theming — it is the
thing that has to be true before theming can start.** It is worth doing on its own terms regardless,
since a Core file half-bound to the library it is meant to replace is I1 whether or not a second
theme ever exists.

It is also measurable, which makes it a good gate: the audit above is a script, and the number to
drive to is zero remote-bound paints. That check should run alongside `verify-token-sync`.

### What this model costs

The honest trade against generation: **derived files are snapshots, and they go stale.** When Core
gains a component or changes one, every derived theme is behind until it is re-derived. Patching a
derived file by hand is how four files become four sources, so the rule is to re-derive rather than
patch, and to keep derivation cheap enough that re-running it is not a project.

That is a real cost, and it is the right one to accept while the system is still moving. It trades
"generation is hard and the system is not mature enough for it" for "copies lag", and only the
second one gets cheaper on its own as the library settles.

## The order, and why

0. **Rebind the Figma file onto its own variables.** 565 paints, of which 472 point at the legacy
   library. Not theming work, and worth doing anyway — but nothing derived from Core is trustworthy
   until it is done, so it is step zero rather than a parallel track.
1. **Add the theme axis with Core as the only theme.** A refactor with no visual output. Success is
   `tokens.css` being **byte-identical** before and after — the strongest available proof that the
   axis costs nothing, and the same technique used when `cn()` learned to merge.
2. **One.** A ramp swap onto `interface.warm`. It proves the cheap path and should need almost no
   overrides.
3. **DuBois.** The stress test, deliberately second rather than last. It is the only theme that can
   invalidate the model, because it is a legacy aesthetic rather than a sibling of Core: different
   face, different radii, probably different elevation. The question it answers is precise — *can
   DuBois be expressed without adding a token name Core lacks?* If yes, the model holds and Omni is
   routine. If no, DuBois is a compatibility layer rather than a theme, which is a different and
   much cheaper thing to build. Learning that after building the machinery around it is the
   expensive order.
4. **Omni.** Routine by then, or the model was wrong.
5. **The theme manager**, once there is more than one theme worth viewing.
6. **Derive the first themed Figma file**, last — a copy of Core with One's values applied. The
   LLM's job there is narrow and checkable: read One from the config, set N variable values, change
   nothing else.

## Verification

- The Core-only pass emits a byte-identical `tokens.css`.
- Every theme declares every semantic name, in both modes. No theme adds or omits one.
- Every theme resolves to a real value — no theme inherits a hole.
- The React linter's allowlist covers every theme's resolved values, or hex from a non-Core theme
  reads as a violation.
- A screenshot pass per theme, light and dark, before any theme is called done.
- **Zero remote-bound paints in the Core Figma file**, run as a script the way the audit above was.
  A paint bound to another library is a paint that will not re-theme, and it fails silently.
- A derived file differs from Core in variable *values* only. Same component count, same names,
  same structure — anything else means it was patched by hand and has become a second source.

## Open questions

- **Does DuBois need names Core lacks?** Step 3 answers it. Everything downstream depends on it.
- **Does DuBois-the-theme just point at the legacy library?** 472 paints already resolve there. It
  is worth asking whether DuBois is authored like the others or is simply Core rebound to the old
  collections — the answer changes how much work it is, and possibly whether it is a theme at all.
- **How does a derived file catch up when Core moves?** Re-deriving is clean but throws away
  anything the copy legitimately holds. If the answer is "nothing legitimate ever lives only in a
  copy", that should be written down as a rule, because it is what keeps re-derivation safe.
- **Does the portal's `data-type-scale` attribute collide with `data-theme`?** Both are root
  attributes driving token blocks; they must compose rather than override each other.
- **Where does a theme's font face come from?** The face is a token, but loading it is the
  consumer's job, and four faces is a real payload question for the portal.
- **Does theming belong in `TRACKER.md` as a phase or an item?** It is a Phase 1-shaped decision —
  a call that scopes later work — and it currently has no home in the plan.
