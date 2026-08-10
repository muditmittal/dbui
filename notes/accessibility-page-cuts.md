# Cut from /docs/accessibility

Removed 2026-08-07. Not documentation — see `README.md` in this directory.

The page was reduced to claims that are true of DBUI today and demonstrable against the repo.
Everything below was on the page and is not any more. Each block says why.

---

## False — the page said it, the code does not do it

### The component JSDoc reaches nobody

Verbatim, from the `RELIANCE` table:

> | Component JSDoc | The requirement for that one component, written as a constraint where it has one | **Nothing reads it for you. It is prose in a file the author has to open.** |

The second column is wrong. `packages/dbui-cli/src/api.mjs` parses `@constraint` and the
`@constraints` block form out of the source, `dbui component <name>` prints them and
`dbui-mcp` serves the same function.

```
$ yarn dbui component button --json
  "constraints": [ ... "ICON-ONLY (size icon-sm/icon-md): MUST have aria-label for accessibility." ... ]
```

The single most-skipped accessibility rule in the system is machine-readable and was described
on the accessibility page as unreachable. The corrected fact is on the page now.

---

## Duplicate — another file owns the rule

`packages/dbui/docs/brandvoice.md` owns the Accessibility and Globalization checklists, per the
ownership table in `CONTRIBUTING.md`, and `/docs/voice` already renders both of them from
`VoiceDoc.tsx`. Restating them made a third copy of each rule. `CONTRIBUTING.md` opens by naming
that as the drift it exists to prevent.

Cut from **Controls**:

- Give every icon-only control a label that names the action, not the glyph
  — brandvoice *Icon controls*, and `button.tsx`'s own `@constraint`. It was stated in three places.
- Write button and link text that still says what it does when read on its own
  — brandvoice *Stand-alone text*.
- Name a control by where it sits — a screen reader has no left
  — brandvoice *Spatial references*.
- Put a subtle foreground on a surface it was not tuned for
  — brandvoice *Contrast*, and the same sentence as the "do" beside it.

Cut from **Strings** — every line mapped onto brandvoice *Globalization* or its *Alt text* row:

- Pass values into one whole string, so a translator is given the sentence and not its pieces
- Assemble a sentence from fragments at run time
- Let flex or grid size anything holding a translatable label, and check the layout against the
  longest translation rather than the English
- Set a fixed width on anything holding a translatable string
- Write every date in the ISO 8601 form — it sorts as a string and it cannot be read month-first
  by mistake
- Format a date to the reader's locale — nothing catches it, and nothing tells them which number
  is the month
- Front-load the terms that carry the meaning in alt text, and keep it inside the length band
  brandvoice.md sets
- Bake meaning into text inside an image — number the callouts and put the words beside it

---

## Aspirational — good practice, not something DBUI enforces

- Reach every control with the keyboard before calling a screen done, and watch where focus lands
  when a dialog closes.
- Assume a component is accessible because it came from the system. *(as a "don't")*
- Pair a foreground with the surface it was tuned for, and read the ratio on the Tokens page
  rather than out of prose.

The third is half true and was cut in that form. A ratio **is** printed on `/docs/tokens`, but
only for foregrounds matching `text-*`, `link-*`, `status-text-*` and `action-label-*`
(`TokenKit.tsx`, `verdict()`). The page now states what carries a ratio instead of implying every
token does.

None of the three is checked by anything. There is no automated accessibility suite and no CI to
run one in — `TRACKER.md` M10.

---

## Rationale — the page's own construction

The file JSDoc, kept here because it records a decision someone may want to revisit:

> Rules, then reliance. Everything here is either something a person does on a screen or a limit
> on what the system does for them. Explaining what contrast or a live region is belongs to WCAG,
> not to a page someone opens mid-task.
>
> `brandvoice.md` owns the Accessibility and Globalization checklists, so this page states no rule
> that file does not already hold. What it adds is the shape each rule takes in code, and — the
> part no other file covers — what nothing checks. The gaps are the most useful lines here. A
> system that implies coverage it does not have is trusted once.
>
> No number appears in this prose. The ratios, the alt-text band and the expansion allowance live
> in `brandvoice.md` and on the Tokens page, and a copied number is one edit from being wrong.

The second paragraph states the intent the page did not keep: it did restate rules `brandvoice.md`
already held. That is what the duplicate section above removed.

---

## Verified and kept, for the record

These survived the cut. Listed so the next audit starts from what was checked rather than
re-deriving it.

| Claim | Verified against |
|---|---|
| The React linter has no accessibility rule; a control with no label passes clean | No rule in `scripts/design-lint/react-lint.js` reads an ARIA attribute |
| Storybook runs axe, one story at a time, and gates nothing | `@storybook/addon-a11y` in `.storybook/main.ts` and `apps/portal/package.json` |
| A contrast ratio is printed for foreground tokens on `/docs/tokens` | `verdict()` in `apps/portal/src/stories/tokens/TokenKit.tsx` |
| Base UI returns focus to the trigger when a popup closes | `finalFocus` default in `vendor/@base-ui/react/dialog/popup/DialogPopup.d.ts` |
| `DirectionProvider` is re-exported by the system | `packages/dbui/src/components/ui/direction.tsx` |
| DBUI positions with physical properties, so a mirrored layout does not fully mirror | 28 files under `components/ui/` use `pl-`/`pr-`/`left-`/`right-`; two use a logical `start-*` |
| No internationalization framework, no translated string | No i18n dependency in any `package.json` |
| No automated accessibility suite, no CI, no screen reviewed right to left | `TRACKER.md` M10 |
