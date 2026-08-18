---
name: dbui-validate
description: Validate that code follows DBUI design system rules. Triggers when code is complete and needs a compliance check, when reviewing a PR for DBUI violations, after building a screen with dbui-build-screen, or when the user asks to "check", "lint", "validate", or "audit" DBUI usage.
---

# Validate DBUI compliance

**This is the standards check.** It runs standalone, and it is also the first of five
checks dispatched by `dbui-review` — when called that way, return the output contract at
the bottom of this file rather than the human-readable report.

## When to use

- After writing or editing any `.tsx` file that uses DBUI components
- After completing a screen build (run this as the final step of `dbui-build-screen`)
- When reviewing code for design system violations
- When the user says "check", "lint", "validate", or "audit"

## Spend the effort on what is bespoke

**Always run the linter — it takes seconds and it is the only thing here that cannot be
wrong.** What changes is where the *judgment* goes afterwards.

If the code was just generated from DBUI components and tokens, most of the surface is
compliant by construction and re-reading it finds nothing. **The bespoke parts are where
the findings are:** a locally defined component, a `className` doing something a prop
should, an arbitrary value, hand-rolled markup, anything the generator improvised because
no component fit.

So: run the full linter, then **read only the bespoke parts closely**, and **report only
what was found.** Do not narrate the passes — "47 components use correct tokens" is
output nobody needs.

⚠️ **Do not skip the linter on the assumption that generated code is clean.** "I used
tokens" and "the linter agrees I used tokens" differ more often than expected — `text-sm`
instead of `type-label` is the common case and it looks correct in every diff.

## Procedure

### 1. Run the linter first

```bash
yarn dbui check <path>          # or: yarn design:lint:react <path>
```

Twenty-five rules cover every token, accessibility and composition rule decidable from
the source: raw HTML, `asChild`, hardcoded and deleted colors, drift off the
space, size, radius and type families, and type set outside the ramp. Each
finding carries its own fix, generated from the shipped tokens, so the
suggestion cannot name something that no longer exists.

**Do not re-derive what it checks.** Restating a rule here is how a second,
disagreeing copy of it starts. `scripts/design-lint/README.md` lists all
all twenty-five. Report what the linter reports, grouped by severity.

### 2. Then check what it cannot see

These need a reader. None is decidable from a class string.

**Non-DBUI icon imports** — scan imports for `lucide-react`, `@heroicons/*`,
`react-icons/*`, `@radix-ui/react-icons`. Replace with
`from "dbui/components/icons/{Name}"`.

**Missing Base shell** — if the file exports a top-level page component
(`export default function Page/App/Layout`), verify it wraps children in
`<Base>` from `dbui-shells`.

**A one-off that duplicates a component** — a locally defined thing that does
what a DBUI export already does. The linter cannot judge this: name similarity
turned out to be noise, and behavioral equivalence needs reading. Check
`./dbui/docs/component-index.md` before accepting any new local component.

**Wrong ramp step** — the linter proves a `type-*` class is used and not
patched, not that it is the right one. `type-label` is single-line by
definition, so text that wraps takes `type-body`. That substitution is the most
common mistake in the system and it looks correct in every diff.

**Inconsistent menu icons** — if one `DropdownMenuItem` in a group has a
`DropdownMenuItemIcon`, all of them must.

**Copy review** — for any user-facing string literal, check against
`./dbui/docs/brandvoice.md`:
- Emoji → remove
- Exclamation marks → remove
- Banned words: "utilize", "leverage", "seamless", "robust", "simply", "just", "please", "kindly"
- Generic button labels: "OK", "Yes", "No" → use the action verb
- Title Case headings → sentence case

## Output format

Report findings as:

```
## DBUI Validation — <filename>

### Errors (N)
- Line X: <rule> — <description>. Fix: <suggestion>.

### Warnings (N)
- Line X: <rule> — <description>. Fix: <suggestion>.

### Info (N)
- Line X: <rule> — <description>.

### Result: PASS / FAIL (N errors, N warnings)
```

PASS if zero errors. Warnings don't fail the check but should be addressed.

## Output contract, when dispatched by `dbui-review`

Return exactly this instead of the report above. No preamble.

```
CHECK: standards
STATUS: ran

FIX
- <headline> :: <detail and the fix> :: <rule name or line>

IMPROVE
- <headline> :: <detail> :: <rule name or line>

WORKING
- <headline> :: <detail>
```

**Linter errors are `FIX`. Linter warnings are `IMPROVE`.** The human-only checks above
map by whether they are decidable: a non-DBUI icon import or a missing `Base` shell is a
`FIX`; a possible duplicate of an existing component or a questionable ramp step is an
`IMPROVE`.

**`WORKING` is not optional.** If the design used shells and components correctly, say so
in one line — "composed from `dbui-shells` `Base` with no raw interactive HTML" — because
the orchestrator needs something to put in "what's working" and this check is the only one
that can confirm it mechanically.

Do not paste the full linter output into the contract. Findings only.
