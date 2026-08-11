# Changelog

Every change to an exported name, prop, or import path lands here. `CONTRIBUTING.md`
makes the entry part of the change, not a follow-up.

This file records **public shape**: what a consumer imports and the props they pass.
It does not record values — those live in `theme.config.mjs` and ship in `tokens.css`,
and restating one here is how the two stop agreeing. A token change earns a line only
when it moves something a consumer reads by name.

Dates are when the change landed. There is no published package yet, so there are no
release numbers to hang these on; when there is one, the unreleased section becomes the
first release.

## Unreleased

### Added

- **`Details` — an asset summary the agent renders inline in a thread.** A card of
  labelled facts where one row opens at a time to show the evidence behind its value.
  Exported from `dbui-chat` as `Details`, `DetailsHeader`, `DetailsRows`, `DetailsRow` and
  `DetailsFooter`.
  → Built on the system `Accordion`, so keyboard behaviour, animation and single-open come
  from there rather than a second implementation — Base UI's accordion is already
  single-open by default, which is the behaviour this card wants. A `DetailsRow` with no
  children renders flat instead of as a disclosure, so no chevron ever opens an empty
  panel, and an open row hides its `summary` because the panel restates the value.

- **`AiGradientIcon` — paints a DBUI icon with the brand gradient.** Wrap any icon in it
  to mark something as Genie or AI. Exported from `dbui`, with the `ai-gradient-icon`
  utility behind it in `effects.css`.
  → An inline SVG cannot take a CSS gradient — `background-image` paints behind the glyph,
  not into it — so this renders a per-instance `<linearGradient>` and points `fill` at it.
  It repaints only the parts drawn with `currentColor`, so a `fill="none"` stays none and a
  stroked icon takes the gradient on its stroke. No icon had to change.
  The gradient identifies and never decorates: one per surface, never on chrome.

- **`ConversationEmpty` moved its starter prompts to the foot of the region** and its title
  to the display step, matching the Genie panel in Figma. The identity block holds the
  middle; the prompts sit next to the composer, where the pointer already is.
  → `children` now render in a wrapping row at the bottom rather than under the
  description, and the default `title` is "Genie". Pass `media` already wrapped in
  `AiGradientIcon` — the component does not decide the gradient on the caller's behalf.

- **`Card` gained `interactive`.** Marks a card that is itself a target: it rests at the
  `xs` elevation stop and takes the pointer cursor, so a pressable card is told apart from
  one that merely contains a control. A resting card without it is unchanged — a hairline
  ring and no elevation. This is also `Card` catching up with its own JSDoc, which claimed
  cards carry elevation while the component drew a ring and no shadow.

- **`Card` gained `spotlight`.** A pointer-tracking highlight on the card's edge: the
  border picks up a radial halo that follows the cursor, and the card lifts one stop to
  `sm` while the pointer is over it. Off by default and opt-in per card, because it is a
  per-card pointer handler and a per-card repaint — right for a grid of assets someone
  compares, wrong for a dense repeating list. Usually paired with `interactive`, which
  supplies the resting `xs` the lift departs from.
  → Two consequences if you set it. `Card` swaps its resting `ring-1` for a border of the
  same weight, since the halo needs a real border to paint into, so content shifts by 1px.
  And `card.tsx` is now `"use client"`, because the prop needs a pointer handler — a
  Server Component can no longer render `Card`.
  It degrades correctly on its own: touch and pen are ignored, and
  `prefers-reduced-motion` drops the tracking for a flat hover border.

- **`--db-border-emphasis`, the neutral border above `strong`.** `neutral.400` light,
  white at 30% dark. The weight ladder had nothing usable between `strong` (`neutral.300`)
  and `inverse` (`neutral.700`): `strong` measures ~7% against `base` and vanishes when it
  is the peak of a gradient rather than a flat edge, while `inverse` is the dark chrome
  value and reads as a selection. Too heavy for a resting edge. Not named `border-hover` —
  it is a weight, not a state, and a component chooses to reach it; see the placement note
  in `docs/token-rules.md`. Shipped in Figma as `border/emphasis`.

- **`packages/dbui/src/tokens/effects.css`**, imported by both the package's `globals.css`
  and the portal's. It holds hand-authored CSS that cannot be generated from a token
  value — currently the `spotlight-border` utility and its `@property` registration.
  → Consumers importing `dbui/tokens/globals.css` get it with no change. The portal needed
  its own import because it does not import that file; it imports `tokens.css` and
  `type.css` directly, so anything defined only in the package's `globals.css` compiles
  for consumers and silently does nothing in the portal.

- **`ChatWorkbench` — Shell F, an agent conversation beside the work it produced.**
  Four regions: conversation rail, thread, tabbed preview, 48px tool rail. Exported from
  `dbui-shells` along with `ChatWorkbenchProps`, `ChatConversationEntry`, `ChatPreviewTab`
  and `ChatWorkbenchTool`. It owns layout and the transcript's scroll container; turns are
  children composed from `dbui-chat` and the composer is a slot. Regions are sized in
  percent and do not persist across reloads. Documented in `composition.md`.

- **`dbui-shells` publishes a `./shells/*` subpath.** `./components/*` and
  `./compositions/*` already existed and shells were reachable only through two hand-named
  entries (`./shell`, `./catalog`) or the barrel. → `import { ChatWorkbench } from
  "dbui-shells/shells/ChatWorkbench"` now resolves the same way its Storybook alias
  already did. The two existing entries still work.

### Removed

