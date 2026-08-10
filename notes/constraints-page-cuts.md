# Cut from /docs/constraints

Removed 2026-08-07. Not documentation — see `README.md` in this directory.

The constraint set itself did not change. `constraints-data.ts` is untouched apart from one
correction noted at the bottom, because that array is the record and is designed to be lifted
into the CLI unchanged. What was cut is the essay the page wrapped around it.

---

## False — the page said it, the code does not do it

### "Four components' constraints reach no agent"

Verbatim, from the gaps section:

> **Four components' constraints reach no agent**
> The CLI parses `@constraint` and drops the block form `@constraints`. `button`, `dialog`,
> `alert` and `dropdown-menu` write the block form, so the two most-used components in the system
> have constraints that no agent surface has ever printed.

And the roadmap item built on it:

> **Fix the parser before anything else**
> One line in the CLI's JSDoc reader. It matches `@constraint` and never the plural, so four
> components hold constraints that are invisible everywhere. Pair it with an assertion, in the
> shape of the rule verifier, that no unparsed `@constraints` block survives anywhere in the
> packages — otherwise the same tag returns the next time someone writes a list.

This was fixed before the page was read. `packages/dbui-cli/src/api.mjs` handles the block form:

```js
else if (t === "@constraints") open = out.constraints;
```

`yarn dbui component button --json` prints all eight of Button's constraints, including the
`aria-label` requirement the page said no agent surface had ever seen. `TRACKER.md` records the
fix under *Done since the last entry*. The page kept describing the pre-fix state and put the
repair first in its roadmap.

The second half of the suggestion is still worth having and was never built: an assertion that no
unparsed `@constraints` block survives, in the shape of `verify-rules.mjs`. It belongs in
`TRACKER.md` as a proposal rather than on a page as a gap.

---

## General education — true of design systems everywhere

The page opened with two paragraphs that say nothing about DBUI:

> A design system is consistent because it repeats itself. It is good because it refuses things.
> A refusal is worth more than a convention, because a convention has to be checked every time and
> a refusal only has to be read once.
>
> That matters most for an agent. Given a component and no constraint, a model invents a
> reasonable answer, and the next model invents a different reasonable answer. Given a closure it
> stops inventing. Every entry below exists to remove a decision rather than to inform one.

And the section defining the genre:

> **What counts as a constraint here**
> A rule says what to type. Use a semantic token, never a hex. A constraint says what the system
> will not do, and therefore what you can rely on without looking. Both are useful and only one of
> them belongs on a page — the linter already refuses the first kind, and a machine-settled
> question does not need prose.

with its authoring checklist:

*Do:* State it as a closure. Something that was possible stops being possible · Name what it buys.
A constraint with no payoff is a preference with better grammar · Name the observation that proves
it was broken, so two reviewers reach the same verdict · Say where the system contradicts it. A
constraint the components break is still worth writing down, once it says so.

*Don't:* Write one that cannot be violated. If nothing can break it, it is a fact about how the
system is built · Write one about syntax. That belongs in the linter, where it costs nobody a
decision · Write one that only picks between two components. That is the component's own guidance ·
Restate one that already has an owner. Two statements of the same rule drift, and the drift is
silent.

This is editorial policy for whoever adds a constraint. It is real, and it is not something a
reader of the page acts on. It now lives in the JSDoc of `constraints-data.ts`, at the point of
change, which is where `CONTRIBUTING.md` says reasoning goes.

---

## Rationale — why the page is shaped the way it is

### The CUT table

Four candidate kinds and why each was excluded. Kept because it is the argument for the set's
size, and a future editor tempted to add a lint rule to the page should read it.

| Cut | Why |
|---|---|
| Anything the linter reads | A semantic token over a hex, a type class unpaired with `leading-`, a padding on the space family. Those say what to type. `yarn dbui check` already refuses them, and a constraint that a machine settles does not need a page. |
| Component thresholds | Ten options before a `Combobox`, seven tabs, five breadcrumb levels. These pick between two components rather than closing a possibility, and they are already the component's own JSDoc. |
| Facts of construction | Primitives ship in no CSS. Nothing can consume one, so nothing can break it. A constraint that cannot be violated is an architecture note. |
| Preferences | Anything whose failure is a matter of taste. If the broken case cannot be described as an observation, two reviewers will disagree about it forever. |

`CUT` is still exported from `constraints-data.ts`. Nothing renders it.

### "Structure is settled somewhere else"

Four paragraphs arguing why page-layout constraints are on `/docs/layout` and not here:

