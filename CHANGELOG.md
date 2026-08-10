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

### Changed

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
