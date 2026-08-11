# Chat components revision

## Problem

`dbui-chat` currently mixes durable chat primitives, behavior-only React helpers, and small recipes
that restate existing DBUI components. Figma and React disagree on both inventory and styling:

- Message, Reasoning, Task, Plan, and Prompt Input exist in both surfaces, but several details drift.
- Sources is a durable citation pattern in React but has no corresponding Figma component.
- Actions is a private Figma composition but a public React component.
- Suggestion, Loader, Follow Ups, Queue, and Checkpoint are public React components without a
  matching Figma contract.
- Prompt Input differs materially in spacing, radius, elevation, controls, and naming.

The revision should reduce the public API while making every retained visual component agree across
Figma and React.

## Direction

Use a semantic core. A public chat component must provide at least one of:

1. chat-specific behavior that cannot be expressed by an existing DBUI primitive;
2. a durable semantic state model; or
3. a visual contract that must remain consistent across products.

Small arrangements of Button, Tooltip, Spinner, or layout utilities remain recipes rather than
public components.

## Component model

### Figma and React

- **Message + MessageContent** — owns user/assistant role and message treatment.
- **Reasoning** — owns thinking, streaming, settled duration, and optional disclosure.
- **Task + TaskItem** — owns one agent tool-call result and its running/complete/error states.
- **Plan + PlanItem** — owns intended work and pending/active/done/cancelled states.
- **Sources + Source** — owns citation count, inline disclosure, and resolvable source links.
- **Prompt Input** — owns prompt submission, context, textarea behavior, actions, and
  ready/submitted/streaming states.

Figma uses these six visual families. Dotted child components are private implementation parts, not
consumer-facing library inventory.

### React only

- **Conversation** — owns scroll anchoring, jump-to-latest behavior, and empty-thread behavior.
- **Response** — owns rich response rendering.

These are behavioral and do not get placeholder Figma components.

### Remove

- Actions and Action
- Suggestions, Suggestion, and SuggestionIcon
- Loader
- FollowUps and FollowUp
- Queue and QueueItem
- Checkpoint
- MessageAvatar

Their existing examples become compositions built from retained chat components and core DBUI
primitives. Loading is represented by Reasoning's streaming state.

## Public API

Prompt Input is reduced to:

- `PromptInput`
- `PromptInputContext`
- `PromptInputTextarea`
- `PromptInputActions`
- `PromptInputSubmit`

Tool controls use the existing DBUI Button directly. `PromptInputActions` provides the action-row
layout but does not wrap or restyle its children. The accuracy disclaimer stays outside Prompt Input
because it is product copy, not form behavior.

Sources expands inline. Its trigger is the last item in the answer-action recipe; its content takes
the full row below the controls. The other answer actions remain a documented Button and Tooltip
composition.

Reasoning replaces Loader:

- streaming with no body renders a non-disclosure status;
- streaming with body content renders the reasoning disclosure;
- settled reasoning may show duration and remains collapsed by default.

## Internal structure

Reasoning, Task, Plan, and Sources each repeat the same chevron-and-collapsible trigger shell.
Extract that shell as an internal module inside `dbui-chat`, not a public export. The retained
components keep their own triggers' content and state vocabulary; only the disclosure mechanics and
focus treatment are shared.

Plan keeps its four-state indicator set rather than adopting `Status`, for two reasons that survive
checking the source. `Status` does carry `pending` and `canceled` members, so the states themselves
map — but its glyphs are the circled family (`DotsCircle`, `XCircle`, `CheckCircle`) where Plan's
Figma uses the bare family (`CircleOutline`, `CloseSmall`, `CheckSmall`), and a checklist reads as a
checklist only with bare marks. More decisively, `Status` renders `role="status"` with an
`aria-label`, so one per row would announce a four-item plan as four live regions. Task keeps
`Status` because it is a single row whose three states map to it exactly, glyphs included.

## Visual reconciliation

- Treat the current Figma assets as the visual direction for Message, Reasoning, Task, Plan, and
  Prompt Input, while replacing stale Figma variable names with current DBUI semantics.
- Match Message's user treatment, including its inset, radius, subtle surface, and elevation. Figma
  draws the user turn as a **full-width** filled box, not a right-aligned partial-width bubble, so
  React drops its right alignment and width cap. `shape-container` already resolves to the radius
  Figma uses, and `shape-container-lg` to Prompt Input's, so neither needs a literal.
- Match Reasoning's Genie icon, emphasized label, and trailing disclosure affordance.
- Preserve Task and Plan's existing state models; reconcile only measured visual differences.
- Rename Figma `Prompt` to `Prompt Input`; remove `.Input` as a standalone library component.
- Match Prompt Input's container inset, radius, spacing, border, and action sizing.
- Add Sources in Figma with collapsed and expanded states.
- Keep `.Actions` in Figma only as a private example composition using DBUI Button instances and the
  Sources trigger.

## Documentation and migration

- Remove deleted exports and all internal call sites in one breaking change.
- Record the consumer migration in `CHANGELOG.md`.
- Replace the overloaded Chat `Pieces` story with focused stories for each retained visual family.
- Keep one full-thread story that demonstrates the answer-action and inline Sources recipe.
- Update the component gallery to show only the semantic core and React-only behavior.
- Add Code Connect for all six paired visual families. None exists today — `figma/` carries no chat
  file — so all six are new rather than edits.
- Do not change tokens or add dependencies.

## Files the change must also move

Verified against the repo rather than inferred from the component list:

- **`packages/dbui-chat/tsup.config.ts`** is already wrong and cannot be left alone. Its entry map
  names `suggestion`, `follow-ups`, `actions`, and `loader` — all four deleted here — and omits
  `task`, `plan`, `queue`, `checkpoint`, and `sources` entirely. After the change it should list
  only the retained modules.
- **`AGENTS.md`** states a component count for `dbui-chat` in prose, which the "no prose states a
  value" rule forbids and which is already stale. Remove the number rather than correcting it, the
  way the icon and component indexes already had theirs removed.
- **`apps/portal/src/app/components/ChatGallery.tsx`** types a `storyId` per row and never sets one,
  so no gallery tile links to Storybook. Since the stories are being rewritten per retained family,
  set it while the rows are being cut.
- **`CHANGELOG.md`** records the removed exports and what a consumer does instead.

## Tracker interaction

- **I12** — `follow-ups.tsx` renders a raw `<button>`, recorded as the only non-negotiable rule
  broken in shipped code. Deleting the file closes it outright.
- **B12** — the `Pieces` story wedges headless Chrome, attributed to `Response`'s markdown parser
  rendering its widest input there. Splitting `Pieces` into focused stories moves that input, which
  may relieve the symptom, but `Response` is retained and its parser is unchanged. Do not record
  B12 as closed on the strength of this change; re-test it.
- **I15** — `dbui-chat`'s own `cn()` is known debt and stays out of scope here.

## Verification

- Run the React design linter on every changed React file.
- Type-check/build `dbui-chat` and the portal.
- Build Storybook and inspect retained components in light and dark themes.
- Verify Figma component names, variants, descriptions, and Code Connect mappings.
- Confirm removed exports have no call sites across `packages/`, `apps/`, and `figma/`.