> Constraints fall into three areas — interaction, page layout and product behavior. Page layout
> is not below, and that is a decision rather than an omission. Layout already carries N rules in
> exactly this shape: a statement, a default, the one exception and the observation that proves it
> was ignored. Moving them would take a set that works away from the page a person reads while
> framing a screen. Copying them would create the second statement that `CONTRIBUTING.md` exists
> to prevent, and the copy would be the one that goes stale.
>
> So structure is referenced and not repeated. The one structural constraint below is I6, which is
> about the rank of an action rather than the position of a region, and no file held it whole —
> `DESIGN.md` had the surface half and `button.tsx` the component half.
>
> A fourth group appeared that those three do not name, and it goes first. The closed sets are the
> constraint the other two depend on: nothing about how a control behaves can hold while the
> vocabulary it is written in keeps growing.
>
> Each constraint carries two words on its right. The first is the aspect of the principle it
> serves, and the second is where a violation can be seen. I4 is the only one with no principle
> beside it, because none of the six says anything about input — a reader who can only use a
> keyboard is not somebody the principles have met.

The operative fact — page-layout constraints are on `/docs/layout` — is one line on the page now.
The last paragraph holds a finding worth keeping: **none of the six principles says anything about
input**, which is why I4 carries no principle. That is a gap in `/docs/principles`, not a fact
about constraints, and it should be raised there.

### The gaps essay

Three of the five gap blocks were commentary rather than fact:

> **Interaction is the thinnest layer** — Every interaction constraint above is a prohibition. Not
> one of them has a positive default behind it, because the system ships none: no threshold for
> when an indicator may appear, no duration anything reads, no model for focus order across a
> screen and no keyboard contract above the single component Base UI gives us. So the honest
> reading of that group is that we know what interaction must not do and have never said what it
> should.

> **Behavior is the best covered and the least reachable** — The N patterns carry more behavioral
> truth than anything else in the system, and there is no `dbui pattern` command. An agent can read
> every component rule and no behavior rule.

> **A constraint has no home in the source** — A component constraint lives in its JSDoc, beside
> the code it governs. A system constraint governs no one file, so it lives in a page. That is why
> this file is data rather than markup, and why the section below matters more than the list above.

The first is a fair reading and is already carried per-constraint by the `gap` field on I2 and I5.
The second is true — there is no `dbui pattern` command, confirmed against `dbui manifest` — but it
is a roadmap item, and `TRACKER.md` owns those. The third explains a file layout decision and
belongs in that file's JSDoc, where it now is.

The two that stayed are facts a reader acts on: nothing here is machine-checked, and the components
break S2 themselves.

---

## Aspirational — a roadmap, and `TRACKER.md` owns roadmaps

The whole "How a constraint reaches an agent" section. Its first subsection was the false parser
claim above. The other two are real proposals and nothing has been built:

### `dbui constraints`

> The array behind this page is already the record: an id, a group, the closure, what it forbids,
> what it buys, the observable failure, the principle it serves and where the system falls short.
> Lifting it into `packages/dbui/src/rules/` beside the composition rules, and reading it from the
> CLI, makes it a typed envelope over the same API that MCP already exposes. Nothing new has to be
> built for the MCP half.
>
> `dbui constraints [group | id] --json`
>
> One field is worth adding that the page does not need: how the constraint is enforced — a lint
> rule name, a human review or an observation on screen. An agent that knows a constraint is
> unchecked treats it differently from one the linter will catch, and today every one of them is
> unchecked.

### Put them where an agent already looks

> The highest-leverage change is not a new command. It is that `dbui check` already reads a file,
> already knows which components it imports and already prints a report an agent acts on. Adding a
> block that names the constraints in scope for that file, and marks the ones nothing can verify,
> turns a lint run from what did I get wrong into what should I look at before saying this is done.
>
> Two of the constraints above are checkable in the linter as it stands, and either would be the
> first rule it has that is not about a token: an opacity utility on something that holds text
> (S2), and a second filled button on one surface (I6). The rest need a person, and the record
> should say so rather than imply a coverage the system does not have.

Both are worth doing. Neither is a fact about DBUI today, so neither belongs on a page that a
reader takes as the contract. If they are wanted, they go in `TRACKER.md` under *Missing*.

---

## Corrected in place

`constraints-data.ts`, S2's `gap`, said:

> Nine components dim a disabled control with `opacity-50` rather than the three disabled tokens,
> so the system breaks this itself.

The count is right today — nine files under `packages/dbui/src/components/ui/` write `opacity-50`.
It was still removed. `CONTRIBUTING.md` opens with *no prose states a value ... not a hex, a pixel
size, a duration, a count*, and this is a count in prose on a page, one fix away from being wrong.
`TRACKER.md` I3 states the same defect without a number and is the entry that tracks it.

---

## Ownership

Nothing in the repository marks `/docs/constraints` as owned by a separate effort. There is no
marker in the page, in `constraints-data.ts`, in `CONTRIBUTING.md`'s ownership table — which does
not list portal pages at all — or in `TRACKER.md`. `TRACKER.md` cites constraints S2 and S3 by id
in rows I3 and M13, so the set is depended on from outside the page and the ids must stay stable.