- **`dbui-chat` dropped seven exports that were recipes, not components.** Each was a thin
  arrangement of primitives the system already ships, and none had a Figma counterpart, so
  they described a component contract that did not exist. What to do instead:
  - `Actions` / `Action` → a `flex` row of ghost icon `Button`s wrapped in `Tooltip`. The
    `Action` component's one real service was making `label` required for the accessible
    name; pass `aria-label` yourself. See the `AnswerActions` helper in the Chat stories.
  - `Suggestions` / `Suggestion` / `SuggestionIcon` → `Button variant="outline" size="sm"`
    with `ButtonIcon`. `SuggestionIcon` was an alias for `ButtonIcon`; import that.
  - `FollowUps` / `FollowUp` → a `flex flex-col` of `Button variant="ghost"` with an
    `ArrowRight` in `ButtonIcon`. This also closes the raw `<button>` these rendered.
  - `Loader` → `<Reasoning isStreaming />`. Reasoning with no children now renders the
    waiting row itself, so a turn no longer needs two components for one state.
  - `Queue` / `QueueItem` → compose `Sources`-style rows above the composer if you need
    them; the queue had no Figma contract and no call site outside its own demo.
  - `Checkpoint` → not replaced. It had no Figma contract and no consumer.
  - `MessageAvatar` → `Avatar` beside `MessageContent`. It was exported and never used, and
    Databricks assistant turns carry no avatar.

### Changed

- **`PromptInput`'s parts were renamed and reduced.** `PromptInputContextBar` is now
  `PromptInputContext`; `PromptInputFooter` and `PromptInputTools` collapse into one
  `PromptInputActions`; `PromptInputButton` and `PromptInputButtonIcon` are gone.
  → Rename the two, replace the `Footer`/`Tools` pair with a single `PromptInputActions`,
  and use `Button` and `ButtonIcon` directly for tool affordances. `PromptInputActions`
  right-aligns a lone child, so a composer with only a submit needs no wrapper.
  The submit icon is now `ArrowUp` rather than `Send`, matching Figma.

- **`Message` no longer right-aligns or width-caps the user turn.** Figma draws it as a
  full-width filled box and React drew a right-aligned 85%-wide pill. No signature changed,
  but any layout that depended on the old alignment will shift.

- **`Reasoning` renders a status row when it has no children.** Previously an empty
  Reasoning produced a chevron over an empty rail. Its trigger also moved to the Figma
  treatment: Genie glyph, emphasised label, trailing chevron.

- **`Sources` returns a fragment instead of a container.** Its trigger is a `Button` meant
  to sit inline at the end of an answer's action row, and its list takes the next full-width
  line via `basis-full`. → Place it as the last child of a `flex flex-wrap` row. Props now
  land on the trigger `Button`, so `className` styles the trigger, not a wrapper.

- **`SplitButton` no longer takes `orientation`.** The axis offered `horizontal` and
  `vertical`; `vertical` had no call site anywhere in the repo and no counterpart in the
  Figma component set, so the seam rules for a row are the base style now. The default
  render is unchanged — the same fourteen classes it produced before. `splitButtonVariants`
  is still exported and still callable, but it takes no arguments. `SplitButtonSeparator`'s
  own `orientation` is a `Separator` prop and is untouched.
  → Passing `orientation="horizontal"` is now a type error; delete the prop. There is no
  replacement for `vertical`.

- **`Tabs` maps to a different Figma node.** The Figma component was promoted to a
  component set carrying `Variant=Default | Pill`, so `@figma` and Code Connect point at
  `4825-3132` rather than `1048-1469`. No React signature changed.

### Added

- **`Badge` gained four status variants in Figma.** `positive`, `negative`, `warning` and
  `info` already existed in React; the Figma component published only `Fill` and `Outline`,
  so Code Connect and the portal's mapping table both described a two-variant component.
  All six now exist on both sides.

## 2026-08-08

### Changed

- **`VizPaletteName` replaced four hue names with ten numbered steps**, plus `positive`
  and `negative`.
  → A palette named by hue no longer resolves. Pick a numbered step, or the semantic
  `positive` / `negative` where the chart means one of those.

- **`cn()` resolves Tailwind conflicts.** It is `twMerge(clsx(...))` against a config that
  teaches tailwind-merge the `type-*` ramp, the numbered radius stops, `shadow-focus` and
  `max-h-none`. A `className` passed to a DBUI component now overrides the component's own
  utilities rather than racing them in source order.
  → A `!` marker added to win an override is no longer needed, and now blocks the consumer
  below you from overriding that property. See the JSDoc on `lib/utils.ts` for what it
  still does not resolve.

- **`TabsTrigger` went from `type-label-bold` to `type-label`.** Bold is now the selected
  pill's cue rather than every trigger's resting weight.

- **`action-selected-base` and `action-selected-hover` each moved one rung**, in both
  themes. They measured identical to `action-default-hover` and `action-default-press`, so
  pointing at an unselected control painted it the exact fill of a selected one. Named here
  rather than left to the token file because the two families are told apart by consumers.

### Added

- **`tabs.tsx` exports `tabsTriggerVariants`.** A tab strip is a look as well as a
  component, and one consumer needs the look without the semantics — the portal's docs
  section bar is a `nav` of links, and wrapping those in `role="tablist"` would announce
  panels that never change. The alternative was a copy of the class string in the portal.

- **`TabsList variant="pill"` is public.** It was `@internal` on the grounds that it
  duplicated `SegmentControl`'s slider. What it duplicated was a treatment; the two
  components do different jobs — `Tabs` is a tablist over panels, `SegmentControl` is a
  toggle group with no panel — so the two were made to look different instead.
