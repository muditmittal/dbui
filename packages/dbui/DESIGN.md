---
version: alpha
name: DBUI
description: >-
  A dense, light-first design system for data and AI workbench UIs. Neutral
  chrome so that data, status, and charts carry all the color. Built for
  catalogs, queries, runs, lineage, models, governance, and chat over data.
category: Enterprise B2B · Data & AI Platform · Light-first workbench UI
colors:
  surface-base: "#FFFFFF"
  surface-subtle: "#FAFAFA"
  surface-strong: "#F5F5F5"
  surface-inverse: "#171717"
  surface-accent: "#D7EDFE"
  text-base: "#262626"
  text-strong: "#171717"
  text-subtle: "#525252"
  text-inverse: "#FFFFFF"
  text-accent: "#0E538B"
  border-base: "#E5E5E5"
  border-strong: "#D4D4D4"
  border-accent: "#2272B4"
  action-primary-base: "#171717"
  action-default-base: "#FAFAFA"
  action-positive-base: "#277C43"
  action-negative-base: "#C82D4C"
  link-base: "#2272B4"
  focus-ring: "#171717"
  status-text-info: "#2272B4"
  status-text-positive: "#277C43"
  status-text-warning: "#BE501E"
  status-text-negative: "#C82D4C"
typography:
  body:
    fontFamily: DM Sans
    fontSize: 13px
    lineHeight: 20px
    fontWeight: 400
  label:
    fontFamily: DM Sans
    fontSize: 13px
    lineHeight: 20px
    fontWeight: 600
  caption:
    fontFamily: DM Sans
    fontSize: 12px
    lineHeight: 16px
    fontWeight: 400
  h3:
    fontFamily: DM Sans
    fontSize: 16px
    lineHeight: 24px
    fontWeight: 600
  h2:
    fontFamily: DM Sans
    fontSize: 22px
    lineHeight: 28px
    fontWeight: 600
  h1:
    fontFamily: DM Sans
    fontSize: 32px
    lineHeight: 40px
    fontWeight: 600
  code:
    fontFamily: Commit Mono
    fontSize: 13px
    lineHeight: 20px
    fontWeight: 400
spacing:
  unit: 4px
  2xs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 999px
---

# DBUI

## Overview

DBUI is for applications where the user is working, not browsing. The archetypal screen is a
catalog tree beside a table of 200 rows, or a SQL editor above a results pane. Density, scannability
and predictable structure matter more than personality.

Three ideas drive every decision:

**The chrome is neutral so the data can be loud.** Primary actions, borders and surfaces are
greyscale. Blue is reserved for links and selection. Saturated color means something: a status, a
chart series, an entity type. If the interface is colorful before any data loads, something is wrong.

**Density is a first-class requirement.** Body text is 13px, not 16px. Table rows are 32–40px.
A user comparing forty table schemas should not scroll four times as far as they need to.

**Structure is predictable enough to be predicted.** There are a finite number of page shapes. A user
who has learned the catalog explorer already knows how the model registry works.

**Migration note.** The values above are the generated `--db-*` layer in
`src/tokens/tokens.css`. Components still read the older `globals.css` layer, where the primary
action is DuBois blue rather than neutral. The values here are the target; see
`docs/token-migration-plan.md`.

## Colors

Every color is a semantic token. There are 84, each with a light and a dark value, generated from
182 primitives that never ship. Components never reference a primitive or a hex value.

**Surfaces** step from `surface-base` (`#FFFFFF`) through `surface-subtle` (`#FAFAFA`) to
`surface-strong` (`#F5F5F5`). Application chrome sits on `surface-strong`; the content panel is
`surface-base`. That inversion — chrome darker than content — is what makes the working area read
as the focus.

**Text** has four weights of emphasis: `text-strong` for headings, `text-base` for body,
`text-subtle` for metadata, `text-disabled` for unavailable. Never use opacity to create a fifth.

**Actions** are grouped by intent, each with base, hover and press:

| Intent | Token family | Use for |
|---|---|---|
| Primary | `action-primary-*` (`#171717`) | The one main action per surface |
| Default | `action-default-*` (`#FAFAFA`) | Everything else |
| Selected | `action-selected-*` | Current row, active tab, chosen filter |
| Positive | `action-positive-*` (`#277C43`) | Confirm, approve, succeed |
| Negative | `action-negative-*` (`#C82D4C`) | Delete, revoke, destroy |

