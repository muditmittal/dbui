---
version: alpha
name: DBUI
description: >-
  A dense, light-first design system for data and AI workbench UIs. Neutral
  chrome so that data, status, and charts carry all the color. Built for
  catalogs, queries, runs, lineage, models, governance, and chat over data.
category: Enterprise B2B · Data & AI Platform · Light-first workbench UI
---

# DBUI

This file is the design language — the reasoning behind the system. It contains
no values. Values live in `src/tokens/theme.config.mjs`, ship in `tokens.css`,
render on the portal's Tokens page, and print from `dbui token`.

## Colors

Every color is a semantic token, generated from primitives that never ship.
Components never reference a primitive or a hex value.

**Color is organized into four families** — structure, interaction, status and
viz. Each says what it colors rather than what it is not, which is the whole
reason there are four rather than three: the group that would have held status
alongside everything non-interactive could only be described by exclusion. The
family is a grouping and never appears in a token name. `docs/token-rules.md`
holds the mapping.

**Chrome is darker than content.** Application chrome sits on the stronger
surface, the content panel on the lightest. That inversion is what makes the
working area read as the focus.

**Text has four weights of emphasis** — strong for headings, base for body,
subtle for metadata, disabled for unavailable. Never use opacity to create a
fifth.

**Status is a strict four-way vocabulary** — info, positive, warning, negative —
each with a surface, a border and a text token. Do not invent a fifth.

**Blue is not a brand color here, it is a link color.** It also marks selection
as border-accent and surface-accent. It never fills a button.

**Charts get their own palette**, deliberately not drawn from the interface
colors, so a chart series can never be confused with a status.

Every token has a real dark value, not a computed inversion.

## Typography

**The base is smaller than the web default and it is not negotiable.** It is the
single most common thing a model gets wrong, because 14px and 16px are what the
web assumes and a data workbench packs more into a row than a web page does.
Weight jumps 400 to 600; there is no 500.

**The label/body split is the one to understand.** They are the same size. A label
is single-line, so its line box matches the icon box and they align in a row
without adjustment. Body wraps, so it takes more leading.

**A style is a name, not a measurement.** The 14 style names hold still; what they
measure comes from shared stops that carry one value per context, so the same
`type-label` is one size on a workbench and another on a phone. That is why a call
site must never write the number — it would be right in one context and wrong in
the other. `docs/tokens.md` owns the rules; the values print on the Tokens page.

Each `type-*` class is the whole style. Never pair one with `leading-`, `font-`
or `uppercase`. Numbers in a table use `<TableCell numeric>`.

## Layout

**Frame first.** Choose the shell before writing content. A page assembled by
stacking sections and wrapping each in a card reads as a prototype.
`composition.md` defines the shells, their region widths, and which compositions
are forbidden.

**One vertical scroll container per page.** Rails and sidebars scroll internally.
There is never a page-level scroll outside the content panel.

**Spacing is a unit times a multiplier times two scalars.** Never an arbitrary
pixel value.

**Dense data renders as rows, not cards.** Tables for columnar records, list
items for single-line records, edge to edge with dividers. Cards are for widgets,
gallery entries and settings groups.

**The primary action is at the top right of the highest header on the surface.**
Always. Destructive actions are never primary — they live in overflow menus
behind a confirmation.

## Elevation and depth

DBUI is nearly flat. Depth separates layers of interaction, never decorates.

The scale counts **up**, and it is DuBois's: `xs` is an edge on a control that
still belongs to the page, and `xl` is a dialog that has taken the page over.
Read the step as "how far off the page". If two surfaces overlap, the one on top
takes the larger step — a dialog outranks a menu, and a menu outranks the
tooltip it opened.

This direction is the reverse of the numbered scale DBUI used before, where `1`
was the highest surface. Anything still reasoning in those numbers is reading a
scale that no longer exists.

Depth is also mode-dependent, which is the one place elevation stops behaving
like the other dimensional families. A shadow is black against the surface
behind it, so the alpha that reads as a lift on white disappears on a dark page.
Each step therefore carries two values, and the step name is what you write —
never a mode-specific one.

Borders do the work shadows do in other systems. If a shadow and a border would
both work, use the border.

## Shapes

Radii are fixed and do not scale with density — a button corner at high density
still reads the same. Form controls take the smallest step, containers and
popovers the next, cards larger, and pills full.

Icons are stroke-based, sit on a 16px grid, and inherit `currentColor`.

## Components

The set is deliberately finite: if something is missing, that is a gap to report, not a component to
invent.

Composition follows one pattern — a root plus named subcomponents that carry their own styling.
`<Button>` with `<ButtonIcon>` and `<ButtonChevron>`, not a `Button` with twelve props.

Rules for a specific component live in its JSDoc as `@standard`, `@guideline` and `@constraint`.
That is the authoritative source; `docs/component-index.md` is only for discovery.

Interactive states are mandatory and uniform: default, hover, press, focus, disabled, and loading
where relevant. Focus is a visible ring on `focus-ring` with a `focus-ring-offset` gap; it is never
removed.

The washes those states paint form **one ladder, not two**. Hovering something unselected must never
reach the value a selected thing rests at — `unselected hover < selected rest < selected hover <
selected press` — because a control that changes under the pointer and a control that is chosen are
different facts and the eye reads them off the same axis. The ladder is ordered by composited
lightness rather than authored alpha, since two families of wash over two different surfaces do not
compare as the numbers they were written as.

Icons carry a semantic category — object, action, indicator, or component — and crossing categories
is an error. A chevron is chrome and never represents a concept. They are indexed in
`docs/icon-index.md`. Never guess an icon name.

## Do's and don'ts

**Do**

- Start from a shell in `composition.md`, then fill regions.
- Read a component's JSDoc before using it.
- Use `docs/icon-index.md` to find icons by concept or synonym.
- Render dense records as table rows or list items.
- Put the primary action at the top right of the surface header.
- Write in sentence case, active voice, present tense.
- Give every icon-only control an accessible label.
- Check both light and dark before calling a screen finished.

**Don't**

- Use a raw HTML control when a component exists.
- Install an icon library. The icon set ships with the system.
- Write a hex value, an rgb value, or an arbitrary pixel value in a component.
- Use `text-sm` or `font-medium`. The base is 13px and the emphasis weight is 600.
- Wrap every record in a card. Card soup is the most common failure mode.
- Use a badge as decoration. Badges carry counts and enumerated states; use a status indicator for
  status.
- Make a destructive action primary.
- Nest tabs inside tabs, or put two metadata sidebars on one surface.
- Create a second vertical scroll container on a page.
- Write "Are you sure?" or "Something went wrong". Name the action and its consequence; name the
  cause and the next step.
- Use `utilize`, `leverage`, `seamless`, `robust`, `simply`, `just`, `please`, or `kindly`. Full
  vocabulary in `docs/brandvoice.md`.
