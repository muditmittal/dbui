# NavbarNewButton — findings behind an open accent decision

**Status: findings only. No treatment has been chosen, and nothing here recommends one.**

Recorded 2026-08-07, while fixing an unrelated dark-mode elevation defect on the same
component. The accent question was raised, deliberately left open, and these are the facts it
would rest on. Read this as evidence, not as a proposal.

Verified against Figma file `OftbSQf85jOPln9RhSEhVv` (read-only) and the repo at `4730096`.

## The question that was asked

`NavbarNewButton` renders neutral. A story-support file deleted from the working tree
(`apps/portal/src/stories/components/PlatformNav.tsx`) had hand-rolled its own copy in
hardcoded hex, citing a Figma spec of `#FFF5F7` with an `#E65B77` plus — a pink that read
unmistakably as the creation affordance. The question was whether the component had drifted
from Figma or Figma had moved on.

Neither. They were never reconciled.

## Finding 1 — Figma's pink is an unmigrated leftover, not a live spec

The pink exists in Figma, and the deleted comment transcribed it accurately, including the 4%
black overlay and the pre-composited `#F5ECEE`. But four things disqualify it as a current
specification.

**It is an instance override, not a component.** The node (`3179:14153`, inside `Platform Nav`
`3179:14163` on the `Shells` page) is an instance of `Button / Variant=Secondary, Size=Default,
State=Default`. Figma's own override record on it lists `fills`, `strokes`, `effects`,
`effectStyleId`, `boundVariables`, `height`, `width`, `name` and two alignment fields. The base
component specifies `surface/subtle` with a drop shadow; the override replaced the fill,
added a stroke, and **deleted the shadow**. The `Button` set carries Primary, Outline,
Secondary, Ghost, Link, Destructive and Danger. There is no accent or creation variant. The
pink was never systematised in Figma either.

**Figma's own token migration skipped it.** Walking every descendant of `Platform Nav` there
are exactly three color bindings: the New button's fill and stroke on **`Primitives (old)`**,
and one `.NavbarItem` on `action/default/press` in the current **`Colors`** collection. The New
button's own label is on `text/base` in `Colors`. The migration reached inside this node, moved
the label, and left the fill, stroke and icon behind. That is the signature of a leftover.

**It cannot theme.** `Primitives (old)` has a single mode named `Value`. The instance pins no
explicit mode. There is no dark value and never was — which is why the hardcoded copy had
none. That was faithful transcription, not an oversight in the copy.

**It is built from the destructive ramp.** Both hexes are `status.red` primitives:

| Hex | Primitive | Semantic that resolves to it |
|---|---|---|
| `#FFF5F7` | `status.red.100` | `--db-status-surface-negative`, light only |
| `#FDE2E8` | `status.red.200` | none, in either theme |
| `#E65B77` | `status.red.500` | `--db-action-negative-base`, `--db-status-border-negative`, dark only |

The pair is not coherent: a light-mode negative surface stacked with a dark-mode negative
action color. They never co-occur in one theme. `react-lint.js` already refuses
`text-[#E65B77]` under `no-primitive-token`.

## Finding 2 — the blue plus is a code-only choice

`PlatformNav.tsx` in `dbui-shells` renders `<Plus className="text-link-base" />`. Figma's `Plus`
component is `text/subtle`; the New button overrides it to pink. Blue is a third value that
neither Figma nor the design system specifies anywhere. If an accent is chosen, the icon
color is part of that decision and has no incumbent worth preserving.

## What was changed, and what was not

Changed: `NavbarNewButton` gained `dark:bg-surface-strong`, correcting an elevation inversion.
That is neutral and carries no emphasis. See the component's JSDoc and the register entry.

Not changed: nothing about the accent. The component is still neutral. Nothing was restored
from the Figma override, and no color semantics were added.

## Re-verifying

The Figma reads above are reproducible with read-only `use_figma` scripts against
`OftbSQf85jOPln9RhSEhVv`; the decisive one walks `3179:14163` and tallies each color binding's
variable collection. `git log -L '/^function NavbarNewButton/,/^}/:packages/dbui/src/components/ui/navbar.tsx'`
shows the component has never carried an accent — three edits since creation, all mechanical
token, ramp and radius renames.