**Status** is a strict four-way vocabulary — info, positive, warning, negative — each with a surface,
a border and a text token. Twelve tokens total. Do not invent a fifth status.

**Blue is not a brand color here, it is a link color.** `link-base` is `#2272B4`. It also appears as
`border-accent` and `surface-accent` for selection. It never fills a button.

**Charts get their own 20 tokens** — 10 categorical, 10 sequential — that are deliberately not
drawn from the interface palette, so a chart series can never be confused with a status.

Every token has a real dark value, not a computed inversion. Dark mode surfaces are cool
(`#11171C`), not neutral grey.

## Typography

One family, `DM Sans`, at four sizes. Code is `Commit Mono`.

| Role | Size / line | Weight | Use |
|---|---|---|---|
| Caption | 12 / 16 | 400 | Metadata, helper text, timestamps |
| Body | 13 / 20 | 400 | Everything by default |
| Label | 13 / 20 | 600 | Field labels, column headers, emphasis |
| Heading 3 | 16 / 24 | 600 | Section headings |
| Heading 2 | 22 / 28 | 600 | Page titles |
| Heading 1 | 32 / 40 | 600 | Rare — landing surfaces only |

**13px is the base and it is not negotiable.** It is the single most common thing a model gets
wrong, because 14px and 16px are the web defaults. Weight jumps 400 to 600; there is no 500.

All sizes multiply by `--db-type-scalar`, so the whole scale can be tuned without touching a
component.

## Layout

**Frame first.** Choose the shell before writing content. A page assembled by stacking sections and
wrapping each in a card reads as a prototype. `composition.md` defines the shells, their region
widths in pixels, and which compositions are forbidden.

Standing chrome: a 48px platform header and a 180px product nav that collapses to 48px at 1280px.
Content sits in a rounded panel on `surface-base`.

Region budgets: tree rail 260px (resizable 200–400), metadata sidebar 280px, editor tool rail 44px,
tool panel 260px.

**One vertical scroll container per page.** Rails and sidebars scroll internally. There is never a
page-level scroll outside the content panel.

**Spacing** is a 4px unit times a multiplier times two scalars. 16px between sections, 8px within a
component, 4px inside a control. Never an arbitrary pixel value.

**Dense data renders as rows, not cards.** Tables for columnar records, list items for single-line
records, edge to edge with dividers. Cards are for widgets, gallery entries and settings groups.

**The primary action is at the top right of the highest header on the surface.** Always. Destructive
actions are never primary — they live in overflow menus behind a confirmation.

## Elevation and depth

DBUI is nearly flat. Depth separates layers of interaction, never decorates.

| Level | Use |
|---|---|
| 0 | Page content. Almost everything. |
| 1 | Form controls — a 1px hairline only |
| 2 | Popovers, dropdowns, tooltips |
| 3 | Dialogs and drawers, over a 72% scrim |

Borders do the work shadows do in other systems. `border-base` divides, `border-strong` encloses,
`border-accent` selects. If a shadow and a border would both work, use the border.

## Shapes

| Radius | Value | Applied to |
|---|---|---|
| `sm` | 4px | Buttons, inputs, selects, menu items |
| `md` | 8px | Dialogs, popovers, dropdowns, content panel |
| `lg` | 12px | Cards |
| `full` | 999px | Badges, tags, avatars, pills |

Radii are fixed pixel values and do not scale with density — a 4px button corner at high density
still reads as 4px. Icons are 16px on a 16px grid, stroke-based, and inherit `currentColor`.

## Components

61 components. The set is deliberately finite: if something is missing, that is a gap to report, not
a component to invent.

Composition follows one pattern — a root plus named subcomponents that carry their own styling.
`<Button>` with `<ButtonIcon>` and `<ButtonChevron>`, not a `Button` with twelve props.

Rules for a specific component live in its JSDoc as `@standard`, `@guideline` and `@constraint`.
That is the authoritative source; `docs/component-index.md` is only for discovery.

Interactive states are mandatory and uniform: default, hover, press, focus, disabled, and loading
where relevant. Focus is a visible ring on `focus-ring` with a `focus-ring-offset` gap; it is never
removed.

Icons carry a semantic category — object, action, indicator, or component — and crossing categories
is an error. A chevron is chrome and never represents a concept. All 456 are indexed in
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
- Install an icon library. All 456 icons ship with the system.
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