---

# Second cut — 2026-08-08

The set itself changed this time, which the first cut deliberately avoided.

## Why

The page was the negative of `/docs/principles`. Seven of the seventeen constraints restated a
don't already published there:

| Constraint | Twin on `/docs/principles` |
|---|---|
| I5 Motion explains a change or does not happen | Visuals don't — *Move something unless the motion explains a change* |
| I2 A loading indicator is delayed and then held | Structure don't — *Let a loading state flicker — delay it, then hold it* |
| I6 One primary action per surface | Structure do — *Keep one primary action per surface* |
| B7 Automation shows what it will do before it does it | Trust do — *Show what was generated before it runs* |
| B4 An incomplete answer says so where the number is | Feedback do — *State freshness and scope on anything cached or partial* |
| B1 Friction matches the blast radius | Trust do — *Pause where the consequence is wide or irreversible* |
| S4 A missing component is a gap to report | Structure don't — *Ship a second way to do something that already works* |

A page that is the inverse of another page has not earned its place. The split is now craft on
`/docs/principles`, responsibility on `/docs/constraints`, and neither restates the other.

Two principles moved with it, because they were ethics wearing craft clothes and were the source
of four of the seven duplicates above: **Trust** became constraint C1 *Agency*, and **Feedback**
became C2 *Accountability*. Their do-and-don't sets carried over close to verbatim. Principles
backfilled the two craft dimensions it was missing — Consistency and Fluency.

## Where each retired constraint went

| Was | Statement | Now owned by |
|---|---|---|
| S1 | Status is four words and nothing adds a fifth | `docs/token-rules.md` — the closed set, enforced by the generator. Echoed in C5 *Stewardship* as "add a fifth value to a set that closed at four" |
| S2 | Text has four weights of emphasis and opacity never makes a fifth | `docs/token-rules.md`; the defect it recorded is `TRACKER.md` I3 |
| S3 | Chart color and interface color never cross | `docs/token-rules.md` R10, which states it as a token rule and is partly linted; the gap it recorded is `TRACKER.md` M13 |
| S4 | A missing component is a gap to report, not a component to build | C5 *Stewardship*, and `AGENTS.md` rule 1 |
| I1 | Nothing moves under the pointer | `/docs/principles` — Visuals |
| I2 | A loading indicator is delayed and then held | `/docs/principles` — Structure. The missing threshold token is unrecorded elsewhere; see below |
| I3 | Zero rows and unknown rows never render the same | C2 *Accountability* |
| I4 | Nothing is reachable only by hover | `/docs/accessibility` — Keyboard |
| I5 | Motion explains a change or does not happen | `/docs/principles` — Visuals |
| I6 | One primary action per surface, and it is never destructive | `/docs/principles` — Structure, and C4 *Honesty* for the destructive half |
| B1 | Friction matches the blast radius, in both directions | C1 *Agency* |
| B2 | A selection is lost only when its objects are | C2 *Accountability* |
| B3 | What narrows a view lives in the URL | Unowned — see below |
| B4 | An incomplete answer says so where the number is | C2 *Accountability*, and C3 *Custody* for the permission-filter half |
| B5 | A partial failure is never reported as a success | C2 *Accountability* |
| B6 | Work that outlives the click gets an identity | C1 *Agency* |
| B7 | Automation shows what it will do before it does it | C1 *Agency* |

## Gaps the retired rows recorded, and where they stand

The `gap` field is gone with the rows. Five of them recorded a real system shortfall, and three
have no owner outside this file:

- **I2** — no token defines the loading delay threshold, and neither `Spinner` nor `Progress`
  carries one, so every surface picks its own number or picks none. **Unowned.**
- **I5** — the three duration tokens have no consumer; every transition runs at the bundler's
  default. **Unowned.**
- **B3** — nothing in the system synchronises filters, search or sort to the URL, and there is no
  filter-bar composition, so it is written per surface. **Unowned.**
- **B4** — nothing in DBUI carries provenance; no component pairs a value with its freshness,
  scope or completeness. Feeds C2 and C3, which now state the requirement with no component
  behind it. **Unowned.**
- **B6** — there is no run component. Feeds C1. **Unowned.**

These five are candidates for `TRACKER.md` under *Missing*. They are not filed there yet, and
this file is not a tracker — if they matter, move them.

## The ids changed

`S*`/`I*`/`B*` are gone; the set is `C1`–`C5`. `TRACKER.md` I3 and M13 cited S2 and S3 by id and
were updated in the same change to cite `token-rules.md` instead, which is where those two rules
now live. No other file cited a constraint id.
